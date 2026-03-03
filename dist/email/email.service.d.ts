import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    sendVerificationEmail(to: string, token: string): Promise<void>;
    sendPasswordResetEmail(to: string, resetUrl: string): Promise<void>;
}
//# sourceMappingURL=email.service.d.ts.map