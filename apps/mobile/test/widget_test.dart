import 'package:flutter_test/flutter_test.dart';
import 'package:uswah/core/extensions/string_ext.dart';
import 'package:uswah/features/situations/services/situations_service.dart';

void main() {
  test('source labels follow the web: Arabic digits, book names', () {
    final q = SituationsService.sourceLabel('quran', null, '2:286');
    expect(q['en'], 'Quran 2:286');
    expect(q['ar'], 'القرآن ٢:٢٨٦');
    final h = SituationsService.sourceLabel('hadith', 'muslim', '2548');
    expect(h['en'], 'Sahih Muslim 2548');
    expect(h['tr'], 'Sahîh-i Müslim 2548');
  });

  test('string helpers', () {
    expect('Sahîh-i Buhârî'.stripMarks.startsWith('sahih'), isTrue);
    expect('صَبْر'.lengthWithoutHarakat, 3);
    expect('hello'.isArabicScript, isFalse);
    expect('مرحبا'.isArabicScript, isTrue);
  });
}
