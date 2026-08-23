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
 * Transliterations for the apparatus on non-Arabic pages: the names in the
 * cited records form a small closed set, so English and Turkish readers get
 * them in their own conventions. A name not listed falls back to its Arabic
 * form, so new citations degrade rather than break.
 */
export const APPARATUS_NAMES: Record<string, { en: string; tr: string }> = {
  "الزبير بن العوام": { en: "al-Zubayr ibn al-Awwam", tr: "Zübeyr b. Avvâm" },
  "عمر بن الخطاب": { en: "Umar ibn al-Khattab", tr: "Ömer b. Hattâb" },
  "أنس بن مالك": { en: "Anas ibn Malik", tr: "Enes b. Mâlik" },
  "أبو موسى الأشعري": { en: "Abu Musa al-Ash'ari", tr: "Ebû Mûsâ el-Eş'arî" },
  "جابر بن عبدالله": { en: "Jabir ibn Abdullah", tr: "Câbir b. Abdullah" },
  "عبدالله بن عباس": { en: "Abdullah ibn Abbas", tr: "Abdullah b. Abbâs" },
  "أبو هريرة": { en: "Abu Hurayra", tr: "Ebû Hüreyre" },
  "عائشة أم المؤمنين": { en: "Aisha, Mother of the Believers", tr: "Hz. Âişe" },
  "عبدالله بن مسعود": { en: "Abdullah ibn Mas'ud", tr: "Abdullah b. Mes'ûd" },
  "المقدام بن معدي كرب": { en: "al-Miqdam ibn Ma'di Karib", tr: "Mikdâm b. Ma'dîkerib" },
  "عبدالله بن عمر": { en: "Abdullah ibn Umar", tr: "Abdullah b. Ömer" },
  "عبدالله بن عمرو": { en: "Abdullah ibn Amr", tr: "Abdullah b. Amr" },
  "سعد بن أبي وقاص": { en: "Sa'd ibn Abi Waqqas", tr: "Sa'd b. Ebî Vakkâs" },
  "معاوية بن أبي سفيان": { en: "Mu'awiya ibn Abi Sufyan", tr: "Muâviye b. Ebî Süfyân" },
  "سهل بن سعد الساعدي": { en: "Sahl ibn Sa'd al-Sa'idi", tr: "Sehl b. Sa'd es-Sâidî" },
  "ثوبان مولى رسول الله صلى الله عليه وسلم": { en: "Thawban, freedman of the Prophet ﷺ", tr: "Sevbân (r.a.)" },
  "البخاري": { en: "al-Bukhari", tr: "Buhârî" },
  "مسلم": { en: "Muslim", tr: "Müslim" },
  "الألباني": { en: "al-Albani", tr: "Elbânî" },
};

/** Same idea for the grade strings a reader actually sees (collection gradings are hidden). */
export const APPARATUS_GRADES: Record<string, { en: string; tr: string }> = {
  "صحيح": { en: "sahih", tr: "sahih" },
  "حسن": { en: "hasan", tr: "hasen" },
  "إسناده صحيح": { en: "its chain is sahih", tr: "isnadı sahih" },
};

/**
 * Dorar's مصادر الأحاديث record per collection, copied verbatim from the popup
 * their المصدر field opens (fetched 2026-08-22 from dorar.net/h/TlhsVKy7 and
 * /h/Y0ncQmYf). `no` is their row number in that library.
 */
export const BOOK_RECORDS: Record<
  BookKey,
  {
    name: { en: string; ar: string; tr: string };
    no: string;
    title: { en: string; ar: string; tr: string };
    author: { en: string; ar: string; tr: string };
    editor: { en: string; ar: string; tr: string };
    publisher: { en: string; ar: string; tr: string };
    edition: { en: string; ar: string; tr: string };
    year: { en: string; ar: string; tr: string };
  }
> = {
  bukhari: {
    name: { en: "Sahih al-Bukhari", ar: "صحيح البخاري", tr: "Sahîh-i Buhârî" },
    no: "6216",
    title: {
      en: "The Authentic Musnad Collection of the Prophetic Hadith, Sunnah and History",
      ar: "الجامع الصحيح المسند من حديث رسول الله وسننه وأيامه",
      tr: "Resûlullah'ın Hadisleri, Sünneti ve Günleri Hakkındaki el-Câmiu's-Sahîh el-Müsned",
    },
    author: { en: "Muhammad ibn Isma'il al-Bukhari", ar: "محمد بن إسماعيل البخاري", tr: "Muhammed b. İsmâil el-Buhârî" },
    editor: { en: "Muhibb al-Din al-Khatib", ar: "محب الدين الخطيب", tr: "Muhibbüddin el-Hatîb" },
    publisher: { en: "The Salafiyyah Library — Cairo", ar: "المكتبة السلفية - القاهرة", tr: "Selefiyye Kütüphanesi — Kahire" },
    edition: { en: "First edition", ar: "الأولى", tr: "Birinci baskı" },
    year: { en: "1400 AH", ar: "1400هـ", tr: "1400 H." },
  },
  muslim: {
    name: { en: "Sahih Muslim", ar: "صحيح مسلم", tr: "Sahîh-i Müslim" },
    no: "3088",
    title: {
      en: "Sahih Muslim (The Abridged Authentic Musnad Collection Transmitted by Reliable Narrators from the Messenger of Allah ﷺ)",
      ar: "صحيح مسلم (المسند الصحيح المختصر من السنن بنقل العدل عن العدل عن رسول الله صلى الله عليه وسلم)",
      tr: "Sahîh-i Müslim (Adil ravilerin Resûlullah ﷺ'den naklettiği muhtasar sahih hadisler)",
    },
    author: { en: "Muslim ibn al-Hajjaj al-Qushayri al-Naysaburi", ar: "مسلم بن الحجاج القشيري النيسابوري", tr: "Müslim b. Haccâc el-Kuşeyrî en-Nîsâbûrî" },
    editor: { en: "Muhammad Fu'ad 'Abd al-Baqi", ar: "محمد فؤاد عبدالباقي", tr: "Muhammed Fuâd Abdülbâkî" },
    publisher: { en: "Dar Ihya al-Kutub al-'Arabiyyah — Isa al-Babi al-Halabi and Partners", ar: "دار إحياء الكتب العربية - عيسى البابي الحلبي وشركاه", tr: "Dâr İhyâi'l-Kütübi'l-Arabiyye — Îsâ el-Bâbî el-Halebî ve Ortakları" },
    edition: { en: "First edition", ar: "الأولى", tr: "Birinci baskı" },
    year: { en: "1374 AH", ar: "1374هـ", tr: "1374 H." },
  },
};
