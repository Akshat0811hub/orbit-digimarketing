"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Search,
  Globe,
  Target,
  BarChart3,
  Check,
  Plus,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { services, projects, photo } from "@/data/content";
import { Reveal, Magnetic, Marquee, SplitText } from "./animations";
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
      className={`project-card digital-project project-${project.slug}`}
      data-cursor="VIEW"
    >
      <div className="project-visual" style={{ background: project.color }}>
        <ParallaxImage src={photo(project.image)} alt={project.subtitle} />
        <span className="project-arrow">
          <ArrowUpRight />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <h3>{project.name.toLowerCase()}</h3>
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
          Clear goals.
          <br />
          <em>A practical plan.</em>
        </h2>
      </div>
      <div ref={track} className="process-track">
        {[
          [
            "Audit",
            "We review your website, search visibility, competitors and current campaigns to find what needs attention.",
          ],
          [
            "Plan",
            "We agree on priorities, channels, deliverables and the measures that matter to your business.",
          ],
          [
            "Launch",
            "We improve the website, create the content and set up your campaigns with tracking in place.",
          ],
          [
            "Optimise",
            "We review enquiries, traffic and campaign data, then refine the work with clear monthly reporting.",
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
function GrowthQuestions() {
  return (
    <section className="growth-questions section-pad">
      <div>
        <span className="eyebrow">05 / BEFORE WE GET STARTED</span>
        <h2>
          Good questions.
          <br />
          <em>Clear answers.</em>
        </h2>
        <p>
          Not sure where to start? We’ll help you identify the right first step.
        </p>
        <Link className="text-link" href="/contact">
          Talk about your business <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="faq-list">
        {[
          [
            "Can you redesign our existing website?",
            "Yes. We review your current site, keep what works and redesign the experience around your services, mobile visitors and enquiry journey. We plan redirects and preserve valuable content when URLs change.",
          ],
          [
            "Do you offer SEO as a standalone service?",
            "Yes. SEO can be a focused engagement covering technical fixes, on-page content and local search, or part of a wider website and marketing plan. The scope starts with an audit.",
          ],
          [
            "Can you manage Google Ads and Meta Ads?",
            "Yes. We help with campaign structure, audience research, ad creative, landing pages and conversion tracking. Media spend and our management scope are agreed separately.",
          ],
          [
            "How will we know what is working?",
            "We agree on useful measures before launch: qualified enquiries, conversion rate, relevant search traffic and campaign costs. Reporting explains what changed and what we recommend next.",
          ],
          [
            "How soon can we expect results?",
            "Timelines depend on your starting point, competition, budget and scope. Paid campaigns can generate data after launch; SEO and content need sustained work. We set realistic milestones rather than guarantee rankings or leads.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Plus size={18} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
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
        gsap.utils.toArray<HTMLElement>(".project-visual img").forEach((img) =>
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
            <i className="status-dot" /> SEO · WEBSITES · DIGITAL MARKETING
          </span>
          <span>MUMBAI · EVERYWHERE ↗</span>
        </div>
        <h1 className="hero-title">
          <SplitText text="GET FOUND." />
          <br />
          <span className="hero-accent">
            <SplitText text="GROW ONLINE." />
          </span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-copy">
            <p>
              SEO that helps people find you.
              <br />
              Websites that turn visits into enquiries.
            </p>
            <p className="muted">
              Website redesign. Google & Meta Ads. Social media.
            </p>
            <Magnetic>
              <Link href="/contact" className="pill lime">
                Let’s grow your business <ArrowUpRight size={19} />
              </Link>
            </Magnetic>
            <a className="scroll-cue" href="#intro">
              <span>
                <ArrowDown size={15} />
              </span>{" "}
              EXPLORE WHAT WE DO
            </a>
          </div>
          <div
            className="collage digital-collage"
            aria-label="Website redesign and search optimisation services"
          >
            <Link
              href="/services/web-development"
              className="collage-card website-preview"
              data-cursor="EXPLORE"
            >
              <span className="mock-browser">
                <i />
                <i />
                <i />
                <span>your-business.com</span>
                <ArrowUpRight size={14} />
              </span>
              <div className="mini-website">
                <span className="mini-brand">
                  yourbrand<span>®</span>
                </span>
                <small>DESIGNED TO DO MORE.</small>
                <strong>
                  A better
                  <br />
                  website.
                  <br />
                  <em>
                    A better
                    <br />
                    first hello.
                  </em>
                </strong>
                <span className="mini-button">
                  Let’s talk <ArrowUpRight size={12} />
                </span>
                <div className="mini-orbit" aria-hidden="true">
                  ↗
                </div>
              </div>
              <span className="mock-caption">
                <Globe size={12} /> WEBSITE DESIGN & REDESIGN
              </span>
            </Link>
            <Link
              href="/services/seo"
              className="collage-card search-preview"
              data-cursor="EXPLORE"
            >
              <span className="search-preview-top">
                <Search size={16} />
                <span>SEARCH VISIBILITY</span>
                <ArrowUpRight size={15} />
              </span>
              <strong>
                Be the answer.
                <br />
                <em>Not just a result.</em>
              </strong>
              <span className="mini-search">
                <Search size={13} /> your service, your city
              </span>
              <div className="search-result">
                <span className="result-icon">y.</span>
                <div>
                  <small>YOUR BUSINESS</small>
                  <span>your-business.com</span>
                </div>
                <Check size={14} />
              </div>
              <div className="search-result-copy">
                <b>Your expertise. Easier to find.</b>
                <span>
                  Relevant pages. Useful content. A strong foundation.
                </span>
              </div>
              <svg
                className="mini-chart"
                viewBox="0 0 300 100"
                aria-hidden="true"
              >
                <path
                  d="M0 80H300M0 45H300"
                  stroke="#34412b"
                  strokeDasharray="4 5"
                />
                <path
                  d="M0 90L36 79L67 84L99 60L132 65L170 42L206 47L245 19L280 23L300 8"
                  fill="none"
                  stroke="#d6ff3f"
                  strokeWidth="3"
                />
              </svg>
              <span className="mock-caption">
                SEO + CONTENT + LOCAL DISCOVERY
              </span>
            </Link>
            <span className="round-sticker">
              LESS GUESSWORK.
              <strong>
                MORE
                <br />
                DIRECTION.
              </strong>
              <i>↗</i>
            </span>
          </div>
          {webgl && (
            <div className="hero-webgl">
              <HeroScene />
            </div>
          )}
        </div>
        <div className="hero-foot">
          <span>YOUR BUSINESS. OUR DIGITAL EXPERTISE.</span>
          <span>
            BUILT TO CONNECT SEARCH, CLICKS & ENQUIRIES{" "}
            <span className="accent">↗</span>
          </span>
        </div>
      </section>
      <div className="capability-strip">
        <span>
          YOUR NEXT STAGE.
          <br />
          OUR CORE EXPERTISE.
        </span>
        {[
          { name: "SEO & local search", href: "seo", icon: Search },
          { name: "Website redesign", href: "web-development", icon: Globe },
          {
            name: "Google & Meta Ads",
            href: "performance-marketing",
            icon: Target,
          },
          { name: "Social media", href: "social-media", icon: BarChart3 },
        ].map(({ name, href, icon: Icon }) => (
          <Link key={href} href={"/services/" + href}>
            <Icon size={18} />
            {name}
            <ArrowUpRight size={12} />
          </Link>
        ))}
      </div>
      <Marquee />
      <section className="about-teaser section-pad" id="intro">
        <span className="eyebrow">01 / YOUR DIGITAL GROWTH PARTNER</span>
        <div>
          <h2 className="about-words">
            {"Your customers are online. Let’s make sure your business is, too."
              .split(" ")
              .map((w, i) => (
                <span key={i}>{w} </span>
              ))}
          </h2>
          <div className="about-detail">
            <p>
              We connect search, design and marketing so your business is easier
              to find and easier to choose. From improving an existing website
              to managing your next campaign, every service starts with your
              goals.
            </p>
            <Link href="/about" className="text-link">
              Meet your digital team <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="services-section section-pad">
        <div className="section-heading">
          <span className="eyebrow">02 / DIGITAL MARKETING SERVICES</span>
          <div>
            <h2>
              Everything digital.
              <br />
              <em>One focused team.</em>
            </h2>
            <p>
              Need a better website? More search visibility?
              <br />
              Choose one service or a connected marketing plan.
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
          <span className="eyebrow">03 / WHAT WE CAN DO FOR YOU</span>
          <h2>
            Digital problems.
            <br />
            <em>Practical solutions.</em>
            <sup>(04)</sup>
          </h2>
          <Link href="/work" className="text-link">
            Explore the approach <ArrowUpRight size={18} />
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
      <section className="working-promises">
        <div>
          <Search />
          <h3>Found in search.</h3>
          <p>Technical SEO, useful content and local visibility.</p>
        </div>
        <div>
          <Globe />
          <h3>Built to convert.</h3>
          <p>A clear, fast website with a simple path to enquire.</p>
        </div>
        <div>
          <Target />
          <h3>Promoted with purpose.</h3>
          <p>Focused ads and social content for your audience.</p>
        </div>
        <div>
          <BarChart3 />
          <h3>Measured clearly.</h3>
          <p>Transparent reporting and practical next steps.</p>
        </div>
      </section>
      <HorizontalScroll />
      <GrowthQuestions />
      <CTA />
    </div>
  );
}
