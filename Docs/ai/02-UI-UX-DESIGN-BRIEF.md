# UI/UX DESIGN BRIEF — HIRU ACADEMY

**Dokumen:** `02-UI-UX-DESIGN-BRIEF.md`  
**Status:** Baseline frontend-first  
**Bergantung pada:** `01-PRD-HIRU-ACADEMY.md`  
**Target implementasi:** Next.js App Router + React + TypeScript + Tailwind CSS  
**Backend target:** Laravel + Sanctum + PostgreSQL  

---

# 0. Kontrak Source of Truth

Dokumen ini tidak mendesain ulang HIRU Academy dari nol. Tujuannya adalah menerjemahkan desain yang sudah disetujui menjadi aturan implementasi frontend yang konsisten, reusable, responsif, accessible, dan tetap mempertahankan pengalaman HTML referensi yang sudah terasa smooth.

## 0.1 Urutan otoritas

Jika ada konflik antar sumber, gunakan urutan berikut:

1. **Revisi client terbaru** — keputusan bisnis/fungsi tertinggi.
2. **Figma Page 08–11** — source of truth alur, fitur, copy, state, entitlement, dan peran.
3. **`RefrensiHTML.zip`** — source of truth pengalaman implementasi: ritme layout, hover, transisi, animasi, micro-interaction, tactile feel, dan pola interaksi yang sudah terasa smooth.
4. **`DESIGN.md`** — source utama token, brand direction, typography, spacing, shape language, dan visual rationale.
5. **Figma Page 1** — referensi visual/component family yang melahirkan HTML referensi.
6. **PDF LMS HIRU** — cross-check requirement; tidak boleh mengalahkan revisi client terbaru.

## 0.2 Aturan anti-regression HTML → Next.js

Migrasi teknologi **tidak boleh dijadikan alasan untuk menyederhanakan pengalaman**. Hal berikut dianggap regression bila sebelumnya ada di HTML referensi lalu hilang tanpa alasan produk/accessibility yang eksplisit:

- hover elevation kartu;
- transition warna, shadow, transform, dan opacity;
- active press feedback;
- selected/active navigation state;
- animasi masuk yang sudah digunakan;
- flip Flashcard 3D;
- tactile/clay shadow;
- icon movement/rotation/scale pada hover;
- smooth change pada progress dan state;
- responsive card composition;
- visual density dan whitespace rhythm;
- micro-feedback pada button, card, filter, dan navigation.

**Prinsip migrasi:** ubah struktur menjadi React reusable components, bukan kurangi pengalaman.

## 0.3 Yang tidak boleh diwarisi dari Page 1/HTML

Page 1 dan HTML referensi bukan source fitur final. Jangan menyalin:

- copy lama yang bertentangan dengan Page 08–11;
- entitlement lama;
- harga/promo contoh;
- katalog level/program lama bila berbeda dengan keputusan client;
- flow assessment lama;
- status Mini Checkpoint lama tanpa timer.

---

# 1. Prinsip Desain

## Prinsip 1 — Learning clarity before decoration

Setiap layar belajar harus menjawab tiga pertanyaan dalam ≤ 3 detik:

1. Saya sedang berada di mana?
2. Apa status/progres saya?
3. Apa tindakan berikutnya?

**Implikasi UI:**

- level, Chapter, aktivitas, dan progress harus mudah dipindai;
- CTA utama hanya satu per konteks utama;
- dekorasi tidak boleh mengalahkan teks Jepang, pertanyaan, jawaban, timer, atau progress;
- Japanese content menjadi focal point, bukan ilustrasi.

**Alasan:** belajar bahasa Jepang sudah memiliki cognitive load tinggi. UI harus mengurangi, bukan menambah, beban pemrosesan.

---

## Prinsip 2 — Same structure, entitlement changes

Free Member, Belajar Mandiri, dan Belajar dengan Sensei memakai pola dashboard dan learning shell yang konsisten. Perbedaannya ditunjukkan melalui status akses, bukan tiga desain produk yang terpisah.

**Contoh:**

- kartu Try Out tetap terlihat untuk Free, tetapi `TERKUNCI`;
- Achievement aktif pada LMS dan Sensei;
- Mini Checkpoint hanya aktif untuk Sensei;
- Jadwal, Replay, Tanya Sensei terlihat sebagai preview locked bagi tier di bawahnya.

**Implikasi frontend:** satu component family dengan props/state berbeda lebih diutamakan daripada component per-role yang diduplikasi.

**Alasan:** pengguna yang upgrade tidak perlu mempelajari ulang UI, dan codebase tidak bercabang menjadi tiga produk berbeda.

---

## Prinsip 3 — Tactile, smooth, but purposeful

Motion dan tactile accents dari HTML referensi harus dipertahankan, tetapi setiap motion harus mengkomunikasikan perubahan state atau affordance.

Gunakan motion untuk:

- hover affordance;
- active press;
- card selection;
- expand/collapse;
- page/section reveal ringan;
- progress/state change;
- Flashcard flip;
- result reveal.

Jangan gunakan motion untuk:

- dekorasi looping yang mengganggu belajar;
- bounce berlebihan;
- perpindahan layout besar tanpa kebutuhan;
- delay yang memperlambat assessment.

**Alasan:** pengalaman HTML sudah terasa smooth; target Next.js adalah mempertahankan rasa tersebut sambil membuatnya lebih konsisten dan predictable.

---

# 2. Arahan Visual

## 2.1 Mood

HIRU Academy harus terasa:

- **modern** — bukan LMS sekolah yang kaku;
- **warm** — belajar Jepang terasa approachable;
- **structured** — pengguna selalu merasa memiliki arah;
- **academic but friendly** — serius pada hasil belajar, tidak intimidatif;
- **soft-tech** — teknologi hadir membantu, tidak terasa enterprise-heavy;
- **tactile** — card dan control memiliki sedikit depth agar clickable surface mudah dipahami.

`DESIGN.md` mendeskripsikan arah ini sebagai **Modern Minimalism + Tactile accents**, dengan Claymorphism digunakan terutama pada elemen yang membutuhkan depth atau playfulness.

## 2.2 Referensi internal

| Sumber | Fungsi |
|---|---|
| `landingpage.html` | marketing composition, program card hover, Japanese well |
| `dashboard.html` | dashboard shell, tactile card hover, navigation |
| `pilih perjalananmu.html` | level selection dan journey card |
| `journey.html` | Chapter progression, active/inactive state |
| `perpustakaan.html` | search/filter/material grid |
| `flashcard management.html` | deck management, card interaction, reveal animation |
| `flashcard.html` | 3D flip interaction |
| `latihan.html` | short-practice card family |
| `tryout.html` | assessment runner shell |
| `hasiltryout.html` | result hierarchy, score emphasis |
| `program.html` | program/facility composition |

## 2.3 Yang harus dihindari

- dashboard dengan terlalu banyak warna kompetitif;
- gradien random untuk membedakan feature;
- icon tanpa label pada fungsi penting;
- hidden premium feature yang membuat tier lain tidak tahu fitur tersebut ada;
- layout admin yang terlalu decorative sehingga tabel sulit dipindai;
- shadows hitam berat;
- border gelap di semua card;
- text density tinggi tanpa grouping;
- terlalu banyak modal untuk flow utama;
- animation yang menggeser posisi CTA ketika pengguna akan menekan;
- membuat Free/LMS/Sensei sebagai tiga design system berbeda.

---

# 3. Design Tokens

## 3.1 Semantic color system

Sumber utama adalah YAML di `DESIGN.md`. Nama semantic frontend disederhanakan agar developer tidak bingung antara Material-style `primary` dan orange brand yang secara visual menjadi CTA utama.

