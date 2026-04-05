import Link from "next/link";
import Image from "next/image";
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
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-soft)" }}>
      <div className="container-ace py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5">
              <Image src="/images/ace-logo.png" alt="ACE" width={150} height={45} className="h-[35px] w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{dict.footer.description}</p>
          </div>

          <div>
            <h3 className="mb-5 font-almarai font-bold">{dict.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {[{ href: `/${locale}`, label: dict.nav.home }, { href: `/${locale}/about`, label: dict.nav.about }, { href: `/${locale}/services`, label: dict.nav.services }, { href: `/${locale}/projects`, label: dict.nav.projects }].map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm transition-colors duration-300 hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-almarai font-bold">{dict.footer.ourServices}</h3>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/quote`} className="text-sm transition-colors duration-300 hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>{dict.nav.quote}</Link></li>
              <li><Link href={`/${locale}/contact`} className="text-sm transition-colors duration-300 hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>{dict.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-almarai font-bold">{dict.footer.contactUs}</h3>
            <ul className="space-y-4">
              {settings?.phone && <li className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}><Phone className="h-4 w-4" style={{ color: "var(--primary)" }} /><span dir="ltr">{settings.phone}</span></li>}
              {settings?.email && <li className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}><Mail className="h-4 w-4" style={{ color: "var(--primary)" }} />{settings.email}</li>}
              {address && <li className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}><MapPin className="h-4 w-4" style={{ color: "var(--primary)" }} />{address}</li>}
            </ul>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container-ace flex items-center justify-center py-6">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>&copy; {year} ACE — Advanced Code Engines. {dict.footer.rights}.</p>
        </div>
      </div>
    </footer>
  );
}