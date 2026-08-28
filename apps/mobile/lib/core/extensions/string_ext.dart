extension StringExt on String {
  static final _arabic = RegExp(r'[؀-ۿ]');
  static final _harakat = RegExp(r'[ً-ْٰ]');

  // Dart has no Unicode normalisation; the accented letters that reach us are the
  // Turkish transliteration set, so a lookup does what NFD + strip marks did on the web.
  static const _accents = {
    'â': 'a',
    'à': 'a',
    'á': 'a',
    'ä': 'a',
    'ã': 'a',
    'ê': 'e',
    'è': 'e',
    'é': 'e',
    'ë': 'e',
    'î': 'i',
    'ì': 'i',
    'í': 'i',
    'ï': 'i',
    'ı': 'i',
    'ô': 'o',
    'ò': 'o',
    'ó': 'o',
    'ö': 'o',
    'õ': 'o',
    'û': 'u',
    'ù': 'u',
    'ú': 'u',
    'ü': 'u',
    'ç': 'c',
    'ğ': 'g',
    'ş': 's',
    'ñ': 'n',
  };

  bool get isArabicScript => _arabic.hasMatch(this);

  /// 0-9 → ٠-٩, the way the web labels Arabic refs.
  String get arabicDigits =>
      replaceAllMapped(RegExp('[0-9]'), (m) => '٠١٢٣٤٥٦٧٨٩'[int.parse(m[0]!)]);

  /// Diacritic-insensitive, lowercase: "Sahîh" matches "sahih".
  String get stripMarks => toLowerCase()
      .replaceAll(_harakat, '')
      .split('')
      .map((c) => _accents[c] ?? c)
      .join();

  /// Length without harakat, for sizing Arabic text.
  int get lengthWithoutHarakat => replaceAll(_harakat, '').length;
}
