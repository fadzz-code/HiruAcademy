# SECURITY AUDIT — HIRU ACADEMY

**File:** `docs/ai/03-SECURITY-AUDIT.md`  
**Batch:** 3 / Security Audit  
**Tanggal baseline:** 12 Agustus 2026  
**Produk:** HIRU Academy — Website penjualan kelas Bahasa Jepang + LMS + Blog/CMS SEO + Admin Console  
**Target stack:** Next.js App Router + React + TypeScript + Tailwind CSS + Laravel + Laravel Sanctum + PostgreSQL + S3-compatible object storage  
**Status audit:** **PRE-IMPLEMENTATION BASELINE + AUDIT TERBATAS REFERENSI HTML**  
**Aturan:** Dokumen ini **tidak memodifikasi kode apa pun**. Perbaikan implementasi baru dilakukan setelah disetujui.

---

# 0. Ringkasan Eksekutif

Audit ini dibuat sebelum codebase production Next.js/Laravel tersedia.

Materi yang benar-benar dapat diaudit saat dokumen ini dibuat:

1. `01-PRD-HIRU-ACADEMY.md`;
2. `02-UI-UX-DESIGN-BRIEF.md`;
3. `RefrensiHTML.zip` yang berisi 11 HTML + `DESIGN.md`;
4. struktur produk final dari Figma Page 08–11 yang telah dikunci dalam PRD.

Karena **belum ada repository Next.js + Laravel production**, audit ini tidak boleh berpura-pura memberikan status "aman" untuk:

- authentication production;
- authorization backend;
- API routes;
- CORS;
- cookie flags;
- Laravel middleware;
- database query;
- file upload implementation;
- package dependency production;
- logging production;
- deployment headers.

Area tersebut diberi status **BELUM DAPAT DIAUDIT**, kemudian dokumen ini mendefinisikan kontrol keamanan yang wajib tersedia ketika codebase mulai dibuat.

## 0.1 Hasil audit aktual terhadap RefrensiHTML

| Severity | Jumlah | Status |
|---|---:|---|
| Kritis | 0 | Tidak ditemukan pada source yang tersedia |
| Tinggi | 0 | Tidak ditemukan pada source yang tersedia |
| Sedang | 1 | Ditemukan |
| Rendah | 2 | Ditemukan |
| Informasional / constraint | beberapa | Dicatat |

**Temuan utama:** seluruh 11 HTML menggunakan runtime Tailwind CDN yang mengeksekusi JavaScript pihak ketiga di origin halaman. Ini aman sebagai **prototype/reference lokal**, tetapi **tidak boleh dibawa ke production Next.js**.

## 0.2 Kesimpulan keamanan fase sekarang

`RefrensiHTML.zip` layak dipakai sebagai:

- visual implementation reference;
- interaction reference;
- motion reference;
- responsive behavior reference.

Tetapi ia **bukan security architecture** dan tidak boleh dijadikan referensi untuk:

- auth;
- session;
- authorization;
- API calls;
- validation;
- upload;
- secrets;
- headers;
- CORS;
- data persistence.

Prinsip yang dikunci:

> Preserve UX fidelity, not prototype security assumptions.

Animasi, layout, smoothness, hover, flip Flashcard, transition, dan behavior visual harus dipertahankan. Pola prototype yang melemahkan keamanan tidak perlu dipertahankan.

---

# 1. Scope dan Batas Audit

## 1.1 In scope sekarang

### Source yang tersedia

- 11 file HTML dari `RefrensiHTML.zip`;
- `DESIGN.md`;
- PRD Batch 1;
- UI/UX Design Brief Batch 2;
- requirement role:
  - Visitor;
  - Free Member;
  - Belajar Mandiri / LMS;
  - Belajar dengan Sensei / LMS + Sensei;
  - Admin.

### Security design yang dapat ditetapkan

- trust boundary;
- auth strategy;
- entitlement authorization;
- secure API contract;
- assessment integrity;
- file upload policy;
- CMS/XSS controls;
- cookie/session policy;
- CORS;
- rate limiting;
- security headers;
- PII/logging;
- dependency policy;
- audit checklist.

## 1.2 Out of scope sampai repository production tersedia

Belum dapat diverifikasi secara faktual:

- Laravel route middleware aktual;
- Sanctum configuration aktual;
- `SESSION_DOMAIN`;
- `SANCTUM_STATEFUL_DOMAINS`;
- cookie `Secure`, `HttpOnly`, `SameSite`;
- Next.js middleware/proxy;
- `next.config.*`;
- CSP production;
- Laravel validation classes;
- Laravel Policies/Gates;
- Eloquent query scoping;
- PostgreSQL permissions;
- S3 bucket policy;
- signed URL implementation;
- upload MIME validation;
- npm/composer dependency versions;
- CI security checks;
- production reverse proxy;
- TLS configuration;
- server logs;
- error reporting;
- secrets manager / `.env`;
- deployment environment.

## 1.3 Jangan salah membaca status "clean"

Jika suatu kategori disebut **tidak ditemukan pada RefrensiHTML**, artinya hanya:

> source prototype yang diberikan tidak mengandung pola tersebut.

Itu **bukan** bukti bahwa implementasi production nanti otomatis aman.

---

# 2. Source of Truth untuk Security

Urutan yang digunakan:

1. **Security requirements yang diperlukan untuk melindungi data dan authorization**;
2. revisi client terbaru;
3. `01-PRD-HIRU-ACADEMY.md`;
4. Figma Page 08–11 untuk feature/flow/entitlement;
5. `02-UI-UX-DESIGN-BRIEF.md`;
6. RefrensiHTML untuk visual, motion, interaction, dan feel.

Jika preserving prototype behavior bertentangan dengan security control, security control menang **tanpa mengubah feel lebih dari yang diperlukan**.

Contoh:

- Flashcard flip 600ms harus dipertahankan;
- inline `onclick` dari prototype tidak perlu dipertahankan;
- behavior modal dipertahankan tetapi event handler dipindahkan menjadi React event handler;
- visual upload dipertahankan tetapi backend validation wajib;
- locked card dipertahankan tetapi authorization tidak boleh hanya berdasarkan disabled button.

---

# 3. Arsitektur Trust Boundary

```text
Public Internet
     |
     v
+-------------------------+
| Next.js Frontend        |
| - Public SEO            |
| - Student UI            |
| - Admin UI              |
+------------+------------+
             |
             | HTTPS + same-site/session auth
             v
+-------------------------+
| Laravel API             |
| - Auth / Sanctum        |
| - Authorization         |
| - Validation            |
| - Business rules        |
| - Score / entitlement   |
+------+------------+-----+
       |            |
       v            v
 PostgreSQL    Object Storage
              image/audio/PDF/replay

External integrations:
- WhatsApp deep link
- GA4 / Search Console
- optional email delivery
```

