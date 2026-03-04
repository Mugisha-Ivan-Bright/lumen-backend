const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                is_verified: true,
            }
        });

        console.log('Users in database:', JSON.stringify(users, null, 2));

        if (users.length === 0) {
            console.log('\nNo users found. You need to register first.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
