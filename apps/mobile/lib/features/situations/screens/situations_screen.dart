import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/widgets/async_view.dart';
import '../../../core/widgets/page_title.dart';
import '../providers/situations_provider.dart';
import '../widgets/situation_list.dart';
import '../widgets/topic_bar.dart';

class SituationsScreen extends ConsumerWidget {
  const SituationsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    return Column(
      children: [
        const TopicBar(),
        Expanded(
          child: AsyncView(
            ref.watch(situationsProvider),
            onRetry: ref.read(situationsProvider.notifier).refresh,
            data: (all) => SituationList(
              all,
              header: PageTitle(
                l10n.situationsTitle,
                count: all.length,
                lede: l10n.situationsLede,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
