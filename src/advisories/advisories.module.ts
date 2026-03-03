import { Module } from '@nestjs/common';
import { AdvisoriesService } from './advisories.service';
import { AdvisoriesController } from './advisories.controller';

@Module({
  providers: [AdvisoriesService],
  controllers: [AdvisoriesController],
})
export class AdvisoriesModule {}

