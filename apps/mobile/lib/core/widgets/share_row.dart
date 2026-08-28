import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';

import '../extensions/context_ext.dart';

/// WhatsApp · Telegram · X · copy link · system share, and the save button at
/// the far end. Icons carry their names as tooltips; no label needed.
class ShareRow extends StatelessWidget {
  const ShareRow({
    required this.title,
    required this.url,
    this.trailing,
    super.key,
  });

  final String title;
  final String url;

  /// Sits at the far end of the same rule (save button, share-as-image).
  final Widget? trailing;

  Future<void> _open(String target) =>
      launchUrl(Uri.parse(target), mode: .externalApplication);

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final u = context.uswah;
    final enc = Uri.encodeComponent;
    final targets = [
      (
        'WhatsApp',
        Icons.chat_bubble_outline,
        'https://wa.me/?text=${enc('$title $url')}',
      ),
      (
        'Telegram',
        Icons.send_outlined,
        'https://t.me/share/url?url=${enc(url)}&text=${enc(title)}',
      ),
      (
        'X',
        Icons.alternate_email,
        'https://x.com/intent/tweet?text=${enc(title)}&url=${enc(url)}',
      ),
    ];

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
        border: Border.symmetric(horizontal: BorderSide(color: u.rule)),
      ),
      child: Wrap(
        alignment: WrapAlignment.spaceBetween,
        crossAxisAlignment: WrapCrossAlignment.center,
        runSpacing: 8,
        children: [
          Row(
            mainAxisSize: .min,
            children: [
              for (final (name, icon, href) in targets)
                IconButton(
                  tooltip: name,
                  icon: Icon(icon, size: 20),
                  onPressed: () => _open(href),
                ),
              IconButton(
                tooltip: l10n.copyLink,
                icon: const Icon(Icons.link, size: 21),
                onPressed: () async {
                  await Clipboard.setData(ClipboardData(text: url));
                  if (context.mounted) {
                    ScaffoldMessenger.of(
                      context,
                    ).showSnackBar(SnackBar(content: Text(l10n.linkCopied)));
                  }
                },
              ),
              IconButton(
                tooltip: l10n.share,
                icon: const Icon(Icons.ios_share, size: 20),
                onPressed: () =>
                    SharePlus.instance.share(ShareParams(text: '$title $url')),
              ),
            ],
          ),
          ?trailing,
        ],
      ),
    );
  }
}
