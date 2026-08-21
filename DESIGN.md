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
  ground-dark: "#15171c"
  surface-dark: "#1d2027"
  ink-dark: "#e3dfd8"
  muted-dark: "#a8afba"
  faint-dark: "#868e9a"
  rule-dark: "#2b303a"
  accent-dark: "#ec7a5c"
  scrim-hero: "rgba(8, 10, 14, 0.5)"
  scrim-band: "linear-gradient(to top, rgba(8, 10, 14, 0.86), rgba(8, 10, 14, 0.1))"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2.4rem, 6.4vw, 4.2rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.012em"
  display-arabic:
    fontFamily: "Thmanyah Serif Display, Thmanyah Serif Text, serif"
    fontSize: "clamp(2.4rem, 6.4vw, 4.2rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
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
  circle: "50%"
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
    rounded: "{rounded.lg}"
  hero:
    backgroundColor: "{colors.scrim-hero}"
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
  sort-button:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.85rem"
  byline-flag:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.pill}"
    padding: "0.1rem 0.6rem"
---

## Overview

Uswah is a trilingual reading surface — English, Arabic and Turkish. Somebody arrives
mid-problem, reads for one to three minutes, and leaves with one thing to do. The design
serves that and nothing else.

Two references shape it. Qalam supplies the editorial structure: a centred masthead,
full-bleed artwork, centred section headings, a read-time line, rows of three, feature
strips that break the rhythm. Thmanyah supplies the Arabic register: RTL as the native
direction rather than a mirrored afterthought, warm ground, restrained chrome, and the
typeface itself. It also supplies one principle worth naming — a shape means something, or
it is decoration.

The mode is **Read**. Every decision below answers to comprehension first, and to
distinctiveness only where distinctiveness does not cost comprehension.

## Colors

A warm off-white ground, near-black ink, and a single oxblood accent. The warmth matters:
the artwork is aged manuscript painting and colourised photography, and a cold grey ground
makes it look like scanned documents rather than objects.

The accent appears at most three times per screen: the category on a card, the takeaway
label, the source reference. It is never a fill, never a button background, never a bar.

Dark is tuned for reading rather than inverted from light. Two rules drive it: the ground
is never pure black and the text is never pure white, because 21:1 on an OLED makes serif
stems bloom. Body text lands near 13:1, the quietest caption grey at 5.4:1, and the accent
holds 6.4:1 on the ground and 5.8:1 on a card — so every pair clears WCAG AA. The accent
drops in lightness rather than desaturating, so it stays a red instead of drifting to pink.

next-themes owns the theme. It writes `.dark` on `<html>`, persists the choice, and injects
its own blocking script, so `.dark` is the only dark selector and there is no second source
of truth.

## Typography

Four faces, each with one job.

**Newsreader** sets Latin headings *and Latin running text*. A reading site sets its prose
in a serif; Inter was doing that work and it made the register an app rather than a
publication. Latin-ext is loaded for Turkish — ı, ğ, ş, İ.

**Thmanyah Serif Display** sets Arabic headings and **Thmanyah Serif Text** sets Arabic
interface and body. Arabic runs at 1.06em and line-height 1.9 against Latin's defaults,
because at equal visual weight the script needs more room or diacritics collide with the
line above. Arabic display needs headroom above the cap line too: the hamza on أ sits
there, and a line-height of 1 crops it.

**Noto Naskh Arabic** is reserved for Quran and hadith and appears nowhere else. That
reservation is the point: scripture is visually distinct from the commentary around it, so
you can tell at a glance which words are the source.

**Inter** is labelling only, in every direction: the read-time line, licence chips, grade
keys, sort buttons, the byline. If it is prose, it is not Inter.

Headings run at 600, hero and band titles at 700. The Arabic display cut ships 400/500/700,
so 600 resolves up to a real 700 rather than being synthesised.

The category line is uppercase with wide tracking in Latin and neither in Arabic, since
Arabic has no uppercase and letter-spacing damages joined script. Turkish takes the Latin
treatment with one exception: `text-transform` is language-sensitive, so English technical
tokens inside a Turkish page carry `lang="en"` or `public-domain` uppercases to
`PUBLİC-DOMAIN`.

## Layout

A 76rem column with a 6-unit gutter. Content sits in three widths: full column for grids
and bands, 40rem for the reading measure on a situation, and text blocks capped near 65
characters.

Rows are a fixed three columns, collapsing to one below 52rem. Auto-fit was right at the
old column width and wrong at this one — it slipped to four and the card stopped being the
unit everything else is built from. Qalam's density is deliberately not copied: their rows
carry more items because their reads are nine to twenty-five minutes and ours are one to
three.

