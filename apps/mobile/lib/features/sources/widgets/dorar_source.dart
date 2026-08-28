import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/extensions/context_ext.dart';
import '../models/content_source.dart';
import '../models/dorar_names.dart';
import '../models/dorar_ref.dart';
import 'source_book_dialog.dart';

/// The dorar.net apparatus for a cited hadith: labelled fields, the topical chips
/// (Arabic only, dorar's taxonomy has no translation), then the credit linking
/// to their permalink.
class DorarSource extends StatelessWidget {
  const DorarSource({required this.dorar, this.book, super.key});

  final DorarRef dorar;
  final BookKey? book;

  @override
  Widget build(BuildContext context) {
    final lang = context.lang;
    final l10n = context.l10n;
    final u = context.uswah;
    final fieldStyle = u.label.copyWith(fontSize: 13);
    final valueStyle = fieldStyle.copyWith(
      color: context.colors.onSurface,
      fontWeight: FontWeight.w600,
    );

    Widget field(String label, Widget value) => Wrap(
      crossAxisAlignment: .center,
      children: [
        Text('$label : ', style: fieldStyle),
        value,
      ],
    );

    return Column(
      crossAxisAlignment: .start,
      spacing: 6,
      children: [
        if (dorar.rawi != '-')
          field(
            l10n.dorarNarrator,
            Text(DorarNames.name(dorar.rawi, lang), style: valueStyle),
          ),
        field(
          l10n.dorarGradedBy,
          Text(DorarNames.name(dorar.mohdith, lang), style: valueStyle),
        ),
        if (book case final b?)
          field(
            l10n.dorarSource,
            InkWell(
              onTap: () => SourceBookDialog.show(context, b),
              child: Text(
                (b == BookKey.bukhari ? BookRecord.bukhari : BookRecord.muslim)
                    .name[lang]!,
                style: valueStyle.copyWith(
                  decoration: TextDecoration.underline,
                  decorationColor: u.faint,
                ),
              ),
            ),
          ),
        if (!dorar.gradedByCollection)
          field(
            l10n.dorarRuling,
            Text(DorarNames.grade(dorar.grade, lang), style: valueStyle),
          ),
        if (lang == 'ar' && dorar.themes.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 6),
            child: Wrap(
              spacing: 6,
              runSpacing: 6,
              children: [
                for (final c in dorar.themes)
                  ActionChip(
                    label: Text(c.name),
                    labelStyle: fieldStyle.copyWith(
                      color: context.colors.onSurface,
                    ),
                    visualDensity: .compact,
                    onPressed: () =>
                        launchUrl(Uri.parse(c.url), mode: .externalApplication),
                  ),
              ],
            ),
          ),
        Padding(
          padding: const EdgeInsets.only(top: 6),
          child: InkWell(
            onTap: () => launchUrl(
              Uri.parse(dorar.permalink),
              mode: .externalApplication,
            ),
            child: Text(
              l10n.dorarLabel,
              style: fieldStyle.copyWith(
                color: u.brand,
                decoration: TextDecoration.underline,
                decorationColor: u.brand,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
