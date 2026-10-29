import { CreateAnalyticsType } from "./analytics.types.js";

export interface IAnalyticsRepository {
  createAnalytics(data: CreateAnalyticsType): Promise<void>;
}
