import { adminEmail, situationSlugs } from "@/lib/admin";
import { SayingForm } from "../saying-form";

export default async function NewSaying() {
  if (!(await adminEmail())) return null; // the layout is showing the not-an-admin screen

  return (
    <>
      <h1 className="mb-6 text-xl font-semibold">New saying</h1>
      <SayingForm mode="create" situations={await situationSlugs()} />
    </>
  );
}
