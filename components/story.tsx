"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function Story() {
  const { tr } = useLanguage();
  const reduce = useReducedMotion();

  const provenance = [
    [tr.story.fabricLabel,     tr.story.fabricVal],
    [tr.story.productionLabel, tr.story.productionVal],
    [tr.story.foundedLabel,    tr.story.foundedVal],
  ] as const;

  return (
    <section
      id="story"
      style={{ background: "var(--parchment)", scrollMarginTop: "52px" }}
      className="w-full overflow-hidden"
    >
      {/* Chapter header */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 2.5rem" }}>
        <div style={{ paddingTop:"3.5rem" }}>
          <div style={{ height:"1px", background:"var(--burgundy)", opacity:0.4 }} aria-hidden="true" />
          <p style={{
            fontFamily:"var(--font-montserrat)", fontWeight:700, fontSize:"8px",
            letterSpacing:"0.42em", textTransform:"uppercase",
            color:"var(--burgundy)", textAlign:"center",
            padding:"10px 0", opacity:0.65,
          }}>
            {tr.story.chapter}
          </p>
          <div style={{ height:"1px", background:"var(--burgundy)", opacity:0.15 }} aria-hidden="true" />
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto" style={{ padding:"3.5rem 2.5rem 5rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[30%_2px_1fr] gap-0">

          {/* Left — pull quote */}
          <motion.div
            className="lg:pr-12 xl:pr-16 flex flex-col justify-center"
            style={{ paddingBottom:"2.5rem" }}
            initial={{ opacity:0, x: reduce?0:-32 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-80px" }}
            transition={{ duration:1.0, ease:EASE }}
          >
            <p style={{
              fontFamily:"var(--font-montserrat)", fontWeight:300, fontSize:"8px",
              letterSpacing:"0.35em", textTransform:"uppercase",
              color:"var(--burgundy)", marginBottom:"1.75rem", opacity:0.75,
            }}>
              {tr.story.label}
            </p>

            <h2 style={{
              fontFamily:"var(--font-im-fell)", fontStyle:"italic",
              fontSize:"clamp(1.8rem,4vw,3.2rem)", color:"var(--navy-dark)",
              lineHeight:1.25, marginBottom:"1.75rem", fontWeight:400,
            }}>
              {tr.story.heading[0]}<br />{tr.story.heading[1]}
            </h2>

            <div style={{ width:"36px", height:"1px", background:"var(--burgundy)", marginBottom:"1.75rem", opacity:0.45 }} aria-hidden="true" />

            <blockquote style={{
              fontFamily:"var(--font-im-fell)", fontStyle:"italic",
              fontSize:"clamp(1.05rem,2vw,1.35rem)", color:"var(--navy-mid)",
              lineHeight:1.6, margin:0, padding:0, fontWeight:400,
            }}>
              {tr.story.pull}
            </blockquote>
          </motion.div>

          {/* Vertical rule */}
          <div
            className="hidden lg:block"
            style={{ background:"var(--burgundy)", width:"1px", opacity:0.18, margin:"0 3rem" }}
            aria-hidden="true"
          />

          {/* Right — editorial body */}
          <motion.div
            className="lg:pl-4"
            initial={{ opacity:0, x: reduce?0:32 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-80px" }}
            transition={{ duration:1.0, ease:EASE, delay: reduce?0:0.15 }}
          >
            <p
              className="drop-cap"
              style={{
                fontFamily:"var(--font-lato)", fontWeight:400, fontSize:"15.5px",
                lineHeight:1.95, color:"var(--ink)", marginBottom:"1.75rem", maxWidth:"520px",
              }}
            >
              {tr.story.body1}
            </p>

            <p style={{
              fontFamily:"var(--font-lato)", fontWeight:400, fontSize:"15.5px",
              lineHeight:1.95, color:"var(--ink)", marginBottom:"2.5rem", maxWidth:"520px",
            }}>
              {tr.story.body2}
            </p>

            {/* Provenance footer */}
            <div style={{
              borderTop:"1px solid rgba(124,32,53,0.3)",
              paddingTop:"1.5rem",
              display:"flex", flexWrap:"wrap", gap:"2.5rem",
            }}>
              {provenance.map(([label, value]) => (
                <div key={label}>
                  <p style={{
                    fontFamily:"var(--font-montserrat)", fontWeight:700, fontSize:"8px",
                    letterSpacing:"0.3em", textTransform:"uppercase",
                    color:"var(--burgundy)", marginBottom:"4px", opacity:0.75,
                  }}>
                    {label}
                  </p>
                  <p style={{
                    fontFamily:"var(--font-lato)", fontWeight:300, fontSize:"12px",
                    color:"var(--warm-grey)", letterSpacing:"0.04em",
                  }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
