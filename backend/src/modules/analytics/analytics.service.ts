import { IAnalyticsRepository } from "./analytics.interface.js";
import { CreateAnalyticsType } from "./analytics.types.js";

export class AnalyticsService {
  constructor(private analyticsRepo: IAnalyticsRepository) {}

  async recordClick(data: CreateAnalyticsType) {
    await this.analyticsRepo.createAnalytics(data);
  }
}
