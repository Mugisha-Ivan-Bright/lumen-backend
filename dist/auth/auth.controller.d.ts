import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ResendVerificationDto } from './dtos/resend-verification.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            name: string;
            email: string;
            avatar: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            is_verified: boolean;
        };
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            name: string;
            email: string;
            avatar: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            is_verified: boolean;
        };
    }>;
    me(req: any): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        created_at: Date;
        id: number;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
        role: import(".prisma/client").$Enums.UserRole;
        is_verified: boolean;
    } | null>;
    refresh(req: Request, refreshToken: string, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendVerification(dto: ResendVerificationDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map