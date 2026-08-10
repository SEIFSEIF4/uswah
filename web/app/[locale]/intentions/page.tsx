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
      <div data-impeccable-variants="aa76b6b0" data-impeccable-variant-count="3" style={{ display: "contents" }}>
        {/* impeccable-variants-start aa76b6b0 */}
        {/* Original */}
        <div data-impeccable-variant="original" style={{ display: "contents" }}>
      <h1 className="page-title">{t.title}</h1>
      <p className="lede">{t.lede}</p>

      {/* Act, the turn, then the intention. The act aligns to the reading edge so the
          mark between them sits against two straight edges rather than floating. */}
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
        </div>

        {/* 1 — The turn moves. The chevron between act and intention is the whole idea, so it is the only thing that animates: each one slides into place down the list. Text never shifts. */}
        <div data-impeccable-variant="1" style={{ display: "contents" }}>
      <h1 className="page-title">{t.title}</h1>
      <p className="lede">{t.lede}</p>

      {/* Act, the turn, then the intention. The act aligns to the reading edge so the
          mark between them sits against two straight edges rather than floating. */}
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
        </div>

        {/* 2 — Intentions arrive. Each intention line lifts out of a shallow blur in sequence while the acts stay put, so the reading order is stated by the motion. */}
        <div data-impeccable-variant="2" style={{ display: "contents" }}>
      <h1 className="page-title">{t.title}</h1>
      <p className="lede">{t.lede}</p>

      {/* Act, the turn, then the intention. The act aligns to the reading edge so the
          mark between them sits against two straight edges rather than floating. */}
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
        </div>

        {/* 3 — On hover only. Nothing moves on arrival. Hovering a row advances the chevron and draws the intention a hair toward it, as though the act were being carried across. */}
        <div data-impeccable-variant="3" style={{ display: "contents" }}>
      <h1 className="page-title">{t.title}</h1>
      <p className="lede">{t.lede}</p>

      {/* Act, the turn, then the intention. The act aligns to the reading edge so the
          mark between them sits against two straight edges rather than floating. */}
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
        </div>

        <style data-impeccable-css="aa76b6b0">{`
          /* Each variant animates out of the readable state and runs on mount, so nothing
             depends on a scroll position that may already have passed. */

          @scope ([data-impeccable-variant="1"]) {
            :scope .intent-turn {
              animation: turn-in 620ms cubic-bezier(.16, 1, .3, 1) both;
            }
            :scope .intent-list li:nth-child(2) .intent-turn { animation-delay: 70ms; }
            :scope .intent-list li:nth-child(3) .intent-turn { animation-delay: 140ms; }
            @keyframes turn-in {
              from { opacity: 0; transform: translateX(-6px); }
              to   { opacity: 1; transform: none; }
            }
            [dir="rtl"] :scope .intent-turn { animation-name: turn-in-rtl; }
            @keyframes turn-in-rtl {
              from { opacity: 0; transform: translateX(6px); }
              to   { opacity: 1; transform: none; }
            }
          }

          @scope ([data-impeccable-variant="2"]) {
            :scope .intent-main {
              animation: intent-arrive 720ms cubic-bezier(.16, 1, .3, 1) both;
            }
            :scope .intent-list li:nth-child(2) .intent-main { animation-delay: 90ms; }
            :scope .intent-list li:nth-child(3) .intent-main { animation-delay: 180ms; }
            @keyframes intent-arrive {
              from { opacity: .45; filter: blur(4px); transform: translateY(8px); }
              to   { opacity: 1; filter: blur(0); transform: none; }
            }
          }

          @scope ([data-impeccable-variant="3"]) {
            :scope .intent-list li { transition: none; }
            :scope .intent-turn,
            :scope .intent-main {
              transition: transform .4s cubic-bezier(.16, 1, .3, 1), color .4s ease;
            }
            :scope .intent-list li:hover .intent-turn {
              transform: translateX(4px);
              color: var(--accent);
            }
            :scope .intent-list li:hover .intent-main { transform: translateX(2px); }
            [dir="rtl"] :scope .intent-list li:hover .intent-turn { transform: translateX(-4px); }
            [dir="rtl"] :scope .intent-list li:hover .intent-main { transform: translateX(-2px); }
          }

          @media (prefers-reduced-motion: reduce) {
            @scope ([data-impeccable-variant="1"]) { :scope .intent-turn { animation: none; } }
            @scope ([data-impeccable-variant="2"]) { :scope .intent-main { animation: none; } }
            @scope ([data-impeccable-variant="3"]) {
              :scope .intent-turn, :scope .intent-main { transition: none; }
              :scope .intent-list li:hover .intent-turn,
              :scope .intent-list li:hover .intent-main { transform: none; }
            }
          }
        `}</style>
        {/* impeccable-variants-end aa76b6b0 */}
      </div>
    </>
  );
}
