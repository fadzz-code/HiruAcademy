# FINAL GIT / COMMIT ORGANIZATION — HIRU ACADEMY

**File:** `docs/ai/07-GIT-COMMIT-PLAN.md`  
**Batch:** 7 / Git & Commit Organization  
**Tanggal baseline:** 12 Agustus 2026  
**Produk:** HIRU Academy  
**Status:** **FINAL WORKING POLICY — ACTIVE DURING IMPLEMENTATION**  
**Bergantung pada:** `01-PRD-HIRU-ACADEMY.md`, `02-UI-UX-DESIGN-BRIEF.md`, `04-DEBUG-PLAYBOOK.md`  
**Dipakai mulai:** commit pertama frontend implementation

---

# 0. Tujuan

Dokumen ini mengatur cara seluruh perubahan HIRU Academy disimpan di Git agar:

- history mudah dibaca;
- perubahan dapat direview;
- bug mudah dilacak;
- rollback aman;
- fitur besar tidak masuk dalam satu commit raksasa;
- frontend, backend, test, docs, dan refactor dapat dibedakan;
- commit mencerminkan milestone produk;
- implementasi dari Figma dapat ditelusuri;
- perubahan lintas membership tidak tersembunyi;
- cleanup tidak bercampur dengan feature development;
- security fix dapat dilacak dengan jelas.

Prinsip utama:

> **Satu commit harus mewakili satu perubahan logis yang dapat dijelaskan dalam satu kalimat.**

---

# 1. Status Batch 7

Batch 7 **aktif sejak frontend implementation dimulai**.

Ini berbeda dari Batch 6 dan Batch 8.

```text
01 PRD                      ✅
02 UI/UX Design Brief      ✅

        ↓

FRONTEND IMPLEMENTATION
        ↓
07 Git/Commit Organization ← DIPAKAI MULAI SEKARANG

        ↓

Functional MVP
        ↓
03 Actual Security Audit
05 Actual Playwright E2E
06 Cleanup & Refactor
        ↓
08 Reusable Skill
```

Batch 7 tidak menunggu frontend selesai.

Yang menunggu implementasi adalah **isi commit aktual**, bukan aturan organisasinya.

---

# 2. Source of Truth Saat Menentukan Commit

Commit tidak boleh mengubah requirement hanya agar implementation lebih mudah.

Urutan authority:

1. revisi client terbaru;
2. Figma Page 08–11;
3. `01-PRD-HIRU-ACADEMY.md`;
4. `02-UI-UX-DESIGN-BRIEF.md`;
5. security/debug/testing docs yang relevan;
6. Page 1 + HTML reference untuk visual/interaction;
7. PDF hanya untuk cross-check requirement;
8. backup pages tidak digunakan untuk implementation.

Jika perubahan berasal dari revisi requirement, commit harus menjelaskan perubahan behavior, bukan sekadar:

```text
update ui
```

---

# 3. Commit Format

HIRU memakai pola Conventional Commit:

```text
<type>(<scope>): <description>
```

Contoh:

```text
feat(auth): add membership-aware login flow
```

```text
fix(assessment): prevent duplicate tryout submission
```

```text
refactor(dashboard): unify membership feature cards
```

```text
test(placement): cover recommendation result flow
```

---

# 4. Type yang Diizinkan

## `feat`

Fitur baru atau behavior baru.

```text
feat(dashboard): add entitlement feature grid
```

## `fix`

Perbaikan bug.

```text
fix(auth): preserve redirect after successful login
```

## `refactor`

Perubahan struktur code tanpa mengubah behavior produk.

```text
refactor(assessment): extract shared runner configuration
```

## `test`

Menambah/mengubah automated test.

```text
test(assessment): cover mini checkpoint expiry
```

## `docs`

Dokumentasi.

```text
docs(prd): clarify free membership entitlement
```

## `style`

Perubahan formatting/code style yang tidak mengubah UI behavior.

```text
style(frontend): normalize import ordering
```

Jangan gunakan `style` untuk perubahan desain visual.

Perubahan visual produk tetap:

```text
feat(...)
```

atau:

```text
fix(...)
```

sesuai konteks.

## `chore`

Maintenance/build/tooling.

```text
chore(frontend): configure eslint and prettier
```

## `build`

Build system/dependency.

```text
build(frontend): configure production next build
```

## `ci`

Pipeline CI/CD.

```text
ci(playwright): run chromium smoke tests on pull requests
```

## `perf`

Optimasi performa tanpa mengubah behavior.

```text
perf(blog): optimize featured image loading
```

## `security`

HIRU boleh menggunakan type eksplisit `security` untuk perubahan keamanan penting.

```text
security(auth): enforce server-side membership authorization
```

Jika tooling repository nanti hanya menerima Conventional Commit standard tertentu, gunakan:

```text
fix(security): ...
```

Aturan repository aktual menjadi authority.

---

# 5. Scope Naming

Scope harus pendek, stabil, dan sesuai domain produk.

## Core

```text
auth
public
program
placement
invoice
payment
referral
dashboard
journey
learning
assessment
checkpoint
tryout
mini-checkpoint
community
certificate
profile
sensei
admin
blog
cms
media
analytics
settings
```

## Infrastructure

```text
frontend
backend
api
database
storage
playwright
security
ci
docs
```

Hindari scope:

```text
misc
stuff
changes
update
page
component
```

jika domain sebenarnya dapat disebutkan.

---

# 6. Description Rule

Description:

- lowercase pada awal;
- imperative/present tense;
- singkat;
- menjelaskan outcome;
- tanpa titik di akhir.

Baik:

```text
feat(placement): add immediate recommendation result
```

Buruk:

