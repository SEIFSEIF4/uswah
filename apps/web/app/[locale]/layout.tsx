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
import { SavedLink } from "@/components/saved-link";
import { MobileTools } from "@/components/mobile-tools";
import { MastheadNav } from "@/components/masthead-nav";
import { InstallPrompt } from "@/components/install-prompt";
import { PushPrompt } from "@/components/push-prompt";
import { Wordmark } from "@/components/logo";
import { searchIndex } from "@/lib/content";
import "../globals.css";

const latin = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-latin" });

// Editorial serif for Latin headings, the register Qalam works in, and a deliberate
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
  // og:site_name, link previews (Discord above the title, others below) name the
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
    homeLabel: "Uswah, home",
    situations: "Situations",
    intentions: "Intentions",
    quotes: "Sayings",
  },
  ar: {
    home: "أسوة",
    homeLabel: "أسوة، الصفحة الرئيسية",
    situations: "مواقف",
    intentions: "النيّات",
    quotes: "مقولات",
  },
  tr: {
    home: "Uswah",
    homeLabel: "Uswah, ana sayfa",
    situations: "Durumlar",
    intentions: "Niyetler",
    quotes: "Sözler",
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
  const navItems = [
    { href: `/${locale}/situations`, label: t.situations },
    { href: `/${locale}/quotes`, label: t.quotes },
    { href: `/${locale}/intentions`, label: t.intentions },
  ];

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
                bar under it carries navigation. No signed-in state here on purpose,
                reading cookies in the layout would make every page dynamic. */}
            <header className="masthead">
              <Link href={`/${locale}`} className="wordmark" aria-label={t.homeLabel}>
                {locale === "ar" ? <Wordmark className="wordmark-ar" /> : t.home}
              </Link>
            </header>
            {/* Outside <header> on purpose: a sticky element can only travel inside its
                own parent's box, so the bar has to be a child of the tall page column. */}
            <div className="masthead-bar">
              {/* Balances .masthead-tools on the other side so .masthead-nav lands in
                  the centre column instead of the layout collapsing to two. */}
              <span className="masthead-spacer" aria-hidden="true" />
              <MastheadNav items={navItems} />
              <div className="masthead-tools">
                <MobileTools locale={locale}>
                  {/* The sheet sits over the full viewport height, including where the
                      masthead wordmark lives, so opening it leaves the brand hidden
                      behind an otherwise unbranded panel. Repeated here at the top. */}
                  <Link href={`/${locale}`} className="mobile-tools-brand" aria-label={t.homeLabel}>
                    {locale === "ar" ? <Wordmark className="wordmark-ar" /> : t.home}
                  </Link>
                  {/* On a phone the link row above is hidden (see
                      .masthead-bar > .masthead-nav in globals.css) so a first-timer
                      meets one disclosure control, not two. Repeated here as a plain
                      row inside the sheet rather than left stranded outside it. */}
                  <div className="mobile-tools-nav">
                    <MastheadNav items={navItems} />
                  </div>
                  <LocaleSwitch locale={locale} />
                  <SiteSearch
                    locale={locale}
                    index={await searchIndex(locale)}
                  />
                  <SavedLink locale={locale} />
                  <ThemeToggle locale={locale} />
                </MobileTools>
              </div>
            </div>
            <main className="flex-1 pb-16">{children}</main>
            <p className="site-footer">© {new Date().getFullYear()} {t.home}</p>
          </div>
          <InstallPrompt locale={locale} />
          <PushPrompt locale={locale} />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
