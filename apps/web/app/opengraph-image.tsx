import { ImageResponse } from "next/og";

export const alt =
  "Gryffindor Lab — websites, apps, video editing and graphic design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "65px 75px",
        background: "#171916",
        color: "#f2f0e9",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        gryffindor<span style={{ color: "#fc6749" }}>.</span>
        <span
          style={{
            marginLeft: 20,
            fontSize: 15,
            letterSpacing: 3,
            fontWeight: 600,
          }}
        >
          LAB
        </span>
      </div>
      <div
        style={{
          width: 460,
          height: 460,
          position: "absolute",
          right: -110,
          top: 85,
          borderRadius: "50%",
          background: "#fc6749",
          boxShadow: "0 0 0 55px #fc674922, 0 0 0 110px #fc674411",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: -6,
            lineHeight: 1.04,
          }}
        >
          Make it impossible
        </span>
        <span
          style={{
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: -6,
            lineHeight: 1.04,
          }}
        >
          to ignore<span style={{ color: "#fc6749" }}>.</span>
        </span>
        <span style={{ marginTop: 35, fontSize: 24, color: "#c9c9c1" }}>
          Websites & apps · Video editing · Graphic design
        </span>
      </div>
    </div>,
    size,
  );
}
