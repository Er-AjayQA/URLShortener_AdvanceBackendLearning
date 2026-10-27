import crypto from "node:crypto";

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SHORT_CODE_LENGTH = 6;

export const createShortCode = (): string => {
  const randomBytes = crypto.randomBytes(SHORT_CODE_LENGTH);
  let shortCode = "";

  for (let i = 0; i < 6; i++) {
    shortCode += CHARACTERS[randomBytes[i] % CHARACTERS.length];
  }
  return shortCode;
};
