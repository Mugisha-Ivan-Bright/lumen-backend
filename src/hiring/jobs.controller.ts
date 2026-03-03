import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  listJobs(
    @Query('skillId') skillId?: string,
    @Query('location') location?: string,
    @Query('employment_type') employment_type?: string,
  ) {
    return this.jobsService.getPublicJobs({
      skillId: skillId ? Number(skillId) : undefined,
      location,
      employment_type,
    });
  }

  @Get(':id')
  getJob(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.getJobById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recruiter')
  @Post()
  createJob(@Req() req: any, @Body() dto: CreateJobDto) {
    return this.jobsService.createJob(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recruiter')
  @Get('my/list')
  myJobs(@Req() req: any) {
    return this.jobsService.getMyJobs(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recruiter')
  @Patch(':id')
  updateJob(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateJobDto,
  ) {
    return this.jobsService.updateJob(req.user.userId, id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recruiter')
  @Delete(':id')
  deleteJob(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.jobsService.deleteJob(req.user.userId, id);
  }
}

