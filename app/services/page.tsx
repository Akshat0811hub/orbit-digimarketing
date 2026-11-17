import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { services } from "@/data/content";
import { CTA } from "@/components/layout";
import { Reveal } from "@/components/animations";
export const metadata: Metadata = {
  title: "Our services",
  description:
    "Seven connected disciplines. Brand strategy, social media, performance, film, web, creators and SEO.",
};
export default function Page() {
  return (
    <>
      <PageHeading
        label="WHAT WE DO"
        title="Built for"
        accent="the whole picture."
        description="No silos. No handoffs into the void. Just the right mix of minds, making every part of your brand work harder together."
      />
      <section className="service-panels">
        {services.map((s, i) => (
          <Reveal key={s.slug}>
            <Link href={`/services/${s.slug}`} className="service-panel">
              <span className="eyebrow">0{i + 1} / OUR EXPERTISE</span>
              <div>
                <h2>{s.name} ↗</h2>
                <p>{s.description}</p>
                <div className="tags">
                  {s.deliverables.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
      <CTA />
    </>
  );
}
