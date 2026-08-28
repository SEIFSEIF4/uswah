import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:share_plus/share_plus.dart';

import '../../../core/extensions/context_ext.dart';
import '../../sources/models/content_source.dart';
import '../models/card_options.dart';
import 'quote_card.dart';

/// "Share as image": the preview IS the card, one widget tree laid out at export
/// size, scaled down here and snapshotted at full size for sharing.
class ShareCardSheet extends StatefulWidget {
  const ShareCardSheet({
    required this.slug,
    required this.saying,
    required this.original,
    required this.translation,
    required this.grade,
    required this.source,
    required this.pageUrl,
    super.key,
  });

  final String slug;
  final String saying;
  final String? original;
  final SourceTranslation? translation;
  final String grade;
  final String source;
  final String pageUrl;

  static Future<void> show(BuildContext context, ShareCardSheet sheet) =>
      showModalBottomSheet(
        context: context,
        isScrollControlled: true,
        useSafeArea: true,
        builder: (_) => sheet,
      );

  @override
  State<ShareCardSheet> createState() => _ShareCardSheetState();
}

class _ShareCardSheetState extends State<ShareCardSheet> {
  final _card = GlobalKey();
  var _options = const CardOptions();
  var _busy = false;

  Future<void> _share() async {
    setState(() => _busy = true);
    try {
      final boundary =
          _card.currentContext!.findRenderObject()! as RenderRepaintBoundary;
      // The preview is scaled to fit; pixelRatio brings it back to export size.
      final scale = _options.ratio.w / boundary.size.width;
      final image = await boundary.toImage(pixelRatio: scale);
      final bytes = (await image.toByteData(
        format: ui.ImageByteFormat.png,
      ))!.buffer.asUint8List();
      await SharePlus.instance.share(
        ShareParams(
          files: [
            XFile.fromData(
              bytes,
              mimeType: 'image/png',
              name: 'uswah-${widget.slug}.png',
            ),
          ],
        ),
      );
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final u = context.uswah;
    final o = _options;
    final gloss = widget.translation;
    final verseOnCard =
        widget.original != null && o.text != CardText.translation;

    return DraggableScrollableSheet(
      expand: false,
      initialChildSize: .92,
      maxChildSize: .96,
      builder: (context, controller) => ListView(
        controller: controller,
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  l10n.shareThisSaying,
                  style: context.text.titleLarge,
                ),
              ),
              IconButton(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.close),
                tooltip: l10n.close,
              ),
            ],
          ),
          const SizedBox(height: 12),
          Center(
            child: LayoutBuilder(
              builder: (context, c) {
                final maxW = c.maxWidth;
                final scale =
                    (o.ratio == CardRatio.wide ? maxW : maxW * .72) / o.ratio.w;
                return ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: SizedBox(
                    width: o.ratio.w * scale,
                    height: o.ratio.h * scale,
                    child: FittedBox(
                      child: RepaintBoundary(
                        key: _card,
                        child: QuoteCard(
                          lang: context.lang,
                          theyLabel: l10n.theySay,
                          weLabel: l10n.weSay,
                          saying: widget.saying,
                          original: widget.original,
                          translation: gloss,
                          translatedBy: l10n.translatedBy,
                          // The reference often names the grade already.
                          grade: widget.source.contains(widget.grade)
                              ? null
                              : widget.grade,
                          source: widget.source,
                          pageUrl: widget.pageUrl,
                          options: o,
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 20),
          if (gloss != null && widget.original != null)
            _Field(
              l10n.cardText,
              children: [
                for (final t in CardText.values)
                  _Choice(
                    label: switch (t) {
                      CardText.both => l10n.cardBoth,
                      CardText.original => l10n.cardOriginal,
                      CardText.translation => l10n.cardTranslation,
                    },
                    selected: o.text == t,
                    onTap: () => setState(() => _options = o.copyWith(text: t)),
                  ),
              ],
            ),
          _Field(
            l10n.cardGround,
            children: [
              for (final t in CardGround.values)
                Tooltip(
                  message: switch (t) {
                    CardGround.warm => l10n.warm,
                    CardGround.paper => l10n.paper,
                    CardGround.dark => l10n.ink,
                  },
                  child: InkWell(
                    onTap: () =>
                        setState(() => _options = o.copyWith(theme: t)),
                    borderRadius: BorderRadius.circular(999),
                    child: Container(
                      width: 32,
                      height: 32,
                      decoration: BoxDecoration(
                        color: t.bg,
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: o.theme == t ? u.brand : u.rule,
                          width: o.theme == t ? 2 : 1,
                        ),
                      ),
                    ),
                  ),
                ),
            ],
          ),
          _Field(
            l10n.cardDimensions,
            children: [
              for (final r in CardRatio.values)
                _Choice(
                  icon: switch (r) {
                    CardRatio.story => Icons.crop_portrait,
                    CardRatio.square => Icons.crop_square,
                    CardRatio.wide => Icons.crop_landscape,
                  },
                  label: switch (r) {
                    CardRatio.story => l10n.story,
                    CardRatio.square => l10n.square,
                    CardRatio.wide => l10n.wide,
                  },
                  selected: o.ratio == r,
                  onTap: () => setState(() => _options = o.copyWith(ratio: r)),
                ),
            ],
          ),
          _Field(
            l10n.cardAlignment,
            children: [
              for (final a in CardAlign.values)
                _Choice(
                  icon: switch (a) {
                    CardAlign.start =>
                      context.isRtl
                          ? Icons.format_align_right
                          : Icons.format_align_left,
                    CardAlign.center => Icons.format_align_center,
                    CardAlign.end =>
                      context.isRtl
                          ? Icons.format_align_left
                          : Icons.format_align_right,
                    CardAlign.justify => Icons.format_align_justify,
                  },
                  selected: o.align == a,
                  onTap: () => setState(() => _options = o.copyWith(align: a)),
                ),
            ],
          ),
          if (verseOnCard)
            _Field(
              l10n.cardType,
              children: [
                for (final f in CardFont.values)
                  _Choice(
                    label: f == CardFont.naskh ? l10n.naskh : l10n.serif,
                    selected: o.font == f,
                    onTap: () => setState(() => _options = o.copyWith(font: f)),
                  ),
              ],
            ),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            title: Text(l10n.cardQr, style: context.text.labelLarge),
            subtitle: Text(l10n.cardQrNote, style: context.text.bodySmall),
            value: o.qr,
            onChanged: (v) => setState(() => _options = o.copyWith(qr: v)),
          ),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            title: Text(l10n.cardLogo, style: context.text.labelLarge),
            subtitle: Text(l10n.cardLogoNote, style: context.text.bodySmall),
            value: o.mark,
            onChanged: (v) => setState(() => _options = o.copyWith(mark: v)),
          ),
          const SizedBox(height: 16),
          FilledButton.icon(
            onPressed: _busy ? null : _share,
            icon: const Icon(Icons.ios_share, size: 18),
            label: Text(l10n.cardShare),
          ),
          const SizedBox(height: 8),
          TextButton(
            onPressed: () async {
              await Clipboard.setData(ClipboardData(text: widget.pageUrl));
              if (context.mounted) {
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(SnackBar(content: Text(l10n.linkCopied)));
              }
            },
            child: Text(l10n.copyLink),
          ),
        ],
      ),
    );
  }
}

class _Field extends StatelessWidget {
  const _Field(this.label, {required this.children});

  final String label;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 8),
    child: Row(
      children: [
        SizedBox(
          width: 96,
          child: Text(label, style: context.text.labelMedium),
        ),
        Expanded(child: Wrap(spacing: 8, runSpacing: 8, children: children)),
      ],
    ),
  );
}

class _Choice extends StatelessWidget {
  const _Choice({
    required this.selected,
    required this.onTap,
    this.label,
    this.icon,
  });

  final bool selected;
  final VoidCallback onTap;
  final String? label;
  final IconData? icon;

  @override
  Widget build(BuildContext context) => ChoiceChip(
    selected: selected,
    onSelected: (_) => onTap(),
    tooltip: icon != null ? label : null,
    labelStyle: context.uswah.label.copyWith(
      fontSize: 13,
      color: selected ? context.colors.onPrimary : context.colors.onSurface,
    ),
    label: icon != null
        ? Icon(
            icon,
            size: 18,
            color: selected
                ? context.colors.onPrimary
                : context.colors.onSurface,
          )
        : Text(label!),
  );
}
