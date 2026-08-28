import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/extensions/context_ext.dart';
import '../models/situation.dart';
import 'topic_label.dart';

/// The horizontally scrolling topic filter; "All" clears it.
class TopicBar extends StatelessWidget {
  const TopicBar({this.current, super.key});

  final Topic? current;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    Widget pill(String label, bool selected, VoidCallback onTap) => Padding(
      padding: const EdgeInsetsDirectional.only(end: 8),
      child: ChoiceChip(
        label: Text(label),
        selected: selected,
        onSelected: (_) => onTap(),
      ),
    );

    return SingleChildScrollView(
      scrollDirection: .horizontal,
      padding: const EdgeInsets.fromLTRB(20, 6, 20, 10),
      child: Row(
        children: [
          pill(l10n.all, current == null, () => context.go('/situations')),
          for (final t in Topic.values)
            pill(
              topicName(l10n, t),
              current == t,
              () => context.go('/topics/${t.name}'),
            ),
        ],
      ),
    );
  }
}
