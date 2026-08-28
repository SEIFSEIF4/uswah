// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'situation.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Situation {

 String get id; String get slug; Topic get topic; int get minutes; DateTime get publishedAt; String get reviewedBy; DateTime get reviewedAt;/// 'hero' | 'band' | null
 String? get feature; SituationImage get image; ContentSource get source; LocaleText get en; LocaleText get ar; LocaleText get tr;
/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SituationCopyWith<Situation> get copyWith => _$SituationCopyWithImpl<Situation>(this as Situation, _$identity);

  /// Serializes this Situation to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Situation&&(identical(other.id, id) || other.id == id)&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.topic, topic) || other.topic == topic)&&(identical(other.minutes, minutes) || other.minutes == minutes)&&(identical(other.publishedAt, publishedAt) || other.publishedAt == publishedAt)&&(identical(other.reviewedBy, reviewedBy) || other.reviewedBy == reviewedBy)&&(identical(other.reviewedAt, reviewedAt) || other.reviewedAt == reviewedAt)&&(identical(other.feature, feature) || other.feature == feature)&&(identical(other.image, image) || other.image == image)&&(identical(other.source, source) || other.source == source)&&(identical(other.en, en) || other.en == en)&&(identical(other.ar, ar) || other.ar == ar)&&(identical(other.tr, tr) || other.tr == tr));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,slug,topic,minutes,publishedAt,reviewedBy,reviewedAt,feature,image,source,en,ar,tr);

@override
String toString() {
  return 'Situation(id: $id, slug: $slug, topic: $topic, minutes: $minutes, publishedAt: $publishedAt, reviewedBy: $reviewedBy, reviewedAt: $reviewedAt, feature: $feature, image: $image, source: $source, en: $en, ar: $ar, tr: $tr)';
}


}

/// @nodoc
abstract mixin class $SituationCopyWith<$Res>  {
  factory $SituationCopyWith(Situation value, $Res Function(Situation) _then) = _$SituationCopyWithImpl;
@useResult
$Res call({
 String id, String slug, Topic topic, int minutes, DateTime publishedAt, String reviewedBy, DateTime reviewedAt, String? feature, SituationImage image, ContentSource source, LocaleText en, LocaleText ar, LocaleText tr
});


$SituationImageCopyWith<$Res> get image;$ContentSourceCopyWith<$Res> get source;$LocaleTextCopyWith<$Res> get en;$LocaleTextCopyWith<$Res> get ar;$LocaleTextCopyWith<$Res> get tr;

}
/// @nodoc
class _$SituationCopyWithImpl<$Res>
    implements $SituationCopyWith<$Res> {
  _$SituationCopyWithImpl(this._self, this._then);

  final Situation _self;
  final $Res Function(Situation) _then;

/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? slug = null,Object? topic = null,Object? minutes = null,Object? publishedAt = null,Object? reviewedBy = null,Object? reviewedAt = null,Object? feature = freezed,Object? image = null,Object? source = null,Object? en = null,Object? ar = null,Object? tr = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,topic: null == topic ? _self.topic : topic // ignore: cast_nullable_to_non_nullable
as Topic,minutes: null == minutes ? _self.minutes : minutes // ignore: cast_nullable_to_non_nullable
as int,publishedAt: null == publishedAt ? _self.publishedAt : publishedAt // ignore: cast_nullable_to_non_nullable
as DateTime,reviewedBy: null == reviewedBy ? _self.reviewedBy : reviewedBy // ignore: cast_nullable_to_non_nullable
as String,reviewedAt: null == reviewedAt ? _self.reviewedAt : reviewedAt // ignore: cast_nullable_to_non_nullable
as DateTime,feature: freezed == feature ? _self.feature : feature // ignore: cast_nullable_to_non_nullable
as String?,image: null == image ? _self.image : image // ignore: cast_nullable_to_non_nullable
as SituationImage,source: null == source ? _self.source : source // ignore: cast_nullable_to_non_nullable
as ContentSource,en: null == en ? _self.en : en // ignore: cast_nullable_to_non_nullable
as LocaleText,ar: null == ar ? _self.ar : ar // ignore: cast_nullable_to_non_nullable
as LocaleText,tr: null == tr ? _self.tr : tr // ignore: cast_nullable_to_non_nullable
as LocaleText,
  ));
}
/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SituationImageCopyWith<$Res> get image {
  
  return $SituationImageCopyWith<$Res>(_self.image, (value) {
    return _then(_self.copyWith(image: value));
  });
}/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ContentSourceCopyWith<$Res> get source {
  
  return $ContentSourceCopyWith<$Res>(_self.source, (value) {
    return _then(_self.copyWith(source: value));
  });
}/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocaleTextCopyWith<$Res> get en {
  
  return $LocaleTextCopyWith<$Res>(_self.en, (value) {
    return _then(_self.copyWith(en: value));
  });
}/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocaleTextCopyWith<$Res> get ar {
  
  return $LocaleTextCopyWith<$Res>(_self.ar, (value) {
    return _then(_self.copyWith(ar: value));
  });
}/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocaleTextCopyWith<$Res> get tr {
  
  return $LocaleTextCopyWith<$Res>(_self.tr, (value) {
    return _then(_self.copyWith(tr: value));
  });
}
}


