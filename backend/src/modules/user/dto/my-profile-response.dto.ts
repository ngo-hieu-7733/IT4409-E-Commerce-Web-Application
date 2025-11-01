import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MyProfileResponseDto {
    @Expose()
    @ApiProperty({
        example: '1',
    })
    id: string;

    @Expose()
    @ApiProperty({
        example: 'Nguyen Hieu',
    })
    fullName: string;

    @Expose()
    @ApiProperty({
        example: 'thaihieu191@gmail.com',
    })
    email: string;

    @Expose()
    @ApiProperty({
        example: '+84898610991',
    })
    phone: string;

    @Expose()
    @ApiProperty({
        example: 'Thach Ha - Ha Tinh',
    })
    address: string;

    @Expose()
    @ApiProperty({
        example: new Date(),
    })
    createdAt: Date;
}
