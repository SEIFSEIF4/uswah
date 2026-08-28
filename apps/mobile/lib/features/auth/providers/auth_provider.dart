import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../../../core/network/supabase_client.dart';
import '../../../core/utils/validators.dart';
import '../../settings/providers/settings_provider.dart';
import '../models/login_state.dart';
import '../services/auth_service.dart';

final authServiceProvider = Provider<AuthService>(
  (ref) => AuthService(ref.watch(supabaseProvider)),
);

/// The signed-in user, or null. Follows Supabase's own session stream.
class AuthNotifier extends Notifier<User?> {
  @override
  User? build() {
    final service = ref.watch(authServiceProvider);
    final sub = service.changes.listen((e) => state = e.session?.user);
    ref.onDispose(sub.cancel);
    return service.currentUser;
  }

  Future<void> signOut() => ref.read(authServiceProvider).signOut();
}

final authUserProvider = NotifierProvider<AuthNotifier, User?>(
  AuthNotifier.new,
);

/// The OTP flow: address → code → session.
class LoginNotifier extends Notifier<LoginState> {
  Timer? _countdown;

  @override
  LoginState build() {
    ref.onDispose(() => _countdown?.cancel());
    return const LoginState();
  }

  Future<void> requestCode(String email) async {
    email = email.trim();
    if (!Validators.isEmail(email)) return;
    state = state.copyWith(busy: true, error: null, email: email);
    try {
      await ref
          .read(authServiceProvider)
          .requestOtp(
            email: email,
            locale: ref.read(localeProvider).languageCode,
          );
      state = state.copyWith(busy: false, step: LoginStep.code);
    } on AuthException catch (e) {
      final retry = _retryAfter(e.message);
      state = state.copyWith(
        busy: false,
        error: _errorCode(e),
        // A rate-limited request still means a code is on its way from before.
        step: retry != null ? LoginStep.code : state.step,
        retrySeconds: retry ?? 0,
      );
      if (retry != null) _startCountdown();
    }
  }

  Future<void> verify(String token) async {
    token = token.trim();
    if (!Validators.isOtp(token)) {
      state = state.copyWith(error: 'otp_invalid');
      return;
    }
    state = state.copyWith(busy: true, error: null);
    try {
      await ref
          .read(authServiceProvider)
          .verifyOtp(email: state.email, token: token);
      state = const LoginState();
    } on AuthException catch (e) {
      state = state.copyWith(busy: false, error: _errorCode(e));
    }
  }

  /// Drop the pending address so a different one can be used.
  void restart() {
    _countdown?.cancel();
    state = const LoginState();
  }

  static String _errorCode(AuthException e) {
    if (e.message == 'email rate limit exceeded' ||
        e.message.startsWith('For security purposes')) {
      return 'over_request_rate_limit';
    }
    return e.code ?? e.message;
  }

  static int? _retryAfter(String message) {
    final m = RegExp(
      r'after (\d+) seconds?',
      caseSensitive: false,
    ).firstMatch(message);
    return m == null ? null : int.parse(m[1]!);
  }

  void _startCountdown() {
    _countdown?.cancel();
    _countdown = Timer.periodic(const Duration(seconds: 1), (t) {
      if (state.retrySeconds <= 1) {
        t.cancel();
        state = state.copyWith(retrySeconds: 0);
      } else {
        state = state.copyWith(retrySeconds: state.retrySeconds - 1);
      }
    });
  }
}

final loginProvider = NotifierProvider<LoginNotifier, LoginState>(
  LoginNotifier.new,
);
