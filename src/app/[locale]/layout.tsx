import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, getDirection } from "@/lib/i18n";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "ACE | Advanced Code Engines — محركات الأكواد المتقدمة",
    template: "%s | ACE",
  },
  description: "شركة تقنية متخصصة في البرمجة وتقنية المعلومات، تقدم حلولًا رقمية متقدمة تشمل تطوير المواقع والتطبيقات، الأنظمة والمنصات، الأتمتة، والحلول الذكية والذكاء الاصطناعي.",
  keywords: ["ACE", "Advanced Code Engines", "تطوير مواقع", "تطبيقات جوال", "ذكاء اصطناعي", "أتمتة", "برمجة", "السعودية"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://ace-website-mu.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    siteName: "ACE - Advanced Code Engines",
    title: "ACE | محركات الأكواد المتقدمة",
    description: "شركة تقنية متخصصة في تطوير البرمجيات والحلول الرقمية المتقدمة والذكاء الاصطناعي",
  },
  robots: { index: true, follow: true },
};

export function generateStaticParams() { return [{ locale: "ar" }, { locale: "en" }]; }

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dir = getDirection(locale);
  const fontFamily = locale === "ar" ? "font-tajawal" : "font-inter";

  return (
    <html lang={locale} dir={dir} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${fontFamily} antialiased`} style={{ background: "var(--bg-main)", color: "var(--text-main)" }}>
        {children}
      </body>
    </html>
  );
}