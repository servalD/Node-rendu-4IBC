/*
  Warnings:

  - Added the required column `blockchainAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN    "blockchainAddress" TEXT NOT NULL DEFAULT '0x';
ALTER TABLE "User" ALTER COLUMN "blockchainAddress" DROP DEFAULT;

-- CreateTable
CREATE TABLE "NftCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NftCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NftToken" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "NftToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NftToken" ADD CONSTRAINT "NftToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NftToken" ADD CONSTRAINT "NftToken_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "NftCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
