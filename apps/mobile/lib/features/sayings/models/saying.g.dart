// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'saying.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Saying _$SayingFromJson(Map<String, dynamic> json) => _Saying(
  id: json['id'] as String,
  slug: json['slug'] as String,
  saying: json['saying'] as String,
  grade: $enumDecode(_$GradeEnumMap, json['grade']),
  situationSlug: json['situationSlug'] as String?,
  source: ContentSource.fromJson(json['source'] as Map<String, dynamic>),
  en: SayingText.fromJson(json['en'] as Map<String, dynamic>),
  ar: SayingText.fromJson(json['ar'] as Map<String, dynamic>),
  tr: SayingText.fromJson(json['tr'] as Map<String, dynamic>),
);

Map<String, dynamic> _$SayingToJson(_Saying instance) => <String, dynamic>{
  'id': instance.id,
  'slug': instance.slug,
  'saying': instance.saying,
  'grade': _$GradeEnumMap[instance.grade]!,
  'situationSlug': instance.situationSlug,
  'source': instance.source,
  'en': instance.en,
  'ar': instance.ar,
  'tr': instance.tr,
};

const _$GradeEnumMap = {
  Grade.quran: 'quran',
  Grade.sahih: 'sahih',
  Grade.hasan: 'hasan',
  Grade.historical: 'historical',
  Grade.disputed: 'disputed',
};

_SayingText _$SayingTextFromJson(Map<String, dynamic> json) => _SayingText(
  saying: json['saying'] as String?,
  angle: json['angle'] as String,
  closeness: json['closeness'] as String,
);

Map<String, dynamic> _$SayingTextToJson(_SayingText instance) =>
    <String, dynamic>{
      'saying': instance.saying,
      'angle': instance.angle,
      'closeness': instance.closeness,
    };
