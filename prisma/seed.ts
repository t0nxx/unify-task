import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@unifi.solutions' },
    update: {},
    create: {
      email: 'admin@unifi.solutions',
      name: 'admin',
      // pass 123456
      password: '$2b$10$66puH55yO18dYCWJc2g9ReLzF0TVaPrwQay0mmm7GPOURTLHpCXRe',
      isAdmin: true,
      todos: {
        create: [
          {
            name: 'Todo 1',
          },
          {
            name: 'Todo 2',
          },
          {
            name: 'Todo 3',
          },
        ],
      },
    },
  });
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
