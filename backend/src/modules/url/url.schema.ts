import { z } from "zod";

export const createShortUrlSchema = z
  .object({
    originalUrl: z.url(),
  })
  .strict();

export const shortCodeParamsSchema = z
  .object({
    shortCode: z.string(),
  })
  .strict();

export const updateShortUrlSchema = z
  .object({
    updatedOriginalUrl: z.url(),
  })
  .strict();

export type CreateShortUrlDTO = z.infer<typeof createShortUrlSchema>;
export type ShortCodeParamsDTO = z.infer<typeof shortCodeParamsSchema>;
export type UpdateShortUrlDTO = z.infer<typeof updateShortUrlSchema>;
