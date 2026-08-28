import 'package:flutter/material.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/extensions/map_ext.dart';
import '../../../core/extensions/string_ext.dart';
import '../../../l10n/app_localizations.dart';
import '../models/saying.dart';

String gradeLabel(AppLocalizations l10n, Grade g) => switch (g) {
  Grade.quran => l10n.gradeQuran,
  Grade.sahih => l10n.gradeSahih,
  Grade.hasan => l10n.gradeHasan,
  Grade.disputed => l10n.gradeDisputed,
  Grade.historical => l10n.gradeHistorical,
};

/// True when the source label already opens with the grade word ("Sahih" before
/// "Sahih al-Bukhari 1471"), so a badge beside it would double it.
bool gradeInLabel(AppLocalizations l10n, Saying q, String lang) => q
    .source
    .label
    .of(lang)
    .stripMarks
    .startsWith(gradeLabel(l10n, q.grade).stripMarks);

/// The grade as a small tinted pill: green for Quran/Sahih, blue hasan, amber disputed.
class GradeBadge extends StatelessWidget {
  const GradeBadge(this.grade, {super.key});

  final Grade grade;

  @override
  Widget build(BuildContext context) {
    final u = context.uswah;
    final color = switch (grade) {
      Grade.quran || Grade.sahih => u.gradeStrong,
      Grade.hasan => u.gradeHasan,
      Grade.disputed => u.gradeDisputed,
      Grade.historical => context.colors.onSurfaceVariant,
    };
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3),
      decoration: BoxDecoration(
        color: color.withValues(alpha: .12),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        gradeLabel(context.l10n, grade),
        style: context.text.labelMedium!.copyWith(
          color: color,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