/// Adds pattern-matching-related methods to [Situation].
extension SituationPatterns on Situation {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Situation value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Situation() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Situation value)  $default,){
final _that = this;
switch (_that) {
case _Situation():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Situation value)?  $default,){
final _that = this;
switch (_that) {
case _Situation() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String slug,  Topic topic,  int minutes,  DateTime publishedAt,  String reviewedBy,  DateTime reviewedAt,  String? feature,  SituationImage image,  ContentSource source,  LocaleText en,  LocaleText ar,  LocaleText tr)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Situation() when $default != null:
return $default(_that.id,_that.slug,_that.topic,_that.minutes,_that.publishedAt,_that.reviewedBy,_that.reviewedAt,_that.feature,_that.image,_that.source,_that.en,_that.ar,_that.tr);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String slug,  Topic topic,  int minutes,  DateTime publishedAt,  String reviewedBy,  DateTime reviewedAt,  String? feature,  SituationImage image,  ContentSource source,  LocaleText en,  LocaleText ar,  LocaleText tr)  $default,) {final _that = this;
switch (_that) {
case _Situation():
return $default(_that.id,_that.slug,_that.topic,_that.minutes,_that.publishedAt,_that.reviewedBy,_that.reviewedAt,_that.feature,_that.image,_that.source,_that.en,_that.ar,_that.tr);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String slug,  Topic topic,  int minutes,  DateTime publishedAt,  String reviewedBy,  DateTime reviewedAt,  String? feature,  SituationImage image,  ContentSource source,  LocaleText en,  LocaleText ar,  LocaleText tr)?  $default,) {final _that = this;
switch (_that) {
case _Situation() when $default != null:
return $default(_that.id,_that.slug,_that.topic,_that.minutes,_that.publishedAt,_that.reviewedBy,_that.reviewedAt,_that.feature,_that.image,_that.source,_that.en,_that.ar,_that.tr);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Situation extends Situation {
  const _Situation({required this.id, required this.slug, required this.topic, required this.minutes, required this.publishedAt, required this.reviewedBy, required this.reviewedAt, this.feature, required this.image, required this.source, required this.en, required this.ar, required this.tr}): super._();
  factory _Situation.fromJson(Map<String, dynamic> json) => _$SituationFromJson(json);

@override final  String id;
@override final  String slug;
@override final  Topic topic;
@override final  int minutes;
@override final  DateTime publishedAt;
@override final  String reviewedBy;
@override final  DateTime reviewedAt;
/// 'hero' | 'band' | null
@override final  String? feature;
@override final  SituationImage image;
@override final  ContentSource source;
@override final  LocaleText en;
@override final  LocaleText ar;
@override final  LocaleText tr;

/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SituationCopyWith<_Situation> get copyWith => __$SituationCopyWithImpl<_Situation>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SituationToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Situation&&(identical(other.id, id) || other.id == id)&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.topic, topic) || other.topic == topic)&&(identical(other.minutes, minutes) || other.minutes == minutes)&&(identical(other.publishedAt, publishedAt) || other.publishedAt == publishedAt)&&(identical(other.reviewedBy, reviewedBy) || other.reviewedBy == reviewedBy)&&(identical(other.reviewedAt, reviewedAt) || other.reviewedAt == reviewedAt)&&(identical(other.feature, feature) || other.feature == feature)&&(identical(other.image, image) || other.image == image)&&(identical(other.source, source) || other.source == source)&&(identical(other.en, en) || other.en == en)&&(identical(other.ar, ar) || other.ar == ar)&&(identical(other.tr, tr) || other.tr == tr));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,slug,topic,minutes,publishedAt,reviewedBy,reviewedAt,feature,image,source,en,ar,tr);

