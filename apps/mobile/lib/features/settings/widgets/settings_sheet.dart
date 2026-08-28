import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/extensions/context_ext.dart';
import '../providers/settings_provider.dart';

/// Language and appearance, the two things a reader sets once.
class SettingsSheet extends ConsumerWidget {
  const SettingsSheet({super.key});

  static Future<void> show(BuildContext context) => showModalBottomSheet(
    context: context,
    builder: (_) => const SettingsSheet(),
  );

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final locale = ref.watch(localeProvider).languageCode;
    final mode = ref.watch(themeModeProvider);
    const names = {'en': 'English', 'ar': 'العربية', 'tr': 'Türkçe'};

    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 4, 20, 20),
        child: Column(
          mainAxisSize: .min,
          crossAxisAlignment: .start,
          children: [
            Text(l10n.language, style: context.text.titleSmall),
            const SizedBox(height: 10),
            SegmentedButton<String>(
              segments: [
                for (final code in AppStrings.supportedLocales)
                  ButtonSegment(value: code, label: Text(names[code]!)),
              ],
              selected: {locale},
              showSelectedIcon: false,
              onSelectionChanged: (s) =>
                  ref.read(localeProvider.notifier).set(s.first),
            ),
            const SizedBox(height: 22),
            Text(l10n.appearance, style: context.text.titleSmall),
            const SizedBox(height: 10),
            SegmentedButton<ThemeMode>(
              segments: [
                ButtonSegment(
                  value: ThemeMode.system,
                  label: Text(l10n.system),
                  icon: const Icon(Icons.brightness_auto_outlined),
                ),
                ButtonSegment(
                  value: ThemeMode.light,
                  label: Text(l10n.light),
                  icon: const Icon(Icons.light_mode_outlined),
                ),
                ButtonSegment(
                  value: ThemeMode.dark,
                  label: Text(l10n.dark),
                  icon: const Icon(Icons.dark_mode_outlined),
                ),
              ],
              selected: {mode},
              showSelectedIcon: false,
              onSelectionChanged: (s) =>
                  ref.read(themeModeProvider.notifier).set(s.first),
            ),
          ],
        ),
      ),
    );
  }
}