## 3.1 Browser tidak dipercaya

Browser/Next client component tidak boleh menjadi source of truth untuk:

- role;
- membership;
- entitlement;
- score;
- passing status;
- attempt count;
- timer completion;
- invoice paid status;
- admin permission;
- ownership resource.

Client boleh menampilkan state untuk UX. Laravel wajib memverifikasi ulang setiap sensitive action.

## 3.2 Next.js server juga bukan pengganti Laravel authorization

Server Component dapat membantu menyembunyikan UI private dan mencegah flicker, tetapi business authorization tetap berada di Laravel.

## 3.3 Database tidak boleh diakses browser secara langsung

Frontend tidak boleh menerima credential PostgreSQL atau object storage secret.

---

# 4. Klasifikasi Data

## 4.1 Public

- landing page content;
- public program;
- published article;
- approved testimonial;
- public SEO metadata.

## 4.2 Account PII

- nama;
- email;
- nomor WhatsApp;
- target ujian;
- tanggal bergabung.

## 4.3 Learning private data

- progress;
- level yang dibeli;
- chapter completion;
- confidence Flashcard;
- assessment attempt;
- answer;
- score;
- result;
- certificate;
- class/cohort association.

## 4.4 Commercial private data

- Invoice ID;
- order;
- payment verification state;
- referral ownership;
- discount/reward.

## 4.5 Admin-only / sensitive operational data

- Placement leads;
- full user management;
- access editor;
- invoice verification;
- assessment answer key;
- passing score configuration;
- unpublished article;
- audit log;
- unpublished class/replay metadata.

## 4.6 Secrets

Tidak pernah boleh dikirim ke browser:

- `APP_KEY`;
- database password;
- S3 secret;
- Laravel private credential;
- mail provider secret;
- API secrets;
- server-side signing keys.

**Rule:** apa pun yang dimasukkan ke environment variable dengan prefix `NEXT_PUBLIC_` dianggap dapat dibaca publik.

---

# 5. Temuan Aktual — RefrensiHTML

# SEC-REF-001 — Runtime Tailwind CDN mengeksekusi JavaScript pihak ketiga

**Severity:** SEDANG  
**Status:** CONFIRMED pada source reference  
**Scope:** seluruh 11 HTML  
**Production blocker:** YA — jika pola ini dibawa ke production

## File dan baris

| File | Baris | Bukti |
|---|---:|---|
| `dashboard.html` | 5 | Runtime Tailwind CDN |
| `flashcard management.html` | 7 | Runtime Tailwind CDN |
| `flashcard.html` | 7 | Runtime Tailwind CDN |
| `hasiltryout.html` | 10 | Runtime Tailwind CDN |
| `journey.html` | 5 | Runtime Tailwind CDN |
| `landingpage.html` | 5 | Runtime Tailwind CDN |
| `latihan.html` | 7 | Runtime Tailwind CDN |
| `perpustakaan.html` | 7 | Runtime Tailwind CDN |
| `pilih perjalananmu.html` | 5 | Runtime Tailwind CDN |
| `program.html` | 12 | Runtime Tailwind CDN |
| `tryout.html` | 7 | Runtime Tailwind CDN |

Semua menggunakan pola:

```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
```

## Dampak

Browser mengeksekusi JavaScript dari origin pihak ketiga.

Jika dependency/CDN/delivery path tersebut dikompromikan, script memperoleh kemampuan JavaScript pada halaman yang memuatnya.

Pada prototype lokal tanpa auth, dampak praktis rendah. Jika pola yang sama terbawa ke production dan halaman memiliki session user/admin, dampaknya naik signifikan karena script berjalan dalam konteks browser pengguna.

Pola ini juga membuat CSP production lebih longgar karena `script-src` harus mengizinkan origin eksternal tersebut.

## Bagaimana dapat dieksploitasi

Skenario realistis jika pola dibawa ke production:

1. user/admin membuka HIRU;
2. browser mengambil runtime script dari host pihak ketiga;
3. response script dimodifikasi/compromised;
4. browser menjalankan script tersebut;
5. script dapat membaca DOM, memanipulasi action, menangkap input yang dapat dibaca JS, atau membuat request sebagai user.

Tidak ada bukti host tersebut saat ini kompromi. Temuan ini adalah **supply-chain exposure karena runtime third-party execution**, bukan tuduhan terhadap penyedia CDN.

## Perbaikan kode yang tepat

Saat migrasi Next.js:

- install Tailwind sebagai build dependency;
- compile Tailwind saat build;
- jangan masukkan `cdn.tailwindcss.com` ke production;
- serve output CSS dari build aplikasi;
- targetkan CSP production `script-src 'self'` + hanya script pihak ketiga yang benar-benar diperlukan;
- jangan mengurangi class, animation, motion, spacing, atau visual dari HTML.

**UX impact:** nol jika migrasi dilakukan benar.

---

# SEC-REF-002 — Inline JavaScript / inline event handler akan melemahkan CSP jika dicopy mentah

**Severity:** RENDAH  
**Status:** CONFIRMED pada source reference  
**Production blocker:** YA untuk strict CSP target

## Bukti inline event handler

| File | Baris | Jenis |
|---|---:|---|
| `flashcard management.html` | 247 | Inline event handler |
| `flashcard management.html` | 408 | Inline event handler |
| `flashcard management.html` | 414 | Inline event handler |
| `flashcard management.html` | 478 | Inline event handler |

Selain itu, `flashcard.html` memiliki inline script behavior pada sekitar baris `264–279` untuk flip card.

Seluruh HTML juga mempunyai inline `tailwind-config` script.

## Dampak

Inline handler bukan XSS dengan sendirinya karena source saat ini statis.

Masalah muncul jika implementasi production memilih mempertahankan pola inline dan kemudian CSP harus mengizinkan `'unsafe-inline'`.

Jika di masa depan ada injection bug, CSP yang terlalu longgar kehilangan lapisan pertahanan penting.

## Bagaimana dapat dieksploitasi

Skenario chaining:

1. ada titik injection lain pada CMS/community/user content;
2. attacker berhasil memasukkan markup/script;
3. CSP production mengizinkan unsafe inline agar prototype handler tetap bekerja;
4. injected script lebih mudah dieksekusi.

## Perbaikan kode yang tepat

Saat HTML → React:

