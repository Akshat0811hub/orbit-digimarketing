import type { NextConfig } from "next";
const config: NextConfig = {
  async redirects() {
    // Keep existing shared project and article links useful after repositioning.
    return [
      ["/work/velocity", "/work/local-search"],
      ["/work/after-hours", "/work/social-content"],
      ["/work/form-and-field", "/work/website-redesign"],
      ["/work/daily-dose", "/work/lead-generation"],
      ["/blog/attention-is-earned", "/blog/seo-before-more-content"],
      ["/blog/brand-systems-with-a-pulse", "/blog/website-redesign-checklist"],
      ["/blog/creative-is-a-growth-strategy", "/blog/paid-ads-landing-pages"],
    ].map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};
export default config;
