import express from "express";
import { authMiddleware } from "../../middleware/authentication.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createShortUrlController,
  redirectToShortUrlController,
  updateShortUrlController,
} from "./url.controller.js";
import {
  createShortUrlSchema,
  shortCodeParamsSchema,
  updateShortUrlSchema,
} from "./url.schema.js";
const router = express.Router();

router
  .route("/create-short-url")
  .post(
    authMiddleware,
    validate(createShortUrlSchema, "body"),
    createShortUrlController,
  );

router
  .route("/:shortCode")
  .get(validate(shortCodeParamsSchema, "params"), redirectToShortUrlController);

router
  .route("/update/:shortCode")
  .patch(
    authMiddleware,
    validate(shortCodeParamsSchema, "params"),
    validate(updateShortUrlSchema, "body"),
    updateShortUrlController,
  );

export default router;
