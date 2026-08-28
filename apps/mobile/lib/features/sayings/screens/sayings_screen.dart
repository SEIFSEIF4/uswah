import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/extensions/context_ext.dart';
import '../../../core/widgets/async_view.dart';
import '../../../core/widgets/page_title.dart';
import '../providers/sayings_provider.dart';
import '../widgets/saying_row.dart';

/// A directory, not the content. Strongest evidence first.
class SayingsScreen extends ConsumerWidget {
  const SayingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final u = context.uswah;
    return AsyncView(
      ref.watch(sayingsProvider),
      onRetry: ref.read(sayingsProvider.notifier).refresh,
      data: (_) {
        final sorted = ref.watch(sayingsSortedProvider);
        return ListView(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 40),
          children: [
            PageTitle(
              l10n.sayingsTitle,
              count: sorted.length,
              lede: l10n.sayingsLede,
            ),
            for (final q in sorted) ...[
              SayingRow(q),
              const SizedBox(height: 14),
            ],
            const SizedBox(height: 20),
            // The debt is named where it is owed: every grading on this surface is theirs.
            InkWell(
              onTap: () => launchUrl(
                Uri.parse(AppStrings.dorarUrl),
                mode: .externalApplication,
              ),
              child: Text.rich(
                TextSpan(
                  text: '${l10n.dorarCredit} ',
                  children: [
                    TextSpan(
                      text: 'Dorar.net · الدرر السنية',
                      style: TextStyle(
                        color: u.brand,
                        decoration: TextDecoration.underline,
                        decorationColor: u.brand,
                      ),
                    ),
                  ],
                ),
                style: context.text.labelMedium,
              ),
            ),
          ],
        );
      },
    );
  }
}
