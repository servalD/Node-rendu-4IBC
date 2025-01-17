import { Address } from "viem";
import BlockchainClient from "../../blockchain/BlockchainClient";
import DbClient from "../../databases/DbClient";
import logger from "../LoggerService";
import NftCollection from "../../blockchain/contracts/NftCollection";
import P from "ts-pattern";
import CollectionService from "../CollectionsService";

const dbClient: DbClient = DbClient.getInstance();
const blockchainClient: BlockchainClient = BlockchainClient.getInstance();

enum ContractEvent {
  OwnershipTransferred = "OwnershipTransferred",
  Transfer = "Transfer",
}

type TransactionData = {
  collectionId: string;
  collectionAddress: Address;
  transactionHash: string;
  blockNumber: bigint;
  eventName: ContractEvent;
  eventArgs: readonly unknown[] | undefined;
};

export default class CollectionsJobService {
  private static collectionsJobService: CollectionsJobService;

  public static getInstance() {
    if (!this.collectionsJobService) {
      this.collectionsJobService = new CollectionsJobService();
    }
    return this.collectionsJobService;
  }

  public async syncAllCollections() {
    let lastBlockSynced = 0;
    const lastBlockSyncedConfig = await dbClient.config.findUnique({
      where: { name: "lastBlockSynced" },
    });

    if (!lastBlockSyncedConfig) {
      logger.info(
        "No lastBlockSynced found in the database, initializing to 0"
      );
      await dbClient.config.create({
        data: { name: "lastBlockSynced", value: "0" },
      });
    } else {
      lastBlockSynced = parseInt(lastBlockSyncedConfig.value);
    }

    const currentBlock = parseInt(
      (await blockchainClient.publicClient.getBlockNumber()).toString()
    );

    logger.info(
      `Current block : ${currentBlock} | Last block synced : ${lastBlockSynced} | Blocks to sync : ${
        currentBlock - lastBlockSynced
      }`
    );

    if (currentBlock <= lastBlockSynced) return;

    const collections = await dbClient.nftCollection.findMany();

    for (const collection of collections) {
      const logs = await blockchainClient.publicClient.getLogs({
        address: collection.contractAddress as Address,
        fromBlock: BigInt(lastBlockSynced),
        toBlock: BigInt(currentBlock),
      });

      if (logs.length === 0) {
        logger.info(`No logs found for collection ${collection.name}`);
        continue;
      }

      logger.info(
        `Syncing collection ${collection.name} at ${collection.contractAddress}...`
      );

      for (const log of logs) {
        try {
          const decodedLog = NftCollection.getInstance(
            collection.contractAddress as Address
          ).decodeEventLog(log.data, log.topics);

          const transactionData: TransactionData = {
            collectionAddress: collection.contractAddress as Address,
            collectionId: collection.id,
            transactionHash: log.transactionHash,
            blockNumber: log.blockNumber,
            eventName: decodedLog.eventName as unknown as ContractEvent,
            eventArgs: decodedLog.args,
          };

          //console.log(transactionData);

          // If the event name is not included in the enum
          if (!Object.values(ContractEvent).includes(transactionData.eventName))
            continue;

          await this.processTransaction(transactionData);
        } catch (e) {
          logger.error(
            `Error while syncing collection ${collection.name} at ${collection.contractAddress} : ${e}`
          );
        }
      }

      logger.info(
        `Collection ${collection.name} at ${collection.contractAddress} synced`
      );
    }

    await dbClient.config.update({
      where: { name: "lastBlockSynced" },
      data: { value: currentBlock.toString() },
    });
  }

  public async processTransaction(transactionData: TransactionData) {
    await P.match(transactionData.eventName)
      .with(ContractEvent.OwnershipTransferred, async () => {
        await this.handleOwnershipTransferred(transactionData);
      })
      .with(ContractEvent.Transfer, async () => {
        await this.handleTransfer(transactionData);
      })
      .exhaustive();
  }

  public async handleOwnershipTransferred(transactionData: TransactionData) {
    logger.info(`OwnershipTransferred event detected`);
    const eventsArgs = transactionData.eventArgs as any as {
      previousOwner: Address;
      newOwner: Address;
    };

    await CollectionService.getInstance().updateCollectionOwner({
      collectionAddress: transactionData.collectionAddress,
      newOwner: eventsArgs.newOwner,
    });
  }

  public async handleTransfer(transactionData: TransactionData) {
    const eventsArgs = transactionData.eventArgs as any as {
      from: Address;
      to: Address;
      tokenId: bigint;
    };

    if (eventsArgs.from === "0x0000000000000000000000000000000000000000") {
      logger.info("Mint event detected");
      await CollectionService.getInstance().syncTokenFromBlockchain({
        contractAddress: transactionData.collectionAddress,
        tokenId: parseInt(eventsArgs.tokenId.toString()),
      });
      return;
    }

    await CollectionService.getInstance().updateTokenOwner({
      contractAddress: transactionData.collectionAddress,
      newOwner: eventsArgs.to,
      tokenId: eventsArgs.tokenId.toString(),
    });

    logger.info(`Transfer event detected`);
  }
}
