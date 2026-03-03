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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const update_profile_dto_1 = require("./dtos/update-profile.dto");
const update_availability_dto_1 = require("./dtos/update-availability.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const add_user_skill_dto_1 = require("./dtos/add-user-skill.dto");
const update_user_skill_dto_1 = require("./dtos/update-user-skill.dto");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let UsersController = class UsersController {
    constructor(usersService, cloudinaryService) {
        this.usersService = usersService;
        this.cloudinaryService = cloudinaryService;
    }
    getTalent() {
        return this.usersService.getTalentList();
    }
    getTalentById(id) {
        return this.usersService.getTalentById(id);
    }
    getUser(id) {
        return this.usersService.getUserById(id);
    }
    updateProfile(req, dto) {
        return this.usersService.updateProfile(req.user.userId, dto);
    }
    updateAvailability(req, id, dto) {
        return this.usersService.updateAvailability(req.user.userId, id, dto);
    }
    async updateAvatar(req, id, file) {
        const uploadResult = await this.cloudinaryService.uploadBuffer(file.buffer, 'lumen/avatars');
        return this.usersService.updateAvatar(req.user.userId, id, uploadResult.secure_url);
    }
    addSkill(req, dto) {
        return this.usersService.addUserSkill(req.user.userId, dto);
    }
    getUserSkills(id) {
        return this.usersService.getUserSkills(id);
    }
    updateUserSkill(req, skillId, dto) {
        return this.usersService.updateUserSkill(req.user.userId, skillId, dto);
    }
    deleteUserSkill(req, skillId) {
        return this.usersService.deleteUserSkill(req.user.userId, skillId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('talent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getTalent", null);
__decorate([
    (0, common_1.Get)('talent/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getTalentById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('users/profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('users/:id/availability'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_availability_dto_1.UpdateAvailabilityDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateAvailability", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('users/:id/avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('users/skills'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_user_skill_dto_1.AddUserSkillDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addSkill", null);
__decorate([
    (0, common_1.Get)('users/:id/skills'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserSkills", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('users/skills/:skillId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('skillId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_user_skill_dto_1.UpdateUserSkillDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUserSkill", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('users/skills/:skillId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('skillId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUserSkill", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        cloudinary_service_1.CloudinaryService])
], UsersController);
//# sourceMappingURL=users.controller.js.map