"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface Material {
  id: string;
  nameEn: string;
  nameEs: string;
  tagEn: string;
  tagEs: string;
  descEn: string;
  descEs: string;
  properties: { labelEn: string; labelEs: string; valueEn: string; valueEs: string }[];
  careEn: string;
  careEs: string;
  image: string;
  imagePosition: string;
}

const MATERIALS: Material[] = [
  {
    id: "cotton",
    nameEn: "Organic Cotton Piqué",
    nameEs: "Algodón Orgánico Piqué",
    tagEn: "Polo collection",
    tagEs: "Colección polo",
    descEn: "Woven in a tight honeycomb texture that holds its shape after a hundred washes. Our cotton is GOTS-certified and grown without pesticides in certified organic fields.",
    descEs: "Tejido en una densa textura de panal que mantiene su forma tras cien lavados. Nuestro algodón cuenta con certificación GOTS y se cultiva sin pesticidas en campos orgánicos certificados.",
    properties: [
      { labelEn: "Weight",      labelEs: "Gramaje",     valueEn: "220 gsm",           valueEs: "220 g/m²" },
      { labelEn: "Origin",      labelEs: "Origen",      valueEn: "Spain",              valueEs: "España" },
      { labelEn: "Certification", labelEs: "Certificación", valueEn: "GOTS Organic",  valueEs: "GOTS Orgánico" },
      { labelEn: "Texture",     labelEs: "Textura",     valueEn: "Honeycomb piqué",    valueEs: "Piqué panal" },
    ],
    careEn: "Machine wash 30°C · No tumble dry · Cool iron",
    careEs: "Lavar a máquina 30°C · Sin secadora · Plancha fría",
    image: "https://images.pexels.com/photos/4614227/pexels-photo-4614227.jpeg?auto=compress&cs=tinysrgb&w=900",
    imagePosition: "center 35%",
  },
  {
    id: "linen",
    nameEn: "European Certified Linen",
    nameEs: "Lino Europeo Certificado",
    tagEn: "Shirt collection",
    tagEs: "Colección camisa",
    descEn: "Sourced from certified European flax fields, our linen gets softer with every wear. It breathes like nothing else — light as Mediterranean air and built to last a lifetime.",
    descEs: "Procedente de campos de lino europeos certificados, nuestro lino se suaviza con cada uso. Transpira como ningún otro tejido — ligero como el aire mediterráneo y hecho para durar toda la vida.",
    properties: [
      { labelEn: "Weight",      labelEs: "Gramaje",     valueEn: "170 gsm",           valueEs: "170 g/m²" },
      { labelEn: "Origin",      labelEs: "Origen",      valueEn: "Belgium / France",   valueEs: "Bélgica / Francia" },
      { labelEn: "Certification", labelEs: "Certificación", valueEn: "OEKO-TEX® 100", valueEs: "OEKO-TEX® 100" },
      { labelEn: "Handle",      labelEs: "Tacto",       valueEn: "Crisp then draping", valueEs: "Crujiente luego fluido" },
    ],
    careEn: "Hand wash or gentle cycle · Lay flat to dry · Medium iron while damp",
    careEs: "Lavar a mano o ciclo delicado · Secar plano · Plancha media en húmedo",
    image: "https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=900",
    imagePosition: "center center",
  },
];

