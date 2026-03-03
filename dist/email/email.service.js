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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = EmailService_1 = class EmailService {
    constructor(configService) {
        var _a;
        this.configService = configService;
        this.logger = new common_1.Logger(EmailService_1.name);
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: (_a = this.configService.get('SMTP_PORT')) !== null && _a !== void 0 ? _a : 587,
            secure: false,
            auth: {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASS'),
            },
        });
    }
    async sendVerificationEmail(to, token) {
        var _a;
        const appUrl = (_a = this.configService.get('APP_URL')) !== null && _a !== void 0 ? _a : 'http://localhost:3000';
        const verifyUrl = `${appUrl}/api/auth/verify-email?token=${token}`;
        const mailOptions = {
            from: this.configService.get('SMTP_USER'),
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
        }
        catch (error) {
            this.logger.error('Failed to send verification email', error);
        }
    }
    async sendPasswordResetEmail(to, resetUrl) {
        const mailOptions = {
            from: this.configService.get('SMTP_USER'),
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
        }
        catch (error) {
            this.logger.error('Failed to send password reset email', error);
        }
    }
    async sendEmailVerifiedEmail(to, name) {
        const mailOptions = {
            from: this.configService.get('SMTP_USER'),
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
        }
        catch (error) {
            this.logger.error('Failed to send email verified email', error);
        }
    }
    async sendWelcomeEmail(to, name) {
        const mailOptions = {
            from: this.configService.get('SMTP_USER'),
            to,
            subject: 'Welcome to LUMEN',
            html: `
        <p>Hi ${name},</p>
        <p>Welcome to LUMEN – your space to showcase skills, collaborate on projects, and get discovered.</p>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            this.logger.error('Failed to send welcome email', error);
        }
    }
    async sendJobApplicationReceivedEmail(to, jobTitle) {
        const mailOptions = {
            from: this.configService.get('SMTP_USER'),
            to,
            subject: `Application received for ${jobTitle}`,
            html: `
        <p>We have received your application for <strong>${jobTitle}</strong>.</p>
        <p>You will be notified when the recruiter updates your application status.</p>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            this.logger.error('Failed to send job application received email', error);
        }
    }
    async sendJobStatusChangedEmail(to, jobTitle, status) {
        const mailOptions = {
            from: this.configService.get('SMTP_USER'),
            to,
            subject: `Your application status for ${jobTitle} is now ${status}`,
            html: `
        <p>Your application for <strong>${jobTitle}</strong> has been updated to: <strong>${status}</strong>.</p>
        <p>Log into LUMEN to see more details.</p>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            this.logger.error('Failed to send job status changed email', error);
        }
    }
    async sendNewJobForSkillEmail(to, skillName, jobTitle) {
        const mailOptions = {
            from: this.configService.get('SMTP_USER'),
            to,
            subject: `New ${skillName} opportunity: ${jobTitle}`,
            html: `
        <p>A new job that matches your skill <strong>${skillName}</strong> has been posted: <strong>${jobTitle}</strong>.</p>
        <p>Visit LUMEN to review and apply.</p>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            this.logger.error('Failed to send new job for skill email', error);
        }
    }
    async sendCommentReceivedEmail(to, projectTitle) {
        const mailOptions = {
            from: this.configService.get('SMTP_USER'),
            to,
            subject: `New comment on your project "${projectTitle}"`,
            html: `
        <p>Your project <strong>${projectTitle}</strong> has received a new comment.</p>
        <p>Check the project discussion in LUMEN.</p>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            this.logger.error('Failed to send comment received email', error);
        }
    }
    async sendContributionUpgradedEmail(to) {
        const mailOptions = {
            from: this.configService.get('SMTP_USER'),
            to,
            subject: 'Your LUMEN contributions just increased',
            html: `
        <p>Nice work! Your contributions on LUMEN have just increased.</p>
        <p>Keep collaborating, advising, and building projects to grow your impact.</p>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            this.logger.error('Failed to send contribution upgraded email', error);
        }
    }
    async sendSkillAddedEmail(to, skillName) {
        const mailOptions = {
            from: this.configService.get('SMTP_USER'),
            to,
            subject: `New skill added: ${skillName}`,
            html: `
        <p>You have added a new skill: <strong>${skillName}</strong>.</p>
        <p>Recruiters can now discover you for this skill on LUMEN.</p>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            this.logger.error('Failed to send skill added email', error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map