import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/widgets/leaf.dart';
import '../../shell/widgets/uswah_app_bar.dart';
import '../models/search_hit.dart';
import '../providers/search_provider.dart';

/// Results follow a keystroke, debounced, over the local index.
class SearchScreen extends ConsumerStatefulWidget {
  const SearchScreen({this.initialQuery = '', super.key});

  final String initialQuery;

  @override
  ConsumerState<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends ConsumerState<SearchScreen> {
  late final _controller = TextEditingController(text: widget.initialQuery);
  Timer? _debounce;

  @override
  void initState() {
    super.initState();
    if (widget.initialQuery.isNotEmpty) {
      WidgetsBinding.instance.addPostFrameCallback(
        (_) => ref.read(searchQueryProvider.notifier).set(widget.initialQuery),
      );
    }
  }

  @override
  void dispose() {
    _debounce?.cancel();
    _controller.dispose();
    super.dispose();
  }

  void _onChanged(String v) {
    setState(() {}); // the clear button follows the field
    _debounce?.cancel();
    // ponytail: fixed 200ms debounce, same as the web; tune if the index grows.
    _debounce = Timer(
      const Duration(milliseconds: 200),
      () => ref.read(searchQueryProvider.notifier).set(v),
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final u = context.uswah;
    final query = ref.watch(searchQueryProvider);
    final results = ref.watch(searchResultsProvider);

    String kind(SearchKind k) => switch (k) {
      SearchKind.situation => l10n.kindSituation,
      SearchKind.saying => l10n.kindSaying,
      SearchKind.intention => l10n.kindIntention,
    };

    return Scaffold(
      appBar: UswahAppBar(title: l10n.search, showTools: false),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 4, 20, 8),
            child: TextField(
              controller: _controller,
              autofocus: true,
              onChanged: _onChanged,
              textInputAction: .search,
              decoration: InputDecoration(
                hintText: l10n.searchPlaceholder,
                prefixIcon: const Icon(Icons.search, size: 20),
                suffixIcon: _controller.text.isEmpty
                    ? null
                    : IconButton(
                        icon: const Icon(Icons.close, size: 18),
                        onPressed: () {
                          _controller.clear();
                          ref.read(searchQueryProvider.notifier).set('');
                        },
                      ),
              ),
            ),
          ),
          Expanded(
            child: query.trim().isEmpty
                ? const SizedBox.shrink()
                : results.isEmpty
                ? Center(
                    child: Text(
                      l10n.nothingFound,
                      style: context.text.bodySmall,
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.fromLTRB(20, 8, 20, 32),
                    itemCount: results.length,
                    separatorBuilder: (_, _) => const SizedBox(height: 12),
                    itemBuilder: (context, i) {
                      final h = results[i];
                      return Leaf(
                        onTap: () => context.push(h.route),
                        padding: const EdgeInsets.fromLTRB(18, 14, 18, 14),
                        child: Column(
                          crossAxisAlignment: .start,
                          children: [
                            Text(h.title, style: context.text.titleMedium),
                            const SizedBox(height: 4),
                            Text(
                              h.summary,
                              style: context.text.bodySmall,
                              maxLines: 2,
                              overflow: .ellipsis,
                            ),
                            const SizedBox(height: 8),
                            Text(
                              kind(h.kind),
                              style: context.text.labelMedium!.copyWith(
                                color: u.brand,
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