The masthead is two parts. The wordmark scrolls away; the bar under it sticks, because on a
long read the navigation has to stay reachable and the identity does not. The bar lives
outside `<header>` — a sticky element only travels inside its own parent's box — and its
ground is a pseudo-element escaping to the viewport edge, or a full-bleed band scrolling
under it shows through beside the column. That escape is safe because `body` sets
`overflow-x: clip`, which is what that rule is for.

Topic and category pages load more on scroll and offer two orders, newest and shortest
read. Both are real columns; anything about popularity would need numbers nobody collects.
The home page does not load more, because a curated front that scrolls forever buries the
choices it exists to make.

## Elevation & Depth

Almost none. One inset surface, the source block, distinguished by a hairline and a
slightly lighter fill rather than a shadow. Artwork gets a radius and no border.

The only true depth is the scrim under hero and band type. The hero's is flat, because its
type is centred in the frame; the band's stays bottom-weighted, because its type sits in
the lower corner. Both exist so text stays legible over any artwork rather than to darken
for its own sake.

## Shapes

Radii step 3, 5, 8, 10 and pill. Artwork takes 8 to 10, chips and quiet buttons take the
pill.

**The circle belongs to paths and to nothing else.** Every situation on the site is a
rectangle. A path is the only object that is not a single situation, so it is the only
object that is round. A second shape has to mark a second kind of thing, or it is
decoration wearing the costume of meaning — which is worse than no signal at all. This is
Thmanyah's rule, where a square is podcast cover art and 16:9 is video; the shape follows
what the object is.

## Identity

The wordmark is drawn, not set. Both marks are outlines lifted from Thmanyah Serif
Display — the face the wordmark was already in — so they render before the webfont
loads, scale to any size and carry one colour. Regenerating them needs shaping, not a
typed string: أسوة is four contextual forms, which is why `components/logo.tsx` holds
paths rather than text.

Arabic shows the drawn wordmark. Latin shows USWAH set in the display serif with the
tile beside it, because a Latin wordmark alone carries none of what the site is; next to
أسوة the tile would only repeat its first letter, so it is dropped there.

The tile is a rounded rectangle — the circle belongs to paths — and its two colours are
fixed in both themes. An identity that repaints itself in dark mode stops being one.

## Components

**Masthead** — a centred wordmark on its own line, then a sticky bar carrying the topics
menu, navigation, language, search and theme.

**Topics menu** — the filter as a pill opening a two-column panel, so a subject can be
reached from any page rather than only the home page. It scrolls past about two dozen
entries; beyond that the answer is search, not a taller menu.

**Card** — square artwork, read-time line, title, summary. The repeated unit; the whole grid
is these. Square because at 4:3 in a three-column measure the paintings were reduced to
thumbnails, and the artwork is half of why anyone stops.

**Hero and band** — artwork with a scrim and type over it. Neither carries a category: a
small accent word cannot hold against photographic detail, and the hero is meant to carry
one situation with nothing competing. The band exists to break a run of grids, not to
promote anything.

**Path circle** — round artwork, a number, title, blurb, and the commitment stated as
length, pace and reading time. The facts travel with it because a path states what you are
agreeing to before you start.

**Byline** — who checked this against the collection, and when, directly under the
standfirst. When an entry is unreviewed it says so as an accent-outlined flag rather than
going quiet; a byline that quietly went missing reads as an oversight instead of a warning.

**Source block** — the centre of a situation page. Naskh at reading size, the translation
below in the body face, translator named, reference in the accent. Translations are keyed
by locale. When the source is sample data it switches to a dashed border and faint text, so
unverified content cannot be mistaken for verified.

**Takeaway** — a hairline above, a small accent label, and the sentence set in the display
face a size up. It is the line people screenshot, so it is set as a pulled statement rather
than a callout box.

**Grade chip** — the grading vocabulary made visible: Quran, Sahih, Hasan, Disputed,
Historical. Semantic colour, separate from the accent.

**Theme toggle** — light and dark revealed by a circular wipe from the button via the View
Transitions API. Clip coordinates are percentages, because Chrome renders absolute pixels
unscaled at fractional display scales, and the collapsed clip is pinned in CSS before the
transition starts or Firefox paints one unclipped frame. Under `prefers-reduced-motion` it
is a plain switch.

## Do's and Don'ts

**Do** reserve Naskh for scripture. **Do** carry the credit line with every image; it is a
condition of using the archive, not a caption. **Do** let RTL change what is set, not only
which side it sits on: the Arabic page shows the original and drops the translation. **Do**
give a drop cap to Latin only — Arabic is cursive, and a raised initial cuts a word out of
its joins.

**Don't** put a coloured bar down the side of anything. **Don't** use em dashes in UI copy;
Arabic does not use them at all. **Don't** add a second accent. **Don't** let the accent
become a fill. **Don't** copy Qalam's row density or their red. **Don't** centre card text
the way Qalam does — the reading edge is where Arabic starts, and centring undoes it.
**Don't** introduce a third shape without a third kind of object to justify it.
