import { urlCacheService } from "./cache/cache.service.js";
import { UrlRepository } from "./url.repository.js";
import { UrlService } from "./url.service.js";

const urlRepository = new UrlRepository();
const urlCache = new urlCacheService();
const urlService = new UrlService(urlRepository, urlCache);
export { urlService };
