import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../common/helpers/CatchAsync.js";
import { authService } from "./auth.container.js";
import { sendResponse } from "../../common/helpers/AppResponse.js";
import { setAuthCookies } from "./auth.helper.js";

export const registerUserController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await authService.registerUser(data);
    setAuthCookies(res, "refreshToken", result.refreshToken);

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

export const loginUserController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await authService.loginUser(data);
    setAuthCookies(res, "refreshToken", result.refreshToken);

    sendResponse(res, 200, {
      success: true,
      message: "User login successfully",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  },
);

export const getLoggedInUserController = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId as string;
    const result = await authService.getLoggedInUserDetails(userId);

    sendResponse(res, 200, {
      success: true,
      message: "User fetched successfully",
      data: {
        user: result.user,
      },
    });
  },
);
