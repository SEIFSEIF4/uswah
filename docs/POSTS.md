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

Assets: `docs/content/posts/intro/` — eight 1080×1350 crops cut from the art
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

The eight crops in `docs/content/posts/intro/` cover slides 1, 2, and 5. The
type-only slides (3, 4, and the closing slide) sit on a painted ground
rather than a flat fill, so one more generated asset:

```
SERIES STYLE (from docs/ART.md) applies. 1080x1350 portrait.
Save to docs/content/posts/intro/paper-v1.jpg.
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

## Chunk images: one scene, three moments

Every situation post is split into chunks, each chunk a slide with an
image and a couple of lines. The images all come from ONE scene so the
carousel reads as a story, not a mood board:

1. **Hook** — the situation's artwork, the 4:5 crop.
2. **Source + translation** — the painted paper ground (`paper-v1`);
   scripture always sits on the quiet ground, never on artwork.
3. **Meaning** — a DETAIL crop from the same artwork (the rope's knot,
   the steam, the lamp flame), cut from the original file, not
   regenerated. Two lines of the body text beside it.
4. **Takeaway — the after image** — a newly generated companion: the
   same scene, moments after the takeaway was acted on. Two lines: the
   takeaway itself.
5. **Closing slide** — the house template.

The after images are generated with the original artwork attached as a
scene reference, and the instruction is always: same scene, same light,
do not restyle — only time has passed.

### After-image prompts, first wave

Attach the named reference file. SERIES STYLE from docs/ART.md applies
to all. Output 1080x1350 portrait, saved under `docs/content/posts/<slug>/`.

**`i-cannot-stop-being-angry`** — ref `apps/web/public/art/i-cannot-stop-being-angry-v2.jpg`
```
Save to docs/content/posts/i-cannot-stop-being-angry/after-v1.jpg.
The same rooftop, parapet and city as the reference, minutes later:
the parapet is empty, the figure has gone back down. Dusk one shade
deeper, the single amber window still lit. The minute was taken.
```

**`asked-for-money-again`** — ref `apps/web/public/art/asked-for-money.jpg`
```
Save to docs/content/posts/asked-for-money-again/after-v1.jpg.
The same courtyard corner, wall and doorway as the reference, later:
the rope and the firewood are gone. Faint dust marks and a few bark
chips where they lay. The light unchanged. The need ended.
```

**`a-friend-let-me-down`** — ref `apps/web/public/art/a-friend-let-me-down-v2.jpg`
```
Save to docs/content/posts/a-friend-let-me-down/after-v1.jpg.
The same wall, hole and curving path as the reference, but the walker
is far along it now, small near the top of the frame, still walking.
The hole unchanged, unfeared. Distance kept, journey continued.
```

**`i-am-in-debt`** — ref `apps/web/public/art/i-am-in-debt-v1.jpg`
```
Save to docs/content/posts/i-am-in-debt/after-v1.jpg.
The same desk and window as the reference in full morning: the lamp
out and cold, the coins and envelope gone, sunlight across the empty
wood. The city awake beyond the window. It was delivered.
```

**`my-parents-ask-too-much`** — ref `apps/web/public/art/my-parents-ask-too-much-v1.jpg`
```
Save to docs/content/posts/my-parents-ask-too-much/after-v1.jpg.
The same bench, table and tray as the reference, after the visit:
both glasses empty, one cushion straightened, the other still dented,
the afternoon light a little longer. The visit happened.
```

**`i-said-something-i-regret`** — ref `apps/web/public/art/i-said-something-i-regret-v1.jpg`
```
Save to docs/content/posts/i-said-something-i-regret/after-v1.jpg.
The same courtyard corner and cracked earth as the reference: the jug
now stands upright again, whole, but the dark stain remains in the
earth beside it. You can right the jug; the stain stays.
```

**`i-am-waiting-and-nothing-changes`** — ref `apps/web/public/art/i-am-waiting-and-nothing-changes-v1.jpg`
```
Save to docs/content/posts/i-am-waiting-and-nothing-changes/after-v1.jpg.
The same table, bowl and oven as the reference: the cloth folded
beside the bowl, the dough risen high above the rim, the embers still
patient. The wait was working the whole time.
```

Detail crops for the meaning slides are cut from the original files on
request (name the region: the knot, the flame, the steam, the stain) —
never regenerated, so the detail is pixel-identical to the hook slide.

### After-image prompts, second wave

Same rules: attach the named reference, same scene, same light, only
time has passed. Detail regions listed for each are cut from the
original on request.

**`my-boss-wronged-me`** — ref `my-boss-wronged-me-v1.jpg`; detail: the knotted curtain cord
```
Save to docs/content/posts/my-boss-wronged-me/after-v1.jpg.
The same window, curtain and sill as the reference at full morning:
the sky beyond bright and blue, the room no longer dark, the curtain
still knotted back. The dawn the window waited for arrived.
```

**`i-was-passed-over`** — ref `i-was-passed-over-v1.jpg`; detail: the smaller lamp's steady flame
```
Save to docs/content/posts/i-was-passed-over/after-v1.jpg.
The same niche and two lamps hours deeper into night: both flames
exactly as steady, the oil visibly lower in both, the shared glow
unchanged. Neither light cost the other anything, and both lasted.
```

**`i-keep-putting-it-off`** — ref `i-keep-putting-it-off-v1.jpg`; detail: the water rings
```
Save to docs/content/posts/i-keep-putting-it-off/after-v1.jpg.
The same ledge, pot and watering can weeks later: the plant taller by
a few leaves, one more fresh dark ring on the stone among the faded
ones. The habit kept, the growth quiet.
```

**`someone-spoke-badly-of-me`** — ref `someone-spoke-badly-of-me-v1.jpg`; detail: the lit slats
```
Save to docs/content/posts/someone-spoke-badly-of-me/after-v1.jpg.
The same wall and window the next morning: shutters open, sill in
plain warm daylight, the room quiet beyond. The night passed, nothing
was said, and the house opens as it always does.
```

**`i-lost-someone`** — ref `i-lost-someone-v1.jpg`; detail: the folded shawl
```
Save to docs/content/posts/i-lost-someone/after-v1.jpg.
The same chair, shawl and window after the rain: drops still on the
glass but the sky lightening, a first patch of sun on the sill. The
shawl stays folded where it is. Grief remains; the sky clears anyway.
```

**`i-cannot-forgive-myself`** — ref `i-cannot-forgive-myself-v1.jpg`; detail: the open latch in the door gap
```
Save to docs/content/posts/i-cannot-forgive-myself/after-v1.jpg.
The same room with the door now fully open: morning filling the whole
floor, no dark corners left, the doorway plain and unguarded. The way
back was walked.
```

**`i-am-far-from-home`** — ref `i-am-far-from-home-v1.jpg`; detail: the bag and staff at the threshold
```
Save to docs/content/posts/i-am-far-from-home/after-v1.jpg.
The same doorway and road, the bag and staff gone: the swept room
empty, the road bright in morning haze. The traveler traveled.
```

**`i-said-something-i-regret`** — covered in the first wave.

**`i-cannot-afford-to-be-generous`** — ref `i-cannot-afford-to-be-generous-v1.jpg`; detail: the cup on the lid
```
Save to docs/content/posts/i-cannot-afford-to-be-generous/after-v1.jpg.
The same jar and stand: the cup now resting beside the lid, wet, a few
small splashes of water drying on the swept stone. Someone drank. The
gift with no money in it was received.
```

**`my-work-feels-pointless`** — ref `my-work-feels-pointless-v1.jpg`; detail: the tool row in the lamp pool
```
Save to docs/content/posts/my-work-feels-pointless/after-v1.jpg.
The same bench at morning: the lamp out, daylight from beyond the
frame, the cloth folded and the tools gone to their work, fresh
shavings just beginning to gather. The care resumed.
```

**`i-avoid-someone-i-wronged`** — ref `i-avoid-someone-i-wronged-v1.jpg`; detail: the gate ajar with warm light
```
Save to docs/content/posts/i-avoid-someone-i-wronged/after-v1.jpg.
The same lane, empty now, the gate standing wide open with warm light
spilling into the lane. He went in. The walk was shorter than the
avoiding was.
```

**`i-am-carrying-my-family-alone`** — ref `i-am-carrying-my-family-alone-v1.jpg`; detail: the two baskets in his hands
```
Save to docs/content/posts/i-am-carrying-my-family-alone/after-v1.jpg.
The same climbing street, empty: the two covered baskets set down side
by side on the doorstep, the door open. Delivered home, again, like
every dawn.
```
