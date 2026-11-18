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
          <span className="eyebrow">HOW WE CAN HELP</span>
          <h2>
            A clear plan.
            <br />
            Practical steps.
          </h2>
          <Link className="pill lime" href={`/contact?service=${s.slug}`}>
            Let’s talk {s.name.toLowerCase()} ↗
          </Link>
        </div>
        <div>
          {s.approach.map((step, i) => (
            <article key={step.title}>
              <span>0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-pad related-work">
        <span className="eyebrow">EXPLORE A DEMONSTRATION CONCEPT</span>
        <ProjectCard
          project={projects[services.indexOf(s) % projects.length]}
        />
      </section>
      <CTA />
    </>
  );
}
