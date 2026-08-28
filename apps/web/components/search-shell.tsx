"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Types straight into the URL. The server owns matching, and will own the Arabic-
 * normalising RPC once the database lands, so results follow a keystroke instead of a
 * submit, without a second copy of the index living in the client.
 *
 * It owns the results area as well as the field, because the field is the only thing that
 * knows a result is stale: the server sends one page for one `q`, so nothing downstream
 * can tell that a newer query is already on its way.
 */
export function SearchShell({
  locale,
  q,
  placeholder,
  label,
  searching,
  children,
}: {
  locale: string;
  q: string;
  placeholder: string;
  label: string;
  searching: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [value, setValue] = useState(q);
  const [navigating, startNavigation] = useTransition();

  useEffect(() => {
    if (value === q) return;
    // ponytail: fixed 200ms debounce, tune only if the RPC turns out slower than typing.
    const id = setTimeout(() => {
      const term = value.trim();
      startNavigation(() => {
        router.replace(
          term ? `/${locale}/search?q=${encodeURIComponent(term)}` : `/${locale}/search`,
          { scroll: false },
        );
      });
    }, 200);
    return () => clearTimeout(id);
  }, [value, q, locale, router]);

  const term = value.trim();
  /* Stale covers the wait before the request as well as the request itself: the moment a
     key lands, what is on screen answers the previous question. Holding the old results
     through the debounce and only then admitting it would put the flicker back. */
  const stale = term !== q || navigating;

  return (
    <>
      <form className="search-form" role="search">
        <label htmlFor="q" className="sr-only">
          {label}
        </label>
        <Input
          id="q"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />
        <Button type="submit" variant="ghost">
          {label}
        </Button>
      </form>

      {(term || q) && (
        <div className="search-results" aria-busy={stale}>
          {/* Keyed so each answer is a new element and fades in, rather than the old text
              being overwritten in place while the reader is still on it. */}
          <div key={stale ? "loading" : q} className="search-fade">
            {stale ? <ResultsSkeleton label={searching} /> : children}
          </div>
        </div>
      )}
    </>
  );
}

/** Three rows in the shape of .listrow, so nothing jumps when the real ones land. */
function ResultsSkeleton({ label }: { label: string }) {
  return (
    <>
      <p className="sr-only" role="status">
        {label}
      </p>
      {/* The status line stays outside .rows: inside, it takes :first-child and the top
          rule moves off the first row, which is a 1px jump when the real rows arrive. */}
      <div className="rows">
        {[0, 1, 2].map((i) => (
          <div key={i} className="listrow skeleton-row" aria-hidden="true">
            <span className="skeleton skeleton-thumb" />
            <span className="skeleton-text">
              <span className="skeleton skeleton-line meta" />
              <span className="skeleton skeleton-line title" />
              <span className="skeleton skeleton-line body" />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
