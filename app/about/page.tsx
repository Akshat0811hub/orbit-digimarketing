import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { CTA } from "@/components/layout";
import { HorizontalScroll } from "@/components/home";
export const metadata: Metadata = {
  title: "Your digital marketing partner",
  description:
    "OFFSCRIPT connects SEO, website redesign, paid ads and social media into a practical plan for your business.",
};
export default function Page() {
  return (
    <>
      <PageHeading
        label="YOUR DIGITAL MARKETING PARTNER"
        title="Clear strategy."
        accent="Connected marketing."
        description="We help businesses get found, explain what they do and turn online interest into a useful conversation."
      />
      <section className="about-banner">
        <span>
          SEARCH.
          <br />
          DESIGN.
          <br />
          <em>GROWTH.</em>
        </span>
        <i>✳</i>
      </section>
      <section className="about-story section-pad">
        <span className="eyebrow">WHAT WE DO</span>
        <div>
          <h2>
            Your website and marketing.
            <br />
            Working together.
          </h2>
          <p>
            OFFSCRIPT brings SEO, website redesign, paid advertising and social
            media into one conversation. We start with your business, your
            audience and the parts of your online presence that need attention.
          </p>
          <p>
            A search campaign needs a useful landing page. A new website needs a
            clear message. Social content needs a reason to exist. We connect
            those decisions so every channel has a role in your plan.
          </p>
        </div>
      </section>
      <section className="values section-pad">
        {[
          [
            "Clarity first.",
            "Know what is being done, why it matters and what comes next. Clear scopes and plain-language reporting keep the work understandable.",
          ],
          [
            "Built around you.",
            "A local service business and an established online brand need different plans. We choose the channels and priorities that fit the brief.",
          ],
          [
            "Keep improving.",
            "Launch is a starting point. We review what people search for, where visitors hesitate and which enquiries are relevant, then refine the plan.",
          ],
        ].map(([t, d], i) => (
          <article key={t}>
            <span>0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </section>
      <section className="section-pad">
        <div className="section-heading">
          <span className="eyebrow">THE RIGHT STARTING POINT</span>
          <h2>
            Where does your
            <br />
            <em>business need help?</em>
          </h2>
        </div>
        <div className="service-list">
          {[
            ["Get found online", "SEO & local search", "/services/seo"],
            [
              "Improve your website",
              "Website redesign",
              "/services/web-development",
            ],
            [
              "Generate relevant enquiries",
              "Google & Meta ads",
              "/services/performance-marketing",
            ],
            [
              "Build a consistent presence",
              "Social media management",
              "/services/social-media",
            ],
          ].map(([goal, name, url], i) => (
            <Link href={url} key={url}>
              <span className="service-num">0{i + 1}</span>
              <h3>{goal}</h3>
              <span className="service-tag">{name} ↗</span>
            </Link>
          ))}
        </div>
      </section>
      <HorizontalScroll />
      <CTA />
    </>
  );
}
