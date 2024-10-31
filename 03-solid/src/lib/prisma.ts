import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

console.log(env.NODE_ENV);
export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
