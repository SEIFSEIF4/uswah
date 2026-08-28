import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/router/app_router.dart';
import '../providers/saved_provider.dart';

/// One save action, one icon, regardless of content type. Signed-out taps go to
/// login and come back here.
class SaveButton extends ConsumerWidget {
  const SaveButton.situation({
    required this.id,
    required this.returnTo,
    super.key,
  }) : _saying = false;
  const SaveButton.saying({required this.id, required this.returnTo, super.key})
    : _saying = true;

  final String id;
  final String returnTo;
  final bool _saying;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final saved = ref.watch(
      _saying ? isSayingSavedProvider(id) : isSituationSavedProvider(id),
    );

    return OutlinedButton.icon(
      onPressed: () async {
        final notifier = ref.read(savedProvider.notifier);
        final ok = await (_saying
            ? notifier.toggleSaying(id)
            : notifier.toggleSituation(id));
        if (!ok && context.mounted) {
          context.push(AppRoutes.login, extra: returnTo);
        }
      },
      style: saved
          ? OutlinedButton.styleFrom(
              backgroundColor: context.colors.onSurface,
              foregroundColor: context.colors.surface,
            )
          : null,
      icon: Icon(saved ? Icons.bookmark : Icons.bookmark_border, size: 18),
      label: Text(
        saved ? l10n.savedLabel : (_saying ? l10n.save : l10n.saveThis),
      ),
    );
  }
}
