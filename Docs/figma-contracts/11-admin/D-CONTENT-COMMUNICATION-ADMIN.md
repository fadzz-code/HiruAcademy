# D-CONTENT-COMMUNICATION — Page 11 / Admin

> Figma source: **Page 11 — E2E / Admin** (`388:23`)  
> Layer: **D — Konten & Komunikasi** (`388:27`)  
> Screens: **ADMIN / 18–23 + ADMIN / 30 — Pengelolaan Landing Page**  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Layer hierarchy: **VERIFIED**
- Visible copy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit prototype destinations: **VERIFIED where listed**
- Counts, dates, user identity, reach, publication status, report totals, template version, and SEO/version data: **DYNAMIC / FIXTURE where noted**
- Publication, moderation, delivery, export, privacy, and audit actions: **BACKEND / PERMISSION AUTHORITY LATER**
- Do not paraphrase VERIFIED copy.
- Do not implement real email delivery, moderation persistence, publication infrastructure, file storage, or CMS backend during this contract phase.

---

# Layer D frame inventory

| Screen | Figma frame |
|---|---|
| ADMIN / 18 — Announcement Management | `432:1609` |
| ADMIN / 19 — Pengelolaan Blog | `432:1743` |
| ADMIN / 20 — Moderasi Testimoni | `432:1941` |
| ADMIN / 21 — Moderasi Feedback Akhir Level | `432:2076` |
| ADMIN / 22 — Community Moderation | `432:2199` |
| ADMIN / 23 — Notification Templates | `432:2320` |
| ADMIN / 30 — Pengelolaan Landing Page | `805:2532` |

---

# Shared Admin Console shell

Reuse the existing Admin Console navigation from Layers B/C.

## Exact visible navigation copy

- `Hiru Academy`
- `ADMIN CONSOLE`
- `Dashboard`
- `Program`
- `Content Builder`
- `Placement & Hasil`
- `Pengguna & Akses`
- `Transaksi`
- `Konten & Komunikasi`
- `Sensei & Cohort`
- `Analitik`
- `Pengaturan`
- `Keluar Admin`

## Common verified destinations

- Dashboard → `431:152`
- Program → `431:218`
- Content Builder → `431:406`
- Placement & Hasil → `431:1116`
- Pengguna & Akses → `432:845`
- Transaksi → `432:1192`
- Konten & Komunikasi → `432:1609`
- Sensei & Cohort → `432:2770`
- Analitik → `432:2934`
- Pengaturan → `432:3681`

Do not create a second Admin navigation architecture for content/communication modules.

---

# ADMIN / 18 — Announcement Management

**Figma frame:** `432:1609`

## Exact visible copy

### Header

- `ADMIN • COMMUNICATION`
- `Announcement Management`
- `Kelola audience, channel, priority, schedule, publish state, dan riwayat pengumuman.`
- `Dashboard`
- `Buat Pengumuman`

Destinations:

- `Dashboard` → `431:152`
- `Buat Pengumuman` → `816:2730` — new-announcement editor state outside Layer D

### Summary

- `Published`
- `Dinamis`
- `Pengumuman aktif.`

- `Scheduled`
- `Dinamis`
- `Menunggu waktu publikasi.`

- `Draft`
- `Dinamis`
- `Belum dipublikasikan.`

- `Audience reach`
- `Dinamis`
- `Dihitung dari target audience.`

### Announcement list

- `Daftar pengumuman`
- `⌕`
- `Cari judul atau audience`

Fixtures:

- `知`
- `Informasi journey terbaru`
- `Semua student`
- `Published`

- `!`
- `Perubahan jadwal cohort`
- `Belajar dengan Sensei`
- `Scheduled`

- `知`
- `Materi baru Chapter 4`
- `N4 active`
- `Draft`

- `!`
- `Maintenance sistem`
- `Semua pengguna`
- `Published`

- `Lihat Arsip`

