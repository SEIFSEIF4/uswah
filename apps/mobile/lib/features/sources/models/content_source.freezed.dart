// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'content_source.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$ContentSource {

/// "Quran 2:286" / "صحيح البخاري ١٤٧١", per locale.
 LocalizedText get label; BookKey? get collection; String? get original;/// House-draft translations, keyed by locale, with the credit that says so.
 Map<String, SourceTranslation> get translation; DorarRef? get dorar;
/// Create a copy of ContentSource
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ContentSourceCopyWith<ContentSource> get copyWith => _$ContentSourceCopyWithImpl<ContentSource>(this as ContentSource, _$identity);

  /// Serializes this ContentSource to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ContentSource&&const DeepCollectionEquality().equals(other.label, label)&&(identical(other.collection, collection) || other.collection == collection)&&(identical(other.original, original) || other.original == original)&&const DeepCollectionEquality().equals(other.translation, translation)&&(identical(other.dorar, dorar) || other.dorar == dorar));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(label),collection,original,const DeepCollectionEquality().hash(translation),dorar);

@override
String toString() {
  return 'ContentSource(label: $label, collection: $collection, original: $original, translation: $translation, dorar: $dorar)';
}


}

/// @nodoc
abstract mixin class $ContentSourceCopyWith<$Res>  {
  factory $ContentSourceCopyWith(ContentSource value, $Res Function(ContentSource) _then) = _$ContentSourceCopyWithImpl;
@useResult
$Res call({
 LocalizedText label, BookKey? collection, String? original, Map<String, SourceTranslation> translation, DorarRef? dorar
});


$DorarRefCopyWith<$Res>? get dorar;

}
/// @nodoc
class _$ContentSourceCopyWithImpl<$Res>
    implements $ContentSourceCopyWith<$Res> {
  _$ContentSourceCopyWithImpl(this._self, this._then);

  final ContentSource _self;
  final $Res Function(ContentSource) _then;

/// Create a copy of ContentSource
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? label = null,Object? collection = freezed,Object? original = freezed,Object? translation = null,Object? dorar = freezed,}) {
  return _then(_self.copyWith(
label: null == label ? _self.label : label // ignore: cast_nullable_to_non_nullable
as LocalizedText,collection: freezed == collection ? _self.collection : collection // ignore: cast_nullable_to_non_nullable
as BookKey?,original: freezed == original ? _self.original : original // ignore: cast_nullable_to_non_nullable
as String?,translation: null == translation ? _self.translation : translation // ignore: cast_nullable_to_non_nullable
as Map<String, SourceTranslation>,dorar: freezed == dorar ? _self.dorar : dorar // ignore: cast_nullable_to_non_nullable
as DorarRef?,
  ));
}
/// Create a copy of ContentSource
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$DorarRefCopyWith<$Res>? get dorar {
    if (_self.dorar == null) {
    return null;
  }

  return $DorarRefCopyWith<$Res>(_self.dorar!, (value) {
    return _then(_self.copyWith(dorar: value));
  });
}
}


