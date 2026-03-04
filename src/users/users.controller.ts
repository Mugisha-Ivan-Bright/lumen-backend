import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateAvailabilityDto } from './dtos/update-availability.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddUserSkillDto } from './dtos/add-user-skill.dto';
import { UpdateUserSkillDto } from './dtos/update-user-skill.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  @Get('talent')
  getTalent() {
    return this.usersService.getTalentList();
  }

  @Get('talent/:id')
  getTalentById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getTalentById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('users/profile')
  updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id/availability')
  updateAvailability(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAvailabilityDto,
  ) {
    return this.usersService.updateAvailability(req.user.userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const uploadResult = await this.cloudinaryService.uploadBuffer(
      file.buffer,
      'lumen/avatars',
    );
    return this.usersService.updateAvatar(req.user.userId, id, uploadResult.secure_url);
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/skills')
  addSkill(@Req() req: any, @Body() dto: AddUserSkillDto) {
    return this.usersService.addUserSkill(req.user.userId, dto);
  }

  @Get('users/:id/skills')
  getUserSkills(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserSkills(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/skills/:skillId')
  updateUserSkill(
    @Req() req: any,
    @Param('skillId', ParseIntPipe) skillId: number,
    @Body() dto: UpdateUserSkillDto,
  ) {
    return this.usersService.updateUserSkill(req.user.userId, skillId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/skills/:skillId')
  deleteUserSkill(@Req() req: any, @Param('skillId', ParseIntPipe) skillId: number) {
    return this.usersService.deleteUserSkill(req.user.userId, skillId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/password')
  changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(req.user.userId, dto);
  }
}

