# HiruAcademy Project State Audit

> Snapshot repository aktual per 13 September 2026. **FAKTA** berarti terbukti dari source/command; **INFERENSI** berarti kesimpulan dari bukti; **CANNOT VERIFY** berarti bukti belum tersedia. Audit read-only selain report ini.

## 1. Executive Summary

- **FAKTA:** frontend Next.js memiliki **85 route**: 19 public/auth/commerce, 35 student, dan 31 Admin. Route union generated: `Frontend/.next/types/routes.d.ts:4`.
- **FAKTA:** Backend belum ada; `Backend/.gitkeep` satu-satunya file.
- **FAKTA:** public, placement, Free/LMS/Sensei, learning, assessment, dan Admin sudah luas secara visual, tetapi data bisnis masih fixture, query string, `sessionStorage`, atau React state.
- **FAKTA:** membership berasal dari `?membership=` (`Frontend/src/lib/dashboard-mock.ts:193-195`); Admin tidak memiliki route guard.
- **FAKTA:** Content Studio repository read-only dan semua default kosong (`Frontend/src/lib/content-studio.ts:85-109`).
- **INFERENSI:** kondisi produk = clickable frontend prototype; belum integrated MVP dan belum production-ready.
- **CANNOT VERIFY:** exact Figma Pages 08–11 parity dan browser QA penuh.

## 2. Current Tech Stack

| Area | Aktual | Evidence/catatan |
|---|---|---|
| Framework | Next.js 16.3.0 App Router | `Frontend/package.json:13` |
| UI runtime | React/React DOM 19.2.8 | `Frontend/package.json:14-15` |
| Language | TypeScript 5 | `Frontend/package.json:30` |
| Styling | Tailwind CSS 3.4.17, PostCSS, Autoprefixer, global CSS | `Frontend/package.json:25,28-29` |
| Icons | `react-icons` 5.7 | `Frontend/package.json:16` |
| Lint | ESLint 9 + `eslint-config-next` | `Frontend/package.json:26-27` |
| Browser test | Playwright 1.63 | `Frontend/package.json:19`; config tersedia |
| Backend target | Laravel, Sanctum, PostgreSQL, S3-compatible | Requirement; belum diimplementasikan |
| API/state/form libraries | Tidak ada | Dependencies hanya empat runtime package |
| CI/deployment | Tidak ditemukan | **CANNOT VERIFY** di luar repository |

## 3. Repository Structure

| Path | Isi/fungsi | Kondisi |
|---|---|---|
| `Frontend/src/app/` | 85 App Router pages + root layout/style | Aktif |
| `Frontend/src/components/` | 35 shared/feature components | Aktif |
| `Frontend/src/lib/` | 9 mock/domain modules | Aktif/fixture |
| `Frontend/tests/` | visual/reference Playwright specs | Parsial |
| `Frontend/public/` | 26 brand, Sensei, testimonial, showcase, reference files | Campuran runtime/reference |
| `Backend/` | `.gitkeep` | Placeholder |
| `Docs/ai/` | PRD, UI, security, debug, E2E blueprint, audits | Requirement/support |
| `Docs/figma-contracts/` | Extracted Figma contracts | Requirement evidence |
| `Docs/RefrensiHTML/` | Experience/token reference | Bukan product authority |
| `graphify-out/` | Generated knowledge graph | Tool output; jangan edit |
| `docs/PROJECT_STATE_AUDIT.md` | Report ini | Satu-satunya file audit berubah |

## 4. Git / Current Working State

- HEAD saat audit: `85cfe2d fix(student): remove progress rings from journey pages`.
- Final intended working change: hanya `docs/PROJECT_STATE_AUDIT.md`.
- Graph query sempat mengubah `graphify-out/cache/last_query_stamp`; sudah dipulihkan.
- **Validation aktual:** lint first run timeout setelah 120 detik; rerun timeout 300 detik selesai dan gagal karena 6 warning dengan `--max-warnings=0`:
  1. `chapter-journey.tsx`: `LuBookOpen` unused.
  2. `chapter-journey.tsx`: `LuCheck` unused.
  3. `journey-shell.tsx`: prop `current` unused.
  4. `lesson-overview.tsx`: `LuArrowRight` unused.
  5. `lesson-overview.tsx`: `query` unused.
  6. `level-selection.tsx`: `LuKey` unused.
- Typecheck gagal: `.next/types/validator.ts(5,56): TS2307 Cannot find module './routes.js'`.
- Build berhasil; output terakhir: `Finished TypeScript in 11.9s`. Tidak ada klaim build lain.

## 5. Route Map

Semua 85 route berikut berasal dari page aktual dan dikonfirmasi `Frontend/.next/types/routes.d.ts:4-98`.

