# HIRU Academy — Implementation Status

> Snapshot audit repo aktual per 15 Agustus 2026. Figma/client tetap source of truth; dokumen ini tidak menetapkan desain atau perilaku baru. Status berdasarkan file yang ada, termasuk perubahan working tree yang belum commit.

## Ringkasan

- Frontend clickable MVP: **partially complete**.
- Batch 0 public/program/placement flows: implemented as frontend mock.
- Batch 1 Free Core Learning: implemented with dashboard → level → chapter → content → flashcard/practice flow.
- Batch 1.1 checkpoint unlock rule: corrected; Free checkpoint opens only after required activities complete.
- Batch 2 Free supporting screens: Library, Latihan, Progres, Leaderboard, Community read-only, Notifications, Profile, and Renewal/Upgrade mock routes implemented with shared student navigation.
- Batch 2 locked states: Free Try Out, Certificate, Replay, Tanya Sensei, Mini Checkpoint, and Chapter 2+ remain locked; available unfinished screens use `Fitur Belum Tersedia` semantics.
- Batch 2 uses deterministic frontend mock data; payment, notification delivery, certificate issuing, community write, and backend entitlement remain deferred.
- Auth, scoring authority, persistence, and backend remain deferred.
- Manual visual browser QA remains pending.
- Free, LMS, dan Sensei: **frontend visual prototype dengan mock data**.
- Auth: **UI only**; belum ada autentikasi nyata.
- Entitlement: **client/query controlled**; belum aman untuk production.
- Assessment: **local preview**; timer, score, attempt, persistence, dan submit belum server-authoritative.
- Backend: **belum dibuat**; `Backend/` hanya `.gitkeep`.
- Admin: **belum dibuat**.
- Production readiness: **belum siap**.

## Fitur/screens selesai

- Public landing: header, mobile menu, hero, program cards, learning flow, placement CTA, footer. Implementasi: `Frontend/src/app/page.tsx`.
- Login dan register UI: `Frontend/src/app/login/page.tsx`, `Frontend/src/app/register/page.tsx`, `Frontend/src/components/auth-form.tsx`.
- Student dashboard dengan variant Free/LMS/Sensei, locked preview, upgrade CTA: `Frontend/src/components/student-dashboard.tsx`.
- Student navigation dan modal `Fitur Belum Tersedia`: `Frontend/src/components/student-navigation.tsx`.
- Journey: level selection, chapter journey, locked/current/completed state: `Frontend/src/components/level-selection.tsx`, `Frontend/src/components/chapter-journey.tsx`.
- Learning overview dan flashcard route/session: `Frontend/src/components/lesson-overview.tsx`, `Frontend/src/components/flashcard-session.tsx`.
- Try Out runner preview: question navigator, radio answer, local result/review, visual timer, confirmation modal: `Frontend/src/components/assessment-runner.tsx`.
- Sensei visual screens: Schedule, Replay, Tanya Sensei: `Frontend/src/components/sensei-screens.tsx`, `Frontend/src/components/ask-sensei-screen.tsx`.
- Mini Checkpoint visual flow: `Frontend/src/components/mini-checkpoint-screen.tsx`.
- Ruby/furigana dipakai pada konten Jepang di beberapa screen.

## MVP Free, LMS, Sensei

### Free

- Dashboard dan locked preview tersedia.
- Journey/learning gratis mengikuti fixture mock.
- Latihan Harian berstatus terbatas.
- Try Out, Achievement, Sertifikat, Replay, Tanya Sensei, Mini Checkpoint terkunci.
- Status belum berasal dari akun/server.

### LMS / Belajar Mandiri

- Dashboard, level/journey, chapter, lesson, flashcard, Try Out preview tersedia.
- Fixture menyatakan Latihan Harian, Try Out, Achievement, Community, Sertifikat aktif.
- Replay, Sensei, Mini Checkpoint terkunci.
- Fitur Perpustakaan dan Latihan Harian belum punya screen aktif.

