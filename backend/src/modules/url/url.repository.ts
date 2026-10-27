import { prisma } from "../../lib/prisma.js";
import { IUrlRepository } from "./url.interface.js";
import { createShortUrlInputType } from "./url.types.js";

export class UrlRepository implements IUrlRepository {
  async findShortUrlByShortCode(shortCode: string) {
    return await prisma.shortUrl.findUnique({ where: { shortCode } });
  }

  async createShortUrl(data: createShortUrlInputType) {
    return await prisma.shortUrl.create({ data });
  }
}