/// Adds pattern-matching-related methods to [ContentSource].
extension ContentSourcePatterns on ContentSource {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ContentSource value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ContentSource() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ContentSource value)  $default,){
final _that = this;
switch (_that) {
case _ContentSource():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ContentSource value)?  $default,){
final _that = this;
switch (_that) {
case _ContentSource() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( LocalizedText label,  BookKey? collection,  String? original,  Map<String, SourceTranslation> translation,  DorarRef? dorar)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ContentSource() when $default != null:
return $default(_that.label,_that.collection,_that.original,_that.translation,_that.dorar);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( LocalizedText label,  BookKey? collection,  String? original,  Map<String, SourceTranslation> translation,  DorarRef? dorar)  $default,) {final _that = this;
switch (_that) {
case _ContentSource():
return $default(_that.label,_that.collection,_that.original,_that.translation,_that.dorar);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( LocalizedText label,  BookKey? collection,  String? original,  Map<String, SourceTranslation> translation,  DorarRef? dorar)?  $default,) {final _that = this;
switch (_that) {
case _ContentSource() when $default != null:
return $default(_that.label,_that.collection,_that.original,_that.translation,_that.dorar);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ContentSource extends ContentSource {
  const _ContentSource({required final  LocalizedText label, this.collection, this.original, final  Map<String, SourceTranslation> translation = const {}, this.dorar}): _label = label,_translation = translation,super._();
  factory _ContentSource.fromJson(Map<String, dynamic> json) => _$ContentSourceFromJson(json);

/// "Quran 2:286" / "صحيح البخاري ١٤٧١", per locale.
 final  LocalizedText _label;
/// "Quran 2:286" / "صحيح البخاري ١٤٧١", per locale.
@override LocalizedText get label {
  if (_label is EqualUnmodifiableMapView) return _label;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableMapView(_label);
}

@override final  BookKey? collection;
@override final  String? original;
/// House-draft translations, keyed by locale, with the credit that says so.
 final  Map<String, SourceTranslation> _translation;
/// House-draft translations, keyed by locale, with the credit that says so.
@override@JsonKey() Map<String, SourceTranslation> get translation {
  if (_translation is EqualUnmodifiableMapView) return _translation;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableMapView(_translation);
}

@override final  DorarRef? dorar;

/// Create a copy of ContentSource
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ContentSourceCopyWith<_ContentSource> get copyWith => __$ContentSourceCopyWithImpl<_ContentSource>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ContentSourceToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ContentSource&&const DeepCollectionEquality().equals(other._label, _label)&&(identical(other.collection, collection) || other.collection == collection)&&(identical(other.original, original) || other.original == original)&&const DeepCollectionEquality().equals(other._translation, _translation)&&(identical(other.dorar, dorar) || other.dorar == dorar));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(_label),collection,original,const DeepCollectionEquality().hash(_translation),dorar);

@override
String toString() {
  return 'ContentSource(label: $label, collection: $collection, original: $original, translation: $translation, dorar: $dorar)';
}


}

/// @nodoc
abstract mixin class _$ContentSourceCopyWith<$Res> implements $ContentSourceCopyWith<$Res> {
  factory _$ContentSourceCopyWith(_ContentSource value, $Res Function(_ContentSource) _then) = __$ContentSourceCopyWithImpl;
@override @useResult
$Res call({
 LocalizedText label, BookKey? collection, String? original, Map<String, SourceTranslation> translation, DorarRef? dorar
});


@override $DorarRefCopyWith<$Res>? get dorar;

}
/// @nodoc
class __$ContentSourceCopyWithImpl<$Res>
    implements _$ContentSourceCopyWith<$Res> {
  __$ContentSourceCopyWithImpl(this._self, this._then);

  final _ContentSource _self;
  final $Res Function(_ContentSource) _then;

/// Create a copy of ContentSource
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? label = null,Object? collection = freezed,Object? original = freezed,Object? translation = null,Object? dorar = freezed,}) {
  return _then(_ContentSource(
label: null == label ? _self._label : label // ignore: cast_nullable_to_non_nullable
as LocalizedText,collection: freezed == collection ? _self.collection : collection // ignore: cast_nullable_to_non_nullable
as BookKey?,original: freezed == original ? _self.original : original // ignore: cast_nullable_to_non_nullable
as String?,translation: null == translation ? _self._translation : translation // ignore: cast_nullable_to_non_nullable
as Map<String, SourceTranslation>,dorar: freezed == dorar ? _self.dorar : dorar // ignore: cast_nullable_to_non_nullable
as DorarRef?,
  ));
}

/// Create a copy of ContentSource
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$DorarRefCopyWith<$Res>? get dorar {
    if (_self.dorar == null) {
    return null;
  }

  return $DorarRefCopyWith<$Res>(_self.dorar!, (value) {
    return _then(_self.copyWith(dorar: value));
  });
}
}


