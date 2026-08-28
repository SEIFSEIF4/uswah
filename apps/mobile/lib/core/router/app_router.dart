import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/screens/login_screen.dart';
import '../../features/intentions/screens/intentions_screen.dart';
import '../../features/saved/screens/saved_screen.dart';
import '../../features/sayings/screens/saying_screen.dart';
import '../../features/sayings/screens/sayings_screen.dart';
import '../../features/search/screens/search_screen.dart';
import '../../features/shell/screens/shell_screen.dart';
import '../../features/situations/models/situation.dart';
import '../../features/situations/screens/situation_screen.dart';
import '../../features/situations/screens/situations_screen.dart';
import '../../features/situations/screens/topic_screen.dart';
import '../../features/situations/screens/topics_screen.dart';
import '../../features/today/screens/today_screen.dart';
import '../network/supabase_client.dart';

/// Locale-less paths, the same shape as the web's routes.ts.
abstract final class AppRoutes {
  static const today = '/';
  static const situations = '/situations';
  static const topics = '/topics';
  static const sayings = '/quotes';
  static const intentions = '/intentions';
  static const search = '/search';
  static const saved = '/saved';
  static const login = '/login';
}

/// Every route in the app is registered here.
final appRouterProvider = Provider<GoRouter>((ref) {
  final auth = ref.watch(supabaseProvider).auth;
  final refresh = _StreamListenable(auth.onAuthStateChange);
  ref.onDispose(refresh.dispose);
  final rootKey = GlobalKey<NavigatorState>();

  return GoRouter(
    navigatorKey: rootKey,
    initialLocation: AppRoutes.today,
    refreshListenable: refresh,
    redirect: (context, state) {
      final authed = auth.currentSession != null;
      final path = state.uri.path;
      if (path == AppRoutes.login && authed) {
        return state.uri.queryParameters['redirect'] ?? AppRoutes.saved;
      }
      return null;
    },
    routes: [
      StatefulShellRoute.indexedStack(
        builder: (context, state, shell) => ShellScreen(shell: shell),
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.today,
                builder: (_, _) => const TodayScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.situations,
                builder: (_, _) => const SituationsScreen(),
              ),
              GoRoute(
                path: '${AppRoutes.topics}/:topic',
                builder: (_, state) {
                  final topic = Topic.values
                      .where((t) => t.name == state.pathParameters['topic'])
                      .firstOrNull;
                  return topic == null
                      ? const SituationsScreen()
                      : TopicScreen(topic: topic);
                },
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.sayings,
                builder: (_, _) => const SayingsScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.intentions,
                builder: (_, state) => IntentionsScreen(
                  key: ValueKey(state.uri.queryParameters['focus']),
                  focus: state.uri.queryParameters['focus'],
                ),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.saved,
                builder: (_, _) => const SavedScreen(),
              ),
            ],
          ),
        ],
      ),
      // Full-screen pages over the tabs.
      GoRoute(
        parentNavigatorKey: rootKey,
        path: AppRoutes.topics,
        builder: (_, _) => const TopicsScreen(),
      ),
      GoRoute(
        parentNavigatorKey: rootKey,
        path: '${AppRoutes.sayings}/:slug',
        builder: (_, state) =>
            SayingScreen(slug: state.pathParameters['slug']!),
      ),
      GoRoute(
        parentNavigatorKey: rootKey,
        path: AppRoutes.search,
        builder: (_, state) =>
            SearchScreen(initialQuery: state.uri.queryParameters['q'] ?? ''),
      ),
      GoRoute(
        parentNavigatorKey: rootKey,
        path: AppRoutes.login,
        builder: (_, state) => LoginScreen(
          redirectTo:
              state.uri.queryParameters['redirect'] ?? state.extra as String?,
        ),
      ),
      // Situations live at the root, like the web; reserved paths above win by order.
      GoRoute(
        parentNavigatorKey: rootKey,
        path: '/:slug',
        builder: (_, state) =>
            SituationScreen(slug: state.pathParameters['slug']!),
      ),
    ],
  );
});

class _StreamListenable extends ChangeNotifier {
  _StreamListenable(Stream<dynamic> stream) {
    _sub = stream.listen((_) => notifyListeners());
  }

  late final StreamSubscription<dynamic> _sub;

  @override
  void dispose() {
    _sub.cancel();
    super.dispose();
  }
}
