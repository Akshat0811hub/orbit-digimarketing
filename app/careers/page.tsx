import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
export const metadata: Metadata = {
  title: "Careers",
  description:
    "Curious minds welcome. Explore life at OFFSCRIPT and share your work.",
};
export default function Page() {
  return (
    <>
      <PageHeading
        label="COME MAKE A LITTLE TROUBLE"
        title="Your kind"
        accent="of different."
        description="Good ideas can come from anyone. We’re building a place where they have room to grow."
      />
      <section className="career-banner">
        CURIOUS BY NATURE. <span>CREATIVE BY CHOICE.</span>
      </section>
      <section className="values section-pad">
        {[
          [
            "Space to grow",
            "Real responsibility, honest feedback and time to explore new ideas.",
          ],
          [
            "Work with people",
            "Close collaboration across disciplines. Fewer silos, more shared discoveries.",
          ],
          [
            "Life beyond the feed",
            "Flexible ways of working and respect for the time that makes you, you.",
          ],
        ].map(([t, d]) => (
          <article key={t}>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </section>
      <section className="open-roles section-pad">
        <span className="eyebrow">THE NEXT CHAPTER</span>
        <h2>Keep us curious.</h2>
        <p>
          There are no active vacancies in this concept studio. Have a
          portfolio, a perspective, or a collaboration in mind? Introduce
          yourself through our contact form.
        </p>
        <Link className="pill lime" href="/contact">
          Share your work ↗
        </Link>
      </section>
    </>
  );
}
