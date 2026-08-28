import 'package:flutter/material.dart';

/// The four-petal ornament from public/ornament.svg, drawn rather than shipped.
class Rosette extends StatelessWidget {
  const Rosette({
    required this.color,
    required this.size,
    this.strokeWidth = 1,
    super.key,
  });

  final Color color;
  final double size;
  final double strokeWidth;

  @override
  Widget build(BuildContext context) => CustomPaint(
    size: Size.square(size),
    painter: _RosettePainter(color, strokeWidth),
  );
}

class _RosettePainter extends CustomPainter {
  const _RosettePainter(this.color, this.strokeWidth);

  final Color color;
  final double strokeWidth;

  // viewBox 0 0 734 731
  static final _petals = [
    Path()
      ..moveTo(366.952, 364.857)
      ..cubicTo(549.954, 192.357, 544.454, 169.357, 366.952, 1.357)
      ..cubicTo(185.455, 162.857, 183.454, 197.357, 366.952, 364.857)
      ..close(),
    Path()
      ..moveTo(366.952, 728.857)
      ..cubicTo(549.954, 556.357, 544.454, 533.357, 366.952, 365.357)
      ..cubicTo(185.455, 526.857, 183.454, 561.357, 366.952, 728.857)
      ..close(),
    Path()
      ..moveTo(369.078, 366.231)
      ..cubicTo(541.578, 549.234, 564.578, 543.734, 732.578, 366.231)
      ..cubicTo(571.078, 184.735, 536.578, 182.733, 369.078, 366.231)
      ..close(),
    Path()
      ..moveTo(1.364, 365.946)
      ..cubicTo(173.864, 548.948, 196.864, 543.448, 364.864, 365.946)
      ..cubicTo(203.364, 184.449, 168.864, 182.447, 1.364, 365.946)
      ..close(),
  ];

  @override
  void paint(Canvas canvas, Size size) {
    final scale = size.width / 734;
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth / scale;
    canvas.scale(scale, scale);
    for (final p in _petals) {
      canvas.drawPath(p, paint);
    }
  }

  @override
  bool shouldRepaint(_RosettePainter old) =>
      old.color != color || old.strokeWidth != strokeWidth;
}
