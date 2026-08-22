#!/bin/sh
# Regenerate Supabase types into both apps. Run after every migration: pnpm db:types
# Goes over the session pooler; the CLI account has no platform access (see README).
set -e
cd "$(dirname "$0")/.."

PW=$(grep '^SUPABASE_DB_PASSWORD=' apps/web/.env.local | cut -d= -f2-)
if [ -z "$PW" ]; then
  echo "SUPABASE_DB_PASSWORD missing from apps/web/.env.local" >&2
  exit 1
fi

OUT=apps/web/lib/supabase/database.types.ts
{
  echo "// Generated from the Supabase project. Do not edit by hand."
  echo "// Regenerate after every migration: pnpm db:types"
  echo
  supabase gen types typescript \
    --db-url "postgresql://postgres.rjkbhobntyhuochdmkkx:$PW@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
} > "$OUT.tmp"
mv "$OUT.tmp" "$OUT"
cp "$OUT" apps/dashboard/lib/supabase/database.types.ts
echo "database.types.ts regenerated for web + dashboard"
