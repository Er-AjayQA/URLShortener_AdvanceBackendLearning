import redis from "../../../lib/redis.js";

export class urlCacheService {
  getShortCodeCacheKey(shortCode: string) {
    return `shortCode:${shortCode}`;
  }

  async getCache(key: string) {
    return await redis.get(key);
  }

  async setCache(key: string, value: string) {
    await redis.set(key, value, "EX", 300);
  }

  async deleteCacheKey(key: string) {
    await redis.del(key);
  }
}
