import { Worker } from "bullmq";
import { logger } from "../config/logger.js";
import { deadLetterQueue } from "../queue/deadLetterQueue.js";
import { redisConnection } from "../lib/redis.js";

new Worker(
  "analyticsQueue",
  async (job) => {
    try {
      if (job.name === "record-analytics") {
        logger.info({
          jobName: job.name,
          jobId: job.id,
        });
      }
    } catch (error) {
      logger.error({ message: `Job ${job.id} has been failed` });

      await deadLetterQueue.add("failed-analytics", {
        jobName: job.name,
        jobData: job.data,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
    limiter: {
      max: 10,
      duration: 1000,
    },
  },
);
