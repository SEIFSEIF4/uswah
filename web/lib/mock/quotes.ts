/**
 * The quote comparisons, on the site as well as in social.
 *
 * The structure mirrors the working sheet: the saying people already know, the Islamic
 * treatment of the same idea, the grade of that source, and an honest note on how close
 * the two actually are.
 *
 * The commentary (angle, closeness) is ours. The hadith texts, narrators, and gradings
 * are verbatim from the Hadith Encyclopedia at dorar.net, fetched 2026-08-20 through the
 * API they offer site owners (dorar.net/article/389). The full result set per saying —
 * every grading returned, not just the one cited here — is stored in the dorar_hadith
 * table (supabase/migrations/20260820150000_dorar.sql). Every surface showing this data
 * credits dorar.net and links back.
 *
 * The grade is not decoration. It is the thing that stops this section becoming the
 * "Islamic version of a Western quote" content that the whole project is trying not to be.
 * Anything below `sahih` cannot currently be stored in the database — the source_grade enum
 * has no weaker value — so those entries are marked and cannot be published until a
 * scholarly reviewer joins and that decision is revisited.
 */

export type Grade = "quran" | "sahih" | "hasan" | "disputed" | "historical";

export const GRADES: Record<Grade, { en: string; ar: string; tr: string; storable: boolean }> = {
  quran: { en: "Quran", ar: "قرآن", tr: "Kur'an", storable: true },
  sahih: { en: "Sahih", ar: "صحيح", tr: "Sahih", storable: true },
  hasan: { en: "Hasan", ar: "حسن", tr: "Hasen", storable: false },
  disputed: { en: "Disputed, verify", ar: "محل خلاف، يحتاج تحققًا", tr: "İhtilaflı, doğrulanmalı", storable: false },
  historical: { en: "Historical account", ar: "واقعة تاريخية", tr: "Tarihî olay", storable: false },
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
  tr: { angle: string; closeness: string };
  source: {
    label: { en: string; ar: string; tr: string };
    original?: string;
    /** The dorar.net row this citation is copied from, verbatim. `id` is their permalink
     *  (dorar.net/h/{id}); `takhrij` their cross-references; `categories` their
     *  التصنيف الموضوعي, each linking to dorar.net/hadith-category/cat/{id}. */
    dorar?: {
      rawi: string;
      mohdith: string;
      grade: string;
      id: string;
      takhrij?: string;
      categories: { id: string; name: string }[];
    };
  };
};

