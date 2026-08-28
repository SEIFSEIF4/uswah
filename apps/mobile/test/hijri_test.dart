import 'package:flutter_test/flutter_test.dart';
import 'package:uswah/core/utils/hijri_date.dart';
import 'package:uswah/features/today/providers/today_provider.dart';

void main() {
  test('tabular hijri: 2026-08-28 falls in Rabi al-Awwal 1448', () {
    final h = HijriDate.fromDate(DateTime(2026, 8, 28));
    expect(h.year, 1448);
    expect(h.month, 3);
    expect(h.day, inInclusiveRange(13, 16));
    // Known anchor: 1 Muharram 1 AH = 16 July 622 (Julian) → tabular epoch check.
    final epoch = HijriDate.fromDate(DateTime(2024, 7, 7)); // 1 Muharram 1446
    expect((epoch.year, epoch.month), (1446, 1));
  });

  test('daily pick is deterministic and repeat-free within a cycle', () {
    final pool = List.generate(18, (i) => 'item$i');
    final a = pickForDay(pool, 20000);
    expect(a, pickForDay(pool, 20000));
    final cycle = {for (var d = 0; d < 18; d++) pickForDay(pool, 18 * 100 + d)};
    expect(cycle.length, 18);
    expect(pickForDay(<String>[], 1), isNull);
  });
}