| Token frontend | Hex | Sumber | Penggunaan |
|---|---:|---|---|
| `canvas` | `#F9F9FF` | `background/surface` | background aplikasi utama |
| `surface` | `#FFFFFF` | `surface-container-lowest` | cards, modal, panel |
| `surface-soft` | `#F0F3FF` | `surface-container-low` | sidebar, filter zone, secondary panel |
| `surface-muted` | `#E7EEFE` | `surface-container` | selected background ringan |
| `surface-strong` | `#DCE2F3` | `surface-container-highest` | separators / state region |
| `ink` | `#151C27` | `on-surface` | heading/body utama |
| `muted` | `#564336` | `on-surface-variant` | secondary copy |
| `navy` | `#595E70` | `secondary` | navigation active, secondary action |
| `navy-dark` | `#2A313D` | `inverse-surface` | dark emphasis / strong control |
| `brand-orange` | `#F48220` | `primary-container` | accent, progress, active indicator, highlight |
| `brand-orange-dark` | `#954900` | `primary/surface-tint` | accessible strong CTA / dark orange text |
| `on-orange` | `#5A2A00` | `on-primary-container` | text/icon on `#F48220` |
| `orange-soft` | `#FFDCC6` | `primary-fixed` | subtle highlight / selected chip |
| `border-warm` | `#DDC1B0` | `outline-variant` | subtle warm border |
| `border-strong` | `#8A7264` | `outline` | focused/semantic border where needed |
| `danger` | `#BA1A1A` | `error` | destructive/error |
| `danger-soft` | `#FFDAD6` | `error-container` | error surface |
| `danger-text` | `#93000A` | `on-error-container` | error text on soft surface |

### Keputusan canvas

`DESIGN.md` YAML menggunakan `#F9F9FF`, sedangkan bagian naratif Elevation menyebut Light Warm `#FFF7EF`, dan `landingpage.html` juga menggunakan `#FFF7EF` pada body. **Jangan mencampur keduanya sebagai global canvas.**

Keputusan implementasi:

- app/LMS/Admin global canvas = `#F9F9FF`;
- `#FFF7EF` boleh dipakai terbatas pada marketing section yang memang berasal dari landing HTML dan masih sesuai screenshot/reference;
- jangan ubah seluruh LMS menjadi cream.

### Keputusan kontras CTA

HTML referensi sering menggunakan `#F48220` + white. Secara visual bagus, tetapi untuk text button normal kombinasi ini tidak cukup kontras. Karena `DESIGN.md` sudah menyediakan `on-primary-container: #5A2A00`, gunakan:

- `#F48220` + `#5A2A00` untuk CTA orange yang perlu lolos AA pada ukuran normal; atau
- `#954900` + white untuk CTA strong/high-stakes.

Orange + white boleh dipertahankan hanya pada decorative mark/icon atau text besar yang memenuhi acceptance accessibility.

## 3.2 Typography

**Font:** Plus Jakarta Sans.

Alasan: sudah digunakan konsisten pada `DESIGN.md`, Figma, dan HTML; bentuk geometrisnya modern tetapi tidak terlalu techy, dan hierarchy Latin/Japanese pada desain saat ini sudah dibangun di atas metrik font ini.

| Token | Desktop | Mobile | Weight | Line height | Use |
|---|---:|---:|---:|---:|---|
| `display-lg` | 48px | 32px | 800 | 1.2 | hero / major result |
| `headline-md` | 24px | 22–24px | 700 | 1.4 | section title |
| `body-lg` | 18px | 17–18px | 400 | 1.6 | intro / explanatory copy |
| `body-md` | 16px | 16px | 400 | 1.6 | default body |
| `label-sm` | 14px | 14px | 600 | 1.0 | chips / compact labels |
| `japanese-ruby` | 12px | 12px | 500 | 1.0 | furigana/ruby |

### Japanese content

- Japanese sentence utama tidak boleh dipaksa mengikuti `label-sm`.
- Furigana harus memakai semantic `<ruby><rt>` bila memungkinkan, bukan absolutely positioned text yang rapuh.
- Jepang Profesional / Jepang Pemula harus memiliki hierarchy yang jelas, bukan sekadar perbedaan warna.
- panjang sentence Jepang harus diuji pada mobile; jangan memakai fixed height untuk text container.

## 3.3 Spacing scale

Dasar: **8px linear rhythm**.

| Token | Nilai | Use |
|---|---:|---|
| `space-1` | 4px | micro gap/icon |
| `space-2` | 8px | base |
| `space-3` | 12px | compact stack |
| `space-4` | 16px | gutter/mobile card gap |
| `space-6` | 24px | container padding / standard stack |
| `space-8` | 32px | large card internal padding |
| `space-12` | 48px | section separation |
| `space-16` | 64px | public section spacing |
| `space-24` | 96px | major landing separation when composition requires |

**Rules:**

- card internal padding default 24px; premium/hero cards 32px;
- mobile page horizontal padding 16px;
- desktop page/container padding 24–32px;
- 48px+ digunakan antara learning modules yang berbeda, sesuai `DESIGN.md`.

## 3.4 Radius

`DESIGN.md` dan actual HTML menggunakan beberapa radius set yang tidak sepenuhnya identik. Frontend harus memakai semantic radius berikut agar visual stabil:

| Token | Nilai | Use |
|---|---:|---|
| `radius-sm` | 4px | tiny marker |
| `radius-control` | 8px | input, button, compact control |
| `radius-md` | 12px | Japanese well, filter panel |
| `radius-lg` | 16px | secondary cards |
| `radius-card` | 24px | major course/feature cards |
| `radius-full` | 9999px | pills, progress, badges |

## 3.5 Elevation & shadows

| Level | Style | Use |
|---|---|---|
| 0 | no shadow | canvas |
| 1 | white surface + 1px soft border | default card |
| 2 | `0 4px 20px rgba(0,0,0,.05)` | lifted panel |
| Hover | `0 10px 20px rgba(244,130,32,.08)` | interactive card |
| Hover strong | up to `0 15px 30px rgba(244,130,32,.15)` | deck/card emphasis |
| Clay | soft outer + subtle inner highlight/shadow | illustration, selected learning card, result accent |

Jangan gunakan drop shadow hitam pekat sebagai default.

## 3.6 Motion tokens

Dari HTML referensi ditemukan transition 200/300/500ms, 600ms Flashcard flip, fade-in-up 600ms, translate-y, scale, rotate, dan group-hover motion.

| Token | Durasi | Use |
|---|---:|---|
| `motion-fast` | 200ms | button color/press, icon |
| `motion-base` | 300ms | card hover, shadow, nav state |
| `motion-slow` | 500ms | section/result transition |
| `motion-flip` | 600ms | Flashcard 3D flip |
| `reveal-up` | 600ms ease-out | limited initial reveal; translateY 10→0 |

### Motion behaviors yang harus dipertahankan

- card hover: translateY sekitar `-2px` sampai `-4px` + orange ambient shadow;
- button active: scale sekitar `0.95–0.99` sesuai ukuran/control;
- icon hover: scale/translate/rotate ringan;
- Flashcard: `transform-style: preserve-3d`, backface hidden, rotateY(180deg), 600ms;
- jangan mengganti Flashcard flip dengan opacity crossfade.

### Reduced motion

Untuk `prefers-reduced-motion: reduce`:

- non-essential transform/reveal dimatikan;
- Flashcard tetap mengganti state, tetapi transisi dapat dipersingkat/hilang;
- tidak boleh menghambat pemahaman state.

---

# 4. Inventaris Layar

## 4.1 Aturan implementasi screen inventory

Figma memiliki banyak screen dan state. **Jangan mengubah setiap Figma state menjadi route React terpisah.** Screen yang mewakili loading/error/success/locked/confirmation harus dibuat sebagai reusable state dari screen family yang sama.

Route/page dibuat untuk destination yang memang memiliki URL atau konteks navigasi permanen. State dibuat sebagai:

- component state;
- modal/dialog;
- inline banner;
- empty state;
- error state;
- success state;
- loading/skeleton.

## 4.2 Page 08 — Free Member

### Public & acquisition

