---
name: Uswah (mobile)
description: A daily page on a reading desk — warm paper, white sheets with a real shadow, one oxblood ribbon.
colors:
  paper: "#faf8f4"
  ink: "#14181f"
  sheet: "#ffffff"
  sand-strip: "#f1ece2"
  ink-muted: "#59606c"
  ink-faint: "#6b7280"
  rule: "#e3ded4"
  oxblood: "#7d2b1d"
  destructive: "#8c3a2b"
  shadow-ink: "#241d18"
  grade-strong: "#2f6b4f"
  grade-hasan: "#2c5a86"
  grade-disputed: "#8a5a12"
  dark-ground: "#15171c"
  dark-ink: "#e3dfd8"
  dark-sheet: "#1d2027"
  dark-sand-strip: "#1d232c"
  dark-ink-muted: "#a8afba"
  dark-ink-faint: "#868e9a"
  dark-rule: "#2b303a"
  dark-oxblood: "#d5907c"
  dark-destructive: "#e08d7a"
  dark-grade-strong: "#7fc09b"
  dark-grade-hasan: "#86b2e0"
  dark-grade-disputed: "#d9a95f"
typography:
  display:
    fontFamily: "Newsreader (ar: ThmanyahSerifDisplay), NotoNaskhArabic, ThmanyahSerifText"
    fontSize: "32px"
    fontWeight: 500
    lineHeight: 1.12
  headline:
    fontFamily: "Newsreader (ar: ThmanyahSerifDisplay), NotoNaskhArabic, ThmanyahSerifText"
    fontSize: "27px"
    fontWeight: 500
    lineHeight: 1.12
  headline-small:
    fontFamily: "Newsreader (ar: ThmanyahSerifDisplay), NotoNaskhArabic, ThmanyahSerifText"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.12
  title:
    fontFamily: "Newsreader (ar: ThmanyahSerifDisplay), NotoNaskhArabic, ThmanyahSerifText"
    fontSize: "19.5px"
    fontWeight: 500
    lineHeight: 1.12
  title-medium:
    fontFamily: "Newsreader (ar: ThmanyahSerifText), NotoNaskhArabic"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.6
  body:
    fontFamily: "Newsreader (ar: ThmanyahSerifText), NotoNaskhArabic"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Newsreader (ar: ThmanyahSerifText), NotoNaskhArabic"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  scripture:
    fontFamily: "NotoNaskhArabic"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 2.05
  label:
    fontFamily: "Inter (ar: ThmanyahSerifText), NotoNaskhArabic"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  label-medium:
    fontFamily: "Inter (ar: ThmanyahSerifText), NotoNaskhArabic"
    fontSize: "12.5px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  image-inset: "10px"
  image-sheet: "12px"
  field: "14px"
  leaf: "18px"
  dialog: "22px"
  sheet-top: "24px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  step: "16px"
  row-pad: "18px"
  gutter: "20px"
  sheet-pad: "22px"
  section-top: "36px"
components:
  button-primary:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
    height: "48px"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
    height: "44px"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.oxblood}"
    typography: "{typography.label}"
    height: "44px"
  leaf:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.leaf}"
    padding: "20px"
  leaf-quiet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.leaf}"
    padding: "18px 18px 16px"
  input:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "14px 16px"
  chip:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  grade-badge:
    textColor: "{colors.grade-strong}"
    typography: "{typography.label-medium}"
    rounded: "{rounded.pill}"
    padding: "3px 9px"
  nav-bar:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label-medium}"
    height: "66px"
  intention-strip:
    backgroundColor: "{colors.sand-strip}"
    textColor: "{colors.ink}"
    typography: "{typography.title-medium}"
    padding: "14px 22px 16px"
---

# Design System: Uswah (mobile)

## Overview

**Creative North Star: "The Reading Desk"**

