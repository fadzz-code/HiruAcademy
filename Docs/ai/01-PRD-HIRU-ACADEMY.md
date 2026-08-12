# PRD — HIRU ACADEMY

**Dokumen:** `01-PRD-HIRU-ACADEMY.md`  
**Status:** Draft implementasi frontend-first  
**Produk:** HIRU Academy — Website penjualan kelas Bahasa Jepang + LMS + CMS/SEO + Admin Console  
**Source of truth alur/fungsi:** Figma Page 08–11  
**Arah implementasi frontend:** Next.js App Router + React + TypeScript + Tailwind CSS  
**Backend target:** Laravel + Laravel Sanctum  
**Database target:** PostgreSQL  
**Media target:** S3-compatible object storage  
**E2E target:** Playwright

---

## 0. Kontrak Source of Truth

Dokumen ini **tidak mendesain ulang produk dari nol**. PRD ini menerjemahkan keputusan yang sudah dikunci di Figma dan revisi client menjadi spesifikasi produk yang bisa dipakai frontend, backend, dan QA.

Urutan prioritas bila ada konflik:

1. **Revisi client terbaru yang sudah diterapkan pada desain**.
2. **Figma Page 08–11** untuk flow, copy, feature availability, state, entitlement, dan screen behavior.
3. **`RefrensiHTML.zip`** untuk implementation experience: kualitas layout, interaction feel, animation, transition, hover, micro-interaction, dan smoothness yang sudah terasa baik.
4. **Figma Page 1** untuk referensi visual/component family.
5. **`DESIGN.md`** untuk design system detail — dibahas pada `02-UI-UX-DESIGN-BRIEF.md`, bukan sebagai sumber flow di PRD ini.
6. Dokumen PDF lama hanya dipakai untuk mendeteksi kemungkinan requirement yang belum termigrasi; PDF **tidak boleh mengalahkan revisi client yang lebih baru**.

### Aturan migrasi HTML → Next.js

Migrasi teknologi **tidak boleh menjadi alasan untuk mengurangi kualitas interaction** yang sudah ada pada HTML referensi. Jika sebuah hover, transition, flip, active state, spacing rhythm, atau interaction di `RefrensiHTML.zip` sudah terasa smooth, default keputusannya adalah **dipertahankan atau direplikasi**, bukan disederhanakan.

11 implementation reference yang tersedia:

- `landingpage.html`
- `program.html`
- `pilih perjalananmu.html`
- `journey.html`
- `dashboard.html`
- `perpustakaan.html`
- `flashcard management.html`
- `flashcard.html`
- `latihan.html`
- `tryout.html`
- `hasiltryout.html`

### Definition of Done — Frontend-first

Frontend-first dianggap selesai bila:

- seluruh core flow yang disetujui pada Page 08–11 dapat dinavigasi dengan route nyata;
- tombol inti tidak berakhir di `#` atau dead-end yang tidak disengaja;
- flow dapat memakai mock data sebelum API Laravel tersedia;
- state Free / LMS / LMS + Sensei tampil berbeda melalui entitlement, bukan melalui tiga desain yang tidak konsisten;
- locked state, empty state, loading/error placeholder, success state, assessment result, dan payment/WhatsApp flow dapat didemonstrasikan;
- layout, interaction feel, animation, dan transition utama dari HTML referensi tidak mengalami regresi yang terlihat;
- public page siap diberi metadata SEO dan route berbasis slug;
- komponen dibuat reusable sehingga screen family tidak diduplikasi hanya karena role berbeda;
- implementasi siap diganti dari mock data ke Laravel API tanpa redesign besar.

### Definition of Done — Production

Production dianggap selesai setelah frontend-first di atas terhubung ke Laravel/PostgreSQL dan:

- auth/session nyata aktif;
- entitlement diverifikasi server-side;
- invoice/payment verification aktif;
- assessment attempt dan score tersimpan;
- upload media tervalidasi;
- Admin CMS menyimpan dan mempublikasikan konten;
- SEO metadata/sitemap/robots/canonical berjalan pada domain produksi;
- E2E critical journeys lulus.

---

# 1. Pernyataan Masalah

HIRU Academy menjual program pembelajaran Bahasa Jepang secara online dengan tiga tingkat akses pengguna: **Free Member**, **Belajar Mandiri (LMS)**, dan **Belajar dengan Sensei (LMS + Sensei)**. Selain proses penjualan, produk harus menjadi LMS yang memungkinkan siswa belajar bertahap melalui level, Chapter, materi, latihan, assessment, dan progress tracking. Di sisi operasional, Admin harus mampu mengelola produk, konten, akses user, assessment, invoice, placement lead, blog/artikel SEO, cohort, serta hasil belajar tanpa bergantung pada developer untuk perubahan konten rutin.

Masalah utama yang harus diselesaikan:

1. **Calon siswa sulit memilih jalur belajar yang tepat.** Mereka membutuhkan halaman program, Placement Test, penjelasan fasilitas, testimonial, dan CTA pembelian yang jelas.
2. **Pembayaran dilakukan manual melalui WhatsApp.** Tanpa sistem invoice + verifikasi, akses membership rawan tidak sinkron dengan pembayaran.
3. **Tiga tipe member memiliki kebutuhan akses berbeda tetapi harus terasa sebagai satu produk.** Pengguna perlu melihat fitur premium yang belum dimiliki tanpa kehilangan konteks produk.
4. **Pembelajaran membutuhkan struktur yang jelas.** Siswa harus mengetahui level, Chapter, materi yang sudah selesai, assessment yang terbuka, dan tindakan berikutnya.
5. **Assessment berbeda memiliki aturan berbeda.** Latihan Harian, Checkpoint Chapter, Try Out, dan Mini Checkpoint tidak boleh diperlakukan sebagai fitur yang sama.
6. **Member LMS + Sensei membutuhkan fitur kelas.** Jadwal, replay, Tanya Sensei, cohort, dan Mini Checkpoint harus terhubung dengan konteks pembelajaran mereka.
7. **Admin membutuhkan CMS operasional yang lengkap.** Pengelolaan blog, landing, materi, soal, invoice, user, dan hasil assessment harus dapat dilakukan dari Admin Console.
8. **Website harus dapat menjadi channel acquisition organik.** Artikel/blog dan halaman program harus dapat dioptimasi untuk SEO melalui slug, metadata, canonical, structured content, sitemap, dan pengaturan publikasi.
9. **Frontend harus dapat dikerjakan lebih dahulu tanpa mengunci arsitektur salah.** UI harus benar-benar clickable dengan mock data, lalu backend dapat dipasang kemudian tanpa membuang hasil frontend.

---

# 2. Pengguna Target + Persona

## 2.1 Kelompok Pengguna

### A. Visitor / Calon Siswa

Kebutuhan:

- memahami program yang tersedia;
- membaca artikel dan testimonial;
- mencoba Placement Test;
- membuat akun;
- memilih program/level;
- mendapatkan invoice dan melanjutkan pembayaran via WhatsApp.

### B. Free Member

Kebutuhan:

- mencoba pengalaman LMS;
- mengakses Chapter 1 pada level yang diperbolehkan desain final;
- melihat progress dasar;
- melihat fitur premium sebagai locked preview;
- memahami manfaat upgrade tanpa kehilangan progress.

### C. Belajar Mandiri / LMS

Kebutuhan:

