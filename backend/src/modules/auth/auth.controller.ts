import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../common/helpers/CatchAsync.js";
import authService from "./auth.container.js";
import { sendResponse } from "../../common/helpers/AppResponse.js";

export const registerUserController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await authService.registerUser(data);

    sendResponse(res, 201, {
      success: true,
      message: "User registered successfully",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  },
);
