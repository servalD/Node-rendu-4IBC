import { CronJob } from "cron";
import logger from "../services/LoggerService";
import JobService from "../services/crons/JobService";

const jobService = JobService.getInstance();

export default class Job {
  private static job: Job;
  private cronString: string = "*/5 * * * * *";
  private isRunning: boolean = false;

  public static getInstance(cronString: string) {
    if (!this.job) {
      this.job = new Job(cronString);
    }
    return this.job;
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
          logger.info(`Starting jobs`);
          await jobService.syncAllJobs();
          logger.info(`Jobs done\n`);
        } catch (error) {
          console.error("Error while processing jobs:", error);
        } finally {
          this.isRunning = false;
        }
      },
      null,
      true
    );
  }
}
