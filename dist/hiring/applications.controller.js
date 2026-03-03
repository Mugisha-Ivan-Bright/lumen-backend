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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const applications_service_1 = require("./applications.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const apply_job_dto_1 = require("./dtos/apply-job.dto");
const update_application_status_dto_1 = require("./dtos/update-application-status.dto");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let ApplicationsController = class ApplicationsController {
    constructor(applicationsService, cloudinaryService) {
        this.applicationsService = applicationsService;
        this.cloudinaryService = cloudinaryService;
    }
    async applyToJob(req, id, dto, file) {
        let cvUrl;
        if (file) {
            const uploadResult = await this.cloudinaryService.uploadBuffer(file.buffer, 'lumen/cvs');
            cvUrl = uploadResult.secure_url;
        }
        return this.applicationsService.applyToJob(req.user.userId, id, dto.cover_letter, cvUrl);
    }
    getMyApplications(req) {
        return this.applicationsService.getMyApplications(req.user.userId);
    }
    getJobApplications(req, id) {
        return this.applicationsService.getJobApplications(req.user.userId, id);
    }
    updateStatus(req, id, dto) {
        return this.applicationsService.updateApplicationStatus(req.user.userId, id, dto.status);
    }
};
exports.ApplicationsController = ApplicationsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('jobs/:id/apply'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, apply_job_dto_1.ApplyJobDto, Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "applyToJob", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me/applications'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "getMyApplications", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('recruiter'),
    (0, common_1.Get)('jobs/:id/applications'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "getJobApplications", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('recruiter'),
    (0, common_1.Patch)('applications/:id/status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_application_status_dto_1.UpdateApplicationStatusDto]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "updateStatus", null);
exports.ApplicationsController = ApplicationsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService,
        cloudinary_service_1.CloudinaryService])
], ApplicationsController);
//# sourceMappingURL=applications.controller.js.map