- mengakses seluruh Chapter untuk level yang dibeli;
- belajar melalui video, modul, flashcard, audio, reading;
- mengerjakan Latihan Harian, Checkpoint, dan Try Out;
- melihat score, review, progress, Achievement, Community, dan sertifikat sesuai rule;
- melihat fitur Sensei sebagai locked preview.

### D. Belajar dengan Sensei / LMS + Sensei

Kebutuhan:

- seluruh fungsi Belajar Mandiri;
- Jadwal Zoom / kelas;
- detail kelas dan replay;
- Tanya Sensei;
- Mini Checkpoint khusus member LMS + Sensei;
- progress dan assessment history yang terhubung ke program/cohort.

### E. Admin

Kebutuhan:

- mengelola program, Chapter, materi, soal, Try Out, Mini Checkpoint, user, access, invoice, blog, landing, testimonial, feedback, community, notification, Sensei, cohort, analytics, dan settings;
- melihat Placement lead termasuk Nama, WhatsApp, target ujian, hasil, dan tanggal pengerjaan;
- melihat rekap hasil assessment;
- melakukan verifikasi pembayaran manual;
- mempublikasikan artikel SEO tanpa developer.

> Tidak ada requirement final yang menyatakan Sensei mempunyai portal login mandiri terpisah. Jangan membuat role aplikasi Sensei baru tanpa konfirmasi.

## 2.2 Persona 1 — Siswa JLPT

**Nama representatif:** Hilmi  
**Tujuan:** lulus target JLPT dan belajar lebih terarah.  
**Perilaku:** membandingkan program dari ponsel, tertarik mencoba gratis sebelum membeli, membutuhkan progress yang jelas, dan nyaman melanjutkan transaksi melalui WhatsApp.  
**Pain points:** bingung memilih level, takut membeli paket yang salah, sulit konsisten belajar, dan tidak tahu bagian materi yang masih lemah.  
**Yang dianggap sukses:** dapat memilih jalur yang tepat, mulai belajar tanpa friksi, melihat progress, mengerjakan assessment, dan mengetahui apa yang harus dilakukan berikutnya.

## 2.3 Persona 2 — Admin HIRU Academy

**Nama representatif:** Admin Operasional HIRU  
**Tujuan:** menjalankan pemasaran, pembelajaran, transaksi, dan konten tanpa bergantung pada developer untuk operasi rutin.  
**Perilaku:** mengecek lead Placement, pembayaran, user access, draft artikel, hasil siswa, cohort, dan konten setiap hari.  
**Pain points:** data tersebar, akses user sulit diverifikasi, artikel harus minta developer, dan hasil assessment sulit direkap.  
**Yang dianggap sukses:** satu Admin Console dapat mengelola keseluruhan lifecycle user dari lead → invoice → membership → belajar → assessment → renewal.

---

# 3. Tujuan dan Bukan Tujuan

## 3.1 Tujuan Produk

1. Mengubah visitor menjadi Free Member atau pembeli program dengan flow yang jelas.
2. Memungkinkan user memilih level/program tanpa dipaksa membeli level secara berurutan apabila desain final memberikan entitlement independen.
3. Menyediakan pengalaman LMS yang konsisten di tiga membership dengan perbedaan utama pada entitlement.
4. Memastikan Free Member dapat memahami nilai fitur premium melalui locked preview.
5. Menyediakan Journey berbasis level dan Chapter dengan progress yang mudah dipahami.
6. Menyediakan learning content: video, modul, flashcard, audio, reading, dan materi library sesuai program.
7. Memisahkan konsep Latihan Harian, Checkpoint Chapter, Try Out, dan Mini Checkpoint.
8. Menyediakan assessment dengan score/history/review sesuai rule masing-masing.
9. Menyediakan Mini Checkpoint khusus LMS + Sensei untuk N5, N4, N3, dan N2 dengan sesi + part, timer, passing score, status Lulus/Tidak Lulus, image question support, dan rekap Admin.
10. Menyediakan sistem invoice + WhatsApp + Admin verification untuk mengaktifkan membership.
11. Menyediakan Blog/CMS yang SEO-friendly dengan slug dan metadata yang dapat dikelola Admin.
12. Memungkinkan frontend selesai lebih dahulu menggunakan mock data dan navigation nyata.
13. Mempertahankan feel, smoothness, interaction, dan animation yang sudah terbukti baik pada implementation reference HTML.

## 3.2 Bukan Tujuan

1. **Payment gateway otomatis** bukan requirement saat ini. Pembayaran diarahkan ke WhatsApp dan diverifikasi Admin.
2. **Zoom Manager khusus di Admin** tidak perlu dibuat sebagai modul tersendiri; kebutuhan kelas ditangani melalui Cohort/Jadwal/Replay.
3. **Portal Sensei terpisah** bukan bagian scope sampai client memintanya secara eksplisit.
4. **Affiliate cash commission** bukan requirement aktif. Sistem final menggunakan konsep Referral & Diskon yang sudah direvisi.
5. **Menyembunyikan semua fitur premium dari Free/LMS** bukan tujuan. Preview terkunci justru bagian dari strategi upgrade.
6. **Membuat tiga frontend LMS terpisah** bukan tujuan. UI harus reusable dengan entitlement-driven state.
7. **Mengurangi animasi/interaction HTML agar migrasi lebih mudah** bukan tujuan.
8. **Membangun backend sebelum frontend dapat diuji sebagai clickable product** bukan tujuan fase pertama.
9. **SSW Pengolahan Makanan, Interview, dan full Journey Dasar Bahasa Jepang** belum boleh diasumsikan lengkap sampai scope akhirnya dikonfirmasi. Lihat Open Questions.

---

# 4. Cerita Pengguna

## 4.1 Public / Acquisition

- Sebagai visitor, saya ingin melihat program yang tersedia agar saya dapat memilih cara belajar yang sesuai.
- Sebagai visitor, saya ingin membaca detail fasilitas program agar saya memahami apa yang akan saya dapatkan.
- Sebagai visitor, saya ingin membaca testimonial agar saya memiliki bukti sosial sebelum mendaftar.
- Sebagai visitor, saya ingin membaca artikel Bahasa Jepang agar saya dapat belajar sekaligus menemukan HIRU dari pencarian Google.
- Sebagai visitor, saya ingin menjalankan Placement Test agar saya mendapatkan rekomendasi level.
- Sebagai visitor, saya ingin memberikan Nama, WhatsApp, dan target ujian saat Placement agar Admin dapat menindaklanjuti saya.
- Sebagai visitor, saya ingin mendaftar menggunakan data akun agar progress saya dapat disimpan.
- Sebagai user, saya ingin login menggunakan email **atau WhatsApp** agar saya tidak bergantung pada satu identifier.
- Sebagai pembeli, saya ingin mendapatkan Invoice ID dan tombol WhatsApp agar saya dapat melanjutkan pembayaran dengan Admin.

## 4.2 Free Member

- Sebagai Free Member, saya ingin melihat Dashboard yang sama strukturnya dengan user berbayar agar saya memahami pengalaman penuh HIRU.
- Sebagai Free Member, saya ingin melihat fitur premium dalam kondisi terkunci agar saya mengetahui manfaat upgrade.
- Sebagai Free Member, saya ingin membuka materi gratis yang tersedia agar saya dapat mengevaluasi kualitas pembelajaran.
- Sebagai Free Member, saya ingin progress saya tersimpan agar ketika upgrade saya tidak perlu memulai dari nol.
- Sebagai Free Member, saya ingin CTA locked feature mengarahkan saya ke pembelian/WhatsApp agar cara membuka akses jelas.

