import { adminEmail } from "@/lib/admin";
import { SituationForm } from "../situation-form";

export default async function NewSituation() {
  const email = await adminEmail();
  if (!email) return null; // the layout is showing the not-an-admin screen

  return (
    <>
      <h1 className="mb-6 text-xl font-semibold">New situation</h1>
      <SituationForm mode="create" reviewer={email} />
    </>
  );
}
