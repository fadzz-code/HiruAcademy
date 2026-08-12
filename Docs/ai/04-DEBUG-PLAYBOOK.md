# DEBUG PLAYBOOK — HIRU ACADEMY

**File:** `docs/ai/04-DEBUG-PLAYBOOK.md`  
**Batch:** 4 / Debug & Regression Playbook  
**Tanggal baseline:** 12 Agustus 2026  
**Produk:** HIRU Academy — Website penjualan kelas Bahasa Jepang + LMS + Blog/CMS SEO + Admin Console  
**Target stack:** Next.js App Router + React + TypeScript + Tailwind CSS + Laravel + Laravel Sanctum + PostgreSQL + S3-compatible object storage  
**E2E target:** Playwright  
**Status:** **PRE-IMPLEMENTATION DEBUG CONTRACT + FRONTEND-FIRST QA BASELINE**  
**Bergantung pada:** `01-PRD-HIRU-ACADEMY.md`, `02-UI-UX-DESIGN-BRIEF.md`, `03-SECURITY-AUDIT.md`

---

# 0. Ringkasan Eksekutif

Dokumen ini mendefinisikan cara tim HIRU Academy mencari, membuktikan, memperbaiki, dan mencegah bug selama implementasi frontend-first hingga production.

Tujuannya bukan membuat daftar error generik. Playbook ini mengunci cara debugging yang sesuai dengan karakter produk HIRU:

- satu produk dengan tiga membership: Free, LMS, LMS + Sensei;
- Admin Console sebagai operasi utama;
- frontend dibuat lebih dahulu dengan mock data;
- backend final menggunakan Laravel + Sanctum + PostgreSQL;
- object/media menggunakan S3-compatible storage;
- assessment mempunyai timer, autosave, attempt, score, dan entitlement;
- public acquisition mempunyai Placement Test, Blog/CMS SEO, program, testimonial, invoice, dan WhatsApp;
- kualitas visual, motion, hover, tactile feel, responsive behavior, serta Flashcard flip dari HTML referensi tidak boleh hilang saat migrasi ke React/Next.js.

Playbook ini juga membedakan dua fase:

## Fase A — Frontend-first

Yang dapat diuji penuh:

- routing;
- screen composition;
- responsive behavior;
- entitlement state berbasis mock;
- user interaction;
- loading / error / empty / success state;
- assessment runner berbasis mock;
- navigation;
- visual regression terhadap Figma + HTML reference;
- accessibility dasar;
- E2E browser flow dengan mock/fake backend.

Yang **belum boleh dianggap tervalidasi production**:

- auth Laravel nyata;
- authorization server-side;
- database consistency;
- payment verification;
- score persistence;
- signed media;
- backend rate limit;
- CORS/Sanctum config;
- concurrency production.

## Fase B — Integrated / Production

Semua jalur kritis harus diuji lagi terhadap API Laravel, database PostgreSQL, storage, dan environment production/staging.

**Prinsip utama:**

> Jangan memperbaiki gejala sebelum membuktikan lapisan tempat bug berasal.

---

# 1. Kontrak Source of Truth Saat Debug

Jika sebuah bug terlihat seperti “desain salah”, “fitur salah”, atau “akses salah”, urutan validasinya adalah:

1. **Revisi client terbaru**;
2. **Figma Page 08–11** untuk flow, fungsi, state, entitlement, copy, dan screen behavior;
3. `01-PRD-HIRU-ACADEMY.md`;
4. `02-UI-UX-DESIGN-BRIEF.md`;
5. `03-SECURITY-AUDIT.md` untuk batas keamanan;
6. `RefrensiHTML.zip` untuk implementation experience;
7. `DESIGN.md` untuk token dan visual rationale;
8. Figma Page 1 sebagai referensi visual/component family;
9. PDF lama hanya untuk cross-check requirement yang mungkin tertinggal.

## 1.1 Aturan keputusan

Jika implementasi berbeda dari HTML reference tetapi sesuai Figma Page 08–11, itu **belum tentu bug**.

Jika implementasi sama dengan HTML reference tetapi flow/copy/entitlement bertentangan dengan Figma Page 08–11 atau revisi client, itu **bug**.

Jika implementasi memperbaiki security tetapi sedikit mengubah pola prototype, itu boleh selama:

- fungsi tetap benar;
- UX tetap setara;
- perubahan visual seminimal mungkin;
- tidak menghapus affordance penting.

---

# 2. Definisi Bug HIRU

Sebuah kondisi dikategorikan bug bila minimal satu benar:

1. flow tidak sesuai source of truth;
2. role/membership mendapatkan akses yang salah;
3. CTA menuju route salah, `#`, dead-end, atau membuka screen yang tidak sesuai;
4. state user hilang tanpa alasan bisnis;
5. score/progress/timer/attempt salah;
6. data tersimpan tetapi UI menyatakan gagal, atau sebaliknya;
7. locked UI bisa ditembus melalui deep link/API;
8. UI tidak usable pada viewport target;
9. loading/error/empty state menyebabkan user tidak bisa melanjutkan;
10. migrasi HTML → React menghilangkan interaction penting;
11. SEO public route menghasilkan metadata/canonical/slug yang salah;
12. Admin action mengubah data yang tidak dimaksud;
13. error sensitif/secrets/PII terekspos;
14. fix pada satu membership merusak membership lain;
15. behavior tidak deterministic dan tidak dapat dijelaskan oleh business rule.

---

# 3. Severity dan Prioritas

## P0 — Critical / Stop Ship

Contoh:

- login/auth bypass;
- user Free dapat membuka seluruh paid content melalui API;
- Admin data terekspos ke user biasa;
- payment/invoice salah mengaktifkan entitlement;
- score/attempt corrupt massal;
- data destructive / kehilangan data;
- secret production terekspos;
- user dapat mengubah resource user lain;
- assessment answer key terkirim sebelum submit.

**Respons:** hentikan release/hot path yang terkait sampai penyebab diketahui dan fix tervalidasi.

## P1 — High

Contoh:

- core journey tidak bisa dilanjutkan;
- checkout/invoice/WhatsApp flow putus;
- Placement tidak bisa submit;
- Try Out/Mini Checkpoint gagal submit atau timer salah;
- login valid selalu gagal;
- Admin tidak bisa menjalankan fungsi operasional utama;
- media pembelajaran mayoritas gagal dimuat;
- route critical menghasilkan 500.

## P2 — Medium

Contoh:

- satu state filter tidak sinkron;
- progress visual salah tetapi data benar;
- mobile layout mengganggu namun masih usable;
- locked preview salah label;
- satu artikel metadata tidak sesuai;
- animation utama rusak tetapi fitur masih dapat dipakai.

## P3 — Low

Contoh:

- spacing kecil;
- icon alignment;
- hover minor;
- copy typo non-kritis;
- perbedaan shadow tanpa dampak interaction.

## 3.1 Severity bukan effort

Bug kecil yang mudah diperbaiki tetap P3.  
Bug P0 yang sulit tidak turun severity hanya karena perbaikannya mahal.

---

# 4. Siklus Debug Wajib

Semua bug non-trivial mengikuti urutan:

```text
REPRODUCE
   ↓
CLASSIFY
   ↓
ISOLATE LAYER
   ↓
COLLECT EVIDENCE
   ↓
IDENTIFY ROOT CAUSE
   ↓
MAKE SMALLEST CORRECT FIX
   ↓
VERIFY ORIGINAL REPRO
   ↓
RUN NEIGHBOR REGRESSION
   ↓
ADD/UPDATE AUTOMATED TEST
   ↓
CLOSE WITH EVIDENCE
```

## 4.1 Larangan

Jangan:

- mengubah banyak file tanpa hipotesis;
- menghapus validation agar “jalan”;
- menonaktifkan auth/CSRF/CORS untuk menghilangkan error;
- membuat hardcode khusus user/test account sebagai fix;
- menyembunyikan error dengan `try/catch` kosong;
- mengganti requirement agar code terlihat benar;
- menghapus animation/interaction hanya karena implementasinya sulit;
- mengubah data production manual sebelum root cause jelas;
- melakukan reset database sebagai langkah debugging default.

---

# 5. Template Reproduksi Minimal

Setiap bug harus dapat ditulis minimal seperti ini:

```md
## Bug
[Judul singkat]

### Environment
- Frontend commit:
- Backend commit:
- Browser/device:
- Membership:
- Account/test fixture:
- API base:
- Database:
- Build mode: dev / production build

### Preconditions
1.
2.

### Steps
1.
2.
3.

### Expected
...

### Actual
...

### Evidence
- screenshot/video:
- console error:
- network request:
- response status/body:
- Laravel log correlation:
- DB row/state:
- Playwright trace:

### Frequency
always / intermittent / first-load only / after refresh / mobile only

### First known good
commit/build:

### First known bad
commit/build:
```

Bug yang tidak memiliki langkah reproduksi masih boleh ditriage, tetapi belum boleh dianggap root cause ditemukan.

---

# 6. Evidence Hierarchy

Saat data saling bertentangan, urutan evidence:

1. server-side persisted state / authoritative backend rule;
2. API request + response;
3. Laravel application log dan exception;
4. browser network panel;
5. browser console;
6. React state/props;
7. rendered DOM;
8. screenshot/video;
9. user description.

Screenshot penting untuk visual bug, tetapi tidak cukup untuk membuktikan masalah data/auth.

---

# 7. Environment Matrix

Minimal pisahkan:

| Environment | Tujuan | Data |
|---|---|---|
| `local-mock` | frontend-first cepat | fixture/mock |
| `local-integrated` | Next + Laravel lokal | DB test/dev |
| `test` | automated backend tests | isolated test DB |
| `e2e` | Playwright | deterministic fixtures |
| `staging` | production-like | non-production |
| `production` | live | real |

## 7.1 Aturan

- jangan arahkan automated tests ke production DB;
- `.env.testing` / test config harus eksplisit;
- screenshot/trace test jangan berisi credential production;
- fixture harus deterministic;
- debug tidak boleh bergantung pada data personal user tertentu jika bisa direproduksi dengan fixture.

---

# 8. Baseline Sebelum Mencari Bug

Sebelum menyimpulkan aplikasi rusak:

## Frontend

```bash
node --version
npm --version
npm install
npm run lint
npm run typecheck
npm run build
```

Gunakan script aktual dari `package.json`; jangan mengarang script jika belum ada.

## Backend

```bash
php --version
composer --version
composer install
php artisan about
php artisan config:clear
php artisan route:list
php artisan test
```

## Git

```bash
git status
git rev-parse HEAD
git log -1 --oneline
```

Catat commit frontend/backend yang digunakan.

## 8.1 Jangan gunakan “works on my machine” sebagai bukti final

Jika bug hanya terjadi pada satu machine, bandingkan:

- Node/PHP version;
- lockfile;
- env;
- timezone;
- browser;
- OS;
- build mode;
- DB schema/migration;
- cache/config;
- installed extension.

---

# 9. Layer Isolation

Saat bug terjadi, tentukan lapisan pertama yang salah.

```text
USER ACTION
   ↓
ROUTE / UI
   ↓
COMPONENT STATE
   ↓
CLIENT / SERVER FETCH
   ↓
HTTP / COOKIE / CSRF / CORS
   ↓
LARAVEL ROUTE / MIDDLEWARE
   ↓
VALIDATION / AUTHORIZATION
   ↓
SERVICE / BUSINESS RULE
   ↓
ELOQUENT / DATABASE
   ↓
STORAGE / EXTERNAL LINK
```

## 9.1 Teknik binary isolation

Pertanyaan berurutan:

1. Apakah click handler benar-benar terpanggil?
2. Apakah route berubah?
3. Apakah request terkirim?
4. Apakah request membawa cookie/header yang benar?
5. Apakah Laravel menerima request?
6. Middleware mana yang menolak?
7. Apakah validation lewat?
8. Apakah authorization lewat?
9. Apakah service dieksekusi?
10. Apakah DB berubah?
11. Apakah response benar?
12. Apakah frontend memetakan response dengan benar?

Cari titik pertama yang menyimpang dari expected.

---

# 10. Next.js App Router Debugging

## 10.1 Gunakan debugger, jangan hanya `console.log`

Gunakan:

- Browser DevTools untuk client-side;
- React DevTools untuk component/state;
- debugger VS Code / Node attach untuk server-side Next.js;
- source maps;
- Network panel;
- Next development overlay;
- route-level error boundary.

## 10.2 Bedakan Server vs Client Component

Bug umum:

- browser API dipanggil di Server Component;
- secret/env server dipakai di Client Component;
- state interaktif dibuat di server-only tree;
- data yang harus fresh malah tersangkut pada caching strategy;
- component diberi `'use client'` terlalu tinggi sehingga boundary membesar.

Checklist:

- file ini berjalan di server, client, atau keduanya?
- log ini muncul di terminal atau browser?
- fetch ini dieksekusi kapan?
- data ini boleh dikirim ke browser?
- apakah hydration membutuhkan output awal yang deterministic?

## 10.3 Error boundary

Gunakan error boundary granular pada area yang mempunyai failure domain jelas:

- dashboard;
- learning content;
- assessment;
- admin;
- public CMS.

Tujuan:

- satu kegagalan tidak menjatuhkan seluruh app shell;
- user mendapat recovery action;
- error bisa dicatat.

Expected validation error bukan exception UI global.  
Unexpected runtime failure harus masuk error boundary/logging.

