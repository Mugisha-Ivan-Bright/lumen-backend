import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function testLogin() {
    const email = 'mugishaivanbright250@gmail.com';
    const password = 'shami123';

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                is_verified: true,
                role: true,
            },
        });

        if (!user) {
            console.log('❌ User not found with email:', email);
            console.log('\n✅ Solution: Register a new account at http://localhost:5173/register');
            return;
        }

        console.log('✅ User found:');
        console.log('  - ID:', user.id);
        console.log('  - Name:', user.name);
        console.log('  - Email:', user.email);
        console.log('  - Role:', user.role);
        console.log('  - Verified:', user.is_verified);

        // Test password
        const passwordValid = await bcrypt.compare(password, user.password);

        if (passwordValid) {
            console.log('\n✅ Password is correct!');
            console.log('✅ You should be able to login now.');
        } else {
            console.log('\n❌ Password is incorrect!');
            console.log('\n✅ Solutions:');
            console.log('  1. Try the forgot password flow at http://localhost:5173/forgot-password');
            console.log('  2. Or register a new account at http://localhost:5173/register');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testLogin();
