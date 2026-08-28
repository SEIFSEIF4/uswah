// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'card_options.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$CardOptions {

 CardGround get theme; CardText get text; CardFont get font; CardRatio get ratio; CardAlign get align; bool get qr; bool get mark;
/// Create a copy of CardOptions
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$CardOptionsCopyWith<CardOptions> get copyWith => _$CardOptionsCopyWithImpl<CardOptions>(this as CardOptions, _$identity);

  /// Serializes this CardOptions to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is CardOptions&&(identical(other.theme, theme) || other.theme == theme)&&(identical(other.text, text) || other.text == text)&&(identical(other.font, font) || other.font == font)&&(identical(other.ratio, ratio) || other.ratio == ratio)&&(identical(other.align, align) || other.align == align)&&(identical(other.qr, qr) || other.qr == qr)&&(identical(other.mark, mark) || other.mark == mark));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,theme,text,font,ratio,align,qr,mark);

@override
String toString() {
  return 'CardOptions(theme: $theme, text: $text, font: $font, ratio: $ratio, align: $align, qr: $qr, mark: $mark)';
}


}

/// @nodoc
abstract mixin class $CardOptionsCopyWith<$Res>  {
  factory $CardOptionsCopyWith(CardOptions value, $Res Function(CardOptions) _then) = _$CardOptionsCopyWithImpl;
@useResult
$Res call({
 CardGround theme, CardText text, CardFont font, CardRatio ratio, CardAlign align, bool qr, bool mark
});




}
/// @nodoc
class _$CardOptionsCopyWithImpl<$Res>
    implements $CardOptionsCopyWith<$Res> {
  _$CardOptionsCopyWithImpl(this._self, this._then);

  final CardOptions _self;
  final $Res Function(CardOptions) _then;

/// Create a copy of CardOptions
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? theme = null,Object? text = null,Object? font = null,Object? ratio = null,Object? align = null,Object? qr = null,Object? mark = null,}) {
  return _then(_self.copyWith(
theme: null == theme ? _self.theme : theme // ignore: cast_nullable_to_non_nullable
as CardGround,text: null == text ? _self.text : text // ignore: cast_nullable_to_non_nullable
as CardText,font: null == font ? _self.font : font // ignore: cast_nullable_to_non_nullable
as CardFont,ratio: null == ratio ? _self.ratio : ratio // ignore: cast_nullable_to_non_nullable
as CardRatio,align: null == align ? _self.align : align // ignore: cast_nullable_to_non_nullable
as CardAlign,qr: null == qr ? _self.qr : qr // ignore: cast_nullable_to_non_nullable
as bool,mark: null == mark ? _self.mark : mark // ignore: cast_nullable_to_non_nullable
as bool,
  ));
}

}


/// Adds pattern-matching-related methods to [CardOptions].
extension CardOptionsPatterns on CardOptions {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _CardOptions value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _CardOptions() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _CardOptions value)  $default,){
final _that = this;
switch (_that) {
case _CardOptions():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _CardOptions value)?  $default,){
final _that = this;
switch (_that) {
case _CardOptions() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( CardGround theme,  CardText text,  CardFont font,  CardRatio ratio,  CardAlign align,  bool qr,  bool mark)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _CardOptions() when $default != null:
return $default(_that.theme,_that.text,_that.font,_that.ratio,_that.align,_that.qr,_that.mark);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( CardGround theme,  CardText text,  CardFont font,  CardRatio ratio,  CardAlign align,  bool qr,  bool mark)  $default,) {final _that = this;
switch (_that) {
case _CardOptions():
return $default(_that.theme,_that.text,_that.font,_that.ratio,_that.align,_that.qr,_that.mark);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( CardGround theme,  CardText text,  CardFont font,  CardRatio ratio,  CardAlign align,  bool qr,  bool mark)?  $default,) {final _that = this;
switch (_that) {
case _CardOptions() when $default != null:
return $default(_that.theme,_that.text,_that.font,_that.ratio,_that.align,_that.qr,_that.mark);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _CardOptions implements CardOptions {
  const _CardOptions({this.theme = CardGround.warm, this.text = CardText.both, this.font = CardFont.naskh, this.ratio = CardRatio.story, this.align = CardAlign.center, this.qr = true, this.mark = true});
  factory _CardOptions.fromJson(Map<String, dynamic> json) => _$CardOptionsFromJson(json);

@override@JsonKey() final  CardGround theme;
@override@JsonKey() final  CardText text;
@override@JsonKey() final  CardFont font;
@override@JsonKey() final  CardRatio ratio;
@override@JsonKey() final  CardAlign align;
@override@JsonKey() final  bool qr;
@override@JsonKey() final  bool mark;

/// Create a copy of CardOptions
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$CardOptionsCopyWith<_CardOptions> get copyWith => __$CardOptionsCopyWithImpl<_CardOptions>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$CardOptionsToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _CardOptions&&(identical(other.theme, theme) || other.theme == theme)&&(identical(other.text, text) || other.text == text)&&(identical(other.font, font) || other.font == font)&&(identical(other.ratio, ratio) || other.ratio == ratio)&&(identical(other.align, align) || other.align == align)&&(identical(other.qr, qr) || other.qr == qr)&&(identical(other.mark, mark) || other.mark == mark));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,theme,text,font,ratio,align,qr,mark);

@override
String toString() {
  return 'CardOptions(theme: $theme, text: $text, font: $font, ratio: $ratio, align: $align, qr: $qr, mark: $mark)';
}


}

/// @nodoc
abstract mixin class _$CardOptionsCopyWith<$Res> implements $CardOptionsCopyWith<$Res> {
  factory _$CardOptionsCopyWith(_CardOptions value, $Res Function(_CardOptions) _then) = __$CardOptionsCopyWithImpl;
@override @useResult
$Res call({
 CardGround theme, CardText text, CardFont font, CardRatio ratio, CardAlign align, bool qr, bool mark
});




}
/// @nodoc
class __$CardOptionsCopyWithImpl<$Res>
    implements _$CardOptionsCopyWith<$Res> {
  __$CardOptionsCopyWithImpl(this._self, this._then);

  final _CardOptions _self;
  final $Res Function(_CardOptions) _then;

/// Create a copy of CardOptions
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? theme = null,Object? text = null,Object? font = null,Object? ratio = null,Object? align = null,Object? qr = null,Object? mark = null,}) {
  return _then(_CardOptions(
theme: null == theme ? _self.theme : theme // ignore: cast_nullable_to_non_nullable
as CardGround,text: null == text ? _self.text : text // ignore: cast_nullable_to_non_nullable
as CardText,font: null == font ? _self.font : font // ignore: cast_nullable_to_non_nullable
as CardFont,ratio: null == ratio ? _self.ratio : ratio // ignore: cast_nullable_to_non_nullable
as CardRatio,align: null == align ? _self.align : align // ignore: cast_nullable_to_non_nullable
as CardAlign,qr: null == qr ? _self.qr : qr // ignore: cast_nullable_to_non_nullable
as bool,mark: null == mark ? _self.mark : mark // ignore: cast_nullable_to_non_nullable
as bool,
  ));
}


}

// dart format on