## 4.3 Belajar Mandiri

- Sebagai member LMS, saya ingin memilih level yang saya beli agar Journey yang sesuai terbuka.
- Sebagai member LMS, saya ingin melanjutkan Chapter terakhir agar saya tidak mencari posisi belajar secara manual.
- Sebagai member LMS, saya ingin melihat Achievement agar progres saya terasa nyata.
- Sebagai member LMS, saya ingin mengerjakan Latihan Harian tanpa menggunakan attempt Try Out agar latihan rutin tidak mengganggu simulasi ujian.
- Sebagai member LMS, saya ingin mengerjakan Try Out dengan timer agar simulasi terasa realistis.
- Sebagai member LMS, saya ingin melihat score, breakdown, dan review agar saya mengetahui kelemahan saya.
- Sebagai member LMS, saya ingin melihat fitur Sensei dalam kondisi terkunci agar saya tahu manfaat LMS + Sensei.

## 4.4 Belajar dengan Sensei

- Sebagai member LMS + Sensei, saya ingin melihat jadwal kelas agar saya tidak melewatkan sesi.
- Sebagai member LMS + Sensei, saya ingin membuka replay agar saya dapat mengulang pembelajaran.
- Sebagai member LMS + Sensei, saya ingin mengirim pertanyaan ke Sensei agar saya mendapatkan bantuan belajar.
- Sebagai member LMS + Sensei, saya ingin mengerjakan Mini Checkpoint berdasarkan level, sesi, dan part agar kemampuan kelas saya dapat dievaluasi.
- Sebagai member LMS + Sensei, saya ingin Mini Checkpoint memiliki timer agar assessment mengikuti aturan client terbaru.
- Sebagai member LMS + Sensei, saya ingin melihat score dan Lulus/Tidak Lulus agar hasil assessment mudah dipahami.

## 4.5 Admin

- Sebagai Admin, saya ingin mengelola program dan Chapter agar struktur LMS dapat diperbarui tanpa developer.
- Sebagai Admin, saya ingin mengunggah image/audio pada soal agar assessment mendukung media.
- Sebagai Admin, saya ingin mengatur timer, passing score, attempt, dan review agar assessment dapat dikonfigurasi.
- Sebagai Admin, saya ingin membuat Mini Checkpoint untuk N5–N2 berdasarkan sesi dan part agar sesuai program kelas Sensei.
- Sebagai Admin, saya ingin melihat rekap nilai Mini Checkpoint agar performa peserta kelas dapat dipantau.
- Sebagai Admin, saya ingin melihat lead Placement beserta Nama, WhatsApp, target ujian, rekomendasi, dan tanggal pengerjaan agar follow-up penjualan terarah.
- Sebagai Admin, saya ingin memverifikasi invoice agar membership user baru aktif setelah pembayaran benar-benar diterima.
- Sebagai Admin, saya ingin membuat artikel dengan slug dan metadata SEO agar artikel dapat ditemukan melalui mesin pencari.
- Sebagai Admin, saya ingin mengelola landing page agar copy marketing tidak harus diubah melalui code deployment.

---

# 5. Daftar Fitur — MVP / V2 / Nanti

> Catatan: **frontend-first target tetap dapat memvisualisasikan screen yang sudah ada di Page 08–11**, bahkan bila backend suatu fitur diprioritaskan ke V2. Klasifikasi di bawah adalah prioritas product/backend release, bukan izin untuk mengabaikan Figma.

## 5.1 MVP

### Acquisition & Commerce

- Landing Page.
- Program & Level.
- Program Detail.
- Testimoni public page.
- Blog List & Blog Detail.
- Placement Test + result.
- Register, verification, login, forgot/reset password.
- Login dengan email atau WhatsApp.
- Checkout.
- Invoice + WhatsApp.
- Admin payment verification.

### Membership & Entitlement

- Free Member.
- Belajar Mandiri / LMS.
- Belajar dengan Sensei / LMS + Sensei.
- Independent purchased-level entitlement sesuai desain final.
- Locked feature preview.
- Membership expiry/renewal state.

### LMS Core

- Unified Dashboard structure.
- Level Journey.
- Chapter Journey.
- Chapter Overview.
- Video Lesson.
- Modul Tata Bahasa.
- Modul Huruf Jepang & Kanji.
- Flashcard Collection.
- Flashcard Session + completion.
- Audio Question.
- Reading Question.
- Chapter Checkpoint.
- Perpustakaan Materi.
- Progress & Achievement.

### Assessment Core

- Latihan Harian.
- Checkpoint Chapter.
- Try Out: list → info → runner → result → review.
- Mini Checkpoint LMS + Sensei: list → info → runner → result → review.
- Image question support pada Latihan, Checkpoint, Try Out, dan Mini Checkpoint.
- Timer where configured.
- Score/history.
- Passing score where configured.
- Lulus/Tidak Lulus untuk Mini Checkpoint.

### LMS + Sensei Core

- Jadwal Zoom/kelas.
- Detail kelas.
- Replay list/player.
- Tanya Sensei.
- Mini Checkpoint khusus LMS + Sensei.

### Admin Core

- Dashboard Admin.
- Program Management.
- Chapter Builder.
- Quiz Builder.
- Try Out Builder.
- Mini Checkpoint Builder.
- Content Library Management.
- Placement Builder & Leads.
- Assessment Results.
- User Management.
- Access Settings.
- Invoice Management.
- Blog Management.
- Landing Page Management.
- Sensei Management.
- Cohort & Kelas.
- General Settings minimum yang dibutuhkan fitur MVP.

### SEO Core

- article slug;
- meta title;
- meta description;
- canonical URL;
- Open Graph metadata;
- publish status + publish date;
- sitemap generation;
- robots rules;
- structured article data;
- public page indexability control;
- noindex untuk student/admin routes.

## 5.2 V2

- Community full write/reply/report experience.
- Advanced Notification Center & templates.
- Certificate center, share, verification flows.
- Leaderboard.
- Referral & Diskon reward lifecycle.
- Feedback akhir level.
- Testimonial invitation/moderation workflow.
- Advanced Announcement scheduling.
- Advanced Analytics / GA reporting inside Admin.
- Audit Logs operational tooling.
- Advanced content import/export.
- Advanced cohort lifecycle automation.

## 5.3 Nanti / Butuh Konfirmasi

- Full product Journey untuk **SSW Pengolahan Makanan**.
- Full product Journey untuk **Interview**.
- Full independent Journey untuk **Dasar Bahasa Jepang** jika memang bukan hanya entry-level catalog item.
- Dedicated Sensei portal/login.
- Automated payment gateway.
- Mobile native application.
- Affiliate cash commission model — hanya jika client mengaktifkannya kembali.

---

# 6. Persyaratan Fungsional Terperinci per Fitur MVP

## 6.1 Public Website & Navigation

### FR-PUB-01 — Landing Page

- Menampilkan value proposition HIRU Academy.
- Menampilkan program/cara belajar yang aktif.
- Menampilkan CTA utama ke program/register/pembelian sesuai desain final.
- CTA khusus Placement Test pada hero **tidak wajib ditampilkan** karena revisi client menghapus button Placement pada Landing; Placement tetap tersedia sebagai fitur/menu contextual.
- Menampilkan preview fasilitas, testimonial, blog, dan CTA pembelian sesuai Figma.
- Konten marketing utama harus dapat dikelola dari Admin Landing Page Management untuk field yang telah ditentukan.
- Public page wajib dapat dirender dengan metadata SEO.

