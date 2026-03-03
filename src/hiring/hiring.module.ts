import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { EmailModule } from '../email/email.module';
@Module({
  imports: [CloudinaryModule, EmailModule],
  providers: [JobsService, ApplicationsService],
  controllers: [JobsController, ApplicationsController],
})
export class HiringModule {}

