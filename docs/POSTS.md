# Social posts

Instagram carousels built from the art series and the situations. The
reference shape: an editorial carousel where each slide carries one idea,
and the last slide always belongs to the brand — wordmark, site, and the
trust line. One post = one situation, told in the same order the page
tells it: the situation, the source, the meaning, the act.

Two hard rules, inherited from the art series:

1. **No generated text.** Slides are composed in the design step (Canva)
   from the exported artwork plus real typography. Image models never
   render the words, least of all the Arabic.
2. **The scripture is verbatim.** The hadith text and its reference are
   copied from the situation page, never retyped from memory. The
   commentary slides may paraphrase; the source slide may not.

## Format

- 1080×1350 (4:5 portrait), the carousel standard.
- Ground: the site's paper cream; text in ink; the situation's own
  artwork as the visual. Arabic set in the Thmanyah serif, Latin in the
  site's faces, matching the site so the post and the page feel like one
  thing.
- Slide count: 5 to 6 including the closing slide. One idea per slide.

## The slides, per situation post

1. **Hook** — the situation title in the reader's words, over the
   artwork. ("Someone keeps asking me for money.")
2. **The source** — the hadith in Arabic, verbatim, with the reference
   ("Sahih al-Bukhari 1471"). Naskh for the scripture, nothing else on
   the slide.
3. **Translation** — the English (or Turkish) rendering, with the
   translator's attribution, exactly as the page shows it.
4. **The meaning** — one short paragraph from the situation body,
   trimmed to slide length.
5. **What to do** — the takeaway, alone on the slide. It is the most
   shareable sentence; give it room.
6. **Closing slide** — shared across every post, spec below.

## The closing slide

Same every time, so the account builds recognition:

- The wordmark (أسوة for Arabic-led posts, Uswah for English-led).
- The site: `uswah-five.vercel.app` (swap for the real domain when one
  lands — this file and the Canva template are the two places it lives).
- The trust line, small: "Sources quoted verbatim from Dorar.net."
- Paper ground, no artwork, generous margin. The quiet after the post.

## Caption template

```
<the takeaway, as the first line — it is what shows before "more">

<one sentence: what the situation page holds>

Read it in Arabic, English, and Turkish — link in bio.

<3 to 5 hashtags, bilingual, e.g. #hadith #حديث #sunnah #أسوة>
```

## Posts

The first wave leads with the strongest images and the most-shared
feelings. One post per week keeps the drafts ahead of the schedule.

- [ ] **Intro post** — not a situation: what Uswah is. Slides: the
      six topic emblems as a grid teaser, one slide on "answered from
      the Quran and Sahih hadith, with the source shown," closing slide.
- [ ] `i-cannot-stop-being-angry` — the rooftop figure; the sixty
      seconds; "change your posture and say nothing for one minute."
- [ ] `asked-for-money-again` — the rope and firewood; the dignity of
      ending a need instead of meeting it monthly.
- [ ] `a-friend-let-me-down` — the walker past the hole; forgive now,
      decide trust on evidence.
- [ ] `i-am-in-debt` — the lamp before dawn; intending repayment is
      half the repayment.
- [ ] `my-parents-ask-too-much` — the two glasses of tea; a clear kind
      no over a grudging yes.
- [ ] `i-said-something-i-regret` — the tipped jug; the word that
      cannot return.
- [ ] `i-am-waiting-and-nothing-changes` — the rising dough; answered
      so long as you do not hurry.

The remaining ten situations follow the same recipe; add them here as
they are drafted. Every post's slide text comes from the live situation
page for its language, never from this file.

## The intro post, slide by slide

Assets: `content/posts/intro/` — eight 1080×1350 crops cut from the art
series (`cover`, the six topic emblems, `rooftop`).

1. **Hook** (`cover.jpg`) — wordmark أسوة large on the empty wall,
   Uswah small beneath it; one line low on the paving: "For the
   situations you actually live." Nothing else.
2. **The six doors** (grid of the six emblems) — 2×3 grid, paper-cream
   gutters; each tile labeled small in both languages (Money · المال,
   Work · العمل, Family · الأهل, Yourself · النفس, People · الناس,
   Hardship · الشدّة); header: "Six areas of an ordinary life."
3. **The promise** (paper ground, type only) — the site premise
   verbatim: "Practical guidance for real situations, answered from the
   Quran and Sahih hadith, with the source shown." Arabic beneath:
   إرشاد عملي لمواقف حقيقية، من القرآن والحديث الصحيح، والمصدر ظاهر.
4. **Proof, not promise** (paper ground, Naskh) — the hadith verbatim:
   ليس الشَّديدُ بالصُّرَعةِ، إنَّما الشَّديدُ الذي يَملِكُ نَفسَه عِندَ الغَضَبِ
   with the reference: صحيح البخاري ٦١١٤ · Sahih al-Bukhari 6114.
5. **Three languages** (`rooftop.jpg`) — stacked over the dusk sky:
   بالعربية · English · Türkçe, and "Every situation, in all three."
6. **Closing slide** — the shared house slide (spec above).

Caption:

```
The strong one is not the one who wins the fight. It is the one who
holds himself at the moment of anger.

Uswah answers real situations — money, work, family — from the Quran
and Sahih hadith, with the source shown on every page.

Read it in Arabic, English, and Turkish — link in bio.

#hadith #حديث #sunnah #السنة #أسوة
```

Division of labor, settled after trying it the other way: image models
produce ONLY the meaningful images — the artwork, the crops, a textured
ground. Every word, label, shadow scrim, and layout is set by hand in
Canva. Machine-composed slides came out worse than the sum of their
parts; the assets stay clean and the typography stays ours.

### Asset prompts

The eight crops in `content/posts/intro/` cover slides 1, 2, and 5. The
type-only slides (3, 4, and the closing slide) sit on a painted ground
rather than a flat fill, so one more generated asset:

```
SERIES STYLE (from docs/ART.md) applies. 1080x1350 portrait.
Save to content/posts/intro/paper-v1.jpg.
Subject: an empty painted ground in the series' warm paper cream — flat
matte gouache laid in soft horizontal strokes, visible paper grain, the
tone barely deepening toward the edges. No objects, no wall, no floor
line, no horizon: only quiet painted paper, even enough that dark serif
type will sit on it anywhere.
Hard rules: no text, no borders, no vignette, no stains or blots, no
gradient bands, no gloss.
```

Everything else is Canva: the wordmark and Arabic from real fonts, text
shadows only if a busy area of art demands one, and the closing slide
built once as a saved template.
