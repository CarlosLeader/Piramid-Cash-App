import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const cardTypes = [[10, 10], [25, 20], [60, 50], [120, 100], [500, 450], [1000, 900]] as const;

async function main() {
  for (const [panels, tokenCost] of cardTypes) {
    await prisma.cardType.upsert({ where: { panels }, update: { tokenCost, active: true }, create: { panels, tokenCost } });
  }
}

main().finally(() => prisma.$disconnect());