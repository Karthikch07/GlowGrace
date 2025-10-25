import { defineConfig } from "drizzle-kit";


if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in production. Ensure the database is provisioned.");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});
