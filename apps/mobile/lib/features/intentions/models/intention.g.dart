// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'intention.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Intention _$IntentionFromJson(Map<String, dynamic> json) => _Intention(
  id: json['id'] as String,
  slug: json['slug'] as String,
  group: $enumDecode(_$ActGroupEnumMap, json['group']),
  act: Map<String, String>.from(json['act'] as Map),
  source: ContentSource.fromJson(json['source'] as Map<String, dynamic>),
  en: IntentionText.fromJson(json['en'] as Map<String, dynamic>),
  ar: IntentionText.fromJson(json['ar'] as Map<String, dynamic>),
  tr: IntentionText.fromJson(json['tr'] as Map<String, dynamic>),
);

Map<String, dynamic> _$IntentionToJson(_Intention instance) =>
    <String, dynamic>{
      'id': instance.id,
      'slug': instance.slug,
      'group': _$ActGroupEnumMap[instance.group]!,
      'act': instance.act,
      'source': instance.source,
      'en': instance.en,
      'ar': instance.ar,
      'tr': instance.tr,
    };

const _$ActGroupEnumMap = {
  ActGroup.worship: 'worship',
  ActGroup.body: 'body',
  ActGroup.daily: 'daily',
  ActGroup.order: 'order',
  ActGroup.travel: 'travel',
  ActGroup.occasions: 'occasions',
  ActGroup.people: 'people',
  ActGroup.service: 'service',
  ActGroup.self: 'self',
  ActGroup.learning: 'learning',
  ActGroup.knowledge: 'knowledge',
  ActGroup.craft: 'craft',
  ActGroup.stewardship: 'stewardship',
};

_IntentionText _$IntentionTextFromJson(Map<String, dynamic> json) =>
    _IntentionText(
      intention: json['intention'] as String,
      note: json['note'] as String,
    );

Map<String, dynamic> _$IntentionTextToJson(_IntentionText instance) =>
    <String, dynamic>{'intention': instance.intention, 'note': instance.note};
