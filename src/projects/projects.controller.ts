import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateProjectDto) {
    return this.projectsService.createProject(req.user.userId, dto);
  }

  @Get()
  getAll() {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getProjectById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(req.user.userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.projectsService.deleteProject(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  join(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.projectsService.joinProject(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/invite')
  invite(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.projectsService.inviteToProject(id, req.user.userId, userId);
  }

  @Get(':id/members')
  members(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getMembers(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comment')
  comment(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.projectsService.addComment(req.user.userId, id, dto);
  }

  @Get(':id/comments')
  comments(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getComments(id);
  }
}

