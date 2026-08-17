"use client";

export type LogoVariant = "dark" | "light";

interface LogoProps {
  variant?: LogoVariant;
  animate?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

/* SVG label from brand files. Natural size: 1024 × 1046 px (≈ 1 : 1.02 ratio). */
export function LogoMark({
  variant = "light",
  animate = true,
  className = "",
  width = 40,
  height,
}: LogoProps) {
  const h = height ?? Math.round(width * 1046 / 1024);

  return (
    <img
      src="/rivbel-etiqueta.svg"
      alt=""
      aria-hidden="true"
      width={width}
      height={h}
      className={className}
      style={{
        display: "block",
        transition: animate ? "opacity 0.3s ease" : "none",
        ...(variant === "dark" && {
          filter: "drop-shadow(0 1px 8px rgba(0,0,0,0.45))",
          borderRadius: "1px",
        }),
      }}
    />
  );
}

/* Full lockup: label mark + RIVBEL wordmark + burgundy rule */
export function Logo({
  variant = "light",
  animate = true,
  className = "",
}: LogoProps) {
  const textColor = variant === "dark" ? "#FAFAF8" : "#0F1D3A";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark variant={variant} animate={animate} width={40} />
      <div className="flex flex-col gap-0.5">
        <span
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: textColor,
            lineHeight: 1,
          }}
        >
          RIVBEL
        </span>
        <div
          style={{
            width: "28px",
            height: "1px",
            background: "#7B2235",
            opacity: 0.7,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
