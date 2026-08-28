import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/extensions/context_ext.dart';
import '../../../core/widgets/app_error_view.dart';
import '../../../core/widgets/app_image.dart';
import '../../../core/widgets/app_loader.dart';
import '../../../core/widgets/leaf.dart';
import '../../../core/widgets/section_title.dart';
import '../../../core/widgets/share_row.dart';
import '../../saved/widgets/save_button.dart';
import '../../shell/widgets/uswah_app_bar.dart';
import '../../sources/widgets/source_block.dart';
import '../providers/situations_provider.dart';
import '../widgets/meta_row.dart';
import '../widgets/situation_card.dart';
import '../widgets/topic_label.dart';

/// The reading page: the same framed print the reader lifted from the desk,
/// then the page in one column.
class SituationScreen extends ConsumerWidget {
  const SituationScreen({required this.slug, super.key});

  final String slug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final u = context.uswah;
    final lang = context.lang;
    final all = ref.watch(situationsProvider);
    final s = ref.watch(situationBySlugProvider(slug));

    return Scaffold(
      appBar: UswahAppBar(
        title: s == null ? '' : topicName(l10n, s.topic),
        showTools: false,
      ),
      body: switch ((all, s)) {
        (AsyncLoading(), null) => const AppLoader(),
        (_, null) => AppErrorView(message: l10n.nothingHere),
        (_, final s?) => Builder(
          builder: (context) {
            final t = s.text(lang);
            final related = ref.watch(relatedSituationsProvider(slug));
            final url = '${AppStrings.siteUrl}/$lang/${s.slug}';
            return ListView(
              padding: const EdgeInsets.fromLTRB(20, 4, 20, 40),
              children: [
                AppImage(s.image.url, aspectRatio: 16 / 10, radius: 14),
                if (s.creditsArtwork)
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: Wrap(
                      spacing: 8,
                      crossAxisAlignment: .center,
                      children: [
                        InkWell(
                          onTap: s.image.sourceUrl.isEmpty
                              ? null
                              : () => launchUrl(
                                  Uri.parse(s.image.sourceUrl),
                                  mode: .externalApplication,
                                ),
                          child: Text(
                            s.image.credit,
                            style: context.text.labelSmall!.copyWith(
                              decoration: TextDecoration.underline,
                              decorationColor: u.faint,
                            ),
                          ),
                        ),
                        Text(
                          s.image.license,
                          style: context.text.labelSmall!.copyWith(
                            color: u.faint,
                          ),
                        ),
                      ],
                    ),
                  ),
                const SizedBox(height: 22),
                Text(t.title, style: context.text.displaySmall),
                const SizedBox(height: 10),
                MetaRow(s),
                const SizedBox(height: 14),
                Text(
                  t.summary,
                  style: context.text.bodyLarge!.copyWith(
                    color: context.colors.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 12),
                Byline(s),
                const SizedBox(height: 26),
                SourceBlock(source: s.source),
                const SizedBox(height: 28),
                Text(t.body, style: context.text.bodyLarge),
                const SizedBox(height: 26),
                // One concrete action on its own sheet: the lead runs into the
                // sentence, so it is the last thing read, not a label over it.
                Leaf(
                  padding: const EdgeInsets.fromLTRB(22, 20, 22, 22),
                  child: Text.rich(
                    TextSpan(
                      children: [
                        TextSpan(
                          text: '${l10n.whatToDo}: ',
                          style: TextStyle(color: u.brand),
                        ),
                        TextSpan(text: t.takeaway),
                      ],
                    ),
                    style: context.text.headlineSmall!.copyWith(
                      height: u.isArabic ? 1.8 : 1.35,
                    ),
                  ),
                ),
                const SizedBox(height: 28),
                ShareRow(
                  title: t.title,
                  url: url,
                  trailing: SaveButton.situation(
                    id: s.id,
                    returnTo: '/${s.slug}',
                  ),
                ),
                const SizedBox(height: 8),
                OutlinedButton.icon(
                  onPressed: () => context.go('/topics/${s.topic.name}'),
                  icon: const Icon(Icons.grid_view_outlined, size: 18),
                  label: Text(topicName(l10n, s.topic)),
                ),
                if (related.isNotEmpty) ...[
                  SectionTitle(l10n.next),
                  for (final r in related) ...[
                    SituationCard(r, compact: true),
                    const SizedBox(height: 14),
                  ],
                ],
              ],
            );
          },
        ),
      },
    );
  }
}
