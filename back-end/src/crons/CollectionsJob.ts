import { CronJob } from "cron";
import logger from "../services/LoggerService";
import CollectionsJobService from "../services/crons/CollectionsJobService";

const collectionsJobService = CollectionsJobService.getInstance();

export default class CollectionsJob {
  private static collectionsJob: CollectionsJob;
  private cronString: string = "*/5 * * * * *";
  private isRunning: boolean = false;

  public static getInstance(cronString: string) {
    if (!this.collectionsJob) {
      this.collectionsJob = new CollectionsJob(cronString);
    }
    return this.collectionsJob;
  }

  private constructor(cronString: string) {
    this.cronString = cronString;
  }

  public async process() {
    new CronJob(
      this.cronString,
      async () => {
        if (this.isRunning) return;
        this.isRunning = true;
        try {
          logger.info(`Starting CollectionJob`);
          await collectionsJobService.syncAllCollections();
          logger.info(`CollectionJob done\n`);
        } catch (error) {
          console.error("Error while processing CollectionJob:", error);
        } finally {
          this.isRunning = false;
        }
      },
      null,
      true
    );
  }
}
