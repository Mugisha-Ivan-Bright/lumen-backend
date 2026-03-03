import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    private readonly emailService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService, emailService: EmailService);
    register(dto: RegisterDto): Promise<{
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
    validateUser(email: string, password: string): Promise<{
        name: string;
        email: string;
        password: string;
        avatar: string | null;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
        role: import(".prisma/client").$Enums.UserRole;
        is_verified: boolean;
        verification_token: string | null;
        verification_token_expires: Date | null;
        reset_password_token: string | null;
        reset_password_expires: Date | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    }>;
    login(dto: LoginDto): Promise<{
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
    private generateTokens;
    me(userId: number): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
        role: import(".prisma/client").$Enums.UserRole;
        is_verified: boolean;
        created_at: Date;
        id: number;
    } | null>;
    refreshToken(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendVerificationEmail(email: string): Promise<{
        message: string;
    }>;
    logout(): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map