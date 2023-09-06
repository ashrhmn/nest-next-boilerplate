import z from "zod";

import { parseEnv } from "@deepchain-labs/utils-server";
import * as dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5001),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const env = parseEnv(envSchema);

export const appConfig = {
  default_schema_identifier: "public",
  default_migrations_folder: __dirname + "/../database/migrations",
  default_seeders_folder: __dirname + "/../database/seeders",
  tenant_migrations_folder: __dirname + "/../database/tenant_migrations",
  tenant_seeders_folder: __dirname + "/../database/tenant_seeders",
  recommended_bcrypt_rounds: 12,
  email_from: "mailer@schmserver.com",
  env,
};
