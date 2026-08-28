import 'package:flutter/material.dart';

import '../extensions/context_ext.dart';

/// A section heading that carries its own weight: display type, a hairline
/// running to the column edge, nothing above it.
class SectionTitle extends StatelessWidget {
  const SectionTitle(this.text, {this.trailing, super.key});

  final String text;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(top: 36, bottom: 14),
    child: Row(
      crossAxisAlignment: .end,
      children: [
        Text(text, style: context.text.headlineSmall),
        const SizedBox(width: 12),
        Expanded(child: Divider(color: context.uswah.rule)),
        if (trailing != null) ...[const SizedBox(width: 12), trailing!],
      ],
    ),
  );
}
