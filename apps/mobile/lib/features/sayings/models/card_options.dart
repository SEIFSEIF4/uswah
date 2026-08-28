import 'package:flutter/material.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'card_options.freezed.dart';
part 'card_options.g.dart';

enum CardGround {
  warm(
    bg: Color(0xFFFAF8F4),
    ink: Color(0xFF14181F),
    muted: Color(0xFF8A919C),
    quiet: Color(0xFFA9A49C),
    ornament: Color(0xFFE0D8C8),
    brand: Color(0xFF7D2B1D),
  ),
  paper(
    bg: Color(0xFFFFFFFF),
    ink: Color(0xFF14181F),
    muted: Color(0xFF8A919C),
    quiet: Color(0xFFA9A49C),
    ornament: Color(0xFFEBE4D8),
    brand: Color(0xFF7D2B1D),
  ),
  dark(
    bg: Color(0xFF241D18),
    ink: Color(0xFFF4F1EA),
    muted: Color(0xFFA89B8A),
    quiet: Color(0xFF8D8175),
    ornament: Color(0xFF4A3F35),
    brand: Color(0xFFE8A08D),
  );

  const CardGround({
    required this.bg,
    required this.ink,
    required this.muted,
    required this.quiet,
    required this.ornament,
    required this.brand,
  });

  final Color bg;
  final Color ink;
  final Color muted;
  final Color quiet;
  final Color ornament;
  final Color brand;
}

/// Export sizes; the preview is the same layout scaled down.
enum CardRatio {
  story(1080, 1920),
  square(1080, 1080),
  wide(1920, 1080);

  const CardRatio(this.w, this.h);

  final double w;
  final double h;

  /// One composition; the shorter canvases run the same design smaller.
  double get k => switch (this) {
    story => 1,
    square => .62,
    wide => .68,
  };
}

enum CardFont { naskh, serif }

enum CardAlign { start, center, end, justify }

/// Which forms of the source the card carries.
enum CardText { both, original, translation }

@freezed
abstract class CardOptions with _$CardOptions {
  const factory CardOptions({
    @Default(CardGround.warm) CardGround theme,
    @Default(CardText.both) CardText text,
    @Default(CardFont.naskh) CardFont font,
    @Default(CardRatio.story) CardRatio ratio,
    @Default(CardAlign.center) CardAlign align,
    @Default(true) bool qr,
    @Default(true) bool mark,
  }) = _CardOptions;

  factory CardOptions.fromJson(Map<String, dynamic> json) =>
      _$CardOptionsFromJson(json);
}
