import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Create page_views table if not exists
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS page_views (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        page TEXT NOT NULL,
        ip TEXT,
        user_agent TEXT,
        referrer TEXT,
        created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    return NextResponse.json({ status: "success", message: "page_views table ready" });
  } catch (error) {
    return NextResponse.json({ status: "error", message: String(error) }, { status: 500 });
  }
}