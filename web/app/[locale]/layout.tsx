import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Inter, Newsreader, Noto_Naskh_Arabic } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { LOCALES, isLocale } from "@/lib/i18n";
import { USING_SAMPLE_DATA } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitch } from "@/components/locale-switch";
import "../globals.css";

const latin = Inter({ subsets: ["latin"], variable: "--font-latin" });

// Editorial serif for Latin headings — the register Qalam works in, and a deliberate
// counterweight to Inter carrying the small type.
const display = Newsreader({ subsets: ["latin"], variable: "--font-display" });

// Thmanyah Serif Text carries Arabic interface and body copy.
const arabic = localFont({
  variable: "--font-arabic",
  display: "swap",
  src: [
    { path: "../../public/fonts/thmanyah/thmanyahseriftext/woff2/thmanyahseriftext-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/thmanyah/thmanyahseriftext/woff2/thmanyahseriftext-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/thmanyah/thmanyahseriftext/woff2/thmanyahseriftext-Bold.woff2", weight: "700", style: "normal" },
  ],
});

// Its display cut, for Arabic headlines only.
const displayAr = localFont({
  variable: "--font-display-ar",
  display: "swap",
  src: [
    { path: "../../public/fonts/thmanyah/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/thmanyah/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/thmanyah/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
});

// Naskh stays reserved for Quran and hadith, which is what it is cut for.
const scripture = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-scripture" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Uswah",
  description: "Practical guidance for real situations, from the original source.",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const copy = {
  en: {
    home: "Uswah",
    quotes: "Sayings",
    search: "Search",
    saved: "Saved",
    sample: "Sample data. Layout preview only, and no source here is verified.",
  },
  ar: {
    home: "أسوة",
    quotes: "مقولات",
    search: "بحث",
    saved: "المحفوظات",
    sample: "بيانات تجريبية لمعاينة التصميم فقط. لا مصدر هنا مُتحقَّق منه.",
  },
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
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body
        className={`${latin.variable} ${display.variable} ${arabic.variable} ${displayAr.variable} ${scripture.variable} font-sans antialiased`}
      >
        {USING_SAMPLE_DATA && <div className="sample-banner">{t.sample}</div>}
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6">
          <header className="flex items-center justify-between gap-4 border-b border-rule py-5">
            <Link href={`/${locale}`} className="font-serif text-xl">
              {t.home}
            </Link>
            {/* No signed-in state here on purpose: reading cookies in the layout would
                make every page dynamic and cost the static generation. */}
            <nav className="flex items-center gap-5 text-sm">
              <Link href={`/${locale}/quotes`} className="text-muted hover:text-foreground">
                {t.quotes}
              </Link>
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
          <main className="flex-1 pb-16">{children}</main>
          <footer className="border-t border-rule py-6 text-xs text-faint">
            {t.home} · {t.sample}
          </footer>
        </div>
      </body>
    </html>
  );
}