```tsx
<button onClick={() => setOpen(true)}>
  ...
</button>
```

Flashcard:

```tsx
<div onClick={() => setFlipped(v => !v)}>
  ...
</div>
```

Behavior visual harus sama.

Jangan mempertahankan atribut `onclick="..."`.

Untuk script pihak ketiga yang benar-benar dibutuhkan:

- gunakan Next.js `<Script>`;
- gunakan CSP allowlist ketat;
- gunakan nonce untuk use case yang memerlukan strict CSP.

---

# SEC-REF-003 — Asset visual prototype mengambil resource langsung dari host eksternal

**Severity:** RENDAH  
**Status:** CONFIRMED  
**Jenis risiko:** privacy / supply chain / availability / CSP surface

## File yang memakai `lh3.googleusercontent.com`

| File | Baris | Jumlah |
|---|---|---:|
| `dashboard.html` | 262, 410, 420, 429, 447 | 5 asset |
| `flashcard management.html` | 230 | 1 asset |
| `landingpage.html` | 125, 175, 176, 177, 186, 401, 413, 425, 441 | 9 asset |
| `perpustakaan.html` | 216 | 1 asset |
| `program.html` | 164 | 1 asset |

Google Fonts juga dimuat langsung pada hampir seluruh reference HTML.

## Dampak

Untuk production, browser user membuat request ke domain pihak ketiga.

Konsekuensi:

- third party melihat request network yang berasal dari browser;
- availability visual tergantung external host;
- CSP `img-src` / `font-src` harus lebih luas;
- URL prototype dapat berubah/hilang;
- asset bukan berada di lifecycle media HIRU.

## Bagaimana dapat dieksploitasi

Ini bukan jalur takeover aplikasi secara langsung.

Risiko utamanya:

- privacy leakage metadata request;
- content availability;
- CSP surface lebih besar;
- accidental dependency kepada asset generator/reference.

## Perbaikan kode yang tepat

Production:

- brand asset HIRU disimpan sebagai controlled project asset;
- article/course/user-upload media masuk storage HIRU;
- S3-compatible object storage untuk dynamic media;
- `next/image` hanya mengizinkan remote host yang memang dibutuhkan;
- hindari wildcard remote image host;
- pertimbangkan self-host Plus Jakarta Sans agar CSP/font privacy lebih sederhana.

**Catatan:** visual image reference tetap boleh dipertahankan dengan menyalin asset legal/approved ke controlled storage. Jangan mengganti desain hanya karena lokasi file berpindah.

---

# 6. Kategori yang Bersih pada Source yang Tersedia

## 6.1 Hardcoded secret

**Status RefrensiHTML:** BERSIH

Pencarian terhadap pola umum:

- API key;
- bearer token;
- client secret;
- private key;
- payment key;
- AWS secret;

tidak menemukan credential pada 11 HTML.

**Production:** belum dapat diaudit.

## 6.2 Dangerous JavaScript sink

**Status RefrensiHTML:** tidak ditemukan pola berisiko tinggi berikut:

- `eval(...)`;
- `new Function(...)`;
- `document.write(...)`;
- `innerHTML = ...`;
- `outerHTML = ...`;
- local/session token persistence.

**Production Next.js:** belum dapat diaudit.

## 6.3 API route tanpa proteksi

**Status RefrensiHTML:** TIDAK BERLAKU.

Prototype tidak mempunyai API request nyata.

**Production:** belum dapat diaudit.

## 6.4 SQL / NoSQL / command injection

**Status RefrensiHTML:** TIDAK BERLAKU.

Tidak ada backend/query.

**Production:** belum dapat diaudit.

## 6.5 Authentication / session

**Status RefrensiHTML:** TIDAK BERLAKU.

Tidak ada session production.

**Production:** belum dapat diaudit.

## 6.6 Logging sensitive data

**Status RefrensiHTML:** tidak ada logging application production.

**Production:** belum dapat diaudit.

## 6.7 Known vulnerable dependency

Tidak tersedia:

- `package.json`;
- lockfile;
- `composer.json`;
- `composer.lock`.

Karena itu vulnerability dependency production **tidak dapat dinilai**.

---

# 7. Production Security Requirements — Authentication

Bagian ini bukan "temuan pada code". Ini adalah **security acceptance criteria** yang harus dipenuhi frontend/backend HIRU ketika implementation dimulai.

## 7.1 AUTH-01 — Gunakan Sanctum cookie-based first-party authentication

Target:

- Next.js dan Laravel berada di top-level domain yang sama;
- Laravel Sanctum SPA authentication;
- browser tidak menyimpan bearer token auth utama di `localStorage`;
- session cookie digunakan untuk authenticated web flow.

Alasan:

- cookie-based session dapat menggunakan HttpOnly cookie;
- CSRF mechanism Sanctum tersedia;
- mengurangi exposure auth credential ke JavaScript dibanding menyimpan bearer token secara manual.

## 7.2 AUTH-02 — Login menerima email atau WhatsApp tanpa membuka enumeration

PRD:

- identifier = Email / WhatsApp.

Error message login harus generik.

Hindari:

```text
Nomor WhatsApp terdaftar tetapi password salah
```

dan:

```text
Email tidak ditemukan
```

Prefer:

```text
Email/WhatsApp atau kata sandi tidak valid.
```

agar endpoint tidak menjadi account enumeration oracle.

## 7.3 AUTH-03 — Session rotation

Setelah login berhasil:

- regenerate session ID;
- invalidate session lama sesuai strategy Laravel;
- logout harus invalidate authenticated session.

## 7.4 AUTH-04 — Password reset

Password reset token:

- single-use;
- expiry;
- tidak pernah ditulis ke application log;
- response lupa password tidak mengungkap apakah account ada.

## 7.5 AUTH-05 — Admin authentication

Admin memiliki risiko jauh lebih tinggi karena dapat:

- membuka user PII;
- mengubah entitlement;
- memverifikasi invoice;
- mengubah answer key;
- publish blog;
- mengelola upload.

Requirement pre-launch yang direkomendasikan:

- MFA Admin;
- rate limit lebih ketat;
- session lifetime lebih pendek dibanding public session bila operasional memungkinkan;
- sensitive admin action meminta recent authentication bila dibutuhkan.

**[OPEN-SEC]** MFA belum merupakan flow Figma saat ini. Ini security recommendation, bukan perubahan visual otomatis. Harus disetujui sebelum implementasi UX.

---

# 8. Production Security Requirements — Authorization

# 8.1 AUTHZ-01 — Deny by default

Setiap private endpoint Laravel harus:

1. authenticated;
2. authorized;
3. resource ownership / relationship checked;
4. entitlement checked jika relevant.

Frontend hiding bukan security boundary.

## 8.2 AUTHZ-02 — Role matrix

| Action | Visitor | Free | LMS | LMS+Sensei | Admin |
|---|---:|---:|---:|---:|---:|
| Public content | ✓ | ✓ | ✓ | ✓ | ✓ |
| Chapter free | — | sesuai config | sesuai access | sesuai access | manage |
| Full purchased level | — | ✗ | sesuai entitlement | sesuai entitlement | manage |
| Try Out | — | locked | config | config | manage |
| Mini Checkpoint | — | ✗ | ✗ | ✓ | manage |
| Community write | — | read-only | ✓ | ✓ | moderate |
| Cohort/Replay | — | ✗ | ✗ | ✓ | manage |
| Invoice verify | ✗ | ✗ | ✗ | ✗ | ✓ |
| User access edit | ✗ | ✗ | ✗ | ✗ | ✓ |
| Assessment answer key | ✗ | ✗ | ✗ | ✗ | ✓ |

## 8.3 AUTHZ-03 — Deep-link bypass

PRD secara eksplisit mengatakan locked UI bukan security.

Request seperti:

```text
GET /api/try-outs/123
GET /api/mini-checkpoints/456
GET /api/replays/789
```

harus menolak user yang entitlement-nya tidak sesuai bahkan jika user mengetahui ID.

## 8.4 AUTHZ-04 — BOLA / IDOR protection

Resource ID yang wajib ownership/permission check:

- user profile;
- invoice;
- referral;
- assessment attempt;
- answer;
- certificate;
- community post/comment;
- notification;
- Tanya Sensei;
- replay;
- placement lead;
- admin export job;
- uploaded media.

Jangan melakukan:

```php
Attempt::findOrFail($id);
```

lalu return jika tidak ada ownership check.

Konsep aman:

```php
$request->user()
    ->attempts()
    ->whereKey($id)
    ->firstOrFail();
```

atau Policy/Gate yang setara.

## 8.5 AUTHZ-05 — Admin action policy

Admin UI menu bukan authorization.

Setiap write action tetap melewati Laravel Policy/Gate/middleware.

---

# 9. Assessment Integrity

HIRU memiliki empat keluarga assessment:

1. Latihan Harian;
2. Checkpoint Chapter;
3. Try Out;
4. Mini Checkpoint.

## 9.1 ASM-01 — Answer key tidak dikirim sebelum assessment selesai

Jangan sertakan:

```json
{
  "question": "...",
  "correct_answer": "B"
}
```

pada payload runner.

Answer key hanya berada backend/admin-authoring context.

## 9.2 ASM-02 — Score dihitung backend

Frontend boleh menghitung provisional state untuk animation/demo.

Production final score harus berasal dari Laravel.

## 9.3 ASM-03 — Timer authoritative di server

Try Out dan Mini Checkpoint memiliki timer.

Jangan percaya:

```ts
remainingSeconds
```

dari client sebagai sumber final.

Attempt perlu minimal:

- `started_at`;
- `expires_at`;
- `submitted_at`;
- state.

Server menentukan apakah submission masih valid.

Client timer hanya visual countdown terhadap server-authoritative expiry.

## 9.4 ASM-04 — Auto-submit harus idempotent

Race yang harus aman:

- timer 00:00 memicu submit;
- user juga menekan submit;
- network retry mengirim ulang.

Hasil tidak boleh:

- membuat attempt ganda;
- menghitung skor dua kali;
- mengurangi attempt dua kali.

## 9.5 ASM-05 — Autosave ownership

Autosave answer endpoint memverifikasi:

- attempt milik user;
- attempt masih active;
- question termasuk assessment tersebut;
- option belongs to question;
- submitted attempt tidak boleh dimodifikasi.

## 9.6 ASM-06 — Passing status

Mini Checkpoint:

```text
score >= passing_score => LULUS
score < passing_score  => TIDAK LULUS
```

Perhitungan dilakukan backend menggunakan snapshot rule assessment/attempt yang tepat agar perubahan passing score Admin tidak mengubah history lama secara tidak sengaja.

## 9.7 ASM-07 — Attempt rule

Attempt count/cooldown harus divalidasi server.

Disabled button bukan enforcement.

---

# 10. File Upload Security

Upload terdapat pada:

- question image;
- question audio;
- Flashcard audio;
- content/module;
- community attachment;
- replay;
- blog image;
- landing content;
- potentially certificate asset.

## 10.1 UP-01 — Extension allowlist

Jangan menerima semua extension.

Contoh business allowlist harus ditetapkan per feature:

### Question image

- `.jpg`;
- `.jpeg`;
- `.png`;
- `.webp`.

### Audio

- format final **[OPEN]**;
- jangan mengizinkan executable masquerading sebagai audio.

### PDF/module

- PDF jika memang requirement;
- jangan menerima HTML/SVG arbitrer sebagai image upload tanpa sanitizer karena active content risk.

## 10.2 UP-02 — Jangan percaya browser Content-Type

Backend harus memvalidasi real detected type.

## 10.3 UP-03 — Generated storage name

Jangan gunakan filename user sebagai physical object key tanpa transform.

Gunakan generated ID/UUID dan simpan original filename hanya sebagai metadata yang disanitasi.

## 10.4 UP-04 — Size limits

PRD masih menandai limit upload sebagai OPEN.

Security requirement:

- limit per file;
- limit request;
- limit jumlah attachment;
- role-specific limit.

## 10.5 UP-05 — Object storage separation

Dynamic media sebaiknya disimpan di object storage.

Private content:

- tidak public by default;
- akses melalui signed/controlled URL bila entitlement diperlukan.

Public blog image dapat public/CDN sesuai policy.

## 10.6 UP-06 — Access authorization

Admin upload endpoint:

- Admin only;
- permission check;
- rate limit.

Community upload:

- authenticated eligible student;
- ownership relationship.

## 10.7 UP-07 — File execution disabled

Uploaded file tidak boleh dieksekusi sebagai server script.

---

# 11. Input Validation dan Sanitization

# 11.1 Semua write endpoint memakai server validation

Frontend validation hanya UX.

Laravel wajib memvalidasi lagi.

## 11.2 CMS Blog — stored XSS

Admin Blog Management dapat menghasilkan content yang kemudian dirender public.

Jika rich-text HTML disimpan:

- gunakan schema/allowlist sanitizer;
- block `<script>`;
- block inline event attribute (`onclick`, `onerror`, dst.);
- block dangerous URL scheme seperti `javascript:`;
- sanitize iframe/embed allowlist;
- output harus memakai renderer terkontrol.

