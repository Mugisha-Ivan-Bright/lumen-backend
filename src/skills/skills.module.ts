import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  providers: [SkillsService, RolesGuard],
  controllers: [SkillsController],
})
export class SkillsModule {}