### FR-PUB-02 — Program & Level

- Menampilkan jenis membership/cara belajar.
- Menampilkan level/program yang tersedia.
- Level yang dibeli tidak boleh dipaksa berurutan bila entitlement final menyatakan pembelian independen.
- Harga tidak di-hardcode dalam komponen frontend; harga berasal dari config/mock yang nantinya diganti API.
- Program unavailable harus mempunyai state yang jelas, bukan error kosong.

### FR-PUB-03 — Program Detail

- Menjelaskan fasilitas program.
- Menampilkan perbedaan akses Free/LMS/LMS + Sensei bila relevan.
- CTA pembelian mengarah ke register/checkout yang tepat.
- Copy detail tidak boleh mengambil copy lama Page 1 bila bertentangan dengan Page 08–11.

### FR-PUB-04 — Testimoni

- Testimoni utama hanya ditampilkan di halaman Testimoni sesuai revisi client.
- Admin dapat memoderasi testimonial.
- Invitation testimonial per Chapter dapat diperlakukan sebagai V2 workflow bila backend belum tersedia.

---

## 6.2 Blog & SEO CMS

### FR-SEO-01 — Article Management

Admin dapat membuat dan mengubah minimal:

- title;
- slug;
- excerpt;
- body/content;
- featured image;
- category;
- author;
- status: draft/published;
- published_at;
- meta_title;
- meta_description;
- canonical_url optional override;
- og_title;
- og_description;
- og_image.

### FR-SEO-02 — Slug

- Slug harus unik.
- Slug dapat dibuat otomatis dari title tetapi Admin boleh mengubahnya sebelum publish.
- Perubahan slug pada artikel yang sudah published harus ditandai sebagai kasus yang memerlukan redirect strategy; jangan diam-diam memutus URL lama.

### FR-SEO-03 — Public Article

- Route artikel menggunakan slug.
- Draft/unpublished tidak boleh diindex atau dapat diakses sebagai artikel public normal.
- Public article harus menghasilkan title, description, canonical, Open Graph, dan structured data dari data CMS.

### FR-SEO-04 — Sitemap & Robots

- Sitemap hanya memasukkan public canonical URLs yang eligible untuk indexing.
- Student routes, Admin routes, dan private account routes harus noindex/disallow sesuai implementasi final.
- Blog list dan program public harus crawlable.

### FR-SEO-05 — Frontend Rendering

- Public marketing/blog routes menggunakan kemampuan server rendering/static generation/revalidation Next.js sesuai kebutuhan konten.
- LMS private route tidak perlu dioptimasi untuk indexing.

---

## 6.3 Placement Test

### FR-PLC-01 — Lead Capture

Sebelum/di awal Placement, sistem mengumpulkan minimal:

- Nama;
- Nomor WhatsApp;
- target ujian.

### FR-PLC-02 — Assessment

- User dapat memulai Placement dari route yang tersedia.
- Placement mempunyai question flow dan processing state.
- Setelah selesai, user melihat result/rekomendasi sesuai konfigurasi.

### FR-PLC-03 — Admin Lead

Admin dapat melihat:

- Nama;
- WhatsApp;
- target ujian;
- rekomendasi/hasil;
- tanggal dan waktu pengerjaan;
- source/referral bila tersedia;
- account/follow-up status.

### FR-PLC-04 — Failure

- Processing error tidak boleh kehilangan lead data yang sudah berhasil tersimpan.
- User harus mendapat state retry/error yang jelas.

---

## 6.4 Register, Verification, Login, Reset

### FR-AUTH-01 — Register

- User memasukkan data akun sesuai form final.
- Email tidak boleh dipakai dua akun aktif yang sama.
- WhatsApp tidak boleh dipakai dua akun aktif yang sama bila business rule final tetap mengharuskan uniqueness.
- Password mengikuti minimum rule backend final.
- Referral code bersifat opsional.

### FR-AUTH-02 — Verification

- Account verification mempunyai success, resend, expired/error state.
- Frontend-first dapat menggunakan mock success/error route.

### FR-AUTH-03 — Login

- Field identifier menerima **Email / WhatsApp**.
- User yang valid diarahkan ke Dashboard sesuai membership/entitlement.
- Redirect tidak boleh hanya bergantung pada state frontend; production harus dikonfirmasi backend.

### FR-AUTH-04 — Password Reset

- Forgot Password dan Reset Password mempunyai state sent, expired, invalid, success.

---

## 6.5 Checkout, Invoice, WhatsApp, Membership Activation

### FR-PAY-01 — Checkout

- User memilih program/level.
- Ringkasan order menunjukkan program, level, harga aktif, diskon yang valid, dan total final.
- Frontend-first menggunakan mock order.

### FR-PAY-02 — Invoice

- Production backend membuat Invoice ID unik.
- Status minimum: draft / menunggu pembayaran / sudah bayar / diverifikasi / aktif atau mapping status final yang disetujui backend.
- Frontend tidak boleh mengaktifkan entitlement hanya karena tombol WhatsApp diklik.

### FR-PAY-03 — WhatsApp

- CTA utama: **Buat Invoice & Buka WhatsApp** atau wording final Figma.
- Setelah invoice berhasil dibuat, tombol membuka WhatsApp Admin dengan pesan yang memuat minimal Invoice ID dan data order penting.
- Jika popup/deep link WhatsApp gagal dibuka, user tetap harus dapat melihat Invoice ID dan nomor/kontak Admin.

### FR-PAY-04 — Admin Verification

- Admin memverifikasi pembayaran.
- Hanya setelah verification, membership/entitlement production berubah aktif.
- Verification harus idempotent: menekan verifikasi dua kali tidak boleh menggandakan entitlement/order.

---

## 6.6 Entitlement & Membership

### FR-ENT-01 — Membership Types

Minimum:

- Free Member;
- LMS / Belajar Mandiri;
- LMS + Sensei / Belajar dengan Sensei;
- Admin.

### FR-ENT-02 — Unified Dashboard

- Tiga student dashboard menggunakan layout/component family yang sama.
- Perbedaan utama berasal dari status feature: active / limited / read-only / locked.
- Sensei-only feature tetap terlihat pada Free/LMS sebagai locked preview jika Figma menampilkannya.

### FR-ENT-03 — Free

- Free Member memperoleh free access sesuai rule desain final.
- Fitur di luar entitlement menampilkan locked UI dengan CTA pembayaran/upgrade.

### FR-ENT-04 — LMS

- LMS membuka full LMS feature untuk level yang dibeli.
- Achievement aktif.
- Jadwal/Replay/Tanya Sensei/Mini Checkpoint tetap locked jika user bukan LMS + Sensei.

### FR-ENT-05 — LMS + Sensei

- Seluruh feature LMS aktif.
- Sensei features aktif sesuai level/cohort.

### FR-ENT-06 — Deep-link Authorization

- User tidak boleh memperoleh akses premium hanya dengan mengetik URL.
- Frontend dapat melakukan route guard untuk UX, tetapi backend production tetap menjadi source of truth authorization.

### FR-ENT-07 — Expiry

- Membership expired mempunyai state jelas.
- Renewal CTA mengarah ke invoice/WhatsApp flow.

---

## 6.7 Dashboard

### FR-DASH-01 — Shared Structure

Dashboard student minimal menampilkan:

- greeting/user identity;
- membership;
- active/recent level;
- quick actions;
- feature entitlement grid;
- progress / achievement context;
- next learning action.

### FR-DASH-02 — Continue Journey

- CTA melanjutkan ke Chapter terakhir yang relevan.
- Bila belum ada progress, arahkan ke entry Chapter/level yang valid.

### FR-DASH-03 — Quick Action

- Quick actions berubah sesuai membership.
- Sensei dashboard mempunyai akses eksplisit ke Mini Checkpoint.

---

## 6.8 Level Journey & Chapter Journey

### FR-JRN-01 — Level Selection

- User melihat level yang aktif, locked, limited, atau belum dibeli.
- Purchased level tidak boleh di-hardcode hanya satu level.

### FR-JRN-02 — Chapter

- Chapter menampilkan progress dan status.
- Chapter content mengikuti urutan yang ditentukan Admin/config.
- Checkpoint terbuka setelah prerequisite Chapter terpenuhi sesuai rule.

### FR-JRN-03 — Progress

- Progress dihitung dari completion state content/assessment, bukan hanya dari user membuka screen.
- Bobot exact per activity adalah configurable business rule; jangan hardcode sebelum backend rule final dikunci.

---

## 6.9 Learning Content

### FR-LRN-01 — Video

- Video lesson mempunyai completion state.
- Source video berasal dari content config.

### FR-LRN-02 — Modul

- Mendukung modul Tata Bahasa dan Huruf Jepang/Kanji sebagaimana screen final.
- PDF/file URL disediakan backend/media storage.

### FR-LRN-03 — Flashcard

- Collection/list deck.
- Session card front/back.
- Flip interaction dari HTML reference harus dipertahankan kualitasnya saat migrasi React.
- Completion/confidence state dapat disimpan production.

### FR-LRN-04 — Audio & Reading

- Question flow sesuai Figma.
- Media/content missing mempunyai failure state yang jelas.

### FR-LRN-05 — Library

- User dapat browse materi sesuai entitlement.
- Search/filter sesuai screen final.
- Locked material tidak dapat dibuka melalui deep link.

---

## 6.10 Latihan Harian

### FR-EX-01

- Latihan Harian terpisah dari Try Out.
- Tidak mengurangi attempt Try Out.
- Mendukung category/activity sesuai config.
- Result/history tersimpan production.
- Question dapat memiliki image opsional yang diupload Admin.

---

## 6.11 Checkpoint Chapter

### FR-CHK-01

- Checkpoint merupakan bagian dari Journey Chapter.
- Unlock mengikuti prerequisite content.
- Question dapat memiliki image opsional.
- User dapat submit dan melihat result.
- Completion Checkpoint memengaruhi completion Chapter sesuai config.

---

## 6.12 Try Out

### FR-TRY-01 — Availability

- Try Out dipisahkan dari Latihan Harian.
- Access dapat dikonfigurasi Admin.

### FR-TRY-02 — Information

Sebelum mulai tampil minimal:

- jumlah soal/config;
- timer/durasi;
- attempt rule;
- review availability.

### FR-TRY-03 — Runner

- Timer aktif sesuai config.
- Autosave jawaban.
- Auto-submit ketika timer mencapai 00:00.
- Navigator soal.
- Flag/marked state bila tersedia.
- Image question opsional.
- Network disconnect tidak boleh sengaja menghapus jawaban yang sudah berhasil disimpan.

### FR-TRY-04 — Result

- Menampilkan final score.
- Menampilkan score breakdown jika dikonfigurasi.
- Menyimpan attempt history.

### FR-TRY-05 — Review

- Review hanya tersedia bila Admin mengaktifkannya.
- Bila review disabled, tampilkan explicit unavailable state.

---

## 6.13 Mini Checkpoint — LMS + Sensei

> Requirement di bagian ini mengikuti **revisi client terbaru** dan menggantikan konsep lama “tanpa timer / setiap 5 pertemuan”.

### FR-MINI-01 — Audience

- Hanya member **LMS + Sensei** yang dapat mengerjakan.
- Free dan LMS dapat melihat locked preview bila ditampilkan pada dashboard final.

### FR-MINI-02 — Level

Mini Checkpoint hanya untuk:

- N5;
- N4;
- N3;
- N2.

N1 tidak dimasukkan tanpa revisi client baru.

### FR-MINI-03 — Structure

- Mini Checkpoint diklasifikasikan menggunakan **level → sesi → part**.
- Contoh struktur mengikuti Figma terbaru: `N4 sesi 2 part 1`.
- Jumlah sesi/part final berasal dari config Admin.

### FR-MINI-04 — Timer

- Timer configurable oleh Admin.
- Timer dimulai ketika attempt benar-benar dimulai.
- Saat waktu habis, attempt auto-submit.

### FR-MINI-05 — Score & Passing

- Setelah submit, score ditampilkan.
- Admin mengatur passing score.
- Result menampilkan status **LULUS** atau **TIDAK LULUS**.
- Passing score yang berlaku pada attempt harus dapat diaudit; perubahan threshold setelah attempt tidak boleh diam-diam mengubah historical result tanpa aturan migrasi.

### FR-MINI-06 — Question Media

- Admin dapat upload image opsional per question.
- Runner dan review mampu menampilkan image tersebut.

### FR-MINI-07 — Review

- Review jawaban configurable.
- Bila aktif, user melihat benar/salah dan pembahasan.

### FR-MINI-08 — Admin Result Recap

Admin dapat melihat minimal:

- user;
- level;
- sesi;
- part;
- score;
- passing status;
- completion time/duration;
- attempt date.

---

## 6.14 Jadwal, Kelas, Replay, Tanya Sensei

### FR-SNS-01 — Schedule

- LMS + Sensei dapat melihat jadwal kelas.
- Empty schedule mempunyai explicit state.
- Link Zoom unavailable mempunyai explicit state.

### FR-SNS-02 — Replay

- Replay dapat berasal dari media/YouTube/source final.
- Processing/error state tersedia.

### FR-SNS-03 — Tanya Sensei

- User dapat membuat pertanyaan.
- Draft/sent state dapat dibedakan sesuai Figma.
- Attachment dapat didukung sesuai screen state terbaru.

---

## 6.15 Admin — Program & Content Builders

### FR-ADM-01 — Program

Admin dapat mengelola:

- program/level identity;
- status publish;
- harga/config terkait;
- entitlement mapping;
- Chapter free rule bila applicable.

### FR-ADM-02 — Chapter Builder

Admin dapat mengatur:

- Chapter;
- content order;
- prerequisite;
- scoring/progress config yang tersedia;
- publish state.

### FR-ADM-03 — Quiz Builder

Digunakan untuk Latihan/Checkpoint sesuai desain.

Minimum:

- question type;
- prompt;
- options;
- correct answer;
- explanation;
- difficulty;
- image/audio optional media;
- randomization settings;
- passing/attempt config where applicable.

### FR-ADM-04 — Try Out Builder

Minimum:

- level;
- sections;
- question pools;
- allocation;
- timer;
- scoring;
- passing logic;
- attempt rules;
- review availability;
- image question media;
- publish status.

### FR-ADM-05 — Mini Checkpoint Builder

Minimum:

- level N5/N4/N3/N2;
- sesi;
- part;
- question bank;
- timer;
- passing score;
- image question;
- correct answer/explanation;
- randomization as applicable;
- review config;
- publish status.

---

## 6.16 Admin — User, Access, Invoice, Result

