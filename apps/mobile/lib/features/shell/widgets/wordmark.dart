import 'package:flutter/material.dart';

import '../../../core/constants/app_fonts.dart';
import '../../../core/extensions/context_ext.dart';
import '../../../core/extensions/text_style_ext.dart';

/// "Uswah" in Newsreader, أسوة in Thmanyah Serif Display Bold: the face the web's
/// SVG wordmark was traced from, so text is the mark here (fonts are bundled).
class Wordmark extends StatelessWidget {
  const Wordmark({this.size = 24, this.color, super.key});

  final double size;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final ar = context.lang == 'ar';
    return Text(
      ar ? 'أسوة' : 'Uswah',
      style: TextStyle(
        fontFamily: ar ? AppFonts.displayAr : AppFonts.display,
        fontSize: ar ? size * 1.15 : size,
        color: color ?? context.colors.onSurface,
        height: 1,
      ).w(700),
    );
  }
}
