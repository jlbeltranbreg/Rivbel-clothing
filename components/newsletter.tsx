"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const E = [0.25, 0.1, 0.25, 1] as const;

export default function Newsletter() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const c = {
    eyebrow: lang==="es" ? "La Lista" : "The List",
    head:    lang==="es" ? ["Antes que","nadie."] : ["First to","know."],
    sub:     lang==="es" ? "Lanzamientos limitados y notas de temporada. Sólo lo que merece tu atención." : "Limited drops and seasonal dispatches. Only what merits your attention.",
    ph:      lang==="es" ? "tu@correo.com" : "your@email.com",
    cta:     lang==="es" ? "Apuntarme" : "Join",
    thanks:  lang==="es" ? "Bienvenido a la lista." : "Welcome to the list.",
    fine:    lang==="es" ? "Sin spam. Cancelación en cualquier momento." : "No spam. Unsubscribe at any time.",
  };

  return (
    <section style={{ background:"var(--navy-deep)", padding:"clamp(5rem,10vw,8rem) 0", borderTop:"1px solid rgba(155,35,43,0.25)" }}>
      <style dangerouslySetInnerHTML={{ __html:`
        .rv-nl-input { background:transparent; border:none; outline:none; font-family:var(--font-body); font-weight:300; font-size:13px; letter-spacing:0.04em; color:rgba(248,246,241,0.9); padding:14px 0; width:100%; }
        .rv-nl-input::placeholder { color:rgba(248,246,241,0.25); }
        .rv-nl-wrap { border-bottom:1px solid rgba(248,246,241,0.18); display:flex; transition:border-color 0.25s; }
        .rv-nl-wrap:focus-within { border-bottom-color:var(--burgundy); }
        .rv-nl-btn { font-family:var(--font-body); font-weight:600; font-size:9px; letter-spacing:0.14em; text-transform:uppercase; color:#fff; background:var(--burgundy); border:none; padding:0 20px; cursor:pointer; touch-action:manipulation; transition:background 0.2s; white-space:nowrap; }
        .rv-nl-btn:hover { background:#b5282f; }
        .rv-nl-btn:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; }
      `}} />

      <motion.div
        style={{ maxWidth:"520px", margin:"0 auto", textAlign:"center", padding:"0 2rem" }}
        initial="hidden" whileInView="show" viewport={{ once:true, amount:0.3 }}
        variants={{ hidden:{}, show:{ transition:{ staggerChildren:reduce?0:0.13, delayChildren:reduce?0:0.1 }}}}>

        <motion.p variants={{ hidden:{ opacity:0 }, show:{ opacity:1, transition:{ duration:0.7,ease:E }}}}
          style={{ fontFamily:"var(--font-body)", fontWeight:500, fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--burgundy)", marginBottom:"1.5rem", opacity:0.9 }}>
          {c.eyebrow}
        </motion.p>

        <motion.h2 variants={{ hidden:{ opacity:0, y:reduce?0:22 }, show:{ opacity:1, y:0, transition:{ duration:1.0,ease:E }}}}
          style={{ fontFamily:"var(--font-display)", fontWeight:900, fontStyle:"italic", fontSize:"clamp(2.8rem,8vw,5.5rem)", color:"rgba(248,246,241,0.95)", margin:"0 0 0.5rem", lineHeight:0.95, letterSpacing:"-0.025em" }}>
          {c.head[0]}<br/>{c.head[1]}
        </motion.h2>

        <motion.div variants={{ hidden:{ opacity:0, scaleX:reduce?1:0 }, show:{ opacity:0.5, scaleX:1, transition:{ duration:0.55,ease:E }}}}
          style={{ width:"36px", height:"1px", background:"var(--burgundy)", margin:"1.75rem auto", transformOrigin:"center" }} aria-hidden="true" />

        <motion.p variants={{ hidden:{ opacity:0, y:reduce?0:12 }, show:{ opacity:1, y:0, transition:{ duration:0.9,ease:E }}}}
          style={{ fontFamily:"var(--font-body)", fontWeight:300, fontSize:"clamp(0.82rem,1.4vw,0.94rem)", lineHeight:1.8, color:"rgba(248,246,241,0.4)", marginBottom:"2.75rem" }}>
          {c.sub}
        </motion.p>

        <motion.div variants={{ hidden:{ opacity:0, y:reduce?0:10 }, show:{ opacity:1, y:0, transition:{ duration:0.8,ease:E }}}}>
          {!done ? (
            <>
              <form onSubmit={e => { e.preventDefault(); if(email.trim()) setDone(true); }} style={{ maxWidth:"380px", margin:"0 auto" }}>
                <div className="rv-nl-wrap">
                  <input type="email" name="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder={c.ph} aria-label={c.ph} spellCheck={false} className="rv-nl-input" />
                  <button type="submit" className="rv-nl-btn">{c.cta}</button>
                </div>
              </form>
              <p style={{ fontFamily:"var(--font-body)", fontWeight:300, fontSize:"8px", letterSpacing:"0.1em", color:"rgba(248,246,241,0.18)", marginTop:"0.85rem" }}>{c.fine}</p>
            </>
          ) : (
            <motion.p initial={{ opacity:0, y:reduce?0:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6,ease:E }}
              style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontWeight:400, fontSize:"clamp(1.2rem,3vw,1.8rem)", color:"rgba(155,35,43,0.9)", margin:0 }}>
              {c.thanks}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
