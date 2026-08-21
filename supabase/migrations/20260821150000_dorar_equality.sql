-- Dorar.net row for the equality saying (all-men-are-created-equal).
--
-- Fetched 2026-08-21 from dorar.net's site search, same shape as the situation and
-- intention rows: `results` holds the cited hadith as their search returned it. The
-- Farewell Sermon passage, Jabir ibn Abdillah, al-Silsila al-Sahiha 2700, Albani:
-- isnad sahih. Discovered via their sharh page (dorar.net/hadith/sharh/118505); the
-- cleaner full wording cited here is the same hadith's row at dorar.net/h/ZPLhpN7x.

insert into dorar_hadith (slug, query, fetched_at, results, hadith_id, takhrij, categories) values
  ('all-men-are-created-equal', 'لا فضل لعربي على عجمي ولا لعجمي على عربي', '2026-08-21T15:00:00Z',
   $j$[{"id": "ZPLhpN7x", "text": "يا أيها الناسُ ! إنَّ ربَّكم واحدٌ، و إنَّ أباكم واحدٌ، ألا لا فضلَ لعربيٍّ على عجميٍّ، و لا لعجميٍّ على عربيٍّ، و لا لأحمرَ على أسودَ، و لا لأسودَ على أحمرَ إلا بالتقوى إنَّ أكرمَكم عند اللهِ أتقاكُم، ألا هل بلَّغتُ ؟ قالوا : بلى يا رسولَ اللهِ قال : فيُبَلِّغُ الشاهدُ الغائبَ", "rawi": "جابر بن عبدالله", "book": "السلسلة الصحيحة", "ref": "2700", "grade": "إسناده صحيح", "takhrij": "أخرجه أبو نعيم في ((حلية الأولياء)) (3/100)، والبيهقي في ((شعب الإيمان)) (5137) باختلاف يسير", "categories": [{"id": "92bd5d0a31ead2aa0eae85ae25463321", "name": "تفسير آيات - سورة الحج"}, {"id": "c72aa615c8384f3977a9cffb3537ce40", "name": "أقضية وأحكام - الشاهد يرى ما لا يرى الغائب"}, {"id": "ba5c369d31bfa6283a2cfbf7b6667d16", "name": "رقائق وزهد - تقوى الله"}, {"id": "53761e1eea", "name": "إيمان - توحيد الربوبية"}, {"id": "669c3c7252", "name": "رقائق وزهد - الورع والتقوى"}]}]$j$::jsonb, 'ZPLhpN7x', 'أخرجه أبو نعيم في ((حلية الأولياء)) (3/100)، والبيهقي في ((شعب الإيمان)) (5137) باختلاف يسير', $j$[{"id": "92bd5d0a31ead2aa0eae85ae25463321", "name": "تفسير آيات - سورة الحج"}, {"id": "c72aa615c8384f3977a9cffb3537ce40", "name": "أقضية وأحكام - الشاهد يرى ما لا يرى الغائب"}, {"id": "ba5c369d31bfa6283a2cfbf7b6667d16", "name": "رقائق وزهد - تقوى الله"}, {"id": "53761e1eea", "name": "إيمان - توحيد الربوبية"}, {"id": "669c3c7252", "name": "رقائق وزهد - الورع والتقوى"}]$j$::jsonb);
