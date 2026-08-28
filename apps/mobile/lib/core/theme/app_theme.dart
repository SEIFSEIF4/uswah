import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../constants/app_colors.dart';
import '../constants/app_fonts.dart';
import '../extensions/text_style_ext.dart';
import 'uswah_theme.dart';

/// Restrained strategy: warm paper and ink, one accent (oxblood) reserved for
/// the primary action, the current selection and the bookmark. Built per
/// locale, because Arabic uses a different type system, not just RTL.
abstract final class AppTheme {
  static ThemeData light(String lang) => _build(Brightness.light, lang);
  static ThemeData dark(String lang) => _build(Brightness.dark, lang);

  static ThemeData _build(Brightness brightness, String lang) {
    final isDark = brightness == Brightness.dark;
    final isArabic = lang == 'ar';

    final background = isDark ? AppColors.backgroundDark : AppColors.background;
    final foreground = isDark ? AppColors.foregroundDark : AppColors.foreground;
    final card = isDark ? AppColors.cardDark : AppColors.card;
    final secondary = isDark ? AppColors.secondaryDark : AppColors.secondary;
    final muted = isDark
        ? AppColors.mutedForegroundDark
        : AppColors.mutedForeground;
    final border = isDark ? AppColors.borderDark : AppColors.border;
    final brand = isDark ? AppColors.brandDark : AppColors.brand;
    final onBrand = isDark ? AppColors.backgroundDark : AppColors.background;
    final destructive = isDark
        ? AppColors.destructiveDark
        : AppColors.destructive;

    final displayFamily = isArabic ? AppFonts.displayAr : AppFonts.display;
    final bodyFamily = isArabic ? AppFonts.arabic : AppFonts.display;
    final labelFamily = isArabic ? AppFonts.arabic : AppFonts.latin;

    // ﷺ and stray Arabic inside Latin text fall through to a face that has them.
    const fallback = [AppFonts.scripture, AppFonts.arabic];
    final display = TextStyle(
      fontFamily: displayFamily,
      fontFamilyFallback: fallback,
      color: foreground,
      height: isArabic ? 1.5 : 1.12,
    );
    final body = TextStyle(
      fontFamily: bodyFamily,
      fontFamilyFallback: fallback,
      color: foreground,
      height: isArabic ? 1.9 : 1.6,
    );
    final label = TextStyle(
      fontFamily: labelFamily,
      fontFamilyFallback: fallback,
      color: muted,
      height: 1.4,
    );
    final scripture = TextStyle(
      fontFamily: AppFonts.scripture,
      color: foreground,
      height: 2.05,
      fontSize: 21,
    );

    final scheme = ColorScheme(
      brightness: brightness,
      primary: brand,
      onPrimary: onBrand,
      secondary: secondary,
      onSecondary: foreground,
      secondaryContainer: secondary,
      onSecondaryContainer: foreground,
      surface: background,
      onSurface: foreground,
      surfaceContainer: card,
      surfaceContainerHigh: card,
      surfaceContainerHighest: secondary,
      onSurfaceVariant: muted,
      outline: border,
      outlineVariant: border,
      error: destructive,
      onError: background,
      tertiary: foreground,
      onTertiary: background,
    );

    final textTheme = TextTheme(
      displaySmall: display.copyWith(fontSize: 32).w(500),
      headlineMedium: display.copyWith(fontSize: 27).w(500),
      headlineSmall: display.copyWith(fontSize: 22).w(500),
      titleLarge: display.copyWith(fontSize: 19.5).w(500),
      titleMedium: body.copyWith(fontSize: 17).w(500),
      titleSmall: label.copyWith(fontSize: 14, color: foreground).w(600),
      bodyLarge: body.copyWith(fontSize: 18).w(400),
      bodyMedium: body.copyWith(fontSize: 17).w(400),
      bodySmall: body.copyWith(fontSize: 15, color: muted).w(400),
      labelLarge: label.copyWith(fontSize: 14, color: foreground).w(500),
      labelMedium: label.copyWith(fontSize: 12.5).w(500),
      labelSmall: label.copyWith(fontSize: 11.5).w(500),
    );

    final stadium = const StadiumBorder();

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: scheme,
      scaffoldBackgroundColor: background,
      canvasColor: background,
      fontFamily: bodyFamily,
      textTheme: textTheme,
      dividerColor: border,
      dividerTheme: DividerThemeData(color: border, thickness: 1, space: 1),
      splashFactory: InkSparkle.splashFactory,
      appBarTheme: AppBarTheme(
        backgroundColor: background,
        foregroundColor: foreground,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: false,
        titleSpacing: 20,
        iconTheme: IconThemeData(color: foreground, size: 22),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: card,
        indicatorColor: brand.withValues(alpha: isDark ? .22 : .12),
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        height: 66,
        labelTextStyle: WidgetStateProperty.resolveWith(
          (s) => textTheme.labelMedium!.copyWith(
            color: s.contains(WidgetState.selected) ? foreground : muted,
          ),
        ),
        iconTheme: WidgetStateProperty.resolveWith(
          (s) => IconThemeData(
            color: s.contains(WidgetState.selected) ? brand : muted,
            size: 22,
          ),
        ),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: brand,
          foregroundColor: onBrand,
          textStyle: textTheme.labelLarge,
          shape: stadium,
          minimumSize: const Size(48, 48),
          padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 12),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: foreground,
          side: BorderSide(color: border),
          textStyle: textTheme.labelLarge,
          shape: stadium,
          minimumSize: const Size(48, 44),
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: brand,
          textStyle: textTheme.labelLarge,
          minimumSize: const Size(48, 44),
        ),
      ),
      iconButtonTheme: IconButtonThemeData(
        style: IconButton.styleFrom(
          foregroundColor: foreground,
          minimumSize: const Size(48, 48),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: card,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 14,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide(color: border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide(color: border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide(color: brand, width: 1.5),
        ),
        hintStyle: textTheme.bodyMedium!.copyWith(color: muted),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: card,
        selectedColor: foreground,
        side: BorderSide(color: border),
        labelStyle: textTheme.labelLarge,
        secondaryLabelStyle: textTheme.labelLarge!.copyWith(color: background),
        shape: stadium,
        showCheckmark: false,
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      ),
      dialogTheme: DialogThemeData(
        backgroundColor: card,
        surfaceTintColor: Colors.transparent,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(22)),
      ),
      bottomSheetTheme: BottomSheetThemeData(
        backgroundColor: card,
        surfaceTintColor: Colors.transparent,
        showDragHandle: true,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: foreground,
        contentTextStyle: textTheme.labelLarge!.copyWith(color: background),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith(
          (s) => s.contains(WidgetState.selected) ? onBrand : muted,
        ),
        trackColor: WidgetStateProperty.resolveWith(
          (s) => s.contains(WidgetState.selected) ? brand : secondary,
        ),
        trackOutlineColor: WidgetStateProperty.resolveWith(
          (s) => s.contains(WidgetState.selected) ? brand : border,
        ),
      ),
      pageTransitionsTheme: const PageTransitionsTheme(
        builders: {
          TargetPlatform.android: PredictiveBackPageTransitionsBuilder(),
          TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
        },
      ),
      extensions: [
        UswahTheme(
          brand: brand,
          faint: isDark ? AppColors.faintDark : AppColors.faint,
          rule: border,
          surface: card,
          gradeStrong: isDark
              ? AppColors.gradeStrongDark
              : AppColors.gradeStrong,
          gradeHasan: isDark ? AppColors.gradeHasanDark : AppColors.gradeHasan,
          gradeDisputed: isDark
              ? AppColors.gradeDisputedDark
              : AppColors.gradeDisputed,
          display: display,
          body: body,
          label: label,
          scripture: scripture,
          isArabic: isArabic,
        ),
      ],
    );
  }
}