`dangerouslySetInnerHTML` hanya boleh digunakan pada content yang sudah melalui trusted sanitizer.

## 11.3 Community — user generated content

Lebih ketat daripada Admin CMS.

User tidak boleh mengirim raw HTML arbitrer.

Prefer:

- plain text;
- structured editor JSON;
- limited Markdown subset yang dirender aman.

## 11.4 Slug

Slug Admin:

- normalized;
- uniqueness;
- max length;
- tidak boleh menghasilkan traversal;
- tidak boleh memetakan reserved route seperti `admin`, `api`, `_next` sesuai router policy.

## 11.5 WhatsApp field

Nomor:

- normalize format server-side;
- jangan hanya regex frontend;
- uniqueness rule mengikuti business requirement final.

## 11.6 Jepang Profesional / Pemula

Content conversion/display tidak boleh menghasilkan raw HTML injection.

Treat generated text as text, bukan trusted markup, kecuali renderer mempunyai sanitizer.

---

# 12. CSRF dan CORS

# 12.1 CSRF

Dengan Sanctum SPA cookie authentication:

- initialize CSRF flow sesuai Sanctum;
- mutation request wajib mempunyai CSRF protection;
- jangan men-disable CSRF hanya karena Next.js berbeda service.

## 12.2 CORS

Jika:

```text
www.hiruacademy.com
api.hiruacademy.com
```

CORS:

- exact production origins;
- `supports_credentials=true` hanya trusted origin;
- jangan `Access-Control-Allow-Origin: *` dengan authenticated API;
- environment dev mempunyai explicit localhost origin.

## 12.3 Origin validation

Sensitive endpoint sebaiknya tidak menerima arbitrary browser origin.

---

# 13. Cookie dan Session Policy

Production cookie:

- `Secure`;
- `HttpOnly` untuk session/auth cookie;
- `SameSite=Lax` atau setting yang sesuai architecture;
- domain sesempit mungkin;
- HTTPS only.

Jangan:

- simpan session ID di URL;
- log raw session ID;
- masukkan token auth ke analytics.

Private Next.js pages harus menangani `401/419`:

- clear stale user state;
- redirect/login prompt;
- jangan memperlihatkan private content dari stale cache.

---

# 14. Rate Limiting dan Anti-Abuse

Endpoint yang wajib mempunyai rate limiting:

## Auth

- login;
- forgot password;
- reset;
- verification resend.

## Public lead

- Placement Start;
- Placement submit;
- register;
- invoice create.

## Student

- community post/comment;
- report;
- Tanya Sensei;
- notification mutation;
- assessment autosave;
- assessment submit;
- file upload.

## Admin

- export;
- bulk update;
- media upload;
- authentication;
- password reset.

## 14.1 Login brute force

Limit harus mempertimbangkan identifier + IP, bukan IP saja jika memungkinkan.

## 14.2 Placement spam

Placement menyimpan:

- nama;
- WhatsApp;
- target ujian.

Perlu:

- rate limit;
- bot mitigation jika abuse muncul;
- duplicate lead strategy;
- jangan langsung membuat unlimited records dari anonymous requests.

---

# 15. Security Headers — Next.js

Minimum production target:

```text
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy
frame-ancestors melalui CSP
```

## 15.1 CSP baseline intent

Target awal:

```text
default-src 'self'
object-src 'none'
base-uri 'self'
frame-ancestors 'none'
form-action 'self'
```

Kemudian allow source tambahan secara sempit untuk:

- GA/GTM jika dipakai;
- object storage/CDN;
- video/replay host yang disetujui;
- font jika belum self-host.

Jangan mulai dari wildcard lalu berharap diketatkan nanti.

## 15.2 RefrensiHTML compatibility

Strict CSP adalah alasan tambahan inline handler dan Tailwind CDN prototype tidak dibawa mentah ke production.

Motion/visual tidak terkena dampak selama CSS dibuild dengan benar.

---

# 16. Next.js Security Rules

## 16.1 Jangan expose secret lewat client bundle

Server secret hanya ada di server environment.

Review semua env dengan prefix public.

## 16.2 Authenticated data dan cache

Data user/admin tidak boleh masuk shared public cache.

Pastikan route/data fetch private tidak memakai caching yang dapat membuat response user A tersaji ke user B.

## 16.3 Route guard

Next route guard/middleware berguna untuk UX, tetapi bukan replacement Laravel Policy.

## 16.4 Public SEO vs private app

### Indexable

- landing;
- program;
- testimoni;
- blog list;
- published article.

### Private/noindex

- dashboard;
- profile;
- assessment;
- invoice;
- student content;
- admin.

## 16.5 `next/image`

Remote hosts harus explicit.

Jangan gunakan arbitrary URL dari user sebagai unrestricted image host.

---

# 17. Laravel Security Rules

## 17.1 Validation

Gunakan Form Request / equivalent centralized validation untuk write endpoint.

## 17.2 Authorization

Prefer Laravel Policies/Gates per resource.

## 17.3 Mass assignment

Jangan menerima request payload dan langsung:

```php
Model::create($request->all());
```

Gunakan validated fields explicit.

## 17.4 Query injection

Gunakan Eloquent/query builder binding.

Hindari raw SQL yang menggabungkan input user.

Jika raw statement memang diperlukan:

- parameter binding;
- allowlist column/order input.

## 17.5 Error response

Production:

- jangan expose stack trace;
- jangan expose SQL;
- jangan expose filesystem path;
- jangan expose secret config.

---

# 18. PostgreSQL Security

## 18.1 Dedicated application user

Laravel menggunakan DB user khusus dengan privilege minimum.

Jangan gunakan superuser PostgreSQL untuk application runtime.

## 18.2 Network exposure

Postgres tidak diexpose ke public Internet.

Hanya application/private network yang perlu.

## 18.3 Backup

Backup berisi PII dan assessment result.

Backup harus:

- access controlled;
- encrypted sesuai infrastructure capability;
- tidak berada di webroot;
- retention policy.

---

# 19. Payment / Invoice / WhatsApp Security

HIRU saat ini tidak memakai payment gateway otomatis.

Flow:

```text
checkout
-> create invoice
-> WhatsApp
-> Admin verifies payment
-> entitlement activated
```

## 19.1 PAY-SEC-01 — User tidak dapat set paid

Endpoint user tidak boleh menerima field:

```json
{"status":"paid"}
```

sebagai authority.

## 19.2 PAY-SEC-02 — Verification Admin only

