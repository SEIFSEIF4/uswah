import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/extensions/context_ext.dart';
import '../../../core/extensions/map_ext.dart';
import '../../../core/extensions/string_ext.dart';
import '../../../core/widgets/app_error_view.dart';
import '../../../core/widgets/app_loader.dart';
import '../../../core/widgets/leaf.dart';
import '../../../core/widgets/section_title.dart';
import '../../../core/widgets/share_row.dart';
import '../../saved/widgets/save_button.dart';
import '../../shell/widgets/uswah_app_bar.dart';
import '../../situations/providers/situations_provider.dart';
import '../../sources/widgets/source_block.dart';
import '../providers/sayings_provider.dart';
import '../widgets/grade_badge.dart';
import '../widgets/saying_row.dart';
import '../widgets/share_card_sheet.dart';

class SayingScreen extends ConsumerWidget {
  const SayingScreen({required this.slug, super.key});

  final String slug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final u = context.uswah;
    final lang = context.lang;
    final all = ref.watch(sayingsProvider);
    final q = ref.watch(sayingBySlugProvider(slug));

    return Scaffold(
      appBar: UswahAppBar(title: l10n.navSayings, showTools: false),
      body: switch ((all, q)) {
        (AsyncLoading(), null) => const AppLoader(),
        (_, null) => AppErrorView(message: l10n.nothingHere),
        (_, final q?) => Builder(
          builder: (context) {
            final t = q.text(lang);
            final saying = q.sayingFor(lang);
            final situation = q.situationSlug == null
                ? null
                : ref.watch(situationBySlugProvider(q.situationSlug!));
            final more = ref.watch(relatedSayingsProvider(slug));
            final url = '${AppStrings.siteUrl}/$lang/quotes/${q.slug}';
            return ListView(
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 40),
              children: [
                // The saying is the smallest thing here on purpose: it is what the reader
                // already has. The source it is measured against gets the weight.
                Directionality(
                  textDirection: saying.isArabicScript ? .rtl : .ltr,
                  child: Text(
                    '“$saying”',
                    style: context.text.headlineSmall!.copyWith(
                      color: context.colors.onSurfaceVariant,
                    ),
                    textAlign: .start,
                  ),
                ),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 10,
                  crossAxisAlignment: .center,
                  children: [GradeBadge(q.grade)],
                ),
                const SizedBox(height: 20),
                SourceBlock(source: q.source),
                SectionTitle(l10n.parallel),
                Text(t.angle, style: context.text.bodyLarge),
                SectionTitle(l10n.closeness),
                // The focal moment: the only place the product speaks rather than quotes.
                Text(
                  t.closeness,
                  style: context.text.headlineSmall!.copyWith(
                    height: u.isArabic ? 1.8 : 1.35,
                  ),
                ),
                if (!q.grade.storable) ...[
                  const SizedBox(height: 22),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: context.colors.secondaryContainer,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Column(
                      crossAxisAlignment: .start,
                      children: [
                        Text(
                          l10n.pendingReviewer,
                          style: context.text.titleSmall,
                        ),
                        const SizedBox(height: 6),
                        Text(l10n.pendingWhy, style: context.text.bodySmall),
                      ],
                    ),
                  ),
                ],
                if (situation case final s?) ...[
                  const SizedBox(height: 22),
                  Leaf(
                    onTap: () => context.push('/${s.slug}'),
                    padding: const EdgeInsets.fromLTRB(18, 16, 18, 16),
                    child: Row(
                      children: [
                        Expanded(
                          child: Text.rich(
                            TextSpan(
                              children: [
                                TextSpan(
                                  text: '${l10n.readSituation}: ',
                                  style: TextStyle(color: u.faint),
                                ),
                                TextSpan(text: s.text(lang).title),
                              ],
                            ),
                            style: context.text.titleMedium,
                          ),
                        ),
                        Icon(
                          context.isRtl
                              ? Icons.arrow_back
                              : Icons.arrow_forward,
                          size: 18,
                          color: u.brand,
                        ),
                      ],
                    ),
                  ),
                ],
                const SizedBox(height: 28),
                ShareRow(
                  title: saying,
                  url: url,
                  trailing: SaveButton.saying(
                    id: q.id,
                    returnTo: '/quotes/${q.slug}',
                  ),
                ),
                const SizedBox(height: 8),
                OutlinedButton.icon(
                  onPressed: () => ShareCardSheet.show(
                    context,
                    ShareCardSheet(
                      slug: q.slug,
                      saying: saying,
                      original: q.source.original,
                      // On the Arabic page the original is the text; there is no translation to offer.
                      translation: lang == 'ar'
                          ? null
                          : q.source.translation[lang],
                      grade: gradeLabel(l10n, q.grade),
                      source: q.source.label.of(lang),
                      pageUrl: url,
                    ),
                  ),
                  icon: const Icon(Icons.image_outlined, size: 18),
                  label: Text(l10n.shareAsImage),
                ),
                if (more.isNotEmpty) ...[
                  SectionTitle(l10n.moreSayings),
                  for (final r in more) ...[
                    SayingRow(r, showCloseness: false),
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
