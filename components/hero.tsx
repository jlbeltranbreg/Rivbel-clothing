"use client";

import { useRef } from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";
import { LogoMark } from "@/components/logo";

const sections = [
  {
    id: "s1",
    leftLabel: "I. España",
    title: "Heritage",
    rightLabel: "MDXXVI",
    background:
      "https://images.pexels.com/photos/31561516/pexels-photo-31561516.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "s2",
    leftLabel: "II. Artesanía",
    title: "Craft",
    rightLabel: "Timeless",
    background:
      "https://images.pexels.com/photos/31182768/pexels-photo-31182768.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "s3",
    leftLabel: "III. Elegancia",
    title: "Silence",
    rightLabel: "Restraint",
    background:
      "https://images.pexels.com/photos/29173859/pexels-photo-29173859.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "s4",
    leftLabel: "IV. Forma",
    title: "Everything",
    rightLabel: "Goes",
    background:
      "https://images.pexels.com/photos/20820040/pexels-photo-20820040.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "s5",
    leftLabel: "V. Summer Winds",
    title: "Collection",
    rightLabel: "Debut",
    background:
      "https://images.pexels.com/photos/5521552/pexels-photo-5521552.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

function HeroHeader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <LogoMark variant="dark" animate={true} width={56} />
    </div>
  );
}

export default function Hero() {
  const apiRef = useRef<FullScreenFXAPI>(null);

  return (
    <FullScreenScrollFX
      sections={sections}
      apiRef={apiRef}
      header={<HeroHeader />}
      footer={<div />}
      showProgress
      durations={{ change: 0.75, snap: 900 }}
      bgTransition="fade"
      parallaxAmount={5}
      colors={{
        text: "rgba(247, 243, 237, 0.95)",
        overlay: "rgba(15, 29, 58, 0.48)",
        pageBg: "#0F1D3A",
        stageBg: "#0F1D3A",
      }}
      fontFamily='"Playfair Display", "Cormorant Garamond", Georgia, serif'
    />
  );
}
