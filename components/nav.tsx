"use client";

import { useEffect, useState } from "react";
import { useLanguage, type Lang } from "@/lib/language";
import { LogoMark } from "@/components/logo";
import { useCart } from "@/lib/shopify-cart";

const OVERLAY_ID = "mobile-nav-overlay";

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
      {(["en","es"] as Lang[]).map((l, i) => (
        <span key={l} style={{ display:"inline-flex", alignItems:"center", gap:"4px" }}>
          {i > 0 && <span aria-hidden="true" style={{ color:"var(--burgundy)", fontSize:"10px", opacity:0.5 }}>·</span>}
          <button
            onClick={() => setLang(l)}
            aria-label={l === "en" ? "English" : "Español"}
            aria-pressed={lang === l}
            style={{
              fontFamily:"var(--font-body)", fontWeight: lang===l ? 600 : 400,
              fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase",
              color: lang===l ? "currentColor" : "rgba(30,44,80,0.4)",
              background:"none", border:"none", cursor: lang===l ? "default" : "pointer",
              padding:"4px 3px", touchAction:"manipulation", transition:"color 0.2s",
            }}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

function CartButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Cart${count > 0 ? ` (${count} items)` : ""}`}
      style={{ position:"relative", background:"none", border:"none", cursor:"pointer", color:"inherit", padding:"6px", touchAction:"manipulation" }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <path d="M6.5 7.5V6a3.5 3.5 0 0 1 7 0v1.5" strokeLinecap="round" />
        <rect x="2.5" y="7.5" width="15" height="10" rx="1" />
      </svg>
      {count > 0 && (
        <span style={{
          position:"absolute", top:"-2px", right:"-4px",
          background:"var(--burgundy)", color:"#fff",
          fontFamily:"var(--font-body)", fontWeight:600, fontSize:"8px",
          width:"16px", height:"16px", borderRadius:"50%",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontVariantNumeric:"tabular-nums", lineHeight:1,
        }} aria-hidden="true">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

export default function Nav() {
  const { lang, setLang, tr } = useLanguage();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navLinks = [
    { label: lang === "es" ? "Colección" : "Collection", href: "/collection" },
    { label: lang === "es" ? "Historia" : "Story", href: "/story" },
    { label: lang === "es" ? "Artesanía" : "Craft", href: "/craft" },
  ];

  const navColor = scrolled ? "var(--navy)" : "rgba(247,243,237,0.85)";
  const navBg = scrolled ? "var(--beige)" : "transparent";
  const navBorder = scrolled ? "1px solid rgba(30,44,80,0.1)" : "1px solid transparent";

  return (
    <>
      <a href="#main-content" style={{ position:"absolute", left:"-9999px", top:"auto", width:"1px", height:"1px", overflow:"hidden", zIndex:200 }}
        onFocus={e => Object.assign(e.currentTarget.style, { position:"fixed", top:"1rem", left:"1rem", width:"auto", height:"auto", overflow:"visible", padding:"8px 16px", background:"var(--burgundy)", color:"#fff", fontFamily:"var(--font-body)", fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", textDecoration:"none", zIndex:"200" })}
        onBlur={e => Object.assign(e.currentTarget.style, { position:"absolute", left:"-9999px", top:"auto", width:"1px", height:"1px", overflow:"hidden" })}
      >Skip to content</a>

      <style dangerouslySetInnerHTML={{ __html: `
        .rv-nav { transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease; }
        .rv-link { position:relative; text-decoration:none; transition:color 0.2s; }
        .rv-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:var(--burgundy); transition:width 0.22s ease; }
        .rv-link:hover::after, .rv-link:focus-visible::after { width:100%; }
        .rv-link:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; border-radius:1px; }
        .rv-hamburger:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; border-radius:2px; }
      `}} />

      <nav
        aria-label="Main navigation"
        className="rv-nav sticky top-0 w-full"
        style={{ background:navBg, borderBottom:navBorder, color:navColor, zIndex:50 }}
      >
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", height:"60px", padding:"0 clamp(1.5rem,4vw,3rem)", maxWidth:"1400px", margin:"0 auto" }}>

          {/* Left: nav links (desktop) */}
          <ul className="hidden lg:flex items-center gap-8 list-none" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="rv-link"
                  style={{ fontFamily:"var(--font-body)", fontWeight:400, fontSize:"11px", letterSpacing:"0.12em", textTransform:"uppercase", color:"inherit" }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger left */}
          <button
            className="rv-hamburger lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={OVERLAY_ID}
            style={{ background:"none", border:"none", padding:"8px", color:"inherit", justifySelf:"start" }}
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
              <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="0" y1="7" x2="22" y2="7" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="0" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          </button>

          {/* Center: wordmark */}
          <a href="/" style={{ textDecoration:"none", color:"inherit", display:"flex", flexDirection:"column", alignItems:"center", gap:"3px" }}>
            <span style={{ fontFamily:"var(--font-body)", fontWeight:700, fontSize:"14px", letterSpacing:"0.28em", textTransform:"uppercase", color:"inherit", lineHeight:1 }}>RIVBEL</span>
            <div style={{ width:"28px", height:"1px", background:"var(--burgundy)", opacity:0.8 }} aria-hidden="true" />
          </a>

          {/* Right: lang toggle + cart (desktop) */}
          <div className="hidden lg:flex justify-end items-center" style={{ color:"inherit", gap:"1.25rem" }}>
            <LangToggle lang={lang} setLang={setLang} />
            <CartButton count={count} onClick={openCart} />
          </div>

          {/* Mobile: cart + lang right */}
          <div className="lg:hidden flex justify-end items-center" style={{ color:"inherit", gap:"12px" }}>
            <CartButton count={count} onClick={openCart} />
            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div id={OVERLAY_ID} role="dialog" aria-modal="true" aria-label="Navigation menu"
          style={{ position:"fixed", inset:0, background:"var(--beige)", zIndex:51, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"2.5rem" }}
        >
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"var(--burgundy)", opacity:0.3 }} aria-hidden="true" />
          <button onClick={() => setOpen(false)} aria-label="Close menu"
            style={{ position:"absolute", top:"18px", right:"24px", background:"none", border:"none", color:"var(--ink-60)", padding:"8px" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          </button>
          <div style={{ position:"absolute", top:"16px", left:"24px" }}>
            <LangToggle lang={lang} setLang={setLang} />
          </div>
          {[...navLinks, { label: lang==="es"?"Contacto":"Contact", href:"/contact" }].map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setOpen(false)}
              style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontWeight:400, fontSize:"clamp(2rem,7vw,3rem)", color:"var(--navy)", textDecoration:"none", letterSpacing:"0.02em" }}>
              {label}
            </a>
          ))}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", background:"var(--burgundy)", opacity:0.15 }} aria-hidden="true" />
        </div>
      )}
    </>
  );
}
