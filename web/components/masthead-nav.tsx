"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The header links, with the current section marked.
 *
 * Client-side because the layout cannot see the path. A section counts as current for
 * its own page and everything under it, so reading a saying keeps Sayings lit rather
 * than dropping the reader's sense of where they are the moment they open something.
 */
export function MastheadNav({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();

  return (
    <nav className="masthead-nav">
      {items.map(({ href, label }) => {
        const current = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} aria-current={current ? "page" : undefined}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