@override
String toString() {
  return 'Situation(id: $id, slug: $slug, topic: $topic, minutes: $minutes, publishedAt: $publishedAt, reviewedBy: $reviewedBy, reviewedAt: $reviewedAt, feature: $feature, image: $image, source: $source, en: $en, ar: $ar, tr: $tr)';
}


}

/// @nodoc
abstract mixin class _$SituationCopyWith<$Res> implements $SituationCopyWith<$Res> {
  factory _$SituationCopyWith(_Situation value, $Res Function(_Situation) _then) = __$SituationCopyWithImpl;
@override @useResult
$Res call({
 String id, String slug, Topic topic, int minutes, DateTime publishedAt, String reviewedBy, DateTime reviewedAt, String? feature, SituationImage image, ContentSource source, LocaleText en, LocaleText ar, LocaleText tr
});


@override $SituationImageCopyWith<$Res> get image;@override $ContentSourceCopyWith<$Res> get source;@override $LocaleTextCopyWith<$Res> get en;@override $LocaleTextCopyWith<$Res> get ar;@override $LocaleTextCopyWith<$Res> get tr;

}
/// @nodoc
class __$SituationCopyWithImpl<$Res>
    implements _$SituationCopyWith<$Res> {
  __$SituationCopyWithImpl(this._self, this._then);

  final _Situation _self;
  final $Res Function(_Situation) _then;

/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? slug = null,Object? topic = null,Object? minutes = null,Object? publishedAt = null,Object? reviewedBy = null,Object? reviewedAt = null,Object? feature = freezed,Object? image = null,Object? source = null,Object? en = null,Object? ar = null,Object? tr = null,}) {
  return _then(_Situation(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,topic: null == topic ? _self.topic : topic // ignore: cast_nullable_to_non_nullable
as Topic,minutes: null == minutes ? _self.minutes : minutes // ignore: cast_nullable_to_non_nullable
as int,publishedAt: null == publishedAt ? _self.publishedAt : publishedAt // ignore: cast_nullable_to_non_nullable
as DateTime,reviewedBy: null == reviewedBy ? _self.reviewedBy : reviewedBy // ignore: cast_nullable_to_non_nullable
as String,reviewedAt: null == reviewedAt ? _self.reviewedAt : reviewedAt // ignore: cast_nullable_to_non_nullable
as DateTime,feature: freezed == feature ? _self.feature : feature // ignore: cast_nullable_to_non_nullable
as String?,image: null == image ? _self.image : image // ignore: cast_nullable_to_non_nullable
as SituationImage,source: null == source ? _self.source : source // ignore: cast_nullable_to_non_nullable
as ContentSource,en: null == en ? _self.en : en // ignore: cast_nullable_to_non_nullable
as LocaleText,ar: null == ar ? _self.ar : ar // ignore: cast_nullable_to_non_nullable
as LocaleText,tr: null == tr ? _self.tr : tr // ignore: cast_nullable_to_non_nullable
as LocaleText,
  ));
}