| Route | File | Status | Tujuan | Navigation Source | Catatan |
|---|---|---|---|---|---|
| `/` | `src/app/page.tsx` | Implemented/mock | Landing | Public nav/direct | Static content |
| `/affiliate` | `src/app/affiliate/page.tsx` | Partial | Affiliate | Student profile/dashboard | Fixture |
| `/ask-sensei` | `src/app/ask-sensei/page.tsx` | Partial | Tanya Sensei | Student nav | Sensei client gate |
| `/blog` | `src/app/blog/page.tsx` | Partial | Blog list | Public nav | Fixture |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Partial | Blog detail | Blog list | Fixture slug |
| `/certificate` | `src/app/certificate/page.tsx` | Partial | Certificate Center | Student nav | Fixture/client access |
| `/certificate/n3` | `src/app/certificate/n3/page.tsx` | Partial | N3 certificate state | Certificate | Unavailable state |
| `/certificate/n4` | `src/app/certificate/n4/page.tsx` | Partial | N4 certificate state | Certificate | Unavailable state |
| `/certificate/n5` | `src/app/certificate/n5/page.tsx` | Partial | N5 certificate detail | Profile/certificate | Client gate |
| `/checkout` | `src/app/checkout/page.tsx` | Partial | Order summary | Program/register | Local state/query |
| `/community` | `src/app/community/page.tsx` | Partial | Community list | Student nav | Free read-only visual |
| `/community/ask` | `src/app/community/ask/page.tsx` | Partial | Ask/community bridge | Community | Query membership |
| `/community/create` | `src/app/community/create/page.tsx` | Partial | Create post | Community | No persistence |
| `/community/post-1` | `src/app/community/post-1/page.tsx` | Partial | Post detail | Community list | Hardcoded sample |
| `/dashboard` | `src/app/dashboard/page.tsx` | Implemented/mock | Student dashboard | Login/register | Query membership |
| `/flashcards` | `src/app/flashcards/page.tsx` | Partial | Flashcard collection | Student nav | Fixture |
| `/forgot-password` | `src/app/forgot-password/page.tsx` | Partial | Recovery request | Login | UI-only |
| `/invoice` | `src/app/invoice/page.tsx` | Partial | Pending invoice | Checkout | No persistence |
| `/journey` | `src/app/journey/page.tsx` | Implemented/mock | Level selection | Dashboard/nav | Fixture access |
| `/journey/[level]` | `src/app/journey/[level]/page.tsx` | Implemented/mock | Chapter journey | Level selection | Dynamic/client access |
| `/kebijakan-privasi` | `src/app/kebijakan-privasi/page.tsx` | Implemented/static | Privacy | Placement/public | Static |
| `/leaderboard` | `src/app/leaderboard/page.tsx` | Partial | Ranking | Student nav/dashboard | Fixture |
| `/learn/[level]/[chapter]` | `src/app/learn/[level]/[chapter]/page.tsx` | Implemented/mock | Lesson overview | Journey | Dynamic |
| `/learn/[level]/[chapter]/audio` | `src/app/learn/[level]/[chapter]/audio/page.tsx` | Partial | Audio activity | Learning shell | Local answers |
| `/learn/[level]/[chapter]/checkpoint` | `src/app/learn/[level]/[chapter]/checkpoint/page.tsx` | Partial | Checkpoint | Learning shell | Local score/progress |
| `/learn/[level]/[chapter]/flashcards` | `src/app/learn/[level]/[chapter]/flashcards/page.tsx` | Implemented/mock | Flashcard session | Learning shell | Local session |
| `/learn/[level]/[chapter]/grammar` | `src/app/learn/[level]/[chapter]/grammar/page.tsx` | Implemented/mock | Grammar document | Learning shell | Fixture |
| `/learn/[level]/[chapter]/kanji` | `src/app/learn/[level]/[chapter]/kanji/page.tsx` | Implemented/mock | Kanji document | Learning shell | Fixture |
| `/learn/[level]/[chapter]/reading` | `src/app/learn/[level]/[chapter]/reading/page.tsx` | Partial | Reading activity | Learning shell | Local answers |
| `/learn/[level]/[chapter]/video` | `src/app/learn/[level]/[chapter]/video/page.tsx` | Partial | Video lesson | Learning shell | Simulated completion |
| `/library` | `src/app/library/page.tsx` | Partial | Material library | Student nav | Fixture |
| `/login` | `src/app/login/page.tsx` | Partial | Login | Public/auth | No session |
| `/membership` | `src/app/membership/page.tsx` | Partial | Plan comparison | Public/renewal | Static config |
| `/mini-checkpoint` | `src/app/mini-checkpoint/page.tsx` | Partial | Mini Checkpoint | Student nav | Local Sensei flow |
| `/notifications` | `src/app/notifications/page.tsx` | Partial | Notifications | Student nav | Fixture |
| `/placement` | `src/app/placement/page.tsx` | Partial | Placement intro/form | Landing | Client form |
| `/placement/question` | `src/app/placement/question/page.tsx` | Partial | Placement questions | Placement | `sessionStorage` |
| `/placement/result` | `src/app/placement/result/page.tsx` | Partial | Placement result | Questions | Reads `sessionStorage`/query |
| `/practice` | `src/app/practice/page.tsx` | Partial | Daily practice | Student nav | Fixture |
| `/profile` | `src/app/profile/page.tsx` | Partial | Profile | Student nav | Fixture identity |
| `/program` | `src/app/program/page.tsx` | Implemented/mock | Program catalog | Landing/public nav | Fixture |
| `/program/[level]` | `src/app/program/[level]/page.tsx` | Implemented/mock | Program detail | Program list | Fixture |
| `/progress` | `src/app/progress/page.tsx` | Partial | Progress/achievement | Student nav | Mock values |
| `/register` | `src/app/register/page.tsx` | Partial | Registration | Landing/program | UI-only |
| `/renewal` | `src/app/renewal/page.tsx` | Partial | Renewal | Student nav/locks | Fixture |
| `/renewal/membership` | `src/app/renewal/membership/page.tsx` | Partial | Renewal detail | Renewal | Fixture |
| `/replay` | `src/app/replay/page.tsx` | Partial | Replay list | Student nav | Sensei client gate |
| `/replay/chapter-4` | `src/app/replay/chapter-4/page.tsx` | Partial | Replay player | Replay | Hardcoded sample |
| `/reset-password` | `src/app/reset-password/page.tsx` | Partial | Password reset | Recovery | UI-only |
| `/schedule` | `src/app/schedule/page.tsx` | Partial | Class schedule | Student nav | Sensei client gate |
| `/schedule/chapter-4` | `src/app/schedule/chapter-4/page.tsx` | Partial | Class detail | Schedule | Hardcoded sample |
| `/sensei` | `src/app/sensei/page.tsx` | Implemented/mock | Public Sensei list | Public/landing | Fixture |
| `/testimoni` | `src/app/testimoni/page.tsx` | Implemented/mock | Testimonials | Public/landing | Fixture/assets |
| `/tryout` | `src/app/tryout/page.tsx` | Partial | Try Out | Student nav | Local assessment |
| `/admin` | `src/app/admin/page.tsx` | Partial | Admin dashboard | Admin nav/direct | Unguarded/fixture |
| `/admin/access-settings` | `src/app/admin/access-settings/page.tsx` | Partial | Access settings | Admin nav | Visual policy only |
| `/admin/analytics` | `src/app/admin/analytics/page.tsx` | Partial | Analytics | Admin nav | Static charts |
| `/admin/announcements` | `src/app/admin/announcements/page.tsx` | Partial | Announcements | Admin nav | Local state |
| `/admin/assessment-results` | `src/app/admin/assessment-results/page.tsx` | Partial | Result review | Admin nav | Fixture |
| `/admin/audit-logs` | `src/app/admin/audit-logs/page.tsx` | Partial | Audit logs | Admin nav/settings | No persisted audit/export |
| `/admin/blog` | `src/app/admin/blog/page.tsx` | Partial | Blog editor | Admin nav | Local state |
| `/admin/certificates` | `src/app/admin/certificates/page.tsx` | Partial | Certificate management | Admin nav | No authority |
| `/admin/cohorts` | `src/app/admin/cohorts/page.tsx` | Partial | Cohort/class | Admin nav | Local state |
| `/admin/community` | `src/app/admin/community/page.tsx` | Partial | Moderation | Admin nav | Local action |
| `/admin/content-library` | `src/app/admin/content-library/page.tsx` | Partial | Media/content library | Admin nav | No storage upload |
| `/admin/content-studio` | `src/app/admin/content-studio/page.tsx` | Partial | Studio overview | Admin nav | Empty fixture repo |
| `/admin/content-studio/dashboards` | `src/app/admin/content-studio/dashboards/page.tsx` | Partial | Dashboard builder | Studio/admin nav | Local state |
| `/admin/content-studio/flashcards` | `src/app/admin/content-studio/flashcards/page.tsx` | Partial | Flashcard builder | Admin nav | Local state |
| `/admin/content-studio/lessons` | `src/app/admin/content-studio/lessons/page.tsx` | Partial | Lesson builder | Studio/admin nav | Local state |
| `/admin/content-studio/levels` | `src/app/admin/content-studio/levels/page.tsx` | Partial | Level builder | Studio/admin nav | Local state |
| `/admin/feedback` | `src/app/admin/feedback/page.tsx` | Partial | Feedback moderation | Admin nav | Local state |
| `/admin/invoices` | `src/app/admin/invoices/page.tsx` | Partial | Invoice management | Admin nav | No verification authority |
| `/admin/landing-page` | `src/app/admin/landing-page/page.tsx` | Partial | Landing CMS | Admin nav | Does not update public page |
| `/admin/mini-checkpoint` | `src/app/admin/mini-checkpoint/page.tsx` | Partial | Mini builder | Admin nav | Local state |
| `/admin/notification-templates` | `src/app/admin/notification-templates/page.tsx` | Partial | Templates | Admin nav | No delivery system |
| `/admin/placement` | `src/app/admin/placement/page.tsx` | Partial | Placement config | Admin nav | No scoring authority |
| `/admin/program` | `src/app/admin/program/page.tsx` | Partial | Program management | Admin nav | Fixture |
| `/admin/program/[level]/chapters` | `src/app/admin/program/[level]/chapters/page.tsx` | Partial | Chapter Builder | Admin nav/program | Local state |
| `/admin/program/[level]/chapters/[chapter]/quiz` | `src/app/admin/program/[level]/chapters/[chapter]/quiz/page.tsx` | Partial | Quiz Builder | Admin nav/chapter | Local state |
| `/admin/program/[level]/tryout` | `src/app/admin/program/[level]/tryout/page.tsx` | Partial | Try Out Builder | Admin nav/program | Local state |
| `/admin/referrals` | `src/app/admin/referrals/page.tsx` | Partial | Referral management | Admin nav | Local state |
| `/admin/sensei` | `src/app/admin/sensei/page.tsx` | Partial | Sensei management | Admin nav | Local state |
| `/admin/settings` | `src/app/admin/settings/page.tsx` | Partial | General/security settings | Admin nav | Visual/local only |
| `/admin/testimonials` | `src/app/admin/testimonials/page.tsx` | Partial | Testimonial moderation | Admin nav | Local state |
| `/admin/users` | `src/app/admin/users/page.tsx` | Partial | User management | Admin nav | No permission/DB |

