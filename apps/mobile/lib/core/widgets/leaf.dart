import 'package:flutter/material.dart';

import '../extensions/context_ext.dart';

/// A sheet of paper on the desk: the one container the app uses. Hairline edge,
/// a real offset shadow, corners like card stock. [lifted] deepens the shadow
/// for the leaf being dragged.
class Leaf extends StatelessWidget {
  const Leaf({
    required this.child,
    this.padding = const EdgeInsets.all(20),
    this.lifted = false,
    this.onTap,
    this.clip = false,
    this.color,
    this.quiet = false,
    super.key,
  });

  final Widget child;
  final EdgeInsetsGeometry padding;
  final bool lifted;
  final VoidCallback? onTap;
  final bool clip;

  /// Paper tone override (the pile's deeper sheets).
  final Color? color;

  /// Lighter shadow for rows in a list, so the desk's top sheet stays the loudest.
  final bool quiet;

  static const radius = 18.0;

  static List<BoxShadow> shadow(
    BuildContext context, {
    bool lifted = false,
    bool quiet = false,
  }) {
    final dark = context.theme.brightness == Brightness.dark;
    final ink = dark ? Colors.black : const Color(0xFF241D18);
    return [
      BoxShadow(
        color: ink.withValues(alpha: dark ? .5 : .07),
        offset: const Offset(0, 1),
        blurRadius: 2,
      ),
      BoxShadow(
        color: ink.withValues(
          alpha: dark
              ? (quiet ? .35 : .55)
              : (lifted ? .22 : (quiet ? .06 : .10)),
        ),
        offset: Offset(0, lifted ? 18 : (quiet ? 4 : 8)),
        blurRadius: lifted ? 40 : (quiet ? 12 : 22),
        spreadRadius: lifted ? -4 : -6,
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    final u = context.uswah;
    final body = Padding(padding: padding, child: child);
    return AnimatedContainer(
      duration: const Duration(milliseconds: 180),
      curve: Curves.easeOutCubic,
      decoration: BoxDecoration(
        color: color ?? u.surface,
        borderRadius: BorderRadius.circular(radius),
        border: Border.all(color: u.rule),
        boxShadow: shadow(context, lifted: lifted, quiet: quiet),
      ),
      clipBehavior: clip ? Clip.antiAlias : Clip.none,
      child: onTap == null
          ? body
          : Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: onTap,
                borderRadius: BorderRadius.circular(radius),
                child: body,
              ),
            ),
    );
  }
}

/// The oxblood bookmark tucked over a leaf's corner: the one mark of a saved item.
class BookmarkRibbon extends StatelessWidget {
  const BookmarkRibbon({this.size = 22, super.key});

  final double size;

  @override
  Widget build(BuildContext context) => CustomPaint(
    size: Size(size, size * 1.6),
    painter: _RibbonPainter(context.uswah.brand),
  );
}

class _RibbonPainter extends CustomPainter {
  const _RibbonPainter(this.color);

  final Color color;

  @override
  void paint(Canvas canvas, Size s) {
    final path = Path()
      ..moveTo(0, 0)
      ..lineTo(s.width, 0)
      ..lineTo(s.width, s.height)
      ..lineTo(s.width / 2, s.height * .78)
      ..lineTo(0, s.height)
      ..close();
    canvas.drawShadow(path, Colors.black, 2, true);
    canvas.drawPath(path, Paint()..color = color);
  }

  @override
  bool shouldRepaint(_RibbonPainter old) => old.color != color;
}
