import Link from "next/link";
import { ArrowLeft, ArrowRight, Code2, Smartphone, Server, Shield, Workflow, Headphones, Brain, Bot, Lightbulb, Zap, Users, Clock, Lock, Sparkles, Globe, Cpu, Layers, ExternalLink, ChevronLeft, ChevronRight, Monitor, Cog } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getPublishedServices, getPublishedProjects, getSiteSettings } from "@/lib/queries";
import { getLocalizedField } from "@/lib/utils";

export const dynamic = "force-dynamic";

const iconMap: Record<string, React.ElementType> = { globe: Globe, code: Code2, smartphone: Smartphone, server: Server, shield: Shield, workflow: Workflow, headphones: Headphones, brain: Brain, bot: Bot, lightbulb: Lightbulb };

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const [services, projects, settings] = await Promise.all([getPublishedServices(), getPublishedProjects(), getSiteSettings()]);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const Chevron = locale === "ar" ? ChevronLeft : ChevronRight;
  const isAr = locale === "ar";

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO (Premium Cinematic)
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[100vh] items-center overflow-hidden">
        {/* Layered Background */}
        <div className="absolute inset-0 bg-grid-ace" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(91,92,255,0.12) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(122,92,255,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 10% 60%, rgba(47,123,255,0.05) 0%, transparent 50%)" }} />

        {/* Animated Orbs */}
        <div className="glow-orb" style={{ width: 800, height: 800, background: "rgba(91,92,255,0.07)", top: "-30%", left: "50%", transform: "translateX(-50%)" }} />
        <div className="glow-orb" style={{ width: 400, height: 400, background: "rgba(122,92,255,0.05)", bottom: "5%", right: "5%", animationDelay: "4s" }} />

        <div className="container-ace relative z-10 pb-20 pt-36">
          <div className="mx-auto max-w-5xl">
            {/* Center Content */}
            <div className="text-center">
              {/* Badge */}
              <div className="anim-up mb-10 inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-sm font-medium" style={{ background: "rgba(91,92,255,0.08)", border: "1px solid rgba(91,92,255,0.15)", color: "var(--primary)" }}>
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary)] opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary)]"></span></span>
                {dict.hero.badge}
              </div>

              {/* Main Title — Extra Large */}
              <h1 className="anim-up delay-1 font-almarai text-[3.2rem] font-black leading-[1.08] tracking-tight sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem]">
                {dict.hero.title}
                <br />
                <span className="gradient-text">{dict.hero.titleHighlight}</span>
              </h1>

              {/* Description */}
              <p className="anim-up delay-2 mx-auto mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: "var(--text-soft)" }}>
                {dict.hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="anim-up delay-3 mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
                <Link href={`/${locale}/quote`} className="btn-primary px-10 py-5 text-lg">
                  {dict.hero.cta}
                  <Arrow className="h-5 w-5" />
                </Link>
                <Link href={`/${locale}/about`} className="btn-secondary px-10 py-5 text-lg">
                  {dict.hero.ctaSecondary}
                </Link>
              </div>
            </div>

            {/* Floating Stats Panel */}
            <div className="anim-up delay-5 mx-auto mt-24 max-w-4xl">
              <div className="relative overflow-hidden rounded-2xl p-[1px]" style={{ background: "linear-gradient(135deg, rgba(91,92,255,0.3), rgba(122,92,255,0.1), rgba(47,123,255,0.2))" }}>
                <div className="rounded-2xl p-8" style={{ background: "var(--bg-card)" }}>
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {[
                      { value: "150+", label: dict.stats.projects, icon: Layers },
                      { value: "80+", label: dict.stats.clients, icon: Users },
                      { value: "10+", label: dict.stats.experience, icon: Clock },
                      { value: "25+", label: dict.stats.team, icon: Cpu },
                    ].map((stat, i) => (
                      <div key={i} className="group text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110" style={{ background: "rgba(91,92,255,0.08)", border: "1px solid rgba(91,92,255,0.1)" }}>
                          <stat.icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                        </div>
                        <div className="font-almarai text-3xl font-black sm:text-4xl" style={{ color: "var(--primary)" }}>{stat.value}</div>
                        <div className="mt-1 text-xs font-medium" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, var(--bg-main), transparent)" }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — SPLIT SHOWCASE (Two dramatic cards)
          ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(91,92,255,0.04)", top: "20%", left: "-10%", animationDelay: "2s" }} />

        <div className="container-ace relative z-10">
          <div className="mb-20 text-center">
            <div className="badge-ace anim-up mb-5">{isAr ? "ما نقدمه" : "What We Offer"}</div>
            <h2 className="anim-up delay-1 font-almarai text-3xl font-black sm:text-4xl lg:text-5xl">
              {isAr ? "حلول تقنية" : "Tech Solutions"}{" "}
              <span className="gradient-text">{isAr ? "شاملة" : "That Scale"}</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Card 1 — Development */}
            <div className="group relative overflow-hidden rounded-3xl transition-all duration-700 hover:-translate-y-2" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              {/* Top Glow */}
              <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(circle, rgba(91,92,255,0.2), transparent)" }} />

              <div className="relative z-10 p-10 lg:p-12">
                {/* Icon + Badge row */}
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg" style={{ background: "linear-gradient(135deg, rgba(91,92,255,0.15), rgba(91,92,255,0.05))", border: "1px solid rgba(91,92,255,0.2)", boxShadow: "0 0 0 rgba(91,92,255,0)" }}>
                    <Monitor className="h-10 w-10" style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <h3 className="font-almarai text-2xl font-bold lg:text-3xl">{isAr ? "التطوير والبرمجة" : "Development"}</h3>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{isAr ? "Web · Mobile · Systems" : "Web · Mobile · Systems"}</p>
                  </div>
                </div>

                <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
                  {isAr ? "مواقع إلكترونية، تطبيقات جوال، أنظمة ومنصات رقمية متكاملة — مبنية بأحدث التقنيات وأعلى معايير الجودة والأداء." : "Websites, mobile apps, digital systems and platforms — built with the latest technologies and highest quality standards."}
                </p>

                {/* Tags */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {(isAr ? ["Next.js", "React Native", "Node.js", "PostgreSQL", "TypeScript"] : ["Next.js", "React Native", "Node.js", "PostgreSQL", "TypeScript"]).map((tag) => (
                    <span key={tag} className="rounded-lg px-3 py-1.5 text-xs font-medium" style={{ background: "rgba(91,92,255,0.06)", color: "var(--primary)", border: "1px solid rgba(91,92,255,0.1)" }}>{tag}</span>
                  ))}
                </div>

                <Link href={`/${locale}/services`} className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 hover:gap-3" style={{ color: "var(--primary)" }}>
                  {isAr ? "استكشف خدمات التطوير" : "Explore development services"} <Chevron className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Card 2 — AI & Automation */}
            <div className="group relative overflow-hidden rounded-3xl transition-all duration-700 hover:-translate-y-2" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(circle, rgba(122,92,255,0.2), transparent)" }} />

              <div className="relative z-10 p-10 lg:p-12">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg" style={{ background: "linear-gradient(135deg, rgba(122,92,255,0.15), rgba(122,92,255,0.05))", border: "1px solid rgba(122,92,255,0.2)" }}>
                    <Brain className="h-10 w-10" style={{ color: "var(--primary-2)" }} />
                  </div>
                  <div>
                    <h3 className="font-almarai text-2xl font-bold lg:text-3xl">{isAr ? "الذكاء الاصطناعي" : "AI & Automation"}</h3>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{isAr ? "AI · Bots · Automation" : "AI · Bots · Automation"}</p>
                  </div>
                </div>

                <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--text-soft)" }}>
                  {isAr ? "حلول ذكاء اصطناعي، موظفين افتراضيين، أتمتة عمليات وتكامل أنظمة — لرفع كفاءة أعمالك وتحسين تجربة عملائك." : "AI solutions, virtual employees, process automation and system integration — to boost your efficiency and improve customer experience."}
                </p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {(isAr ? ["ChatGPT API", "LangChain", "Automation", "Chatbots", "ML Models"] : ["ChatGPT API", "LangChain", "Automation", "Chatbots", "ML Models"]).map((tag) => (
                    <span key={tag} className="rounded-lg px-3 py-1.5 text-xs font-medium" style={{ background: "rgba(122,92,255,0.06)", color: "var(--primary-2)", border: "1px solid rgba(122,92,255,0.1)" }}>{tag}</span>
                  ))}
                </div>

                <Link href={`/${locale}/services`} className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 hover:gap-3" style={{ color: "var(--primary-2)" }}>
                  {isAr ? "استكشف حلول الذكاء الاصطناعي" : "Explore AI solutions"} <Chevron className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — SERVICES GRID
          ═══════════════════════════════════════════════════════════ */}
      <section className="section-divider section-padding relative overflow-hidden">
        <div className="container-ace relative z-10">
          <div className="mb-16 text-center">
            <div className="badge-ace mb-5">{dict.services.subtitle}</div>
            <h2 className="font-almarai text-3xl font-black sm:text-4xl lg:text-5xl">{dict.services.title}</h2>
            <p className="mx-auto mt-4 max-w-xl" style={{ color: "var(--text-soft)" }}>{dict.services.description}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 9).map((service) => {
              const Icon = iconMap[service.icon] || Code2;
              return (
                <Link key={service.id} href={`/${locale}/quote?service=${service.id}`} className="card-ace group p-7">
                  <div className="relative z-10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110" style={{ background: "rgba(91,92,255,0.08)", border: "1px solid rgba(91,92,255,0.1)" }}>
                      <Icon className="h-7 w-7" style={{ color: "var(--primary)" }} />
                    </div>
                    <h3 className="mb-2 font-almarai text-lg font-bold">{getLocalizedField(service, "title", locale as Locale)}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>{getLocalizedField(service, "shortDescription", locale as Locale)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — PROJECTS PREVIEW
          ═══════════════════════════════════════════════════════════ */}
      {projects.length > 0 && (
        <section className="section-padding relative overflow-hidden">
          <div className="glow-orb" style={{ width: 400, height: 400, background: "rgba(122,92,255,0.04)", bottom: "10%", right: "-5%", animationDelay: "3s" }} />

          <div className="container-ace relative z-10">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <div className="badge-ace mb-5">{dict.projects.subtitle}</div>
                <h2 className="font-almarai text-3xl font-black sm:text-4xl lg:text-5xl">{dict.projects.title}</h2>
              </div>
              <Link href={`/${locale}/projects`} className="btn-secondary hidden sm:inline-flex">
                {dict.projects.viewAll} <Arrow className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="group relative overflow-hidden rounded-2xl transition-all duration-700 hover:-translate-y-2" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="aspect-[16/10] overflow-hidden">
                    {project.coverImage ? (
                      <img src={project.coverImage} alt={getLocalizedField(project, "title", locale as Locale)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="flex h-full items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(91,92,255,0.08), rgba(122,92,255,0.05))" }}>
                        <span className="font-almarai text-4xl font-black" style={{ color: "rgba(91,92,255,0.15)" }}>ACE</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-almarai text-lg font-bold">{getLocalizedField(project, "title", locale as Locale)}</h3>
                    <p className="text-sm" style={{ color: "var(--text-soft)" }}>{getLocalizedField(project, "shortDescription", locale as Locale)}</p>
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300" style={{ color: "var(--primary)" }}>
                        {dict.projects.viewProject} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center sm:hidden">
              <Link href={`/${locale}/projects`} className="btn-secondary">{dict.projects.viewAll} <Arrow className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — WHY ACE
          ═══════════════════════════════════════════════════════════ */}
      <section className="section-divider section-padding">
        <div className="container-ace">
          <div className="mb-16 text-center">
            <div className="badge-ace mb-5">{dict.whyAce.subtitle}</div>
            <h2 className="font-almarai text-3xl font-black sm:text-4xl lg:text-5xl">{dict.whyAce.title}</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, ...dict.whyAce.items.tech },
              { icon: Users, ...dict.whyAce.items.team },
              { icon: Clock, ...dict.whyAce.items.support },
              { icon: Lock, ...dict.whyAce.items.security },
            ].map((item, i) => (
              <div key={i} className="group text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-xl" style={{ background: "linear-gradient(135deg, rgba(91,92,255,0.1), rgba(91,92,255,0.03))", border: "1px solid rgba(91,92,255,0.12)" }}>
                  <item.icon className="h-9 w-9" style={{ color: "var(--primary)" }} />
                </div>
                <h3 className="mb-2 font-almarai text-xl font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — FINAL CTA (Dramatic)
          ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="container-ace">
          <div className="relative overflow-hidden rounded-[2rem] p-14 text-center sm:p-20" style={{ background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-2) 100%)", border: "1px solid var(--border)" }}>
            {/* Multiple glow layers */}
            <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(91,92,255,0.15), transparent 60%)" }} />
            <div className="absolute bottom-0 right-0 h-[300px] w-[300px] translate-x-1/3 translate-y-1/3 rounded-full" style={{ background: "radial-gradient(circle, rgba(122,92,255,0.1), transparent 60%)" }} />
            <div className="absolute bottom-0 left-0 h-[200px] w-[200px] -translate-x-1/4 translate-y-1/4 rounded-full" style={{ background: "radial-gradient(circle, rgba(47,123,255,0.08), transparent 60%)" }} />

            <div className="relative z-10">
              <h2 className="font-almarai text-3xl font-black sm:text-4xl lg:text-5xl">{dict.cta.title}</h2>
              <p className="mx-auto mt-6 max-w-lg text-lg" style={{ color: "var(--text-soft)" }}>{dict.cta.description}</p>
              <div className="mt-12">
                <Link href={`/${locale}/quote`} className="btn-primary px-12 py-5 text-lg">
                  {dict.cta.button}
                  <Arrow className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale as Locale} dict={dict} settings={settings} />
    </>
  );
}