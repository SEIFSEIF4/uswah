import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/extensions/map_ext.dart';
import '../../../core/extensions/string_ext.dart';
import '../../../core/widgets/leaf.dart';
import '../../saved/providers/saved_provider.dart';
import '../models/saying.dart';
import 'grade_badge.dart';

/// A saying on its own sheet: the phrase, how close it is, then the grade and ref.
class SayingRow extends ConsumerWidget {
  const SayingRow(this.q, {this.showCloseness = true, super.key});

  final Saying q;
  final bool showCloseness;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lang = context.lang;
    final l10n = context.l10n;
    final saying = q.sayingFor(lang);
    final saved = ref.watch(isSayingSavedProvider(q.id));
    final hideBadge = gradeInLabel(l10n, q, lang);

    return Stack(
      fit: StackFit.passthrough,
      clipBehavior: Clip.none,
      children: [
        Leaf(
          quiet: true,
          onTap: () => context.push('/quotes/${q.slug}'),
          padding: const EdgeInsets.fromLTRB(18, 18, 18, 16),
          child: Column(
            crossAxisAlignment: .start,
            children: [
              Directionality(
                textDirection: saying.isArabicScript ? .rtl : .ltr,
                child: Text(
                  '“$saying”',
                  style: context.text.titleLarge,
                  textAlign: .start,
                ),
              ),
              if (showCloseness) ...[
                const SizedBox(height: 8),
                Text(
                  q.text(lang).closeness,
                  style: context.text.bodySmall,
                  maxLines: 3,
                  overflow: .ellipsis,
                ),
              ],
              const SizedBox(height: 12),
              Wrap(
                spacing: 10,
                runSpacing: 6,
                crossAxisAlignment: .center,
                children: [
                  if (!hideBadge) GradeBadge(q.grade),
                  Text(
                    q.source.label.of(lang),
                    style: context.text.labelMedium,
                  ),
                  if (!q.grade.storable)
                    Text(
                      l10n.pendingReviewer,
                      style: context.text.labelMedium!.copyWith(
                        color: context.uswah.faint,
                      ),
                    ),
                ],
              ),
            ],
          ),
        ),
        if (saved)
          PositionedDirectional(
            top: -2,
            end: 22,
            child: const BookmarkRibbon(size: 18),
          ),
      ],
    );
  }
}
