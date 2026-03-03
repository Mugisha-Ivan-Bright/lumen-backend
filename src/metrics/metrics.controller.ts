import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('users')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get(':id/stats')
  getUserStats(@Param('id', ParseIntPipe) id: number) {
    return this.metricsService.getUserStats(id);
  }
}

