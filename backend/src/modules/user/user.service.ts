import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async listUsers(pagination: PaginationDto) {
        const where: any = {};
        if (pagination.search) {
            where.email = Like(`%${pagination.search}%`);
        }

        const page = pagination.page ?? 1;
        const limit = pagination.limit ?? 10;
        const [items, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            where,
        });

        return {
            data: items,
            meta: { page, limit, total },
        };
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User không tồn tại');
        }
        return user;
    }

    async updateUserStatus(id: string, dto: UpdateUserStatusDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User không tồn tại');
        }
        user.isActive = dto.isActive;
        await this.userRepository.save(user);
        return 'Cập nhật trạng thái thành công';
    }

    async getMyProfile(userId: string) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User không tồn tại');
      }
      return user;
    }

    async updateMyProfile(userId: string, dto: UpdateMyProfileDto) {
        if (!dto || Object.keys(dto).length === 0) {
            throw new BadRequestException('Không có dữ liệu để cập nhật');
        }
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException('User không tồn tại');
        }

        Object.assign(user, dto);

        await this.userRepository.save(user);

        return 'Cập nhật thông tin thành công';
    }
}
