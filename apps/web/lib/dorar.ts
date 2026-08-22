/**
 * The dorar.net row a citation is copied from, verbatim. `id` is their permalink
 * (dorar.net/h/{id}); `takhrij` their cross-references; `categories` their
 * التصنيف الموضوعي, each linking to dorar.net/hadith-category/cat/{id}.
 */
export type DorarRef = {
  rawi: string;
  mohdith: string;
  grade: string;
  id: string;
  takhrij?: string;
  categories: { id: string; name: string }[];
};

export type BookKey = "bukhari" | "muslim";

/**
 * Dorar's مصادر الأحاديث record per collection, copied verbatim from the popup
 * their المصدر field opens (fetched 2026-08-22 from dorar.net/h/TlhsVKy7 and
 * /h/Y0ncQmYf). `no` is their row number in that library.
 */
export const BOOK_RECORDS: Record<
  BookKey,
  { name: string; no: string; title: string; author: string; editor: string; publisher: string; edition: string; year: string }
> = {
  bukhari: {
    name: "صحيح البخاري",
    no: "6216",
    title: "الجامع الصحيح المسند من حديث رسول الله وسننه وأيامه",
    author: "محمد بن إسماعيل البخاري",
    editor: "محب الدين الخطيب",
    publisher: "المكتبة السلفية - القاهرة",
    edition: "الأولى",
    year: "1400هـ",
  },
  muslim: {
    name: "صحيح مسلم",
    no: "3088",
    title: "صحيح مسلم (المسند الصحيح المختصر من السنن بنقل العدل عن العدل عن رسول الله صلى الله عليه وسلم)",
    author: "مسلم بن الحجاج القشيري النيسابوري",
    editor: "محمد فؤاد عبدالباقي",
    publisher: "دار إحياء الكتب العربية - عيسى البابي الحلبي وشركاه",
    edition: "الأولى",
    year: "1374هـ",
  },
};
