import type { ActGroup } from "./content-schema";

export type CsvIntention = {
  id: string;
  accepted: string;
  date: string;
  source: string;
  author: string;
  intention: string;
  subcategory: string;
  category: string;
};

export type DorarResult = {
  id?: string;
  th?: string;
  text?: string;
  rawi?: string;
  mohdith?: string;
  book?: string;
  ref?: string;
  grade?: string;
  takhrij?: string;
};

const GROUPS: Record<string, ActGroup> = {
  العبادات: "worship",
  "العبادات والطاعات": "worship",
  "الصحة واللياقة": "body",
  "الصحة والعافية": "body",
  "الحياة اليومية": "daily",
  "العمل والدراسة": "daily",
  "التنظيم والإنتاجية": "order",
  "المناسبات والأوقات الخاصة": "occasions",
  "السفر والترحال": "travel",
  "العلاقات الاجتماعية": "people",
  "العلاقات الإنسانية": "people",
  "المسؤولية الاجتماعية": "service",
  "تزكية النفس": "self",
  "التعلم والتطوير الذاتي": "learning",
  "طلب العلم": "learning",
  "الدعوة والتعليم": "knowledge",
  "الإبداع والفنون": "craft",
  "العناية بالبيئة والحيوان": "stewardship",
  "العناية بالبيئة": "stewardship",
};

function parseLine(line: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        cell += '"';
        i++;
      } else quoted = !quoted;
    } else if (char === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else cell += char;
  }
  cells.push(cell);
  return cells.map((value) => value.trim());
}

export function parseIntentionsCsv(input: string): CsvIntention[] {
  const rows: string[][] = [];
  let current = "";
  let quoted = false;
  for (const char of input.replace(/^\uFEFF/, "")) {
    if (char === '"') quoted = !quoted;
    if ((char === "\n" || char === "\r") && !quoted) {
      if (current) rows.push(parseLine(current));
      current = "";
    } else if (char !== "\r") current += char;
  }
  if (current) rows.push(parseLine(current));

  return rows.slice(1).filter((row) => row.length >= 8 && row[0]).map((row) => ({
    id: row[0], accepted: row[1], date: row[2], source: row[3], author: row[4],
    intention: row[5], subcategory: row[6], category: row[7],
  }));
}

export function mapActGroup(category: string): ActGroup | null {
  return GROUPS[category.trim()] ?? null;
}

function arabicWords(value: string): string[] {
  return value.replace(/[ًٌٍَُِّْـ]/g, "").replace(/[^ء-ي\s]/g, " ").split(/\s+/)
    .filter((word) => word.length >= 3 && !["نويت", "أن", "على", "من", "في", "إلى", "لـ"].includes(word));
}

export function isRelatedToDorar(intention: string, results: DorarResult[]): boolean {
  if (results.length === 0) return false;
  const intentionWords = new Set(arabicWords(intention));
  return results.some((result) => {
    const text = result.th ?? result.text ?? "";
    return arabicWords(text).filter((word) => intentionWords.has(word)).length >= 2;
  });
}

export function slugifyIntention(id: string): string {
  return `csv-${id}`;
}