## 10.4 `not-found`

Gunakan 404/not-found untuk resource yang memang tidak ada atau tidak public.

Jangan mengubah:

- unauthorized → 404 secara sembarang tanpa policy;
- backend 500 → fake 404;
- network failure → “materi tidak ditemukan”.

---

# 11. Hydration Debugging

Gejala:

- “hydration mismatch”;
- DOM berubah setelah load;
- text server/client berbeda;
- component berkedip;
- random ID/tanggal berbeda.

Periksa:

- `Date.now()`;
- `Math.random()`;
- timezone/locale;
- conditional `window`;
- data localStorage;
- responsive rendering berdasarkan `window.innerWidth`;
- extension browser;
- invalid HTML nesting;
- output Server Component yang bergantung pada client-only state.

## 11.1 HIRU-specific

Timer assessment tidak boleh menghasilkan markup server dan client yang berbeda tanpa strategy yang jelas.

Gunakan absolute expiry authoritative, lalu client menghitung countdown setelah hydrate.

Jangan server-render angka countdown berdasarkan jam yang akan langsung stale tanpa handling.

---

# 12. React State dan Strict Mode

React development checks dapat membuat:

- render dipanggil ekstra;
- Effect dijalankan ulang;
- ref callback dijalankan ulang.

Jangan menyebut ini “React bug” sebelum mengecek side effect.

## 12.1 Bug yang harus dicari

- request POST dijalankan dari Effect tanpa guard/idempotency;
- timer dibuat dua kali karena cleanup tidak benar;
- event listener tidak dilepas;
- autosave duplicate;
- state derived disimpan ganda;
- effect dependency salah;
- state mutation langsung;
- stale closure;
- key list tidak stabil.

## 12.2 Rule HIRU

Action destructive/business write harus dipicu oleh user/business event atau mutation layer yang idempotent, bukan sekadar “component mounted”.

---

# 13. Routing dan Navigation

Semua core CTA harus menggunakan route nyata.

Bug checklist:

- href `#`;
- route typo;
- pathname benar tetapi query hilang;
- `ref` referral hilang saat register;
- selected level hilang saat pindah screen;
- redirect loop login;
- protected route flicker;
- browser back mengembalikan state ilegal;
- deep link tidak memvalidasi entitlement.

## 13.1 Critical route families

Minimal uji:

- public landing → program;
- public → Placement;
- placement result → register/program;
- register/login;
- invoice → WhatsApp;
- dashboard;
- level selection;
- journey;
- content;
- latihan;
- checkpoint;
- try out;
- result/review;
- Sensei schedule/replay/question;
- community;
- certificate;
- referral/discount;
- blog list/detail;
- admin modules.

---

# 14. Visual Regression: Figma + HTML Reference

Visual debugging harus menjawab dua pertanyaan terpisah:

1. **Apakah feature/state sesuai Figma final?**
2. **Apakah implementation feel mempertahankan HTML reference?**

## 14.1 Regression visual yang tidak boleh dianggap “sekadar kosmetik”

- Flashcard flip hilang;
- hover elevation hilang;
- selected state tidak terlihat;
- active navigation ambigu;
- CTA hierarchy terbalik;
- timer tidak dominan pada assessment;
- Japanese text kalah dari decoration;
- locked state terlihat sama dengan active;
- progress sulit dibaca;
- mobile CTA terpotong;
- card overflow;
- tactile press feedback hilang.

## 14.2 Metode compare

Untuk screen penting:

- viewport sama;
- state data sama;
- screenshot implementation;
- bandingkan Figma final;
- bandingkan interaction HTML reference;
- catat intentional difference.

Jangan pixel-match copy lama dari HTML jika flow/copy final sudah berubah.

---

# 15. Responsive Debugging

Viewport minimum matrix yang disarankan:

```text
360 x 800   small mobile
390 x 844   common mobile
768 x 1024  tablet portrait
1024 x 768  tablet/compact desktop
1366 x 768  laptop
1440 x 900  desktop
```

Tambahkan viewport lain sesuai analytics setelah production.

## 15.1 Bug khusus LMS

- sidebar menutupi content;
- progress cards terlalu sempit;
- Japanese sentence overflow;
- ruby/furigana bertabrakan;
- answer option terpotong;
- navigator soal tidak usable;
- sticky timer menutup CTA;
- modal submit keluar viewport;
- admin table tidak punya horizontal strategy.

---

# 16. Accessibility Debugging

Minimal cek:

- keyboard navigation;
- visible focus;
- button vs link semantics;
- form label;
- error association;
- modal focus trap;
- escape/close behavior;
- contrast;
- reduced motion;
- screen-reader-friendly progress/status;
- `<ruby><rt>` untuk furigana bila semantik sesuai;
- icon penting memiliki accessible name.

## 16.1 Motion

Jika `prefers-reduced-motion` aktif:

- jangan mematikan makna state;
- boleh mengurangi transform/animation;
- Flashcard tetap harus mempunyai mekanisme reveal yang jelas.

---

# 17. API Contract Debugging

Untuk setiap request, catat:

```text
method
URL
request body
query
headers relevan
cookie/session presence
status
response body
request/correlation ID
duration
```

## 17.1 Kategori status

- `2xx` success;
- `401` belum authenticated;
- `403` authenticated tetapi tidak authorized;
- `404` resource tidak tersedia;
- `409` conflict / race / state conflict bila digunakan;
- `422` validation;
- `429` rate limit;
- `5xx` unexpected server failure.

Frontend jangan menampilkan semua sebagai “Terjadi kesalahan”.

---

# 18. Laravel Debugging

Gunakan:

```bash
php artisan about
php artisan route:list
php artisan config:show
php artisan test
php artisan test --testsuite=Feature --stop-on-failure
```

Untuk response test, Laravel menyediakan helper debugging seperti dump response/header/session pada test.

## 18.1 Cari log dengan konteks

Log yang berguna:

```text
event
request_id
user_id (internal ID, bukan PII bila tidak perlu)
membership
resource_type
resource_id
attempt_id
invoice_id
status transition
duration
exception class
```

Jangan log:

- password;
- reset token;
- session cookie;
- bearer token;
- S3 secret;
- answer key ke log client;
- nomor WhatsApp penuh jika tidak diperlukan.

## 18.2 Error 500

Urutan:

1. reproduce;
2. ambil request ID;
3. lihat Laravel exception;
4. identifikasi controller/action;
5. cek validation;
6. cek policy;
7. cek service;
8. cek query;
9. cek migration/schema;
10. cek external storage/integration;
11. buat automated test yang gagal;
12. fix;
13. pastikan test lulus.

---

# 19. Sanctum / Session Debugging

HIRU menargetkan cookie-based first-party SPA authentication.

