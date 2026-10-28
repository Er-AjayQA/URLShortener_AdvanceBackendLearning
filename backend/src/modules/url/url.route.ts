import express from "express";
import { authMiddleware } from "../../middleware/authentication.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { urlSchema } from "./url.schema.js";
import {
  createShortUrlController,
  redirectToShortUrlController,
} from "./url.controller.js";
const router = express.Router();

router
  .route("/create-short-url")
  .post(authMiddleware, validate(urlSchema, "body"), createShortUrlController);

router.route("/:shortCode").get(redirectToShortUrlController);

export default router;
