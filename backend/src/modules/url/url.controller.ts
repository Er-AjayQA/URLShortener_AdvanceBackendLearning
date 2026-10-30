import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../common/helpers/CatchAsync.js";
import { urlService } from "./url.container.js";
import { sendResponse } from "../../common/helpers/AppResponse.js";
import { analyticsService } from "../analytics/analytics.container.js";

export const createShortUrlController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { originalUrl } = req.body;
    const userId = req.user?.userId as string;
    const result = await urlService.createShortUrl({ originalUrl }, userId);

    sendResponse(res, 201, {
      success: true,
      message: "Short Url created successfully",
      data: result,
    });
  },
);

export const redirectToShortUrlController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const shortCode = req.params.shortCode as string;
    const shortUrl = await urlService.getOriginalUrlFromShortCode(shortCode);

    await analyticsService.recordClick(shortUrl, req);

    res.redirect(shortUrl.originalUrl);
  },
);

export const updateShortUrlController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId as string;
    const shortCode = req.params.shortCode as string;
    const updatedOriginalUrl = req.body.updatedOriginalUrl as string;

    const result = await urlService.updateShortUrl(userId, shortCode, {
      updatedOriginalUrl,
    });

    sendResponse(res, 201, {
      success: true,
      message: "Short url updated successfully",
      data: result,
    });
  },
);
