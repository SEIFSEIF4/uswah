// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'saying.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Saying {

 String get id; String get slug;/// The saying people already know, in the language it circulates in.
 String get saying; Grade get grade;/// Which situation this belongs with, when one exists.
 String? get situationSlug; ContentSource get source; SayingText get en; SayingText get ar; SayingText get tr;
/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SayingCopyWith<Saying> get copyWith => _$SayingCopyWithImpl<Saying>(this as Saying, _$identity);

  /// Serializes this Saying to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Saying&&(identical(other.id, id) || other.id == id)&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.saying, saying) || other.saying == saying)&&(identical(other.grade, grade) || other.grade == grade)&&(identical(other.situationSlug, situationSlug) || other.situationSlug == situationSlug)&&(identical(other.source, source) || other.source == source)&&(identical(other.en, en) || other.en == en)&&(identical(other.ar, ar) || other.ar == ar)&&(identical(other.tr, tr) || other.tr == tr));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,slug,saying,grade,situationSlug,source,en,ar,tr);

@override
String toString() {
  return 'Saying(id: $id, slug: $slug, saying: $saying, grade: $grade, situationSlug: $situationSlug, source: $source, en: $en, ar: $ar, tr: $tr)';
}


}

/// @nodoc
abstract mixin class $SayingCopyWith<$Res>  {
  factory $SayingCopyWith(Saying value, $Res Function(Saying) _then) = _$SayingCopyWithImpl;
@useResult
$Res call({
 String id, String slug, String saying, Grade grade, String? situationSlug, ContentSource source, SayingText en, SayingText ar, SayingText tr
});


$ContentSourceCopyWith<$Res> get source;$SayingTextCopyWith<$Res> get en;$SayingTextCopyWith<$Res> get ar;$SayingTextCopyWith<$Res> get tr;

}
/// @nodoc
class _$SayingCopyWithImpl<$Res>
    implements $SayingCopyWith<$Res> {
  _$SayingCopyWithImpl(this._self, this._then);

  final Saying _self;
  final $Res Function(Saying) _then;

/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? slug = null,Object? saying = null,Object? grade = null,Object? situationSlug = freezed,Object? source = null,Object? en = null,Object? ar = null,Object? tr = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,saying: null == saying ? _self.saying : saying // ignore: cast_nullable_to_non_nullable
as String,grade: null == grade ? _self.grade : grade // ignore: cast_nullable_to_non_nullable
as Grade,situationSlug: freezed == situationSlug ? _self.situationSlug : situationSlug // ignore: cast_nullable_to_non_nullable
as String?,source: null == source ? _self.source : source // ignore: cast_nullable_to_non_nullable
as ContentSource,en: null == en ? _self.en : en // ignore: cast_nullable_to_non_nullable
as SayingText,ar: null == ar ? _self.ar : ar // ignore: cast_nullable_to_non_nullable
as SayingText,tr: null == tr ? _self.tr : tr // ignore: cast_nullable_to_non_nullable
as SayingText,
  ));
}
/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ContentSourceCopyWith<$Res> get source {
  
  return $ContentSourceCopyWith<$Res>(_self.source, (value) {
    return _then(_self.copyWith(source: value));
  });
}/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SayingTextCopyWith<$Res> get en {
  
  return $SayingTextCopyWith<$Res>(_self.en, (value) {
    return _then(_self.copyWith(en: value));
  });
}/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SayingTextCopyWith<$Res> get ar {
  
  return $SayingTextCopyWith<$Res>(_self.ar, (value) {
    return _then(_self.copyWith(ar: value));
  });
}/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SayingTextCopyWith<$Res> get tr {
  
  return $SayingTextCopyWith<$Res>(_self.tr, (value) {
    return _then(_self.copyWith(tr: value));
  });
}
}


