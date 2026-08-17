"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const E = [0.25, 0.1, 0.25, 1] as const;

export default function Founders() {
  const { tr, lang } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section style={{ background:"var(--navy-deep)", padding:"clamp(5rem,10vw,8rem) 0" }}>
      <div className="max-w-3xl mx-auto px-8 text-center" style={{ position:"relative" }}>

        <motion.p initial={{ opacity:0, y:reduce?0:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.8,ease:E }}
          style={{ fontFamily:"var(--font-body)", fontWeight:500, fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--burgundy)", marginBottom:"3.5rem", opacity:0.9 }}>
          {lang==="es" ? "Los Fundadores" : "The Founders"}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]" style={{ marginBottom:"3.5rem" }}>
          {[
            { name:"José Luis", country: lang==="es"?"España":"Spain" },
            null,
            { name:"Rodrigo", country: lang==="es"?"México":"Mexico" },
          ].map((item, i) => {
            if (!item) return <div key="rule" className="hidden md:block" style={{ background:"rgba(155,35,43,0.22)", width:"1px", alignSelf:"stretch" }} aria-hidden="true" />;
            return (
              <motion.div key={item.name} style={{ padding:"0 2rem 1rem" }}
                initial={{ opacity:0, x:reduce?0:(i===0?-24:24) }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, margin:"-60px" }}
                transition={{ duration:0.9,ease:E, delay:reduce?0:i*0.05 }}>
                <p style={{ fontFamily:"var(--font-display)", fontWeight:400, fontStyle:"italic", fontSize:"clamp(2rem,4vw,3rem)", color:"rgba(248,246,241,0.92)", lineHeight:1.05, marginBottom:"0.5rem" }}>
                  {item.name}
                </p>
                <p style={{ fontFamily:"var(--font-body)", fontWeight:300, fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(155,35,43,0.7)" }}>
                  {item.country}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div style={{ width:"40px", height:"1px", background:"var(--burgundy)", margin:"0 auto 3rem", opacity:0.45 }} aria-hidden="true" />

        <motion.p initial={{ opacity:0, y:reduce?0:18 }} whileInView={{ opacity:0.78, y:0 }} viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.95,ease:E }}
          style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontWeight:400, fontSize:"clamp(1rem,2vw,1.3rem)", color:"rgba(248,246,241,0.95)", lineHeight:1.75, maxWidth:"580px", margin:"0 auto" }}>
          {tr.founders.narrative}
        </motion.p>

        <div style={{ width:"32px", height:"1px", background:"var(--burgundy)", margin:"2.5rem auto", opacity:0.35 }} aria-hidden="true" />

        <p style={{ fontFamily:"var(--font-body)", fontWeight:300, fontSize:"8px", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(248,246,241,0.25)", marginTop:"2.5rem" }}>
          España · México · MMXXVI
        </p>
      </div>
    </section>
  );
}