```text
feat: updated placement
```

Buruk:

```text
fix: fixing some stuff
```

Buruk:

```text
update frontend
```

---

# 7. Ukuran Commit

Commit ideal:

```text
1 perubahan logis
1 domain
1 tujuan
```

Tidak harus berarti satu file.

Contoh satu commit boleh menyentuh:

```text
components/
hooks/
types/
page.tsx
```

jika semuanya diperlukan untuk satu behavior:

```text
feat(flashcard): add reusable front-back flip interaction
```

---

# 8. Jangan Membuat Commit Berdasarkan Jumlah File

Salah:

```text
commit 1: components
commit 2: hooks
commit 3: types
```

jika ketiganya sebenarnya satu feature.

Benar:

```text
feat(journey): add reusable chapter progress card
```

dengan semua file pendukung di dalamnya.

---

# 9. Jangan Membuat Giant Commit

Tidak boleh:

```text
feat(frontend): implement HIRU Academy
```

yang berisi:

- public;
- login;
- dashboard;
- assessment;
- Admin;
- blog;
- styling;
- refactor;
- bugfix;

sekaligus.

Ini akan membuat:

- review sulit;
- rollback sulit;
- bisect sulit;
- bug origin sulit diketahui.

---

# 10. Branch Strategy

Jika bekerja sendiri pada satu integration branch, tetap gunakan feature branches untuk perubahan besar bila memungkinkan.

Naming:

```text
feat/<scope>-<short-name>
fix/<scope>-<short-name>
refactor/<scope>-<short-name>
test/<scope>-<short-name>
docs/<short-name>
```

Contoh:

```text
feat/frontend-foundations
feat/public-landing
feat/auth-flow
feat/free-dashboard
feat/lms-journey
feat/assessment-runner
feat/admin-assessment-builder
fix/tryout-double-submit
refactor/dashboard-entitlement
```

---

# 11. Main / Integration Branch

Repository final dapat menggunakan naming yang sudah ada.

Kontrak:

```text
main/master
  ↑
integration/develop
  ↑
feature/fix branches
```

Jika repository hanya memakai satu development branch:

> jangan membuat branch structure baru hanya untuk mengikuti dokumen ini.

Ikuti workflow repository existing, tetapi tetap gunakan aturan commit dari dokumen ini.

---

# 12. Branch Lifetime

Feature branch harus:

- fokus;
- relatif pendek;
- tidak membawa perubahan unrelated;
- direbase/merge dari target branch bila dibutuhkan;
- dihapus setelah merge.

Jangan mempertahankan branch:

```text
frontend-new-final-v2-revisi
```

berminggu-minggu tanpa sinkronisasi.

---

# 13. Commit Sebelum Coding

Sebelum mulai feature:

```bash
git status
git branch --show-current
git log -1 --oneline
```

Pastikan:

- branch benar;
- working tree dipahami;
- perubahan lama tidak tercampur.

---

# 14. Commit Setelah Coding

Sebelum commit:

```bash
git status
git diff
```

Review:

- file yang berubah;
- debug log;
- secrets;
- generated files;
- accidental formatting;
- unrelated changes.

---

# 15. Staging

Gunakan:

```bash
git add <specific-file>
```

atau:

```bash
git add -p
```

untuk commit yang presisi.

Hindari default:

```bash
git add .
```

tanpa melihat `git status` dan `git diff`.

`git add .` boleh digunakan jika seluruh perubahan memang satu logical commit dan sudah diperiksa.

---

# 16. Commit Verification

Sebelum commit feature:

```text
[ ] source of truth benar
[ ] tidak ada unrelated file
[ ] tidak ada credential
[ ] tidak ada console.log debugging
[ ] lint relevant pass
[ ] typecheck relevant pass
[ ] screen/function smoke pass
[ ] responsive tidak rusak
[ ] entitlement tidak berubah tanpa sengaja
```

Command exact mengikuti repository.

---

# 17. Frontend Commit Organization

Frontend HIRU tidak dipecah berdasarkan 79 screen.

Commit mengikuti:

```text
foundation
shared components
screen family
business behavior
role entitlement
```

bukan:

```text
screen 1
screen 2
screen 3
...
screen 79
```

---

# 18. Recommended Frontend Milestone Sequence

Urutan awal:

```text
M0 Repository / Foundations
M1 Public Shell
M2 Auth
M3 Dashboard Foundation
M4 Free
M5 LMS / Mandiri
M6 Assessment
M7 Sensei
M8 Community / Profile / Certificate
M9 Admin
M10 Blog/CMS
M11 Responsive / QA
M12 Backend Integration
```

Urutan dapat berubah jika dependency implementation memerlukan, tetapi commit tetap mengikuti domain.

---

# 19. M0 — Frontend Foundations

Contoh commit:

```text
chore(frontend): initialize next application tooling
```

```text
feat(frontend): add global design tokens
```

```text
feat(frontend): add shared application shell
```

```text
feat(frontend): add reusable button and card primitives
```

```text
feat(frontend): add icon and typography foundations
```

```text
feat(frontend): add responsive layout primitives
```

Jangan:

```text
feat(frontend): add all components
```

---

# 20. M1 — Public

Contoh:

```text
feat(public): add landing page structure
```

```text
feat(program): add program discovery cards
```

```text
feat(placement): add placement entry screen
```

```text
feat(blog): add public article discovery layout
```

---

# 21. M2 — Authentication

Contoh:

```text
feat(auth): add login interface
```

```text
feat(auth): add registration interface
```

```text
feat(auth): support email and WhatsApp identity field
```

```text
feat(auth): preserve intended redirect after login
```

Jika backend belum hidup:

