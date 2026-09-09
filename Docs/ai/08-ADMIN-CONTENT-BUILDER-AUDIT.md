# ADMIN CONTENT BUILDER AUDIT — HIRU ACADEMY

**Status:** Audit frontend-first dan handoff backend  
**Scope:** Surface publik, student dashboard, learning journey, assessment, Sensei, dan CMS Admin  
**Batas klaim:** Audit ini tidak menyatakan produk fully no-code. Builder yang direkomendasikan hanya memindahkan pengelolaan konten dan konfigurasi rutin ke Admin; authorization, entitlement, scoring, timer, attempts, progress, publikasi, dan validasi tetap menjadi system logic milik backend.

---

## 1. Ringkasan Audit

Admin route yang sudah ada:

- `/admin/landing-page`
- `/admin/program`
- `/admin/program/[level]/chapters`
- quiz
- tryout
- `/admin/content-library`
- `/admin/placement`
- `/admin/mini-checkpoint`
- `/admin/sensei`
- `/admin/testimonials`
- `/admin/blog`
- `/admin/announcements`
- `/admin/cohorts`
- `/admin/settings`
- `/admin/content-studio` (Hub terpasang)
- `/admin/content-studio/dashboards` (P0 Dashboard Presentation Builder terpasang)
- `/admin/content-studio/levels` (P0 Level Builder terpasang)
- `/admin/content-studio/lessons` (P0 Lesson Builder terpasang)
- `/admin/content-studio/flashcards` (P0 Flashcard Builder terpasang)

Seluruh UI yang ada masih **frontend-local**, memakai data lokal/mock, dan **belum persistent**. Backend belum tersedia. Karena itu, label **IMPLEMENTED** dalam dokumen ini berarti surface atau UI Admin telah tersedia di frontend, bukan fitur production-ready.

P0 Builders yang diimplementasikan pada batch ini:

1. `/admin/content-studio` — Content Studio Hub
2. `/admin/content-studio/dashboards` — Dashboard Presentation Builder (Free, Mandiri, Sensei)
3. `/admin/content-studio/levels` — Level Builder (N5–N1)
4. `/admin/content-studio/lessons` — Lesson Builder (controlled blocks: video, document, japanese, image, callout, exerciseReference)
5. `/admin/content-studio/flashcards` — Flashcard Builder (front/back, furigana ruby/rt, examples, flip preview)

Existing Admin direuse penuh:
- Landing Page: `/admin/landing-page`
- Program & Access: `/admin/program`
- Chapter Builder: `/admin/program/[level]/chapters`
- Quiz / Checkpoint: `/admin/program/[level]/chapters/[chapter]/quiz`
- Try Out: `/admin/program/[level]/tryout`
- Placement: `/admin/placement`
- Mini Checkpoint: `/admin/mini-checkpoint`
- Sensei: `/admin/sensei`
- Testimonials: `/admin/testimonials`
- Blog: `/admin/blog`
- Announcements: `/admin/announcements`
- Media Assets: `/admin/content-library`
- Cohorts & Class: `/admin/cohorts`
- Settings / Branding: `/admin/settings`

### Klasifikasi

- **CONTENT** — copy, media, artikel, materi, soal, testimonial, replay, dan konten editorial lain.
- **CONFIGURATION** — urutan, visibility, publish state, relasi konten, CTA destination, paket, jadwal, dan parameter operasional.
- **SYSTEM LOGIC** — authorization, entitlement, timer, attempts, scoring, progress, unlock rules, ownership, idempotency, dan aturan server lain. Tidak boleh diperlakukan sebagai editable content bebas.

---

## 2. Coverage Matrix

