import 'package:freezed_annotation/freezed_annotation.dart';

part 'saved_ids.freezed.dart';
part 'saved_ids.g.dart';

/// What the signed-in reader has saved, newest first.
@freezed
abstract class SavedIds with _$SavedIds {
  const SavedIds._();

  const factory SavedIds({
    @Default([]) List<String> situationIds,
    @Default([]) List<String> sayingIds,
  }) = _SavedIds;

  factory SavedIds.fromJson(Map<String, dynamic> json) =>
      _$SavedIdsFromJson(json);

  bool get isEmpty => situationIds.isEmpty && sayingIds.isEmpty;
}
