import { notFound } from "next/navigation";
import { adminEmail, loadDorar, loadSayingDoc, situationSlugs, SITE_URL } from "@/lib/admin";
import { Badge } from "@/components/ui/badge";
import { DorarPanel } from "../../dorar-panel";
import { SayingForm } from "../saying-form";

export default async function EditSaying({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await adminEmail())) return null; // the layout is showing the not-an-admin screen

  const { slug } = await params;
  const [doc, dorar, situations] = await Promise.all([
    loadSayingDoc(slug),
    loadDorar(slug),
    situationSlugs(),
  ]);
  if (!doc) notFound();

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-xl font-semibold">{slug}</h1>
        {doc.published ? <Badge>live</Badge> : <Badge variant="outline">draft</Badge>}
        {doc.published && (
          <a
            href={`${SITE_URL}/en/quotes/${slug}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            View page
          </a>
        )}
      </div>
      {dorar && <DorarPanel row={dorar} />}
      <SayingForm initial={doc} mode="edit" situations={situations} />
    </>
  );
}
