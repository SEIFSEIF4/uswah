// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'login_state.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_LoginState _$LoginStateFromJson(Map<String, dynamic> json) => _LoginState(
  step:
      $enumDecodeNullable(_$LoginStepEnumMap, json['step']) ?? LoginStep.email,
  email: json['email'] as String? ?? '',
  busy: json['busy'] as bool? ?? false,
  retrySeconds: (json['retrySeconds'] as num?)?.toInt() ?? 0,
  error: json['error'] as String?,
);

Map<String, dynamic> _$LoginStateToJson(_LoginState instance) =>
    <String, dynamic>{
      'step': _$LoginStepEnumMap[instance.step]!,
      'email': instance.email,
      'busy': instance.busy,
      'retrySeconds': instance.retrySeconds,
      'error': instance.error,
    };

const _$LoginStepEnumMap = {LoginStep.email: 'email', LoginStep.code: 'code'};
