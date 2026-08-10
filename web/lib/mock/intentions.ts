/**
 * SAMPLE DATA — Nawiya, the intentions surface.
 *
 * Same reliability rules as situations: every intention carries a source and a reviewer,
 * so there is one standard on the site rather than two. The placeholder source below says
 * so in both languages, for the same reason it does in situations.ts — a hadith is never
 * invented to fill a layout.
 *
 * The taxonomy is Nawiya's own and stays separate from the situation topics. Situations
 * classify a problem; intentions classify an act. Merging them would produce a list where
 * "prayer" and "my boss wronged me" are siblings.
 */

export type ActGroup =
  | "worship"
  | "body"
  | "daily"
  | "travel"
  | "occasions"
  | "people"
  | "self"
  | "knowledge";

export const ACT_GROUPS: { slug: ActGroup; en: string; ar: string }[] = [
  { slug: "worship", en: "Worship", ar: "العبادات" },
  { slug: "body", en: "Health", ar: "الصحة" },
  { slug: "daily", en: "Daily life", ar: "الحياة اليومية" },
  { slug: "travel", en: "Travel", ar: "السفر" },
  { slug: "occasions", en: "Occasions", ar: "المناسبات" },
  { slug: "people", en: "People", ar: "العلاقات" },
  { slug: "self", en: "Yourself", ar: "تزكية النفس" },
  { slug: "knowledge", en: "Teaching", ar: "الدعوة والتعليم" },
];

export type Intention = {
  slug: string;
  group: ActGroup;
  /** The ordinary act, before any reframing. */
  act: { en: string; ar: string };
  source: {
    label: { en: string; ar: string };
    original?: string;
    placeholder?: boolean;
  };
  en: { intention: string; note: string };
  ar: { intention: string; note: string };
};

const PLACEHOLDER = {
  label: { en: "Sample data, no source attached", ar: "بيانات تجريبية بلا مصدر" },
  placeholder: true,
};

export const INTENTIONS: Intention[] = [
  {
    slug: "eating",
    group: "daily",
    act: { en: "Eating a meal", ar: "الأكل" },
    source: PLACEHOLDER,
    en: {
      intention: "To have the strength for what is asked of me today.",
      note: "The act does not change. What changes is whether it was spent on anything.",
    },
    ar: {
      intention: "أن أتقوّى على ما يُطلب مني اليوم.",
      note: "الفعل لا يتغير. الذي يتغير هو: هل صُرف في شيء أم لا.",
    },
  },
  {
    slug: "exercise",
    group: "body",
    act: { en: "Training", ar: "الرياضة" },
    source: PLACEHOLDER,
    en: {
      intention: "To keep a body that can carry its obligations.",
      note: "Strength is not the point; capability for something is.",
    },
    ar: {
      intention: "أن أحفظ بدنًا يحمل ما عليه.",
      note: "ليست القوة هي المقصد، بل القدرة على شيء بعينه.",
    },
  },
  {
    slug: "going-to-work",
    group: "daily",
    act: { en: "Going to work", ar: "الذهاب إلى العمل" },
    source: PLACEHOLDER,
    en: {
      intention: "To earn what is lawful, and to spare anyone the need to carry me.",
      note: "The same commute, with a reason underneath it.",
    },
    ar: {
      intention: "أن أكسب حلالًا، وألا أُثقل أحدًا بحملي.",
      note: "الطريق نفسه، وتحته سبب.",
    },
  },
  {
    slug: "sleep",
    group: "daily",
    act: { en: "Going to sleep", ar: "النوم" },
    source: PLACEHOLDER,
    en: {
      intention: "To rest so that tomorrow is not borrowed against.",
      note: "Rest counts as preparation when it is taken as preparation.",
    },
    ar: {
      intention: "أن أستريح حتى لا يكون غدي دَينًا على اليوم.",
      note: "الراحة استعداد إذا نُويت استعدادًا.",
    },
  },
  {
    slug: "visiting-the-sick",
    group: "people",
    act: { en: "Visiting someone ill", ar: "زيارة المريض" },
    source: PLACEHOLDER,
    en: {
      intention: "To be present, not to be seen being present.",
      note: "The distinction is invisible from outside and decisive from inside.",
    },
    ar: {
      intention: "أن أحضر، لا أن يُرى حضوري.",
      note: "فرقٌ لا يُرى من الخارج، وهو الفاصل من الداخل.",
    },
  },
  {
    slug: "spending-on-family",
    group: "people",
    act: { en: "Spending on your family", ar: "الإنفاق على الأهل" },
    source: PLACEHOLDER,
    en: {
      intention: "To provide, rather than to be thanked for providing.",
      note: "The second one runs out. The first one does not.",
    },
    ar: {
      intention: "أن أُنفق، لا أن أُشكر على الإنفاق.",
      note: "الثاني ينفد. الأول لا ينفد.",
    },
  },
  {
    slug: "holding-your-tongue",
    group: "self",
    act: { en: "Saying nothing", ar: "حفظ اللسان" },
    source: PLACEHOLDER,
    en: {
      intention: "To leave a thing unsaid because it is not mine to say.",
      note: "Silence with a reason is not the same act as silence from fear.",
    },
    ar: {
      intention: "أن أدع الكلمة لأنها ليست لي.",
      note: "صمتٌ عن قصد ليس هو الصمت عن خوف.",
    },
  },
  {
    slug: "studying",
    group: "knowledge",
    act: { en: "Studying", ar: "الدراسة" },
    source: PLACEHOLDER,
    en: {
      intention: "To know something well enough to be useful with it.",
      note: "Knowing in order to be seen knowing is a different act entirely.",
    },
    ar: {
      intention: "أن أُتقن ما ينفع به غيري.",
      note: "أن تعلم لتُرى عالمًا فعلٌ آخر بالكلية.",
    },
  },
];
