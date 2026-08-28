import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/router/app_router.dart';
import '../../settings/widgets/settings_sheet.dart';
import 'wordmark.dart';

/// The masthead: wordmark at the reading edge, search and settings at the far end.
class UswahAppBar extends StatelessWidget implements PreferredSizeWidget {
  const UswahAppBar({this.showTools = true, this.title, super.key});

  final bool showTools;

  /// Detail screens name themselves; top-level tabs show the wordmark.
  final String? title;

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) => AppBar(
    title: title == null
        ? Semantics(label: context.l10n.homeLabel, child: const Wordmark())
        : Text(title!, style: context.text.titleMedium),
    actions: showTools
        ? [
            IconButton(
              tooltip: context.l10n.search,
              icon: const Icon(Icons.search),
              onPressed: () => context.push(AppRoutes.search),
            ),
            IconButton(
              tooltip: context.l10n.openSettings,
              icon: const Icon(Icons.tune),
              onPressed: () => SettingsSheet.show(context),
            ),
            const SizedBox(width: 6),
          ]
        : null,
  );
}
