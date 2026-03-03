import { ConfigService } from '@nestjs/config';
import { UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    private readonly configService;
    constructor(configService: ConfigService);
    uploadBuffer(buffer: Buffer, folder: string): Promise<UploadApiResponse>;
}
//# sourceMappingURL=cloudinary.service.d.ts.map