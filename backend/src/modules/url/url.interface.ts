import { ShortUrl } from "../../generated/prisma/index.js";
import { createShortUrlInputType } from "./url.types.js";

export interface IUrlRepository {
  findShortUrlByShortCode(shortCode: string): Promise<ShortUrl | null>;
  createShortUrl(data: createShortUrlInputType): Promise<ShortUrl>;
}
