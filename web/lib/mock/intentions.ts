/**
 * Nawiya, the intentions surface.
 *
 * Same reliability rules as situations: every intention carries a source, and every
 * source quotes its hadith verbatim from the Hadith Encyclopedia at dorar.net (fetched
 * 2026-08-21 via their site search) — all from Sahih al-Bukhari or Sahih Muslim, the
 * current publishing threshold. The `dorar` block carries their narrator, grading,
 * permalink (dorar.net/h/{id}), takhrij, and topical classification; the same rows live
 * in the dorar_hadith table.
 *
 * The taxonomy is Nawiya's own and stays separate from the situation topics. Situations
 * classify a problem; intentions classify an act. Merging them would produce a list where
 * "prayer" and "my boss wronged me" are siblings.
 *
 * ponytail: one level, and groups appear only once something sits in them — see
 * intentionsByGroup(). The working taxonomy has a second level under each of these
 * (prayer / fasting / recitation under worship, and so on). It is not modelled here
 * because eight intentions across thirteen groups cannot fill one level, let alone two.
 * When a group holds enough entries that scanning it is work, give that group children.
 */

import type { DorarRef } from "../dorar";

export type ActGroup =
  | "worship"
  | "body"
  | "daily"
  | "order"
  | "travel"
  | "occasions"
  | "people"
  | "service"
  | "self"
  | "learning"
  | "knowledge"
  | "craft"
  | "stewardship";

export const ACT_GROUPS: { slug: ActGroup; en: string; ar: string; tr: string }[] = [
  { slug: "worship", en: "Worship", ar: "العبادات", tr: "İbadetler" },
  { slug: "body", en: "Health", ar: "الصحة", tr: "Sağlık" },
  { slug: "daily", en: "Daily life", ar: "الحياة اليومية", tr: "Gündelik hayat" },
  { slug: "order", en: "Time and order", ar: "التنظيم والوقت", tr: "Düzen ve zaman" },
  { slug: "travel", en: "Travel", ar: "السفر", tr: "Yolculuk" },
  { slug: "occasions", en: "Occasions", ar: "المناسبات", tr: "Özel günler" },
  { slug: "people", en: "People", ar: "العلاقات", tr: "İlişkiler" },
  { slug: "service", en: "Service", ar: "العمل الخيري والتطوع", tr: "Hayır ve hizmet" },
  { slug: "self", en: "Yourself", ar: "تزكية النفس", tr: "Nefis terbiyesi" },
  { slug: "learning", en: "Learning", ar: "طلب العلم", tr: "İlim talebi" },
  { slug: "knowledge", en: "Teaching", ar: "الدعوة والتعليم", tr: "Tebliğ ve öğretim" },
  { slug: "craft", en: "Making things", ar: "الإبداع والصنعة", tr: "Sanat ve zanaat" },
  { slug: "stewardship", en: "Land and animals", ar: "البيئة والحيوان", tr: "Tabiat ve hayvanlar" },
];

export type Intention = {
  slug: string;
  group: ActGroup;
  /** The ordinary act, before any reframing. */
  act: { en: string; ar: string; tr: string };
  source: {
    label: { en: string; ar: string; tr: string };
    original?: string;
    dorar?: DorarRef;
  };
  en: { intention: string; note: string };
  ar: { intention: string; note: string };
  tr: { intention: string; note: string };
};

