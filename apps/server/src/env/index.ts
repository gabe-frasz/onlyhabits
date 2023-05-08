import { config } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config({ path: ".env" });
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3333),
  WEB_ORIGIN_URL: z.string().url().or(z.literal("*")),
  DATABASE_URL: z.string().url(),
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  CLERK_E2E_JWT_TEMPLATE: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new Error(_env.error.message);
}

export const env = _env.data;
