"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language";
import { PRODUCTS } from "@/lib/products";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function ProductSlider() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const dragStartX = useRef(0);

  const label    = lang === "es" ? "La Colección · SS/26" : "The Collection · SS/26";
  const heading  = lang === "es" ? "Prendas de Temporada" : "Season Pieces";
  const ctaLabel = lang === "es" ? "Ver prenda" : "Discover";
  const shopLabel = lang === "es" ? "Comprar en Shopify" : "Shop on Shopify";

  function prev() { setActive((a) => (a - 1 + PRODUCTS.length) % PRODUCTS.length); }
  function next() { setActive((a) => (a + 1) % PRODUCTS.length); }

  return (
    <section
      id="shop"
      style={{ background: "var(--navy-dark)", position: "relative", overflow: "hidden" }}
      className="w-full py-20 md:py-28"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .rivbel-ps-cta:hover { background: var(--burgundy) !important; color: var(--off-white) !important; border-color: var(--burgundy) !important; }
        .rivbel-ps-cta:focus-visible { outline: 2px solid var(--off-white); outline-offset: 4px; border-radius: 2px; }
        .rivbel-ps-shop:hover { background: rgba(247,243,237,0.1) !important; }
        .rivbel-ps-shop:focus-visible { outline: 2px solid var(--burgundy); outline-offset: 4px; border-radius: 2px; }
        .rivbel-ps-nav:hover { background: rgba(247,243,237,0.12) !important; }
        .rivbel-ps-nav:focus-visible { outline: 2px solid var(--burgundy); outline-offset: 4px; border-radius: 50%; }
        .rivbel-ps-dot:hover { background: rgba(247,243,237,0.5) !important; }
        .rivbel-ps-dot:focus-visible { outline: 2px solid var(--burgundy); outline-offset: 3px; border-radius: 50%; }
      `}} />

      {/* Grain overlay */}
      <div className="grain" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true" />

      {/* Decorative frame */}
      <div
        style={{ position: "absolute", inset: "24px", border: "1px solid rgba(247,243,237,0.04)", pointerEvents: "none" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10" style={{ position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: "4rem" }}
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 700,
            fontSize: "9px",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "var(--burgundy)",
            marginBottom: "1rem",
            opacity: 0.9,
          }}>
            {label}
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            color: "var(--off-white)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}>
            {heading}
          </h2>
          <div style={{ width: "36px", height: "1px", background: "var(--burgundy)", margin: "1.5rem auto 0", opacity: 0.5 }} aria-hidden="true" />
        </motion.div>

        {/* Main slider area */}
        <div style={{ position: "relative" }}>
          {/* Cards container */}
          <div
            style={{ position: "relative", minHeight: "520px" }}
            onPointerDown={(e) => { dragStartX.current = e.clientX; }}
            onPointerUp={(e) => {
              const delta = e.clientX - dragStartX.current;
              if (Math.abs(delta) > 40) { delta < 0 ? next() : prev(); }
            }}
          >
            <AnimatePresence mode="wait">
              {PRODUCTS.map((p, i) => {
                if (i !== active) return null;
                const name = lang === "es" ? p.nameEs : p.nameEn;
                const type = lang === "es" ? p.typeEs : p.typeEn;
                const desc = lang === "es" ? p.descEs : p.descEn;
                const material = lang === "es" ? p.materialEs : p.materialEn;

                return (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, x: reduce ? 0 : 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reduce ? 0 : -40 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "0",
                    }}
                    className="md:grid md:grid-cols-2 md:gap-16 items-center"
                  >
                    {/* Product image */}
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <motion.div
                        style={{
                          position: "relative",
                          background: "var(--linen)",
                          aspectRatio: "4/5",
                          overflow: "hidden",
                        }}
                        whileHover={{ scale: reduce ? 1 : 1.01 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        <img
                          src={p.image}
                          alt={name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center top",
                            display: "block",
                          }}
                          loading="eager"
                        />
                        {/* Product number badge */}
                        <div style={{
                          position: "absolute",
                          top: "20px",
                          left: "20px",
                          background: "var(--navy-dark)",
                          padding: "5px 10px",
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 600,
                          fontSize: "8px",
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                          color: "var(--off-white)",
                          opacity: 0.85,
                        }}>
                          {String(i + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
                        </div>
                      </motion.div>
                    </div>

                    {/* Product info */}
                    <div style={{ padding: "2.5rem 0 1rem", display: "flex", flexDirection: "column" }} className="md:py-0">
                      {/* Type label */}
                      <p style={{
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 700,
                        fontSize: "8px",
                        letterSpacing: "0.38em",
                        textTransform: "uppercase",
                        color: "var(--burgundy)",
                        marginBottom: "0.75rem",
                        opacity: 0.85,
                      }}>
                        {type}
                      </p>

                      {/* Product name */}
                      <h3 style={{
                        fontFamily: "var(--font-cormorant)",
                        fontWeight: 400,
                        fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                        color: "var(--off-white)",
                        lineHeight: 1.0,
                        letterSpacing: "-0.01em",
                        marginBottom: "1.25rem",
                      }}>
                        {name}
                      </h3>

                      {/* Fine rule */}
                      <div style={{ width: "36px", height: "1px", background: "var(--burgundy)", opacity: 0.5, marginBottom: "1.5rem" }} aria-hidden="true" />

                      {/* Material */}
                      <p style={{
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 300,
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--warm-grey)",
                        marginBottom: "1.25rem",
                        opacity: 0.8,
                      }}>
                        {material}
                      </p>

                      {/* Description */}
                      <p style={{
                        fontFamily: "var(--font-im-fell)",
                        fontStyle: "italic",
                        fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                        color: "rgba(247,243,237,0.6)",
                        lineHeight: 1.7,
                        marginBottom: "2.5rem",
                      }}>
                        {desc}
                      </p>

                      {/* Price + CTAs */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <span style={{
                          fontFamily: "var(--font-cormorant)",
                          fontWeight: 400,
                          fontSize: "2.25rem",
                          color: "var(--off-white)",
                          letterSpacing: "-0.02em",
                          fontVariantNumeric: "tabular-nums",
                        }}>
                          {fmt.format(p.price)}
                        </span>
                        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                          <a
                            href={`/products/${p.slug}`}
                            className="rivbel-ps-cta"
                            style={{
                              fontFamily: "var(--font-montserrat)",
                              fontWeight: 600,
                              fontSize: "9px",
                              letterSpacing: "0.22em",
                              textTransform: "uppercase",
                              color: "var(--off-white)",
                              border: "1px solid rgba(247,243,237,0.35)",
                              padding: "12px 28px",
                              borderRadius: "2px",
                              textDecoration: "none",
                              touchAction: "manipulation",
                              transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                            }}
                          >
                            {ctaLabel}
                          </a>
                          <a
                            href="#"
                            className="rivbel-ps-shop"
                            aria-label={`${shopLabel} — ${name}`}
                            style={{
                              fontFamily: "var(--font-montserrat)",
                              fontWeight: 500,
                              fontSize: "9px",
                              letterSpacing: "0.22em",
                              textTransform: "uppercase",
                              color: "var(--warm-grey)",
                              border: "1px solid rgba(140,136,128,0.25)",
                              padding: "12px 24px",
                              borderRadius: "2px",
                              textDecoration: "none",
                              touchAction: "manipulation",
                              transition: "background 0.2s ease",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                              <line x1="3" y1="6" x2="21" y2="6"/>
                              <path d="M16 10a4 4 0 01-8 0"/>
                            </svg>
                            {shopLabel}
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(247,243,237,0.07)",
          }}>
            {/* Dot indicators */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="rivbel-ps-dot"
                  aria-label={`Go to product ${i + 1}`}
                  aria-current={i === active ? "true" : undefined}
                  style={{
                    width: i === active ? "24px" : "6px",
                    height: "2px",
                    borderRadius: "1px",
                    background: i === active ? "var(--burgundy)" : "rgba(247,243,237,0.2)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "width 0.3s ease, background 0.2s ease",
                    touchAction: "manipulation",
                  }}
                />
              ))}
            </div>

            {/* Arrow controls */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={prev}
                className="rivbel-ps-nav"
                aria-label="Previous product"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(247,243,237,0.15)",
                  background: "transparent",
                  color: "var(--off-white)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  touchAction: "manipulation",
                  transition: "background 0.2s ease",
                }}
              >
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                  <path d="M13 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={next}
                className="rivbel-ps-nav"
                aria-label="Next product"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(247,243,237,0.15)",
                  background: "transparent",
                  color: "var(--off-white)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  touchAction: "manipulation",
                  transition: "background 0.2s ease",
                }}
              >
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                  <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
