import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Read-only, publishable key. RLS is the boundary: this client can only ever see
// published rows, so it is safe in a browser bundle as well as on the server.
export const db = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const isLocale = (v: string): v is Locale =>
  (LOCALES as readonly string[]).includes(v);

// Slugs that would shadow a route. Enforced by the content pipeline, checked here too.
export const RESERVED_SLUGS = new Set(["search", "about"]);
