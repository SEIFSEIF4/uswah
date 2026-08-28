"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOPICS, topicName } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/**
 * The horizontally scrolling category bar from Nawiya, where acts of worship and the gym
 * sit in one row. Here it is topics, and the current one is marked rather than merely
 * coloured, so it survives being read without colour.
 */
export function TopicBar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const all = { en: "All", ar: "الكل", tr: "Tümü" }[locale];
  const onAll = !pathname.includes("/topics/");

  return (
    <nav className="topic-bar" aria-label={{ en: "Topics", ar: "المواضيع", tr: "Konular" }[locale]}>
      {/* Situations, unfiltered, not home. This bar is a filter on the situations
          list, and "All" has to clear the filter, not leave it. */}
      <Link href={`/${locale}/situations`} aria-current={onAll ? "page" : undefined}>
        {all}
      </Link>
      {TOPICS.map((t) => {
        const href = `/${locale}/topics/${t.slug}`;
        return (
          <Link key={t.slug} href={href} aria-current={pathname === href ? "page" : undefined}>
            {topicName(t.slug, locale)}
          </Link>
        );
      })}
    </nav>
  );
}
