"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createProject(ownerId, dto) {
        return this.prisma.project.create({
            data: {
                title: dto.title,
                description: dto.description,
                createdById: ownerId,
                skillId: dto.skillId,
                members: {
                    create: {
                        userId: ownerId,
                        role: 'admin',
                    },
                },
            },
        });
    }
    getProjects() {
        return this.prisma.project.findMany({
            include: {
                created_by: true,
                skill: true,
            },
        });
    }
    async getProjectById(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                created_by: true,
                skill: true,
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        return project;
    }
    async updateProject(userId, projectId, dto) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        if (project.createdById !== userId) {
            throw new common_1.ForbiddenException('Only owner can update project');
        }
        return this.prisma.project.update({
            where: { id: projectId },
            data: {
                title: dto.title,
                description: dto.description,
                status: dto.status,
            },
        });
    }
    async deleteProject(userId, projectId) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        if (project.createdById !== userId) {
            throw new common_1.ForbiddenException('Only owner can delete project');
        }
        await this.prisma.project.delete({ where: { id: projectId } });
        return { message: 'Project deleted' };
    }
    async joinProject(userId, projectId) {
        const existing = await this.prisma.projectMember.findFirst({
            where: { projectId, userId },
        });
        if (!existing) {
            await this.prisma.projectMember.create({
                data: { projectId, userId },
            });
        }
        return { message: 'Joined project' };
    }
    async inviteToProject(projectId, inviterId, inviteeId) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project || project.createdById !== inviterId) {
            throw new common_1.ForbiddenException('Only owner can invite');
        }
        const existing = await this.prisma.projectMember.findFirst({
            where: { projectId, userId: inviteeId },
        });
        if (!existing) {
            await this.prisma.projectMember.create({
                data: { projectId, userId: inviteeId },
            });
        }
        return { message: 'User invited to project' };
    }
    getMembers(projectId) {
        return this.prisma.projectMember.findMany({
            where: { projectId },
            include: {
                user: true,
            },
        });
    }
    addComment(userId, projectId, dto) {
        return this.prisma.projectComment.create({
            data: {
                projectId,
                userId,
                content: dto.content,
            },
        });
    }
    getComments(projectId) {
        return this.prisma.projectComment.findMany({
            where: { projectId },
            include: {
                user: true,
            },
        });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map