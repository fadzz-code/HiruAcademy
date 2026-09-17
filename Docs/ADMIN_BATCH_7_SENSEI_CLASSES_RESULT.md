# Existing Student/Class Flow Audit

## Schedule:

Student `/schedule` masuk melalui `StaticStudentRoute kind="schedule"`, mempertahankan `SenseiShell`, membership gate, calendar/list controls, session list, dan announcement (`Frontend/src/components/static-student-route.tsx:47-66`, `Frontend/src/components/sensei-screens.tsx:29-39`).

Sebelum Batch 7, data hanya fixture `scheduleSessions` dengan `id`, `title`, `meta` placeholder, dan `status`. Tidak ada timestamp, Sensei ID, class ID, chapter relation, atau meeting URL.

## Replay:

Replay records tetap dikelola Batch 3 melalui `admin-curriculum-store.ts` dan `curriculum-store.ts`. Batch 7 hanya menyimpan optional `replayId` pada Session. Tidak ada Replay model/editor kedua.

## Sensei presentation:

Landing dan public `/sensei` memakai `SenseiGrid` dengan fixture `publicSensei`. Batch 7 menggabungkan Sensei aktif dari Class Operations Store ke card shape yang sama, dengan fixture fallback dan dedupe ID/name. Landing tetap mengontrol copy/visibility section melalui Batch 4.

## Membership gating:

Sensei features tetap membutuhkan membership `sensei`. `getEffectiveMembership()` mempertahankan precedence:

1. explicit `?membership=free|lms|sensei`;
2. current demo user business store;
3. Free fallback.

Free/LMS tetap melihat existing locked/unavailable screen. Batch 7 tidak menjadikan class data sebagai authorization.

## Existing class/cohort model:

Sebelum Batch 7 tidak ada typed class/cohort/session model. Class detail dan agenda bersifat hard-coded Chapter 4. Batch 7 membangun model minimum Class dan Session yang diperlukan schedule, tanpa cohort enrollment, capacity, waitlist, attendance, transfer, atau classroom CRM.

# Architecture

Dedicated typed class operations architecture:

- `Frontend/src/lib/admin-class-operations-store.ts`
- `Frontend/src/lib/class-store.ts`
- localStorage key `hiru-admin-class-operations:v1`
- event `hiru:class-operations-change`
- safe normalization/dedupe
- reactive `useSyncExternalStore`

Authoring flow:

```text
Admin Sensei/Class/Session Store
↓
Active published adapter
↓
Existing SenseiGrid / ScheduleScreen
↓
Fixture fallback
```

No API, database, Zoom API, Google Calendar API, Sensei portal, attendance engine, atau backend authorization.

## Routes Migrated From AdminScreen

- `/admin/sensei` → dedicated `SenseiDirectory`
- `/admin/kelas-jadwal` → dedicated `ClassOperations`

Kedua route dihapus dari generic `screens` map tetapi tetap berada di `adminMenu`. `AdminScreen` hanya tersisa untuk domain yang belum selesai.

# Sensei

## Fields:

- ID stabil
- Nama
- Foto URL/reference
- Bio singkat
- Keahlian/spesialisasi
- Catatan ketersediaan opsional
- Status
- createdAt/updatedAt

## Statuses:

- Aktif
- Nonaktif

Sensei Nonaktif tetap tampil pada historical session relation, tetapi tidak dapat dipilih untuk class/session aktif baru.

## Public/student connection:

Sensei aktif digabung dengan `publicSensei` fixture dan dirender melalui `SenseiGrid` existing. Landing tetap memakai `limit={3}` dan public `/sensei` tetap full list. Tidak ada redesign.

Sensei detail Admin menurunkan current classes, upcoming sessions, dan recent sessions dari Class/Session store; assignment tidak disalin ke Sensei record.

# Classes

## Model:

- id
- title
- programCode / level
- senseiId relation
- membership plan context `sensei`
- status
- description
- createdAt/updatedAt

## Relations:

- Program menggunakan Batch 3 `ProgramCode`.
- Sensei memakai `senseiId`, bukan free text.
- Sessions memakai `classId` dan optional `chapterId`.

## Statuses:

- Aktif
- Selesai
- Nonaktif

Historical records dipertahankan ketika Sensei/Class menjadi Nonaktif.

# Sessions / Schedule

