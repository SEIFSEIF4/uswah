import 'package:flutter/material.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/extensions/map_ext.dart';
import '../../../core/widgets/leaf.dart';
import '../models/content_source.dart';
import 'dorar_source.dart';

/// The cited text on its own sheet: Naskh original, a house translation off the
/// Arabic page, the reference, then the dorar apparatus. Shared by situation and
/// saying pages so the two cannot drift apart.
class SourceBlock extends StatelessWidget {
  const SourceBlock({required this.source, super.key});

  final ContentSource source;

  @override
  Widget build(BuildContext context) {
    final lang = context.lang;
    final u = context.uswah;
    final translation = lang == 'ar' ? null : source.translation[lang];

    return Leaf(
      padding: const EdgeInsets.fromLTRB(22, 22, 22, 18),
      child: Column(
        crossAxisAlignment: .start,
        children: [
          if (source.original case final original?)
            Directionality(
              textDirection: .rtl,
              child: Text(original, style: u.scripture, textAlign: .start),
            ),
          if (translation case final t?) ...[
            const SizedBox(height: 14),
            Text(
              '“${t.text}”',
              style: context.text.bodyMedium!.copyWith(
                fontStyle: FontStyle.italic,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              '${context.l10n.translatedBy} ${t.translator}',
              style: context.text.labelMedium,
            ),
          ],
          const SizedBox(height: 16),
          Row(
            children: [
              Container(width: 18, height: 1, color: u.brand),
              const SizedBox(width: 10),
              Text(
                source.label.of(lang),
                style: context.text.titleSmall!.copyWith(color: u.brand),
              ),
            ],
          ),
          if (source.dorar case final dorar?) ...[
            const SizedBox(height: 14),
            Divider(color: u.rule),
            const SizedBox(height: 12),
            DorarSource(dorar: dorar, book: source.bookFromLabel),
          ],
        ],
      ),
    );
  }
}
