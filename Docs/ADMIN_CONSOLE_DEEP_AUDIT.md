# Admin Route Tree

## Ruang lingkup dan metode

Audit ini membaca implementasi frontend aktual, bukan menganggap blueprint lama sebagai kondisi produk. Inventaris final berisi **17 logical routes**: `/admin` ditambah 16 key screen. Secara fisik hanya ada **2 route files**: dashboard langsung di `Frontend/src/app/admin/page.tsx:5-6` dan catch-all di `Frontend/src/app/admin/[...legacy]/page.tsx:7-12`. Catch-all menghasilkan 16 path statis dari registry `screens` melalui `generateStaticParams` di `Frontend/src/app/admin/[...legacy]/page.tsx:5`.

Semua 16 screen catch-all didefinisikan di `Frontend/src/lib/admin-console.ts:32-48`, lalu dirender oleh satu `AdminScreen` generik (`Frontend/src/components/admin-screen.tsx:8-38`). Karena itu, keberadaan route tidak sama dengan kelengkapan workflow domain.

## Pohon route aktual

```text
/admin                                      [file fisik: app/admin/page.tsx]
├── /landing-page                           [catch-all: screens["landing-page"]]
├── /program-harga                          [catch-all: screens["program-harga"]]
├── /kurikulum-materi                       [catch-all: screens["kurikulum-materi"]]
├── /bank-soal                              [catch-all: screens["bank-soal"]]
├── /placement-hasil                        [catch-all: screens["placement-hasil"]]
├── /pengguna-akses                         [catch-all: screens["pengguna-akses"]]
├── /invoice                                [catch-all: screens.invoice]
├── /affiliate-komisi                       [catch-all: screens["affiliate-komisi"]]
├── /pencairan-komisi                       [catch-all: screens["pencairan-komisi"]]
├── /testimoni                              [catch-all: screens.testimoni]
├── /blog-seo                               [catch-all: screens["blog-seo"]]
├── /pengumuman                             [catch-all: screens.pengumuman]
├── /sensei                                 [catch-all: screens.sensei]
├── /kelas-jadwal                           [catch-all: screens["kelas-jadwal"]]
├── /analitik                               [catch-all: screens.analitik]
└── /pengaturan-integrasi                   [catch-all: screens["pengaturan-integrasi"]]
```

Menu dan route memakai sumber sama, tetapi tidak ada validasi tipe yang menjamin `adminMenu` dan `screens` selalu sinkron. Menu berisi 17 item di `Frontend/src/lib/admin-console.ts:3-21`; registry catch-all berisi 16 screen di `Frontend/src/lib/admin-console.ts:32-48`. Unknown nested path masuk `notFound()` di `Frontend/src/app/admin/[...legacy]/page.tsx:9-11`.

## Ringkasan status final

| Status | Jumlah | Route |
|---|---:|---|
| GOOD | 0 | Tidak ada; seluruh route masih demo terisolasi atau statis |
| NEEDS POLISH | 1 | `/admin` |
| REBUILD | 12 | Landing Page, Program & Harga, Kurikulum & Materi, Bank Soal, Placement & Hasil, Pengguna & Akses, Testimoni, Blog & SEO, Pengumuman, Sensei, Kelas & Jadwal, Pengaturan & Integrasi |
| MERGE | 4 | Invoice, Affiliate & Komisi, Pencairan Komisi, Analitik |
| REMOVE | 0 | Tidak ada dasar untuk menghapus route |
| **Total** | **17** | Konsisten dengan inventaris logical route |

`MERGE` berarti route tetap dipertahankan, tetapi workflow/tab/komponen datanya digabung dengan domain terkait; bukan rekomendasi menghapus URL.

# Navigation Audit

## Struktur aktual

Navigasi merender **17 menu utama** dalam **9 group** berdasarkan `adminMenu` (`Frontend/src/lib/admin-console.ts:3-21`) dan membentuk daftar group secara dinamis (`Frontend/src/components/admin-navigation.tsx:27-28`).

| Group | Item | Temuan |
|---|---:|---|
| Ringkasan | 1 | Dashboard tepat sebagai root |
| Website | 2 | Landing dan Program/Harga layak sebagai domain editorial terpisah |
| Pembelajaran | 3 | Terlalu lebar: kurikulum, assessment, dan hasil bercampur |
| Pengguna | 1 | Dapat menjadi user operations hub |
| Transaksi | 3 | Invoice, affiliate, payout terkait tetapi perlu subnavigation operasional |
| Konten | 3 | Testimoni, Blog, Pengumuman cocok dalam Content Studio |
| Kelas | 2 | Sensei dan kelas/jadwal terkait erat |
| Laporan | 1 | Analitik tepat sebagai top-level bila datanya nyata |
| Sistem | 1 | Pengaturan dan integrasi sebaiknya tab/subpage |

## Kualitas interaksi

- Active state membandingkan `pathname` atau prop `current` (`Frontend/src/components/admin-navigation.tsx:28`); cukup untuk 17 route datar, tetapi belum mendukung active ancestor pada editor/subpage mendalam.
- Mobile drawer punya fokus awal, Escape, dan loop Tab (`Frontend/src/components/admin-navigation.tsx:14-26`), backdrop, serta trigger 56×56 (`Frontend/src/app/globals.css:472-477`). Fondasi aksesibilitas ini layak dipertahankan.
- Tidak ada collapse per group, pin/favorite, badge antrean, command search, breadcrumb, atau recent destinations.
- Footer “Keluar Admin” mengarah ke `/`, bukan aksi logout (`Frontend/src/components/admin-navigation.tsx:28`): false affordance keamanan dan session semantics.
- Seluruh 17 item terlihat setara. Tidak ada progressive disclosure untuk pekerjaan editorial versus operasional.

## Kandidat duplicate, technical, dan tab

- **Tab candidates:** `Pencairan Komisi` sebagai tab/queue pada Affiliate; `Pengaturan & Integrasi` tetap satu route tetapi Integrasi, Branding, Privasi, Profil menjadi tab/subpage; Placement builder dan hasil/lead menjadi tab berbeda dalam satu domain.
- **Technical candidates:** “SEO”, “Integrasi”, dan “Akses” adalah konsep teknis; label menu dapat tetap bila copy Figma menyetujuinya, tetapi detail perlu bahasa tugas pengguna.
- **Duplicate workflow:** tiga route Transaksi mengulang pola list-detail-status; tiga route Konten mengulang lifecycle draft/review/publish; Kurikulum dan Bank Soal membutuhkan shared picker/version/publish, bukan generic CRUD terpisah.
- **Bukan duplicate route:** route tetap berguna untuk deep link dan permission boundary masa depan. Gabungkan workflow dan komponen, bukan menghapus URL tanpa requirement.

## Rekomendasi information architecture

```text
Ringkasan
  Dashboard
Website
  Landing Page
  Program & Harga
Content Studio
  Kurikulum & Materi
  Bank Soal
  Testimoni
  Blog & SEO
  Pengumuman
Operations
  Placement & Hasil
  Pengguna & Akses
  Transaksi
    Invoice
    Affiliate & Komisi
    Pencairan Komisi
  Kelas
    Sensei
    Kelas & Jadwal
Insights
  Analitik
System
  Pengaturan & Integrasi
```