/// Adds pattern-matching-related methods to [Saying].
extension SayingPatterns on Saying {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Saying value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Saying() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Saying value)  $default,){
final _that = this;
switch (_that) {
case _Saying():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Saying value)?  $default,){
final _that = this;
switch (_that) {
case _Saying() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String slug,  String saying,  Grade grade,  String? situationSlug,  ContentSource source,  SayingText en,  SayingText ar,  SayingText tr)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Saying() when $default != null:
return $default(_that.id,_that.slug,_that.saying,_that.grade,_that.situationSlug,_that.source,_that.en,_that.ar,_that.tr);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String slug,  String saying,  Grade grade,  String? situationSlug,  ContentSource source,  SayingText en,  SayingText ar,  SayingText tr)  $default,) {final _that = this;
switch (_that) {
case _Saying():
return $default(_that.id,_that.slug,_that.saying,_that.grade,_that.situationSlug,_that.source,_that.en,_that.ar,_that.tr);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String slug,  String saying,  Grade grade,  String? situationSlug,  ContentSource source,  SayingText en,  SayingText ar,  SayingText tr)?  $default,) {final _that = this;
switch (_that) {
case _Saying() when $default != null:
return $default(_that.id,_that.slug,_that.saying,_that.grade,_that.situationSlug,_that.source,_that.en,_that.ar,_that.tr);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Saying extends Saying {
  const _Saying({required this.id, required this.slug, required this.saying, required this.grade, this.situationSlug, required this.source, required this.en, required this.ar, required this.tr}): super._();
  factory _Saying.fromJson(Map<String, dynamic> json) => _$SayingFromJson(json);

@override final  String id;
@override final  String slug;
/// The saying people already know, in the language it circulates in.
@override final  String saying;
@override final  Grade grade;
/// Which situation this belongs with, when one exists.
@override final  String? situationSlug;
@override final  ContentSource source;
@override final  SayingText en;
@override final  SayingText ar;
@override final  SayingText tr;

/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SayingCopyWith<_Saying> get copyWith => __$SayingCopyWithImpl<_Saying>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SayingToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Saying&&(identical(other.id, id) || other.id == id)&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.saying, saying) || other.saying == saying)&&(identical(other.grade, grade) || other.grade == grade)&&(identical(other.situationSlug, situationSlug) || other.situationSlug == situationSlug)&&(identical(other.source, source) || other.source == source)&&(identical(other.en, en) || other.en == en)&&(identical(other.ar, ar) || other.ar == ar)&&(identical(other.tr, tr) || other.tr == tr));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,slug,saying,grade,situationSlug,source,en,ar,tr);

@override
String toString() {
  return 'Saying(id: $id, slug: $slug, saying: $saying, grade: $grade, situationSlug: $situationSlug, source: $source, en: $en, ar: $ar, tr: $tr)';
}


}

/// @nodoc
abstract mixin class _$SayingCopyWith<$Res> implements $SayingCopyWith<$Res> {
  factory _$SayingCopyWith(_Saying value, $Res Function(_Saying) _then) = __$SayingCopyWithImpl;
@override @useResult
$Res call({
 String id, String slug, String saying, Grade grade, String? situationSlug, ContentSource source, SayingText en, SayingText ar, SayingText tr
});


@override $ContentSourceCopyWith<$Res> get source;@override $SayingTextCopyWith<$Res> get en;@override $SayingTextCopyWith<$Res> get ar;@override $SayingTextCopyWith<$Res> get tr;

}
/// @nodoc
class __$SayingCopyWithImpl<$Res>
    implements _$SayingCopyWith<$Res> {
  __$SayingCopyWithImpl(this._self, this._then);

  final _Saying _self;
  final $Res Function(_Saying) _then;

/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? slug = null,Object? saying = null,Object? grade = null,Object? situationSlug = freezed,Object? source = null,Object? en = null,Object? ar = null,Object? tr = null,}) {
  return _then(_Saying(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,saying: null == saying ? _self.saying : saying // ignore: cast_nullable_to_non_nullable
as String,grade: null == grade ? _self.grade : grade // ignore: cast_nullable_to_non_nullable
as Grade,situationSlug: freezed == situationSlug ? _self.situationSlug : situationSlug // ignore: cast_nullable_to_non_nullable
as String?,source: null == source ? _self.source : source // ignore: cast_nullable_to_non_nullable
as ContentSource,en: null == en ? _self.en : en // ignore: cast_nullable_to_non_nullable
as SayingText,ar: null == ar ? _self.ar : ar // ignore: cast_nullable_to_non_nullable
as SayingText,tr: null == tr ? _self.tr : tr // ignore: cast_nullable_to_non_nullable
as SayingText,
  ));
}

/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ContentSourceCopyWith<$Res> get source {
  
  return $ContentSourceCopyWith<$Res>(_self.source, (value) {
    return _then(_self.copyWith(source: value));
  });
}/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SayingTextCopyWith<$Res> get en {
  
  return $SayingTextCopyWith<$Res>(_self.en, (value) {
    return _then(_self.copyWith(en: value));
  });
}/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SayingTextCopyWith<$Res> get ar {
  
  return $SayingTextCopyWith<$Res>(_self.ar, (value) {
    return _then(_self.copyWith(ar: value));
  });
}/// Create a copy of Saying
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SayingTextCopyWith<$Res> get tr {
  
  return $SayingTextCopyWith<$Res>(_self.tr, (value) {
    return _then(_self.copyWith(tr: value));
  });
}
}


