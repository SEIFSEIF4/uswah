import 'package:freezed_annotation/freezed_annotation.dart';

part 'login_state.freezed.dart';
part 'login_state.g.dart';

enum LoginStep { email, code }

@freezed
abstract class LoginState with _$LoginState {
  const factory LoginState({
    @Default(LoginStep.email) LoginStep step,
    @Default('') String email,
    @Default(false) bool busy,

    /// Seconds before another code may be requested (rate limit).
    @Default(0) int retrySeconds,

    /// Supabase error code, or the raw message when there is none.
    String? error,
  }) = _LoginState;

  factory LoginState.fromJson(Map<String, dynamic> json) =>
      _$LoginStateFromJson(json);
}
