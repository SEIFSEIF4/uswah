// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'intention.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Intention {

 String get id; String get slug; ActGroup get group;/// The ordinary act, before any reframing.
 LocalizedText get act; ContentSource get source; IntentionText get en; IntentionText get ar; IntentionText get tr;
/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$IntentionCopyWith<Intention> get copyWith => _$IntentionCopyWithImpl<Intention>(this as Intention, _$identity);

  /// Serializes this Intention to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Intention&&(identical(other.id, id) || other.id == id)&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.group, group) || other.group == group)&&const DeepCollectionEquality().equals(other.act, act)&&(identical(other.source, source) || other.source == source)&&(identical(other.en, en) || other.en == en)&&(identical(other.ar, ar) || other.ar == ar)&&(identical(other.tr, tr) || other.tr == tr));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,slug,group,const DeepCollectionEquality().hash(act),source,en,ar,tr);

@override
String toString() {
  return 'Intention(id: $id, slug: $slug, group: $group, act: $act, source: $source, en: $en, ar: $ar, tr: $tr)';
}


}

/// @nodoc
abstract mixin class $IntentionCopyWith<$Res>  {
  factory $IntentionCopyWith(Intention value, $Res Function(Intention) _then) = _$IntentionCopyWithImpl;
@useResult
$Res call({
 String id, String slug, ActGroup group, LocalizedText act, ContentSource source, IntentionText en, IntentionText ar, IntentionText tr
});


$ContentSourceCopyWith<$Res> get source;$IntentionTextCopyWith<$Res> get en;$IntentionTextCopyWith<$Res> get ar;$IntentionTextCopyWith<$Res> get tr;

}
/// @nodoc
class _$IntentionCopyWithImpl<$Res>
    implements $IntentionCopyWith<$Res> {
  _$IntentionCopyWithImpl(this._self, this._then);

  final Intention _self;
  final $Res Function(Intention) _then;

/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? slug = null,Object? group = null,Object? act = null,Object? source = null,Object? en = null,Object? ar = null,Object? tr = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,group: null == group ? _self.group : group // ignore: cast_nullable_to_non_nullable
as ActGroup,act: null == act ? _self.act : act // ignore: cast_nullable_to_non_nullable
as LocalizedText,source: null == source ? _self.source : source // ignore: cast_nullable_to_non_nullable
as ContentSource,en: null == en ? _self.en : en // ignore: cast_nullable_to_non_nullable
as IntentionText,ar: null == ar ? _self.ar : ar // ignore: cast_nullable_to_non_nullable
as IntentionText,tr: null == tr ? _self.tr : tr // ignore: cast_nullable_to_non_nullable
as IntentionText,
  ));
}
/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ContentSourceCopyWith<$Res> get source {
  
  return $ContentSourceCopyWith<$Res>(_self.source, (value) {
    return _then(_self.copyWith(source: value));
  });
}/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$IntentionTextCopyWith<$Res> get en {
  
  return $IntentionTextCopyWith<$Res>(_self.en, (value) {
    return _then(_self.copyWith(en: value));
  });
}/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$IntentionTextCopyWith<$Res> get ar {
  
  return $IntentionTextCopyWith<$Res>(_self.ar, (value) {
    return _then(_self.copyWith(ar: value));
  });
}/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$IntentionTextCopyWith<$Res> get tr {
  
  return $IntentionTextCopyWith<$Res>(_self.tr, (value) {
    return _then(_self.copyWith(tr: value));
  });
}
}


