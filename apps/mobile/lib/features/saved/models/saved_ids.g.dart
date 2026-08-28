// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'saved_ids.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_SavedIds _$SavedIdsFromJson(Map<String, dynamic> json) => _SavedIds(
  situationIds:
      (json['situationIds'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList() ??
      const [],
  sayingIds:
      (json['sayingIds'] as List<dynamic>?)?.map((e) => e as String).toList() ??
      const [],
);

Map<String, dynamic> _$SavedIdsToJson(_SavedIds instance) => <String, dynamic>{
  'situationIds': instance.situationIds,
  'sayingIds': instance.sayingIds,
};
