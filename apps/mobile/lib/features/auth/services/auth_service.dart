import 'package:supabase_flutter/supabase_flutter.dart';

/// Email code, no password. There is no separate sign-up: `shouldCreateUser`
/// makes the first code an account.
class AuthService {
  const AuthService(this._db);

  final SupabaseClient _db;

  Stream<AuthState> get changes => _db.auth.onAuthStateChange;
  User? get currentUser => _db.auth.currentUser;

  Future<void> requestOtp({required String email, required String locale}) =>
      _db.auth.signInWithOtp(
        email: email,
        shouldCreateUser: true,
        data: {'locale': locale},
      );

  Future<void> verifyOtp({required String email, required String token}) =>
      _db.auth.verifyOTP(email: email, token: token, type: OtpType.email);

  Future<void> signOut() => _db.auth.signOut();
}
