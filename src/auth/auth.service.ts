import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { EmailService } from '../email/email.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const verificationToken = randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

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
    await this.notificationsService.createNotification(
      created.id,
      NotificationType.EMAIL_VERIFICATION_SENT,
      'Verify your email',
      'Please verify your email address to activate your LUMEN account.',
    );

    const user = {
      id: created.id,
      name: created.name,
      email: created.email,
      avatar: created.avatar,
      role: created.role,
      is_verified: created.is_verified,
    };

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user,
      ...tokens,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar ?? null,
      role: user.role,
      is_verified: user.is_verified,
    };

    return {
      user: safeUser,
      ...tokens,
    };
  }

  private async generateTokens(userId: number, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const accessSecret =
      this.configService.get<string>('JWT_SECRET') ?? 'dev_jwt_secret';
    const accessExpiresConfig =
      this.configService.get<string>('JWT_EXPIRES_IN') ?? '15m';

    const refreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET') ??
      'dev_jwt_refresh_secret';
    const refreshExpiresConfig =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d';

    const accessOptions: JwtSignOptions = {
      secret: accessSecret,
      expiresIn: accessExpiresConfig as JwtSignOptions['expiresIn'],
    };

    const refreshOptions: JwtSignOptions = {
      secret: refreshSecret,
      expiresIn: refreshExpiresConfig as JwtSignOptions['expiresIn'],
    };

    const accessToken = await this.jwtService.signAsync(payload, accessOptions);
    const refreshToken = await this.jwtService.signAsync(payload, refreshOptions);

    return {
      accessToken,
      refreshToken,
    };
  }

  async me(userId: number) {
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

  async refreshToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ?? 'dev_jwt_refresh_secret',
      });
      return this.generateTokens(decoded.sub, decoded.email, decoded.role);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        verification_token: token,
        verification_token_expires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        is_verified: true,
        verification_token: null,
        verification_token_expires: null,
      },
    });

    // In-app notifications (respect user in-app prefs)
    await this.notificationsService.createNotification(
      updated.id,
      NotificationType.EMAIL_VERIFIED,
      'Email verified',
      'Your email has been successfully verified.',
    );
    await this.notificationsService.createNotification(
      updated.id,
      NotificationType.WELCOME,
      'Welcome to LUMEN',
      'Your account is now fully active. Start exploring projects, skills, and jobs.',
    );

    // Emails (respect email prefs and snooze)
    const emailAllowed = await this.notificationsService.isEmailEnabled(updated.id);
    if (emailAllowed) {
      await this.emailService.sendEmailVerifiedEmail(updated.email, updated.name);
      await this.emailService.sendWelcomeEmail(updated.email, updated.name);
    }

    return { message: 'Email verified successfully' };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.is_verified) {
      throw new BadRequestException('User is already verified');
    }

    const verificationToken = randomBytes(32).toString('hex');
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

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      // Do not reveal whether user exists
      return { message: 'If that email exists, a reset link has been sent' };
    }

    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1h

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        reset_password_token: token,
        reset_password_expires: expires,
      },
    });

    const appUrl = this.configService.get<string>('APP_URL') ?? 'http://localhost:3000';
    const resetUrl = `${appUrl}/reset-password?token=${token}`;

    await this.emailService.sendPasswordResetEmail(user.email, resetUrl);

    return { message: 'If that email exists, a reset link has been sent' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        reset_password_token: dto.token,
        reset_password_expires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
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
}

