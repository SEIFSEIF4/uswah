import assert from "node:assert/strict";
import { isRelatedToDorar, mapActGroup, parseIntentionsCsv, slugifyIntention } from "../lib/intention-import";

const csv = `ID,مقبولة؟,التاريخ,مصدر النية,الكاتب,النية,القسم الفرعي,القسم الرئيسي
2,نعم,2025-05-01,AI,سيف الاسلام,نويت أن أصلي لله تعالى,الصلاة,العبادات
7,معلق,2025-05-01,حديث نبوي,سيف الاسلام,"نويت الصلاة لأن الصلاة عمود الدين
ولأنها أهم أمور الدين",الصلاة,العبادات`;

const rows = parseIntentionsCsv(csv);
assert.equal(rows.length, 2);
assert.equal(rows[1].intention, "نويت الصلاة لأن الصلاة عمود الدين\nولأنها أهم أمور الدين");
assert.equal(mapActGroup("العبادات"), "worship");
assert.equal(mapActGroup("غير موجود"), null);
assert.equal(slugifyIntention("7"), "csv-7");
assert.equal(
  isRelatedToDorar("نويت الصلاة لأن الصلاة عمود الدين", [{ th: "الصلاة عمود الدين" }]),
  true,
);
assert.equal(isRelatedToDorar("نويت شراء سيارة جديدة", [{ th: "فضل الصيام" }]), false);
