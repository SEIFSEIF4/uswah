import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/widgets/async_view.dart';
import '../../../core/widgets/leaf.dart';
import '../../../core/widgets/page_title.dart';
import '../../shell/widgets/uswah_app_bar.dart';
import '../models/situation.dart';
import '../providers/situations_provider.dart';
import '../widgets/topic_label.dart';

/// A directory of ways in, not the content: each topic with the titles behind it.
class TopicsScreen extends ConsumerWidget {
  const TopicsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final lang = context.lang;
    return Scaffold(
      appBar: UswahAppBar(title: l10n.topics),
      body: AsyncView(
        ref.watch(situationsProvider),
        onRetry: ref.read(situationsProvider.notifier).refresh,
        data: (all) => ListView(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 40),
          children: [
            PageTitle(
              l10n.topicsTitle,
              count: Topic.values.length,
              lede: l10n.topicsLede,
            ),
            for (final topic in Topic.values)
              if (all.where((s) => s.topic == topic).toList()
                  case final items) ...[
                Leaf(
                  onTap: () => context.push('/topics/${topic.name}'),
                  child: Column(
                    crossAxisAlignment: .start,
                    children: [
                      Text.rich(
                        TextSpan(
                          text: topicName(l10n, topic),
                          children: [
                            TextSpan(
                              text: '  ${items.length}',
                              style: context.text.labelMedium,
                            ),
                          ],
                        ),
                        style: context.text.titleLarge,
                      ),
                      const SizedBox(height: 6),
                      Text(
                        items.isEmpty
                            ? l10n.nothingHere
                            : items.map((s) => s.text(lang).title).join(' · '),
                        style: context.text.bodySmall,
                        maxLines: 3,
                        overflow: .ellipsis,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),
              ],
          ],
        ),
      ),
    );
  }
}
