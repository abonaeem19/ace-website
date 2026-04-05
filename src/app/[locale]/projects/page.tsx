import { ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getPublishedProjects, getSiteSettings } from "@/lib/queries";
import { getLocalizedField } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const [projects, settings] = await Promise.all([getPublishedProjects(), getSiteSettings()]);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="pt-32">
        <section className="relative overflow-hidden pb-20 pt-10">
          <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(91,92,255,0.06)", top: "-20%", left: "50%", transform: "translateX(-50%)" }} />
          <div className="container-ace relative z-10 text-center">
            <p className="badge-ace anim-up mb-6">{dict.projects.subtitle}</p>
            <h1 className="anim-up delay-1 font-almarai text-4xl font-extrabold sm:text-5xl lg:text-6xl">{dict.projects.title}</h1>
            <p className="anim-up delay-2 mx-auto mt-5 max-w-xl text-lg" style={{ color: "var(--text-soft)" }}>{dict.projects.description}</p>
          </div>
        </section>

        <section className="section-divider section-padding">
          <div className="container-ace">
            {projects.length === 0 ? (
              <p className="text-center text-lg" style={{ color: "var(--text-muted)" }}>{dict.admin.common.noData}</p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <div key={project.id} className="card-ace group overflow-hidden !p-0">
                    <div className="aspect-video overflow-hidden" style={{ background: "var(--bg-card-2)" }}>
                      {project.coverImage ? (
                        <img src={project.coverImage} alt={getLocalizedField(project, "title", locale as Locale)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="flex h-full items-center justify-center" style={{ background: "linear-gradient(135deg, var(--bg-card), var(--bg-card-2))" }}>
                          <span className="font-almarai text-3xl font-bold" style={{ color: "rgba(91,92,255,0.2)" }}>ACE</span>
                        </div>
                      )}
                    </div>
                    <div className="relative z-10 p-7">
                      <h3 className="mb-2 font-almarai text-xl font-bold">{getLocalizedField(project, "title", locale as Locale)}</h3>
                      <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>{getLocalizedField(project, "shortDescription", locale as Locale)}</p>
                      {project.projectUrl && (
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300" style={{ color: "var(--primary)" }}>
                          {dict.projects.viewProject} <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer locale={locale as Locale} dict={dict} settings={settings} />
    </>
  );
}