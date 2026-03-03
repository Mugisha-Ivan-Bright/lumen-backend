import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT') ?? 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendVerificationEmail(to: string, token: string) {
    const appUrl = this.configService.get<string>('APP_URL') ?? 'http://localhost:3000';
    const verifyUrl = `${appUrl}/api/auth/verify-email?token=${token}`;

    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject: 'Verify your LUMEN account',
      html: `
        <p>Welcome to LUMEN!</p>
        <p>Please verify your email by clicking the link below:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
        <p>If you did not create this account, you can ignore this email.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error('Failed to send verification email', error as Error);
    }
  }

  async sendPasswordResetEmail(to: string, resetUrl: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject: 'Reset your LUMEN password',
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to set a new password:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error('Failed to send password reset email', error as Error);
    }
  }
}

