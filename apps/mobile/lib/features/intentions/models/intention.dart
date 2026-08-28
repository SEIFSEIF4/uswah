import 'package:freezed_annotation/freezed_annotation.dart';

import '../../../core/extensions/map_ext.dart';
import '../../sources/models/content_source.dart';

part 'intention.freezed.dart';
part 'intention.g.dart';

/// Taxonomy order is display order.
enum ActGroup {
  worship,
  body,
  daily,
  order,
  travel,
  occasions,
  people,
  service,
  self,
  learning,
  knowledge,
  craft,
  stewardship,
}

@freezed
abstract class Intention with _$Intention {
  const Intention._();

  const factory Intention({
    required String id,
    required String slug,
    required ActGroup group,

    /// The ordinary act, before any reframing.
    required LocalizedText act,
    required ContentSource source,
    required IntentionText en,
    required IntentionText ar,
    required IntentionText tr,
  }) = _Intention;

  factory Intention.fromJson(Map<String, dynamic> json) =>
      _$IntentionFromJson(json);

  IntentionText text(String lang) => switch (lang) {
    'ar' => ar,
    'tr' => tr,
    _ => en,
  };
}

@freezed
abstract class IntentionText with _$IntentionText {
  const factory IntentionText({
    required String intention,
    required String note,
  }) = _IntentionText;

  factory IntentionText.fromJson(Map<String, dynamic> json) =>
      _$IntentionTextFromJson(json);
}
