import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/supabase_client.dart';
import '../models/dorar_ref.dart';
import '../services/dorar_service.dart';

class DorarNotifier extends AsyncNotifier<Map<String, DorarRef>> {
  @override
  Future<Map<String, DorarRef>> build() =>
      DorarService(ref.watch(supabaseProvider)).cited();
}

final dorarCitedProvider =
    AsyncNotifierProvider<DorarNotifier, Map<String, DorarRef>>(
      DorarNotifier.new,
    );