```text
feat(auth): add mock authentication state
```

Bukan:

```text
feat(auth): add authentication
```

jika sebenarnya hanya mock frontend.

---

# 22. M3 — Dashboard Foundation

Jangan membuat:

```text
FreeDashboard.tsx
LmsDashboard.tsx
SenseiDashboard.tsx
```

sebagai tiga implementation terpisah jika struktur sama.

Contoh commit:

```text
feat(dashboard): add shared membership dashboard shell
```

```text
feat(dashboard): add entitlement-aware feature cards
```

```text
feat(dashboard): add learning progress summary
```

```text
feat(dashboard): add locked feature state
```

---

# 23. M4 — Free

Contoh:

```text
feat(journey): add free level selection
```

```text
feat(journey): expose chapter one for free members
```

```text
feat(learning): add free learning content flow
```

```text
feat(assessment): add limited free practice state
```

```text
feat(community): add free read-only state
```

```text
feat(dashboard): add upgrade path for locked features
```

---

# 24. M5 — LMS / Mandiri

Contoh:

```text
feat(journey): add full lms chapter progression
```

```text
feat(learning): add learning activity completion state
```

```text
feat(assessment): add daily practice flow
```

```text
feat(tryout): add tryout listing and history
```

```text
feat(certificate): add certificate eligibility state
```

```text
feat(community): enable member posting interactions
```

---

# 25. M6 — Assessment Foundation

Assessment menggunakan reusable architecture.

Contoh:

```text
feat(assessment): add shared assessment runner
```

```text
feat(assessment): add question navigation
```

```text
feat(assessment): add configurable timer
```

```text
feat(assessment): add submission confirmation
```

```text
feat(assessment): add result summary
```

```text
feat(assessment): add answer review state
```

---

# 26. Checkpoint

```text
feat(checkpoint): configure chapter checkpoint runner
```

```text
feat(checkpoint): add chapter unlock result state
```

---

# 27. Try Out

```text
feat(tryout): configure timed tryout runner
```

```text
feat(tryout): add score and history screens
```

```text
feat(tryout): add answer review
```

---

# 28. Mini Checkpoint

```text
feat(mini-checkpoint): add sensei checkpoint runner
```

```text
feat(mini-checkpoint): add pass and fail result states
```

```text
feat(mini-checkpoint): add level session navigation
```

---

# 29. Placement

Placement adalah assessment acquisition terpisah.

Contoh:

```text
feat(placement): add twenty-question placement runner
```

```text
feat(placement): add skill category result analysis
```

```text
feat(placement): add level recommendation
```

```text
feat(placement): add program recommendation
```

Jangan mencampur Placement dengan LMS AssessmentRunner jika business rule berbeda signifikan.

Reusable primitive tetap boleh digunakan.

---

# 30. M7 — Sensei

Contoh:

```text
feat(sensei): add class schedule
```

```text
feat(sensei): add class detail
```

```text
feat(sensei): add replay access
```

```text
feat(sensei): add ask-sensei flow
```

```text
feat(sensei): add mini checkpoint access
```

---

# 31. M8 — Community, Profile, Certificate

Contoh:

```text
feat(community): add post and comment interactions
```

```text
feat(profile): add account profile
```

```text
feat(certificate): add certificate list and download state
```

```text
feat(referral): add referral and discount interface
```

---

# 32. M9 — Admin Foundation

Contoh:

```text
feat(admin): add admin application shell
```

```text
feat(admin): add shared data table
```

```text
feat(admin): add filtering and pagination primitives
```

```text
feat(admin): add form builder primitives
```

Jangan membuat table/filter/form logic berbeda di setiap module tanpa alasan.

---

# 33. Admin Program & Content

```text
feat(admin): add program management
```

```text
feat(admin): add chapter management
```

```text
feat(admin): add learning content management
```

```text
feat(admin): add media management
```

---

# 34. Admin Assessment

```text
feat(admin): add assessment configuration
```

```text
feat(admin): add question builder
```

```text
feat(admin): add mini checkpoint builder
```

```text
feat(admin): add assessment result view
```

---

# 35. Admin Users & Access

```text
feat(admin): add user management
```

```text
feat(admin): add membership access controls
```

```text
feat(admin): add invoice verification
```

```text
feat(admin): add referral management
```

```text
feat(admin): add certificate management
```

---

# 36. Admin Sensei

```text
feat(admin): add sensei management
```

```text
feat(admin): add cohort management
```

```text
feat(admin): add schedule and replay management
```

---

# 37. Admin Analytics & Settings

```text
feat(admin): add analytics overview
```

```text
feat(admin): add application settings
```

Hanya implement jika benar-benar masuk final scope.

---

# 38. M10 — Blog / CMS

```text
feat(cms): add article management
```

```text
feat(cms): add category management
```

```text
feat(cms): add draft and publish states
```

```text
feat(blog): add public article detail
```

```text
feat(blog): add seo metadata
```

---

# 39. M11 — Responsive & UX QA

Jika perubahan responsive memperbaiki behavior:

```text
fix(assessment): prevent mobile timer overlap
```

```text
fix(journey): improve small-screen chapter layout
```

Jika menambah responsive behavior pertama kali:

```text
feat(dashboard): add responsive navigation
```

Jangan membuat satu commit:

```text
fix(frontend): responsive
```

untuk seluruh aplikasi.

---

# 40. M12 — Backend Integration

Saat mock diganti Laravel API:

```text
feat(api): connect authentication endpoints
```

```text
feat(api): connect membership entitlement data
```

```text
feat(api): connect learning journey
```

```text
feat(api): connect assessment attempts
```

```text
feat(api): connect invoice data
```

