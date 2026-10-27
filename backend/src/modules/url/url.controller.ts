import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../common/helpers/CatchAsync.js";
import { urlService } from "./url.container.js";
import { sendResponse } from "../../common/helpers/AppResponse.js";

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
