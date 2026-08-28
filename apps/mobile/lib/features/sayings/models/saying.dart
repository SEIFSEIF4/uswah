import 'package:freezed_annotation/freezed_annotation.dart';

import '../../sources/models/content_source.dart';

part 'saying.freezed.dart';
part 'saying.g.dart';

/// Strongest evidence first, so a directory opens on its best case.
enum Grade {
  quran(storable: true),
  sahih(storable: true),
  hasan(storable: false),
  historical(storable: false),
  disputed(storable: false);

  const Grade({required this.storable});

  /// Below the publishing threshold until a scholarly reviewer joins.
  final bool storable;
}

@freezed
abstract class Saying with _$Saying {
  const Saying._();

  const factory Saying({
    required String id,
    required String slug,

    /// The saying people already know, in the language it circulates in.
    required String saying,
    required Grade grade,

    /// Which situation this belongs with, when one exists.
    String? situationSlug,
    required ContentSource source,
    required SayingText en,
    required SayingText ar,
    required SayingText tr,
  }) = _Saying;

  factory Saying.fromJson(Map<String, dynamic> json) => _$SayingFromJson(json);

  SayingText text(String lang) => switch (lang) {
    'ar' => ar,
    'tr' => tr,
    _ => en,
  };

  /// The native equivalent that locale knows, falling back to the canonical form.
  String sayingFor(String lang) => text(lang).saying ?? saying;
}

@freezed
abstract class SayingText with _$SayingText {
  const factory SayingText({
    /// Native equivalent aphorism, not a translation; absent means the canonical form.
    String? saying,
    required String angle,
    required String closeness,
  }) = _SayingText;

  factory SayingText.fromJson(Map<String, dynamic> json) =>
      _$SayingTextFromJson(json);
}
