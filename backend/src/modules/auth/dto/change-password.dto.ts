import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @ApiProperty({ example: '123456' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    oldPassword: string;

    @ApiProperty({ example: '12345678' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    newPassword: string;
}
