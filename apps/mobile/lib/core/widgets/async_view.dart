import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../extensions/context_ext.dart';
import 'app_error_view.dart';
import 'app_loader.dart';

/// `AsyncValue` → loader / error / data with the app's own widgets.
class AsyncView<T> extends StatelessWidget {
  const AsyncView(this.value, {required this.data, this.onRetry, super.key});

  final AsyncValue<T> value;
  final Widget Function(T data) data;
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) => value.when(
    data: data,
    loading: () => const AppLoader(),
    error: (e, _) =>
        AppErrorView(message: context.l10n.errorGeneric, onRetry: onRetry),
  );
}
