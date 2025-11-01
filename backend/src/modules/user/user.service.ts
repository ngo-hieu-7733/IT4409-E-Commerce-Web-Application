import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { sendMailForgotPasswordStore } from 'src/shared/utils/sendEmail.util';
import { GetNotificationsDto } from './dto/get-notification.dto';
import { ReadNotificationResponseDto } from './dto/read-notification-response.dto';
import { getStrongPassword } from 'src/shared/utils/getPassWord';
import { BusinessCacheRepository } from '../redis/business-cache.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private readonly businessCacheRepository: BusinessCacheRepository,
    ) {}

    async getMyInfo(userId) {
        const findUser = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!findUser) {
            throw new HttpException('User không tồn tại', 404);
        }
        return findUser;
    }

    async updateUser(userId, dto: UpdateUserDto) {
        if (!dto || Object.keys(dto).length === 0) {
            return { message: 'Không có gì để cập nhật' };
        }

        const findUser = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!findUser) {
            throw new HttpException('User không tồn tại', 404);
        }

        if (dto.phone !== undefined) {
            const checkPhone = await this.userRepository.findOne({
                where: { phone: dto.phone },
            });
            if (checkPhone) {
                throw new HttpException('Số điện thoại đã tồn tại', 400);
            }
        }

        Object.assign(findUser, dto);

        await this.userRepository.save(findUser);
        return 'Cập nhật thành công';
    }

    async forgotPasswordStoreAccount(userId: string) {
        const findUser = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!findUser) {
            throw new HttpException('User không tồn tại', 404);
        }

        const findStoreAcc = await this.userRepository.findOne({
            where: { email: findUser.email, role: 'store' },
        });

        if (!findStoreAcc) {
            throw new HttpException('User không tồn tại', 404);
        }

        const newPassword = getStrongPassword(10);
        const newPasswordHashed = await bcrypt.hash(newPassword, 10);

        findStoreAcc.password = newPasswordHashed;
        findStoreAcc.tokenVersion++;

        //Cache
        await this.businessCacheRepository.cacheTokenVersion(
            findStoreAcc.id,
            findStoreAcc.tokenVersion,
        );

        await this.userRepository.save(findStoreAcc);

        sendMailForgotPasswordStore(
            findUser.email,
            `Mật khẩu mới cho store ${findStoreAcc.fullName}`,
            {
                storename: findStoreAcc.fullName,
                password: newPassword,
                email: findStoreAcc.email,
            },
            process.env.NODE_ENV,
        );
        return 'Mật khẩu mới đã được gửi vào email của bạn';
    }
}
