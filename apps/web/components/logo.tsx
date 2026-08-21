import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "@/lib/logo";

/**
 * أسوة, shaped and drawn rather than set: the outlines come from Thmanyah Serif Display
 * Bold, the face the wordmark was always in, so it renders identically before the
 * webfont loads, at any size, in one colour. Sized by height, like the letterform it is.
 *
 * Regenerating it needs shaping, not a typed string: أسوة is four contextual forms.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      className={className}
      fill="currentColor"
      role="img"
      aria-label="أسوة"
    >
      <path d={WORDMARK_PATH} />
    </svg>
  );
}
