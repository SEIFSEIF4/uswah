// Hits the real project with the publishable key: proves the three content
// queries and their parsing match what the database actually returns.
// Plain `test`, not `testWidgets`, so real HTTP is allowed.
import 'package:flutter_test/flutter_test.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:uswah/core/constants/app_strings.dart';
import 'package:uswah/features/intentions/services/intentions_service.dart';
import 'package:uswah/features/sayings/services/sayings_service.dart';
import 'package:uswah/features/situations/services/situations_service.dart';
import 'package:uswah/features/sources/services/dorar_service.dart';

void main() {
  final db = SupabaseClient(AppStrings.supabaseUrl, AppStrings.supabaseAnonKey);

  test(
    'live: situations, sayings, intentions load and parse',
    () async {
      final cited = await DorarService(db).cited();
      expect(cited, isNotEmpty);

      final situations = await SituationsService(db).fetchAll(cited);
      expect(situations, isNotEmpty);
      final hero = situations.firstWhere((s) => s.feature == 'hero');
      expect(hero.text('ar').title, isNotEmpty);
      expect(hero.source.label['en'], startsWith('Sahih'));
      expect(hero.source.dorar, isNotNull);

      final sayings = await SayingsService(db).fetchAll(cited);
      expect(sayings, isNotEmpty);
      expect(sayings.every((q) => q.text('tr').closeness.isNotEmpty), isTrue);

      final intentions = await IntentionsService(db).fetchAll(cited);
      expect(intentions, isNotEmpty);
      expect(intentions.first.act['en'], isNotEmpty);
    },
    timeout: const Timeout(Duration(minutes: 1)),
  );
}
