import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/extensions/map_ext.dart';
import '../../../core/widgets/leaf.dart';
import '../models/intention.dart';

/// Act, the turn, then the intention, on one sheet. The act sits at the reading
/// edge so the mark between them rests against two straight edges.
class IntentionTile extends StatelessWidget {
  const IntentionTile(this.i, {this.highlighted = false, super.key});

  final Intention i;
  final bool highlighted;

  @override
  Widget build(BuildContext context) {
    final lang = context.lang;
    final u = context.uswah;
    final t = i.text(lang);
    final dorar = i.source.dorar;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(Leaf.radius + 3),
        border: Border.all(
          color: highlighted ? u.brand : Colors.transparent,
          width: 1.5,
        ),
      ),
      padding: const EdgeInsets.all(2),
      child: Leaf(
        quiet: true,
        padding: const EdgeInsets.fromLTRB(18, 16, 18, 16),
        child: Row(
          crossAxisAlignment: .start,
          children: [
            SizedBox(
              width: 96,
              child: Text(
                i.act.of(lang),
                style: context.text.titleSmall!.copyWith(color: u.brand),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 6),
              child: Icon(
                context.isRtl ? Icons.chevron_left : Icons.chevron_right,
                size: 18,
                color: u.faint,
              ),
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: .start,
                children: [
                  Text(t.intention, style: context.text.titleMedium),
                  const SizedBox(height: 6),
                  Text(t.note, style: context.text.bodySmall),
                  const SizedBox(height: 8),
                  // The label links to dorar's permalink: the citation and its
                  // verification are one tap, not two claims.
                  InkWell(
                    onTap: dorar == null
                        ? null
                        : () => launchUrl(
                            Uri.parse(dorar.permalink),
                            mode: .externalApplication,
                          ),
                    child: Text(
                      dorar == null
                          ? i.source.label.of(lang)
                          : '${i.source.label.of(lang)} · Dorar.net',
                      style: context.text.labelMedium!.copyWith(
                        decoration: dorar == null
                            ? null
                            : TextDecoration.underline,
                        decorationColor: u.faint,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
