import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"], // log all queries
});

export default prisma;
