import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { sendMailForgotPasswordStore } from 'src/shared/utils/sendEmail.util';
import { UserNotification } from '../../database/entities/userNotification.entity';
import { GetNotificationsDto } from './dto/get-notification.dto';
import { ReadNotificationResponseDto } from './dto/read-notification-response.dto';
import { getStrongPassword } from 'src/shared/utils/getPassWord';
import { BusinessCacheRepository } from '../redis/business-cache.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(UserNotification)
        private userNotificationRepository: Repository<UserNotification>,

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

    async getNotifications(userId, dto: GetNotificationsDto) {
        const findUser = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!findUser) {
            throw new HttpException('User không tồn tại', 404);
        }

        const where: any = { user: { id: userId } };
        if (dto.unread) {
            where.status = 'unread';
        }
        const [notifications, total] =
            await this.userNotificationRepository.findAndCount({
                where,
                skip: (dto.page - 1) * dto.limit,
                take: dto.limit,
                order: {
                    createdAt: 'DESC',
                },
            });
        return {
            data: notifications,
            total,
            page: Number(dto.page),
            limit: Number(dto.limit),
        };
    }

    async readNotification(userId: string, notificationId: number) {
        const findUser = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!findUser) {
            throw new HttpException('User không tồn tại', 404);
        }

        const findNotification = await this.userNotificationRepository.findOne({
            where: { id: notificationId, user: { id: userId } },
            relations: ['notification'],
        });
        if (!findNotification) {
            throw new HttpException('Notification không tồn tại', 404);
        }
        findNotification.status = 'read';
        const result =
            await this.userNotificationRepository.save(findNotification);

        return result;
    }

    async countUnreadNotifications(userId: string) {
        return await this.userNotificationRepository.count({
            where: { user: { id: userId }, status: 'unread' },
        });
    }
}