`Lihat Arsip` → `653:2696` — archive confirmation/state outside Layer D

### Editor

- `DRAFT • INFO`
- `Editor pengumuman`
- `Draft`

Fields:

- `Judul`
- `Informasi terbaru untuk siswa Hiru`
- `Teks bantuan opsional`

- `◇`
- `Ringkasan`

- `Tipe`
- `Info`
- `⌄`

- `Audience`
- `Semua Student`
- `⌄`

- `Channel`
- `In-App`
- `⌄`

- `Publikasi`
- `Publish Sekarang`
- `⌄`

- `Mulai`
- `Tanggal/waktu dari admin`
- `Teks bantuan opsional`

- `Berakhir (Opsional)`
- `Tanggal/waktu dari admin`
- `Teks bantuan opsional`

### Preview

- `Preview`
- `ℹ`
- `Pengumuman`
- `Informasi terbaru untuk siswa Hiru.`

### Actions

- `Simpan Draft`
- `Publish`

Destinations:

- `Simpan Draft` → `657:2891`
- `Publish` → `653:2667`

### Publish checklist

- `Publish checklist`
- `✓`
- `Judul dan pesan terisi`
- `✓`
- `Audience dipilih`
- `✓`
- `Channel valid`
- `!`
- `Waktu publikasi valid`
- `!`
- `Preview disetujui`

### Audience options

- `Target audience`

- `全`
- `Semua student`
- `Free Member, Belajar Mandiri, Belajar dengan Sensei.`

- `級`
- `Level tertentu`
- `N5, N4, N3, atau program lain.`

- `班`
- `Cohort`
- `Target cohort Belajar dengan Sensei.`

- `役`
- `Role`
- `Student atau admin.`

### Announcement

- `!`
- `Pengumuman`
- `Pengumuman urgent dan audience besar perlu review sebelum publish.`

## Rule

Announcement audience is configuration-driven. Do not hardcode all announcements to every student.

---

# ADMIN / 19 — Pengelolaan Blog

**Figma frame:** `432:1743`

## Exact visible copy

### Header

- `ADMIN • EDITORIAL CONTENT`
- `Blog Management`
- `Kelola artikel, kategori, thumbnail, SEO/meta, featured state, jadwal, dan publikasi.`
- `Kelola Kategori`
- `Artikel Baru`

Destinations:

- `Kelola Kategori` → `816:2742`
- `Artikel Baru` scrolls to editor

### Summary

- `Published`
- `Dinamis`
- `Artikel aktif.`

- `Draft`
- `Dinamis`
- `Belum dipublikasikan.`

- `Scheduled`
- `Dinamis`
- `Menunggu waktu publikasi.`

- `Featured`
- `Dinamis`
- `Artikel utama yang ditonjolkan.`

### Article list

- `⌕`
- `Cari artikel, kategori, atau status`

Fixtures:

- `道`
- `Belajar Efektif`
- `Rutinitas belajar N4`
- `Belajar Efektif • slug dan waktu publikasi dari sistem`
- `Featured`
- `Published`
- `Edit`

- `文`
- `Grammar`
- `Memahami pola kalimat`
- `Grammar • slug dan waktu publikasi dari sistem`
- `Published`
- `Edit`

- `聴`
- `Listening`
- `Latihan listening pemula`
- `Listening • slug dan waktu publikasi dari sistem`
- `Scheduled`
- `Edit`

- `試`
- `JLPT`
- `Persiapan Try Out`
- `JLPT • slug dan waktu publikasi dari sistem`
- `Draft`
- `Edit`

- `働`
- `Karier`
- `Persiapan kerja ke Jepang`
- `Karier • slug dan waktu publikasi dari sistem`
- `Draft`
- `Edit`

All article `Edit` actions scroll to the shared editor.

### Pagination

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Article editor

- `FEATURED • PUBLISHED`
- `Editor artikel`
- `Published`

