import Link from "next/link";
export default function NotFound() {
  return (
    <section className="not-found">
      <span className="eyebrow">WELL, THIS WENT OFFSCRIPT.</span>
      <h1>
        4<span>✳</span>4
      </h1>
      <h2>A little lost. Still in good company.</h2>
      <p>This page doesn’t exist. Let’s get you back to the good stuff.</p>
      <Link className="pill lime" href="/">
        Take me home ↗
      </Link>
    </section>
  );
}