| Figma | Tujuan |
|---|---|
| `389:2` FREE / 01 — Landing Page | menjelaskan value HIRU dan mengarahkan visitor ke program/register |
| `389:137` FREE / 02 — Program & Level | memilih program/level |
| `389:475` FREE / 03 — Program Detail | memahami fasilitas dan benefit program |
| `389:607` FREE / 04 — Testimoni | social proof terpisah |
| `389:697` FREE / 05 — Blog List | discovery artikel SEO |
| `389:892` FREE / 06 — Blog Detail | membaca artikel SEO dan CTA contextual |
| `389:1003` FREE / 07 — Placement Start | mengumpulkan nama, WhatsApp, target ujian |
| `389:1291` FREE / 08 — Placement Question | menjalankan Placement Test |
| `389:1409` FREE / 09 — Placement Result | menampilkan hasil/rekomendasi program |

### Account & commerce

| Figma | Tujuan |
|---|---|
| `389:1528` FREE / 10 — Register + Referral | membuat akun dan optional referral |
| `389:1654` FREE / 11 — Verifikasi Akun | verification step |
| `389:1761` FREE / 12 — Login | login email/WhatsApp + password |
| `389:1814` FREE / 13 — Lupa Kata Sandi | meminta reset |
| `389:1913` FREE / 14 — Reset Kata Sandi | mengatur password baru |
| `389:1982` FREE / 15 — Checkout & Order Summary | ringkasan order dan create invoice |
| `389:2145` FREE / 16 — Invoice + WhatsApp | menampilkan invoice dan CTA WhatsApp Admin |

### Dashboard & learning

| Figma | Tujuan |
|---|---|
| `392:566` FREE / 17 — Dasbor Free Member | home LMS dengan preview entitlement |
| `392:785` FREE / 18 — Level Journey | memilih level yang dapat dijelajahi |
| `392:1005` FREE / 19 — Chapter Journey | melihat Chapter dan status akses |
| `392:1216` FREE / 20 — Chapter Overview | melihat aktivitas Chapter |
| `392:1434` FREE / 21 — Video Lesson | belajar lewat video |
| `392:1638` FREE / 22 — Modul Tata Bahasa | membaca modul grammar |
| `392:1840` FREE / 23 — Modul Huruf Jepang & Kanji | membaca modul huruf/kanji |
| `398:2069` FREE / 24 — Kumpulan Flashcard | memilih deck |
| `392:2042` FREE / 25 — Flashcard Session | belajar menggunakan flip card |
| `392:2273` FREE / 26 — Flashcard Selesai | merangkum sesi Flashcard |
| `392:2455` FREE / 27 — Audio Question | latihan audio |
| `392:2653` FREE / 28 — Reading Question | latihan reading |
| `392:2842` FREE / 29 — Checkpoint | checkpoint Chapter dengan media opsional |

### Supporting

| Figma | Tujuan |
|---|---|
| `392:3045` FREE / 30 — Perpustakaan Materi — Limited | browse materi dengan entitlement Free |
| `392:3311` FREE / 31 — Latihan Harian — Terbatas | short practice limited |
| `392:3598` FREE / 32 — Progres & Achievement | menunjukkan progress dan locked achievement |
| `392:3833` FREE / 33 — Leaderboard | leaderboard |
| `392:4143` FREE / 34 — Community — Read Only | membaca komunitas tanpa posting |
| `392:4363` FREE / 35 — Community Post Detail — Read Only | membaca thread |
| `392:4594` FREE / 36 — Notification Center | melihat notifikasi |
| `392:4908` FREE / 37 — Profil & Membership | profil, membership, referral |
| `392:5093` FREE / 38 — Renewal & Upgrade | membuka paid-access flow via invoice/WhatsApp |

### State families Free

Figma menyediakan state untuk login success, reset sent/expired, account verified, Placement processing/error, invoice created/payment pending, Checkpoint result, library empty, content locked, membership expired, Chapter lanjutan terkunci, Try Out terkunci, Community action terkunci, dan premium feature terkunci. Implementasikan sebagai state reusable, bukan standalone page kecuali URL/flow memang membutuhkannya.

## 4.3 Page 09 — Belajar Mandiri

Public/account screens mengikuti family yang sama dengan Free tetapi content/copy role-aware.

### Learning & supporting screens khas LMS

| Figma | Tujuan |
|---|---|
| `405:566` LMS / 17 — Dasbor Belajar Mandiri | dashboard unified dengan Achievement aktif, fitur Sensei locked |
| `405:785` LMS / 18 — Perjalanan Level | level access berdasarkan pembelian |
| `405:1005` LMS / 19 — Perjalanan Chapter | Chapter list |
| `405:1216` LMS / 20 — Ringkasan Chapter | activity overview |
| `405:1434` LMS / 21 — Pelajaran Video | video lesson |
| `405:1638` LMS / 22 — Modul Tata Bahasa | grammar module |
| `405:1840` LMS / 23 — Modul Huruf Jepang & Kanji | Japanese script/kanji module |
| `407:2695` LMS / 24 — Kumpulan Flashcard | deck selection |
| `405:2042` LMS / 25 — Sesi Flashcard | Flashcard runner |
| `405:2273` LMS / 26 — Flashcard Selesai | Flashcard result |
| `405:2455` LMS / 27 — Soal Audio | audio question |
| `405:2653` LMS / 28 — Soal Reading | reading question |
| `405:2842` LMS / 29 — Checkpoint | Chapter Checkpoint |
| `405:3045` LMS / 30 — Latihan Harian | short practice |
| `405:3332` LMS / 31 — Daftar Try Out | memilih Try Out |
| `405:3736` LMS / 32 — Informasi Try Out | rules, timer, attempts |
| `405:3908` LMS / 33 — Pengerjaan Try Out | timed assessment runner |
| `405:4049` LMS / 34 — Hasil Try Out | score + breakdown |
| `405:4269` LMS / 35 — Ulasan Jawaban | answer review bila diizinkan |
| `405:4478` LMS / 36 — Perpustakaan Materi | material library |
| `405:4744` LMS / 37 — Progres & Pencapaian | progress + Achievement |
| `405:4979` LMS / 38 — Papan Peringkat | leaderboard |
| `405:5289` LMS / 39 — Komunitas | member community |
| `405:5509` LMS / 40 — Detail Postingan Komunitas | thread/reply |
| `405:5740` LMS / 41 — Feedback Penyelesaian Level | feedback hanya akhir level |
| `405:5963` LMS / 42 — Pusat Sertifikat | certificate list |
| `405:6196` LMS / 43 — Detail Sertifikat | certificate detail/share/download |
| `405:6658` LMS / 45 — Pusat Notifikasi | notification center |
| `405:6972` LMS / 46 — Profil & Keanggotaan | profile/membership/referral |
| `405:7157` LMS / 47 — Perpanjangan | renewal via invoice + WA |

### State families LMS

Termasuk login/verification/Placement/payment states, Checkpoint result, Community form, feedback sent, empty library, locked content, expired membership, certificate unavailable, report success, level belum dibeli, Try Out locked/not started/attempt exhausted/timer auto-submit/review unavailable, level complete, referral actions, notification/community/certificate action states.

## 4.4 Page 10 — Belajar dengan Sensei

Semua core LMS family dipertahankan dengan entitlement Sensei aktif.

### Sensei-specific screens

