-- The saying as each locale actually knows it.
--
-- sayings.saying keeps the canonical circulating form (English for all five).
-- But an Arabic reader does not meet "Easy come, easy go" in the wild; they
-- meet the native aphorism that carries the same idea. This column holds that
-- equivalent per locale: not a translation of the English line, the version
-- that circulates. Nullable on purpose; en rows stay null and the web client
-- falls back to the canonical form wherever a locale has no version of its own.

alter table saying_translations add column saying text;

update saying_translations st set saying = v.saying
from (values
  ('teach-a-man-to-fish',          'ar', 'لا تعطني سمكة، بل علّمني كيف أصطاد'),
  ('teach-a-man-to-fish',          'tr', 'Bana balık verme, balık tutmayı öğret.'),
  ('actions-speak-louder',         'ar', 'الأفعال أبلغ من الأقوال'),
  ('actions-speak-louder',         'tr', 'Lafla peynir gemisi yürümez.'),
  ('easy-come-easy-go',            'ar', 'ما يأتي بسهولة يذهب بسهولة'),
  ('easy-come-easy-go',            'tr', 'Haydan gelen huya gider.'),
  ('you-become-like-your-company', 'ar', 'الصاحب ساحب'),
  ('you-become-like-your-company', 'tr', 'Üzüm üzüme baka baka kararır.'),
  ('all-men-are-created-equal',    'ar', 'الناس سواسية'),
  ('all-men-are-created-equal',    'tr', 'Bütün insanlar eşit yaratılmıştır.')
) as v(slug, locale, saying)
join sayings s on s.slug = v.slug
where st.saying_id = s.id and st.locale = v.locale;
