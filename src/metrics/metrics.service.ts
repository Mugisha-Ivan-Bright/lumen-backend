import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MetricsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserStats(userId: number) {
    const projectsCount = await this.prisma.project.count({
      where: { createdById: userId },
    });

    const skillsCount = await this.prisma.userSkill.count({
      where: { userId },
    });

    const advisoriesCount = await this.prisma.advisory.count({
      where: { userId },
    });

    return {
      userId,
      total_projects: projectsCount,
      total_skills: skillsCount,
      total_advisories: advisoriesCount,
    };
  }
}

