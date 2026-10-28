import { AppError } from "../../common/helpers/AppError.js";
import { createShortCode } from "./url.helper.js";
import { IUrlRepository } from "./url.interface.js";
import { UrlInputType } from "./url.schema.js";

export class UrlService {
  constructor(private urlRepo: IUrlRepository) {}

  async createShortUrl(data: UrlInputType, userId: string) {
    let shortCode;
    const MAX_RETRIES = 5;

    for (let i = 1; i <= MAX_RETRIES; i++) {
      shortCode = createShortCode();

      const isAlreadyExist =
        await this.urlRepo.findShortUrlByShortCode(shortCode);

      if (!isAlreadyExist) {
        const shortUrl = await this.urlRepo.createShortUrl({
          userId,
          originalUrl: data.originalUrl,
          shortCode,
        });

        return shortUrl;
      }
    }

    throw new AppError("Failed to generate short code", 409);
  }

  async getOriginalUrlFromShortCode(shortCode: string) {
    const shortUrl = await this.urlRepo.findShortUrlByShortCode(shortCode);

    if (!shortUrl) {
      throw new AppError("Original url not found", 404);
    }

    return shortUrl.originalUrl;
  }
}
