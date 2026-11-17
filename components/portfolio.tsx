"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Flip, gsap, ScrollTrigger } from "@/lib/gsap";
import { projects } from "@/data/content";
import { ProjectCard } from "./home";
export default function Portfolio() {
  const [category, setCategory] = useState("All");
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => () => gsap.killTweensOf(".filter-grid>*"), []);
  const filter = (next: string) => {
    const state = Flip.getState(
      root.current?.querySelectorAll(".filter-item") ?? [],
    );
    flushSync(() => setCategory(next));
    if (!matchMedia("(prefers-reduced-motion:reduce)").matches)
      Flip.from(state, {
        duration: 0.55,
        ease: "power3.inOut",
        absolute: true,
        onComplete: () => ScrollTrigger.refresh(),
      });
    else ScrollTrigger.refresh();
  };
  return (
    <div ref={root}>
      <div className="filters" aria-label="Filter projects">
        {["All", "Branding", "Social", "Digital", "Campaign"].map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            className={category === c ? "selected" : ""}
            onClick={() => filter(c)}
          >
            {c}
            <sup>{c === "All" ? "04" : "01"}</sup>
          </button>
        ))}
      </div>
      <div className="work-grid filter-grid">
        {projects
          .filter((p) => category === "All" || p.category === category)
          .map((p, i) => (
            <div className="filter-item" key={p.slug}>
              <ProjectCard project={p} index={i} />
            </div>
          ))}
      </div>
      <p className="sample-note">
        Concept projects. All brands and campaign results shown are
        illustrative.
      </p>
    </div>
  );
}