Jika login sukses tetapi request berikutnya `401/419`, periksa:

- domain frontend/API;
- scheme HTTP/HTTPS;
- stateful domains;
- session domain;
- SameSite;
- Secure;
- CSRF cookie/request;
- CORS credentials;
- browser cookie storage;
- proxy headers;
- environment cache.

## 19.1 Diagnostic sequence

```text
GET/INIT CSRF
   ↓
cookie diterima?
   ↓
POST login
   ↓
session cookie berubah?
   ↓
GET authenticated endpoint
   ↓
cookie terkirim?
   ↓
Laravel session menemukan user?
```

Jangan “fix” 419 dengan menonaktifkan CSRF.

---

# 20. Authorization dan Entitlement Debugging

UI state bukan authorization.

Untuk bug akses, verifikasi dua lapisan:

## Frontend

- card active/locked/limited benar?
- CTA yang ditampilkan benar?
- route guard memberi UX benar?

## Backend

- endpoint memeriksa auth?
- policy/gate?
- ownership?
- membership?
- program/level entitlement?
- expiry?
- resource status?

## 20.1 Matrix inti

| Feature | Free | LMS | LMS + Sensei |
|---|---|---|---|
| Paid full level | locked | sesuai entitlement | sesuai entitlement |
| Achievement | sesuai final config | active | active |
| Try Out | locked/config preview | sesuai config | sesuai config |
| Mini Checkpoint | locked | locked | active |
| Jadwal/Replay/Tanya Sensei | locked preview | locked preview | active |
| Community | read-only/limited sesuai rule | active | active |

Jika source of truth final mengubah matrix ini, ikuti revisi terbaru.

---

# 21. PostgreSQL / Data Debugging

Saat UI salah, jangan langsung mengedit row.

Urutan:

1. request berhasil?
2. transaction committed?
3. row mana yang berubah?
4. foreign key benar?
5. status transition valid?
6. query read memakai filter yang benar?
7. timezone benar?
8. duplicate row?
9. stale cache?
10. serialization/API resource benar?

## 21.1 Production rule

Query investigasi production default **read-only**.

Perubahan data manual harus:

- teridentifikasi root cause;
- ada backup/prosedur;
- mempunyai daftar row target;
- dapat diaudit;
- tidak menggantikan code fix.

---

# 22. Migration Debugging

Gejala:

- local jalan, staging 500;
- column tidak ada;
- enum/status mismatch;
- foreign key gagal;
- seed conflict.

Checklist:

```bash
php artisan migrate:status
```

Bandingkan:

- migration file pada commit;
- status DB target;
- schema aktual;
- config DB aktif.

Jangan menjalankan rollback destructive di production sebagai eksperimen.

---

# 23. Media / S3-compatible Storage Debugging

Jenis media HIRU:

- image;
- audio;
- PDF/module;
- video/replay reference;
- certificate;
- community attachment.

Jika media gagal:

1. metadata resource ada?
2. storage key benar?
3. object ada?
4. object public/private sesuai classification?
5. signed URL masih valid?
6. MIME/type benar?
7. browser CORS?
8. Content-Type?
9. file size?
10. frontend player/renderer?

## 23.1 Jangan memperbaiki private media dengan membuat bucket public

Jika signed URL rusak, perbaiki signed delivery/config, bukan menurunkan security classification.

---

# 24. Assessment Debugging — General

HIRU mempunyai:

1. Latihan Harian;
2. Checkpoint Chapter;
3. Try Out;
4. Mini Checkpoint;
5. Placement Test sebagai acquisition assessment terpisah.

Jangan menggunakan satu business rule untuk semuanya tanpa config.

## 24.1 State machine minimum

```text
not_started
   ↓
in_progress
   ↓
submitted / auto_submitted
   ↓
scored
```

Optional state harus eksplisit, bukan inferred dari null acak.

## 24.2 Bug utama

- duplicate attempt;
- answer hilang;
- score beda setelah refresh;
- submit dua kali;
- timer drift;
- marked state hilang;
- question navigator salah;
- image/audio gagal;
- review membuka answer key sebelum boleh;
- attempt count berkurang salah;
- completion tidak membuka checkpoint berikutnya.

---

# 25. Timer Debugging

Timer visual bukan sumber kebenaran.

Backend harus mempunyai waktu authoritative seperti:

- `started_at`;
- `expires_at`;
- `submitted_at`.

Frontend menghitung:

```text
remaining = expires_at - current_time
```

## 25.1 Test wajib

- refresh page;
- tab background;
- browser sleep/wake;
- network lambat;
- jam device diubah;
- submit tepat sebelum 00:00;
- submit dan auto-submit bersamaan;
- reconnect setelah expiry.

Expected:

- hasil final hanya satu;
- tidak ada double score;
- expiry tetap authoritative;
- state tidak kembali ke waktu awal setelah refresh.

---

# 26. Autosave Debugging

Setiap answer save harus dapat diobservasi.

Catat:

- attempt ID;
- question ID;
- selected value;
- request sequence;
- save status;
- saved timestamp.

## 26.1 Race condition

Contoh:

```text
User pilih A
request A lambat

User cepat pilih B
request B cepat dan selesai

request A kemudian selesai paling akhir
```

Jika backend hanya “last response wins”, jawaban bisa kembali ke A.

Mitigasi design harus mendukung salah satu:

- monotonic sequence/version;
- answered_at/version check;
- serialized mutation per question;
- idempotent update rule.

Implementasi final diputuskan di backend, tetapi test race harus ada.

---

# 27. Submit dan Auto-submit

Submit harus idempotent.

Test:

```text
manual submit × 2
manual submit + timer auto-submit
network retry submit
browser refresh setelah submit
back navigation setelah submit
```

Expected:

- satu final submission;
- satu final score;
- attempt tidak berubah menjadi in_progress lagi;
- invoice/progress/reward side effect tidak duplicate.

---

# 28. Placement Test Debugging

Final business baseline:

- 20 soal;
- sekitar 5 menit;
- hasil langsung;
- analisis Bunpou;
- Moji Goi;
- Dokkai;
- Choukai;
- rekomendasi level;
- rekomendasi program.

## 28.1 Critical flow

```text
Landing
→ Placement info
→ lead data
→ 20 questions
→ submit
→ result
→ recommended program
→ register/referral
→ invoice
→ WhatsApp
```

Bug P1 jika user yang valid tidak dapat mencapai result atau registration CTA.

## 28.2 Lead data

Pastikan:

- Nama;
- WhatsApp;
- target ujian;
- attempt/result;
- source/referral bila ada;

terkait dengan benar.

Jangan membuat duplicate lead setiap refresh result.

---

# 29. Payment / Invoice / WhatsApp Debugging

Payment gateway otomatis bukan scope saat ini.

Critical state:

