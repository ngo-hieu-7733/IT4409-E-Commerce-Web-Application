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
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GetNotificationsDto } from './dto/get-notification.dto';
import { PositiveIntPipe } from 'src/shared/pipes/positiveInt.pipe';
import { UserAuth } from 'src/shared/decorators/role-auth.decorator';
import { CustomResponse } from 'src/shared/decorators/custom-response.decorator';
import { UserResponseDto } from './dto/user-response.dto';
import { GetNotificationResponseDto } from './dto/get-notification-response.dto';
import { ReadNotificationResponseDto } from './dto/read-notification-response.dto';

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

    @Get('notifications')
    @CustomResponse(GetNotificationResponseDto, {
        code: 200,
        message: 'Lấy thông báo thành công',
        description: '[all] Lấy thông báo người dùng',
        isPagination: true,
    })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({
        name: 'unread',
        required: false,
        type: Boolean,
        example: false,
    })
    async getNotifications(
        @Req() req: Request & { user?: any },
        @Query() dto: GetNotificationsDto,
    ) {
        return this.userService.getNotifications(req.user.id, dto);
    }

    @Get('notification/count')
    @CustomResponse('number', {
        code: 200,
        message: 'Lấy số lượng thông báo chưa đọc thành công',
        description: '[all] Lấy số lượng thông báo chưa đọc',
    })
    async countUnreadNotifications(@Req() req: Request & { user?: any }) {
        return this.userService.countUnreadNotifications(req.user.id);
    }

    @Post('notification/:notificationId')
    @CustomResponse(ReadNotificationResponseDto, {
        code: 200,
        message: 'Đọc thông báo thành công',
        description: '[all] Đọc thông báo người dùng',
    })
    async readNotification(
        @Req() req: Request & { user?: any },
        @Param('notificationId', PositiveIntPipe) notificationId: number,
    ) {
        return this.userService.readNotification(req.user.id, notificationId);
    }
}