The app is a desk with a short pile of dated sheets on it. The ground is warm paper; every piece of content sits on a white sheet with a hairline edge and a real, offset shadow, as card stock does under a lamp. Type is book type: serif display and serif running text (Newsreader for Latin, Thmanyah Serif for Arabic), a small sans (Inter) for the labelling work, and Naskh reserved for the Quran and hadith. Nothing shouts; the product quotes more than it speaks.

One colour does all the pointing. Oxblood marks the primary action ("Read"), the current tab, the topic word, the relative date, the source rule and the bookmark ribbon. Everything else is ink on paper in three weights: full ink, muted ink, faint ink. Dark mode is the same desk at night: never pure black or pure white, sheets a step lighter than the ground, oxblood warmed to a terracotta so it still reads on dark.

Density is a reading density, not a feed density. One thing per sheet; sheets are stacked with 12–16px between them; sections open with a serif heading and a hairline running to the column edge. The only authored motion is the lift of today's sheet off the pile. Refused by the build: the web's hero-grid home and a bottom-tab feed; glyph-style eyebrows above titles; tonal Material elevation.

**Key Characteristics:**
- Warm paper ground, white sheets, hairline rule, real offset shadow
- One accent (oxblood) for action, selection, topic and the ribbon; grade colours only on grade badges
- Serif display and body per script; Inter labels; Naskh scripture
- Pill buttons and chips; 18px card-stock corners on sheets
- Per-locale type system: Arabic gets its own faces and taller leading, not just RTL
- One motion: the sheet lift, easeOutExpo 420ms

## Colors

One warm accent on a paper-and-ink neutral ramp, mirrored into a dark reading palette.

### Primary
- **Oxblood** (`{colors.oxblood}`; dark `{colors.dark-oxblood}`): the filled "Read" button, the selected nav icon and its 12% tint indicator (22% in dark), the topic word in a meta row, the relative date on a sheet ("Today"), the 18px source rule and label, the intention's act, the focused field border (1.5px), text buttons, and the bookmark ribbon. It is never a background for text blocks.

### Tertiary
- **Grade Green** (`{colors.grade-strong}`): Quran and Sahih grades.
- **Grade Blue** (`{colors.grade-hasan}`): hasan.
- **Grade Amber** (`{colors.grade-disputed}`): disputed. All three appear only as a 12%-tint pill with the same colour as its label text; historical grades fall back to muted ink.

### Neutral
- **Paper** (`{colors.paper}`; dark **Dark Ground** `{colors.dark-ground}`): scaffold, app bar, and the text colour on oxblood.
- **Sheet** (`{colors.sheet}`; dark `{colors.dark-sheet}`): every Leaf, the nav bar, inputs, dialogs, bottom sheets, chips.
- **Sand Strip** (`{colors.sand-strip}`; dark `{colors.dark-sand-strip}`): the intention strip closing a day sheet, the unselected switch track, `secondaryContainer`.
- **Ink** (`{colors.ink}`; dark `{colors.dark-ink}`): headings, body, selected chip fill, snackbar fill.
- **Muted Ink** (`{colors.ink-muted}`; dark `{colors.dark-ink-muted}`): summaries, ledes, default label colour, unselected nav.
- **Faint Ink** (`{colors.ink-faint}`; dark `{colors.dark-ink-faint}`): meta rows (clock, minutes), counts beside a page title, the "Today's intention:" lead, chevrons.
- **Rule** (`{colors.rule}`; dark `{colors.dark-rule}`): every hairline: Leaf border, dividers, share-row rules, input border, chip and outlined-button side.
- **Shadow Ink** (`{colors.shadow-ink}`): the colour under Leaf shadows in light mode (black in dark).
- **Destructive** (`{colors.destructive}`; dark `{colors.dark-destructive}`): "Not verified" bylines and errors only.

### Named Rules
**The One Red Rule.** Oxblood is the only accent and it is used only to point: the one action, the current selection, the topic word, the dateline, the source rule, the ribbon. If a screen has two filled oxblood buttons, one is wrong.

