/// Non-translatable strings only. User-facing copy belongs in `lib/l10n`.
abstract final class AppStrings {
  static const appName = 'Uswah';

  /// The web surface. Relative image paths (`/art/...`) and share links resolve here.
  static const siteUrl = 'https://uswah-five.vercel.app';

  static const supabaseUrl = 'https://rjkbhobntyhuochdmkkx.supabase.co';

  /// Publishable (anon) key. RLS limits it to published rows, so it is safe to ship.
  /// Pass with `--dart-define=SUPABASE_ANON_KEY=...` or fill the default in.
  static const supabaseAnonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: 'sb_publishable_mtrjLhNe8xRhQ3QJbUjxiQ_Y1PB0Aq1',
  );

  static const dorarUrl = 'https://dorar.net';

  static const supportedLocales = ['en', 'ar', 'tr'];
  static const defaultLocale = 'en';
}
