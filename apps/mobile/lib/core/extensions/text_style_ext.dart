import 'package:flutter/material.dart';

extension TextStyleExt on TextStyle {
  /// Variable fonts (Inter, Newsreader, Naskh) need the `wght` axis set; static
  /// OTFs (Thmanyah) ignore it and pick the weight from [fontWeight].
  TextStyle w(int weight) => copyWith(
    fontWeight: FontWeight.values[(weight ~/ 100 - 1).clamp(0, 8)],
    fontVariations: [FontVariation.weight(weight.toDouble())],
  );
}
