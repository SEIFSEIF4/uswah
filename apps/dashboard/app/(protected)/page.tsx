import Link from "next/link";
import { adminEmail, listSituations } from "@/lib/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteSituationAction, setPublishedAction } from "./actions";
import { RowActions } from "./row-actions";

export default async function Situations() {
  if (!(await adminEmail())) return null; // the layout is showing the not-an-admin screen
  const situations = await listSituations();

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Situations</h1>
          <p className="text-sm text-muted-foreground">
            {situations.length} in the database · {situations.filter((s) => s.published_at).length} live
          </p>
        </div>
        <Button render={<Link href="/new" />}>New situation</Button>
      </div>

      {situations.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Nothing in the database yet. Add a situation here, or push the YAML files with{" "}
          <code>pnpm content:push --apply</code>.
        </p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-start text-xs text-muted-foreground">
              <th className="py-2 pe-3 text-start font-medium">Slug</th>
              <th className="py-2 pe-3 text-start font-medium">Languages</th>
              <th className="py-2 pe-3 text-start font-medium">Entries</th>
              <th className="py-2 pe-3 text-start font-medium">Review</th>
              <th className="py-2 pe-3 text-start font-medium">Image</th>
              <th className="py-2 pe-3 text-start font-medium">Status</th>
              <th className="py-2 text-end font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {situations.map((s) => (
              <tr key={s.slug} className="border-b last:border-0">
                <td className="py-2.5 pe-3">
                  <Link href={`/${s.slug}`} className="font-medium hover:underline">
                    {s.slug}
                  </Link>
                </td>
                <td className="py-2.5 pe-3 text-muted-foreground">{s.locales.join(", ") || "-"}</td>
                <td className="py-2.5 pe-3 text-muted-foreground">{s.entryCount}</td>
                <td className="py-2.5 pe-3">
                  {s.unreviewed > 0 ? (
                    <Badge variant="destructive">{s.unreviewed} unverified</Badge>
                  ) : (
                    <span className="text-muted-foreground">reviewed</span>
                  )}
                </td>
                <td className="py-2.5 pe-3 text-muted-foreground">{s.image_url ? "yes" : "-"}</td>
                <td className="py-2.5 pe-3">
                  {s.published_at ? <Badge>live</Badge> : <Badge variant="outline">draft</Badge>}
                </td>
                <td className="py-2.5 text-end">
                  <RowActions
                    slug={s.slug}
                    published={s.published_at !== null}
                    publish={setPublishedAction}
                    remove={deleteSituationAction}
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
