import { UsersService } from './users.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateAvailabilityDto } from './dtos/update-availability.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AddUserSkillDto } from './dtos/add-user-skill.dto';
import { UpdateUserSkillDto } from './dtos/update-user-skill.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class UsersController {
    private readonly usersService;
    private readonly cloudinaryService;
    constructor(usersService: UsersService, cloudinaryService: CloudinaryService);
    getTalent(): Promise<{
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
    getUser(id: number): Promise<{
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
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        id: number;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    updateAvailability(req: any, id: number, dto: UpdateAvailabilityDto): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        id: number;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
    }>;
    updateAvatar(req: any, id: number, file: Express.Multer.File): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        id: number;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    addSkill(req: any, dto: AddUserSkillDto): Promise<{
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number;
        level: import(".prisma/client").$Enums.SkillLevel;
    }>;
    getUserSkills(id: number): import(".prisma/client").Prisma.PrismaPromise<({
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
    updateUserSkill(req: any, skillId: number, dto: UpdateUserSkillDto): Promise<{
        userId: number;
        created_at: Date;
        id: number;
        updated_at: Date;
        skillId: number;
        level: import(".prisma/client").$Enums.SkillLevel;
    }>;
    deleteUserSkill(req: any, skillId: number): Promise<{
        message: string;
    }>;
    changePassword(req: any, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=users.controller.d.ts.map