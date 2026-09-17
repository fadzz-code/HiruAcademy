# Architecture

Batch 2 mengganti `/admin/bank-soal` dari generic `AdminScreen` menjadi Assessment Hub dan editor workspace khusus. Implementasi tetap frontend-only:

- typed authoring store pada `Frontend/src/lib/admin-assessment-store.ts`;
- published learner adapter pada `Frontend/src/lib/assessment-store.ts`;
- versioned localStorage key `hiru-admin-assessments:v1`;
- fixture student tetap dipertahankan sebagai fallback;
- hanya record berstatus `Published` yang masuk adapter student;
- tidak ada API, database, auth, permission engine, atau fake server.

Route editor memakai `/admin/bank-soal/baru?type=...` dan `/admin/bank-soal/baru?id=...`. Query ID dipilih karena project memakai static export; dynamic runtime ID route tidak kompatibel dengan `output: export`.

## Reusable Assessment Components

`Frontend/src/components/assessment-builder.tsx` menyediakan satu family, bukan empat builder terpisah:

- `AssessmentHub`
- `AssessmentTypeSelector`
- shared `AssessmentEditor`
- shared basics/settings panel
- shared question outline
- shared single-choice question editor
- repeatable answer option editor
- Try Out section editor
- validation summary
- preview dialog
- publication actions

Existing Batch 1 primitives direuse:

- `AdminShell`
- `AdminBreadcrumb`
- `AdminPageHeader`
- `AdminTabs`
- `AdminDataTable`
- `AdminStatusBadge`
- `AdminDialog`

Question actions tersedia: add, duplicate, move up/down, delete. Option actions tersedia: add, edit, select correct via radio, move up/down, delete. Reorder disimpan ke localStorage.

## Routes Added / Changed

- `/admin/bank-soal` — dedicated Assessment Hub.
- `/admin/bank-soal/baru` — type selector atau editor berdasarkan `type`/`id` query.
- `Frontend/src/lib/admin-console.ts` — menu Bank Soal tetap; generic screen config Bank Soal dihapus.
- Catch-all tetap melayani domain legacy lain.

Sidebar active ancestor tetap aktif pada editor nested karena navigation memakai segment-safe prefix matching.

## Demo Data Model

Authoring model mencakup:

- assessment ID, type, title, description, level, status, update timestamp;
- Practice category/order;
- Checkpoint chapter;
- Try Out duration, optional attempt limit, sections, max score;
- Mini session/part/duration;
- questions, section relation, prompt, image URL, audio URL, explanation;
- repeatable options dan exactly-one `isCorrect`.

Store melakukan normalisasi corrupt/incomplete data serta memastikan question, option, dan section ID stabil dan unik.

Learner adapter memisahkan rendered options dari authoring correctness:

- learner option hanya `id` dan label;
- answer key disimpan pada internal frontend prototype map untuk local scoring;
- draft difilter sebelum adaptation;
- ini bukan security production.

## Latihan Builder

Supported levels:

- DASAR
- N5
- N4
- N3
- N2
- SSW

N5–N2 memakai kategori:

- Kosakata
- Kanji
- Tata Bahasa
- Audio
- Reading

DASAR dan SSW tidak mewajibkan kategori. Latihan mendukung nama, urutan, deskripsi opsional, media URL, questions, preview, Draft, dan Terbit.

## Checkpoint Builder

Checkpoint mendukung:

- level;
- chapter;
- title/description;
- shared questions/options/editor;
- preview;
- Draft/Terbit.

Student Journey connection tidak dibuat. Existing checkpoint route memiliki coupling ke Journey progress/unlock dan `LearningData`; menghubungkannya tanpa dedicated Journey contract berisiko mengubah entitlement/unlock behavior.

## Try Out Builder

Try Out mendukung:

- level;
- title/description;
- duration minutes;
- optional attempt limit sesuai prototype flow;
- repeatable sections;
- section rename/order/delete;
- per-section max score;
- question-to-section assignment;
- derived summary: total questions, sections, duration, maximum score;
- preview, Draft, Terbit.

