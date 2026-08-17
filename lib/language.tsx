"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "es";

const t = {
  en: {
    nav: {
      shop: "Shop",
      collections: "Collections",
      story: "Our Story",
      journal: "Journal",
      cta: "Summer Winds",
    },
    opener: {
      slogan: ["Tradition", "Worn."],
      sub: "España · México · MMXXVI",
      cta: "Discover the Collection",
    },
    manifesto: {
      quote: "“It takes the thinking out of dressing well.”",
      tag: "RIVBEL · España · México · MMXXVI",
      epigraphAttr: "Morante de la Puebla",
    },
    collection: {
      label: "New Arrival",
      title: "Summer Winds",
      brezza: "Sprezzatura — the art of dressing without effort.",
      cta: "Shop Summer Winds",
      discover: "Discover",
    },
    spotlight: {
      label: "Summer Winds · New Arrival",
      material: "Cotton Piqué",
      quote: "“Everything goes with everything.\nThat’s the whole point.”",
      brezzaTitle: "Sprezzatura",
      brezzaBody:
        "The Italian art of studied carelessness. The RIVBEL philosophy — clothes that work without asking you to think about them. Reach for the right piece. Already dressed.",
      hint: "Move cursor to explore",
      discover: "Discover",
    },
    story: {
      label: "I. España",
      chapter: "Our Story · EST. MMXXVI",
      heading: ["Born from", "Spain."],
      pull: "“Tradition isn’t about the past. It’s about knowing what endures.”",
      body1:
        "Every season, a new brand. Another drop. Labels built for the moment — streetwear cycling through the same rotation, none of them saying anything new. And yet the polo, the linen shirt, the pieces worn for a century on the courts of Spain and the fields of England, kept being left to houses that had stopped listening.",
      body2:
        "RIVBEL was born from that gap. Rooted in Spanish craftsmanship, shaped by two cultures. For the man who doesn’t overthink getting dressed — who reaches for something in the morning already knowing it’s right. Classical menswear, properly made.",
      fabricLabel: "Fabric",
      fabricVal: "European certified mills",
      productionLabel: "Production",
      productionVal: "Limited quantities",
      foundedLabel: "Founded",
      foundedVal: "España · México",
    },
    founders: {
      label: "The Founders",
      country1: "España",
      country2: "México",
      narrative:
        "Two founders, two cultures, one wardrobe. José Luis brings the rigour of Spain — centuries of craftsmanship, the discipline of the bullring, the elegance of Castilian tailoring. Rodrigo brings the warmth of Mexico — the colour of its markets, the generosity of its people, the pride of its heritage. Different roots. The same standard.",
      epigraphAttr: "Andrés Roca Rey · Torero",
      bottom: "España · México · MMXXVI",
    },
    footer: {
      navHeader: "Navigation",
      connectHeader: "Connect",
      collectionsHeader: "Collections",
      copyright: "© MMXXVI RIVBEL · Tradition Worn · España · México",
    },
  },
  es: {
    nav: {
      shop: "Tienda",
      collections: "Colecciones",
      story: "Historia",
      journal: "Diario",
      cta: "Vientos de Verano",
    },
    opener: {
      slogan: ["Tradición", "Vestida."],
      sub: "España · México · MMXXVI",
      cta: "Descubrir la Colección",
    },
    manifesto: {
      quote: "“Viste bien sin pensarlo.”",
      tag: "RIVBEL · España · México · MMXXVI",
      epigraphAttr: "Morante de la Puebla",
    },
    collection: {
      label: "Nueva Entrega",
      title: "Vientos de Verano",
      brezza: "Sprezzatura — vestir sin esfuerzo.",
      cta: "Ver la colección",
      discover: "Descubrir",
    },
    spotlight: {
      label: "Vientos de Verano · Nueva Entrega",
      material: "Piqué de Algodón",
      quote: "“Todo armoniza.\nEso es lo que importa.”",
      brezzaTitle: "Sprezzatura",
      brezzaBody:
        "El arte italiano del descuido estudiado. La filosofía RIVBEL: ropa que funciona sin pedirte que pienses. Alcanza la prenda correcta. Ya estás vestido.",
      hint: "Mueve el cursor para explorar",
      discover: "Descubrir",
    },
    story: {
      label: "I. España",
      chapter: "Nuestra Historia · EST. MMXXVI",
      heading: ["Nacida de", "España."],
      pull: "“La tradición no es el pasado. Es saber qué perdura.”",
      body1:
        "Cada temporada trae una marca nueva. Otra colección. Etiquetas construidas para el instante — la moda urbana girando siempre en la misma órbita, sin decir nada nuevo. Y sin embargo el polo, la camisa de lino, las prendas que llevan un siglo en las pistas de España y los campos de Inglaterra, seguían en manos de casas que habían dejado de escuchar.",
      body2:
        "RIVBEL nació de ese hueco. Raíces en la artesanía española, formada por dos culturas. Para el hombre que no da más vueltas de las necesarias a lo que viste — que abre el armario por la mañana y ya sabe. Ropa clásica, bien hecha.",
      fabricLabel: "Tejido",
      fabricVal: "Telares europeos certificados",
      productionLabel: "Producción",
      productionVal: "Tiradas limitadas",
      foundedLabel: "Fundada",
      foundedVal: "España · México",
    },
    founders: {
      label: "Los Fundadores",
      country1: "España",
      country2: "México",
      narrative:
        "Dos fundadores, dos culturas, un armario. José Luis trae el rigor de España — siglos de artesanía, la disciplina del ruedo, la elegancia del corte castellano. Rodrigo trae el calor de México — el color de sus mercados, la generosidad de su gente, el orgullo de su herencia. Raíces distintas. El mismo criterio.",
      epigraphAttr: "Andrés Roca Rey · Torero",
      bottom: "España · México · MMXXVI",
    },
    footer: {
      navHeader: "Navegación",
      connectHeader: "Contacto",
      collectionsHeader: "Colecciones",
      copyright: "© MMXXVI RIVBEL · Tradición Vestida · España · México",
    },
  },
} as const;

export type Translations = (typeof t)[Lang];

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: Translations;
}

const LanguageContext = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  tr: t.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
