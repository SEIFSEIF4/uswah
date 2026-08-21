import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestOtp, restartOtp, verifyOtp } from "./actions";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string; expired?: string; redirect?: string }>;
}) {
  const { error, sent, expired, redirect } = await searchParams;
  const pending = (await cookies()).get("uswah_dash_otp_email")?.value;
  // The code step needs an address to verify against; without one, ask again.
  const onCodeStep = Boolean(sent) && Boolean(pending);

  return (
    <main className="mx-auto max-w-sm px-6 py-24">
      <h1 className="text-xl font-semibold">
        Uswah <span className="text-muted-foreground">Dashboard</span>
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {onCodeStep ? (
          <>
            We sent a six-digit code to <strong dir="ltr">{pending}</strong>
          </>
        ) : (
          "Sign in with an admin address."
        )}
      </p>

      {expired && (
        <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          That code request has expired. Start again.
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <form className="mt-6 grid gap-3">
        <input type="hidden" name="redirect" value={redirect ?? ""} />

        {onCodeStep ? (
          <>
            <label className="grid gap-1 text-xs font-medium text-muted-foreground">
              Code
              <Input
                name="token"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]*"
                maxLength={6}
                required
                autoFocus
                dir="ltr"
              />
            </label>
            <div className="flex gap-2">
              <Button formAction={verifyOtp} type="submit">
                Sign in
              </Button>
              <Button formAction={restartOtp} variant="ghost" type="submit">
                Use a different address
              </Button>
            </div>
          </>
        ) : (
          <>
            <label className="grid gap-1 text-xs font-medium text-muted-foreground">
              Email
              <Input name="email" type="email" required autoComplete="email" dir="ltr" autoFocus />
            </label>
            <Button formAction={requestOtp} type="submit" className="justify-self-start">
              Send a code
            </Button>
          </>
        )}
      </form>
    </main>
  );
}