```text
invoice_created
→ awaiting_payment
→ admin_verified
→ membership/entitlement_active
```

Nama status code final boleh berbeda, semantics tidak boleh ambigu.

## 29.1 Bug berbahaya

- klik WhatsApp langsung mengaktifkan entitlement;
- refresh invoice membuat invoice baru tanpa perlu;
- Admin verify dua kali memberi entitlement duplicate;
- invoice user A bisa dibuka user B;
- total/discount tidak sama antara UI dan backend;
- referral discount diterapkan dua kali.

## 29.2 Deep link WhatsApp

Debug:

- phone target/config;
- URL encoding;
- invoice code;
- selected program/level;
- total;
- browser/mobile behavior.

Jangan masukkan data sensitif berlebihan ke URL.

---

# 30. Referral & Discount Debugging

Final scope adalah Referral & Diskon, bukan affiliate cash commission lama.

Test:

- referral code valid;
- invalid;
- expired/disabled bila rule ada;
- self-referral bila dilarang;
- duplicate usage;
- refresh registration;
- invoice regenerate;
- reward creation;
- entitlement activation tidak menggandakan reward.

Jika PDF lama menyebut cash commission, jangan menjadikannya expected behavior tanpa revisi client baru.

---

# 31. Learning Journey / Progress Debugging

Progress harus berasal dari completion state, bukan sekadar halaman pernah dibuka.

Test:

- first visit;
- content partially complete;
- complete;
- checkpoint locked;
- checkpoint unlock;
- upgrade membership;
- expiry;
- purchased level A vs locked level B;
- cross-device refresh.

Bug jika progress UI dan authoritative state berbeda.

---

# 32. Flashcard Debugging

Wajib mempertahankan:

- front/back;
- 3D flip feel;
- state jelas;
- keyboard/touch usable;
- text Jepang tidak clipping;
- furigana/ruby tidak overlap.

Test:

- rapid flip;
- next card saat flipped;
- previous;
- mobile;
- long Japanese sentence;
- reduced motion;
- session completion/confidence persistence bila fitur diaktifkan.

Jangan mengganti flip menjadi instant text swap hanya untuk menyederhanakan React migration.

---

# 33. Audio / Reading / Module Debugging

Test missing/failure state:

- media 404;
- slow response;
- unsupported MIME;
- signed URL expired;
- no audio permission/autoplay;
- PDF missing;
- long reading content;
- furigana toggle/transform;
- mobile landscape.

Failure satu media tidak boleh membuat seluruh LMS shell crash.

---

# 34. Mini Checkpoint Debugging

Mini Checkpoint hanya aktif untuk LMS + Sensei menurut baseline final saat dokumen ini dibuat.

Cakupan level:

- N5;
- N4;
- N3;
- N2;

dengan struktur sesi + part sesuai konfigurasi final.

Test:

- entitlement;
- session/part listing;
- timer;
- passing score;
- Lulus/Tidak Lulus;
- image question;
- Admin recap;
- attempt persistence;
- deep-link denial untuk non-Sensei.

---

# 35. Sensei Features Debugging

Baseline feature:

- Jadwal;
- detail kelas;
- Zoom link/reference;
- Replay;
- Tanya Sensei;
- Mini Checkpoint.

Tidak ada requirement final untuk portal login Sensei terpisah.

Jika developer menemukan “Sensei dashboard” baru yang tidak ada source of truth, kategorikan sebagai scope drift sebelum menganggapnya bug.

---

# 36. Community Debugging

Test:

- read-only vs write access;
- create post;
- comment;
- report;
- deleted/moderated content;
- attachment;
- pagination;
- empty state;
- unauthorized edit/delete;
- XSS/sanitization untuk rich content sesuai format editor final.

Frontend hidden button bukan ownership enforcement.

---

# 37. Certificate Debugging

Test:

- eligibility;
- generation;
- ownership;
- expired/revoked state bila ada;
- download;
- filename;
- private access;
- refresh;
- duplicate generation.

Certificate user A tidak boleh dapat diakses user B dengan mengganti ID.

---

# 38. Blog / CMS / SEO Debugging

Public article test:

- draft tidak public;
- published public;
- slug;
- duplicate slug;
- metadata;
- meta description;
- canonical;
- OG metadata;
- featured image;
- updated article;
- redirect jika slug berubah sesuai strategy;
- 404 unpublished;
- sitemap inclusion;
- robots behavior.

## 38.1 Rendering

Jangan menganggap artikel benar hanya karena Admin preview benar. Uji public route actual.

## 38.2 Rich text

Jika rich text format belum dikunci, bug sanitizer/editor tidak boleh “diperbaiki” dengan menerima raw HTML tanpa policy.

---

# 39. Admin Console Debugging

Admin bukan sekadar UI lain; ini control plane produk.

Untuk setiap write action:

1. actor benar?
2. resource benar?
3. old state?
4. requested state?
5. validation?
6. authorization?
7. DB result?
8. audit context?
9. UI success?
10. public/student side reflect?

## 39.1 High-risk admin actions

- verify invoice;
- edit access;
- edit membership;
- publish article;
- change assessment;
- answer key;
- passing score;
- user status;
- cohort;
- replay;
- media;
- placement lead export;
- settings.

Gunakan confirmation pada destructive/high-impact action sesuai UX final.

---

# 40. Loading, Empty, Error, Success State

Setiap data screen harus mempunyai state eksplisit.

Jangan:

```text
loading = blank white page
empty = error
403 = empty
500 = empty
```

Contoh:

- “Belum ada replay” ≠ “Replay gagal dimuat”;
- “Tidak punya akses” ≠ “Materi tidak ditemukan”;
- “Belum pernah Try Out” ≠ “Riwayat gagal dimuat”.

Ini penting untuk debugging karena state yang salah sering menyamarkan root cause.

---

# 41. Network Failure Debugging

Test dengan:

- offline;
- slow network;
- request timeout;
- intermittent 500;
- retry;
- duplicate click;
- page refresh.

Critical flow harus mempunyai behavior jelas.

## 41.1 Assessment

Network disconnect tidak boleh sengaja menghapus jawaban yang sudah berhasil disimpan.

UI harus membedakan:

- saved;
- saving;
- failed to save;
- retrying;

jika desain final memerlukan indicator.

---

# 42. Cache / Stale Data Debugging

Gejala:

- Admin update tidak terlihat;
- user upgrade tetapi dashboard masih locked;
- article publish belum muncul;
- progress stale;
- login user berganti tetapi data user lama tampil.

Periksa:

- browser cache;
- Next.js data cache;
- route/static rendering;
- client query cache bila library digunakan;
- Laravel cache;
- config cache;
- CDN/reverse proxy;
- object storage cache headers.

Jangan “fix” dengan `no-store` global tanpa mengerti biaya dan kebutuhan freshness.