| Figma | Tujuan |
|---|---|
| `419:2690` SENSEI / 17 — Dasbor Belajar dengan Sensei | dashboard unified; semua Sensei entitlement aktif |
| `425:3524` SENSEI / 41 — Tanya Sensei | mengirim pertanyaan ke Sensei |
| `419:2913` SENSEI / 48 — Jadwal Zoom | melihat jadwal kelas |
| `419:3197` SENSEI / 49 — Detail Kelas | detail sesi, link, status |
| `419:3437` SENSEI / 50 — Daftar Replay | daftar rekaman kelas |
| `419:3711` SENSEI / 51 — Pemutar Replay | menonton replay YouTube/embedded source |
| `765:4155` SENSEI / 52 — Feedback Penyelesaian Level | feedback akhir level |
| `975:3908` SENSEI / 53 — Mini Checkpoint Kelas | daftar Mini Checkpoint N5–N2 berdasarkan sesi/part |
| `975:4040` SENSEI / 54 — Informasi Mini Checkpoint | aturan timer, passing score, media |
| `975:4148` SENSEI / 55 — Pengerjaan Mini Checkpoint | timed runner, image optional, autosave |
| `975:4297` SENSEI / 56 — Hasil Mini Checkpoint | score, LULUS/TIDAK LULUS, breakdown |
| `975:4398` SENSEI / 57 — Ulasan Mini Checkpoint | review answer bila diaktifkan |

### State families Sensei

Selain LMS core states, tersedia Jadwal Zoom kosong, link Zoom belum tersedia, replay diproses/error, pengingat tersimpan, Tanya Sensei terkirim/draft, lampiran ditambahkan, dan Sensei-specific completion states.

## 4.5 Page 11 — Admin

### Auth & overview

| Figma | Tujuan |
|---|---|
| `431:2` ADMIN / 01 — Login Admin | admin authentication |
| `431:27` ADMIN / 02 — Lupa Kata Sandi | password recovery |
| `431:106` ADMIN / 03 — Reset Kata Sandi | set password baru |
| `431:152` ADMIN / 05 — Dashboard Admin | KPI, queue, Placement recap, operational entry points |

### Content & assessment builders

| Figma | Tujuan |
|---|---|
| `431:218` ADMIN / 06 — Pengelolaan Program | CRUD program/level/access |
| `431:406` ADMIN / 07 — Penyusun Chapter | struktur Chapter dan activity |
| `431:582` ADMIN / 08 — Penyusun Quiz | Latihan/Checkpoint question builder + upload image/audio |
| `431:727` ADMIN / 09 — Penyusun Try Out | section, pool, timer, score, passing, image |
| `431:923` ADMIN / 10 — Pengelolaan Perpustakaan Konten | reusable content/media |
| `431:1116` ADMIN / 11 — Penyusun Placement Test & Lead | Placement config + lead follow-up |
| `431:1323` ADMIN / 12 — Assessment Results | rekap Placement/Checkpoint/Mini Checkpoint/Try Out |
| `998:2616` ADMIN / 31 — Mini Checkpoint Builder | N5–N2, sesi/part, timer, passing score, question media |

### User & commerce

| Figma | Tujuan |
|---|---|
| `432:845` ADMIN / 13 — User Management | user list/detail |
| `432:982` ADMIN / 14 — Access Settings | membership/entitlement editing |
| `432:1192` ADMIN / 15 — Pengelolaan Invoice | invoice manual + verification |
| `432:1309` ADMIN / 16 — Pengelolaan Referral & Diskon | referral discount/reward rules |
| `432:1478` ADMIN / 17 — Certificate Management | certificate templates/issuance |

### Content & communication

| Figma | Tujuan |
|---|---|
| `432:1609` ADMIN / 18 — Announcement Management | announcement CRUD/schedule |
| `432:1743` ADMIN / 19 — Pengelolaan Blog | article CMS + SEO fields/slug |
| `432:1941` ADMIN / 20 — Moderasi Testimoni | testimonial moderation |
| `432:2076` ADMIN / 21 — Moderasi Feedback Akhir Level | feedback review → testimonial candidate |
| `432:2199` ADMIN / 22 — Community Moderation | post/comment/report moderation |
| `432:2320` ADMIN / 23 — Notification Templates | template management |
| `805:2532` ADMIN / 30 — Pengelolaan Landing Page | landing content CRUD/version/publish |

### Sensei & governance

| Figma | Tujuan |
|---|---|
| `432:2632` ADMIN / 25 — Pengelolaan Sensei | Sensei profile/assignment |
| `432:2770` ADMIN / 26 — Pengelolaan Cohort & Kelas | cohort, sessions, replay, Mini Checkpoint config |
| `432:2934` ADMIN / 27 — Analitik & Google Analytics | product/GA metrics |
| `432:3518` ADMIN / 28 — Audit Logs | trace admin/system changes |
| `432:3681` ADMIN / 29 — General Settings | global config |

### Admin state philosophy

Section F dan G pada Figma berisi banyak operational states seperti validation, destructive confirmation, export progress, save success, publish validation, invoice verification, referral flow, Landing Page publish/version restore, dan lain-lain. Jangan implementasikan sebagai puluhan route. Gunakan reusable patterns:

- `ConfirmDialog`;
- `ValidationSummary`;
- `SuccessBanner/Toast`;
- `AsyncJobState`;
- `EmptyTableState`;
- `AccessDeniedState`;
- `PublishChecklist`;
- `SaveState`.

---

# 5. User Flows

## 5.1 Visitor → program → sales

1. User masuk Landing dari direct/search/social.
2. Header/public CTA mengarahkan ke Program & Level.
3. User membuka Program Detail.
4. User memilih paket/tier.
5. User Register atau Login bila diperlukan.
6. Checkout menampilkan ringkasan program dan referral jika ada.
7. Sistem/frontend-first membuat mock invoice.
8. User melihat Invoice + CTA WhatsApp.
9. Pada production, Admin verifikasi pembayaran dan entitlement aktif.

**UX rule:** jangan sembunyikan bahwa pembayaran dilakukan manual via WhatsApp.

## 5.2 Google/Search → Blog → conversion

1. User masuk langsung ke Blog Detail melalui slug SEO.
2. Article header menampilkan title, metadata, author/category bila tersedia.
3. Isi artikel fokus pada readability; CTA tidak mengganggu body.
4. Related/contextual program CTA muncul setelah bagian relevan atau akhir artikel.
5. User membuka Program Detail / Register.

**UX rule:** blog bukan landing ad yang dibungkus artikel. Reading experience harus tetap utama.

## 5.3 Placement Test

1. User membuka Placement Start.
2. Mengisi Nama, Nomor WhatsApp, Target Ujian.
3. Validasi inline sebelum mulai.
4. User mengerjakan assessment.
5. Loading/processing state.
6. Hasil/rekomendasi tampil.
7. Lead tersimpan untuk Admin pada production.
8. CTA contextual menuju program sesuai hasil atau pilihan user.

## 5.4 Login → role-aware dashboard

1. User memasukkan Email/WhatsApp + password.
2. Submit dengan loading state.
3. Jika gagal, error inline + form tetap berisi identifier.
4. Jika berhasil, backend menentukan entitlement.
5. User diarahkan ke shared dashboard structure dengan status access sesuai membership.

## 5.5 Free learning journey

1. Dashboard → Lanjutkan Journey / pilih Level.
2. Level Journey → Chapter Journey.
3. Chapter 1 yang diizinkan terbuka.
4. Video → Modul → Flashcard → Audio/Reading → Checkpoint sesuai struktur Chapter.
5. Premium/Chapter lanjutan tetap terlihat locked.
6. Klik locked feature membuka upgrade/payment explanation, bukan dead end.

## 5.6 LMS learning journey

1. Dashboard menampilkan active Level dan Achievement.
2. User membuka Level/Chapter yang dibeli.
3. Menyelesaikan activity.
4. Progress update langsung secara visual.
5. Checkpoint terbuka sesuai aturan.
6. Level selesai → Feedback akhir level.
7. Certificate mengikuti eligibility.

## 5.7 Try Out

1. Daftar Try Out.
2. Pilih Try Out.
3. Information screen menjelaskan timer, question count, attempt, review.
4. Start → timer aktif.
5. Question runner dengan navigator, optional image/audio, autosave.
6. Timer habis → auto-submit.
7. Result → score + breakdown.
8. Review bila Admin mengaktifkan.

**UX rule:** timer selalu visible namun tidak boleh mendominasi content kecuali hampir habis.

