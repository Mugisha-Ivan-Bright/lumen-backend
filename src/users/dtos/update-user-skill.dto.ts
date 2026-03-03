import { IsEnum } from 'class-validator';
import { SkillLevel } from '@prisma/client';

export class UpdateUserSkillDto {
  @IsEnum(SkillLevel)
  level: SkillLevel;
}

