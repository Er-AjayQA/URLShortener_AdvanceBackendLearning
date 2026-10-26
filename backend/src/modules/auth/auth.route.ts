import express from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { userRegisterSchema } from "./auth.schema.js";
import { registerUserController } from "./auth.controller.js";
const router = express.Router();

router
  .route("/register")
  .post(validate(userRegisterSchema, "body"), registerUserController);

export default router;
