import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginStoreResponseDto {
    @Expose()
    @ApiProperty({ example: 'access-token' })
    accessToken: string;

    @Expose()
    @ApiProperty({ example: 'refresh-token' })
    refreshToken: string;

    @Expose()
    @ApiProperty({ example: 'Đăng nhập thành công. Bạn cần thay đổi mật khẩu' })
    message: string;
}
