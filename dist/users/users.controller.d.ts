import { UsersService } from './users.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateAvailabilityDto } from './dtos/update-availability.dto';
import { AddUserSkillDto } from './dtos/add-user-skill.dto';
import { UpdateUserSkillDto } from './dtos/update-user-skill.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class UsersController {
    private readonly usersService;
    private readonly cloudinaryService;
    constructor(usersService: UsersService, cloudinaryService: CloudinaryService);
    getTalent(): Promise<{
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
    getUser(id: number): Promise<{
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
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        avatar: string | null;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
    }>;
    updateAvailability(req: any, id: number, dto: UpdateAvailabilityDto): Promise<{
        id: number;
        name: string;
        email: string;
        avatar: string | null;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
    }>;
    updateAvatar(req: any, id: number, file: Express.Multer.File): Promise<{
        id: number;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        avatar: string | null;
        availability_status: import(".prisma/client").$Enums.AvailabilityStatus;
    }>;
    addSkill(req: any, dto: AddUserSkillDto): Promise<{
        userId: number;
        created_at: Date;
        updated_at: Date;
        id: number;
        skillId: number;
        level: import(".prisma/client").$Enums.SkillLevel;
    }>;
    getUserSkills(id: number): import(".prisma/client").Prisma.PrismaPromise<({
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
    updateUserSkill(req: any, skillId: number, dto: UpdateUserSkillDto): Promise<{
        userId: number;
        created_at: Date;
        updated_at: Date;
        id: number;
        skillId: number;
        level: import(".prisma/client").$Enums.SkillLevel;
    }>;
    deleteUserSkill(req: any, skillId: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=users.controller.d.ts.map