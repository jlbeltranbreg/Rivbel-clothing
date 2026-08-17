"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function Manifesto() {
  const { tr } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section
      style={{ background: "var(--navy-dark)", position: "relative" }}
      className="grain w-full py-40 md:py-56"
    >
      {/* Corner accent marks — editorial luxury */}
      <div style={{ position:"absolute", top:"28px", left:"32px", width:"20px", height:"20px", borderTop:"1px solid rgba(184,150,62,0.35)", borderLeft:"1px solid rgba(184,150,62,0.35)", pointerEvents:"none" }} aria-hidden="true" />
      <div style={{ position:"absolute", top:"28px", right:"32px", width:"20px", height:"20px", borderTop:"1px solid rgba(184,150,62,0.35)", borderRight:"1px solid rgba(184,150,62,0.35)", pointerEvents:"none" }} aria-hidden="true" />
      <div style={{ position:"absolute", bottom:"28px", left:"32px", width:"20px", height:"20px", borderBottom:"1px solid rgba(184,150,62,0.35)", borderLeft:"1px solid rgba(184,150,62,0.35)", pointerEvents:"none" }} aria-hidden="true" />
      <div style={{ position:"absolute", bottom:"28px", right:"32px", width:"20px", height:"20px", borderBottom:"1px solid rgba(184,150,62,0.35)", borderRight:"1px solid rgba(184,150,62,0.35)", pointerEvents:"none" }} aria-hidden="true" />

      <motion.div
        className="max-w-3xl mx-auto px-10 text-center"
        style={{ position: "relative", zIndex: 1 }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden:{}, show:{ transition:{ staggerChildren: reduce?0:0.22, delayChildren: reduce?0:0.15 }}}}
      >
        {/* Opening glyph */}
        <motion.p
          variants={{ hidden:{ opacity:0 }, show:{ opacity:1, transition:{ duration:0.7, ease:EASE }}}}
          style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, fontSize:"5rem", color:"var(--burgundy)", lineHeight:1, marginBottom:"-1.5rem", opacity:0.35, userSelect:"none" }}
          aria-hidden="true"
        >
          &ldquo;
        </motion.p>

        {/* Main quote */}
        <motion.blockquote
          variants={{ hidden:{ opacity:0, y: reduce?0:28 }, show:{ opacity:1, y:0, transition:{ duration:1.1, ease:EASE }}}}
          style={{
            fontFamily: "var(--font-im-fell)",
            fontStyle: "italic",
            fontSize: "clamp(2rem,4.5vw,3.8rem)",
            color: "var(--off-white)",
            lineHeight: 1.35,
            fontWeight: 400,
            letterSpacing: "0.01em",
            margin: 0,
            padding: 0,
          }}
        >
          {tr.manifesto.quote}
        </motion.blockquote>

        {/* Gold rule */}
        <motion.div
          variants={{ hidden:{ opacity:0, scaleX: reduce?1:0 }, show:{ opacity:0.65, scaleX:1, transition:{ duration:0.7, ease:EASE }}}}
          style={{ width:"48px", height:"1px", background:"var(--gold)", margin:"2.75rem auto", transformOrigin:"center" }}
          aria-hidden="true"
        />

        {/* Attribution */}
        <motion.p
          variants={{ hidden:{ opacity:0, y: reduce?0:12 }, show:{ opacity:1, y:0, transition:{ duration:0.9, ease:EASE }}}}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 300,
            fontSize: "9px",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "var(--warm-grey)",
            opacity: 0.5,
          }}
        >
          {tr.manifesto.epigraphAttr} &nbsp;·&nbsp; {tr.manifesto.tag}
        </motion.p>
      </motion.div>
    </section>
  );
}
