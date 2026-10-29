import { ShortUrl } from "../../generated/prisma/index.js";
import {
  createShortUrlInputType,
  updateShortUrlInptType,
} from "./url.types.js";

export interface IUrlRepository {
  findShortUrlByShortCode(shortCode: string): Promise<ShortUrl | null>;
  createShortUrl(data: createShortUrlInputType): Promise<ShortUrl>;
  updateShortUrl(
    shortCode: string,
    data: updateShortUrlInptType,
  ): Promise<ShortUrl>;
}
