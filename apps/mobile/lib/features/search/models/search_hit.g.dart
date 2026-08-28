// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'search_hit.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_SearchHit _$SearchHitFromJson(Map<String, dynamic> json) => _SearchHit(
  kind: $enumDecode(_$SearchKindEnumMap, json['kind']),
  slug: json['slug'] as String,
  route: json['route'] as String,
  title: json['title'] as String,
  summary: json['summary'] as String,
  match: json['match'] as String,
);

Map<String, dynamic> _$SearchHitToJson(_SearchHit instance) =>
    <String, dynamic>{
      'kind': _$SearchKindEnumMap[instance.kind]!,
      'slug': instance.slug,
      'route': instance.route,
      'title': instance.title,
      'summary': instance.summary,
      'match': instance.match,
    };

const _$SearchKindEnumMap = {
  SearchKind.situation: 'situation',
  SearchKind.saying: 'saying',
  SearchKind.intention: 'intention',
};