### FR-ADM-06 — User Management

- Search/filter user.
- View membership/entitlement/progress summary.
- Sensitive PII dimasking di listing bila desain/policy mensyaratkan.

### FR-ADM-07 — Access Settings

- Admin dapat melihat dan mengubah entitlement melalui action yang terkontrol.
- Perubahan akses production harus tercatat/auditable.

### FR-ADM-08 — Invoice

- View invoice status.
- Verify payment.
- Activation result harus jelas.

### FR-ADM-09 — Assessment Results

- Menampilkan Placement, Checkpoint Chapter, Try Out, dan Mini Checkpoint.
- Detail score/breakdown mengikuti assessment type.
- Export dapat ditambahkan sesuai screen/phase yang disetujui.

---

## 6.17 Frontend-first Mocking Requirements

### FR-FE-01 — Mock Data Boundary

Frontend boleh menggunakan mock data untuk:

- current user;
- membership;
- entitlement;
- programs;
- levels;
- chapters;
- content;
- assessments;
- invoice;
- placement;
- blog;
- admin tables.

Tetapi mock harus diletakkan di boundary yang mudah diganti dengan API, bukan tersebar hardcoded di JSX.

### FR-FE-02 — Clickable Navigation

- Semua CTA core flow menggunakan route/link nyata.
- Placeholder route diperbolehkan bila screen belum dibuat, tetapi harus eksplisit dan tidak masquerade sebagai feature yang selesai.

### FR-FE-03 — Shared Components

Dilarang membuat tiga copy UI hanya untuk Free/LMS/Sensei bila layout dasarnya sama.

Contoh target abstraction:

- `Dashboard` + entitlement config;
- `FeatureCard` active/limited/locked/read-only;
- `AssessmentRunner` untuk assessment family;
- `QuestionMedia` untuk image/audio;
- `ResultSummary` untuk score/status;
- shared `PublicHeader`, `StudentSidebar`, `AdminSidebar`.

### FR-FE-04 — Reference HTML Fidelity

Saat mengubah HTML referensi menjadi React/Next.js:

- pertahankan transition/hover yang relevan;
- pertahankan flip Flashcard;
- pertahankan motion feel;
- jangan mengganti layout menjadi generik hanya karena lebih mudah;
- visual/content baru harus menyesuaikan Page 08–11, bukan mengembalikan copy Page 1.

---

# 7. Sketsa Model Data

> Ini adalah **product-level data model sketch**, bukan migration Laravel final. Nama tabel/field dapat berubah selama backend design selama semantics tetap sama.

## 7.1 Identity & Access

### `users`

- id
- name
- email
- whatsapp
- password_hash
- email_verified_at
- status
- created_at
- updated_at

### `user_profiles`

- user_id
- target_exam_level
- target_exam_period
- country optional
- joined_at
- avatar/media optional

### `roles`

- id
- key: `student`, `admin`

### `memberships`

- id
- user_id
- type: `free`, `lms`, `sensei`
- status
- starts_at
- expires_at
- source_invoice_id

### `entitlements`

- id
- user_id
- program_id
- level_id optional
- feature_key optional
- access_type
- starts_at
- expires_at
- status

---

## 7.2 Program & Journey

### `programs`

- id
- slug
- name
- type
- description
- status
- price/config reference

### `levels`

- id
- program_id
- code: N5/N4/N3/N2/N1/etc.
- title
- order/display_order
- status

### `chapters`

- id
- level_id
- title
- slug/key
- order
- description
- status

### `content_items`

- id
- chapter_id
- type: video/module/flashcard/audio/reading/etc.
- title
- order
- media_asset_id optional
- metadata_json
- status

### `user_content_progress`

- user_id
- content_item_id
- status
- progress_value
- completed_at
- last_opened_at

### `chapter_progress`

- user_id
- chapter_id
- progress_percent
- status
- completed_at

---

## 7.3 Media

### `media_assets`

- id
- uploader_user_id
- type: image/audio/pdf/video/replay/etc.
- storage_key
- public_or_signed_url strategy
- mime_type
- size_bytes
- alt_text optional
- metadata_json
- created_at

---

## 7.4 Assessment

### `assessments`

- id
- type: placement/latihan/checkpoint/tryout/mini_checkpoint
- title
- level_id optional
- chapter_id optional
- cohort_id optional
- session_number optional
- part_number optional
- timer_seconds optional
- passing_score optional
- max_attempts optional
- review_enabled
- status
- config_json

### `assessment_sections`

- id
- assessment_id
- title
- order
- timer_seconds optional
- scoring_config_json

### `questions`

- id
- assessment_id or question_pool_id
- section_id optional
- type
- prompt
- media_asset_id optional
- explanation
- difficulty
- order/config
- status

### `question_options`

- id
- question_id
- label/value
- is_correct
- order

### `assessment_attempts`

- id
- assessment_id
- user_id
- started_at
- submitted_at
- duration_seconds
- score
- passing_score_snapshot optional
- pass_status optional
- status
- auto_submitted boolean

### `assessment_answers`

- id
- attempt_id
- question_id
- selected_option_id/value
- is_correct
- marked boolean
- answered_at

---

## 7.5 Sensei/Cohort

### `senseis`

- id
- display_name
- status
- profile metadata

### `cohorts`

- id
- program_id
- level_id
- sensei_id
- period_start/end
- capacity
- status

### `cohort_members`

- cohort_id
- user_id
- status
- joined_at

### `class_sessions`

- id
- cohort_id
- session_number
- starts_at
- duration
- zoom_url optional
- status

### `replays`

- id
- class_session_id
- media/url
- status
- published_at

### `sensei_questions`

- id
- user_id
- cohort_id optional
- subject
- content
- attachment_media_id optional
- status
- created_at

---

## 7.6 Placement & Sales

### `placement_attempts`

- id
- user_id optional
- name
- whatsapp
- target_exam
- assessment_attempt_id optional
- recommended_level
- score/result metadata
- completed_at
- source
- referral_code optional

### `placement_leads`

- id
- placement_attempt_id
- status
- assignee_admin_id optional
- follow_up_note
- contacted_at
- registered_user_id optional

### `invoices`

- id
- invoice_code
- user_id
- program_id
- level_id optional
- membership_type
- subtotal
- discount_amount
- total
- status
- created_at
- verified_at
- verified_by

---

## 7.7 Referral & Diskon

### `referral_codes`

- id
- owner_user_id
- code
- status

### `referral_usages`

- id
- referral_code_id
- referred_user_id
- invoice_id
- status

### `referral_rewards`

- id
- owner_user_id
- source_usage_id
- reward_type: discount
- value/config
- status
- expires_at optional

---

## 7.8 Blog & SEO

### `articles`

- id
- title
- slug unique
- excerpt
- content
- featured_image_media_id optional
- author_user_id
- category_id optional
- status
- published_at
- meta_title
- meta_description
- canonical_url_override optional
- og_title optional
- og_description optional
- og_image_media_id optional
- created_at
- updated_at

### `article_categories`

- id
- name
- slug
- status

### `slug_redirects` *(recommended)*

- id
- source_path
- destination_path
- redirect_type
- created_at

---

## 7.9 Community, Feedback, Certificate, Notification

### `community_posts`, `community_comments`, `community_reports`

Untuk V2/full implementation sesuai Page 08–11.

### `feedback_entries`

- user_id
- level_id
- type
- content/rating fields
- submitted_at

