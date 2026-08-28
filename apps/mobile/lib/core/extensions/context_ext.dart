import 'package:flutter/material.dart';

import '../../l10n/app_localizations.dart';
import '../theme/uswah_theme.dart';

extension ContextExt on BuildContext {
  AppLocalizations get l10n => AppLocalizations.of(this)!;
  ThemeData get theme => Theme.of(this);
  TextTheme get text => Theme.of(this).textTheme;
  ColorScheme get colors => Theme.of(this).colorScheme;
  UswahTheme get uswah => Theme.of(this).extension<UswahTheme>()!;

  /// 'en' | 'ar' | 'tr'
  String get lang => Localizations.localeOf(this).languageCode;
  bool get isRtl => Directionality.of(this) == TextDirection.rtl;
}
