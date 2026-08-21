import Link from "next/link";
import { adminEmail, listIntentions } from "@/lib/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteIntentionAction, setIntentionPublishedAction } from "../actions";
import { RowActions } from "../row-actions";

export default async function Intentions() {
  if (!(await adminEmail())) return null; // the layout is showing the not-an-admin screen
  const intentions = await listIntentions();

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Intentions</h1>
          <p className="text-sm text-muted-foreground">
            {intentions.length} in the database · {intentions.filter((i) => i.published_at).length} live
          </p>
        </div>
        <Button render={<Link href="/intentions/new" />}>New intention</Button>
      </div>

      {intentions.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Nothing in the database yet. Add an intention here, or import the ones from the
          web client with <code>pnpm content:import</code>.
        </p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-start text-xs text-muted-foreground">
              <th className="py-2 pe-3 text-start font-medium">Slug</th>
              <th className="py-2 pe-3 text-start font-medium">Act</th>
              <th className="py-2 pe-3 text-start font-medium">Group</th>
              <th className="py-2 pe-3 text-start font-medium">Languages</th>
              <th className="py-2 pe-3 text-start font-medium">Status</th>
              <th className="py-2 text-end font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {intentions.map((i) => (
              <tr key={i.slug} className="border-b last:border-0">
                <td className="py-2.5 pe-3">
                  <Link href={`/intentions/${i.slug}`} className="font-medium hover:underline">
                    {i.slug}
                  </Link>
                </td>
                <td className="py-2.5 pe-3 text-muted-foreground">{i.act || "—"}</td>
                <td className="py-2.5 pe-3 text-muted-foreground">{i.act_group}</td>
                <td className="py-2.5 pe-3 text-muted-foreground">{i.locales.join(", ") || "—"}</td>
                <td className="py-2.5 pe-3">
                  {i.published_at ? <Badge>live</Badge> : <Badge variant="outline">draft</Badge>}
                </td>
                <td className="py-2.5 text-end">
                  <RowActions
                    slug={i.slug}
                    published={i.published_at !== null}
                    publish={setIntentionPublishedAction}
                    remove={deleteIntentionAction}
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
