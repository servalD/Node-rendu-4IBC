import { Address } from "viem";
import BlockchainClient from "../../blockchain/BlockchainClient";
import DbClient from "../../databases/DbClient";
import logger from "../LoggerService";
import NftCollection from "../../blockchain/contracts/NftCollection";
import P from "ts-pattern";

const dbClient: DbClient = DbClient.getInstance();
const blockchainClient: BlockchainClient = BlockchainClient.getInstance();

enum ContractEvent {
  OwnershipTransferred = "OwnershipTransferred",
  Transfer = "Transfer",
}

type TransactionData = {
  collectionId: string;
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

    logger.info(`Last block synced : ${lastBlockSynced}`);

    const currentBlock = parseInt(
      (await blockchainClient.publicClient.getBlockNumber()).toString()
    );
    logger.info(`Current block : ${currentBlock}`);

    if (currentBlock <= lastBlockSynced) {
      logger.info(`No new block to sync`);
      return;
    }

    logger.info(`Syncing ${currentBlock - lastBlockSynced} blocks...`);

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
            collectionId: collection.id,
            transactionHash: log.transactionHash,
            blockNumber: log.blockNumber,
            eventName: decodedLog.eventName as unknown as ContractEvent,
            eventArgs: decodedLog.args,
          };

          console.log(transactionData);
        } catch (e) {
          logger.error(
            `Error while syncing collection ${collection.name} at ${collection.contractAddress} : ${e}`
          );
        }
      }
    }
  }

  public processTransaction(transactionData: TransactionData) {
    P.match(transactionData.eventName)
      .with(ContractEvent.OwnershipTransferred, () => {
        this.handleOwnershipTransferred(transactionData);
      })
      .with(ContractEvent.Transfer, () => {})
      .exhaustive();

    // switch (transactionData.eventName) {
    //   case ContractEvents.OwnershipTransferred:
    //     this.handleOwnershipTransferred(transactionData);
    //     break;
    //   case ContractEvents.Transfer:
    //     this.handleTransfer(transactionData);
    //     break;
    //   default:
    //     logger.info(`Unknown event ${transactionData.eventName}`);
    // }
  }

  public handleOwnershipTransferred(transactionData: TransactionData) {
    logger.info(`OwnershipTransferred event detected`);
  }

  public handleTransfer(transactionData: any) {
    logger.info(`Transfer event detected`);
  }
}