## 5.8 Mini Checkpoint Sensei

1. Dashboard Sensei → Quick Action Mini Checkpoint.
2. Daftar berdasarkan N5/N4/N3/N2, sesi, part.
3. User memilih checkpoint yang tersedia.
4. Information menjelaskan timer dan passing score.
5. Start → timed runner.
6. Optional image ditampilkan dalam question canvas.
7. Submit/auto-submit.
8. Hasil menampilkan score dan status **LULUS/TIDAK LULUS**.
9. Review jika enabled.
10. Admin melihat result recap.

## 5.9 Kelas Sensei

1. Dashboard → Jadwal Kelas.
2. User melihat sesi mendatang.
3. Detail Kelas menampilkan status/link jika tersedia.
4. Setelah sesi selesai, Replay dapat tersedia.
5. Replay list → player.
6. User dapat menggunakan Tanya Sensei pada konteks yang diizinkan.

## 5.10 Community

Free:

1. buka Community;
2. baca list/thread;
3. posting/reply action menunjukkan locked upgrade state.

LMS/Sensei:

1. buka list;
2. lihat detail;
3. post/reply;
4. upload/attachment mengikuti aturan;
5. report bila diperlukan.

## 5.11 Admin Blog publish

1. Admin membuka Blog Management.
2. Create/edit article.
3. Isi title, slug, excerpt/content, featured image.
4. Isi SEO fields: meta title, description, canonical, OG.
5. Preview.
6. Validation checklist.
7. Draft/save.
8. Publish confirmation.
9. Public Next.js route tersedia pada `/blog/[slug]`.

## 5.12 Admin assessment authoring

### Quiz/Checkpoint

1. pilih assessment;
2. tambah/edit question;
3. pilih tipe;
4. isi prompt/options/correct answer;
5. optional upload image/audio;
6. configure randomization/passing/attempt bila relevant;
7. preview;
8. save/publish.

### Mini Checkpoint

1. pilih level N5–N2;
2. pilih sesi + part;
3. configure timer;
4. configure passing score;
5. question bank + image/audio;
6. preview;
7. publish;
8. result masuk Assessment Results.

## 5.13 Admin invoice verification

1. queue/dashboard → Invoice;
2. buka detail;
3. periksa payment evidence/status;
4. verify atau reject;
5. jika verify, membership/entitlement aktif;
6. success state + audit log.

---

# 6. Tata Letak per Screen Family

## 6.1 Public Header

**Desktop:**

- logo kiri;
- nav Program, Coba Gratis/Placement sesuai final screen, Testimoni, Blog;
- account CTA kanan;
- sticky hanya jika tidak mengganggu hero composition.

**Mobile:**

- logo;
- menu trigger;
- drawer/sheet dengan full-width actions.

**Interaction:** active nav state, 200–300ms transition, clear focus ring.

## 6.2 Landing Page

Hierarchy:

1. Header.
2. Hero: value proposition + primary CTA.
3. Program/membership preview.
4. Why HIRU / benefit bento.
5. Learning journey/feature proof.
6. Testimonial preview bila dibutuhkan.
7. Blog/article discovery.
8. CTA/footer.

**Primary action:** masuk Program/Coba Gratis/Register sesuai final copy Figma.

**Reference feel:** `landingpage.html`; card hover `translateY(-4px)` + orange ambient shadow.

## 6.3 Program & Level

- page heading + short explanation;
- tier/learning-mode cards;
- level selection grid;
- locked/sold/active states bila diperlukan;
- CTA per card.

**Rule:** jangan membuat level card berbeda visual total untuk setiap N-level; gunakan satu variant family.

## 6.4 Program Detail

- breadcrumb/back;
- hero program;
- facilities bento: Video Penjelasan, Modul, Latihan, Checkpoint, Flashcard, Try Out sesuai scope;
- access/tier comparison;
- purchase CTA sticky/visible tetapi tidak menutupi content.

## 6.5 Blog List

- heading;
- search/category filter jika final scope mengizinkan;
- featured article;
- article card grid/list;
- pagination/load more;
- empty state.

Card harus prioritaskan title + excerpt + category/date, bukan visual gimmick.

## 6.6 Blog Detail

- breadcrumb/category;
- title;
- metadata;
- featured image;
- article body dengan readable width sekitar 65–75 karakter Latin per line;
- Japanese text/container bila artikel mengandung Jepang;
- contextual CTA;
- related article.

## 6.7 Auth & Register

- split composition desktop bila mengikuti reference;
- form card menjadi focal point;
- input vertical stack;
- helper/error tepat di bawah field;
- password visibility;
- primary submit;
- alternate account link.

**Mobile:** single column, visual/decorative panel diperkecil atau dihilangkan tanpa menghilangkan informasi.

## 6.8 Checkout & Invoice

Checkout:

- order summary;
- selected program/level;
- referral input/state;
- price summary dari data;
- CTA `Buat Invoice & Buka WhatsApp`.

Invoice:

- invoice ID sangat jelas;
- payment status badge;
- order details;
- WhatsApp CTA;
- explanation bahwa aktivasi menunggu verifikasi Admin.

## 6.9 Student App Shell

Desktop:

- sidebar sekitar 256px;
- main content fluid;
- max reading/content width ditentukan per family, bukan global sempit;
- contextual page header.

Tablet:

- sidebar collapsible/rail atau drawer;
- content tetap memakai grid.

Mobile:

- sidebar → drawer;
- top app bar minimal;
- primary actions tidak boleh tersembunyi di hover.

## 6.10 Dashboard

Hierarchy:

1. greeting + membership/target;
2. continue journey;
3. quick actions;
4. entitlement grid;
5. progress/Achievement;
6. supporting info.

**Free/LMS/Sensei menggunakan layout family sama.** Locked card tidak grayscale total; fitur tetap terbaca, tetapi lock status jelas.

## 6.11 Level Journey

- heading + membership/access context;
- level card grid;
- status: active / available / locked / not purchased / completed;
- progress bila relevan;
- CTA contextual.

Reference: `pilih perjalananmu.html`.

## 6.12 Chapter Journey

- level context;
- Chapter list/cards;
- progress/status;
- visual connector/journey treatment bila ada;
- locked Chapter tetap terlihat.

Reference: `journey.html`.

## 6.13 Chapter Overview

- title + progress;
- activity grid/list;
- Video, Modul, Flashcard, Audio, Reading, Checkpoint;
- completion state;
- next-action emphasis.

## 6.14 Video & Module

Video:

- media frame first;
- title/context;
- completion/progress action;
- next activity.

Module:

- reading content width terkontrol;
- Japanese well;
- furigana/professional/pemula state sesuai feature final;
- sticky Chapter navigation hanya bila tidak mengganggu mobile reading.

## 6.15 Flashcard Management

- deck header/filter;
- progress summary;
- deck cards;
- tactile hover;
- completed/confidence state.

Reference: `flashcard management.html`.

## 6.16 Flashcard Session

- progress at top;
- centered Flashcard canvas;
- 3D flip;
- front/back hierarchy;
- confidence/next controls;
- keyboard shortcut optional V2, tetapi clickable/tappable wajib.

Reference behavior wajib: 600ms rotateY flip dengan preserved 3D feel.

## 6.17 Latihan Harian

- summary/recommendation;
- practice activity cards;
- category/level context;
- recent history;
- optional image-support indicator.

Jangan menyamakan visual hierarchy Latihan dengan Try Out; Latihan harus terasa ringan dan repeatable.

## 6.18 Assessment Runner — shared family

Digunakan oleh Checkpoint, Mini Checkpoint, Try Out dengan config.

Desktop:

- header/status;
- timer bila enabled;
- question canvas kiri/utama;
- navigator kanan;
- action footer.

Question canvas:

1. section/question label;
2. prompt;
3. optional image/audio;
4. Japanese text if any;
5. options/input;
6. mark/review action.

