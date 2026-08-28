abstract final class Validators {
  static final _email = RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$');
  static final _otp = RegExp(r'^\d{6}$');

  static bool isEmail(String? value) => _email.hasMatch(value?.trim() ?? '');
  static bool isOtp(String? value) => _otp.hasMatch(value?.trim() ?? '');
}
