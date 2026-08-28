import 'package:freezed_annotation/freezed_annotation.dart';

part 'dorar_ref.freezed.dart';
part 'dorar_ref.g.dart';

/// The dorar.net row a citation is copied from, verbatim (`dorar_hadith.cited`).
/// `id` is their permalink (dorar.net/h/{id}); `categories` their التصنيف الموضوعي.
@freezed
abstract class DorarRef with _$DorarRef {
  const DorarRef._();

  const factory DorarRef({
    required String rawi,
    required String mohdith,
    required String grade,
    required String id,
    String? takhrij,
    @Default([]) List<DorarCategory> categories,
  }) = _DorarRef;

  factory DorarRef.fromJson(Map<String, dynamic> json) =>
      _$DorarRefFromJson(json);

  String get permalink => 'https://dorar.net/h/$id';

  /// A bracketed [صحيح] under البخاري or مسلم is the collection's own grading; the
  /// ref already says Sahih al-Bukhari, so only an outside verdict earns a field.
  bool get gradedByCollection =>
      (mohdith == 'البخاري' || mohdith == 'مسلم') && grade == '[صحيح]';

  /// One chip per top-level theme (the part before the dash).
  List<DorarCategory> get themes {
    final seen = <String>{};
    return categories
        .where((c) => seen.add(c.name.split(' - ').first))
        .toList();
  }
}

@freezed
abstract class DorarCategory with _$DorarCategory {
  const DorarCategory._();

  const factory DorarCategory({required String id, required String name}) =
      _DorarCategory;

  factory DorarCategory.fromJson(Map<String, dynamic> json) =>
      _$DorarCategoryFromJson(json);

  String get url => 'https://dorar.net/hadith-category/cat/$id';
}
