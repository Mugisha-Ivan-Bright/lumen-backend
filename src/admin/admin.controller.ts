import {
    Controller,
    Get,
    Patch,
    Delete,
    Param,
    Body,
    Query,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('users')
    async getUsers(
        @Query('role') role?: string,
        @Query('status') status?: string,
        @Query('search') search?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.adminService.getUsers({
            role,
            status,
            search,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }

    @Get('users/:id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        return this.adminService.getUserById(id);
    }

    @Patch('users/:id/role')
    async updateUserRole(
        @Param('id', ParseIntPipe) id: number,
        @Body('role') role: string,
    ) {
        return this.adminService.updateUserRole(id, role);
    }

    @Patch('users/:id/status')
    async updateUserStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status') status: string,
        @Body('reason') reason?: string,
    ) {
        return this.adminService.updateUserStatus(id, status, reason);
    }

    @Get('analytics')
    async getAnalytics(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.adminService.getAnalytics(startDate, endDate);
    }

    @Get('activity-logs')
    async getActivityLogs(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.adminService.getActivityLogs(
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 50,
        );
    }
}
