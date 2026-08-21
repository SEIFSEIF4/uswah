import { notFound } from "next/navigation";
import { adminEmail, loadDorar, loadSituationDoc, SITE_URL, type DorarRow } from "@/lib/admin";
import { Badge } from "@/components/ui/badge";
import { SituationForm } from "../situation-form";

export default async function EditSituation({ params }: { params: Promise<{ slug: string }> }) {
  const email = await adminEmail();
  if (!email) return null; // the layout is showing the not-an-admin screen

  const { slug } = await params;
  const [doc, dorar] = await Promise.all([loadSituationDoc(slug), loadDorar(slug)]);
  if (!doc) notFound();

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-xl font-semibold">{slug}</h1>
        {doc.published ? <Badge>live</Badge> : <Badge variant="outline">draft</Badge>}
        {doc.published && (
          <a href={`${SITE_URL}/en/${slug}`} className="text-sm text-muted-foreground hover:underline">
            View page
          </a>
        )}
      </div>
      {dorar && <DorarPanel row={dorar} />}
      <SituationForm initial={doc} mode="edit" reviewer={email} />
    </>
  );
}

type DorarResult = {
  text?: string;
  rawi?: string;
  book?: string;
  ref?: string;
  grade?: string;
  mohdith?: string;
};

/**
 * What dorar.net returned for this saying — the checking aid, next to the fields
 * being checked. Verbatim and read-only; the review still means opening the
 * printed collection.
 */
function DorarPanel({ row }: { row: DorarRow }) {
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
