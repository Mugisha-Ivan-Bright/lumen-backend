import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateAvailabilityDto } from './dtos/update-availability.dto';
import { AddUserSkillDto } from './dtos/add-user-skill.dto';
import { UpdateUserSkillDto } from './dtos/update-user-skill.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../email/email.service';
export declare class UsersService {
    private readonly prisma;
    private readonly notificationsService;
    private readonly emailService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, emailService: EmailService);
    getTalentList(): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        id: number;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
        role: import(".prisma/client").$Enums.UserRole;
    }[]>;
    getTalentById(id: number): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        created_at: Date;
        id: number;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    getUserById(id: number): Promise<{
        name: string;
        email: string;
        password: string;
        avatar: string | null;
        created_at: Date;
        id: number;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
        role: import(".prisma/client").$Enums.UserRole;
        is_verified: boolean;
        verification_token: string | null;
        verification_token_expires: Date | null;
        reset_password_token: string | null;
        reset_password_expires: Date | null;
        updated_at: Date;
    }>;
    updateProfile(userId: number, dto: UpdateProfileDto): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        id: number;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    updateAvailability(requestingUserId: number, targetUserId: number, dto: UpdateAvailabilityDto): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        id: number;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
    }>;
    updateAvatar(userId: number, targetUserId: number, avatarUrl: string): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        id: number;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    addUserSkill(userId: number, dto: AddUserSkillDto): Promise<{
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number;
        level: import(".prisma/client").$Enums.SkillLevel;
    }>;
    getUserSkills(userId: number): import(".prisma/client").Prisma.PrismaPromise<({
        skill: {
            name: string;
            description: string | null;
            created_at: Date;
            id: number;
            updated_at: Date;
        };
    } & {
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number;
        level: import(".prisma/client").$Enums.SkillLevel;
    })[]>;
    updateUserSkill(userId: number, skillId: number, dto: UpdateUserSkillDto): Promise<{
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number;
        level: import(".prisma/client").$Enums.SkillLevel;
    }>;
    deleteUserSkill(userId: number, skillId: number): Promise<{
        message: string;
    }>;
    changePassword(userId: number, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=users.service.d.ts.map