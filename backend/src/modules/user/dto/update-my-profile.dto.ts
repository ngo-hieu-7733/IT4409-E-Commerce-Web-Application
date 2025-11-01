import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMyProfileDto {
    @ApiProperty({ example: 'Nguyen Hieu' })
    @IsOptional()
    @IsString()
    fullName?: string;

    @ApiProperty({ example: '+84898610991' })
    @IsOptional()
    @IsString()
    @IsPhoneNumber()
    phone?: string;

    @ApiProperty({ example: 'Thach Ha - Ha Tinh' })
    @IsOptional()
    @IsString()
    address?: string;
}
