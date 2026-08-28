import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/widgets/async_view.dart';
import '../../../core/widgets/leaf.dart';
import '../../../core/widgets/page_title.dart';
import '../../../core/widgets/section_title.dart';
import '../../auth/providers/auth_provider.dart';
import '../../auth/screens/login_screen.dart';
import '../../sayings/providers/sayings_provider.dart';
import '../../sayings/widgets/saying_row.dart';
import '../../situations/providers/situations_provider.dart';
import '../../situations/widgets/situation_card.dart';
import '../providers/saved_provider.dart';

/// What you kept: situations and sayings, newest first, each wearing its ribbon.
class SavedScreen extends ConsumerWidget {
  const SavedScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final u = context.uswah;
    final situations = ref.watch(situationsProvider).value ?? [];
    final sayings = ref.watch(sayingsProvider).value ?? [];
    final user = ref.watch(authUserProvider);

    if (user == null) {
      return const LoginScreen(embedded: true, redirectTo: '/saved');
    }
    return AsyncView(
      ref.watch(savedProvider),
      onRetry: () => ref.invalidate(savedProvider),
      data: (saved) {
        final savedSituations = [
          for (final id in saved.situationIds)
            ...situations.where((s) => s.id == id),
        ];
        final savedSayings = [
          for (final id in saved.sayingIds) ...sayings.where((q) => q.id == id),
        ];
        return ListView(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 40),
          children: [
            PageTitle(
              l10n.savedTitle,
              count: savedSituations.length + savedSayings.length,
            ),
            if (saved.isEmpty)
              Leaf(
                child: Column(
                  crossAxisAlignment: .start,
                  children: [
                    Row(
                      children: [
                        const BookmarkRibbon(size: 16),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            l10n.nothingSaved,
                            style: context.text.titleMedium,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(l10n.signInLede, style: context.text.bodySmall),
                  ],
                ),
              ),
            if (savedSituations.isNotEmpty) ...[
              SectionTitle(l10n.savedSituations),
              for (final s in savedSituations) ...[
                SituationCard(s, compact: true),
                const SizedBox(height: 14),
              ],
            ],
            if (savedSayings.isNotEmpty) ...[
              SectionTitle(l10n.savedSayings),
              for (final q in savedSayings) ...[
                SayingRow(q, showCloseness: false),
                const SizedBox(height: 14),
              ],
            ],
            const SizedBox(height: 28),
            Row(
              children: [
                Expanded(
                  child: Text(
                    user.email ?? '',
                    style: context.text.labelMedium,
                    overflow: .ellipsis,
                  ),
                ),
                TextButton(
                  onPressed: () async {
                    await ref.read(authUserProvider.notifier).signOut();
                    if (context.mounted) context.go('/');
                  },
                  style: TextButton.styleFrom(foregroundColor: u.faint),
                  child: Text(l10n.signOut),
                ),
              ],
            ),
          ],
        );
      },
    );
  }
}
