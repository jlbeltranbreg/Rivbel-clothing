"use client";
import { useLanguage } from "@/lib/language";
import { LogoMark } from "@/components/logo";

export default function Footer() {
  const { tr, lang } = useLanguage();

  const navLinks = [
    { label: lang==="es"?"Colección":"Collection", href:"/collection" },
    { label: lang==="es"?"Historia":"Story",        href:"/story" },
    { label: lang==="es"?"Artesanía":"Craft",       href:"/craft" },
    { label: lang==="es"?"Contacto":"Contact",      href:"/contact" },
  ];
  const connectLinks = [
    { label:"Instagram", href:"https://www.instagram.com/rivbelclothing/", ext:true },
    { label:"Pinterest",  href:"#", ext:false },
    { label:"TikTok",    href:"#", ext:false },
  ];

  return (
    <footer style={{ background:"var(--navy-deep)", borderTop:"1px solid rgba(155,35,43,0.2)" }}>
      <style dangerouslySetInnerHTML={{ __html:`
        .rv-footer-link { font-family:var(--font-body); font-weight:300; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(248,246,241,0.38); text-decoration:none; display:block; margin-bottom:0.65rem; transition:color 0.2s; touch-action:manipulation; }
        .rv-footer-link:hover { color:rgba(248,246,241,0.75); }
        .rv-footer-link:focus-visible { outline:2px solid var(--burgundy); outline-offset:4px; border-radius:1px; }
      `}} />

      {/* Top rule */}
      <div style={{ maxWidth:"880px", margin:"0 auto" }}>
        <div style={{ height:"1px", background:"rgba(155,35,43,0.4)" }} aria-hidden="true" />
      </div>

      {/* Logo lockup */}
      <div style={{ textAlign:"center", padding:"3rem 1.5rem 2rem", display:"flex", flexDirection:"column", alignItems:"center", gap:"0.85rem" }}>
        <LogoMark variant="dark" animate={false} width={48} />
        <p style={{ fontFamily:"var(--font-body)", fontWeight:700, fontSize:"13px", letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(248,246,241,0.85)", lineHeight:1 }}>RIVBEL</p>
        <div style={{ width:"28px", height:"1px", background:"var(--burgundy)", opacity:0.65 }} aria-hidden="true" />
        <p style={{ fontFamily:"var(--font-body)", fontWeight:300, fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(248,246,241,0.28)" }}>Tradition Worn · MMXXVI</p>
      </div>

      {/* Mid rule */}
      <div style={{ maxWidth:"880px", margin:"0 auto" }}>
        <div style={{ height:"1px", background:"rgba(30,44,80,0.5)" }} aria-hidden="true" />
      </div>

      {/* Three columns */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p style={{ fontFamily:"var(--font-body)", fontWeight:600, fontSize:"8px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(248,246,241,0.3)", marginBottom:"1.25rem" }}>
            {lang==="es"?"Navegación":"Navigation"}
          </p>
          <nav aria-label="Footer navigation">
            {navLinks.map(l => <a key={l.label} href={l.href} className="rv-footer-link">{l.label}</a>)}
          </nav>
        </div>
        <div>
          <p style={{ fontFamily:"var(--font-body)", fontWeight:600, fontSize:"8px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(248,246,241,0.3)", marginBottom:"1.25rem" }}>
            {lang==="es"?"Contacto":"Connect"}
          </p>
          {connectLinks.map(l => (
            <a key={l.label} href={l.href} className="rv-footer-link"
              {...(l.ext ? { target:"_blank", rel:"noopener noreferrer" } : {})}>
              {l.label}
            </a>
          ))}
        </div>
        <div>
          <p style={{ fontFamily:"var(--font-body)", fontWeight:600, fontSize:"8px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(248,246,241,0.3)", marginBottom:"1.25rem" }}>
            {lang==="es"?"Colecciones":"Collections"}
          </p>
          {[
            { label:"Drop 01", href:"/#collection" },
            { label:lang==="es"?"Próximamente":"Coming Soon", href:"#" },
          ].map(l => <a key={l.label} href={l.href} className="rv-footer-link">{l.label}</a>)}
        </div>
      </div>

      {/* Bottom rule + copyright */}
      <div style={{ maxWidth:"880px", margin:"0 auto" }}>
        <div style={{ height:"1px", background:"rgba(30,44,80,0.4)" }} aria-hidden="true" />
      </div>
      <p style={{ textAlign:"center", fontFamily:"var(--font-body)", fontWeight:300, fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(248,246,241,0.22)", padding:"1.5rem 1.5rem" }}>
        {lang==="es" ? "© MMXXVI RIVBEL · Tradición Vestida · España · México" : "© MMXXVI RIVBEL · Tradition Worn · España · México"}
      </p>
    </footer>
  );
}
