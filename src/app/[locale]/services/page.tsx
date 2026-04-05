import Link from "next/link";
import { Code2, Smartphone, Server, Shield, Workflow, Headphones, Brain, Bot, Lightbulb, Globe, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getPublishedServices, getSiteSettings } from "@/lib/queries";
import { getLocalizedField } from "@/lib/utils";

export const dynamic = "force-dynamic";

const iconMap: Record<string, React.ElementType> = { globe: Globe, code: Code2, smartphone: Smartphone, server: Server, shield: Shield, workflow: Workflow, headphones: Headphones, brain: Brain, bot: Bot, lightbulb: Lightbulb };

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const [services, settings] = await Promise.all([getPublishedServices(), getSiteSettings()]);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="pt-32">
        <section className="relative overflow-hidden pb-20 pt-10">
          <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(91,92,255,0.06)", top: "-20%", left: "50%", transform: "translateX(-50%)" }} />
          <div className="container-ace relative z-10 text-center">
            <p className="badge-ace anim-up mb-6">{dict.services.subtitle}</p>
            <h1 className="anim-up delay-1 font-almarai text-4xl font-extrabold sm:text-5xl lg:text-6xl">{dict.services.title}</h1>
            <p className="anim-up delay-2 mx-auto mt-5 max-w-xl text-lg" style={{ color: "var(--text-soft)" }}>{dict.services.description}</p>
          </div>
        </section>

        <section className="section-divider section-padding">
          <div className="container-ace">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => {
                const Icon = iconMap[service.icon] || Code2;
                return (
                  <div key={service.id} className="card-ace group p-8">
                    <div className="relative z-10">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110" style={{ background: "rgba(91,92,255,0.08)", border: "1px solid rgba(91,92,255,0.1)" }}>
                        <Icon className="h-8 w-8" style={{ color: "var(--primary)" }} />
                      </div>
                      <h3 className="mb-3 font-almarai text-xl font-bold">{getLocalizedField(service, "title", locale as Locale)}</h3>
                      <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>{getLocalizedField(service, "description", locale as Locale)}</p>
                      <Link href={`/${locale}/quote?service=${service.id}`} className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3" style={{ color: "var(--primary)" }}>
                        {dict.services.requestQuote} <Arrow className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale as Locale} dict={dict} settings={settings} />
    </>
  );
}