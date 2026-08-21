import { Badge } from "@/components/ui/badge";
import type { DorarRow } from "@/lib/admin";

type DorarResult = {
  text?: string;
  rawi?: string;
  book?: string;
  ref?: string;
  grade?: string;
  mohdith?: string;
};

/**
 * What dorar.net returned for this slug — the checking aid, next to the fields
 * being checked. Verbatim and read-only; the review still means opening the
 * printed collection.
 */
export function DorarPanel({ row }: { row: DorarRow }) {
  const results = (Array.isArray(row.results) ? row.results : []) as DorarResult[];
  const categories = (Array.isArray(row.categories) ? row.categories : []) as { name?: string }[];
  const shown = results.slice(0, 5);

  return (
    <details open className="mb-4 rounded-xl border bg-muted/30 p-4 text-sm">
      <summary className="cursor-pointer font-semibold">
        dorar.net record{" "}
        <span className="font-normal text-muted-foreground">
          — fetched {row.fetched_at.slice(0, 10)}
          {row.hadith_id && (
            <>
              {" · "}
              <a
                href={`https://dorar.net/h/${row.hadith_id}`}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                dorar.net/h/{row.hadith_id}
              </a>
            </>
          )}
        </span>
      </summary>
      <div className="mt-3 grid gap-3">
        {shown.map((r, i) => (
          <div key={i} className="rounded-lg border bg-background p-3">
            <p dir="rtl" lang="ar" className="mb-2 leading-relaxed">
              {r.text}
            </p>
            <p dir="rtl" lang="ar" className="text-xs text-muted-foreground">
              {[r.rawi, [r.book, r.ref].filter(Boolean).join(" "), r.mohdith]
                .filter((v) => v && v !== "-")
                .join(" · ")}
              {r.grade && <Badge variant="outline" className="ms-2">{r.grade}</Badge>}
            </p>
          </div>
        ))}
        {results.length > shown.length && (
          <p className="text-xs text-muted-foreground">
            {results.length - shown.length} more grading(s) in the stored record.
          </p>
        )}
        {row.takhrij && (
          <p dir="rtl" lang="ar" className="text-xs text-muted-foreground">
            {row.takhrij}
          </p>
        )}
        {categories.length > 0 && (
          <p dir="rtl" lang="ar" className="text-xs text-muted-foreground">
            {categories.map((c) => c.name).filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </details>
  );
}
