import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../constants/app_strings.dart';
import '../extensions/context_ext.dart';

/// Artwork from the site. Relative `/art/...` paths resolve against the web origin.
class AppImage extends StatelessWidget {
  const AppImage(
    this.url, {
    this.aspectRatio,
    this.radius = 12,
    this.fit = BoxFit.cover,
    super.key,
  });

  final String url;
  final double? aspectRatio;
  final double radius;
  final BoxFit fit;

  static String resolve(String url) =>
      url.startsWith('http') ? url : '${AppStrings.siteUrl}$url';

  @override
  Widget build(BuildContext context) {
    final image = CachedNetworkImage(
      imageUrl: resolve(url),
      fit: fit,
      placeholder: (_, _) => ColoredBox(color: context.colors.secondary),
      errorWidget: (_, _, _) => ColoredBox(color: context.colors.secondary),
    );
    return ClipRRect(
      borderRadius: BorderRadius.circular(radius),
      child: aspectRatio == null
          ? image
          : AspectRatio(aspectRatio: aspectRatio!, child: image),
    );
  }
}
