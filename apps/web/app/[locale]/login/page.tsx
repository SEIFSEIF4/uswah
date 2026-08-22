import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { isLocale } from "@/lib/i18n";
import { authErrorMessage } from "@/lib/auth-errors";
import { OtpRetryNotice } from "@/components/otp-retry-notice";
import { requestOtp, restartOtp, verifyOtp } from "./actions";

const copy = {
  en: {
    title: "Sign in",
    lede: "Only needed to save situations. Everything else is open.",
    email: "Email",
    send: "Send a code",
    codeTitle: "Check your email",
    codeLede: "We sent a six-digit code to",
    code: "Code",
    verify: "Sign in",
    other: "Use a different address",
    expired: "That code request has expired. Start again.",
  },
  ar: {
    title: "تسجيل الدخول",
    lede: "لا يلزم إلا لحفظ المواقف. وما عدا ذلك متاح للجميع.",
    email: "البريد الإلكتروني",
    send: "أرسل الرمز",
    codeTitle: "راجع بريدك",
    codeLede: "أرسلنا رمزًا من ستة أرقام إلى",
    code: "الرمز",
    verify: "دخول",
    other: "استخدم بريدًا آخر",
    expired: "انتهت صلاحية الطلب. ابدأ من جديد.",
  },
  tr: {
    title: "Giriş yap",
    lede: "Yalnızca durumları kaydetmek için gerekli. Geri kalan her şey herkese açık.",
    email: "E-posta",
    send: "Kod gönder",
    codeTitle: "E-postanı kontrol et",
    codeLede: "Altı haneli bir kod gönderdik:",
    code: "Kod",
    verify: "Giriş yap",
    other: "Başka bir adres kullan",
    expired: "Bu kod isteğinin süresi doldu. Yeniden başla.",
  },
} as const;

export default async function Login({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; sent?: string; retry?: string; expired?: string; redirect?: string }>;
}) {
  const { locale } = await params;
  const { error, sent, retry, expired, redirect } = await searchParams;
  if (!isLocale(locale)) notFound();

  const t = copy[locale];
  const pending = (await cookies()).get("uswah_otp_email")?.value;
  // The code step needs an address to verify against; without one, ask for it again.
  const retrySeconds = retry ? Number.parseInt(retry, 10) : 0;
  const onCodeStep = Boolean((sent || retrySeconds > 0) && pending);

  return (
    <div className="auth">
      <h1>{onCodeStep ? t.codeTitle : t.title}</h1>
      <p className="lede">
        {onCodeStep ? (
          <>
            {t.codeLede} <strong dir="ltr">{pending}</strong>
          </>
        ) : (
          t.lede
        )}
      </p>

      {expired && <p className="auth-notice is-error">{t.expired}</p>}
      {error && (
        <p role="alert" className="auth-notice is-error">
          {authErrorMessage(error, locale)}
        </p>
      )}
      {retrySeconds > 0 && <OtpRetryNotice locale={locale} seconds={retrySeconds} />}

      <form className="auth-form">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="redirect" value={redirect ?? ""} />

        {onCodeStep ? (
          <>
            <label className="auth-field">
              <span>{t.code}</span>
              <input
                name="token"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                minLength={6}
                maxLength={6}
                required
                autoFocus
                dir="ltr"
              />
            </label>
            <div className="auth-actions">
              <button formAction={verifyOtp} className="auth-primary">
                {t.verify}
              </button>
              <button formAction={restartOtp} className="auth-secondary">
                {t.other}
              </button>
            </div>
          </>
        ) : (
          <>
            <label className="auth-field">
              <span>{t.email}</span>
              <input name="email" type="email" required autoComplete="email" dir="ltr" />
            </label>
            <div className="auth-actions">
              <button formAction={requestOtp} className="auth-primary">
                {t.send}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
