import { AppError } from "../../common/helpers/AppError.js";
import { urlCacheService } from "./cache/cache.service.js";
import { createShortCode } from "./url.helper.js";
import { IUrlRepository } from "./url.interface.js";
import { CreateShortUrlDTO, UpdateShortUrlDTO } from "./url.schema.js";

export class UrlService {
  constructor(
    private urlRepo: IUrlRepository,
    private cacheService: urlCacheService,
  ) {}

  async createShortUrl(data: CreateShortUrlDTO, userId: string) {
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

        const key = this.cacheService.getShortCodeCacheKey(shortUrl.shortCode);
        return shortUrl;
      }
    }

    throw new AppError("Failed to generate short code", 409);
  }

  async getOriginalUrlFromShortCode(shortCode: string) {
    const key = this.cacheService.getShortCodeCacheKey(shortCode);
    let shortUrl;

    shortUrl = await this.cacheService.getCache(key);

    if (shortUrl) {
      return JSON.parse(shortUrl);
    }

    shortUrl = await this.urlRepo.findShortUrlByShortCode(shortCode);

    if (!shortUrl) {
      throw new AppError("Original url not found", 404);
    }

    await this.cacheService.setCache(key, JSON.stringify(shortUrl));
    return shortUrl;
  }

  async updateShortUrl(
    userId: string,
    shortCode: string,
    data: UpdateShortUrlDTO,
  ) {
    const existingUrl = await this.urlRepo.findShortUrlByShortCode(shortCode);

    if (!existingUrl) {
      throw new AppError("SHort url not found", 404);
    }

    if (existingUrl?.userId !== userId) {
      throw new AppError("Unauthorized to perform this action", 401);
    }

    const updatedUrl = await this.urlRepo.updateShortUrl(shortCode, data);

    const key = this.cacheService.getShortCodeCacheKey(shortCode);
    await this.cacheService.deleteCacheKey(key);
    await this.cacheService.setCache(key, JSON.stringify(updatedUrl));
    return updatedUrl;
  }
}
