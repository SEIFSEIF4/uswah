import 'package:supabase_flutter/supabase_flutter.dart';

import '../models/dorar_ref.dart';

class DorarService {
  const DorarService(this._db);

  final SupabaseClient _db;

  /// slug → cited record, for every content type (they share the table).
  Future<Map<String, DorarRef>> cited() async {
    final rows = await _db.from('dorar_hadith').select('slug, cited');
    return {
      for (final r in rows)
        if (r['cited'] case final Map<String, dynamic> c)
          r['slug'] as String: DorarRef.fromJson(c),
    };
  }
}