Mobile:

- timer sticky top;
- navigator dipindah ke drawer/bottom sheet;
- options full-width;
- submit tidak menutupi jawaban terakhir.

## 6.19 Assessment Result

- result identity;
- score besar;
- pass/fail bila applicable;
- breakdown;
- recommendation;
- review CTA bila allowed;
- back-to-journey CTA.

Reference: `hasiltryout.html`; clay result card boleh dipertahankan.

## 6.20 Community

- category/filter;
- post list;
- post card;
- compose CTA sesuai entitlement;
- thread detail + replies;
- report action secondary.

Free read-only state harus informatif, bukan disabled UI tanpa penjelasan.

## 6.21 Progress & Achievement

- overall progress;
- per-level/Chapter progress;
- Achievement card grid;
- locked/earned/in-progress variants;
- next recommended activity.

## 6.22 Certificate

List:

- eligible/issued cards;
- download/share status.

Detail:

- certificate preview;
- metadata;
- verify/share/download action.

## 6.23 Sensei Schedule & Replay

Schedule:

- upcoming session first;
- timeline/list;
- status/link state.

Replay:

- filter/list;
- source thumbnail/meta;
- player detail;
- loading/error states.

## 6.24 Admin Shell

Desktop-first information architecture:

- persistent sidebar;
- page title/action row;
- filters/search;
- main table/builder/panel;
- detail/edit panel jika diperlukan.

Admin tetap menggunakan tactile visual family tetapi density lebih tinggi daripada student pages.

## 6.25 Admin Table Page

- heading + primary action;
- KPI optional;
- search/filter toolbar;
- table;
- row action;
- pagination;
- detail drawer/modal bila edit minor;
- full route bila editing kompleks.

## 6.26 Admin Builder Page

- builder identity/status;
- left/center list of entities/questions/sections;
- editor panel;
- settings panel;
- preview;
- save/publish actions.

Pada tablet/mobile, builder boleh menjadi stacked flow; jangan mencoba mempertahankan tiga kolom sempit.

## 6.27 Blog CMS Editor

- title/slug group;
- editor/content;
- featured image;
- category;
- SEO accordion/panel;
- preview;
- validation checklist;
- draft/publish controls.

Slug harus terlihat editable namun tidak menjadi focal point utama.

---

# 7. Component Library

## 7.1 Foundations

### `AppContainer`
Variants: public, student, admin.  
States: normal, constrained-reading, full-width-builder.

### `Stack` / `Cluster` / `Grid`
Utility layout components atau conventions; jangan membuat div-spacing manual berbeda di setiap screen.

### `Icon`
Material Symbols treatment mengikuti HTML reference.  
Variants: outline, filled, semantic.

---

## 7.2 Navigation

### `PublicHeader`
Variants: default, active-program, active-blog, active-testimonial, active-placement.

### `StudentSidebar`
Variants: Free, LMS, Sensei; isi/menu berbeda berdasarkan role tetapi structure sama.

### `AdminSidebar`
Active section state wajib kuat tetapi tidak menggunakan orange pada seluruh row.

### `Breadcrumb`
Public detail, program, blog, admin builder.

### `Tabs`
States: default, hover, active, disabled.

---

## 7.3 Actions

### `Button`
Variants:

- primary-orange;
- primary-dark;
- secondary-navy;
- outline;
- ghost;
- danger;
- icon-only.

Sizes: sm, md, lg.  
States: default, hover, active, focus-visible, disabled, loading.

**Interaction:** preserve 200–300ms color/shadow/transform; active scale ringan.

### `LinkButton`
Untuk action yang secara semantic tetap navigation.

### `IconButton`
Wajib tooltip/aria-label bila icon saja.

---

## 7.4 Form controls

### `TextField`
States: default, hover, focus, filled, error, disabled, read-only.

### `PasswordField`
Tambah visibility toggle.

### `Select`
Keyboard accessible; jangan styling native-like tanpa semantics.

### `Checkbox` / `Radio`
Untuk answers/settings.

### `SearchField`
Debounce saat backend aktif; frontend-first menggunakan local mock filter.

### `FileUpload`
Variants: image, audio, PDF/general.

States:

- idle;
- drag-over;
- uploading;
- preview;
- success;
- validation error;
- upload error.

---

## 7.5 Content & cards

### `Card`
Variants: plain, interactive, clay, selected, locked, danger.

### `ProgramCard`
Plan/tier + CTA.

### `LevelCard`
States: active, available, locked, not-purchased, completed.

### `ChapterCard`
States: active, in-progress, completed, locked.

### `MaterialCard`
Video/module/flashcard/audio/reading.

### `EntitlementCard`
States: active, limited, locked, WA/payment.

### `AchievementCard`
States: earned, in-progress, locked.

### `ArticleCard`
Variants: featured, grid, compact.

### `StatCard`
Student/Admin metrics.

---

## 7.6 Learning components

### `ProgressBar`
Pill track + orange fill; animation harus menghormati reduced motion.

### `JapaneseWell`
Light inset surface untuk sentence/example.

### `JapaneseText`
Mendukung Japanese Profesional/Pemula dan ruby.

### `FuriganaText`
Gunakan `<ruby>` semantics bila memungkinkan.

### `FlashcardDeckCard`
Interactive hover dari HTML management.

### `FlashcardCanvas`
Front/back + preserved 3D flip.

### `ConfidenceControl`
Jika digunakan pada Flashcard.

### `MediaViewer`
Variants: video, image, audio, PDF/embedded.

---

## 7.7 Assessment

### `AssessmentShell`
Props minimal:

- type;
- title;
- timerEnabled;
- passingScore;
- reviewEnabled;
- attempt info.

### `QuestionCard`
Supports text/Japanese/media.

### `QuestionMedia`
Image/audio optional.

### `AnswerOption`
States: default, hover, selected, correct, incorrect, disabled.

### `QuestionNavigator`
States: unseen, answered, current, marked, error/required.

### `AssessmentTimer`
States: normal, warning, critical, expired.

### `AutosaveIndicator`
States: saved, saving, offline, failed.

### `ScoreHero`
Variants: neutral, passed, failed.

### `ScoreBreakdown`
Per section/category.

### `ReviewQuestion`
Correct/incorrect/explanation/media.

---

## 7.8 Commerce & membership

### `MembershipBadge`
Free / LMS / Sensei.

### `LockedFeature`
Harus menyertakan reason + CTA, bukan icon lock saja.

### `InvoiceStatusBadge`
Draft, Menunggu Pembayaran, Sudah Bayar, Diverifikasi, Aktif bila tetap dipakai backend.

### `ReferralCodeCard`
Copy/share state.

### `WhatsAppCTA`
External navigation affordance harus jelas.

---

## 7.9 Community & communication

### `PostCard`
### `CommentThread`
### `Composer`
### `AttachmentPreview`
### `NotificationItem`
### `AnnouncementBanner`

Free variant Composer = locked explanation, bukan fake enabled composer.

---

## 7.10 Admin

### `AdminTable`
Sort/filter/pagination/empty/loading/error.

### `FilterBar`
### `RowActionMenu`
### `DetailPanel`
### `BuilderSidebar`
### `BuilderCanvas`
### `SettingsPanel`
### `PublishChecklist`
### `SEOFieldGroup`
### `AuditEntry`
### `AsyncExportState`
### `ConfirmDialog`
### `ValidationSummary`

---

# 8. Status: Empty, Loading, Error, Success, Offline

## 8.1 Global rules

- loading yang diperkirakan > 300ms menggunakan skeleton/spinner contextual;
- jangan mengganti seluruh page dengan spinner jika shell/navigation sudah tersedia;
- error menjelaskan **apa yang gagal** dan **apa yang user dapat lakukan**;
- success tidak selalu membutuhkan modal; gunakan inline confirmation/toast sesuai konteks;
- offline penting pada assessment/autosave dan content/replay.

## 8.2 Public pages

