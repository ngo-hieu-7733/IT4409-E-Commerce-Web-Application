import { Module, OnModuleInit } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import * as path from 'path';
dotenvConfig({ path: path.resolve(process.cwd(), '.env.test') });
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5001,
            username: process.env.DB_USERNAME ?? process.env.DB_USER ?? 'root',
            password: process.env.DB_PASSWORD ?? 'rootpassword',
            database: process.env.DB_NAME ?? 'it4409_shop',
            entities: [__dirname + '/entities/*{.ts,.js}'],
            synchronize: false,
            autoLoadEntities: true,
        }),
    ],
})
export class DatabaseModule implements OnModuleInit {
    async onModuleInit() {
        console.log('Kết nối database thành công');
    }
}