/// Adds pattern-matching-related methods to [Intention].
extension IntentionPatterns on Intention {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Intention value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Intention() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Intention value)  $default,){
final _that = this;
switch (_that) {
case _Intention():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Intention value)?  $default,){
final _that = this;
switch (_that) {
case _Intention() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String slug,  ActGroup group,  LocalizedText act,  ContentSource source,  IntentionText en,  IntentionText ar,  IntentionText tr)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Intention() when $default != null:
return $default(_that.id,_that.slug,_that.group,_that.act,_that.source,_that.en,_that.ar,_that.tr);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String slug,  ActGroup group,  LocalizedText act,  ContentSource source,  IntentionText en,  IntentionText ar,  IntentionText tr)  $default,) {final _that = this;
switch (_that) {
case _Intention():
return $default(_that.id,_that.slug,_that.group,_that.act,_that.source,_that.en,_that.ar,_that.tr);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String slug,  ActGroup group,  LocalizedText act,  ContentSource source,  IntentionText en,  IntentionText ar,  IntentionText tr)?  $default,) {final _that = this;
switch (_that) {
case _Intention() when $default != null:
return $default(_that.id,_that.slug,_that.group,_that.act,_that.source,_that.en,_that.ar,_that.tr);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Intention extends Intention {
  const _Intention({required this.id, required this.slug, required this.group, required final  LocalizedText act, required this.source, required this.en, required this.ar, required this.tr}): _act = act,super._();
  factory _Intention.fromJson(Map<String, dynamic> json) => _$IntentionFromJson(json);

@override final  String id;
@override final  String slug;
@override final  ActGroup group;
/// The ordinary act, before any reframing.
 final  LocalizedText _act;
/// The ordinary act, before any reframing.
@override LocalizedText get act {
  if (_act is EqualUnmodifiableMapView) return _act;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableMapView(_act);
}

@override final  ContentSource source;
@override final  IntentionText en;
@override final  IntentionText ar;
@override final  IntentionText tr;

/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$IntentionCopyWith<_Intention> get copyWith => __$IntentionCopyWithImpl<_Intention>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$IntentionToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Intention&&(identical(other.id, id) || other.id == id)&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.group, group) || other.group == group)&&const DeepCollectionEquality().equals(other._act, _act)&&(identical(other.source, source) || other.source == source)&&(identical(other.en, en) || other.en == en)&&(identical(other.ar, ar) || other.ar == ar)&&(identical(other.tr, tr) || other.tr == tr));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,slug,group,const DeepCollectionEquality().hash(_act),source,en,ar,tr);

@override
String toString() {
  return 'Intention(id: $id, slug: $slug, group: $group, act: $act, source: $source, en: $en, ar: $ar, tr: $tr)';
}


}

/// @nodoc
abstract mixin class _$IntentionCopyWith<$Res> implements $IntentionCopyWith<$Res> {
  factory _$IntentionCopyWith(_Intention value, $Res Function(_Intention) _then) = __$IntentionCopyWithImpl;
@override @useResult
$Res call({
 String id, String slug, ActGroup group, LocalizedText act, ContentSource source, IntentionText en, IntentionText ar, IntentionText tr
});


@override $ContentSourceCopyWith<$Res> get source;@override $IntentionTextCopyWith<$Res> get en;@override $IntentionTextCopyWith<$Res> get ar;@override $IntentionTextCopyWith<$Res> get tr;

}
/// @nodoc
class __$IntentionCopyWithImpl<$Res>
    implements _$IntentionCopyWith<$Res> {
  __$IntentionCopyWithImpl(this._self, this._then);

  final _Intention _self;
  final $Res Function(_Intention) _then;

/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? slug = null,Object? group = null,Object? act = null,Object? source = null,Object? en = null,Object? ar = null,Object? tr = null,}) {
  return _then(_Intention(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,group: null == group ? _self.group : group // ignore: cast_nullable_to_non_nullable
as ActGroup,act: null == act ? _self._act : act // ignore: cast_nullable_to_non_nullable
as LocalizedText,source: null == source ? _self.source : source // ignore: cast_nullable_to_non_nullable
as ContentSource,en: null == en ? _self.en : en // ignore: cast_nullable_to_non_nullable
as IntentionText,ar: null == ar ? _self.ar : ar // ignore: cast_nullable_to_non_nullable
as IntentionText,tr: null == tr ? _self.tr : tr // ignore: cast_nullable_to_non_nullable
as IntentionText,
  ));
}

