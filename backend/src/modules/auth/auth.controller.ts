import {
    Controller,
    Post,
    Get,
    Req,
    Body,
    HttpException,
    Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login-body.dto';
import type { Request } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

import { EmailDto } from './dto/email.dto';
import { VerifyRegisterOtpDto } from './dto/verify-register-otp.dto';
import { VerifyForgotPasswordDto } from './dto/verify-forgot-password.dto';
import { AllAuth } from 'src/shared/decorators/role-auth.decorator';
import { CustomResponse } from 'src/shared/decorators/custom-response.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginStoreResponseDto } from './dto/login-store-response.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @CustomResponse('number', {
        code: 201,
        message: 'Đã đăng ký',
        description: '[all] Đăng ký tài khoản',
    })
    async register(@Body() dto: RegisterDto) {
        return await this.authService.register(dto);
    }

    @Post('resend-register-otp')
    @CustomResponse('string', {
        code: 201,
        message: 'Đã gửi lại OTP',
        description: '[all] Gửi lại OTP',
    })
    async resendRegisterOtp(@Body() dto: EmailDto) {
        return await this.authService.resendRegisterOtp(dto.email);
    }

    @Post('verify-otp')
    @CustomResponse('string', {
        code: 201,
        message: 'Đã xác thực OTP',
        description: '[all] Xác thực OTP',
    })
    async verifyOtp(@Body() dto: VerifyRegisterOtpDto) {
        return await this.authService.verifyOtp(dto.email, dto.otp);
    }

    @Post('login')
    @CustomResponse(LoginResponseDto, {
        code: 201,
        message: 'Đăng nhập thành công',
        description: '[user, admin] Đăng nhập',
    })
    async login(@Body() dto: LoginDto) {
        return await this.authService.login(dto);
    }

    @Post('login-store')
    @CustomResponse(LoginStoreResponseDto, {
        code: 201,
        message: 'Đăng nhập thành công',
        description: '[store] Đăng nhập cho tài khoản store',
    })
    @ApiOperation({ summary: '[store] Đăng nhập cho tài khoản store' })
    async loginStore(@Body() dto: LoginDto) {
        return await this.authService.loginStore(dto);
    }

    @Get('logout')
    @CustomResponse('string', {
        code: 200,
        message: 'Đăng xuất thành công',
        description: '[all] Đăng xuất',
    })
    @AllAuth()
    @ApiBearerAuth('refresh-token')
    async logout(@Req() req: Request & { user?: any }) {
        const refreshToken = req.headers['refreshtoken'] as string;
        if (!refreshToken) {
            throw new HttpException('Không tìm thấy refresh token', 400);
        }
        const result = await this.authService.logout(refreshToken);
        return result;
    }

    @Get('refresh-token')
    @CustomResponse(RefreshTokenResponseDto, {
        code: 200,
        message: 'Refresh token thành công',
        description: '[all] Refresh token',
    })
    @ApiBearerAuth('refresh-token')
    async refresh_token(@Req() req: Request & { user?: any }) {
        const refreshToken = req.headers['refreshtoken'] as string;
        if (!refreshToken) {
            throw new HttpException('Không tìm thấy refresh token', 400);
        }
        return await this.authService.refresh_token(refreshToken);
    }

    @Post('change-password')
    @CustomResponse('string', {
        code: 201,
        message: 'Thay đổi mật khẩu thành công',
        description: '[all] Thay đổi mật khẩu',
    })
    @AllAuth()
    async changePassword(
        @Req() req: Request & { user?: any },
        @Body() dto: ChangePasswordDto,
    ) {
        return this.authService.changePassword(req.user.id, dto);
    }

    @Post('must-change-password')
    @CustomResponse('string', {
        code: 201,
        message: 'Bắt buộc thay đổi mật khẩu thành công',
        description: '[all] Bắt buộc thay đổi mật khẩu',
    })
    @AllAuth()
    async mustChangePassword(
        @Req() req: Request & { user?: any },
        @Body() dto: ChangePasswordDto,
    ) {
        return this.authService.mustChangePassword(req.user.id, dto);
    }

    @Post('forgot-password')
    @CustomResponse('string', {
        code: 201,
        message: 'Đã gửi OTP thành công',
        description: '[all] Quên mật khẩu',
    })
    async forgotPassword(@Body() dto: EmailDto, @Query('role') role: string) {
        return this.authService.forgotPassword(dto.email, role);
    }

    @Post('verify-forgot-password')
    @CustomResponse('string', {
        code: 201,
        message: 'Xác thực OTP quên mật khẩu thành công',
        description: '[all] Xác thực OTP quên mật khẩu',
    })
    async verifyForgotPassword(@Body() dto: VerifyForgotPasswordDto) {
        return this.authService.verifyForgotPassword(
            dto.email,
            dto.role,
            dto.otp,
            dto.newPassword,
        );
    }
}
