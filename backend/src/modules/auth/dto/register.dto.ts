import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    MinLength,
} from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'Nguyen Hieu' })
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({ example: 'thaihieu1@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: '+84898610991' })
    @IsNotEmpty()
    @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ hoặc không phải số điện thoại Việt Nam' })
    phone: string;

    @ApiProperty({ example: 'Thach Ha - Ha Tinh' })
    @IsNotEmpty()
    address: string;
}
