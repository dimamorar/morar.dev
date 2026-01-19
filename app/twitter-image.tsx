import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dmytro Morar - Full Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "0 0 20px 0",
              lineHeight: 1.1,
            }}
          >
            Dmytro Morar
          </h1>
          <p
            style={{
              fontSize: "36px",
              color: "#94a3b8",
              margin: "0 0 40px 0",
            }}
          >
            Full Stack Developer
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["React", "Next.js", "TypeScript", "Node.js"].map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "12px 24px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                  fontSize: "24px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            color: "#64748b",
            fontSize: "24px",
          }}
        >
          morar.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
