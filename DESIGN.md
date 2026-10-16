---
name: La Piccola Gelateria
description: An artisan Amalfi gelateria on cream and white, held together by navy type and hand-painted majolica ceramic punctuation.
colors:
  navy: "#123b66"
  cobalt: "#155ca2"
  lemon: "#ffd84d"
  cream: "#fff9ec"
  white: "#ffffff"
  leaf: "#577a50"
  ink-soft: "#416181"
  ink-faint: "#54708c"
  lemon-wash: "#fff0c0"
  sea-wash: "#ecece6"
  cream-2: "#eaf0f7"
typography:
  display:
    fontFamily: "Bodoni Moda, Bodoni Fallback, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.5rem, 1.9rem + 3vw, 4.25rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Bodoni Moda, Bodoni Fallback, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.125rem, 1.7rem + 2vw, 3.375rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.012em"
  title:
    fontFamily: "Bodoni Moda, Bodoni Fallback, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.375rem, 1.25rem + 0.6vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.012em"
  body:
    fontFamily: "DM Sans, DM Sans Fallback, system-ui, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.6
  lede:
    fontFamily: "DM Sans, DM Sans Fallback, system-ui, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1.07rem + 0.3vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "DM Sans, DM Sans Fallback, system-ui, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem)"
    fontWeight: 600
    lineHeight: 1.1
rounded:
  sm: "4px"
  md: "0.75rem"
  lg: "1.25rem"
  pill: "99px"
  round: "50%"
spacing:
  gutter: "clamp(1.25rem, 0.6rem + 3.2vw, 2.5rem)"
  section: "clamp(4rem, 2.6rem + 6vw, 8rem)"
  max: "75rem"
  measure: "66ch"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.cream}"
    typography: "{typography.body}"
    rounded: "0.7rem"
    padding: "0.7rem 1.5rem"
    height: "3rem"
  button-cobalt:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.cream}"
    rounded: "0.7rem"
    padding: "0.7rem 1.5rem"
  button-lemon:
    backgroundColor: "{colors.lemon}"
    textColor: "{colors.navy}"
    rounded: "0.7rem"
    padding: "0.7rem 1.5rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "0.7rem"
    padding: "0.7rem 1.5rem"
  button-ghost-hover:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.cream}"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 1.1rem"
    height: "2.6rem"
  tab-active:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.cream}"
  chip-lemon:
    backgroundColor: "{colors.lemon}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "0.15rem 0.7rem"
  frame-photo:
    backgroundColor: "{colors.cream}"
    rounded: "1rem"
    padding: "0.7rem"
---

# Design System: La Piccola Gelateria

## Overview

**Creative North Star: "The Majolica Counter"**

A modern editorial site on warm cream and white, where hand-painted majolica ceramic appears only as punctuation: a framed photograph, a tilted tile, a floral band between page and footer. Type is navy Bodoni Moda over DM Sans, with italic cobalt emphasis inside headings. Sections breathe (4rem to 8rem vertical rhythm) and alternate between cream, white and a pale blue wash, with one navy atmospheric break and a navy footer.

The system is warm and handmade rather than glossy. Ceramic details are slightly rotated stickers with soft shadows; photographs sit inside navy-and-cobalt double-line frames, like glazed plates. The pattern is never wallpaper: the wave pattern appears only as a masked tint on navy.

