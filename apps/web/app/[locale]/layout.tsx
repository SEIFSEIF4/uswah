import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Inter, Newsreader, Noto_Naskh_Arabic } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { LOCALES, dirFor, isLocale } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleSwitch } from "@/components/locale-switch";
import { SiteSearch } from "@/components/site-search";
import { TopicsMenu } from "@/components/topics-menu";
import { MastheadNav } from "@/components/masthead-nav";
import { InstallPrompt } from "@/components/install-prompt";
import { PushPrompt } from "@/components/push-prompt";
import { Wordmark } from "@/components/logo";
import { searchIndex, topicMenu } from "@/lib/content";
import "../globals.css";

const latin = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-latin" });

// Editorial serif for Latin headings — the register Qalam works in, and a deliberate
// counterweight to Inter carrying the small type.
const display = Newsreader({ subsets: ["latin", "latin-ext"], variable: "--font-display" });

// Thmanyah Serif Text carries Arabic interface and body copy.
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

// Its display cut, for Arabic headlines only.
const displayAr = localFont({
  variable: "--font-display-ar",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/thmanyah/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/thmanyah/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/thmanyah/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

// Naskh stays reserved for Quran and hadith, which is what it is cut for.
const scripture = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-scripture",
});

export const metadata: Metadata = {
  // Absolute URLs in og:image and canonicals resolve against this. Without the
  // Vercel fallback, production pointed scrapers at localhost and every share
  // card's image came up broken.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  title: "Uswah",
  description:
    "Practical guidance for real situations, from the original source.",
  // og:site_name — link previews (Discord above the title, others below) name the
  // site from this; without it every shared card reads as anonymous.
  openGraph: {
    siteName: "Uswah",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Uswah",
  },
  formatDetection: {
    telephone: false,
  },
};

// Status-bar / splash chrome: light page ground, dark reading ground, sand for the
// install splash so it matches the mark behind the glyph.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#15171c" },
  ],
  colorScheme: "light dark",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const copy = {
  en: {
    home: "Uswah",
    intentions: "Intentions",
    quotes: "Sayings",
    search: "Search",
    saved: "Saved",
    sample: "Preview build. Sources are quoted verbatim from Dorar.net; the commentary is not yet scholar-reviewed.",
  },
  ar: {
    home: "أسوة",
    intentions: "النيّات",
    quotes: "مقولات",
    search: "بحث",
    saved: "المحفوظات",
    sample: "نسخة معاينة. المصادر منقولة حرفيًا من الدرر السنية، والشرح لم يُراجَع علميًا بعد.",
  },
  tr: {
    home: "Uswah",
    intentions: "Niyetler",
    quotes: "Sözler",
    search: "Ara",
    saved: "Kaydedilenler",
    sample: "Önizleme sürümü. Kaynaklar Dorar.net'ten olduğu gibi alınmıştır; yorumlar henüz ilmî incelemeden geçmedi.",
  },
} as const;

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
    <html
      lang={locale}
      dir={dirFor(locale)}
      suppressHydrationWarning
    >
      <body
        className={`${latin.variable} ${display.variable} ${arabic.variable} ${displayAr.variable} ${scripture.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="mx-auto flex min-h-screen max-w-[76rem] flex-col px-6">
            {/* Masthead: the wordmark owns its own line, the way a masthead does, and the
                bar under it carries navigation. No signed-in state here on purpose —
                reading cookies in the layout would make every page dynamic. */}
            <header className="masthead">
              <Link href={`/${locale}`} className="wordmark">
                {locale === "ar" ? <Wordmark className="wordmark-ar" /> : t.home}
              </Link>
            </header>
            {/* Outside <header> on purpose: a sticky element can only travel inside its
                own parent's box, so the bar has to be a child of the tall page column. */}
            <div className="masthead-bar">
              <TopicsMenu locale={locale} topics={await topicMenu(locale)} />
              {/* Saved is not here on purpose: it is empty for anyone not signed in, and
                  the way in is the save itself. It stays in the footer for the return trip. */}
              <MastheadNav
                items={[
                  { href: `/${locale}/quotes`, label: t.quotes },
                  { href: `/${locale}/intentions`, label: t.intentions },
                ]}
              />
              <div className="masthead-tools">
                <LocaleSwitch locale={locale} />
                <SiteSearch
                  locale={locale}
                  index={await searchIndex(locale)}
                />
                <ThemeToggle locale={locale} />
              </div>
            </div>
            <main className="flex-1 pb-16">{children}</main>
            {/* Reference: qalam.global — oversized wordmark left, link row and fine print
                right. The wave is the seam: the footer ground is a different tone from the
                page in both themes, and a straight rule would read as a border instead of
                a change of ground. */}
            <footer className="site-footer">
              <svg className="footer-wave" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 38C200 2 380 66 600 40 820 14 1000 68 1200 32V60H0z" />
              </svg>
              <div className="footer-inner">
                <nav className="footer-nav">
                  <Link href={`/${locale}/quotes`}>{t.quotes}</Link>
                  <Link href={`/${locale}/intentions`}>{t.intentions}</Link>
                  <Link href={`/${locale}/saved`}>{t.saved}</Link>
                  <Link href={`/${locale}/search`}>{t.search}</Link>
                </nav>
                <div className="footer-id">
                  <span className="footer-mark">
                    {locale === "ar" ? <Wordmark className="wordmark-ar" /> : t.home}
                  </span>
                  <p className="footer-fine">{t.sample}</p>
                </div>
              </div>
              {/* The copyright is a colophon line, not a sibling of the navigation: it sits
                  on its own rule at the foot, with the accounts opposite. */}
              {/* No social row: the accounts do not exist yet, and a link that goes
                  nowhere is a promise the footer cannot keep. It returns with real
                  handles. */}
              <div className="footer-legal">
                <p className="footer-fine">© {new Date().getFullYear()} {t.home}</p>
              </div>
            </footer>
          </div>
          <InstallPrompt locale={locale} />
          <PushPrompt locale={locale} />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
