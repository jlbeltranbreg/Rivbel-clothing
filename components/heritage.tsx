"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/language";

const EASE = [0.22, 0.1, 0.25, 1] as const;

export default function Heritage() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section ref={sectionRef} style={{ background:"var(--navy-dark)", position:"relative", overflow:"hidden" }} className="w-full">
      <div
        style={{ display:"grid", minHeight:"clamp(580px,85vh,900px)" }}
        className="lg:grid-cols-[55fr_45fr] grid-cols-1"
      >
        {/* LEFT — full bleed bullfighting image with parallax */}
        <div style={{ position:"relative", overflow:"hidden", minHeight:"420px" }}>
          <motion.div style={{ position:"absolute", inset:"-10% 0", height:"120%", y: imgY }}>
            <img
              src="/lifestyle-bullfighting.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={900}
              height={1100}
              style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", filter:"brightness(0.88) saturate(0.9)", display:"block" }}
            />
          </motion.div>
          {/* Subtle right-edge fade into navy */}
          <div aria-hidden="true" className="hidden lg:block" style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 60%, var(--navy-dark) 100%)" }}/>
          {/* Bottom fade for mobile */}
          <div aria-hidden="true" className="lg:hidden" style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 60%, var(--navy-dark) 100%)" }}/>
        </div>

        {/* RIGHT — editorial text */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once:true, amount:0.25 }}
          variants={{ hidden:{}, show:{ transition:{ staggerChildren: reduce?0:0.13 }}}}
          style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"clamp(3.5rem,7vw,6rem) clamp(2.5rem,5vw,5rem)" }}
        >
          <motion.p
            variants={{ hidden:{opacity:0,y:reduce?0:16}, show:{opacity:1,y:0,transition:{duration:0.8,ease:EASE}} }}
            style={{ fontFamily:"var(--font-montserrat)", fontWeight:300, fontSize:"8px", letterSpacing:"0.45em", textTransform:"uppercase", color:"var(--gold)", opacity:0.9, marginBottom:"1.5rem" }}
          >
            {lang==="es" ? "La herencia" : "The heritage"}
          </motion.p>

          <motion.h2
            variants={{ hidden:{opacity:0,y:reduce?0:24}, show:{opacity:1,y:0,transition:{duration:1.0,ease:EASE}} }}
            style={{ fontFamily:"var(--font-playfair)", fontWeight:400, fontStyle:"italic", fontSize:"clamp(2.8rem,5.5vw,5rem)", color:"var(--off-white)", lineHeight:1.02, letterSpacing:"-0.02em", marginBottom:"2rem" }}
          >
            {lang==="es" ? <>Donde nace<br/>la audacia.</> : <>Where<br/>audacity<br/>is born.</>}
          </motion.h2>

          <motion.div
            variants={{ hidden:{opacity:0,scaleX:reduce?1:0}, show:{opacity:0.7,scaleX:1,transition:{duration:0.6,ease:EASE}} }}
            aria-hidden="true"
            style={{ width:"40px", height:"1px", background:"var(--gold)", transformOrigin:"left", marginBottom:"2rem" }}
          />

          <motion.p
            variants={{ hidden:{opacity:0,y:reduce?0:12}, show:{opacity:1,y:0,transition:{duration:0.8,ease:EASE}} }}
            style={{ fontFamily:"var(--font-lato)", fontWeight:300, fontSize:"clamp(0.82rem,1.4vw,0.94rem)", lineHeight:1.85, color:"rgba(245,237,227,0.5)", maxWidth:"380px", marginBottom:"2.5rem" }}
          >
            {lang==="es"
              ? "La plaza de toros no es sólo tradición — es disciplina, artesanía, elegancia bajo presión. Los mismos principios que guían cada prenda RIVBEL: confeccionada con rigor, vestida sin esfuerzo."
              : "The bullring is not just tradition — it is discipline, craft, elegance under pressure. The same principles that guide every RIVBEL garment: made with rigour, worn without effort."}
          </motion.p>

          <motion.div
            variants={{ hidden:{opacity:0}, show:{opacity:1,transition:{duration:0.7,ease:EASE}} }}
            style={{ borderTop:"1px solid rgba(184,150,62,0.2)", paddingTop:"1.75rem" }}
          >
            <p style={{ fontFamily:"var(--font-montserrat)", fontWeight:300, fontSize:"8px", letterSpacing:"0.32em", textTransform:"uppercase", color:"rgba(245,237,227,0.3)", marginBottom:"0.4rem" }}>
              España · México · MMXXVI
            </p>
            <p style={{ fontFamily:"var(--font-cormorant)", fontStyle:"italic", fontSize:"clamp(1rem,1.8vw,1.2rem)", color:"rgba(245,237,227,0.55)", lineHeight:1.5 }}>
              {lang==="es"
                ? `"La disciplina del ruedo, el corte del sastre."`
                : `"The discipline of the ring, the cut of the tailor."`}
            </p>
          </motion.div>

          {/* Discover CTA */}
          <motion.div
            variants={{ hidden:{opacity:0,y:reduce?0:10}, show:{opacity:1,y:0,transition:{duration:0.8,ease:EASE}} }}
            style={{ marginTop:"2.5rem" }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              .rivbel-heritage-cta { display: inline-block; text-decoration: none; touch-action: manipulation; }
              .rivbel-heritage-cta:hover { border-color: var(--gold) !important; color: var(--gold) !important; }
              .rivbel-heritage-cta:focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; border-radius: 2px; }
            `}} />
            <a
              href="/#collection"
              className="rivbel-heritage-cta"
              style={{ fontFamily:"var(--font-montserrat)", fontWeight:600, fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(247,243,237,0.45)", border:"1px solid rgba(247,243,237,0.2)", padding:"11px 24px", borderRadius:"2px", transition:"border-color 0.22s ease, color 0.22s ease" }}
            >
              {lang==="es" ? "Ver la Colección" : "Discover the Collection"}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