### Sensei / Belajar dengan Sensei

- Semua screen LMS di atas, plus Schedule, Replay, Tanya Sensei, Mini Checkpoint preview.
- Fixture menyatakan seluruh feature catalog aktif.
- Cohort, kelas live, replay, pertanyaan, dan assessment belum tersambung data nyata.

## Route aktif

Route file aktif:

- `/`
- `/login`
- `/register`
- `/dashboard`
- `/journey`
- `/journey/[level]`
- `/learn/[level]/[chapter]`
- `/learn/[level]/[chapter]/flashcards`
- `/tryout`
- `/schedule`
- `/replay`
- `/ask-sensei`
- `/mini-checkpoint`

Route utama student dirutekan oleh `Frontend/src/components/static-student-route.tsx:23-43`.

## Shared components penting

- `Frontend/src/components/student-dashboard.tsx`
- `Frontend/src/components/student-navigation.tsx`
- `Frontend/src/components/static-student-route.tsx`
- `Frontend/src/components/journey-shell.tsx`
- `Frontend/src/components/learning-shell.tsx`
- `Frontend/src/components/sensei-shell.tsx`
- `Frontend/src/components/level-selection.tsx`
- `Frontend/src/components/chapter-journey.tsx`
- `Frontend/src/components/assessment-runner.tsx`
- `Frontend/src/components/flashcard-session.tsx`
- `Frontend/src/components/auth-form.tsx`

## Entitlement saat ini

Membership type hanya `free | lms | sensei`: `Frontend/src/lib/dashboard-mock.ts:1`.

- `parseMembership()` membaca query `membership`; nilai `lms`/`sensei` diterima, selain itu menjadi Free: `Frontend/src/lib/dashboard-mock.ts:155-157`.
- Try Out mengizinkan LMS/Sensei melalui `hasTryoutAccess()`: `Frontend/src/lib/assessment-mock.ts`.
- Schedule, Replay, Tanya Sensei, Mini Checkpoint mengizinkan Sensei melalui `hasSenseiAccess()`: `Frontend/src/lib/sensei-mock.ts`.
- Tidak ada session, identity, server authorization, atau HTTP 401/403. Deep-link protection hanya render client.

## Mock/frontend-only

Mock boundary saat ini:

- `Frontend/src/lib/dashboard-mock.ts`
- `Frontend/src/lib/journey-mock.ts`
- `Frontend/src/lib/learning-mock.ts`
- `Frontend/src/lib/assessment-mock.ts`
- `Frontend/src/lib/sensei-mock.ts`

Masih mock/frontend-only:

- Login redirect ke dashboard; register belum punya submit API, validation server, session, CSRF, atau error state: `Frontend/src/components/auth-form.tsx`.
- User, progress, level, chapter, lesson, flashcard, Sensei, cohort, jadwal, replay, dan hasil assessment berasal dari fixture.
- Try Out memakai answer key di browser, React state, score lokal, timer hard-coded `25:00`, tanpa countdown/persistence/idempotency: `Frontend/src/components/assessment-runner.tsx`, `Frontend/src/lib/assessment-mock.ts`.
- Mini Checkpoint memiliki level N5–N2 dan struktur level/session/part, tetapi timer, attempt, autosave, submit, score, dan pass belum server-controlled.
- Copy visible masih menyebut preview/mock/data contoh pada beberapa flow.
- Blog, Testimoni, dan Privacy tetap out-of-scope; Landing menampilkan state non-interactive untuk destination yang belum tersedia.

## Belum dibuat