## 6. Application Navigation Flow

- Acquisition: `/` → `/program` → `/program/[level]` → `/register` atau `/checkout` → `/invoice`.
- Placement: `/` → `/placement` → `/placement/question` → `/placement/result` → program recommendation.
- Recovery: `/login` → `/forgot-password` → `/reset-password`; no email/token backend.
- Student: `/dashboard` → `/journey` → `/journey/[level]` → `/learn/[level]/[chapter]` → video → grammar → kanji → flashcards → audio → reading → checkpoint (`Frontend/src/lib/learning-mock.ts:24-33`).
- Supporting: sidebar routes defined centrally (`Frontend/src/components/student-navigation.tsx:18-49`).
- Sensei: dashboard/nav → schedule/detail, replay/player, Ask Sensei, Mini Checkpoint; gates are client render (`Frontend/src/components/static-student-route.tsx:45-68`).
- Admin: direct `/admin` then sidebar domains (`Frontend/src/components/admin-navigation.tsx:11-59`); “Keluar Admin” only links `/` (`:113`).

## 7. Page Inventory

Template diterapkan per main page/route family.

| Main page/route family | Entry routes | Primary component/shell | Data source | State/interaction | Access | Completeness/gap |
|---|---|---|---|---|---|---|
| Landing/Public | `/`, `/sensei`, `/testimoni` | `PublicPage`, `SenseiGrid` | `public-mock`, `public-sensei` | Landing motion/menu | Public | Visual implemented; CMS absent |
| Programs | `/program`, `/program/[level]`, `/membership` | Public pages | Public fixtures | Level/plan links | Public | Pricing authority OPEN |
| Blog/Privacy | `/blog*`, `/kebijakan-privasi` | Public shell/pages | Fixtures/static | Slug navigation | Public | No CMS publication/SEO backend |
| Auth | `/login`, `/register`, recovery/reset | `AuthShell`, `AuthStatus` | Form constants | Local form/success | Public | No auth/session/API |
| Checkout/Invoice | `/checkout`, `/invoice` | Page-local | Query/constants | Referral local state | Public | No order persistence/status authority |
| Placement | `/placement*` | Page-local flow | Form/constants | React + `sessionStorage` | Public | No server score/lead persistence |
| Dashboard | `/dashboard` | `StaticStudentRoute`, `StudentDashboard` | `dashboard-mock` | Query membership | Student-like | Shared visual; spoofable |
| Journey | `/journey*` | `JourneyShell`, level/chapter components | `journey-mock` | Feedback local state | Client entitlement | No persisted progress |
| Learning | `/learn/**` | `LearningShell`, 6 activity components | `learning-mock` | Local completion/answers | Client access | Full visual sequence only |
| Flashcard collection | `/flashcards` | `FlashcardCollection` | Learning fixture | Filters/session local | Student | No spaced repetition persistence |
| Assessments | checkpoint, `/tryout`, `/mini-checkpoint` | Four runner implementations | Assessment/learning fixtures | Local answers/result | Client gate | No server authority |
| Supporting | library/practice/progress/leaderboard/notifications/profile/renewal/affiliate | `SupportingRoute`, `SupportingScreen` | `supporting-mock` | Mostly display/local links | Membership presentation | Broad but fixture-only |
| Community | `/community*` | Supporting + specialized post | Supporting fixture | Like/save/report/reply local | Free read-only visual | No identity/moderation persistence |
| Certificates | `/certificate*` | Supporting/specialized screens | Fixtures | Display/download-like UI | Client gate | No issuance authority/file |
| Sensei operations | schedule/replay/ask routes | `SenseiShell`, Sensei screens | `sensei-mock` | Local interactions | Sensei client gate | No cohort/session/replay data |
| Admin shell | `/admin/**` | `AdminShell`, `AdminNavigation` | Page fixtures | Navigation/drawers | Unguarded | Visual console only |
| Admin Content Studio | Studio + four builders | Page-local editors, typed content model | Empty repo + local arrays | `useState` editors | Unguarded | No persistence/publication |
| Admin program/assessment | program/chapter/quiz/tryout/mini/placement/results | Page-local | Fixtures | Local editor/review | Unguarded | No validation/score authority |
| Admin operations | users/access/invoices/referrals/cohorts/Sensei | Page-local | Fixtures | Fake management actions | Unguarded | Highest authority illusion risk |
| Admin communication/governance | announcement/blog/testimonial/feedback/community/templates/analytics/audit/settings | Page-local | Fixtures | Local dialogs/filters | Unguarded | No publish/delivery/audit/export |