---

# 43. Timezone Debugging

Project/user utama beroperasi di Indonesia, tetapi backend sebaiknya menyimpan timestamp konsisten dan melakukan display timezone secara eksplisit.

Bug rawan:

- jadwal Zoom beda hari;
- invoice date;
- attempt expiry;
- publish article;
- cohort start;
- notification;
- admin filter tanggal.

Test timezone boundary:

- 23:30–00:30;
- DST tidak relevan di WIB tetapi library/server dapat berada di UTC;
- browser timezone berbeda;
- server UTC.

Simpan/compare absolute time; format pada presentation layer.

---

# 44. Performance Debugging

Performance issue bukan hanya Lighthouse score.

Prioritas HIRU:

- landing/public SEO;
- dashboard initial interaction;
- chapter/journey;
- assessment input responsiveness;
- image/audio loading;
- Admin large tables.

## 44.1 Diagnose

Pisahkan:

- server response;
- API latency;
- DB query;
- JS bundle;
- hydration;
- image size;
- font;
- client re-render;
- layout shift.

Jangan menghapus motion penting sebagai fix pertama jika bottleneck sebenarnya data/network.

---

# 45. Memory / Event Leak Debugging

Gejala:

- timer makin cepat;
- click terpanggil dua kali;
- tab berat setelah lama;
- audio event duplicate;
- autosave duplicate.

Periksa Effect cleanup untuk:

- `setInterval`;
- `setTimeout`;
- window listeners;
- media listeners;
- subscriptions;
- observers.

Assessment timer adalah area prioritas tinggi.

---

# 46. Console Hygiene

Target sebelum merge:

- tidak ada uncaught error;
- tidak ada repeated warning;
- tidak ada hydration warning;
- tidak ada key warning;
- tidak ada debug log berisi PII;
- tidak ada failed request yang dianggap normal tanpa handling.

`console.log` sementara boleh saat local debug, tetapi jangan menjadi observability strategy production.

---

# 47. Laravel Logging Strategy

Gunakan structured contextual logging.

Contoh semantic:

```php
Log::info('assessment.submitted', [
    'request_id' => $requestId,
    'user_id' => $user->id,
    'attempt_id' => $attempt->id,
    'assessment_id' => $attempt->assessment_id,
    'submit_mode' => 'manual',
]);
```

Jangan log selected answers secara massal di production kecuali ada kebutuhan investigasi yang disetujui dan aman.

## 47.1 Correlation ID

Disarankan setiap request mempunyai ID yang bisa ditelusuri:

```text
browser request
→ Next proxy/fetch
→ Laravel
→ log
→ response header
```

Nama header final dapat ditentukan saat implementasi.

---

# 48. Test Pyramid HIRU

```text
              E2E
          /           \
     Integration / Feature
    /                   \
        Unit / Pure Logic
```

## 48.1 Unit

Cocok untuk:

- score calculation;
- entitlement helper;
- progress calculation;
- timer formatting;
- mapping API data;
- referral discount calculation;
- status transition pure logic.

## 48.2 Laravel Feature

Prioritas:

- auth;
- authorization;
- validation;
- assessment submit;
- invoice verify;
- entitlement activation;
- ownership;
- Admin actions;
- public CMS API.

Laravel secara umum merekomendasikan feature tests untuk confidence sistem.

## 48.3 E2E

Prioritas user journey, bukan setiap combinatorial branch.

---

# 49. Playwright Debugging Standard

Gunakan Playwright untuk critical browser journeys.

Saat test gagal:

1. jalankan satu test;
2. UI mode;
3. Inspector/debug;
4. lihat network;
5. lihat DOM snapshot;
6. buka trace;
7. tentukan apakah locator, timing, data, atau aplikasi yang salah.

Command umum:

```bash
npx playwright test
npx playwright test --ui
npx playwright test --debug
npx playwright show-trace path/to/trace.zip
```

Gunakan script/config aktual project bila berbeda.

## 49.1 Trace

Trace pada failure harus membantu melihat:

- action;
- locator;
- screenshot;
- DOM snapshot;
- network;
- timing.

Jangan memasukkan production secrets dalam fixture/trace.

---

# 50. Critical E2E Suite

Minimal target:

## Public

```text
Landing → Program → Register → Invoice → WhatsApp
```

## Placement

```text
Placement info → 20 questions → Result → Program → Register
```

## Free

```text
Login → Dashboard → Free Chapter → Locked premium preview
```

## LMS

```text
Login → Dashboard → Level → Chapter → Content → Checkpoint
```

```text
Login → Try Out → Answer → Submit → Result → History
```

## LMS + Sensei

```text
Login → Dashboard → Jadwal → Detail → Replay
```

```text
Login → Mini Checkpoint → Submit → Result
```

## Admin

```text
Login → Invoice → Verify → Membership becomes active
```

```text
Login → Blog → Create/Edit → Publish → Public article
```

```text
Login → Assessment config/question → Student runner reflects valid change
```

---

# 51. Role Regression Matrix

Setelah fix entitlement/navigation, minimal uji:

- visitor;
- Free;
- LMS;
- LMS + Sensei;
- Admin.

Bug paling berbahaya pada arsitektur shared component adalah fix untuk satu membership mengubah yang lain.

## 51.1 Example

Jika memperbaiki tombol Mini Checkpoint untuk Sensei:

- Sensei: active;
- LMS: locked;
- Free: locked;
- Visitor: tidak masuk private app;
- Admin: manage route, bukan student CTA.

---

# 52. Neighbor Regression Rule

Setiap fix harus menguji “tetangga” terdekat.

Contoh:

### Fix Try Out submit

Regression:

- Latihan Harian;
- Checkpoint;
- Mini Checkpoint;
- history;
- result;
- timer;
- manual vs auto submit.

### Fix media card

Regression:

- library;
- chapter;
- flashcard image;
- assessment image;
- blog image;
- Admin preview.

### Fix shared dashboard card

Regression seluruh membership.

---

# 53. Visual Neighbor Regression

Jika mengubah shared token/component:

- button;
- card;
- modal;
- input;
- badge;
- sidebar;
- progress;
- assessment option;

ambil sample lintas screen, jangan hanya screen tempat bug ditemukan.

---

# 54. Bug Bisect

Jika bug baru muncul setelah commit tertentu:

```bash
git log --oneline
git diff GOOD..BAD
```

Untuk bug reproducible dan commit range jelas, gunakan `git bisect` bila efektif.

Jangan langsung revert semua perubahan jika root cause dapat diisolasi kecil.

---

# 55. Feature Flag / Mock Drift

Frontend-first berisiko mock contract berbeda dari backend final.

Setiap mock harus mempunyai bentuk dekat dengan planned API contract.

Bug indicator:

- mock field `isLocked`, backend hanya memberi entitlements;
- mock score berupa percentage, backend raw point;
- mock level satu string, backend relation;
- mock media public URL, production signed URL;
- mock user role disimpan localStorage sebagai source of truth.

Saat API masuk, lakukan contract reconciliation, bukan patch acak per screen.

---

# 56. Error Copy Standard

Error harus actionable dan tidak membocorkan detail internal.

Baik:

```text
Jawaban belum berhasil disimpan. Periksa koneksi lalu coba lagi.
```

Tidak baik:

```text
SQLSTATE[23505] duplicate key...
```

Baik untuk login:

```text
Email/WhatsApp atau kata sandi tidak valid.
```

Jangan bedakan akun ada/tidak bila membuka enumeration.

---

# 57. Security Regression Saat Debug

Debugging tidak boleh menurunkan kontrol dari `03-SECURITY-AUDIT.md`.

Dilarang menjadikan “sementara” lalu lupa:

- wildcard CORS credentials;
- CSRF disabled;
- public storage untuk private media;
- `localStorage` bearer auth sebagai shortcut;
- admin middleware dibypass;
- answer key ikut payload;
- `.env` commit;
- debug endpoint public;
- `APP_DEBUG=true` production.

---

# 58. PII dan Debug Artifact

HIRU memproses:

- nama;
- email;
- WhatsApp;
- learning result;
- invoice;
- placement lead.

Sebelum membagikan:

- screenshot;
- trace;
- log;
- HAR;
- DB export;

mask data personal yang tidak diperlukan.

Gunakan fixture account untuk dokumentasi bug bila memungkinkan.

---

# 59. Production Incident Snapshot

Untuk incident production, catat sebelum perubahan:

```text
timestamp
deployment/commit
affected route
affected role/membership
request ID
status/error
scope user affected
recent deploy/config change
database health
storage/API health
```

Jangan menghapus evidence dengan clear log/cache secara acak sebelum snapshot.

---

# 60. Hotfix Rule

Hotfix production harus:

1. mengatasi root cause atau containment yang jelas;
2. sekecil mungkin;
3. mempunyai test reproduksi;
4. tidak mengubah requirement;
5. tidak menurunkan security;
6. diuji pada neighbor path;
7. dicatat;
8. diikuti permanent fix jika hotfix hanya containment.

---

# 61. Definition of Fixed

Bug belum dianggap selesai hanya karena “sudah tidak terlihat”.

**FIXED** jika:

- original reproduction tidak gagal lagi;
- root cause tertulis;
- expected behavior jelas;
- relevant automated test lulus;
- neighbor regression lulus;
- role matrix terkait lulus;
- tidak ada console/server error baru;
- security tidak turun;
- visual/interaction tidak mengalami regression;
- evidence tersedia.

---

# 62. Definition of Debug-Ready Feature

Sebuah feature dianggap mudah di-debug jika:

- route jelas;
- state machine jelas;
- loading/empty/error jelas;
- request dapat ditelusuri;
- error status tidak disamarkan;
- backend log kontekstual;
- test fixture tersedia;
- E2E locator stabil;
- business rule tidak tersembunyi dalam banyak component;
- source of truth dapat ditunjuk.

Debuggability adalah kualitas arsitektur, bukan aktivitas setelah bug muncul.

---

# 63. Merge Gate

Sebelum merge feature penting:

```text
[ ] lint
[ ] typecheck
[ ] production build frontend
[ ] backend tests
[ ] relevant unit tests
[ ] relevant Playwright critical flow
[ ] no console errors
[ ] no hydration warnings
[ ] responsive smoke
[ ] role entitlement smoke
[ ] source-of-truth review
[ ] security regression check
[ ] HTML interaction fidelity check
```

Exact command mengikuti scripts repository.

---

# 64. Release Smoke Test

Setelah deploy staging/production-like:

## Public

- landing 200;
- program;
- Placement;
- blog;
- article;
- register/login.

## Student

- dashboard;
- level;
- chapter;
- one learning media;
- one assessment;
- result/history.

## Sensei tier

- jadwal;
- replay;
- Mini Checkpoint.

## Admin

- login;
- user lookup;
- invoice;
- article;
- assessment read.

Hindari write destructive pada production smoke kecuali account/test data khusus telah disiapkan.

---

# 65. Known High-Risk Areas HIRU

Prioritas regression tertinggi:

1. membership/entitlement;
2. invoice → activation;
3. assessment timer;
4. assessment autosave;
5. submit idempotency;
6. score;
7. Placement → registration;
8. referral discount;
9. progress/unlock;
10. Admin edit affecting student;
11. private media;
12. blog publish/SEO;
13. responsive assessment UI;
14. furigana/Japanese rendering;
15. shared component cross-role regression.

---

# 66. Decision Tree — “Tombol Tidak Berfungsi”

```text
Button disabled?
├─ yes → state/entitlement correct?
│
└─ no
   ↓
click handler fires?
├─ no → overlay/pointer/event/component
└─ yes
   ↓
navigation or mutation?
├─ navigation → href/route/guard
└─ mutation
   ↓
request sent?
├─ no → validation/client handler
└─ yes
   ↓
status?
├─ 401/419 → auth/session/CSRF
├─ 403 → authorization
├─ 404 → resource/route
├─ 422 → validation
├─ 409 → state/race
├─ 5xx → backend exception
└─ 2xx
   ↓
response mapped?
   ↓
cache/state invalidated?
   ↓
UI feedback rendered?
```

---

# 67. Decision Tree — “Data Tidak Muncul”

```text
Expected data exists in DB?
├─ no → write/business flow
└─ yes
   ↓
API query returns row?
├─ no → scope/filter/authorization
└─ yes
   ↓
response serialization contains field?
├─ no → resource/transform
└─ yes
   ↓
frontend receives response?
├─ no → network/cache
└─ yes
   ↓
component maps correct key?
├─ no → contract mismatch
└─ yes
   ↓
CSS/render hides it?
```

---

# 68. Decision Tree — “User Punya Akses yang Salah”

```text
Account identity correct?
↓
membership row correct?
↓
membership active/not expired?
↓
invoice/source correct?
↓
entitlement row/config correct?
↓
backend endpoint checks entitlement?
↓
API result correct?
↓
frontend locked/active state correct?
↓
deep link behavior correct?
```

Jangan mulai dari mengubah badge UI.

---

# 69. Decision Tree — “Assessment Score Salah”

```text
question set correct?
↓
answer persisted correct?
↓
correct answer server-side correct?
↓
scoring config correct?
↓
attempt submitted once?
↓
calculation correct?
↓
result persisted?
↓
API serialization?
↓
frontend formatting?
```

Bandingkan raw attempt + answer + config, bukan screenshot score saja.

---

# 70. Decision Tree — “Timer Salah”