Fields:

- `Judul Artikel`
- `Strategi membangun rutinitas belajar N4`
- `Teks bantuan opsional`

- `Kategori`
- `Belajar Efektif`
- `⌄`

- `Status`
- `Published`
- `⌄`

- `◇`
- `Ringkasan`
- `◇`
- `Ringkasan`

### Thumbnail

- `道`
- `FEATURED`
- `Thumbnail dan alt text`
- `Gambar harus memiliki alt text dan crop yang sesuai.`
- `Ganti Thumbnail`

`Ganti Thumbnail` → `816:2742`

### SEO & metadata

- `SEO & Metadata`

- `Slug`
- `rutinitas-belajar-n4`
- `Teks bantuan opsional`

- `Meta Title`
- `Judul SEO`
- `Teks bantuan opsional`

- `◇`
- `Ringkasan`

### Preview / publish

- `Preview`
- `Simpan Draft`
- `Publish`

Destinations:

- Preview action scrolls to public preview
- `Simpan Draft` → `657:2830`
- `Publish` → `649:2603` — publication-validation flow

### Public preview

- `Preview publik`
- `道`
- `FEATURED`
- `Strategi membangun rutinitas belajar N4`
- `Belajar Efektif • 8 menit baca`

### Publish checklist

- `Publish checklist`
- `✓`
- `Judul dan isi lengkap`
- `✓`
- `Kategori dipilih`
- `✓`
- `Thumbnail + alt text`
- `!`
- `SEO metadata valid`
- `!`
- `Preview disetujui`

### Editorial rules

- `Editorial rules`

- `源`
- `Source`
- `Gunakan sumber yang dapat dipertanggungjawabkan.`

- `像`
- `Media`
- `Pastikan hak penggunaan dan alt text.`

- `主`
- `Featured`
- `Hanya satu featured utama per konteks.`

- `歴`
- `Revision`
- `Perubahan publish perlu riwayat revisi.`

### Announcement

- `!`
- `Pengumuman`
- `Artikel tidak dapat dipublikasikan jika metadata atau media wajib belum valid.`

## Rule

Blog publication is gated by content/media/metadata validation and revision history.

---

# ADMIN / 20 — Moderasi Testimoni

**Figma frame:** `432:1941`

## Exact visible copy

### Header

- `ADMIN • SOCIAL PROOF GOVERNANCE`
- `Moderasi Testimoni`
- `Tinjau isi, media, persetujuan publikasi, privacy, approval, rejection, dan featured state.`
- `Ekspor Izin`
- `Tambah Testimoni`

Destinations:

- `Ekspor Izin` → `649:2839`
- `Tambah Testimoni` scrolls to the review/editor area

### Summary

- `Pending review`
- `Dinamis`
- `Kandidat dari feedback akhir level dan input manual.`

- `Approved`
- `Dinamis`
- `Dapat tampil publik.`

- `Featured`
- `Dinamis`
- `Ditonjolkan pada halaman publik.`

- `Izin bermasalah`
- `Dinamis`
- `Tidak boleh dipublikasikan.`

### Filters

- `⌕`
- `Cari nama termasking, plan, atau status`
- `Semua`
- `Pending`
- `Approved`
- `Featured`
- `Izin bermasalah`

### Testimonial queue

Fixtures:

- `Member •••1`
- `Belajar Mandiri • data pengguna dimasking`
- `Izin valid`
- `Pending`
- `Review`

- `Member •••2`
- `Belajar dengan Sensei • data pengguna dimasking`
- `Izin valid`
- `Approved`
- `Review`

- `Member •••3`
- `Free → LMS • data pengguna dimasking`
- `Izin valid`
- `Approved`
- `Review`

- `Member •••4`
- `Belajar Mandiri • data pengguna dimasking`
- `Tanpa izin`
- `Rejected`
- `Review`

