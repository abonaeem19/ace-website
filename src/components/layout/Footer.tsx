import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Locale } from "@/types";

interface FooterProps {
  locale: Locale;
  dict: { nav: Record<string, string>; footer: Record<string, string> };
  settings?: { phone?: string | null; email?: string | null; addressAr?: string | null; addressEn?: string | null } | null;
}

export default function Footer({ locale, dict, settings }: FooterProps) {
  const year = new Date().getFullYear();
  const address = locale === "ar" ? settings?.addressAr : settings?.addressEn;

  return (
    <footer className="relative z-10" style={{ borderTop: "1px solid rgba(0,240,255,0.08)" }}>
      <div className="container-ace py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-black text-black" style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", fontFamily: "'Space Mono', monospace" }}>ACE</div>
              <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "'Space Mono', monospace" }}>Advanced Code Engines</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{dict.footer.description}</p>
          </div>

          <div>
            <h3 className="mb-5 font-almarai font-bold text-white">{dict.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {[{ href: `/${locale}`, label: dict.nav.home }, { href: `/${locale}/about`, label: dict.nav.about }, { href: `/${locale}/services`, label: dict.nav.services }, { href: `/${locale}/projects`, label: dict.nav.projects }].map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-almarai font-bold text-white">{dict.footer.ourServices}</h3>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/quote`} className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>{dict.nav.quote}</Link></li>
              <li><Link href={`/${locale}/contact`} className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>{dict.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-almarai font-bold text-white">{dict.footer.contactUs}</h3>
            <ul className="space-y-4">
              {settings?.phone && <li className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}><Phone className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} /><span dir="ltr">{settings.phone}</span></li>}
              {settings?.email && <li className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}><Mail className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />{settings.email}</li>}
              {address && <li className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}><MapPin className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />{address}</li>}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-[60px] py-6" style={{ borderTop: "1px solid rgba(0,240,255,0.08)" }}>
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded text-[8px] font-black text-black" style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", fontFamily: "'Space Mono', monospace" }}>ACE</div>
          <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "'Space Mono', monospace" }}>© {year} Advanced Code Engines</span>
        </div>
        <div className="text-[11px]" style={{ fontFamily: "'Space Mono', monospace", color: "rgba(0,240,255,0.3)" }}>SYSTEM_ONLINE ● v2.0.0</div>
      </div>
    </footer>
  );
}