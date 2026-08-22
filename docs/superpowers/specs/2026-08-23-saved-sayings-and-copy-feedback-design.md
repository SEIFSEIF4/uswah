# Saved Sayings and Copy Feedback

## Goal

Let authenticated readers save individual sayings from quote pages and find them on the
existing Saved page. Make link copying reliable and always provide localized success or
failure feedback.

## Data Model

Add `saved_sayings` in the public schema:

- `user_id uuid not null references auth.users(id) on delete cascade`
- `saying_id uuid not null references sayings(id) on delete cascade`
- `created_at timestamptz not null default now()`
- Primary key on `(user_id, saying_id)`

Enable RLS. Authenticated users may select, insert, and delete only rows where
`auth.uid() = user_id`. Anonymous users receive no access. Explicitly grant the required
table operations to `authenticated` so the table remains usable when automatic Data API
exposure is disabled.

Keep `saved_situations` unchanged. A separate table preserves foreign-key integrity and
avoids a polymorphic content identifier with no database-level target guarantee.

## Saying Save Flow

The quote page reads the current user's claims. When authenticated, it checks for a matching
`saved_sayings` row and renders the confirmed state.

A server action receives the locale and saying slug:

1. Validate the locale and slug.
2. Read the authenticated user ID from Supabase claims.
3. If no user exists, redirect to the localized login route with the current quote URL as
   the return destination.
4. Resolve the saying ID by slug.
5. Delete an existing save or insert a new owned save.
6. Check Supabase errors rather than silently treating a failed write as success.
7. Revalidate the quote page and Saved page.

The client heart has no optimistic saved state. It may show a disabled pending state while
the action runs, but the outline or filled state comes only from the server-rendered prop.
The control sits beside “Share as image.” It uses an outlined heart when unsaved and a
filled brand-colored heart when saved, with localized visible text and accessible labels.

## Saved Page

The Saved page keeps one page title and renders two clearly labeled sections:

- Saved situations
- Saved sayings

Each section has its own query and empty-state handling. If both are empty, show the current
page-level empty message. Saying links use `/<locale>/quotes/<slug>` and display the localized
saying when available, falling back to the canonical saying text.

## Clipboard Feedback

Create one client-side clipboard helper shared by the article share row and image-share
dialog. It attempts `navigator.clipboard.writeText()` first. If the API is unavailable or
rejects, it falls back to a temporary readonly textarea and `document.execCommand("copy")`.
The temporary element is always removed.

Copy controls show localized feedback:

- Success: Link copied / نُسخ الرابط / Bağlantı kopyalandı
- Failure: Could not copy the link / تعذّر نسخ الرابط / Bağlantı kopyalanamadı

The article share row uses a fixed toast with `role="status"` and `aria-live="polite"`.
The image-share dialog uses the same result messages within its existing copy control so
feedback remains visible inside the open dialog. Timers are cleared on unmount and repeated
clicks replace the previous timer.

## Error Handling

- Missing auth redirects without showing a false saved state.
- Missing sayings and failed database operations do not change the heart state.
- Clipboard failure produces an explicit localized message instead of failing silently.
- Rapid repeated save clicks are prevented while the form action is pending.
- RLS remains the final ownership boundary even if a user submits another user ID manually.

## Verification

- Add a regression test proving the heart does not toggle in an `onClick` handler.
- Add clipboard helper tests for native success, fallback success, and total failure.
- Extend schema tests to confirm anonymous readers cannot see saved sayings and authenticated
  readers can access only their own rows.
- Run generated Supabase types or update both application type files from the schema.
- Run scoped lint, route tests, the new regression tests, and the production web build.
- Apply the migration to the linked Supabase project and verify insert, select, and delete
  under an authenticated user before considering the feature complete.
