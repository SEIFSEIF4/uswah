import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, LOCALES } from "@/lib/i18n";
import { intentionsByGroup } from "@/lib/content";

const copy = {
  en: {
    title: "The same day, differently",
    lede: "An ordinary act becomes worship when the intention behind it is corrected. Not by doing more, but by knowing what it is for.",
    act: "The act",
    intention: "The intention",
  },
  ar: {
    title: "اليوم نفسه، بنيّة أخرى",
    lede: "العمل المعتاد يصير عبادة بتصحيح النية من ورائه. لا بأن تزيد، بل بأن تعرف لماذا تفعل.",
    act: "العمل",
    intention: "النية",
  },
  tr: {
    title: "Aynı gün, başka türlü",
    lede: "Sıradan bir fiil, arkasındaki niyet düzeltildiğinde ibadete dönüşür. Daha fazlası değil, ne için yaptığın sorulur.",
    act: "Fiil",
    intention: "Niyet",
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

      {/* Act, the turn, then the intention. The act aligns to the reading edge so the
          mark between them sits against two straight edges rather than floating. */}
      {(await intentionsByGroup()).map(({ group, items }) => (
        <section key={group.slug} className="intent-group">
          <h2>{group[locale]}</h2>
          <ul className="intent-list">
            {items.map((i) => (
              <li key={i.slug} id={i.slug}>
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
                    {/* The label links to dorar's permalink for the hadith: the citation
                        and its verification are one click, not two claims. */}
                    {i.source.dorar ? (
                      <a
                        href={`https://dorar.net/h/${i.source.dorar.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {i.source.label[locale]} · Dorar.net
                      </a>
                    ) : (
                      i.source.label[locale]
                    )}
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