- Production Placement lead capture and backend scoring.
- Invoice/order, payment verification, WhatsApp handoff state, membership activation.
- Laravel API, Sanctum auth/session, authorization policy, entitlement service.
- PostgreSQL schema/migrations/models.
- S3-compatible upload, signed URL, media validation.
- Assessment persistence, secure question delivery, server score/timer/attempt, autosave, idempotent submit.
- Admin console, user/access management, invoice verification, CMS, content moderation/publish flow.
- Blog/article routes and publishing.
- Production Community, Perpustakaan, Latihan Harian, Achievement, Certificate, Profile, Notifications, and Progress data/workflows.
- Cohort, schedule, replay, Ask Sensei persistence and workflows.
- SEO persistence/canonical/sitemap/robots configuration.
- Playwright E2E, race-condition tests, accessibility tests, visual regression.

## OPEN COPY / mismatch Figma

Figma files tidak ada di repo. Exact copy, layout, state, dan parity Pages 08–11: **OPEN**.

Observable mismatch/gap terhadap requirement tertulis:

- Landing placement CTA menuju `/register`; Placement Test belum ada.
- Program/CTA belum memiliki plan selection, invoice, payment verification, atau WhatsApp continuation.
- Admin Page 11 belum ada.
- Free/LMS/Sensei entitlement masih query-controlled, bukan server-authoritative.
- Try Out dan Mini Checkpoint masih preview lokal, bukan assessment production.
- Public Blog, Testimoni, Privacy, dan beberapa navigation target belum memiliki route/content nyata.
- Harga, promotion, catalog final N1–N5, progress weight, assessment rules final, WhatsApp production contact, blog editor format, SEO domain, media limits, responsive acceptance, dan Admin permission granularity tetap **OPEN** sesuai dokumen requirement.

## Backend/API

`Backend/.gitkeep` satu-satunya isi backend. Belum ada Laravel, `composer.json`, route API, controller, request validation, model, migration, policy, auth, database, storage, queue, atau test.

Belum ada API untuk auth, user, entitlement, invoice, payment, placement, catalog/content, learning progress, flashcard, assessment, schedule, replay, Sensei, community, certificate, notification, atau Admin.

## Validation/build status

Script tersedia di `Frontend/package.json:5-10`:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run dev`
- `npm run start`

Tidak ada CI, Playwright config/spec, backend test command, atau deployment config. `.next/` dan `out/` ada di working tree, tetapi keberadaan output bukan bukti production validation.

Audit ini menjalankan validation aktual setelah dokumen ditulis; hasil tercatat di bawah.

## Deployment readiness

**Not ready.** Frontend dapat dijalankan sebagai prototype, tetapi auth, backend/API, database, payment/invoice, authorization, content/admin, test suite, environment config, CI, domain/canonical, monitoring, dan production security belum tersedia. Jangan deploy sebagai production app.

## Recommended next implementation order

1. Kunci copy/state Figma Pages 08–11 dan semua item OPEN yang menghalangi contract.
2. Tetapkan typed API boundary untuk auth, user, entitlement, content, assessment, invoice, dan Sensei; pertahankan screen composition.
3. Bangun Backend Laravel foundation: Sanctum, PostgreSQL migrations/models, policies, entitlement, validation, error contract.
4. Implement auth + account/entitlement + invoice/WhatsApp verification dengan idempotency.
5. Sambungkan Free/LMS/Sensei dashboard, Journey, learning, progress, dan content dari API.
6. Bangun assessment server authority: Placement, Try Out, Mini Checkpoint, timer, attempt, autosave, secure review, race handling.
7. Bangun Admin foundation: user/access, invoice verification, content publish, cohort/Sensei operations.
8. Lengkapi missing student screens dan public routes sesuai Figma.
9. Tambah lint/typecheck/build CI, Playwright critical journeys, accessibility, responsive, and race tests.
10. Siapkan staging, env/secrets, storage, observability, backup, domain, dan deployment runbook.

## Git snapshot

- Working tree memiliki perubahan belum commit pada `Frontend/next.config.ts`, route pages, dan `Frontend/src/components/static-student-route.tsx`.
- HEAD: `e36b7a9 fix(auth): refine branding panel spacing`.
- Audit tidak membuat commit dan tidak mengubah fitur/desain.
