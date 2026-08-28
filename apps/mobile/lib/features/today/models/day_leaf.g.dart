// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'day_leaf.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_DayLeaf _$DayLeafFromJson(Map<String, dynamic> json) => _DayLeaf(
  date: DateTime.parse(json['date'] as String),
  daysAgo: (json['daysAgo'] as num).toInt(),
  situation: Situation.fromJson(json['situation'] as Map<String, dynamic>),
  intention: json['intention'] == null
      ? null
      : Intention.fromJson(json['intention'] as Map<String, dynamic>),
);

Map<String, dynamic> _$DayLeafToJson(_DayLeaf instance) => <String, dynamic>{
  'date': instance.date.toIso8601String(),
  'daysAgo': instance.daysAgo,
  'situation': instance.situation,
  'intention': instance.intention,
};
