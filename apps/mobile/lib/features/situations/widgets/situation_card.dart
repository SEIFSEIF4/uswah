import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/widgets/app_image.dart';
import '../../../core/widgets/leaf.dart';
import '../../saved/providers/saved_provider.dart';
import '../models/situation.dart';
import 'meta_row.dart';

/// A situation as a sheet: painting, title, summary, meta. Saved ones wear the ribbon.
class SituationCard extends ConsumerWidget {
  const SituationCard(this.s, {this.compact = false, super.key});

  final Situation s;

  /// Thumbnail beside the text instead of a painting above it, for long lists.
  final bool compact;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final t = s.text(context.lang);
    final saved = ref.watch(isSituationSavedProvider(s.id));
    final text = Column(
      crossAxisAlignment: .start,
      children: [
        Text(
          t.title,
          style: compact
              ? context.text.titleLarge!.copyWith(fontSize: 18)
              : context.text.titleLarge,
          maxLines: 3,
          overflow: .ellipsis,
        ),
        const SizedBox(height: 6),
        MetaRow(s),
        const SizedBox(height: 8),
        Text(
          t.summary,
          style: context.text.bodySmall,
          maxLines: compact ? 2 : 3,
          overflow: .ellipsis,
        ),
      ],
    );

    return Stack(
      fit: StackFit.passthrough,
      clipBehavior: Clip.none,
      children: [
        Leaf(
          quiet: true,
          onTap: () => context.push('/${s.slug}'),
          padding: EdgeInsets.zero,
          clip: true,
          child: compact
              ? Padding(
                  padding: const EdgeInsets.all(14),
                  child: Row(
                    crossAxisAlignment: .start,
                    children: [
                      SizedBox(
                        width: 84,
                        height: 84,
                        child: AppImage(s.image.url, radius: 10),
                      ),
                      const SizedBox(width: 14),
                      Expanded(child: text),
                    ],
                  ),
                )
              : Column(
                  crossAxisAlignment: .stretch,
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(12, 12, 12, 0),
                      child: AppImage(
                        s.image.url,
                        aspectRatio: 16 / 10,
                        radius: 10,
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(18, 16, 18, 18),
                      child: text,
                    ),
                  ],
                ),
        ),
        if (saved)
          PositionedDirectional(
            top: -2,
            end: 22,
            child: const BookmarkRibbon(size: 18),
          ),
      ],
    );
  }
}
