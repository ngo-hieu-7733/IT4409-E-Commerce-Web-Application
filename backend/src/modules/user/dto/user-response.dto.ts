import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
    @Expose()
    @ApiProperty({ example: 'Nguyen Thai Hieu' })
    fullName: string;

    @Expose()
    @ApiProperty({ example: '0123456789' })
    phone: string;

    @Expose()
    @ApiProperty({ example: 'nguyenthaihieu@gmail.com' })
    email: string;

    @Expose()
    @ApiProperty({ example: 'Hà Nội' })
    address: string;

    @Expose()
    @ApiProperty({ example: 'user' })
    role: string;
}
