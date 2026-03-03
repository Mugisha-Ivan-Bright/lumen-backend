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

  async sendEmailVerifiedEmail(to: string, name: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject: 'Your LUMEN account is verified',
      html: `
        <p>Hi ${name},</p>
        <p>Your email has been successfully verified. Welcome fully to LUMEN!</p>
        <p>You can now apply for jobs, collaborate on projects, and receive notifications.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error('Failed to send email verified email', error as Error);
    }
  }

  async sendWelcomeEmail(to: string, name: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject: 'Welcome to LUMEN',
      html: `
        <p>Hi ${name},</p>
        <p>Welcome to LUMEN – your space to showcase skills, collaborate on projects, and get discovered.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error('Failed to send welcome email', error as Error);
    }
  }

  async sendJobApplicationReceivedEmail(to: string, jobTitle: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject: `Application received for ${jobTitle}`,
      html: `
        <p>We have received your application for <strong>${jobTitle}</strong>.</p>
        <p>You will be notified when the recruiter updates your application status.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error('Failed to send job application received email', error as Error);
    }
  }

  async sendJobStatusChangedEmail(to: string, jobTitle: string, status: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject: `Your application status for ${jobTitle} is now ${status}`,
      html: `
        <p>Your application for <strong>${jobTitle}</strong> has been updated to: <strong>${status}</strong>.</p>
        <p>Log into LUMEN to see more details.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error('Failed to send job status changed email', error as Error);
    }
  }

  async sendNewJobForSkillEmail(to: string, skillName: string, jobTitle: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject: `New ${skillName} opportunity: ${jobTitle}`,
      html: `
        <p>A new job that matches your skill <strong>${skillName}</strong> has been posted: <strong>${jobTitle}</strong>.</p>
        <p>Visit LUMEN to review and apply.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error('Failed to send new job for skill email', error as Error);
    }
  }

  async sendCommentReceivedEmail(to: string, projectTitle: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject: `New comment on your project "${projectTitle}"`,
      html: `
        <p>Your project <strong>${projectTitle}</strong> has received a new comment.</p>
        <p>Check the project discussion in LUMEN.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error('Failed to send comment received email', error as Error);
    }
  }

  async sendContributionUpgradedEmail(to: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject: 'Your LUMEN contributions just increased',
      html: `
        <p>Nice work! Your contributions on LUMEN have just increased.</p>
        <p>Keep collaborating, advising, and building projects to grow your impact.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error('Failed to send contribution upgraded email', error as Error);
    }
  }

  async sendSkillAddedEmail(to: string, skillName: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to,
      subject: `New skill added: ${skillName}`,
      html: `
        <p>You have added a new skill: <strong>${skillName}</strong>.</p>
        <p>Recruiters can now discover you for this skill on LUMEN.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error('Failed to send skill added email', error as Error);
    }
  }
}