```text
started_at correct?
↓
expires_at correct?
↓
timezone serialization correct?
↓
client parses absolute time?
↓
interval cleanup correct?
↓
refresh keeps same expiry?
↓
server rejects expired submit correctly?
↓
auto-submit idempotent?
```

---

# 71. Decision Tree — “Login Sukses Tapi Balik ke Login”

```text
login response success?
↓
session cookie stored?
↓
cookie domain/path correct?
↓
CSRF/session configuration?
↓
authenticated API returns user?
↓
Next route guard reads authoritative state?
↓
redirect loop/cached user?
```

---

# 72. Debug Checklist per Bug Category

## UI

- viewport;
- browser;
- state;
- Figma reference;
- HTML interaction;
- DOM;
- computed CSS.

## Data

- request;
- response;
- DB;
- serialization;
- cache.

## Auth

- cookie;
- CSRF;
- status;
- middleware;
- session;
- user.

## Access

- user;
- membership;
- entitlement;
- policy;
- resource ownership.

## Assessment

- attempt;
- answers;
- timer;
- config;
- submit;
- score.

## Admin

- actor;
- action;
- before/after;
- validation;
- audit/log;
- downstream student/public result.

---

# 73. Bug Report Closing Template

```md
## Root Cause
...

## Fix
...

## Why this is the smallest correct fix
...

## Tests Added/Updated
- ...

## Verification
- Original repro: PASS
- Neighbor regression: PASS
- Role regression: PASS
- Responsive: PASS / N/A
- Security regression: PASS
- Visual fidelity: PASS / N/A

## Evidence
- test:
- screenshot:
- trace/log:
- commit:
```

---

# 74. Open Debug Decisions

Item ini belum boleh di-hardcode sampai implementation/repository tersedia.

## OPEN-DBG-01 — Error monitoring platform

Belum dipilih:

- Sentry;
- Bugsnag;
- OpenTelemetry-compatible platform;
- provider lain.

Requirement minimal:

- client + server error visibility;
- environment separation;
- source maps;
- PII scrubbing;
- release/commit tagging.

## OPEN-DBG-02 — Frontend data-fetching/cache library

Belum dikunci apakah memakai:

- native Next fetch;
- TanStack Query;
- SWR;
- kombinasi.

Playbook harus disesuaikan setelah dipilih.

## OPEN-DBG-03 — Correlation ID convention

Header/nama final belum dikunci.

## OPEN-DBG-04 — Test runner frontend unit

Belum dikunci:

- Vitest;
- Jest;
- tool lain.

## OPEN-DBG-05 — API schema contract tooling

Belum dikunci apakah memakai OpenAPI/generated client atau manual typed client.

## OPEN-DBG-06 — Staging environment

Domain, DB, storage, dan data seeding staging belum tersedia pada source sekarang.

---

# 75. Referensi Teknis Resmi yang Menjadi Baseline

Playbook ini diselaraskan dengan dokumentasi resmi:

1. **Next.js App Router — Debugging**  
   Debugging client/server dengan VS Code, browser DevTools, source maps, dan React DevTools.

2. **Next.js App Router — Error Handling / `error` convention**  
   Expected error dibedakan dari unexpected exception; error boundary digunakan untuk runtime failure yang tidak terduga.

3. **React — StrictMode**  
   Development checks dapat menjalankan render/Effect/ref callback tambahan untuk menemukan bug side-effect/cleanup.

4. **Laravel 12 — Testing**  
   `php artisan test`, feature/unit tests, testing environment, stop-on-failure, profiling/coverage.

5. **Laravel 12 — HTTP Tests**  
   Request/response assertions dan debugging response/header/session.

6. **Laravel 12 — Logging**  
   Structured/contextual logs, channels, severity, dan log tailing.

7. **Playwright — Running and Debugging Tests**  
   UI Mode dan Inspector.

8. **Playwright — Trace Viewer**  
   Trace untuk menganalisis failed E2E dan CI runs.

Versi exact package pada repository tetap menjadi authority saat implementation dimulai.

---

# 76. Final Verdict Batch 4

HIRU Academy sekarang memiliki debugging contract yang membatasi tiga risiko terbesar fase implementasi:

1. **debug tanpa source of truth**, yang berpotensi “memperbaiki” code menjadi berbeda dari keputusan client;
2. **fix gejala lintas layer**, yang berpotensi menambah patch/hardcode;
3. **regression lintas membership dan assessment**, karena banyak screen memakai component dan business primitive yang sama.

Prinsip yang dikunci:

> Reproduce first. Find the first wrong layer. Fix the smallest correct cause. Prove it with regression evidence.

Untuk fase frontend-first, bug visual/navigation/state dapat divalidasi penuh.

Untuk auth, authorization, persistence, storage, assessment integrity, dan production behavior, playbook ini menjadi acceptance baseline yang harus dijalankan ulang setelah repository Next.js + Laravel benar-benar tersedia.

---

# Appendix A — Quick Command Sheet

## Git

```bash
git status
git rev-parse HEAD
git log -1 --oneline
git diff
```

## Frontend

```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run dev
```

Gunakan hanya script yang benar-benar tersedia di `package.json`.

## Laravel

```bash
composer install
php artisan about
php artisan route:list
php artisan migrate:status
php artisan config:clear
php artisan test
php artisan test --testsuite=Feature --stop-on-failure
```

## Playwright

```bash
npx playwright test
npx playwright test --ui
npx playwright test --debug
npx playwright show-trace path/to/trace.zip
```

---

# Appendix B — Golden Regression Set

Setelah perubahan shared architecture, smoke:

```text
PUBLIC
[ ] Landing
[ ] Program
[ ] Placement
[ ] Blog detail
[ ] Register/Login

FREE
[ ] Dashboard
[ ] Free content
[ ] Premium locked preview

LMS
[ ] Dashboard
[ ] Journey
[ ] Content
[ ] Checkpoint
[ ] Try Out

LMS + SENSEI
[ ] Dashboard
[ ] Jadwal
[ ] Replay
[ ] Tanya Sensei
[ ] Mini Checkpoint

ADMIN
[ ] User/access
[ ] Invoice
[ ] Content
[ ] Assessment
[ ] Blog
```

---

# Appendix C — Anti-Regression HIRU

Sebuah refactor dianggap gagal walaupun test data lulus jika menyebabkan:

- Flashcard flip hilang;
- hover/tactile feedback utama hilang;
- responsive composition memburuk;
- Japanese/furigana hierarchy rusak;
- locked/active state makin ambigu;
- membership menjadi tiga UI terpisah tanpa kebutuhan;
- CTA route menjadi dead-end;
- Page 08–11 flow berubah;
- security control dari Batch 3 dilemahkan.

---

**END OF `04-DEBUG-PLAYBOOK.md`**
