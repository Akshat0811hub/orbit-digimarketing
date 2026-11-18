import type { Metadata } from "next";
import Portfolio from "@/components/portfolio";
import { PageHeading } from "@/components/page-heading";
import { CTA } from "@/components/layout";
export const metadata: Metadata = {
  title: "Digital marketing concepts",
  description:
    "Explore SEO, website redesign, paid advertising and social media concepts that explain our digital marketing approach.",
};
export default function Page() {
  return (
    <>
      <PageHeading
        label="OUR APPROACH / DEMONSTRATION PROJECTS"
        title="Digital ideas."
        accent="Practical applications."
        description="Explore how we approach search visibility, website journeys, paid campaigns and social content. These examples show the work involved, without invented client results."
      />
      <section className="portfolio-section">
        <Portfolio />
      </section>
      <CTA />
    </>
  );
}
