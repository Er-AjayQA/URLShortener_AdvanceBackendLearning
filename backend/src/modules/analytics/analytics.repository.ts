import { prisma } from "../../lib/prisma.js";
import { IAnalyticsRepository } from "./analytics.interface.js";
import { CreateAnalyticsType } from "./analytics.types.js";

export class AnalyticsRepository implements IAnalyticsRepository {
  async createAnalytics(data: CreateAnalyticsType) {
    await prisma.clickAnalytics.create({ data });
  }
}
