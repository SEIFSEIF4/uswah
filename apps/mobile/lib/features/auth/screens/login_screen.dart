import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/router/app_router.dart';
import '../../../core/utils/validators.dart';
import '../../shell/widgets/uswah_app_bar.dart';
import '../models/login_state.dart';
import '../providers/auth_provider.dart';

/// Email → six-digit code → session. Lands on [redirectTo] (or Saved) when done.
class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({this.redirectTo, this.embedded = false, super.key});

  final String? redirectTo;

  /// Inside the Saved tab: no app bar of its own.
  final bool embedded;

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _email = TextEditingController();
  final _code = TextEditingController();
  final _form = GlobalKey<FormState>();

  @override
  void dispose() {
    _email.dispose();
    _code.dispose();
    super.dispose();
  }

  String? _errorText(String code) => switch (code) {
    'over_request_rate_limit' => context.l10n.errRateLimit,
    'otp_expired' => context.l10n.errOtpExpired,
    'otp_invalid' => context.l10n.errOtpInvalid,
    _ => code,
  };

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final u = context.uswah;
    final state = ref.watch(loginProvider);
    final notifier = ref.read(loginProvider.notifier);
    final onCode = state.step == LoginStep.code;

    // Signed in: leave. The router also redirects, but only on navigation.
    ref.listen(authUserProvider, (_, user) {
      if (user != null && context.mounted) {
        context.go(widget.redirectTo ?? AppRoutes.saved);
      }
    });

    final body = ListView(
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 40),
      children: [
        Text(
          onCode ? l10n.checkEmail : l10n.signInTitle,
          style: context.text.headlineMedium,
        ),
        const SizedBox(height: 10),
        onCode
            ? Text.rich(
                TextSpan(
                  text: '${l10n.codeSentTo} ',
                  children: [
                    TextSpan(
                      text: state.email,
                      style: TextStyle(
                        color: context.colors.onSurface,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                style: context.text.bodyMedium!.copyWith(
                  color: context.colors.onSurfaceVariant,
                ),
              )
            : Text(
                l10n.signInLede,
                style: context.text.bodyMedium!.copyWith(
                  color: context.colors.onSurfaceVariant,
                ),
              ),
        if (state.error case final e?)
          if (_errorText(e) case final msg?)
            Padding(
              padding: const EdgeInsets.only(top: 16),
              child: Text(
                msg,
                style: context.text.bodySmall!.copyWith(
                  color: context.colors.error,
                ),
              ),
            ),
        const SizedBox(height: 28),
        Form(
          key: _form,
          child: onCode
              ? Column(
                  crossAxisAlignment: .stretch,
                  children: [
                    Text(l10n.code, style: u.label.copyWith(fontSize: 13)),
                    const SizedBox(height: 6),
                    TextFormField(
                      controller: _code,
                      autofocus: !widget.embedded,
                      keyboardType: .number,
                      textDirection: .ltr,
                      maxLength: 6,
                      autofillHints: const [AutofillHints.oneTimeCode],
                      style: context.text.titleLarge!.copyWith(
                        letterSpacing: 6,
                      ),
                      decoration: const InputDecoration(counterText: ''),
                      validator: (v) =>
                          Validators.isOtp(v) ? null : l10n.errOtpInvalid,
                      onFieldSubmitted: (_) => _verify(),
                    ),
                    const SizedBox(height: 16),
                    FilledButton(
                      onPressed: state.busy ? null : _verify,
                      child: Text(state.busy ? l10n.saving : l10n.signIn),
                    ),
                    const SizedBox(height: 8),
                    TextButton(
                      onPressed: notifier.restart,
                      child: Text(l10n.useOtherAddress),
                    ),
                  ],
                )
              : Column(
                  crossAxisAlignment: .stretch,
                  children: [
                    Text(l10n.email, style: u.label.copyWith(fontSize: 13)),
                    const SizedBox(height: 6),
                    TextFormField(
                      controller: _email,
                      autofocus: !widget.embedded,
                      keyboardType: .emailAddress,
                      textDirection: .ltr,
                      autofillHints: const [AutofillHints.email],
                      validator: (v) =>
                          Validators.isEmail(v) ? null : l10n.invalidEmail,
                      onFieldSubmitted: (_) => _send(),
                    ),
                    const SizedBox(height: 16),
                    FilledButton(
                      onPressed: state.busy || state.retrySeconds > 0
                          ? null
                          : _send,
                      child: Text(
                        state.retrySeconds > 0
                            ? l10n.retryIn(state.retrySeconds)
                            : l10n.sendCode,
                      ),
                    ),
                  ],
                ),
        ),
      ],
    );
    if (widget.embedded) return body;
    return Scaffold(appBar: const UswahAppBar(showTools: false), body: body);
  }

  void _send() {
    if (_form.currentState!.validate()) {
      ref.read(loginProvider.notifier).requestCode(_email.text);
    }
  }

  void _verify() {
    if (_form.currentState!.validate()) {
      ref.read(loginProvider.notifier).verify(_code.text);
    }
  }
}