```text
feat(api): connect admin content management
```

---

# 41. Mock → Real API Commit

Jangan mencampur:

```text
UI redesign
+
API integration
+
refactor component
```

dalam satu commit besar.

Ideal:

```text
refactor(journey): normalize journey view model
```

lalu:

```text
feat(api): connect journey endpoint
```

lalu bila perlu:

```text
fix(journey): handle empty API response
```

---

# 42. Backend Commit Organization

Saat Laravel mulai dibangun, gunakan domain yang sama.

Contoh:

```text
feat(auth): add sanctum session authentication
```

```text
feat(entitlement): enforce membership access rules
```

Jika `entitlement` tidak dipakai sebagai scope frontend, konsistensi dapat dipilih saat backend implementation.

Contoh lain:

```text
feat(assessment): add attempt persistence
```

```text
feat(assessment): add autosave endpoint
```

```text
feat(invoice): add payment verification workflow
```

```text
feat(cms): add article publishing
```

---

# 43. Database Migration Commit

Migration harus masuk bersama feature yang memerlukannya jika review masih jelas.

Contoh:

```text
feat(assessment): add assessment attempt persistence
```

dapat berisi:

- migration;
- model;
- service;
- endpoint;
- tests.

Tidak wajib membuat commit:

```text
chore(database): add migration
```

terpisah jika migration tidak berguna tanpa feature tersebut.

---

# 44. Schema-only Change

Jika perubahan memang schema refactor sendiri:

```text
refactor(database): normalize assessment attempt status
```

Tetapi harus ada migration aman dan regression coverage.

---

# 45. Test Commits

Jika test dibuat bersama feature dan kecil:

> boleh berada dalam commit feature yang sama.

Contoh:

```text
feat(auth): add login flow
```

berisi code + tests.

Jika test ditambahkan belakangan:

```text
test(auth): cover invalid login handling
```

---

# 46. Playwright Commits

Nanti setelah MVP:

```text
test(public): cover acquisition journey
```

```text
test(free): cover free chapter entitlement
```

```text
test(tryout): cover timed assessment journey
```

```text
test(mini-checkpoint): cover sensei result flow
```

```text
test(admin): cover mini checkpoint publishing
```

```text
test(payment): cover admin verification activation
```

---

# 47. Security Commits

Contoh:

```text
security(auth): enforce server-side route authorization
```

```text
security(media): validate private upload types
```

```text
security(assessment): remove answer keys from attempt payload
```

```text
security(invoice): enforce invoice ownership
```

Jika project tooling tidak mengizinkan `security` type:

```text
fix(security): enforce invoice ownership
```

---

# 48. Bugfix Commit Rule

Bugfix commit harus:

- hanya memperbaiki root cause;
- tidak membawa refactor unrelated;
- mempunyai regression test bila feasible;
- mengikuti `04-DEBUG-PLAYBOOK.md`.

Contoh:

```text
fix(assessment): prevent autosave response from overwriting newer answer
```

bukan:

```text
fix(assessment): update runner
```

---

# 49. Root Cause dalam Commit Body

Untuk bug penting, gunakan body:

```text
fix(assessment): prevent duplicate tryout submission

Manual submit and expiry auto-submit could finalize the same
attempt concurrently. Guard finalization with an idempotent
submitted state transition.
```

Commit body tidak wajib untuk perubahan sederhana.

---

# 50. Breaking Change

Jika API contract benar-benar berubah:

```text
feat(api)!: replace membership string with entitlement payload
```

atau footer:

```text
BREAKING CHANGE: student membership responses now use entitlement objects.
```

Jangan menandai breaking jika hanya internal refactor.

---

# 51. Refactor Commit Rule

Refactor ideal tidak mengubah behavior.

Contoh:

```text
refactor(dashboard): unify membership card rendering
```

Jika selama refactor juga menambah feature:

pisahkan.

```text
refactor(dashboard): unify membership card rendering
feat(dashboard): add sensei replay card
```

---

# 52. Batch 6 Cleanup Commit

Saat Batch 6 nanti dilakukan:

Phase 1 audit **tidak menghapus code**.

Dokumentasi audit:

```text
docs(refactor): record dead code candidates
```

Setelah approval:

```text
refactor(frontend): remove unused legacy card components
```

```text
refactor(api): remove duplicate client wrapper
```

```text
chore(frontend): remove obsolete feature flag
```

---

# 53. Jangan Campur Cleanup dengan Feature

Salah:

```text
feat(tryout): add review and clean old dashboard files
```

Benar:

```text
feat(tryout): add answer review
```

kemudian:

```text
refactor(dashboard): remove obsolete dashboard card
```

---

# 54. Documentation Commit

Contoh:

```text
docs(prd): clarify mini checkpoint entitlement
```

```text
docs(ui): add assessment responsive rules
```

```text
docs(security): record upload audit findings
```

```text
docs(e2e): approve critical user journeys
```

---

# 55. Figma-driven Commit

Tidak perlu menulis node ID Figma di subject.

Baik:

```text
feat(dashboard): add free membership feature grid
```

Commit body/PR boleh mencantumkan:

```text
Source: Figma Page 08
```

jika membantu traceability.

---

# 56. Requirement Revision Commit

Jika client mengubah requirement:

```text
feat(entitlement): expose tryout as locked preview for free users
```

atau domain nyata:

```text
feat(tryout): show locked preview to free members
```

Jangan:

```text
fix(ui): client revision
```

---

# 57. UI-only Visual Commit

Contoh:

```text
fix(flashcard): restore card flip perspective
```

```text
fix(dashboard): match feature card spacing to design
```

```text
feat(navigation): add active sidebar state
```

