import { Eye, Target, Award, Gem, Sparkles, Shield, Heart, Zap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const settings = await getSiteSettings();
  const about = locale === "ar" ? settings?.aboutAr : settings?.aboutEn;
  const vision = locale === "ar" ? settings?.visionAr : settings?.visionEn;
  const mission = locale === "ar" ? settings?.missionAr : settings?.missionEn;
  const values = [
    { icon: Sparkles, ...dict.about.valuesItems.innovation },
    { icon: Award, ...dict.about.valuesItems.quality },
    { icon: Shield, ...dict.about.valuesItems.trust },
    { icon: Heart, ...dict.about.valuesItems.excellence },
  ];

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="pt-32">
        {/* Hero Header */}
        <section className="relative overflow-hidden pb-20 pt-10">
          <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(91,92,255,0.06)", top: "-20%", left: "50%", transform: "translateX(-50%)" }} />
          <div className="container-ace relative z-10 text-center">
            <p className="badge-ace anim-up mb-6">{dict.about.subtitle}</p>
            <h1 className="anim-up delay-1 font-almarai text-4xl font-extrabold sm:text-5xl lg:text-6xl">{dict.about.title}</h1>
            <p className="anim-up delay-2 mx-auto mt-5 max-w-xl text-lg" style={{ color: "var(--text-soft)" }}>{dict.about.description}</p>
          </div>
        </section>

        {/* About Text */}
        {about && (
          <section className="section-padding section-divider">
            <div className="container-ace">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-lg leading-loose" style={{ color: "var(--text-soft)" }}>{about}</p>
              </div>
            </div>
          </section>
        )}

        {/* Vision & Mission */}
        <section className="section-padding">
          <div className="container-ace grid gap-8 md:grid-cols-2">
            {vision && (
              <div className="card-ace p-8 text-center">
                <div className="relative z-10">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "rgba(91,92,255,0.1)", border: "1px solid rgba(91,92,255,0.15)" }}>
                    <Eye className="h-8 w-8" style={{ color: "var(--primary)" }} />
                  </div>
                  <h2 className="mb-4 font-almarai text-2xl font-bold">{dict.about.vision}</h2>
                  <p className="leading-relaxed" style={{ color: "var(--text-soft)" }}>{vision}</p>
                </div>
              </div>
            )}
            {mission && (
              <div className="card-ace p-8 text-center">
                <div className="relative z-10">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "rgba(122,92,255,0.1)", border: "1px solid rgba(122,92,255,0.15)" }}>
                    <Target className="h-8 w-8" style={{ color: "var(--primary-2)" }} />
                  </div>
                  <h2 className="mb-4 font-almarai text-2xl font-bold">{dict.about.mission}</h2>
                  <p className="leading-relaxed" style={{ color: "var(--text-soft)" }}>{mission}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Values */}
        <section className="section-divider section-padding">
          <div className="container-ace">
            <h2 className="mb-14 text-center font-almarai text-3xl font-extrabold sm:text-4xl">{dict.about.values}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <div key={i} className="card-ace group p-7 text-center">
                  <div className="relative z-10">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110" style={{ background: "rgba(91,92,255,0.08)", border: "1px solid rgba(91,92,255,0.1)" }}>
                      <v.icon className="h-7 w-7" style={{ color: "var(--primary)" }} />
                    </div>
                    <h3 className="mb-2 font-almarai text-lg font-bold">{v.title}</h3>
                    <p className="text-sm" style={{ color: "var(--text-soft)" }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale as Locale} dict={dict} settings={settings} />
    </>
  );
}