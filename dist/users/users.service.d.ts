import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateAvailabilityDto } from './dtos/update-availability.dto';
import { AddUserSkillDto } from './dtos/add-user-skill.dto';
import { UpdateUserSkillDto } from './dtos/update-user-skill.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTalentList(): Promise<{
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        avatar: string | null;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
    }[]>;
    getTalentById(id: number): Promise<{
        created_at: Date;
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        avatar: string | null;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
    }>;
    getUserById(id: number): Promise<{
        created_at: Date;
        updated_at: Date;
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        password: string;
        avatar: string | null;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
        is_verified: boolean;
        verification_token: string | null;
        verification_token_expires: Date | null;
        reset_password_token: string | null;
        reset_password_expires: Date | null;
    }>;
    updateProfile(userId: number, dto: UpdateProfileDto): Promise<{
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        avatar: string | null;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
    }>;
    updateAvailability(requestingUserId: number, targetUserId: number, dto: UpdateAvailabilityDto): Promise<{
        id: number;
        name: string;
        email: string;
        avatar: string | null;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
    }>;
    updateAvatar(userId: number, targetUserId: number, avatarUrl: string): Promise<{
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        avatar: string | null;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
    }>;
    addUserSkill(userId: number, dto: AddUserSkillDto): Promise<{
        userId: number;
        created_at: Date;
        updated_at: Date;
        id: number;
        skillId: number;
        level: import(".prisma/client").$Enums.SkillLevel;
    }>;
    getUserSkills(userId: number): import(".prisma/client").Prisma.PrismaPromise<({
        skill: {
            created_at: Date;
            updated_at: Date;
            id: number;
            name: string;
            description: string | null;
        };
    } & {
        userId: number;
        created_at: Date;
        updated_at: Date;
        id: number;
        skillId: number;
        level: import(".prisma/client").$Enums.SkillLevel;
    })[]>;
    updateUserSkill(userId: number, skillId: number, dto: UpdateUserSkillDto): Promise<{
        userId: number;
        created_at: Date;
        updated_at: Date;
        id: number;
        skillId: number;
        level: import(".prisma/client").$Enums.SkillLevel;
    }>;
    deleteUserSkill(userId: number, skillId: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=users.service.d.ts.map