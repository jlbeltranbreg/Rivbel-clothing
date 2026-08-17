"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HoverImageGallery } from "@/components/ui/hover-image-gallery";
import { useLanguage } from "@/lib/language";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const SPOTLIGHT_IMAGES = [
  "https://images.pexels.com/photos/162461/pexels-photo-162461.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/20820040/pexels-photo-20820040.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/27497250/pexels-photo-27497250.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/14643470/pexels-photo-14643470.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/31182790/pexels-photo-31182790.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/29173859/pexels-photo-29173859.jpeg?auto=compress&cs=tinysrgb&w=900",
];

export default function Spotlight() {
  const { tr } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section
      id="spotlight"
      style={{ background: "var(--linen)", scrollMarginTop: "52px" }}
      className="w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">

          {/* Left — HoverImageGallery */}
          <div>
            <HoverImageGallery
              images={SPOTLIGHT_IMAGES}
              cursorVariant="dark"
              className="w-full"
              containerWidth="100%"
              containerHeight="clamp(480px, 80vh, 760px)"
            />
          </div>

          {/* Right — editorial product text */}
          <motion.div
            className="rivbel-spotlight-panel"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "3rem 1.5rem",
            }}
            initial={{ opacity: 0, x: reduce ? 0 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              @media (min-width: 1024px) {
                .rivbel-spotlight-panel {
                  padding: 4rem 3.5rem 4rem 4rem !important;
                  border-left: 1px solid rgba(124,32,53,0.14);
                }
              }
              .rivbel-spotlight-cta:hover { background: var(--navy) !important; color: var(--off-white) !important; }
              .rivbel-spotlight-cta:focus-visible { outline: 2px solid var(--navy); outline-offset: 4px; border-radius: 2px; }
            `}} />

            {/* Label */}
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 700,
                fontSize: "9px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--burgundy)",
                marginBottom: "1.25rem",
                opacity: 0.85,
              }}
            >
              {tr.spotlight.label}
            </p>

            {/* Product name */}
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--navy)",
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                marginBottom: "1.25rem",
              }}
            >
              Olivo
            </h2>

            {/* Fine rule */}
            <div
              style={{ width: "40px", height: "1px", background: "var(--burgundy)", marginBottom: "1.5rem", opacity: 0.5 }}
              aria-hidden="true"
            />

            {/* Material */}
            <p
              style={{
                fontFamily: "var(--font-lato)",
                fontWeight: 300,
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "var(--warm-grey)",
                marginBottom: "1.75rem",
                textTransform: "uppercase",
              }}
            >
              {tr.spotlight.material}
            </p>

            {/* Editorial quote */}
            <p
              style={{
                fontFamily: "var(--font-im-fell)",
                fontStyle: "italic",
                fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
                color: "var(--navy-mid, #2C3E5E)",
                lineHeight: 1.6,
                marginBottom: "2.25rem",
                whiteSpace: "pre-line",
              }}
            >
              {tr.spotlight.quote}
            </p>

            {/* Price + CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                  fontSize: "2rem",
                  color: "var(--charcoal)",
                  letterSpacing: "-0.02em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {fmt.format(49.99)}
              </span>
              <a
                href="/products/polo-navy"
                className="rivbel-spotlight-cta"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 600,
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--navy)",
                  border: "1px solid var(--navy)",
                  padding: "11px 22px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  touchAction: "manipulation",
                  transition: "background 0.2s ease, color 0.2s ease",
                }}
              >
                {tr.spotlight.discover}
              </a>
            </div>

            {/* Brezza Tura statement */}
            <div
              style={{
                marginTop: "2.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(124,32,53,0.15)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 700,
                  fontSize: "8px",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--burgundy)",
                  marginBottom: "0.5rem",
                  opacity: 0.8,
                }}
              >
                {tr.spotlight.brezzaTitle}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-im-fell)",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: "var(--warm-grey)",
                  lineHeight: 1.6,
                  opacity: 0.75,
                }}
              >
                {tr.spotlight.brezzaBody}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
