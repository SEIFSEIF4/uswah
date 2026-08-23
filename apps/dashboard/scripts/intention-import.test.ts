import assert from "node:assert/strict";
import {
  actLabels,
  bestTopicMatch,
  buildDorarQueries,
  classifySource,
  draftNotes,
  hasAllLocales,
  isRelatedToDorar,
  isUnpublishedDraft,
  mapActGroup,
  parseIntentionsCsv,
  slugifyIntention,
  sourceLabel,
} from "../lib/intention-import";

const csv = `ID,مقبولة؟,التاريخ,مصدر النية,الكاتب,النية,القسم الفرعي,القسم الرئيسي
2,نعم,2025-05-01,AI,سيف الاسلام,نويت أن أصلي لله تعالى,الصلاة,العبادات
7,معلق,2025-05-01,حديث نبوي,سيف الاسلام,"نويت الصلاة لأن الصلاة عمود الدين
ولأنها أهم أمور الدين",الصلاة,العبادات
9,لا,2025-05-01,القرآن الكريم,سيف,نويت الإنفاق,الإنفاق,العبادات`;

const rows = parseIntentionsCsv(csv);
assert.equal(rows.length, 3);
assert.equal(rows[0].id, "2");
assert.equal(rows[1].intention, "نويت الصلاة لأن الصلاة عمود الدين\nولأنها أهم أمور الدين");
assert.equal(rows[2].accepted, "لا");
assert.equal(classifySource(rows[2].source), "quran");

assert.equal(mapActGroup("العبادات"), "worship");
assert.equal(mapActGroup("غير موجود"), null);
assert.equal(slugifyIntention("7"), "csv-7");
assert.deepEqual(buildDorarQueries(rows[0]), ["نويت أن أصلي لله تعالى", "الصلاة", "العبادات"]);
assert.equal(
  isRelatedToDorar("نويت الصلاة لأن الصلاة عمود الدين", [{ th: "الصلاة عمود الدين" }]),
  true,
);
assert.equal(isRelatedToDorar("نويت شراء سيارة جديدة", [{ th: "فضل الصيام" }]), false);

assert.equal(classifySource("AI"), "ai");
assert.equal(classifySource("حديث نبوي"), "hadith");
assert.equal(classifySource("القرآن الكريم"), "quran");

const topic = bestTopicMatch(
  "نويت النوم لأن لجسدك عليك حقا",
  [
    {
      id: "a",
      text: "فإن لجسدك عليك حقا ولعينك عليك حقا",
      categories: [{ id: "1", name: "رقائق وزهد - النوم" }],
    },
    { id: "b", text: "فضل الصيام في الحر", categories: [] },
  ],
  3,
);
assert.equal(topic?.result.id, "a");
assert.ok((topic?.score ?? 0) >= 3);
assert.equal(bestTopicMatch("نويت شراء سيارة", [{ id: "b", text: "فضل الصيام" }], 3), null);

assert.equal(hasAllLocales({ ar: 1, en: 1, tr: 1 }), true);
assert.equal(hasAllLocales({ ar: 1, en: 1 }), false);
assert.equal(isUnpublishedDraft(false), true);
assert.equal(isUnpublishedDraft(true), false);

assert.equal(actLabels("الصلاة").en, "Prayer");
assert.equal(actLabels("الصلاة").tr, "Namaz");
assert.match(sourceLabel("صحيح مسلم", "2664", "en"), /Sahih Muslim/);
assert.match(draftNotes("topic").en, /Topic-related/);
assert.match(draftNotes("exact").ar, /مسودة/);
assert.equal(slugifyIntention("221"), slugifyIntention("221"));

console.log("intention-import tests passed");
