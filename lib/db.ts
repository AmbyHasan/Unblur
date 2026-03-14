import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
    var prisma: PrismaClient | undefined;
    var pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

const pool = globalThis.pgPool ?? new Pool({ 
    connectionString,
    ssl: {
        rejectUnauthorized: false // Set to true in production with proper certificates
    }
});
const adapter = new PrismaPg(pool);

export const db = globalThis.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
    globalThis.pgPool = pool;
}