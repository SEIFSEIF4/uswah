-- The cited source, translated, on the saying pages.
--
-- The situation pages have always carried a translation of their source with a
-- named translator; the saying pages showed the Arabic alone, which left the
-- English and Turkish readers looking at a text they could not read. Same shape
-- as source_translations: text plus translator, nullable, ar rows stay null
-- because the original is the text there. House drafts carry the same honest
-- credit the situation drafts use, until a reviewer signs them off.

alter table saying_translations add column source_text text;
alter table saying_translations add column source_translator text;

update saying_translations st
   set source_text = v.source_text,
       source_translator = v.source_translator
from (values
  ('easy-come-easy-go', 'en',
   'Allah wipes out riba and makes acts of charity grow.',
   'Uswah draft, awaiting review'),
  ('easy-come-easy-go', 'tr',
   'Allah faizi mahveder, sadakaları ise bereketlendirir.',
   'Uswah taslağı, inceleme bekliyor'),
  ('teach-a-man-to-fish', 'en',
   'For one of you to take his rope, come back with a bundle of firewood on his back and sell it, and Allah thereby spare his face, is better for him than asking people, whether they give him or refuse him.',
   'Uswah draft, awaiting review'),
  ('teach-a-man-to-fish', 'tr',
   'Birinizin ipini alıp sırtında bir bağ odunla dönmesi, onu satması ve Allah''ın bununla onun onurunu koruması, verseler de vermeseler de insanlardan istemesinden daha hayırlıdır.',
   'Uswah taslağı, inceleme bekliyor'),
  ('actions-speak-louder', 'en',
   'Deeds are only by intentions, and every person has only what they intended. So whoever''s migration was to worldly gain or to a woman to marry, their migration is to that for which they migrated.',
   'Uswah draft, awaiting review'),
  ('actions-speak-louder', 'tr',
   'Ameller ancak niyetlere göredir; herkese ancak niyet ettiği vardır. Kimin hicreti elde edeceği bir dünyalığa veya nikâhlayacağı bir kadına ise, hicreti kendisine hicret ettiği şeyedir.',
   'Uswah taslağı, inceleme bekliyor'),
  ('you-become-like-your-company', 'en',
   'The example of a good companion and a bad one is that of a musk-seller and a bellows-blower: the musk-seller may give you some, or you may buy from him, or at least you find a pleasant scent from him; the bellows-blower either burns your clothes or you find a foul smell from him.',
   'Uswah draft, awaiting review'),
  ('you-become-like-your-company', 'tr',
   'İyi arkadaş ile kötü arkadaşın misali, misk taşıyan ile körük çeken gibidir: misk taşıyan ya sana ondan verir, ya ondan satın alırsın, ya da ondan güzel bir koku duyarsın; körük çeken ise ya elbiseni yakar ya da ondan kötü bir koku duyarsın.',
   'Uswah taslağı, inceleme bekliyor'),
  ('all-men-are-created-equal', 'en',
   'O people! Your Lord is one, and your father is one. No Arab is above a non-Arab, nor a non-Arab above an Arab; no red above black, nor black above red, except by taqwa. The most honored of you with Allah is the most God-conscious. Have I conveyed the message? They said: Yes, Messenger of Allah. He said: Then let the present convey it to the absent.',
   'Uswah draft, awaiting review'),
  ('all-men-are-created-equal', 'tr',
   'Ey insanlar! Rabbiniz birdir, atanız birdir. Arabın Arap olmayana, Arap olmayanın Araba; kırmızının siyaha, siyahın kırmızıya takva dışında hiçbir üstünlüğü yoktur. Allah katında en değerliniz, en çok sakınanınızdır. Tebliğ ettim mi? Evet, ey Allah''ın Resulü, dediler. O halde burada olan olmayana ulaştırsın, buyurdu.',
   'Uswah taslağı, inceleme bekliyor')
) as v(slug, locale, source_text, source_translator)
join sayings s on s.slug = v.slug
where st.saying_id = s.id and st.locale = v.locale;
