export const SIZE_CHARTS = {
  polo: {
    rows: [
      { labelEn: "Chest width",   labelEs: "Contorno de pecho",  vals: ["52", "54", "56", "58"] },
      { labelEn: "Front length",  labelEs: "Longitud delantera", vals: ["71", "73", "75", "77"] },
      { labelEn: "Sleeve length", labelEs: "Longitud de manga",  vals: ["21", "21.5", "22", "22.5"] },
    ],
  },
  shirt: {
    rows: [
      { labelEn: "Chest width",   labelEs: "Contorno de pecho",  vals: ["56", "58", "60", "62"] },
      { labelEn: "Front length",  labelEs: "Longitud delantera", vals: ["73", "74", "75", "76"] },
      { labelEn: "Sleeve length", labelEs: "Longitud de manga",  vals: ["63", "63.5", "64", "64.5"] },
    ],
  },
  // Legacy alias — kept for any existing references
  linenShirt: {
    rows: [
      { labelEn: "Chest width",   labelEs: "Contorno de pecho",  vals: ["56", "58", "60", "62"] },
      { labelEn: "Front length",  labelEs: "Longitud delantera", vals: ["73", "74", "75", "76"] },
      { labelEn: "Sleeve length", labelEs: "Longitud de manga",  vals: ["63", "63.5", "64", "64.5"] },
    ],
  },
} as const;

export type SizeChartKey = keyof typeof SIZE_CHARTS;
