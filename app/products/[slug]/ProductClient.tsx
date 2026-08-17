"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { useCart } from "@/lib/shopify-cart";
import { SIZE_CHARTS } from "@/lib/size-charts";
import { PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/products";

const EASE  = [0.25, 0.1, 0.25, 1] as const;
const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

export default function ProductClient({ product }: { product: Product }) {
  const { lang } = useLanguage();
  const { addItem } = useCart();

  const [activeImg,    setActiveImg]    = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [adding,       setAdding]       = useState(false);
  const [added,        setAdded]        = useState(false);

  const name     = lang === "es" ? product.nameEs     : product.nameEn;
  const type     = lang === "es" ? product.typeEs     : product.typeEn;
  const material = lang === "es" ? product.materialEs : product.materialEn;
  const desc     = lang === "es" ? product.descEs     : product.descEn;
  const chart    = SIZE_CHARTS[product.sizeChart];
  const siblings = PRODUCTS.filter((p) => p.colorGroup === product.colorGroup);
  const gallery  = product.gallery as readonly string[];
  const fmt      = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const handleAddToCart = async () => {
    if (!selectedSize || adding) return;
    setAdding(true);
    await addItem({
      id:           `${product.slug}-${selectedSize.toLowerCase()}`,
      name,
      variantTitle: selectedSize,
      price:        product.price,
      image:        gallery[0] ?? product.image,
    });
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  // Labels
  const addLabel    = lang === "es" ? "Añadir al Carrito"    : "Add to Cart";
  const addingLabel = lang === "es" ? "Añadiendo…"           : "Adding…";
  const addedLabel  = lang === "es" ? "¡Añadido!"            : "Added!";
  const selectLabel = lang === "es" ? "Selecciona una Talla" : "Select a Size";
  const sizeLabel   = lang === "es" ? "Talla"                : "Size";
  const colorLabel  = lang === "es" ? "Color"                : "Color";
  const guideLabel  = lang === "es" ? "Guía de Tallas"       : "Size Guide";
  const unitNote    = lang === "es" ? "Medidas en cm"        : "Measurements in cm";
  const backLabel   = lang === "es" ? "← Volver"             : "← Back to Collection";
  const detailHdr   = lang === "es" ? "Detalles del Producto": "Product Details";
  const details     = lang === "es"
    ? ["Bordado artesanal del castillo Rivbel · 2.5×3cm", "Tiradas limitadas — Entrega 01", "Certificado de origen europeo", "Lavado a mano o máquina fría · 30°C"]
    : ["Handcrafted Rivbel castle embroidery · 2.5×3cm", "Limited quantities — Drop 01", "European origin certificate", "Hand or machine wash cold · 30°C"];

  const ctaLabel = adding ? addingLabel : added ? addedLabel : selectedSize ? addLabel : selectLabel;
  const ctaReady = !!selectedSize && !adding;
  const ctaBg    = added ? "#2A6B3C" : ctaReady ? "var(--navy-deep)" : "rgba(30,44,80,0.28)";

  return (
    <div style={{ background: "var(--beige)", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .rp-size { font-family:var(--font-body); font-weight:500; font-size:11px; letter-spacing:0.08em; width:52px; height:52px; border:1px solid rgba(30,44,80,0.2); background:transparent; color:var(--navy-deep); cursor:pointer; transition:background 0.18s, border-color 0.18s, color 0.18s; touch-action:manipulation; position:relative; }
        .rp-size:hover:not([aria-pressed="true"]):not(:disabled) { border-color:var(--burgundy); color:var(--burgundy); }
        .rp-size[aria-pressed="true"] { background:var(--navy-deep); border-color:var(--navy-deep); color:#fff; }
        .rp-size:disabled { opacity:0.32; cursor:default; }
        .rp-size.sold-out { text-decoration:line-through; opacity:0.35; cursor:not-allowed; }
        .rp-size:focus-visible { outline:2px solid var(--burgundy); outline-offset:3px; border-radius:1px; }
        .rp-add { font-family:var(--font-body); font-weight:600; font-size:10px; letter-spacing:0.28em; text-transform:uppercase; border:none; width:100%; max-width:400px; padding:19px 0; display:block; cursor:pointer; touch-action:manipulation; transition:background 0.22s, transform 0.12s; }
        .rp-add:hover:not(:disabled) { transform:translateY(-1px); }
        .rp-add:disabled { cursor:not-allowed; }
        .rp-add:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; border-radius:2px; }
        .rp-back:hover { color:var(--burgundy) !important; }
        .rp-back:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; border-radius:2px; }
        .rp-thumb { cursor:pointer; transition:opacity 0.18s, transform 0.18s; border:none; padding:0; }
        .rp-thumb:hover { opacity:1 !important; transform:scale(1.03); }
        .rp-detail-row { border-top:1px solid rgba(30,44,80,0.07); }
        .rp-detail-row:first-child { border-top:1px solid rgba(155,35,43,0.2); }
        .rp-swatch { transition:transform 0.18s; }
        .rp-swatch:hover { transform:scale(1.08); }
      `}} />

      {/* Top bar */}
      <div style={{ background: "var(--navy-deep)", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(155,35,43,0.15)" }}>
        <Link href="/collection" className="rp-back"
          style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(248,246,241,0.45)", textDecoration: "none", transition: "color 0.2s" }}>
          {backLabel}
        </Link>
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.2em", color: "rgba(248,246,241,0.7)", textTransform: "uppercase" }}>RIVBEL</span>
        <div style={{ width: "100px" }} />
      </div>

      {/* Hero split */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "0 4rem", paddingTop: "3rem", paddingBottom: "4rem", alignItems: "start" }}>

          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, ease: EASE }}>
            <div style={{ position: "relative", overflow: "hidden", background: "#F2EDE6", borderRadius: "2px", aspectRatio: "3/4" }}>
              <AnimatePresence mode="wait">
                <motion.img key={activeImg} src={gallery[activeImg]} alt={name}
                  initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
              </AnimatePresence>
              <div style={{ position: "absolute", bottom: "16px", right: "16px", background: "rgba(18,25,47,0.55)", padding: "4px 10px", borderRadius: "2px" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "8px", letterSpacing: "0.18em", color: "rgba(248,246,241,0.8)", fontVariantNumeric: "tabular-nums" }}>
                  {activeImg + 1}&nbsp;/&nbsp;{gallery.length}
                </span>
              </div>
            </div>
            {gallery.length > 1 && (
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                {gallery.map((src, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className="rp-thumb"
                    aria-label={`${lang === "es" ? "Ver imagen" : "View image"} ${i + 1}`}
                    style={{ flex: "0 0 auto", width: "72px", aspectRatio: "3/4", overflow: "hidden", background: "#F2EDE6", border: i === activeImg ? "1.5px solid var(--burgundy)" : "1.5px solid rgba(30,44,80,0.12)", opacity: i === activeImg ? 1 : 0.55, touchAction: "manipulation" }}>
                    <img src={src} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product info */}
          <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, ease: EASE, delay: 0.08 }} style={{ paddingTop: "0.5rem" }}>

            <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "0.75rem", opacity: 0.85 }}>
              {type}&nbsp;·&nbsp;SS/26
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontStyle: "italic", fontSize: "clamp(2.8rem,5vw,4.5rem)", color: "var(--navy-deep)", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1rem" }}>
              {name}
            </h1>
            <div style={{ width: "36px", height: "1px", background: "var(--burgundy)", marginBottom: "1.5rem", opacity: 0.7 }} aria-hidden="true" />

            <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "2.2rem", color: "var(--navy)", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", marginBottom: "1.75rem" }}>
              {fmt.format(product.price)}
            </p>

            {/* Color swatches */}
            <div style={{ marginBottom: "1.75rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--navy-deep)", marginBottom: "0.85rem" }}>
                {colorLabel}: <span style={{ fontWeight: 300, letterSpacing: "0.12em" }}>{product.colorLabel}</span>
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {siblings.map((sibling) => {
                  const isActive = sibling.slug === product.slug;
                  return (
                    <Link key={sibling.slug} href={`/products/${sibling.slug}`} className="rp-swatch"
                      aria-label={sibling.colorLabel} aria-current={isActive ? "page" : undefined}
                      style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "40px", height: "40px", background: sibling.colorHex, border: isActive ? "2px solid var(--burgundy)" : "1.5px solid rgba(30,44,80,0.18)", borderRadius: "2px", boxShadow: isActive ? "0 0 0 3px rgba(155,35,43,0.12)" : "none" }} />
                      <span style={{ fontFamily: "var(--font-body)", fontWeight: isActive ? 600 : 300, fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: isActive ? "var(--burgundy)" : "var(--ink-60)", whiteSpace: "nowrap" }}>
                        {sibling.colorLabel}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-60)", marginBottom: "1.25rem", opacity: 0.75 }}>
              {material}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "15px", lineHeight: 1.85, color: "var(--navy)", opacity: 0.8, marginBottom: "2rem", maxWidth: "400px" }}>
              {desc}
            </p>

            {/* Size selector */}
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--navy-deep)", marginBottom: "0.85rem" }}>
                {sizeLabel}
                {!selectedSize && (
                  <span style={{ fontWeight: 300, color: "var(--burgundy)", marginLeft: "0.5rem", fontSize: "8px", opacity: 0.75 }}>
                    — {lang === "es" ? "requerido" : "required"}
                  </span>
                )}
              </p>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {SIZES.map((s) => {
                  const active = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(active ? null : s)}
                      className="rp-size"
                      aria-pressed={active}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              className="rp-add"
              onClick={handleAddToCart}
              disabled={!ctaReady}
              animate={added ? { scale: [1, 1.025, 1] } : {}}
              transition={{ duration: 0.28 }}
              style={{ color: "#fff", background: ctaBg, marginBottom: "8px" }}
              aria-disabled={!ctaReady}
            >
              {ctaLabel}
            </motion.button>

            <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "8px", letterSpacing: "0.14em", color: "rgba(30,44,80,0.32)", maxWidth: "400px" }}>
              {lang === "es" ? "Envío gratuito a partir de $150 · Devoluciones gratuitas" : "Free shipping over $150 · Free returns"}
            </p>

            {/* Product details */}
            <div style={{ marginTop: "2.75rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(155,35,43,0.15)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "8px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "0.85rem", opacity: 0.8 }}>
                {detailHdr}
              </p>
              {details.map((d) => (
                <p key={d} style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", color: "var(--ink-60)", lineHeight: 1.75, letterSpacing: "0.02em" }}>
                  — {d}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Size guide */}
      <div style={{ borderTop: "1px solid rgba(155,35,43,0.18)", borderBottom: "1px solid rgba(155,35,43,0.18)", background: "rgba(248,246,241,0.95)", padding: "4rem 0" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease: EASE }}>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "1.5rem", opacity: 0.85 }}>
              {guideLabel}
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th scope="col" style={{ padding: "0 0 12px", textAlign: "left" }} />
                    {SIZES.map((s) => (
                      <th key={s} scope="col"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: selectedSize === s ? "var(--burgundy)" : "var(--navy-deep)", textAlign: "right", paddingBottom: "12px", paddingLeft: "1.5rem", transition: "color 0.2s" }}>
                        {s}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chart.rows.map((row) => {
                    const label = lang === "es" ? row.labelEs : row.labelEn;
                    const step  = Number(row.vals[3]) - Number(row.vals[2]);
                    const vals  = [...row.vals, String(Number(row.vals[3]) + step)];
                    return (
                      <tr key={label} className="rp-detail-row">
                        <th scope="row" style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "10px", letterSpacing: "0.05em", color: "var(--ink-60)", textAlign: "left", padding: "13px 0", whiteSpace: "nowrap" }}>
                          {label}
                        </th>
                        {vals.map((v, vi) => (
                          <td key={vi}
                            style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "17px", color: selectedSize === SIZES[vi] ? "var(--burgundy)" : "var(--navy-deep)", textAlign: "right", padding: "13px 0 13px 1.5rem", fontVariantNumeric: "tabular-nums", transition: "color 0.2s" }}>
                            {v}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-60)", opacity: 0.5, marginTop: "1.25rem" }}>
              {unitNote}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Other colours */}
      {siblings.length > 1 && (
        <div style={{ background: "var(--beige)", padding: "4rem 0", borderBottom: "1px solid rgba(30,44,80,0.07)" }}>
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--burgundy)", marginBottom: "2rem", opacity: 0.8, textAlign: "center" }}>
              {lang === "es" ? "Otros Colores" : "Other Colours"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${siblings.length}, minmax(0, 200px))`, gap: "1.5rem", justifyContent: "center" }}>
              {siblings.map((s) => {
                const sName    = lang === "es" ? s.nameEs : s.nameEn;
                const isActive = s.slug === product.slug;
                return (
                  <Link key={s.slug} href={`/products/${s.slug}`}
                    style={{ textDecoration: "none", opacity: isActive ? 0.4 : 1, pointerEvents: isActive ? "none" : "auto" }}>
                    <div style={{ overflow: "hidden", background: "#F2EDE6", aspectRatio: "3/4", marginBottom: "0.85rem" }}>
                      <motion.img src={s.image} alt={sName} whileHover={{ scale: 1.04 }} transition={{ duration: 0.55, ease: EASE }}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                    </div>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontStyle: "italic", fontSize: "1.2rem", color: "var(--navy-deep)", marginBottom: "3px" }}>{sName}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-60)", opacity: 0.6 }}>{s.colorLabel}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Return */}
      <div style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
        <Link href="/collection" className="rp-back"
          style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-60)", textDecoration: "none", opacity: 0.55, transition: "color 0.2s, opacity 0.2s" }}>
          ← {lang === "es" ? "Volver a la Colección" : "Return to Collection"}
        </Link>
      </div>
    </div>
  );
}