Publish memerlukan duration positif, section valid, max score positif, dan setiap question berada pada section valid.

## Mini Checkpoint Builder

Mini hierarchy mengikuti requirement:

- N5: sesi 1–3, part 1–2;
- N4: sesi 1–3, part 1–2;
- N3: sesi 1–4, part 1–2;
- N2: sesi 1–4, part 1–2.

DASAR, SSW, Interview, dan level lain tidak tersedia pada Mini builder.

## Validation

Publish diblokir ketika:

- title kosong;
- level kosong;
- tidak ada question;
- prompt kosong;
- kurang dari dua option terisi;
- tidak tepat satu correct answer;
- correct option kosong;
- Practice category/order invalid;
- Checkpoint chapter invalid;
- Try Out duration/section/max score/question assignment invalid;
- Mini session/part invalid.

Validation summary memakai focusable alert. Draft tetap dapat disimpan agar authoring progres tidak hilang.

## Preview

Preview memakai `AdminDialog`:

- tidak menjadi permanent third column;
- default tidak menandai correct answer;
- QA toggle dapat menampilkan correct answer;
- close mengembalikan focus melalui dialog foundation Batch 1.

## Admin → Student Connections

### Practice

CONNECTED DEMO.

Published Practice records digabung dengan lima fixture exercises berdasarkan order. Admin title, question count, prompt, options, dan answer key prototype dipakai runner. Draft tidak tampil. Existing fixtures tidak dihapus.

### Try Out

CONNECTED DEMO.

Published Try Out card ditambahkan ke catalog fixture. Title, question count, duration, sections, maximum score, section question count, dan runner questions berasal dari Admin record. Existing polished student layout/classes dipertahankan.

### Mini

CONNECTED DEMO.

Published Mini record digabung/dedupe berdasarkan `level|session|part` dengan fixture hierarchy. Title, count, duration display, dan runner question berasal dari Admin record. Draft tidak tampil.

### Checkpoint

ADMIN ONLY pada Batch 2.

Connection ditunda karena current chapter checkpoint terikat Journey `LearningData`, progress, membership, dan unlock state. Tidak ada redesign Journey pada batch ini.

## Legacy AdminScreen

`/admin/bank-soal` tidak lagi memakai generic `AdminScreen`. Generic screen tetap ada untuk domain Admin lain yang belum direbuild.

## Responsive

Automated hub dan editor checks:

- 360: hub usable; editor mode switch; option rows wrap; no overflow.
- 390: full mobile authoring scenario, preview, save; no overflow.
- 768: compact mode switch; no overflow.
- 820: compact mode switch; no overflow.
- 1024: two-column outline + editor workspace.
- 1440: two-column outline + editor workspace.

Assessment CSS ditambahkan pada `Frontend/src/app/stitch-visual.css`. Legacy assessment CSS tidak dihapus karena repository-wide dirty route state membuat deletion attribution tidak aman.

## Tests

- `npx next typegen`: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS
- `tests/admin-assessment.spec.ts`: PASS — 11 tests
- `tests/admin-console.spec.ts`: PASS — 38 tests

Focused coverage:

- hub tabs/search/level/status/reset;
- invalid publish blocked;
- Draft hidden from student;
- Latihan UI create/publish/persist → Practice card and 3-question runner;
- Try Out UI create/sections/questions/publish → student card/prestart/runner;
- Mini UI create/publish → hierarchy/runner;
- Checkpoint Admin create/publish persistence;
- question reorder persistence;
- mobile create/edit/add option/radio/preview/save;
- six responsive viewport checks;
- no horizontal body overflow;
- hydration-safe editor initialization.

## Remaining OPEN

- Production timer, attempt, scoring, autosave, submission, review eligibility, and answer secrecy remain backend-owned future work.
- Checkpoint student connection requires dedicated Journey/progress contract.
- Exact production attempt limits and scoring/passing rules remain unresolved; builder does not invent universal values.
- Media uses URL/reference fields only; upload limits and private storage policy remain OPEN.
- Frontend localStorage connection demonstrates UX only, not production authorization or security.

No commit. No push.