| Surface | Editable content | Current source | Existing Admin support | Gap | Recommended builder | Priority |
|---|---|---|---|---|---|---|
| Public landing page | Hero, section copy, CTA label/destination, media, highlights, FAQ, SEO metadata (**CONTENT / CONFIGURATION**) | Frontend-local | **IMPLEMENTED** — `/admin/landing-page` | Belum persistent; belum ada draft, preview, publish, versioning, validasi link/media | Section-based landing page editor dengan schema section terbatas, preview, draft/publish | P0 |
| Public program listing/detail | Nama, deskripsi, benefit, media, level coverage, SEO, ordering (**CONTENT / CONFIGURATION**) | Frontend-local | **IMPLEMENTED** — `/admin/program` | Belum persistent; relasi paket-level dan publish state belum dikontrak | Program editor terstruktur, bukan arbitrary page builder | P0 |
| Pricing/package presentation | Nama paket, price display, feature list, CTA, visibility, ordering (**CONTENT / CONFIGURATION**); eligibility dan aktivasi (**SYSTEM LOGIC**) | Frontend-local; nilai final belum boleh ditebak | **EXISTING/REUSED** — `/admin/program` atau `/admin/settings` dapat menjadi entry point | Harga/promo final unresolved; backend activation dan entitlement absent | Pricing configuration panel dengan server-owned product/entitlement reference | P0 setelah keputusan harga tersedia |
| Public showcase | Highlight hasil belajar, media, caption, ordering, visibility (**CONTENT / CONFIGURATION**) | Frontend-local | **EXISTING/REUSED** — `/admin/landing-page` dan `/admin/content-library` | Belum ada collection/schema showcase dan publish workflow | Reusable showcase collection block | P1 |
| Public testimonial | Quote, nama, role/context, avatar, ordering, publish state (**CONTENT / CONFIGURATION**) | Frontend-local | **IMPLEMENTED** — `/admin/testimonials` | Belum persistent; consent/source provenance belum dimodelkan | Testimonial collection editor dengan moderation/publish | P0 |
| Public blog | Title, slug, excerpt, body, cover, author display, SEO, publication state/date (**CONTENT / CONFIGURATION**) | Frontend-local | **IMPLEMENTED** — `/admin/blog` | Belum persistent; sanitization, unique slug, preview, scheduling, canonical absent | Structured rich-text blog editor dengan SEO dan draft/publish | P0 |
| Public footer | Navigation groups, labels, legal links, contact display (**CONTENT / CONFIGURATION**) | Frontend-local | **EXISTING/REUSED** — `/admin/settings` | Belum ada schema/versioned global navigation; legal destination unresolved | Global site settings editor | P1 |
| Public social links | Platform, URL, label, visibility, ordering (**CONFIGURATION**) | Frontend-local | **EXISTING/REUSED** — `/admin/settings` | URL validation dan persistence absent | Social link repeater dalam global settings | P1 |
| Free Member dashboard | Welcome/presentation copy, feature cards, banners, upgrade CTA (**CONTENT / CONFIGURATION**); locks dan access (**SYSTEM LOGIC**) | Frontend-local | Tidak ada dedicated builder | Missing dashboard presentation builder; entitlement belum server-owned | Satu dashboard presentation builder berbasis audience/entitlement | P0 |
| LMS dashboard | Presentation copy, progress labels, next-action cards, announcements (**CONTENT / CONFIGURATION**); progress/access (**SYSTEM LOGIC**) | Frontend-local | `/admin/announcements` hanya mencakup announcement | Dashboard composition belum editable; progress backend absent | Builder sama dengan Free, memakai entitlement variants bukan dashboard terpisah | P0 |
| LMS + Sensei dashboard | Presentation copy, schedule/replay/Tanya Sensei cards (**CONTENT / CONFIGURATION**); cohort/access (**SYSTEM LOGIC**) | Frontend-local | `/admin/announcements`, `/admin/cohorts`, `/admin/sensei` parsial | Belum ada presentation composition dan binding aman ke cohort | Builder dashboard bersama dengan blocks khusus entitlement | P0 |
| Journey | Heading, guidance copy, level sequence/presentation (**CONTENT / CONFIGURATION**); unlock/progress (**SYSTEM LOGIC**) | Frontend-local | `/admin/program` dan chapter route parsial | Tidak ada journey-level composition; unlock rules belum server-owned | Journey configuration pada program editor dengan read-only system-rule references | P0 |
| Level | Nama, description, outcomes, thumbnail, ordering, visibility (**CONTENT / CONFIGURATION**); entitlement (**SYSTEM LOGIC**) | Frontend-local | Program support parsial | Missing level editor | Dedicated level editor di bawah program | P0 |
| Chapter | Nama, description, ordering, visibility, lesson composition (**CONTENT / CONFIGURATION**); completion/unlock (**SYSTEM LOGIC**) | Frontend-local | **IMPLEMENTED** — `/admin/program/[level]/chapters` | Belum persistent; relasi lesson dan publish validation incomplete | Chapter outline builder dengan sortable lesson references | P0 |
| Lesson | Title, objective, body, video/audio/module/resource references (**CONTENT / CONFIGURATION**); completion tracking (**SYSTEM LOGIC**) | Frontend-local | `/admin/content-library` hanya dapat direuse untuk asset | Missing lesson builder | Structured lesson builder memakai asset dari Content Library | P0 |
| Flashcard | Front/back, furigana, audio, image, tags, deck/order (**CONTENT / CONFIGURATION**); mastery/progress (**SYSTEM LOGIC**) | Frontend-local | Tidak ada dedicated builder | Missing flashcard builder; persistence dan deck relation absent | Flashcard/deck builder dengan bulk entry/import tervalidasi | P0 |
| Quiz / Latihan Harian / Checkpoint | Prompt, options, explanation, media, taxonomy (**CONTENT**); passing score, availability (**CONFIGURATION**); attempts, scoring, answer secrecy (**SYSTEM LOGIC**) | Frontend-local | **IMPLEMENTED** — quiz Admin surface | Belum persistent; family/config contract dan secure answer handling absent | Reusable assessment builder dengan type-specific configuration | P0 |
| Try Out | Section, question bank, instructions (**CONTENT**); duration, passing/review policy (**CONFIGURATION**); timer, scoring, attempts, idempotency (**SYSTEM LOGIC**) | Frontend-local | **IMPLEMENTED** — tryout Admin surface | Backend absent; refresh-safe timer, double-submit protection, answer secrecy absent | Assessment builder variant untuk Try Out | P0 |
| Placement | Questions, explanations, recommendation copy (**CONTENT**); recommendation mapping (**CONFIGURATION**); scoring, lead ownership, submission (**SYSTEM LOGIC**) | Frontend-local | **IMPLEMENTED** — `/admin/placement` | Persistence, lead capture, secure scoring, configurable mapping absent | Dedicated Placement builder dan lead result console | P0 |
| Mini Checkpoint | Questions/explanations (**CONTENT**); level, sesi, part, timer, passing score (**CONFIGURATION**); LMS + Sensei entitlement, scoring, attempts (**SYSTEM LOGIC**) | Frontend-local | **IMPLEMENTED** — `/admin/mini-checkpoint` | Backend absent; required hierarchy dan secure rules belum persistent | Assessment builder variant dengan `level -> sesi -> part` structure | P0 |
| Replay | Title, description, recording/media reference, attachments (**CONTENT**); cohort/session visibility (**CONFIGURATION**); authorization (**SYSTEM LOGIC**) | Frontend-local | **EXISTING/REUSED** — `/admin/sensei`, `/admin/cohorts`, `/admin/content-library` | Dedicated replay management/binding belum jelas; secure media access absent | Replay panel pada cohort/session detail, reuse Content Library | P0 untuk Sensei delivery |
| Schedule | Session title, agenda, meeting display data (**CONTENT**); date/time, timezone, cohort, status (**CONFIGURATION**); access and secure meeting details (**SYSTEM LOGIC**) | Frontend-local | **EXISTING/REUSED** — `/admin/sensei`, `/admin/cohorts` | Persistence, conflict validation, absolute timestamp contract absent | Cohort schedule editor dengan timezone-aware fields | P0 untuk Sensei delivery |
| Sensei presentation/assignment | Profile display, bio, photo (**CONTENT**); assignment ke cohort/session (**CONFIGURATION**); permissions (**SYSTEM LOGIC**) | Frontend-local | **IMPLEMENTED** — `/admin/sensei` | Backend absent; assignment contract belum tersedia; tidak ada Sensei portal requirement | Sensei directory dan assignment editor, tanpa membuat role portal baru | P0 |
| Program operational structure | Program-level relations, ordering, availability, publication (**CONFIGURATION**) | Frontend-local | **IMPLEMENTED** — `/admin/program` | Persistence dan referential validation absent | Program editor sebagai root untuk level/journey hierarchy | P0 |
| Content Library | Media title, alt text, caption, tags (**CONTENT**); visibility/reuse metadata (**CONFIGURATION**) | Frontend-local | **IMPLEMENTED** — `/admin/content-library` | Upload validation, object storage, ownership, usage references absent | Shared asset library dengan picker untuk semua builder | P0 |
| Announcement | Title, body, CTA (**CONTENT**); audience, active window, priority (**CONFIGURATION**); entitlement targeting enforcement (**SYSTEM LOGIC**) | Frontend-local | **IMPLEMENTED** — `/admin/announcements` | Persistence, scheduling, audience validation absent | Announcement editor dengan audience rules terbatas | P1 |
| Cohort | Name/display details (**CONTENT**); program, Sensei, students, start/end, status (**CONFIGURATION**); membership/access integrity (**SYSTEM LOGIC**) | Frontend-local | **IMPLEMENTED** — `/admin/cohorts` | Backend, enrollment relation, authorization absent | Cohort operations editor | P0 |
| Global settings | Brand assets, default SEO, contact/footer settings (**CONTENT / CONFIGURATION**) | Frontend-local | **IMPLEMENTED** — `/admin/settings` | Schema, secret separation, persistence, audit log absent | Typed settings forms; jangan expose secret sebagai browser config | P1 |
| Content Studio hub | Cross-content navigation, drafts, publishing queue, validation status (**CONFIGURATION**) | Tidak ada | Tidak ada | Missing central hub; route tersebar tanpa editorial overview | Content Studio hub yang mereuse seluruh existing editor | P0 |

