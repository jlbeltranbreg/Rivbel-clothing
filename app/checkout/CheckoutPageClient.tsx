"use client";
import Link from "next/link";
import { useCart } from "@/lib/shopify-cart";
import { useLanguage } from "@/lib/language";

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function CheckoutPageClient() {
  const { items, total } = useCart();
  const { lang } = useLanguage();

  const c = {
    empty:    lang === "es" ? "Tu carrito está vacío."  : "Your cart is empty.",
    back:     lang === "es" ? "← Volver a la Colección" : "← Back to Collection",
    title:    lang === "es" ? "Resumen del Pedido"      : "Order Summary",
    size:     lang === "es" ? "Talla"                   : "Size",
    subtotal: lang === "es" ? "Subtotal"                : "Subtotal",
    shipping: lang === "es" ? "Envío"                   : "Shipping",
    free:     lang === "es" ? "Calculado en el pago"    : "Calculated at checkout",
    pay:      lang === "es" ? "Finalizar Pedido"        : "Place Order",
    soon:     lang === "es" ? "Pago en línea próximamente — contáctanos para reservar." : "Online checkout coming soon — contact us to reserve.",
  };

  if (items.length === 0) {
    return (
      <div style={{ background: "var(--beige)", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 2rem" }}>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.4rem,3vw,2rem)", color: "var(--navy)", opacity: 0.45, marginBottom: "2rem" }}>
          {c.empty}
        </p>
        <Link href="/collection" style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--burgundy)", textDecoration: "none" }}>
          {c.back}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--beige)", minHeight: "100vh", padding: "clamp(3rem,7vw,5rem) 0 5rem" }}>
      <div className="max-w-2xl mx-auto px-6 md:px-10">
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic", fontSize: "clamp(2rem,5vw,3.5rem)", color: "var(--navy)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>
          {c.title}
        </h1>

        {/* Items */}
        <div style={{ borderTop: "1px solid rgba(155,35,43,0.18)", marginBottom: "1.5rem" }}>
          {items.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: "1rem", padding: "1.25rem 0", borderBottom: "1px solid rgba(30,44,80,0.07)" }}>
              <div style={{ flexShrink: 0, width: "64px", height: "80px", overflow: "hidden", background: "#F2EDE6" }}>
                {item.image && <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontStyle: "italic", fontSize: "1.1rem", color: "var(--navy)", marginBottom: "3px" }}>
                  {item.name}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-60)" }}>
                  {c.size} {item.variantTitle} · ×{item.quantity}
                </p>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "14px", color: "var(--navy)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
                {fmt.format(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", color: "var(--ink-60)" }}>{c.subtotal}</span>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "13px", color: "var(--navy)", fontVariantNumeric: "tabular-nums" }}>{fmt.format(total)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", color: "var(--ink-60)" }}>{c.shipping}</span>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", color: "var(--ink-60)" }}>{c.free}</span>
          </div>
          <div style={{ height: "1px", background: "rgba(30,44,80,0.1)", margin: "6px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy)" }}>Total</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", color: "var(--navy)", fontVariantNumeric: "tabular-nums" }}>{fmt.format(total)}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(248,246,241,0.5)", background: "var(--navy-deep)", padding: "19px 0", opacity: 0.5, userSelect: "none" }}>
          {c.pay}
        </div>

        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "8px", letterSpacing: "0.1em", color: "rgba(30,44,80,0.4)", textAlign: "center", marginTop: "12px" }}>
          {c.soon}
        </p>
      </div>
    </div>
  );
}
