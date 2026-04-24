import Link from "next/link";
import { ArrowLeft, ArrowRight, Code2, Smartphone, Server, Shield, Workflow, Headphones, Brain, Bot, Lightbulb, Zap, Users, Clock, Lock, Globe, Cpu, Settings, Terminal, ChevronDown, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroClient from "@/components/home/HeroClient";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getPublishedServices, getPublishedProjects, getSiteSettings } from "@/lib/queries";
import { getLocalizedField } from "@/lib/utils";

export const dynamic = "force-dynamic";

const svcIcons: Record<string, { icon: any; color: string; bg: string }> = {
  globe:     { icon: Globe,     color: "#00F0FF", bg: "rgba(0,240,255,0.08)" },
  code:      { icon: Code2,     color: "#00F0FF", bg: "rgba(0,240,255,0.08)" },
  smartphone:{ icon: Smartphone,color: "#10B981", bg: "rgba(16,185,129,0.08)" },
  server:    { icon: Server,    color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
  shield:    { icon: Shield,    color: "#06B6D4", bg: "rgba(6,182,212,0.08)" },
  workflow:  { icon: Workflow,   color: "#EF4444", bg: "rgba(239,68,68,0.08)" },
  headphones:{ icon: Headphones, color: "#F97316", bg: "rgba(249,115,22,0.08)" },
  brain:     { icon: Brain,     color: "#8B5CF6", bg: "rgba(139,92,246,0.08)" },
  bot:       { icon: Bot,       color: "#EC4899", bg: "rgba(236,72,153,0.08)" },
  lightbulb: { icon: Lightbulb, color: "#84CC16", bg: "rgba(132,204,22,0.08)" },
};

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

      {/* Atmosphere */}
      <div className="bg-grid-ace" />
      <div className="scanlines" />

      {/* ══════ HERO ══════ */}
      <section className="relative flex min-h-[100vh] items-center overflow-hidden" style={{ padding: "100px 0 60px" }}>
        {/* Orbs */}
        <div className="glow-orb" style={{ width: 600, height: 600, background: "rgba(139,92,246,0.08)", left: "-10%", top: "-20%" }} />
        <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(0,240,255,0.06)", right: "-5%", top: "30%", animationDelay: "1s" }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(245,158,11,0.05)", left: "20%", bottom: "10%", animationDelay: "2s" }} />

        <div className="container-ace relative z-10">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
            {/* Text */}
            <div className="flex-1">
              {/* Tag */}
              <div className="badge-ace anim-up mb-7">
                <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary)] opacity-75"></span><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--primary)]"></span></span>
                {dict.hero.badge}
              </div>

              {/* Glitch Title */}
              <h1 className="glitch anim-up delay-1 font-almarai leading-[1.1]" data-text={dict.hero.title} style={{ fontSize: "clamp(42px, 5vw, 76px)", fontWeight: 900, color: "white", marginBottom: 8 }}>
                {dict.hero.title}
              </h1>
              <h1 className="anim-up delay-2 font-almarai leading-[1.1]" style={{ fontSize: "clamp(42px, 5vw, 76px)", fontWeight: 900, marginBottom: 28 }}>
                <span className="gradient-text">{dict.hero.titleHighlight}</span>
              </h1>

              {/* Description */}
              <p className="anim-up delay-3 mb-10 max-w-[520px] text-[15px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.45)" }}>
                {dict.hero.description}
              </p>

              {/* CTAs */}
              <div className="anim-up delay-4 mb-12 flex flex-wrap gap-4">
                <Link href={`/${locale}/quote`} className="btn-primary">
                  <Terminal className="h-4 w-4" />
                  {dict.hero.cta}
                </Link>
                <Link href={`/${locale}/about`} className="btn-secondary">
                  {dict.hero.ctaSecondary}
                </Link>
              </div>

              {/* Tech badges */}
              <div className="anim-up delay-5 flex flex-wrap gap-2">
                {["Next.js","React","TypeScript","Python","LangChain","Node.js"].map(t => (
                  <span key={t} className="tech-badge">
                    <span className="inline-block h-[5px] w-[5px] rounded-full bg-[var(--primary)]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Client-side interactive */}
            <HeroClient />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2" style={{ color: "var(--text-muted)", fontSize: 11, fontFamily: "'Space Mono', monospace" }}>
          <span>SCROLL</span>
          <ChevronDown className="h-4 w-4" style={{ animation: "scrollDown 1.5s infinite" }} />
        </div>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section className="section-padding relative z-10">
        <div className="container-ace">
          <div className="mb-[60px] text-center">
            <div className="badge-ace mb-5 inline-flex"><Terminal className="h-3 w-3" /> SERVICES_MATRIX</div>
            <h2 className="font-almarai font-black" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "white", marginBottom: 16 }}>
              {isAr ? "حلول " : "Comprehensive "}
              <span className="gradient-text">{isAr ? "تقنية شاملة" : "Tech Solutions"}</span>
            </h2>
            <p className="mx-auto max-w-[520px] text-[15px]" style={{ color: "var(--text-muted)" }}>{dict.services.description}</p>
          </div>

          <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {services.slice(0, 9).map((service, i) => {
              const s = svcIcons[service.icon] || svcIcons.code;
              const Icon = s.icon;
              return (
                <Link key={service.id} href={`/${locale}/quote?service=${service.id}`} className="card-ace group block !cursor-pointer">
                  <div className="relative z-10">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300" style={{ background: s.bg, border: `1px solid ${s.color}30` }}>
                      <Icon className="h-[22px] w-[22px]" style={{ color: s.color }} />
                    </div>
                    <div className="mb-1.5 text-xs" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>
                      {getLocalizedField(service, "title", "en" as Locale)}
                    </div>
                    <h3 className="mb-3 font-almarai text-lg font-bold text-white">{getLocalizedField(service, "title", locale as Locale)}</h3>
                    <p className="text-[13px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {getLocalizedField(service, "shortDescription", locale as Locale)}
                    </p>
                    {/* Bottom glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════ TECH MARQUEE ══════ */}
      <section className="section-divider relative z-10 overflow-hidden py-6">
        <div className="mb-5 text-center text-xs tracking-[2px]" style={{ color: "var(--text-muted)", fontFamily: "'Space Mono', monospace" }}>— TECH STACK —</div>
        <div className="flex overflow-hidden">
          <div className="flex gap-8 whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
            {[...Array(2)].flatMap(() => ["Next.js","React Native","Node.js","TypeScript","PostgreSQL","ChatGPT API","LangChain","Python","Docker","AWS","Supabase","Prisma","GraphQL","FastAPI","Redis","TailwindCSS","Figma","n8n"]).map((t, i) => (
              <span key={i} className="inline-flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Space Mono', monospace" }}>
                <span className="inline-block h-1 w-1 rounded-full bg-[var(--primary)]" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PROJECTS PREVIEW ══════ */}
      {projects.length > 0 && (
        <section className="section-padding relative z-10">
          <div className="container-ace">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <div className="badge-ace mb-5">{dict.projects.subtitle}</div>
                <h2 className="font-almarai font-black" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", color: "white" }}>{dict.projects.title}</h2>
              </div>
              <Link href={`/${locale}/projects`} className="btn-secondary hidden sm:inline-flex">
                {dict.projects.viewAll} <Arrow className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="card-ace group !p-0">
                  <div className="aspect-[16/10] overflow-hidden" style={{ background: "rgba(0,240,255,0.03)" }}>
                    {project.coverImage ? (
                      <img src={project.coverImage} alt={getLocalizedField(project, "title", locale as Locale)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="flex h-full items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.06), rgba(139,92,246,0.04))" }}>
                        <span className="text-3xl font-black" style={{ color: "rgba(0,240,255,0.12)", fontFamily: "'Space Mono', monospace" }}>ACE</span>
                      </div>
                    )}
                  </div>
                  <div className="relative z-10 p-6">
                    <h3 className="mb-2 font-almarai text-lg font-bold text-white">{getLocalizedField(project, "title", locale as Locale)}</h3>
                    <p className="mb-4 text-sm" style={{ color: "var(--text-soft)" }}>{getLocalizedField(project, "shortDescription", locale as Locale)}</p>
                    {project.projectUrl && project.projectUrl !== "#live" ? (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--primary)" }}>
                        {dict.projects.viewProject} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : !project.projectUrl ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.15)" }}>
                        <Clock className="h-3.5 w-3.5" />{isAr ? "قيد التطوير" : "In Development"}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ WHY ACE ══════ */}
      <section className="section-padding relative z-10">
        <div className="container-ace">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <div>
              <div className="badge-ace mb-5">WHY_ACE</div>
              <h2 className="mb-5 font-almarai font-black leading-[1.2]" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", color: "white" }}>
                {isAr ? "لماذا تختار" : "Why Choose"}<br />
                <span className="gradient-text">{isAr ? "محركات الأكواد؟" : "ACE?"}</span>
              </h2>
              <p className="mb-10 text-[15px] leading-[1.9]" style={{ color: "rgba(255,255,255,0.45)" }}>
                {isAr ? "لأن التقنية ليست مجرد أدوات — هي الطريقة التي تفكر بها شركتك وتنمو وتتفوق. نحن لا نبني برامج فحسب، نبني محركات للنجاح." : "Because technology isn't just tools — it's how your company thinks, grows, and excels. We don't just build software, we build engines for success."}
              </p>
              {[
                { label: isAr ? "خبرة تقنية عميقة" : "Deep Technical Expertise", val: 95 },
                { label: isAr ? "التزام بالمواعيد" : "On-Time Delivery", val: 97 },
                { label: isAr ? "رضا العملاء" : "Client Satisfaction", val: 99 },
              ].map((item, i) => (
                <div key={i} className="mb-5">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                    <span className="text-sm" style={{ color: "var(--primary)", fontFamily: "'Space Mono', monospace" }}>{item.val}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-sm" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-sm" style={{ width: `${item.val}%`, background: "linear-gradient(90deg, var(--primary), var(--primary-2))", boxShadow: "0 0 10px var(--primary)" }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden lg:flex lg:justify-center">
              <div style={{ animation: "floatY 5s ease-in-out infinite" }}>
                <div className="rounded-2xl p-8" style={{ background: "rgba(0,240,255,0.04)", border: "1px solid rgba(0,240,255,0.15)", width: 340 }}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[10px] text-xs font-black text-black" style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-2))", fontFamily: "'Space Mono', monospace" }}>ACE</div>
                    <div>
                      <div className="text-sm font-semibold text-white">{isAr ? "مشروع جديد" : "New Project"}</div>
                      <div className="text-[11px]" style={{ color: "var(--text-muted)", fontFamily: "'Space Mono', monospace" }}>IN PROGRESS</div>
                    </div>
                    <div className="me-auto h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent-2)", boxShadow: "0 0 10px var(--accent-2)", animation: "pulse 1.5s infinite" }} />
                  </div>
                  {[{ l: isAr ? "التصميم" : "Design", w: "100%" }, { l: isAr ? "التطوير" : "Development", w: "75%" }, { l: isAr ? "الاختبار" : "Testing", w: "45%" }, { l: isAr ? "النشر" : "Deploy", w: "10%" }].map((p, j) => (
                    <div key={j} className="mb-3 flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]" style={{ background: j < 3 ? "rgba(0,240,255,0.15)" : "rgba(255,255,255,0.04)", border: j < 3 ? "1px solid rgba(0,240,255,0.4)" : "1px solid rgba(255,255,255,0.1)", color: j < 3 ? "var(--primary)" : "var(--text-muted)" }}>✓</div>
                      <div className="h-1 flex-1 overflow-hidden rounded-sm" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div className="h-full rounded-sm" style={{ width: p.w, background: j < 3 ? "linear-gradient(90deg, var(--primary), var(--primary-2))" : "rgba(255,255,255,0.1)", boxShadow: j < 3 ? "0 0 8px var(--primary)" : "none" }} />
                      </div>
                      <span className="w-12 text-end text-xs" style={{ color: j < 3 ? "rgba(255,255,255,0.6)" : "var(--text-muted)" }}>{p.l}</span>
                    </div>
                  ))}
                  <div className="mt-5 flex items-center justify-between rounded-[10px] p-3" style={{ background: "rgba(0,240,255,0.06)", border: "1px solid rgba(0,240,255,0.12)" }}>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{isAr ? "التقدم الكلي" : "Overall"}</span>
                    <span className="text-lg font-black" style={{ color: "var(--primary)", fontFamily: "'Space Mono', monospace" }}>73%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="relative z-10 px-5 pb-[120px] pt-20 sm:px-[60px]">
        <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-3xl p-[72px_60px] text-center" style={{ background: "rgba(0,240,255,0.03)", border: "1px solid rgba(0,240,255,0.12)" }}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 500, height: 200, background: "radial-gradient(ellipse, rgba(0,240,255,0.08) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
          <div className="relative z-10">
            <div className="badge-ace mb-7 inline-flex"><Zap className="h-3 w-3" /> INITIATE_PROJECT</div>
            <h2 className="mb-4 font-almarai font-black leading-[1.15]" style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "white" }}>
              {dict.cta.title}
            </h2>
            <p className="mx-auto mb-12 max-w-[500px] text-base" style={{ color: "rgba(255,255,255,0.45)" }}>{dict.cta.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/quote`} className="btn-primary px-9 py-4 text-base">
                <Terminal className="h-[18px] w-[18px]" />{dict.cta.button}
              </Link>
              <Link href={`/${locale}/projects`} className="btn-secondary px-9 py-4 text-base">
                <ExternalLink className="h-4 w-4" />{isAr ? "شاهد أعمالنا" : "View Our Work"}
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-10">
              {[isAr ? "استجابة خلال 24 ساعة" : "24hr Response", isAr ? "عقود واضحة" : "Clear Contracts", isAr ? "نتائج مضمونة" : "Guaranteed Results"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <span style={{ color: "var(--accent-2)" }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale as Locale} dict={dict} settings={settings} />
    </>
  );
}