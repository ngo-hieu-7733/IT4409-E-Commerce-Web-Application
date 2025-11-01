import 'reflect-metadata';
import { config as dotenvConfig } from 'dotenv';
import * as path from 'path';
dotenvConfig({ path: path.resolve(process.cwd(), '.env.test') });
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5001,
    username: process.env.DB_USERNAME ?? process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'rootpassword',
    database: process.env.DB_NAME ?? 'it4409_shop',
    entities: [__dirname + '/entities/*{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: true,
});

export default AppDataSource;
