import prisma from "@/lib/db";

// ── Services ──
export async function getPublishedServices() {
  try {
    return await prisma.service.findMany({ where: { isPublished: true }, orderBy: { sortOrder: "asc" } });
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function getAllServices() {
  try {
    return await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  } catch (error) {
    console.error("Failed to fetch all services:", error);
    return [];
  }
}

export async function getServiceById(id: string) {
  try { return await prisma.service.findUnique({ where: { id } }); }
  catch { return null; }
}

export async function getServiceBySlug(slug: string) {
  try { return await prisma.service.findUnique({ where: { slug } }); }
  catch { return null; }
}

// ── Projects ──
export async function getPublishedProjects() {
  try {
    return await prisma.project.findMany({ where: { isPublished: true }, orderBy: { sortOrder: "asc" } });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getAllProjects() {
  try {
    return await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  } catch (error) {
    console.error("Failed to fetch all projects:", error);
    return [];
  }
}

export async function getProjectById(id: string) {
  try { return await prisma.project.findUnique({ where: { id } }); }
  catch { return null; }
}

// ── Messages ──
export async function getAllMessages() {
  try { return await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }); }
  catch { return []; }
}

export async function getRecentMessages(limit = 5) {
  try { return await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: limit }); }
  catch { return []; }
}

// ── Quote Requests ──
export async function getAllQuoteRequests() {
  try { return await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, include: { service: true } }); }
  catch { return []; }
}

export async function getRecentQuoteRequests(limit = 5) {
  try { return await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: limit, include: { service: true } }); }
  catch { return []; }
}

// ── Settings ──
export async function getSiteSettings() {
  try { return await prisma.siteSetting.findFirst(); }
  catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

// ── Dashboard Stats ──
export async function getDashboardStats() {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [totalServices, totalProjects, totalMessages, totalQuotes, totalUsers, totalVisitors, todayVisitors, recentMessages, recentQuotes] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.contactMessage.count(),
      prisma.quoteRequest.count(),
      prisma.adminUser.count(),
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: todayStart } } }),
      getRecentMessages(5),
      getRecentQuoteRequests(5),
    ]);
    return { totalServices, totalProjects, totalMessages, totalQuotes, totalUsers, totalVisitors, todayVisitors, recentMessages, recentQuotes };
  } catch {
    return { totalServices: 0, totalProjects: 0, totalMessages: 0, totalQuotes: 0, totalUsers: 0, totalVisitors: 0, todayVisitors: 0, recentMessages: [], recentQuotes: [] };
  }
}