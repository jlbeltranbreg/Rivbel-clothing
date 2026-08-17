"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const E = [0.22, 0.1, 0.25, 1] as const;

type FormState = "idle" | "submitting" | "done";

export default function ContactPageClient() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [formState, setFormState] = useState<FormState>("idle");
  const [type, setType] = useState<"waitlist" | "stockist">("waitlist");

  const c = {
    eyebrow: lang === "es" ? "Entrega 01 · MMXXVI" : "Drop 01 · MMXXVI",
    heading: lang === "es" ? ["Apúntate", "a la lista."] : ["Join", "the list."],
    sub: lang === "es"
      ? "Sé el primero en saber cuándo está disponible la Entrega 01. Sin spam. Solo lo que merece tu atención."
      : "Be the first to know when Drop 01 ships. No spam. Only what merits your attention.",
    waitlistTab: lang === "es" ? "Lista de espera" : "Waitlist",
    stockistTab:  lang === "es" ? "Distribuidores" : "Stockist inquiry",
    namePh:  lang === "es" ? "Tu nombre" : "Your name",
    emailPh: lang === "es" ? "tu@correo.com" : "your@email.com",
    msgPh:   lang === "es" ? "Cuéntanos sobre tu negocio o pregunta…" : "Tell us about your business or inquiry…",
    cta:     lang === "es" ? "Enviar" : "Submit",
    done:    lang === "es" ? "Recibido. Te avisaremos." : "Received. We'll be in touch.",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("done"), 800);
  };

  return (
    <div style={{ background: "var(--beige)", minHeight: "100vh", padding: "clamp(5rem,10vw,8rem) 0" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .rv-ct-input { background:transparent; border:none; border-bottom:1px solid rgba(30,44,80,0.18); outline:none; font-family:var(--font-body); font-weight:300; font-size:14px; color:var(--navy); padding:12px 0; width:100%; transition:border-color 0.22s; }
        .rv-ct-input:focus { border-bottom-color:var(--burgundy); }
        .rv-ct-input::placeholder { color:rgba(30,44,80,0.28); }
        .rv-ct-textarea { resize:vertical; min-height:120px; }
        .rv-ct-tab { font-family:var(--font-body); font-size:9px; letter-spacing:0.16em; text-transform:uppercase; background:none; border:none; cursor:pointer; padding:10px 16px; transition:color 0.2s; touch-action:manipulation; }
        .rv-ct-tab:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; border-radius:1px; }
        .rv-ct-submit { font-family:var(--font-body); font-weight:600; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#fff; background:var(--burgundy); border:none; padding:16px 36px; cursor:pointer; transition:background 0.22s; touch-action:manipulation; }
        .rv-ct-submit:hover { background:var(--navy-deep); }
        .rv-ct-submit:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; }
        .rv-ct-submit:disabled { opacity:0.55; cursor:not-allowed; }
      `}} />

      <div className="max-w-xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div initial="hidden" animate="show" variants={{ hidden:{}, show:{ transition:{ staggerChildren: reduce?0:0.12 }}}}>
          <motion.p variants={{ hidden:{ opacity:0 }, show:{ opacity:1, transition:{ duration:0.7,ease:E }}}}
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "1.25rem" }}>
            {c.eyebrow}
          </motion.p>
          <motion.h1 variants={{ hidden:{ opacity:0, y: reduce?0:20 }, show:{ opacity:1, y:0, transition:{ duration:1.0,ease:E }}}}
            style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(2.8rem,7vw,5.5rem)", color: "var(--navy)", lineHeight: 0.95, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
            {c.heading[0]}<br />{c.heading[1]}
          </motion.h1>
          <motion.div variants={{ hidden:{ opacity:0, scaleX: reduce?1:0 }, show:{ opacity:0.65, scaleX:1, transition:{ duration:0.55,ease:E }}}}
            style={{ width: "40px", height: "1px", background: "var(--burgundy)", transformOrigin: "left", marginBottom: "1.75rem" }} aria-hidden="true" />
          <motion.p variants={{ hidden:{ opacity:0, y: reduce?0:10 }, show:{ opacity:1, y:0, transition:{ duration:0.85,ease:E }}}}
            style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(0.9rem,1.5vw,1rem)", lineHeight: 1.8, color: "var(--ink-60)", marginBottom: "2.5rem", maxWidth: "400px" }}>
            {c.sub}
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(30,44,80,0.12)", marginBottom: "2rem" }}>
          {(["waitlist", "stockist"] as const).map(t => (
            <button key={t} onClick={() => setType(t)} className="rv-ct-tab"
              style={{ color: type === t ? "var(--navy)" : "rgba(30,44,80,0.35)", fontWeight: type === t ? 600 : 300, borderBottom: type === t ? "2px solid var(--burgundy)" : "2px solid transparent", marginBottom: "-1px" }}>
              {t === "waitlist" ? c.waitlistTab : c.stockistTab}
            </button>
          ))}
        </div>

        {/* Form */}
        {formState === "done" ? (
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: E }}
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.4rem,3vw,2rem)", color: "var(--burgundy)", lineHeight: 1.3 }}>
            {c.done}
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label htmlFor="ct-name" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-60)", marginBottom: "6px", opacity: 0.6 }}>
                {lang === "es" ? "Nombre" : "Name"}
              </label>
              <input id="ct-name" name="name" type="text" required autoComplete="name" spellCheck={false}
                placeholder={c.namePh} className="rv-ct-input" aria-required="true" />
            </div>
            <div>
              <label htmlFor="ct-email" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-60)", marginBottom: "6px", opacity: 0.6 }}>
                {lang === "es" ? "Correo" : "Email"}
              </label>
              <input id="ct-email" name="email" type="email" required autoComplete="email" spellCheck={false}
                placeholder={c.emailPh} className="rv-ct-input" aria-required="true" />
            </div>
            {type === "stockist" && (
              <div>
                <label htmlFor="ct-msg" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-60)", marginBottom: "6px", opacity: 0.6 }}>
                  {lang === "es" ? "Mensaje" : "Message"}
                </label>
                <textarea id="ct-msg" name="message" autoComplete="off" spellCheck
                  placeholder={c.msgPh} className="rv-ct-input rv-ct-textarea" />
              </div>
            )}
            <div>
              <button type="submit" className="rv-ct-submit" disabled={formState === "submitting"}>
                {formState === "submitting" ? (lang === "es" ? "Enviando…" : "Submitting…") : c.cta}
              </button>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "8px", letterSpacing: "0.12em", color: "rgba(30,44,80,0.3)" }}>
              {lang === "es" ? "Sin spam. Cancelación en cualquier momento." : "No spam. Unsubscribe at any time."}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
