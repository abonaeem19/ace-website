import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, getDirection } from "@/lib/i18n";
import "@/styles/globals.css";

export const metadata: Metadata = { title: "ACE | Advanced Code Engines", description: "شركة تقنية متخصصة في تطوير البرمجيات والحلول الرقمية المتقدمة" };

export function generateStaticParams() { return [{ locale: "ar" }, { locale: "en" }]; }

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dir = getDirection(locale);
  const fontFamily = locale === "ar" ? "font-tajawal" : "font-inter";

  return (
    <html lang={locale} dir={dir} className="scroll-smooth">
      <body className={`${fontFamily} bg-dark text-white antialiased`}>{children}</body>
    </html>
  );
}