export const INTENTIONS: Intention[] = [
  {
    slug: "eating",
    group: "daily",
    act: { en: "Eating a meal", ar: "الأكل", tr: "Yemek yemek" },
    source: {
      label: { en: "Sahih Muslim 2734", ar: "صحيح مسلم ٢٧٣٤", tr: "Sahîh-i Müslim 2734" },
      original: "إنَّ اللهَ لَيَرضى عَنِ العَبدِ أن يَأكُلَ الأَكلةَ فيَحمَدَه عليها، أو يَشرَبَ الشَّربةَ فيَحمَدَه عليها",
      dorar: {
        rawi: "أنس بن مالك",
        mohdith: "مسلم",
        grade: "[صحيح]",
        id: "oOabSoIV",
        takhrij: "أخرجه الترمذي (1816)، وابن أبي شيبة (24499)، وابن منده في ((التوحيد)) (ص251) واللفظ لهم.",
        categories: [
          { id: "3d3d3e6201cb95c1ea4dfc77fedbd240", name: "أدعية وأذكار - أذكار الطعام" },
          { id: "1942aff8a08f15f3acc923953dcb4fa3", name: "أدعية وأذكار - حمد الله بعد الأكل والشرب" },
          { id: "3e4fcc70c32d80390a4706212ff4234a", name: "أطعمة - ما يقول إذا فرغ من الطعام" },
          { id: "daa7903a59", name: "آداب عامة - آداب الطعام" },
          { id: "8bfbf8d956", name: "أدعية وأذكار - فضل التحميد والتسبيح والدعاء" },
        ],
      },
    },
    en: {
      intention: "To have the strength for what is asked of me today.",
      note: "The act does not change. What changes is whether it was spent on anything.",
    },
    ar: {
      intention: "أن أتقوّى على ما يُطلب مني اليوم.",
      note: "الفعل لا يتغير. الذي يتغير هو: هل صُرف في شيء أم لا.",
    },
    tr: {
      intention: "Bugün benden isteneni yapacak gücü bulmak için.",
      note: "Fiil değişmiyor. Değişen şu: bir şeye harcandı mı, harcanmadı mı.",
    },
  },
  {
    slug: "exercise",
    group: "body",
    act: { en: "Training", ar: "الرياضة", tr: "Spor yapmak" },
    source: {
      label: { en: "Sahih Muslim 2664", ar: "صحيح مسلم ٢٦٦٤", tr: "Sahîh-i Müslim 2664" },
      original: "المُؤمِنُ القَويُّ خَيرٌ وأحَبُّ إلى اللهِ مِنَ المُؤمِنِ الضَّعيفِ، وفي كُلٍّ خَيرٌ. احرِصْ على ما يَنفَعُكَ، واستَعِنْ باللهِ ولا تَعجِزْ، وإن أصابَكَ شَيءٌ فلا تَقُلْ: لو أنِّي فعَلتُ كان كَذا وكَذا، ولَكِن قُلْ: قدَرُ اللهِ وما شاءَ فعَلَ؛ فإنَّ (لو) تَفتَحُ عَمَلَ الشَّيطانِ",
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "مسلم",
        grade: "[صحيح]",
        id: "Ov16uqG0",
        takhrij: "أخرجه ابن ماجه (79)، وأحمد (8829)، وأبو يعلى (6251) جميعهم بلفظه.",
        categories: [
          { id: "6ff88be32e0f13cfd202f5c032a316a5", name: "إيمان - فضل الإيمان" },
          { id: "6f4c1da6507c273b722b9b6da86f7871", name: "توحيد - ما جاء في اللو" },
          { id: "800fbc4f137be512165ffb13a08b9346", name: "رقائق وزهد - أي المؤمنين خير" },
          { id: "a1a6cc0f150cdc7da0070c79a011f497", name: "قدر - الأمر بالعمل وترك العجز" },
          { id: "c131ad3b8a2f27cf5f63f911786266db", name: "قدر - الرضا بالقضاء" },
        ],
      },
    },
    en: {
      intention: "To keep a body that can carry its obligations.",
      note: "Strength is not the point; capability for something is.",
    },
    ar: {
      intention: "أن أحفظ بدنًا يحمل ما عليه.",
      note: "ليست القوة هي المقصد، بل القدرة على شيء بعينه.",
    },
    tr: {
      intention: "Üzerine düşeni taşıyabilecek bir beden korumak için.",
      note: "Maksat kuvvet değil; belirli bir şeye güç yetirebilmek.",
    },
  },
  {
    slug: "going-to-work",
    group: "daily",
    act: { en: "Going to work", ar: "الذهاب إلى العمل", tr: "İşe gitmek" },
    source: {
      label: { en: "Sahih al-Bukhari 2072", ar: "صحيح البخاري ٢٠٧٢", tr: "Sahîh-i Buhârî 2072" },
      original: "ما أكَلَ أحَدٌ طَعامًا قَطُّ خَيرًا مِن أن يَأكُلَ مِن عَمَلِ يَدِه، وإنَّ نَبيَّ اللهِ داوُدَ عليه السَّلامُ كان يَأكُلُ مِن عَمَلِ يَدِه",
      dorar: {
        rawi: "المقدام بن معدي كرب",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "ymcRhdPb",
        takhrij: "من أفراد البخاري على مسلم",
        categories: [
          { id: "75d058ec96950869518fea20949c0f55", name: "إجارة - كسب الرجل وعمله بيده" },
          { id: "82ee55c0671ab5995ed8e2a3f9a1fed1", name: "أنبياء - خصائص وفضائل" },
          { id: "e0a22d36e8e22f42fd09ff07775aa0cd", name: "أنبياء - داود" },
          { id: "3ef1c2bc955f3fdb751925c8550ffd5b", name: "رقائق وزهد - فضل العمل والتكسب" },
          { id: "8eb28af6f28bbf67866f539aa7319083", name: "نفقة - أفضل الكسب" },
        ],
      },
    },
    en: {
      intention: "To earn what is lawful, and to spare anyone the need to carry me.",
      note: "The same commute, with a reason underneath it.",
    },
    ar: {
      intention: "أن أكسب حلالًا، وألا أُثقل أحدًا بحملي.",
      note: "الطريق نفسه، وتحته سبب.",
    },
    tr: {
      intention: "Helal kazanmak ve kimseye yük olmamak için.",
      note: "Aynı yol, altında bir sebeple.",
    },
  },
  {
    slug: "sleep",
    group: "daily",
    act: { en: "Going to sleep", ar: "النوم", tr: "Uyumak" },
    source: {
      label: { en: "Sahih al-Bukhari 5199", ar: "صحيح البخاري ٥١٩٩", tr: "Sahîh-i Buhârî 5199" },
      original: "يا عَبدَ اللهِ، ألَم أُخبَرْ أنَّك تَصومُ النَّهارَ وتَقومُ اللَّيلَ؟ قُلتُ: بَلى يا رَسولَ اللهِ، قال: فلا تَفعَلْ، صُمْ وأفطِرْ، وقُمْ ونَمْ؛ فإنَّ لجَسَدِك عليك حَقًّا، وإنَّ لعَينِك عليك حَقًّا، وإنَّ لزَوجِك عليك حَقًّا",
      dorar: {
        rawi: "عبدالله بن عمرو",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "FdijBGPM",
        takhrij: "أخرجه البخاري (5199)، ومسلم (1159)",
        categories: [
          { id: "5fa4f564ef2abadb739e441129c57aa4", name: "اعتصام بالسنة - ما يكره من التعمق والغلو والبدع" },
          { id: "0746b33219956b3c38198e1f4c7fb528", name: "رقائق وزهد - الاجتهاد في العبادة" },
          { id: "79ebfc9e5a40c080ba07e5ba675ce75c", name: "رقائق وزهد - القصد والمداومة على العمل" },
          { id: "7ecf234f3c46c9fc5ede2de38256868e", name: "صيام - صيام الدهر" },
          { id: "5116e75fe6", name: "صلاة - النهي عن التكلف والمشقة في العبادة" },
        ],
      },
    },
    en: {
      intention: "To rest so that tomorrow is not borrowed against.",
      note: "Rest counts as preparation when it is taken as preparation.",
    },
    ar: {
      intention: "أن أستريح حتى لا يكون غدي دَينًا على اليوم.",
      note: "الراحة استعداد إذا نُويت استعدادًا.",
    },
    tr: {
      intention: "Yarını bugüne borçlandırmayacak kadar dinlenmek için.",
      note: "Hazırlık niyetiyle alınan dinlenme, hazırlıktan sayılır.",
    },
  },
  {
    slug: "visiting-the-sick",
    group: "people",
    act: { en: "Visiting someone ill", ar: "زيارة المريض", tr: "Hasta ziyaret etmek" },
    source: {
      label: { en: "Sahih Muslim 2568", ar: "صحيح مسلم ٢٥٦٨", tr: "Sahîh-i Müslim 2568" },
      original: "مَن عادَ مَريضًا لَم يَزَلْ في خُرفةِ الجَنَّةِ، قيلَ: يا رَسولَ اللهِ، وما خُرفةُ الجَنَّةِ؟ قال: جَناها",
      dorar: {
        rawi: "ثوبان مولى رسول الله صلى الله عليه وسلم",
        mohdith: "مسلم",
        grade: "[صحيح]",
        id: "C5JvShbV",
        takhrij: "أخرجه أحمد (22389)، وأبو عوانة (11203) واللفظ لهما، والترمذي (967)، وابن حبان (598) باختلاف يسير.",
        categories: [
          { id: "1d2f286dc66a71cbf57be451d27330c1", name: "جنة - صفة الجنة" },
          { id: "acc66ef56d", name: "إيمان - الوعد" },
          { id: "00aaa0c86b", name: "مريض - مشروعية عيادة المريض وفضلها" },
        ],
      },
    },
    en: {
      intention: "To be present, not to be seen being present.",
      note: "The distinction is invisible from outside and decisive from inside.",
    },
    ar: {
      intention: "أن أحضر، لا أن يُرى حضوري.",
      note: "فرقٌ لا يُرى من الخارج، وهو الفاصل من الداخل.",
    },
    tr: {
      intention: "Orada olmak için; orada olduğum görülsün diye değil.",
      note: "Dışarıdan görünmeyen, içeriden her şeyi belirleyen bir fark.",
    },
  },
  {
    slug: "spending-on-family",
    group: "people",
    act: { en: "Spending on your family", ar: "الإنفاق على الأهل", tr: "Aileye harcamak" },
    source: {
      label: { en: "Sahih Muslim 995", ar: "صحيح مسلم ٩٩٥", tr: "Sahîh-i Müslim 995" },
      original: "دينارٌ أنفَقتَه في سَبيلِ اللهِ، ودينارٌ أنفَقتَه في رَقَبةٍ، ودينارٌ تَصَدَّقتَ به على مِسكينٍ، ودينارٌ أنفَقتَه على أهلِك؛ أعظَمُها أجرًا الذي أنفَقتَه على أهلِك",
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "مسلم",
        grade: "[صحيح]",
        id: "B7p5BSxU",
        takhrij: "من أفراد مسلم على البخاري",
        categories: [
          { id: "573d479b139933cf75f7c7c036120105", name: "صدقة - فضل الصدقة والحث عليها" },
          { id: "ac5638aa651ff995f011b25428f55b2e", name: "نفقة - النفقة على الأهل" },
          { id: "a476ad69ea943e5b8512b5e2013725e7", name: "نفقة - وجوب النفقة على الأهل والعيال" },
          { id: "68ae55d131", name: "نفقة - الإنفاق في أوجه الخير وفضله" },
          { id: "1a6d256658", name: "نفقة - نفقة الرقيق والرفق بهم والإحسان إليهم" },
        ],
      },
    },
    en: {
      intention: "To provide, rather than to be thanked for providing.",
      note: "The second one runs out. The first one does not.",
    },
    ar: {
      intention: "أن أُنفق، لا أن أُشكر على الإنفاق.",
      note: "الثاني ينفد. الأول لا ينفد.",
    },
    tr: {
      intention: "Geçindirmek için; geçindirdiğim için teşekkür edilsin diye değil.",
      note: "İkincisi tükenir. Birincisi tükenmez.",
    },
  },
  {
    slug: "holding-your-tongue",
    group: "self",
    act: { en: "Saying nothing", ar: "حفظ اللسان", tr: "Susmak" },
    source: {
      label: { en: "Sahih al-Bukhari 6474", ar: "صحيح البخاري ٦٤٧٤", tr: "Sahîh-i Buhârî 6474" },
      original: "مَن يَضمَنْ لي ما بينَ لَحيَيه وما بينَ رِجلَيه أضمَنْ له الجَنَّةَ",
      dorar: {
        rawi: "سهل بن سعد الساعدي",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "eezAoZwz",
        takhrij: "أخرجه البخاري (6474)، والترمذي (2408)، وأحمد (22823) باختلاف يسير.",
        categories: [
          { id: "7645078936fef500aeb163e90bc9eadb", name: "آداب الكلام - الصمت وقلة الكلام" },
          { id: "f8569773967232334e19784516a7b2cd", name: "آداب الكلام - حفظ اللسان" },
          { id: "c8d44538f339d84bcc737cd039ec590a", name: "رقائق وزهد - حفظ الجوارح" },
          { id: "a5d28fb9358df2b6be76258d8d755691", name: "رقائق وزهد - حفظ الفرج" },
          { id: "30dec0b445", name: "جنة - الصفات التي يعرف بها في الدنيا أهل الجنة وأهل النار" },
        ],
      },
    },
    en: {
      intention: "To leave a thing unsaid because it is not mine to say.",
      note: "Silence with a reason is not the same act as silence from fear.",
    },
    ar: {
      intention: "أن أدع الكلمة لأنها ليست لي.",
      note: "صمتٌ عن قصد ليس هو الصمت عن خوف.",
    },
    tr: {
      intention: "Bir sözü, benim söyleyeceğim söz olmadığı için bırakmak.",
      note: "Bilerek susmak, korkudan susmakla aynı fiil değildir.",
    },
  },
  {
    slug: "studying",
    group: "knowledge",
    act: { en: "Studying", ar: "الدراسة", tr: "Ders çalışmak" },
    source: {
      label: { en: "Sahih Muslim 1037", ar: "صحيح مسلم ١٠٣٧", tr: "Sahîh-i Müslim 1037" },
      original: "مَن يُرِدِ اللهُ به خَيرًا يُفَقِّهْه في الدِّينِ، وإنَّما أنا قاسِمٌ ويُعطي اللهُ",
      dorar: {
        rawi: "معاوية بن أبي سفيان",
        mohdith: "مسلم",
        grade: "[صحيح]",
        id: "xjsZ7VeS",
        takhrij: "أخرجه البخاري (71) مطولاً، ومسلم (1037).",
        categories: [
          { id: "df310a9e26efe78e6d4cba4391ae00e5", name: "علم - الحث على طلب العلم" },
          { id: "c520fbd8afedb99d07453ef70075c371", name: "علم - الفقه في الدين" },
          { id: "dd8bfed555936405e6f2a60aaa2f416f", name: "علم - فضل العلم" },
          { id: "d9997f2f0e63e07cd31c82af06a532f8", name: "فضائل النبي وصفته ودلائل النبوة - أسماء النبي" },
          { id: "e9208bcffa", name: "فضائل النبي وصفته ودلائل النبوة - ما اختص به النبي على الأنبياء عليهم الصلاة والسلام" },
        ],
      },
    },
    en: {
      intention: "To know something well enough to be useful with it.",
      note: "Knowing in order to be seen knowing is a different act entirely.",
    },
    ar: {
      intention: "أن أُتقن ما ينفع به غيري.",
      note: "أن تعلم لتُرى عالمًا فعلٌ آخر بالكلية.",
    },
    tr: {
      intention: "Bir şeyi, onunla faydalı olacak kadar iyi bilmek için.",
      note: "Bilgin görünmek için bilmek, bütünüyle başka bir fiildir.",
    },
  },
];