### `testimonials`

- user_id optional
- content
- status
- approved_at

### `certificates`

- user_id
- program/level
- certificate_code
- issued_at
- verification status/url

### `notifications`

- user_id
- type
- title
- body
- read_at
- metadata

### `audit_logs`

- actor_user_id
- action
- target_type
- target_id
- before_json optional
- after_json optional
- ip/context metadata
- created_at

---

# 8. Kasus Ekstrem dan Status Kegagalan

## 8.1 Account

- Email sudah digunakan.
- WhatsApp sudah digunakan.
- User mencoba login dengan nomor format berbeda tetapi nomor yang sama.
- Password salah berulang kali.
- Verification token expired.
- Reset token expired atau sudah dipakai.
- Session expired saat user sedang berada pada private screen.

## 8.2 Entitlement

- Free user membuka URL Try Out secara manual.
- LMS user membuka Mini Checkpoint secara manual.
- Membership expired di tengah session.
- User membeli dua level berbeda.
- Invoice diverifikasi dua kali.
- Entitlement berubah saat browser masih menyimpan mock/cache state lama.
- Level/product dinonaktifkan setelah user sudah mempunyai entitlement.

Expected behavior: production backend tetap final authority; frontend memperbarui state dan menampilkan pesan yang dapat ditindaklanjuti.

## 8.3 Payment / WhatsApp

- Invoice creation berhasil tetapi WhatsApp gagal terbuka.
- WhatsApp terbuka tetapi user tidak membayar.
- User membayar nominal salah.
- Admin memverifikasi invoice yang sudah dibatalkan.
- User membuat banyak invoice untuk order yang sama.
- Referral discount berubah setelah invoice dibuat.

Expected behavior: invoice snapshot menyimpan nilai transaksi yang berlaku saat invoice dibuat.

## 8.4 Placement

- User keluar sebelum selesai.
- User mengulang Placement beberapa kali.
- Lead data tersimpan tetapi assessment processing gagal.
- WhatsApp invalid.
- Hasil tidak dapat dihitung karena question/config corrupt.

## 8.5 Journey & Content

- Content item dihapus tetapi progress historical masih ada.
- Media URL expired.
- PDF/video gagal dimuat.
- User membuka Chapter locked melalui deep link.
- Checkpoint terbuka sebelum prerequisite completion akibat stale state.

## 8.6 Flashcard

- Deck kosong.
- User refresh saat card sedang flipped.
- Progress/confidence save gagal.

## 8.7 Try Out / Assessment

- Network putus saat timer berjalan.
- Autosave request gagal.
- Timer client berbeda dari server.
- User menutup tab lalu kembali.
- Timer mencapai zero saat answer request terakhir belum selesai.
- Attempt quota habis.
- Review disabled.
- Question image gagal dimuat.
- Question media terlalu besar/unsupported.

Production expectation: server time/config menjadi authority untuk timer final dan submit state.

## 8.8 Mini Checkpoint

- User LMS non-Sensei membuka route.
- Mini Checkpoint N1 dibuat Admin walaupun scope hanya N5–N2.
- Sesi/part duplikat pada level yang sama.
- Passing score berubah setelah attempt selesai.
- Attempt auto-submit karena timer habis.
- User score persis sama dengan passing score → dianggap **Lulus** kecuali client mengubah rule.
- Image question hilang tetapi text/options masih tersedia.

## 8.9 Blog / SEO

- Slug duplikat.
- Admin mengganti slug artikel published.
- Article draft diakses melalui URL public.
- Featured image kosong.
- Meta title/description kosong.
- Canonical override invalid.
- Artikel dihapus tetapi masih muncul di sitemap/cache.
- HTML/rich text body mengandung script atau unsafe embed.

## 8.10 Admin

- Admin membuka record yang sudah dihapus admin lain.
- Concurrent edit.
- Export dataset besar.
- Upload gagal di tengah proses.
- Invalid MIME/file extension.
- User non-admin mencoba mengakses `/admin`.

---

# 9. Metrik Keberhasilan

## 9.1 Acquisition

- Visitor → Program Detail click-through rate.
- Visitor → Register/Placement conversion.
- Placement completion rate.
- Invoice creation rate.
- Invoice → verified payment conversion.
- Free → paid upgrade conversion.

## 9.2 Learning

- Percentage user yang memulai Journey setelah login.
- Chapter completion rate.
- Weekly learning activity.
- Latihan Harian completion rate.
- Try Out completion rate.
- Mini Checkpoint completion rate untuk LMS + Sensei.
- Percentage user yang menggunakan review setelah assessment.

## 9.3 Product Reliability

Internal launch target:

- 0 broken route pada critical frontend journeys.
- 0 cross-role access yang hanya bergantung pada hidden UI saat production authorization aktif.
- Critical public pages dapat dimuat tanpa client-side JavaScript dependency untuk konten SEO utama.
- Public page visual stability dan interaction performance memenuhi acceptance QA internal.
- Assessment autosave/submit mempunyai observable success/error state.

## 9.4 SEO

- Jumlah artikel published dan indexed.
- Search impressions organik.
- Organic clicks.
- CTR organic.
- Non-branded keyword traffic.
- Program page organic landing sessions.
- Persentase public canonical pages yang valid di sitemap/indexing workflow.

## 9.5 Admin Efficiency

- Waktu dari draft artikel → published tanpa developer.
- Waktu follow-up Placement lead.
- Waktu invoice masuk → verified.
- Waktu membuat/publish assessment baru.
- Jumlah operasi konten rutin yang dapat dilakukan tanpa code deployment.

---

# 10. Pertanyaan Terbuka

Item berikut **harus tetap diberi label OPEN** sampai client/owner mengunci jawabannya. Jangan mengarang jawaban pada implementasi.

## OPEN-01 — Dasar Bahasa Jepang

Figma public telah menampilkan `Dasar Bahasa Jepang`, tetapi full Journey-nya belum setara dengan N-level utama.

**Perlu keputusan:** apakah Dasar Bahasa Jepang adalah program mandiri penuh dengan Chapter/Journey/assessment sendiri atau hanya entry package/content collection.

## OPEN-02 — SSW Pengolahan Makanan

PDF lama menyebut SSW, tetapi Page 08–11 belum mempunyai full program flow.

**Perlu keputusan:** masuk MVP production atau fase berikutnya.

## OPEN-03 — Interview

Interview muncul sebagai kategori/material context tetapi belum menjadi full product Journey.

**Perlu keputusan:** standalone product, library category, atau program nanti.

## OPEN-04 — Final catalog N1–N5

Figma final student Journey mengandung N1–N5 dan independent purchase behavior, sementara beberapa dokumen lama tidak konsisten.

**Keputusan saat ini:** frontend mengikuti Figma Page 08–11. Backend catalog final tetap perlu disahkan sebelum production seed.

## OPEN-05 — Exact Price & Promotion

Harga/promo tidak boleh diambil dari Page 1 lama.

**Perlu:** source configuration final dari client/Admin.

## OPEN-06 — Progress Weight

Exact weight video/modul/flashcard/audio/reading/checkpoint perlu dikunci backend/config jika masih dibutuhkan.

## OPEN-07 — Assessment Rules

Untuk masing-masing Try Out/Mini Checkpoint perlu data final:

- timer;
- jumlah soal;
- passing score;
- attempt limit;
- cooldown;
- review rule.

UI harus configurable dan tidak hardcode sample Figma sebagai production rule.