---

# 58. Motion Commit

```text
feat(flashcard): add reduced-motion reveal fallback
```

```text
fix(button): restore tactile press feedback
```

Scope `button` dapat diganti `frontend` jika button bukan domain stabil repository.

---

# 59. Generated Files

Generated files boleh masuk commit jika diperlukan:

- lockfile;
- generated types;
- migrations;
- snapshots;
- codegen artifact yang menjadi source repository.

Jangan commit:

- cache;
- local build output;
- temp screenshots;
- traces;
- `.env`;
- auth storage state;
- test result folder;

kecuali repository memang sengaja menyimpan artifact tertentu.

---

# 60. Sensitive Files

Sebelum commit periksa:

```text
.env
.env.local
.env.production
credentials
service account
private key
S3 key
database dump
Playwright storageState
session cookie
access token
```

Jangan pernah commit secret nyata.

---

# 61. Playwright Auth State

Folder:

```text
playwright/.auth/
```

harus di-ignore.

Jangan commit:

```text
free.json
lms.json
sensei.json
admin.json
```

yang berisi cookie/session.

---

# 62. `.gitignore`

Commit `.gitignore` harus eksplisit jika tooling baru ditambah.

Contoh:

```text
chore(frontend): ignore local playwright artifacts
```

---

# 63. Lockfile

Jika dependency berubah:

commit lockfile bersama dependency change.

Contoh:

```text
build(frontend): add playwright test dependency
```

mencakup:

```text
package.json
package-lock.json
```

atau lockfile package manager aktual.

---

# 64. Dependency Update

Jangan campur upgrade dependency besar dengan feature kecuali benar-benar diperlukan.

Ideal:

```text
build(frontend): upgrade next framework version
```

terpisah dari:

```text
feat(dashboard): add achievement card
```

---

# 65. Commit Frequency

Commit ketika satu logical unit:

- sudah bekerja;
- dapat dijelaskan;
- tidak setengah rusak;
- memiliki state yang dapat dikembalikan.

Tidak perlu commit setiap 5 menit.

Tidak perlu menunggu satu hari.

---

# 66. Work-in-Progress Commit

WIP boleh lokal sementara:

```text
wip: ...
```

tetapi **jangan merge WIP commit ke integration/main**.

Sebelum merge:

- squash;
- fixup;
- reword;

menjadi history yang bersih.

---

# 67. Fixup Commit

Saat branch masih direview:

```bash
git commit --fixup <commit>
```

lalu autosquash bila workflow mengizinkan.

Jangan gunakan rewrite history pada branch shared tanpa koordinasi.

---

# 68. Rebase

Rebase boleh untuk merapikan feature branch sebelum merge.

Jangan force-push branch shared tanpa memastikan tidak merusak pekerjaan anggota lain.

---

# 69. Merge Strategy

Untuk feature branch yang history-nya sudah bagus:

- merge commit;
- rebase merge;
- squash merge;

semua bisa valid tergantung repository policy.

HIRU merekomendasikan:

## Small feature / noisy branch

Squash merge.

## Multi-commit milestone yang masing-masing bernilai

Pertahankan commit history jika repository workflow mendukung.

Yang terpenting:

> target branch tidak berisi WIP/noise history.

---

# 70. Squash Decision

Jangan squash:

```text
feat(assessment): add shared runner
feat(assessment): add timer
test(assessment): cover timer expiry
```

menjadi satu giant commit jika ketiganya masing-masing meaningful dan stabil.

Boleh squash:

```text
wip
fix typo
oops
fix test
final final
```

menjadi satu commit bersih.

---

# 71. Commit Message Review

Sebelum push:

```bash
git log --oneline <base>..HEAD
```

Tanyakan:

- apakah reviewer mengerti urutannya?
- apakah ada `update`, `fix stuff`, `final`?
- apakah commit dapat direvert sendiri?
- apakah feature/refactor/test bercampur?

---

# 72. Push Rule

Sebelum push:

```text
[ ] working tree dipahami
[ ] commit messages bersih
[ ] tests relevant pass
[ ] tidak ada secret
[ ] branch target benar
```

---

# 73. Pull / Sync Rule

Sebelum melanjutkan branch lama:

```bash
git fetch --prune
```

Lalu bandingkan target branch.

Jangan pull/merge buta jika working tree belum jelas.

---

# 74. Conflict Resolution

Saat conflict:

1. pahami kedua perubahan;
2. lihat source of truth;
3. jangan pilih “ours/theirs” secara buta;
4. jalankan test;
5. review diff hasil merge.

Commit conflict resolution harus tetap mencerminkan behavior final yang benar.

---

# 75. Rollback

Karena commit kecil dan logis, rollback harus memungkinkan:

```bash
git revert <commit>
```

tanpa mencabut lima feature unrelated.

Ini salah satu alasan utama commit organization ini dikunci.

---

# 76. Hotfix

Contoh:

```text
fix(invoice): prevent duplicate membership activation
```

Hotfix jangan memasukkan:

- formatting global;
- dependency upgrade unrelated;
- refactor besar.

Setelah incident:

- regression test;
- follow-up refactor jika perlu.

---

# 77. Git Bisect Friendly

History ideal memungkinkan:

```bash
git bisect
```

Jika setiap commit compile/test minimal dan scope jelas, pencarian first bad commit jauh lebih mudah.

---

# 78. Commit yang Harus Dilarang

Jangan merge subject:

```text
update
update frontend
fix
fix bug
fix stuff
changes
final
final fix
final final
revisi
revisi terbaru
backup
test
try
work
progress
wip
```

---

# 79. Bahasa Commit

Gunakan **bahasa Inggris** untuk commit subject.