Tetap 17 route; sidebar desktop dapat menampilkan group dan anak, sedangkan mobile memakai accordion. Tambahkan breadcrumb ketika editor/subpage nyata tersedia.

# Dashboard Audit

## Implementasi aktual

Dashboard punya search input, tiga KPI statis, dan 16 quick-action cards (`Frontend/src/app/admin/page.tsx:5-6`). Semua nilai (`1.284`, `936`, `5`) hard-coded. Search tidak memiliki state, submit handler, result, atau destination. `adminMenu.slice(1)` menduplikasi seluruh sidebar sebagai card grid, sehingga dashboard menjadi directory kedua, bukan pusat keputusan.

## Masalah

1. **False affordance:** search terlihat aktif tetapi tidak bekerja.
2. **Static metrics:** tidak terhubung ke local store sekalipun; angka invoice “5” berbeda dari satu initial invoice di `Frontend/src/lib/admin-demo-store.ts:11`.
3. **Duplicate navigation:** 16 kartu mengulang menu tanpa prioritas, status, SLA, atau konteks.
4. **Tidak ada antrean:** invoice menunggu, payout, testimonial review, content validation, jadwal dekat, dan issue integrasi tidak diprioritaskan.
5. **Tidak ada waktu/data freshness:** KPI tidak menjelaskan periode, perubahan, sumber, atau waktu pembaruan.
6. **Tidak ada role-based view:** seluruh fungsi dipresentasikan sama walau granularity permission Admin masih OPEN.
7. **Responsive parsial:** grid tiga kolom didefinisikan pada `Frontend/src/app/globals.css:682`, tetapi tidak tampak breakpoint khusus untuk `.console-summary`/`.console-action-grid`; risiko kolom sempit pada mobile.

## Recommended bento

```text
┌───────────────────────────────┬──────────────────────┐
│ Fokus hari ini                │ Status sistem        │
│ 5 invoice perlu verifikasi    │ API / Storage / Mail │
│ 2 payout lewat SLA            │ last checked         │
├──────────────────┬────────────┼──────────────────────┤
│ Pengguna aktif   │ Pendapatan │ Jadwal terdekat      │
│ delta + periode  │ delta      │ 3 sesi / konflik 1   │
├───────────────────────────────┼──────────────────────┤
│ Antrean review & publikasi    │ Aktivitas terbaru    │
│ konten, testimoni, placement  │ actor, aksi, waktu   │
├───────────────────────────────┴──────────────────────┤
│ Quick actions kontekstual: buat artikel, kelas, soal │
└──────────────────────────────────────────────────────┘
```

Setiap card harus punya source, periode, empty/loading/error state, dan deep link berfilter. Search global hanya ditampilkan setelah query API tersedia; sebelum itu hapus field, bukan biarkan placebo.

# Page-by-Page Audit

## 1. `/admin` — Dashboard Admin

- **Tujuan:** ringkasan operasional dan pintasan.
- **Sections:** header/search, tiga KPI, akses cepat 16 kartu (`Frontend/src/app/admin/page.tsx:6`).
- **Primary CTA:** “Kelola sekarang” pada semua kartu; tidak ada satu prioritas utama.
- **Secondary CTA:** tidak ada.
- **Form:** search inert; **list/table:** grid link; **modal:** tidak ada; **editor/subpage:** tidak ada.
- **Storage:** tidak membaca store; nilai statis.
- **Target:** seluruh 16 route admin; **edit memengaruhi target:** tidak ada edit.
- **Responsive:** shell berpindah ke drawer pada ≤1024 px (`Frontend/src/app/globals.css:472-477`); bento/card belum diprioritaskan untuk mobile.
- **Masalah:** duplicate menu, KPI tidak kredibel, pencarian palsu, tanpa queue/error/freshness.
- **Status final:** **NEEDS POLISH** — layout dasar berguna, isi dan data perlu diganti.

## 2. `/admin/landing-page` — Landing Page

- **Tujuan:** mengatur susunan homepage, pricing presentation, dan publikasi menurut config (`Frontend/src/lib/admin-console.ts:33`).
- **Sections:** tab Bagian Halaman, Tampilan Harga, Riwayat Versi; generic list.
- **Primary CTA:** “Tambah Bagian”; **secondary CTA:** “Lihat Detail”.
- **Form:** hanya Judul bagian, Isi, Tombol; **list/table:** row generik; **modal:** create/detail; **editor/subpage:** tidak ada section canvas, version compare, preview, atau publish.
- **Storage:** item localStorage per route (`Frontend/src/components/admin-screen.tsx:17-23`).
- **Target:** public homepage `Frontend/src/app/page.tsx`; **edit memengaruhi target:** **tidak**.
- **Responsive:** modal width dibatasi dan scroll (`Frontend/src/app/globals.css:682`); reorder/canvas mobile tidak ada.
- **Masalah:** tab hanya mengganti heading; data list tidak difilter berdasarkan tab; pricing dan version history hanya label; CTA destination, media, SEO, visibility, schedule, restore hilang.
- **Status final:** **REBUILD**.

## 3. `/admin/program-harga` — Program & Harga

- **Tujuan:** program, level, manfaat, harga display, publikasi (`Frontend/src/lib/admin-console.ts:34`).
- **Sections:** Program, Level, Harga, Manfaat.
- **Primary CTA:** “Buat Program”; **secondary CTA:** “Lihat Detail”.
- **Form:** Nama program, Deskripsi, Level; **list/table:** generic row; **modal:** create/detail; **editor/subpage:** tidak ada hierarchy/journey.
- **Storage:** localStorage generic item.
- **Target:** `/program`, `/program/[level]`, checkout presentation; **edit memengaruhi target:** **tidak**; public content tersimpan di source terpisah/statis.
- **Responsive:** generic stack; belum ada hierarchy navigation mobile.
- **Masalah:** harga, benefit, ordering, entitlement reference, level N1–N5, journey, preview, save/publish tidak dimodelkan. Harga/promo final wajib OPEN, tidak boleh ditebak.
- **Status final:** **REBUILD**.

## 4. `/admin/kurikulum-materi` — Kurikulum & Materi

- **Tujuan:** chapter, lesson, flashcard, media, urutan belajar (`Frontend/src/lib/admin-console.ts:35`).
- **Sections:** Chapter, Lesson, Flashcard, Perpustakaan Konten.
- **Primary CTA:** “Buat Materi”; **secondary CTA:** “Lihat Detail”.
- **Form:** Judul materi, Jenis materi, Level dan chapter; **list/table:** generic row; **modal:** create/detail; **editor/subpage:** tidak ada outline atau block editor.
- **Storage:** localStorage generic item.
- **Target:** learning journey, lesson, flashcard; **edit memengaruhi target:** **tidak**; target memakai data lain, misalnya flashcard dari `Frontend/src/lib/learning-mock.ts:12`.
- **Responsive:** shell/drawer ada; drag/reorder dan builder preview tidak ada.
- **Masalah:** tidak ada program→level→chapter→lesson tree, typed blocks, asset picker, reorder, validation, preview, draft/publish, dependency warning.
- **Status final:** **REBUILD**.

