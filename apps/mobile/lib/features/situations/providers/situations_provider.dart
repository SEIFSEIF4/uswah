import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/supabase_client.dart';
import '../../sources/providers/dorar_provider.dart';
import '../models/situation.dart';
import '../services/situations_service.dart';

class SituationsNotifier extends AsyncNotifier<List<Situation>> {
  @override
  Future<List<Situation>> build() async {
    final cited = await ref.watch(dorarCitedProvider.future);
    return SituationsService(ref.watch(supabaseProvider)).fetchAll(cited);
  }

  Future<void> refresh() async {
    ref.invalidate(dorarCitedProvider);
    state = const AsyncLoading();
    state = await AsyncValue.guard(build);
  }
}

/// Newest first, the order published_at gives.
final situationsProvider =
    AsyncNotifierProvider<SituationsNotifier, List<Situation>>(
      SituationsNotifier.new,
    );

final situationBySlugProvider = Provider.family<Situation?, String>(
  (ref, slug) => ref
      .watch(situationsProvider)
      .value
      ?.where((s) => s.slug == slug)
      .firstOrNull,
);

final situationsByTopicProvider = Provider.family<List<Situation>, Topic>(
  (ref, topic) => (ref.watch(situationsProvider).value ?? [])
      .where((s) => s.topic == topic)
      .toList(),
);

/// Other situations sharing a topic, then anything else, never the one being read.
final relatedSituationsProvider = Provider.family<List<Situation>, String>((
  ref,
  slug,
) {
  final all = ref.watch(situationsProvider).value ?? [];
  final current = all.where((s) => s.slug == slug).firstOrNull;
  if (current == null) return [];
  final others = all.where((s) => s.slug != slug);
  return [
    ...others.where((s) => s.topic == current.topic),
    ...others.where((s) => s.topic != current.topic),
  ].take(3).toList();
});
