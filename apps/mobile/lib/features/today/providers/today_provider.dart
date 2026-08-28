import 'dart:math';

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../intentions/providers/intentions_provider.dart';
import '../../situations/providers/situations_provider.dart';
import '../models/day_leaf.dart';

/// How many earlier days sit under today's leaf.
const deckDepth = 30;

/// Deterministic daily pick. The database has no "day" column, so each client
/// derives the same page from the published set: content is shuffled once per
/// cycle of N days (seeded by the cycle number) and read in order, so a reader
/// never sees the same situation twice in a cycle and every phone agrees.
/// ponytail: server-side pick if web and app ever need to share "today".
T? pickForDay<T>(List<T> pool, int dayIndex) {
  if (pool.isEmpty) return null;
  final n = pool.length;
  final cycle = dayIndex ~/ n;
  final order = [...pool]..shuffle(Random(cycle * 1000003));
  return order[dayIndex % n];
}

int dayIndexOf(DateTime date) =>
    DateTime.utc(date.year, date.month, date.day).millisecondsSinceEpoch ~/
    Duration.millisecondsPerDay;

/// Today first, then the days underneath, as far as content allows.
final todayDeckProvider = Provider<List<DayLeaf>>((ref) {
  final situations = ref.watch(situationsProvider).value ?? [];
  final intentions = ref.watch(intentionsProvider).value ?? [];
  if (situations.isEmpty) return const [];
  final now = DateTime.now();
  final today = DateTime(now.year, now.month, now.day);
  return [
    for (var i = 0; i < deckDepth; i++)
      if (today.subtract(Duration(days: i)) case final date)
        DayLeaf(
          date: date,
          daysAgo: i,
          situation: pickForDay(situations, dayIndexOf(date))!,
          intention: pickForDay(intentions, dayIndexOf(date)),
        ),
  ];
});
