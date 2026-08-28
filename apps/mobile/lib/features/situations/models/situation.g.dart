// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'situation.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Situation _$SituationFromJson(Map<String, dynamic> json) => _Situation(
  id: json['id'] as String,
  slug: json['slug'] as String,
  topic: $enumDecode(_$TopicEnumMap, json['topic']),
  minutes: (json['minutes'] as num).toInt(),
  publishedAt: DateTime.parse(json['publishedAt'] as String),
  reviewedBy: json['reviewedBy'] as String,
  reviewedAt: DateTime.parse(json['reviewedAt'] as String),
  feature: json['feature'] as String?,
  image: SituationImage.fromJson(json['image'] as Map<String, dynamic>),
  source: ContentSource.fromJson(json['source'] as Map<String, dynamic>),
  en: LocaleText.fromJson(json['en'] as Map<String, dynamic>),
  ar: LocaleText.fromJson(json['ar'] as Map<String, dynamic>),
  tr: LocaleText.fromJson(json['tr'] as Map<String, dynamic>),
);

Map<String, dynamic> _$SituationToJson(_Situation instance) =>
    <String, dynamic>{
      'id': instance.id,
      'slug': instance.slug,
      'topic': _$TopicEnumMap[instance.topic]!,
      'minutes': instance.minutes,
      'publishedAt': instance.publishedAt.toIso8601String(),
      'reviewedBy': instance.reviewedBy,
      'reviewedAt': instance.reviewedAt.toIso8601String(),
      'feature': instance.feature,
      'image': instance.image,
      'source': instance.source,
      'en': instance.en,
      'ar': instance.ar,
      'tr': instance.tr,
    };

const _$TopicEnumMap = {
  Topic.money: 'money',
  Topic.work: 'work',
  Topic.family: 'family',
  Topic.self: 'self',
  Topic.friendship: 'friendship',
  Topic.hardship: 'hardship',
};

_LocaleText _$LocaleTextFromJson(Map<String, dynamic> json) => _LocaleText(
  title: json['title'] as String,
  summary: json['summary'] as String,
  imageAlt: json['imageAlt'] as String? ?? '',
  body: json['body'] as String,
  takeaway: json['takeaway'] as String,
);

Map<String, dynamic> _$LocaleTextToJson(_LocaleText instance) =>
    <String, dynamic>{
      'title': instance.title,
      'summary': instance.summary,
      'imageAlt': instance.imageAlt,
      'body': instance.body,
      'takeaway': instance.takeaway,
    };

_SituationImage _$SituationImageFromJson(Map<String, dynamic> json) =>
    _SituationImage(
      url: json['url'] as String,
      credit: json['credit'] as String? ?? '',
      sourceUrl: json['sourceUrl'] as String? ?? '',
      license: json['license'] as String? ?? '',
    );

Map<String, dynamic> _$SituationImageToJson(_SituationImage instance) =>
    <String, dynamic>{
      'url': instance.url,
      'credit': instance.credit,
      'sourceUrl': instance.sourceUrl,
      'license': instance.license,
    };
