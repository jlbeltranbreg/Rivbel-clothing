"use client";
import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/shopify-cart";
import { useLanguage } from "@/lib/language";

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const E   = [0.22, 0.1, 0.25, 1] as const;

export default function CartDrawer() {
  const { items, count, total, loading, open, removeItem, updateQty, closeCart } = useCart();
  const { lang } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, closeCart]);

  const c = {
    title:    lang === "es" ? "Tu Carrito" : "Your Cart",
    empty:    lang === "es" ? "Tu carrito está vacío." : "Your cart is empty.",
    shop:     lang === "es" ? "Ver la Colección" : "Browse the Collection",
    checkout: lang === "es" ? "Ir al Pago" : "Proceed to Checkout",
    subtotal: lang === "es" ? "Subtotal" : "Subtotal",
    remove:   lang === "es" ? "Eliminar" : "Remove",
    size:     lang === "es" ? "Talla" : "Size",
    secure:   lang === "es" ? "Pago seguro · Shopify Checkout" : "Secure checkout · Shopify Checkout",
  };

  const itemsLabel = count === 1
    ? (lang === "es" ? "artículo" : "item")
    : (lang === "es" ? "artículos" : "items");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            style={{ position: "fixed", inset: 0, background: "rgba(18,25,47,0.55)", zIndex: 100 }}
            aria-hidden="true"
          />

          <motion.div
            key="drawer"
            role="dialog" aria-modal="true" aria-label={c.title}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: E }}
            style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px,100vw)", background: "var(--beige)", zIndex: 101, display: "flex", flexDirection: "column" }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              .rv-cqty { background:none; border:none; cursor:pointer; font-family:var(--font-body); font-size:15px; color:var(--navy); padding:4px 10px; touch-action:manipulation; transition:color 0.15s; }
              .rv-cqty:hover { color:var(--burgundy); }
              .rv-cqty:focus-visible { outline:2px solid var(--burgundy); outline-offset:2px; border-radius:1px; }
              .rv-cremove { font-family:var(--font-body); font-size:8px; letter-spacing:0.14em; text-transform:uppercase; background:none; border:none; cursor:pointer; color:rgba(30,44,80,0.32); padding:4px 0; transition:color 0.15s; touch-action:manipulation; }
              .rv-cremove:hover { color:var(--burgundy); }
              .rv-checkout { font-family:var(--font-body); font-weight:600; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#fff; background:var(--navy-deep); border:none; width:100%; padding:18px; cursor:pointer; transition:background 0.22s; touch-action:manipulation; text-decoration:none; display:block; text-align:center; }
              .rv-checkout:hover { background:var(--burgundy); }
              .rv-checkout:focus-visible { outline:2px solid var(--burgundy); outline-offset:3px; }
            `}} />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid rgba(30,44,80,0.08)", flexShrink: 0 }}>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--navy)" }}>
                  {c.title}
                </p>
                {count > 0 && (
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "11px", color: "var(--ink-60)", marginTop: "2px" }}>
                    {count} {itemsLabel}
                  </p>
                )}
              </div>
              <button onClick={closeCart} aria-label="Close cart"
                style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "var(--ink-60)" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </div>

            {/* Loading overlay inside drawer */}
            {loading && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(248,246,241,0.7)", zIndex: 5 }}>
                <div style={{ width: "24px", height: "24px", border: "2px solid rgba(30,44,80,0.15)", borderTopColor: "var(--burgundy)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "1.4rem", color: "var(--navy)", opacity: 0.4, marginBottom: "1.5rem" }}>
                    {c.empty}
                  </p>
                  <button onClick={() => { closeCart(); window.location.href = "/collection"; }}
                    style={{ fontFamily: "var(--font-body)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--burgundy)", background: "none", border: "none", cursor: "pointer", touchAction: "manipulation" }}>
                    {c.shop} →
                  </button>
                </div>
              ) : (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {items.map((item) => (
                    <li key={item.id} style={{ display: "flex", gap: "1rem", padding: "20px 0", borderBottom: "1px solid rgba(30,44,80,0.07)" }}>
                      <div style={{ flexShrink: 0, width: "72px", height: "88px", overflow: "hidden", background: "#F2EDE6", borderRadius: "1px" }}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", background: "#EAEAE8" }} />
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontStyle: "italic", fontSize: "1rem", color: "var(--navy)", lineHeight: 1.2, marginBottom: "3px" }}>
                          {item.name}
                        </p>
                        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-60)", marginBottom: "10px" }}>
                          {c.size} {item.variantTitle}
                        </p>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(30,44,80,0.15)" }}>
                            <button className="rv-cqty" onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                            <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "12px", color: "var(--navy)", padding: "0 6px", minWidth: "24px", textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
                              {item.quantity}
                            </span>
                            <button className="rv-cqty" onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                          </div>
                          <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "13px", color: "var(--navy)", fontVariantNumeric: "tabular-nums" }}>
                            {fmt.format(item.price * item.quantity)}
                          </p>
                        </div>

                        <button className="rv-cremove" onClick={() => removeItem(item.id)}>
                          {c.remove}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(30,44,80,0.08)", flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy)" }}>
                    {c.subtotal}
                  </p>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.5rem", color: "var(--navy)", fontVariantNumeric: "tabular-nums" }}>
                    {fmt.format(total)}
                  </p>
                </div>
                <div style={{ height: "1px", background: "rgba(30,44,80,0.07)", marginBottom: "16px" }} aria-hidden="true" />

                <Link href="/checkout" className="rv-checkout" onClick={closeCart}>
                  {c.checkout}
                </Link>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "10px" }}>
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
                    <rect x="0.5" y="5.5" width="10" height="7" rx="1" stroke="rgba(30,44,80,0.28)" />
                    <path d="M2.5 5.5V3.5a3 3 0 0 1 6 0v2" stroke="rgba(30,44,80,0.28)" strokeLinecap="round" />
                  </svg>
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "8px", letterSpacing: "0.1em", color: "rgba(30,44,80,0.3)" }}>
                    {c.secure}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
