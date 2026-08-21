/**
 * The situations. Commentary is ours; the scripture is not.
 *
 * Every source block quotes its hadith verbatim from the Hadith Encyclopedia at
 * dorar.net (fetched 2026-08-21 via their site search), and every one sits in Sahih
 * al-Bukhari or Sahih Muslim — the current publishing threshold. The `dorar` block
 * carries their narrator, grading, permalink (dorar.net/h/{id}), takhrij, and topical
 * classification, and the same rows live in the dorar_hadith table. The en/tr
 * translations are working drafts labelled as such; `reviewedBy` stays UNVERIFIED
 * until a scholarly reviewer has signed off.
 *
 * Images are real, public domain, and passed the title screen. They are attached to
 * situations for visual plausibility, not because anyone has decided they belong there.
 *
 * Replace this file with the database once the dashboard exists; `lib/content.ts` is the
 * only thing that reads it.
 */

import type { Locale } from "../i18n";

export type LocaleText = {
  title: string;
  summary: string;
  imageAlt: string;
  body: string;
  takeaway: string;
};

export type Situation = {
  slug: string;
  topic: TopicSlug;
  minutes: number;
  /* Mirrors situations.published_at and entries.reviewed_by/reviewed_at rather than
     inventing a shape: what the reader is told about provenance has to be the same
     field the database will hand over. */
  publishedAt: string;
  reviewedBy: string;
  reviewedAt: string;
  feature?: "hero" | "band";
  image: { url: string; credit: string; sourceUrl: string; license: string };
  source: {
    label: { en: string; ar: string; tr: string };
    original: string;
    /* Keyed by locale, the way source_translations is in the database: a translation
       belongs to a language, and Arabic has none because the original is the text. */
    translation?: Partial<Record<Locale, { text: string; translator: string }>>;
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
  en: LocaleText;
  ar: LocaleText;
  tr: LocaleText;
};

export type TopicSlug =
  | "money"
  | "work"
  | "family"
  | "self"
  | "friendship"
  | "hardship";

export const TOPICS: { slug: TopicSlug; en: string; ar: string; tr: string }[] = [
  { slug: "money", en: "Money", ar: "المال", tr: "Para" },
  { slug: "work", en: "Work", ar: "العمل", tr: "İş" },
  { slug: "family", en: "Family", ar: "الأهل", tr: "Aile" },
  { slug: "self", en: "Yourself", ar: "النفس", tr: "Kendin" },
  { slug: "friendship", en: "People", ar: "الناس", tr: "İnsanlar" },
  { slug: "hardship", en: "Hardship", ar: "الشدّة", tr: "Zorluk" },
];

export const SITUATIONS: Situation[] = [
  {
    slug: "asked-for-money-again",
    topic: "money",
    minutes: 2,
    publishedAt: "2026-08-11",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-08-11",
    feature: "hero",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Richard_Dadd_-_Caravanserai_at_Mylasa_in_Asia_Minor_-_Google_Art_Project.jpg/1920px-Richard_Dadd_-_Caravanserai_at_Mylasa_in_Asia_Minor_-_Google_Art_Project.jpg",
      credit: "Richard Dadd, Caravanserai at Mylasa in Asia Minor, 1845",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Richard_Dadd_-_Caravanserai_at_Mylasa_in_Asia_Minor_-_Google_Art_Project.jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 1471", ar: "صحيح البخاري ١٤٧١", tr: "Sahîh-i Buhârî 1471" },
      original:
        "لَأن يَأخُذَ أحَدُكُم حَبلَه، فيَأتيَ بحُزمةِ الحَطَبِ على ظَهرِه، فيَبيعَها، فيَكُفَّ اللهُ بها وجهَه خَيرٌ له مِن أن يَسألَ النَّاسَ أعطَوْه أو مَنَعوه",
      translation: {
        en: {
          text: "For one of you to take his rope and bring a bundle of firewood on his back and sell it, so that Allah preserves his dignity by it, is better for him than begging from people, whether they give him or refuse him.",
          translator: "Muhsin Khan",
        },
        tr: {
          text: "Sizden birinin ipini alıp sırtında bir bağ odun getirmesi ve onu satması, Allah'ın da bununla onun onurunu koruması; versinler ya da vermesinler, insanlardan dilenmesinden onun için daha hayırlıdır.",
          translator: "Diyanet meali esas alınarak",
        },
      },
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
      title: "Someone keeps asking me for money",
      summary:
        "What to do when the asking never stops, and what the Prophet ﷺ told a man who came to him for help.",
      imageAlt: "A painting of travellers resting at a caravanserai",
      body: "The answer here is not “stop giving.” It is that repeated asking costs the person asking something, and the kindest response is often the one that ends the need rather than the one that meets it again this month.",
      takeaway:
        "Give what you can this time, then ask them one question: what would make this the last time? Help with that instead.",
    },
    ar: {
      title: "أحدهم يطلب مني المال باستمرار",
      summary: "ماذا تفعل حين لا يتوقف الطلب، وما الذي قاله النبي ﷺ لرجل جاء يسأله.",
      imageAlt: "لوحة تصور مسافرين يستريحون في خان",
      body: "الجواب ليس «توقّف عن العطاء». الطلب المتكرر يكلّف صاحبه شيئًا من نفسه، وأكرم ردٍّ في الغالب هو الذي ينهي الحاجة، لا الذي يسدّها هذا الشهر ثم يعود.",
      takeaway: "أعطِ ما تقدر عليه هذه المرة، ثم اسأل سؤالًا واحدًا: ما الذي يجعل هذه آخر مرة؟ وأعِنه على ذلك.",
    },
    tr: {
      title: "Biri benden sürekli para istiyor",
      summary: "İstemek hiç bitmediğinde ne yapmalı ve Peygamber ﷺ kendisinden yardım isteyen bir adama ne söyledi.",
      imageAlt: "Bir kervansarayda dinlenen yolcuları gösteren bir tablo",
      body: "Buradaki cevap “vermeyi bırak” değil. Tekrar tekrar istemek, isteyene bir şeye mal olur; en merhametli karşılık çoğu zaman ihtiyacı bu ay yeniden karşılayan değil, ihtiyacı bitirendir.",
      takeaway: "Bu sefer verebileceğini ver, sonra tek bir soru sor: bunu son sefer yapan şey ne olurdu? Onun yerine ona yardım et.",
    },
  },
  {
    slug: "my-boss-wronged-me",
    topic: "work",
    minutes: 3,
    publishedAt: "2026-08-09",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-08-09",
    feature: "band",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/%22Bahram_Gur_Exhibiting_his_Prowess_in_Wrestling_at_the_Court_of_Shangul%2C_King_of_India%22%2C_Folio_from_a_Shahnama_%28Book_of_Kings%29_MET_DP215667.jpg/1920px-%22Bahram_Gur_Exhibiting_his_Prowess_in_Wrestling_at_the_Court_of_Shangul%2C_King_of_India%22%2C_Folio_from_a_Shahnama_%28Book_of_Kings%29_MET_DP215667.jpg",
      credit: "Folio from a Shahnama, Iran, c. 1300",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:%22Bahram_Gur_Exhibiting_his_Prowess_in_Wrestling_at_the_Court_of_Shangul,_King_of_India%22,_Folio_from_a_Shahnama_(Book_of_Kings)_MET_DP215667.jpg",
      license: "cc0",
    },
    source: {
      label: { en: "Sahih al-Bukhari 2448", ar: "صحيح البخاري ٢٤٤٨", tr: "Sahîh-i Buhârî 2448" },
      original: "أنَّ النَّبيَّ صلَّى اللهُ عليه وسلَّم بَعَثَ مُعاذًا إلى اليَمَنِ، فقال: اتَّقِ دَعوةَ المَظلومِ؛ فإنَّها ليس بينَها وبينَ اللهِ حِجابٌ",
      translation: {
        en: { text: "The Prophet ﷺ sent Mu'adh to Yemen and said: beware of the supplication of the wronged, for between it and Allah there is no veil.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Peygamber ﷺ Muâz'ı Yemen'e gönderdi ve şöyle buyurdu: Mazlumun duasından sakın; çünkü onunla Allah arasında perde yoktur.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "عبدالله بن عباس",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "ZSajjm4z",
        takhrij: "أخرجه مسلم (19) مطولاً باختلاف يسير",
        categories: [
          { id: "8c29416e2e4192d0d00fc419af5025f3", name: "آداب الدعاء - استجابة الدعاء" },
          { id: "7d8a5c379add28bff2bdd316180367bd", name: "آداب الدعاء - من يستجاب دعاؤهم" },
          { id: "e24688b268fbd808d34876ef83219b36", name: "سرايا - تأمير الأمراء على البعوث والسرايا ووصيتهم" },
          { id: "66bfdd62a6e70b15dfb492dec2d0182c", name: "مظالم - تحريم الظلم" },
          { id: "7cc240fbf85a1effd1ef5bf9071a6721", name: "مظالم - دعوة المظلوم" },
        ],
      },
    },
    en: {
      title: "My boss wronged me and I said nothing",
      summary: "On speaking up late, and on what it costs to carry a grievance quietly.",
      imageAlt: "A manuscript painting of a contest before a royal court",
      body: "Staying silent in the moment is not cowardice, and raising it a week later is not weakness. What matters is whether you are asking for a change or asking to be proved right.",
      takeaway: "Decide which one you want before you open the conversation. Only one of them can actually be given to you.",
    },
    ar: {
      title: "ظلمني مديري فسكتّ",
      summary: "عن الكلام بعد فوات الأوان، وعن ثمن حمل الظلم في صمت.",
      imageAlt: "منمنمة تصور مبارزة أمام بلاط ملكي",
      body: "الصمت في اللحظة ليس جبنًا، وإثارة الأمر بعد أسبوع ليست ضعفًا. المهم أن تعرف: هل تطلب تغييرًا أم تطلب أن يُثبت أنك على حق؟",
      takeaway: "احسم أيهما تريد قبل أن تفتح الحديث. واحد منهما فقط هو ما يمكن أن يُعطى لك.",
    },
    tr: {
      title: "Müdürüm bana haksızlık etti, ben sustum",
      summary: "Geç konuşmak üzerine ve bir kırgınlığı sessizce taşımanın bedeli üzerine.",
      imageAlt: "Saray huzurunda bir müsabakayı gösteren bir el yazması minyatürü",
      body: "O anda susmak korkaklık değildir, bir hafta sonra konuyu açmak da zayıflık değildir. Önemli olan, bir değişiklik mi istediğin yoksa haklı çıkarılmayı mı istediğin.",
      takeaway: "Konuşmayı açmadan önce hangisini istediğine karar ver. İkisinden yalnızca biri sana gerçekten verilebilir.",
    },
  },
  {
    slug: "i-cannot-stop-being-angry",
    topic: "self",
    minutes: 2,
    publishedAt: "2026-08-07",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-08-07",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Brooklyn_Museum_-_Arjasp%27s_Horsemen_Killing_Luhrasp_from_the_%22Second_Small_Shahnameh%22_of_Firdausi.jpg",
      credit: "Folio from the Second Small Shahnama of Firdausi, c. 1298–1302",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_-_Arjasp%27s_Horsemen_Killing_Luhrasp_from_the_%22Second_Small_Shahnameh%22_of_Firdausi.jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 6114", ar: "صحيح البخاري ٦١١٤", tr: "Sahîh-i Buhârî 6114" },
      original: "ليس الشَّديدُ بالصُّرَعةِ، إنَّما الشَّديدُ الذي يَملِكُ نَفسَه عِندَ الغَضَبِ",
      translation: {
        en: { text: "The strong one is not the one who overcomes others in wrestling; the strong one is the one who holds himself in check at the moment of anger.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Güçlü, insanları güreşte yenen değildir; güçlü, öfke anında kendine hâkim olandır.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "SllC88XC",
        takhrij: "أخرجه البخاري (6114)، ومسلم (2609)",
        categories: [
          { id: "f7087a4821eeeafbe75d852c9a7f2468", name: "رقائق وزهد - الحلم" },
          { id: "48c7a2bd02e7f84713aa613da78116d4", name: "رقائق وزهد - جهاد النفس" },
          { id: "c1a304d349b9f3f9dda9ca22d8032bea", name: "رقائق وزهد - ما جاء في ترك الغضب" },
          { id: "f3d5a8b16c", name: "آداب عامة - الأخلاق الحميدة الحسنة" },
          { id: "f5dda7705e", name: "رقائق وزهد - المجاهدة" },
        ],
      },
    },
    en: {
      title: "I cannot stop being angry",
      summary: "What to do in the minute the anger arrives, before it decides anything for you.",
      imageAlt: "A manuscript painting of horsemen in battle",
      body: "Anger is not the problem; the speed is. Almost everything regrettable happens in the first sixty seconds, and almost nothing is lost by delaying a response past them.",
      takeaway: "Change your posture and say nothing for one minute. Then answer the thing that was actually said.",
    },
    ar: {
      title: "لا أستطيع أن أكفّ عن الغضب",
      summary: "ما تفعله في الدقيقة التي يشتدّ فيها الغضب، قبل أن يقرر عنك.",
      imageAlt: "منمنمة تصور فرسانًا في معركة",
      body: "ليست المشكلة في الغضب بل في سرعته. أغلب ما نندم عليه يقع في الستين ثانية الأولى، ولا يكاد يضيع شيء بتأخير الرد عنها.",
      takeaway: "غيّر وضعك ولا تتكلم دقيقة واحدة. ثم أجب عمّا قيل فعلًا.",
    },
    tr: {
      title: "Öfkemi durduramıyorum",
      summary: "Öfke geldiği dakikada, senin yerine bir şeye karar vermeden önce ne yapmalı.",
      imageAlt: "Savaşta atlıları gösteren bir el yazması minyatürü",
      body: "Sorun öfke değil, hızı. Pişman olunan hemen her şey ilk altmış saniyede olur ve cevabı o saniyelerin ötesine ertelemekle neredeyse hiçbir şey kaybedilmez.",
      takeaway: "Duruşunu değiştir ve bir dakika hiçbir şey söyleme. Sonra gerçekten söylenmiş olana cevap ver.",
    },
  },
  {
    slug: "my-parents-ask-too-much",
    topic: "family",
    minutes: 3,
    publishedAt: "2026-08-05",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-08-05",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Mughal_Dynasty%2C_Sa%27di_in_a_Rose_Garden%2C_Reign_of_Emperor_Shah_Jahan%2C_early_16th_century%2C_repainted_1645.jpg",
      credit: "Sa'di in a Rose Garden, Mughal, c. 1645",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Mughal_Dynasty,_Sa%27di_in_a_Rose_Garden,_Reign_of_Emperor_Shah_Jahan,_early_16th_century,_repainted_1645.jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih Muslim 2548", ar: "صحيح مسلم ٢٥٤٨", tr: "Sahîh-i Müslim 2548" },
      original: "جاءَ رَجُلٌ إلى رَسولِ اللهِ صلَّى اللهُ عليه وسلَّم، فقال: مَن أحَقُّ النَّاسِ بحُسنِ صَحابَتي؟ قال: أُمُّكَ، قال: ثُمَّ مَن؟ قال: ثُمَّ أُمُّكَ، قال: ثُمَّ مَن؟ قال: ثُمَّ أُمُّكَ، قال: ثُمَّ مَن؟ قال: ثُمَّ أبوكَ. وفي حَديثِ قُتَيبةَ: مَن أحَقُّ بحُسنِ صَحابَتي؟ ولم يَذكُرِ النَّاسَ",
      translation: {
        en: { text: "A man came to the Messenger of Allah ﷺ and asked: who among people most deserves my best companionship? He said: your mother. He asked: then who? He said: then your mother. He asked: then who? He said: then your mother. He asked: then who? He said: then your father. (In Qutaybah's narration: who most deserves my good companionship, without “among people”.)", translator: "Uswah draft, awaiting review" },
        tr: { text: "Bir adam Resûlullah'a ﷺ gelip sordu: Kendisine en iyi davranmam gereken kimdir? Annen, buyurdu. Sonra kim? Sonra annen. Sonra kim? Sonra annen. Sonra kim? Sonra baban, buyurdu. (Kuteybe rivayetinde “insanların” sözü geçmez.)", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "مسلم",
        grade: "[صحيح]",
        id: "Y0ncQmYf",
        takhrij: "أخرجه البخاري (5971)، ومسلم (2548).",
        categories: [
          { id: "22a7e02c5ec9f4b9dd868b074d914d95", name: "بر وصلة - عظم حق الأم" },
          { id: "2b2916337e", name: "بر وصلة - التعاون على البر والتقوى" },
          { id: "de45c849aa", name: "بر وصلة - بر الوالدين وحقهما" },
        ],
      },
    },
    en: {
      title: "My parents ask more of me than I can give",
      summary: "Where duty ends and resentment begins, and how to tell which one you are acting from.",
      imageAlt: "A Mughal painting of a poet seated in a rose garden",
      body: "The duty is not in question. What is in question is whether saying yes to everything is service or avoidance, because a grudging yes tends to cost the relationship more than a clear, gentle no.",
      takeaway: "Name one thing you will keep doing and one you will stop. Say both out loud, kindly, once.",
    },
    ar: {
      title: "والداي يطلبان أكثر مما أطيق",
      summary: "أين ينتهي البرّ ويبدأ الضجر، وكيف تعرف من أيهما تتصرف.",
      imageAlt: "منمنمة مغولية تصور شاعرًا جالسًا في حديقة ورد",
      body: "البرّ ليس محل نقاش. المحل هو: هل الموافقة على كل شيء خدمة أم هروب؟ فالموافقة على مضض تكلّف العلاقة أكثر مما يكلّفها رفض لطيف واضح.",
      takeaway: "سمِّ أمرًا واحدًا ستستمر فيه وآخر ستتوقف عنه. وقل الاثنين برفق، مرة واحدة.",
    },
    tr: {
      title: "Ailem benden verebileceğimden fazlasını istiyor",
      summary: "Vazifenin nerede bitip darılmanın nerede başladığı ve hangisinden davrandığını nasıl anlarsın.",
      imageAlt: "Gül bahçesinde oturan bir şairi gösteren Babürlü minyatür",
      body: "Vazife tartışma konusu değil. Tartışma konusu şu: her şeye evet demek hizmet mi, kaçış mı? Çünkü gönülsüz bir evet, ilişkiye çoğu zaman açık ve nazik bir hayırdan daha pahalıya mal olur.",
      takeaway: "Sürdüreceğin bir şeyi ve bırakacağın bir şeyi adıyla söyle. İkisini de nazikçe, bir kez, yüksek sesle söyle.",
    },
  },
  {
    slug: "a-friend-let-me-down",
    topic: "friendship",
    minutes: 2,
    publishedAt: "2026-08-03",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-08-03",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Ertugrul_Gazi_sends_his_son_Savci_Bey_to_the_Sultan_Alaeddin_Keykubad_with_the_request_to_be_allowed_to_populate_a_new_area.._Miniature%2C_Turkish%2C_1616._Tadj_al-Tawarikh_%28The_Crown_of_Chronicles%29.jpg/1920px-thumbnail.jpg",
      credit: "Miniature from the Tāj al-Tawārīkh, Ottoman, 1616",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Ertugrul_Gazi_sends_his_son_Savci_Bey_to_the_Sultan_Alaeddin_Keykubad_with_the_request_to_be_allowed_to_populate_a_new_area.._Miniature,_Turkish,_1616._Tadj_al-Tawarikh_(The_Crown_of_Chronicles).jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 6133", ar: "صحيح البخاري ٦١٣٣", tr: "Sahîh-i Buhârî 6133" },
      original: "لا يُلدَغُ المُؤمِنُ مِن جُحرٍ واحِدٍ مَرَّتَينِ",
      translation: {
        en: { text: "The believer is not stung from the same hole twice.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Mümin aynı delikten iki kez sokulmaz.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "0aXNOyFB",
        takhrij: "أخرجه مسلم (2998)، وأبو داود (4862)، وابن ماجة (3982) واللفظ لهم.",
        categories: [
          { id: "f32ce9de042ac5546f6fa1a64ab0b09a", name: "إيمان - صفات المؤمنين" },
          { id: "fa8360f30f23d7bc6997501263e4162e", name: "رقائق وزهد - ما جاء في الحذر" },
          { id: "8300a4b4fe", name: "آداب عامة - ضرب الأمثال" },
          { id: "ca77abe7a8", name: "رقائق وزهد - الوصايا النافعة" },
        ],
      },
    },
    en: {
      title: "A friend let me down when it mattered",
      summary: "On the difference between forgiving someone and trusting them with the same thing again.",
      imageAlt: "An Ottoman miniature of an envoy before a ruler",
      body: "These are two separate decisions and they get confused constantly. You can drop the grievance entirely and still not hand them the same responsibility twice.",
      takeaway: "Forgive now. Decide about trust separately, later, and on evidence.",
    },
    ar: {
      title: "خذلني صديق في وقت الحاجة",
      summary: "عن الفرق بين أن تسامح أحدًا وأن تأتمنه على الأمر نفسه مرة أخرى.",
      imageAlt: "منمنمة عثمانية تصور رسولًا أمام حاكم",
      body: "هذان قراران منفصلان يختلطان كثيرًا. تستطيع أن تُسقط العتب كله وألا تسلّمه المسؤولية نفسها مرتين.",
      takeaway: "سامح الآن. وأجّل قرار الثقة، واحكم فيه بالدليل.",
    },
    tr: {
      title: "Bir dostum tam gerektiğinde beni yarı yolda bıraktı",
      summary: "Birini affetmekle aynı şeyde ona yeniden güvenmek arasındaki fark üzerine.",
      imageAlt: "Bir hükümdarın huzurundaki elçiyi gösteren Osmanlı minyatürü",
      body: "Bunlar iki ayrı karardır ve sürekli birbirine karıştırılır. Kırgınlığı tümüyle bırakabilir, yine de aynı sorumluluğu ona ikinci kez vermeyebilirsin.",
      takeaway: "Şimdi affet. Güven kararını ayrıca, sonra ve delile bakarak ver.",
    },
  },
  {
    slug: "i-am-in-debt",
    topic: "money",
    minutes: 3,
    publishedAt: "2026-07-30",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-07-30",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Caravanserai_in_Afganistan_by_A.Yakovlev_%281931%29.jpg",
      credit: "Alexandre Yakovlev, Caravanserai in Afghanistan, 1931",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Caravanserai_in_Afganistan_by_A.Yakovlev_(1931).jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 2387", ar: "صحيح البخاري ٢٣٨٧", tr: "Sahîh-i Buhârî 2387" },
      original: "مَن أخَذَ أموالَ النَّاسِ يُريدُ أداءَها أدَّى اللهُ عنه، ومَن أخَذَ يُريدُ إتلافَها أتلَفَه اللهُ",
      translation: {
        en: { text: "Whoever takes people's wealth intending to repay it, Allah repays it on his behalf; and whoever takes it intending to squander it, Allah brings him to ruin.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Kim insanların malını ödeme niyetiyle alırsa, Allah onun yerine öder; kim de telef etme niyetiyle alırsa, Allah onu telef eder.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "LmEB9MuR",
        takhrij: "من أفراد البخاري على مسلم",
        categories: [
          { id: "84414ff87bf1fa9503f317bbb0e0d65b", name: "قرض - جواز الاستقراض" },
          { id: "3b4aee7961aa0d748e3031adc6a35c20", name: "قرض - من استقرض من الناس ليوفي أو يتلف" },
          { id: "1e8dc88e1d7f0cc87ad00d50e775781d", name: "قرض - من نوى قضاء دينه واهتم به" },
          { id: "9ca74737ff", name: "قرض - الدائن معان" },
          { id: "5e5c9f87a9", name: "قرض - فضل القرض وحسن النية في القضاء" },
        ],
      },
    },
    en: {
      title: "I am in debt and too ashamed to say so",
      summary: "Why the silence usually costs more than the debt, and what to do first.",
      imageAlt: "A painting of a caravanserai courtyard",
      body: "Debt grows quietly and shame keeps it quiet. Almost every account of relief begins with someone saying the number out loud to one person who could do something about it.",
      takeaway: "Write the real total down today. Say it to one person this week.",
    },
    ar: {
      title: "عليّ دَين وأخجل أن أقول",
      summary: "لماذا يكلّف الصمت أكثر من الدَّين نفسه، وبماذا تبدأ.",
      imageAlt: "لوحة تصور فناء خان",
      body: "الدَّين ينمو في هدوء، والخجل هو ما يبقيه هادئًا. وأغلب قصص الفرج تبدأ بأن يقول صاحبها الرقم بصوت مسموع لشخص واحد يستطيع أن يصنع شيئًا.",
      takeaway: "اكتب المبلغ الحقيقي اليوم. وقُله لشخص واحد هذا الأسبوع.",
    },
    tr: {
      title: "Borçluyum ve söylemeye utanıyorum",
      summary: "Sessizlik neden çoğu zaman borcun kendisinden pahalıya mal olur ve önce ne yapmalı.",
      imageAlt: "Bir kervansaray avlusunu gösteren tablo",
      body: "Borç sessizce büyür, utanç da onu sessiz tutar. Ferahlığa dair hemen her anlatı, birinin rakamı bu konuda bir şey yapabilecek tek bir kişiye yüksek sesle söylemesiyle başlar.",
      takeaway: "Gerçek toplamı bugün yaz. Bu hafta bir kişiye söyle.",
    },
  },
  {
    slug: "i-was-passed-over",
    topic: "work",
    minutes: 2,
    publishedAt: "2026-07-27",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-07-27",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/%22Luhrasp_Hears_from_the_Returning_Paladins_of_the_Vanishing_Kai_Khusrau%22%2C_Folio_from_a_Shahnama_%28Book_of_Kings%29_of_Firdausi_MET_DP215765.jpg/1920px-%22Luhrasp_Hears_from_the_Returning_Paladins_of_the_Vanishing_Kai_Khusrau%22%2C_Folio_from_a_Shahnama_%28Book_of_Kings%29_of_Firdausi_MET_DP215765.jpg",
      credit: "Folio from a Shahnama of Firdausi, Iran, 1576–77",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:%22Luhrasp_Hears_from_the_Returning_Paladins_of_the_Vanishing_Kai_Khusrau%22,_Folio_from_a_Shahnama_(Book_of_Kings)_of_Firdausi_MET_DP215765.jpg",
      license: "cc0",
    },
    source: {
      label: { en: "Sahih al-Bukhari 7141", ar: "صحيح البخاري ٧١٤١", tr: "Sahîh-i Buhârî 7141" },
      original: "لا حَسَدَ إلَّا في اثنَتَينِ: رَجُلٌ آتاه اللهُ مالًا، فسَلَّطَه على هَلَكَتِه في الحَقِّ، وآخَرُ آتاه اللهُ حِكمةً فهو يَقضي بها ويُعَلِّمُها",
      translation: {
        en: { text: "There is no envy except in two: a man to whom Allah gave wealth and empowered him to spend it up in what is right, and another to whom Allah gave wisdom, so he judges by it and teaches it.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Yalnız iki kişiye gıpta edilir: Allah'ın kendisine mal verip onu hak yolda tüketmeye muvaffak kıldığı kişi ve Allah'ın kendisine hikmet verip onunla hükmeden ve onu öğreten kişi.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "عبدالله بن مسعود",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "omBzGIMO",
        takhrij: "أخرجه مسلم (816)",
        categories: [
          { id: "7fdf45aded94269a4978a1b2f134125a", name: "تجارة - خير المال" },
          { id: "700784e47efb96cb405831b8fdcb48ac", name: "رقائق وزهد - الحكمة" },
          { id: "573d479b139933cf75f7c7c036120105", name: "صدقة - فضل الصدقة والحث عليها" },
          { id: "bf1aa09cc570cd244afc2d8f40d0947b", name: "علم - الاغتباط في العلم والحكمة" },
          { id: "68ae55d131", name: "نفقة - الإنفاق في أوجه الخير وفضله" },
        ],
      },
    },
    en: {
      title: "Someone less capable was promoted over me",
      summary: "On envy that arrives before you have decided to feel it.",
      imageAlt: "A manuscript painting of messengers reporting to a seated king",
      body: "Noticing the unfairness is not envy. Envy is wanting it removed from them rather than given to you, and the difference shows up in what you say about them when they are not there.",
      takeaway: "Say one true good thing about them out loud this week. Notice how hard it is.",
    },
    ar: {
      title: "رُقِّي من هو أقل مني كفاءة",
      summary: "عن الحسد الذي يسبق قرارك بأن تشعر به.",
      imageAlt: "منمنمة تصور رسلًا يبلّغون ملكًا جالسًا",
      body: "أن ترى الظلم ليس حسدًا. الحسد أن تريد زوال النعمة عنه لا حصولك عليها، والفرق يظهر فيما تقوله عنه حين لا يكون حاضرًا.",
      takeaway: "قل عنه هذا الأسبوع خيرًا واحدًا صادقًا بصوت مسموع. وانتبه كم يصعب ذلك.",
    },
    tr: {
      title: "Benden daha yetersiz biri terfi etti",
      summary: "Sen hissetmeye karar vermeden önce gelen haset üzerine.",
      imageAlt: "Oturan bir hükümdara haber getiren elçileri gösteren minyatür",
      body: "Haksızlığı fark etmek haset değildir. Haset, o şeyin sana verilmesini değil ondan alınmasını istemektir; fark, o yokken onun hakkında söylediklerinde ortaya çıkar.",
      takeaway: "Bu hafta onun hakkında doğru ve iyi bir şeyi yüksek sesle söyle. Ne kadar zor olduğuna dikkat et.",
    },
  },
  {
    slug: "i-keep-putting-it-off",
    topic: "self",
    minutes: 2,
    publishedAt: "2026-07-24",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-07-24",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/5c/On_the_Calculation_of_Numbers_in_the_Science_of_Astronomy_WDL466.jpg",
      credit: "On the Calculation of Numbers in the Science of Astronomy, 18th century",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:On_the_Calculation_of_Numbers_in_the_Science_of_Astronomy_WDL466.jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih Muslim 783", ar: "صحيح مسلم ٧٨٣", tr: "Sahîh-i Müslim 783" },
      original: "أحَبُّ الأعمالِ إلى اللهِ تَعالى أدوَمُها وإن قَلَّ. قال: وكانَت عائِشةُ إذا عَمِلَتِ العَمَلَ لَزِمَتْه",
      translation: {
        en: { text: "The most beloved of deeds to Allah, exalted is He, are the most constant of them, even if small. And when Aisha did a deed, she would hold to it.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Allah Teâlâ'ya amellerin en sevimlisi, az da olsa en devamlı olanıdır. Âişe bir ameli yaptığında ona sarılırdı.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "عائشة أم المؤمنين",
        mohdith: "مسلم",
        grade: "[صحيح]",
        id: "NpZLQ79z",
        takhrij: "أخرجه البخاري (6465)، ومسلم (783).",
        categories: [
          { id: "f402326959424e033e54f400fe017d24", name: "رقائق وزهد - أي الأعمال أفضل" },
          { id: "79ebfc9e5a40c080ba07e5ba675ce75c", name: "رقائق وزهد - القصد والمداومة على العمل" },
          { id: "86f3241ea41ca0ecd2c030f93b85cf01", name: "مناقب وفضائل - عائشة بنت أبي بكر الصديق" },
          { id: "253dacba9214a5f0f35dc00ac69b7cee", name: "مناقب وفضائل - فضائل أصحاب النبي صلى الله عليه وسلم" },
          { id: "6d2a45e6bf", name: "مناقب وفضائل - فضائل أزواج النبي صلى الله عليه وسلم" },
        ],
      },
    },
    en: {
      title: "I keep putting off the thing I know I should do",
      summary: "Delay is rarely about time. It is usually about the size of the first step.",
      imageAlt: "A page from an illustrated astronomical manuscript",
      body: "The task you are avoiding is almost never the task you described to yourself. It is a smaller, more specific first move that you have not named yet.",
      takeaway: "Write down the first physical action, the one that takes two minutes. Do only that.",
    },
    ar: {
      title: "أؤجّل ما أعرف أنه يجب أن أفعله",
      summary: "التأجيل نادرًا ما يكون بسبب الوقت، بل بسبب حجم الخطوة الأولى.",
      imageAlt: "صفحة من مخطوط فلكي مزيّن",
      body: "العمل الذي تتجنبه ليس هو العمل الذي وصفته لنفسك. إنه خطوة أولى أصغر وأدق لم تسمّها بعد.",
      takeaway: "اكتب أول فعل ملموس، الذي يستغرق دقيقتين. وافعله وحده.",
    },
    tr: {
      title: "Yapmam gerektiğini bildiğim şeyi hep erteliyorum",
      summary: "Erteleme nadiren zamanla ilgilidir. Çoğu zaman ilk adımın büyüklüğüyle ilgilidir.",
      imageAlt: "Resimli bir astronomi el yazmasından bir sayfa",
      body: "Kaçındığın iş, neredeyse hiçbir zaman kendine anlattığın iş değildir. Henüz adını koymadığın, daha küçük ve daha somut bir ilk hamledir.",
      takeaway: "İlk fiziksel adımı, iki dakika sürenini yaz. Yalnızca onu yap.",
    },
  },
  {
    slug: "someone-spoke-badly-of-me",
    topic: "friendship",
    minutes: 2,
    publishedAt: "2026-07-21",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-07-21",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Prince_and_Ladies_in_a_Garden%2C_mid-18th_century%3B_Mughal.jpg",
      credit: "Prince and Ladies in a Garden, Mughal, mid-18th century",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Prince_and_Ladies_in_a_Garden,_mid-18th_century;_Mughal.jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 6138", ar: "صحيح البخاري ٦١٣٨", tr: "Sahîh-i Buhârî 6138" },
      original: "مَن كان يُؤمِنُ باللهِ واليَومِ الآخِرِ فليُكرِمْ ضَيفَه، ومَن كان يُؤمِنُ باللهِ واليَومِ الآخِرِ فليَصِلْ رَحِمَه، ومَن كان يُؤمِنُ باللهِ واليَومِ الآخِرِ فليَقُلْ خَيرًا أو ليَصمُتْ",
      translation: {
        en: { text: "Whoever believes in Allah and the Last Day, let him honour his guest; whoever believes in Allah and the Last Day, let him keep his ties of kinship; and whoever believes in Allah and the Last Day, let him speak good or keep silent.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Allah'a ve âhiret gününe iman eden misafirine ikram etsin; Allah'a ve âhiret gününe iman eden akrabalık bağını gözetsin; Allah'a ve âhiret gününe iman eden ya hayır söylesin ya da sussun.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "Mgy5kJET",
        takhrij: "أخرجه البخاري (6138)، ومسلم (47)",
        categories: [
          { id: "7645078936fef500aeb163e90bc9eadb", name: "آداب الكلام - الصمت وقلة الكلام" },
          { id: "04e54b76f7db0aeac9a585e27c91d020", name: "آداب المجلس - إكرام الضيف" },
          { id: "0a11b7432ebc1358348a305a4a982b28", name: "إيمان - الأعمال التي من الإيمان" },
          { id: "5f2b08bf0571f17e6f6cc83e7c6f4ce3", name: "بر وصلة - صلة الرحم وتحريم قطعها" },
          { id: "f3d5a8b16c", name: "آداب عامة - الأخلاق الحميدة الحسنة" },
        ],
      },
    },
    en: {
      title: "I found out someone spoke badly of me",
      summary: "What is worth answering, and what is worth outliving.",
      imageAlt: "A Mughal garden scene with figures seated among trees",
      body: "Most of it needs no answer at all. The test is narrow: does the claim change what someone can do to you, or only how you feel? Only the first is worth a conversation.",
      takeaway: "If it changes nothing but your mood, let it stand and let time answer it.",
    },
    ar: {
      title: "علمت أن أحدًا تكلم عني بسوء",
      summary: "ما الذي يستحق الرد، وما الذي يستحق أن تتجاوزه.",
      imageAlt: "مشهد حديقة مغولي فيه أشخاص جالسون بين الأشجار",
      body: "أكثره لا يحتاج ردًّا. والمعيار ضيق: هل يغيّر الكلام ما يستطيع أحد أن يفعله بك، أم يغيّر شعورك فقط؟ الأول وحده يستحق حديثًا.",
      takeaway: "إن لم يغيّر إلا مزاجك، فدعه ودع الزمن يجيب عنه.",
    },
    tr: {
      title: "Birinin arkamdan kötü konuştuğunu öğrendim",
      summary: "Neye cevap vermeye değer, neyi geride bırakmaya değer.",
      imageAlt: "Ağaçlar arasında oturan kişilerin olduğu Babürlü bahçe sahnesi",
      body: "Çoğunun hiçbir cevaba ihtiyacı yok. Ölçü dar: bu söz, birinin sana yapabileceklerini mi değiştiriyor, yoksa yalnızca nasıl hissettiğini mi? Sadece ilki bir konuşmaya değer.",
      takeaway: "Ruh hâlinden başka bir şeyi değiştirmiyorsa, olduğu gibi bırak; cevabı zaman versin.",
    },
  },
  {
    slug: "i-lost-someone",
    topic: "hardship",
    minutes: 3,
    publishedAt: "2026-07-18",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-07-18",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/66/Sentry_at_the_palace%2C_and_old_cannons._Bukhara_1904_%28Sergey_Prokudin-Gorsky%29.jpg",
      credit: "Sergey Prokudin-Gorsky, Sentry at the palace, Bukhara, 1904",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sentry_at_the_palace,_and_old_cannons._Bukhara_1904_(Sergey_Prokudin-Gorsky).jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 1303", ar: "صحيح البخاري ١٣٠٣", tr: "Sahîh-i Buhârî 1303" },
      original: "دَخَلنا مع رَسولِ اللهِ صلَّى اللهُ عليه وسلَّم على أبي سَيفٍ القَينِ، وكان ظِئرًا لإبراهيمَ عليه السَّلامُ، فأخَذَ رَسولُ اللهِ صلَّى اللهُ عليه وسلَّم إبراهيمَ، فقَبَّلَه، وشَمَّه، ثُمَّ دَخَلنا عليه بَعدَ ذلك وإبراهيمُ يَجودُ بنَفسِه، فجَعَلَت عَينا رَسولِ اللهِ صلَّى اللهُ عليه وسلَّم تَذرِفانِ، فقال له عبدُ الرَّحمَنِ بنُ عَوفٍ رَضيَ اللهُ عنه: وأنتَ يا رَسولَ اللهِ؟ فقال: يا ابنَ عَوفٍ إنَّها رَحمةٌ، ثُمَّ أتبَعَها بأُخرى، فقال صلَّى اللهُ عليه وسلَّم: إنَّ العَينَ تَدمَعُ، والقَلبَ يَحزَنُ، ولا نَقولُ إلَّا ما يَرضى رَبُّنا، وإنَّا بفِراقِكَ يا إبراهيمُ لَمَحزونونَ",
      translation: {
        en: { text: "We went in with the Messenger of Allah ﷺ to Abu Sayf the smith, whose wife had nursed Ibrahim, peace be upon him. The Messenger of Allah ﷺ took Ibrahim, kissed him and breathed in his scent. Later we went in as Ibrahim was giving up his soul, and the eyes of the Messenger of Allah ﷺ began to overflow. Abd al-Rahman ibn Awf said to him: you too, Messenger of Allah? He said: Ibn Awf, it is a mercy. Then more tears followed, and he said: the eye weeps and the heart grieves, and we say only what pleases our Lord; and at your parting, Ibrahim, we are grieved.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Resûlullah ﷺ ile birlikte, İbrâhim'in sütbabası olan demirci Ebû Seyf'in yanına girdik. Resûlullah ﷺ İbrâhim'i aldı, öptü ve kokladı. Daha sonra, İbrâhim can verirken yanına girdik; Resûlullah'ın ﷺ gözleri yaş dökmeye başladı. Abdurrahman b. Avf ona: Sen de mi yâ Resûlallah? dedi. Ey İbn Avf, bu bir rahmettir, buyurdu. Sonra yaşlar birbirini izledi ve şöyle dedi: Göz yaşarır, kalp hüzünlenir; biz Rabbimizin razı olacağından başkasını söylemeyiz. İbrâhim, senin ayrılığınla gerçekten hüzünlüyüz.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أنس بن مالك",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "dKKm2UCZ",
        takhrij: "أخرجه البخاري (1303)، ومسلم (2315)",
        categories: [
          { id: "8b61cc8ce2086a05ed92a2943a90633f", name: "جنائز وموت - البكاء على الميت" },
          { id: "e5e1d1495f4bde519317042bb036d595", name: "رقائق وزهد - الحزن والبكاء" },
          { id: "fa344dd4bbf0ffb20f5ca6db5a6d8808", name: "فضائل النبي وصفته ودلائل النبوة - رحمته" },
          { id: "4a9b4d17ea0f23e49dc1a032ac8c1114", name: "مناقب وفضائل - إبراهيم بن النبي صلى الله عليه وسلم" },
          { id: "5c7577c95e", name: "جنائز وموت - الحزن لموت الأفاضل" },
        ],
      },
    },
    en: {
      title: "I lost someone and the days feel flat",
      summary: "On grief that does not look like grief, and on what the sources ask of you in it.",
      imageAlt: "A colour photograph of a sentry outside a palace in Bukhara, 1904",
      body: "Flatness is grief too. There is no requirement to feel it dramatically, and no schedule you are behind on.",
      takeaway: "Keep one ordinary obligation every day. It is a rope, and it holds more than it looks like it should.",
    },
    ar: {
      title: "فقدت عزيزًا وصارت الأيام بلا طعم",
      summary: "عن حزن لا يشبه الحزن، وعمّا تطلبه المصادر منك فيه.",
      imageAlt: "صورة ملونة لحارس أمام قصر في بخارى سنة ١٩٠٤",
      body: "الفتور حزنٌ أيضًا. ليس مطلوبًا أن تشعر به على نحو ظاهر، ولست متأخرًا عن جدول.",
      takeaway: "احتفظ بواجب واحد معتاد كل يوم. إنه حبل، ويحمل أكثر مما يبدو عليه.",
    },
    tr: {
      title: "Birini kaybettim ve günler tatsız geçiyor",
      summary: "Yasa benzemeyen yas üzerine ve kaynakların bu hâlde senden ne istediği üzerine.",
      imageAlt: "1904'te Buhara'da bir sarayın önündeki nöbetçinin renkli fotoğrafı",
      body: "Tatsızlık da yastır. Onu gösterişli biçimde hissetme zorunluluğun yok ve geride kaldığın bir takvim de yok.",
      takeaway: "Her gün sıradan bir yükümlülüğü sürdür. O bir halattır ve göründüğünden fazlasını taşır.",
    },
  },
  {
    slug: "i-cannot-forgive-myself",
    topic: "self",
    minutes: 2,
    publishedAt: "2026-07-15",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-07-15",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Wall_painting_of_partridges_and_hoopoes_in_a_landscape_from_Knossos_%28Caravanserai%29_-_Heraklion_AM.jpg/1920px-Wall_painting_of_partridges_and_hoopoes_in_a_landscape_from_Knossos_%28Caravanserai%29_-_Heraklion_AM.jpg",
      credit: "Wall painting of partridges and hoopoes, Knossos",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Wall_painting_of_partridges_and_hoopoes_in_a_landscape_from_Knossos_(Caravanserai)_-_Heraklion_AM.jpg",
      license: "cc-by-sa-4.0",
    },
    source: {
      label: { en: "Sahih Muslim 2675", ar: "صحيح مسلم ٢٦٧٥", tr: "Sahîh-i Müslim 2675" },
      original: "قال اللهُ عزَّ وجلَّ: أنا عِندَ ظَنِّ عَبدي بي، وأنا معهُ حَيثُ يَذكُرُني، واللهِ لَلَّهُ أفرَحُ بتَوبةِ عَبدِه مِن أحَدِكُم يَجِدُ ضالَّتَه بالفَلاةِ، ومَن تَقَرَّبَ إلَيَّ شِبرًا تَقَرَّبتُ إليه ذِراعًا، ومَن تَقَرَّبَ إلَيَّ ذِراعًا تَقَرَّبتُ إليه باعًا، وإذا أقبَلَ إلَيَّ يَمشي أقبَلتُ إليه أُهَروِلُ",
      translation: {
        en: { text: "Allah, mighty and majestic, said: I am as My servant thinks of Me, and I am with him wherever he remembers Me. By Allah, Allah rejoices more at the repentance of His servant than one of you who finds his lost mount in the desert. Whoever draws near to Me a handspan, I draw near to him an arm's length; whoever draws near to Me an arm's length, I draw near to him a fathom; and if he comes to Me walking, I come to him at speed.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Allah azze ve celle şöyle buyurdu: Ben kulumun beni sandığı gibiyim; beni andığı yerde onunlayım. Vallahi Allah, kulunun tövbesine, çölde yitiğini bulan birinizin sevincinden daha çok sevinir. Bana bir karış yaklaşana bir arşın yaklaşırım; bir arşın yaklaşana bir kulaç yaklaşırım; bana yürüyerek gelene koşarak gelirim.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "مسلم",
        grade: "[صحيح]",
        id: "hjugjsr9",
        takhrij: "أخرجه البخاري (7405)، ومسلم (2675).",
        categories: [
          { id: "8713a5272a209b603b25cfd07136d927", name: "أدعية وأذكار - فضل الذكر" },
          { id: "02c7f559b5fde46cd9ac71b1ac1fcc3f", name: "توبة - الحض على التوبة" },
          { id: "0746b33219956b3c38198e1f4c7fb528", name: "رقائق وزهد - الاجتهاد في العبادة" },
          { id: "248c5bafb1755ee9929b5dda873011b3", name: "رقائق وزهد - حسن الظن بالله" },
          { id: "3b314bd99d", name: "إحسان - الحث على الأعمال الصالحة" },
        ],
      },
    },
    en: {
      title: "I cannot forgive myself for something",
      summary: "On the difference between remorse that repairs and remorse that only punishes.",
      imageAlt: "A wall painting of birds in a landscape",
      body: "Remorse that changes what you do next is doing its work. Remorse that only replays the scene is a habit wearing the clothes of repentance.",
      takeaway: "Name the repair, however partial, and do that instead of remembering again.",
    },
    ar: {
      title: "لا أستطيع أن أسامح نفسي",
      summary: "عن الفرق بين ندمٍ يُصلح وندمٍ لا يفعل شيئًا إلا العقاب.",
      imageAlt: "رسم جداري لطيور في منظر طبيعي",
      body: "الندم الذي يغيّر ما تفعله بعده يؤدي عمله. أما الذي يعيد المشهد فحسب فعادةٌ لبست ثوب التوبة.",
      takeaway: "سمِّ الإصلاح ولو جزئيًا، وافعله بدل أن تتذكر مرة أخرى.",
    },
    tr: {
      title: "Bir şey için kendimi affedemiyorum",
      summary: "Onaran pişmanlıkla yalnızca cezalandıran pişmanlık arasındaki fark üzerine.",
      imageAlt: "Bir manzarada kuşları gösteren duvar resmi",
      body: "Bundan sonra ne yapacağını değiştiren pişmanlık işini görüyordur. Sahneyi yalnızca yeniden oynatan pişmanlık ise tövbenin elbisesini giymiş bir alışkanlıktır.",
      takeaway: "Kısmi de olsa onarımın adını koy ve yeniden hatırlamak yerine onu yap.",
    },
  },
  {
    slug: "i-am-far-from-home",
    topic: "hardship",
    minutes: 2,
    publishedAt: "2026-07-12",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-07-12",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Royal_attendants_of_Babur_and_Humayun%2C_going_to_see_the_Rhinoceros.jpg",
      credit: "Royal attendants of Babur and Humayun, Mughal",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Royal_attendants_of_Babur_and_Humayun,_going_to_see_the_Rhinoceros.jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 6416", ar: "صحيح البخاري ٦٤١٦", tr: "Sahîh-i Buhârî 6416" },
      original: "أخَذَ رَسولُ اللهِ صلَّى اللهُ عليه وسلَّم بمَنكِبي، فقال: كُنْ في الدُّنيا كَأنَّكَ غَريبٌ أو عابِرُ سَبيلٍ. وكان ابنُ عُمَرَ يقولُ: إذا أمسَيتَ فلا تَنتَظِرِ الصَّباحَ، وإذا أصبَحتَ فلا تَنتَظِرِ المَساءَ، وخُذ مِن صِحَّتِكَ لمَرَضِكَ، ومِن حَياتِكَ لمَوتِكَ",
      translation: {
        en: { text: "The Messenger of Allah ﷺ took me by the shoulder and said: be in this world as if you were a stranger, or one passing along a road. And Ibn Umar used to say: when evening comes, do not wait for morning, and when morning comes, do not wait for evening; take from your health for your illness, and from your life for your death.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Resûlullah ﷺ omzumdan tuttu ve şöyle buyurdu: Dünyada bir garip yahut bir yolcu gibi ol. İbn Ömer de şöyle derdi: Akşama erdiğinde sabahı bekleme, sabaha erdiğinde akşamı bekleme; sağlığından hastalığın için, hayatından ölümün için pay al.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "عبدالله بن عمر",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "scFZxN1c",
        takhrij: "من أفراد البخاري على مسلم",
        categories: [
          { id: "5585a3601c020f9566a200987f170e74", name: "رقائق وزهد - ما ينبغي لكل مسلم أن يستعمله من قصر الأمل والاستعداد للموت" },
          { id: "28ce07e644cbb25bd29d5ccd5a5840c8", name: "رقائق وزهد - الزهد في الدنيا" },
          { id: "dd0d0c3a5d234c7725a0e0a05db48f93", name: "رقائق وزهد - ذكر الموت" },
          { id: "3b314bd99d", name: "إحسان - الحث على الأعمال الصالحة" },
          { id: "64d0a5baa4", name: "جنائز وموت - لقاء الله والمبادرة بالعمل الصالح" },
        ],
      },
    },
    en: {
      title: "I am far from home and it does not get easier",
      summary: "On distance that stops being temporary, and what to build where you are.",
      imageAlt: "A Mughal painting of attendants travelling on horseback",
      body: "Distance stops being an interruption at some point and becomes the arrangement. The turn is not resignation; it is deciding to belong somewhere before the belonging feels earned.",
      takeaway: "Pick one place near you and go weekly until people there know your face.",
    },
    ar: {
      title: "أنا بعيد عن أهلي ولا يهون الأمر",
      summary: "عن بُعدٍ لم يعد مؤقتًا، وعمّا تبنيه حيث أنت.",
      imageAlt: "منمنمة مغولية تصور حاشية تسافر على الخيل",
      body: "يتوقف البُعد في لحظةٍ عن كونه انقطاعًا ويصير هو الحال. والانتقال ليس استسلامًا، بل قرارًا بأن تنتمي إلى مكان قبل أن يبدو الانتماء مستحقًا.",
      takeaway: "اختر مكانًا واحدًا قريبًا منك واذهب إليه أسبوعيًا حتى يعرف أهله وجهك.",
    },
    tr: {
      title: "Memleketimden uzağım ve kolaylaşmıyor",
      summary: "Artık geçici olmayan bir uzaklık üzerine ve bulunduğun yerde ne kuracağın üzerine.",
      imageAlt: "At üstünde yol alan maiyeti gösteren Babürlü minyatür",
      body: "Uzaklık bir noktada bir kesinti olmaktan çıkıp düzenin kendisi hâline gelir. Dönüş noktası teslimiyet değil; aidiyet hak edilmiş gibi hissettirmeden önce bir yere ait olmaya karar vermektir.",
      takeaway: "Yakınında bir yer seç ve oradakiler yüzünü tanıyana kadar her hafta git.",
    },
  },
  {
    slug: "i-said-something-i-regret",
    topic: "self",
    minutes: 2,
    publishedAt: "2026-07-09",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-07-09",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/%22Bahram_Gur_Exhibiting_his_Prowess_in_Wrestling_at_the_Court_of_Shangul%2C_King_of_India%22%2C_Folio_from_a_Shahnama_%28Book_of_Kings%29_MET_DP215667.jpg/1920px-%22Bahram_Gur_Exhibiting_his_Prowess_in_Wrestling_at_the_Court_of_Shangul%2C_King_of_India%22%2C_Folio_from_a_Shahnama_%28Book_of_Kings%29_MET_DP215667.jpg",
      credit: "Folio from a Shahnama, Iran, c. 1300",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:%22Bahram_Gur_Exhibiting_his_Prowess_in_Wrestling_at_the_Court_of_Shangul,_King_of_India%22,_Folio_from_a_Shahnama_(Book_of_Kings)_MET_DP215667.jpg",
      license: "cc0",
    },
    source: {
      label: { en: "Sahih al-Bukhari 6477", ar: "صحيح البخاري ٦٤٧٧", tr: "Sahîh-i Buhârî 6477" },
      original: "إنَّ العَبدَ لَيَتَكَلَّمُ بالكَلِمةِ ما يَتَبَيَّنُ فيها، يَزِلُّ بها في النَّارِ أبعَدَ ممَّا بينَ المَشرِقِ",
      translation: {
        en: { text: "A servant may speak a word without weighing what is in it, and slip by it into the Fire farther than the distance to the East.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Kul, içinde ne olduğunu tartmadan bir söz söyler de onunla ateşe, doğuya olan uzaklıktan daha uzağa kayar.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "PnLqIwUv",
        takhrij: "أخرجه مسلم (2988) باختلاف يسير",
        categories: [
          { id: "7645078936fef500aeb163e90bc9eadb", name: "آداب الكلام - الصمت وقلة الكلام" },
          { id: "f8569773967232334e19784516a7b2cd", name: "آداب الكلام - حفظ اللسان" },
          { id: "e42da262b5d0d778cc886902a895f6cc", name: "آداب الكلام - فضول الكلام" },
          { id: "f1b3d23ab38e48d15c2c5e1bce494683", name: "آداب الكلام - آفات اللسان" },
          { id: "7f01d8b189", name: "إيمان - الوعيد" },
        ],
      },
    },
    en: {
      title: "I said something I cannot take back",
      summary: "On the hours after the sentence leaves your mouth, and what repair actually asks of you.",
      imageAlt: "A manuscript painting of two figures in conversation",
      body: "An apology that explains itself is still about you. The one that repairs names the harm plainly, without the paragraph that makes it understandable.",
      takeaway: "Say the sentence with no because in it. The explanation can wait for a question.",
    },
    ar: {
      title: "قلت كلمة لا أستطيع سحبها",
      summary: "عن الساعات التي تلي خروج الكلمة من فمك، وما الذي يطلبه الإصلاح حقًا.",
      imageAlt: "منمنمة تصور شخصين في حديث",
      body: "الاعتذار الذي يشرح نفسه ما زال عنك أنت. أما الذي يُصلح فيسمّي الأذى صريحًا، بلا الفقرة التي تجعله مفهومًا.",
      takeaway: "قل الجملة بلا «لأن». والشرح ينتظر سؤالًا إن جاء.",
    },
    tr: {
      title: "Geri alamayacağım bir şey söyledim",
      summary: "Cümle ağzından çıktıktan sonraki saatler ve onarımın senden gerçekte ne istediği üzerine.",
      imageAlt: "İki kişiyi sohbet hâlinde gösteren bir el yazması minyatürü",
      body: "Kendini açıklayan bir özür hâlâ seninle ilgilidir. Onaran özür ise zararı açıkça adlandırır; onu anlaşılır kılan o paragraf olmadan.",
      takeaway: "İçinde “çünkü” geçmeyen cümleyi söyle. Açıklama, sorulursa bekleyebilir.",
    },
  },
  {
    slug: "i-cannot-afford-to-be-generous",
    topic: "money",
    minutes: 2,
    publishedAt: "2026-07-06",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-07-06",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Mughal_Dynasty%2C_Sa%27di_in_a_Rose_Garden%2C_Reign_of_Emperor_Shah_Jahan%2C_early_16th_century%2C_repainted_1645.jpg",
      credit: "Sa'di in a Rose Garden, Mughal, c. 1645",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Mughal_Dynasty,_Sa%27di_in_a_Rose_Garden,_Reign_of_Emperor_Shah_Jahan,_early_16th_century,_repainted_1645.jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 1445", ar: "صحيح البخاري ١٤٤٥", tr: "Sahîh-i Buhârî 1445" },
      original: "على كُلِّ مُسلِمٍ صَدَقةٌ، فقالوا: يا نَبيَّ اللهِ، فمَن لم يَجِدْ؟ قال: يَعمَلُ بيَدِه، فيَنفَعُ نَفسَه ويَتَصَدَّقُ، قالوا: فإن لم يَجِدْ؟ قال: يُعينُ ذا الحاجةِ المَلهوفَ، قالوا: فإن لم يَجِدْ؟ قال: فليَعمَلْ بالمَعروفِ، وليُمسِكْ عَنِ الشَّرِّ؛ فإنَّها له صَدَقةٌ",
      translation: {
        en: { text: "Charity is due from every Muslim. They said: Prophet of Allah, and one who finds nothing? He said: he works with his hands, benefits himself, and gives. They said: and if he finds nothing? He said: he helps the distressed person in need. They said: and if he finds nothing? He said: then let him act with what is right and hold back from harm, for that is charity on his behalf.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Her Müslümana sadaka gerekir. Dediler ki: Ey Allah'ın Peygamberi, bulamayan ne yapsın? Eliyle çalışır, kendine fayda verir ve sadaka verir, buyurdu. Ya bulamazsa? İhtiyaç içindeki dara düşmüşe yardım eder, buyurdu. Ya yine bulamazsa? O hâlde iyilik yapsın ve kötülükten elini çeksin; bu onun için sadakadır, buyurdu.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أبو موسى الأشعري",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "Ee2PC71D",
        takhrij: "أخرجه البخاري (1445)، ومسلم (1008)",
        categories: [
          { id: "5561daf11399bb20365244e5a97002ef", name: "رقائق وزهد - ما جاء في السعي لقضاء حوائج الخلق" },
          { id: "e1fc46c7103e1504a789cbbfb6bcc942", name: "صدقة - على كل مسلم صدقة" },
          { id: "573d479b139933cf75f7c7c036120105", name: "صدقة - فضل الصدقة والحث عليها" },
          { id: "637e20f35c", name: "صدقة - الحث على المعروف وإعانة الملهوف وإغاثته" },
          { id: "24c06033df", name: "صدقة - الصدقة ليست مختصة بالإعطاء" },
        ],
      },
    },
    en: {
      title: "I want to give but I have nothing spare",
      summary: "What the sources ask of someone whose hands are genuinely empty.",
      imageAlt: "A painting of a market courtyard at midday",
      body: "The obligation scales to capacity, and it never runs out entirely. A fair word and a withheld harm are both counted, and neither costs money.",
      takeaway: "Pick the one thing you can give that is not money, and give it today.",
    },
    ar: {
      title: "أريد أن أعطي ولا فضل عندي",
      summary: "ما الذي تطلبه المصادر ممن يده فارغة حقًا.",
      imageAlt: "لوحة تصور فناء سوق في وقت الظهيرة",
      body: "التكليف على قدر الطاقة، ولا ينقطع بالكلية: الكلمة الطيبة وكفّ الأذى كلاهما محسوب، ولا يكلفان مالًا.",
      takeaway: "اختر ما تستطيع بذله مما ليس مالًا، وابذله اليوم.",
    },
    tr: {
      title: "Vermek istiyorum ama fazlam yok",
      summary: "Eli gerçekten boş olan birinden kaynakların ne istediği üzerine.",
      imageAlt: "Öğle vaktinde bir çarşı avlusunu gösteren tablo",
      body: "Yükümlülük güce göredir ve büsbütün de bitmez: güzel bir söz de, bir zararı çekmek de sayılır ve ikisi de para tutmaz.",
      takeaway: "Para olmayan, verebileceğin tek şeyi seç ve bugün ver.",
    },
  },
  {
    slug: "my-work-feels-pointless",
    topic: "work",
    minutes: 3,
    publishedAt: "2026-07-03",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-07-03",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Caravanserai_in_Afganistan_by_A.Yakovlev_%281931%29.jpg",
      credit: "Alexandre Yakovlev, Caravanserai in Afghanistan, 1931",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Caravanserai_in_Afganistan_by_A.Yakovlev_(1931).jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 56", ar: "صحيح البخاري ٥٦", tr: "Sahîh-i Buhârî 56" },
      original: "إنَّكَ لَن تُنفِقَ نَفَقةً تَبتَغي بها وجهَ اللهِ إلَّا أُجِرتَ عليها، حتَّى ما تَجعَلُ في فَمِ امرَأتِكَ",
      translation: {
        en: { text: "You will not spend anything seeking by it the face of Allah without being rewarded for it, even what you place in your wife's mouth.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Allah'ın rızasını gözeterek yaptığın hiçbir harcama yoktur ki karşılığını almayasın; eşinin ağzına koyduğun lokma bile.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "سعد بن أبي وقاص",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "Z4FoXZ7p",
        takhrij: "أخرجه النسائي في ((السنن الكبرى)) (9162) واللفظ له، والترمذي (2116)، وأحمد (1546)، وأبو يعلى (747) بلفظه مطولا.",
        categories: [
          { id: "6abe831d18176579d5d94c0a8b7c7d4e", name: "رقائق وزهد - الإخلاص" },
          { id: "ac5638aa651ff995f011b25428f55b2e", name: "نفقة - النفقة على الأهل" },
          { id: "3b314bd99d", name: "إحسان - الحث على الأعمال الصالحة" },
          { id: "4d41980852", name: "نكاح - حسن العشرة بين الأزواج" },
        ],
      },
    },
    en: {
      title: "My work feels pointless",
      summary: "On labour that pays and does not satisfy, and where meaning is actually located.",
      imageAlt: "A manuscript page showing craftsmen at work",
      body: "Meaning is rarely in the task. It is in who the wage reaches and what it spares them. That is not a consolation prize; it is where the sources put it.",
      takeaway: "Name the people your wage reaches. Keep the list somewhere you will see it on a bad week.",
    },
    ar: {
      title: "عملي بلا معنى",
      summary: "عن عمل يُدرّ ولا يُشبع، وأين يقع المعنى في الحقيقة.",
      imageAlt: "صفحة مخطوط تصور حرفيين في عملهم",
      body: "المعنى نادرًا ما يكون في المهمة نفسها، بل فيمن يصل إليه أجرك وما يكفيه عنهم. وليست هذه جائزة ترضية، بل حيث وضعته المصادر.",
      takeaway: "سمِّ من يصل إليهم أجرك. واحتفظ بالقائمة حيث تراها في أسبوع ثقيل.",
    },
    tr: {
      title: "İşim anlamsız geliyor",
      summary: "Kazandıran ama doyurmayan emek ve anlamın asıl nerede durduğu üzerine.",
      imageAlt: "Zanaatkârları iş başında gösteren bir el yazması sayfası",
      body: "Anlam nadiren işin kendisindedir. Ücretin kime ulaştığında ve onları neden koruduğundadır. Bu bir teselli ödülü değil; kaynakların onu koyduğu yerdir.",
      takeaway: "Ücretinin ulaştığı kişileri adıyla yaz. Listeyi ağır bir haftada göreceğin bir yere koy.",
    },
  },
  {
    slug: "i-avoid-someone-i-wronged",
    topic: "friendship",
    minutes: 2,
    publishedAt: "2026-06-30",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-06-30",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/5c/On_the_Calculation_of_Numbers_in_the_Science_of_Astronomy_WDL466.jpg",
      credit: "On the Calculation of Numbers in the Science of Astronomy, 18th century",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:On_the_Calculation_of_Numbers_in_the_Science_of_Astronomy_WDL466.jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 2449", ar: "صحيح البخاري ٢٤٤٩", tr: "Sahîh-i Buhârî 2449" },
      original: "مَن كانَت له مَظلِمةٌ لأخيه مِن عِرضِه أو شيءٍ فليَتَحَلَّلْه منه اليَومَ، قَبلَ أن لا يَكونَ دينارٌ ولا دِرهَمٌ، إن كان له عَمَلٌ صالِحٌ أُخِذَ منه بقدرِ مَظلِمَتِه، وإن لَم تَكُنْ له حَسَناتٌ أُخِذَ مِن سَيِّئاتِ صاحِبِه فحُمِلَ عليه",
      translation: {
        en: { text: "Whoever has wronged his brother in his honour or in anything, let him seek his pardon today, before there is neither dinar nor dirham: if he has righteous deeds, they will be taken from him in the measure of his wrong, and if he has no good deeds, some of his companion's misdeeds will be taken and laid upon him.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Kim kardeşine onuru yahut başka bir şey konusunda haksızlık etmişse, dinarın da dirhemin de bulunmayacağı gün gelmeden bugün ondan helâllik dilesin: salih ameli varsa haksızlığı ölçüsünde ondan alınır; iyilikleri yoksa arkadaşının günahlarından alınıp ona yüklenir.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "zQ6nVa8Y",
        takhrij: "أخرجه البخاري (2449)",
        categories: [
          { id: "5367fbfb369ad6a4b38df947c471d643", name: "قيامة - الحساب والقصاص" },
          { id: "d310f2a6246604c1b483b1eb64769446", name: "مظالم - التحلل من الظلم" },
          { id: "4db7a714b3a5d9f45bcc0f8b7228464e", name: "مظالم - قصاص المظالم" },
          { id: "8f3e73f4c5", name: "مظالم - التوبة ورد المظالم والحقوق" },
          { id: "1f8310865a", name: "مظالم - خطورة المظالم" },
        ],
      },
    },
    en: {
      title: "I avoid someone because I wronged them",
      summary: "On the distance that guilt builds, and why it grows the longer it is left.",
      imageAlt: "An Ottoman miniature of two riders parting at a gate",
      body: "Avoidance reads as indifference from the other side. What you experience as shame, they experience as being dropped, and the gap between those two readings widens every week.",
      takeaway: "Send four sentences: what you did, that it was yours, no reason, and one question.",
    },
    ar: {
      title: "أتجنّب من ظلمته",
      summary: "عن المسافة التي يبنيها الشعور بالذنب، ولماذا تتسع كلما تُركت.",
      imageAlt: "منمنمة عثمانية تصور فارسين يفترقان عند بوابة",
      body: "التجنّب يُقرأ من الجهة الأخرى لا مبالاةً. ما تعيشه أنت خجلًا يعيشه هو هجرًا، والفجوة بين القراءتين تتسع كل أسبوع.",
      takeaway: "أرسل أربع جمل: ما فعلت، وأنه منك، بلا عذر، وسؤال واحد.",
    },
    tr: {
      title: "Haksızlık ettiğim birinden kaçıyorum",
      summary: "Suçluluğun kurduğu mesafe ve bırakıldıkça neden büyüdüğü üzerine.",
      imageAlt: "Bir kapıda ayrılan iki atlıyı gösteren Osmanlı minyatürü",
      body: "Kaçınmak karşı taraftan ilgisizlik gibi okunur. Senin utanç olarak yaşadığını o terk edilmek olarak yaşar ve iki okuma arasındaki aralık her hafta açılır.",
      takeaway: "Dört cümle gönder: ne yaptığın, bunun sana ait olduğu, gerekçesiz, ve tek bir soru.",
    },
  },
  {
    slug: "i-am-waiting-and-nothing-changes",
    topic: "hardship",
    minutes: 3,
    publishedAt: "2026-06-27",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-06-27",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/66/Sentry_at_the_palace%2C_and_old_cannons._Bukhara_1904_%28Sergey_Prokudin-Gorsky%29.jpg",
      credit: "Sergey Prokudin-Gorsky, Sentry at the palace, Bukhara, 1904",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sentry_at_the_palace,_and_old_cannons._Bukhara_1904_(Sergey_Prokudin-Gorsky).jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 6340", ar: "صحيح البخاري ٦٣٤٠", tr: "Sahîh-i Buhârî 6340" },
      original: "يُستَجابُ لأحَدِكُم ما لم يَعجَلْ، يقولُ: دَعَوتُ فلَم يُستَجَبْ لي",
      translation: {
        en: { text: "Each of you is answered so long as he does not grow impatient, saying: I supplicated and was not answered.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Acele edip “dua ettim de kabul olunmadı” demedikçe her birinizin duasına karşılık verilir.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "IORgxcKI",
        takhrij: "أخرجه البخاري (6340)، ومسلم (2735)",
        categories: [
          { id: "8c29416e2e4192d0d00fc419af5025f3", name: "آداب الدعاء - استجابة الدعاء" },
          { id: "22e6a8d3acde4b035e1ff8afdb9d09f5", name: "آداب الدعاء - موانع إجابة الدعاء" },
          { id: "2dde95d172", name: "آداب الدعاء - الاستعجال في الدعاء والإجابة" },
          { id: "b457d3647d", name: "أدعية وأذكار - قبول الدعاء ورده" },
        ],
      },
    },
    en: {
      title: "I have been waiting a long time",
      summary: "On duas that have not been answered yet, and what waiting is understood to be doing.",
      imageAlt: "A colour photograph of a courtyard in late afternoon light",
      body: "Nothing is discarded. An answer withheld, delayed, or exchanged for something else are three different outcomes, and only one of them looks like silence from here.",
      takeaway: "Keep asking for the same thing in the same words. Repetition is not a lack of faith in it.",
    },
    ar: {
      title: "طال انتظاري",
      summary: "عن دعاء لم يُستجب بعد، وما الذي يُفهم أن الانتظار يصنعه.",
      imageAlt: "صورة ملونة لفناء في ضوء العصر",
      body: "لا شيء يُهدر. المنع والتأجيل والإبدال ثلاث نتائج مختلفة، وواحدة منها فقط تبدو من هنا صمتًا.",
      takeaway: "اسأل الشيء نفسه بالكلمات نفسها. التكرار ليس قلة يقين فيه.",
    },
    tr: {
      title: "Uzun zamandır bekliyorum",
      summary: "Henüz karşılık bulmamış dualar ve beklemenin ne yaptığının nasıl anlaşıldığı üzerine.",
      imageAlt: "İkindi ışığında bir avlunun renkli fotoğrafı",
      body: "Hiçbir şey boşa gitmez. Verilmemek, ertelenmek ve başka bir şeyle değiştirilmek üç ayrı sonuçtur ve buradan yalnızca biri sessizlik gibi görünür.",
      takeaway: "Aynı şeyi aynı sözlerle istemeye devam et. Tekrar, ona olan inancın azlığı değildir.",
    },
  },
  {
    slug: "i-am-carrying-my-family-alone",
    topic: "family",
    minutes: 3,
    publishedAt: "2026-06-24",
    reviewedBy: "UNVERIFIED",
    reviewedAt: "2026-06-24",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Royal_attendants_of_Babur_and_Humayun%2C_going_to_see_the_Rhinoceros.jpg",
      credit: "Royal attendants of Babur and Humayun, Mughal",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Royal_attendants_of_Babur_and_Humayun,_going_to_see_the_Rhinoceros.jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 5353", ar: "صحيح البخاري ٥٣٥٣", tr: "Sahîh-i Buhârî 5353" },
      original: "السَّاعي على الأرمَلةِ والمِسكينِ كالمُجاهِدِ في سَبيلِ اللهِ، أوِ القائِمِ اللَّيلَ الصَّائِمِ النَّهارَ",
      translation: {
        en: { text: "The one who strives on behalf of the widow and the poor is like the one who strives in the way of Allah, or like one who stands the night in prayer and fasts the day.", translator: "Uswah draft, awaiting review" },
        tr: { text: "Dul ve yoksulun geçimi için koşturan, Allah yolunda cihad eden gibidir; yahut geceleri namaz kılıp gündüzleri oruç tutan gibidir.", translator: "Uswah taslağı, inceleme bekliyor" },
      },
      dorar: {
        rawi: "أبو هريرة",
        mohdith: "البخاري",
        grade: "[صحيح]",
        id: "zUAzY7VI",
        takhrij: "أخرجه البخاري (5353 )، ومسلم (2982)",
        categories: [
          { id: "b00e56204fae62c94262e7ec088b3883", name: "جهاد - فضل الجهاد" },
          { id: "5561daf11399bb20365244e5a97002ef", name: "رقائق وزهد - ما جاء في السعي لقضاء حوائج الخلق" },
          { id: "db563e905b9f0b25516e31671b1b419e", name: "صيام - فضل الصيام" },
          { id: "722d6454bf", name: "بر وصلة - السعي على الأرملة والمسكين" },
        ],
      },
    },
    en: {
      title: "I am carrying my family alone",
      summary: "On being the one everyone leans on, and what happens when nobody asks how you are.",
      imageAlt: "A Mughal painting of a household gathered in a courtyard",
      body: "Being depended on is not the same as being cared for, and the difference is invisible from outside because the work gets done either way.",
      takeaway: "Tell one person in the family one true thing about how you are. Do not soften it.",
    },
    ar: {
      title: "أحمل أهلي وحدي",
      summary: "عن أن تكون من يتّكئ عليه الجميع، وما يحدث حين لا يسأل أحد عن حالك.",
      imageAlt: "منمنمة مغولية تصور أهل بيت مجتمعين في فناء",
      body: "أن يُعتمد عليك ليس كأن يُعتنى بك، والفرق لا يُرى من الخارج لأن العمل يُنجز في الحالين.",
      takeaway: "قل لواحد من أهلك شيئًا صادقًا عن حالك. ولا تُلطّفه.",
    },
    tr: {
      title: "Ailemi tek başıma taşıyorum",
      summary: "Herkesin yaslandığı kişi olmak ve kimse hâlini sormadığında ne olduğu üzerine.",
      imageAlt: "Bir avluda toplanmış haneyi gösteren Babürlü minyatür",
      body: "Kendisine güvenilmek, gözetilmekle aynı şey değildir; fark dışarıdan görünmez, çünkü iş her hâlükârda yapılır.",
      takeaway: "Ailenden bir kişiye hâlin hakkında doğru bir şey söyle. Yumuşatma.",
    },
  },
];
