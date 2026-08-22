# Saved Sayings and Copy Feedback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reliable localized copy feedback and let authenticated readers save sayings with a heart and find them on the Saved page.

**Architecture:** Keep situation saves and saying saves in separate, foreign-keyed tables under owner-only RLS. Quote pages read and mutate saying saves through Supabase server components and server actions, while a client heart reflects only confirmed server state. A small injected clipboard helper provides native-copy and legacy fallback behavior to both existing sharing surfaces.

**Tech Stack:** Next.js 16 App Router, React 19 server actions, TypeScript, Supabase Postgres/RLS, `@supabase/ssr`, Node `assert`, and `tsx` tests.

**Spec:** `docs/superpowers/specs/2026-08-23-saved-sayings-and-copy-feedback-design.md`

## Global Constraints

- Keep `saved_situations` unchanged and add a separate `saved_sayings` table.
- Saved state must come from the server-rendered prop, never an optimistic click toggle.
- Signed-out save attempts redirect to the localized login page and return to the same quote.
- Copy feedback must support English, Arabic, and Turkish success and failure messages.
- RLS must restrict every saved-saying row to its owning authenticated user.
- Explicitly grant required table operations to `authenticated`; grant nothing to `anon`.
- Preserve unrelated dirty dashboard and intention-import work throughout implementation.

---

### Task 1: Saved-sayings schema, RLS, and generated types

**Files:**
- Create via CLI: `supabase/migrations/*_saved_sayings.sql`
- Create: `supabase/tests/saved_sayings.test.sql`
- Modify by generation: `apps/web/lib/supabase/database.types.ts`
- Modify by generation: `apps/dashboard/lib/supabase/database.types.ts`

**Interfaces:**
- Produces table `public.saved_sayings(user_id uuid, saying_id uuid, created_at timestamptz)`.
- Produces generated `Database["public"]["Tables"]["saved_sayings"]` types used by Tasks 3 and 4.
- Depends on existing `public.sayings(id)` and `auth.users(id)`.

- [ ] **Step 1: Create the migration through the Supabase CLI**

Run:

```bash
supabase migration new saved_sayings
```

Expected: one new empty file matching `supabase/migrations/*_saved_sayings.sql`.

- [ ] **Step 2: Write the RLS regression test before filling the migration**

Create `supabase/tests/saved_sayings.test.sql`:

```sql
begin;

select plan(5);

insert into auth.users (id, instance_id, aud, role)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated');

insert into sayings (id, slug, saying, grade, published_at)
values ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'save-test', 'Save test', 'sahih', now());

set local role anon;
select is((select count(*) from saved_sayings), 0::bigint, 'anon cannot read saved sayings');
select throws_ok(
  $$insert into saved_sayings (user_id, saying_id)
    values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccccc')$$,
  '42501',
  null,
  'anon cannot insert saved sayings'
);
reset role;

select set_config('request.jwt.claim.sub', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true);
set local role authenticated;
insert into saved_sayings (user_id, saying_id)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccccc');
select is((select count(*) from saved_sayings), 1::bigint, 'owner can read own save');

select set_config('request.jwt.claim.sub', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', true);
select is((select count(*) from saved_sayings), 0::bigint, 'another user cannot read the save');
delete from saved_sayings
where saying_id = 'cccccccc-cccc-cccc-cccc-cccccccccccc';

reset role;
select set_config('request.jwt.claim.sub', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true);
set local role authenticated;
select is((select count(*) from saved_sayings), 1::bigint, 'another user cannot delete the save');

reset role;
select * from finish();
rollback;
```

- [ ] **Step 3: Run the database test to verify it fails because the table is absent**

Run:

```bash
supabase start
supabase db reset --local
supabase test db supabase/tests/saved_sayings.test.sql --local
```

Expected: FAIL with `relation "saved_sayings" does not exist`.

- [ ] **Step 4: Fill the generated migration**

Write this SQL into the file created in Step 1:

```sql
create table public.saved_sayings (
  user_id   uuid not null references auth.users(id) on delete cascade,
  saying_id uuid not null references public.sayings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, saying_id)
);

create index saved_sayings_saying_id_idx on public.saved_sayings (saying_id);

alter table public.saved_sayings enable row level security;

create policy own_saved_sayings
on public.saved_sayings
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

grant select, insert, delete on table public.saved_sayings to authenticated;
revoke all on table public.saved_sayings from anon;
```

- [ ] **Step 5: Reset the local database and verify the RLS test passes**

Run:

```bash
supabase db reset --local
supabase test db supabase/tests/saved_sayings.test.sql --local
```

Expected: 5 tests pass and the command exits 0.

- [ ] **Step 6: Dry-run and apply the migration to the linked project**

Run:

```bash
supabase db push --linked --dry-run
supabase db push --linked
```

Expected: the dry run lists only the new saved-sayings migration; the push records it in
remote migration history without applying unrelated local files.

- [ ] **Step 7: Regenerate both application type files without losing dirty work**

Before generation, capture the existing dashboard type diff:

```bash
git diff -- apps/dashboard/lib/supabase/database.types.ts > /tmp/uswah-dashboard-types-before.patch
pnpm db:types
rg -n "saved_sayings" apps/web/lib/supabase/database.types.ts apps/dashboard/lib/supabase/database.types.ts
```

Expected: both generated files contain `saved_sayings`, its three columns, and the
`saved_sayings_saying_id_fkey` relationship. Compare the post-generation dashboard diff with
`/tmp/uswah-dashboard-types-before.patch`; if generation removed any pre-existing intention
types, restore those generated blocks before continuing.

- [ ] **Step 8: Commit the schema deliverable**

Stage the generated migration, database test, and the two type files only after confirming
no unrelated dashboard source files are staged:

```bash
git add supabase/migrations/*_saved_sayings.sql supabase/tests/saved_sayings.test.sql \
  apps/web/lib/supabase/database.types.ts apps/dashboard/lib/supabase/database.types.ts
git diff --cached --check
git commit -m "add saved sayings storage"
```

---

### Task 2: Reliable shared clipboard helper

**Files:**
- Create: `apps/web/lib/clipboard.ts`
- Create: `apps/web/lib/clipboard.test.ts`
- Modify: `apps/web/components/article-parts.tsx`
- Modify: `apps/web/components/share-card.tsx`
- Modify: `apps/web/app/globals.css`

**Interfaces:**
- Produces `copyText(text: string, dependencies?: CopyDependencies): Promise<boolean>`.
- `CopyDependencies` exposes optional `writeText` and `legacyCopy` functions so Node tests do
  not need a DOM.
- Both sharing components consume the boolean result and render localized status feedback.

- [ ] **Step 1: Write failing helper tests**

Create `apps/web/lib/clipboard.test.ts`:

```ts
import assert from "node:assert/strict";
import { copyText } from "./clipboard";

let fallbackCalls = 0;

assert.equal(
  await copyText("https://uswah.app/en", {
    writeText: async () => undefined,
    legacyCopy: () => {
      fallbackCalls += 1;
      return true;
    },
  }),
  true,
);
assert.equal(fallbackCalls, 0, "native success must not invoke the fallback");

assert.equal(
  await copyText("https://uswah.app/ar", {
    writeText: async () => {
      throw new Error("clipboard blocked");
    },
    legacyCopy: () => true,
  }),
  true,
  "fallback should recover from Clipboard API rejection",
);

assert.equal(
  await copyText("https://uswah.app/tr", {
    writeText: async () => {
      throw new Error("clipboard blocked");
    },
    legacyCopy: () => false,
  }),
  false,
  "total copy failure must be reported",
);

console.log("clipboard fallback: ok");
```

- [ ] **Step 2: Run the helper test and verify the module is missing**

Run:

```bash
pnpm --filter web exec tsx lib/clipboard.test.ts
```

Expected: FAIL with `Cannot find module './clipboard'`.

- [ ] **Step 3: Implement the helper**

Create `apps/web/lib/clipboard.ts`:

