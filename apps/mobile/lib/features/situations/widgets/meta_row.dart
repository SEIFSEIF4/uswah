import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../../core/extensions/context_ext.dart';
import '../models/situation.dart';
import 'topic_label.dart';

/// Topic · read time, under a title, never above it.
class MetaRow extends StatelessWidget {
  const MetaRow(this.s, {this.topic = true, this.onArt = false, super.key});

  final Situation s;
  final bool topic;
  final bool onArt;

  @override
  Widget build(BuildContext context) {
    final u = context.uswah;
    final color = onArt ? Colors.white70 : u.faint;
    return DefaultTextStyle(
      style: context.text.labelMedium!.copyWith(color: color),
      child: Row(
        mainAxisSize: .min,
        children: [
          if (topic) ...[
            Text(
              topicName(context.l10n, s.topic),
              style: TextStyle(
                color: onArt ? Colors.white : u.brand,
                fontWeight: FontWeight.w600,
              ),
            ),
            const Text('  ·  '),
          ],
          Icon(Icons.schedule, size: 13, color: color),
          const SizedBox(width: 4),
          Text(context.l10n.minRead(s.minutes)),
        ],
      ),
    );
  }
}

/// Who checked this against the collection, and when. An unreviewed entry says
/// so in the same place, loudly.
class Byline extends StatelessWidget {
  const Byline(this.s, {super.key});

  final Situation s;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final date = DateFormat.yMMMMd(context.lang).format(s.publishedAt);
    return Text.rich(
      TextSpan(
        children: [
          if (s.unverified)
            TextSpan(
              text: l10n.notVerified,
              style: TextStyle(
                color: context.colors.error,
                fontWeight: FontWeight.w600,
              ),
            )
          else ...[
            TextSpan(text: '${l10n.reviewedBy} '),
            TextSpan(
              text: s.reviewedBy,
              style: TextStyle(
                color: context.colors.onSurface,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
          const TextSpan(text: '  ·  '),
          TextSpan(text: date),
        ],
      ),
      style: context.text.labelMedium,
    );
  }
}
