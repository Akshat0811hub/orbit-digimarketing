"use client";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useUI } from "@/store/ui";

export function SmoothScroll() {
  const path = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    const tick = (t: number) => lenis.raf(t * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const unsub = useUI.subscribe((s) =>
      s.menu ? lenis.stop() : lenis.start(),
    );
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => {
      unsub();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    const id = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(id);
  }, [path]);
  return null;
}
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null),
    dot = useRef<HTMLDivElement>(null);
  const cursor = useUI((s) => s.cursor);
  useEffect(() => {
    if (
      !matchMedia("(pointer:fine)").matches ||
      matchMedia("(prefers-reduced-motion:reduce)").matches
    )
      return;
    const x = gsap.quickTo(ring.current, "x", { duration: 0.35 }),
      y = gsap.quickTo(ring.current, "y", { duration: 0.35 });
    const move = (e: MouseEvent) => {
      x(e.clientX);
      y(e.clientY);
      gsap.set(dot.current, { x: e.clientX, y: e.clientY });
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "[data-cursor],a,button,input,textarea",
      );
      useUI
        .getState()
        .setCursor(el?.getAttribute("data-cursor") ?? (el ? "↗" : ""));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={`cursor-ring ${cursor ? "active" : ""}`}>
        {cursor}
      </div>
    </>
  );
}
export function Preloader() {
  const loaded = useUI((s) => s.loaded),
    setLoaded = useUI((s) => s.setLoaded);
  const root = useRef<HTMLDivElement>(null),
    num = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (loaded) return;
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      setLoaded();
      return;
    }
    const ctx = gsap.context(() => {
      const value = { n: 0 };
      gsap
        .timeline({ onComplete: setLoaded })
        .to(value, {
          n: 100,
          duration: 1,
          ease: "power2.out",
          onUpdate: () => {
            if (num.current)
              num.current.textContent = String(Math.round(value.n)).padStart(
                3,
                "0",
              );
          },
        })
        .to(root.current, {
          yPercent: -100,
          duration: 0.65,
          ease: "power4.inOut",
        });
    }, root);
    return () => ctx.revert();
  }, [loaded, setLoaded]);
  return loaded ? null : (
    <div className="preloader" ref={root} aria-hidden="true">
      <strong>
        offscript<span>®</span>
      </strong>
      <div>
        GOOD THINGS DON’T FOLLOW SCRIPTS. <span ref={num}>000</span>
      </div>
    </div>
  );
}
export function PageTransition({ children }: { children: ReactNode }) {
  const path = usePathname(),
    reduced = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={path}
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduced ? 0 : -12 }}
        transition={{ duration: 0.22 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 45,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 94%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
export function SplitText({ text }: { text: string }) {
  return (
    <span aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span className="word-mask" key={i} aria-hidden="true">
          <span>{w}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}
export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={(e) => {
        if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        gsap.to(ref.current, {
          x: (e.clientX - r.left - r.width / 2) * 0.13,
          y: (e.clientY - r.top - r.height / 2) * 0.13,
          duration: 0.3,
        });
      }}
      onMouseLeave={() =>
        gsap.to(ref.current, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1,.4)",
        })
      }
    >
      {children}
    </div>
  );
}
export function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const ctx = gsap.context(() => {
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 95%", once: true },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = Math.round(obj.n) + suffix;
        },
      });
    });
    return () => ctx.revert();
  }, [value, suffix]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tween = gsap.to(ref.current, {
        xPercent: -50,
        duration: 25,
        ease: "none",
        repeat: -1,
      });
      ScrollTrigger.create({
        onUpdate: (s) =>
          gsap.to(tween, {
            timeScale:
              (s.direction || 1) *
              (1 + Math.min(Math.abs(s.getVelocity()) / 1500, 2)),
            duration: 0.4,
            overwrite: true,
          }),
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div
      className="marquee"
      aria-label="Independent minds. Extraordinary outcomes."
    >
      <div ref={ref}>
        {[0, 1, 2, 3].map((n) => (
          <span key={n} aria-hidden="true">
            INDEPENDENT MINDS <i>✳</i> EXTRAORDINARY OUTCOMES <i>✳</i>{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
