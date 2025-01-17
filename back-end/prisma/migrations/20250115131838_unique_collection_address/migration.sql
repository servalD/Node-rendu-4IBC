/*
  Warnings:

  - A unique constraint covering the columns `[contractAddress]` on the table `NftCollection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NftCollection_contractAddress_key" ON "NftCollection"("contractAddress");
