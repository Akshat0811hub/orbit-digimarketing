import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, projects } from "@/data/content";
import { PageHeading } from "@/components/page-heading";
import { ProjectCard } from "@/components/home";
import { CTA } from "@/components/layout";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return { title: s?.name || "Service not found", description: s?.description };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageHeading
        label={`EXPERTISE / ${s.name.toUpperCase()}`}
        title={s.name.split(" & ")[0]}
        accent={s.tag}
        description={s.description}
      />
      <section className="service-detail section-pad">
        <div>
          <span className="eyebrow">WHAT’S IN THE MIX</span>
          <h2>
            From ambition
            <br />
            to action.
          </h2>
          <Link className="pill lime" href={`/contact?service=${s.slug}`}>
            Let’s talk {s.name.toLowerCase()} ↗
          </Link>
        </div>
        <div>
          {s.deliverables.map((d, i) => (
            <article key={d}>
              <span>0{i + 1}</span>
              <h3>{d}</h3>
              <p>
                {
                  [
                    "We start with the context, the audience and the opportunity. Together, we define what success should look like.",
                    "A collaborative creative process turns the strategy into tangible work. You see the thinking, not just the finished files.",
                    "We launch with clear measures, review what we learn and keep improving the experience.",
                  ][i]
                }
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-pad related-work">
        <span className="eyebrow">THE THINKING, IN ACTION</span>
        <ProjectCard
          project={projects[services.indexOf(s) % projects.length]}
        />
      </section>
      <CTA />
    </>
  );
}
