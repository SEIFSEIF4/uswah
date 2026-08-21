import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Cookieless read client for public content. Keeping it separate from the
 * cookie-aware client in ./server is what lets situation pages stay statically
 * generated: nothing here can depend on who is asking.
 *
 * RLS restricts it to published rows, so the publishable key is safe to ship.
 */
export const db = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);
