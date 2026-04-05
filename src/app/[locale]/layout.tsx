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
  keywords: ["ACE", "Advanced Code Engines", "تطوير مواقع", "تطبيقات جوال", "ذكاء اصطناعي", "أتمتة", "برمجة", "السعودية", "حلول تقنية"],
  authors: [{ name: "ACE - Advanced Code Engines" }],
  creator: "ACE",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://ace-website-mu.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    siteName: "ACE - Advanced Code Engines",
    title: "ACE | محركات الأكواد المتقدمة",
    description: "شركة تقنية متخصصة في تطوير البرمجيات والحلول الرقمية المتقدمة والذكاء الاصطناعي",
    images: [{ url: "/images/ace-logo.png", width: 800, height: 400, alt: "ACE Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE | Advanced Code Engines",
    description: "شركة تقنية متخصصة في تطوير البرمجيات والحلول الرقمية المتقدمة",
    images: ["/images/ace-logo.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/images/ace-logo.png" },
};

export function generateStaticParams() { return [{ locale: "ar" }, { locale: "en" }]; }

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dir = getDirection(locale);
  const fontFamily = locale === "ar" ? "font-tajawal" : "font-inter";

  return (
    <html lang={locale} dir={dir} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('ace-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()` }} />
      </head>
      <body className={`${fontFamily} antialiased`} style={{ background: "var(--bg-main)", color: "var(--text-main)" }}>
        {children}
      </body>
    </html>
  );
}