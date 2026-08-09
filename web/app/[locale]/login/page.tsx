import { notFound } from "next/navigation";
import { isLocale } from "@/lib/supabase";
import { login, signup } from "./actions";

const copy = {
  en: {
    title: "Sign in",
    lede: "Only needed to save situations. Everything else is open.",
    email: "Email",
    password: "Password",
    login: "Sign in",
    signup: "Create account",
    check: "Check your email to confirm your account.",
  },
  ar: {
    title: "تسجيل الدخول",
    lede: "محتاجه بس عشان تحفظ المواقف. باقي الحاجات مفتوحة.",
    email: "الإيميل",
    password: "كلمة السر",
    login: "دخول",
    signup: "إنشاء حساب",
    check: "شوف إيميلك عشان تأكد الحساب.",
  },
} as const;

export default async function Login({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; check?: string; next?: string }>;
}) {
  const { locale } = await params;
  const { error, check, next } = await searchParams;
  if (!isLocale(locale)) notFound();

  const t = copy[locale];

  return (
    <div className="max-w-sm">
      <h1 className="text-2xl font-semibold">{t.title}</h1>
      <p className="mt-2 text-muted">{t.lede}</p>

      {check && (
        <p className="mt-6 border-s-2 border-foreground ps-4 text-sm">{t.check}</p>
      )}
      {error && (
        <p role="alert" className="mt-6 border-s-2 border-rule ps-4 text-sm">
          {error}
        </p>
      )}

      <form className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="next" value={next ?? ""} />

        <label className="flex flex-col gap-1 text-sm">
          {t.email}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="border-b border-rule bg-transparent py-2 text-base outline-none focus:border-foreground"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          {t.password}
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="current-password"
            className="border-b border-rule bg-transparent py-2 text-base outline-none focus:border-foreground"
          />
        </label>

        <div className="mt-2 flex items-center gap-5">
          <button
            formAction={login}
            className="border border-foreground px-4 py-2 text-sm font-medium"
          >
            {t.login}
          </button>
          <button formAction={signup} className="text-sm underline underline-offset-4">
            {t.signup}
          </button>
        </div>
      </form>
    </div>
  );
}
