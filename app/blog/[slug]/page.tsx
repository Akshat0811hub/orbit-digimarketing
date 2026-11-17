import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts, photo } from "@/data/content";
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  return { title: p?.title || "Article not found", description: p?.body[0] };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = posts[(posts.indexOf(p) + 1) % posts.length];
  return (
    <article>
      <header className="article-heading">
        <Link className="text-link" href="/blog">
          ← The journal
        </Link>
        <span className="eyebrow">
          {p.category} / {p.date} / {p.read} READ
        </span>
        <h1>{p.title}</h1>
        <p>Words by the OFFSCRIPT studio</p>
      </header>
      <div className="article-image">
        <Image src={photo(p.image)} alt={p.title} fill priority sizes="100vw" />
      </div>
      <div className="article-body">
        {p.body.map((b, i) => (
          <section key={b}>
            {i > 0 && (
              <h2>
                {
                  [
                    "",
                    "Start with the right question.",
                    "Give the idea room to grow.",
                    "Keep the conversation going.",
                  ][i]
                }
              </h2>
            )}
            <p>{b}</p>
          </section>
        ))}
        <div className="article-end">
          Have a different take?{" "}
          <Link href="/contact">We’d love to hear it ↗</Link>
        </div>
      </div>
      <Link className="next-project" href={`/blog/${next.slug}`}>
        <span className="eyebrow">KEEP READING</span>
        <h2>{next.title} ↗</h2>
      </Link>
    </article>
  );
}