## 5. `/admin/bank-soal` — Bank Soal

- **Tujuan:** Quiz, Checkpoint, Try Out, Mini Checkpoint (`Frontend/src/lib/admin-console.ts:36`).
- **Sections:** empat tab assessment.
- **Primary CTA:** “Buat Soal”; **secondary CTA:** “Lihat Detail”.
- **Form:** Pertanyaan, Pilihan jawaban, Pembahasan; **list/table:** generic row; **modal:** create/detail; **editor/subpage:** tidak ada assessment builder/runner preview.
- **Storage:** localStorage generic item.
- **Target:** practice/checkpoint/tryout/mini-checkpoint; **edit memengaruhi target:** **tidak**; latihan memakai source lain seperti `Frontend/src/lib/practice-mock.ts:11`.
- **Responsive:** tab horizontal scroll tersedia (`Frontend/src/app/globals.css:683`), tetapi editor soal tidak ada.
- **Masalah:** pilihan jawaban hanya satu textarea, tidak ada correct answer yang aman, section, taxonomy, randomization, timer, score, attempts, version, reorder, preview, save/publish. Answer key tidak boleh bocor ke client sebelum review diizinkan.
- **Status final:** **REBUILD**.

## 6. `/admin/placement-hasil` — Placement & Hasil

- **Tujuan:** pertanyaan placement, lead, hasil evaluasi (`Frontend/src/lib/admin-console.ts:37`).
- **Sections:** Placement Test, Lead, Hasil Evaluasi.
- **Primary CTA:** “Buat Pertanyaan Placement”; **secondary CTA:** “Lihat Detail”.
- **Form:** Pertanyaan, Pilihan jawaban, Rekomendasi; **list/table:** generic list sama untuk seluruh tab; **modal:** create/detail; **editor/subpage:** tidak ada lead/result review.
- **Storage:** localStorage generic item.
- **Target:** placement runner/result; **edit memengaruhi target:** **tidak**; target memiliki logic/data sendiri, termasuk hasil di `Frontend/src/lib/public-mock.ts:221`.
- **Responsive:** generic; tidak ada split queue/detail mobile.
- **Masalah:** content authoring dan PII lead review tercampur; mapping recommendation, scoring version, consent, retention, export, ownership, dan status follow-up hilang.
- **Status final:** **REBUILD**.

## 7. `/admin/pengguna-akses` — Pengguna & Akses

- **Tujuan:** akun, membership, akses belajar, sertifikat (`Frontend/src/lib/admin-console.ts:38`).
- **Sections:** Pengguna, Akses, Sertifikat.
- **Primary CTA:** “Tambah Pengguna”; **secondary CTA:** “Lihat Detail”.
- **Form:** Nama, Email atau WhatsApp, Membership; **list/table:** generic rows; **modal:** create/detail; **editor/subpage:** tidak ada profile timeline atau entitlement matrix.
- **Storage:** localStorage generic item.
- **Target:** account/membership/certificate; **edit memengaruhi target:** **tidak**.
- **Responsive:** row flex berisiko sempit; tidak ada responsive data-table semantics.
- **Masalah:** create user tanpa auth contract, identifier ambiguity, tidak ada verification, role, access reason/expiry, audit log, revoke confirmation, certificate lifecycle. Client-side UI tidak boleh menjadi authorization.
- **Status final:** **REBUILD**.

## 8. `/admin/invoice` — Invoice

- **Tujuan:** review pembayaran dari menunggu sampai ditolak (`Frontend/src/lib/admin-console.ts:39`).
- **Sections:** Semua, Menunggu, Diperiksa, Terverifikasi, Ditolak.
- **Primary CTA:** pada detail tersedia perubahan status invoice; **secondary CTA:** “Lihat Detail”.
- **Form:** tidak ada create; **list/table:** local invoice list; **modal:** detail/action; **editor/subpage:** tidak ada proof review workspace.
- **Storage:** `store.invoices`; initial satu fixture (`Frontend/src/lib/admin-demo-store.ts:11`); status disimpan localStorage (`Frontend/src/components/admin-screen.tsx:25-29`).
- **Target:** invoice/member activation; **edit memengaruhi target:** **tidak**.
- **Responsive:** dialog generik; bukti, metadata, dan action hierarchy belum diuji.
- **Masalah:** tab tidak memfilter, status mutation tanpa valid transition, proof, amount, timestamp, actor, rejection reason, idempotency, atau membership activation. WhatsApp click tidak boleh mengaktifkan membership.
- **Status final:** **MERGE** — pertahankan route; gabungkan shared transaction review shell dan activation workflow server-side.

## 9. `/admin/affiliate-komisi` — Affiliate & Komisi

- **Tujuan:** affiliate, kode, purchase attribution, komisi (`Frontend/src/lib/admin-console.ts:40`).
- **Sections:** Affiliate, Kode, Pembelian, Komisi.
- **Primary CTA:** “Tambah Affiliate”; **secondary CTA:** “Lihat Detail”.
- **Form:** Nama affiliate, Kode, Catatan; **list/table:** generic list; **modal:** create/detail; **editor/subpage:** tidak ada ledger/detail.
- **Storage:** localStorage generic item.
- **Target:** affiliate/referral member views; **edit memengaruhi target:** **tidak**.
- **Responsive:** generic; ledger/table responsive tidak ada.
- **Masalah:** code uniqueness, attribution, eligibility, reversal, commission ledger, invoice relation, fraud flags, export, dan audit absent.
- **Status final:** **MERGE** — route tetap; workflow dipusatkan dalam affiliate operations dengan payout sebagai linked queue.

## 10. `/admin/pencairan-komisi` — Pencairan Komisi

- **Tujuan:** review request payout dan hasil pembayaran (`Frontend/src/lib/admin-console.ts:41`).
- **Sections:** Menunggu, Diproses, Dibayar, Ditolak.
- **Primary CTA:** perubahan status payout; **secondary CTA:** “Lihat Detail”.
- **Form:** tidak ada create; **list/table:** payout list; **modal:** detail/action; **editor/subpage:** tidak ada reconciliation.
- **Storage:** `store.payouts`; initial fixture `Frontend/src/lib/admin-demo-store.ts:12`; mutation di `Frontend/src/components/admin-screen.tsx:31-35`.
- **Target:** affiliate balance/status; **edit memengaruhi target:** **tidak**.
- **Responsive:** generic dialog; proof/account review tidak tersedia.
- **Masalah:** nominal disamarkan menjadi teks, tidak ada balance check, account verification, proof, maker-checker, reason, immutable ledger, atau idempotency.
- **Status final:** **MERGE** — route/deep link tetap, UI menjadi payout tab/queue dari Affiliate & Komisi.

## 11. `/admin/testimoni` — Testimoni

