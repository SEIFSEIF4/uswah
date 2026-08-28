import 'package:freezed_annotation/freezed_annotation.dart';

import '../../../core/extensions/map_ext.dart';
import 'dorar_ref.dart';

part 'content_source.freezed.dart';
part 'content_source.g.dart';

enum BookKey { bukhari, muslim }

/// The cited text behind a situation, saying or intention.
@freezed
abstract class ContentSource with _$ContentSource {
  const ContentSource._();

  const factory ContentSource({
    /// "Quran 2:286" / "صحيح البخاري ١٤٧١", per locale.
    required LocalizedText label,
    BookKey? collection,
    String? original,

    /// House-draft translations, keyed by locale, with the credit that says so.
    @Default({}) Map<String, SourceTranslation> translation,
    DorarRef? dorar,
  }) = _ContentSource;

  factory ContentSource.fromJson(Map<String, dynamic> json) =>
      _$ContentSourceFromJson(json);

  /// Sayings have no collection column; the English label's prefix names it.
  BookKey? get bookFromLabel {
    final en = label['en'] ?? '';
    if (en.startsWith('Sahih al-Bukhari')) return BookKey.bukhari;
    if (en.startsWith('Sahih Muslim')) return BookKey.muslim;
    return collection;
  }
}

@freezed
abstract class SourceTranslation with _$SourceTranslation {
  const factory SourceTranslation({
    required String text,
    required String translator,
  }) = _SourceTranslation;

  factory SourceTranslation.fromJson(Map<String, dynamic> json) =>
      _$SourceTranslationFromJson(json);
}
