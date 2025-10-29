import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { SeederService } from './seeder.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [SeederService],
})
export class SeederModule {}