- **Tujuan:** moderation, featured selection, publication (`Frontend/src/lib/admin-console.ts:42`).
- **Sections:** Kandidat, Disetujui, Unggulan, Ditolak.
- **Primary CTA:** “Tambah Testimoni”; **secondary CTA:** “Lihat Detail”.
- **Form:** Nama tampilan, Kutipan, Persetujuan; **list/table:** generic; **modal:** create/detail; **editor/subpage:** tidak ada media/preview.
- **Storage:** localStorage generic item.
- **Target:** `/testimoni` dan landing showcase; **edit memengaruhi target:** **tidak**; public fixture berasal dari `Frontend/src/lib/public-mock.ts:26-31`.
- **Responsive:** generic; video preview tidak ada.
- **Masalah:** consent hanya text field, bukan provenance/status; avatar/video, context membership, ordering, moderation notes, featured placement, preview, schedule, publish absent.
- **Status final:** **REBUILD**.

## 12. `/admin/blog-seo` — Blog & SEO

- **Tujuan:** artikel, kategori, search metadata, scheduling (`Frontend/src/lib/admin-console.ts:43`).
- **Sections:** Artikel, Kategori, Pencarian, Jadwal.
- **Primary CTA:** “Buat Artikel”; **secondary CTA:** “Lihat Detail”.
- **Form:** Judul artikel, Ringkasan, Kata kunci; **list/table:** generic; **modal:** create/detail; **editor/subpage:** tidak ada rich editor.
- **Storage:** localStorage generic item.
- **Target:** `/blog` dan `/blog/[slug]`; **edit memengaruhi target:** **tidak**; public article memakai `Frontend/src/lib/public-mock.ts:37-54`.
- **Responsive:** generic; long-form editor mobile tidak tersedia.
- **Masalah:** slug, body sanitized, cover, author, category relation, canonical, metadata, preview, scheduling timezone, save/publish, revision absent. Tab “Pencarian” ambigu.
- **Status final:** **REBUILD**.

## 13. `/admin/pengumuman` — Pengumuman

- **Tujuan:** audience, priority, schedule, publication (`Frontend/src/lib/admin-console.ts:44`).
- **Sections:** Terbit, Terjadwal, Draf, Arsip.
- **Primary CTA:** “Buat Pengumuman”; **secondary CTA:** “Lihat Detail”.
- **Form:** Judul, Isi, Sasaran; **list/table:** generic; **modal:** create/detail; **editor/subpage:** tidak ada audience/schedule preview.
- **Storage:** localStorage generic item.
- **Target:** dashboard/member announcements; **edit memengaruhi target:** **tidak**.
- **Responsive:** generic; audience chips/time controls tidak ada.
- **Masalah:** priority tidak menjadi field, target entitlement bebas teks, active window dan timezone absent, CTA/link absent, preview per audience absent, tab status tidak memfilter.
- **Status final:** **REBUILD**.

## 14. `/admin/sensei` — Sensei

- **Tujuan:** profil, expertise, availability, assignment (`Frontend/src/lib/admin-console.ts:45`).
- **Sections:** Aktif, Ketersediaan, Penugasan.
- **Primary CTA:** “Tambah Sensei”; **secondary CTA:** “Lihat Detail”.
- **Form:** Nama Sensei, Keahlian, Ketersediaan; **list/table:** generic; **modal:** create/detail; **editor/subpage:** tidak ada profile/availability calendar.
- **Storage:** localStorage generic item.
- **Target:** class assignment dan display; **edit memengaruhi target:** **tidak**.
- **Responsive:** generic; calendar mobile tidak tersedia.
- **Masalah:** availability bebas teks, tidak ada timezone/conflict, bio/photo, assignment capacity, active dates, audit. Tidak boleh memunculkan Sensei portal/login baru tanpa requirement.
- **Status final:** **REBUILD**.

## 15. `/admin/kelas-jadwal` — Kelas & Jadwal

- **Tujuan:** cohort, class schedule, session, replay (`Frontend/src/lib/admin-console.ts:46`).
- **Sections:** Cohort, Jadwal, Sesi, Replay.
- **Primary CTA:** “Buat Kelas”; **secondary CTA:** “Lihat Detail”.
- **Form:** Nama kelas, Sensei, Jadwal; **list/table:** generic; **modal:** create/detail; **editor/subpage:** tidak ada calendar/session detail.
- **Storage:** localStorage generic item.
- **Target:** class schedule dan replay routes; **edit memengaruhi target:** **tidak**.
- **Responsive:** generic; calendar/list adaptive view tidak ada.
- **Masalah:** Sensei bukan relational picker, jadwal bebas teks, cohort/program/student relation absent, absolute timestamp/timezone/conflict absent, replay asset/access/publish absent.
- **Status final:** **REBUILD**.

## 16. `/admin/analitik` — Analitik

- **Tujuan:** visits, registration, transaction, learning activity (`Frontend/src/lib/admin-console.ts:47`).
- **Sections:** Ringkasan, Akuisisi, Pembelajaran, Transaksi.
- **Primary CTA:** tidak ada; **secondary CTA:** tab.
- **Form:** tidak ada; **list/table:** tiga KPI saja; **modal:** tidak ada; **editor/subpage:** tidak ada report detail.
- **Storage:** angka hard-coded `1.284`, `86`, `42` di `Frontend/src/components/admin-screen.tsx:37`.
- **Target:** keputusan operasional; **edit memengaruhi target:** tidak relevan.
- **Responsive:** summary tiga kolom memakai generic CSS; breakpoint khusus tidak jelas.
- **Masalah:** semua tab menampilkan KPI sama, tanpa period/filter/definition/source/trend/funnel/export/empty/error/freshness. Ini bukan analytics yang dapat diaudit.
- **Status final:** **MERGE** — route tetap; satukan metric cards shared dashboard/reporting, lalu tambah drill-down nyata.

## 17. `/admin/pengaturan-integrasi` — Pengaturan & Integrasi

- **Tujuan:** branding, locale, contact, privacy/security, integration, admin profile (`Frontend/src/lib/admin-console.ts:48`).
- **Sections:** enam tab.
- **Primary CTA:** “Simpan Pengaturan” atau “Simpan Integrasi”; **secondary CTA:** tab.
- **Form:** non-Integrasi tidak punya input; Integrasi hanya select status; **list/table:** integration rows; **modal:** tidak ada; **editor/subpage:** tidak ada typed settings.
- **Storage:** integration status localStorage; initial values di `Frontend/src/lib/admin-demo-store.ts:13`; non-Integrasi hanya menampilkan success notice tanpa mutation (`Frontend/src/components/admin-screen.tsx:42-45`).
- **Target:** global settings/integration runtime; **edit memengaruhi target:** **tidak**.
- **Responsive:** select 44 px; schema dan grouped form absent.
- **Masalah:** tombol save palsu pada lima tab, status integrasi dapat diubah manual tanpa health check, tidak ada secret separation, test connection, callback state, audit, branding preview, locale/timezone, atau session/security controls.
- **Status final:** **REBUILD**.

# Builder Completeness

## Skala

- **Ada:** fungsi nyata tersedia pada implementasi aktual.
- **Parsial:** affordance generik ada tetapi tidak memenuhi domain.
- **Tidak ada:** tidak diimplementasikan.
- **Tidak boleh client-owned:** wajib backend/system logic.

