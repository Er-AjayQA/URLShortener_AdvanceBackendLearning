import { ClickAnalytics } from "../../generated/prisma/index.js";
import { CreateAnalyticsType } from "./analytics.types.js";

export interface IAnalyticsRepository {
  createAnalytics(data: CreateAnalyticsType): Promise<ClickAnalytics>;
}
