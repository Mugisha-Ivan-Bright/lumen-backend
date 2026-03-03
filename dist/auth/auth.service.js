"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const email_service_1 = require("../email/email.service");
const notifications_service_1 = require("../notifications/notifications.service");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService, emailService, notificationsService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.emailService = emailService;
        this.notificationsService = notificationsService;
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existing) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const hashed = await bcrypt.hash(dto.password, 10);
        const verificationToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
        const created = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashed,
                avatar: dto.avatar,
                verification_token: verificationToken,
                verification_token_expires: expiry,
            },
        });
        await this.emailService.sendVerificationEmail(created.email, verificationToken);
        await this.notificationsService.createNotification(created.id, client_1.NotificationType.EMAIL_VERIFICATION_SENT, 'Verify your email', 'Please verify your email address to activate your LUMEN account.');
        const user = {
            id: created.id,
            name: created.name,
            email: created.email,
            avatar: created.avatar,
            role: created.role,
            is_verified: created.is_verified,
        };
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        return Object.assign({ user }, tokens);
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async login(dto) {
        var _a;
        const user = await this.validateUser(dto.email, dto.password);
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: (_a = user.avatar) !== null && _a !== void 0 ? _a : null,
            role: user.role,
            is_verified: user.is_verified,
        };
        return Object.assign({ user: safeUser }, tokens);
    }
    async generateTokens(userId, email, role) {
        var _a, _b, _c, _d;
        const payload = { sub: userId, email, role };
        const accessSecret = (_a = this.configService.get('JWT_SECRET')) !== null && _a !== void 0 ? _a : 'dev_jwt_secret';
        const accessExpiresConfig = (_b = this.configService.get('JWT_EXPIRES_IN')) !== null && _b !== void 0 ? _b : '15m';
        const refreshSecret = (_c = this.configService.get('JWT_REFRESH_SECRET')) !== null && _c !== void 0 ? _c : 'dev_jwt_refresh_secret';
        const refreshExpiresConfig = (_d = this.configService.get('JWT_REFRESH_EXPIRES_IN')) !== null && _d !== void 0 ? _d : '7d';
        const accessOptions = {
            secret: accessSecret,
            expiresIn: accessExpiresConfig,
        };
        const refreshOptions = {
            secret: refreshSecret,
            expiresIn: refreshExpiresConfig,
        };
        const accessToken = await this.jwtService.signAsync(payload, accessOptions);
        const refreshToken = await this.jwtService.signAsync(payload, refreshOptions);
        return {
            accessToken,
            refreshToken,
        };
    }
    async me(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                role: true,
                is_verified: true,
                availability_status: true,
                created_at: true,
            },
        });
    }
    async refreshToken(token) {
        var _a;
        try {
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: (_a = this.configService.get('JWT_REFRESH_SECRET')) !== null && _a !== void 0 ? _a : 'dev_jwt_refresh_secret',
            });
            return this.generateTokens(decoded.sub, decoded.email, decoded.role);
        }
        catch (_b) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async verifyEmail(token) {
        const user = await this.prisma.user.findFirst({
            where: {
                verification_token: token,
                verification_token_expires: {
                    gt: new Date(),
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired verification token');
        }
        const updated = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                is_verified: true,
                verification_token: null,
                verification_token_expires: null,
            },
        });
        await this.notificationsService.createNotification(updated.id, client_1.NotificationType.EMAIL_VERIFIED, 'Email verified', 'Your email has been successfully verified.');
        await this.notificationsService.createNotification(updated.id, client_1.NotificationType.WELCOME, 'Welcome to LUMEN', 'Your account is now fully active. Start exploring projects, skills, and jobs.');
        const emailAllowed = await this.notificationsService.isEmailEnabled(updated.id);
        if (emailAllowed) {
            await this.emailService.sendEmailVerifiedEmail(updated.email, updated.name);
            await this.emailService.sendWelcomeEmail(updated.email, updated.name);
        }
        return { message: 'Email verified successfully' };
    }
    async resendVerificationEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.is_verified) {
            throw new common_1.BadRequestException('User is already verified');
        }
        const verificationToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                verification_token: verificationToken,
                verification_token_expires: expiry,
            },
        });
        await this.emailService.sendVerificationEmail(user.email, verificationToken);
        return { message: 'Verification email resent' };
    }
    async logout() {
        return { message: 'Logged out' };
    }
    async forgotPassword(dto) {
        var _a;
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            return { message: 'If that email exists, a reset link has been sent' };
        }
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        const expires = new Date(Date.now() + 1000 * 60 * 60);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                reset_password_token: token,
                reset_password_expires: expires,
            },
        });
        const appUrl = (_a = this.configService.get('APP_URL')) !== null && _a !== void 0 ? _a : 'http://localhost:3000';
        const resetUrl = `${appUrl}/reset-password?token=${token}`;
        await this.emailService.sendPasswordResetEmail(user.email, resetUrl);
        return { message: 'If that email exists, a reset link has been sent' };
    }
    async resetPassword(dto) {
        const user = await this.prisma.user.findFirst({
            where: {
                reset_password_token: dto.token,
                reset_password_expires: {
                    gt: new Date(),
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        const hashed = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashed,
                reset_password_token: null,
                reset_password_expires: null,
            },
        });
        return { message: 'Password updated successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        email_service_1.EmailService,
        notifications_service_1.NotificationsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map