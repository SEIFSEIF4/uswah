import 'package:flutter/material.dart';

import '../../../core/extensions/context_ext.dart';
import '../../../core/widgets/leaf.dart';

/// A short pile of sheets. The top one follows a vertical drag; past the
/// threshold it lifts off and the next settles up into its place. Dragging
/// down brings the previous sheet back. The one authored motion in the app.
class LeafDeck extends StatefulWidget {
  const LeafDeck({
    required this.count,
    required this.builder,
    required this.onIndexChanged,
    this.footer,
    this.peek = 3,
    super.key,
  });

  final int count;
  final Widget Function(BuildContext context, int index, bool lifted) builder;
  final ValueChanged<int> onIndexChanged;

  /// Sits directly under the pile's last edge.
  final Widget? footer;

  /// How many sheet edges show under the top one.
  final int peek;

  /// Vertical step between sheet edges.
  static const step = 16.0;

  @override
  State<LeafDeck> createState() => _LeafDeckState();
}

class _LeafDeckState extends State<LeafDeck>
    with SingleTickerProviderStateMixin {
  static const _threshold = 110.0;
  late final _anim = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 420),
  );
  var _index = 0;
  var _drag = 0.0;
  var _settling = false;

  @override
  void dispose() {
    _anim.dispose();
    super.dispose();
  }

  bool get _canLift => _index < widget.count - 1;
  bool get _canRestore => _index > 0;

  void _onUpdate(DragUpdateDetails d) {
    if (_settling) return;
    setState(() {
      final next = _drag + d.delta.dy;
      // Resist past the ends instead of stopping dead.
      _drag = (next < 0 && !_canLift) || (next > 0 && !_canRestore)
          ? next * .25
          : next;
    });
  }

  Future<void> _onEnd(DragEndDetails d) async {
    if (_settling) return;
    final fling = d.primaryVelocity ?? 0;
    final lift = (_drag < -_threshold || fling < -700) && _canLift;
    final restore = (_drag > _threshold || fling > 700) && _canRestore;
    if (!lift && !restore) {
      await _animateDrag(0);
      return;
    }
    _settling = true;
    if (lift) {
      await _animateDrag(-900);
      setState(() {
        _index++;
        _drag = 0;
      });
    } else {
      // The previous sheet comes down from above and lands on the pile.
      setState(() {
        _index--;
        _drag = -900;
      });
      await _animateDrag(0);
    }
    _settling = false;
    widget.onIndexChanged(_index);
  }

  Future<void> _animateDrag(double to) async {
    final tween = Tween(begin: _drag, end: to);
    final curved = CurvedAnimation(parent: _anim, curve: Curves.easeOutExpo);
    void tick() => setState(() => _drag = tween.evaluate(curved));
    curved.addListener(tick);
    await _anim.forward(from: 0);
    curved.removeListener(tick);
    if (mounted) setState(() => _drag = to);
  }

  @override
  Widget build(BuildContext context) {
    final u = context.uswah;
    final dark = context.theme.brightness == Brightness.dark;
    final rtl = Directionality.of(context) == TextDirection.rtl;
    final progress = (_drag.abs() / 400).clamp(0.0, 1.0);
    final lifted = _drag.abs() > 6;
    final under = (widget.count - 1 - _index).clamp(0, widget.peek);

    // Deeper sheets sit a touch darker (light) or lighter (dark), so each edge
    // reads on its own against the one above it.
    Color tint(int depth) => Color.lerp(
      u.surface,
      context.colors.onSurface,
      (dark ? .045 : .025) * depth,
    )!;

    return GestureDetector(
      onVerticalDragUpdate: _onUpdate,
      onVerticalDragEnd: _onEnd,
      behavior: HitTestBehavior.opaque,
      child: Column(
        children: [
          Stack(
            alignment: Alignment.topCenter,
            clipBehavior: Clip.none,
            children: [
              // The pile underneath: blank sheet edges sized to the top sheet, then
              // the next day itself directly beneath, so a lift reveals a page.
              for (var depth = under; depth >= 1; depth--)
                if (depth == 1)
                  IgnorePointer(
                    child: Transform.translate(
                      offset: Offset(0, (1 - progress) * LeafDeck.step),
                      child: Transform.scale(
                        scaleX: 1 - (1 - progress) * .03,
                        alignment: Alignment.topCenter,
                        child: widget.builder(context, _index + 1, false),
                      ),
                    ),
                  )
                else
                  Positioned.fill(
                    child: IgnorePointer(
                      child: Transform.translate(
                        offset: Offset(0, (depth - progress) * LeafDeck.step),
                        child: Transform.scale(
                          scaleX: 1 - (depth - progress) * .03,
                          alignment: Alignment.topCenter,
                          child: Leaf(
                            padding: EdgeInsets.zero,
                            color: tint(depth),
                            child: const SizedBox.expand(),
                          ),
                        ),
                      ),
                    ),
                  ),
              Transform.translate(
                offset: Offset(0, _drag),
                child: Transform.rotate(
                  angle: (_drag / 4000) * (rtl ? -1 : 1),
                  child: Transform.scale(
                    scale: 1 + (lifted ? .015 : 0),
                    child: widget.builder(context, _index, lifted),
                  ),
                ),
              ),
            ],
          ),
          if (widget.footer case final f?)
            Padding(
              padding: EdgeInsets.only(top: under * LeafDeck.step + 6),
              child: f,
            ),
        ],
      ),
    );
  }
}
