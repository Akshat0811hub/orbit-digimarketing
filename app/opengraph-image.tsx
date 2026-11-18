import { ImageResponse } from "next/og";
export const alt = "OFFSCRIPT — SEO, Website Redesign & Digital Marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        color: "#f5f2ea",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 65,
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 42, display: "flex" }}>
        offscript® <span style={{ color: "#d6ff3f", marginLeft: 700 }}>↗</span>
      </div>
      <div
        style={{
          fontSize: 112,
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: -6,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>GET FOUND.</span>
        <span style={{ color: "#d6ff3f" }}>GET CHOSEN.</span>
      </div>
      <div style={{ fontSize: 20 }}>
        SEO · WEBSITE REDESIGN · PAID ADS · SOCIAL MEDIA
      </div>
    </div>,
    size,
  );
}
