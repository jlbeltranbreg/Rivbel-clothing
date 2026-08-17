# Rivbel — Website Build Plan
**For: Claude Code (terminal build)**
**Prepared: July 2026**

This is a build brief, not marketing copy. Claude Code works directly from this file — architecture, design tokens, page-by-page content, and the Shopify/MCP tooling setup are all included below.

---

## 1. Positioning

Rivbel is a heritage menswear brand — castle-crest logo, navy and burgundy, "Tradition Worn." The nearest reference points Rivbel named are **Ralph Lauren** and **Lacoste**. For a site that reads as genuinely luxury rather than "nice Shopify template," three more references are worth studying directly, because each solves a different part of the problem:

| Brand | What to borrow |
|---|---|
| **Ralph Lauren** | Full-bleed cinematic photography as the hero; seasonal/collection storytelling framed as a "world," not a product grid; a slider of lifestyle moments low on the homepage rather than more product tiles. |
| **Brooks Brothers** | The heritage-badge move — "Heritage? We invented it." A single, confident claim of provenance placed near the top of the page, paired with archive-style facts (founding year, an invented category, a construction detail) instead of generic brand-speak. Rivbel's equivalent: the embroidery craft, the two-supplier production chain, the specific GSM weights. |
| **Loro Piana** | Restraint as the luxury signal. Minimal chrome, quiet motion, product presented almost alone against generous negative space, copy that talks about material and construction rather than adjectives. This is the most important reference for Rivbel at pre-launch size — it's achievable with four products and doesn't need Ralph Lauren's asset library to look expensive. |

**Working synthesis for Rivbel:** Loro Piana's restraint as the base, Ralph Lauren's storytelling structure for the homepage flow, Brooks Brothers' heritage-badge confidence for the craft section. Not a moodboard of three brands mashed together — pick the one register per section and hold it.

---

## 2. Design System (tokens — implement exactly)

### Color
```
--navy:        #1E2C50   /* primary ink, headers, nav */
--navy-deep:   #12192F   /* near-black navy, hero/footer backgrounds */
--burgundy:    #9B232B   /* accent only — CTAs, rules, hover states. Never a background fill larger than a button. */
--beige:       #F8F6F1   /* primary page background, "paper" */
--beige-warm:  #EFEAE0   /* alternate section background, card fields */
--white:       #FFFFFF   /* product card backgrounds, reversed text on navy */
--sage:        #7C8B6B   /* secondary accent — use sparingly for tags/labels */
--ink-70:      rgba(30,44,80,0.7)   /* secondary body text on beige */
```

Burgundy is a **spot color**, not a section background. Overusing it makes this look like a template. Single, deliberate hits only — a rule line, a button, a tag.

### Typography
- **Display:** `Fraunces` (Google Fonts) — weight 600 standard, 900 italic for emphasis
- **Body / UI:** `Inter` — paragraphs, nav, buttons, labels
- **Eyebrow / label:** Inter, uppercase, 12–13px, `letter-spacing: 0.14em`

### Layout & motion principles
- Full-bleed photography sections, generous whitespace, no rounded corners
- Hairline rules (1px, navy or burgundy) as the only dividers — no drop shadows, no card elevation
- Slow fade/rise on scroll-into-view; no parallax gimmicks, no autoplaying carousels
- Mobile-first: 60–70% of fashion traffic is mobile

---

## 3. Site Architecture

```
/                        Home
/collection              "Drop 01" — all four products
/products/ocaso-navy-polo
/products/olivo-polo
/products/sevilla-blanc-oxford
/products/riviera-sage-linen
/craft                   Materials & construction
/story                   Brand story / About
/contact                 Waitlist / stockist inquiries
```

---

## 4. Page-by-Page Content Brief

### Home
1. **Hero** — full-bleed, "Tradition Worn." tagline, "DROP 01" eyebrow, one CTA: "Explore the Collection"
2. **Heritage strip (craft-band)** — scannable row of archive-style facts: fabric weights, embroidery placement, supplier discipline. Not a paragraph.
3. **The Collection** — 4-product grid linking to PDPs
4. **Story panel** — split layout, Fraunces italic pull-quote, supporting paragraph, lifestyle image
5. **Footer** — crest mark, tagline, email capture, minimal social row

