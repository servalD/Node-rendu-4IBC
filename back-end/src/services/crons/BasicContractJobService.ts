import { Address } from "viem";
import BlockchainClient from "../../blockchain/BlockchainClient";
import DbClient from "../../databases/DbClient";
import logger from "../LoggerService";
import BasicContract from "../../blockchain/contracts/BasicContract";
import P from "ts-pattern";
import CollectionService from "../CollectionsService";

const dbClient: DbClient = DbClient.getInstance();
const blockchainClient: BlockchainClient = BlockchainClient.getInstance();

enum ContractEvent {
  ValueSet = "ValueSet",
  PayableValueSet = "PayableValueSet",
}

type TransactionData = {
  contractId: number;
  contractAddress: Address;
  transactionHash: string;
  blockNumber: bigint;
  eventName: ContractEvent;
  eventArgs: readonly unknown[] | undefined;
};

export default class BasicContractJobService {
  private static basicContractJobService: BasicContractJobService;

  public static getInstance() {
    if (!this.basicContractJobService) {
      this.basicContractJobService = new BasicContractJobService();
    }
    return this.basicContractJobService;
  }

  public async syncAllContractEvent(lastBlockSynced: number, currentBlock: number) {
    
    const contracts = await dbClient.basicContract.findMany();

    for (const contract of contracts) {
      const logs = await blockchainClient.publicClient.getLogs({
        address: contract.contractAddress as Address,
        fromBlock: BigInt(lastBlockSynced),
        toBlock: BigInt(currentBlock),
      });

      if (logs.length === 0) {
        logger.info(`No logs found for contract ${contract.contractAddress}`);
        continue;
      }

      logger.info(
        `Syncing contract at ${contract.contractAddress}...`
      );

      for (const log of logs) {
        try {
          const decodedLog = BasicContract.getInstance(
            contract.contractAddress as Address
          ).decodeEventLog(log.data, log.topics);

          const transactionData: TransactionData = {
            contractAddress: contract.contractAddress as Address,
            contractId: contract.id,
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
            `Error while syncing contract at ${contract.contractAddress} : ${e}`
          );
        }
      }

      logger.info(
        `Collection at ${contract.contractAddress} synced`
      );
    }
  }

  public async processTransaction(transactionData: TransactionData) {
    await P.match(transactionData.eventName)
      .with(ContractEvent.PayableValueSet, async () => {
        await this.handlePayableValueSet(transactionData);
      })
      .with(ContractEvent.ValueSet, async () => {
        await this.handleValueSet(transactionData);
      })
      .exhaustive();
  }

  public async handlePayableValueSet(transactionData: TransactionData) {
    logger.info(`PayableValueSet event detected`);
    // Service to do
  }

  public async handleValueSet(transactionData: TransactionData) {

    logger.info(`ValueSet event detected`);
    // Service to do
  }
}
