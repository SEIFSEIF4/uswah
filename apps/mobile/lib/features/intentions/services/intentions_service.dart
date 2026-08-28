import 'package:supabase_flutter/supabase_flutter.dart';

import '../../sources/models/content_source.dart';
import '../../sources/models/dorar_ref.dart';
import '../models/intention.dart';

/// Mirrors `loadIntentions` in apps/web/lib/content.ts.
class IntentionsService {
  const IntentionsService(this._db);

  final SupabaseClient _db;

  Future<List<Intention>> fetchAll(Map<String, DorarRef> cited) async {
    final rows = await _db
        .from('intentions')
        .select(
          'id, slug, act_group, source_original, created_at, '
          'intention_translations(locale, act, intention, note, source_label)',
        )
        .order('created_at', ascending: true);

    final out = <Intention>[];
    for (final r in rows) {
      final tr = {
        for (final t in r['intention_translations'] as List)
          t['locale'] as String: t as Map,
      };
      if (!['en', 'ar', 'tr'].every(tr.containsKey)) continue;

      IntentionText text(String l) => IntentionText(
        intention: tr[l]!['intention'] as String,
        note: tr[l]!['note'] as String,
      );

      out.add(
        Intention(
          id: r['id'] as String,
          slug: r['slug'] as String,
          group: ActGroup.values.byName(r['act_group'] as String),
          act: {
            for (final l in ['en', 'ar', 'tr']) l: tr[l]!['act'] as String,
          },
          source: ContentSource(
            label: {
              for (final l in ['en', 'ar', 'tr'])
                l: tr[l]!['source_label'] as String,
            },
            original: r['source_original'] as String?,
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