## 8. Component Architecture

- Route wrappers delegate to orchestrators; most student pages are thin `Suspense` wrappers.
- `StaticStudentRoute({ kind, level?, chapter? })` is central dispatcher for 19 student route kinds (`Frontend/src/components/static-student-route.tsx:29-83`).
- Shells: `PublicPage`, `AuthShell`, `AdminShell`, `JourneyShell`, `LearningShell`, `SenseiShell`.
- Navigation: `StudentNavigation({ membership, current })` owns responsive nav, entitlement states, modals, focus traps (`student-navigation.tsx:52-140`); `AdminNavigation({ current })` owns Admin grouping/focus trap (`admin-navigation.tsx:65-115`).
- Learning props are typed: `ChapterJourney({ membership, level, chapters })`, `FlashcardSession({ cards, membership, level, chapter })`, activity components consume `LearningData`.
- Assessment duplication: generic `AssessmentRunner` is unused; active specialized runners are `SenseiTryoutScreen`, `MiniCheckpointScreen`, `ChapterCheckpoint`.
- Admin architecture is shell-shared but domain logic/fixtures remain embedded per page.

## 9. Active File Dependency Map

| Source | Direct active dependency/use | Confidence |
|---|---|---|
| `src/app/**/page.tsx` | Shells/orchestrators/components | High |
| `static-student-route.tsx` | Dashboard, journey, learning, Sensei screens; dashboard/journey/learning/assessment/sensei mocks | High; imports `:4-27` |
| `student-navigation.tsx` | `dashboard-mock.Membership`, Next navigation, react-icons | High |
| `student-dashboard.tsx` | `DashboardData`, navigation links | High |
| `JourneyShell` | `StudentNavigation` + children | High |
| `LearningShell` | `StudentNavigation` + `LearningData` route context | High |
| `SenseiShell` | `StudentNavigation` + Sensei topbar | High |
| `SupportingRoute` | `supporting-mock` + `SupportingScreen` | High |
| Admin pages | `AdminShell` → `AdminNavigation` | High |
| Content Studio pages | `content-studio.ts` types/repository | High |
| `assessment-runner.tsx` | No imports found from active source | High-confidence inactive |
| `assessment-mock.getTryoutConfig/questions` | Only supports unused runner; active gate function remains used | High-confidence partially dead |
| `supporting-mock.getSupportingData` | No active import found | High-confidence inactive function |

No edge exists from Admin editor state to public/student data, API, DB, or storage.

## 10. Data & Mock Architecture

| File | Data/domain | Aktual consumer | Risiko/gap |
|---|---|---|---|
| `dashboard-mock.ts` | Membership, user, dashboard, leaderboard | Dashboard/nav | Query-controlled identity/access |
| `journey-mock.ts` | Levels, ownership, cohorts, chapters | Journey | Rules hardcoded |
| `learning-mock.ts` | Activities, cards, questions, documents | Learning | Progress hardcoded/local |
| `assessment-mock.ts` | Config, options, keys, explanations | Access gate; legacy runner data | Answer key browser-side |
| `sensei-mock.ts` | Sensei entitlement/data | Sensei routes | Fixture |
| `supporting-mock.ts` | 11 supporting page datasets | Supporting screens | Generic cards flatten domains |
| `public-mock.ts` | Public/catalog/blog/testimonials | Public pages | No publication source |
| `public-sensei.ts` | Sensei cards | Public list | Fixture |
| `content-studio.ts` | CMS types/repository | Admin Studio | Empty/read-only |

### Progress weights audit

- Requirement candidates **25/25/25/25** dan **20/5/20/20/20/15** belum ditemukan sebagai calculation atau source of truth aktif.
- Mock menampilkan progress berbeda: Free 56%, LMS/Sensei 65% (`Frontend/src/lib/dashboard-mock.ts:100-110,125-135,150-160`).
- Learning activity state dibentuk hardcoded, bukan weighted aggregation (`Frontend/src/lib/learning-mock.ts:26-34`).
- **CANNOT VERIFY:** formula final. Jangan implement salah satu angka sebelum keputusan client/server contract.

### Purchase/invoice status audit

| Status/concept yang terlihat | Aktual | Gap target |
|---|---|---|
| Invoice dibuat | UI menampilkan “berhasil dibuat” | Tidak ada persisted invoice/ID |
| Menunggu verifikasi | Ditampilkan di `/invoice` | Tidak ada authoritative status |
| Referral applied/none | Query dari checkout | Tidak ada validation/redemption |
| Verified/failed/refund/cancelled/expired | Muncul sebagai konsep di Admin/requirement, bukan state machine terverifikasi | Enum/transitions/idempotency/audit diperlukan |
| Membership active | UI menyatakan aktif setelah verifikasi | Tidak ada activation transaction |
| WhatsApp handoff | CTA disabled | Contact/config OPEN; click tidak boleh mengaktifkan membership |

