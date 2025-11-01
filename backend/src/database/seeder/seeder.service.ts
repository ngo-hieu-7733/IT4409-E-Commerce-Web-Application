import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async run() {
        const users = [
            {
                fullName: 'Admin',
                email: 'admin@gmail.com',
                password: '123456',
                phone: '+84987654321',
                address: 'Thach Ha - Ha Tinh',
                role: 'admin',
                isActive: true,
            },
            {
                fullName: 'Nguyen Hieu',
                email: 'thaihieu1@gmail.com',
                password: '123456',
                phone: '+84898610991',
                address: 'Thach Ha - Ha Tinh',
                role: 'user',
                isActive: true,
            },
            {
                fullName: 'Nguyen Hieu',
                email: 'thaihieu2@gmail.com',
                password: '123456',
                phone: '+84898610992',
                address: 'Thach Ha - Ha Tinh',
                role: 'user',
                isActive: true,
            },
            {
                fullName: 'Nguyen Hieu - Store',
                email: 'thaihieu1@gmail.com',
                password: '123456',
                address: 'Thach Ha - Ha Tinh',
                role: 'store',
                isActive: true,
            },
            {
                fullName: 'Nguyen Hieu - Store',
                email: 'thaihieu2@gmail.com',
                password: '123456',
                address: 'Thach Ha - Ha Tinh',
                role: 'store',
                isActive: true,
            },
        ];
        let count = 0;
        for (const user of users) {
            try {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                const newUser = this.userRepository.create({
                    ...user,
                    password: hashedPassword,
                });
                await this.userRepository.save(newUser);
                count++;
            } catch (error) {
                console.log(user);
            }
        }
        console.log(`Đã tạo ${count} user`);
    }
}
