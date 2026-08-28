import 'package:freezed_annotation/freezed_annotation.dart';

import '../../sources/models/content_source.dart';

part 'situation.freezed.dart';
part 'situation.g.dart';

enum Topic { money, work, family, self, friendship, hardship }

@freezed
abstract class Situation with _$Situation {
  const Situation._();

  const factory Situation({
    required String id,
    required String slug,
    required Topic topic,
    required int minutes,
    required DateTime publishedAt,
    required String reviewedBy,
    required DateTime reviewedAt,

    /// 'hero' | 'band' | null
    String? feature,
    required SituationImage image,
    required ContentSource source,
    required LocaleText en,
    required LocaleText ar,
    required LocaleText tr,
  }) = _Situation;

  factory Situation.fromJson(Map<String, dynamic> json) =>
      _$SituationFromJson(json);

  LocaleText text(String lang) => switch (lang) {
    'ar' => ar,
    'tr' => tr,
    _ => en,
  };

  bool get unverified => reviewedBy == 'UNVERIFIED';

  /// The house's own paintings carry no caption.
  bool get creditsArtwork => !image.credit.startsWith('Uswah studio');
}

@freezed
abstract class LocaleText with _$LocaleText {
  const factory LocaleText({
    required String title,
    required String summary,
    @Default('') String imageAlt,
    required String body,
    required String takeaway,
  }) = _LocaleText;

  factory LocaleText.fromJson(Map<String, dynamic> json) =>
      _$LocaleTextFromJson(json);
}

@freezed
abstract class SituationImage with _$SituationImage {
  const factory SituationImage({
    required String url,
    @Default('') String credit,
    @Default('') String sourceUrl,
    @Default('') String license,
  }) = _SituationImage;

  factory SituationImage.fromJson(Map<String, dynamic> json) =>
      _$SituationImageFromJson(json);
}