/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SituationImageCopyWith<$Res> get image {
  
  return $SituationImageCopyWith<$Res>(_self.image, (value) {
    return _then(_self.copyWith(image: value));
  });
}/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ContentSourceCopyWith<$Res> get source {
  
  return $ContentSourceCopyWith<$Res>(_self.source, (value) {
    return _then(_self.copyWith(source: value));
  });
}/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocaleTextCopyWith<$Res> get en {
  
  return $LocaleTextCopyWith<$Res>(_self.en, (value) {
    return _then(_self.copyWith(en: value));
  });
}/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocaleTextCopyWith<$Res> get ar {
  
  return $LocaleTextCopyWith<$Res>(_self.ar, (value) {
    return _then(_self.copyWith(ar: value));
  });
}/// Create a copy of Situation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocaleTextCopyWith<$Res> get tr {
  
  return $LocaleTextCopyWith<$Res>(_self.tr, (value) {
    return _then(_self.copyWith(tr: value));
  });
}
}


/// @nodoc
mixin _$LocaleText {

 String get title; String get summary; String get imageAlt; String get body; String get takeaway;
/// Create a copy of LocaleText
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$LocaleTextCopyWith<LocaleText> get copyWith => _$LocaleTextCopyWithImpl<LocaleText>(this as LocaleText, _$identity);

  /// Serializes this LocaleText to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is LocaleText&&(identical(other.title, title) || other.title == title)&&(identical(other.summary, summary) || other.summary == summary)&&(identical(other.imageAlt, imageAlt) || other.imageAlt == imageAlt)&&(identical(other.body, body) || other.body == body)&&(identical(other.takeaway, takeaway) || other.takeaway == takeaway));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,title,summary,imageAlt,body,takeaway);

@override
String toString() {
  return 'LocaleText(title: $title, summary: $summary, imageAlt: $imageAlt, body: $body, takeaway: $takeaway)';
}


}

