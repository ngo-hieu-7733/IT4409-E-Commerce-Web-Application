import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { CustomCacheModule } from '../redis/custom-cache.module';
import { BusinessCacheRepository } from '../redis/business-cache.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
        ]),
        JwtModule,
        CustomCacheModule,
    ],
    controllers: [UserController],
    providers: [UserService, BusinessCacheRepository],
})
export class UserModule {}
