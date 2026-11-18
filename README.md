# OFFSCRIPT®

A complete Next.js App Router agency concept: 21 content pages, custom 404, responsive design, GSAP motion, a lazy-loaded R3F hero, local typed content and a Resend contact endpoint.

## Run

Requires Node.js 20.9+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the Local URL printed by Next.js. On Windows, copy `.env.example` to `.env.local` using your editor or `Copy-Item`.

```bash
npm run typecheck
npm run build
npm start
```

Do not run the development server and production build simultaneously: both use `.next`.

## Structure

```text
app/
  page.tsx                     Homepage
  layout.tsx                   Fonts, metadata, navigation, app shell
  about/page.tsx               Story, principles and illustrative team
  services/page.tsx            Seven disciplines
  services/[slug]/page.tsx     Service detail
  work/page.tsx                Filterable portfolio
  work/[slug]/page.tsx         Case study and next project
  blog/page.tsx                Journal
  blog/[slug]/page.tsx         Article
  careers/page.tsx             Studio culture and introductions
  contact/page.tsx             Enquiry form and location
  api/contact/route.ts         Server-side validation and Resend delivery
  not-found.tsx                Actual 404 response
  404/page.tsx                 Explicit 404 showcase
  sitemap.ts / robots.ts       Search engine routes
  opengraph-image.tsx          Generated social image
  icon.svg                     Brand favicon
components/
  animations.tsx               SmoothScroll, Cursor, Preloader, PageTransition,
                               Reveal, SplitText, Magnetic, Counter, Marquee
  home.tsx                     Homepage, ProjectCard, ParallaxImage,
                               HorizontalScroll and testimonials
  hero-scene.tsx               Lazy-loaded Three.js hero knot
  layout.tsx                   Navigation, fullscreen menu, CTA and footer
  page-heading.tsx             Shared interior page heading
  portfolio.tsx                Accessible category filters with GSAP Flip
  contact-form.tsx             React Hook Form + Zod client validation
data/content.ts                Typed, local JSON-shaped editorial content
lib/gsap.ts                    GSAP plugin registration
lib/contact.ts                 Shared validation schema
store/ui.ts                    Zustand UI state
styles/globals.css             Tailwind import, design tokens and styles
```

## Customize before launch

- Replace OFFSCRIPT with the agency name, wordmark and favicon.
- Update palette and spacing tokens in `styles/globals.css`.
- Edit services, projects, articles and team profiles in `data/content.ts`.
- Replace stock imagery with owned, licensed campaign assets. Images currently use Unsplash URLs through Next Image. For production, store final files in `public/images` and update image references.
- Replace all concept brands, fictional team members, sample testimonials and illustrative campaign targets with approved content. Keep the disclosure until this is complete.
- Update the location, contact wording, careers availability and any real social profile links. No fabricated social links or active vacancies are included.
- Set `NEXT_PUBLIC_SITE_URL` to your real HTTPS domain for sitemap, robots and metadata.
- Connect Resend: set `RESEND_API_KEY`, `CONTACT_FROM` (a verified sending domain) and `CONTACT_TO` in server environment variables.
- Review your privacy obligations and add your final privacy policy as appropriate. The form explains the current enquiry-only use.

## Vercel deployment

1. Push this repository to your Git provider, excluding `.env.local` and `.tools`.
2. Import it in Vercel and select the detected Next.js framework preset.
3. Set all four variables from `.env.example` under Project → Settings → Environment Variables.
4. Deploy with the default `npm run build` command. No static export is used: `/api/contact` requires server execution.
5. Verify your sending domain in Resend, send a real enquiry, and check the recipient inbox and reply-to address.
6. Add your domain in Vercel, update `NEXT_PUBLIC_SITE_URL`, and redeploy.
7. Run Lighthouse against the deployed production URL, inspect Core Web Vitals on real devices, and test keyboard/reduced-motion navigation. Scores and 60fps are targets, not measured guarantees.

## Motion and accessibility

GSAP effects clean up on unmount. Lenis is connected to the GSAP ticker and ScrollTrigger. Reduced-motion users bypass smooth scrolling, the preloader and scroll animations; touch users retain normal scrolling without a custom cursor. Menu focus is trapped, Escape closes it, and a skip link leads to main content. Native links, buttons and form controls provide keyboard operation. The process section pins only on larger screens and becomes a normal grid on mobile.

The contact route uses plain-text email, bounded fields and a honeypot. It reports 503 when mail configuration is absent; it never presents a false successful delivery. Add provider/edge rate limiting appropriate to your traffic before public launch. No messages are stored locally. API success must be verified with real credentials.

## Deliberate scope notes

This implementation uses a restrained route fade/slide, snap-on-release draggable testimonials (no paid inertia extension), CSS image treatments, and a lightweight decorative Three.js knot. It does not claim every advanced effect in the aspirational brief, award recognition, measured Lighthouse scores, or verified client outcomes. Content stays readable if animations are disabled.

Konami easter egg: ↑ ↑ ↓ ↓ ← → ← → B A toggles a colour shift on the homepage.

Dependency installation is locked by `package-lock.json`. A PostCSS override selects a patched release for the transitive Next.js dependency.

# orbit-digimarketing
