import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { ConfigModule } from '@nestjs/config';
import { CustomCacheModule } from './modules/redis/custom-cache.module';
import { SeederModule } from './database/seeder/seeder.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env.test',
        }),
        BullModule.forRoot({
            connection: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT ?? '5002'),
            },
        }),
        DatabaseModule,
        CustomCacheModule,
        AuthModule,
        UserModule,
        SeederModule,
    ],
    controllers: [AppController],
    providers: [AppService, ResponseInterceptor],
})
export class AppModule {}
