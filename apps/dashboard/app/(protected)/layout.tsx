import Link from "next/link";
import { adminEmail, SITE_URL } from "@/lib/admin";
import { signOut } from "../login/actions";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * The proxy guarantees a session; this layer decides whether it is an admin's.
 * Every server action re-checks on its own - layout checks are UX, not the
 * trust boundary.
 */
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const email = await adminEmail();

  if (!email) {
    return (
      <main className="mx-auto max-w-sm px-6 py-24 text-sm">
        <div className="mb-6 flex justify-end">
          <ThemeToggle />
        </div>
        <h1 className="text-xl font-semibold">Not an admin account</h1>
        <p className="mt-2 text-muted-foreground">
          This address is signed in but not listed in ADMIN_EMAILS.
        </p>
        <form action={signOut} className="mt-6">
          <Button variant="outline" type="submit">
            Sign out
          </Button>
        </form>
      </main>
    );
  }

  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex h-12 max-w-5xl items-center gap-5 px-6">
          <Link href="/" className="text-sm font-semibold">
            Uswah <span className="text-muted-foreground">Dashboard</span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Situations
          </Link>
          <Link href="/sayings" className="text-sm text-muted-foreground hover:text-foreground">
            Sayings
          </Link>
          <Link href="/intentions" className="text-sm text-muted-foreground hover:text-foreground">
            Intentions
          </Link>
          <a href={SITE_URL} className="text-sm text-muted-foreground hover:text-foreground">
            View site
          </a>
          <div className="ms-auto flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{email}</span>
            <ThemeToggle />
            <form action={signOut}>
              <Button variant="ghost" size="sm" type="submit">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </>
  );
}