- `Member •••5`
- `Belajar dengan Sensei • data pengguna dimasking`
- `Tanpa izin`
- `Pending`
- `Review`

All `Review` actions scroll to the selected-review area.

### Pagination

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Selected testimonial

- `MEMBER •••1`
- `Belajar Mandiri • N4`
- `Pending Review`
- `Izin valid`
- `“`
- `ISI TESTIMONI`
- `Journey membantu saya memahami langkah belajar berikutnya tanpa merasa kehilangan arah.`

### Permission/source

- `IZIN PUBLIKASI & SUMBER`
- `Persetujuan penggunaan nama samaran, avatar, teks, dan media disimpan oleh sistem.`

### Featured control

- `Tampilkan sebagai testimoni unggulan`
- `Off`
- `◇`
- `Ringkasan`

### Actions

- `Approve`
- `Approve & Feature`
- `Reject`

Destinations:

- `Approve` → `649:3019`
- `Approve & Feature` → `649:3079`
- `Reject` → `649:2690`

### Privacy rule

- `PRIVACY RULE`
- `Hanya publikasikan kutipan atau media setelah izin pengguna dinyatakan valid.`

## Critical privacy rule

Testimonial publication requires valid consent. Do not infer permission from an approved feedback status alone.

---

# ADMIN / 21 — Moderasi Feedback Akhir Level

**Figma frame:** `432:2076`

## Exact visible copy

### Header

- `KONTEN & KOMUNIKASI • FEEDBACK`
- `Moderasi Feedback Akhir Level`
- `Kelola rating, masukan, tindak lanjut, dan kandidat testimoni dari Chapter terakhir.`
- `Lihat Testimoni →`

`Lihat Testimoni →` → `432:1941`

### Summary

- `24`
- `Menunggu ditinjau`

- `4,6`
- `Rating rata-rata`

- `9`
- `Izin testimoni`

- `4`
- `Perlu tindak lanjut`

These are active-Figma sample values, not final totals.

### Filters

- `FILTER ANTREAN`
- `Semua Plan`
- `Semua Level`
- `Chapter Terakhir`
- `Semua Rating`
- `Semua Status Izin`

### Queue

- `Antrean feedback`
- `Data pengguna ditampilkan secara terbatas.`

Fixtures:

- `Member •••1`
- `Mandiri • N4 • Chapter 12/12`
- `★★★★★ • Izin testimoni`
- `Menunggu`

- `Member •••2`
- `Sensei • N3 • Chapter 20/20`
- `★★★★☆ • Tanpa izin`
- `Perlu tindak lanjut`

- `Member •••3`
- `Mandiri • N5 • Chapter 15/15`
- `★★★★★ • Izin testimoni`
- `Siap ditinjau`

- `Member •••4`
- `Sensei • N4 • Chapter 12/12`
- `★★★☆☆ • Tanpa izin`
- `Menunggu`

## Important fixture note

The examples show different total Chapter counts (`12/12`, `20/20`, `15/15`). Do not convert any one of these into a universal chapter-count business rule.

### Selected feedback

- `DETAIL FEEDBACK TERPILIH`
- `Member •••1`
- `Belajar Mandiri • N4 • Chapter 12 dari 12`
- `Rating 5/5`
- `Izin testimoni`
- `Belum ditindaklanjuti`

Feedback text:

- `“Journey dan latihan membantu saya belajar lebih terarah. Penjelasan pada Reading masih bisa dibuat lebih rinci.”`

Category ratings:

- `Rating materi 5 • latihan 4 • pengalaman 5`

### System recommendation

- `Rekomendasi sistem`
- `Kirim catatan Reading ke tim konten. Kandidat testimoni boleh dibuat karena izin tersedia.`

### Actions

- `Tandai Selesai`
- `Buat Kandidat Testimoni`
- `Buka Moderasi Testimoni`

Destinations:

- `Tandai Selesai` → `770:2762`
- `Buat Kandidat Testimoni` → `770:2817`
- `Buka Moderasi Testimoni` → `432:1941`

