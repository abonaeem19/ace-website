"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Layers, FolderKanban, MessageSquare, FileText, Settings, LogOut, ExternalLink } from "lucide-react";
import { logoutAction } from "@/lib/actions";

export default function AdminSidebar({ locale, dict }: { locale: string; dict: Record<string, any> }) {
  const pathname = usePathname();
  const t = dict.admin.sidebar;

  const links = [
    { href: `/${locale}/admin`, label: t.dashboard, icon: LayoutDashboard },
    { href: `/${locale}/admin/services`, label: t.services, icon: Layers },
    { href: `/${locale}/admin/projects`, label: t.projects, icon: FolderKanban },
    { href: `/${locale}/admin/messages`, label: t.messages, icon: MessageSquare },
    { href: `/${locale}/admin/quotes`, label: t.quotes, icon: FileText },
    { href: `/${locale}/admin/settings`, label: t.settings, icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 start-0 z-40 flex w-64 flex-col" style={{ background: "var(--bg-soft)", borderInlineEnd: "1px solid var(--border)" }}>
      <div className="flex h-16 items-center gap-3 px-5" style={{ borderBottom: "1px solid var(--border)" }}>
        <Image src="/images/ace-logo.png" alt="ACE" width={100} height={30} className="h-8 w-auto object-contain" />
        <span className="rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: "rgba(91,92,255,0.15)", color: "var(--primary)" }}>Admin</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== `/${locale}/admin` && pathname.startsWith(link.href));
          return (
            <Link key={link.href} href={link.href} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300" style={{
              color: isActive ? "var(--primary)" : "var(--text-soft)",
              background: isActive ? "rgba(91,92,255,0.1)" : "transparent",
            }}>
              <link.icon className="h-5 w-5" />{link.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-1 p-4" style={{ borderTop: "1px solid var(--border)" }}>
        <Link href={`/${locale}`} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all" style={{ color: "var(--text-muted)" }}>
          <ExternalLink className="h-5 w-5" />{t.backToSite}
        </Link>
        <form action={logoutAction}>
          <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all" style={{ color: "#f87171" }}>
            <LogOut className="h-5 w-5" />{t.logout}
          </button>
        </form>
      </div>
    </aside>
  );
}