## Program / Journey

| Capability | Aktual | Gap minimum |
|---|---|---|
| Field program | Parsial: nama, deskripsi, level | Stable ID/slug, outcomes, media, availability, program type |
| Level hierarchy | Tidak ada | Program → level N5–N1 → chapter → lesson |
| Journey composition | Tidak ada | Ordered stages/references; unlock hanya read-only system rule |
| Reorder | Tidak ada | Keyboard-accessible reorder dan conflict handling |
| Preview | Tidak ada | Preview public/program dan entitlement variants |
| Save draft | Parsial generic localStorage | API, validation, version/concurrency |
| Publish | Tidak ada | Publish checks, schedule, revision, rollback |
| Pricing | Tidak ada | Typed display config; exact value/promo tetap OPEN |

## Latihan, Quiz, dan Checkpoint

| Capability | Aktual | Gap minimum |
|---|---|---|
| Prompt | Parsial text input | Rich controlled content, media, Japanese text |
| Options | Tidak memadai: satu textarea | Repeatable choices, IDs, reorder |
| Correct answer | Tidak ada | Secure server-owned answer key |
| Explanation | Parsial text | Structured explanation/media |
| Taxonomy | Tidak ada | Level, chapter, topic, difficulty, tags |
| Preview | Tidak ada | Learner runner preview tanpa membocorkan secret |
| Save/publish | Local draft only | Validation, version, publication workflow |
| Rules | Tidak ada | Configurable passing/availability; score/attempt server-owned |

## Flashcard

| Capability | Aktual | Gap minimum |
|---|---|---|
| Deck metadata | Tidak ada | Title, level/chapter, tags, visibility |
| Card fields | Generic title/detail saja | Front/back, `<ruby><rt>`, examples, audio/image |
| Reorder/bulk entry | Tidak ada | Accessible ordering, duplicate validation, optional import report |
| Flip preview | Tidak ada | Pertahankan `rotateY` dan rasa 600 ms; reduced-motion fallback |
| Save/publish | Local generic draft | Versioned deck publication dan target binding |

## Try Out

| Capability | Aktual | Gap minimum |
|---|---|---|
| Sections/parts | Tidak ada | Structured sections, instructions, question references |
| Duration/timer | Tidak ada | Configurable rule, enforced server-side, refresh-safe |
| Score/pass/review | Tidak ada | Server-owned, versioned per attempt |
| Reorder | Tidak ada | Sections/questions ordering |
| Preview | Tidak ada | Full runner preview with safe answer policy |
| Save/publish | Local question draft only | Assessment-level lifecycle |
| Race safety | Tidak ada | stale autosave, double submit, manual/auto collision, idempotency |

## Mini Checkpoint

| Capability | Aktual | Gap minimum |
|---|---|---|
| Hierarchy | Tidak ada | Wajib `level → sesi → part`, hanya N5–N2 |
| Entitlement | Tidak ada | LMS + Sensei only, enforced backend |
| Timer/passing score | Tidak ada | Configurable; pass saat `score >= passing_score` |
| Question authoring | Parsial generic | Shared assessment family dengan variant Mini Checkpoint |
| Reorder/preview/save/publish | Tidak ada | Semua perlu dibangun dengan validation dan version |

## Placement

| Capability | Aktual | Gap minimum |
|---|---|---|
| Question fields | Parsial | Options, scoring/mapping, explanation, ordering |
| Recommendation mapping | Text bebas | Versioned structured mapping; exact rules OPEN |
| Lead review | Tidak ada | Queue/detail, consent, owner, status, retention |
| Result preview | Tidak ada | Preview recommendation variants |
| Save/publish | Local draft | Versioned placement form; active version per attempt |
| Security | Tidak ada | PII authorization, score ownership, answer secrecy |

## Landing Page

| Capability | Aktual | Gap minimum |
|---|---|---|
| Section fields | Judul/isi/tombol | Typed sections, media, CTA destination, visibility |
| Reorder | Tidak ada | Canvas/list reorder dengan keyboard controls |
| Preview | Tidak ada | Responsive preview desktop/tablet/mobile |
| Save | Local generic item | Page draft with schema validation |
| Publish/schedule | Tidak ada | Publication lifecycle, version history, restore |
| Pricing section | Tab label saja | Product reference; unresolved values tetap OPEN |

## Blog

| Capability | Aktual | Gap minimum |
|---|---|---|
| Fields | Judul/ringkasan/kata kunci | Slug, body, category, cover, author, SEO/canonical |
| Editor | Tidak ada | Controlled rich editor + sanitization |
| Reorder | Tidak relevan untuk body saat ini | Block/order bila schema memakai blocks |
| Preview | Tidak ada | Article preview dan social/search preview |
| Save/publish | Local draft only | Draft, schedule, publish, revision, unique slug |

## Testimoni

| Capability | Aktual | Gap minimum |
|---|---|---|
| Fields | Nama/kutipan/persetujuan text | Context, avatar/video, consent provenance/status |
| Reorder/featured | Tab label saja | Featured slots dan ordering |
| Preview | Tidak ada | Landing/testimonial-page placement preview |
| Save/publish | Local draft only | Moderation, approve/reject reason, publish |

## Pengumuman

| Capability | Aktual | Gap minimum |
|---|---|---|
| Fields | Judul/isi/sasaran | Priority, CTA, audience rule, start/end absolute time |
| Reorder | Tidak ada | Priority/order bila beberapa aktif |
| Preview | Tidak ada | Preview per entitlement/device |
| Save/publish | Local draft only | Draft, schedule, publish, archive |

## Replay / Media

| Capability | Aktual | Gap minimum |
|---|---|---|
| Replay metadata | Hanya class title/Sensei/jadwal generic | Title, description, session/cohort relation, attachments |
| Media picker/upload | Tidak ada | Shared library, validation, metadata, alt/caption, usage references |
| Reorder | Tidak ada | Replay/attachment order jika dibutuhkan |
| Preview | Tidak ada | Secure playback/thumbnail preview |
| Save/publish | Local generic draft | Access-aware publish/unpublish |
| Security | Tidak ada | Private object access, signed delivery, entitlement/ownership |

Kesimpulan builder: semua tombol create saat ini hanya menghasilkan `Item {id,title,detail,status}` (`Frontend/src/components/admin-screen.tsx:17-22`). Tidak ada builder domain yang lengkap sampai field, reorder, preview, save, dan publish.

# Reusable Component Candidates

