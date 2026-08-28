import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';

import '../../../core/constants/app_fonts.dart';
import '../../../core/extensions/string_ext.dart';
import '../../../core/extensions/text_style_ext.dart';
import '../../sources/models/content_source.dart';
import '../models/card_options.dart';
import 'rosette.dart';

/// The share card at export size (1080×1920 and friends). The sheet scales it
/// down for preview and rasterises this same tree for sharing.
class QuoteCard extends StatelessWidget {
  const QuoteCard({
    required this.lang,
    required this.theyLabel,
    required this.weLabel,
    required this.saying,
    required this.original,
    required this.translation,
    required this.translatedBy,
    required this.grade,
    required this.source,
    required this.pageUrl,
    required this.options,
    super.key,
  });

  final String lang;
  final String theyLabel;
  final String weLabel;
  final String saying;
  final String? original;
  final SourceTranslation? translation;
  final String translatedBy;

  /// Null when the reference already names the grade.
  final String? grade;
  final String source;
  final String pageUrl;
  final CardOptions options;

  @override
  Widget build(BuildContext context) {
    final o = options;
    final theme = o.theme;
    final k = o.ratio.k;
    final w = o.ratio.w;
    final h = o.ratio.h;
    final rtl = lang == 'ar';
    final arabicFont = rtl ? AppFonts.arabic : AppFonts.latin;

    final verse = o.text == CardText.translation ? null : original;
    final gloss = o.text == CardText.original ? null : translation;
    final paired = verse != null && gloss != null;

    final len = verse?.lengthWithoutHarakat ?? 0;
    final verseSize =
        (len > 180
            ? 46
            : len > 110
            ? 56
            : len > 60
            ? 66
            : 78) *
        k *
        (paired ? .82 : 1);
    final glossLen = gloss?.text.length ?? 0;
    final glossOwn =
        (glossLen > 240
            ? 40
            : glossLen > 150
            ? 46
            : glossLen > 80
            ? 52
            : 60) *
        k;
    final glossSize = paired ? math.min(verseSize * .72, glossOwn) : glossOwn;
    final sayingSize =
        (saying.length > 70
            ? 34
            : saying.length > 45
            ? 40
            : 46) *
        k;

    final cross = switch (o.align) {
      CardAlign.start => CrossAxisAlignment.start,
      CardAlign.center => CrossAxisAlignment.center,
      CardAlign.end => CrossAxisAlignment.end,
      CardAlign.justify => CrossAxisAlignment.stretch,
    };
    final textAlign = switch (o.align) {
      CardAlign.start => TextAlign.start,
      CardAlign.center => TextAlign.center,
      CardAlign.end => TextAlign.end,
      CardAlign.justify => TextAlign.justify,
    };
    final ornament = math.min(w, h) * .62;

    Widget eyebrow(String text, Color colour, Color rule) => Row(
      mainAxisSize: .min,
      children: [
        Container(width: 28 * k, height: 1, color: rule),
        SizedBox(width: 14 * k),
        Text(
          rtl ? text : text.toUpperCase(),
          style: TextStyle(
            fontSize: 26 * k,
            color: colour,
            fontFamily: arabicFont,
            letterSpacing: rtl ? 0 : 26 * k * .08,
            height: 1.2,
          ).w(400),
        ),
        SizedBox(width: 14 * k),
        Container(width: 28 * k, height: 1, color: rule),
      ],
    );

    return Directionality(
      textDirection: rtl ? .rtl : .ltr,
      child: SizedBox(
        width: w,
        height: h,
        child: ClipRect(
          child: Stack(
            children: [
              Positioned.fill(child: ColoredBox(color: theme.bg)),
              Positioned(
                left: -ornament * .34,
                top: -ornament * .32,
                child: Rosette(
                  color: theme.ornament,
                  size: ornament,
                  strokeWidth: 2,
                ),
              ),
              Positioned(
                right: -ornament * .34,
                bottom: -ornament * .32,
                child: Rosette(
                  color: theme.ornament,
                  size: ornament,
                  strokeWidth: 2,
                ),
              ),
              if (o.mark)
                Positioned(
                  top: 64 * k,
                  right: 64 * k,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(14),
                    child: Image.asset(
                      'assets/images/mark.png',
                      width: 84 * k,
                      height: 84 * k,
                    ),
                  ),
                ),
              if (o.qr)
                Positioned(
                  bottom: 64 * k,
                  left: 64 * k,
                  child: Opacity(
                    opacity: .85,
                    child: QrImageView(
                      data: pageUrl,
                      size: 112 * k,
                      padding: EdgeInsets.zero,
                      eyeStyle: QrEyeStyle(
                        eyeShape: QrEyeShape.square,
                        color: theme.ink,
                      ),
                      dataModuleStyle: QrDataModuleStyle(
                        dataModuleShape: QrDataModuleShape.square,
                        color: theme.ink,
                      ),
                    ),
                  ),
                ),
              Padding(
                padding: EdgeInsets.symmetric(
                  vertical: 130 * k,
                  horizontal: 90 * k,
                ),
                child: Center(
                  child: Column(
                    mainAxisSize: .min,
                    crossAxisAlignment: cross,
                    children: [
                      Align(
                        alignment: .center,
                        child: eyebrow(theyLabel, theme.quiet, theme.ornament),
                      ),
                      SizedBox(height: 34 * k),
                      Directionality(
                        textDirection: saying.isArabicScript ? .rtl : .ltr,
                        child: Text(
                          saying,
                          textAlign: textAlign,
                          style: TextStyle(
                            fontSize: sayingSize,
                            height: saying.isArabicScript ? 1.7 : 1.4,
                            color: theme.muted,
                            fontFamily: saying.isArabicScript
                                ? AppFonts.arabic
                                : AppFonts.latin,
                          ).w(400),
                        ),
                      ),
                      if (verse != null || gloss != null) ...[
                        SizedBox(height: 34 * k),
                        Align(
                          alignment: .center,
                          child: Rosette(
                            color: theme.ornament,
                            size: 54 * k,
                            strokeWidth: 2,
                          ),
                        ),
                        SizedBox(height: 44 * k),
                        Align(
                          alignment: .center,
                          child: eyebrow(weLabel, theme.brand, theme.brand),
                        ),
                        if (verse != null) ...[
                          SizedBox(height: 34 * k),
                          Directionality(
                            textDirection: .rtl,
                            child: Text(
                              verse,
                              textAlign: textAlign,
                              style: TextStyle(
                                fontSize: verseSize,
                                height: o.font == CardFont.naskh ? 2 : 1.85,
                                color: theme.ink,
                                fontFamily: o.font == CardFont.naskh
                                    ? AppFonts.scripture
                                    : AppFonts.arabic,
                              ).w(500),
                            ),
                          ),
                        ],
                        if (gloss != null) ...[
                          SizedBox(height: 34 * k),
                          Directionality(
                            textDirection: gloss.text.isArabicScript
                                ? .rtl
                                : .ltr,
                            child: Column(
                              crossAxisAlignment: cross,
                              children: [
                                Text(
                                  '“${gloss.text}”',
                                  textAlign: textAlign,
                                  style: TextStyle(
                                    fontSize: glossSize,
                                    height: 1.55,
                                    color: paired ? theme.muted : theme.ink,
                                    fontFamily: gloss.text.isArabicScript
                                        ? AppFonts.arabic
                                        : AppFonts.display,
                                  ).w(400),
                                ),
                                SizedBox(height: 14 * k),
                                Text(
                                  '$translatedBy ${gloss.translator}',
                                  textAlign: textAlign,
                                  style: TextStyle(
                                    fontSize: math.max(glossSize * .52, 22 * k),
                                    height: 1.4,
                                    color: theme.quiet,
                                    fontFamily: arabicFont,
                                  ).w(400),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ],
                    ],
                  ),
                ),
              ),
              Positioned(
                bottom: 72 * k,
                left: 0,
                right: 0,
                child: Row(
                  mainAxisAlignment: .center,
                  children: [
                    if (grade case final g?) ...[
                      Text(
                        g,
                        style: TextStyle(
                          fontSize: 30 * k,
                          color: theme.muted,
                          fontFamily: arabicFont,
                        ).w(400),
                      ),
                      SizedBox(width: 14 * k),
                      Container(
                        width: 5 * k,
                        height: 5 * k,
                        decoration: BoxDecoration(
                          color: theme.ornament,
                          shape: BoxShape.circle,
                        ),
                      ),
                      SizedBox(width: 14 * k),
                    ],
                    Text(
                      source,
                      style: TextStyle(
                        fontSize: 30 * k,
                        color: theme.muted,
                        fontFamily: arabicFont,
                      ).w(400),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
