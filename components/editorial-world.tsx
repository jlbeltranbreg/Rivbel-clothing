"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const EDITORIALS = [
  {
    src: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=900",
    labelEn: "Andalucía",
    labelEs: "Andalucía",
    captionEn: "Where the craft was born",
    captionEs: "Donde nació el oficio",
    position: "center 30%",
  },
  {
    src: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=900",
    labelEn: "Castilla",
    labelEs: "Castilla",
    captionEn: "Rigour in every stitch",
    captionEs: "Rigor en cada puntada",
    position: "center 40%",
  },
  {
    src: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=900",
    labelEn: "México",
    labelEs: "México",
    captionEn: "Warmth woven into the fabric",
    captionEs: "Calidez tejida en el tejido",
    position: "center center",
  },
];

export default function EditorialWorld() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
  };

  const imgReveal = {
    hidden: { opacity: 0, scale: reduce ? 1 : 1.04 },
    show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } },
  };

  return (
    <section
      style={{
        background: "var(--navy-dark)",
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)",
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Heading */}
        <motion.div variants={fadeUp} style={{ marginBottom: "clamp(3rem, 6vw, 4.5rem)", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 300,
              fontSize: "9px",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "rgba(247,243,237,0.4)",
              marginBottom: "1rem",
            }}
          >
            {lang === "es" ? "El Mundo de" : "The World of"}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "var(--off-white)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            RIVBEL
          </h2>
          <div
            style={{
              width: "28px",
              height: "1px",
              background: "var(--burgundy)",
              margin: "1.5rem auto 0",
              opacity: 0.7,
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Photo grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(1rem, 2vw, 1.5rem)",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {EDITORIALS.map((ed, i) => (
            <motion.div
              key={i}
              variants={imgReveal}
              style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: i === 1 ? "3/4" : "2/3",
              }}
            >
              <img
                src={ed.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={900}
                height={1200}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: ed.position,
                  filter: "brightness(0.72) saturate(0.8)",
                  display: "block",
                  transition: "transform 0.7s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
              {/* Gradient overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(15,29,58,0.75) 0%, transparent 55%)",
                }}
              />
              {/* Caption */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    fontSize: "8px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "var(--off-white)",
                    margin: "0 0 0.3rem",
                  }}
                >
                  {lang === "es" ? ed.labelEs : ed.labelEn}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                    color: "rgba(247,243,237,0.7)",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {lang === "es" ? ed.captionEs : ed.captionEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
