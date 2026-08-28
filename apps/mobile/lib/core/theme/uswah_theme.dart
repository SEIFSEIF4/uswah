import 'package:flutter/material.dart';

/// Editorial tokens the Material scheme has no slot for, plus the locale-aware
/// text roles the web sets in CSS. Read with `context.uswah`.
@immutable
class UswahTheme extends ThemeExtension<UswahTheme> {
  const UswahTheme({
    required this.brand,
    required this.faint,
    required this.rule,
    required this.surface,
    required this.gradeStrong,
    required this.gradeHasan,
    required this.gradeDisputed,
    required this.display,
    required this.body,
    required this.label,
    required this.scripture,
    required this.isArabic,
  });

  final Color brand;
  final Color faint;
  final Color rule;
  final Color surface;
  final Color gradeStrong;
  final Color gradeHasan;
  final Color gradeDisputed;

  /// Headline face: Newsreader, or Thmanyah Serif Display for Arabic.
  final TextStyle display;

  /// Running text: Newsreader, or Thmanyah Serif Text for Arabic.
  final TextStyle body;

  /// Small labelling work: Inter, or Thmanyah Serif Text for Arabic.
  final TextStyle label;

  /// Quran and hadith only.
  final TextStyle scripture;

  final bool isArabic;

  @override
  UswahTheme copyWith() => this;

  @override
  UswahTheme lerp(UswahTheme? other, double t) =>
      t < .5 ? this : (other ?? this);
}
