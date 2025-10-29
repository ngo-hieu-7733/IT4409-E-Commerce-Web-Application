import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetNotificationResponseDto {
    @Expose()
    @ApiProperty({
        example: 1,
    })
    id: number;

    @Expose()
    @ApiProperty({
        example: 'unread',
    })
    status: string;

    @Expose()
    @ApiProperty({
        example: new Date(),
    })
    createdAt: Date;
}
