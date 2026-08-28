import 'package:supabase_flutter/supabase_flutter.dart';

import '../models/saved_ids.dart';

/// RLS restricts every statement here to the caller's own rows.
class SavedService {
  const SavedService(this._db);

  final SupabaseClient _db;

  Future<SavedIds> fetch() async {
    final (situations, sayings) = await (
      _db
          .from('saved_situations')
          .select('situation_id')
          .order('created_at', ascending: false),
      _db
          .from('saved_sayings')
          .select('saying_id')
          .order('created_at', ascending: false),
    ).wait;
    return SavedIds(
      situationIds: [for (final r in situations) r['situation_id'] as String],
      sayingIds: [for (final r in sayings) r['saying_id'] as String],
    );
  }

  Future<void> saveSituation(String userId, String id) => _db
      .from('saved_situations')
      .insert({'user_id': userId, 'situation_id': id});

  Future<void> unsaveSituation(String id) =>
      _db.from('saved_situations').delete().eq('situation_id', id);

  Future<void> saveSaying(String userId, String id) =>
      _db.from('saved_sayings').insert({'user_id': userId, 'saying_id': id});

  Future<void> unsaveSaying(String id) =>
      _db.from('saved_sayings').delete().eq('saying_id', id);
}