Alasan:

- konsisten dengan ecosystem code;
- Conventional Commit tooling;
- nama domain/code juga menggunakan English;
- mudah dibaca contributor lain.

Dokumentasi internal boleh Bahasa Indonesia.

---

# 80. Scope Jangan Berdasarkan Orang

Jangan:

```text
feat(fahd): ...
feat(team-a): ...
```

Gunakan domain produk.

---

# 81. Commit Jangan Berdasarkan Hari

Jangan:

```text
chore: work august 12
```

Gunakan outcome.

---

# 82. Commit Jangan Berdasarkan Figma Page Saja

Jangan:

```text
feat(page08): implement page 08
```

Lebih baik:

```text
feat(free): add free membership journey
```

Figma page adalah sumber, bukan domain code.

---

# 83. Commit Jangan Berdasarkan Nomor Screen

Jangan:

```text
feat(screen42): add screen 42
```

Gunakan:

```text
feat(tryout): add result review
```

---

# 84. Shared Component Change

Jika shared component berubah, commit subject berdasarkan behavior yang memotivasi perubahan.

Contoh:

```text
refactor(dashboard): share feature card across memberships
```

bukan:

```text
refactor(component): update card
```

---

# 85. Cross-role Change

Jika satu feature mempengaruhi beberapa role:

```text
feat(dashboard): derive feature state from membership entitlement
```

Commit body dapat mencatat:

```text
Free: locked
LMS: active
Sensei: active + Sensei features
```

---

# 86. Entitlement Change

Perubahan entitlement adalah business behavior.

Jangan menyembunyikannya dalam commit visual.

Baik:

```text
feat(tryout): restrict access to eligible memberships
```

Buruk:

```text
fix(card): update lock icon
```

jika sebenarnya authorization behavior berubah.

---

# 87. Route Change

```text
feat(journey): add level journey routes
```

```text
fix(auth): prevent protected route redirect loop
```

Jika route rename breaking internal links:

```text
refactor(navigation): consolidate learning route structure
```

dan perbarui seluruh references dalam commit yang sama jika atomic.

---

# 88. State Management Change

```text
refactor(frontend): centralize membership session state
```

Jangan menambahkan library state management sekaligus mengubah seluruh UI tanpa kebutuhan.

---

# 89. API Client

```text
feat(api): add typed client foundation
```

```text
refactor(api): centralize error normalization
```

Jangan membuat:

```text
api.ts
api2.ts
api-new.ts
```

dan commit:

```text
update api
```

---

# 90. Error State

```text
feat(dashboard): add explicit loading and error states
```

```text
fix(invoice): distinguish forbidden and missing invoice
```

---

# 91. Accessibility Commit

```text
fix(auth): restore keyboard focus in login validation
```

```text
feat(flashcard): add keyboard reveal interaction
```

```text
fix(modal): trap focus during confirmation
```

Accessibility bukan “minor cleanup” jika mempengaruhi usability.

---

# 92. Performance Commit

```text
perf(public): reduce landing image payload
```

```text
perf(journey): avoid unnecessary progress rerenders
```

Sertakan measurement di PR/body jika perubahan performa signifikan.

---

# 93. SEO Commit

```text
feat(blog): add canonical article metadata
```

```text
fix(blog): exclude draft articles from public sitemap
```

---

# 94. Analytics Commit

Jika analytics diimplementasi:

```text
feat(analytics): track placement completion
```

Pastikan tidak membocorkan sensitive data.

---

# 95. Environment Configuration

```text
chore(frontend): add environment variable validation
```

Commit hanya example/schema:

```text
.env.example
```

bukan secret.

---

# 96. Milestone Tags

Untuk milestone besar, repository dapat memakai tag:

```text
frontend-mvp-v0.1.0
integrated-mvp-v0.2.0
release-v1.0.0
```

Exact versioning strategy dikunci saat release process tersedia.

Jangan membuat tag random setiap commit.

---

# 97. Pull Request Title

PR title mengikuti commit style:

```text
feat(assessment): add shared assessment runner
```

Jika PR memiliki banyak commit satu milestone:

```text
feat(lms): implement learning journey foundation
```

---

# 98. Pull Request Description

Minimal:

```md
## Scope
...

## Source of truth
- Figma Page:
- PRD section:

## What changed
- ...

## Membership impact
- Visitor:
- Free:
- LMS:
- Sensei:
- Admin:

## Verification
- lint:
- typecheck:
- build:
- manual smoke:
- automated tests:

## Screenshots
if UI relevant

## Open / not included
...
```

---

# 99. PR Tidak Boleh Menyembunyikan Scope

Jika PR menambah:

- feature;
- refactor;
- dependency;
- migration;

jelaskan semuanya.

Jangan gunakan title:

```text
frontend updates
```

---

# 100. Definition of Commit-ready

Perubahan siap commit jika:

```text
[ ] satu perubahan logis
[ ] behavior jelas
[ ] source of truth jelas
[ ] code tidak sengaja rusak
[ ] debug artifact dibersihkan
[ ] secret tidak ada
[ ] diff sudah direview
[ ] commit message spesifik
```

---

# 101. Definition of Push-ready

```text
[ ] commit history bersih
[ ] lint relevant pass
[ ] typecheck relevant pass
[ ] build/smoke relevant pass
[ ] no unresolved accidental change
[ ] branch target benar
```

---

# 102. Definition of Merge-ready

```text
[ ] requirement sesuai
[ ] UI sesuai source
[ ] entitlement benar
[ ] responsive relevant pass
[ ] relevant automated tests pass
[ ] no P0/P1 known regression
[ ] security guardrail tidak dilemahkan
[ ] review selesai
[ ] commit/PR organization bersih
```

