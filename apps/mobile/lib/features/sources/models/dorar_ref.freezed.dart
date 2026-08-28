// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'dorar_ref.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$DorarRef {

 String get rawi; String get mohdith; String get grade; String get id; String? get takhrij; List<DorarCategory> get categories;
/// Create a copy of DorarRef
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$DorarRefCopyWith<DorarRef> get copyWith => _$DorarRefCopyWithImpl<DorarRef>(this as DorarRef, _$identity);

  /// Serializes this DorarRef to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is DorarRef&&(identical(other.rawi, rawi) || other.rawi == rawi)&&(identical(other.mohdith, mohdith) || other.mohdith == mohdith)&&(identical(other.grade, grade) || other.grade == grade)&&(identical(other.id, id) || other.id == id)&&(identical(other.takhrij, takhrij) || other.takhrij == takhrij)&&const DeepCollectionEquality().equals(other.categories, categories));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,rawi,mohdith,grade,id,takhrij,const DeepCollectionEquality().hash(categories));

@override
String toString() {
  return 'DorarRef(rawi: $rawi, mohdith: $mohdith, grade: $grade, id: $id, takhrij: $takhrij, categories: $categories)';
}


}

/// @nodoc
abstract mixin class $DorarRefCopyWith<$Res>  {
  factory $DorarRefCopyWith(DorarRef value, $Res Function(DorarRef) _then) = _$DorarRefCopyWithImpl;
@useResult
$Res call({
 String rawi, String mohdith, String grade, String id, String? takhrij, List<DorarCategory> categories
});




}
/// @nodoc
class _$DorarRefCopyWithImpl<$Res>
    implements $DorarRefCopyWith<$Res> {
  _$DorarRefCopyWithImpl(this._self, this._then);

  final DorarRef _self;
  final $Res Function(DorarRef) _then;

/// Create a copy of DorarRef
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? rawi = null,Object? mohdith = null,Object? grade = null,Object? id = null,Object? takhrij = freezed,Object? categories = null,}) {
  return _then(_self.copyWith(
rawi: null == rawi ? _self.rawi : rawi // ignore: cast_nullable_to_non_nullable
as String,mohdith: null == mohdith ? _self.mohdith : mohdith // ignore: cast_nullable_to_non_nullable
as String,grade: null == grade ? _self.grade : grade // ignore: cast_nullable_to_non_nullable
as String,id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,takhrij: freezed == takhrij ? _self.takhrij : takhrij // ignore: cast_nullable_to_non_nullable
as String?,categories: null == categories ? _self.categories : categories // ignore: cast_nullable_to_non_nullable
as List<DorarCategory>,
  ));
}

}


/// Adds pattern-matching-related methods to [DorarRef].
extension DorarRefPatterns on DorarRef {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _DorarRef value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _DorarRef() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _DorarRef value)  $default,){
final _that = this;
switch (_that) {
case _DorarRef():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _DorarRef value)?  $default,){
final _that = this;
switch (_that) {
case _DorarRef() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String rawi,  String mohdith,  String grade,  String id,  String? takhrij,  List<DorarCategory> categories)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _DorarRef() when $default != null:
return $default(_that.rawi,_that.mohdith,_that.grade,_that.id,_that.takhrij,_that.categories);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String rawi,  String mohdith,  String grade,  String id,  String? takhrij,  List<DorarCategory> categories)  $default,) {final _that = this;
switch (_that) {
case _DorarRef():
return $default(_that.rawi,_that.mohdith,_that.grade,_that.id,_that.takhrij,_that.categories);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String rawi,  String mohdith,  String grade,  String id,  String? takhrij,  List<DorarCategory> categories)?  $default,) {final _that = this;
switch (_that) {
case _DorarRef() when $default != null:
return $default(_that.rawi,_that.mohdith,_that.grade,_that.id,_that.takhrij,_that.categories);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _DorarRef extends DorarRef {
  const _DorarRef({required this.rawi, required this.mohdith, required this.grade, required this.id, this.takhrij, final  List<DorarCategory> categories = const []}): _categories = categories,super._();
  factory _DorarRef.fromJson(Map<String, dynamic> json) => _$DorarRefFromJson(json);

@override final  String rawi;
@override final  String mohdith;
@override final  String grade;
@override final  String id;
@override final  String? takhrij;
 final  List<DorarCategory> _categories;
@override@JsonKey() List<DorarCategory> get categories {
  if (_categories is EqualUnmodifiableListView) return _categories;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_categories);
}


/// Create a copy of DorarRef
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$DorarRefCopyWith<_DorarRef> get copyWith => __$DorarRefCopyWithImpl<_DorarRef>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$DorarRefToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _DorarRef&&(identical(other.rawi, rawi) || other.rawi == rawi)&&(identical(other.mohdith, mohdith) || other.mohdith == mohdith)&&(identical(other.grade, grade) || other.grade == grade)&&(identical(other.id, id) || other.id == id)&&(identical(other.takhrij, takhrij) || other.takhrij == takhrij)&&const DeepCollectionEquality().equals(other._categories, _categories));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,rawi,mohdith,grade,id,takhrij,const DeepCollectionEquality().hash(_categories));