## Fields:

- id
- classId
- title
- optional chapterId
- senseiId
- startAt ISO timestamp
- endAt ISO timestamp
- Link Pertemuan
- status
- optional replayId
- optional notes

## Timezone:

Store membandingkan ISO timestamps. Tampilan menggunakan locale `id-ID` dan timezone `Asia/Jakarta`.

## Conflict handling:

Save session diblokir ketika Sensei sama memiliki interval overlap:

```text
existing.startAt < candidate.endAt
&& existing.endAt > candidate.startAt
```

Session Dibatalkan tidak dianggap conflict. Error tampil sebagai alert jelas pada dialog.

Validation lain:

- class relation wajib;
- Sensei aktif wajib untuk session aktif;
- end harus setelah start;
- Link Pertemuan harus URL HTTP/HTTPS valid;
- chapter/replay optional.

## Student connection:

Session aktif dan class aktif diproyeksikan ke `ScheduleScreen` existing, digabung dengan fixture fallback. Adapter menyediakan title, formatted date/time, Sensei name, program/chapter context, meeting URL, status, dan replay relation.

Membership gate tetap dilakukan sebelum ScheduleScreen dirender.

# Replay Relation

Replay source tetap Batch 3:

- `admin-curriculum-store.ts`
- `curriculum-store.ts`
- Kurikulum & Materi Replay workflow

Session editor hanya menampilkan relation picker untuk existing Replay ID dan deep link `Buka Replay` menuju existing editor. Session store tidak menyimpan replay content, YouTube URL, atau duplicate metadata.

Tidak ada duplicate Replay store/editor.

# Program / Chapter Relations

- Class Program memilih Batch 3 `programCodes`.
- Session optional Chapter reference tidak menggandakan chapter title authoring.
- Historical class tetap ada bila Program kemudian archived.
- Batch 7 tidak mengubah Program entitlement/access hierarchy.

# Membership Access Preserved

- `/schedule?membership=free`: locked state.
- `/schedule?membership=lms`: locked state.
- `/schedule?membership=sensei`: schedule available.
- Explicit query tetap QA override utama.
- Batch 6 demo current-user membership hanya fallback bila query tidak ada.

# Store Architecture

Models:

- `Sensei`
- `ClassRecord`
- `Session`
- `ClassOperationsStore`

Store features:

- version 1 envelope;
- corrupt/incomplete fallback;
- dedupe by stable ID;
- CRUD/upsert helpers;
- status toggles;
- overlap detector;
- meeting URL validation;
- replay relation validation terhadap Batch 3 records;
- stable SSR/client snapshots untuk hydration-safe hooks.

# Responsive

Automated tests:

- 360: Sensei/Class list usable, dialogs stack, no overflow.
- 390: create/edit Sensei, Class, Session, replay relation usable.
- 768: compact table/form layout.
- 820: tablet layout stable.
- 1024: desktop sidebar/table workspace.
- 1440: full operational table layout.

# Regression

- Batch 1: 31/31 PASS.
- Batch 2: 11/11 PASS.
- Batch 3: 11/11 PASS.
- Batch 4: 29/29 PASS.
- Batch 5: 15/15 PASS.
- Batch 6: 33/33 PASS.
- Batch 7: 6/6 PASS.
- Total: 136/136 PASS.

Critical regression paths tetap berjalan: Dashboard, Invoice, Users, Affiliate/Payout, Placement, Landing, Program, Curriculum, Assessment, Journey, Practice, Try Out, Flashcard, Library, Replay, Notifications, dan explicit membership overrides.

# Validation

- `npx next typegen`: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS, 270 static pages
- Playwright full Admin regression: PASS, 136 tests

# Remaining OPEN

- Backend authorization untuk class enrollment, session ownership, meeting access, dan replay access.
- Final cohort/class enrollment model belum ditentukan; Batch 7 sengaja tidak membangun enrollment engine.
- Production meeting provider, OAuth, Zoom/Meet creation, dan link release policy.
- Attendance, reminder persistence, notification automation, and session completion workflow.
- Exact cancellation/reschedule policy and audit trail.
- Whether schedule detail should gain stable dynamic route after deployment architecture leaves pure static export.
- Replay/session one-to-one versus one-to-many contract.
- Multi-timezone support beyond Asia/Jakarta display default.

No commit. No push.
