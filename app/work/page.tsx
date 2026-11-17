import type { Metadata } from "next";
import Portfolio from "@/components/portfolio";
import { PageHeading } from "@/components/page-heading";
import { CTA } from "@/components/layout";
export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Brand worlds, culture-first campaigns and digital experiences. Explore our concept portfolio.",
};
export default function Page() {
  return (
    <>
      <PageHeading
        label="OUR WORK / 2025—2026"
        title="Made to"
        accent="make a mark."
        description="Different brands. Different challenges. The same restless ambition to make something that matters."
      />
      <section className="portfolio-section">
        <Portfolio />
      </section>
      <CTA />
    </>
  );
}