Invoice verification:

- Admin permission;
- audit log;
- idempotent;
- transaction/locking bila perubahan menyentuh invoice + membership + entitlement.

## 19.3 PAY-SEC-03 — WhatsApp message minimal

Jangan letakkan data sensitif berlebihan di WhatsApp URL query string.

Prefer minimal:

- Invoice ID;
- program/order reference.

Hindari:

- password;
- auth token;
- assessment result;
- unnecessary PII.

## 19.4 PAY-SEC-04 — Invoice object access

Student hanya dapat melihat invoice miliknya.

---

# 20. Placement Data Security

Placement mengumpulkan:

- nama;
- WhatsApp;
- target ujian;
- result/recommendation;
- tanggal pengerjaan.

## 20.1 PII tidak masuk Analytics

Jangan mengirim:

- nama;
- email;
- WhatsApp;
- raw Placement answer;

ke GA4 event parameter.

## 20.2 Admin access

Placement lead list/detail Admin only.

## 20.3 Export

Export lead:

- Admin only;
- audit;
- generated file expiry;
- jangan expose permanent public URL.

---

# 21. Blog/CMS dan SEO Security

SEO requirement tidak boleh membuat CMS permisif.

## 21.1 Published-only public API

Public article endpoint hanya return:

- published;
- publication time valid;
- fields public.

Draft tidak boleh dapat dibuka hanya dengan menebak slug.

## 21.2 Preview

Admin preview:

- authenticated;
- signed/short-lived preview mechanism bila dibutuhkan;
- noindex.

## 21.3 Canonical / metadata

Admin-configurable URL/meta tidak boleh digunakan untuk memasukkan arbitrary script/HTML.

Metadata adalah text/validated URL.

## 21.4 Structured data

JSON-LD dibentuk dari escaped structured values.

Jangan concatenation raw user HTML ke `<script type="application/ld+json">`.

---

# 22. Community Security

## 22.1 UGC sanitization

Post/comment tidak boleh raw HTML unrestricted.

## 22.2 Authorization

Free Member:

- read-only.

LMS/Sensei:

- write sesuai rules.

Backend wajib enforce.

## 22.3 Attachment

Attachment melalui upload policy.

## 22.4 Report/moderation

User tidak boleh mengubah moderation status.

Admin moderation action tercatat.

---

# 23. Admin Console Security

Admin merupakan highest-risk area.

## 23.1 Jangan hanya protect `/admin` di Next

Laravel API Admin juga wajib authorization.

## 23.2 High-risk actions

Minimal:

- verify/reject invoice;
- edit entitlement;
- deactivate user;
- publish content;
- modify assessment answer key;
- change passing score;
- export user/lead;
- destructive settings.

Perlu:

- confirmation UI;
- authorization;
- audit log.

## 23.3 Audit log

Simpan:

- actor admin ID;
- action;
- target type;
- target ID;
- timestamp;
- relevant diff/metadata yang tidak mengandung secret.

Jangan simpan password/token/raw sensitive upload credential.

---

# 24. Sensitive Logging dan Error Handling

## 24.1 Jangan log

- password;
- reset token;
- Sanctum/session cookie;
- CSRF token;
- Authorization header;
- DB credential;
- object storage secret;
- full payment proof;
- full WhatsApp jika tidak perlu;
- raw assessment answer jika log operasional tidak membutuhkannya.

## 24.2 Masking

Admin UI dapat menampilkan masked contact di list, full detail hanya jika workflow memang membutuhkan.

## 24.3 Correlation

Gunakan request/correlation ID yang tidak mengandung PII.

---

# 25. Dependency Security

Saat repository dibuat, audit dependency wajib mencakup:

## Frontend

```bash
npm audit
npm outdated
```

Review:

- `package.json`;
- lockfile;
- transitive vulnerability;
- postinstall script;
- unnecessary package.

## Backend

```bash
composer audit
composer outdated
```

Review:

- Laravel;
- Sanctum;
- image/file parsing library;
- markdown/rich-text sanitizer;
- export library.

## CI

Dependency audit harus dapat dijalankan di CI.

Severity threshold final untuk fail build adalah **[OPEN-SEC]**.

---

# 26. Secrets Management

## 26.1 Repository

Tidak boleh commit:

```text
.env
.env.production
private keys
service-account files
database dump production
```

## 26.2 Next.js

`NEXT_PUBLIC_*` hanya untuk nilai yang aman diketahui public.

Contoh aman:

- public GA measurement ID;
- public site URL.

Contoh tidak aman:

- Laravel secret;
- DB password;
- S3 secret.

## 26.3 Laravel

Secrets melalui server environment/deployment secret manager.

---

# 27. Security Acceptance Criteria per Core Flow

# 27.1 Login

Selesai bila:

- Sanctum session bekerja;
- CSRF aktif;
- generic invalid credential error;
- rate limit;
- session rotates;
- cookie secure production;
- 401/419 handled.

# 27.2 Free locked feature

Selesai bila:

- UI locked;
- deep-link API tetap 403;
- changing JS state tidak membuka data premium;
- answer/media private tidak ikut dikirim.

# 27.3 Try Out

Selesai bila:

- server owns attempt;
- answer key tidak dikirim;
- timer server-authoritative;
- submit idempotent;
- review hanya jika allowed;
- score backend.

# 27.4 Mini Checkpoint

Sama dengan Try Out ditambah:

- LMS+Sensei entitlement;
- level N5/N4/N3/N2 validation;
- sesi/part belongs to configured assessment;
- passing score server;
- Lulus/Tidak Lulus backend.

# 27.5 Invoice + WhatsApp

Selesai bila:

- invoice user-owned;
- unique ID;
- WhatsApp click tidak activate membership;
- Admin verification only;
- verification idempotent;
- audit log.

# 27.6 Blog

Selesai bila:

- draft private;
- published public;
- slug validation;
- sanitized rich content;
- metadata escaped;
- preview noindex.

# 27.7 Admin upload

Selesai bila:

- Admin authorization;
- allowlisted file;
- MIME validation;
- size limit;
- generated filename;
- controlled storage;
- no executable serving.

---

# 28. Audit Matrix Sesuai Prompt Awal

