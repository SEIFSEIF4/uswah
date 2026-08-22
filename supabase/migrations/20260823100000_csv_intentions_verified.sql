-- Two CSV intentions verified against Dorar search pages on 2026-08-23.
-- The remaining CSV rows are intentionally excluded until an exact or clearly
-- related Dorar record is found. These are drafts until editorial review.

insert into dorar_hadith (slug, query, fetched_at, results, hadith_id, takhrij, categories)
values
  (
    'csv-113',
    'المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف',
    '2026-08-23T00:00:00Z',
    $j$[{"id":"Ov16uqG0","text":"المُؤمِنُ القَويُّ خَيرٌ وأحَبُّ إلى اللهِ مِنَ المُؤمِنِ الضَّعيفِ، وفي كُلٍّ خَيرٌ. احرِصْ على ما يَنفَعُكَ، واستَعِنْ باللهِ ولا تَعجِزْ، وإن أصابَكَ شَيءٌ فلا تَقُلْ: لو أنِّي فعَلتُ كان كَذا وكَذا، ولَكِن قُلْ: قدَرُ اللهِ وما شاءَ فعَلَ؛ فإنَّ (لو) تَفتَحُ عَمَلَ الشَّيطانِ.","rawi":"أبو هريرة","book":"صحيح مسلم","ref":"2664","grade":"[صحيح]","takhrij":"أخرجه ابن ماجه (79)، وأحمد (8829)، وأبو يعلى (6251) جميعهم بلفظه.","categories":[{"id":"a1a6cc0f150cdc7da0070c79a011f497","name":"قدر - الأمر بالعمل وترك العجز"}]}]$j$::jsonb,
    'Ov16uqG0',
    'أخرجه ابن ماجه (79)، وأحمد (8829)، وأبو يعلى (6251) جميعهم بلفظه.',
    $j$[{"id":"a1a6cc0f150cdc7da0070c79a011f497","name":"قدر - الأمر بالعمل وترك العجز"}]$j$::jsonb
  ),
  (
    'csv-221',
    'من عاد مريضا لم يزل في خرفة الجنة حتى يرجع',
    '2026-08-23T00:00:00Z',
    $j$[{"id":"C5JvShbV","text":"مَن عادَ مَريضًا لَم يَزَلْ في خُرفةِ الجَنَّةِ، قيلَ: يا رَسولَ اللهِ، وما خُرفةُ الجَنَّةِ؟ قال: جَناها.","rawi":"ثوبان مولى رسول الله صلى الله عليه وسلم","book":"صحيح مسلم","ref":"2568","grade":"[صحيح]","takhrij":"أخرجه أحمد (22389)، وأبو عوانة (11203) واللفظ لهما، والترمذي (967)، وابن حبان (598) باختلاف يسير.","categories":[{"id":"00aaa0c86b","name":"مريض - مشروعية عيادة المريض وفضلها"}]}]$j$::jsonb,
    'C5JvShbV',
    'أخرجه أحمد (22389)، وأبو عوانة (11203) واللفظ لهما، والترمذي (967)، وابن حبان (598) باختلاف يسير.',
    $j$[{"id":"00aaa0c86b","name":"مريض - مشروعية عيادة المريض وفضلها"}]$j$::jsonb
  )
on conflict (slug) do update set
  query = excluded.query,
  fetched_at = excluded.fetched_at,
  results = excluded.results,
  hadith_id = excluded.hadith_id,
  takhrij = excluded.takhrij,
  categories = excluded.categories;

with rows (slug, act_group, source_original) as (
  values
    ('csv-113', 'body', 'المُؤمِنُ القَويُّ خَيرٌ وأحَبُّ إلى اللهِ مِنَ المُؤمِنِ الضَّعيفِ، وفي كُلٍّ خَيرٌ. احرِصْ على ما يَنفَعُكَ، واستَعِنْ باللهِ ولا تَعجِزْ.'),
    ('csv-221', 'people', 'مَن عادَ مَريضًا لَم يَزَلْ في خُرفةِ الجَنَّةِ، قيلَ: يا رَسولَ اللهِ، وما خُرفةُ الجَنَّةِ؟ قال: جَناها.')
), upserted as (
  insert into intentions (slug, act_group, source_original, published_at)
  select slug, act_group, source_original, null from rows
  on conflict (slug) do update set
    act_group = excluded.act_group,
    source_original = excluded.source_original,
    published_at = null
  returning id, slug
)
insert into intention_translations (intention_id, locale, act, intention, note, source_label)
select u.id, t.locale, t.act, t.intention, t.note, t.source_label
from upserted u
join (values
  ('csv-113', 'ar', 'ممارسة الرياضة', 'نويت ممارسة الرياضة لاتباع قول النبي ﷺ «المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف»', 'مسودة مستوردة من CSV؛ تحتاج مراجعة تحريرية قبل النشر.', 'صحيح مسلم 2664'),
  ('csv-113', 'en', 'Exercising', 'I intend to exercise, following the Prophet’s saying: “The strong believer is better and more beloved to Allah than the weak believer.”', 'Imported draft; requires editorial review before publication.', 'Sahih Muslim 2664'),
  ('csv-113', 'tr', 'Spor yapmak', '“Güçlü mümin, Allah katında zayıf müminden daha hayırlı ve daha sevimlidir” buyruğuna uyarak spor yapmaya niyet ediyorum.', 'İçe aktarılan taslak; yayımlanmadan önce editoryal inceleme gerekir.', 'Sahîh-i Müslim 2664'),
  ('csv-221', 'ar', 'زيارة المريض', 'نويت زيارة المريض تطبيقاً لقول النبي ﷺ «من عاد مريضاً لم يزل في خرفة الجنة حتى يرجع»', 'مسودة مستوردة من CSV؛ تحتاج مراجعة تحريرية قبل النشر.', 'صحيح مسلم 2568'),
  ('csv-221', 'en', 'Visiting the sick', 'I intend to visit the sick, following the Prophet’s saying: “Whoever visits a sick person remains among the orchards of Paradise until he returns.”', 'Imported draft; requires editorial review before publication.', 'Sahih Muslim 2568'),
  ('csv-221', 'tr', 'Hasta ziyareti', '“Kim bir hastayı ziyaret ederse, dönünceye kadar cennet bahçesindedir” buyruğuna uyarak hastayı ziyaret etmeye niyet ediyorum.', 'İçe aktarılan taslak; yayımlanmadan önce editoryal inceleme gerekir.', 'Sahîh-i Müslim 2568')
) as t(slug, locale, act, intention, note, source_label) on t.slug = u.slug
on conflict (intention_id, locale) do update set
  act = excluded.act,
  intention = excluded.intention,
  note = excluded.note,
  source_label = excluded.source_label;