## 11. State Management

| State | Lokasi/contoh | Lifetime | Refresh behavior | Local/global | Persistence |
|---|---|---|---|---|---|
| Component React state | forms, modals, assessment, flashcard, Admin editors | Mount | Hilang | Local | None |
| URL search params | membership, plan, level, referral | URL/tab/history | Bertahan di URL | Route-global | Browser history |
| Dynamic params | level/chapter/slug | URL | Bertahan | Route-global | Browser history |
| `sessionStorage` | placement question/result | Browser tab session | Bertahan saat refresh; hilang saat tab/session berakhir | Tab-global | Client-only |
| Static module fixtures | `src/lib/*-mock.ts` | Build/runtime module | Reset ke source | App-global read | Source code |
| Server state | Tidak ada | — | — | — | None |
| DB/object storage | Tidak ada | — | — | — | None |

Koreksi penting: browser persistence bukan “none”; placement memakai `sessionStorage`. Tidak ditemukan `localStorage` sebagai persistence aktif.

## 12. Membership & Access Logic

### Target versus aktual

| Capability | Target | Aktual |
|---|---|---|
| Identity | Sanctum-authenticated account | Tidak ada session |
| Membership source | Server entitlement | `?membership=free|lms|sensei` |
| Student authorization | Backend policy/ownership | Client conditional render |
| Admin authorization | Authenticated role/permission | Direct URL terbuka |
| Expiry/revocation | Server timestamps/status | Tidak ada |
| Invoice activation | Verified idempotent backend transition | Tidak ada |

### Feature matrix aktual

| Feature | Free | LMS | Sensei |
|---|---|---|---|
| Dashboard | Available | Available | Available |
| Journey | Preview/limited | Available owned levels | Available owned/cohort fixture |
| Flashcards/Practice/Library | Limited | Available | Available |
| Try Out | Locked | Available local | Available local |
| Schedule/Replay/Mini/Tanya Sensei | Locked | Locked | Available local |
| Community | Read-only visual | Available visual | Available visual |
| Progress/Leaderboard | Available mock | Available mock | Available mock |
| Certificate | Locked | Available visual | Available visual |
| Admin | Direct URL accessible | Direct URL accessible | Direct URL accessible |

Evidence: `Frontend/src/components/student-navigation.tsx:18-49`, parser `Frontend/src/lib/dashboard-mock.ts:193-195`.

## 13. Requirement Coverage Matrix

| Requirement | Coverage aktual | Status | Evidence/gap |
|---|---|---|---|
| Shared student family | Dashboard/nav shared | Partial | Shell divergence remains |
| Public acquisition | Landing/program/placement routes | Partial | Backend/CMS absent |
| Auth/account | UI routes | Missing integration | No session/API |
| Manual enrollment/invoice | Clickable UI | Partial | No status machine/verification |
| Free learning | Journey + chapter activities | Partial | No persistence |
| LMS learning/Try Out | Visual flow | Partial | No authority |
| Sensei schedule/replay/ask/mini | Visual flow | Partial | No cohort data/persistence |
| Configurable assessment family | Generic type exists | Partial/duplicated | Active runners specialized |
| Admin Console | 31 routes | Partial visual | No auth/API/persistence |
| Published sanitized CMS | Builder UI/model | Missing integration | No publish/sanitize |
| S3-compatible media | Library/replay UI | Missing | No upload/signed URL |
| WCAG 2.2 AA | Semantic/focus work visible | CANNOT VERIFY | Full audit pending |
| Exact Figma copy | Contracts/docs available | CANNOT VERIFY | Visual source parity pending |
| Race/idempotency tests | Blueprint only | Missing | Required before assessment/invoice release |
| SEO/production ops | Partial metadata | Missing/OPEN | Domain, sitemap, CI, monitoring |

## 14. UX / UI Consistency Findings

- Shared dashboard/navigation successfully model three memberships through data and access states.
- Student shells remain multiple: supporting, journey, learning, Sensei; same product family can receive different topbar/content geometry.
- Locked controls generally remain keyboard buttons and open modal; focus trap/Escape handling exists (`student-navigation.tsx:79-114`).
- Admin uses consistent sidebar/grouping (`admin-navigation.tsx:11-59`).
- Dense page-local JSX and mixed Indonesian/English statuses reduce copy/style consistency.
- Exact responsive, contrast, 44×44 target, reduced-motion, and Figma parity: **CANNOT VERIFY** pending browser QA.
- Tidak ada klaim mojibake: output grep dapat merupakan decoding tool; source encoding belum dibuktikan rusak.

## 15. Functional Inconsistencies

1. UI assessment menyatakan “Tersimpan”/“tersimpan resmi” walau state lokal (`Frontend/src/components/assessment-runner.tsx:40`); component tersebut kini tidak aktif, tetapi copy risk tetap jika digunakan kembali.
2. Invalid level pada journey dapat return `null`; invalid learning route kembali ke level selection, bukan explicit 404 (`static-student-route.tsx:70-74`).
3. Checkpoint memasang `LearningShell current="reading"` (`static-student-route.tsx:79-81`), berpotensi menandai rail salah.
4. Progress display 56%/65% tidak berasal dari formula requirement 25/25/25/25 atau 20/5/20/20/20/15.
5. Checkout menganggap referral valid setelah klik lokal; invoice menerima status lewat query.
6. Invoice CTA WhatsApp disabled meski copy mengarahkan pengguna ke WhatsApp; aman sementara, flow belum selesai.
7. Admin success/dialog actions tidak mengubah public/student data.
8. Sample-specific routes (`post-1`, `chapter-4`, N3/N4/N5 certificate) tidak scalable.
9. `LevelCode` CMS hanya N5–N1 (`content-studio.ts:35`), journey juga memuat DASAR/SSW/INTERVIEW (`journey-mock.ts:40-48`).

## 16. Dead Code Candidates

### High confidence — verified

| Candidate | Bukti | Safe remove |
|---|---|---|
| `AssessmentRunner` component | Tidak diimport source aktif | Ya, bersama legacy config bila tidak segera dipakai |
| `getTryoutConfig` + private `questions` lama | Mendukung runner tidak terimport; active code hanya memakai `hasTryoutAccess` | Ya setelah typecheck/build |
| `getSupportingData` | Tidak diimport; consumers memakai data lain/direct | Ya setelah search ulang |
| `LuBookOpen`, `LuCheck` | ESLint unused di `chapter-journey.tsx` | Ya |
| `LuKey` | ESLint unused di `level-selection.tsx` | Ya |
| `hiru-atas.png` | Verified runtime-unused | Ya setelah visual owner confirmation |

