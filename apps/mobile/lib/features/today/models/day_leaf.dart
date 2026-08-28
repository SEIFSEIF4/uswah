import 'package:freezed_annotation/freezed_annotation.dart';

import '../../intentions/models/intention.dart';
import '../../situations/models/situation.dart';

part 'day_leaf.freezed.dart';
part 'day_leaf.g.dart';

/// One day's page: the situation to read and the intention that closes it.
@freezed
abstract class DayLeaf with _$DayLeaf {
  const DayLeaf._();

  const factory DayLeaf({
    required DateTime date,

    /// 0 = today, 1 = yesterday …
    required int daysAgo,
    required Situation situation,
    Intention? intention,
  }) = _DayLeaf;

  factory DayLeaf.fromJson(Map<String, dynamic> json) =>
      _$DayLeafFromJson(json);
}
