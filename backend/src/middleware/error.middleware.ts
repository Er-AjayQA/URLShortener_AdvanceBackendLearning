import { NextFunction, Request, Response } from "express";
import { env } from "../config/env.config.js";
import { logger } from "../config/logger.js";

interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = { ...err };

  error.message = err.message || "Something went wrong";
  error.status = err.status ?? "error";
  error.statusCode = err.statusCode ?? 500;

  // For Development
  if (env.NODE_ENV === "dev") {
    logger.error({
      message: error.message,
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
    });

    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: err.stack,
      error,
    });
  }

  // For Production
  if (error.isOperational) {
    logger.error({
      status: error.status,
      message: error.message,
    });

    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  // Generic Error
  logger.error(err, "Unexpected error");

  res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};