/// @nodoc
mixin _$SourceTranslation {

 String get text; String get translator;
/// Create a copy of SourceTranslation
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SourceTranslationCopyWith<SourceTranslation> get copyWith => _$SourceTranslationCopyWithImpl<SourceTranslation>(this as SourceTranslation, _$identity);

  /// Serializes this SourceTranslation to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SourceTranslation&&(identical(other.text, text) || other.text == text)&&(identical(other.translator, translator) || other.translator == translator));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,text,translator);

@override
String toString() {
  return 'SourceTranslation(text: $text, translator: $translator)';
}


}

/// @nodoc
abstract mixin class $SourceTranslationCopyWith<$Res>  {
  factory $SourceTranslationCopyWith(SourceTranslation value, $Res Function(SourceTranslation) _then) = _$SourceTranslationCopyWithImpl;
@useResult
$Res call({
 String text, String translator
});




}
/// @nodoc
class _$SourceTranslationCopyWithImpl<$Res>
    implements $SourceTranslationCopyWith<$Res> {
  _$SourceTranslationCopyWithImpl(this._self, this._then);

  final SourceTranslation _self;
  final $Res Function(SourceTranslation) _then;

/// Create a copy of SourceTranslation
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? text = null,Object? translator = null,}) {
  return _then(_self.copyWith(
text: null == text ? _self.text : text // ignore: cast_nullable_to_non_nullable
as String,translator: null == translator ? _self.translator : translator // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [SourceTranslation].
extension SourceTranslationPatterns on SourceTranslation {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _SourceTranslation value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _SourceTranslation() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _SourceTranslation value)  $default,){
final _that = this;
switch (_that) {
case _SourceTranslation():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _SourceTranslation value)?  $default,){
final _that = this;
switch (_that) {
case _SourceTranslation() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String text,  String translator)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _SourceTranslation() when $default != null:
return $default(_that.text,_that.translator);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String text,  String translator)  $default,) {final _that = this;
switch (_that) {
case _SourceTranslation():
return $default(_that.text,_that.translator);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String text,  String translator)?  $default,) {final _that = this;
switch (_that) {
case _SourceTranslation() when $default != null:
return $default(_that.text,_that.translator);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _SourceTranslation implements SourceTranslation {
  const _SourceTranslation({required this.text, required this.translator});
  factory _SourceTranslation.fromJson(Map<String, dynamic> json) => _$SourceTranslationFromJson(json);

@override final  String text;
@override final  String translator;

/// Create a copy of SourceTranslation
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SourceTranslationCopyWith<_SourceTranslation> get copyWith => __$SourceTranslationCopyWithImpl<_SourceTranslation>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SourceTranslationToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SourceTranslation&&(identical(other.text, text) || other.text == text)&&(identical(other.translator, translator) || other.translator == translator));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,text,translator);

@override
String toString() {
  return 'SourceTranslation(text: $text, translator: $translator)';
}


}

/// @nodoc
abstract mixin class _$SourceTranslationCopyWith<$Res> implements $SourceTranslationCopyWith<$Res> {
  factory _$SourceTranslationCopyWith(_SourceTranslation value, $Res Function(_SourceTranslation) _then) = __$SourceTranslationCopyWithImpl;
@override @useResult
$Res call({
 String text, String translator
});




}
/// @nodoc
class __$SourceTranslationCopyWithImpl<$Res>
    implements _$SourceTranslationCopyWith<$Res> {
  __$SourceTranslationCopyWithImpl(this._self, this._then);

  final _SourceTranslation _self;
  final $Res Function(_SourceTranslation) _then;

/// Create a copy of SourceTranslation
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? text = null,Object? translator = null,}) {
  return _then(_SourceTranslation(
text: null == text ? _self.text : text // ignore: cast_nullable_to_non_nullable
as String,translator: null == translator ? _self.translator : translator // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
