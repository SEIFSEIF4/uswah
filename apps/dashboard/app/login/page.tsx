import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { signIn } from "./actions";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirect?: string }>;
}) {
  const { error, redirect } = await searchParams;

  return (
    <main className="mx-auto max-w-sm px-6 py-24">
      <div className="mb-6 flex justify-end">
        <ThemeToggle />
      </div>
      <h1 className="text-xl font-semibold">
        Uswah <span className="text-muted-foreground">Dashboard</span>
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Sign in with an admin account.</p>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <form action={signIn} className="mt-6 grid gap-3">
        <input type="hidden" name="redirect" value={redirect ?? ""} />
        <label className="grid gap-1 text-xs font-medium text-muted-foreground">
          Email
          <Input name="email" type="email" required autoComplete="email" dir="ltr" autoFocus />
        </label>
        <label className="grid gap-1 text-xs font-medium text-muted-foreground">
          Password
          <Input name="password" type="password" required autoComplete="current-password" dir="ltr" />
        </label>
        <Button type="submit" className="justify-self-start">
          Sign in
        </Button>
      </form>
    </main>
  );
}