| Kategori | RefrensiHTML saat ini | Production Next/Laravel |
|---|---|---|
| Authentication weakness | Tidak ada auth nyata | **BELUM DAPAT DIAUDIT** |
| Session handling | Tidak ada session | **BELUM DAPAT DIAUDIT** |
| Authorization / user A→B | Tidak ada data/backend | **BELUM DAPAT DIAUDIT** |
| Hardcoded secret | **BERSIH** pada source yang tersedia | Belum dapat diaudit |
| Sensitive client exposure | Tidak ada production secret | Belum dapat diaudit |
| SQL injection | N/A | Belum dapat diaudit |
| NoSQL injection | N/A | N/A kecuali teknologi berubah |
| Command injection | N/A | Belum dapat diaudit |
| XSS | Tidak ada dangerous sink confirmed; inline JS hardening finding ada | Belum dapat diaudit |
| Unprotected API route | N/A | Belum dapat diaudit |
| Input validation | Form prototype tidak submit production | Belum dapat diaudit |
| Sanitization | N/A | Belum dapat diaudit |
| Rate limiting | N/A | Belum dapat diaudit |
| IDOR/BOLA | N/A | Belum dapat diaudit |
| CORS | N/A | Belum dapat diaudit |
| Security headers | Tidak observable dari static files | Belum dapat diaudit |
| Cookie flags | N/A | Belum dapat diaudit |
| Vulnerable dependencies | Tidak ada manifest; runtime CDN finding | Belum dapat diaudit |
| Sensitive logs | Tidak ada production logging | Belum dapat diaudit |

---

# 29. Daftar Temuan Diurutkan Severity

## SEDANG

### SEC-REF-001 — Runtime Tailwind CDN pihak ketiga

- seluruh 11 HTML;
- supply-chain runtime exposure;
- harus dihilangkan pada production migration.

## RENDAH

### SEC-REF-002 — Inline event/script pattern

- `flashcard management.html`;
- `flashcard.html`;
- akan menyulitkan strict CSP jika dicopy mentah.

### SEC-REF-003 — External prototype image/font dependencies

- beberapa HTML;
- privacy/availability/CSP surface;
- migrasikan ke controlled asset/storage.

## KRITIS

Tidak ada confirmed finding pada source yang tersedia.

## TINGGI

Tidak ada confirmed finding pada source yang tersedia.

**Penting:** tidak adanya finding Kritis/Tinggi di sini tidak berarti production aman, karena production auth/API/backend belum tersedia.

---

# 30. Audit yang Harus Dilakukan Begitu Frontend Repository Dibuat

Sebelum backend bahkan selesai, audit Next.js pertama harus memeriksa:

1. `package.json`;
2. lockfile;
3. `next.config.*`;
4. `proxy.ts` / middleware jika ada;
5. environment variable usage;
6. `NEXT_PUBLIC_*`;
7. `dangerouslySetInnerHTML`;
8. user-generated content renderer;
9. remote image config;
10. third-party `<Script>`;
11. auth mock agar tidak berubah menjadi pseudo-auth production;
12. route groups;
13. private page caching;
14. frontend logging;
15. analytics event payload;
16. upload components.

---

# 31. Audit yang Harus Dilakukan Begitu Laravel Repository Terhubung

File/area pertama:

```text
routes/web.php
routes/api.php
bootstrap/app.php
config/sanctum.php
config/session.php
config/cors.php
config/filesystems.php
app/Http/Requests/
app/Policies/
app/Models/
app/Http/Controllers/
app/Services/
```

Kemudian:

```bash
php artisan route:list
composer audit
```

Periksa endpoint satu per satu terhadap:

- authentication;
- authorization;
- validation;
- rate limit;
- ownership;
- sensitive response;
- file upload;
- audit logging.

---

# 32. Test Cases Security yang Wajib Ada Nanti

## Authorization

- Free request Try Out API → 403.
- LMS request Mini Checkpoint → 403.
- Sensei Mini Checkpoint → allowed.
- student request Admin API → 403.
- user A request invoice user B → 404/403.
- user A request attempt user B → 404/403.

## Session

- expired session → 401/419 handled.
- logout invalidates session.
- reset token cannot reuse.

## Assessment

- modify timer client → tidak menambah waktu server.
- submit twice → satu result.
- answer question outside assessment → rejected.
- access answer key before submit → impossible.
- review disabled → API tidak return protected review.

## Upload

- executable renamed `.jpg` → rejected.
- wrong MIME → rejected.
- over-size → rejected.
- unauthorized upload → 403.

## CMS/XSS

Payload:

```html
<img src=x onerror=alert(1)>
```

tidak boleh dieksekusi di:

- article;
- community;
- assessment explanation;
- testimonial;
- announcement.

## Rate limit

Repeated login/reset/placement calls harus menghasilkan throttle response.

---

# 33. Pre-Launch Security Gate

Production release **tidak boleh dinyatakan security-ready** sebelum:

- [ ] full code audit dijalankan pada Next.js;
- [ ] full code audit dijalankan pada Laravel;
- [ ] dependency audit clean/accepted;
- [ ] no hardcoded secret;
- [ ] Sanctum/CSRF verified;
- [ ] auth cookie verified;
- [ ] CORS exact;
- [ ] CSP active;
- [ ] authorization matrix tested;
- [ ] IDOR tests pass;
- [ ] upload validation tested;
- [ ] answer key not exposed;
- [ ] timer backend-authoritative;
- [ ] invoice verification Admin-only;
- [ ] Blog/community sanitization tested;
- [ ] analytics PII review complete;
- [ ] production error response hides stack trace;
- [ ] backup/storage access reviewed;
- [ ] Admin audit log active;
- [ ] Admin MFA decision resolved.

---

# 34. Fix Approval Rule

Sesuai workflow Batch 3:

> JANGAN memodifikasi kode sampai user menyetujui temuan/perbaikan.

Ketika codebase tersedia, hasil audit harus mengikuti format:

```text
ID:
Severity:
File:
Line:
Finding:
Exploit:
Evidence:
Minimal fix:
Verification:
Regression risk:
```

Tidak boleh melakukan refactor opportunistik saat memperbaiki security issue.

---

# 35. Security vs Frontend-first

Frontend-first tetap valid.

Namun mock frontend harus dibangun agar tidak mengajarkan pola production yang salah.

## Boleh pada frontend-first

- mock user;
- mock entitlement;
- mock assessment question;
- fake countdown untuk demo;
- hyperlink antar route;
- simulated success/error.

## Tidak boleh dianggap production-ready

- role hanya dari `localStorage`;
- `isAdmin=true` di browser sebagai protection;
- score final dihitung client;
- payment active setelah klik WhatsApp;
- answer key terkirim di mock API shape yang kemudian dicopy ke production;
- secret dummy memakai nama real production env;
- upload hanya divalidasi frontend.

Gunakan interface mock yang menyerupai contract aman sehingga backend nanti dapat mengganti source datanya tanpa redesign.

---

