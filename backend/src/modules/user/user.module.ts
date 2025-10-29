import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Store } from '../../database/entities/store.entity';
import { StoreRegisterRequest } from '../../database/entities/storeRegisterRequest.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserNotification } from '../../database/entities/userNotification.entity';
import { CustomCacheModule } from '../redis/custom-cache.module';
import { BusinessCacheRepository } from '../redis/business-cache.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Store,
            StoreRegisterRequest,
            UserNotification,
        ]),
        JwtModule,
        CustomCacheModule,
    ],
    controllers: [UserController],
    providers: [UserService, BusinessCacheRepository],
})
export class UserModule {}
