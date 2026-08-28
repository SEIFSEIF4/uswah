/// Transliterations for the apparatus on non-Arabic pages. A name not listed
/// falls back to its Arabic form, so new citations degrade rather than break.
abstract final class DorarNames {
  static const names = <String, Map<String, String>>{
    'الزبير بن العوام': {
      'en': 'al-Zubayr ibn al-Awwam',
      'tr': 'Zübeyr b. Avvâm',
    },
    'عمر بن الخطاب': {'en': 'Umar ibn al-Khattab', 'tr': 'Ömer b. Hattâb'},
    'أنس بن مالك': {'en': 'Anas ibn Malik', 'tr': 'Enes b. Mâlik'},
    'أبو موسى الأشعري': {
      'en': "Abu Musa al-Ash'ari",
      'tr': "Ebû Mûsâ el-Eş'arî",
    },
    'جابر بن عبدالله': {'en': 'Jabir ibn Abdullah', 'tr': 'Câbir b. Abdullah'},
    'عبدالله بن عباس': {'en': 'Abdullah ibn Abbas', 'tr': 'Abdullah b. Abbâs'},
    'أبو هريرة': {'en': 'Abu Hurayra', 'tr': 'Ebû Hüreyre'},
    'عائشة أم المؤمنين': {
      'en': 'Aisha, Mother of the Believers',
      'tr': 'Hz. Âişe',
    },
    'عبدالله بن مسعود': {
      'en': "Abdullah ibn Mas'ud",
      'tr': "Abdullah b. Mes'ûd",
    },
    'المقدام بن معدي كرب': {
      'en': "al-Miqdam ibn Ma'di Karib",
      'tr': "Mikdâm b. Ma'dîkerib",
    },
    'عبدالله بن عمر': {'en': 'Abdullah ibn Umar', 'tr': 'Abdullah b. Ömer'},
    'عبدالله بن عمرو': {'en': 'Abdullah ibn Amr', 'tr': 'Abdullah b. Amr'},
    'سعد بن أبي وقاص': {
      'en': "Sa'd ibn Abi Waqqas",
      'tr': "Sa'd b. Ebî Vakkâs",
    },
    'معاوية بن أبي سفيان': {
      'en': "Mu'awiya ibn Abi Sufyan",
      'tr': 'Muâviye b. Ebî Süfyân',
    },
    'سهل بن سعد الساعدي': {
      'en': "Sahl ibn Sa'd al-Sa'idi",
      'tr': "Sehl b. Sa'd es-Sâidî",
    },
    'ثوبان مولى رسول الله صلى الله عليه وسلم': {
      'en': 'Thawban, freedman of the Prophet ﷺ',
      'tr': 'Sevbân (r.a.)',
    },
    'البخاري': {'en': 'al-Bukhari', 'tr': 'Buhârî'},
    'مسلم': {'en': 'Muslim', 'tr': 'Müslim'},
    'الألباني': {'en': 'al-Albani', 'tr': 'Elbânî'},
  };

  static const grades = <String, Map<String, String>>{
    'صحيح': {'en': 'sahih', 'tr': 'sahih'},
    'حسن': {'en': 'hasan', 'tr': 'hasen'},
    'إسناده صحيح': {'en': 'its chain is sahih', 'tr': 'isnadı sahih'},
  };

  static String name(String ar, String lang) =>
      lang == 'ar' ? ar : names[ar]?[lang] ?? ar;
  static String grade(String ar, String lang) =>
      lang == 'ar' ? ar : grades[ar]?[lang] ?? ar;
}

/// Dorar's مصادر الأحاديث record per collection, copied verbatim.
class BookRecord {
  const BookRecord({
    required this.name,
    required this.no,
    required this.title,
    required this.author,
    required this.editor,
    required this.publisher,
    required this.edition,
    required this.year,
  });

  final Map<String, String> name;
  final String no;
  final Map<String, String> title;
  final Map<String, String> author;
  final Map<String, String> editor;
  final Map<String, String> publisher;
  final Map<String, String> edition;
  final Map<String, String> year;

  static const bukhari = BookRecord(
    name: {
      'en': 'Sahih al-Bukhari',
      'ar': 'صحيح البخاري',
      'tr': 'Sahîh-i Buhârî',
    },
    no: '6216',
    title: {
      'en':
          'The Authentic Musnad Collection of the Prophetic Hadith, Sunnah and History',
      'ar': 'الجامع الصحيح المسند من حديث رسول الله وسننه وأيامه',
      'tr':
          "Resûlullah'ın Hadisleri, Sünneti ve Günleri Hakkındaki el-Câmiu's-Sahîh el-Müsned",
    },
    author: {
      'en': "Muhammad ibn Isma'il al-Bukhari",
      'ar': 'محمد بن إسماعيل البخاري',
      'tr': 'Muhammed b. İsmâil el-Buhârî',
    },
    editor: {
      'en': 'Muhibb al-Din al-Khatib',
      'ar': 'محب الدين الخطيب',
      'tr': 'Muhibbüddin el-Hatîb',
    },
    publisher: {
      'en': 'The Salafiyyah Library, Cairo',
      'ar': 'المكتبة السلفية - القاهرة',
      'tr': 'Selefiyye Kütüphanesi, Kahire',
    },
    edition: {'en': 'First edition', 'ar': 'الأولى', 'tr': 'Birinci baskı'},
    year: {'en': '1400 AH', 'ar': '1400هـ', 'tr': '1400 H.'},
  );

  static const muslim = BookRecord(
    name: {'en': 'Sahih Muslim', 'ar': 'صحيح مسلم', 'tr': 'Sahîh-i Müslim'},
    no: '3088',
    title: {
      'en':
          'Sahih Muslim (The Abridged Authentic Musnad Collection Transmitted by Reliable Narrators from the Messenger of Allah ﷺ)',
      'ar':
          'صحيح مسلم (المسند الصحيح المختصر من السنن بنقل العدل عن العدل عن رسول الله صلى الله عليه وسلم)',
      'tr':
          "Sahîh-i Müslim (Adil ravilerin Resûlullah ﷺ'den naklettiği muhtasar sahih hadisler)",
    },
    author: {
      'en': 'Muslim ibn al-Hajjaj al-Qushayri al-Naysaburi',
      'ar': 'مسلم بن الحجاج القشيري النيسابوري',
      'tr': 'Müslim b. Haccâc el-Kuşeyrî en-Nîsâbûrî',
    },
    editor: {
      'en': "Muhammad Fu'ad 'Abd al-Baqi",
      'ar': 'محمد فؤاد عبدالباقي',
      'tr': 'Muhammed Fuâd Abdülbâkî',
    },
    publisher: {
      'en':
          "Dar Ihya al-Kutub al-'Arabiyyah, Isa al-Babi al-Halabi and Partners",
      'ar': 'دار إحياء الكتب العربية - عيسى البابي الحلبي وشركاه',
      'tr': "Dâr İhyâi'l-Kütübi'l-Arabiyye, Îsâ el-Bâbî el-Halebî ve Ortakları",
    },
    edition: {'en': 'First edition', 'ar': 'الأولى', 'tr': 'Birinci baskı'},
    year: {'en': '1374 AH', 'ar': '1374هـ', 'tr': '1374 H.'},
  );
}
