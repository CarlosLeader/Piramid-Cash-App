CREATE TYPE "CardStatus" AS ENUM ('AVAILABLE', 'ACTIVE', 'COOLDOWN');
CREATE TYPE "TokenTransactionType" AS ENUM ('REDEEM', 'PURCHASE', 'BONUS', 'SPEND');
CREATE TYPE "CardTransactionType" AS ENUM ('PURCHASE', 'ACTIVATION');

CREATE TABLE "CardType" (
    "id" TEXT NOT NULL,
    "panels" INTEGER NOT NULL,
    "tokenCost" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CardType_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "UserCard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardTypeId" TEXT NOT NULL,
    "status" "CardStatus" NOT NULL DEFAULT 'AVAILABLE',
    "activatedAt" TIMESTAMP(3),
    "activeUntil" TIMESTAMP(3),
    "cooldownUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "UserCard_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "TokenCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "redeemedAt" TIMESTAMP(3),
    "redeemedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TokenCode_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "TokenTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "TokenTransactionType" NOT NULL,
    "reference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TokenTransaction_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "CardTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardTypeId" TEXT NOT NULL,
    "userCardId" TEXT,
    "type" "CardTransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CardTransaction_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CardType_panels_key" ON "CardType"("panels");
CREATE UNIQUE INDEX "UserCard_userId_cardTypeId_key" ON "UserCard"("userId", "cardTypeId");
CREATE UNIQUE INDEX "TokenCode_code_key" ON "TokenCode"("code");
CREATE INDEX "UserCard_userId_status_idx" ON "UserCard"("userId", "status");
CREATE INDEX "TokenTransaction_userId_createdAt_idx" ON "TokenTransaction"("userId", "createdAt");
CREATE INDEX "CardTransaction_userId_createdAt_idx" ON "CardTransaction"("userId", "createdAt");
ALTER TABLE "UserCard" ADD CONSTRAINT "UserCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UserCard" ADD CONSTRAINT "UserCard_cardTypeId_fkey" FOREIGN KEY ("cardTypeId") REFERENCES "CardType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TokenCode" ADD CONSTRAINT "TokenCode_redeemedById_fkey" FOREIGN KEY ("redeemedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "TokenTransaction" ADD CONSTRAINT "TokenTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CardTransaction" ADD CONSTRAINT "CardTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CardTransaction" ADD CONSTRAINT "CardTransaction_cardTypeId_fkey" FOREIGN KEY ("cardTypeId") REFERENCES "CardType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CardTransaction" ADD CONSTRAINT "CardTransaction_userCardId_fkey" FOREIGN KEY ("userCardId") REFERENCES "UserCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;