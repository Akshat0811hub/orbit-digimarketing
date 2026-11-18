import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeading } from "@/components/page-heading";
import { posts, photo } from "@/data/content";
import { CTA } from "@/components/layout";
export const metadata: Metadata = {
  title: "The journal",
  description:
    "Practical notes on SEO, website redesign, landing pages and digital marketing.",
};
export default function Page() {
  return (
    <>
      <PageHeading
        label="THE OFFSCRIPT JOURNAL"
        title="Less guesswork."
        accent="Better marketing."
        description="Practical ideas for a better website, a clearer search presence and more purposeful campaigns."
      />
      <section className="blog-grid section-pad">
        {posts.map((p, i) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className={i === 0 ? "featured-post" : ""}
          >
            <div className="blog-image">
              <Image
                src={photo(p.image)}
                alt={p.title}
                fill
                sizes={i === 0 ? "90vw" : "45vw"}
              />
              <span>↗</span>
            </div>
            <div className="blog-meta">
              {p.category} <span>{p.read} READ</span>
            </div>
            <h2>{p.title}</h2>
            <p>{p.date}</p>
          </Link>
        ))}
      </section>
      <CTA />
    </>
  );
}
