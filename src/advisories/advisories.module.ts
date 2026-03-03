import { Module } from '@nestjs/common';
import { AdvisoriesService } from './advisories.service';
import { AdvisoriesController } from './advisories.controller';
import { EmailModule } from '../email/email.module';
@Module({
  providers: [AdvisoriesService],
  controllers: [AdvisoriesController],
  imports: [EmailModule],
})
export class AdvisoriesModule {}

