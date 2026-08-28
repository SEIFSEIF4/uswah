// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'day_leaf.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$DayLeaf {

 DateTime get date;/// 0 = today, 1 = yesterday …
 int get daysAgo; Situation get situation; Intention? get intention;
/// Create a copy of DayLeaf
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$DayLeafCopyWith<DayLeaf> get copyWith => _$DayLeafCopyWithImpl<DayLeaf>(this as DayLeaf, _$identity);

  /// Serializes this DayLeaf to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is DayLeaf&&(identical(other.date, date) || other.date == date)&&(identical(other.daysAgo, daysAgo) || other.daysAgo == daysAgo)&&(identical(other.situation, situation) || other.situation == situation)&&(identical(other.intention, intention) || other.intention == intention));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,date,daysAgo,situation,intention);

@override
String toString() {
  return 'DayLeaf(date: $date, daysAgo: $daysAgo, situation: $situation, intention: $intention)';
}


}

/// @nodoc
abstract mixin class $DayLeafCopyWith<$Res>  {
  factory $DayLeafCopyWith(DayLeaf value, $Res Function(DayLeaf) _then) = _$DayLeafCopyWithImpl;
@useResult
$Res call({
 DateTime date, int daysAgo, Situation situation, Intention? intention
});


$SituationCopyWith<$Res> get situation;$IntentionCopyWith<$Res>? get intention;

}
/// @nodoc
class _$DayLeafCopyWithImpl<$Res>
    implements $DayLeafCopyWith<$Res> {
  _$DayLeafCopyWithImpl(this._self, this._then);

  final DayLeaf _self;
  final $Res Function(DayLeaf) _then;

/// Create a copy of DayLeaf
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? date = null,Object? daysAgo = null,Object? situation = null,Object? intention = freezed,}) {
  return _then(_self.copyWith(
date: null == date ? _self.date : date // ignore: cast_nullable_to_non_nullable
as DateTime,daysAgo: null == daysAgo ? _self.daysAgo : daysAgo // ignore: cast_nullable_to_non_nullable
as int,situation: null == situation ? _self.situation : situation // ignore: cast_nullable_to_non_nullable
as Situation,intention: freezed == intention ? _self.intention : intention // ignore: cast_nullable_to_non_nullable
as Intention?,
  ));
}
/// Create a copy of DayLeaf
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SituationCopyWith<$Res> get situation {
  
  return $SituationCopyWith<$Res>(_self.situation, (value) {
    return _then(_self.copyWith(situation: value));
  });
}/// Create a copy of DayLeaf
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$IntentionCopyWith<$Res>? get intention {
    if (_self.intention == null) {
    return null;
  }

  return $IntentionCopyWith<$Res>(_self.intention!, (value) {
    return _then(_self.copyWith(intention: value));
  });
}
}


/// Adds pattern-matching-related methods to [DayLeaf].
extension DayLeafPatterns on DayLeaf {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _DayLeaf value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _DayLeaf() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _DayLeaf value)  $default,){
final _that = this;
switch (_that) {
case _DayLeaf():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _DayLeaf value)?  $default,){
final _that = this;
switch (_that) {
case _DayLeaf() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( DateTime date,  int daysAgo,  Situation situation,  Intention? intention)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _DayLeaf() when $default != null:
return $default(_that.date,_that.daysAgo,_that.situation,_that.intention);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( DateTime date,  int daysAgo,  Situation situation,  Intention? intention)  $default,) {final _that = this;
switch (_that) {
case _DayLeaf():
return $default(_that.date,_that.daysAgo,_that.situation,_that.intention);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( DateTime date,  int daysAgo,  Situation situation,  Intention? intention)?  $default,) {final _that = this;
switch (_that) {
case _DayLeaf() when $default != null:
return $default(_that.date,_that.daysAgo,_that.situation,_that.intention);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _DayLeaf extends DayLeaf {
  const _DayLeaf({required this.date, required this.daysAgo, required this.situation, this.intention}): super._();
  factory _DayLeaf.fromJson(Map<String, dynamic> json) => _$DayLeafFromJson(json);

@override final  DateTime date;
/// 0 = today, 1 = yesterday …
@override final  int daysAgo;
@override final  Situation situation;
@override final  Intention? intention;

/// Create a copy of DayLeaf
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$DayLeafCopyWith<_DayLeaf> get copyWith => __$DayLeafCopyWithImpl<_DayLeaf>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$DayLeafToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _DayLeaf&&(identical(other.date, date) || other.date == date)&&(identical(other.daysAgo, daysAgo) || other.daysAgo == daysAgo)&&(identical(other.situation, situation) || other.situation == situation)&&(identical(other.intention, intention) || other.intention == intention));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,date,daysAgo,situation,intention);

@override
String toString() {
  return 'DayLeaf(date: $date, daysAgo: $daysAgo, situation: $situation, intention: $intention)';
}


}

/// @nodoc
abstract mixin class _$DayLeafCopyWith<$Res> implements $DayLeafCopyWith<$Res> {
  factory _$DayLeafCopyWith(_DayLeaf value, $Res Function(_DayLeaf) _then) = __$DayLeafCopyWithImpl;
@override @useResult
$Res call({
 DateTime date, int daysAgo, Situation situation, Intention? intention
});


@override $SituationCopyWith<$Res> get situation;@override $IntentionCopyWith<$Res>? get intention;

}
/// @nodoc
class __$DayLeafCopyWithImpl<$Res>
    implements _$DayLeafCopyWith<$Res> {
  __$DayLeafCopyWithImpl(this._self, this._then);

  final _DayLeaf _self;
  final $Res Function(_DayLeaf) _then;

/// Create a copy of DayLeaf
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? date = null,Object? daysAgo = null,Object? situation = null,Object? intention = freezed,}) {
  return _then(_DayLeaf(
date: null == date ? _self.date : date // ignore: cast_nullable_to_non_nullable
as DateTime,daysAgo: null == daysAgo ? _self.daysAgo : daysAgo // ignore: cast_nullable_to_non_nullable
as int,situation: null == situation ? _self.situation : situation // ignore: cast_nullable_to_non_nullable
as Situation,intention: freezed == intention ? _self.intention : intention // ignore: cast_nullable_to_non_nullable
as Intention?,
  ));
}

/// Create a copy of DayLeaf
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$SituationCopyWith<$Res> get situation {
  
  return $SituationCopyWith<$Res>(_self.situation, (value) {
    return _then(_self.copyWith(situation: value));
  });
}/// Create a copy of DayLeaf
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$IntentionCopyWith<$Res>? get intention {
    if (_self.intention == null) {
    return null;
  }

  return $IntentionCopyWith<$Res>(_self.intention!, (value) {
    return _then(_self.copyWith(intention: value));
  });
}
}

// dart format on
