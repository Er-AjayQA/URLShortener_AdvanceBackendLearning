import express from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { loginUserSchema, userRegisterSchema } from "./auth.schema.js";
import {
  getLoggedInUserController,
  loginUserController,
  registerUserController,
} from "./auth.controller.js";
import { authMiddleware } from "../../middleware/authentication.middleware.js";
const router = express.Router();

router
  .route("/register")
  .post(validate(userRegisterSchema, "body"), registerUserController);

router
  .route("/login")
  .post(validate(loginUserSchema, "body"), loginUserController);

router.route("/me").get(authMiddleware, getLoggedInUserController);

export default router;