```ts
export type CopyDependencies = {
  writeText?: (text: string) => Promise<void>;
  legacyCopy?: (text: string) => boolean;
};

function browserLegacyCopy(text: string) {
  if (typeof document === "undefined") return false;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

export async function copyText(text: string, dependencies: CopyDependencies = {}) {
  const writeText =
    dependencies.writeText ??
    (typeof navigator !== "undefined" ? navigator.clipboard?.writeText.bind(navigator.clipboard) : undefined);
  const legacyCopy = dependencies.legacyCopy ?? browserLegacyCopy;

  if (writeText) {
    try {
      await writeText(text);
      return true;
    } catch {
      // The legacy path supports insecure localhost origins and denied clipboard access.
    }
  }

  return legacyCopy(text);
}
```

- [ ] **Step 4: Run the helper tests and verify all three paths pass**

Run:

```bash
pnpm --filter web exec tsx lib/clipboard.test.ts
```

Expected: `clipboard fallback: ok` and exit 0.

- [ ] **Step 5: Integrate localized status into the article share row**

In `apps/web/components/article-parts.tsx`:

- Import `copyText` from `@/lib/clipboard`.
- Expand each locale to include `copyFailed`.
- Replace boolean `copied` with `copyStatus: "copied" | "failed" | null`.
- At click time use `window.location.href`, call `copyText`, and set the matching status.
- Store the timeout ID in a ref, clear it before replacing it, and clear it on unmount.
- Render the toast whenever status is non-null and choose `t.copied` or `t.copyFailed`.
- Add `is-error` only for failure so color is not the only semantic signal; the text remains
  explicit in all locales.

Use these failure strings:

```ts
en: "Could not copy the link"
ar: "تعذّر نسخ الرابط"
tr: "Bağlantı kopyalanamadı"
```

- [ ] **Step 6: Integrate the same helper into the image-share dialog**

In `apps/web/components/share-card.tsx`:

- Import `copyText`.
- Add the same three localized `copyFailed` strings.
- Replace the direct `navigator.clipboard.writeText` call with `copyText`.
- Use `copyStatus: "copied" | "failed" | null` and display the corresponding message in the
  existing `.sheet-copy` control.
- Reset the status after two seconds and clear the timer on unmount.

- [ ] **Step 7: Add the failure toast style and run scoped checks**

Add to `apps/web/app/globals.css`:

```css
.share-toast.is-error {
  border-color: color-mix(in srgb, var(--destructive) 42%, var(--rule));
  color: var(--destructive);
}
```

Run:

```bash
pnpm --filter web exec tsx lib/clipboard.test.ts
pnpm --filter web exec eslint lib/clipboard.ts lib/clipboard.test.ts \
  components/article-parts.tsx components/share-card.tsx
```

Expected: clipboard test passes; edited files have no lint errors. Existing unrelated lint
warnings elsewhere do not block this task.

- [ ] **Step 8: Commit the clipboard deliverable**

```bash
git add apps/web/lib/clipboard.ts apps/web/lib/clipboard.test.ts \
  apps/web/components/article-parts.tsx apps/web/components/share-card.tsx \
  apps/web/app/globals.css
git diff --cached --check
git commit -m "fix copy feedback across share controls"
```

---

### Task 3: Confirmed saying-save action and heart control

**Files:**
- Create: `apps/web/app/[locale]/quotes/actions.ts`
- Create: `apps/web/components/saying-save-button.tsx`
- Create: `apps/web/scripts/saved-sayings-flow.test.ts`
- Modify: `apps/web/app/[locale]/quotes/[slug]/page.tsx`
- Modify: `apps/web/app/globals.css`
- Modify: `apps/web/package.json`

**Interfaces:**
- Produces server action `toggleSaveSaying(formData: FormData): Promise<void>`.
- Produces component `SayingSaveButton({ label, savedLabel, pendingLabel, saved })`.
- Consumes `saved_sayings` types from Task 1.

- [ ] **Step 1: Write the failing source-flow regression test**

Create `apps/web/scripts/saved-sayings-flow.test.ts`:

```ts
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const button = readFileSync(new URL("../components/saying-save-button.tsx", import.meta.url), "utf8");
const page = readFileSync(new URL("../app/[locale]/quotes/[slug]/page.tsx", import.meta.url), "utf8");
const action = readFileSync(new URL("../app/[locale]/quotes/actions.ts", import.meta.url), "utf8");

assert.doesNotMatch(button, /onClick=.*set.*saved/i, "heart must not optimistically toggle");
assert.match(button, /aria-pressed=\{saved\}/);
assert.match(page, /from\("saved_sayings"\)/);
assert.match(page, /<SayingSaveButton/);
assert.match(action, /redirect\([\s\S]*\/quotes\//, "login must return to the quote");
assert.match(action, /if \(existing\)[\s\S]*delete\(\)[\s\S]*else[\s\S]*insert/);
assert.match(action, /if \(error\) throw error/, "database failures must not claim success");

console.log("saved sayings flow: ok");
```

- [ ] **Step 2: Run the flow test and verify the new modules are absent**

Run:

```bash
pnpm --filter web exec tsx scripts/saved-sayings-flow.test.ts
```

Expected: FAIL because `saying-save-button.tsx` or `quotes/actions.ts` does not exist.

- [ ] **Step 3: Implement the server action**

Create `apps/web/app/[locale]/quotes/actions.ts` with `"use server"`, importing
`revalidatePath`, `redirect`, `createClient`, `isLocale`, `DEFAULT_LOCALE`,
`DEFAULT_LOGIN_ROUTE`, and `DEFAULT_REDIRECT_ROUTE`.

Implement this contract:

```ts
export async function toggleSaveSaying(formData: FormData) {
  const localeValue = String(formData.get("locale") ?? DEFAULT_LOCALE);
  const locale = isLocale(localeValue) ? localeValue : DEFAULT_LOCALE;
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) return;

  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) {
    const returnTo = `/${locale}/quotes/${slug}`;
    redirect(`/${locale}${DEFAULT_LOGIN_ROUTE}?redirect=${encodeURIComponent(returnTo)}`);
  }

  const { data: saying, error: sayingError } = await supabase
    .from("sayings")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (sayingError) throw sayingError;
  if (!saying) return;

  const { data: existing, error: readError } = await supabase
    .from("saved_sayings")
    .select("saying_id")
    .eq("saying_id", saying.id)
    .maybeSingle();
  if (readError) throw readError;

  const { error } = existing
    ? await supabase.from("saved_sayings").delete().eq("saying_id", saying.id)
    : await supabase.from("saved_sayings").insert({ user_id: userId, saying_id: saying.id });
  if (error) throw error;

  revalidatePath(`/${locale}/quotes/${slug}`);
  revalidatePath(`/${locale}${DEFAULT_REDIRECT_ROUTE}`);
}
```

- [ ] **Step 4: Implement the non-optimistic heart component**

Create `apps/web/components/saying-save-button.tsx` as a client component using
`useFormStatus`. Render an authored 24 by 24 heart SVG with `fill={saved ? "currentColor" :
"none"}` and a consistent 1.7 stroke. The button must use:

```tsx
className={saved ? "saying-save is-saved" : "saying-save"}
aria-pressed={saved}
aria-busy={pending}
disabled={pending}
```

Its visible label is `pending ? pendingLabel : saved ? savedLabel : label`. Do not add local
saved state or an `onClick` handler.

- [ ] **Step 5: Read confirmed state and render the heart on quote pages**

In `apps/web/app/[locale]/quotes/[slug]/page.tsx`:

- Import `createClient`, `toggleSaveSaying`, and `SayingSaveButton`.
- Add localized `save`, `saved`, `saving` copy:

```ts
en: { save: "Save", saved: "Saved", saving: "Saving…" }
ar: { save: "احفظ", saved: "محفوظ", saving: "جارٍ الحفظ…" }
tr: { save: "Kaydet", saved: "Kaydedildi", saving: "Kaydediliyor…" }
```

- After loading `q`, call `supabase.auth.getClaims()`.
- If a user exists, resolve the saying ID by slug and query `saved_sayings` for that ID.
- Set `saved = Boolean(savedRow)` only from the query result.
- Add a form beside `ShareCard` containing hidden locale and slug fields and the heart.