| Kandidat | Dipakai oleh | Batas tanggung jawab |
|---|---|---|
| `AdminDataTable` | Users, invoices, affiliates, payouts, content lists | Sort/filter/pagination/selection/responsive rows; bukan fetch policy |
| `ReviewQueueLayout` | Invoice, payout, testimonial, placement leads | Queue + detail + action confirmation + audit metadata |
| `PublicationBar` | Landing, Program, Curriculum, Assessment, Blog, Testimonial, Announcement | Draft state, validation, preview, save, schedule, publish; API tetap per resource |
| `StatusBadge` | Semua list | Typed status/tone; hindari satu `status-pending` untuk semua status |
| `FilterToolbar` | Semua list/report | Search, status, date, audience, reset, saved query bila perlu |
| `BuilderShell` | Landing, Journey, Lesson, Flashcard, Assessment | Outline/sidebar, editor, preview, sticky action bar |
| `SortableList` | Sections, chapters, lessons, cards, questions | Pointer + keyboard reorder, announce position untuk screen reader |
| `MediaPicker` | Landing, Lesson, Flashcard, Blog, Testimonial, Replay | Asset reference dan usage; bukan upload secret |
| `ScheduleFields` | Blog, Announcement, Class, Publish | Absolute timestamp + display Asia/Jakarta; validation |
| `RelationPicker` | Sensei, cohort, program, lesson, assessment | Stable ID selection, search, broken-reference state |
| `RevisionHistory` | Semua published content/config | Actor, timestamp, diff, restore confirmation |
| `PreviewPane` | Landing, Blog, Announcement, Lesson, Flashcard, Assessment | Explicit target/audience/device; read-only rendering |
| `UnsavedChangesGuard` | Semua editor | Dirty state, navigation warning, save failure protection |
| `EmptyLoadingError` | Semua remote surfaces | Konsisten dan accessible |
| `MetricCard` | Dashboard dan Analitik | Value, period, delta, definition, source, freshness |
| `IntegrationHealthRow` | Settings | Provider state dari backend, test/reconnect; tidak menerima status manual |

Reuse bukan berarti satu `AdminScreen` generik untuk semua domain. Shared shell boleh sama; schema, validation, transition, dan actions harus spesifik domain.

# Data Connection Matrix

## Definisi klasifikasi

- **CONNECTED DEMO:** perubahan Admin mengubah target demo yang dituju.
- **ADMIN ONLY:** data berubah/persist di Admin saja.
- **STATIC TARGET:** target punya fixture/hard-coded data sendiri.
- **DUPLICATE DATA SOURCE:** Admin dan target merepresentasikan konsep sama melalui source terpisah.

Hasil audit: **CONNECTED DEMO Admin-to-target = 0**. `useAdminStore` hanya dipakai `AdminScreen` (`Frontend/src/components/admin-screen.tsx:6,9`); target tidak membaca `ADMIN_STORE_KEY`. Semua mutation disimpan pada localStorage browser (`Frontend/src/lib/admin-demo-store.ts:16-23`).

| Admin route | Source Admin | Target | Klasifikasi | Edit mengubah target? |
|---|---|---|---|---|
| `/admin` | Hard-coded JSX | 16 admin route | STATIC TARGET | Tidak |
| `/admin/landing-page` | localStorage `items.landing-page` | `/` hard-coded JSX | DUPLICATE DATA SOURCE | Tidak |
| `/admin/program-harga` | localStorage | `/program`, `/program/[level]`, checkout | DUPLICATE DATA SOURCE | Tidak |
| `/admin/kurikulum-materi` | localStorage | journey/lesson/flashcard mocks | DUPLICATE DATA SOURCE | Tidak |
| `/admin/bank-soal` | localStorage | practice/tryout/checkpoint fixtures | DUPLICATE DATA SOURCE | Tidak |
| `/admin/placement-hasil` | localStorage | placement runner/result fixtures | DUPLICATE DATA SOURCE | Tidak |
| `/admin/pengguna-akses` | localStorage | account/membership/certificate static flows | DUPLICATE DATA SOURCE | Tidak |
| `/admin/invoice` | localStorage `invoices` | public invoice/membership state | ADMIN ONLY + STATIC TARGET | Tidak |
| `/admin/affiliate-komisi` | localStorage | affiliate/referral target | DUPLICATE DATA SOURCE | Tidak |
| `/admin/pencairan-komisi` | localStorage `payouts` | affiliate balance/status | ADMIN ONLY + STATIC TARGET | Tidak |
| `/admin/testimoni` | localStorage | `public-mock.ts` testimonials | DUPLICATE DATA SOURCE | Tidak |
| `/admin/blog-seo` | localStorage | `public-mock.ts` articles | DUPLICATE DATA SOURCE | Tidak |
| `/admin/pengumuman` | localStorage | dashboard/static announcement UI | DUPLICATE DATA SOURCE | Tidak |
| `/admin/sensei` | localStorage | schedule/class display | DUPLICATE DATA SOURCE | Tidak |
| `/admin/kelas-jadwal` | localStorage | class/replay pages | DUPLICATE DATA SOURCE | Tidak |
| `/admin/analitik` | hard-coded component values | tidak ada event pipeline | STATIC TARGET | Tidak |
| `/admin/pengaturan-integrasi` | localStorage status | runtime integrations/settings | ADMIN ONLY + STATIC TARGET | Tidak |

Jumlah route dengan **CONNECTED DEMO: 0/17**. Matrix memakai multi-label saat Admin-only state berdampingan dengan target statis; ini tidak mengubah hitungan route.

# UX/Copy Problems

## Copy aktual dan rekomendasi replacement

Exact visible copy dari Figma Pages 08–11 tetap authority. Semua replacement di bawah adalah **rekomendasi audit, bukan approved copy**. Jangan implementasikan verbatim sebelum diverifikasi terhadap Figma.

| Aktual | Masalah | Rekomendasi audit, belum approved |
|---|---|---|
| “Kelola data dan tindakan untuk bagian ini.” | Sama pada semua domain, tidak menjelaskan hasil | Jelaskan objek, status, dan akibat tindakan per tab |
| “Lihat Detail” | Tidak membedakan review, edit, preview | “Tinjau invoice”, “Edit artikel”, “Preview halaman” sesuai aksi |
| “berhasil disimpan” | Menyiratkan persistence/target update | Untuk demo: “Tersimpan di browser ini”; production: konfirmasi resource/version |
| “Kelola sekarang” pada 16 card | Repetitif, tanpa prioritas | CTA task-specific dan hanya untuk quick action terpilih |
| “Keluar Admin” menuju `/` | Menyiratkan logout yang tidak terjadi | Hubungkan logout nyata; bila hanya kembali, label “Kembali ke situs” |
| “Pencarian” sebagai tab Blog | Ambigu | “SEO & metadata pencarian” bila sesuai Figma |
| “Persetujuan” sebagai text field Testimoni | Tidak memodelkan consent | Status consent + source + timestamp + evidence reference |
| “Status layanan” dengan select manual | Status teknis seolah editable | Read-only health + “Uji koneksi”/“Hubungkan ulang” |

## False affordances

- Dashboard search tidak bekerja (`Frontend/src/app/admin/page.tsx:6`).
- Tabs hanya mengubah state heading (`Frontend/src/components/admin-screen.tsx:10,37`); list tidak difilter.
- Tombol save non-Integrasi hanya menampilkan notice (`Frontend/src/components/admin-screen.tsx:44`).
- Status integration dapat dipilih manual (`Frontend/src/components/admin-screen.tsx:45`).
- “Riwayat Versi”, “Jadwal”, “Pencarian”, “Perpustakaan Konten”, “Lead”, dan “Hasil Evaluasi” tidak punya workflow spesifik.
- Generic create fields ke-3 memakai nama dinamis tetapi data akhirnya dibuang; save hanya membaca `title` dan `detail` (`Frontend/src/components/admin-screen.tsx:19-21`).

