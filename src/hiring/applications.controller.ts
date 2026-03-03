import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApplyJobDto } from './dtos/apply-job.dto';
import { UpdateApplicationStatusDto } from './dtos/update-application-status.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller()
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('jobs/:id/apply')
  @UseInterceptors(FileInterceptor('file'))
  async applyToJob(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ApplyJobDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let cvUrl: string | undefined;
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadBuffer(
        file.buffer,
        'lumen/cvs',
      );
      cvUrl = uploadResult.secure_url;
    }
    return this.applicationsService.applyToJob(
      req.user.userId,
      id,
      dto.cover_letter,
      cvUrl,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/applications')
  getMyApplications(@Req() req: any) {
    return this.applicationsService.getMyApplications(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recruiter')
  @Get('jobs/:id/applications')
  getJobApplications(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.getJobApplications(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('recruiter')
  @Patch('applications/:id/status')
  updateStatus(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    return this.applicationsService.updateApplicationStatus(
      req.user.userId,
      id,
      dto.status,
    );
  }
}

