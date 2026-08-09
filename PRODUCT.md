# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Stack

Next.js (App Router) for the web surface, owned by Seif. Flutter for iOS and Android, owned
by a second developer. Supabase Postgres is the only shared layer — both clients read it
directly under RLS with the publishable key; there is no API tier. Deliberately one repo
with no monorepo tooling, since the two clients share no code.

## Users

Muslims aged roughly 18–35, in two audiences that barely overlap: English speakers in the
West and Arabic speakers in MENA and the Gulf. Neither reads the other's language, so they
are two markets rather than one market translated.

They arrive at a moment of need, not out of habit — a specific situation has just happened
("someone keeps asking me for money", "my boss wronged me", "I can't stop being angry") and
they want to know what to do. Today that search ends at a self-help quote, a forum thread,
or a Western wisdom aphorism, because the Islamic answer is either hard to find or buried in
a reference format built for study rather than for a person in difficulty.

## Product Purpose

Give a Muslim facing a real situation a short, verified answer from Quran and Sahih hadith,
with the source shown, readable in one to three minutes.

Success at day 30 of the first release is measured as: 3% click-through from social content
to a situation page; 35% of visitors opening a second situation in one session; 15% returning
within 30 days; 0.4 saves per visitor. Daily active users is explicitly not a success metric —
the product serves moments of need, not a daily habit.

## Positioning

Navigation is by life situation, not by virtue and not by source. Existing Islamic apps are
organized the way the corpus is organized — by surah, by collection, by topic — which serves
study and fails a person in difficulty. Uswah is organized the way the problem arrives.

The name is أسوة, from Quran 33:21, *"in the Messenger of Allah you have a beautiful example"* —
the Quran's own word for the model you follow in practice.

Social content uses a comparison hook (a widely-shared Western quote, then the older and often
deeper Islamic treatment of the same idea). That is an acquisition device only and never
becomes the product's structure: sustaining it would require forced pairings, and one strained
hadith-to-quote link costs the credibility the whole product runs on.

## Operating Context

Discovery happens off-product: short video and text carousels on social, in both languages,
each piece repackaged four ways from one researched situation. Those posts are the trigger
that brings someone back; search is the other entry point. Deep links carry a language-neutral
situation slug from a post to the same content on web or in the app.

Reading happens in a moment of stress or after a specific incident, frequently on a phone,
frequently once and then not again for weeks.

## Capabilities and Constraints

- Sources are restricted to the Quran and the two Sahih collections (Bukhari, Muslim). No
  sira narratives, no hadith outside the two Sahihs, no original tafsir. This restriction
  lifts only when a named scholarly reviewer joins the project.
- Reliability is enforced in the schema, not by process: every entry requires a `source_id`,
  a `reviewed_by` and a `reviewed_at` as `NOT NULL`, and the `source_grade` enum has no
  `daif` value — unreviewed or weak-graded content cannot be stored at all.
- The original Arabic of a source is canonical and stored on the source itself; every other
  language is a translation carrying a named translator.
- Language lives in `*_translations` tables keyed by a `locales` row, so adding a language is
  an INSERT, never a column migration. A locale may be partially complete.
- Arabic search only works because indexed text and incoming queries both pass through
  `ar_norm()`, which strips harakat and unifies alef forms; the `search_situations(q, locale)`
  RPC is the single search implementation both clients call.
- All content is public and fully usable signed out. Authentication gates saving, liking and
  progress only, and is prompted at the moment of saving rather than at entry.
- Situation lists are per-locale, not translations of each other: the situations that matter
  in Cairo and in Toronto differ.
- **Undecided:** the scholarly reviewer (nobody named yet); whether a website, the app, or
  social becomes the primary surface; monetization.

## Brand Commitments

- Name: Uswah (أسوة). `uswah.app` is the intended domain; `uswah.com` is registered elsewhere
  and pending a purchase inquiry.
- Voice: plain everyday language. It talks like a knowledgeable friend — "someone keeps asking
  you for money", not "on the impermissibility of persistent begging". Quoted sources keep
  their formal register; everything around them is ordinary speech. This holds in both
  languages, so the Arabic surface is colloquially readable rather than classical.
- The product never positions Islamic sources as an answer to Western wisdom. The comparison
  is a social hook; the product's own stance is that this is the original source, standing on
  its own.

## Evidence on Hand

- Deployed schema and a passing test suite: `supabase/migrations/20260810000000_init.sql`,
  `supabase/tests/schema_test.sql`. Supabase project `rjkbhobntyhuochdmkkx`, eu-central-1.
- Product plan of record, including the four-week build split and success targets:
  https://claude.ai/code/artifact/2b78d1ed-f4c8-4e99-98d0-6d55dc8f2695
- **No content exists yet** — zero verified situations, two placeholder seed rows to be
  deleted before launch. No users, no traffic, no testimonials, no press, no benchmarks.
  Future work must not fabricate any of these.

## Product Principles

1. **Organized by the problem, not by the corpus.** If a structure serves study rather than
   somebody in difficulty, it is the wrong structure.
2. **A claim without a visible source does not ship.** Attribution is part of the content,
   not a footnote, and the database refuses anything else.
3. **Serve the moment of need, not a daily habit.** No streaks, no daily lesson, no
   engagement mechanics that manufacture a return the product hasn't earned.
4. **Arabic is a first-class surface, not a translation.** Its own situations, its own
   typography, its own layout.
5. **Say less, and say it plainly.** One to three minutes, one concrete takeaway, everyday
   words around a formally quoted source.

## Accessibility & Inclusion

WCAG AA for contrast and touch targets, plus full RTL parity: the Arabic surface is a
first-class mirror rather than a Latin layout with flipped text. Arabic script requires
larger type sizing and looser line height than Latin at equivalent visual weight, and
Quranic and hadith text must stay legible with diacritics rendered.