---

## 3. Status Implementasi

### IMPLEMENTED

Frontend Admin surface sudah ada untuk:

- landing page;
- program;
- chapter;
- quiz;
- tryout;
- Content Library;
- Placement;
- Mini Checkpoint;
- Sensei;
- testimonial;
- blog;
- announcement;
- cohort;
- settings.

`IMPLEMENTED` hanya berarti route/UI frontend tersedia. Data masih frontend-local, tidak persistent, belum memiliki backend authorization, dan belum memenuhi Definition of Done production.

### EXISTING/REUSED

Komponen/surface berikut sebaiknya direuse, bukan dibuat sebagai sistem terpisah:

- `/admin/program` sebagai root program, journey, dan level hierarchy;
- `/admin/program/[level]/chapters` sebagai outline chapter;
- `/admin/content-library` sebagai asset picker lesson, flashcard, blog, replay, showcase, dan landing page;
- quiz builder sebagai basis satu configurable assessment family untuk quiz, Checkpoint, Try Out, dan Mini Checkpoint, dengan configuration khusus tiap tipe;
- `/admin/sensei` dan `/admin/cohorts` untuk schedule, replay binding, dan assignment;
- `/admin/settings` untuk footer, social, brand, dan global SEO defaults;
- satu dashboard presentation builder untuk Free, LMS, dan LMS + Sensei dengan entitlement variants.