| State | Behavior |
|---|---|
| Loading | skeleton hero/cards/article list |
| Empty | Blog: “Belum ada artikel” + back to program; Testimoni: neutral empty |
| Error | retry region, header/footer tetap usable |
| Success | tidak perlu success state khusus selain form/action |
| Offline | static cached content boleh tampil; CTA network-dependent diberi status |

## 8.3 Placement

- loading: question skeleton/progress;
- validation error: inline per field;
- processing: dedicated state;
- result error: retry + jangan kehilangan lead input jika bisa;
- offline saat assessment: beri warning, jangan pura-pura submit sukses.

## 8.4 Dashboard

- loading: shell + skeleton cards;
- empty: belum ada progress → CTA mulai Journey;
- error: data card dapat error parsial, tidak seluruh dashboard blank;
- expired membership: dedicated banner/state;
- offline: cached summary boleh, action network-dependent disabled dengan reason.

## 8.5 Journey & Library

- empty library sudah ada pada Figma;
- locked content harus menunjukkan reason/upgrade path;
- loading filter tidak memindahkan layout secara besar;
- error per section bila possible.

## 8.6 Flashcard

- loading deck;
- empty deck;
- failed deck load;
- completion success;
- offline: bila deck sudah termuat, local session boleh lanjut untuk frontend-first demo; production persistence strategy mengikuti backend.

## 8.7 Try Out / Mini Checkpoint / Checkpoint

### Loading

- timer **tidak dimulai** sampai assessment session resmi dimulai;
- question canvas skeleton;
- navigator skeleton.

### Error

- question load failure: retry tanpa mengurangi attempt jika backend belum memulai session;
- submit failure: tampilkan state “jawaban belum terkirim”; jangan redirect ke hasil palsu;
- image/audio failure: fallback text + retry media bila question tetap dapat dijawab.

### Offline

- persistent top warning;
- autosave indicator berubah `Offline`;
- timer behavior harus mengikuti server-authoritative rule pada production;
- jangan mengklaim jawaban tersimpan server ketika belum tersinkron.

### Success

- submit success → result route/state;
- Mini Checkpoint menampilkan LULUS/TIDAK LULUS berdasarkan passing score.

## 8.8 Community

- empty feed;
- posting loading;
- attachment upload error;
- report success;
- read-only/locked state Free.

## 8.9 Certificate

- unavailable state;
- generating/download loading;
- download failure;
- share-ready success.

## 8.10 Replay

- no schedule/replay;
- replay processing;
- player load error;
- unavailable link;
- offline explanatory state.

## 8.11 Admin tables

- skeleton rows;
- empty table;
- permission denied;
- partial filter error;
- export progress;
- export success/failure.

## 8.12 Admin builders

- unsaved changes indicator;
- saving;
- saved;
- validation failed;
- publish blocked;
- publish success;
- media upload progress/error;
- destructive confirmation.

---

# 9. Perilaku Responsif

## 9.1 Breakpoint intent

Gunakan breakpoint berdasarkan kebutuhan layout, bukan device brand:

- **Mobile:** `< 640px`
- **Tablet:** `640–1023px`
- **Desktop:** `>= 1024px`
- **Wide desktop:** `>= 1280px`

Tailwind breakpoint implementation boleh mengikuti config proyek selama behavior ini tercapai.

## 9.2 Public

### Mobile

- single-column;
- 16px horizontal padding;
- hero typography 32px;
- cards stack;
- nav drawer;
- CTA full-width bila perlu.

### Tablet

- 2-column card grids bila content muat;
- hero dapat tetap 1 kolom untuk readability.

### Desktop

- 12-column fluid grid;
- section gap 64–96px sesuai composition;
- card/bento menggunakan asymmetric layout bila reference HTML/Figma memang begitu.

## 9.3 Student shell

### Mobile

- sidebar menjadi drawer;
- content full-width;
- grid 1 column;
- entitlement cards 1–2 column sesuai width;
- sticky timer/header boleh digunakan pada assessment.

### Tablet

- sidebar collapsible;
- content 2-column untuk cards;
- library/filter menjadi horizontal scroll atau wrap.

### Desktop

- fixed sidebar ~256px;
- main content fluid;
- 2–3 column bento sesuai screen.

## 9.4 Assessment

### Mobile

- question full width;
- navigator bottom sheet/drawer;
- timer sticky;
- answer option min target 44px;
- image `max-width: 100%`, no horizontal overflow.

### Desktop

- question + navigator side-by-side;
- navigator tidak mengambil lebih banyak ruang daripada question;
- submit tetap terlihat pada akhir flow tanpa menutup content.

## 9.5 Admin

Admin adalah desktop-first, bukan desktop-only.

### Mobile/Tablet

- tables dapat horizontal scroll hanya bila card transformation akan menghilangkan data penting;
- high-priority columns dapat menjadi card list pada narrow screens;
- builder 3-column berubah menjadi sequential panels/tabs;
- destructive actions tidak diletakkan terlalu dekat dengan primary save.

### Desktop

- dense but breathable table;
- sticky table header pada dataset panjang bila membantu;
- side/detail panel untuk edit ringan.

---

# 10. Aksesibilitas

## 10.1 Target

Target minimum: **WCAG 2.2 AA** untuk public, LMS, dan Admin.

## 10.2 Kontras

- body/normal text: minimal 4.5:1;
- large text: minimal 3:1;
- UI component/focus indicator: minimal 3:1 terhadap adjacent color;
- status tidak boleh bergantung pada warna saja.

**Known adjustment:** white text di `#F48220` tidak cukup untuk normal body/button text. Gunakan `#5A2A00` pada orange atau white pada `#954900`.

## 10.3 Focus order

Urutan fokus harus mengikuti visual reading order:

1. skip link;
2. primary navigation;
3. page heading/context;
4. main controls;
5. content;
6. secondary actions.

Modal/dialog harus focus-trap dan mengembalikan fokus ke trigger setelah ditutup.

## 10.4 Keyboard

Wajib dapat digunakan keyboard:

- header/menu;
- tabs;
- form;
- cards yang clickable;
- Flashcard flip button;
- assessment options;
- question navigator;
- modal;
- table actions;
- rich editor toolbar yang dipilih nanti.

Card clickable tidak boleh hanya `<div onClick>` tanpa semantic button/link.

## 10.5 ARIA / semantics

- gunakan landmark `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`;
- timer assessment: gunakan live region yang tidak mengumumkan setiap detik; announcement hanya pada threshold penting;
- autosave status: `aria-live="polite"`;
- error summary harus terhubung ke field via `aria-describedby`;
- icon-only button wajib `aria-label`;
- progress gunakan `<progress>` atau `role="progressbar"` dengan value;
- tabs mengikuti tab semantics;
- dialog memakai accessible name/description;
- `<ruby><rt>` untuk furigana;
- decorative clay/icon diberi `aria-hidden="true"`.

## 10.6 Touch targets

Interactive target minimum praktis 44×44px untuk mobile action utama.

## 10.7 Motion accessibility

Implementasikan `prefers-reduced-motion` tanpa menghilangkan perubahan state. Motion non-esensial dimatikan; state tetap jelas.

## 10.8 Assessment accessibility

- timer warning tidak hanya merah; tambahkan label/text;
- selected answer memiliki shape/border/icon selain warna;
- correct/incorrect pada review memakai icon + text;
- image question membutuhkan alt text dari Admin; jika image merupakan isi soal dan tidak dapat dideskripsikan tanpa membocorkan jawaban, requirement authoring harus menyediakan descriptive equivalent yang sesuai konteks accessibility;
- audio menyediakan transcript hanya bila requirement content mengizinkan; jangan mengarang transcript otomatis.

---

# 11. Mapping RefrensiHTML → Next.js Component Families

