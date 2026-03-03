import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AdvisoriesService } from './advisories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class AdvisoriesController {
  constructor(private readonly advisoriesService: AdvisoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('advisories')
  create(
    @Req() req: any,
    @Body('content') content: string,
    @Body('projectId') projectId?: number,
  ) {
    return this.advisoriesService.create(req.user.userId, content, projectId);
  }

  @Get('users/:id/advisories')
  getUserAdvisories(@Param('id', ParseIntPipe) id: number) {
    return this.advisoriesService.getUserAdvisories(id);
  }
}