/// @nodoc
mixin _$SayingText {

/// Native equivalent aphorism, not a translation; absent means the canonical form.
 String? get saying; String get angle; String get closeness;
/// Create a copy of SayingText
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SayingTextCopyWith<SayingText> get copyWith => _$SayingTextCopyWithImpl<SayingText>(this as SayingText, _$identity);

  /// Serializes this SayingText to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SayingText&&(identical(other.saying, saying) || other.saying == saying)&&(identical(other.angle, angle) || other.angle == angle)&&(identical(other.closeness, closeness) || other.closeness == closeness));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,saying,angle,closeness);

@override
String toString() {
  return 'SayingText(saying: $saying, angle: $angle, closeness: $closeness)';
}


}

/// @nodoc
abstract mixin class $SayingTextCopyWith<$Res>  {
  factory $SayingTextCopyWith(SayingText value, $Res Function(SayingText) _then) = _$SayingTextCopyWithImpl;
@useResult
$Res call({
 String? saying, String angle, String closeness
});




}
/// @nodoc
class _$SayingTextCopyWithImpl<$Res>
    implements $SayingTextCopyWith<$Res> {
  _$SayingTextCopyWithImpl(this._self, this._then);

  final SayingText _self;
  final $Res Function(SayingText) _then;

/// Create a copy of SayingText
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? saying = freezed,Object? angle = null,Object? closeness = null,}) {
  return _then(_self.copyWith(
saying: freezed == saying ? _self.saying : saying // ignore: cast_nullable_to_non_nullable
as String?,angle: null == angle ? _self.angle : angle // ignore: cast_nullable_to_non_nullable
as String,closeness: null == closeness ? _self.closeness : closeness // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [SayingText].
extension SayingTextPatterns on SayingText {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _SayingText value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _SayingText() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _SayingText value)  $default,){
final _that = this;
switch (_that) {
case _SayingText():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _SayingText value)?  $default,){
final _that = this;
switch (_that) {
case _SayingText() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String? saying,  String angle,  String closeness)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _SayingText() when $default != null:
return $default(_that.saying,_that.angle,_that.closeness);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String? saying,  String angle,  String closeness)  $default,) {final _that = this;
switch (_that) {
case _SayingText():
return $default(_that.saying,_that.angle,_that.closeness);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String? saying,  String angle,  String closeness)?  $default,) {final _that = this;
switch (_that) {
case _SayingText() when $default != null:
return $default(_that.saying,_that.angle,_that.closeness);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _SayingText implements SayingText {
  const _SayingText({this.saying, required this.angle, required this.closeness});
  factory _SayingText.fromJson(Map<String, dynamic> json) => _$SayingTextFromJson(json);

/// Native equivalent aphorism, not a translation; absent means the canonical form.
@override final  String? saying;
@override final  String angle;
@override final  String closeness;

/// Create a copy of SayingText
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SayingTextCopyWith<_SayingText> get copyWith => __$SayingTextCopyWithImpl<_SayingText>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SayingTextToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SayingText&&(identical(other.saying, saying) || other.saying == saying)&&(identical(other.angle, angle) || other.angle == angle)&&(identical(other.closeness, closeness) || other.closeness == closeness));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,saying,angle,closeness);

@override
String toString() {
  return 'SayingText(saying: $saying, angle: $angle, closeness: $closeness)';
}


}

/// @nodoc
abstract mixin class _$SayingTextCopyWith<$Res> implements $SayingTextCopyWith<$Res> {
  factory _$SayingTextCopyWith(_SayingText value, $Res Function(_SayingText) _then) = __$SayingTextCopyWithImpl;
@override @useResult
$Res call({
 String? saying, String angle, String closeness
});




}
/// @nodoc
class __$SayingTextCopyWithImpl<$Res>
    implements _$SayingTextCopyWith<$Res> {
  __$SayingTextCopyWithImpl(this._self, this._then);

  final _SayingText _self;
  final $Res Function(_SayingText) _then;

/// Create a copy of SayingText
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? saying = freezed,Object? angle = null,Object? closeness = null,}) {
  return _then(_SayingText(
saying: freezed == saying ? _self.saying : saying // ignore: cast_nullable_to_non_nullable
as String?,angle: null == angle ? _self.angle : angle // ignore: cast_nullable_to_non_nullable
as String,closeness: null == closeness ? _self.closeness : closeness // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
