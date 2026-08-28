import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../constants/app_strings.dart';

/// The one and only [Dio] instance. Never construct another one.
abstract final class DioClient {
  static final Dio instance = _create();

  static Dio _create() {
    final dio = Dio(
      BaseOptions(
        baseUrl: AppStrings.siteUrl,
        connectTimeout: const Duration(seconds: 20),
        receiveTimeout: const Duration(seconds: 20),
        headers: {'Accept': 'application/json'},
      ),
    );
    if (kDebugMode) {
      dio.interceptors.add(
        LogInterceptor(requestBody: true, responseBody: true),
      );
    }
    return dio;
  }
}

final dioProvider = Provider<Dio>((ref) => DioClient.instance);