export default function Materials() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("cotton");

  const mat = MATERIALS.find((m) => m.id === active) ?? MATERIALS[0];

  return (
    <section
      style={{ background: "var(--linen)", borderTop: "1px solid rgba(123,34,53,0.1)" }}
      className="w-full overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .rivbel-mat-tab:hover { color: var(--navy-dark) !important; }
        .rivbel-mat-tab:focus-visible { outline: 2px solid var(--burgundy); outline-offset: 3px; border-radius: 2px; }
      `}} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "clamp(2.5rem, 5vw, 4rem)",
        }}
        className="lg:grid-cols-[1fr_1px_1.2fr]"
      >
        {/* Left col — text */}
        <div>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              fontSize: "9px",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "var(--burgundy)",
              opacity: 0.85,
              marginBottom: "0.75rem",
            }}
          >
            {lang === "es" ? "Materiales" : "Materials"}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              color: "var(--navy)",
              lineHeight: 1.05,
              marginBottom: "2rem",
            }}
          >
            {lang === "es" ? "El tejido importa." : "The fabric matters."}
          </h2>

          {/* Tab buttons */}
          <div
            role="tablist"
            aria-label={lang === "es" ? "Seleccionar material" : "Select material"}
            style={{ display: "flex", gap: "0", marginBottom: "2rem", borderBottom: "1px solid rgba(15,29,58,0.12)" }}
          >
            {MATERIALS.map((m) => {
              const isActive = m.id === active;
              return (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`mat-panel-${m.id}`}
                  id={`mat-tab-${m.id}`}
                  onClick={() => setActive(m.id)}
                  className="rivbel-mat-tab"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: isActive ? 600 : 300,
                    fontSize: "9px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--navy-dark)" : "var(--warm-grey)",
                    background: "none",
                    border: "none",
                    borderBottom: isActive ? "2px solid var(--burgundy)" : "2px solid transparent",
                    padding: "0 0 10px",
                    marginRight: "2rem",
                    cursor: "pointer",
                    touchAction: "manipulation",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                    transform: "translateY(1px)",
                  }}
                >
                  {lang === "es" ? m.nameEs : m.nameEn}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              id={`mat-panel-${mat.id}`}
              role="tabpanel"
              aria-labelledby={`mat-tab-${mat.id}`}
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -6 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {/* Tag */}
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 400,
                fontSize: "8px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--burgundy)",
                opacity: 0.75,
                marginBottom: "0.75rem",
              }}>
                {lang === "es" ? mat.tagEs : mat.tagEn}
              </p>

              {/* Description */}
              <p style={{
                fontFamily: "var(--font-lato)",
                fontWeight: 300,
                fontSize: "clamp(0.82rem, 1.4vw, 0.92rem)",
                lineHeight: 1.82,
                color: "var(--warm-grey)",
                marginBottom: "2rem",
              }}>
                {lang === "es" ? mat.descEs : mat.descEn}
              </p>

              {/* Properties table */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1px",
                  background: "rgba(15,29,58,0.08)",
                  border: "1px solid rgba(15,29,58,0.08)",
                  marginBottom: "1.5rem",
                }}
              >
                {mat.properties.map((prop) => (
                  <div
                    key={prop.labelEn}
                    style={{
                      background: "var(--linen)",
                      padding: "12px 14px",
                    }}
                  >
                    <p style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 600,
                      fontSize: "7px",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "var(--warm-grey)",
                      opacity: 0.65,
                      marginBottom: "3px",
                    }}>
                      {lang === "es" ? prop.labelEs : prop.labelEn}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 500,
                      fontSize: "1rem",
                      color: "var(--navy)",
                      letterSpacing: "0.01em",
                    }}>
                      {lang === "es" ? prop.valueEs : prop.valueEn}
                    </p>
                  </div>
                ))}
              </div>

              {/* Care */}
              <div style={{ borderTop: "1px solid rgba(123,34,53,0.15)", paddingTop: "1rem" }}>
                <p style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 600,
                  fontSize: "7px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--burgundy)",
                  opacity: 0.7,
                  marginBottom: "0.4rem",
                }}>
                  {lang === "es" ? "Cuidados" : "Care"}
                </p>
                <p style={{
                  fontFamily: "var(--font-im-fell)",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: "var(--warm-grey)",
                  lineHeight: 1.6,
                }}>
                  {lang === "es" ? mat.careEs : mat.careEn}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Divider — desktop only */}
        <div
          className="hidden lg:block"
          style={{ background: "rgba(123,34,53,0.12)", width: "1px" }}
          aria-hidden="true"
        />

        {/* Right col — fabric image */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: "360px" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={active + "-img"}
              src={mat.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={700}
              height={560}
              initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: mat.imagePosition,
                display: "block",
                filter: "saturate(0.85)",
                position: "absolute",
                inset: 0,
              }}
            />
          </AnimatePresence>
          {/* Corner tag */}
          <div
            style={{
              position: "absolute",
              bottom: "1.25rem",
              right: "1.25rem",
              background: "rgba(15,29,58,0.75)",
              backdropFilter: "blur(4px)",
              padding: "8px 14px",
              borderRadius: "2px",
            }}
          >
            <p style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              fontSize: "7px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(247,243,237,0.75)",
              margin: 0,
            }}>
              {lang === "es" ? "Detalle de tejido" : "Fabric detail"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
