// Renders a saved Today sheet and writes a golden PNG: the bookmark ribbon is
// visible without needing a signed-in account on a device.
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:uswah/core/theme/app_theme.dart';
import 'package:uswah/features/saved/providers/saved_provider.dart';
import 'package:uswah/features/situations/models/situation.dart';
import 'package:uswah/features/sources/models/content_source.dart';
import 'package:uswah/features/today/models/day_leaf.dart';
import 'package:uswah/features/today/widgets/day_leaf_card.dart';
import 'package:uswah/l10n/app_localizations.dart';

void main() {
  testWidgets('saved sheet wears the bookmark ribbon', (tester) async {
    tester.view.physicalSize = const Size(1080, 2300);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    // cached_network_image asks path_provider for a cache dir; answer it, then
    // let the (blocked) network fetch fall through to the error placeholder.
    const channel = MethodChannel('plugins.flutter.io/path_provider');
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(channel, (_) async => '.');
    addTearDown(
      () => TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
          .setMockMethodCallHandler(channel, null),
    );

    const text = LocaleText(
      title: 'My boss wronged me and I said nothing',
      summary:
          'On speaking up late, and on what it costs to carry a grievance quietly.',
      body: '',
      takeaway: '',
    );
    final s = Situation(
      id: 'x',
      slug: 'x',
      topic: Topic.work,
      minutes: 3,
      publishedAt: DateTime(2026, 8, 9),
      reviewedBy: 'UNVERIFIED',
      reviewedAt: DateTime(2026, 8, 9),
      image: const SituationImage(url: '/art/none.jpg'),
      source: const ContentSource(label: {'en': 'Sahih al-Bukhari 2448'}),
      en: text,
      ar: text,
      tr: text,
    );

    await tester.pumpWidget(
      ProviderScope(
        overrides: [isSituationSavedProvider.overrideWith((ref, id) => true)],
        child: MaterialApp(
          theme: AppTheme.light('en'),
          localizationsDelegates: AppLocalizations.localizationsDelegates,
          supportedLocales: AppLocalizations.supportedLocales,
          home: Scaffold(
            body: Padding(
              padding: const EdgeInsets.all(20),
              child: DayLeafCard(
                DayLeaf(date: DateTime(2026, 8, 28), daysAgo: 0, situation: s),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    await expectLater(
      find.byType(DayLeafCard),
      matchesGoldenFile('goldens/day_leaf_saved.png'),
    );
  });
}
