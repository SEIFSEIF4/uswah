import Link from "next/link";
import { adminEmail, listSayings } from "@/lib/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteSayingAction, setSayingPublishedAction } from "../actions";
import { RowActions } from "../row-actions";

export default async function Sayings() {
  if (!(await adminEmail())) return null; // the layout is showing the not-an-admin screen
  const sayings = await listSayings();

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Sayings</h1>
          <p className="text-sm text-muted-foreground">
            {sayings.length} in the database · {sayings.filter((s) => s.published_at).length} live
          </p>
        </div>
        <Button render={<Link href="/sayings/new" />}>New saying</Button>
      </div>

      {sayings.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Nothing in the database yet. Add a saying here, or import the ones from the web
          client with <code>pnpm content:import</code>.
        </p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-start text-xs text-muted-foreground">
              <th className="py-2 pe-3 text-start font-medium">Slug</th>
              <th className="py-2 pe-3 text-start font-medium">Saying</th>
              <th className="py-2 pe-3 text-start font-medium">Grade</th>
              <th className="py-2 pe-3 text-start font-medium">Languages</th>
              <th className="py-2 pe-3 text-start font-medium">Status</th>
              <th className="py-2 text-end font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sayings.map((s) => (
              <tr key={s.slug} className="border-b last:border-0">
                <td className="py-2.5 pe-3">
                  <Link href={`/sayings/${s.slug}`} className="font-medium hover:underline">
                    {s.slug}
                  </Link>
                </td>
                <td className="max-w-64 truncate py-2.5 pe-3 text-muted-foreground">{s.saying}</td>
                <td className="py-2.5 pe-3">
                  {s.grade === "quran" || s.grade === "sahih" ? (
                    <Badge variant="outline">{s.grade}</Badge>
                  ) : (
                    <Badge variant="destructive">{s.grade}</Badge>
                  )}
                </td>
                <td className="py-2.5 pe-3 text-muted-foreground">{s.locales.join(", ") || "-"}</td>
                <td className="py-2.5 pe-3">
                  {s.published_at ? <Badge>live</Badge> : <Badge variant="outline">draft</Badge>}
                </td>
                <td className="py-2.5 text-end">
                  <RowActions
                    slug={s.slug}
                    published={s.published_at !== null}
                    publish={setSayingPublishedAction}
                    remove={deleteSayingAction}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
