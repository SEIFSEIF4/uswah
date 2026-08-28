// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'saved_ids.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$SavedIds {

 List<String> get situationIds; List<String> get sayingIds;
/// Create a copy of SavedIds
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SavedIdsCopyWith<SavedIds> get copyWith => _$SavedIdsCopyWithImpl<SavedIds>(this as SavedIds, _$identity);

  /// Serializes this SavedIds to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SavedIds&&const DeepCollectionEquality().equals(other.situationIds, situationIds)&&const DeepCollectionEquality().equals(other.sayingIds, sayingIds));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(situationIds),const DeepCollectionEquality().hash(sayingIds));

@override
String toString() {
  return 'SavedIds(situationIds: $situationIds, sayingIds: $sayingIds)';
}


}

/// @nodoc
abstract mixin class $SavedIdsCopyWith<$Res>  {
  factory $SavedIdsCopyWith(SavedIds value, $Res Function(SavedIds) _then) = _$SavedIdsCopyWithImpl;
@useResult
$Res call({
 List<String> situationIds, List<String> sayingIds
});




}
/// @nodoc
class _$SavedIdsCopyWithImpl<$Res>
    implements $SavedIdsCopyWith<$Res> {
  _$SavedIdsCopyWithImpl(this._self, this._then);

  final SavedIds _self;
  final $Res Function(SavedIds) _then;

/// Create a copy of SavedIds
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? situationIds = null,Object? sayingIds = null,}) {
  return _then(_self.copyWith(
situationIds: null == situationIds ? _self.situationIds : situationIds // ignore: cast_nullable_to_non_nullable
as List<String>,sayingIds: null == sayingIds ? _self.sayingIds : sayingIds // ignore: cast_nullable_to_non_nullable
as List<String>,
  ));
}

}


/// Adds pattern-matching-related methods to [SavedIds].
extension SavedIdsPatterns on SavedIds {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _SavedIds value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _SavedIds() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _SavedIds value)  $default,){
final _that = this;
switch (_that) {
case _SavedIds():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _SavedIds value)?  $default,){
final _that = this;
switch (_that) {
case _SavedIds() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( List<String> situationIds,  List<String> sayingIds)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _SavedIds() when $default != null:
return $default(_that.situationIds,_that.sayingIds);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( List<String> situationIds,  List<String> sayingIds)  $default,) {final _that = this;
switch (_that) {
case _SavedIds():
return $default(_that.situationIds,_that.sayingIds);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( List<String> situationIds,  List<String> sayingIds)?  $default,) {final _that = this;
switch (_that) {
case _SavedIds() when $default != null:
return $default(_that.situationIds,_that.sayingIds);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _SavedIds extends SavedIds {
  const _SavedIds({final  List<String> situationIds = const [], final  List<String> sayingIds = const []}): _situationIds = situationIds,_sayingIds = sayingIds,super._();
  factory _SavedIds.fromJson(Map<String, dynamic> json) => _$SavedIdsFromJson(json);

 final  List<String> _situationIds;
@override@JsonKey() List<String> get situationIds {
  if (_situationIds is EqualUnmodifiableListView) return _situationIds;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_situationIds);
}

 final  List<String> _sayingIds;
@override@JsonKey() List<String> get sayingIds {
  if (_sayingIds is EqualUnmodifiableListView) return _sayingIds;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_sayingIds);
}


/// Create a copy of SavedIds
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SavedIdsCopyWith<_SavedIds> get copyWith => __$SavedIdsCopyWithImpl<_SavedIds>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SavedIdsToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SavedIds&&const DeepCollectionEquality().equals(other._situationIds, _situationIds)&&const DeepCollectionEquality().equals(other._sayingIds, _sayingIds));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(_situationIds),const DeepCollectionEquality().hash(_sayingIds));

@override
String toString() {
  return 'SavedIds(situationIds: $situationIds, sayingIds: $sayingIds)';
}


}

/// @nodoc
abstract mixin class _$SavedIdsCopyWith<$Res> implements $SavedIdsCopyWith<$Res> {
  factory _$SavedIdsCopyWith(_SavedIds value, $Res Function(_SavedIds) _then) = __$SavedIdsCopyWithImpl;
@override @useResult
$Res call({
 List<String> situationIds, List<String> sayingIds
});




}
/// @nodoc
class __$SavedIdsCopyWithImpl<$Res>
    implements _$SavedIdsCopyWith<$Res> {
  __$SavedIdsCopyWithImpl(this._self, this._then);

  final _SavedIds _self;
  final $Res Function(_SavedIds) _then;

/// Create a copy of SavedIds
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? situationIds = null,Object? sayingIds = null,}) {
  return _then(_SavedIds(
situationIds: null == situationIds ? _self._situationIds : situationIds // ignore: cast_nullable_to_non_nullable
as List<String>,sayingIds: null == sayingIds ? _self._sayingIds : sayingIds // ignore: cast_nullable_to_non_nullable
as List<String>,
  ));
}


}

// dart format on
