import { IsEnum, IsInt } from 'class-validator';
import { SkillLevel } from '@prisma/client';

export class AddUserSkillDto {
  @IsInt()
  skillId: number;

  @IsEnum(SkillLevel)
  level: SkillLevel;
}

