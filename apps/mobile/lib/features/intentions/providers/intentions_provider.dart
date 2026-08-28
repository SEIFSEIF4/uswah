import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/supabase_client.dart';
import '../../sources/providers/dorar_provider.dart';
import '../models/intention.dart';
import '../services/intentions_service.dart';

class IntentionsNotifier extends AsyncNotifier<List<Intention>> {
  @override
  Future<List<Intention>> build() async {
    final cited = await ref.watch(dorarCitedProvider.future);
    return IntentionsService(ref.watch(supabaseProvider)).fetchAll(cited);
  }

  Future<void> refresh() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(build);
  }
}

final intentionsProvider =
    AsyncNotifierProvider<IntentionsNotifier, List<Intention>>(
      IntentionsNotifier.new,
    );

/// Grouped for display, in taxonomy order, skipping groups with nothing in them.
final intentionsByGroupProvider = Provider<List<(ActGroup, List<Intention>)>>((
  ref,
) {
  final all = ref.watch(intentionsProvider).value ?? [];
  return [
    for (final g in ActGroup.values)
      if (all.where((i) => i.group == g).toList() case final items
          when items.isNotEmpty)
        (g, items),
  ];
});
