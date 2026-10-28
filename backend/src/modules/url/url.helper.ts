import { customAlphabet } from "nanoid";
import { env } from "../../config/env.config.js";

const urlShortCodeLength = env.URL_SHORTCODE_LENGTH || 8;

const createId = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  urlShortCodeLength,
);

export const createShortCode = (): string => {
  return createId();
};