export const QUOTES: Quote[] = [
  {
    slug: "teach-a-man-to-fish",
    saying: "Don't give me a fish. Teach me how to fish.",
    grade: "sahih",
    situation: "asked-for-money-again",
    source: {
      label: { en: "Sahih al-Bukhari 1471", ar: "صحيح البخاري ١٤٧١", tr: "Sahîh-i Buhârî 1471" },
      original:
        "لَأن يَأخُذَ أحَدُكُم حَبلَه، فيَأتيَ بحُزمةِ الحَطَبِ على ظَهرِه، فيَبيعَها، فيَكُفَّ اللهُ بها وجهَه خَيرٌ له مِن أن يَسألَ النَّاسَ أعطَوْه أو مَنَعوه",
      dorar: {
        rawi: "الزبير بن العوام",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "TlhsVKy7",
        takhrij: "من أفراد البخاري على مسلم",
        categories: [
          { id: "75d058ec96950869518fea20949c0f55", name: "إجارة - كسب الرجل وعمله بيده" },
          { id: "3ef1c2bc955f3fdb751925c8550ffd5b", name: "رقائق وزهد - فضل العمل والتكسب" },
          { id: "8aef06e13cbc50b896c50f9123695242", name: "سؤال - النهي عن المسألة" },
          { id: "b881f83f1e3637f3e20a758ac2cf7528", name: "سؤال - ذم السؤال" },
          { id: "b3649739b68d8da7d8784096a0d85ff1", name: "سؤال - فضل التعفف والتصبر" },
        ],
      },
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
    tr: {
      angle:
        "Balık değil ip ve odun: kişinin onurunu koruyan bir emek, dilenmenin cevabı ne olacaksa olsun, dilenmenin önüne konur.",
      closeness:
        "Yakın, ama aynı değil. Atasözü beceriyle ilgilidir; hadis onurla. Aynı öğüt için farklı bir gerekçe.",
    },
  },
  {
    slug: "actions-speak-louder",
    saying: "Actions speak louder than words.",
    grade: "sahih",
    source: {
      label: { en: "Sahih al-Bukhari 1", ar: "صحيح البخاري ١", tr: "Sahîh-i Buhârî 1" },
      original:
        "إنَّما الأعمالُ بالنِّيَّاتِ، وإنَّما لكُلِّ امرِئٍ ما نَوى، فمَن كانَت هِجرَتُه إلى دُنيا يُصيبُها، أو إلى امرَأةٍ يَنكِحُها، فهِجرَتُه إلى ما هاجَرَ إليه",
      dorar: {
        rawi: "عمر بن الخطاب",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "45wXAdej",
        takhrij:
          "أخرجه أبو داود (2201)، وابن ماجه (4227)، والطحاوي في ((شرح معاني الآثار)) (4650) واللفظ لهم.",
        categories: [
          { id: "c83d7c599cf63e40908d32ae8d689342", name: "جهاد - النية في القتال والغزو" },
          { id: "6abe831d18176579d5d94c0a8b7c7d4e", name: "رقائق وزهد - الإخلاص" },
          { id: "c481e8eb6c1426794e80d8ac5ca68e9c", name: "رقائق وزهد - النية" },
          { id: "d7d5c9d92e", name: "إيمان - الاحتساب والنية" },
          { id: "1cceb0d645", name: "جهاد - الهجرة من دار العدو إلى دار الإسلام" },
        ],
      },
    },
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
    tr: {
      angle:
        "Daha meşhur hadis ters yöne akar: ameller niyetlere göredir. Bu da eşleştirmeyi derli toplu değil, ilginç kılar.",
      closeness:
        "Zayıf bir eşleşme; gerilimin kendisi asıl mesele olduğu için tutuldu. Bunu bir mutabakat gibi sunmak dürüstlük olmazdı.",
    },
  },
  {
    slug: "control-what-you-can",
    saying: "Control what you can control. (Stoicism)",
    grade: "hasan",
    source: {
      label: { en: "Sahih al-Tirmidhi 2517", ar: "صحيح الترمذي ٢٥١٧", tr: "Sahîhu't-Tirmizî 2517" },
      original:
        "قال رجلٌ يا رسولَ اللهِ أعقِلُها وأتوكَّلُ أو أُطلقُها وأتوكَّلُ قال اعقِلها وتوكَّلْ",
      // Albani grades it hasan; dorar also records سنن الترمذي itself calling it غريب and
      // others منكر via the Anas chain — which is exactly why the grade above stays `hasan`
      // and the pending note keeps showing. The full spread is in dorar_hadith.
      dorar: {
        rawi: "أنس بن مالك",
        mohdith: "الألباني",
        grade: "حسن",
        id: "0BEkLGeW",
        takhrij:
          "أخرجه الترمذي (2517) واللفظ له، وأبو الشيخ في ((أمثال الحديث)) (42)، وأبو نعيم في ((حلية الأولياء)) (8/390)",
        categories: [
          { id: "ab9dcdf92a3c9d4f5d41f1d89effaeb6", name: "إيمان - أمور الإيمان" },
          { id: "0a11b7432ebc1358348a305a4a982b28", name: "إيمان - الأعمال التي من الإيمان" },
          { id: "438cd3b4f209cc9cdcca2cdb15d0345c", name: "رقائق وزهد - التوكل واليقين" },
          { id: "fa8360f30f23d7bc6997501263e4162e", name: "رقائق وزهد - ما جاء في الحذر" },
          { id: "73bae06bdc", name: "جهاد - التقوي للعدو والأخذ بالأسباب" },
        ],
      },
    },
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
    tr: {
      angle:
        "Önce deveni bağla, sonra tevekkül et. Emir, sebebe sarılmayı ve tevekkülü ikisi arasında seçim yapmadan tek cümlede toplar.",
      closeness:
        "Pratikte çok yakın. Fark şu: Stoacı hâli senin kendi çabanda biter, bu ise bitmez.",
    },
  },
  {
    slug: "you-become-like-your-company",
    saying: "You become like the people you spend time with.",
    grade: "sahih",
    situation: "a-friend-let-me-down",
    source: {
      label: { en: "Sahih al-Bukhari 5534", ar: "صحيح البخاري ٥٥٣٤", tr: "Sahîh-i Buhârî 5534" },
      original:
        "مَثَلُ الجَليسِ الصَّالِحِ والسَّوءِ كَحامِلِ المِسكِ ونافِخِ الكيرِ؛ فحامِلُ المِسكِ إمَّا أن يُحذيَك، وإمَّا أن تَبتاعَ منه، وإمَّا أن تَجِدَ منه ريحًا طَيِّبةً، ونافِخُ الكيرِ إمَّا أن يُحرِقَ ثيابَك، وإمَّا أن تَجِدَ ريحًا خَبيثةً",
      dorar: {
        rawi: "أبو موسى الأشعري",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "k5Apq046",
        takhrij: "أخرجه البخاري (5534)، ومسلم (2628)",
        categories: [
          { id: "8a10155579bd30a4eae1ad7320362f8b", name: "آداب المجلس - من يؤمر أن يجالس" },
          { id: "7302947e32563f79863ac7a16caa9ff0", name: "آداب المجلس - الترهيب من صحبة أهل السوء" },
          { id: "e038d4aaf2cb4e6d2ad31c6aadfc5d48", name: "آداب المجلس - أنواع المجالس" },
          { id: "2f500bf942", name: "آداب المجلس - الجليس الصالح والسوء" },
          { id: "8300a4b4fe", name: "آداب عامة - ضرب الأمثال" },
        ],
      },
    },
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
    tr: {
      angle:
        "Misk satıcısı ile demirci: birinden kokuyla, öbüründen dumanla çıkarsın; bir şey satın alsan da almasan da.",
      closeness:
        "Çok yakın ve daha eski. Tasvir, sözün eksik bıraktığını ekliyor: etki senin rızanı beklemeden üzerine siniyor.",
    },
  },
  {
    slug: "living-well-is-the-best-revenge",
    saying: "The best revenge is living well.",
    grade: "historical",
    source: {
      label: {
        en: "Difa' 'an al-Hadith 32",
        ar: "دفاع عن الحديث ٣٢",
        tr: "Difâ' ani'l-hadîs 32",
      },
      original:
        "يا معشرَ قريشٍ ما ترَونَ أنِّي فاعلٌ بكم؟ قالوا: خيرًا، أخٌ كريمٌ، وابنُ أخٍ كريمٍ، فقال: اذهبوا فأنتم الطُّلَقاءُ",
      // No narrator on dorar's row, and the grade is the finding itself: the famous line
      // has no established isnad. That is what `historical` already claimed; now it cites.
      dorar: {
        rawi: "-",
        mohdith: "الألباني",
        grade: "ليس له إسناد ثابت، وهو عند ابن هشام معضل",
        id: "QgI8mloj",
        categories: [
          { id: "cefdf1c2864205da4717b1f6d9678f3d", name: "اعتصام بالسنة - العفو والتجاوز في الأمر" },
          { id: "ca6e32ba1d0e18112f281a81c57a367c", name: "فضائل النبي وصفته ودلائل النبوة - أخلاق النبي" },
          { id: "4983e5e6f11885de2b9e176fbedda0f9", name: "مغازي - فتح مكة" },
          { id: "f3d5a8b16c", name: "آداب عامة - الأخلاق الحميدة الحسنة" },
          { id: "6801b582ed", name: "رقائق وزهد - مكارم الأخلاق والعفو عمن ظلم" },
        ],
      },
    },
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
    tr: {
      angle:
        "Mekke'nin fethi: yıllarca süren eziyetin ardından, kendisini oradan çıkaranlara serbest oldukları söylendi.",
      closeness:
        "Aslında aynı fikir değil. Bu, başarı kılığına girmiş bir intikam değildi; güç elde iken bağışlamaktı ve o bambaşka bir kapıdır.",
    },
  },
  {
    slug: "easy-come-easy-go",
    saying: "Easy come, easy go.",
    grade: "quran",
    situation: "i-am-in-debt",
    source: {
      label: { en: "Quran 2:276", ar: "البقرة ٢٧٦", tr: "Bakara 2:276" },
      original: "يَمْحَقُ اللَّهُ الرِّبَا وَيُرْبِي الصَّدَقَاتِ",
    },
    en: {
      angle:
        "Wiped away and grown: money piled up through riba is worn down however large it looks, and what is given away is the part that increases. The leaving is a direction, not an accident.",
      closeness:
        "They agree on the observation and part company on the cause. The proverb shrugs at luck. The verse names a mechanism and asks for something: give, rather than wait for it to go.",
    },
    ar: {
      angle:
        "مَحْقٌ وإرباء: ما جُمع من الربا يُنقَص وإن بدا كثيرًا، والمُنفَق هو الذي يُنمَّى. فالذهاب اتجاه لا صدفة.",
      closeness:
        "يلتقيان في الملاحظة ويفترقان في العلّة. المَثل يهزّ كتفيه أمام الحظ، والآية تسمّي سببًا وتطلب فعلًا: أنفِق، لا تنتظر ذهابه.",
    },
    tr: {
      angle:
        "Eritilen ve artırılan: faizle yığılan mal ne kadar çok görünse de eksilir, artan kısım ise verilendir. Gidiş bir tesadüf değil, bir yön.",
      closeness:
        "Gözlemde buluşup sebepte ayrılıyorlar. Atasözü şansa omuz silker; ayet bir sebep koyar ve bir şey ister: gitmesini bekleme, ver.",
    },
  },
];