### STILL NEEDS BACKEND

Semua existing dan recommended builder masih membutuhkan:

- Laravel API dan Sanctum session/auth;
- PostgreSQL persistence dan migration;
- server-side authorization dan resource ownership;
- role/permission Admin yang belum boleh ditebak granularity-nya;
- draft, preview, publish, unpublish, scheduling, dan revision/audit history;
- validation dan sanitization controlled rich content;
- S3-compatible upload, media metadata, usage references, dan access policy;
- server-owned entitlement, progress, unlock rules, score, timer, attempts, dan passing rules;
- idempotent assessment submission;
- stale autosave and optimistic concurrency handling;
- unique slug, SEO metadata, canonical, sitemap/publication integration;
- absolute timestamp storage dengan display `Asia/Jakarta`;
- protection agar answer key tidak terkirim sebelum review diizinkan;
- secure replay/meeting access berdasarkan cohort dan entitlement.

---

## 4. Missing P0 Builder Scope

### 4.1 Content Studio Hub

Hub editorial, bukan builder baru yang menduplikasi editor. Minimum scope:

- daftar content type;
- draft/published/scheduled status;
- search/filter;
- validation issue summary;
- deep link ke existing editor;
- recent changes ketika backend audit log tersedia.

### 4.2 Dashboard Presentation Builder

