import 'package:supabase_flutter/supabase_flutter.dart';

import '../../sources/models/content_source.dart';
import '../../sources/models/dorar_ref.dart';
import '../models/saying.dart';

/// Mirrors `loadQuotes` in apps/web/lib/content.ts.
class SayingsService {
  const SayingsService(this._db);

  final SupabaseClient _db;

  Future<List<Saying>> fetchAll(Map<String, DorarRef> cited) async {
    final rows = await _db
        .from('sayings')
        .select(
          'id, slug, saying, grade, situation_slug, source_original, created_at, '
          'saying_translations(locale, saying, angle, closeness, source_label, source_text, source_translator)',
        )
        .order('created_at', ascending: true);

    final out = <Saying>[];
    for (final r in rows) {
      final tr = {
        for (final t in r['saying_translations'] as List)
          t['locale'] as String: t as Map,
      };
      if (!['en', 'ar', 'tr'].every(tr.containsKey)) continue;

      SayingText text(String l) => SayingText(
        saying: tr[l]!['saying'] as String?,
        angle: tr[l]!['angle'] as String,
        closeness: tr[l]!['closeness'] as String,
      );

      out.add(
        Saying(
          id: r['id'] as String,
          slug: r['slug'] as String,
          saying: r['saying'] as String,
          grade: Grade.values.byName(r['grade'] as String),
          situationSlug: r['situation_slug'] as String?,
          source: ContentSource(
            label: {
              for (final l in ['en', 'ar', 'tr'])
                l: tr[l]!['source_label'] as String,
            },
            original: r['source_original'] as String?,
            translation: {
              for (final l in ['en', 'ar', 'tr'])
                if (tr[l]!['source_text'] != null &&
                    tr[l]!['source_translator'] != null)
                  l: SourceTranslation(
                    text: tr[l]!['source_text'] as String,
                    translator: tr[l]!['source_translator'] as String,
                  ),
            },
            dorar: cited[r['slug']],
          ),
          en: text('en'),
          ar: text('ar'),
          tr: text('tr'),
        ),
      );
    }
    return out;
  }
}
