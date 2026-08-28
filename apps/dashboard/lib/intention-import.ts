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
  categories?: { id: string; name: string }[];
};

export type IntentionSourceKind = "ai" | "hadith" | "quran" | "other";

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

/** Ordinary-act labels used when building the three locale rows. */
export const ACT_LABELS: Record<string, { en: string; tr: string }> = {
  الصلاة: { en: "Prayer", tr: "Namaz" },
  "الرياضة والتمارين": { en: "Exercise", tr: "Spor" },
  الصيام: { en: "Fasting", tr: "Oruç" },
  "العمل والدراسة": { en: "Work and study", tr: "İş ve çalışma" },
  "التسوق وإنفاق المال": { en: "Spending", tr: "Harcama" },
  "السفر والترحال": { en: "Travel", tr: "Yolculuk" },
  "رمضان والأعياد": { en: "Ramadan and Eids", tr: "Ramazan ve bayramlar" },
  "الحج والعمرة": { en: "Hajj and Umrah", tr: "Hac ve umre" },
  "أوقات الشدة والضيق": { en: "Hard times", tr: "Zor zamanlar" },
  "رعاية الحيوانات": { en: "Caring for animals", tr: "Hayvan bakımı" },
  "العناية بالبيئة": { en: "Caring for the environment", tr: "Çevreye özen" },
  "قراءة القرآن": { en: "Reading the Quran", tr: "Kur’an okumak" },
  الدعاء: { en: "Supplication", tr: "Dua" },
  الذكر: { en: "Remembrance", tr: "Zikir" },
  "التعامل مع الأسرة": { en: "Family dealings", tr: "Aile ilişkileri" },
  "التعامل مع الأصدقاء والزملاء": { en: "Friends and colleagues", tr: "Arkadaş ve iş arkadaşları" },
  "التعامل مع المجتمع": { en: "Community dealings", tr: "Toplum ilişkileri" },
  "الطب والعلاج": { en: "Medicine and treatment", tr: "Tıp ve tedavi" },
  "النظافة والطهارة": { en: "Cleanliness", tr: "Temizlik" },
  "الأكل والشرب": { en: "Eating and drinking", tr: "Yeme içme" },
  "النوم والاستيقاظ": { en: "Sleep and waking", tr: "Uyku ve uyanış" },
  "طلب العلم": { en: "Seeking knowledge", tr: "İlim talep etmek" },
  القراءة: { en: "Reading", tr: "Okumak" },
  "المهارات الجديدة": { en: "New skills", tr: "Yeni beceriler" },
  الكتابة: { en: "Writing", tr: "Yazmak" },
  "الفنون البصرية": { en: "Visual arts", tr: "Görsel sanatlar" },
  "إدارة الوقت": { en: "Time management", tr: "Zaman yönetimi" },
  "التركيز والإنجاز": { en: "Focus and achievement", tr: "Odak ve başarı" },
  "تنظيم المكان": { en: "Tidying space", tr: "Mekân düzeni" },
  "التغذية الصحية": { en: "Healthy eating", tr: "Sağlıklı beslenme" },
  "الراحة والاسترخاء": { en: "Rest", tr: "Dinlenme" },
  "الصحة النفسية": { en: "Mental health", tr: "Ruh sağlığı" },
  "العمل الخيري": { en: "Charity work", tr: "Hayır işi" },
  "الإصلاح المجتمعي": { en: "Community reform", tr: "Toplumsal ıslah" },
  "الحفاظ على البيئة": { en: "Protecting the environment", tr: "Çevreyi korumak" },
  "حسن الجوار": { en: "Good neighbourliness", tr: "İyi komşuluk" },
  "إكرام الضيف": { en: "Honouring guests", tr: "Misafire ikram" },
  "بر الوالدين": { en: "Honouring parents", tr: "Anne babaya iyilik" },
  "رعاية الأيتام": { en: "Caring for orphans", tr: "Yetim bakımı" },
  "حسن الخلق": { en: "Good character", tr: "Güzel ahlak" },
  "محاسبة النفس": { en: "Self-accounting", tr: "Nefsi muhasebe" },
  "مجاهدة النفس": { en: "Striving against the self", tr: "Nefisle mücadele" },
  "حفظ القرآن": { en: "Memorising the Quran", tr: "Kur’an ezberi" },
  "الصيام التطوعي": { en: "Voluntary fasting", tr: "Nafile oruç" },
  "قيام الليل": { en: "Night prayer", tr: "Gece namazı" },
  "نشر العلم": { en: "Spreading knowledge", tr: "İlim yaymak" },
  "العمل التطوعي": { en: "Volunteer work", tr: "Gönüllü iş" },
  "حفظ اللسان": { en: "Guarding the tongue", tr: "Dili korumak" },
  "صلة الرحم": { en: "Maintaining kinship", tr: "Sıla-i rahim" },
  "زيارة المريض": { en: "Visiting the sick", tr: "Hasta ziyareti" },
  الصبر: { en: "Patience", tr: "Sabır" },
  التقوى: { en: "God-consciousness", tr: "Takva" },
  "تطهير القلب": { en: "Purifying the heart", tr: "Kalbi arındırmak" },
  النوافل: { en: "Voluntary worship", tr: "Nafile ibadet" },
  الاعتكاف: { en: "Seclusion for worship", tr: "İtikâf" },
  الصدقة: { en: "Charity", tr: "Sadaka" },
  "تعلم اللغات": { en: "Learning languages", tr: "Dil öğrenmek" },
  "الدعوة الرقمية": { en: "Digital outreach", tr: "Dijital tebliğ" },
  "تعليم الأطفال": { en: "Teaching children", tr: "Çocuklara öğretmek" },
  "السفر للعمل": { en: "Travelling for work", tr: "İş için seyahat" },
  التفكر: { en: "Contemplation", tr: "Tefekkür" },
  الزواج: { en: "Marriage", tr: "Evlilik" },
  "تربية الأبناء": { en: "Raising children", tr: "Çocuk yetiştirmek" },
  "المهارات اليدوية": { en: "Handcrafts", tr: "El sanatları" },
  "ريادة الأعمال": { en: "Entrepreneurship", tr: "Girişimcilik" },
  النصيحة: { en: "Giving sincere advice", tr: "Samimi nasihat" },
  "الوفاء بالعهد": { en: "Keeping promises", tr: "Sözünde durmak" },
  الاستغفار: { en: "Seeking forgiveness", tr: "Bağışlanma dilemek" },
  "حفظ الجوارح": { en: "Guarding the limbs", tr: "Organları korumak" },
  "إتقان العمل": { en: "Doing work well", tr: "İşi güzel yapmak" },
  "إطعام الطعام": { en: "Feeding people", tr: "Yemek ikram etmek" },
  "كظم الغيظ": { en: "Restraining anger", tr: "Öfkeyi yenmek" },
  الرفق: { en: "Gentleness", tr: "Yumuşak huyluluk" },
  التواضع: { en: "Humility", tr: "Tevazu" },
  الإخلاص: { en: "Sincerity", tr: "İhlas" },
  الشكر: { en: "Gratitude", tr: "Şükür" },
  "ترشيد الاستهلاك": { en: "Mindful consumption", tr: "Tüketimi ölçülü yapmak" },
  التوكل: { en: "Reliance on Allah", tr: "Allah'a tevekkül" },
  الصدق: { en: "Truthfulness", tr: "Doğruluk" },
  التعاون: { en: "Cooperation", tr: "İş birliği" },
  "ضبط النفس": { en: "Self-control", tr: "Öz denetim" },
  "زراعة الأشجار": { en: "Planting trees", tr: "Ağaç dikmek" },
  "حفظ الأمانة": { en: "Keeping trusts", tr: "Emaneti korumak" },
  "حسن المعاملة": { en: "Kind treatment", tr: "Güzel muamele" },
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

export function classifySource(source: string): IntentionSourceKind {
  const s = source.trim();
  if (s === "AI") return "ai";
  if (s.includes("حديث")) return "hadith";
  if (s.includes("قرآن") || s.includes("القرآن")) return "quran";
  return "other";
}

export function buildDorarQueries(row: CsvIntention): string[] {
  return [...new Set([row.intention, row.subcategory, row.category].map((value) => value.trim()).filter(Boolean))];
}

function arabicWords(value: string): string[] {
  return value.replace(/[ًٌٍَُِّْـ]/g, "").replace(/[^ء-ي\s]/g, " ").split(/\s+/)
    .filter((word) => word.length >= 3 && !["نويت", "أن", "على", "من", "في", "إلى", "لـ"].includes(word));
}

export function isRelatedToDorar(intention: string, results: DorarResult[]): boolean {
  if (results.length === 0) return false;
  const intentionWords = new Set(arabicWords(intention));
  return results.some((result) => {
    const text = `${result.th ?? result.text ?? ""} ${(result.categories ?? []).map((c) => c.name).join(" ")}`;
    return arabicWords(text).filter((word) => intentionWords.has(word)).length >= 2;
  });
}

/** Best local Dorar hit by shared Arabic content words; null if below the topic threshold. */
export function bestTopicMatch(
  intention: string,
  results: DorarResult[],
  minScore = 3,
): { result: DorarResult; score: number } | null {
  let best: { result: DorarResult; score: number } | null = null;
  const intentionWords = arabicWords(intention);
  for (const result of results) {
    const text = `${result.th ?? result.text ?? ""} ${(result.categories ?? []).map((c) => c.name).join(" ")}`;
    const set = new Set(arabicWords(text));
    const score = intentionWords.filter((word) => set.has(word)).length;
    if (score >= minScore && (!best || score > best.score)) best = { result, score };
  }
  return best;
}

export function slugifyIntention(id: string): string {
  return `csv-${id}`;
}

export function hasAllLocales(
  translations: Partial<Record<"ar" | "en" | "tr", unknown>>,
): boolean {
  return Boolean(translations.ar && translations.en && translations.tr);
}

export function actLabels(subcategory: string): { ar: string; en: string; tr: string } {
  const mapped = ACT_LABELS[subcategory.trim()];
  return {
    ar: subcategory.trim(),
    en: mapped?.en ?? subcategory.trim(),
    tr: mapped?.tr ?? subcategory.trim(),
  };
}

export function sourceLabel(book: string | undefined, ref: string | undefined, locale: "ar" | "en" | "tr"): string {
  const b = book?.trim() || "الدرر السنية";
  const r = ref?.trim() ? ` ${ref.trim()}` : "";
  if (locale === "ar") return `${b}${r}`;
  if (locale === "tr") {
    return `${b.replace("صحيح البخاري", "Sahîh-i Buhârî").replace("صحيح مسلم", "Sahîh-i Müslim")}${r}`;
  }
  return `${b.replace("صحيح البخاري", "Sahih al-Bukhari").replace("صحيح مسلم", "Sahih Muslim")}${r}`;
}

export function draftNotes(kind: "exact" | "topic"): Record<"ar" | "en" | "tr", string> {
  if (kind === "exact") {
    return {
      ar: "مسودة مستوردة من CSV؛ تحتاج مراجعة تحريرية قبل النشر.",
      en: "Imported draft; requires editorial review before publication.",
      tr: "İçe aktarılan taslak; yayımlanmadan önce editoryal inceleme gerekir.",
    };
  }
  return {
    ar: "مسودة موضوعية: المصدر مرتبط بالموضوع لا بدليل نصي مطابق للنية. تحتاج مراجعة قبل النشر.",
    en: "Topic-related draft: the Dorar source matches the theme, not an exact textual proof of this intention. Needs review before publication.",
    tr: "Konu düzeyinde taslak: Dorar kaynağı temayla ilişkilidir; niyetin birebir metinsel delili değildir. Yayımlanmadan önce inceleme gerekir.",
  };
}

/** Lightweight English/Turkish intention lines, act kept as the ordinary verb phrase. */
export function translateIntention(row: CsvIntention, locale: "en" | "tr", topic: boolean): string {
  const act = actLabels(row.subcategory);
  if (locale === "en") {
    return topic
      ? `I intend to practice ${act.en.toLowerCase()}, guided by a related prophetic teaching on this theme.`
      : `I intend to practice ${act.en.toLowerCase()}, following the prophetic teaching cited for this act.`;
  }
  return topic
    ? `${act.tr} konusunda, bu temayla ilişkili nebevî öğretiye uyarak niyet ediyorum.`
    : `${act.tr} konusunda, bu amel için zikredilen nebevî öğretiye uyarak niyet ediyorum.`;
}
