# Nawiya

An earlier project of Seif's, kept here because Uswah may absorb part of it.

## The idea

Nawiya is an internationalised platform built around **niyyah**, intention. Its premise, in
its own words on the card in `nawiya-intention-card.png`:

> أي عمل يومي يمكن تحويله إلى عبادة بمجرد تصحيح النية وجعلها لله تعالى.
>
> Any daily act can become worship simply by correcting the intention behind it and
> directing it to God.

So the unit of content is not a topic or a hadith. It is an ordinary act, paired with the
intention that changes what it counts as. Exercise, sleep, buying groceries, going to work.

## Why it matters to Uswah

The two projects share a premise and split on where they apply it.

Uswah starts from a **problem** and answers it from the sources. Nawiya starts from an
**ordinary act** and reframes it. Both are aimed at the same reader, and the same person
could plausibly want both in one product: what to do when something goes wrong, and how to
hold the parts of the day that are going fine.

The taxonomy below is also the most developed piece of thinking either project has about
how Muslim daily life divides up, which makes it useful to Uswah whether or not the Nawiya
feature ships.

## What the screenshots show

`nawiya-home-light-dark.png` — the homepage in both themes, designed together rather than
one derived from the other. Above the fold: a language switch, search, an avatar, and a
prominent **أضف نية** ("add an intention") button, which says the platform is
contributory rather than published-at.

`nawiya-card-grid.png` — the content grid. Each card is a photograph with a short Arabic
label under it and a small avatar, so an intention carries the person who wrote it. The
categories visible across the tab bar run: الصلاة · الصيام · الزكاة · النية · السنن ·
القرآن · الأدعية · الأحاديث · الذكر · العمل · الجيم · السفر · قيام الليل.

Note the tab bar mixes acts of worship with the gym and travel in one row. That is the
whole thesis expressed as information architecture.

## Taxonomy

Kept verbatim. Duplicates in the original are preserved rather than tidied, since they
record where the categories were still being worked out.

```
📂 العبادات
 ├─ الصلاة
 ├─ الصيام
 ├─ قراءة القرآن
 ├─ الدعاء
 └─ الذكر

📂 الصحة واللياقة
 ├─ الرياضة والتمارين
 ├─ الطب والعلاج
 └─ النظافة والطهارة

📂 الحياة اليومية
 ├─ العمل والدراسة
 ├─ التسوق وإنفاق المال
 ├─ الأكل والشرب
 └─ النوم والاستيقاظ

📂 السفر والترحال
 ├─ السفر والترحال
 └─ السفر للعمل

📂 المناسبات والأوقات الخاصة
 ├─ رمضان والأعياد
 ├─ الحج والعمرة
 └─ أوقات الشدة والضيق

📂 العناية بالبيئة والحيوان
 ├─ رعاية الحيوانات
 └─ العناية بالبيئة

📂 العلاقات الاجتماعية
 ├─ التعامل مع الأسرة
 ├─ التعامل مع الأصدقاء عمال
 ├─ إطعام الطعام
 ├─ رعاية الأيتام
 └─ التعاون

📂 العلاقات الإنسانية
 ├─ حسن الجوار
 ├─ إكرام الضيف
 ├─ بر الوالدين
 ├─ رعاية الأيتام
 ├─ الزواج
 ├─ تربية الأبناء
 ├─ صلة الرحم
 ├─ زيارة المريض
 └─ حسن المعاملة

📂 تزكية النفس
 ├─ حسن الخلق
 ├─ الصبر
 ├─ التقوى
 ├─ تطهير القلب
 ├─ محاسبة النفس
 ├─ مجاهدة النفس
 ├─ التفكر
 ├─ حفظ اللسان
 ├─ الوفاء بالعهد
 ├─ حفظ الجوارح
 ├─ كظم الغيظ
 ├─ الرفق
 ├─ التواضع
 ├─ الإخلاص
 ├─ الشكر
 ├─ التوكل
 ├─ الصدق
 ├─ ضبط النفس
 └─ حفظ الأمانة

📂 العبادات والطاعات
 ├─ حفظ القرآن
 ├─ النوافل
 ├─ الصيام التطوعي
 ├─ الاعتكاف
 ├─ الصدقة
 ├─ قيام الليل
 ├─ الصلاة
 ├─ قراءة القرآن
 ├─ الذكر
 └─ الاستغفار

📂 الدعوة والتعليم
 ├─ تعلم اللغات
 ├─ نشر العلم
 ├─ الدعوة الرقمية
 ├─ تعليم الأطفال
 └─ النصيحة

📂 العمل والدراسة
 └─ إتقان العمل

📂 العناية بالبيئة
 └─ ترشيد الاستهلاك
 └─ زراعة الأشجار
```

## Open questions if this becomes part of Uswah

1. **Who writes an intention?** The avatar on every card and the "add an intention" button
   say user-contributed. Uswah's whole reliability model assumes reviewed, sourced content.
   User submissions and a clearance gate are hard to reconcile, and this is the decision that
   shapes everything else.
2. **Fourteen categories against Uswah's six.** Uswah navigates by problem; Nawiya by act.
   Merging them produces a taxonomy that is doing two jobs and probably neither well.
3. **Does an intention need a source?** If it does, this is Uswah with a different entry
   point. If it does not, it is a second product sharing a login.
