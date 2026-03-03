import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.skill.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getById(id: number) {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    return skill;
  }

  create(name: string, description?: string) {
    return this.prisma.skill.create({
      data: { name, description },
    });
  }

  async remove(id: number) {
    await this.prisma.skill.delete({ where: { id } });
    return { message: 'Skill deleted' };
  }
}