@override
String toString() {
  return 'DorarRef(rawi: $rawi, mohdith: $mohdith, grade: $grade, id: $id, takhrij: $takhrij, categories: $categories)';
}


}

/// @nodoc
abstract mixin class _$DorarRefCopyWith<$Res> implements $DorarRefCopyWith<$Res> {
  factory _$DorarRefCopyWith(_DorarRef value, $Res Function(_DorarRef) _then) = __$DorarRefCopyWithImpl;
@override @useResult
$Res call({
 String rawi, String mohdith, String grade, String id, String? takhrij, List<DorarCategory> categories
});




}
/// @nodoc
class __$DorarRefCopyWithImpl<$Res>
    implements _$DorarRefCopyWith<$Res> {
  __$DorarRefCopyWithImpl(this._self, this._then);

  final _DorarRef _self;
  final $Res Function(_DorarRef) _then;

/// Create a copy of DorarRef
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? rawi = null,Object? mohdith = null,Object? grade = null,Object? id = null,Object? takhrij = freezed,Object? categories = null,}) {
  return _then(_DorarRef(
rawi: null == rawi ? _self.rawi : rawi // ignore: cast_nullable_to_non_nullable
as String,mohdith: null == mohdith ? _self.mohdith : mohdith // ignore: cast_nullable_to_non_nullable
as String,grade: null == grade ? _self.grade : grade // ignore: cast_nullable_to_non_nullable
as String,id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,takhrij: freezed == takhrij ? _self.takhrij : takhrij // ignore: cast_nullable_to_non_nullable
as String?,categories: null == categories ? _self._categories : categories // ignore: cast_nullable_to_non_nullable
as List<DorarCategory>,
  ));
}


}


/// @nodoc
mixin _$DorarCategory {

 String get id; String get name;
/// Create a copy of DorarCategory
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$DorarCategoryCopyWith<DorarCategory> get copyWith => _$DorarCategoryCopyWithImpl<DorarCategory>(this as DorarCategory, _$identity);

  /// Serializes this DorarCategory to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is DorarCategory&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name);

@override
String toString() {
  return 'DorarCategory(id: $id, name: $name)';
}


}

/// @nodoc
abstract mixin class $DorarCategoryCopyWith<$Res>  {
  factory $DorarCategoryCopyWith(DorarCategory value, $Res Function(DorarCategory) _then) = _$DorarCategoryCopyWithImpl;
@useResult
$Res call({
 String id, String name
});




}
/// @nodoc
class _$DorarCategoryCopyWithImpl<$Res>
    implements $DorarCategoryCopyWith<$Res> {
  _$DorarCategoryCopyWithImpl(this._self, this._then);

  final DorarCategory _self;
  final $Res Function(DorarCategory) _then;

/// Create a copy of DorarCategory
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? name = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [DorarCategory].
extension DorarCategoryPatterns on DorarCategory {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _DorarCategory value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _DorarCategory() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _DorarCategory value)  $default,){
final _that = this;
switch (_that) {
case _DorarCategory():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _DorarCategory value)?  $default,){
final _that = this;
switch (_that) {
case _DorarCategory() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String name)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _DorarCategory() when $default != null:
return $default(_that.id,_that.name);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String name)  $default,) {final _that = this;
switch (_that) {
case _DorarCategory():
return $default(_that.id,_that.name);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String name)?  $default,) {final _that = this;
switch (_that) {
case _DorarCategory() when $default != null:
return $default(_that.id,_that.name);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _DorarCategory extends DorarCategory {
  const _DorarCategory({required this.id, required this.name}): super._();
  factory _DorarCategory.fromJson(Map<String, dynamic> json) => _$DorarCategoryFromJson(json);

@override final  String id;
@override final  String name;

/// Create a copy of DorarCategory
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$DorarCategoryCopyWith<_DorarCategory> get copyWith => __$DorarCategoryCopyWithImpl<_DorarCategory>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$DorarCategoryToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _DorarCategory&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name);

@override
String toString() {
  return 'DorarCategory(id: $id, name: $name)';
}


}

/// @nodoc
abstract mixin class _$DorarCategoryCopyWith<$Res> implements $DorarCategoryCopyWith<$Res> {
  factory _$DorarCategoryCopyWith(_DorarCategory value, $Res Function(_DorarCategory) _then) = __$DorarCategoryCopyWithImpl;
@override @useResult
$Res call({
 String id, String name
});




}
/// @nodoc
class __$DorarCategoryCopyWithImpl<$Res>
    implements _$DorarCategoryCopyWith<$Res> {
  __$DorarCategoryCopyWithImpl(this._self, this._then);

  final _DorarCategory _self;
  final $Res Function(_DorarCategory) _then;

/// Create a copy of DorarCategory
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? name = null,}) {
  return _then(_DorarCategory(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
