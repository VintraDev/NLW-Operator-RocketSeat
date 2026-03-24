import { loadEnvConfig } from "@next/env";
import type { Config } from "drizzle-kit";

// Carregar variáveis de ambiente
loadEnvConfig(process.cwd());

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Configurações adicionais
  verbose: true,
  strict: true,
  // Casing config - converte automaticamente camelCase para snake_case
  casing: "snake_case",
} satisfies Config;
