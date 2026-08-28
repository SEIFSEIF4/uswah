# Uswah mobile

Flutter client for [uswah.app](https://uswah.app): the same Supabase database as the
web, read through the publishable key (RLS shows published rows only).

## Run

```sh
flutter pub get
flutter run --dart-define=SUPABASE_ANON_KEY=sb_publishable_...
```

Or paste the key into `defaultValue` in `lib/core/constants/app_strings.dart`.

## Codegen

Models are freezed + json_serializable; strings are ARB (`lib/l10n`, en/ar/tr).

```sh
dart run build_runner build   # after editing a model
flutter gen-l10n              # after editing an .arb (also runs on build)
```

## Layout

`lib/core` is shared (theme, router, network, generic widgets); every feature under
`lib/features/<name>` owns its `models / services / providers / screens / widgets`.
Providers never call Supabase directly, they go through the feature's service.