| HTML | Dipertahankan | Adaptasi ke Page 08–11 |
|---|---|---|
| `landingpage.html` | hero rhythm, card hover, Japanese well, section spacing | copy, CTA, program/tier mengikuti Public screens final |
| `dashboard.html` | sidebar feel, card elevation, hover, progress composition | shared Free/LMS/Sensei entitlement states |
| `pilih perjalananmu.html` | level card treatment, hover/group interaction | Level Journey final |
| `journey.html` | Chapter card/progression, active/inactive treatment | Chapter Journey final |
| `program.html` | facility/card composition | Program Detail final |
| `perpustakaan.html` | grid, filter, hover, no-scrollbar treatment | library + access lock final |
| `flashcard management.html` | tactile deck cards, hover shadow, reveal feel | Kumpulan Flashcard final |
| `flashcard.html` | **3D 600ms flip wajib** | session data/state dari Page 08–10 |
| `latihan.html` | compact practice feel | Latihan Harian dan image-capable question family |
| `tryout.html` | assessment shell, clay card, navigator feel | Try Out + shared AssessmentRunner |
| `hasiltryout.html` | score hierarchy, result tactile depth | Try Out/Mini Checkpoint result variants |

## 11.1 Conversion rule

Jangan convert file-per-file menjadi page-per-file. Extract pattern:

```text
Reference HTML
   ↓
Design primitives
   ↓
Reusable React components
   ↓
Screen families
   ↓
Role/entitlement/data configuration
```

## 11.2 Recommended frontend component boundaries

```text
components/
  ui/
  layout/
  navigation/
  content/
  learning/
  assessment/
  commerce/
  community/
  admin/

features/
  auth/
  public-site/
  blog/
  membership/
  journey/
  flashcard/
  exercise/
  tryout/
  mini-checkpoint/
  sensei/
  community/
  admin/
```

Component ownership lebih penting daripada struktur folder persis; folder boleh berubah, tetapi reusable boundary jangan hilang.

---

# 12. Visual QA / Acceptance Criteria

Frontend screen dianggap match design brief bila:

1. alur/copy/state sesuai Figma Page 08–11;
2. visual family dapat ditelusuri ke Page 1 / HTML reference;
3. tidak ada interaction reference yang hilang tanpa alasan;
4. Free/LMS/Sensei tidak menjadi tiga dashboard implementation terpisah;
5. card hover/elevation konsisten;
6. Flashcard mempertahankan 3D flip;
7. assessment mobile tetap usable tanpa horizontal overflow;
8. locked feature selalu punya reason + next action;
9. loading/error/empty/success/offline tidak menggunakan generic blank page;
10. keyboard navigation berfungsi;
11. focus indicator terlihat;
12. contrast critical text/action memenuhi target AA;
13. layout diuji minimal pada mobile, tablet, desktop;
14. tidak ada fixed-height text container yang memotong Japanese/Indonesian copy;
15. image question responsive dan memiliki metadata accessibility yang diperlukan;
16. Blog Detail readable dan metadata/CTA tidak mengganggu article body;
17. Admin tetap data-efficient tetapi visual masih satu keluarga HIRU.

---

# 13. Open Design Questions

Hal berikut sengaja **tidak dikarang** karena PRD masih menandainya open atau source belum cukup:

- final Journey Dasar Bahasa Jepang;
- apakah SSW Pengolahan Makanan menjadi full program family;
- apakah Interview menjadi full program atau category/material-only;
- exact N-level catalog bila N1 masih berubah;
- final responsive acceptance dari client;
- final rich text editor Blog;
- exact assessment timer/passing score/attempt per assessment;
- final upload size/type limits;
- production domain dan canonical URL;
- exact price/promo display.

Design implementation harus menyediakan architecture yang bisa menerima nilai/config tersebut, tetapi **jangan hardcode keputusan bisnis yang belum dikonfirmasi**.

---

# Appendix A — Token Reference dari `DESIGN.md`

## Colors asli

```yaml
surface: '#f9f9ff'
surface-dim: '#d3daea'
surface-bright: '#f9f9ff'
surface-container-lowest: '#ffffff'
surface-container-low: '#f0f3ff'
surface-container: '#e7eefe'
surface-container-high: '#e2e8f8'
surface-container-highest: '#dce2f3'
on-surface: '#151c27'
on-surface-variant: '#564336'
inverse-surface: '#2a313d'
inverse-on-surface: '#ebf1ff'
outline: '#8a7264'
outline-variant: '#ddc1b0'
surface-tint: '#954900'
primary: '#954900'
on-primary: '#ffffff'
primary-container: '#f48220'
on-primary-container: '#5a2a00'
inverse-primary: '#ffb786'
secondary: '#595e70'
on-secondary: '#ffffff'
secondary-container: '#dde1f8'
on-secondary-container: '#5f6477'
tertiary: '#625e58'
on-tertiary: '#ffffff'
tertiary-container: '#a59f98'
on-tertiary-container: '#3a3731'
error: '#ba1a1a'
on-error: '#ffffff'
error-container: '#ffdad6'
on-error-container: '#93000a'
```

## Typography asli

```yaml
display-lg: 48px / 800 / 1.2 / -0.02em
display-lg-mobile: 32px / 800 / 1.2
headline-md: 24px / 700 / 1.4
body-lg: 18px / 400 / 1.6
body-md: 16px / 400 / 1.6
label-sm: 14px / 600 / 1 / 0.05em
japanese-ruby: 12px / 500 / 1
```

## Spacing asli

```yaml
base: 8px
container-padding: 24px
gutter: 16px
stack-sm: 12px
stack-md: 24px
stack-lg: 48px
```

---

# Appendix B — Motion Evidence dari HTML Reference

Behavior yang ditemukan langsung pada 11 HTML reference dan harus dipertahankan sebagai feel baseline:

- transitions `200ms`, `300ms`, `500ms`;
- card hover translateY sekitar `-2px` / `-4px`;
- hover ambient shadow `0 10px 20px rgba(244,130,32,.08)`;
- beberapa deck hover sampai `0 15px 30px rgba(244,130,32,.15)`;
- active scale `0.90–0.99` tergantung control;
- group-hover icon translate/rotate/scale;
- `fadeInUp 0.6s ease-out` dari `translateY(10px)`;
- Flashcard flip `0.6s`, `preserve-3d`, `rotateY(180deg)`;
- clay shadow untuk assessment/result surfaces.

Tujuannya bukan menyalin semua class Tailwind mentah, melainkan mempertahankan **perceived motion dan interaction quality** setelah refactor menjadi Next.js components.

---

# Appendix C — Design Handoff Rule untuk Coding

Untuk setiap screen yang akan diimplementasikan:

1. cari screen final di Page 08–11;
2. tentukan role + entitlement + state;
3. cari HTML reference family yang paling dekat;
4. inventaris layout, spacing, hover, motion, dan tactile behavior dari HTML tersebut;
5. reuse existing React component bila family sudah ada;
6. hanya buat component baru bila responsibility memang baru;
7. gunakan mock data terpisah dari presentational component;
8. hubungkan route agar clickable pada frontend-first;
9. cek mobile/tablet/desktop;
10. lakukan accessibility check;
11. bandingkan kembali dengan HTML reference untuk memastikan feel tidak menurun;
12. bandingkan kembali dengan Figma Page 08–11 untuk memastikan fungsi/copy tidak kembali ke Page 1 lama.

**Definition of design handoff done:** implementasi Next.js terasa seperti evolusi langsung dari HTML reference, tetapi content, flow, entitlement, dan state sepenuhnya mengikuti Figma Page 08–11.


## Screen implementation authority

For screen implementation:

- visible copy → Figma Screen Contract, verbatim
- content hierarchy → Figma Screen Contract
- screen layout → Figma Screen Contract
- button/action behavior → Figma Screen Contract
- visual styling → Docs/RefrensiHTML/DESIGN.md
- global UX/accessibility behavior → this document

Do not invent missing visible copy.

If exact Figma information has not been extracted into a verified
Screen Contract, mark the item OPEN instead of guessing.