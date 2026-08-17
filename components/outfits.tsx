"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const PIECES = [
  {
    num: "Nº 04",
    nameEn: "Riviera Sage",
    nameEs: "Riviera Salvia",
    typeEn: "Linen Shirt",
    typeEs: "Camisa de Lino",
    materialEn: "100% European Linen · Made in Spain",
    materialEs: "100% Lino Europeo · Fabricado en España",
    image: "/product-shirt-sage-emblem.png",
    href: "/products/shirt-sage",
  },
  {
    num: "Nº 05",
    nameEn: "Olivo",
    nameEs: "Olivo",
    typeEn: "Polo",
    typeEs: "Polo",
    materialEn: "100% Organic Cotton Piqué · Made in Spain",
    materialEs: "100% Algodón Orgánico Piqué · Fabricado en España",
    image: "/product-polo-olive.png",
    href: "/products/polo-olive",
  },
  {
    num: "Nº 06",
    nameEn: "Ocaso Navy",
    nameEs: "Ocaso Navy",
    typeEn: "Polo",
    typeEs: "Polo",
    materialEn: "100% Organic Cotton Piqué · Made in Spain",
    materialEs: "100% Algodón Orgánico Piqué · Fabricado en España",
    image: "/product-polo-navy-gold.png",
    href: "/products/polo-navy",
  },
  {
    num: "Nº 07",
    nameEn: "Sevilla Blanc",
    nameEs: "Sevilla Blanc",
    typeEn: "Linen Shirt",
    typeEs: "Camisa de Lino",
    materialEn: "100% European Linen · Made in Spain",
    materialEs: "100% Lino Europeo · Fabricado en España",
    image: "/product-shirt-white.png",
    href: "/products/shirt-white",
  },
] as const;

