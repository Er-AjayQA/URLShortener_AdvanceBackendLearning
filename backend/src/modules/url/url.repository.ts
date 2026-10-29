import { ShortUrl } from "../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";
import { IUrlRepository } from "./url.interface.js";
import {
  createShortUrlInputType,
  updateShortUrlInptType,
} from "./url.types.js";

export class UrlRepository implements IUrlRepository {
  async findShortUrlByShortCode(shortCode: string) {
    return await prisma.shortUrl.findUnique({ where: { shortCode } });
  }

  async createShortUrl(data: createShortUrlInputType) {
    return await prisma.shortUrl.create({ data });
  }

  async updateShortUrl(shortCode: string, data: updateShortUrlInptType) {
    const updatedShortUrl = await prisma.shortUrl.update({
      where: { shortCode },
      data: {
        originalUrl: data.updatedOriginalUrl,
      },
    });

    return updatedShortUrl;
  }
}
