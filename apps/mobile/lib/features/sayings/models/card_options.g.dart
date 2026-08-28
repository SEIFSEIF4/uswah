// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'card_options.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_CardOptions _$CardOptionsFromJson(Map<String, dynamic> json) => _CardOptions(
  theme:
      $enumDecodeNullable(_$CardGroundEnumMap, json['theme']) ??
      CardGround.warm,
  text: $enumDecodeNullable(_$CardTextEnumMap, json['text']) ?? CardText.both,
  font: $enumDecodeNullable(_$CardFontEnumMap, json['font']) ?? CardFont.naskh,
  ratio:
      $enumDecodeNullable(_$CardRatioEnumMap, json['ratio']) ?? CardRatio.story,
  align:
      $enumDecodeNullable(_$CardAlignEnumMap, json['align']) ??
      CardAlign.center,
  qr: json['qr'] as bool? ?? true,
  mark: json['mark'] as bool? ?? true,
);

Map<String, dynamic> _$CardOptionsToJson(_CardOptions instance) =>
    <String, dynamic>{
      'theme': _$CardGroundEnumMap[instance.theme]!,
      'text': _$CardTextEnumMap[instance.text]!,
      'font': _$CardFontEnumMap[instance.font]!,
      'ratio': _$CardRatioEnumMap[instance.ratio]!,
      'align': _$CardAlignEnumMap[instance.align]!,
      'qr': instance.qr,
      'mark': instance.mark,
    };

const _$CardGroundEnumMap = {
  CardGround.warm: 'warm',
  CardGround.paper: 'paper',
  CardGround.dark: 'dark',
};

const _$CardTextEnumMap = {
  CardText.both: 'both',
  CardText.original: 'original',
  CardText.translation: 'translation',
};

const _$CardFontEnumMap = {CardFont.naskh: 'naskh', CardFont.serif: 'serif'};

const _$CardRatioEnumMap = {
  CardRatio.story: 'story',
  CardRatio.square: 'square',
  CardRatio.wide: 'wide',
};

const _$CardAlignEnumMap = {
  CardAlign.start: 'start',
  CardAlign.center: 'center',
  CardAlign.end: 'end',
  CardAlign.justify: 'justify',
};