Satu builder untuk tiga dashboard. Minimum editable blocks:

- welcome/banner;
- feature/promotion card;
- next-action presentation;
- announcement placement;
- ordering dan visibility per entitlement.

Builder tidak menentukan entitlement atau progress. Backend mengirim state yang berhak dilihat; configuration hanya menentukan presentasi untuk state tersebut.

### 4.3 Level Editor

Minimum scope:

- title, slug/internal key, description, outcome, thumbnail;
- ordering dan publication state;
- relation ke program;
- chapter outline link;
- read-only visibility atas entitlement binding.

### 4.4 Lesson Builder

Minimum blocks:

- rich text terkontrol;
- video/audio;
- downloadable module/resource;
- image;
- Content Library reference;
- flashcard/deck reference;
- assessment reference;
- ordering dan preview.

Completion dan unlock rules tetap system logic, bukan arbitrary editable script.

### 4.5 Flashcard Builder

Minimum scope:

- deck metadata;
- front/back;
- `<ruby><rt>`-compatible Japanese text/furigana;
- audio/image reference;
- tags dan ordering;
- preview flip;
- duplicate and required-field validation.

Flashcard mastery/progress tetap dihitung backend.

---

## 5. OPTIONAL P1/P2

### OPTIONAL P1

- global footer/social editor;
- announcement scheduling dan targeting UI;
- showcase collection;
- bulk flashcard import dengan validation report;
- reusable section presets untuk landing page;
- content calendar untuk blog/announcement;
- dashboard block scheduling;
- revision comparison dan restore setelah audit/version contract tersedia.

### OPTIONAL P2

- reusable templates antar program/level;
- duplicate lesson/deck dengan explicit ownership handling;
- editorial workflow multi-approver;
- advanced content performance analytics;
- bulk metadata operations;
- preview share link dengan expiry;
- content dependency graph dan orphaned-asset cleanup.

P1/P2 tidak boleh menunda P0 persistence, authorization, builder inti, atau assessment safety.

---

## 6. Endpoint dan Data Contract yang Dibutuhkan

Nama endpoint final masih **OPEN**. Daftar berikut menjelaskan capability/data contract, bukan menetapkan URL final.

| Domain | Contract/capability minimum |
|---|---|
| Content Studio | List content lintas tipe; filter status/type/author/date; validation summary; deep-link identifier |
| Publication | Draft/save, preview token, publish, unpublish, schedule, revision/version, optimistic concurrency key |
| Landing page | Page identity, ordered typed sections, section payload schema, locale/status, SEO, CTA references |
| Dashboard presentation | Ordered typed blocks, entitlement audience, visibility window, CTA reference, presentation-only payload |
| Program/level/journey | Program, levels, ordering, outcomes, publication state, stable IDs/slugs, entitlement references |
| Chapter/lesson | Hierarchy, order, typed lesson blocks, asset/deck/assessment references, completion presentation |
| Flashcard | Deck, cards, ruby/furigana fields, media references, tags, order, validation errors |
| Assessment content | Assessment type, sections, questions, options, explanations, media, taxonomy, review policy |
| Assessment rules | Duration, passing score, attempts, availability, server timestamps, version; answer key excluded from delivery contract |
| Assessment attempt | Start/resume/autosave/submit/result/review; idempotency key; answer version; authoritative timer and score |
| Placement | Form/lead fields, attempt, recommendation mapping/version, result; ownership and retention policy |
| Schedule | Cohort/session, absolute start/end timestamps, display timezone, status, secure meeting fields |
| Replay | Session/cohort relation, asset reference, publication state, entitlement/access response |
| Sensei | Public profile fields and assignment relations; no standalone Sensei portal contract |
| Testimonial | Content, attribution/context, media, consent/provenance status, order, publication state |
| Blog | Slug, sanitized rich content, cover, author display, SEO/canonical, publication/schedule state |
| Pricing/program offer | Product reference, display price/currency, feature presentation, availability; server-owned activation/entitlement |
| Showcase | Collection/item, media, caption, order, visibility |
| Settings | Typed public settings, footer/navigation/social, SEO defaults; secrets excluded from browser-readable response |
| Media | Signed upload or server upload flow, validation, metadata, alt text, storage key, usage references, access visibility |
| Audit | Actor, action, resource/version, timestamp, before/after metadata sesuai retention policy |