**The Never-Pure Rule.** Dark mode never uses #000 or #fff for ground or text; the ground is `{colors.dark-ground}` and the ink is `{colors.dark-ink}`. Light sheets are the only pure white.

**The Grade-Only Rule.** Green, blue and amber appear only on grade badges. They are not available for status, success, or decoration elsewhere.

## Typography

**Display Font:** Newsreader (Latin) / Thmanyah Serif Display (Arabic), falling back to Noto Naskh Arabic then Thmanyah Serif Text
**Body Font:** Newsreader (Latin) / Thmanyah Serif Text (Arabic)
**Label Font:** Inter (Latin) / Thmanyah Serif Text (Arabic)
**Scripture Font:** Noto Naskh Arabic, Quran and hadith only

**Character:** A book, not an interface. Serif display at medium weight (500) with tight 1.12 leading; serif running text at a generous 1.6 (1.9 in Arabic); a small, quiet sans for dates, minutes, references and nav labels. The wordmark is set in the display face at 700 (Arabic 1.15× the Latin size) so text is the mark.

### Hierarchy
- **Display** (500, 32px, 1.12): reserved; the largest role in the theme, used sparingly.
- **Headline** (500, 27px, 1.12): page titles and the title on today's sheet.
- **Headline small** (500, 22px, 1.12): `SectionTitle` headings with the hairline running out.
- **Title** (500, 19.5px, 1.12): titles on list sheets (situations, sayings); 18px in compact rows.
- **Title medium** (500, 17px, body face, 1.6): the intention strip and detail-screen app-bar titles.
- **Body** (400, 17px, 1.6 / Arabic 1.9): running text and summaries; 18px `bodyLarge` for article body.
- **Body small** (400, 15px, muted ink): summaries on list sheets.
- **Scripture** (400, 21px, 2.05): the cited Arabic, always RTL, always Naskh; the translation beneath it is body italic.
- **Label** (500, 14px, 1.4): buttons, chips, nav; 600 at 14px in ink for `titleSmall` (relative date, source label, settings headings).
- **Label medium** (500, 12.5px, muted): datelines, meta rows, bylines, references, nav labels, the lift hint.

### Named Rules
**The Per-Script Rule.** Arabic is a different type system, not a mirrored one: display switches to Thmanyah Serif Display, body and labels to Thmanyah Serif Text, and leading rises to 1.5 (display) and 1.9 (body). Never set Arabic in Inter or Newsreader.

**The Naskh-For-Scripture Rule.** Noto Naskh Arabic is used only for Quran and hadith text (and as the fallback glyph source for ﷺ). It is not a display or UI face.

**The Meta-Below Rule.** Topic · read time sits under a title, never above it. There are no eyebrows, kickers, or tracked uppercase labels in the UI.

## Layout

A single column with a 20px gutter (`ListView` padding 20/0/20/16). Sheets stretch the full column; inside a sheet the text block is inset 22px (18px on quiet list rows, 14px on compact rows with an 84px thumbnail). Paintings sit inside the sheet with a 12–14px inset and a 16:10 aspect ratio. Vertical rhythm inside a sheet: 6–8px title-to-meta, 8–12px meta-to-summary, 18px summary-to-button, 20px to the closing strip. Sections open with 36px above and 14px below a `SectionTitle`; a `PageTitle` ends with 24px. The pile steps deeper sheets down 16px each with a 3% horizontal scale per depth, showing up to three edges; the lift hint hangs 6px under the last edge. The app bar has a 20px title inset; the nav bar is 66px with labels always shown. Every directional value is `EdgeInsetsDirectional` / `PositionedDirectional`, chevrons and arrows flip for RTL. No breakpoints: phone only.

## Elevation & Depth

