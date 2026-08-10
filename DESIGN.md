---
name: Uswah
description: Practical guidance for real situations, drawn from the original source
colors:
  ground: "#faf8f4"
  surface: "#ffffff"
  ink: "#14181f"
  muted: "#59606c"
  faint: "#8a919c"
  rule: "#e3ded4"
  accent: "#7d2b1d"
  ground-dark: "#0e1116"
  surface-dark: "#161a21"
  ink-dark: "#ece8e1"
  muted-dark: "#9aa2ad"
  faint-dark: "#6d757f"
  rule-dark: "#262c35"
  accent-dark: "#e08d7a"
  scrim: "rgba(8, 10, 14, 0.88)"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(1.7rem, 4.4vw, 2.8rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.012em"
  display-arabic:
    fontFamily: "Thmanyah Serif Display, Thmanyah Serif Text, serif"
    fontSize: "clamp(1.7rem, 4.4vw, 2.8rem)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.06rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  body-arabic:
    fontFamily: "Thmanyah Serif Text, system-ui, sans-serif"
    fontSize: "1.06em"
    fontWeight: 400
    lineHeight: 1.9
    letterSpacing: "normal"
  scripture:
    fontFamily: "Noto Naskh Arabic, serif"
    fontSize: "1.32rem"
    fontWeight: 400
    lineHeight: 2.15
    letterSpacing: "normal"
  meta:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  xs: "3px"
  sm: "5px"
  md: "8px"
  lg: "10px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.85rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "3.5rem"
components:
  card:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  hero:
    backgroundColor: "{colors.scrim}"
    textColor: "#f4f1ea"
    rounded: "{rounded.lg}"
  source-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.scripture}"
    rounded: "{rounded.md}"
    padding: "1.6rem 1.75rem"
  topic-pill:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 1rem"
  grade-chip:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.pill}"
    padding: "0.15rem 0.55rem"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.3rem"
---

## Overview

Uswah is a bilingual reading surface. Somebody arrives mid-problem, reads for one to three
minutes, and leaves with one thing to do. The design serves that and nothing else.

Two references shape it. Qalam supplies the editorial structure: full-bleed artwork, a
category and read-time line, rows of three, feature strips that break the rhythm. Thmanyah
supplies the Arabic register: RTL as the native direction rather than a mirrored
afterthought, warm ground, restrained chrome, and the typeface itself.

The mode is **Read**. Every decision below answers to comprehension first, and to
distinctiveness only where distinctiveness does not cost comprehension.

## Colors

A warm off-white ground, near-black ink, and a single oxblood accent. The warmth matters:
the artwork is aged manuscript painting and colourised photography, and a cold grey ground
makes it look like scanned documents rather than objects.

The accent appears at most three times per screen: the category on a card, the takeaway
label, the source reference. It is never a fill, never a button background, never a bar.

Dark is a designed counterpart rather than an inversion. Its ground is a blue-leaning
near-black so the same artwork sits on it without a colour cast, and the accent lightens to
a warm clay so it stays legible without glowing.

Every colour is a token defined on bare `:root`, redefined under
`@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and
again under `:root[data-theme="dark"]`. Nothing is declared only inside one of those blocks.

## Typography

Four faces, each with one job.

**Newsreader** sets Latin headings. An editorial serif, chosen against Inter carrying the
small type, so the register is a publication rather than an app.

**Thmanyah Serif Display** sets Arabic headings and **Thmanyah Serif Text** sets Arabic
interface and body. Arabic runs at 1.06em and line-height 1.9 against Latin's defaults,
because at equal visual weight the script needs more room or diacritics collide with the
line above.

**Noto Naskh Arabic** is reserved for Quran and hadith and appears nowhere else. That
reservation is the point: scripture is visually distinct from the commentary around it, so
you can tell at a glance which words are the source.

**Inter** carries small type in both directions: the category and read-time line, labels,
licence chips.

The category line is uppercase with wide tracking in Latin and neither in Arabic, since
Arabic has no uppercase and letter-spacing damages joined script.

## Layout

A 5xl column with a 6-unit gutter. Content sits in three widths: full column for grids and
bands, 40rem for the reading measure on a situation, and text blocks capped near 65
characters.

Rows are `repeat(auto-fit, minmax(15rem, 1fr))`, so three-up becomes two-up then one-up
without breakpoints. Qalam's density is deliberately not copied: their rows carry more
items because their reads are nine to twenty-five minutes and ours are one to three.

Topic and category pages load more on scroll. The home page does not, because a curated
front that scrolls forever buries the choices it exists to make.

## Elevation & Depth

Almost none. One inset surface, the source block, distinguished by a hairline and a
slightly lighter fill rather than a shadow. Artwork gets a radius and no border.

The only true depth is the scrim under hero and band type, a bottom-weighted gradient that
exists so text stays legible over any artwork rather than to darken for its own sake.

## Shapes

Radii step 3, 5, 8, 10 and pill. Artwork takes 5 to 8, hero and band take 10, chips and
quiet buttons take the pill. Circular thumbnails appear in one place, the secondary rail,
where the change of shape marks a change of role.

## Components

**Card** — artwork at 4:3, category line, title, summary. The repeated unit; the whole grid
is these.

**Round card** — same content, circular artwork, centred. Used once per page at most.

**Hero and band** — artwork with a bottom-anchored scrim and type over it. The band exists
to break a run of grids, not to promote anything.

**Source block** — the centre of a situation page. Naskh at reading size, the translation
below in the body face, translator named, reference in the accent. When the source is
sample data it switches to a dashed border and faint text, so unverified content cannot be
mistaken for verified.

**Takeaway** — a hairline above, a small accent label, and the sentence set in the display
face a size up. It is the line people screenshot, so it is set as a pulled statement rather
than a callout box.

**Grade chip** — the grading vocabulary made visible: Quran, Sahih, Hasan, Disputed,
Historical. Semantic colour, separate from the accent.

## Do's and Don'ts

**Do** reserve Naskh for scripture. **Do** carry the credit line with every image; it is a
condition of using the archive, not a caption. **Do** let RTL change what is set, not only
which side it sits on: the Arabic page shows the original and drops the English
translation.

**Don't** put a coloured bar down the side of anything. **Don't** use em dashes in UI copy;
Arabic does not use them at all. **Don't** add a second accent. **Don't** let the accent
become a fill. **Don't** copy Qalam's row density, their wordmark, or their red.
