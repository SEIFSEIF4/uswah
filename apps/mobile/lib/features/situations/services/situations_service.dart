import 'package:supabase_flutter/supabase_flutter.dart';

import '../../../core/extensions/string_ext.dart';
import '../../sources/models/content_source.dart';
import '../../sources/models/dorar_ref.dart';
import '../models/situation.dart';

/// Mirrors `loadSituations` in apps/web/lib/content.ts: one query, translations,
/// entry and source nested; a situation missing a locale row, its topic or its
/// entry is skipped rather than half-rendered.
class SituationsService {
  const SituationsService(this._db);

  final SupabaseClient _db;

  static const _books = {
    'bukhari': {
      'en': 'Sahih al-Bukhari',
      'ar': 'صحيح البخاري',
      'tr': 'Sahîh-i Buhârî',
    },
    'muslim': {'en': 'Sahih Muslim', 'ar': 'صحيح مسلم', 'tr': 'Sahîh-i Müslim'},
  };

  static Map<String, String> sourceLabel(
    String kind,
    String? collection,
    String ref,
  ) {
    if (kind == 'quran') {
      return {
        'en': 'Quran $ref',
        'ar': 'القرآن ${ref.arabicDigits}',
        'tr': "Kur'an $ref",
      };
    }
    final b = _books[collection] ?? _books['bukhari']!;
    return {
      'en': '${b['en']} $ref',
      'ar': '${b['ar']} ${ref.arabicDigits}',
      'tr': '${b['tr']} $ref',
    };
  }

  Future<List<Situation>> fetchAll(Map<String, DorarRef> cited) async {
    final rows = await _db
        .from('situations')
        .select('''
          id, slug, topic, minutes, feature, published_at,
          image_url, image_credit, image_source_url, image_license,
          situation_translations(locale, title, summary, image_alt),
          entries(position, reviewed_by, reviewed_at,
            entry_translations(locale, body, takeaway),
            source:sources(kind, collection, ref, text_original,
              source_translations(locale, text, translator)))
        ''')
        .order('published_at', ascending: false);

    final out = <Situation>[];
    for (final r in rows) {
      final entries = (r['entries'] as List).cast<Map<String, dynamic>>()
        ..sort(
          (a, b) => (a['position'] as int).compareTo(b['position'] as int),
        );
      final entry = entries.firstOrNull;
      if (entry == null ||
          r['topic'] == null ||
          r['minutes'] == null ||
          r['image_url'] == null ||
          r['published_at'] == null) {
        continue;
      }
      final tr = {
        for (final t in r['situation_translations'] as List)
          t['locale'] as String: t as Map,
      };
      final et = {
        for (final t in entry['entry_translations'] as List)
          t['locale'] as String: t as Map,
      };
      if (![
        'en',
        'ar',
        'tr',
      ].every((l) => tr.containsKey(l) && et.containsKey(l))) {
        continue;
      }

      LocaleText text(String l) => LocaleText(
        title: tr[l]!['title'] as String,
        summary: tr[l]!['summary'] as String,
        imageAlt: (tr[l]!['image_alt'] as String?) ?? '',
        body: et[l]!['body'] as String,
        takeaway: et[l]!['takeaway'] as String,
      );

      final source = entry['source'] as Map<String, dynamic>;
      final collection = source['collection'] as String?;
      out.add(
        Situation(
          id: r['id'] as String,
          slug: r['slug'] as String,
          topic: Topic.values.byName(r['topic'] as String),
          minutes: r['minutes'] as int,
          publishedAt: DateTime.parse(r['published_at'] as String),
          reviewedBy: entry['reviewed_by'] as String,
          reviewedAt: DateTime.parse(entry['reviewed_at'] as String),
          feature: r['feature'] as String?,
          image: SituationImage(
            url: r['image_url'] as String,
            credit: (r['image_credit'] as String?) ?? '',
            sourceUrl: (r['image_source_url'] as String?) ?? '',
            license: (r['image_license'] as String?) ?? '',
          ),
          source: ContentSource(
            label: sourceLabel(
              source['kind'] as String,
              collection,
              source['ref'] as String,
            ),
            collection: collection == null
                ? null
                : BookKey.values.byName(collection),
            original: source['text_original'] as String,
            translation: {
              for (final t in source['source_translations'] as List)
                t['locale'] as String: SourceTranslation(
                  text: t['text'] as String,
                  translator: t['translator'] as String,
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
