import { prisma } from './lib/prisma';
import { UserRole } from './src/domain/entities/user.entity.ts';

async function main() {
  const user = await prisma.user.create({
    data: {
      firstName: 'Alice',
      lastName: 'Cooper',
      email: 'alice@prisma.io',
      phone: '123456789',
      isVerified: false,
      role: UserRole.DRIVER,
    },
  });
  console.log('Created user:', user);

  const allUsers = await prisma.user.findMany({});
  console.log('All users:', JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
