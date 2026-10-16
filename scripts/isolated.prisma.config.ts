import { defineConfig } from "prisma/config";
// Deliberately cannot read production environment variables.
export default defineConfig({
 schema: "../prisma/schema.prisma",
 migrations: { path: "../prisma/migrations" },
 datasource: { url: "postgresql://postgres:postgres@127.0.0.1:55439/postgres?schema=migration_validation" },
});
