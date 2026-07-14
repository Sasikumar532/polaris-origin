import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Polaris Origin — Outbound GTM & RevOps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "src/po-logo-1.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1f3a5f",
          position: "relative",
        }}
      >
        {/* gold top rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "#C9A14A",
          }}
        />
        {/* logo lockup (white variant on navy) */}
        <img
          src={logoSrc}
          width={780}
          height={224}
          style={{ objectFit: "contain" }}
          alt="Polaris Origin"
        />
      </div>
    ),
    { ...size }
  );
}
