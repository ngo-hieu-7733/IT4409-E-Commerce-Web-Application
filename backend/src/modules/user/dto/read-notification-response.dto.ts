import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class ReadNotificationResponseDto {
    @Expose()
    @Transform(({ obj }) => obj.notification.title)
    @ApiProperty({
        example: 'Thông báo',
    })
    title: string;

    @Expose()
    @Transform(({ obj }) => obj.notification.content)
    @ApiProperty({
        example: 'Nội dung thông báo',
    })
    content: string;

    @Expose()
    @Transform(({ obj }) => obj.notification.makeBy)
    @ApiProperty({
        example: 'Admin',
    })
    makeBy: string;

    @Expose()
    @Transform(({ obj }) => obj.notification.createdAt)
    @ApiProperty({
        example: new Date(),
    })
    createdAt: Date;

    @Expose()
    @ApiProperty({
        example: 'unread',
    })
    status: string;
}
