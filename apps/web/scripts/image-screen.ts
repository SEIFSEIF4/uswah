// This is a FIRST FILTER, not a clearance. Plenty of miniatures depict a veiled or
// flame-haloed figure without saying so in the title. A human still signs every image
// off; the filter only means they are not sifting the obvious cases by hand.

const BLOCK = [
  // The Prophet ﷺ, in the spellings archives actually use
  "muhammad", "mohammed", "mohammad", "muhammed", "mahomet", "mahomed",
  "the prophet", "prophet muhammad", "holy prophet", "rasul", "messenger of god",
  "mi'raj", "miraj", "mieraj", "isra",
  // Other prophets, contested for the same reasons
  "abraham", "ibrahim", "moses", "musa", "jesus", "isa ibn", "christ", "noah", "nuh ibn",
  "joseph", "yusuf and", "solomon", "sulayman ibn", "david and goliath", "adam and eve",
  // The companions
  "abu bakr", "umar ibn", "uthman ibn", "ali ibn abi", "fatima bint", "hasan and husayn",
  "husayn ibn", "companions of the prophet", "sahaba", "rashidun",
];

/** Licences the content pipeline accepts. Anything else is not usable, free or not. */
const OK_LICENCE = /^(public domain|cc0|cc by(-sa)? [0-9.]+|no restrictions)$/i;

export type Screen = { blocked: boolean; reason?: string };

// Matched on word boundaries, not as substrings: "musa" inside "Mu'in Musavvir" is a
// painter's name, and blocking it teaches whoever runs this to stop reading the warnings.
const PATTERNS = BLOCK.map(
  (term) => [term, new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")] as const,
);

/** Blocks on a matched term. Deliberately over-eager: a person named Muhammad is blocked too. */
export function screenTitle(title: string): Screen {
  const hit = PATTERNS.find(([, re]) => re.test(title));
  return hit ? { blocked: true, reason: `title mentions "${hit[0]}"` } : { blocked: false };
}

export function normaliseLicence(raw: string): string | null {
  if (!OK_LICENCE.test(raw.trim())) return null;
  const l = raw.trim().toLowerCase();
  if (l === "cc0") return "cc0";
  if (l.startsWith("public domain") || l === "no restrictions") return "public-domain";
  return l.replace(/\s+/g, "-").replace(/-([0-9])\.([0-9])$/, "-$1.$2");
}

/**
 * A folio is photographed on both faces. The text face is a page of calligraphy with no
 * painting on it, and it is frequently the first search result. Worth a warning rather
 * than a block, since the words are not reliable enough to decide on their own.
 *
 * ponytail: title heuristics only. Looking at the pixels would be the real fix, and is
 * not worth it until someone is actually annoyed by this.
 */
export function looksLikeTextFace(title: string): boolean {
  return /\b(text|colophon|calligraphy|recto|verso)\b/i.test(title);
}
