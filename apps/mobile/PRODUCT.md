# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Users

Trilingual (Arabic, English, Turkish) readers on their phone, in the middle of an ordinary day, who have just hit a real situation ("someone keeps asking me for money", "I said something I regret") and want to know what the Quran or a Sahih hadith actually says about it, with the source in front of them. The app opens in the device language (en/ar/tr), none favoured; Arabic readers read right-to-left with Arabic type leading.

Confirmed 2026-08-28: the mobile app is meant for **daily use**. It opens on a Today page: one situation or intention for today, front and centre; browsing lives behind it.

## Product Purpose

Practical guidance for real situations, answered from the original source: the Quran and the two Sahih collections, with the source shown. Success is a reader who recognises their own situation, reads a two-minute page, sees the cited text and its verification, and leaves with one concrete thing to do (the takeaway). Saving is the only account feature.

## Positioning

Every answer carries its evidence: the original Arabic text, the reference (surah:ayah or collection + number), the reviewer and date, and the dorar.net apparatus (narrator, grader, ruling) copied verbatim with a link to the permalink. Sayings people already know are compared against the sources with the grade of what they are measured against; anything below Quran/Sahih is shown but marked "awaiting a reviewer". Intentions reframe ordinary acts (eating, going to work) through the intention behind them, each with its source. A neighbouring app cannot truthfully copy the verification chain.

## Operating Context

- Content is authored and published in the dashboard app (`apps/dashboard`); both clients read the same Supabase project (`rjkbhobntyhuochdmkkx`) through the publishable key. RLS shows published rows only. Neither client writes content.
- Three content types: **situations** (topic, minutes, artwork, source, body, takeaway, byline), **sayings** (the saying, source, "the parallel", "how close it is", grade), **intentions** (act → intention → note → source, grouped by act group).
- Citations come from `dorar_hadith.cited`; book records for Bukhari and Muslim open a bibliographic card.
- Auth is email OTP only (six-digit code, no password); sign-in exists solely to save situations and sayings.
- Share: link (WhatsApp, Telegram, X, copy), and for sayings an image card (story/square/wide, warm/paper/ink, Naskh/serif, QR, mark).
- Artwork is museum open-access painting/photography, always credited; no depictions of the Prophet ﷺ, other prophets, or companions.
- Web surface at uswah-five.vercel.app owns SEO and deep links; the mobile app is the daily companion.

## Capabilities and Constraints

- Flutter 3.44 / Dart 3.12, Riverpod, go_router, freezed; structure in `apps/mobile/README.md`. Android and iOS.
- Only Quran and the two Sahih collections are published as sources (database constraint); saying grades hasan/disputed/historical are visible but flagged.
- Locales: en, ar (RTL), tr. Every string lives in ARB files; every content row has all three locales or is skipped.
- Reading times are estimates; Arabic dates use Latin digits; Arabic refs use Arabic-Indic digits.
- Undecided: what "today" selects (rotation rule, timezone, whether it persists per day) — no such field exists in the database yet, so the client must derive it deterministically from published content.
- Undecided: push notifications on mobile (web push exists for the web; nothing native yet).

## Brand Commitments

Confirmed binding on 2026-08-28 for the redesign:

- The wordmark **أسوة** / "Uswah" and the type system: Thmanyah Serif Text and Serif Display for Arabic, Newsreader for Latin reading, Inter for labels, Noto Naskh Arabic reserved for Quran and hadith text.
- The colour identity: oxblood brand `#7d2b1d` (dark: `#d5907c`) on warm paper `#faf8f4`, dark ground `#15171c`; grade colours green/blue/amber.
- Content structure and copy: situations, sayings, intentions, saved and login work exactly as on the web; only presentation changes.
- Voice: plain, unhurried, no hype; the product quotes more than it speaks.

## Evidence on Hand

- Real content in the database: 18 situations, 5 sayings, 8 intentions, 260 dorar citations (counts on 2026-08-28).
- Artwork at `apps/web/public/art/*.jpg` (served from the site), topic tiles at `apps/web/public/art/topics/`.
- Brand mark `apps/mobile/assets/images/mark.png`, ornament `apps/mobile/assets/images/ornament.svg`, fonts in `apps/mobile/assets/fonts/`.
- No testimonials, ratings, download numbers, or endorsements exist; none may be invented.

## Product Principles

1. The source is the hero; the product's own words come after the quote, never before.
2. One thing a day is a feature: a small, finishable daily page beats an endless feed.
3. Evidence is visible, not implied: reference, reviewer, grade and dorar apparatus travel with every text.
4. Three languages are one product: nothing may work in one locale and degrade in another; RTL is a first-class layout, not a mirror.
5. Familiar on the platform: Material on Android, HIG on iOS; the brand lives in type, colour and the daily ritual, not in reinvented controls.
