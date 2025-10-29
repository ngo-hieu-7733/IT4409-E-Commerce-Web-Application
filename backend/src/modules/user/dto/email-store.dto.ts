import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailStoreDto {
    @ApiProperty({ example: 'thaihieu1-@store.com' })
    @IsEmail()
    email: string;
}
