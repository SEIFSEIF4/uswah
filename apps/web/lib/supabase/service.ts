import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Service-role client. Bypasses RLS, only for server code that already decided the
 * caller is allowed (push subscribe/unsubscribe, admin-style writes). Never import
 * this from a Client Component.
 */
let service: SupabaseClient<Database> | undefined;

export function serviceDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
  }
  service ??= createClient<Database>(url, key, {
    auth: { persistSession: false },
  });
  return service;
}
