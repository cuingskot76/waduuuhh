import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the .env file");
}

export default defineConfig({
  schema: [
    "./lib/auth-schema.ts",
    "./lib/schema.ts",
    "./lib/db/columns.helpers.ts",
  ],
  out: "./lib/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