### Medium/low confidence

| Candidate | Confidence | Catatan |
|---|---:|---|
| `LuArrowRight`, `query` in `lesson-overview.tsx` | High as unused symbol | Lint-confirmed; behavior check trivial |
| `current` in `journey-shell.tsx` | High as unused prop internally | API callers may rely semantically; remove/update callers together |
| Reference JPGs | Runtime-unused high; deletion safety low | **Safe Remove: REVIEW MANUALLY**; retain as visual evidence |
| Generated `.next`, `test-results`, `tsconfig.tsbuildinfo` | High as generated | Hygiene batch only; verify ignore/tracking |

## 17. Duplication Candidates

| Area | Duplication | Action timing |
|---|---|---|
| Assessment | Generic runner + Try Out + Mini + Checkpoint concepts | Consolidate after server rules freeze |
| Student shells | Repeated `StudentNavigation` with differing wrapper/topbar | Unify before deeper feature expansion |
| Admin pages | Repeated fixture tables, details, dialogs, fake saves | Extract only after first API pattern exists |
| Membership query propagation | Repeated URL interpolation | Replace through auth/entitlement boundary |
| Mock identity/progress | Hilmi/N4/status repeated | Normalize when API DTO exists |
| Route wrappers | Metadata/Suspense/delegate repetition | Leave; explicit App Router structure |

## 18. Technical Debt dengan Critical/Important/Cleanup/Cosmetic

### Critical

- Backend/API/DB/auth/authorization absent.
- Query-controlled entitlement; Admin unguarded.
- Assessment keys/scoring/timer/submission not server-authoritative.
- Invoice verification/activation lacks idempotent state machine.
- CMS publication/sanitization/media ownership absent.

### Important

- `sessionStorage` placement data is client-tamperable and tab-scoped.
- Student shell/layout inconsistency.
- No API loading/error/conflict/retry states.
- Progress formula unresolved and mocks conflict with candidate weights.
- Functional/accessibility/race tests absent.
- Typecheck currently fails due stale/incomplete `.next` generated type artifact.

### Cleanup

- Six lint warnings.
- Verified unused runner/functions/imports/assets.
- Hardcoded sample route IDs.
- Admin fixtures embedded in pages.
- Generated artifact hygiene.

### Cosmetic

- Mixed Indonesian/English status vocabulary.
- Dense one-line JSX reduces reviewability.
- Minor wrapper repetition.

## 19. Backend Readiness

Current: **not started**. Frontend domain discovery is useful, but no executable contract.

| Frontend domain/page | Recommended backend module | Minimum endpoints/operations | Authority/security |
|---|---|---|---|
| Auth/profile | Identity/Auth | register, login, logout, me, recovery/reset | Sanctum, rate limit, CSRF |
| Membership/access | Entitlements | list active entitlements, access decision | Server policy; expiry/revoke |
| Program/checkout | Catalog/Enrollment | published plans, create enrollment | Price/version server-owned |
| Invoice/Admin invoice | Billing | create, view, verify/reject/expire/refund | Idempotency + audit |
| Placement | Placement Assessment | start, answer, submit, result | Server score; consent |
| Journey/learning | Learning Content/Progress | published hierarchy, complete activity, progress | Ownership + concurrency |
| Flashcards | Review | deck/session/confidence | Persisted user state |
| Try Out/Mini/Checkpoint | Assessment | definition delivery, attempt, autosave, submit, review | Key secrecy, absolute timer, race-safe |
| Content Studio | CMS | draft CRUD, validate, publish/schedule/archive | Sanitization + permissions |
| Content library/replay | Media | upload intent, metadata, signed read | Private S3, MIME/size checks |
| Sensei/cohort/schedule | Cohort Operations | assignment, sessions, attendance, replay | Entitlement/ownership |
| Community | Community/Moderation | posts, replies, reports, moderation | Identity, abuse controls, audit |
| Notifications | Notification | template, event, recipient, delivery | Secrets/server triggers |
| Certificates | Certification | eligibility, issue, verify, download | Server authority |
| Analytics/audit | Reporting/Audit | aggregates, immutable events, export | Permission/masking/integrity |

## 20. Implementation Maturity Map

| Area | Status | Bukti |
|---|---|---|
| Landing | 🟢 Functional frontend | Landing memiliki navigasi, CTA program/placement, Sensei, dan testimoni aktif pada `Frontend/src/app/page.tsx:135-200`. |
| Auth | 🟡 Partial | Login, lupa kata sandi, dan reset memiliki form/state frontend, tetapi belum memiliki session atau API (`Frontend/src/app/forgot-password/page.tsx:8-16`). |
| Registration | 🟡 Partial | Registrasi menyediakan alur UI menuju Free atau checkout berbayar, tetapi submit dan validasi server belum tersedia (`Frontend/src/app/register/page.tsx`). |
| Placement Test | 🟡 Partial | Alur intro–question–result memiliki interaksi dan `sessionStorage`, tetapi scoring dan persistence belum server-authoritative (`Frontend/src/app/placement/question/page.tsx`). |
| Dashboard | 🟠 Mostly mock | Dashboard tiga membership berfungsi secara visual tetapi user, progress, dan akses berasal dari fixture/query (`Frontend/src/lib/dashboard-mock.ts:94-195`). |
| Journey | 🟠 Mostly mock | Pemilihan level dan chapter dapat dinavigasi, tetapi ownership serta progression dibentuk mock (`Frontend/src/lib/journey-mock.ts:50-141`). |
| Chapter/Lesson | 🟡 Partial | Overview dan tujuh aktivitas dapat digunakan secara lokal, tetapi completion hilang saat refresh dan konten berasal dari fixture (`Frontend/src/lib/learning-mock.ts:19-49`). |
| Library | 🟠 Mostly mock | Library merender kartu materi dan entitlement presentation dari data statis (`Frontend/src/lib/supporting-mock.ts:43-58`). |
| Exercise | 🟠 Mostly mock | Latihan Harian menampilkan rekomendasi dan jenis drill, tetapi belum memiliki engine soal atau persistence (`Frontend/src/lib/supporting-mock.ts:59-70`). |
| Try Out | 🟡 Partial | Runner mendukung jawaban, navigasi, hasil, dan review lokal, tetapi timer, score, attempt, dan submit belum server-authoritative (`Frontend/src/components/sensei-tryout-screen.tsx`). |
| Mini Checkpoint | 🟡 Partial | Flow level/session/part memiliki interaksi frontend, tetapi attempt, timer, autosave, dan kelulusan belum persisted (`Frontend/src/components/mini-checkpoint-screen.tsx`). |
| Recordings | 🟠 Mostly mock | Daftar replay dan player tersedia untuk visual Sensei, tetapi tidak ada media/storage atau data sesi nyata (`Frontend/src/components/sensei-screens.tsx`). |
| Community | 🟡 Partial | Listing, detail, like/save/report/reply memiliki state lokal, tetapi identity, write API, dan moderation persistence tidak ada (`Frontend/src/components/community-post-screen.tsx:10-17`). |
| Affiliate | 🟠 Mostly mock | Halaman affiliate menampilkan referral/reward presentation tanpa validasi, ledger, atau persistence (`Frontend/src/app/affiliate/page.tsx`). |
| Announcements | 🟡 Partial | Admin dapat mengubah state announcement secara lokal, tetapi tidak ada publish/delivery ke student atau public (`Frontend/src/app/admin/announcements/page.tsx:7`). |
| Profile | 🟠 Mostly mock | Profil, membership, sertifikat, dan notifikasi memakai identitas serta kartu fixture (`Frontend/src/lib/supporting-mock.ts:135-145`). |
| Invoice | 🟡 Partial | Checkout membuat tampilan invoice pending dan referral lokal, tetapi invoice ID, status, verifikasi, dan aktivasi belum persisted (`Frontend/src/app/invoice/page.tsx:8-15`). |
| Admin | 🟠 Mostly mock | Sebanyak 31 route Admin menyediakan console/editor visual luas, tetapi tanpa guard, API, persistence, atau permission enforcement (`Frontend/src/components/admin-navigation.tsx:11-59`). |

