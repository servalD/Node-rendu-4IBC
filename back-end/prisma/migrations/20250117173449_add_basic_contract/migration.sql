-- CreateTable
CREATE TABLE "ContractEventHistory" (
    "id" SERIAL NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "contractId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractEventHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicContract" (
    "id" SERIAL NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "payableValue" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BasicContract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContractEventHistory_id_key" ON "ContractEventHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContractEventHistory_transactionHash_key" ON "ContractEventHistory"("transactionHash");

-- CreateIndex
CREATE UNIQUE INDEX "BasicContract_id_key" ON "BasicContract"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BasicContract_contractAddress_key" ON "BasicContract"("contractAddress");

-- AddForeignKey
ALTER TABLE "ContractEventHistory" ADD CONSTRAINT "ContractEventHistory_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "BasicContract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractEventHistory" ADD CONSTRAINT "ContractEventHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicContract" ADD CONSTRAINT "BasicContract_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
