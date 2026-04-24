import Link from "next/link";
import { Layers, FolderKanban, MessageSquare, FileText, TrendingUp, Users, Eye, BarChart3 } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getDashboardStats } from "@/lib/queries";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const session = await getSession();
  const stats = await getDashboardStats();
  const t = dict.admin.dashboard;
  const isAr = locale === "ar";

  const cards = [
    { icon: Layers, label: t.totalServices, value: stats.totalServices, gradient: "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(0,240,255,0.05))", iconColor: "#00F0FF", borderColor: "rgba(0,240,255,0.2)", href: `/${locale}/admin/services` },
    { icon: FolderKanban, label: t.totalProjects, value: stats.totalProjects, gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))", iconColor: "#10b981", borderColor: "rgba(16,185,129,0.2)", href: `/${locale}/admin/projects` },
    { icon: MessageSquare, label: t.totalMessages, value: stats.totalMessages, gradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))", iconColor: "#f59e0b", borderColor: "rgba(245,158,11,0.2)", href: `/${locale}/admin/messages` },
    { icon: FileText, label: t.totalQuotes, value: stats.totalQuotes, gradient: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))", iconColor: "#8B5CF6", borderColor: "rgba(139,92,246,0.2)", href: `/${locale}/admin/quotes` },
    { icon: Users, label: isAr ? "المستخدمين" : "Users", value: stats.totalUsers, gradient: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(236,72,153,0.05))", iconColor: "#EC4899", borderColor: "rgba(236,72,153,0.2)", href: `/${locale}/admin/users` },
    { icon: Eye, label: isAr ? "إجمالي الزوار" : "Total Visitors", value: stats.totalVisitors, gradient: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))", iconColor: "#6366F1", borderColor: "rgba(99,102,241,0.2)", href: "#" },
  ];

  const statusBadge = (status: string) => {
    const styles: Record<string, { bg: string; color: string; label: string }> = {
      new: { bg: "rgba(0,240,255,0.1)", color: "#00F0FF", label: isAr ? "جديد" : "New" },
      reviewed: { bg: "rgba(245,158,11,0.1)", color: "#fbbf24", label: isAr ? "تمت المراجعة" : "Reviewed" },
      closed: { bg: "rgba(16,185,129,0.1)", color: "#34d399", label: isAr ? "مغلق" : "Closed" },
    };
    const s = styles[status] || styles.new;
    return <span className="rounded-lg px-2.5 py-1 text-xs font-medium" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(0,240,255,0.08)" }}>
            <TrendingUp className="h-5 w-5" style={{ color: "var(--primary)" }} />
          </div>
          <div>
            <h1 className="font-almarai text-2xl font-bold">{t.title}</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{t.welcome}، {session?.name}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards — Clickable */}
      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <Link key={i} href={card.href} className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="absolute -top-12 -end-12 h-24 w-24 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: card.gradient }} />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{card.label}</p>
                <p className="mt-2 font-almarai text-4xl font-black" style={{ fontFamily: "'Space Mono', monospace" }}>{card.value}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110" style={{ background: card.gradient, border: `1px solid ${card.borderColor}` }}>
                <card.icon className="h-7 w-7" style={{ color: card.iconColor }} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Visitor Today Bar */}
      <div className="mb-10 overflow-hidden rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(99,102,241,0.1)" }}>
              <BarChart3 className="h-5 w-5" style={{ color: "#6366F1" }} />
            </div>
            <div>
              <p className="text-sm font-medium">{isAr ? "زوار اليوم" : "Today's Visitors"}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{isAr ? "عدد الزيارات منذ بداية اليوم" : "Page views since midnight"}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-black" style={{ fontFamily: "'Space Mono', monospace", color: "#6366F1" }}>{stats.todayVisitors}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{isAr ? "اليوم" : "Today"}</p>
            </div>
            <div className="h-10 w-[1px]" style={{ background: "var(--border)" }} />
            <div className="text-center">
              <p className="text-3xl font-black" style={{ fontFamily: "'Space Mono', monospace", color: "var(--primary)" }}>{stats.totalVisitors}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{isAr ? "الإجمالي" : "Total"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Data */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Messages */}
        <div className="overflow-hidden rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <h2 className="font-almarai text-lg font-bold">{t.recentMessages}</h2>
            <Link href={`/${locale}/admin/messages`} className="text-xs font-medium transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>{isAr ? "عرض الكل" : "View All"} →</Link>
          </div>
          <div className="p-4">
            {stats.recentMessages.length === 0 ? (
              <p className="py-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>{dict.admin.messages.noMessages}</p>
            ) : (
              <div className="space-y-2">
                {stats.recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center justify-between rounded-xl p-4 transition-all duration-300 hover:bg-[rgba(0,240,255,0.02)]" style={{ border: "1px solid transparent" }}>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{msg.fullName}</p>
                      <p className="mt-0.5 truncate text-xs" style={{ color: "var(--text-muted)" }}>{msg.subject}</p>
                    </div>
                    {statusBadge(msg.status)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="overflow-hidden rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <h2 className="font-almarai text-lg font-bold">{t.recentQuotes}</h2>
            <Link href={`/${locale}/admin/quotes`} className="text-xs font-medium transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>{isAr ? "عرض الكل" : "View All"} →</Link>
          </div>
          <div className="p-4">
            {stats.recentQuotes.length === 0 ? (
              <p className="py-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>{dict.admin.quotes.noQuotes}</p>
            ) : (
              <div className="space-y-2">
                {stats.recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between rounded-xl p-4 transition-all duration-300 hover:bg-[rgba(0,240,255,0.02)]">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{quote.fullName}</p>
                      <p className="mt-0.5 truncate text-xs" style={{ color: "var(--text-muted)" }}>{quote.email}</p>
                    </div>
                    {statusBadge(quote.status)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}