## OPEN-08 — WhatsApp Production Contact

Perlu nomor Admin production dan final message template.

## OPEN-09 — Blog Editor Format

Perlu dipilih implementation editor final:

- rich text structured JSON;
- sanitized HTML;
- Markdown/MDX-like authoring;
- atau editor lain.

Requirement mutlak: output harus aman, SEO-friendly, dan mudah dikelola Admin.

## OPEN-10 — SEO Domain

Perlu canonical production hostname final untuk:

- canonical URL;
- sitemap;
- structured data;
- Open Graph URLs;
- Search Console.

## OPEN-11 — Content Media Limits

Perlu rule production untuk:

- max image size;
- audio size;
- PDF size;
- accepted MIME;
- image dimensions/compression.

## OPEN-12 — Responsive Acceptance

Design Brief harus mengunci acceptance desktop/tablet/mobile berdasarkan reference HTML + Figma, terutama untuk Admin data-heavy screens dan assessment runner.

---

# Appendix A — Figma Functional Source Map

## Page 08 — Free Member

### Public

- `389:2` Landing Page
- `389:137` Program & Level
- `389:475` Program Detail
- `389:607` Testimoni
- `389:697` Blog List
- `389:892` Blog Detail
- `389:1003` Placement Start
- `389:1291` Placement Question
- `389:1409` Placement Result

### Account & Purchase

- `389:1528` Register + Referral
- `389:1654` Verification
- `389:1761` Login
- `389:1814` Forgot Password
- `389:1913` Reset Password
- `389:1982` Checkout
- `389:2145` Invoice + WhatsApp

### Dashboard & Learning

- `392:566` Dashboard Free
- `392:785` Level Journey
- `392:1005` Chapter Journey
- `392:1216` Chapter Overview
- `392:1434` Video
- `392:1638` Modul Tata Bahasa
- `392:1840` Modul Huruf Jepang & Kanji
- `398:2069` Flashcard Collection
- `392:2042` Flashcard Session
- `392:2273` Flashcard Complete
- `392:2455` Audio Question
- `392:2653` Reading Question
- `392:2842` Checkpoint

### Supporting

- `392:3045` Library Limited
- `392:3311` Latihan Limited
- `392:3598` Progress & Achievement
- `392:3833` Leaderboard
- `392:4143` Community Read Only
- `392:4594` Notification
- `392:4908` Profile
- `392:5093` Renewal

---

## Page 09 — Belajar Mandiri

- `390:2–1409` Public flow equivalent
- `390:1528–2145` Account & purchase equivalent
- `405:566` Dashboard Mandiri
- `405:785` Level Journey
- `405:1005` Chapter Journey
- `405:1216` Chapter Overview
- `405:1434` Video
- `405:1638` Modul Tata Bahasa
- `405:1840` Modul Huruf Jepang & Kanji
- `407:2695` Flashcard Collection
- `405:2042` Flashcard Session
- `405:2273` Flashcard Complete
- `405:2455` Audio
- `405:2653` Reading
- `405:2842` Checkpoint
- `405:3045` Latihan Harian
- `405:3332` Try Out List
- `405:3736` Try Out Info
- `405:3908` Try Out Runner
- `405:4049` Try Out Result
- `405:4269` Answer Review
- `405:4478` Library
- `405:4744` Progress & Achievement
- `405:5289` Community
- `405:5740` Final Level Feedback
- `405:5963` Certificates
- `405:6658` Notifications
- `405:6972` Profile
- `405:7157` Renewal

---

## Page 10 — Belajar dengan Sensei

- `419:2690` Dashboard Sensei
- `418:566` Level Journey
- `418:786` Chapter Journey
- `418:997` Chapter Overview
- `418:1215` Video
- `418:1419` Modul Tata Bahasa
- `418:1621` Modul Huruf/Kanji
- `418:1823` Flashcard Collection
- `418:2228` Flashcard Session
- `418:2459` Flashcard Complete
- `418:2641` Audio
- `418:2839` Reading
- `418:3028` Checkpoint
- `418:3231` Latihan Harian
- `418:3518` Try Out List
- `418:3922` Try Out Info
- `418:4094` Try Out Runner
- `418:4235` Try Out Result
- `418:4455` Review
- `418:4664` Library
- `418:4930` Progress
- `425:3073` Community
- `425:3524` Tanya Sensei
- `419:2913` Jadwal Zoom
- `419:3197` Detail Kelas
- `419:3437` Replay List
- `419:3711` Replay Player

### Mini Checkpoint — latest revision

- `975:3908` Mini Checkpoint List
- `975:4040` Mini Checkpoint Info
- `975:4148` Mini Checkpoint Runner
- `975:4297` Mini Checkpoint Result
- `975:4398` Mini Checkpoint Review

---

## Page 11 — Admin

### Core

- `431:152` Dashboard Admin
- `431:218` Program Management
- `431:406` Chapter Builder
- `431:582` Quiz Builder
- `431:727` Try Out Builder
- `431:923` Content Library Management
- `431:1116` Placement Builder & Leads
- `431:1323` Assessment Results
- `998:2616` Mini Checkpoint Builder

### User & Commerce

- `432:845` User Management
- `432:982` Access Settings
- `432:1192` Invoice Management
- `432:1309` Referral & Diskon
- `432:1478` Certificate Management

### Content

- `432:1609` Announcement
- `432:1743` Blog Management
- `432:1941` Testimonial Moderation
- `432:2076` Final Level Feedback Moderation
- `432:2199` Community Moderation
- `432:2320` Notification Templates
- `805:2532` Landing Page Management

### Sensei & Governance

- `432:2632` Sensei Management
- `432:2770` Cohort & Kelas
- `432:2934` Analytics & Google Analytics
- `432:3518` Audit Logs
- `432:3681` General Settings

---

# Appendix B — Frontend Architecture Constraints

Final stack yang dikunci untuk implementasi:

```text
Frontend
- Next.js App Router
- React
- TypeScript
- Tailwind CSS

Backend
- Laravel
- Laravel Sanctum

Database
- PostgreSQL

Media
- S3-compatible object storage

Testing
- Playwright
```

Recommended boundary:

```text
Next.js
  Public marketing + SEO
  LMS student UI
  Admin UI
        |
        | HTTPS / JSON
        v
Laravel
  Auth
  authorization
  entitlement
  business rules
  assessment
  payment verification
  CMS
        |
        v
PostgreSQL + Object Storage
```

Frontend-first implementation should initially substitute API calls with typed mock adapters, then replace those adapters with Laravel clients without changing screen composition.

---

# Appendix C — Explicit Anti-Regression Rules

Sebelum sebuah HTML reference dianggap berhasil dimigrasikan ke Next.js, lakukan perbandingan terhadap reference dan pastikan:

- hover state tidak hilang;
- transition tidak berubah menjadi abrupt tanpa alasan;
- interactive card tidak menjadi static card;
- Flashcard flip tetap smooth;
- selected/active state tetap jelas;
- visual hierarchy tidak disederhanakan menjadi generic admin/LMS template;
- spacing rhythm tetap terasa konsisten;
- button feedback tetap ada;
- layout baru mengambil **content/function Page 08–11**, bukan copy lama Page 1;
- role differences ditangani melalui state/entitlement, bukan fork UI yang tidak perlu.

**Prinsip implementasi akhir:**  
**Experience RefrensiHTML + fungsi Figma Page 08–11 + production architecture Next.js/Laravel/PostgreSQL.**
