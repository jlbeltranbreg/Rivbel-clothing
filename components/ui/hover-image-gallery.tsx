"use client";

import { useState } from "react";
import { LogoMark } from "@/components/logo";

/* ─── RIVBEL Branded Cursor ─── */
function RivbelCursor({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const bg =
    variant === "dark"
      ? "rgba(15, 28, 51, 0.85)"
      : "rgba(247, 243, 237, 0.85)";
  const border = "var(--burgundy)";

  return (
    <div
      style={{
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        background: bg,
        border: `1px solid ${border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
      }}
    >
      <LogoMark
        variant={variant === "dark" ? "dark" : "light"}
        animate={false}
        className="scale-75"
      />
    </div>
  );
}

/* ─── Variant A: Portrait editorial (480×600) ─── */
interface HoverImageGalleryProps {
  images?: string[];
  cursorVariant?: "dark" | "light";
  className?: string;
  /** Override the image container dimensions. Defaults to 480×600. */
  containerWidth?: string;
  containerHeight?: string;
}

const DEFAULT_IMAGES = [
  "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&h=900",
  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=900",
];

export function HoverImageGallery({
  images = DEFAULT_IMAGES,
  cursorVariant = "dark",
  className = "",
  containerWidth = "480px",
  containerHeight = "600px",
}: HoverImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    const idx = Math.floor((x / rect.width) * images.length);
    setCurrentImageIndex(Math.max(0, Math.min(images.length - 1, idx)));
  };

  return (
    <div className={`relative group ${className}`}>
      <div
        className="relative overflow-hidden cursor-none"
        style={{ width: containerWidth, height: containerHeight }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={images[currentImageIndex]}
          alt={`RIVBEL — image ${currentImageIndex + 1} of ${images.length}`}
          className="w-full h-full object-cover transition-all duration-100 ease-out"
        />

        {/* Sepia warm overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--sepia)",
            pointerEvents: "none",
          }}
        />

        {isHovering && (
          <div
            className="absolute pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: mousePosition.x, top: mousePosition.y }}
          >
            <RivbelCursor variant={cursorVariant} />
          </div>
        )}
      </div>

      {/* Counter */}
      <div
        style={{
          fontFamily: "var(--font-cormorant)",
          fontWeight: 300,
          fontSize: "13px",
          letterSpacing: "0.15em",
          color: "var(--warm-grey)",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        {String(currentImageIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ─── Variant B: Dark editorial with burgundy frame ─── */
export function HoverImageGalleryDark({
  images = DEFAULT_IMAGES,
  className = "",
}: HoverImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    const idx = Math.floor((x / rect.width) * images.length);
    setCurrentImageIndex(Math.max(0, Math.min(images.length - 1, idx)));
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ padding: "12px", background: "var(--navy-dark)" }}
    >
      {/* Burgundy frame */}
      <div
        style={{
          position: "absolute",
          inset: "4px",
          border: "1px solid var(--burgundy)",
          pointerEvents: "none",
          zIndex: 2,
          opacity: 0.5,
        }}
      />

      <div
        className="relative overflow-hidden cursor-none"
        style={{ width: "480px", height: "600px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={images[currentImageIndex]}
          alt={`RIVBEL — image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-100"
          style={{ filter: "brightness(0.88) contrast(1.05)" }}
        />

        {/* Navy-sepia overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15,28,51,0.12)",
            pointerEvents: "none",
          }}
        />

        {isHovering && (
          <div
            className="absolute pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: mousePosition.x, top: mousePosition.y }}
          >
            <RivbelCursor variant="light" />
          </div>
        )}
      </div>

      {/* Counter */}
      <div
        style={{
          fontFamily: "var(--font-cormorant)",
          fontWeight: 300,
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "var(--warm-grey)",
          marginTop: "10px",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {currentImageIndex + 1} &middot; {images.length}
      </div>
    </div>
  );
}

/* ─── Variant C: Full-width landscape ─── */
interface HoverImageGalleryLandscapeProps {
  images?: string[];
  height?: string;
}

const LANDSCAPE_IMAGES = [
  "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

export function HoverImageGalleryLandscape({
  images = LANDSCAPE_IMAGES,
  height = "65vh",
}: HoverImageGalleryLandscapeProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setMousePosition({ x, y: e.clientY - rect.top });
    const idx = Math.floor((x / rect.width) * images.length);
    setCurrentImageIndex(Math.max(0, Math.min(images.length - 1, idx)));
  };

  return (
    <div
      className="relative overflow-hidden cursor-none w-full"
      style={{ height }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={images[currentImageIndex]}
        alt={`RIVBEL editorial — ${currentImageIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-100"
        style={{ filter: "brightness(0.82)" }}
      />

      {/* Sepia + navy gradient at bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 50%, rgba(15,28,51,0.6) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Thin burgundy horizontal scan line — shows which zone is active */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${(currentImageIndex / images.length) * 100}%`,
          width: `${100 / images.length}%`,
          borderLeft: "1px solid rgba(124,32,53,0.5)",
          borderRight: "1px solid rgba(124,32,53,0.5)",
          background: "rgba(124,32,53,0.04)",
          pointerEvents: "none",
          transition: "left 0.1s ease",
        }}
      />

      {isHovering && (
        <div
          className="absolute pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: mousePosition.x, top: mousePosition.y }}
        >
          {/* Larger cursor for landscape */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(15, 28, 51, 0.8)",
              border: "1px solid var(--burgundy)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(12px)",
            }}
          >
            <LogoMark variant="dark" animate={false} />
          </div>
        </div>
      )}

      {/* Zone indicators at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "6px",
          zIndex: 2,
        }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentImageIndex ? "20px" : "6px",
              height: "1.5px",
              background:
                i === currentImageIndex
                  ? "var(--off-white)"
                  : "rgba(247,243,237,0.35)",
              transition: "width 0.15s ease, background 0.15s ease",
              borderRadius: "1px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
