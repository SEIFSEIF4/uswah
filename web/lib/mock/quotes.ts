/**
 * SAMPLE DATA — the quote comparisons, on the site as well as in social.
 *
 * The structure mirrors the working sheet: the saying people already know, the Islamic
 * treatment of the same idea, the grade of that source, and an honest note on how close
 * the two actually are.
 *
 * The grade is not decoration. It is the thing that stops this section becoming the
 * "Islamic version of a Western quote" content that the whole project is trying not to be.
 * Anything below `sahih` cannot currently be stored in the database — the source_grade enum
 * has no weaker value — so those entries are marked and cannot be published until a
 * scholarly reviewer joins and that decision is revisited.
 */

export type Grade = "quran" | "sahih" | "hasan" | "disputed" | "historical";

export const GRADES: Record<Grade, { en: string; ar: string; storable: boolean }> = {
  quran: { en: "Quran", ar: "قرآن", storable: true },
  sahih: { en: "Sahih", ar: "صحيح", storable: true },
  hasan: { en: "Hasan", ar: "حسن", storable: false },
  disputed: { en: "Disputed, verify", ar: "محل خلاف، يحتاج تحققًا", storable: false },
  historical: { en: "Historical account", ar: "واقعة تاريخية", storable: false },
};

export type Quote = {
  slug: string;
  /** The saying people already know. Kept in the language it circulates in. */
  saying: string;
  grade: Grade;
  /** Which situation this belongs with, when one exists. */
  situation?: string;
  en: { angle: string; closeness: string };
  ar: { angle: string; closeness: string };
  source: { label: { en: string; ar: string }; original?: string; placeholder?: boolean };
};

const NO_SOURCE = {
  label: { en: "Sample data, no source attached", ar: "بيانات تجريبية بلا مصدر" },
  placeholder: true,
};

export const QUOTES: Quote[] = [
  {
    slug: "teach-a-man-to-fish",
    saying: "Don't give me a fish. Teach me how to fish.",
    grade: "sahih",
    situation: "asked-for-money-again",
    source: {
      label: { en: "Sahih al-Bukhari 1471", ar: "صحيح البخاري ١٤٧١" },
      original:
        "لأَنْ يَأْخُذَ أَحَدُكُمْ حَبْلَهُ فَيَأْتِيَ بِحُزْمَةِ الْحَطَبِ عَلَى ظَهْرِهِ فَيَبِيعَهَا فَيَكُفَّ اللَّهُ بِهَا وَجْهَهُ، خَيْرٌ لَهُ مِنْ أَنْ يَسْأَلَ النَّاسَ، أَعْطَوْهُ أَوْ مَنَعُوهُ",
    },
    en: {
      angle:
        "The rope and the firewood, rather than the fish: work that preserves a person's dignity is put above asking, whatever the answer to the asking would have been.",
      closeness:
        "Close, and not identical. The proverb is about capability. The hadith is about dignity: a different reason for the same advice.",
    },
    ar: {
      angle:
        "الحبل والحطب بدل السمكة: عملٌ يحفظ ماء وجه صاحبه مقدَّمٌ على السؤال، مهما كان جواب السؤال.",
      closeness:
        "قريب وليس مطابقًا. المَثل عن القدرة، والحديث عن الكرامة، وهما سببان مختلفان لنصيحة واحدة.",
    },
  },
  {
    slug: "actions-speak-louder",
    saying: "Actions speak louder than words.",
    grade: "sahih",
    source: NO_SOURCE,
    en: {
      angle:
        "The better-known hadith runs the other way. Deeds are judged by intention, which makes the pairing interesting rather than neat.",
      closeness:
        "Weak match, kept because the tension is the point. Presenting it as agreement would be dishonest.",
    },
    ar: {
      angle:
        "الحديث الأشهر يسير في الاتجاه المقابل: الأعمال بالنيات. وهذا ما يجعل المقارنة مثيرة لا مرتبة.",
      closeness: "تطابق ضعيف، أبقيناه لأن التوتر نفسه هو الفائدة. وتقديمه على أنه اتفاق تضليل.",
    },
  },
  {
    slug: "control-what-you-can",
    saying: "Control what you can control. (Stoicism)",
    grade: "hasan",
    source: NO_SOURCE,
    en: {
      angle:
        "Tie the camel, then trust. The instruction puts the means and the reliance in one sentence rather than choosing between them.",
      closeness:
        "Very close in practice. The difference is that the Stoic version ends at your own effort and this one does not.",
    },
    ar: {
      angle: "اعقلها وتوكّل. الأمر يجمع الأخذ بالأسباب والتوكل في جملة واحدة بدل أن يختار بينهما.",
      closeness: "قريب جدًا عمليًا. الفرق أن الرواقية تقف عند جهدك، وهذا لا يقف عنده.",
    },
  },
  {
    slug: "you-become-like-your-company",
    saying: "You become like the people you spend time with.",
    grade: "sahih",
    situation: "a-friend-let-me-down",
    source: NO_SOURCE,
    en: {
      angle:
        "The perfume-seller and the blacksmith: you leave one carrying the scent and the other carrying the smoke, whether or not you bought anything.",
      closeness:
        "Very close, and older. The image adds something the saying lacks: the effect lands on you without your consent.",
    },
    ar: {
      angle:
        "حامل المسك ونافخ الكير: تخرج من عند أحدهما بالرائحة ومن عند الآخر بالدخان، اشتريت أو لم تشترِ.",
      closeness: "قريب جدًا وأقدم. والصورة تضيف ما يفتقده المَثل: أن الأثر يقع عليك بغير اختيارك.",
    },
  },
  {
    slug: "living-well-is-the-best-revenge",
    saying: "The best revenge is living well.",
    grade: "historical",
    source: NO_SOURCE,
    en: {
      angle:
        "The conquest of Makkah: after years of persecution, the people who had driven him out were told they were free to go.",
      closeness:
        "Not really the same idea. That was not revenge reframed as success. It was pardon from a position of power, which is a different category altogether.",
    },
    ar: {
      angle: "فتح مكة: بعد سنوات من الأذى، قيل لمن أخرجوه إنكم الطلقاء.",
      closeness:
        "ليست الفكرة نفسها. لم يكن انتقامًا في ثوب النجاح، بل عفوًا من موضع قدرة، وذاك باب آخر.",
    },
  },
];
