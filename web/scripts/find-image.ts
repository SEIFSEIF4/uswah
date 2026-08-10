// Find archive artwork for a situation.
//
//   pnpm image:find "persian miniature court audience"
//   pnpm image:find "bukhara 1911" --limit 12
//
// Searches Wikimedia Commons and the Met open-access collection, keeps only images whose
// licence the pipeline accepts, drops anything whose title trips the screen, and prints a
// YAML block ready to paste into a situation file.
//
// cleared_by is deliberately left as TODO. The content pipeline refuses to publish until a
// person replaces it, which is the whole point: the filter narrows the pile, a human decides.

import { screenTitle, normaliseLicence, looksLikeTextFace } from "./image-screen";

type Candidate = {
  title: string;
  imageUrl: string;
  sourceUrl: string;
  licence: string;
  credit: string;
  warn?: string;
};

const strip = (html: string) => html.replace(/<[^>]+>/g, "").trim();

/** Commons appends analytics parameters to image URLs. They do not belong in the database. */
const cleanUrl = (url: string) => url.split("?")[0];

/**
 * Commons date fields often carry a QuickStatements payload after the human-readable part:
 * "18th centurydate QS:P,+1750-00-00T00:00:00Z/7". Keep the readable half.
 */
const cleanDate = (raw: string) => strip(raw).split(/date QS:/)[0].trim();

async function commons(query: string, limit: number): Promise<Candidate[]> {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
    `&gsrsearch=${encodeURIComponent(`filetype:bitmap ${query}`)}` +
    `&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo` +
    "&iiprop=url|extmetadata&iiurlwidth=1600&format=json&origin=*";

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Commons returned ${res.status}`);
  const pages = (await res.json())?.query?.pages ?? {};

  return Object.values<any>(pages).map((p) => {
    const ii = p.imageinfo[0];
    const m = ii.extmetadata ?? {};
    const artist = strip(m.Artist?.value ?? "");
    const date = cleanDate(m.DateTimeOriginal?.value ?? "");
    const title = p.title.replace(/^File:/, "").replace(/\.[a-z]+$/i, "");
    return {
      title,
      imageUrl: cleanUrl(ii.thumburl ?? ii.url),
      sourceUrl: ii.descriptionurl,
      licence: strip(m.LicenseShortName?.value ?? ""),
      credit: [title, artist, date].filter(Boolean).join(", "),
    };
  });
}

async function met(query: string, limit: number): Promise<Candidate[]> {
  const api = "https://collectionapi.metmuseum.org/public/collection/v1";
  const search = await fetch(
    `${api}/search?q=${encodeURIComponent(query)}&hasImages=true&departmentId=14`,
  );
  if (!search.ok) return [];
  const ids: number[] = ((await search.json())?.objectIDs ?? []).slice(0, limit);

  const out: Candidate[] = [];
  for (const id of ids) {
    // The Met asks for politeness rather than a key; one at a time is polite enough.
    const res = await fetch(`${api}/objects/${id}`);
    if (!res.ok) continue;
    const o: any = await res.json();
    if (!o.isPublicDomain || !o.primaryImage) continue;
    out.push({
      title: o.title,
      imageUrl: o.primaryImage,
      sourceUrl: o.objectURL,
      licence: "Public domain",
      credit: [o.title, o.culture, o.objectDate].filter(Boolean).join(", "),
    });
  }
  return out;
}

function toYaml(c: Candidate, licence: string) {
  return `image:
  url: ${c.imageUrl}
  credit: ${JSON.stringify(c.credit)}
  source_url: ${c.sourceUrl}
  license: ${licence}
  cleared_by: TODO       # your name, once you have looked at the image itself
  cleared_at: ${new Date().toISOString().slice(0, 10)}
# then add image_alt under each locale in translations:`;
}

async function main() {
  const args = process.argv.slice(2);
  const limitFlag = args.indexOf("--limit");
  const limit = limitFlag === -1 ? 8 : Number(args[limitFlag + 1]) || 8;
  const query = args.filter((a, i) => !a.startsWith("--") && i !== limitFlag + 1).join(" ");

  if (!query) {
    console.error('Usage: pnpm image:find "<what you are looking for>" [--limit 8]');
    process.exit(1);
  }

  const results = await Promise.allSettled([commons(query, limit), met(query, limit)]);
  const found = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
  for (const r of results) {
    if (r.status === "rejected") console.error(`  (a source failed: ${r.reason})`);
  }

  const kept: { c: Candidate; licence: string }[] = [];
  let blocked = 0;
  let badLicence = 0;

  for (const c of found) {
    const screen = screenTitle(c.title);
    if (screen.blocked) {
      blocked++;
      console.log(`  ✗ screened out — ${screen.reason}: ${c.title.slice(0, 60)}`);
      continue;
    }
    const licence = normaliseLicence(c.licence);
    if (!licence) {
      badLicence++;
      continue;
    }
    if (looksLikeTextFace(c.title)) c.warn = "may be the text face of a folio, not the painting";
    kept.push({ c, licence });
  }

  console.log(
    `\n${found.length} found · ${blocked} screened out · ${badLicence} unusable licence · ${kept.length} to review\n`,
  );

  kept.forEach(({ c, licence }, i) => {
    console.log(`── ${i + 1} ${"─".repeat(58)}`);
    console.log(`   ${c.title}`);
    console.log(`   ${licence}  ·  ${c.sourceUrl}`);
    if (c.warn) console.log(`   ⚠ ${c.warn}`);
    console.log(`   ${c.imageUrl}\n`);
    console.log(toYaml(c, licence).replace(/^/gm, "   "));
    console.log();
  });

  if (kept.length) {
    console.log(
      "Open the image before you fill in cleared_by. The screen only reads titles, and a\n" +
        "miniature can depict a veiled or haloed figure without saying so.",
    );
  }
}

main().catch((err) => {
  console.error(String(err));
  process.exit(1);
});
