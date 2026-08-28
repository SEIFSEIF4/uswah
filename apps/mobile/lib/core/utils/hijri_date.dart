/// Tabular (arithmetic) Islamic calendar, the "Kuwaiti algorithm".
/// ponytail: can differ by a day from Umm al-Qura around month starts; swap in a
/// sighting-based table if that ever matters to readers.
class HijriDate {
  const HijriDate(this.year, this.month, this.day);

  final int year;

  /// 1 = Muharram … 12 = Dhu al-Hijjah
  final int month;
  final int day;

  // The published algorithm assumes floor division; Dart's ~/ truncates toward
  // zero, which is off by one whenever an intermediate goes negative.
  static int _div(int a, int b) => (a / b).floor();

  factory HijriDate.fromDate(DateTime date) {
    final y = date.year;
    final m = date.month;
    final d = date.day;
    final a = _div(m - 14, 12);
    final jd =
        _div(1461 * (y + 4800 + a), 4) +
        _div(367 * (m - 2 - 12 * a), 12) -
        _div(3 * _div(y + 4900 + a, 100), 4) +
        d -
        32075;

    var l = jd - 1948440 + 10632;
    final n = _div(l - 1, 10631);
    l = l - 10631 * n + 354;
    final j =
        _div(10985 - l, 5316) * _div(50 * l, 17719) +
        _div(l, 5670) * _div(43 * l, 15238);
    l =
        l -
        _div(30 - j, 15) * _div(17719 * j, 50) -
        _div(j, 16) * _div(15238 * j, 43) +
        29;
    final month = _div(24 * l, 709);
    final day = l - _div(709 * month, 24);
    final year = 30 * n + j - 30;
    return HijriDate(year, month, day);
  }
}