**Key Characteristics:**
- Cream (#fff9ec) ground, navy for type and anchoring bands, cobalt for links and emphasis, lemon in small doses.
- Bodoni Moda display with italic cobalt emphasis; DM Sans body.
- Double-line ceramic frame (navy outer, cobalt inner) as the signature container.
- Round "plate" rims, arched window, tilted tiles and seal.
- Squared-off 0.7rem buttons that gain a lemon ring on hover.
- Flat at rest; soft navy-tinted shadows only on sticker-like ceramic and collage pieces.

## Colors

A Mediterranean palette: sea navy and cobalt on sun-warmed cream, with lemon as a bright accent and one leaf green for "open now".

### Primary
- **Mediterranean Navy** ({colors.navy}): all body and heading text, dark sections (`.dark`), footer, primary buttons, frame outer lines, announcement bar.
- **Glazed Cobalt** ({colors.cobalt}): italic heading emphasis, frame inner lines, focus ring, secondary CTA (header Find Us), pull-quote asides.

### Secondary
- **Amalfi Lemon** ({colors.lemon}): small accents only: link underline sweep, active nav bar, chips, selection, focus ring on dark, lemon button on navy, bullet dots, section highlight.

### Tertiary
- **Leaf** ({colors.leaf}): the open-now status dot and the "dairy-free" chip tint; nothing else.

### Neutral
- **Cream** ({colors.cream}): default page ground, text on dark.
- **White** ({colors.white}): alternating sections (flavours, visit, journal) and photo borders.
- **Soft Ink** ({colors.ink-soft}): secondary body text, derived as navy 80% over cream.
- **Faint Ink** ({colors.ink-faint}): metadata, captions, crumbs; navy 72% over cream.
- **Lemon Wash** ({colors.lemon-wash}): plate discs, today row, active ingredient highlight, targeted menu item.
- **Sea Wash** ({colors.sea-wash}) and **Pale Cobalt Wash** ({colors.cream-2}): quiet tinted section grounds (story) and image placeholders.
- Hairlines: navy at 16% (`--line`) and 30% (`--line-strong`).

### Named Rules
**The Punctuation Rule.** Lemon is a small accent, never a section ground. Ceramic ornament punctuates; it never tiles behind content except as a masked tint on navy.
**The Navy Ink Rule.** Text is navy (or its soft/faint derivations), never black or grey.

## Typography

**Display Font:** Bodoni Moda (Bodoni Fallback metric-matched to Georgia, then serif)
**Body Font:** DM Sans (DM Sans Fallback metric-matched to Arial, then system-ui)

**Character:** High-contrast Didone headings give editorial and tile-lettering polish; DM Sans keeps phone reading clear. Both are self-hosted variable woff2 files.

### Hierarchy
- **Display** (500, 2.5rem to 4.25rem fluid, 1.04): the single H1 per page, balanced wrap, hero max 11ch.
- **Headline** (500, 2.125rem to 3.375rem, 1.1): H2 section titles.
- **Title** (500, 1.375rem to 1.75rem, 1.2): H3, flavour names, ingredient names, addresses.
- **Body** (400, 1rem to 1.0625rem, 1.6): paragraphs; prose measure 66ch; lede 52ch at 1.125rem to 1.3125rem.
- **Label** (600, 0.8125rem to 0.875rem): buttons (small), tabs, captions; smaller 0.75rem is used for chips and hours pills.
- Italic Bodoni Moda at title/step-1 scale is the voice for asides, quotes and counts.

### Named Rules
**The Italic Cobalt Rule.** Emphasis inside a heading is `em`: italic, weight 500, cobalt (lemon on navy). No bold emphasis in headings.

## Layout

Container is `min(100% - 2 * gutter, 75rem)` with a fluid gutter (1.25rem to 2.5rem); a narrow 52rem container exists for reading pages. Sections use the fluid `--section` padding. Pages are editorial two-column splits (roughly 0.85fr to 1.15fr, gap 2.5rem to 6rem, centred vertically) that collapse to one column at 62rem, with copy before art on mobile. Flavours appear as a three-up plate grid (two-up under 62rem) with a staggered middle row. The gallery is a 6-column mosaic on a clamped row height, 2-column under 40rem. Header is sticky, cream at 94% with 10px blur, 4.5rem tall (4rem mobile); below 62rem navigation moves to a full-screen navy sheet. Gelato menu has a sticky filter bar under the header.

## Elevation & Depth

Flat by default, with tonal alternation between cream, white and wash grounds for separation and hairlines for structure. Shadows are reserved for ceramic stickers and collage prints.

### Shadow Vocabulary
- **Sticker** (`filter: drop-shadow(0 8px 14px navy 22%)`): tilted tiles, seal, sprigs.
- **Print** (`box-shadow: 0 18px 30px -18px navy 45%`): collage photographs, note cards (soft, offset downward, negative spread).
- **Plate rim** (`box-shadow: 0 0 0 5px white`, or `0 0 0 4px cream, 0 0 0 6px cobalt` on menu items): ring layers, not depth.
- **Open dot halo** (`0 0 0 4px leaf 22%`).

### Named Rules
**The Soft Sticker Rule.** Shadows are blurred and navy-tinted. Hard offset shadows have no place here.

## Shapes

Soft and glazed. Buttons 0.7rem; cards, photos and frames 0.5rem to 1rem; frames use a 5px navy border with a 2px cobalt inner line inset about 0.26rem. The hero is an arch (50% top corners over 1.2rem bottom, 6px navy border). Flavour photos sit on round plates (50%, 5px navy border). Chips and tabs are full pills (99px). Small rotations (-9deg to 10deg) mark stickers.

## Components

### Buttons
- **Shape:** squared plaque, 0.7rem radius, 2px border, min-height 3rem (2.5rem small).
- **Primary:** navy fill, cream text, DM Sans 600, padding 0.7rem 1.5rem.
- **Variants:** cobalt (header Find Us), lemon with navy text (on dark), ghost (navy outline, fills on hover), ghost-light (on navy).
- **Hover / Focus:** a 2px ring in a contrasting accent appears at 3px offset, 1px lift, trailing icon nudges 3px. Focus-visible is a 3px cobalt outline (lemon on dark).

### Text links
Semibold with a lemon underline bar that sweeps to a full highlight on hover; arrow variant slides 4px.

### Chips and tabs
- Tabs: pill, 2px navy outline, filled navy with cream text when active.
- Chips: pills, 0.75rem semibold; lemon (today/new), leaf tint (dairy-free), sea-wash with cobalt text (seasonal), outlined neutral default.

### Cards / Containers
- **Ceramic frame:** cream, 5px navy border, 1rem radius, 0.7rem padding, cobalt inner line. Holds photographs.
- **Plate:** round photo disc on lemon wash with navy rim, centred name in Bodoni and a muted description.
- **Menu item:** hairline top rule, 6.5rem round plate with navy/cobalt rings, title, description, chips.
- **Note card:** cream, 2px cobalt border, 1px navy inner outline, slight rotation, italic Bodoni quote.

### Navigation
Desktop: DM Sans 500 links with a 3px lemon underline that scales in on hover and for the active page. Mobile: bordered 3rem hamburger opening a navy full-screen sheet with Bodoni links at 1.75rem to 2.25rem, a masked cobalt wave pattern at the foot, and a lemon Find Us button.

### Hours table
Hairline rows, today highlighted with lemon wash and a small navy "today" pill.

### Ceramic band
A repeating floral ceramic strip (1.5rem to 2.25rem tall) divides content from the footer and each inner page header.

### Signature: Majolica tiles
Tile, seal and sprig illustrations placed at the corners of art, rotated, with Sticker shadow, never in text flow.

## Do's and Don'ts

### Do:
- **Do** set page ground to cream and alternate with white or the pale washes.
- **Do** frame photographs in the navy and cobalt double-line frame, a plate, or the arch.
- **Do** use Bodoni Moda with an italic cobalt `em` for headings and DM Sans for everything else.
- **Do** keep lemon to small accents and use navy for dark sections and the footer.
- **Do** keep content visible by default; reveal motion is enhancement only and honours reduced motion.
- **Do** keep tap targets at least 2.5rem tall and focus rings always visible.

### Don't:
- **Don't** tile ceramic patterns behind content; the wave pattern appears only as a masked tint on navy.
- **Don't** add cartoon lemons, Italian-restaurant clichés, or beige luxury tones.
- **Don't** use black, grey or pure cream text on cream.
- **Don't** use hard offset shadows; shadows stay soft and navy-tinted.

## Not canonized (build defects, not rules)
- The footer column headings are tracked uppercase small labels in lemon; this is a label-style device and is not a pattern for new surfaces.
- The "→" link arrow is a text glyph; new arrows should use inline SVG as the nav and buttons do.
- The hero seal runs an infinite sway animation, and chips and pills drop to 0.7rem to 0.75rem, below the label step.
