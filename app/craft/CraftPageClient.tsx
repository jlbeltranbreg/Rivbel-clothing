"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const E = [0.22, 0.1, 0.25, 1] as const;

export default function CraftPageClient() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();

  const specRow = (label: string, value: string) => (
    <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", borderTop: "1px solid rgba(30,44,80,0.07)", padding: "14px 0" }}>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-60)" }}>{label}</p>
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", color: "var(--navy)" }}>{value}</p>
    </div>
  );

  return (
    <div style={{ background: "var(--beige)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "var(--navy-deep)", padding: "clamp(4rem,9vw,7rem) 0 clamp(3rem,6vw,5rem)" }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: E }}
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "1.25rem" }}>
            {lang === "es" ? "Construcción · MMXXVI" : "Construction · MMXXVI"}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: reduce ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, ease: E }}
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic", fontSize: "clamp(2.6rem,6vw,5rem)", color: "rgba(248,246,241,0.95)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            {lang === "es" ? <>La Artesanía<br/>de Rivbel.</> : <>The Craft<br/>of Rivbel.</>}
          </motion.h1>
          <div style={{ width: "40px", height: "1px", background: "var(--burgundy)", opacity: 0.65 }} aria-hidden="true" />
        </div>
      </div>

      {/* Embroidery section */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">

        <motion.section
          initial={{ opacity: 0, y: reduce ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.85, ease: E }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "8px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "0.75rem", opacity: 0.85 }}>
            {lang === "es" ? "Bordado del Castillo" : "Castle Embroidery"}
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontStyle: "italic", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--navy)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "2rem" }}>
            {lang === "es" ? "2.5 × 3 cm. Hilo dorado. Cada punto colocado a mano." : "2.5 × 3 cm. Gold thread. Every stitch placed by hand."}
          </h2>
          <div style={{ borderTop: "1px solid rgba(155,35,43,0.2)", marginBottom: "2rem" }} />
          {[
            [lang==="es"?"Dimensiones":"Dimensions", "2.5 cm × 3 cm"],
            [lang==="es"?"Hilo":"Thread", lang==="es"?"Hilo dorado sobre piqué marino":"Gold thread on navy piqué"],
            [lang==="es"?"Método":"Method", lang==="es"?"Bordado a máquina de precisión":"Precision machine embroidery"],
            [lang==="es"?"Motivo":"Motif", lang==="es"?"Castillo Rivbel — escudo heráldico":"Rivbel castle — heraldic crest"],
          ].map(([l, v]) => specRow(l, v))}
        </motion.section>

        <div style={{ height: "1px", background: "rgba(30,44,80,0.08)", margin: "3.5rem 0" }} aria-hidden="true" />

        {/* Placement section */}
        <motion.section
          initial={{ opacity: 0, y: reduce ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.85, ease: E }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "8px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "0.75rem", opacity: 0.85 }}>
            {lang === "es" ? "Posicionamiento Exacto" : "Exact Placement"}
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontStyle: "italic", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--navy)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "2rem" }}>
            {lang === "es" ? "Nada es aproximado." : "Nothing is approximate."}
          </h2>
          <div style={{ borderTop: "1px solid rgba(155,35,43,0.2)", marginBottom: "2rem" }} />

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "3rem" }}>
            {/* Polo placement */}
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy)", marginBottom: "1rem" }}>
                {lang === "es" ? "Polo" : "Polo"}
              </p>
              {[
                [lang==="es"?"Desde el hombro":"From shoulder seam", "20 cm"],
                [lang==="es"?"Desde el centro / botones":"From center / buttons", "10 cm"],
              ].map(([l, v]) => specRow(l, v))}
            </div>
            {/* Shirt placement */}
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy)", marginBottom: "1rem" }}>
                {lang === "es" ? "Camisa" : "Shirt"}
              </p>
              {[
                [lang==="es"?"Desde el hombro":"From shoulder", "42 cm"],
                [lang==="es"?"Desde el centro":"From center", "13 cm"],
              ].map(([l, v]) => specRow(l, v))}
            </div>
          </div>
        </motion.section>

        <div style={{ height: "1px", background: "rgba(30,44,80,0.08)", margin: "3.5rem 0" }} aria-hidden="true" />

        {/* Fabric section */}
        <motion.section
          initial={{ opacity: 0, y: reduce ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.85, ease: E }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "8px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "0.75rem", opacity: 0.85 }}>
            {lang === "es" ? "Materiales" : "Materials"}
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontStyle: "italic", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--navy)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "2rem" }}>
            {lang === "es" ? "Tejidos que duran décadas." : "Fabrics that last decades."}
          </h2>
          <div style={{ borderTop: "1px solid rgba(155,35,43,0.2)", marginBottom: "2rem" }} />

          {[
            ["Ocaso Navy · Olivo", lang==="es"?"100% Algodón Piqué · 200–230 g/m²":"100% Cotton Piqué · 200–230 g/m²"],
            ["Sevilla Blanc", lang==="es"?"100% Algodón Oxford · 140–170 g/m²":"100% Cotton Oxford · 140–170 g/m²"],
            ["Riviera Sage", lang==="es"?"100% Lino Europeo · 130–150 g/m²":"100% European Linen · 130–150 g/m²"],
          ].map(([l, v]) => specRow(l, v))}
        </motion.section>

        <div style={{ height: "1px", background: "rgba(30,44,80,0.08)", margin: "3.5rem 0" }} aria-hidden="true" />

        {/* Inner collar */}
        <motion.section
          initial={{ opacity: 0, y: reduce ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.85, ease: E }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "8px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "0.75rem", opacity: 0.85 }}>
            {lang === "es" ? "Etiqueta Interior" : "Inner Collar"}
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontStyle: "italic", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--navy)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "2rem" }}>
            {lang === "es" ? "El detalle que nadie pide, pero que importa." : "The detail nobody asks for, but matters."}
          </h2>
          <div style={{ borderTop: "1px solid rgba(155,35,43,0.2)", marginBottom: "2rem" }} />
          {[
            [lang==="es"?"Todas las prendas":"All garments", lang==="es"?"Etiqueta tejida Rivbel en el cuello interior":"Woven Rivbel label at the inner collar"],
            [lang==="es"?"Camisas (Oxford y Lino)":"Shirts (Oxford & Linen)", lang==="es"?"Bordado interior adicional: 'Heritage with Style'":"Additional inner embroidery: 'Heritage with Style'"],
          ].map(([l, v]) => specRow(l, v))}
        </motion.section>

        <div style={{ height: "1px", background: "rgba(30,44,80,0.08)", margin: "3.5rem 0" }} aria-hidden="true" />

        {/* Production */}
        <motion.section
          initial={{ opacity: 0, y: reduce ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.85, ease: E }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "8px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "0.75rem", opacity: 0.85 }}>
            {lang === "es" ? "Producción" : "Production"}
          </p>
          {[
            [lang==="es"?"Origen del tejido":"Fabric origin", lang==="es"?"Telares europeos certificados":"European certified mills"],
            [lang==="es"?"Fabricación":"Manufacturing", lang==="es"?"España — tiradas limitadas":"Spain — limited quantities"],
            [lang==="es"?"Intermediario":"Intermediary", "Oltex"],
            [lang==="es"?"Producción y bordado":"Production & embroidery", "Nextdrop"],
          ].map(([l, v]) => specRow(l, v))}
        </motion.section>

      </div>
    </div>
  );
}
