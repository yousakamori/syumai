import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData = [
  {
    name: "you",
    email: "you@example.com",
    password: "password",
  },
  {
    name: "hoge",
    email: "hoge@example.com",
    password: "password",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const saltRounds = 10;
    const passwordDigest = await bcrypt.hash("password", saltRounds);

    const user = await prisma.user.create({
      data: { name: u.name, email: u.email, passwordDigest },
    });

    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
