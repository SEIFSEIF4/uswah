# Situation artwork

The situations are replacing their museum folios with an in-house gouache
series, generated one at a time, reviewed against the brief, and wired in
through the database. One image per situation; the concept always comes
from the situation's own hadith. The recurring back-view figure is the
reader, never a depicted person; still life is used where the hadith
itself supplies the object.

Pipeline per image: generate to a versioned filename (never overwrite),
review at full size, commit, push, point the situation's `image_url` at
it with credit, license, `cleared_by`, and fresh `image_alt` in en/ar/tr,
then flush the `content:situations` cache tag.

## Status

- [x] `asked-for-money-again` — rope and firewood in a courtyard (`/art/asked-for-money.jpg`)
- [x] `my-boss-wronged-me` — the open window, no veil (`/art/my-boss-wronged-me-v1.jpg`)
- [x] `i-cannot-stop-being-angry` — the minute of stillness on the rooftop (`/art/i-cannot-stop-being-angry-v2.jpg`)
- [x] `my-parents-ask-too-much` — two glasses of tea, the visit kept (`/art/my-parents-ask-too-much-v1.jpg`)
- [x] `a-friend-let-me-down` — the walker takes the wider path (`/art/a-friend-let-me-down-v2.jpg`)
- [x] `i-am-in-debt` — the debt counted out before dawn (`/art/i-am-in-debt-v1.jpg`)
- [x] `i-was-passed-over` — two lamps, one shelf, nothing taken (`/art/i-was-passed-over-v1.jpg`)
- [x] `i-keep-putting-it-off` — the daily watering, recorded in rings (`/art/i-keep-putting-it-off-v1.jpg`)
- [x] `someone-spoke-badly-of-me` — light through closed shutters (`/art/someone-spoke-badly-of-me-v1.jpg`)
- [x] `i-lost-someone` — rain on the window, the folded shawl (`/art/i-lost-someone-v1.jpg`)
- [x] `i-cannot-forgive-myself` — the door ajar, morning light entering (`/art/i-cannot-forgive-myself-v1.jpg`)
- [x] `i-am-far-from-home` — the traveler's door (`/art/i-am-far-from-home-v1.jpg`)
- [x] `i-said-something-i-regret` — the tipped jug, what cannot be unsaid (`/art/i-said-something-i-regret-v1.jpg`)
- [x] `i-cannot-afford-to-be-generous` — the sabeel water jar (`/art/i-cannot-afford-to-be-generous-v1.jpg`)
- [x] `my-work-feels-pointless` — the workbench honored at day's end (`/art/my-work-feels-pointless-v1.jpg`)
- [x] `i-avoid-someone-i-wronged` — the walk you owe (figure) (`/art/i-avoid-someone-i-wronged-v1.jpg`)
- [x] `i-am-waiting-and-nothing-changes` — the dough rising unseen (`/art/i-am-waiting-and-nothing-changes-v1.jpg`)
- [x] `i-am-carrying-my-family-alone` — the carrier dignified (figure) (`/art/i-am-carrying-my-family-alone-v1.jpg`)

## Shared block

Include with every prompt below:

```
SERIES STYLE (include with each prompt): Editorial illustration, 1920x1280,
landscape 3:2, for the Uswah series. Flat matte gouache with visible brush
strokes and paper grain. Palette: warm golden-ochre plaster and stone,
olive-grey wood and scrub, blue-grey shadow and night, one small warm
terracotta or amber accent per image. Never overwrite an existing file; if
the target name is taken, use the next free -v2, -v3 suffix.
HARD RULES, always: no text, no lettering, no calligraphy, no borders, no
gloss, no photorealism, no oversaturation, no birds or animals. When a
figure is specified: exactly one, the same recurring figure as the rooftop
and path pieces — plain dark contemporary clothing, seen entirely from
behind, face never visible, no visible finger detail.
```

## Prompts

### `someone-spoke-badly-of-me` — light through closed shutters

```
Save to apps/web/public/art/someone-spoke-badly-of-me-v1.jpg.
Subject: a quiet street-side house wall at night, seen straight on from
outside. One window with olive-green wooden shutters closed, and warm
amber lamplight from inside seeping through the slats and the thin gap
between them, falling in soft bars on the sill. The house is calm, the
light steady; nothing about the window is dark or hostile. The meaning:
the words stayed inside, and the warmth did not go out. A run of
terracotta roof tiles caps the wall as the warm accent; night sky above,
deep blue-grey, plain.
Extra bans: no figures or silhouettes behind or near the window, no
shadows of people in the light, no other lit windows, no moon, no stars.
Check: the slat-light bars must land softly on the sill; that detail says
the silence is warm.
```

### `i-lost-someone` — grief allowed, contained

```
Save to apps/web/public/art/i-lost-someone-v1.jpg.
Subject: a room interior on a rainy afternoon, seen toward the window. Rain
runs down the glass; outside is soft grey. Beside the window, an empty
wooden chair with a shawl folded neatly over its back, and on the sill a
cup of tea gone cold, still full. The room is tidy and warm-toned; grief
is present but the house is not dark. No figure.
Extra bans: no lightning, no storm, no wilted flowers, no candles.
Check: the rain must be painted streaks on the glass, not photoreal drops.
```

