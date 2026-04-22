"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Terminal } from "lucide-react";
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
    const handleScroll = () => setScrolled(window.scrollY > 60);
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
    <header className="fixed top-0 z-[100] w-full transition-all duration-400" style={{
      height: 64,
      background: scrolled ? "var(--header-bg)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,240,255,0.08)" : "none",
    }}>
      <div className="container-ace flex h-full items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black text-black" style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", fontFamily: "'Space Mono', monospace" }}>ACE</div>
          <div>
            <div className="text-[13px] font-bold leading-[1.1] text-white">محركات الأكواد</div>
            <div className="text-[10px] tracking-wider" style={{ color: "var(--text-muted)", fontFamily: "'Space Mono', monospace" }}>ADVANCED CODE ENGINES</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} className="relative rounded-lg px-4 py-2 text-sm transition-all duration-300" style={{ color: isActive ? "white" : "rgba(255,255,255,0.6)" }}>
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-[1px] transition-transform duration-300" style={{ background: "var(--primary)", transform: isActive ? "scaleX(1)" : "scaleX(0)" }} />
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href={switchedPath} className="rounded-lg px-3 py-2 text-sm transition-all" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Globe className="inline h-4 w-4" /> {dict.nav.switchLang}
          </Link>
          <Link href={`/${locale}/quote`} className="btn-primary !py-2.5 !px-5 !text-[13px]">
            <Terminal className="h-3.5 w-3.5" />{dict.nav.quote}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="rounded-lg p-2 lg:hidden" style={{ color: "rgba(255,255,255,0.6)" }}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden" style={{ borderTop: "1px solid rgba(0,240,255,0.08)", background: "var(--mobile-bg)", backdropFilter: "blur(20px)" }}>
          <div className="container-ace space-y-1 py-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-3 text-base" style={{ color: "rgba(255,255,255,0.6)" }}>{link.label}</Link>
            ))}
            <div className="flex items-center gap-3 pt-4">
              <Link href={switchedPath} className="px-4 py-2 text-sm" style={{ color: "var(--text-muted)" }}>{dict.nav.switchLang}</Link>
              <Link href={`/${locale}/quote`} className="btn-primary !py-2.5 !text-sm" onClick={() => setIsOpen(false)}>{dict.nav.quote}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}