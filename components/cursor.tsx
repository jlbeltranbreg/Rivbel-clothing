"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function Cursor() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasPositioned = useRef(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const dotX  = useSpring(cursorX, { damping: 45, stiffness: 700, mass: 0.25 });
  const dotY  = useSpring(cursorY, { damping: 45, stiffness: 700, mass: 0.25 });
  const ringX = useSpring(cursorX, { damping: 26, stiffness: 240, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 26, stiffness: 240, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      hasPositioned.current = true;
      setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovered(!!(el.closest("a") || el.closest("button") || el.closest("[data-cursor-hover]")));
    };

    // Restore cursor when mouse re-enters the page after leaving (e.g. hitting browser chrome)
    const enter = () => { if (hasPositioned.current) setVisible(true); };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [reduce, cursorX, cursorY]); // `visible` intentionally excluded — prevents listener churn

  if (reduce) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY, position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 1.8 : 1 }}
        transition={{ opacity: { duration: 0.18 }, scale: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }}
      >
        <div style={{ width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid rgba(184,150,62,0.75)", background: hovered ? "rgba(184,150,62,0.06)" : "transparent", boxShadow: "0 0 0 1px rgba(0,0,0,0.08)" }} />
      </motion.div>

      {/* Center dot */}
      <motion.div
        style={{ x: dotX, y: dotY, position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 10000, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 0.5 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--burgundy)", boxShadow: "0 0 0 2px rgba(255,255,255,0.85), 0 0 6px rgba(0,0,0,0.25)" }} />
      </motion.div>
    </>
  );
}
