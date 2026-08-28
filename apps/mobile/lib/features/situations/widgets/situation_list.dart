import 'package:flutter/material.dart';

import '../../../core/extensions/context_ext.dart';
import '../models/situation.dart';
import 'situation_card.dart';

enum _Order { newest, shortest }

/// Sort chips, sheets six at a time, and a real end.
class SituationList extends StatefulWidget {
  const SituationList(this.all, {this.header, super.key});

  final List<Situation> all;
  final Widget? header;

  @override
  State<SituationList> createState() => _SituationListState();
}

class _SituationListState extends State<SituationList> {
  static const _page = 6;
  var _order = _Order.newest;
  var _shown = _page;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final sorted = [...widget.all]
      ..sort(
        _order == _Order.shortest
            ? (a, b) => a.minutes.compareTo(b.minutes)
            : (a, b) => b.publishedAt.compareTo(a.publishedAt),
      );
    final done = _shown >= sorted.length;

    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 40),
      children: [
        ?widget.header,
        Wrap(
          spacing: 8,
          children: [
            for (final o in _Order.values)
              ChoiceChip(
                label: Text(o == _Order.newest ? l10n.newest : l10n.shortest),
                selected: _order == o,
                onSelected: (_) => setState(() => _order = o),
              ),
          ],
        ),
        const SizedBox(height: 18),
        for (final s in sorted.take(_shown)) ...[
          SituationCard(s, compact: true),
          const SizedBox(height: 14),
        ],
        const SizedBox(height: 12),
        Center(
          child: done
              ? Text(l10n.endOfList, style: context.text.bodySmall)
              : OutlinedButton(
                  onPressed: () => setState(() => _shown += _page),
                  child: Text(l10n.loadMore),
                ),
        ),
      ],
    );
  }
}
