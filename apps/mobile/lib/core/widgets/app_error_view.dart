import 'package:flutter/material.dart';

import '../extensions/context_ext.dart';

class AppErrorView extends StatelessWidget {
  const AppErrorView({required this.message, this.onRetry, super.key});

  final String message;
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) => Center(
    child: Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: .min,
        children: [
          Text(message, textAlign: .center),
          if (onRetry case final retry?) ...[
            const SizedBox(height: 12),
            OutlinedButton(onPressed: retry, child: Text(context.l10n.retry)),
          ],
        ],
      ),
    ),
  );
}
