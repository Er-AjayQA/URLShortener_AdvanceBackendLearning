import express from "express";
import { authMiddleware } from "../../middleware/authentication.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { urlSchema } from "./url.schema.js";
import { createShortUrlController } from "./url.controller.js";
const router = express.Router();

router
  .route("/create-short-url")
  .post(authMiddleware, validate(urlSchema, "body"), createShortUrlController);

export default router;
