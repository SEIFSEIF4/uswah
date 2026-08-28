import 'package:flutter/material.dart';

/// Mirrors `apps/web/app/globals.css` `:root` and `.dark` tokens.
abstract final class AppColors {
  // Light
  static const background = Color(0xFFFAF8F4);
  static const foreground = Color(0xFF14181F);
  static const card = Color(0xFFFFFFFF);
  static const secondary = Color(0xFFF1ECE2);
  static const mutedForeground = Color(0xFF59606C);
  static const destructive = Color(0xFF8C3A2B);
  static const border = Color(0xFFE3DED4);
  static const ring = Color(0xFF7D2B1D);
  static const brand = Color(0xFF7D2B1D);
  static const faint = Color(0xFF6B7280);

  // Dark: tuned for reading, never pure black / pure white.
  static const backgroundDark = Color(0xFF15171C);
  static const foregroundDark = Color(0xFFE3DFD8);
  static const cardDark = Color(0xFF1D2027);
  static const secondaryDark = Color(0xFF1D232C);
  static const accentDark = Color(0xFF232830);
  static const mutedForegroundDark = Color(0xFFA8AFBA);
  static const destructiveDark = Color(0xFFE08D7A);
  static const borderDark = Color(0xFF2B303A);
  static const ringDark = Color(0xFFEC7A5C);
  static const brandDark = Color(0xFFD5907C);
  static const faintDark = Color(0xFF868E9A);

  // Grade colours (.grade-*)
  static const gradeStrong = Color(0xFF2F6B4F); // quran, sahih
  static const gradeHasan = Color(0xFF2C5A86);
  static const gradeDisputed = Color(0xFF8A5A12);
  static const gradeStrongDark = Color(0xFF7FC09B);
  static const gradeHasanDark = Color(0xFF86B2E0);
  static const gradeDisputedDark = Color(0xFFD9A95F);

  // Identity
  static const sand = Color(0xFFE4D9C6);
  static const inkBrand = Color(0xFF241D18);
}
