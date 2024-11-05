import { prisma } from "@/lib/prisma";
import { execSync } from "child_process";
import "dotenv/config";
import type { Environment } from "vitest";

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("❌ Provide a DATABASE_URL environment variable");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);

  return url.toString();
};

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",

  setup() {
    // custom setup
    console.log("Executou");

    const schemaId = crypto.randomUUID();

    const newDatabaseURL = generateDatabaseURL(schemaId);

    process.env.DATABASE_URL = newDatabaseURL;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        console.log("Teardown");
        // called after all tests with this env have been run
      },
    };
  },
};
