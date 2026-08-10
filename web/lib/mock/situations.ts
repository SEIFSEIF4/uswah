/**
 * SAMPLE DATA — for judging layout and typography only.
 *
 * Titles, summaries and commentary here are written to be realistic in length and tone.
 * The scripture blocks are NOT: every entry except `asked-for-money-again` carries a
 * placeholder that says so in both languages, because inventing a hadith to fill a
 * layout is the one thing this project must never do — not even in a mock.
 *
 * Images are real, public domain, and passed the title screen. They are attached to
 * situations for visual plausibility, not because anyone has decided they belong there.
 *
 * Replace this file with the database once the dashboard exists; `lib/content.ts` is the
 * only thing that reads it.
 */

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
  feature?: "hero" | "band";
  image: { url: string; credit: string; sourceUrl: string; license: string };
  source: {
    label: { en: string; ar: string };
    original: string;
    translation?: { text: string; translator: string };
    placeholder?: boolean;
  };
  en: LocaleText;
  ar: LocaleText;
};

export type TopicSlug =
  | "money"
  | "work"
  | "family"
  | "self"
  | "friendship"
  | "hardship";

export const TOPICS: { slug: TopicSlug; en: string; ar: string }[] = [
  { slug: "money", en: "Money", ar: "المال" },
  { slug: "work", en: "Work", ar: "العمل" },
  { slug: "family", en: "Family", ar: "الأهل" },
  { slug: "self", en: "Yourself", ar: "النفس" },
  { slug: "friendship", en: "People", ar: "الناس" },
  { slug: "hardship", en: "Hardship", ar: "الشدّة" },
];

/** Stands in for a verified source. Visible as sample data in both languages. */
const PLACEHOLDER = {
  label: { en: "Sample data — no source attached", ar: "بيانات تجريبية — بلا مصدر" },
  original: "﴿ نص المصدر يوضع هنا بعد التحقق منه ﴾",
  translation: {
    text: "The verified source text goes here. This entry has none, on purpose.",
    translator: "—",
  },
  placeholder: true,
};

