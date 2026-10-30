import { Request } from "express";
import { IAnalyticsRepository } from "./analytics.interface.js";
import { ShortUrlType } from "../url/url.types.js";

export class AnalyticsService {
  constructor(private analyticsRepo: IAnalyticsRepository) {}

  async recordClick(shortUrl: ShortUrlType, requestMetaData: Request) {
    await this.analyticsRepo.createAnalytics({
      shortUrlId: shortUrl.id,
      ipAddress: requestMetaData?.ip,
      userAgent: requestMetaData?.headers["user-agent"],
      referrer: requestMetaData?.get("Referer"),
    });
  }
}
