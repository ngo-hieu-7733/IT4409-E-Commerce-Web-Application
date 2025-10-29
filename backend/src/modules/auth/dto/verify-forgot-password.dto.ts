import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyForgotPasswordDto {
    @ApiProperty({ example: 'thaihieu1@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'user' })
    @IsString()
    role: string;

    @ApiProperty({ example: '888888' })
    @IsString()
    otp: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    newPassword: string;
}