# 36. Security Notes Khusus Reusable UI

Karena Page 08–10 memakai struktur dashboard yang sama dengan entitlement berbeda:

**Jangan membuat security logic tersebar di komponen visual.**

Buruk:

```tsx
if (membership === 'sensei') {
  fetch('/api/mini-checkpoint')
}
```

sebagai satu-satunya protection.

Lebih baik:

- UI menentukan render/locked state dari authorized capability yang diberikan server;
- API tetap independently checks user.

Komponen reusable:

```text
EntitlementCard
LockedFeature
AssessmentRunner
```

tidak boleh mempunyai hidden backdoor melalui prop client yang bisa diubah user.

---

# 37. Open Security Decisions

## OPEN-SEC-01 — Admin MFA

Rekomendasi: **YA sebelum production**.

Perlu keputusan UX/operasional.

## OPEN-SEC-02 — Upload size limits

Perlu angka final untuk:

- image;
- audio;
- PDF;
- replay;
- community attachment.

## OPEN-SEC-03 — Rich text editor format

Pilihan security-friendly:

- structured JSON;
- sanitized HTML;
- constrained Markdown.

Jangan memutuskan sanitizer sebelum editor dipilih.

## OPEN-SEC-04 — Production domain layout

Contoh:

```text
hiruacademy.com
api.hiruacademy.com
```

atau reverse-proxy same-origin.

Mempengaruhi Sanctum/CORS/cookie configuration.

## OPEN-SEC-05 — Public/private media split

Perlu classification final untuk:

- course media;
- replay;
- certificate;
- blog image;
- community attachment.

## OPEN-SEC-06 — Retention Placement lead

Nomor WhatsApp adalah PII.

Perlu retention policy bisnis.

## OPEN-SEC-07 — Admin permission granularity

Figma saat ini memiliki satu role Admin utama.

Perlu keputusan apakah production tetap single Admin role atau memiliki operator/content/finance permissions.

Jangan mengarang subrole tanpa kebutuhan client.

---

# 38. Primary Security References

Dokumen ini diselaraskan dengan dokumentasi utama berikut:

1. Next.js — Content Security Policy guide  
   `https://nextjs.org/docs/app/guides/content-security-policy`

2. Next.js — `headers` configuration  
   `https://nextjs.org/docs/app/api-reference/config/next-config-js/headers`

3. Laravel — Authentication / Sanctum recommendation  
   `https://laravel.com/docs/12.x/authentication`

4. Laravel — Sanctum SPA authentication  
   `https://laravel.com/docs/11.x/sanctum`

5. OWASP Cheat Sheet — Authorization  
   `https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html`

6. OWASP Cheat Sheet — Session Management  
   `https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html`

7. OWASP Cheat Sheet — File Upload  
   `https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html`

---

# 39. Final Verdict Batch 3

## Kondisi sekarang

**RefrensiHTML boleh terus dipakai sebagai implementation experience reference.**

Tiga hal harus dibersihkan pada saat migration:

1. runtime Tailwind CDN;
2. inline JS/event handler;
3. external prototype asset dependency.

Tidak ada hardcoded secret yang ditemukan pada reference source.

Tidak ada dangerous JavaScript sink seperti `eval`, `innerHTML`, atau `document.write` yang ditemukan pada reference source.

## Kondisi production

**BELUM BOLEH DIBERI STATUS AMAN.**

Alasannya sederhana:

> Next.js/Laravel production codebase belum tersedia untuk diaudit.

Dokumen ini menjadi security contract untuk fase frontend-first dan daftar audit yang harus dijalankan ulang setelah implementation code tersedia.

---

# Appendix A — Security Severity Definition

## KRITIS

Eksploitasi dapat menyebabkan compromise luas tanpa hambatan berarti, misalnya:

- remote code execution;
- mass authentication bypass;
- public database secret yang aktif;
- arbitrary admin takeover.

## TINGGI

Dampak besar terhadap account/data/business:

- privilege escalation;
- IDOR terhadap sensitive resource luas;
- admin endpoint tanpa authorization;
- unrestricted dangerous upload;
- session/token theft route.

## SEDANG

Eksploitasi membutuhkan kondisi tambahan atau dampaknya lebih terbatas:

- supply-chain exposure;
- missing hardening dengan exploitation path realistis;
- insufficient rate limit pada area sensitif;
- partial information exposure.

## RENDAH

Hardening issue atau exploitation membutuhkan chain yang lebih panjang:

- CSP incompatibility;
- unnecessary third-party resource;
- verbose non-sensitive metadata.

---

# Appendix B — Quick Re-Audit Command Set

Ketika repository tersedia:

```bash
# Frontend
git status
find . -maxdepth 3 -name 'package.json' -o -name 'package-lock.json' -o -name 'pnpm-lock.yaml'
npm audit
rg -n "dangerouslySetInnerHTML|localStorage|sessionStorage|NEXT_PUBLIC_|Authorization|Bearer|document\.cookie|eval\(|innerHTML" src app components lib

# Laravel
composer audit
php artisan route:list
rg -n "Route::|auth:sanctum|Gate::|Policy|authorize\(|can:|withoutMiddleware|DB::raw|whereRaw|selectRaw|request\(\)->all|\$request->all" routes app config

# Secret scan baseline
rg -n -i "api[_-]?key|secret|token|password|private[_-]?key|BEGIN PRIVATE|aws_|sk_live|sk_test" . \
  -g '!node_modules' -g '!vendor' -g '!.git'
```

Command di atas adalah audit helper, bukan bukti keamanan otomatis.

Manual authorization review tetap wajib.

---

# Appendix C — HIRU High-Risk Resource Checklist

| Resource | Owner/role check | Entitlement | Sensitive |
|---|---:|---:|---:|
| User Profile | ✓ | — | ✓ |
| Placement Lead | Admin | — | ✓ |
| Invoice | User/Admin | — | ✓ |
| Entitlement | Admin/system | ✓ | ✓ |
| Assessment Attempt | User/Admin | ✓ | ✓ |
| Answer | User/Admin | ✓ | ✓ |
| Answer Key | Admin only | ✓ | ✓ |
| Certificate | User/Admin | ✓ | ✓ |
| Replay | Sensei member/Admin | ✓ | ✓ |
| Tanya Sensei | User/Admin/Sensei workflow | ✓ | ✓ |
| Community Attachment | owner/moderator | membership | potentially |
| Blog Draft | Admin | — | operational |
| Public Article | public | — | no |
| Audit Log | Admin | — | ✓ |

---

**End of `03-SECURITY-AUDIT.md`**
