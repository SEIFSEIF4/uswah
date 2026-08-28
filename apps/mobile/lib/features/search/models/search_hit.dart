import 'package:freezed_annotation/freezed_annotation.dart';

part 'search_hit.freezed.dart';
part 'search_hit.g.dart';

enum SearchKind { situation, saying, intention }

/// One index over everything a reader can look for. `match` carries every
/// language, because the readers are trilingual; `title` and `summary` are the
/// reading locale's.
@freezed
abstract class SearchHit with _$SearchHit {
  const factory SearchHit({
    required SearchKind kind,
    required String slug,

    /// In-app route the hit lands on.
    required String route,
    required String title,
    required String summary,
    required String match,
  }) = _SearchHit;

  factory SearchHit.fromJson(Map<String, dynamic> json) =>
      _$SearchHitFromJson(json);
}
