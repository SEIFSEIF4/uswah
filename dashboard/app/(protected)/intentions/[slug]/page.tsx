import { notFound } from "next/navigation";
import { adminEmail, loadDorar, loadIntentionDoc, SITE_URL } from "@/lib/admin";
import { Badge } from "@/components/ui/badge";
import { DorarPanel } from "../../dorar-panel";
import { IntentionForm } from "../intention-form";

export default async function EditIntention({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await adminEmail())) return null; // the layout is showing the not-an-admin screen

  const { slug } = await params;
  const [doc, dorar] = await Promise.all([loadIntentionDoc(slug), loadDorar(slug)]);
  if (!doc) notFound();

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-xl font-semibold">{slug}</h1>
        {doc.published ? <Badge>live</Badge> : <Badge variant="outline">draft</Badge>}
        {doc.published && (
          <a
            href={`${SITE_URL}/en/intentions#${slug}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            View page
          </a>
        )}
      </div>
      {dorar && <DorarPanel row={dorar} />}
      <IntentionForm initial={doc} mode="edit" />
    </>
  );
}