Physical, not tonal. Material surface tint is disabled everywhere (`surfaceTintColor: transparent`, elevation 0 on app bar and nav bar); depth is carried by the Leaf's hairline and a two-layer offset shadow that reads as card stock on a desk. The deeper sheets in a pile are tinted (2.5% toward ink per depth in light, 4.5% in dark) so each edge is visible against the one above. Dragging the top sheet deepens its shadow; nothing else in the app changes elevation.

### Shadow Vocabulary
- **Leaf** (`0 1px 2px rgba(36,29,24,.07), 0 8px 22px -6px rgba(36,29,24,.10)`): the standard sheet (today's sheet, source block).
- **Leaf quiet** (`0 1px 2px rgba(36,29,24,.07), 0 4px 12px -6px rgba(36,29,24,.06)`): list rows, so the desk's top sheet stays the loudest.
- **Leaf lifted** (`0 1px 2px rgba(36,29,24,.07), 0 18px 40px -4px rgba(36,29,24,.22)`): the sheet under the reader's finger during the lift.
- **Dark variants**: same geometry on black at .5 / .55 (quiet .35).
- **Ribbon**: a 2px canvas drop shadow under the bookmark path.

### Named Rules
**The Paper Shadow Rule.** Shadows are offset downward and drawn in shadow ink, never ambient grey and never tonal. Depth only exists in the Leaf and the ribbon.

**The Quiet-Rows Rule.** In a list every sheet is `quiet`; the full Leaf shadow belongs to the one sheet a screen is about.

## Shapes

Card stock. Sheets have 18px corners with a 1px hairline in rule colour; images inside a sheet are cut to 10–12px so they sit visibly inside the paper. Controls that are not sheets are pills: filled, outlined and chip shapes are stadium, grade badges are 999px. Inputs are 14px; dialogs 22px; bottom sheets 24px on the top edge with a drag handle. The bookmark ribbon is a rectangle with a notched tail (tail at 78% height), 22×35px on a day sheet, 18px wide on a list row, hung 2px above the sheet's top edge and 22–26px in from the end. The intention-tile highlight is a 1.5px oxblood ring at 21px radius wrapped 2px outside the Leaf.

## Components

### Buttons
Pills, quiet in number.
- **Shape:** stadium.
- **Primary (Filled):** oxblood on paper text, label 14/500, 22×12px padding, 48px minimum; the "Read" button carries a trailing arrow that flips in RTL. One per sheet.
- **Outlined:** ink text, rule-coloured 1px side, 18×10px padding, 44px minimum.
- **Text:** oxblood text, 44px minimum.
- **Icon buttons:** ink, 48px hit target, 20–22px glyphs; Material outlined icons throughout.
- **Press:** Material `InkSparkle` splash; no hover states (touch only).

### Chips
- **Style:** sheet fill, ink label 14/500, 1px rule side, stadium, 12×8px padding, no checkmark.
- **Selected:** ink fill with paper label (`ChoiceChip` in the topic bar).
- **Grade badge:** 12% tint of the grade colour, label 12.5/600 in that colour, 9×3px padding, 999px.

### Cards / Containers (Leaf)
The one container the app uses.
- **Corner Style:** 18px.
- **Background:** sheet; pile depths take a per-depth ink tint.
- **Shadow Strategy:** Leaf / quiet / lifted per Elevation.
- **Border:** 1px rule.
- **Internal Padding:** 20px default; 22px for the source block and day sheet text; 18px/16px on list rows; 14px compact.
- **Variants:** `quiet` for list rows; `lifted` for the dragged sheet; `clip` when an image or strip must respect the corners; `onTap` wraps an InkWell at the same radius.
- **Closing strip:** a day sheet ends in a sand-strip band (14/22/16px padding) carrying the intention as one run: faint lead, oxblood act (600), faint chevron, ink intention.

### Inputs / Fields
- **Style:** sheet fill, 1px rule border, 14px radius, 16×14px padding, muted hint in body style.
- **Focus:** border becomes oxblood at 1.5px; no glow.
- **OTP code:** six-digit field with 6px letter spacing (the only tracked text in the UI).

### Navigation
- **App bar:** paper, no elevation or scroll tint, wordmark at 24px/700 at the reading edge (Arabic أسوة in Thmanyah Serif Display at 27.6px), search and tune icons at the far end; detail screens show a back arrow and a 17px title medium.
- **Nav bar:** sheet fill, 66px, five destinations (Today, Situations, Sayings, Intentions, Saved), outlined icon at rest in muted ink, filled icon in oxblood on a 12% oxblood pill when selected; labels 12.5/500, ink when selected, always shown.
- **Transitions:** predictive back on Android, Cupertino slide on iOS.

### Section and Page Titles
- **SectionTitle:** headline small, then a 12px gap and a hairline divider running to the column edge; 36px above, 14px below.
- **PageTitle:** headline (27px) with an optional count set 15px in faint label type after two spaces; lede in body/muted 10px beneath; 24px after.

### Source Block
A Leaf (22px padding) holding: the Arabic original in scripture style forced RTL; the italic body translation in quotes with a 12.5px "Translated by" line; an 18×1px oxblood rule then the reference in 14/600 oxblood; a hairline divider and the dorar apparatus beneath.

### Share Row
A band bounded by hairlines above and below (10px vertical padding): WhatsApp, Telegram, X, copy link, system share as 20–21px icon buttons with tooltips; the save control at the far end.

### Leaf Deck (signature)
Today's sheet on a pile: up to three blank edges stepped 16px down and 3% narrower per depth, tinted deeper; the next day's real sheet directly beneath. A vertical drag moves the top sheet with a slight rotation (drag/4000 rad, mirrored in RTL) and 1.5% scale-up; past 110px or a 700px/s fling it flies off (−900px) with `easeOutExpo` over 420ms and the next sheet settles up; the reverse drag brings the previous sheet back down from above. Over-drag past either end is resisted at 25%. The lift hint or "n days behind" sits centred under the pile in label medium.

### Bookmark Ribbon
The one mark of a saved item: an oxblood notched ribbon with a 2px drop shadow hung over the sheet's top-end corner. Same component on today's sheet, list rows and saved rows.

## Do's and Don'ts

### Do:
- **Do** put every piece of content on a Leaf: white sheet, 1px rule, 18px corners, paper shadow.
- **Do** keep one filled oxblood button per sheet and let oxblood otherwise only point (topic, dateline, selection, ribbon).
- **Do** switch faces per script: Thmanyah Serif Display/Text for Arabic, Newsreader for Latin, Inter for Latin labels only.
- **Do** set Quran and hadith in Noto Naskh Arabic at 21px/2.05, forced RTL, with the translation as body italic beneath.
- **Do** use `quiet` Leaves in lists and reserve the full shadow for the sheet a screen is about.
- **Do** place topic · minutes beneath the title in 12.5px muted label type, the topic word in oxblood 600.
- **Do** use `EdgeInsetsDirectional`, `PositionedDirectional`, and flipped arrows/chevrons so RTL is structural.
- **Do** show grades only as 12%-tint pills in the grade colour.

### Don't:
- **Don't** use Material tonal elevation or surface tint; depth is the Leaf shadow only.
- **Don't** use pure black or pure white in dark mode; ground is `{colors.dark-ground}`, ink `{colors.dark-ink}`.
- **Don't** add eyebrows, kickers, or tracked uppercase labels above titles; the OTP field is the only tracked text.
- **Don't** set Arabic in Inter or Newsreader, or Naskh anywhere outside scripture.
- **Don't** use green, blue or amber for anything but a grade badge.
- **Don't** introduce a second container style (bordered boxes, tinted panels) besides the Leaf and the sand intention strip.
- **Don't** add motion beyond the sheet lift and the 180–300ms container settles; no parallax, no hero transitions.
