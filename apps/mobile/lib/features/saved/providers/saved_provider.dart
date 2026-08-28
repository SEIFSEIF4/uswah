import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/supabase_client.dart';
import '../../auth/providers/auth_provider.dart';
import '../models/saved_ids.dart';
import '../services/saved_service.dart';

class SavedNotifier extends AsyncNotifier<SavedIds> {
  SavedService get _service => SavedService(ref.read(supabaseProvider));

  @override
  Future<SavedIds> build() async {
    // Re-runs on sign-in and sign-out.
    final user = ref.watch(authUserProvider);
    if (user == null) return const SavedIds();
    return _service.fetch();
  }

  /// Optimistic; reverts if the write fails. Returns false when not signed in.
  Future<bool> toggleSituation(String id) => _toggle(
    id,
    ids: (s) => s.situationIds,
    update: (s, ids) => s.copyWith(situationIds: ids),
    save: _service.saveSituation,
    unsave: _service.unsaveSituation,
  );

  Future<bool> toggleSaying(String id) => _toggle(
    id,
    ids: (s) => s.sayingIds,
    update: (s, ids) => s.copyWith(sayingIds: ids),
    save: _service.saveSaying,
    unsave: _service.unsaveSaying,
  );

  Future<bool> _toggle(
    String id, {
    required List<String> Function(SavedIds) ids,
    required SavedIds Function(SavedIds, List<String>) update,
    required Future<void> Function(String userId, String id) save,
    required Future<void> Function(String id) unsave,
  }) async {
    final user = ref.read(authUserProvider);
    final before = state.value;
    if (user == null || before == null) return false;

    final had = ids(before).contains(id);
    state = AsyncData(
      update(
        before,
        had ? ids(before).where((x) => x != id).toList() : [id, ...ids(before)],
      ),
    );
    try {
      await (had ? unsave(id) : save(user.id, id));
    } catch (_) {
      state = AsyncData(before);
    }
    return true;
  }
}

final savedProvider = AsyncNotifierProvider<SavedNotifier, SavedIds>(
  SavedNotifier.new,
);

final isSituationSavedProvider = Provider.family<bool, String>(
  (ref, id) =>
      ref.watch(savedProvider).value?.situationIds.contains(id) ?? false,
);

final isSayingSavedProvider = Provider.family<bool, String>(
  (ref, id) => ref.watch(savedProvider).value?.sayingIds.contains(id) ?? false,
);