Use this structure inside `.share-row`:

```tsx
<div className="quote-actions">
  <ShareCard {...shareCardProps} />
  <form action={toggleSaveSaying}>
    <input type="hidden" name="locale" value={locale} />
    <input type="hidden" name="slug" value={slug} />
    <SayingSaveButton
      label={t.save}
      savedLabel={t.saved}
      pendingLabel={t.saving}
      saved={saved}
    />
  </form>
</div>
```

- [ ] **Step 6: Style the quote actions and heart states**

In `apps/web/app/globals.css`, make `.quote-actions` an inline flex row with the existing
`.5rem` control gap. Match `.saying-save` height, padding, border, radius, type, hover,
disabled, and focus behavior to `.share-card`. Fill the saved heart with `var(--brand)` and
use both fill and visible “Saved” text so color is not the only state cue.

- [ ] **Step 7: Register and run the flow test**

Add to `apps/web/package.json` scripts:

```json
"saved-sayings:test": "tsx scripts/saved-sayings-flow.test.ts"
```

Run:

```bash
pnpm --filter web saved-sayings:test
pnpm --filter web exec eslint app/'[locale]'/quotes/actions.ts \
  app/'[locale]'/quotes/'[slug]'/page.tsx components/saying-save-button.tsx \
  scripts/saved-sayings-flow.test.ts
```

Expected: flow test passes; edited files have no lint errors.

- [ ] **Step 8: Commit the saying-save flow**

```bash
git add apps/web/app/'[locale]'/quotes/actions.ts \
  apps/web/app/'[locale]'/quotes/'[slug]'/page.tsx \
  apps/web/components/saying-save-button.tsx apps/web/scripts/saved-sayings-flow.test.ts \
  apps/web/app/globals.css apps/web/package.json
git diff --cached --check
git commit -m "add confirmed saying saves"
```

---

### Task 4: Saved page saying section

**Files:**
- Create: `apps/web/scripts/saved-page-sections.test.ts`
- Modify: `apps/web/app/[locale]/saved/page.tsx`
- Modify: `apps/web/package.json`

**Interfaces:**
- Consumes owner-filtered `saved_situations` and `saved_sayings` joins.
- Produces localized Saved-page sections linking sayings to `/<locale>/quotes/<slug>`.

- [ ] **Step 1: Write the failing page-structure test**

Create `apps/web/scripts/saved-page-sections.test.ts`:

```ts
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../app/[locale]/saved/page.tsx", import.meta.url), "utf8");

assert.match(page, /from\("saved_sayings"\)/);
assert.match(page, /sayings!inner/);
assert.match(page, /saying_translations/);
assert.match(page, /\/quotes\/\$\{s\.slug\}/);
for (const heading of ["Situations", "المواقف", "Durumlar", "Sayings", "المقولات", "Sözler"]) {
  assert.match(page, new RegExp(heading), `missing section heading: ${heading}`);
}

console.log("saved page sections: ok");
```

- [ ] **Step 2: Run the test and verify it fails on the missing query**

Run:

```bash
pnpm --filter web exec tsx scripts/saved-page-sections.test.ts
```

Expected: FAIL because the page has no `saved_sayings` query.

- [ ] **Step 3: Add localized section copy and the saying query**

Expand Saved-page copy with these fields:

```ts
en: { situations: "Situations", sayings: "Sayings" }
ar: { situations: "المواقف", sayings: "المقولات" }
tr: { situations: "Durumlar", sayings: "Sözler" }
```

Rename the existing `data` result to `situationData`. Add:

```ts
const { data: sayingData } = await supabase
  .from("saved_sayings")
  .select("sayings!inner(slug, saying, saying_translations(saying, locale))")
  .eq("sayings.saying_translations.locale", locale)
  .order("created_at", { ascending: false });
```

Normalize `savedSituations = situationData ?? []` and `savedSayings = sayingData ?? []`.
Keep the page-level empty message only when both arrays are empty.

- [ ] **Step 4: Render both sections without nested cards**

