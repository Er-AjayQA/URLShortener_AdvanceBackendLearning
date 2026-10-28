import redis from "../../../lib/redis.js";

export class urlCacheService {
  private getCacheKey(shortCode: string) {
    return `short_code:${shortCode}`;
  }
  private setCacheKey(shortCode: string) {}

  public async deleteCacheKey(shortCode: string) {
    await redis.del(this.getCacheKey(shortCode));
  }
}
