"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, Draggable } from "@/lib/gsap";
import { services, projects, photo } from "@/data/content";
import { Reveal, Magnetic, Marquee, Counter, SplitText } from "./animations";
import { CTA } from "./layout";
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });
export function ParallaxImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="image-mask">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 700px) 100vw, 55vw"
        onLoad={() => ScrollTrigger.refresh()}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMzMzIi8+PC9zdmc+"
      />
    </div>
  );
}
export function ProjectCard({
  project,
  index = 0,
}: {
  project: (typeof projects)[number];
  index?: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`project-card project-${project.slug}`}
      data-cursor="VIEW"
    >
      <div className="project-visual" style={{ background: project.color }}>
        <ParallaxImage src={photo(project.image)} alt={project.subtitle} />
        <div className="project-art">
          <small>
            {project.category.toUpperCase()} / {project.year}
          </small>
          <strong>{project.name}</strong>
          <span>{project.label}</span>
        </div>
        <span className="project-arrow">
          <ArrowUpRight />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <h3>
            {project.name.toLowerCase()}
            <sup>®</sup>
          </h3>
          <p>{project.subtitle}</p>
        </div>
        <span>
          {project.category} <small>0{index + 1}</small>
        </span>
      </div>
    </Link>
  );
}
export function HorizontalScroll() {
  const root = useRef<HTMLElement>(null),
    track = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.to(track.current, {
          x: () =>
            -(track.current!.scrollWidth - root.current!.clientWidth + 48),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + track.current!.scrollWidth * 0.65,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      },
    );
    return () => mm.revert();
  }, []);
  return (
    <section className="process-section" ref={root}>
      <div className="section-heading">
        <span className="eyebrow">04 / THE WAY WE WORK</span>
        <h2>
          Good chaos.
          <br />
          <em>Great process.</em>
        </h2>
      </div>
      <div ref={track} className="process-track">
        {[
          [
            "Listen",
            "We ask the uncomfortable questions. Dig into your audience. Find the real opportunity.",
          ],
          [
            "Think",
            "A clear point of view. A shared ambition. A strategy that gives the wild ideas a direction.",
          ],
          [
            "Make",
            "Designers, strategists and makers in one room. Building, breaking and making it better.",
          ],
          [
            "Move",
            "We launch, learn and keep pushing. Because great work is never a set-and-forget thing.",
          ],
        ].map(([t, d], i) => (
          <article key={t}>
            <div className="process-number">
              0{i + 1}
              <ArrowUpRight />
            </div>
            <h3>{t}.</h3>
            <p>{d}</p>
            <div className="process-line" />
          </article>
        ))}
      </div>
    </section>
  );
}
function Testimonials() {
  const track = useRef<HTMLDivElement>(null),
    wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const ctx = gsap.context(() => {
      Draggable.create(track.current, {
        type: "x",
        bounds: wrap.current,
        edgeResistance: 0.8,
        onDragEnd() {
          const width = wrap.current!.clientWidth;
          const index = Math.max(0, Math.min(2, Math.round(-this.x / width)));
          setActive(index);
          gsap.to(track.current, {
            x: -index * width,
            duration: 0.55,
            ease: "power3.out",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);
  const go = (n: number) => {
    setActive(n);
    gsap.to(track.current, {
      x: -n * (wrap.current?.clientWidth ?? 0),
      duration: 0.5,
    });
  };
  return (
    <section className="testimonial-section">
      <span className="eyebrow">
        05 / THE FEELING IS MUTUAL · SAMPLE TESTIMONIALS
      </span>
      <div className="testimonial-window" ref={wrap} data-cursor="DRAG">
        <div className="testimonial-track" ref={track}>
          {[
            [
              "They didn’t just understand our brand. They saw what it could become.",
              "Riya Kapoor",
              "Founder, Velocity",
            ],
            [
              "The kind of creative partner that makes you a little braver.",
              "Arjun Sethi",
              "Co-founder, After Hours",
            ],
            [
              "Thoughtful from the first conversation to the very last detail.",
              "Neha Anand",
              "Director, Form & Field",
            ],
          ].map(([quote, name, role]) => (
            <figure key={name}>
              <span className="quote-mark">“</span>
              <blockquote>{quote}</blockquote>
              <figcaption>
                <span className="avatar">
                  {name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </span>
                <div>
                  {name}
                  <small>{role}</small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="slider-controls">
        <span>
          0{active + 1} <span>/ 03</span>
        </span>
        <div>
          <button
            aria-label="Previous testimonial"
            onClick={() => go((active + 2) % 3)}
          >
            <ArrowLeft />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => go((active + 1) % 3)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(false),
    [egg, setEgg] = useState(false);
  useEffect(() => {
    setWebgl(
      matchMedia("(min-width:900px) and (prefers-reduced-motion:no-preference)")
        .matches,
    );
    let keys = "";
    const listen = (e: KeyboardEvent) => {
      keys = (keys + e.key).slice(-80);
      if (
        keys.endsWith(
          "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba",
        )
      )
        setEgg((s) => !s);
    };
    window.addEventListener("keydown", listen);
    return () => window.removeEventListener("keydown", listen);
  }, []);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion:no-preference)", () => {
        gsap.from(".hero-title .word-mask>span", {
          yPercent: 110,
          rotate: 3,
          duration: 1.1,
          stagger: 0.09,
          delay: 1.15,
          ease: "power4.out",
        });
        gsap.from(".collage-card", {
          y: 100,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
          delay: 1.35,
          ease: "power3.out",
        });
        gsap.to(".collage", {
          y: -60,
          rotate: 2,
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".about-words span", {
          color: "#f5f2ea",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".about-words",
            start: "top 85%",
            end: "bottom 40%",
            scrub: 1,
          },
        });
        gsap.utils
          .toArray<HTMLElement>(".project-visual img")
          .forEach((img) =>
            gsap.fromTo(
              img,
              { yPercent: -5, scale: 1.12 },
              {
                yPercent: 5,
                scale: 1.12,
                ease: "none",
                scrollTrigger: {
                  trigger: img.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            ),
          );
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={root} className={egg ? "easter-egg" : ""}>
      <section className="hero">
        <div className="hero-kicker">
          <span>
            <i className="status-dot" /> INDEPENDENT CREATIVE & DIGITAL AGENCY
          </span>
          <span>MUMBAI · EVERYWHERE ↗</span>
        </div>
        <h1 className="hero-title">
          <SplitText text="WE DON’T" />
          <br />
          <span className="hero-accent">
            <SplitText text="DO ORDINARY." />
          </span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-copy">
            <p>
              We build brands, break patterns,
              <br />
              and turn attention into impact.
            </p>
            <p className="muted">Strategy. Creativity. A little rebellion.</p>
            <Magnetic>
              <Link href="/work" className="pill lime">
                Explore our work <ArrowUpRight size={19} />
              </Link>
            </Magnetic>
            <a className="scroll-cue" href="#intro">
              <span>
                <ArrowDown size={15} />
              </span>{" "}
              SCROLL TO GO OFFSCRIPT
            </a>
          </div>
          <div className="collage" aria-label="Selected creative work">
            <Link
              href="/work/after-hours"
              className="collage-card card-night"
              data-cursor="VIEW"
            >
              <Image
                src={photo(projects[1].image)}
                alt="Atmospheric night sky for After Hours campaign"
                fill
                priority
                sizes="30vw"
              />
              <span>
                AFTER
                <br />
                HOURS<span className="tiny">CULTURE DOESN’T CLOCK OUT.</span>
              </span>
            </Link>
            <Link
              href="/work/velocity"
              className="collage-card card-shoe"
              data-cursor="VIEW"
            >
              <Image
                src={photo(projects[0].image)}
                alt="Red running shoe, Velocity brand campaign"
                fill
                priority
                sizes="35vw"
              />
              <span className="card-top">
                VELOCITY® <ArrowUpRight size={18} />
              </span>
              <strong>
                RUN YOUR
                <br />
                <i>OWN WAY.</i>
              </strong>
              <small>A BRAND THAT NEVER STANDS STILL.</small>
            </Link>
            <span className="round-sticker">
              LESS BLAH.
              <br />
              <strong>
                MORE
                <br />
                BOOM.
              </strong>
              <i>↗</i>
            </span>
            <span className="collage-note">
              A little different.
              <br />
              By design. ⤴
            </span>
          </div>
          {webgl && (
            <div className="hero-webgl">
              <HeroScene />
            </div>
          )}
        </div>
        <div className="hero-foot">
          <span>BIG IDEAS. ZERO AUTOPILOT.</span>
          <span>
            SELECTED WORK, 2025—26 <span className="accent">↗</span>
          </span>
        </div>
      </section>
      <div className="client-strip">
        <span>
          GOOD COMPANY.
          <br />
          GREAT POSSIBILITIES.
        </span>
        {[
          "velocity®",
          "after hours",
          "form & field",
          "DAILY DOSE",
          "nova.",
        ].map((n) => (
          <strong key={n}>{n}</strong>
        ))}
        <small>CONCEPT BRANDS</small>
      </div>
      <Marquee />
      <section className="about-teaser section-pad" id="intro">
        <span className="eyebrow">01 / A LITTLE ABOUT US</span>
        <div>
          <h2 className="about-words">
            {"The world has enough noise. We make the kind that matters."
              .split(" ")
              .map((w, i) => (
                <span key={i}>{w} </span>
              ))}
          </h2>
          <div className="about-detail">
            <p>
              We’re an independent crew of strategists, designers and digital
              troublemakers. Bringing fresh perspectives and fearless creativity
              to brands ready to do things differently.
            </p>
            <Link href="/about" className="text-link">
              Meet the minds <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="services-section section-pad">
        <div className="section-heading">
          <span className="eyebrow">02 / WHAT WE BRING</span>
          <div>
            <h2>
              Different skills.
              <br />
              <em>One big picture.</em>
            </h2>
            <p>
              From the first “what if” to the final “wow”.
              <br />
              Built to work together. Made to move you forward.
            </p>
          </div>
        </div>
        <div className="service-list">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              <span className="service-num">0{i + 1}</span>
              <h3>{s.name}</h3>
              <span className="service-tag">{s.tag}</span>
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </section>
      <section className="work-section section-pad">
        <div className="section-heading">
          <span className="eyebrow">03 / SELECTED WORK</span>
          <h2>
            Less talk.
            <br />
            <em>More proof.</em>
            <sup>(04)</sup>
          </h2>
          <Link href="/work" className="text-link">
            All our work <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="work-grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="stats-section">
        <div>
          <strong>
            <Counter value={7} />
          </strong>
          <span>DISCIPLINES. ONE TEAM.</span>
        </div>
        <div>
          <strong>
            <Counter value={100} suffix="%" />
          </strong>
          <span>INDEPENDENT THINKING.</span>
        </div>
        <div>
          <strong>
            <Counter value={0} />
          </strong>
          <span>ONE-SIZE-FITS-ALL IDEAS.</span>
        </div>
        <div>
          <strong>∞</strong>
          <span>POSSIBILITIES AHEAD.</span>
        </div>
      </section>
      <HorizontalScroll />
      <Testimonials />
      <CTA />
    </div>
  );
}
