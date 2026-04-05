"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import type { Locale } from "@/types";

interface HeaderProps {
  locale: Locale;
  dict: { nav: { home: string; about: string; services: string; projects: string; quote: string; contact: string; switchLang: string } };
}

export default function Header({ locale, dict }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const otherLocale = locale === "ar" ? "en" : "ar";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <header
      className="fixed top-0 z-50 w-full transition-all duration-500"
      style={{
        background: scrolled ? "var(--header-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        padding: scrolled ? "8px 0" : "16px 0",
      }}
    >
      <div className="container-ace flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center transition-transform duration-300 hover:scale-105">
          <Image src="/images/ace-logo.png" alt="ACE - Advanced Code Engines" width={220} height={65} className="h-[60px] w-auto object-contain sm:h-[70px] lg:h-[80px]" priority />
        </Link>

        <nav className="hidden items-center lg:flex">
          <div className="glass-panel flex items-center gap-1 px-2 py-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href} className="relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300" style={{ color: isActive ? "var(--primary)" : "var(--text-soft)", background: isActive ? "rgba(91, 92, 255, 0.1)" : "transparent" }}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link href={switchedPath} className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm transition-all duration-300" style={{ color: "var(--text-muted)" }}>
            <Globe className="h-4 w-4" />{dict.nav.switchLang}
          </Link>
          <Link href={`/${locale}/quote`} className="btn-primary !py-2.5 !px-6 !text-sm">{dict.nav.quote}</Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="rounded-xl p-2.5 transition-all duration-300 lg:hidden" style={{ color: "var(--text-soft)", background: isOpen ? "rgba(91,92,255,0.1)" : "transparent" }}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden" style={{ borderTop: "1px solid var(--border)", background: "var(--mobile-bg)", backdropFilter: "blur(20px)" }}>
          <div className="container-ace space-y-1 py-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-3 text-base transition-all" style={{ color: "var(--text-soft)" }}>{link.label}</Link>
            ))}
            <div className="flex items-center gap-3 pt-4">
              <ThemeToggle />
              <Link href={switchedPath} className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm" style={{ color: "var(--text-muted)" }}><Globe className="h-4 w-4" />{dict.nav.switchLang}</Link>
              <Link href={`/${locale}/quote`} className="btn-primary !py-2.5 !text-sm" onClick={() => setIsOpen(false)}>{dict.nav.quote}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}