## 21. Current Working Area

| Confidence | Current work inference | Evidence |
|---|---|---|
| **CONFIRMED** | Student journey UI cleanup/refinement | HEAD commit removes progress rings from journey pages |
| **CONFIRMED** | Current report audit is only authorized edit | User instruction + Git status target |
| **LIKELY** | Team stabilizing visual frontend before backend handoff | 85 routes/31 Admin pages, backend empty |
| **LIKELY** | Dead imports resulted from recent journey visual cleanup | Lint warnings in journey files |
| **POSSIBLE** | `.next` generated types are stale after route/build changes | Typecheck missing `./routes.js`; build succeeds |
| **POSSIBLE** | Parent validation ran against transient generated state | Exact environment sequence not fully available |

## 22. Recommended Development Order

1. Resolve exact Figma copy/state plus OPEN prices/catalog/progress/assessment/permissions.
2. Cleanup six warnings and verified dead code in one no-behavior batch.
3. Fix typecheck reproducibility by regenerating/cleaning supported Next artifacts; do not hand-edit `.next`.
4. Define auth/entitlement/account API contract.
5. Build Laravel/PostgreSQL/Sanctum/policy foundation.
6. Integrate auth + entitlement and remove query as authority.
7. Build invoice state machine and idempotent verification.
8. Integrate published content + journey/progress.
9. Build server-authoritative assessment family; Placement remains separate.
10. Protect/connect Admin CMS and operations.
11. Add media storage, Sensei/cohort, community, notification, certificate.
12. Add critical E2E, race, accessibility, CI, staging, observability.

## 23. DO NOT TOUCH YET

- Jangan split dashboard Free/LMS/Sensei.
- Jangan refactor assessment besar sebelum rules/server contract final.
- Jangan menjadikan UI authority untuk entitlement, invoice, score, timer, publication, audit, atau media.
- Jangan memilih formula 25/25/25/25 atau 20/5/20/20/20/15 tanpa keputusan source of truth.
- Jangan isi harga, promotion, WhatsApp, domain, upload limit, atau permission granularity dengan tebakan.
- Jangan buat Sensei portal.
- Jangan hapus reference JPG sebelum review manual/visual approval.
- Jangan refactor Content Studio repository sebelum persistence contract disetujui.
- Jangan hand-edit `.next/types` untuk memperbaiki typecheck.
- Jangan implement seluruh Playwright blueprint sebelum functional MVP disetujui.

## 24. Suggested Cleanup Batch

Satu batch kecil, no behavior change:

1. Hapus unused `LuBookOpen`, `LuCheck`, `LuKey`, `LuArrowRight`, dan `query`.
2. Hapus/rapikan prop `JourneyShell.current` beserta callers bila terbukti tidak diperlukan.
3. Hapus unused `AssessmentRunner`, legacy `getTryoutConfig/questions`, dan `getSupportingData` setelah final import search.
4. Jangan hapus `hiru-atas.png` atau reference JPG dalam batch code; buat asset review terpisah.
5. Regenerate supported Next build artifacts, lalu jalankan lint/typecheck/build.

Acceptance: lint 0 warning, typecheck lulus, build lulus, route count tetap 85, screenshot smoke journey/tryout tidak berubah.

## 25. Suggested Next Feature

**Server-backed authentication + entitlement read slice.** Scope minimum: Laravel/Sanctum login/session, `/me`, canonical membership entitlement, Admin policy denial, frontend adapter. Pertahankan query membership hanya dalam explicit development preview, bukan access authority. Jangan gabungkan invoice, CMS, atau assessment dalam batch ini.

# HANDOFF FOR CHATGPT

## PROJECT

HIRU Academy: platform belajar bahasa Jepang dengan public acquisition, Free/LMS/LMS+Sensei student family, learning/assessment, dan Admin Console.

## STACK

Next.js 16.3.0 App Router, React 19.2.8, TypeScript 5, Tailwind 3.4.17, react-icons, ESLint 9, Playwright 1.63. Backend target Laravel/Sanctum/PostgreSQL/S3-compatible; belum dibuat.

## ROUTER

Next App Router. 85 route pages total: 19 public/auth/commerce, 35 student, 31 Admin. Generated evidence `Frontend/.next/types/routes.d.ts:4`.

## CURRENT PHASE

Clickable frontend prototype and handoff/domain audit. Backend integration not started.

## CURRENT ACTIVE WORK

