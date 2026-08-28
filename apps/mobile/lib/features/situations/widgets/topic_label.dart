import '../../../l10n/app_localizations.dart';
import '../models/situation.dart';

String topicName(AppLocalizations l10n, Topic topic) => switch (topic) {
  Topic.money => l10n.topicMoney,
  Topic.work => l10n.topicWork,
  Topic.family => l10n.topicFamily,
  Topic.self => l10n.topicSelf,
  Topic.friendship => l10n.topicFriendship,
  Topic.hardship => l10n.topicHardship,
};
