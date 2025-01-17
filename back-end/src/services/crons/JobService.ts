
import BlockchainClient from "../../blockchain/BlockchainClient";
import DbClient from "../../databases/DbClient";
import logger from "../LoggerService";
import BasicContractJobService from "./BasicContractJobService";
import CollectionsJobService from "./CollectionsJobService";

const dbClient: DbClient = DbClient.getInstance();
const blockchainClient: BlockchainClient = BlockchainClient.getInstance();

export default class JobService {
  private static JobService: JobService;

  public static getInstance() {
    if (!this.JobService) {
      this.JobService = new JobService();
    }
    return this.JobService;
  }

  public async syncAllJobs() {
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
      `Current block : ${currentBlock} | Last block synced : ${lastBlockSynced} | Blocks to sync : ${currentBlock - lastBlockSynced
      }`
    );

    if (currentBlock <= lastBlockSynced) return;

    // Add your logic here
    await Promise.all([
      CollectionsJobService.getInstance().syncAllCollections(lastBlockSynced, currentBlock),
      BasicContractJobService.getInstance().syncAllContractEvent(lastBlockSynced, currentBlock)
    ]);
    

    await dbClient.config.update({
      where: { name: "lastBlockSynced" },
      data: { value: currentBlock.toString() },
    });
  }

}
