"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function update() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? Math.min(scrolled / total, 1) : 0);
    }
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 300,
        background: "rgba(123,34,53,0.12)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct * 100}%`,
          background: "var(--burgundy)",
          transition: "width 0.08s linear",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}
