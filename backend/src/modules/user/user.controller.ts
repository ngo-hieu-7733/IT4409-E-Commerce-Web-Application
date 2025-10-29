import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/shared/decorators/role-auth.decorator';
import { CustomResponse } from 'src/shared/decorators/custom-response.decorator';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('/user')
@ApiTags('Users')
@UserAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @CustomResponse(UserResponseDto, {
        code: 200,
        message: 'Lấy thông tin thành công',
        description: '[all] Lấy thông tin người dùng',
    })
    async getMyInfo(@Req() req: Request & { user?: any }) {
        return this.userService.getMyInfo(req.user.id);
    }

    @Patch()
    @CustomResponse('string', {
        code: 204,
        message: 'Cập nhật thông tin thành công',
        description: '[all] Cập nhật thông tin người dùng',
    })
    async updateUser(
        @Req() req: Request & { user?: any },
        @Body() dto: UpdateUserDto,
    ) {
        return this.userService.updateUser(req.user.id, dto);
    }
}
