import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/extensions/map_ext.dart';
import '../../intentions/providers/intentions_provider.dart';
import '../../sayings/providers/sayings_provider.dart';
import '../../settings/providers/settings_provider.dart';
import '../../situations/providers/situations_provider.dart';
import '../models/search_hit.dart';

const _locales = ['en', 'ar', 'tr'];
String _across(Iterable<String> parts) => parts.join(' ').toLowerCase();

/// Built from the loaded content, in the reading locale (see searchIndex in content.ts).
final searchIndexProvider = Provider<List<SearchHit>>((ref) {
  final lang = ref.watch(localeProvider).languageCode;
  final situations = ref.watch(situationsProvider).value ?? [];
  final sayings = ref.watch(sayingsProvider).value ?? [];
  final intentions = ref.watch(intentionsProvider).value ?? [];
  return [
    for (final s in situations)
      SearchHit(
        kind: SearchKind.situation,
        slug: s.slug,
        route: '/${s.slug}',
        title: s.text(lang).title,
        summary: s.text(lang).summary,
        match: _across(
          _locales.map((l) => '${s.text(l).title} ${s.text(l).summary}'),
        ),
      ),
    for (final q in sayings)
      SearchHit(
        kind: SearchKind.saying,
        slug: q.slug,
        route: '/quotes/${q.slug}',
        title: q.sayingFor(lang),
        summary: q.text(lang).closeness,
        match: _across([
          q.saying,
          ..._locales.map(
            (l) =>
                '${q.text(l).saying ?? ''} ${q.text(l).angle} ${q.text(l).closeness}',
          ),
        ]),
      ),
    for (final i in intentions)
      SearchHit(
        kind: SearchKind.intention,
        slug: i.slug,
        route: '/intentions?focus=${i.slug}',
        title: i.act.of(lang),
        summary: i.text(lang).intention,
        match: _across(
          _locales.map(
            (l) => '${i.act.of(l)} ${i.text(l).intention} ${i.text(l).note}',
          ),
        ),
      ),
  ];
});

class SearchQueryNotifier extends Notifier<String> {
  @override
  String build() => '';

  void set(String q) => state = q;
}

final searchQueryProvider = NotifierProvider<SearchQueryNotifier, String>(
  SearchQueryNotifier.new,
);

/// Naive contains-match over the index, same as the web until the Arabic-normalising
/// RPC covers sayings and intentions too.
final searchResultsProvider = Provider<List<SearchHit>>((ref) {
  final q = ref.watch(searchQueryProvider).trim().toLowerCase();
  if (q.isEmpty) return [];
  return ref
      .watch(searchIndexProvider)
      .where((h) => h.match.contains(q))
      .toList();
});