## Consent rule

Only feedback with appropriate consent may become a testimonial candidate.

Feedback and public testimonial are distinct states/workflows.

---

# ADMIN / 22 — Community Moderation

**Figma frame:** `432:2199`

## Exact visible copy

### Header

- `ADMIN • COMMUNITY GOVERNANCE`
- `Community Moderation`
- `Tinjau post, report, kategori akses, media, warning, removal, suspension, dan audit trail.`
- `Aturan Komunitas`
- `Bulk Review`

Destinations:

- `Aturan Komunitas` → `816:2754`
- `Bulk Review` → `816:2778`

### Summary

- `Posts visible`
- `Dinamis`
- `Postingan yang aktif.`

- `Reported`
- `Dinamis`
- `Memerlukan review.`

- `Hidden`
- `Dinamis`
- `Disembunyikan oleh moderator.`

- `Suspended users`
- `Dinamis`
- `Status berdasarkan policy.`

### Filters

- `⌕`
- `Cari post, kategori, report, atau status`
- `Semua`
- `Reported`
- `Tanya Sensei`
- `Diskusi Member`
- `Info Hiru`
- `Hidden`

### Queue

Fixtures:

- `Pertanyaan tentang partikel に`
- `Tanya Sensei • author dimasking`
- `2 Report`
- `Review`
- `Review`

- `Tips flashcard N4`
- `Diskusi Member • author dimasking`
- `No Report`
- `Visible`
- `Review`

- `Pengumuman materi baru`
- `Info Hiru • author dimasking`
- `No Report`
- `Visible`
- `Review`

- `Promosi tidak relevan`
- `Diskusi Member • author dimasking`
- `4 Report`
- `Hidden`
- `Review`

- `Informasi kerja ke Jepang`
- `Kerja ke Jepang • author dimasking`
- `1 Report`
- `Review`
- `Review`

### Pagination

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Selected post

- `AUTHOR •••1`
- `Pertanyaan tentang partikel に`
- `Tanya Sensei`
- `2 Report`

### Post content

- `POST CONTENT`
- `Mohon jelaskan perbedaan penggunaan partikel に dan で pada konteks tempat aktivitas.`

### Attachment

- `画`
- `Screenshot materi`
- `Metadata file dari backend`
- `Lihat`

Destination:

- `Lihat` → `816:2766`

### Report reasons

- `REPORT REASONS`
- `Spam / promosi`
- `Kategori tidak sesuai`

### Decision

- `Keputusan`
- `Pertahankan / Warning / Remove`
- `⌄`
- `◇`
- `Ringkasan`

### Moderation actions

- `Keep Visible`
- `Warn Author`
- `Remove`
- `Suspend`

Destinations:

- `Keep Visible` → `816:2778`
- `Warn Author` → `816:2778`
- `Remove` → `816:2790`
- `Suspend` → `816:2790`

### Audit

- `AUDIT TRAIL`
- `Keputusan, reason, actor, target, warning, removal, dan suspension harus tercatat.`

## Moderation rule

Destructive actions such as Remove/Suspend must not happen as an unlogged frontend toggle. Reason, actor, target, and result need auditability later.

---

# ADMIN / 23 — Notification Templates

**Figma frame:** `432:2320`

## Exact visible copy

### Header

- `ADMIN • MESSAGING TEMPLATES`
- `Notification Templates`
- `Kelola template in-app dan email, variables, trigger, audience, channel, preview, testing, dan version.`
- `Kelola Variables`
- `Template Baru`

Destinations:

- `Kelola Variables` → `816:2814`
- `Template Baru` → `816:2814`

### Summary

- `Active templates`
- `Dinamis`
- `Template yang digunakan.`

- `Draft`
- `Dinamis`
- `Belum diaktifkan.`

- `Delivery channels`
- `Dinamis`
- `In-app, email, dan channel lain.`