## Design system audit

- **Kekuatan:** canvas/token konsisten; CTA orange/navy; controls umumnya minimum 44 px; sidebar desktop/mobile; focus management drawer; modal memiliki `role="dialog"`, `aria-modal`, dan labelled title (`Frontend/src/components/admin-screen.tsx:40`).
- **Typografi:** banyak ukuran admin 8–11 px pada CSS (`Frontend/src/app/globals.css:239-254`, `Frontend/src/app/globals.css:678-686`), berisiko keterbacaan meski kontras cukup. Gunakan body minimum yang terbaca dan hierarchy konsisten.
- **Warna/status:** generic row selalu memakai `status-pending` terlepas dari nilai status (`Frontend/src/components/admin-screen.tsx:37`), sehingga semantic color salah.
- **Focus:** drawer ditangani baik, tetapi dialog tidak terlihat memiliki focus trap, fokus awal, Escape handler, atau return focus.
- **Form:** label tersedia, tetapi error inline, hint, validation summary, required marker, dirty state, dan save failure tidak ada.
- **Tables:** CSS table foundation ada (`Frontend/src/app/globals.css:195-200`), tetapi generic console memakai article rows. Data operasional padat memerlukan header, sort, filter, pagination, dan mobile card transform.
- **Motion:** sidebar memakai transition left (`Frontend/src/app/globals.css:474`), tetapi tidak tampak reduced-motion override khusus Admin. Tambahkan fallback.
- **Responsive:** shell mobile ada pada breakpoint 1024, tab dapat scroll, modal bounded. Generic summary/action grid masih tiga kolom tanpa breakpoint yang jelas (`Frontend/src/app/globals.css:682-683`).
- **Density:** 17 menu selalu terbuka menghasilkan sidebar panjang; group accordion/collapse dibutuhkan pada viewport pendek.
- **Legacy style caveat:** `Frontend/src/app/stitch-visual.css` memiliki selector admin, tetapi audit tidak mengklaim file itu digunakan hanya karena style tersedia. Penggunaan harus dibuktikan dari import/runtime sebelum dianggap aktif.

## Risiko UX produksi

- Tidak ada loading/error/offline/empty yang konsisten.
- Tidak ada destructive confirmation atau reason requirement.
- Tidak ada audit actor/timestamp.
- Tidak ada distinction save draft versus publish.
- Tidak ada cross-resource broken-reference warning.
- Tidak ada concurrent edit handling.
- Tidak ada role/permission visibility; granularity permission masih OPEN.

# Recommended Wireframes

## Dashboard bento

```text
┌ Admin Dashboard ───────────── [periode] [refresh] ┐
│ Fokus hari ini      │ Sistem     │ Jadwal dekat   │
│ invoice 5 [Tinjau]  │ Storage OK │ 10:00 N4       │
│ payout 2  [Tinjau]  │ Email warn │ konflik 1      │
├─────────────────────┼────────────┴────────────────┤
│ KPI + delta/source  │ Funnel / tren              │
├─────────────────────┴─────────────────────────────┤
│ Review & publication queue │ Aktivitas terbaru    │
└───────────────────────────────────────────────────┘
```

## Family list/table

```text
┌ Judul domain ─────────────── [Buat baru] ┐
│ Search | Status | Tanggal | Filter | Reset│
├───────────────────────────────────────────┤
│ □ Nama       Status   Owner   Updated  ⋮  │
│ □ Item A     Draft    Admin   09:30   ⋮  │
│ □ Item B     Terbit   Admin   Kemarin ⋮  │
├───────────────────────────────────────────┤
│ 1–20 dari 84                 < 1 2 3 >    │
└───────────────────────────────────────────┘
Mobile: tiap row menjadi card; aksi masuk overflow menu.
```

Cocok untuk Pengguna, Program, Content, Sensei, Affiliate. Status dan kolom harus domain-specific.

## Family editor/builder

```text
┌ Breadcrumb ─ Resource ───── [Preview] [Save] [Publish] ┐
│ Outline/blocks   │ Editor fields       │ Live preview   │
│ + Section        │ title               │ target/device  │
│ ≡ Hero           │ content/media       │                │
│ ≡ Benefits       │ CTA/reference       │                │
│ ≡ FAQ            │ validation          │                │
├──────────────────┴─────────────────────┴────────────────┤
│ Unsaved changes | version | validation errors           │
└─────────────────────────────────────────────────────────┘
Mobile: Outline → Edit → Preview sebagai mode, bukan 3 kolom sempit.
```

Cocok untuk Landing, Program/Journey, Lesson, Flashcard, Assessment, Blog, Testimoni, Pengumuman.

## Family review queue

```text
┌ Review queue ─── filters/SLA ─────────────────────┐
│ Queue list         │ Detail / evidence            │
│ INV-001  Menunggu  │ payer, amount, proof         │
│ INV-002  Review    │ timeline, related account    │
│                    │ [Tolak + alasan] [Verifikasi]│
└───────────────────────────────────────────────────┘
Mobile: list route/state dahulu, detail full-screen berikutnya.
```

Cocok untuk Invoice, Payout, Placement leads/results, Testimoni moderation.

## Family calendar

```text
┌ Kelas & Jadwal ─ [Buat sesi] ┐
│ Month | Week | Agenda  TZ: Asia/Jakarta │
├───────────────┬─────────────────────────┤
│ Calendar      │ Selected session        │
│ conflicts     │ cohort, Sensei, time    │
│               │ meeting, replay, status │
└───────────────┴─────────────────────────┘
Mobile: default Agenda; calendar opsional.
```

Cocok untuk Kelas/Jadwal, Sensei availability, Blog/Announcement publication calendar.

## Family analytics

```text
┌ Analitik ─ [7 hari ▼] [Bandingkan ▼] [Export] ┐
│ KPI + delta + definition + freshness          │
├──────────────────────┬────────────────────────┤
│ Trend                │ Funnel                 │
├──────────────────────┼────────────────────────┤
│ Breakdown table      │ Alerts/anomalies       │
└──────────────────────┴────────────────────────┘
```

Setiap metric harus memiliki definisi server-side dan source; jangan tampilkan angka fixture sebagai insight.

## Family settings

```text
┌ Pengaturan ─ Branding | Locale | Kontak | Security | Integrasi ┐
│ Section title                                      │
│ typed field + hint + validation                    │
│ secrets: masked/server-owned                       │
│ integration: health, checked time, [Test] [Connect]│
│                         [Batalkan] [Simpan]         │
└────────────────────────────────────────────────────┘
```

Gunakan subpage/tab route-aware agar refresh/back mempertahankan konteks.

# KEEP / MERGE / REBUILD / REMOVE

## KEEP

**Route:** pertahankan seluruh 17 route sebagai alamat domain/deep link sampai authority requirement menyatakan lain. Tidak ada dasar audit untuk menghapus route.