- **CONFIRMED:** recent student journey visual cleanup; HEAD `85cfe2d`.
- **LIKELY:** frontend stabilization before backend foundation.
- **POSSIBLE:** generated Next type artifacts stale, causing standalone typecheck failure.

## IMPLEMENTED ROUTES

Semua 85 route files exist. Visual paling matang: landing/public, dashboard, journey, lesson sequence, program, Sensei/testimonial, shared navigation. “Implemented” tidak berarti production data.

## PARTIAL ROUTES

Auth, placement, checkout/invoice, supporting student pages, assessment, Sensei operations, community, certificate, dan seluruh 31 Admin routes: UI exists tetapi local/query/fixture/sessionStorage tanpa backend authority.

## MISSING ROUTES

Tidak ada missing route dari union 85 aktual. Missing capability bukan route: API/auth guard, persisted publishing, storage, operational workflows. Route baru tidak boleh diinfer dari blueprint tanpa requirement.

## CORE COMPONENTS

`StaticStudentRoute`, `StudentNavigation`, `StudentDashboard`, `JourneyShell`, `LearningShell`, `SenseiShell`, `LevelSelection`, `ChapterJourney`, `LessonOverview`, `FlashcardSession`, `SenseiTryoutScreen`, `MiniCheckpointScreen`, `SupportingRoute`, `SupportingScreen`, `AdminShell`, `AdminNavigation`.

## DATA SOURCES

Static module fixtures, URL params/search params, React local state, dan placement `sessionStorage`. Tidak ada API/DB/server state.

## MOCK DATA LOCATIONS

`Frontend/src/lib/dashboard-mock.ts`, `journey-mock.ts`, `learning-mock.ts`, `assessment-mock.ts`, `sensei-mock.ts`, `supporting-mock.ts`, `public-mock.ts`, `public-sensei.ts`, `content-studio.ts`; banyak Admin fixtures juga embedded di `src/app/admin/**/page.tsx`.

## MEMBERSHIP IMPLEMENTATION

`Membership = free | lms | sensei`; `parseMembership()` membaca query dan fallback Free (`dashboard-mock.ts:193-195`). UI access matrix ada di `student-navigation.tsx:18-49`. Ini bukan authorization.

## JOURNEY IMPLEMENTATION

`journey-mock.ts` membentuk level/access/chapter/progression. `StaticStudentRoute` memilih level/chapter dan learning screen. Progress/completion tidak persisted. CMS `LevelCode` tidak mencakup DASAR/SSW/INTERVIEW.

## CURRENT USER FLOW

Landing → program atau placement → register/checkout → invoice; login → dashboard → journey → level → chapter → seven learning activities. Sensei adds schedule/replay/ask/mini. Admin accessed directly and navigates by domain sidebar.

## IMPORTANT INCONSISTENCIES

- Query controls membership.
- Admin unguarded.
- Progress 56/65% tidak memakai candidate weights 25/25/25/25 atau 20/5/20/20/20/15.
- Checkpoint shell uses `current="reading"`.
- Invalid journey params lack explicit 404.
- Checkout referral/invoice statuses are local/query claims.
- Admin edits do not update public/student.
- Placement persistence is `sessionStorage`, not server.

## HIGH CONFIDENCE DEAD CODE

Unused `AssessmentRunner`; legacy `getTryoutConfig` and private questions supporting it; `getSupportingData`; unused `LuBookOpen`, `LuCheck`, `LuKey`; runtime-unused `hiru-atas.png` (asset deletion still confirm owner).

## MEDIUM/LOW CONFIDENCE DEAD CODE

`LuArrowRight`, `query`, and `JourneyShell.current` are lint-confirmed unused but require coordinated API cleanup. Reference JPGs runtime-unused; **Safe Remove: REVIEW MANUALLY**. Generated outputs removable only through hygiene policy.

## CURRENT ERRORS

- Lint first run timeout 120s; rerun 300s completed and failed on 6 warnings: `LuBookOpen`, `LuCheck`, `current`, `LuArrowRight`, `query`, `LuKey`.
- Typecheck failed: `.next/types/validator.ts(5,56): TS2307 Cannot find module './routes.js'`.
- Build succeeded; last output `Finished TypeScript in 11.9s`.

## TOP TECHNICAL DEBT

No backend/auth/authz; query entitlements; local assessments/answer keys; no invoice state machine; no CMS publication/storage; embedded Admin fixtures; duplicated assessment/shell patterns; weak tests; lint/typecheck not clean.

## CLIENT REQUIREMENT GAPS

Exact Figma parity CANNOT VERIFY. OPEN: prices/promotions/catalog, progress formula, assessment limits/timers/scores, WhatsApp production details, blog editor format, SEO domain, media limits, responsive acceptance, Admin permissions. Do not guess.

## FILES I SHOULD READ FIRST

1. `AGENTS.md` — authority, architecture, workflow.
2. `Frontend/AGENTS.md` — Next/version and copy rules.
3. `Frontend/package.json` — scripts/dependencies.
4. `Frontend/src/components/static-student-route.tsx` — student orchestration/access.
5. `Frontend/src/components/student-navigation.tsx` — navigation/access matrix.
6. `Frontend/src/lib/dashboard-mock.ts` — membership/dashboard source.
7. `Frontend/src/lib/journey-mock.ts` — journey rules.
8. `Frontend/src/lib/learning-mock.ts` — activity/content flow.
9. `Frontend/src/lib/assessment-mock.ts` — legacy assessment/key exposure.
10. `Frontend/src/components/sensei-tryout-screen.tsx` — active Try Out.
11. `Frontend/src/components/mini-checkpoint-screen.tsx` — active Mini Checkpoint.
12. `Frontend/src/lib/content-studio.ts` — CMS vocabulary/boundary.
13. `Frontend/src/components/admin-navigation.tsx` — Admin domain map.
14. `Docs/ai/01-PRD-HIRU-ACADEMY.md` — product requirements/OPEN items.
15. `Docs/ai/03-SECURITY-AUDIT.md` — security baseline.

## RECOMMENDED NEXT ACTION

Approve and execute Suggested Cleanup Batch first; then design authentication + entitlement vertical slice. Keep each as separate reviewed batch.

## IMPORTANT WARNINGS

Do not treat visual success as persistence. Do not trust browser membership, score, invoice, or Admin controls. Do not expose DB/storage secrets. Do not delete visual references without manual review. Do not hand-edit generated `.next` types. Do not commit unless explicitly requested.
