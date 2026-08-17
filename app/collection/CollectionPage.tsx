"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";
import { PRODUCTS } from "@/lib/products";
import Link from "next/link";

const E = [0.22, 0.1, 0.25, 1] as const;
const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

type Filter = "all" | "polo" | "shirt";

export default function CollectionPage() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [hov, setHov] = useState<string | null>(null);

  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.colorGroup === filter);

  const filters: { key: Filter; labelEn: string; labelEs: string }[] = [
    { key: "all",   labelEn: "All",    labelEs: "Todo" },
    { key: "polo",  labelEn: "Polos",  labelEs: "Polos" },
    { key: "shirt", labelEn: "Shirts", labelEs: "Camisas" },
  ];

  return (
    <div style={{ background: "var(--beige)", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .rv-filter-btn { font-family:var(--font-body); font-size:9px; letter-spacing:0.18em; text-transform:uppercase; background:none; border:none; cursor:pointer; padding:8px 16px; transition:color 0.2s; touch-action:manipulation; }
        .rv-filter-btn:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; border-radius:1px; }
        .rv-col-card:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; }
        .rv-col-img { transition:transform 1s cubic-bezier(0.22,0.1,0.25,1); }
        .rv-col-card:hover .rv-col-img { transform:scale(1.04); }
      `}} />

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(30,44,80,0.08)", padding: "clamp(3rem,7vw,5rem) 0 2rem" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: E }}
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "1rem" }}>
            {lang === "es" ? "Entrega 01 · MMXXVI" : "Drop 01 · MMXXVI"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: E }}
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic", fontSize: "clamp(2.6rem,6vw,5rem)", color: "var(--navy)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
            {lang === "es" ? "La Colección" : "The Collection"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: E, delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "14px", lineHeight: 1.75, color: "var(--ink-60)", maxWidth: "480px", marginBottom: "2rem" }}>
            {lang === "es"
              ? "Cuatro prendas. Piqué de algodón, lino, y oxford de algodón — fabricadas en España."
              : "Four garments. Cotton piqué, linen, and Oxford cotton — made in Spain."}
          </motion.p>

          {/* Filters */}
          <div style={{ display: "flex", gap: "4px" }}>
            {filters.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} className="rv-filter-btn"
                style={{ color: filter === f.key ? "var(--navy)" : "var(--ink-60)", fontWeight: filter === f.key ? 600 : 300, borderBottom: filter === f.key ? "1px solid var(--burgundy)" : "1px solid transparent" }}>
                {lang === "es" ? f.labelEs : f.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(30,44,80,0.06)" }} className="lg:grid-cols-4">
          {filtered.map((p, i) => {
            const name = lang === "es" ? p.nameEs : p.nameEn;
            const type = lang === "es" ? p.typeEs : p.typeEn;
            const isHov = hov === p.slug;
            return (
              <motion.div key={p.slug}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: E, delay: reduce ? 0 : i * 0.06 }}>
                <Link href={`/products/${p.slug}`} className="rv-col-card"
                  style={{ display: "block", textDecoration: "none", background: "#fff", overflow: "hidden" }}
                  onMouseEnter={() => setHov(p.slug)} onMouseLeave={() => setHov(null)}
                  aria-label={`${name} — ${fmt.format(p.price)}`}>
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#F2EDE6" }}>
                    <img src={p.image} alt={name} width={600} height={800} className="rv-col-img"
                      loading={i < 2 ? "eager" : "lazy"}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                  </div>
                  <div style={{ padding: "1.25rem 1.25rem 1.5rem", borderTop: "1px solid rgba(30,44,80,0.07)" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage)", marginBottom: "0.4rem" }}>
                      {type}
                    </p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(1.05rem,1.8vw,1.35rem)", color: isHov ? "var(--burgundy)" : "var(--navy)", transition: "color 0.22s", lineHeight: 1.1, marginBottom: "0.5rem" }}>
                      {name}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "12px", color: "var(--ink-60)", fontVariantNumeric: "tabular-nums" }}>
                        {fmt.format(p.price)}
                      </p>
                      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--burgundy)", opacity: 0.7 }}>
                        {lang === "es" ? "Ver →" : "View →"}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ borderTop: "1px solid rgba(30,44,80,0.08)", padding: "2rem 0", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-60)", opacity: 0.45 }}>
          {lang === "es" ? "España · México · MMXXVI" : "España · México · MMXXVI"}
        </p>
      </div>
    </div>
  );
}
