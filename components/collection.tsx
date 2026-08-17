"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";
import { PRODUCTS } from "@/lib/products";

const E = [0.22, 0.1, 0.25, 1] as const;

const PHOTOS: Record<string, string> = {
  "ocaso-navy-polo":      "/product-polo-navy-gold.png",
  "olivo-polo":           "/product-polo-olive.png",
  "sevilla-blanc-oxford": "/product-shirt-white.png",
  "riviera-sage-linen":   "/product-shirt-sage-emblem.png",
};

const fmt = new Intl.NumberFormat("en-US", { style:"currency", currency:"USD" });

export default function Collection() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [hov, setHov] = useState<string | null>(null);

  return (
    <section id="collection" style={{ background:"var(--beige)", scrollMarginTop:"60px", padding:"clamp(5rem,10vw,8rem) 0" }}>
      <style dangerouslySetInnerHTML={{ __html:`
        .rv-prod-img { transition: transform 1s cubic-bezier(0.22,0.1,0.25,1); }
        .rv-prod-card:hover .rv-prod-img { transform: scale(1.04); }
        .rv-prod-card:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; }
      `}} />

      {/* Header */}
      <motion.div style={{ textAlign:"center", marginBottom:"clamp(3rem,6vw,5rem)", padding:"0 1.5rem" }}
        initial={{ opacity:0, y:reduce?0:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.9, ease:E }}>
        <p style={{ fontFamily:"var(--font-body)", fontWeight:500, fontSize:"10px", letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--burgundy)", marginBottom:"1.25rem" }}>
          {lang==="es" ? "Entrega 01" : "Drop 01"}
        </p>
        <h2 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontStyle:"italic", fontSize:"clamp(2.8rem,7vw,5.5rem)", color:"var(--navy)", lineHeight:1.0, letterSpacing:"-0.02em", margin:0 }}>
          {lang==="es" ? "La Colección" : "The Collection"}
        </h2>
        <div style={{ width:"40px", height:"1px", background:"var(--burgundy)", margin:"1.75rem auto 0", opacity:0.7 }} aria-hidden="true" />
      </motion.div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1px", background:"rgba(30,44,80,0.08)" }} className="lg:grid-cols-4">
          {PRODUCTS.map((p, i) => {
            const name = lang==="es" ? p.nameEs : p.nameEn;
            const type = lang==="es" ? p.typeEs : p.typeEn;
            const isHov = hov === p.slug;
            return (
              <motion.a key={p.slug} href={`/products/${p.slug}`} className="rv-prod-card"
                initial={{ opacity:0, y:reduce?0:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-40px" }}
                transition={{ duration:0.8, ease:E, delay:reduce?0:i*0.07 }}
                onMouseEnter={() => setHov(p.slug)} onMouseLeave={() => setHov(null)}
                style={{ display:"block", textDecoration:"none", background:"var(--warm-white)", overflow:"hidden" }}
                aria-label={`${name} — ${fmt.format(p.price)}`}>

                {/* Image */}
                <div style={{ aspectRatio:"3/4", overflow:"hidden", background:"#F5F3EE" }}>
                  <img src={PHOTOS[p.slug]} alt={name} width={600} height={800} className="rv-prod-img"
                    loading={i<2?"eager":"lazy"}
                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
                </div>

                {/* Info */}
                <div style={{ padding:"1.25rem 1.25rem 1.5rem", borderTop:"1px solid rgba(30,44,80,0.07)" }}>
                  <p style={{ fontFamily:"var(--font-body)", fontWeight:500, fontSize:"9px", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--sage)", marginBottom:"0.4rem" }}>
                    {type}
                  </p>
                  <p style={{ fontFamily:"var(--font-display)", fontWeight:400, fontStyle:"italic", fontSize:"clamp(1.05rem,1.8vw,1.35rem)", color: isHov ? "var(--burgundy)" : "var(--navy)", transition:"color 0.22s", lineHeight:1.1, marginBottom:"0.5rem" }}>
                    {name}
                  </p>
                  <p style={{ fontFamily:"var(--font-body)", fontWeight:300, fontSize:"12px", color:"var(--ink-60)", fontVariantNumeric:"tabular-nums" }}>
                    {fmt.format(p.price)}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Emblem strip */}
      <div style={{ marginTop:"1px", overflow:"hidden", maxHeight:"220px", background:"rgba(30,44,80,0.04)" }}>
        <img src="/product-emblem-detail.png" alt="" aria-hidden="true" loading="lazy" width={1200} height={400}
          style={{ width:"100%", objectFit:"cover", objectPosition:"center 40%", filter:"saturate(0.7) brightness(1.05)", display:"block" }} />
      </div>
    </section>
  );
}
