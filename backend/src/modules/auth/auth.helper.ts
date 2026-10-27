import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.config.js";
import { JwtPayloadType } from "./auth.types.js";
import { Response } from "express";
import ms, { StringValue } from "ms";
import { AppError } from "../../common/helpers/AppError.js";
const saltRound = Number(env.SALT_ROUNDS);

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRound);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const signAccessToken = (payload: JwtPayloadType) => {
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as JwtPayloadType;
};

export const signRefreshToken = (payload: JwtPayloadType) => {
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as JwtPayloadType;
};

export const setAuthCookies = (
  res: Response,
  cookieName: string,
  refreshToken: string,
) => {
  const refreshTokenMaxAge = ms(env.REFRESH_TOKEN_EXPIRES_IN as StringValue);

  if (typeof refreshTokenMaxAge !== "number") {
    throw new AppError("Invalid refresh token expiry configuration", 401);
  }

  res.cookie(cookieName, refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "prod",
    sameSite: "lax",
    maxAge: refreshTokenMaxAge,
    // path: "/api/v1/auth/refresh-token",
  });
};

export const clearAuthCookies = (res: Response, cookieName: string) => {
  const refreshTokenMaxAge = ms(env.REFRESH_TOKEN_EXPIRES_IN as StringValue);

  if (typeof refreshTokenMaxAge !== "number") {
    throw new AppError("Invalid refresh token expiry configuration", 401);
  }

  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: env.NODE_ENV === "prod",
    sameSite: "lax",
    maxAge: refreshTokenMaxAge,
    // path: "/api/v1/auth/refresh-token",
  });
};
