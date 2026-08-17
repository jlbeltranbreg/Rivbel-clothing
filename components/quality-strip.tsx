"use client";

import { useLanguage } from "@/lib/language";

const PILLARS_EN = [
  "100% Organic Cotton Piqué",
  "European Certified Linen",
  "Made in Spain",
  "Limited Quantities",
  "Sprezzatura",
  "Tradition Worn",
  "España · México · MMXXVI",
  "Embroidered Castle Mark",
];

const PILLARS_ES = [
  "100% Algodón Orgánico Piqué",
  "Lino Europeo Certificado",
  "Fabricado en España",
  "Tiradas Limitadas",
  "Sprezzatura",
  "Tradición Vestida",
  "España · México · MMXXVI",
  "Castillo Bordado",
];

export default function QualityStrip() {
  const { lang } = useLanguage();
  const pillars = lang === "es" ? PILLARS_ES : PILLARS_EN;
  const doubled = [...pillars, ...pillars];

  return (
    <div
      style={{
        background: "var(--navy-dark)",
        borderTop: "1px solid rgba(123,34,53,0.3)",
        borderBottom: "1px solid rgba(123,34,53,0.3)",
        padding: "14px 0",
        overflow: "hidden",
        position: "relative",
      }}
      aria-hidden="true"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rivbel-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rivbel-marquee-track { animation: none !important; }
        }
      `}} />
      <div
        className="rivbel-marquee-track"
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "rivbel-marquee 28s linear infinite",
          willChange: "transform",
        }}
      >
        {doubled.map((p, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 400,
              fontSize: "9px",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "var(--off-white)",
              opacity: 0.45,
              paddingRight: "2.5em",
            }}
          >
            {p}
            <span style={{ color: "var(--burgundy)", opacity: 0.65, marginLeft: "2.5em", letterSpacing: 0 }} aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
