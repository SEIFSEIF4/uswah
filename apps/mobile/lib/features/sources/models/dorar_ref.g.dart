// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'dorar_ref.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_DorarRef _$DorarRefFromJson(Map<String, dynamic> json) => _DorarRef(
  rawi: json['rawi'] as String,
  mohdith: json['mohdith'] as String,
  grade: json['grade'] as String,
  id: json['id'] as String,
  takhrij: json['takhrij'] as String?,
  categories:
      (json['categories'] as List<dynamic>?)
          ?.map((e) => DorarCategory.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
);

Map<String, dynamic> _$DorarRefToJson(_DorarRef instance) => <String, dynamic>{
  'rawi': instance.rawi,
  'mohdith': instance.mohdith,
  'grade': instance.grade,
  'id': instance.id,
  'takhrij': instance.takhrij,
  'categories': instance.categories,
};

_DorarCategory _$DorarCategoryFromJson(Map<String, dynamic> json) =>
    _DorarCategory(id: json['id'] as String, name: json['name'] as String);

Map<String, dynamic> _$DorarCategoryToJson(_DorarCategory instance) =>
    <String, dynamic>{'id': instance.id, 'name': instance.name};