- `Template versions`
- `Dinamis`
- `Riwayat versi tersimpan.`

### Template list

- `⌕`
- `Cari template, channel, atau trigger`

Fixtures:

- `知`
- `Membership berhasil aktif`
- `In-App + Email • invoice.verified`
- `Active`
- `Edit`

- `時`
- `Pengingat Zoom`
- `In-App + Email • class.reminder`
- `Active`
- `Edit`

- `再`
- `Replay tersedia`
- `In-App • replay.published`
- `Active`
- `Edit`

- `試`
- `Try Out selesai`
- `In-App • assessment.completed`
- `Testing`
- `Edit`

- `期`
- `Membership akan berakhir`
- `Email • membership.expiring`
- `Draft`
- `Edit`

### Pagination

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Selected template

- `ACTIVE • VERSION DINAMIS`
- `Membership berhasil aktif`
- `Active`

Fields:

- `Channel`
- `In-App + Email`
- `⌄`

- `Trigger`
- `invoice.verified`
- `⌄`

- `Audience`
- `User terkait`
- `⌄`

- `Subject Email`
- `Membership {{plan_name}} sudah aktif`
- `Teks bantuan opsional`

- `◇`
- `Ringkasan`

### Available variables

- `AVAILABLE VARIABLES`
- `{{user_name}}`
- `{{plan_name}}`
- `{{level}}`
- `{{access_start}}`
- `{{access_end}}`
- `{{invoice_id}}`

### In-app preview

- `Preview in-app`
- `Sample Data`
- `✓`
- `Pengumuman`
- `Membership Belajar Mandiri untuk level N4 sudah aktif.`

### Email preview

- `EMAIL PREVIEW`
- `Membership Belajar Mandiri sudah aktif`
- `Halo Member, akses N4 kamu sudah aktif. Periode akses mengikuti data backend.`

### Actions

- `Kirim Tes`
- `Simpan Versi`
- `Aktifkan Template`

Destinations:

- `Kirim Tes` → `816:2826`
- `Simpan Versi` → `816:2826`
- `Aktifkan Template` → `816:2838`

### Delivery checklist

- `Delivery checklist`
- `✓`
- `Trigger valid`
- `✓`
- `Audience valid`
- `✓`
- `Variables tersedia`
- `!`
- `Fallback text tersedia`
- `!`
- `Test delivery berhasil`

### Channel rules

- `Channel rules`

- `知`
- `In-App`
- `Ringkas, kontekstual, dan dapat ditutup.`

- `郵`
- `Email`
- `Subject, body, dan fallback harus valid.`

- `役`
- `Audience`
- `Target mengikuti role dan entitlement.`

- `歴`
- `Version`
- `Perubahan template tersimpan sebagai versi.`

### Announcement

- `!`
- `Pengumuman`
- `Template tidak boleh diaktifkan sebelum trigger, variables, fallback, dan test delivery valid.`

## Rule

Notification activation is a configured workflow. Do not send real email/in-app notifications from frontend-only preview state.

---

# ADMIN / 30 — Pengelolaan Landing Page

**Figma frame:** `805:2532`

## Exact visible copy

### Header

- `KONTEN & KOMUNIKASI • LANDING PAGE`
- `Pengelolaan Landing Page`
- `Kelola isi, urutan, visibility, CTA, dan SEO tanpa mengubah struktur layout secara bebas.`
- `Dashboard`
- `Simpan Draft`
- `Pratinjau`
- `Publikasikan`

Destinations:

- `Dashboard` → `431:152`
- `Simpan Draft` → `806:2589`
- `Pratinjau` → `806:2644`
- `Publikasikan` → `806:2699`

### Status

- `Status`
- `Draft aktif`
- `Belum memengaruhi halaman publik`

- `Versi`
- `v18`
- `Versi terakhir dari backend`

- `Section aktif`
- `6`
- `Visibility dapat diubah`

