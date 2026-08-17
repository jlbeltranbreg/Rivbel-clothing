"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

export default function Opener() {
  const { tr } = useLanguage();
  const reduce = useReducedMotion();
  const EASE = [0.22, 0.1, 0.25, 1] as const;

  return (
    <section
      style={{ position:"relative", height:"100vh", minHeight:"620px", overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .rivbel-opener-cta {
          font-family: var(--font-montserrat); font-weight: 600; font-size: 9px;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--off-white); text-decoration: none;
          border: 1px solid rgba(247,243,237,0.45);
          padding: 14px 32px; border-radius: 2px;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
          touch-action: manipulation;
        }
        .rivbel-opener-cta:hover { background: var(--burgundy); border-color: var(--burgundy); }
        .rivbel-opener-cta:focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; border-radius: 2px; }
      `}} />

      {/* Background: baroque cathedral */}
      <img
        src="/hero-cathedral.png"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        width={1600}
        height={900}
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 20%", filter:"brightness(0.42) saturate(0.65)" }}
      />
      {/* Deep navy gradient overlay */}
      <div aria-hidden="true" style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(8,16,35,0.25) 0%, rgba(8,16,35,0.1) 40%, rgba(8,16,35,0.6) 100%)" }}/>
      {/* Warm sepia tint */}
      <div aria-hidden="true" style={{ position:"absolute", inset:0, background:"rgba(180,140,80,0.05)", pointerEvents:"none" }}/>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden:{}, show:{ transition:{ staggerChildren: reduce ? 0 : 0.18, delayChildren: reduce ? 0 : 0.3 }}}}
        style={{ position:"relative", zIndex:1, textAlign:"center", padding:"0 1.5rem", display:"flex", flexDirection:"column", alignItems:"center" }}
      >
        {/* Brand label */}
        <motion.p
          variants={{ hidden:{opacity:0,y:reduce?0:12}, show:{opacity:1,y:0,transition:{duration:0.8,ease:EASE}} }}
          translate="no"
          style={{ fontFamily:"var(--font-montserrat)", fontWeight:300, fontSize:"9px", letterSpacing:"0.55em", textTransform:"uppercase", color:"rgba(245,237,227,0.45)", marginBottom:"2.5rem" }}
        >
          RIVBEL · SS/XXVI
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={{ hidden:{opacity:0,y:reduce?0:24}, show:{opacity:1,y:0,transition:{duration:1.1,ease:EASE}} }}
          style={{ fontFamily:"var(--font-playfair)", fontWeight:400, fontStyle:"italic", fontSize:"clamp(4.5rem,13vw,10.5rem)", lineHeight:0.9, letterSpacing:"-0.025em", color:"var(--off-white)", margin:0, whiteSpace:"nowrap" }}
        >
          {tr.opener.slogan[0]}
          <br/>
          {tr.opener.slogan[1]}
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          variants={{ hidden:{opacity:0,scaleX:reduce?1:0}, show:{opacity:1,scaleX:1,transition:{duration:0.7,ease:EASE,delay:0.1}} }}
          aria-hidden="true"
          style={{ width:"48px", height:"1px", background:"var(--gold)", margin:"2.5rem auto", transformOrigin:"center", opacity:0.8 }}
        />

        {/* Sub label */}
        <motion.p
          variants={{ hidden:{opacity:0}, show:{opacity:1,transition:{duration:0.9,ease:EASE}} }}
          style={{ fontFamily:"var(--font-montserrat)", fontWeight:300, fontSize:"9px", letterSpacing:"0.42em", textTransform:"uppercase", color:"rgba(245,237,227,0.38)", marginBottom:"2.75rem", whiteSpace:"nowrap" }}
        >
          {tr.opener.sub}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={{ hidden:{opacity:0,y:reduce?0:12}, show:{opacity:1,y:0,transition:{duration:0.8,ease:EASE}} }}
        >
          <a href="/#collection" className="rivbel-opener-cta">
            {tr.opener.cta}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay: reduce?0:1.8, duration:0.8 }}
        aria-hidden="true"
        style={{ position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}
      >
        <p style={{ fontFamily:"var(--font-montserrat)", fontWeight:300, fontSize:"7px", letterSpacing:"0.35em", textTransform:"uppercase", color:"rgba(245,237,227,0.28)", margin:0 }}>Scroll</p>
        <motion.div
          animate={reduce?{}:{ scaleY:[1,0.3,1], opacity:[0.45,1,0.45] }}
          transition={{ duration:2.4, repeat:Infinity, ease:"easeInOut" }}
          style={{ width:"1px", height:"44px", background:"linear-gradient(to bottom, rgba(184,150,62,0.55), transparent)", transformOrigin:"top" }}
        />
      </motion.div>

      {/* Corner glyphs — editorial decoration */}
      <div aria-hidden="true" style={{ position:"absolute", top:"24px", left:"28px", width:"24px", height:"24px", borderTop:"1px solid rgba(184,150,62,0.3)", borderLeft:"1px solid rgba(184,150,62,0.3)" }}/>
      <div aria-hidden="true" style={{ position:"absolute", top:"24px", right:"28px", width:"24px", height:"24px", borderTop:"1px solid rgba(184,150,62,0.3)", borderRight:"1px solid rgba(184,150,62,0.3)" }}/>
      <div aria-hidden="true" style={{ position:"absolute", bottom:"24px", left:"28px", width:"24px", height:"24px", borderBottom:"1px solid rgba(184,150,62,0.3)", borderLeft:"1px solid rgba(184,150,62,0.3)" }}/>
      <div aria-hidden="true" style={{ position:"absolute", bottom:"24px", right:"28px", width:"24px", height:"24px", borderBottom:"1px solid rgba(184,150,62,0.3)", borderRight:"1px solid rgba(184,150,62,0.3)" }}/>
    </section>
  );
}
