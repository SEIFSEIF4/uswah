import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/extensions/map_ext.dart';
import '../../../core/utils/hijri_date.dart';
import '../../../core/widgets/app_image.dart';
import '../../../core/widgets/leaf.dart';
import '../../../l10n/app_localizations.dart';
import '../../saved/providers/saved_provider.dart';
import '../../situations/widgets/meta_row.dart';
import '../models/day_leaf.dart';

String hijriMonth(AppLocalizations l10n, int m) => switch (m) {
  1 => l10n.hijri1,
  2 => l10n.hijri2,
  3 => l10n.hijri3,
  4 => l10n.hijri4,
  5 => l10n.hijri5,
  6 => l10n.hijri6,
  7 => l10n.hijri7,
  8 => l10n.hijri8,
  9 => l10n.hijri9,
  10 => l10n.hijri10,
  11 => l10n.hijri11,
  _ => l10n.hijri12,
};

/// One day on one sheet: the dateline, the painting, the situation, the day's
/// intention as the closing line. A saved sheet wears the ribbon over its corner.
class DayLeafCard extends ConsumerWidget {
  const DayLeafCard(this.leaf, {this.lifted = false, super.key});

  final DayLeaf leaf;
  final bool lifted;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final lang = context.lang;
    final u = context.uswah;
    final s = leaf.situation;
    final t = s.text(lang);
    final saved = ref.watch(isSituationSavedProvider(s.id));
    final h = HijriDate.fromDate(leaf.date);
    final relative = switch (leaf.daysAgo) {
      0 => l10n.today,
      1 => l10n.yesterday,
      final n => l10n.daysAgo(n),
    };
    final gregorian = DateFormat.MMMMEEEEd(lang).format(leaf.date);

    // The ribbon sits outside the clipping sheet so it can hang over the edge.
    return Stack(
      fit: StackFit.passthrough,
      clipBehavior: Clip.none,
      children: [
        Leaf(
          lifted: lifted,
          padding: EdgeInsets.zero,
          clip: true,
          child: Column(
            crossAxisAlignment: .stretch,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(22, 16, 22, 10),
                child: Row(
                  crossAxisAlignment: .start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: .start,
                        children: [
                          Text(
                            relative,
                            style: context.text.titleSmall!.copyWith(
                              color: u.brand,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(gregorian, style: context.text.labelMedium),
                          Text(
                            '${h.day} ${hijriMonth(l10n, h.month)} ${h.year}',
                            style: context.text.labelMedium,
                          ),
                        ],
                      ),
                    ),
                    Image.asset(
                      'assets/images/mark.png',
                      width: 30,
                      height: 30,
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 14),
                child: AppImage(s.image.url, aspectRatio: 16 / 10, radius: 12),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(22, 18, 22, 0),
                child: Column(
                  crossAxisAlignment: .start,
                  children: [
                    Text(
                      t.title,
                      style: context.text.headlineMedium,
                      maxLines: 3,
                      overflow: .ellipsis,
                    ),
                    const SizedBox(height: 8),
                    MetaRow(s),
                    const SizedBox(height: 12),
                    Text(
                      t.summary,
                      style: context.text.bodyMedium!.copyWith(
                        color: context.colors.onSurfaceVariant,
                      ),
                      maxLines: 4,
                      overflow: .ellipsis,
                    ),
                    const SizedBox(height: 18),
                    FilledButton.icon(
                      onPressed: () => context.push('/${s.slug}'),
                      icon: Icon(
                        context.isRtl ? Icons.arrow_back : Icons.arrow_forward,
                        size: 18,
                      ),
                      iconAlignment: .end,
                      label: Text(l10n.read),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              if (leaf.intention case final i?)
                Material(
                  color: context.colors.secondaryContainer,
                  child: InkWell(
                    onTap: () => context.go('/intentions?focus=${i.slug}'),
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(22, 14, 22, 16),
                      // One run: the lead, the act, the turn, the intention.
                      child: Text.rich(
                        TextSpan(
                          children: [
                            TextSpan(
                              text:
                                  '${leaf.daysAgo == 0 ? l10n.todaysIntention : l10n.theIntention}: ',
                              style: TextStyle(color: u.faint),
                            ),
                            TextSpan(
                              text: i.act.of(lang),
                              style: TextStyle(
                                color: u.brand,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            WidgetSpan(
                              alignment: PlaceholderAlignment.middle,
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 6,
                                ),
                                child: Icon(
                                  context.isRtl
                                      ? Icons.chevron_left
                                      : Icons.chevron_right,
                                  size: 18,
                                  color: u.faint,
                                ),
                              ),
                            ),
                            TextSpan(text: i.text(lang).intention),
                          ],
                        ),
                        style: context.text.titleMedium,
                        maxLines: 4,
                        overflow: .ellipsis,
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
        if (saved)
          const PositionedDirectional(
            top: -2,
            end: 26,
            child: BookmarkRibbon(),
          ),
      ],
    );
  }
}