- `Terakhir diperbarui`
- `Dinamis`
- `Waktu dan editor tercatat`

### Hero & CTA

- `HERO & CTA`
- `Konten utama yang tampil pertama kali pada Landing Page.`

Fields:

- `Headline`
- `Belajar Jepang dengan journey yang terarah`

- `Subheadline`
- `Value proposition dari Admin`

- `CTA Utama`
- `Coba Gratis → Program & Level`

- `CTA Kedua`
- `Placement Test → Placement Start`

- `CTA Ketiga`
- `Lihat Program → Program & Level`

- `Media Hero`
- `Upload gambar / pilih asset`

- `Trust Copy`
- `Chapter 1 gratis pada N1–N5`

## Authority note

These are the active visible editor values in Admin Figma. Public-facing copy authority remains the active approved public Figma/client revision. Do not let an old/stale Admin editor fixture silently overwrite newer approved Landing copy.

### Program / Feature / Placement

- `PROGRAM, FITUR & PLACEMENT CTA`
- `Konten dapat diedit; layout, grid, dan responsive behavior tetap dikunci oleh sistem.`

Fields:

- `Judul Program`
- `Pilih cara belajar dan level`

- `Urutan Plan`
- `Free → Mandiri → Sensei`

- `Judul Fitur`
- `Fitur utama Hiru Academy`

- `Jumlah Card`
- `6 fasilitas dari client`

- `Placement CTA`
- `Mulai Placement Test`

- `Destination`
- `FREE / 07 — Placement Start`

### Testimonial decision

- `Testimoni tidak menjadi section Landing Page`
- `Sesuai keputusan client, testimoni publik hanya tampil pada halaman Testimoni.`

This is a strong explicit Figma rule.

Do not add a testimonial section to Landing unless a later client revision changes this.

### Footer & SEO

- `FOOTER & SEO`

- `SEO Title`
- `Hiru Academy — Belajar Bahasa Jepang`

- `Meta Description`
- `Ringkasan untuk search engine`

- `Footer Links`
- `Program, Placement, Testimoni, Blog`

- `Social & Legal`
- `URL dinamis dari Admin`

### Version restoration

- `Pulihkan Versi Sebelumnya`

Destination:

- `806:2778`

### Publication status

- `STATUS PUBLIKASI`
- `Draft aktif`
- `Perubahan belum tampil pada halaman publik.`

- `Jadwal Publikasi`
- `Publikasikan sekarang / jadwalkan`

### Visibility / order

- `VISIBILITY & URUTAN SECTION`

- `1. Hero`
- `Aktif`

- `2. Program & Level`
- `Aktif`

- `3. Fitur`
- `Aktif`

- `4. Statistik`
- `Aktif`

- `5. Placement CTA`
- `Aktif`

- `6. Footer`
- `Aktif`

- `Testimoni`
- `Tidak digunakan`

### Version history

- `RIWAYAT VERSI`

- `v18 • Draft aktif`
- `Perubahan CTA Coba Gratis`

- `v17 • Dipublikasikan`
- `Program & Level diperbarui`

- `v16 • Diarsipkan`
- `Versi sebelum meeting 28 Juli`

### Controlled CRUD

- `CONTROLLED CRUD`
- `Admin dapat mengubah konten, urutan, visibility, CTA, media, dan SEO.`
- `Admin tidak dapat mengubah grid, breakpoint, atau struktur responsive secara bebas.`

## Critical layout rule

Admin content management may control:

- content,
- order,
- visibility,
- CTA,
- media,
- SEO,

but **not arbitrary responsive layout/grid/breakpoint structure**.

This prevents the Admin CMS from becoming a page builder that can destroy the approved product layout.

---

# Verified Layer D operational flows

## Announcement

```text
Announcement Management
├─ New Announcement → editor state
├─ Save Draft → draft-saved state
├─ Publish → publication-validation flow
└─ Archive → archive confirmation
```

