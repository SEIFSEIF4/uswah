import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/widgets/async_view.dart';
import '../../situations/providers/situations_provider.dart';
import '../providers/today_provider.dart';
import '../widgets/day_leaf_card.dart';
import '../widgets/leaf_deck.dart';

/// The reading desk: today's page on top of a short pile of earlier days.
class TodayScreen extends ConsumerStatefulWidget {
  const TodayScreen({super.key});

  @override
  ConsumerState<TodayScreen> createState() => _TodayScreenState();
}

class _TodayScreenState extends ConsumerState<TodayScreen> {
  var _index = 0;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    return AsyncView(
      ref.watch(situationsProvider),
      onRetry: ref.read(situationsProvider.notifier).refresh,
      data: (_) {
        final deck = ref.watch(todayDeckProvider);
        if (deck.isEmpty) return Center(child: Text(l10n.nothingHere));
        final behind = deck.length - 1 - _index;
        return RefreshIndicator(
          onRefresh: ref.read(situationsProvider.notifier).refresh,
          child: ListView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
            children: [
              LeafDeck(
                count: deck.length,
                onIndexChanged: (i) => setState(() => _index = i),
                builder: (context, i, lifted) =>
                    DayLeafCard(deck[i], lifted: lifted),
                // The hint belongs to the pile, right under its last edge.
                footer: Text(
                  _index == 0 && behind > 0
                      ? l10n.swipeHint
                      : behind > 0
                      ? l10n.daysBehind(behind)
                      : l10n.endOfList,
                  style: context.text.labelMedium,
                  textAlign: .center,
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
