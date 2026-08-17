"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const E = [0.25, 0.1, 0.25, 1] as const;

export default function StoryPanel() {
  const { tr, lang } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="story" style={{ background:"var(--beige-warm)", scrollMarginTop:"60px", overflow:"hidden" }}>
      <div style={{ display:"grid", minHeight:"clamp(520px,80vh,860px)" }} className="lg:grid-cols-2">

        {/* Left: image */}
        <div style={{ position:"relative", overflow:"hidden", minHeight:"380px" }}>
          <motion.img src="/lifestyle-bullfighting.png" alt="" aria-hidden="true" loading="lazy" width={900} height={1100}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", filter:"saturate(0.85) brightness(0.92)" }}
            initial={{ scale:reduce?1:1.04 }} whileInView={{ scale:1 }} viewport={{ once:true }} transition={{ duration:1.4, ease:[0.22,0.1,0.25,1] }} />
        </div>

        {/* Right: text */}
        <motion.div
          style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"clamp(3.5rem,7vw,6rem) clamp(2.5rem,6vw,5rem)", borderLeft:"1px solid rgba(30,44,80,0.1)" }}
          initial="hidden" whileInView="show" viewport={{ once:true, amount:0.2 }}
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:reduce?0:0.14 }}}}>

          <motion.p variants={{ hidden:{ opacity:0, y:reduce?0:14 }, show:{ opacity:1, y:0, transition:{ duration:0.8,ease:E }}}}
            style={{ fontFamily:"var(--font-body)", fontWeight:500, fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--burgundy)", marginBottom:"1.5rem" }}>
            {lang==="es" ? "Nuestra Historia · EST. MMXXVI" : "Our Story · EST. MMXXVI"}
          </motion.p>

          <motion.h2 variants={{ hidden:{ opacity:0, y:reduce?0:24 }, show:{ opacity:1, y:0, transition:{ duration:1.0,ease:E }}}}
            style={{ fontFamily:"var(--font-display)", fontWeight:700, fontStyle:"italic", fontSize:"clamp(2.4rem,4.5vw,4rem)", color:"var(--navy)", lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:"1.75rem" }}>
            {lang==="es" ? <>Nacida de<br/>España.</> : <>Born from<br/>Spain.</>}
          </motion.h2>

          <motion.div variants={{ hidden:{ opacity:0, scaleX:reduce?1:0 }, show:{ opacity:0.6, scaleX:1, transition:{ duration:0.55,ease:E }}}}
            style={{ width:"36px", height:"1px", background:"var(--burgundy)", transformOrigin:"left", marginBottom:"1.75rem" }} aria-hidden="true" />

          <motion.blockquote variants={{ hidden:{ opacity:0, y:reduce?0:12 }, show:{ opacity:1, y:0, transition:{ duration:0.9,ease:E }}}}
            style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontWeight:400, fontSize:"clamp(1.05rem,2vw,1.3rem)", color:"var(--navy)", lineHeight:1.65, margin:"0 0 1.75rem", maxWidth:"400px", opacity:0.85 }}>
            {lang==="es"
              ? `"La tradición no es el pasado. Es saber qué perdura."`
              : `"Tradition isn't about the past. It's about knowing what endures."`}
          </motion.blockquote>

          <motion.p variants={{ hidden:{ opacity:0, y:reduce?0:10 }, show:{ opacity:1, y:0, transition:{ duration:0.9,ease:E }}}}
            style={{ fontFamily:"var(--font-body)", fontWeight:300, fontSize:"clamp(0.85rem,1.4vw,0.95rem)", lineHeight:1.85, color:"var(--ink-60)", maxWidth:"380px" }}>
            {tr.story.body2}
          </motion.p>

          {/* Provenance */}
          <motion.div variants={{ hidden:{ opacity:0 }, show:{ opacity:1, transition:{ duration:0.7,ease:E }}}}
            style={{ display:"flex", gap:"2.5rem", flexWrap:"wrap", borderTop:"1px solid rgba(30,44,80,0.15)", paddingTop:"1.5rem", marginTop:"2rem" }}>
            {[
              [lang==="es"?"Tejido":"Fabric", lang==="es"?"Telares europeos certificados":"European certified mills"],
              [lang==="es"?"Producción":"Production", lang==="es"?"Tiradas limitadas":"Limited quantities"],
              [lang==="es"?"Fundada":"Founded", "España · México"],
            ].map(([lbl, val]) => (
              <div key={lbl}>
                <p style={{ fontFamily:"var(--font-body)", fontWeight:600, fontSize:"8px", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--burgundy)", marginBottom:"3px", opacity:0.85 }}>{lbl}</p>
                <p style={{ fontFamily:"var(--font-body)", fontWeight:300, fontSize:"12px", color:"var(--ink-60)" }}>{val}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