## Blog

```text
Blog Management
├─ Categories / media state
├─ Edit / New Article → shared editor
├─ Save Draft
└─ Publish → publication validation
```

## Testimonial / feedback

```text
Feedback Akhir Level
├─ Mark Complete
├─ Create Testimonial Candidate
└─ Open Testimonial Moderation

Testimonial Moderation
├─ Approve
├─ Approve & Feature
├─ Reject
└─ Export Consent
```

## Community

```text
Community Moderation
├─ Rules
├─ Bulk Review
├─ View Attachment
├─ Keep Visible / Warn
└─ Remove / Suspend → destructive confirmation
```

## Notification Templates

```text
Notification Templates
├─ Variables / New Template
├─ Send Test
├─ Save Version
└─ Activate Template → activation confirmation
```

## Landing Page

```text
Landing Page Management
├─ Save Draft
├─ Preview
├─ Publish → confirmation
└─ Restore Previous Version → confirmation
```

Exact state/modal copy for destination nodes in `649:*`, `653:*`, `657:*`, `770:*`, `806:*`, and `816:*` belongs to Page 11 Layer G/F and should not be invented here.

---

# Core product rules verified from Layer D

- Announcements support audience, channel, priority/schedule, publication state, and history.
- Large/urgent announcements require review before publication.
- Blog publishing requires complete content, category, media/alt text, metadata, preview, and revision history.
- Public testimonial publication requires valid user consent.
- Feedback and testimonial are distinct workflows.
- Feedback can become a testimonial candidate only when appropriate permission exists.
- Community moderation must record decision, reason, actor, target, warning/removal/suspension.
- Notification templates are versioned and must validate trigger, audience, variables, fallback, and test delivery before activation.
- Landing Page Admin is **controlled CRUD**, not a free-form page builder.
- Admin cannot freely change grid, breakpoint, or responsive structure.
- Testimonial is explicitly **not used as a Landing section** in the active Figma.
- Landing draft changes do not affect public content until publication.
- Public copy should still respect latest client/public Figma authority when an Admin-editor fixture conflicts with a newer approved public screen.

---

# Dynamic / fixture values

Do not hardcode these examples as global product constants:

- Announcement totals/reach
- Announcement titles/statuses
- Blog count `148`
- `8 menit baca`
- Testimonial counts/statuses
- Feedback `24`, `4,6`, `9`, `4`
- Chapter totals shown in feedback fixtures
- Community report counts
- Notification template count `148`
- template version/status sample
- `Belajar Mandiri`, `N4`, and sample email text
- Landing version `v18`
- `6` active sections as a permanent database constraint
- version-history labels/dates
- article slug
- audience examples
- sample member aliases

---

# Layer D frontend-first implementation rules

1. Exact visible copy and hierarchy come from this contract.
2. Visual treatment comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse one Admin Console shell.
4. Treat publishing as a deliberate draft/validation/publish workflow, not an instant local toggle.
5. Do not publish testimonials without valid consent.
6. Keep Feedback and Testimonial separate.
7. Destructive community moderation requires confirmation/reason/audit semantics.
8. Keep user/author identities masked in fixtures.
9. Notification template variables remain configurable placeholders.
10. Do not send real notifications from frontend fixtures.
11. Landing Admin remains controlled CRUD; do not implement arbitrary drag/drop page-builder layout editing.
12. Do not add Testimonial to Landing while the active Figma explicitly says `Tidak digunakan`.
13. If an Admin-editor fixture conflicts with newer approved public/client copy, do not silently overwrite the newer authority.
14. Do not implement Laravel/Sanctum, database persistence, email/in-app delivery, file storage, publication backend, moderation backend, audit storage, consent export, SEO deployment, or version restoration infrastructure during this documentation phase.
15. Exact destination-state/modal copy is extracted later from Layer G/F; do not invent it.
