"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, ArrowUp } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useUI } from "@/store/ui";
import { Magnetic } from "./animations";
import { photo, projects } from "@/data/content";
const links = [
  ["Services", "/services"],
  ["Our approach", "/work"],
  ["About", "/about"],
  ["Journal", "/blog"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
];
export function Navbar() {
  const menu = useUI((s) => s.menu),
    setMenu = useUI((s) => s.setMenu),
    path = usePathname();
  const nav = useRef<HTMLElement>(null),
    overlay = useRef<HTMLDivElement>(null),
    toggle = useRef<HTMLButtonElement>(null);
  const [preview, setPreview] = useState(0);
  useEffect(() => {
    setMenu(false);
  }, [path, setMenu]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        onUpdate: (s) => {
          gsap.to(nav.current, {
            y: s.direction === 1 && s.scroll() > 120 ? -95 : 0,
            duration: 0.3,
          });
          const bar = nav.current?.querySelector(".progress");
          if (bar) gsap.set(bar, { scaleX: s.progress });
        },
      });
    }, nav);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    if (!menu) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focus = overlay.current?.querySelector<HTMLElement>("a");
    focus?.focus();
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes =
          overlay.current?.querySelectorAll<HTMLElement>("a,button");
        if (!nodes?.length) return;
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", listener);
    };
  }, [menu, setMenu]);
  return (
    <>
      <header ref={nav} className="nav">
        <Link href="/" className="logo" aria-label="Offscript home">
          offscript<span>®</span>
          <i>✳</i>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.slice(0, 4).map(([name, url]) => (
            <Link
              aria-current={path === url ? "page" : undefined}
              href={url}
              key={url}
            >
              {name}
              <span className="nav-dot" />
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link href="/contact" className="nav-cta">
            Let’s talk <ArrowUpRight size={16} />
          </Link>
          <button
            ref={toggle}
            aria-label="Open menu"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Menu size={22} />
          </button>
        </div>
        <div className="progress" />
      </header>
      {menu && (
        <div
          ref={overlay}
          className="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="menu-top">
            <span className="logo">offscript®</span>
            <button
              aria-label="Close menu"
              onClick={() => {
                setMenu(false);
                toggle.current?.focus();
              }}
            >
              <X />
            </button>
          </div>
          <div className="menu-body">
            <nav>
              {links.map(([label, url], i) => (
                <Link
                  key={url}
                  href={url}
                  onClick={() => setMenu(false)}
                  onMouseEnter={() => setPreview(i % projects.length)}
                >
                  <sup>0{i + 1}</sup>
                  {label}
                  <ArrowUpRight />
                </Link>
              ))}
            </nav>
            <div className="menu-image">
              <Image
                src={photo(projects[preview].image)}
                alt={projects[preview].name}
                fill
                sizes="40vw"
              />
              <span>GET FOUND. GET CHOSEN.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export function CTA() {
  return (
    <section className="cta-section">
      <div className="eyebrow">
        <span className="status-dot" /> READY FOR YOUR NEXT STAGE?
      </div>
      <Link href="/contact">
        <Magnetic>
          <h2>
            LET’S GROW
            <br />
            <span>YOUR BUSINESS.</span>
            <ArrowUpRight />
          </h2>
        </Magnetic>
      </Link>
      <div className="cta-bottom">
        <p>
          Better search visibility. A website that works harder.
          <br />
          Let’s find the right next step for your business.
        </p>
        <Link className="pill dark" href="/contact?service=web-development">
          Request a website review <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
export function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer>
      <div className="footer-top">
        <p>
          SEO. Websites. Ads.
          <br />
          Built around your business.
        </p>
        <div>
          <span className="eyebrow">FIND YOUR WAY</span>
          <div className="footer-links">
            {links.map(([n, u]) => (
              <Link key={u} href={u}>
                {n} ↗
              </Link>
            ))}
          </div>
        </div>
        <div>
          <span className="eyebrow">SAY HELLO</span>
          <Link href="/contact">Discuss your growth goals ↗</Link>
          <span className="local-time">Mumbai, IN · {time || "IST"}</span>
        </div>
        <button
          className="top-button"
          aria-label="Back to top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
        >
          <ArrowUp />
        </button>
      </div>
      <Link href="/" className="footer-wordmark">
        offscript<span>®</span>
      </Link>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} OFFSCRIPT. DIGITAL MARKETING.</span>
        <span>PORTFOLIO EXAMPLES ARE ILLUSTRATIVE CONCEPTS</span>
        <span>BUILT FOR WHAT’S NEXT ↗</span>
      </div>
    </footer>
  );
}
