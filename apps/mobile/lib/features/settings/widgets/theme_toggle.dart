import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/extensions/context_ext.dart';
import '../providers/settings_provider.dart';

class ThemeToggle extends ConsumerWidget {
  const ThemeToggle({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = context.theme.brightness == Brightness.dark;
    return IconButton(
      tooltip: context.l10n.theme,
      icon: Icon(
        isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
        size: 20,
      ),
      onPressed: () => ref
          .read(themeModeProvider.notifier)
          .toggle(MediaQuery.platformBrightnessOf(context)),
    );
  }
}
