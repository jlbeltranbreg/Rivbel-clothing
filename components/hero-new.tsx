"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const E = [0.22, 0.1, 0.25, 1] as const;

export default function Hero() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section style={{ position:"relative", height:"100vh", minHeight:"640px", overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <style dangerouslySetInnerHTML={{ __html:`
        .rv-hero-cta { font-family:var(--font-body); font-weight:500; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:rgba(248,246,241,0.85); border:1px solid rgba(248,246,241,0.35); padding:14px 36px; text-decoration:none; transition:background 0.25s, border-color 0.25s, color 0.25s; touch-action:manipulation; }
        .rv-hero-cta:hover { background:var(--burgundy); border-color:var(--burgundy); color:#fff; }
        .rv-hero-cta:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; }
      `}} />

      {/* Background */}
      <img src="/hero-cathedral.png" alt="" aria-hidden="true" fetchPriority="high" width={1600} height={900}
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 25%", filter:"brightness(0.38) saturate(0.55)" }} />
      <div aria-hidden="true" style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(18,25,47,0.2) 0%, rgba(18,25,47,0.08) 45%, rgba(18,25,47,0.65) 100%)" }} />

      {/* Content */}
      <motion.div
        style={{ position:"relative", zIndex:1, textAlign:"center", padding:"0 1.5rem", display:"flex", flexDirection:"column", alignItems:"center" }}
        initial="hidden" animate="show"
        variants={{ hidden:{}, show:{ transition:{ staggerChildren:reduce?0:0.18, delayChildren:reduce?0:0.4 }}}}
      >
        <motion.p variants={{ hidden:{ opacity:0 }, show:{ opacity:1, transition:{ duration:0.8,ease:E }}}}
          style={{ fontFamily:"var(--font-body)", fontWeight:400, fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(248,246,241,0.45)", marginBottom:"2.5rem" }}>
          {lang==="es" ? "ENTREGA 01 · ESPAÑA · MÉXICO" : "DROP 01 · ESPAÑA · MÉXICO"}
        </motion.p>

        <motion.h1 variants={{ hidden:{ opacity:0, y:reduce?0:32 }, show:{ opacity:1, y:0, transition:{ duration:1.1,ease:E }}}}
          style={{ fontFamily:"var(--font-display)", fontWeight:900, fontStyle:"italic", fontSize:"clamp(4.5rem,14vw,11rem)", lineHeight:0.88, letterSpacing:"-0.03em", color:"rgba(248,246,241,0.96)", margin:0 }}>
          {lang==="es" ? <>Tradición<br/>Vestida.</> : <>Tradition<br/>Worn.</>}
        </motion.h1>

        <motion.div variants={{ hidden:{ opacity:0, scaleX:reduce?1:0 }, show:{ opacity:1, scaleX:1, transition:{ duration:0.65,ease:E,delay:0.1 }}}}
          aria-hidden="true" style={{ width:"40px", height:"1px", background:"var(--burgundy)", margin:"2.75rem auto", transformOrigin:"center" }} />

        <motion.a href="/collection" className="rv-hero-cta"
          variants={{ hidden:{ opacity:0, y:reduce?0:12 }, show:{ opacity:1, y:0, transition:{ duration:0.8,ease:E }}}}>
          {lang==="es" ? "Explorar la Colección" : "Explore the Collection"}
        </motion.a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div aria-hidden="true"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:reduce?0:2, duration:0.8 }}
        style={{ position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
        <p style={{ fontFamily:"var(--font-body)", fontWeight:300, fontSize:"8px", letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(248,246,241,0.28)", margin:0 }}>Scroll</p>
        <motion.div animate={reduce?{}:{ scaleY:[1,0.3,1], opacity:[0.4,0.9,0.4] }} transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut" }}
          style={{ width:"1px", height:"36px", background:"linear-gradient(to bottom, rgba(155,35,43,0.7), transparent)", transformOrigin:"top" }} />
      </motion.div>
    </section>
  );
}
