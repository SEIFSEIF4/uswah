import 'package:flutter/material.dart';

import '../extensions/context_ext.dart';

/// `.page-title` with its optional count, followed by `.lede`.
class PageTitle extends StatelessWidget {
  const PageTitle(this.title, {this.count, this.lede, super.key});

  final String title;
  final int? count;
  final String? lede;

  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: .start,
    children: [
      Text.rich(
        TextSpan(
          text: title,
          children: [
            if (count case final n?)
              TextSpan(
                text: '  $n',
                style: context.uswah.label.copyWith(
                  fontSize: 15,
                  color: context.uswah.faint,
                ),
              ),
          ],
        ),
        style: context.text.headlineMedium,
      ),
      if (lede case final l?) ...[
        const SizedBox(height: 10),
        Text(
          l,
          style: context.text.bodyMedium!.copyWith(
            color: context.colors.onSurfaceVariant,
          ),
        ),
      ],
      const SizedBox(height: 24),
    ],
  );
}
