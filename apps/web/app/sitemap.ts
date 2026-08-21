import type { MetadataRoute } from "next";
import { db } from "@/lib/supabase/public";
import { LOCALES } from "@/lib/i18n";

export const revalidate = 3600;

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // RLS means this only ever returns published situations.
  const { data } = await db.from("situations").select("slug");

  const paths = [
    ...LOCALES.map((l) => `/${l}`),
    ...(data ?? []).flatMap((s) => LOCALES.map((l) => `/${l}/${s.slug}`)),
  ];

  return paths.map((path) => ({ url: `${site}${path}`, lastModified: new Date() }));
}
