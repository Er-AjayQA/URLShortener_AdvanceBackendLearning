import dotenv from "dotenv";
import { z } from "zod";
dotenv.config({ path: "./.env" });

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "prod", "test"]),
  PORT: z.coerce.number(),
  FRONTEND_URL: z.url(),
  DATABASE_URL: z.string(),
  SALT_ROUNDS: z.coerce.number(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  URL_SHORTCODE_LENGTH: z.coerce.number(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables: ",
    z.treeifyError(parsedEnv.error),
  );

  process.exit(1);
}

export const env = parsedEnv.data;
