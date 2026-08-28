import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/constants/app_strings.dart';
import '../../../core/extensions/context_ext.dart';
import '../providers/settings_provider.dart';

/// EN · AR · TR with the current one marked. Slugs are language-neutral, so
/// switching keeps your place.
class LocaleSwitch extends ConsumerWidget {
  const LocaleSwitch({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final current = ref.watch(localeProvider).languageCode;
    return Row(
      mainAxisSize: .min,
      children: [
        for (final code in AppStrings.supportedLocales)
          TextButton(
            onPressed: () => ref.read(localeProvider.notifier).set(code),
            style: TextButton.styleFrom(
              foregroundColor: code == current
                  ? context.colors.onSurface
                  : context.uswah.faint,
              textStyle: context.uswah.label.copyWith(
                fontSize: 13,
                letterSpacing: 1,
              ),
              minimumSize: const Size(40, 36),
              padding: const EdgeInsets.symmetric(horizontal: 8),
            ),
            child: Text(
              code.toUpperCase(),
              style: code == current
                  ? const TextStyle(decoration: TextDecoration.underline)
                  : null,
            ),
          ),
      ],
    );
  }
}