### Contract rules

- Semua mutation membutuhkan authorization server-side dan validation error terstruktur.
- Publish harus menolak referensi rusak dan required content yang belum lengkap.
- Slug dan stable ID harus dibedakan agar perubahan slug tidak memutus relasi internal.
- Rich content harus memakai schema/allowlist dan sanitization server-side.
- Media private tidak boleh diekspos melalui public object URL permanen.
- Assessment rules harus versioned per attempt agar perubahan Admin tidak mengubah attempt berjalan.
- Autosave harus membawa attempt/version identifier untuk menolak stale write.
- Submit manual dan otomatis harus memakai idempotency contract yang sama.
- Public API hanya mengembalikan published content.
- Harga, promo, limits, dan permission granularity tetap **OPEN** sampai requirement final tersedia.

---

## 7. Handoff Readiness

| Area | Readiness | Handoff requirement |
|---|---|---|
| Frontend route inventory | READY | Route existing sudah teridentifikasi |
| Builder gap inventory | READY | Lima missing P0 sudah teridentifikasi |
| Content/config/system classification | READY | Boundary tersedia dalam matrix |
| Reuse direction | READY | Reuse existing Admin surfaces dan shared assessment/dashboard families |
| Backend implementation | NOT READY | Backend absent; API, auth, DB, storage, queue/scheduling belum tersedia |
| Endpoint naming | OPEN | Backend dan frontend perlu menyepakati REST/resource conventions |
| Database schema | OPEN | Perlu ERD untuk content hierarchy, publication, assessment, cohort, media, dan audit |
| Admin permission granularity | OPEN | Tidak boleh ditebak sebelum keputusan client/product |
| Pricing/promotion values | OPEN | Tidak boleh ditebak |
| Upload limits/storage visibility | OPEN | Perlu security dan operations decision |
| Exact unresolved UI copy | OPEN | Harus diambil verbatim dari Figma Pages 08–11 |
| Production readiness | NOT READY | Membutuhkan persistence, authorization, validation, security, dan E2E |

### Ready untuk handoff jika

1. Product menyetujui P0 builder boundary dan daftar field per content type.
2. Exact copy dan unresolved configuration diberi keputusan atau tetap ditandai `OPEN`.
3. Backend menyepakati resource model, publication lifecycle, versioning, dan error envelope.
4. Security menyepakati Admin authorization, rich-content sanitization, upload policy, dan private media access.
5. Assessment contract mengunci timer, attempts, score, review visibility, idempotency, dan stale autosave behavior.
6. Frontend mengganti local repository/mock boundary dengan API adapter tanpa menyebar fetch langsung di JSX.
7. QA menerima critical flows termasuk draft/publish, broken-reference rejection, concurrent edit, upload failure, dan assessment race cases.

---

## 8. Kesimpulan

Coverage Admin saat ini luas secara route, tetapi belum production-capable karena seluruh state frontend-local dan backend absent. Prioritas bukan membuat generic no-code platform. Prioritas P0 adalah melengkapi Content Studio hub, dashboard presentation builder, level editor, lesson builder, dan flashcard builder; mereuse route/editor yang sudah ada; lalu memasang persistence, publication workflow, authorization, validation, dan server-owned system logic.
