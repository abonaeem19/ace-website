import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

// Track a page view
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    const userAgent = headersList.get("user-agent") || "";
    const referrer = headersList.get("referer") || "";

    await prisma.pageView.create({
      data: {
        page: body.page || "/",
        ip: ip.split(",")[0].trim(),
        userAgent: userAgent.substring(0, 500),
        referrer: referrer.substring(0, 500),
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Get visitor stats
export async function GET() {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(todayStart);
    monthStart.setDate(monthStart.getDate() - 30);

    const [total, today, week, month, topPages] = await Promise.all([
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.pageView.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.pageView.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.pageView.groupBy({
        by: ["page"],
        _count: { page: true },
        orderBy: { _count: { page: "desc" } },
        take: 5,
      }),
    ]);

    return NextResponse.json({ total, today, week, month, topPages });
  } catch {
    return NextResponse.json({ total: 0, today: 0, week: 0, month: 0, topPages: [] });
  }
}