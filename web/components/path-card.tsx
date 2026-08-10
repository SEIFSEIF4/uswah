import type { Path } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const copy = { en: "More", ar: "المزيد" } as const;

/**
 * A path, on the Motqen model: a sequence with its commitment stated before you start.
 *
 * At rest the card is type on a solid ground. The artwork fades in behind on hover, which
 * is why the ground is dark to begin with: the two states share a text colour, so nothing
 * reflows or changes contrast when the image arrives. Where hover does not exist the
 * artwork is simply always shown.
 */
export function PathCard({ path, locale }: { path: Path; locale: Locale }) {
  return (
    <article className={`path path-${path.tone}`}>
      <div className="path-art">
        <img src={path.image} alt="" loading="lazy" />
        <div className="path-intro">
          <h3>{path[locale].title}</h3>
          <p>{path[locale].blurb}</p>
          <span className="path-more">
            {copy[locale]}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d={locale === "ar" ? "M14 5l-7 7 7 7" : "M10 5l7 7-7 7"}
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <dl className="path-facts">
        {path[locale].facts.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