/// @nodoc
abstract mixin class $LocaleTextCopyWith<$Res>  {
  factory $LocaleTextCopyWith(LocaleText value, $Res Function(LocaleText) _then) = _$LocaleTextCopyWithImpl;
@useResult
$Res call({
 String title, String summary, String imageAlt, String body, String takeaway
});




}
/// @nodoc
class _$LocaleTextCopyWithImpl<$Res>
    implements $LocaleTextCopyWith<$Res> {
  _$LocaleTextCopyWithImpl(this._self, this._then);

  final LocaleText _self;
  final $Res Function(LocaleText) _then;

/// Create a copy of LocaleText
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? title = null,Object? summary = null,Object? imageAlt = null,Object? body = null,Object? takeaway = null,}) {
  return _then(_self.copyWith(
title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,summary: null == summary ? _self.summary : summary // ignore: cast_nullable_to_non_nullable
as String,imageAlt: null == imageAlt ? _self.imageAlt : imageAlt // ignore: cast_nullable_to_non_nullable
as String,body: null == body ? _self.body : body // ignore: cast_nullable_to_non_nullable
as String,takeaway: null == takeaway ? _self.takeaway : takeaway // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [LocaleText].
extension LocaleTextPatterns on LocaleText {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _LocaleText value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _LocaleText() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _LocaleText value)  $default,){
final _that = this;
switch (_that) {
case _LocaleText():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _LocaleText value)?  $default,){
final _that = this;
switch (_that) {
case _LocaleText() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String title,  String summary,  String imageAlt,  String body,  String takeaway)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _LocaleText() when $default != null:
return $default(_that.title,_that.summary,_that.imageAlt,_that.body,_that.takeaway);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String title,  String summary,  String imageAlt,  String body,  String takeaway)  $default,) {final _that = this;
switch (_that) {
case _LocaleText():
return $default(_that.title,_that.summary,_that.imageAlt,_that.body,_that.takeaway);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String title,  String summary,  String imageAlt,  String body,  String takeaway)?  $default,) {final _that = this;
switch (_that) {
case _LocaleText() when $default != null:
return $default(_that.title,_that.summary,_that.imageAlt,_that.body,_that.takeaway);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _LocaleText implements LocaleText {
  const _LocaleText({required this.title, required this.summary, this.imageAlt = '', required this.body, required this.takeaway});
  factory _LocaleText.fromJson(Map<String, dynamic> json) => _$LocaleTextFromJson(json);

@override final  String title;
@override final  String summary;
@override@JsonKey() final  String imageAlt;
@override final  String body;
@override final  String takeaway;

/// Create a copy of LocaleText
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$LocaleTextCopyWith<_LocaleText> get copyWith => __$LocaleTextCopyWithImpl<_LocaleText>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$LocaleTextToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _LocaleText&&(identical(other.title, title) || other.title == title)&&(identical(other.summary, summary) || other.summary == summary)&&(identical(other.imageAlt, imageAlt) || other.imageAlt == imageAlt)&&(identical(other.body, body) || other.body == body)&&(identical(other.takeaway, takeaway) || other.takeaway == takeaway));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,title,summary,imageAlt,body,takeaway);

@override
String toString() {
  return 'LocaleText(title: $title, summary: $summary, imageAlt: $imageAlt, body: $body, takeaway: $takeaway)';
}


}

/// @nodoc
abstract mixin class _$LocaleTextCopyWith<$Res> implements $LocaleTextCopyWith<$Res> {
  factory _$LocaleTextCopyWith(_LocaleText value, $Res Function(_LocaleText) _then) = __$LocaleTextCopyWithImpl;
@override @useResult
$Res call({
 String title, String summary, String imageAlt, String body, String takeaway
});




}
/// @nodoc
class __$LocaleTextCopyWithImpl<$Res>
    implements _$LocaleTextCopyWith<$Res> {
  __$LocaleTextCopyWithImpl(this._self, this._then);

  final _LocaleText _self;
  final $Res Function(_LocaleText) _then;

/// Create a copy of LocaleText
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? title = null,Object? summary = null,Object? imageAlt = null,Object? body = null,Object? takeaway = null,}) {
  return _then(_LocaleText(
title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,summary: null == summary ? _self.summary : summary // ignore: cast_nullable_to_non_nullable
as String,imageAlt: null == imageAlt ? _self.imageAlt : imageAlt // ignore: cast_nullable_to_non_nullable
as String,body: null == body ? _self.body : body // ignore: cast_nullable_to_non_nullable
as String,takeaway: null == takeaway ? _self.takeaway : takeaway // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}


/// @nodoc
mixin _$SituationImage {

 String get url; String get credit; String get sourceUrl; String get license;
/// Create a copy of SituationImage
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SituationImageCopyWith<SituationImage> get copyWith => _$SituationImageCopyWithImpl<SituationImage>(this as SituationImage, _$identity);

  /// Serializes this SituationImage to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SituationImage&&(identical(other.url, url) || other.url == url)&&(identical(other.credit, credit) || other.credit == credit)&&(identical(other.sourceUrl, sourceUrl) || other.sourceUrl == sourceUrl)&&(identical(other.license, license) || other.license == license));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,url,credit,sourceUrl,license);

@override
String toString() {
  return 'SituationImage(url: $url, credit: $credit, sourceUrl: $sourceUrl, license: $license)';
}


}

/// @nodoc
abstract mixin class $SituationImageCopyWith<$Res>  {
  factory $SituationImageCopyWith(SituationImage value, $Res Function(SituationImage) _then) = _$SituationImageCopyWithImpl;
@useResult
$Res call({
 String url, String credit, String sourceUrl, String license
});




}
/// @nodoc
class _$SituationImageCopyWithImpl<$Res>
    implements $SituationImageCopyWith<$Res> {
  _$SituationImageCopyWithImpl(this._self, this._then);

  final SituationImage _self;
  final $Res Function(SituationImage) _then;

/// Create a copy of SituationImage
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? url = null,Object? credit = null,Object? sourceUrl = null,Object? license = null,}) {
  return _then(_self.copyWith(
url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,credit: null == credit ? _self.credit : credit // ignore: cast_nullable_to_non_nullable
as String,sourceUrl: null == sourceUrl ? _self.sourceUrl : sourceUrl // ignore: cast_nullable_to_non_nullable
as String,license: null == license ? _self.license : license // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [SituationImage].
extension SituationImagePatterns on SituationImage {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _SituationImage value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _SituationImage() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _SituationImage value)  $default,){
final _that = this;
switch (_that) {
case _SituationImage():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _SituationImage value)?  $default,){
final _that = this;
switch (_that) {
case _SituationImage() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String url,  String credit,  String sourceUrl,  String license)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _SituationImage() when $default != null:
return $default(_that.url,_that.credit,_that.sourceUrl,_that.license);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String url,  String credit,  String sourceUrl,  String license)  $default,) {final _that = this;
switch (_that) {
case _SituationImage():
return $default(_that.url,_that.credit,_that.sourceUrl,_that.license);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String url,  String credit,  String sourceUrl,  String license)?  $default,) {final _that = this;
switch (_that) {
case _SituationImage() when $default != null:
return $default(_that.url,_that.credit,_that.sourceUrl,_that.license);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _SituationImage implements SituationImage {
  const _SituationImage({required this.url, this.credit = '', this.sourceUrl = '', this.license = ''});
  factory _SituationImage.fromJson(Map<String, dynamic> json) => _$SituationImageFromJson(json);

@override final  String url;
@override@JsonKey() final  String credit;
@override@JsonKey() final  String sourceUrl;
@override@JsonKey() final  String license;

/// Create a copy of SituationImage
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SituationImageCopyWith<_SituationImage> get copyWith => __$SituationImageCopyWithImpl<_SituationImage>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SituationImageToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SituationImage&&(identical(other.url, url) || other.url == url)&&(identical(other.credit, credit) || other.credit == credit)&&(identical(other.sourceUrl, sourceUrl) || other.sourceUrl == sourceUrl)&&(identical(other.license, license) || other.license == license));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,url,credit,sourceUrl,license);

@override
String toString() {
  return 'SituationImage(url: $url, credit: $credit, sourceUrl: $sourceUrl, license: $license)';
}


}

/// @nodoc
abstract mixin class _$SituationImageCopyWith<$Res> implements $SituationImageCopyWith<$Res> {
  factory _$SituationImageCopyWith(_SituationImage value, $Res Function(_SituationImage) _then) = __$SituationImageCopyWithImpl;
@override @useResult
$Res call({
 String url, String credit, String sourceUrl, String license
});




}
/// @nodoc
class __$SituationImageCopyWithImpl<$Res>
    implements _$SituationImageCopyWith<$Res> {
  __$SituationImageCopyWithImpl(this._self, this._then);

  final _SituationImage _self;
  final $Res Function(_SituationImage) _then;

/// Create a copy of SituationImage
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? url = null,Object? credit = null,Object? sourceUrl = null,Object? license = null,}) {
  return _then(_SituationImage(
url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,credit: null == credit ? _self.credit : credit // ignore: cast_nullable_to_non_nullable
as String,sourceUrl: null == sourceUrl ? _self.sourceUrl : sourceUrl // ignore: cast_nullable_to_non_nullable
as String,license: null == license ? _self.license : license // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
