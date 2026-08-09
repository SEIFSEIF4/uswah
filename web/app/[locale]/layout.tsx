import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import { LOCALES, isLocale } from "@/lib/supabase";
import "../globals.css";

const latin = Inter({ subsets: ["latin"], variable: "--font-latin" });
const arabic = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-arabic" });

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
  en: { home: "Uswah", search: "Search" },
  ar: { home: "أسوة", search: "بحث" },
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
  const other = locale === "en" ? "ar" : "en";

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${latin.variable} ${arabic.variable} font-sans antialiased`}>
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6">
          <header className="flex items-baseline justify-between gap-4 border-b border-rule py-6">
            <Link href={`/${locale}`} className="text-lg font-semibold">
              {t.home}
            </Link>
            <nav className="flex items-baseline gap-5 text-sm">
              <Link href={`/${locale}/search`} className="text-muted hover:text-foreground">
                {t.search}
              </Link>
              <Link href={`/${other}`} className="text-muted hover:text-foreground">
                {copy[other].home}
              </Link>
            </nav>
          </header>
          <main className="flex-1 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
