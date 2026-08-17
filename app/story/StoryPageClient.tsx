"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";
import Link from "next/link";

const E = [0.22, 0.1, 0.25, 1] as const;

export default function StoryPageClient() {
  const { lang, tr } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <div style={{ background: "var(--beige)", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden", height: "clamp(420px,60vh,680px)" }}>
        <img src="/lifestyle-bullfighting.png" alt="" aria-hidden="true" width={1400} height={900}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", filter: "brightness(0.42) saturate(0.7)" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(18,25,47,0.6) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(2.5rem,6vw,4.5rem)" }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: E }}
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "1rem" }}>
            {lang === "es" ? "Nuestra Historia · EST. MMXXVI" : "Our Story · EST. MMXXVI"}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, ease: E }}
            style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(2.8rem,7vw,6rem)", color: "rgba(248,246,241,0.95)", lineHeight: 0.95, letterSpacing: "-0.025em", margin: 0, maxWidth: "700px" }}>
            {lang === "es" ? <>Tradición Vestida.<br/>Dos culturas.</> : <>Tradition Worn.<br/>Two cultures.</>}
          </motion.h1>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">

        <motion.blockquote
          initial={{ opacity: 0, y: reduce ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, ease: E }}
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 900, fontSize: "clamp(1.6rem,3.5vw,2.8rem)", color: "var(--navy)", lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 3rem", borderLeft: "3px solid var(--burgundy)", paddingLeft: "1.5rem" }}>
          {lang === "es"
            ? <>"La tradición no es el pasado. Es saber qué perdura."</>
            : <>"Tradition isn't about the past. It's about knowing what endures."</>}
        </motion.blockquote>

        <div style={{ height: "1px", background: "rgba(30,44,80,0.08)", marginBottom: "3rem" }} />

        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: E }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "clamp(0.95rem,1.6vw,1.05rem)", lineHeight: 1.9, color: "var(--ink-60)", marginBottom: "1.75rem" }}>
            {lang === "es"
              ? "Cada temporada trae una marca nueva. Otra colección. Etiquetas construidas para el instante — la moda urbana girando siempre en la misma órbita, sin decir nada nuevo. Y sin embargo el polo, la camisa de lino, las prendas que llevan un siglo en las pistas de España y los campos de Inglaterra, seguían en manos de casas que habían dejado de escuchar."
              : "Every season, a new brand. Another drop. Labels built for the moment — streetwear cycling through the same rotation, none of them saying anything new. And yet the polo, the linen shirt, the pieces worn for a century on the courts of Spain and the fields of England, kept being left to houses that had stopped listening."}
          </p>

          <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "clamp(0.95rem,1.6vw,1.05rem)", lineHeight: 1.9, color: "var(--ink-60)", marginBottom: "1.75rem" }}>
            {lang === "es"
              ? "RIVBEL nació de ese hueco. Raíces en la artesanía española, formada por dos culturas. Para el hombre que no da más vueltas de las necesarias a lo que viste — que abre el armario por la mañana y ya sabe. Ropa clásica, bien hecha."
              : "RIVBEL was born from that gap. Rooted in Spanish craftsmanship, shaped by two cultures. For the man who doesn't overthink getting dressed — who reaches for something in the morning already knowing it's right. Classical menswear, properly made."}
          </p>
        </motion.div>

        <div style={{ height: "1px", background: "rgba(30,44,80,0.08)", margin: "3rem 0" }} />

        {/* Founders */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: E }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "8px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "1.25rem", opacity: 0.85 }}>
            {lang === "es" ? "Los Fundadores" : "The Founders"}
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1rem,1.8vw,1.2rem)", color: "var(--navy)", lineHeight: 1.8, marginBottom: "2rem", opacity: 0.88 }}>
            {tr.founders.narrative}
          </p>

          <div className="grid grid-cols-2" style={{ gap: "2rem", maxWidth: "320px" }}>
            {[
              { name: "José Luis", country: lang === "es" ? "España" : "Spain" },
              { name: "Rodrigo", country: lang === "es" ? "México" : "Mexico" },
            ].map(f => (
              <div key={f.name}>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(1.4rem,2.5vw,1.8rem)", color: "var(--navy)", lineHeight: 1.1, marginBottom: "4px" }}>{f.name}</p>
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--burgundy)", opacity: 0.7 }}>{f.country}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{ height: "1px", background: "rgba(30,44,80,0.08)", margin: "3.5rem 0" }} />

        {/* CTA */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link href="/collection" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#fff", background: "var(--burgundy)", padding: "14px 28px", textDecoration: "none" }}>
            {lang === "es" ? "Ver la Colección" : "Explore the Collection"}
          </Link>
          <Link href="/craft" style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--navy)", border: "1px solid rgba(30,44,80,0.25)", padding: "14px 28px", textDecoration: "none" }}>
            {lang === "es" ? "Nuestra Artesanía" : "Our Craft"}
          </Link>
        </div>
      </div>
    </div>
  );
}
