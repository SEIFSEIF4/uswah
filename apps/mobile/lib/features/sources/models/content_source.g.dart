// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'content_source.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_ContentSource _$ContentSourceFromJson(Map<String, dynamic> json) =>
    _ContentSource(
      label: Map<String, String>.from(json['label'] as Map),
      collection: $enumDecodeNullable(_$BookKeyEnumMap, json['collection']),
      original: json['original'] as String?,
      translation:
          (json['translation'] as Map<String, dynamic>?)?.map(
            (k, e) => MapEntry(
              k,
              SourceTranslation.fromJson(e as Map<String, dynamic>),
            ),
          ) ??
          const {},
      dorar: json['dorar'] == null
          ? null
          : DorarRef.fromJson(json['dorar'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ContentSourceToJson(_ContentSource instance) =>
    <String, dynamic>{
      'label': instance.label,
      'collection': _$BookKeyEnumMap[instance.collection],
      'original': instance.original,
      'translation': instance.translation,
      'dorar': instance.dorar,
    };

const _$BookKeyEnumMap = {BookKey.bukhari: 'bukhari', BookKey.muslim: 'muslim'};

_SourceTranslation _$SourceTranslationFromJson(Map<String, dynamic> json) =>
    _SourceTranslation(
      text: json['text'] as String,
      translator: json['translator'] as String,
    );

Map<String, dynamic> _$SourceTranslationToJson(_SourceTranslation instance) =>
    <String, dynamic>{'text': instance.text, 'translator': instance.translator};
