import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuoteForm from "@/components/forms/QuoteForm";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getPublishedServices, getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function QuotePage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ service?: string }> }) {
  const { locale } = await params;
  const { service: preselectedService } = await searchParams;
  const dict = await getDictionary(locale as Locale);
  const [services, settings] = await Promise.all([getPublishedServices(), getSiteSettings()]);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="pt-32">
        <section className="relative overflow-hidden pb-20 pt-10">
          <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(91,92,255,0.06)", top: "-20%", left: "50%", transform: "translateX(-50%)" }} />
          <div className="container-ace relative z-10 text-center">
            <p className="badge-ace anim-up mb-6">{dict.quote.subtitle}</p>
            <h1 className="anim-up delay-1 font-almarai text-4xl font-extrabold sm:text-5xl lg:text-6xl">{dict.quote.title}</h1>
            <p className="anim-up delay-2 mx-auto mt-5 max-w-xl text-lg" style={{ color: "var(--text-soft)" }}>{dict.quote.description}</p>
          </div>
        </section>

        <section className="section-divider section-padding">
          <div className="container-ace max-w-3xl">
            <QuoteForm dict={dict} services={services.map((s) => ({ id: s.id, titleAr: s.titleAr, titleEn: s.titleEn }))} locale={locale} preselectedService={preselectedService} />
          </div>
        </section>
      </main>
      <Footer locale={locale as Locale} dict={dict} settings={settings} />
    </>
  );
}