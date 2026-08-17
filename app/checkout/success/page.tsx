import Link from "next/link";
import Nav from "@/components/nav";

export const metadata = { title: "Order Confirmed — Rivbel" };

export default function SuccessPage() {
  return (
    <>
      <Nav />
      <main style={{ background: "var(--beige)", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ width: "40px", height: "1px", background: "var(--burgundy)", margin: "0 auto 2rem", opacity: 0.65 }} aria-hidden="true" />
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "clamp(2.4rem,6vw,5rem)", color: "var(--navy)", lineHeight: 1.0, letterSpacing: "-0.025em", marginBottom: "1.25rem" }}>
          Order confirmed.
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(0.9rem,1.5vw,1rem)", lineHeight: 1.8, color: "var(--ink-60)", maxWidth: "380px", marginBottom: "2.5rem" }}>
          Thank you. A confirmation email is on its way. Your garment ships within 7–14 days.
        </p>
        <Link href="/collection" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#fff", background: "var(--burgundy)", padding: "14px 28px", textDecoration: "none" }}>
          Continue Shopping
        </Link>
      </main>
    </>
  );
}