### /collection
Grid of the four garments. Each card links to its PDP.

### Product pages (×4)
- Large product photography + detail shots
- Product name + one-line description
- Fabric spec block (composition, GSM, construction from §5)
- Size guide
- "Details" accordion: embroidery placement, inner-collar detail, care instructions
- CTA: "Join the List" (pre-launch framing — not "Shop Now")

### /craft
Brooks Brothers heritage-badge done properly: exact embroidery specs (2.5×3cm castle crest, gold thread), placement measurements (polo: 20cm from shoulder / 10cm from center; shirt: 42cm from shoulder / 13cm from center), woven inner-collar label, "Heritage with Style" inner-collar embroidery on shirts. Treat like a spec plate, not ad copy.

### /story
Brand concept ("Relaxed Elegance"), customer profile, Spain × Mexico founding narrative.

### /contact
Simple waitlist/stockist form. CTAs read "Join the List" until Drop 01 ships.

---

## 5. Brand Facts (ground truth — do not invent details beyond this list)

- Tagline: **"Tradition Worn"**; secondary: **"Heritage with Style"** (inner-collar embroidery on shirts)
- Brand concept: **"Relaxed Elegance"** — traditional tailoring heritage + youthful cuts
- Logo: navy castle crest + "RIVBEL" wordmark + burgundy underline rule
- Embroidery: castle crest, **2.5cm × 3cm**
  - Polo chest: 20cm from shoulder seam, 10cm from center/buttons
  - Shirt chest: 42cm from shoulder, 13cm from center
  - Gold thread on navy polo; "Heritage with Style" inner-collar on shirts only
- Every garment carries a woven Rivbel label at the inner collar

**Drop 01 — four products:**
| Product | Slug | Fabric | Weight |
|---|---|---|---|
| Ocaso Navy Polo | ocaso-navy-polo | 100% Cotton Piqué | 200–230 g/m² |
| Olivo Polo | olivo-polo | 100% Cotton Piqué | 200–230 g/m² |
| Sevilla Blanc Oxford Shirt | sevilla-blanc-oxford | 100% Cotton Oxford | 140–170 g/m² |
| Riviera Sage Linen Shirt | riviera-sage-linen | 100% Linen | 130–150 g/m² |

- Production chain: Oltex (intermediary, contact Fernando) → Nextdrop (production/embroidery, contact Pablo)

---

## 6. Shopify Setup

### Theme Recommendation
| Option | When to use |
|---|---|
| **Prestige (Maestrooo, ~$350–380, OS 2.0)** | **Recommended.** Purpose-built for luxury/high-end fashion. |
| **Dawn (free, Shopify's own OS 2.0)** | Budget fallback; needs real investment in custom sections. |

### MCP & Terminal Setup

```bash
# Install Shopify Dev MCP (read-only, no auth needed)
claude mcp add --transport stdio shopify-dev-mcp -- npx -y @shopify/dev-mcp@latest

# Install Shopify CLI (when ready to push to a real store)
npm install -g @shopify/cli
shopify auth login
shopify theme dev        # local preview
shopify theme check      # Liquid linter — run before every push
shopify theme push --unpublished  # push for review, never push --live
```

### Guardrails
- Never run `shopify theme push --live` — always push to a named, unpublished theme
- Run `shopify theme check --fail-level error` before any push
- Human review required in Shopify admin before publishing

---

## 7. Open Items

- **Pricing** — placeholder pricing in place; update when set
- **Photography** — current assets are flat product mockups; hero/lifestyle needs real photography
- **Sizing** — size chart defined (see `lib/size-charts.ts`); confirm with production partner
- **Launch date** — determines whether CTAs read "Shop Now" or "Join the List"
- **Domain / Shopify store handle** — needed before any live-store steps apply

---

*This document is the spec. Claude Code works from this file for architecture, design tokens, page content, and tooling.*