### `i-cannot-forgive-myself` — the return is welcomed

```
Save to apps/web/public/art/i-cannot-forgive-myself-v1.jpg.
Subject: a dark, plain room. The door to the outside stands ajar, and
strong clean morning light enters through the gap, laying a bright path
across the floor toward the viewer. Dust motes in the beam painted as
faint flecks. Nothing blocks the doorway; the latch is open. The meaning:
the way back is already open, wider than expected. No figure.
Extra bans: no religious objects, no dramatic god-rays fanning out, one
single honest beam only.
Check: the beam edge should be soft-brushed, not an airbrushed glow.
```

### `i-am-far-from-home` — the traveler's door

```
Save to apps/web/public/art/i-am-far-from-home-v1.jpg.
Subject: an open doorway at dawn seen from inside a bare, swept room. On
the floor by the threshold: a packed canvas travel bag, closed, and a
plain wooden walking staff leaning on the jamb. Through the door, a pale
dirt road runs into open country and morning haze. The room holds
nothing else; the traveler keeps only what he can carry. No figure.
Extra bans: no suitcase with straps and buckles detail, no map, no shoes
lined up, no keys.
Check: the road should visibly continue to the horizon; it is the point.
```

### `i-said-something-i-regret` — what cannot be unsaid

```
Save to apps/web/public/art/i-said-something-i-regret-v1.jpg.
Subject: a courtyard corner in hard afternoon light. A clay water jug
lies tipped on its side on dry, cracked earth, and the spilled water has
run out in a long dark stain, already sinking in, its edge irregular and
final. The jug is intact, not broken; nothing else happened. The meaning:
nothing is damaged except that the water cannot go back.
Extra bans: no broken pottery, no shards, no mud, no puddle reflections.
Check: the stain reads as absorbed darkness in the earth, not shiny water.
```

### `i-cannot-afford-to-be-generous` — charity without money

```
Save to apps/web/public/art/i-cannot-afford-to-be-generous-v1.jpg.
Subject: a street corner against an ochre wall in morning light. A large
plain clay water jar stands in a small shaded wooden stand, a simple
metal cup resting on its wooden lid, left out for any passerby to drink.
The ground around it is swept. This is the sabeel: water put out by
someone with nothing else to give. No figure.
Extra bans: no coins, no bowl for money, no sign hung on the jar.
Check: the jar must look tended (swept ground, seated lid), not abandoned.
```

### `my-work-feels-pointless` — the work honored at day's end

```
Save to apps/web/public/art/my-work-feels-pointless-v1.jpg.
Subject: a small workbench at night under one hanging metal work lamp.
The day's tools are cleaned and laid in a neat row on a cloth; wood
shavings are swept into a small pile with the brush still beside it. The
lamp's warm pool falls exactly on the ordered tools. The meaning: the
care given to the work is visible even when no one sees the work.
Extra bans: no branded tools, no machine tools, no clutter, no coffee mug.
Check: tools should be simple and generic (plane, chisel, mallet), edges
painted flat, no metallic gloss.
```

### `i-avoid-someone-i-wronged` — the walk you owe (figure)

```
Save to apps/web/public/art/i-avoid-someone-i-wronged-v1.jpg.
Subject: a short, narrow lane between ochre walls in late-afternoon
light, ending at a wooden gate that stands slightly ajar, warm light
beyond it. The recurring figure walks down the lane toward the gate,
mid-stride, about a quarter of frame height, seen from behind, posture
resolved rather than hesitant. His shadow stretches back down the lane
behind him. The meaning: settling it today, before the walk gets longer.
Extra bans: no second figure at the gate, no one visible beyond it.
Check: the gate's gap must read as invitation (warm light), not threat.
```

### `i-am-waiting-and-nothing-changes` — the answer being prepared unseen

```
Save to apps/web/public/art/i-am-waiting-and-nothing-changes-v1.jpg.
Subject: a quiet kitchen corner. On a flour-dusted wooden table, a clay
bowl covered with a clean cloth, dough rising unseen beneath it, the
cloth gently domed. Beside it, embers glow low and patient in a small
bread oven's mouth as the amber accent. Nothing moves; everything is
working. The meaning: the unanswered wait is not an idle one.
Extra bans: no finished bread, no flames, only embers; no utensils
beyond one wooden spoon; no figure.
Check: the cloth's dome is the story; it must read as gently lifted.
```

### `i-am-carrying-my-family-alone` — the carrier dignified (figure)

```
Save to apps/web/public/art/i-am-carrying-my-family-alone-v1.jpg.
Subject: a dawn street climbing gently uphill toward a home doorway. The
recurring figure walks up it away from us, carrying a laden basket in
each hand, shoulders level and steady under the weight, unhurried. The
baskets are covered with cloth; their contents are not itemized. Long
soft morning shadow behind him. The meaning: the daily carrying, done
with dignity, like the mujahid of the hadith.
Extra bans: no bent or suffering posture, the weight is real but carried
well; no children or family visible at the door.
Check: the two baskets must hang level; uneven arms are the anatomy risk.
```
