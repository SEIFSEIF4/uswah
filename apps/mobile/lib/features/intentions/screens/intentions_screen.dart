import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/widgets/async_view.dart';
import '../../../core/widgets/page_title.dart';
import '../../../core/widgets/section_title.dart';
import '../../../l10n/app_localizations.dart';
import '../models/intention.dart';
import '../providers/intentions_provider.dart';
import '../widgets/intention_tile.dart';

String groupName(AppLocalizations l10n, ActGroup g) => switch (g) {
  ActGroup.worship => l10n.groupWorship,
  ActGroup.body => l10n.groupBody,
  ActGroup.daily => l10n.groupDaily,
  ActGroup.order => l10n.groupOrder,
  ActGroup.travel => l10n.groupTravel,
  ActGroup.occasions => l10n.groupOccasions,
  ActGroup.people => l10n.groupPeople,
  ActGroup.service => l10n.groupService,
  ActGroup.self => l10n.groupSelf,
  ActGroup.learning => l10n.groupLearning,
  ActGroup.knowledge => l10n.groupKnowledge,
  ActGroup.craft => l10n.groupCraft,
  ActGroup.stewardship => l10n.groupStewardship,
};

/// Intentions have no page of their own; a search hit or the day's leaf lands
/// here with `focus` naming the slug to scroll to and outline.
class IntentionsScreen extends ConsumerStatefulWidget {
  const IntentionsScreen({this.focus, super.key});

  final String? focus;

  @override
  ConsumerState<IntentionsScreen> createState() => _IntentionsScreenState();
}

class _IntentionsScreenState extends ConsumerState<IntentionsScreen> {
  final _keys = <String, GlobalKey>{};
  var _scrolled = false;

  void _scrollToFocus() {
    if (_scrolled) return;
    _scrolled = true;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_keys[widget.focus]?.currentContext case final c?) {
        Scrollable.ensureVisible(
          c,
          duration: const Duration(milliseconds: 400),
          alignment: .15,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    return AsyncView(
      ref.watch(intentionsProvider),
      onRetry: ref.read(intentionsProvider.notifier).refresh,
      data: (_) {
        final groups = ref.watch(intentionsByGroupProvider);
        if (widget.focus != null) _scrollToFocus();
        // Not a lazy list: every tile must exist for ensureVisible to reach it.
        return SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 40),
          child: Column(
            crossAxisAlignment: .start,
            children: [
              PageTitle(l10n.intentionsTitle, lede: l10n.intentionsLede),
              for (final (group, items) in groups) ...[
                SectionTitle(groupName(l10n, group)),
                for (final i in items) ...[
                  IntentionTile(
                    i,
                    key: widget.focus == i.slug
                        ? (_keys[i.slug] ??= GlobalKey())
                        : null,
                    highlighted: widget.focus == i.slug,
                  ),
                  const SizedBox(height: 12),
                ],
              ],
            ],
          ),
        );
      },
    );
  }
}
