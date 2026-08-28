import 'package:flutter/material.dart';

import '../../../core/extensions/context_ext.dart';
import '../models/content_source.dart';
import '../models/dorar_names.dart';

/// The book's bibliographic record, the same card dorar's own المصدر field opens.
class SourceBookDialog extends StatelessWidget {
  const SourceBookDialog({required this.book, super.key});

  final BookKey book;

  static Future<void> show(BuildContext context, BookKey book) => showDialog(
    context: context,
    builder: (_) => SourceBookDialog(book: book),
  );

  @override
  Widget build(BuildContext context) {
    final lang = context.lang;
    final l10n = context.l10n;
    final u = context.uswah;
    final b = book == BookKey.bukhari ? BookRecord.bukhari : BookRecord.muslim;
    final fields = [
      (l10n.bookFieldAuthor, b.author),
      (l10n.bookFieldEditor, b.editor),
      (l10n.bookFieldPublisher, b.publisher),
      (l10n.bookFieldEdition, b.edition),
      (l10n.bookFieldYear, b.year),
    ];

    return AlertDialog(
      title: Text(l10n.bookCardTitle, style: u.label.copyWith(fontSize: 13)),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: .min,
          crossAxisAlignment: .start,
          children: [
            Text.rich(
              TextSpan(
                children: [
                  TextSpan(
                    text: '${b.no}  ',
                    style: u.label.copyWith(fontSize: 13, color: u.brand),
                  ),
                  TextSpan(text: b.title[lang]),
                ],
              ),
              style: context.text.titleMedium,
            ),
            const SizedBox(height: 16),
            for (final (label, value) in fields) ...[
              Text(label, style: u.label.copyWith(fontSize: 12.5)),
              Text(value[lang]!, style: context.text.labelLarge),
              const SizedBox(height: 10),
            ],
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text(l10n.close),
        ),
      ],
    );
  }
}
