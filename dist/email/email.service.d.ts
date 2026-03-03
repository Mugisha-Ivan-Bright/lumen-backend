import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    sendVerificationEmail(to: string, token: string): Promise<void>;
    sendPasswordResetEmail(to: string, resetUrl: string): Promise<void>;
    sendEmailVerifiedEmail(to: string, name: string): Promise<void>;
    sendWelcomeEmail(to: string, name: string): Promise<void>;
    sendJobApplicationReceivedEmail(to: string, jobTitle: string): Promise<void>;
    sendJobStatusChangedEmail(to: string, jobTitle: string, status: string): Promise<void>;
    sendNewJobForSkillEmail(to: string, skillName: string, jobTitle: string): Promise<void>;
    sendCommentReceivedEmail(to: string, projectTitle: string): Promise<void>;
    sendContributionUpgradedEmail(to: string): Promise<void>;
    sendSkillAddedEmail(to: string, skillName: string): Promise<void>;
}
//# sourceMappingURL=email.service.d.ts.map