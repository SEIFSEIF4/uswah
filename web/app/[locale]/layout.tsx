import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { LOCALES, isLocale } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitch } from "@/components/locale-switch";
import "../globals.css";

const latin = Inter({ subsets: ["latin"], variable: "--font-latin" });

// Thmanyah Serif Text carries all Arabic interface and body copy.
const arabic = localFont({
  variable: "--font-arabic",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/thmanyah/thmanyahseriftext/woff2/thmanyahseriftext-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/thmanyah/thmanyahseriftext/woff2/thmanyahseriftext-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/thmanyah/thmanyahseriftext/woff2/thmanyahseriftext-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

// Naskh stays reserved for Quran and hadith, which is what it is cut for.
const scripture = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-scripture" });

export const metadata: Metadata = {
  // Makes canonical and hreflang absolute, which is what crawlers need.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Uswah",
  description: "Practical guidance for real situations, from the original source.",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const copy = {
  en: { home: "Uswah", search: "Search", saved: "Saved" },
  ar: { home: "أسوة", search: "بحث", saved: "المحفوظات" },
} as const;

// Runs before first paint so a saved dark choice never flashes white.
const themeScript = `
try {
  var t = localStorage.getItem('theme');
  if (t === 'dark' || t === 'light') document.documentElement.dataset.theme = t;
} catch (e) {}
`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = copy[locale];

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        {/* beforeInteractive so it is in the HTML and runs during parse, ahead of
            first paint. A raw <script> element here would warn under React 19. */}
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body
        className={`${latin.variable} ${arabic.variable} ${scripture.variable} font-sans antialiased`}
      >
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6">
          <header className="flex items-center justify-between gap-4 border-b border-rule py-6">
            <Link href={`/${locale}`} className="text-lg font-semibold">
              {t.home}
            </Link>
            {/* No signed-in state here on purpose: reading cookies in the layout would
                make every page dynamic and cost the static generation. Saved redirects
                to login when signed out. */}
            <nav className="flex items-center gap-5 text-sm">
              <Link href={`/${locale}/search`} className="text-muted hover:text-foreground">
                {t.search}
              </Link>
              <Link href={`/${locale}/saved`} className="text-muted hover:text-foreground">
                {t.saved}
              </Link>
              <LocaleSwitch locale={locale} />
              <ThemeToggle locale={locale} />
            </nav>
          </header>
          <main className="flex-1 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
