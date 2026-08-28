// Direction contract (impeccable, surface seed 03fc3b5d, candidate 5):
//
// THESIS: A daily page on a reading desk, not a magazine front. Today's sheet
//   sits on a short pile of earlier days; the reader lifts it to reach yesterday.
//   Refused: the web's hero-grid-shelf home and the bottom-tab feed.
// OWN-WORLD: warm paper ground, white sheets with a hairline and a real offset
//   shadow, oxblood for the one action, the selection and the bookmark ribbon;
//   Thmanyah/Newsreader carry titles, Inter/Thmanyah labels, Naskh scripture.
//   Stripped of content it still reads as a pile of dated sheets with one red
//   ribbon.
// STORY: open, see today's date (Hijri and Gregorian), one situation and its
//   intention, read it in two minutes, keep it with the ribbon, come back tomorrow.
// FIRST VIEWPORT: the masthead, then the top sheet nearly full-width: dateline,
//   painting, title, topic·minutes, summary, "Read" filled oxblood; the day's
//   intention as the sheet's closing strip; two sheets peeking beneath; the lift
//   hint under the pile. Five tabs: Today, Situations, Sayings, Intentions, Saved.
// FORM: reading-desk stack, 5th of 7 grounded structures, seed 03fc3b5d.
// FINISH: unreviewed and undocumented is unfinished; this build ends with the
//   finish review, the verdict, and DESIGN.md.
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'core/constants/app_strings.dart';
import 'core/router/app_router.dart';
import 'core/theme/app_theme.dart';
import 'features/settings/providers/settings_provider.dart';
import 'l10n/app_localizations.dart';

class UswahApp extends ConsumerWidget {
  const UswahApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(localeProvider);
    return MaterialApp.router(
      title: AppStrings.appName,
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(locale.languageCode),
      darkTheme: AppTheme.dark(locale.languageCode),
      themeMode: ref.watch(themeModeProvider),
      locale: locale,
      routerConfig: ref.watch(appRouterProvider),
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: AppLocalizations.supportedLocales,
    );
  }
}
