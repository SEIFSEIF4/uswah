import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, LOCALES } from "@/lib/i18n";
import { intentionsByGroup } from "@/lib/content";

const copy = {
  en: {
    title: "The same day, differently",
    lede: "An ordinary act becomes worship when the intention behind it is corrected. Nothing here asks you to do more. It asks what the thing you are already doing is for.",
    act: "The act",
    intention: "The intention",
    pending: "Awaiting a reviewer",
  },
  ar: {
    title: "اليوم نفسه، بنيّة أخرى",
    lede: "العمل المعتاد يصير عبادة بتصحيح النية من ورائه. لا شيء هنا يطلب منك أن تزيد، وإنما يسأل: ما الذي تفعله من أجله أصلًا؟",
    act: "العمل",
    intention: "النية",
    pending: "بانتظار المراجعة",
  },
} as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: `${copy[locale].title} · Uswah`,
    description: copy[locale].lede,
    alternates: {
      canonical: `/${locale}/intentions`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/intentions`])),
    },
  };
}

export default async function Intentions({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = copy[locale];

  return (
    <>
      <h1 className="page-title">{t.title}</h1>
      <p className="lede">{t.lede}</p>

      {/* Act on the left, intention on the right, with the turn between them shown as a
          mark rather than described. The two columns are the whole idea. */}
      {intentionsByGroup().map(({ group, items }) => (
        <section key={group.slug} className="intent-group">
          <h2>{group[locale]}</h2>
          <ul className="intent-list">
            {items.map((i) => (
              <li key={i.slug}>
                <span className="intent-act">{i.act[locale]}</span>
                <span className="intent-turn" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d={locale === "ar" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="intent-main">
                  <p className="intent-line">{i[locale].intention}</p>
                  <p className="intent-note">{i[locale].note}</p>
                  <span className="intent-source">
                    {i.source.label[locale]}
                    {i.source.placeholder && <em> · {t.pending}</em>}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
