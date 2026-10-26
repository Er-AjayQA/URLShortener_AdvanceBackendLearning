import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { AppError } from "../common/helpers/AppError.js";

type ValidateTarget = "query" | "params" | "body";

export const validate =
  (schema: ZodObject<any>, target: ValidateTarget = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = req[target];

    const result = schema.safeParse(data);

    if (!result.success) {
      const error = result.error.issues.map((error) => ({
        field: error.path.join(""),
        message: error.message,
      }));

      throw new AppError(
        error.map((err) => `${err.field}: ${err.message}`).join(", "),
        400,
      );
    }

    req[target] = result.data;
    next();
  };
