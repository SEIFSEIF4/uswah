import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../constants/app_strings.dart';

/// The one Supabase client. Initialised once in bootstrap; services receive it
/// through [supabaseProvider] and never construct their own.
abstract final class SupabaseClientSetup {
  static Future<void> init() async {
    assert(
      AppStrings.supabaseAnonKey.isNotEmpty,
      'SUPABASE_ANON_KEY is empty: run with --dart-define=SUPABASE_ANON_KEY=... '
      'or set the default in core/constants/app_strings.dart',
    );
    await Supabase.initialize(
      url: AppStrings.supabaseUrl,
      publishableKey: AppStrings.supabaseAnonKey,
    );
  }
}

final supabaseProvider = Provider<SupabaseClient>(
  (ref) => Supabase.instance.client,
);
