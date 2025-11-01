import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import * as bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login-body.dto';

import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { BusinessCacheRepository } from '../redis/business-cache.repository';
import { SendEmailService } from '../send-email/sendEmail.service';

@Injectable()
export class AuthService {
    constructor(
        private businessCacheRepository: BusinessCacheRepository,
        private jwtService: JwtService,
        private sendEmailService: SendEmailService,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async register(data: RegisterDto) {
        const findUserEmail = await this.userRepository.findOne({
            where: { email: data.email },
        });
        if (findUserEmail) {
            throw new ConflictException('Email đã tồn tại');
        }

        const findUserPhone = await this.userRepository.findOne({
            where: { phone: data.phone },
        });
        if (findUserPhone) {
            throw new ConflictException('Số điện thoại đã tồn tại');
        }

        const findUserInRedis =
            await this.businessCacheRepository.getRegisterData(data.email);
        if (findUserInRedis) {
            const otpCountdownFind =
                await this.businessCacheRepository.getOtpCountdown(data.email);
            if (otpCountdownFind && Number(otpCountdownFind) > 0) {
                throw new BadRequestException(
                    `Bạn đã gửi OTP quá nhanh, vui lòng chờ ${otpCountdownFind} giây để gửi lại`,
                );
            } else {
                throw new ConflictException('Email này đã đăng ký');
            }
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const redisData = {
            email: data.email,
            phone: data.phone,
            fullName: data.fullName,
            password: hashedPassword,
            role: 'user',
            address: data.address,
        };
        await this.businessCacheRepository.saveOtp(data.email, otp);
        await this.businessCacheRepository.saveRegisterData(
            data.email,
            redisData,
        );
        await this.sendEmailService.sendMailRegisterOtp(
            data.email,
            `Chào mừng: OTP xác thực tài khoản ${data.email}`,
            otp,
            process.env.NODE_ENV,
        );

        return 'Đăng ký thành công, vui lòng kiểm tra email để lấy xác thực OTP';
    }

    async resendRegisterOtp(email: string) {
        const otpFind = await this.businessCacheRepository.getOtp(email);

        if (!otpFind) {
            throw new BadRequestException('Bạn chưa gửi OTP');
        }

        const otpCountdownFind =
            await this.businessCacheRepository.getOtpCountdown(email);
        if (otpCountdownFind && Number(otpCountdownFind) > 0) {
            throw new BadRequestException(
                `Bạn đã gửi OTP quá nhanh, vui lòng chờ ${otpCountdownFind} giây để gửi lại`,
            );
        }

        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

        await this.businessCacheRepository.saveOtp(email, newOtp);

        await this.sendEmailService.sendMailRegisterOtp(
            email,
            `Chào mừng: OTP xác thực tài khoản ${email}`,
            newOtp,
            process.env.NODE_ENV,
        );
        return 'OTP đã được gửi lại';
    }

    async verifyOtp(email: string, otp: string) {
        const otpFind = await this.businessCacheRepository.getOtp(email);
        if (!otpFind) {
            throw new BadRequestException('OTP không hợp lệ');
        }

        if (otpFind !== otp) {
            throw new BadRequestException('OTP không hợp lệ');
        }

        const registerData =
            await this.businessCacheRepository.getRegisterData(email);
        if (!registerData) {
            throw new BadRequestException('Email này chưa đăng ký');
        }

        const registerDataJson = JSON.parse(registerData as string);

        const findUserPhone = await this.userRepository.findOne({
            where: { phone: registerDataJson.phone },
        });
        if (findUserPhone) {
            await this.businessCacheRepository.deleteOtpRegisterData(email);
            throw new ConflictException('Số điện thoại đã tồn tại');
        }

        const newUser = this.userRepository.create({
            fullName: registerDataJson.fullName,
            email: registerDataJson.email,
            password: registerDataJson.password,
            phone: registerDataJson.phone,
            address: registerDataJson.address,
            role: registerDataJson.role,
            tokenVersion: 1,
        });
        const savedUser = await this.userRepository.save(newUser);

        //Cache
        await this.businessCacheRepository.cacheTokenVersion(
            savedUser.id,
            savedUser.tokenVersion,
        );

        await this.businessCacheRepository.deleteOtpRegisterData(email);

        return 'Tạo tài khoản thành công';
    }

    async login(dto: LoginDto) {
        const findUser = await this.userRepository.findOne({
            where: { email: dto.email, role: In(['user']) },
        });

        if (!findUser) {
            throw new UnauthorizedException(
                'Email hoặc mật khẩu không chính xác',
            );
        }

        if (findUser.mustChangePassword) {
            throw new UnauthorizedException('Bạn cần thay đổi mật khẩu');
        }

        const isdValid = await bcrypt.compare(dto.password, findUser.password);

        if (!isdValid) {
            throw new UnauthorizedException(
                'Email hoặc mật khẩu không chính xác',
            );
        }

        let tokenVersionToUse: number;
        const cached = await this.businessCacheRepository.getTokenVersion(
            findUser.id,
        );
        if (cached) {
            tokenVersionToUse = Number(cached);
        } else {
            tokenVersionToUse = findUser.tokenVersion;
            await this.businessCacheRepository.cacheTokenVersion(
                findUser.id,
                tokenVersionToUse,
            );
        }

        const payload = {
            id: findUser.id,
            tokenVersion: tokenVersionToUse,
            role: findUser.role,
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_KEY,
            expiresIn: '1h',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_KEY,
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async loginAdmin(dto: LoginDto) {
        const findUser = await this.userRepository.findOne({
            where: { email: dto.email, role: 'admin' },
        });

        if (!findUser) {
            throw new UnauthorizedException(
                'Email hoặc mật khẩu không chính xác',
            );
        }

        const isdValid = await bcrypt.compare(dto.password, findUser.password);

        if (!isdValid) {
            throw new UnauthorizedException(
                'Email hoặc mật khẩu không chính xác',
            );
        }

        let tokenVersionToUse: number;
        const cached = await this.businessCacheRepository.getTokenVersion(
            findUser.id,
        );
        if (cached) {
            tokenVersionToUse = Number(cached);
        } else {
            tokenVersionToUse = findUser.tokenVersion;
            await this.businessCacheRepository.cacheTokenVersion(
                findUser.id,
                tokenVersionToUse,
            );
        }

        let payload: any = {
            id: findUser.id,
            tokenVersion: tokenVersionToUse,
            role: findUser.role,
        };
        if (findUser.mustChangePassword) {
            payload = { ...payload, mustChangePassword: true };
        }

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_KEY,
            expiresIn: '1h',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_KEY,
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }

    async logout(refreshToken: string) {
        let userJwt: any;

        try {
            userJwt = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_KEY,
            });
            const cachedTokenVersion =
                await this.businessCacheRepository.getTokenVersion(userJwt.id);
            if (userJwt.tokenVersion !== Number(cachedTokenVersion)) {
                throw new UnauthorizedException('Refresh token không hợp lệ');
            }

            const findUser = await this.userRepository.findOne({
                where: { id: userJwt.id },
            });
            if (!findUser) {
                throw new UnauthorizedException('Refresh token không hợp lệ');
            }

            findUser.tokenVersion++;
            await this.userRepository.save(findUser);

            //Cache
            await this.businessCacheRepository.cacheTokenVersion(
                findUser.id,
                findUser.tokenVersion,
            );

            return 'Đăng xuất thành công';
        } catch (error) {
            throw new UnauthorizedException('Refresh token không hợp lệ');
        }
    }

    async refresh_token(oldRefreshToken: string) {
        try {
            const userJwt = this.jwtService.verify(oldRefreshToken, {
                secret: process.env.JWT_REFRESH_KEY,
            });

            let cachedTokenVersion =
                await this.businessCacheRepository.getTokenVersion(userJwt.id);

            if (!cachedTokenVersion) {
                const userDb = await this.userRepository.findOne({
                    where: { id: userJwt.id },
                });
                if (!userDb) {
                    throw new UnauthorizedException(
                        'Refresh token không hợp lệ',
                    );
                }
                cachedTokenVersion = userDb.tokenVersion.toString();
                await this.businessCacheRepository.cacheTokenVersion(
                    userJwt.id,
                    userDb.tokenVersion,
                );
            }

            if (userJwt.tokenVersion !== Number(cachedTokenVersion)) {
                throw new UnauthorizedException('Refresh token không hợp lệ');
            }

            const payload = {
                id: userJwt.id,
                tokenVersion: userJwt.tokenVersion,
                role: userJwt.role,
                ...(userJwt.mustChangePassword !== undefined && {
                    mustChangePassword: userJwt.mustChangePassword,
                }),
            };

            const accessToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_ACCESS_KEY,
                expiresIn: '1h',
            });

            const refreshToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_KEY,
                expiresIn: '7d',
            });

            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw new UnauthorizedException('Refresh token không hợp lệ');
        }
    }

    async changePassword(userId: string, dto: ChangePasswordDto) {
        const findUser = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!findUser) {
            throw new NotFoundException('User không tồn tại');
        }

        const checkOldPassword = await bcrypt.compare(
            dto.oldPassword,
            findUser.password,
        );
        if (!checkOldPassword) {
            throw new UnauthorizedException('Mật khẩu cũ không chính xác');
        }

        const newPasswordHashed = await bcrypt.hash(dto.newPassword, 10);

        findUser.password = newPasswordHashed;
        findUser.tokenVersion++;
        await this.userRepository.save(findUser);

        //Cache
        await this.businessCacheRepository.cacheTokenVersion(
            findUser.id,
            findUser.tokenVersion,
        );

        return 'Đổi mật khẩu thành công';
    }

    async forgotPassword(email: string, role: string) {
        if (role !== 'user' && role !== 'admin') {
            throw new BadRequestException('Role không hợp lệ');
        }

        const findUser = await this.userRepository.findOne({
            where: { email: email, role: role },
        });
        if (!findUser) {
            throw new BadRequestException('Email không tồn tại');
        }

        const otpCountdown =
            await this.businessCacheRepository.getOtpCountdown(email);
        if (otpCountdown && Number(otpCountdown) > 0) {
            throw new BadRequestException(
                `Bạn đã gửi OTP quá nhanh, vui lòng chờ ${otpCountdown} giây để gửi lại`,
            );
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await this.businessCacheRepository.saveOtpForgotPassword(
            email,
            role,
            otp,
        );

        await this.sendEmailService.sendMailForgotPasswordOtp(
            email,
            `OTP quên mật khẩu ${email} - ${role}`,
            otp,
            process.env.NODE_ENV,
        );

        return 'OTP quên mật khẩu đã được gửi đến email của bạn';
    }

    async verifyForgotPassword(
        email: string,
        role: string,
        otp: string,
        newPassword: string,
    ) {
        const otpFind = await this.businessCacheRepository.getOtpForgotPassword(
            email,
            role,
        );

        if (!otpFind) {
            throw new BadRequestException('OTP không hợp lệ');
        }
        if (otpFind !== otp) {
            throw new BadRequestException('OTP không hợp lệ');
        }

        const newPasswordHashed = await bcrypt.hash(newPassword, 10);
        const findUser = await this.userRepository.findOne({
            where: { email: email, role: role },
        });
        if (!findUser) {
            throw new NotFoundException('User không tồn tại');
        }
        findUser.password = newPasswordHashed;
        findUser.tokenVersion++;
        await this.userRepository.save(findUser);

        //Cache
        await this.businessCacheRepository.cacheTokenVersion(
            findUser.id,
            findUser.tokenVersion,
        );
        await this.businessCacheRepository.deleteOtpForgotPassword(email, role);

        return 'Mật khẩu đã được thay đổi thành công';
    }
}
