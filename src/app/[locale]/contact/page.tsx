import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/forms/ContactForm";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const settings = await getSiteSettings();
  const t = dict.contact;
  const address = locale === "ar" ? settings?.addressAr : settings?.addressEn;

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="pt-32">
        <section className="relative overflow-hidden pb-20 pt-10">
          <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(91,92,255,0.06)", top: "-20%", left: "50%", transform: "translateX(-50%)" }} />
          <div className="container-ace relative z-10 text-center">
            <p className="badge-ace anim-up mb-6">{t.subtitle}</p>
            <h1 className="anim-up delay-1 font-almarai text-4xl font-extrabold sm:text-5xl lg:text-6xl">{t.title}</h1>
            <p className="anim-up delay-2 mx-auto mt-5 max-w-xl text-lg" style={{ color: "var(--text-soft)" }}>{t.description}</p>
          </div>
        </section>

        <section className="section-divider section-padding">
          <div className="container-ace">
            <div className="grid gap-10 lg:grid-cols-3">
              <div className="space-y-5">
                <h2 className="font-almarai text-xl font-bold">{t.info.title}</h2>
                {settings?.phone && (
                  <div className="card-ace flex items-center gap-4 !p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(91,92,255,0.1)" }}><Phone className="h-5 w-5" style={{ color: "var(--primary)" }} /></div>
                    <div><p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.info.phone}</p><p dir="ltr" className="font-medium">{settings.phone}</p></div>
                  </div>
                )}
                {settings?.email && (
                  <div className="card-ace flex items-center gap-4 !p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(91,92,255,0.1)" }}><Mail className="h-5 w-5" style={{ color: "var(--primary)" }} /></div>
                    <div><p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.info.email}</p><p className="font-medium">{settings.email}</p></div>
                  </div>
                )}
                {settings?.whatsapp && (
                  <div className="card-ace flex items-center gap-4 !p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(91,92,255,0.1)" }}><MessageCircle className="h-5 w-5" style={{ color: "var(--primary)" }} /></div>
                    <div><p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.info.whatsapp}</p><p dir="ltr" className="font-medium">{settings.whatsapp}</p></div>
                  </div>
                )}
                {address && (
                  <div className="card-ace flex items-center gap-4 !p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(91,92,255,0.1)" }}><MapPin className="h-5 w-5" style={{ color: "var(--primary)" }} /></div>
                    <div><p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.info.address}</p><p className="font-medium">{address}</p></div>
                  </div>
                )}
              </div>
              <div className="lg:col-span-2"><ContactForm dict={dict} /></div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale as Locale} dict={dict} settings={settings} />
    </>
  );
}