export const SITUATIONS: Situation[] = [
  {
    slug: "asked-for-money-again",
    topic: "money",
    minutes: 2,
    feature: "hero",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Richard_Dadd_-_Caravanserai_at_Mylasa_in_Asia_Minor_-_Google_Art_Project.jpg/1920px-Richard_Dadd_-_Caravanserai_at_Mylasa_in_Asia_Minor_-_Google_Art_Project.jpg",
      credit: "Richard Dadd, Caravanserai at Mylasa in Asia Minor, 1845",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Richard_Dadd_-_Caravanserai_at_Mylasa_in_Asia_Minor_-_Google_Art_Project.jpg",
      license: "public-domain",
    },
    source: {
      label: { en: "Sahih al-Bukhari 1471", ar: "صحيح البخاري ١٤٧١" },
      original:
        "لأَنْ يَأْخُذَ أَحَدُكُمْ حَبْلَهُ فَيَأْتِيَ بِحُزْمَةِ الْحَطَبِ عَلَى ظَهْرِهِ فَيَبِيعَهَا فَيَكُفَّ اللَّهُ بِهَا وَجْهَهُ، خَيْرٌ لَهُ مِنْ أَنْ يَسْأَلَ النَّاسَ، أَعْطَوْهُ أَوْ مَنَعُوهُ",
      translation: {
        text: "For one of you to take his rope and bring a bundle of firewood on his back and sell it, so that Allah preserves his dignity by it, is better for him than begging from people, whether they give him or refuse him.",
        translator: "Muhsin Khan",
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
  },
  {
    slug: "my-boss-wronged-me",
    topic: "work",
    minutes: 3,
    feature: "band",
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/%22Bahram_Gur_Exhibiting_his_Prowess_in_Wrestling_at_the_Court_of_Shangul%2C_King_of_India%22%2C_Folio_from_a_Shahnama_%28Book_of_Kings%29_MET_DP215667.jpg/1920px-%22Bahram_Gur_Exhibiting_his_Prowess_in_Wrestling_at_the_Court_of_Shangul%2C_King_of_India%22%2C_Folio_from_a_Shahnama_%28Book_of_Kings%29_MET_DP215667.jpg",
      credit: "Folio from a Shahnama, Iran, c. 1300",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:%22Bahram_Gur_Exhibiting_his_Prowess_in_Wrestling_at_the_Court_of_Shangul,_King_of_India%22,_Folio_from_a_Shahnama_(Book_of_Kings)_MET_DP215667.jpg",
      license: "cc0",
    },
    source: PLACEHOLDER,
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
  },
  {
    slug: "i-cannot-stop-being-angry",
    topic: "self",
    minutes: 2,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Brooklyn_Museum_-_Arjasp%27s_Horsemen_Killing_Luhrasp_from_the_%22Second_Small_Shahnameh%22_of_Firdausi.jpg",
      credit: "Folio from the Second Small Shahnama of Firdausi, c. 1298–1302",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_-_Arjasp%27s_Horsemen_Killing_Luhrasp_from_the_%22Second_Small_Shahnameh%22_of_Firdausi.jpg",
      license: "public-domain",
    },
    source: PLACEHOLDER,
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
  },
  {
    slug: "my-parents-ask-too-much",
    topic: "family",
    minutes: 3,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Mughal_Dynasty%2C_Sa%27di_in_a_Rose_Garden%2C_Reign_of_Emperor_Shah_Jahan%2C_early_16th_century%2C_repainted_1645.jpg",
      credit: "Sa'di in a Rose Garden, Mughal, c. 1645",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Mughal_Dynasty,_Sa%27di_in_a_Rose_Garden,_Reign_of_Emperor_Shah_Jahan,_early_16th_century,_repainted_1645.jpg",
      license: "public-domain",
    },
    source: PLACEHOLDER,
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
  },
  {
    slug: "a-friend-let-me-down",
    topic: "friendship",
    minutes: 2,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Ertugrul_Gazi_sends_his_son_Savci_Bey_to_the_Sultan_Alaeddin_Keykubad_with_the_request_to_be_allowed_to_populate_a_new_area.._Miniature%2C_Turkish%2C_1616._Tadj_al-Tawarikh_%28The_Crown_of_Chronicles%29.jpg/1920px-thumbnail.jpg",
      credit: "Miniature from the Tāj al-Tawārīkh, Ottoman, 1616",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Ertugrul_Gazi_sends_his_son_Savci_Bey_to_the_Sultan_Alaeddin_Keykubad_with_the_request_to_be_allowed_to_populate_a_new_area.._Miniature,_Turkish,_1616._Tadj_al-Tawarikh_(The_Crown_of_Chronicles).jpg",
      license: "public-domain",
    },
    source: PLACEHOLDER,
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
  },
  {
    slug: "i-am-in-debt",
    topic: "money",
    minutes: 3,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Caravanserai_in_Afganistan_by_A.Yakovlev_%281931%29.jpg",
      credit: "Alexandre Yakovlev, Caravanserai in Afghanistan, 1931",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Caravanserai_in_Afganistan_by_A.Yakovlev_(1931).jpg",
      license: "public-domain",
    },
    source: PLACEHOLDER,
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
  },
  {
    slug: "i-was-passed-over",
    topic: "work",
    minutes: 2,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/%22Luhrasp_Hears_from_the_Returning_Paladins_of_the_Vanishing_Kai_Khusrau%22%2C_Folio_from_a_Shahnama_%28Book_of_Kings%29_of_Firdausi_MET_DP215765.jpg/1920px-%22Luhrasp_Hears_from_the_Returning_Paladins_of_the_Vanishing_Kai_Khusrau%22%2C_Folio_from_a_Shahnama_%28Book_of_Kings%29_of_Firdausi_MET_DP215765.jpg",
      credit: "Folio from a Shahnama of Firdausi, Iran, 1576–77",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:%22Luhrasp_Hears_from_the_Returning_Paladins_of_the_Vanishing_Kai_Khusrau%22,_Folio_from_a_Shahnama_(Book_of_Kings)_of_Firdausi_MET_DP215765.jpg",
      license: "cc0",
    },
    source: PLACEHOLDER,
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
  },
  {
    slug: "i-keep-putting-it-off",
    topic: "self",
    minutes: 2,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/5c/On_the_Calculation_of_Numbers_in_the_Science_of_Astronomy_WDL466.jpg",
      credit: "On the Calculation of Numbers in the Science of Astronomy, 18th century",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:On_the_Calculation_of_Numbers_in_the_Science_of_Astronomy_WDL466.jpg",
      license: "public-domain",
    },
    source: PLACEHOLDER,
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
  },
  {
    slug: "someone-spoke-badly-of-me",
    topic: "friendship",
    minutes: 2,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Prince_and_Ladies_in_a_Garden%2C_mid-18th_century%3B_Mughal.jpg",
      credit: "Prince and Ladies in a Garden, Mughal, mid-18th century",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Prince_and_Ladies_in_a_Garden,_mid-18th_century;_Mughal.jpg",
      license: "public-domain",
    },
    source: PLACEHOLDER,
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
  },
  {
    slug: "i-lost-someone",
    topic: "hardship",
    minutes: 3,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/66/Sentry_at_the_palace%2C_and_old_cannons._Bukhara_1904_%28Sergey_Prokudin-Gorsky%29.jpg",
      credit: "Sergey Prokudin-Gorsky, Sentry at the palace, Bukhara, 1904",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sentry_at_the_palace,_and_old_cannons._Bukhara_1904_(Sergey_Prokudin-Gorsky).jpg",
      license: "public-domain",
    },
    source: PLACEHOLDER,
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
  },
  {
    slug: "i-cannot-forgive-myself",
    topic: "self",
    minutes: 2,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Wall_painting_of_partridges_and_hoopoes_in_a_landscape_from_Knossos_%28Caravanserai%29_-_Heraklion_AM.jpg/1920px-Wall_painting_of_partridges_and_hoopoes_in_a_landscape_from_Knossos_%28Caravanserai%29_-_Heraklion_AM.jpg",
      credit: "Wall painting of partridges and hoopoes, Knossos",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Wall_painting_of_partridges_and_hoopoes_in_a_landscape_from_Knossos_(Caravanserai)_-_Heraklion_AM.jpg",
      license: "cc-by-sa-4.0",
    },
    source: PLACEHOLDER,
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
  },
  {
    slug: "i-am-far-from-home",
    topic: "hardship",
    minutes: 2,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Royal_attendants_of_Babur_and_Humayun%2C_going_to_see_the_Rhinoceros.jpg",
      credit: "Royal attendants of Babur and Humayun, Mughal",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Royal_attendants_of_Babur_and_Humayun,_going_to_see_the_Rhinoceros.jpg",
      license: "public-domain",
    },
    source: PLACEHOLDER,
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
  },
];