---

# 103. Frontend MVP Commit Example

Contoh history yang sehat:

```text
feat(frontend): add global design tokens
feat(frontend): add shared application shell
feat(public): add landing page structure
feat(auth): add login and registration interfaces
feat(dashboard): add shared membership dashboard shell
feat(dashboard): add entitlement-aware feature cards
feat(journey): add level and chapter navigation
feat(learning): add reusable learning activity layout
feat(flashcard): add front-back flip interaction
feat(assessment): add shared assessment runner
feat(tryout): configure timed tryout flow
feat(sensei): add schedule and replay access
feat(admin): add admin application shell
feat(admin): add mini checkpoint builder
feat(blog): add public article layout
fix(frontend): resolve mobile navigation overflow
```

Ini jauh lebih baik daripada:

```text
update frontend
update frontend 2
fix
revisi
final
final 2
```

---

# 104. Mini Checkpoint End-to-End Commit Example

Contoh urutan:

```text
feat(assessment): add shared assessment runner
feat(mini-checkpoint): configure timed checkpoint flow
feat(mini-checkpoint): add pass and fail results
feat(admin): add mini checkpoint builder
feat(admin): add assessment result view
test(mini-checkpoint): cover sensei checkpoint journey
```

Backend nanti:

```text
feat(assessment): persist mini checkpoint attempts
feat(assessment): add timed submission rules
security(assessment): enforce sensei entitlement
test(assessment): cover mini checkpoint authorization
```

---

# 105. Invoice Activation Commit Example

Frontend:

```text
feat(invoice): add invoice status view
feat(invoice): add WhatsApp payment handoff
feat(admin): add invoice verification action
```

Backend:

```text
feat(invoice): persist payment verification
feat(auth): activate membership after verified invoice
fix(invoice): prevent duplicate membership activation
test(invoice): cover idempotent verification
```

---

# 106. Placement Commit Example

```text
feat(placement): add lead capture
feat(placement): add twenty-question runner
feat(placement): add skill analysis result
feat(placement): add recommended level
feat(placement): add recommended program
feat(placement): preserve referral into registration
test(placement): cover acquisition journey
```

---

# 107. Free → LMS → Sensei Shared UI Example

Benar:

```text
feat(dashboard): add shared membership dashboard
feat(dashboard): derive cards from entitlement
feat(sensei): add sensei-only dashboard features
```

Salah:

```text
feat(free): create FreeDashboard
feat(lms): duplicate dashboard for LMS
feat(sensei): duplicate dashboard again
```

---

# 108. Assessment Shared Architecture Example

Benar:

```text
feat(assessment): add configurable assessment runner
feat(checkpoint): configure chapter checkpoint
feat(tryout): configure tryout
feat(mini-checkpoint): configure sensei checkpoint
```

Salah:

```text
feat(checkpoint): build entire runner
feat(tryout): build another runner
feat(mini-checkpoint): build third runner
```

jika 80% logic sama.

---

# 109. Actual Implementation May Differ

Commit examples dalam dokumen ini adalah **organization guide**, bukan daftar wajib 1:1.

Jangan membuat commit kosong hanya supaya cocok dengan daftar.

Jika implementation nyata menunjukkan dua perubahan sebaiknya digabung atau dipisah, gunakan prinsip:

> satu logical change, mudah direview, mudah direvert.

---

# 110. Git Safety Rule

Sebelum command berisiko:

```text
reset --hard
clean -fd
force push
rebase shared branch
delete branch
restore database-related files
```

pastikan:

- target benar;
- working tree diketahui;
- backup/remote state dipahami;
- tidak ada pekerjaan orang lain yang hilang.

---

# 111. Force Push

Allowed:

- personal feature branch;
- history cleanup;
- tim mengetahui.

Not allowed:

- integration branch;
- main branch;
- branch shared aktif;

kecuali workflow repository memang mengizinkan dan semua contributor terkoordinasi.

---

# 112. Revert vs Reset

Untuk history yang sudah dipush/shared:

> default gunakan `git revert`.

`git reset` lebih cocok untuk local/unshared history.

---

# 113. Release Commit

Hindari manual commit seperti:

```text
release final
```

Gunakan:

```text
chore(release): prepare v1.0.0
```

hanya jika release process memang membutuhkan commit tersebut.

---

# 114. Commit Ownership

Siapa pun yang membuat commit bertanggung jawab memastikan:

- message benar;
- diff benar;
- test relevant;
- tidak ada secret;
- tidak membawa perubahan orang lain tanpa sengaja.

---

# 115. Review Ownership

Reviewer tidak hanya melihat UI.

Review:

- business requirement;
- reusable architecture;
- entitlement;
- security;
- test;
- Git scope.

---

# 116. Final Recommended Working Loop

```text
PILIH SATU TASK
      ↓
cek source of truth
      ↓
buat/checkout branch
      ↓
implement perubahan
      ↓
smoke + lint/typecheck
      ↓
git diff
      ↓
stage logical files
      ↓
commit dengan scope jelas
      ↓
lanjut task berikutnya
```

Jika bug:

```text
04-DEBUG-PLAYBOOK
      ↓
root cause
      ↓
minimal fix
      ↓
regression
      ↓
fix(scope): precise description
```

---

# 117. Frontend Implementation Commit Map

Recommended macro map:

```text
FOUNDATION
├─ tokens
├─ primitives
├─ application shell
└─ routing foundation

PUBLIC
├─ landing
├─ program
├─ placement
├─ auth
└─ invoice

STUDENT CORE
├─ dashboard
├─ journey
├─ learning
└─ progress

ASSESSMENT
├─ runner
├─ checkpoint
├─ tryout
└─ mini checkpoint

MEMBERSHIP EXTENSIONS
├─ Free states
├─ LMS states
└─ Sensei states

OTHER STUDENT
├─ community
├─ certificate
├─ referral
└─ profile

ADMIN
├─ shell
├─ user/access
├─ content
├─ assessment
├─ invoice
├─ sensei/cohort
├─ moderation
├─ analytics
└─ settings

CMS
├─ admin articles
└─ public blog

QUALITY
├─ responsive
├─ accessibility
├─ E2E
├─ security
└─ cleanup
```

---

# 118. Final Verdict Batch 7

HIRU Academy menggunakan Git history sebagai bagian dari kualitas engineering, bukan hanya tempat menyimpan code.

Aturan final:

```text
FEATURE ≠ GIANT COMMIT
SCREEN ≠ COMMIT UNIT
FILE ≠ COMMIT UNIT

BUSINESS CHANGE = COMMIT UNIT
```

Commit mengikuti:

```text
<type>(<scope>): <business outcome>
```

Dengan pendekatan ini:

- frontend dapat dibangun bertahap;
- shared component architecture tetap terlihat;
- bug dapat di-bisect;
- rollback lebih aman;
- security change dapat dilacak;
- Batch 6 cleanup dapat dilakukan tanpa mencampur feature;
- Batch 5 E2E dapat ditambahkan tanpa mengacaukan history;
- workflow akhir dapat dijadikan reusable skill pada Batch 8.

**Batch 7 mulai berlaku dari commit frontend pertama.**

---

# Appendix A — Quick Commit Examples

```text
chore(frontend): initialize project tooling
feat(frontend): add global design tokens
feat(frontend): add shared application shell

feat(public): add landing page
feat(program): add program discovery
feat(auth): add registration and login interfaces
feat(placement): add placement assessment flow
feat(invoice): add WhatsApp payment handoff

feat(dashboard): add shared membership dashboard
feat(journey): add level and chapter navigation
feat(learning): add reusable learning activity layout
feat(flashcard): add front-back flip interaction

feat(assessment): add shared assessment runner
feat(checkpoint): add chapter checkpoint flow
feat(tryout): add timed tryout flow
feat(mini-checkpoint): add sensei checkpoint flow

feat(sensei): add class schedule
feat(sensei): add replay access

feat(community): add member discussions
feat(certificate): add certificate access
feat(referral): add referral and discount flow

feat(admin): add admin application shell
feat(admin): add user management
feat(admin): add invoice verification
feat(admin): add learning content management
feat(admin): add assessment builder
feat(admin): add mini checkpoint builder
feat(admin): add assessment results

feat(cms): add article management
feat(blog): add public article pages

fix(assessment): prevent duplicate submission
fix(auth): preserve protected route redirect
fix(frontend): resolve mobile navigation overflow

test(placement): cover acquisition journey
test(tryout): cover timed assessment flow
test(mini-checkpoint): cover sensei checkpoint flow

refactor(dashboard): unify membership feature cards
refactor(assessment): share runner configuration
```

---

# Appendix B — Forbidden Commit Examples

```text
update
update frontend
update dashboard
fix
fix bug
fix stuff
changes
revisi
revisi 2
latest
final
final fix
final final
test
try
backup
work
progress
wip
```

WIP boleh sementara di local feature branch, tetapi tidak boleh menjadi final history.

---

# Appendix C — Commit Checklist

```text
BEFORE COMMIT
[ ] git status reviewed
[ ] git diff reviewed
[ ] source of truth checked
[ ] one logical change
[ ] no unrelated file
[ ] no secret
[ ] no debug artifacts
[ ] lint relevant pass
[ ] typecheck relevant pass
[ ] smoke relevant pass

COMMIT
[ ] valid type
[ ] useful scope
[ ] precise outcome
[ ] no vague wording

BEFORE PUSH
[ ] git log reviewed
[ ] branch correct
[ ] tests relevant pass
[ ] no accidental WIP commit

BEFORE MERGE
[ ] requirement correct
[ ] entitlement correct
[ ] responsive relevant pass
[ ] security not weakened
[ ] review complete
```

---

# Appendix D — PR Template

```md
## Scope

Describe the single milestone or feature covered by this PR.

## Source of Truth

- Client revision:
- Figma Page:
- PRD:
- UI/UX Brief:

## Changes

- ...
- ...

## Membership Impact

- Visitor:
- Free:
- LMS:
- LMS + Sensei:
- Admin:

## Verification

- [ ] lint
- [ ] typecheck
- [ ] production build / relevant build
- [ ] manual smoke
- [ ] responsive smoke
- [ ] relevant automated tests

## Screenshots

Add before/after or implementation screenshots when UI changes.

## Security / Data Impact

Describe auth, entitlement, PII, media, or persistence impact if applicable.

## Not Included

State related work intentionally left for another PR.
```

---

# Appendix E — Recommended First Frontend Commits

Saat implementation benar-benar dimulai, urutan awal yang direkomendasikan:

```text
1. chore(frontend): initialize project tooling
2. feat(frontend): add global design tokens
3. feat(frontend): add shared application shell
4. feat(frontend): add reusable ui primitives
5. feat(public): add landing page structure
6. feat(auth): add login and registration interfaces
7. feat(dashboard): add shared membership dashboard
8. feat(dashboard): add entitlement-aware feature cards
9. feat(journey): add level and chapter navigation
10. feat(learning): add reusable learning activity layout
```

Setelah itu commit mengikuti feature implementation nyata.

---

**END OF `07-GIT-COMMIT-PLAN.md`**
