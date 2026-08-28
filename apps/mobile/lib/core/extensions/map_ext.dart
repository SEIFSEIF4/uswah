/// `{en: ..., ar: ..., tr: ...}` strings, the shape every localized field takes.
typedef LocalizedText = Map<String, String>;

extension LocalizedTextExt on LocalizedText {
  String of(String lang) => this[lang] ?? this['en'] ?? values.first;
}
