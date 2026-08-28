import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/supabase_client.dart';
import '../../sources/providers/dorar_provider.dart';
import '../models/saying.dart';
import '../services/sayings_service.dart';

class SayingsNotifier extends AsyncNotifier<List<Saying>> {
  @override
  Future<List<Saying>> build() async {
    final cited = await ref.watch(dorarCitedProvider.future);
    return SayingsService(ref.watch(supabaseProvider)).fetchAll(cited);
  }

  Future<void> refresh() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(build);
  }
}

/// In creation order, as stored.
final sayingsProvider = AsyncNotifierProvider<SayingsNotifier, List<Saying>>(
  SayingsNotifier.new,
);

/// Strongest evidence first (Grade enum order).
final sayingsSortedProvider = Provider<List<Saying>>((ref) {
  final all = [...?ref.watch(sayingsProvider).value];
  all.sort((a, b) => a.grade.index.compareTo(b.grade.index));
  return all;
});

final sayingBySlugProvider = Provider.family<Saying?, String>(
  (ref, slug) => ref
      .watch(sayingsProvider)
      .value
      ?.where((q) => q.slug == slug)
      .firstOrNull,
);

/// Other sayings, never the one being read.
final relatedSayingsProvider = Provider.family<List<Saying>, String>(
  (ref, slug) => ref
      .watch(sayingsSortedProvider)
      .where((q) => q.slug != slug)
      .take(3)
      .toList(),
);
