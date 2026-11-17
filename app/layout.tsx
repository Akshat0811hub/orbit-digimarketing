import type { Metadata } from "next";
import { Syne, Inter_Tight } from "next/font/google";
import { Navbar, Footer } from "@/components/layout";
import {
  SmoothScroll,
  Cursor,
  Preloader,
  PageTransition,
} from "@/components/animations";
import "@/styles/globals.css";
const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: "OFFSCRIPT® — Independent minds. Extraordinary outcomes.",
    template: "%s — OFFSCRIPT®",
  },
  description:
    "An independent creative and digital agency for brands ready to do things differently. Strategy, branding, social, film and digital experiences.",
  openGraph: {
    type: "website",
    siteName: "OFFSCRIPT",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <Cursor />
        <Preloader />
        <Navbar />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "OFFSCRIPT",
              url: base,
              description:
                "Independent creative and digital agency concept website.",
            }),
          }}
        />
      </body>
    </html>
  );
}