Render each non-empty section with an `<h2 className="section-title">` and a semantic list.
Keep the existing situation list markup. Saying items link to
`/${locale}/quotes/${s.slug}` and display:

```tsx
s.saying_translations[0]?.saying ?? s.saying
```

Use `dir="auto"` on saying text. Do not invent summaries for sayings and do not show an
empty message inside one section while the other section has content.

- [ ] **Step 5: Register and run the saved-page test**

Add to `apps/web/package.json`:

```json
"saved-page:test": "tsx scripts/saved-page-sections.test.ts"
```

Run:

```bash
pnpm --filter web saved-page:test
pnpm --filter web exec eslint app/'[locale]'/saved/page.tsx scripts/saved-page-sections.test.ts
```

Expected: section test passes and edited files have no lint errors.

- [ ] **Step 6: Commit the Saved-page deliverable**

```bash
git add apps/web/app/'[locale]'/saved/page.tsx \
  apps/web/scripts/saved-page-sections.test.ts apps/web/package.json
git diff --cached --check
git commit -m "show saved sayings in saved page"
```

---

### Task 5: Full verification, production check, and push

**Files:**
- Verify all files from Tasks 1 through 4.
- Do not modify unrelated dashboard intention-import files.

**Interfaces:**
- Verifies the schema, clipboard helper, server action, heart control, and Saved page as one
  deployable flow.

- [ ] **Step 1: Run all focused regression tests**

Run:

```bash
pnpm --filter web feedback:test
pnpm --filter web exec tsx lib/clipboard.test.ts
pnpm --filter web saved-sayings:test
pnpm --filter web saved-page:test
pnpm --filter web routes:test
supabase test db supabase/tests/saved_sayings.test.sql --local
```

Expected: every command exits 0. Record any unrelated pre-existing test failure separately;
do not claim the full suite passes if one command fails.

- [ ] **Step 2: Run scoped lint and the production build**

Run:

```bash
pnpm --filter web exec eslint \
  lib/clipboard.ts lib/clipboard.test.ts \
  components/article-parts.tsx components/share-card.tsx \
  components/saying-save-button.tsx \
  app/'[locale]'/quotes/actions.ts app/'[locale]'/quotes/'[slug]'/page.tsx \
  app/'[locale]'/saved/page.tsx \
  scripts/saved-sayings-flow.test.ts scripts/saved-page-sections.test.ts
pnpm --filter web build
```

Expected: scoped lint has zero errors and the Next.js production build exits 0.

- [ ] **Step 3: Verify the linked database schema and grants**

Using the database password already stored in `apps/web/.env.local`, run a read-only query
through the existing pooler connection:

```bash
pnpm db:types
rg -n "saved_sayings" apps/web/lib/supabase/database.types.ts \
  apps/dashboard/lib/supabase/database.types.ts
supabase migration list --linked
```

Expected: the remote-generated types include `saved_sayings`, and migration history lists the
new migration as applied both locally and remotely.

- [ ] **Step 4: Perform browser acceptance checks**

Run `pnpm dev:web`, then verify all three locales:

1. Signed out, click the heart on `/ar/quotes/teach-a-man-to-fish`; confirm login opens and
   the redirect parameter points back to the same Arabic quote.
2. Sign in, click the heart; confirm the pending label appears and the filled state appears
   only after the server action returns.
3. Open `/ar/saved`; confirm the saying appears under `المقولات` and links back correctly.
4. Unsave it; confirm it disappears from Saved after navigation or refresh.
5. Click the article copy icon with normal Clipboard API access; confirm the localized toast.
6. Block clipboard permission in browser settings and click again; confirm the textarea
   fallback still produces success, or the explicit localized failure toast appears.
7. Repeat copy feedback in English and Turkish and inside the image-share dialog.

- [ ] **Step 5: Review repository state and push only intended commits**

Run:

```bash
git status --short
git log --oneline --decorate -8
git diff origin/main...HEAD --stat
git fetch origin main
git status -sb
git push origin main
```

Expected: only the planned saved-saying and clipboard commits are ahead of `origin/main`;
unrelated dashboard intention-import changes remain unstaged and local; push succeeds.
