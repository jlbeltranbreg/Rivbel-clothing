"use client";
import { useLanguage } from "@/lib/language";

const FACTS_EN = [
  "100% Cotton Piqué · 200 g/m²",
  "Castle Embroidery 2.5 × 3 cm",
  "100% Linen · 140 g/m²",
  "Made in Spain",
  "Limited Edition Drop 01",
  "Heritage with Style",
  "Woven Inner Collar",
  "GOTS Certified Cotton",
];

const FACTS_ES = [
  "100% Algodón Piqué · 200 g/m²",
  "Bordado Castillo 2.5 × 3 cm",
  "100% Lino · 140 g/m²",
  "Fabricado en España",
  "Edición Limitada Entrega 01",
  "Herencia con Estilo",
  "Etiqueta Interior Tejida",
  "Algodón Certificado GOTS",
];

export default function CraftBand() {
  const { lang } = useLanguage();
  const facts = lang === "es" ? FACTS_ES : FACTS_EN;
  const doubled = [...facts, ...facts];

  return (
    <div style={{ background:"var(--navy-deep)", borderTop:"1px solid rgba(155,35,43,0.3)", borderBottom:"1px solid rgba(155,35,43,0.15)", padding:"13px 0", overflow:"hidden" }} aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html:`
        @keyframes rv-marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
        @media (prefers-reduced-motion:reduce) { .rv-marquee-track { animation:none !important; } }
      `}} />
      <div className="rv-marquee-track" style={{ display:"flex", whiteSpace:"nowrap", animation:"rv-marquee 32s linear infinite", willChange:"transform" }}>
        {doubled.map((fact, i) => (
          <span key={i} style={{ display:"inline-flex", alignItems:"center", fontFamily:"var(--font-body)", fontWeight:400, fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(248,246,241,0.38)", paddingRight:"3em" }}>
            {fact}
            <span style={{ color:"var(--burgundy)", opacity:0.55, marginLeft:"3em" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
