import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { services } from "@/data/content";
import { CTA } from "@/components/layout";
import { Reveal } from "@/components/animations";
export const metadata: Metadata = {
  title: "Our services",
  description:
    "SEO, website redesign, Google and Meta ads, social media management, branding and content. Digital marketing services with a clear purpose.",
};
export default function Page() {
  return (
    <>
      <PageHeading
        label="DIGITAL MARKETING SERVICES"
        title="Get found."
        accent="Get chosen."
        description="From fixing your website to reaching the right audience, we build a practical mix of services around your business goals."
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
