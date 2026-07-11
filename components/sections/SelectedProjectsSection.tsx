/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, MapPin, Briefcase } from "lucide-react";

export default function SelectedProjectsSection({
  lang,
  t,
  projects,
  ProjectCard,
  LoadingLink,
}: {
  lang: string;
  t: any;
  projects: any;
  ProjectCard: any;
  LoadingLink: any;
}) {
  return (
    <section className="bg-slate-50 px-4 py-16 text-slate-950 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Action Header Grid */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-red-600">
              <span className="h-1.5 w-6 rounded-full bg-red-600" />
              {t.projectsLabel ||
                (lang === "sw" ? "Kazi Zilizofanyika" : "Selected Deployments")}
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:leading-[1.15]">
              {t.projectsTitle ||
                (lang === "sw"
                  ? "Ushahidi wa kazi zetu nchini"
                  : "Meticulous protection active across premium Tanzanian sites")}
            </h2>
          </div>
          <div className="flex lg:col-span-4 lg:justify-end">
            <LoadingLink
              href={`/projects?lang=${lang}`}
              className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-black text-white transition-all duration-300 hover:bg-red-600 shadow-md"
            >
              {t.viewAll}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </LoadingLink>
          </div>
        </div>

        {/* Upgraded Native Loop Wrapper Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {projects &&
            projects.slice(0, 3).map((project: any) => (
              <div
                key={project.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
              >
                <div>
                  {/* Image Showcase Box */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-slate-900">
                    <img
                      src={
                        project.imageUrl ||
                        "/images/projects/fallback-project.jpg"
                      }
                      alt={lang === "sw" ? project.titleSw : project.titleEn}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {/* Category Pill Tag Overlay */}
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-lg bg-slate-950/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
                      <Briefcase className="h-3 w-3 text-red-500" />
                      {project.category || "Security Setup"}
                    </span>
                  </div>

                  {/* Typography Matrix */}
                  <div className="px-1 pt-4">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      <span>{project.location || "Tanzania"}</span>
                    </div>

                    <h3 className="mt-1.5 text-lg font-black tracking-tight text-slate-950 group-hover:text-red-600 transition-colors">
                      {lang === "sw" ? project.titleSw : project.titleEn}
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">
                      {lang === "sw"
                        ? project.descriptionSw
                        : project.descriptionEn}
                    </p>
                  </div>
                </div>

                {/* Action Trigger Block */}
                <div className="mt-6 border-t border-slate-100 px-1 pt-4">
                  <LoadingLink
                    href={`/projects/${project.slug}?lang=${lang}`}
                    className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-slate-900 group-hover:text-red-600 transition-colors"
                  >
                    {lang === "sw" ? "Kagua Mradi" : "View Case Study"}
                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </LoadingLink>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
