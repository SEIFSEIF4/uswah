import { adminEmail } from "@/lib/admin";
import { IntentionForm } from "../intention-form";

export default async function NewIntention() {
  if (!(await adminEmail())) return null; // the layout is showing the not-an-admin screen

  return (
    <>
      <h1 className="mb-6 text-xl font-semibold">New intention</h1>
      <IntentionForm mode="create" />
    </>
  );
}