export default function Outfits() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const label   = lang === "es" ? "La Colección · SS/26" : "The Collection · SS/26";
  const heading = lang === "es" ? "Las Prendas" : "The Pieces";
  const cta     = lang === "es" ? "Descubrir" : "Discover";

  return (
    <section
      style={{ background:"var(--navy-dark)", position:"relative" }}
      className="w-full py-20 md:py-28 grain"
    >
      {/* Corner marks */}
      <div style={{ position:"absolute", top:"24px", left:"28px", width:"20px", height:"20px", borderTop:"1px solid rgba(184,150,62,0.22)", borderLeft:"1px solid rgba(184,150,62,0.22)", pointerEvents:"none" }} aria-hidden="true" />
      <div style={{ position:"absolute", top:"24px", right:"28px", width:"20px", height:"20px", borderTop:"1px solid rgba(184,150,62,0.22)", borderRight:"1px solid rgba(184,150,62,0.22)", pointerEvents:"none" }} aria-hidden="true" />
      <div style={{ position:"absolute", bottom:"24px", left:"28px", width:"20px", height:"20px", borderBottom:"1px solid rgba(184,150,62,0.22)", borderLeft:"1px solid rgba(184,150,62,0.22)", pointerEvents:"none" }} aria-hidden="true" />
      <div style={{ position:"absolute", bottom:"24px", right:"28px", width:"20px", height:"20px", borderBottom:"1px solid rgba(184,150,62,0.22)", borderRight:"1px solid rgba(184,150,62,0.22)", pointerEvents:"none" }} aria-hidden="true" />

      <style dangerouslySetInnerHTML={{ __html: `
        .rivbel-outfit-cta:hover { background: var(--burgundy) !important; color: var(--off-white) !important; border-color: var(--burgundy) !important; }
        .rivbel-outfit-cta:focus-visible { outline: 2px solid var(--off-white); outline-offset: 4px; border-radius: 2px; }
        .rivbel-piece-img { transition: transform 0.85s cubic-bezier(0.22,0.1,0.25,1); }
        .rivbel-piece-wrap:hover .rivbel-piece-img { transform: scale(1.05); }
        .rivbel-piece-link { display: block; text-decoration: none; color: inherit; }
        .rivbel-piece-link:focus-visible { outline: 2px solid var(--gold); outline-offset: -2px; }
      `}} />

      <div className="max-w-6xl mx-auto px-6 md:px-10" style={{ position:"relative", zIndex:1 }}>

        {/* Section header */}
        <motion.div
          className="text-center"
          style={{ marginBottom:"3.5rem" }}
          initial={{ opacity:0, y: reduce?0:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }}
          transition={{ duration:0.9, ease:EASE }}
        >
          <p style={{ fontFamily:"var(--font-montserrat)", fontWeight:700, fontSize:"8px", letterSpacing:"0.42em", textTransform:"uppercase", color:"var(--burgundy)", marginBottom:"1rem", opacity:0.85 }}>
            {label}
          </p>
          <h2 style={{ fontFamily:"var(--font-cormorant)", fontWeight:400, fontStyle:"italic", fontSize:"clamp(2rem,4.5vw,3.5rem)", color:"var(--off-white)", lineHeight:1.05, letterSpacing:"-0.01em" }}>
            {heading}
          </h2>
          <div style={{ width:"36px", height:"1px", background:"var(--gold)", margin:"1.5rem auto 0", opacity:0.55 }} aria-hidden="true" />
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background:"rgba(184,150,62,0.1)" }}>
          {PIECES.map((piece, idx) => {
            const name     = lang === "es" ? piece.nameEs     : piece.nameEn;
            const type     = lang === "es" ? piece.typeEs     : piece.typeEn;
            const material = lang === "es" ? piece.materialEs : piece.materialEn;
            const isHov    = hoveredIdx === idx;

            return (
              <motion.a
                key={piece.num}
                href={piece.href}
                className="rivbel-piece-wrap rivbel-piece-link"
                initial={{ opacity:0, y: reduce?0:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-40px" }}
                transition={{ duration:0.85, ease:EASE, delay: reduce?0:idx*0.08 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ position:"relative", background:"#F2EDE8", overflow:"hidden" }}
              >
                {/* Garment image */}
                <div style={{ position:"relative", overflow:"hidden", aspectRatio:"3/4", background:"var(--off-white)" }}>
                  <img
                    src={piece.image}
                    alt={name}
                    className="rivbel-piece-img"
                    width={600}
                    height={800}
                    loading={idx < 2 ? "eager" : "lazy"}
                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }}
                  />

                  {/* Hover overlay */}
                  <motion.div
                    animate={{ opacity: isHov ? 1 : 0 }}
                    transition={{ duration:0.28 }}
                    style={{ position:"absolute", inset:0, background:"rgba(15,29,58,0.52)", display:"flex", alignItems:"center", justifyContent:"center" }}
                    aria-hidden="true"
                  >
                    <span
                      className="rivbel-outfit-cta"
                      style={{ fontFamily:"var(--font-montserrat)", fontWeight:600, fontSize:"9px", letterSpacing:"0.24em", textTransform:"uppercase", color:"var(--off-white)", border:"1px solid rgba(247,243,237,0.55)", padding:"11px 28px", borderRadius:"2px", touchAction:"manipulation", transition:"background 0.2s ease, color 0.2s ease, border-color 0.2s ease", pointerEvents:"none" }}
                    >
                      {cta}
                    </span>
                  </motion.div>
                </div>

                {/* Card footer */}
                <div style={{ padding:"1.25rem 1.5rem 1.75rem", borderTop:"1px solid rgba(184,150,62,0.12)", background:"#F2EDE8" }}>
                  <div style={{ display:"flex", alignItems:"baseline", gap:"0.75rem", marginBottom:"0.4rem" }}>
                    <span style={{ fontFamily:"var(--font-montserrat)", fontWeight:600, fontSize:"8px", letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--burgundy)", opacity:0.65 }}>
                      {piece.num}
                    </span>
                    <span style={{ fontFamily:"var(--font-cormorant)", fontWeight:400, fontStyle:"italic", fontSize:"clamp(1.1rem,2vw,1.45rem)", color:"var(--navy-dark)", letterSpacing:"0.01em", lineHeight:1 }}>
                      {name}
                    </span>
                  </div>
                  <p style={{ fontFamily:"var(--font-montserrat)", fontWeight:600, fontSize:"7px", letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--warm-grey)", opacity:0.6, marginBottom:"0.2rem" }}>
                    {type}
                  </p>
                  <p style={{ fontFamily:"var(--font-montserrat)", fontWeight:300, fontSize:"9px", letterSpacing:"0.06em", color:"var(--warm-grey)", opacity:0.55 }}>
                    {material}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
