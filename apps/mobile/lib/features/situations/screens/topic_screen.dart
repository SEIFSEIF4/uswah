import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/widgets/async_view.dart';
import '../../../core/widgets/page_title.dart';
import '../models/situation.dart';
import '../providers/situations_provider.dart';
import '../widgets/situation_list.dart';
import '../widgets/topic_bar.dart';
import '../widgets/topic_label.dart';

/// Situations filtered to one topic. The count is the first thing a filter answers.
class TopicScreen extends ConsumerWidget {
  const TopicScreen({required this.topic, super.key});

  final Topic topic;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    return Column(
      children: [
        TopicBar(current: topic),
        Expanded(
          child: AsyncView(
            ref.watch(situationsProvider),
            onRetry: ref.read(situationsProvider.notifier).refresh,
            data: (_) {
              final items = ref.watch(situationsByTopicProvider(topic));
              final title = PageTitle(
                topicName(l10n, topic),
                count: items.length,
              );
              if (items.isEmpty) {
                return ListView(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  children: [
                    title,
                    Text(l10n.nothingHere, style: context.text.bodySmall),
                  ],
                );
              }
              return SituationList(items, header: title);
            },
          ),
        ),
      ],
    );
  }
}
