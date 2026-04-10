import { prisma } from './lib/prisma';
import { UserRole } from './src/domain/enums/user-role.enum';
import { PasswordHasher } from './src/domain/services/password-hasher.service';

async function main() {
  const user = await prisma.user.create({
    data: {
      firstName: 'Alice',
      lastName: 'Cooper',
      email: 'alice@prisma.io',
      phone: '123456789',
      isVerified: false,
      role: UserRole.DRIVER,
      hashedPassword: await new PasswordHasher().hash('inicio123'),
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