/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ContentSourceCopyWith<$Res> get source {
  
  return $ContentSourceCopyWith<$Res>(_self.source, (value) {
    return _then(_self.copyWith(source: value));
  });
}/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$IntentionTextCopyWith<$Res> get en {
  
  return $IntentionTextCopyWith<$Res>(_self.en, (value) {
    return _then(_self.copyWith(en: value));
  });
}/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$IntentionTextCopyWith<$Res> get ar {
  
  return $IntentionTextCopyWith<$Res>(_self.ar, (value) {
    return _then(_self.copyWith(ar: value));
  });
}/// Create a copy of Intention
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$IntentionTextCopyWith<$Res> get tr {
  
  return $IntentionTextCopyWith<$Res>(_self.tr, (value) {
    return _then(_self.copyWith(tr: value));
  });
}
}


/// @nodoc
mixin _$IntentionText {

 String get intention; String get note;
/// Create a copy of IntentionText
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$IntentionTextCopyWith<IntentionText> get copyWith => _$IntentionTextCopyWithImpl<IntentionText>(this as IntentionText, _$identity);

  /// Serializes this IntentionText to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is IntentionText&&(identical(other.intention, intention) || other.intention == intention)&&(identical(other.note, note) || other.note == note));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,intention,note);

@override
String toString() {
  return 'IntentionText(intention: $intention, note: $note)';
}


}

/// @nodoc
abstract mixin class $IntentionTextCopyWith<$Res>  {
  factory $IntentionTextCopyWith(IntentionText value, $Res Function(IntentionText) _then) = _$IntentionTextCopyWithImpl;
@useResult
$Res call({
 String intention, String note
});




}
/// @nodoc
class _$IntentionTextCopyWithImpl<$Res>
    implements $IntentionTextCopyWith<$Res> {
  _$IntentionTextCopyWithImpl(this._self, this._then);

  final IntentionText _self;
  final $Res Function(IntentionText) _then;

/// Create a copy of IntentionText
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? intention = null,Object? note = null,}) {
  return _then(_self.copyWith(
intention: null == intention ? _self.intention : intention // ignore: cast_nullable_to_non_nullable
as String,note: null == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [IntentionText].
extension IntentionTextPatterns on IntentionText {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _IntentionText value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _IntentionText() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _IntentionText value)  $default,){
final _that = this;
switch (_that) {
case _IntentionText():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _IntentionText value)?  $default,){
final _that = this;
switch (_that) {
case _IntentionText() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String intention,  String note)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _IntentionText() when $default != null:
return $default(_that.intention,_that.note);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String intention,  String note)  $default,) {final _that = this;
switch (_that) {
case _IntentionText():
return $default(_that.intention,_that.note);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String intention,  String note)?  $default,) {final _that = this;
switch (_that) {
case _IntentionText() when $default != null:
return $default(_that.intention,_that.note);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _IntentionText implements IntentionText {
  const _IntentionText({required this.intention, required this.note});
  factory _IntentionText.fromJson(Map<String, dynamic> json) => _$IntentionTextFromJson(json);

@override final  String intention;
@override final  String note;

/// Create a copy of IntentionText
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$IntentionTextCopyWith<_IntentionText> get copyWith => __$IntentionTextCopyWithImpl<_IntentionText>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$IntentionTextToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _IntentionText&&(identical(other.intention, intention) || other.intention == intention)&&(identical(other.note, note) || other.note == note));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,intention,note);

@override
String toString() {
  return 'IntentionText(intention: $intention, note: $note)';
}


}

/// @nodoc
abstract mixin class _$IntentionTextCopyWith<$Res> implements $IntentionTextCopyWith<$Res> {
  factory _$IntentionTextCopyWith(_IntentionText value, $Res Function(_IntentionText) _then) = __$IntentionTextCopyWithImpl;
@override @useResult
$Res call({
 String intention, String note
});




}
/// @nodoc
class __$IntentionTextCopyWithImpl<$Res>
    implements _$IntentionTextCopyWith<$Res> {
  __$IntentionTextCopyWithImpl(this._self, this._then);

  final _IntentionText _self;
  final $Res Function(_IntentionText) _then;

/// Create a copy of IntentionText
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? intention = null,Object? note = null,}) {
  return _then(_IntentionText(
intention: null == intention ? _self.intention : intention // ignore: cast_nullable_to_non_nullable
as String,note: null == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
