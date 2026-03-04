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
                availability_status: true,
            }
        });

        console.log('Total users:', users.length);
        console.log('Verified users:', users.filter(u => u.is_verified).length);
        console.log('\nAll users:');
        users.forEach(u => {
            console.log(`- ${u.name} (${u.email}) - Role: ${u.role}, Verified: ${u.is_verified}, Status: ${u.availability_status}`);
        });

        if (users.length === 0) {
            console.log('\nNo users found. You need to register users first.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
