import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'app.dart';
import 'core/network/supabase_client.dart';
import 'features/settings/providers/settings_provider.dart';

Future<void> bootstrap() async {
  WidgetsFlutterBinding.ensureInitialized();

  PlatformDispatcher.instance.onError = (error, stack) {
    debugPrint('Uncaught error: $error\n$stack');
    return true;
  };

  final (prefs, _, _) = await (
    SharedPreferences.getInstance(),
    SupabaseClientSetup.init(),
    initializeDateFormatting(),
  ).wait;
  // Arabic pages date in Latin digits, like the rest of the page (see cards.tsx).
  DateFormat.useNativeDigitsByDefaultFor('ar', false);

  runApp(
    ProviderScope(
      overrides: [sharedPreferencesProvider.overrideWithValue(prefs)],
      child: const UswahApp(),
    ),
  );
}
