import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class GetNotificationsDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    limit: number = 10;

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    unread?: boolean;
}
