import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, photo } from "@/data/content";
import { ParallaxImage } from "@/components/home";
import { Reveal } from "@/components/animations";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return { title: p?.name || "Project not found", description: p?.description };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const p = projects[index],
    next = projects[(index + 1) % projects.length];
  return (
    <>
      <section className="case-heading">
        <Link className="text-link" href="/work">
          ← Back to work
        </Link>
        <div className="case-meta">
          <span>
            {p.category} / {p.year}
          </span>
          <span>DEMONSTRATION CONCEPT</span>
        </div>
        <h1>{p.name}</h1>
        <p>{p.subtitle}</p>
      </section>
      <div className="case-hero">
        <ParallaxImage src={photo(p.image)} alt={p.description} priority />
      </div>
      <section className="case-intro section-pad">
        <span className="eyebrow">THE BIG PICTURE</span>
        <h2>{p.description}</h2>
      </section>
      <section className="case-story section-pad">
        <Reveal>
          <span className="eyebrow">01 / THE CHALLENGE</span>
          <h2>
            Start with
            <br />
            the problem.
          </h2>
          <p>{p.challenge}</p>
        </Reveal>
        <Reveal>
          <span className="eyebrow">02 / OUR APPROACH</span>
          <h2>
            Connect the plan
            <br />
            to the work.
          </h2>
          <p>{p.solution}</p>
        </Reveal>
      </section>
      <section className="case-results">
        <span className="eyebrow">03 / PROPOSED DELIVERABLES</span>
        <div>
          {p.results.map((r) => (
            <h3 key={r}>{r}</h3>
          ))}
        </div>
        <p>
          This concept illustrates a proposed scope of work. It is not a client
          case study or a claim of achieved results.
        </p>
      </section>
      <section className="case-gallery">
        <div className="gallery-poster" style={{ background: p.color }}>
          <span>OFFSCRIPT × {p.name}</span>
          <strong>{p.label}</strong>
          <span>
            {p.category.toUpperCase()} — {p.year}
          </span>
        </div>
        <div className="gallery-photo">
          <ParallaxImage
            src={photo(p.image)}
            alt={`${p.name} digital marketing concept`}
          />
        </div>
      </section>
      <Link className="next-project" href={`/work/${next.slug}`}>
        <span className="eyebrow">UP NEXT</span>
        <h2>{next.name} ↗</h2>
      </Link>
    </>
  );
}
