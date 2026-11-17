import type { Metadata } from "next";
import Image from "next/image";
import { PageHeading } from "@/components/page-heading";
import { CTA } from "@/components/layout";
import { HorizontalScroll } from "@/components/home";
import { team, photo } from "@/data/content";
export const metadata: Metadata = {
  title: "Our story",
  description:
    "Meet the independent minds behind OFFSCRIPT. A fictional creative agency with a real appetite for different.",
};
export default function Page() {
  return (
    <>
      <PageHeading
        label="A LITTLE DIFFERENT. BY DESIGN."
        title="Good people."
        accent="Unreasonable ideas."
        description="We started with a simple belief: the best work happens when curious people are free to question the obvious."
      />
      <section className="about-banner">
        <span>
          STRATEGISTS.
          <br />
          MAKERS.
          <br />
          <em>RULE BREAKERS.</em>
        </span>
        <i>✳</i>
      </section>
      <section className="about-story section-pad">
        <span className="eyebrow">OUR POINT OF VIEW</span>
        <div>
          <h2>
            Independent in spirit.
            <br />
            Connected by curiosity.
          </h2>
          <p>
            OFFSCRIPT is a concept for a new kind of creative partner. A
            close-knit team that brings strategy, design and technology into the
            same conversation, from day one.
          </p>
          <p>
            We believe small teams can do big things. That the best question is
            often “why not?”. And that a little playfulness can lead to
            seriously good work.
          </p>
        </div>
      </section>
      <section className="values section-pad">
        {[
          [
            "Stay curious.",
            "Listen closely. Ask one more question. Find the interesting thing hiding in plain sight.",
          ],
          [
            "Make it matter.",
            "A beautiful idea needs a purpose. We connect creative ambition to a clear outcome.",
          ],
          [
            "Go together.",
            "Great work is a team sport. Open conversations and shared ownership make it better.",
          ],
        ].map(([t, d], i) => (
          <article key={t}>
            <span>0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </section>
      <section className="team-section section-pad">
        <div className="section-heading">
          <span className="eyebrow">THE MINDS BEHIND THE METHOD</span>
          <h2>
            A few good
            <br />
            <em>troublemakers.</em>
          </h2>
        </div>
        <div className="team-grid">
          {team.map((t) => (
            <article key={t.name}>
              <div>
                <Image
                  src={photo(t.image)}
                  alt={`${t.name}, fictional team member`}
                  fill
                  sizes="(max-width:700px) 100vw,33vw"
                />
              </div>
              <h3>{t.name}</h3>
              <p>{t.role}</p>
            </article>
          ))}
        </div>
        <p className="sample-note">
          Illustrative team profiles with stock photography.
        </p>
      </section>
      <HorizontalScroll />
      <CTA />
    </>
  );
}
