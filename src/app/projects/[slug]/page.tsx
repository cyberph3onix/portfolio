/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return DATA.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = DATA.projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = DATA.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const imageClassName =
    "imageClassName" in project ? (project.imageClassName as string) : "";

  return (
    <main className="flex flex-col gap-8">
      <BlurFade delay={0.04}>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden /> Back to projects
        </Link>
      </BlurFade>

      <BlurFade delay={0.08}>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-muted-foreground">{project.subtitle}</p>
          <time className="text-xs text-muted-foreground">{project.dates}</time>
        </div>
      </BlurFade>

      {project.image ? (
        <BlurFade delay={0.12}>
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            className={`w-full max-h-80 rounded-xl border object-cover ${imageClassName}`}
          />
        </BlurFade>
      ) : null}

      <BlurFade delay={0.16}>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
          {project.bullets.length > 0 && (
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
              {project.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="text-[11px] font-medium h-6 px-2"
            >
              {t}
            </Badge>
          ))}
        </div>
      </BlurFade>

      {project.links.length > 0 && (
        <BlurFade delay={0.24}>
          <div className="flex flex-wrap gap-2">
            {project.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90">
                  {l.icon}
                  {l.type}
                </Badge>
              </Link>
            ))}
          </div>
        </BlurFade>
      )}
    </main>
  );
}