**Komponen/fondasi:**

- `AdminShell` composition (`Frontend/src/components/admin-shell.tsx:4-12`).
- Registry menu terpusat sebagai ide, dengan type-safe consistency check.
- Grouped navigation, active state, mobile focus loop, Escape, backdrop (`Frontend/src/components/admin-navigation.tsx:14-28`).
- Visual tokens, 44 px controls, bounded scrolling modal, tab overflow.
- Catch-all dapat dipertahankan hanya untuk thin route dispatch; jangan biarkan seluruh domain berhenti pada satu generic screen.

## MERGE

**Route tetap, workflow digabung:**

1. Invoice, Affiliate, dan Payout memakai shared transaction/review primitives; Payout menjadi linked queue dalam Affiliate tetapi `/admin/pencairan-komisi` tetap deep link.
2. Landing, Blog, Testimoni, Pengumuman masuk satu Content Studio lifecycle; route masing-masing tetap.
3. Quiz/Checkpoint/Try Out/Mini Checkpoint memakai satu configurable assessment family; Placement tetap terpisah karena mapping/lead rules berbeda.
4. Sensei, Cohort/Jadwal, Session, Replay memakai relation picker, calendar, media, dan publication shared.
5. Dashboard dan Analitik berbagi metric definitions/components, bukan hard-coded copy.
6. Branding, locale, contact, privacy/security, integration, admin profile menjadi route-aware settings tabs/subpages.

## REBUILD

**Workflow yang harus dibangun ulang:**

- Generic `AdminScreen` CRUD untuk 16 domain; pertahankan shell, ganti isi dengan list/editor/review/report sesuai domain.
- Publication lifecycle: draft, validate, preview, schedule, publish, unpublish, revisions.
- Program/journey hierarchy dan curriculum builders.
- Assessment authoring dengan server-owned rules/answers.
- Placement lead/result operations.
- User/access operations dengan authorization dan audit.
- Transaction verification dan payout reconciliation.
- Typed settings dan integration health.
- Data boundaries: local repository/mock diganti API adapter; jangan sebar fetch dalam JSX.

## REMOVE

**Bukan route. Hapus workflow/affordance berikut:**

- Search dashboard sampai benar-benar berfungsi.
- 16 duplicate dashboard cards; ganti quick actions terbatas dan queues.
- Tombol save yang hanya memunculkan notice tanpa menyimpan.
- Manual integration health select.
- Generic “Lihat Detail” untuk semua domain.
- Tab yang hanya mengganti heading tanpa filter/content.
- Status color `pending` untuk semua status.
- “Keluar Admin” yang sebenarnya hanya link ke homepage; ganti logout nyata atau label kembali situs.
- Create field yang dikumpulkan tetapi dibuang saat save.

# Proposed Implementation Batches

Dokumen ini tidak mengimplementasikan batch. Urutan berikut menjaga perubahan kecil, dapat diuji, dan tidak menebak kontrak belum final.

## Batch 0 — keputusan dan kontrak OPEN

- Verifikasi exact Figma copy Pages 08–11 untuk seluruh label, CTA, empty/error, confirmation.
- Putuskan role/permission Admin, resource ownership, dan audit retention.
- Putuskan publication lifecycle, revision/restore, scheduling, optimistic concurrency.
- Putuskan harga/promo/catalog final, tanpa memasukkan nilai sementara sebagai fakta.
- Putuskan upload limits, MIME, storage visibility, signed media access.
- Putuskan assessment limits/timer/score/review/attempt rules dan Placement recommendation mapping.
- Putuskan production domains, WhatsApp details, analytics definitions, commission/payout policy.

## Batch 1 — Admin foundation dan truthful UI

- Type-safe route/menu registry dengan 17 logical routes.
- Breadcrumb, route-aware tabs/subpages, shared page states.
- Hapus false affordances dan duplicate dashboard cards.
- Tambah accessible table, dialog focus management, status semantics, mobile breakpoints, reduced motion.
- Buat API/repository boundary tanpa mengarang endpoint final.

## Batch 2 — dashboard dan operational queues

- Bento dashboard dari real aggregate contracts.
- Invoice review queue dengan proof, valid transitions, reason, idempotent activation.
- Affiliate ledger dan payout queue/reconciliation.
- Activity/audit feed dan integration health summary.

## Batch 3 — Program, Journey, Kurikulum, Media

- Program → level → chapter → lesson hierarchy.
- Journey composition, reorder accessible, references, validation.
- Typed lesson blocks dan shared media library/picker.
- Preview, draft/save, publication bar, revisions.
- Entitlement/unlock hanya read-only references; enforcement backend.

## Batch 4 — assessment family dan Placement

- Shared builder untuk Latihan/Quiz, Checkpoint, Try Out, Mini Checkpoint.
- Variant configs, sections, question bank, reorder, runner preview.
- Dedicated Placement builder + lead/result review.
- Backend-owned answer key, score, timer, attempt, idempotency, stale autosave protection.
- Mandatory race tests: stale autosave, double submit, manual/auto collision, refresh-safe timer, answer secrecy.

## Batch 5 — Content Studio

- Landing section builder.
- Blog rich content/SEO/scheduling.
- Testimonial moderation/consent/media/featured order.
- Announcement audience/priority/window/preview.
- Shared publication queue, calendar, revision history, broken-reference checks.

## Batch 6 — People, Classes, Replay

- User/access profile, entitlement timeline, certificate lifecycle.
- Sensei directory and availability.
- Cohort/session calendar dengan absolute timestamp dan display Asia/Jakarta.
- Replay/media binding dan secure access.
- Tidak membuat Sensei portal/login tanpa requirement baru.

## Batch 7 — Settings dan Analytics

- Typed branding/locale/contact/privacy forms.
- Secret-safe integrations, connect/test/reconnect, health timestamps.
- Analytics period/filter/definitions/trends/funnel/export setelah event/data contract nyata tersedia.
- Dashboard dan reports memakai source yang sama.

## Batch 8 — production hardening

- Server-side authorization/validation untuk setiap mutation.
- Rich-content sanitization, upload validation, private media policy.
- Loading/error/offline/empty, retry, save failure, unsaved changes, concurrency conflict.
- WCAG 2.2 AA keyboard/focus/contrast/target-size audit.
- E2E critical journeys hanya setelah functional MVP disetujui; jangan target production data.

## OPEN items tersisa

1. Exact copy Figma untuk replacement yang diusulkan; semua wording audit belum approved.
2. Final route/subroute editor strategy dan backward-compatible aliases.
3. Admin permission granularity.
4. Harga, promosi, catalog, commission, payout, assessment parameters.
5. Placement recommendation algorithm dan lead retention/consent operations.
6. Upload limits, storage visibility, replay/media access.
7. Analytics event taxonomy, metric definitions, periods, export scope.
8. Publication approver model, revision retention, restore permissions.
9. WhatsApp operational details dan production domains.
10. Apakah style dalam `Frontend/src/app/stitch-visual.css` diimpor/aktif pada runtime; keberadaan selector saja bukan bukti penggunaan.
