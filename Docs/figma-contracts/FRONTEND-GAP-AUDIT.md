# FRONTEND-GAP-AUDIT — HIRU ACADEMY

> Audit date: **2026-08-15**  
> Scope: current `Frontend/` implementation compared against frozen `Docs/figma-contracts/**`  
> Change policy: **AUDIT ONLY — no frontend code changed**  
> Primary evidence: current repo implementation-status snapshot + frozen Contract Audit + role execution rules.

---

# 1. Audit verdict

## Overall

**FRONTEND STATUS: PARTIAL / NOT CONTRACT-COMPLETE**

The existing frontend is a useful clickable MVP, but it is still far from full Page 08–11 parity.

Current strongest areas:

- shared student shell/navigation;
- student dashboard variants;
- N1–N5 Journey basics;
- Chapter/Learning basics;
- Flashcard interaction;
- Try Out runner primitive;
- Sensei Schedule / Replay / Tanya Sensei prototypes;
- Mini Checkpoint prototype.

Current largest gaps:

- public acquisition flow after Landing;
- Placement Test;
- commercial/invoice/referral flow;
- almost all supporting student screens;
- many Figma system states;
- exact copy/Figma parity;
- Admin Console entirely missing;
- production auth/entitlement/assessment authority deferred to backend.

## Audit result by role

```text
Shared/Public/Auth   MAJOR GAP
Free                 PARTIAL
LMS                  PARTIAL
Sensei               PARTIAL
Admin                MISSING
```

## Recommendation

**PASS TO IMPLEMENTATION BACKLOG**

Do not redesign or refactor globally first.

Close gaps role-by-role using the frozen contract.

---

# 2. Status vocabulary

This audit uses:

- `MATCH` — implementation is materially aligned with frozen contract.
- `PARTIAL` — core exists, but screens/copy/state/flow are incomplete.
- `MISSING` — no implementation corresponding to the contract screen/flow.
- `WRONG COPY` — visible copy is known not to match current contract or uses preview/mock wording.
- `WRONG FLOW` — navigation or state transition conflicts with contract.
- `WRONG ENTITLEMENT` — access behavior conflicts with frozen entitlement.
- `DEAD LINK` — target is `#`, dead-end, or no route.
- `MOCK OK` — deterministic frontend mock is acceptable in frontend-first phase.
- `BACKEND-DEFERRED` — real production authority intentionally waits for Laravel/backend.
- `FIDELITY UNVERIFIED` — current source exists, but exact Figma visual parity has not yet been revalidated after contract freeze.

---

# 3. Evidence baseline

Current active routes:

```text
/
 /login
 /register
 /dashboard
 /journey
 /journey/[level]
 /learn/[level]/[chapter]
 /learn/[level]/[chapter]/flashcards
 /tryout
 /schedule
 /replay
 /ask-sensei
 /mini-checkpoint
```

Current important shared components:

```text
student-dashboard.tsx
student-navigation.tsx
static-student-route.tsx
journey-shell.tsx
learning-shell.tsx
sensei-shell.tsx
level-selection.tsx
chapter-journey.tsx
assessment-runner.tsx
flashcard-session.tsx
auth-form.tsx
mini-checkpoint-screen.tsx
sensei-screens.tsx
ask-sensei-screen.tsx
```

Current mock/config boundary:

```text
dashboard-mock.ts
journey-mock.ts
learning-mock.ts
assessment-mock.ts
sensei-mock.ts
```

Current student membership is frontend/query controlled:

```text
free | lms | sensei
```

No Admin runtime branch exists.

---

# 4. SHARED / PUBLIC / AUTH GAP AUDIT

Authority:

```text
shared/A-SHARED.md
shared/B-SHARED.md
```

## Layer A — Public acquisition

| Contract screen | Current implementation | Status | Gap |
|---|---|---|---|
| Landing Page | `/` exists | `PARTIAL` | Core hero/program/learning flow exists, but exact frozen copy/Figma parity still needs re-audit. Placement CTA currently goes to Register instead of Placement. Some links are dead-end. |
| Program & Level | no dedicated public flow | `MISSING` | No complete plan + N1–N5 public selection contract. |
| Program Detail | no route/screen | `MISSING` | Commercial program detail not implemented. |
| Testimoni | no public Testimoni route | `MISSING` | Public Testimoni contract missing. |
| Blog List | no Blog route | `MISSING` | Landing links may use `#` / dead-end. |
| Blog Detail | no Blog detail route | `MISSING` | No article detail screen. |
| Placement Start | no Placement route | `MISSING` + `WRONG FLOW` | Landing Placement CTA currently routes to `/register`. |
| Placement Question | no runner | `MISSING` | 20-question Placement flow not implemented. |
| Placement Result | no result/recommendation screen | `MISSING` | No Bunpou/Moji Goi/Dokkai/Choukai result + recommendation flow. |

### Shared A verdict

**MAJOR GAP**

Landing is only the beginning of the public Figma flow.

Do not treat `/` as “public flow complete.”

---

## Layer B — Account / commercial

| Contract screen/state | Current implementation | Status | Gap |
|---|---|---|---|
| Register + Referral | `/register` UI exists | `PARTIAL` | No real referral handling, submission API, verification state, or exact full contract parity. |
| Account Verification | none | `MISSING` |
| Shared Login | `/login` exists | `PARTIAL` | UI only; no Admin branch, session, entitlement authority, error/status family. |
| Forgot Password | none | `MISSING` |
| Reset Password | none | `MISSING` |
| Checkout & Order Summary | none | `MISSING` |
| Referral Applied state | none | `MISSING` |
| Invoice + WhatsApp | none | `MISSING` |

### Shared auth/commercial verdict

**MAJOR GAP**

Frozen product decision requires shared Login for:

```text
Free
LMS
Sensei
Admin
```

Current frontend membership parser supports only:

```text
free
lms
sensei
```

Therefore Admin shared-auth behavior is currently absent.

### Backend-deferred items

The following remain intentionally `BACKEND-DEFERRED`:

- real auth/session;
- Laravel Sanctum;
- CSRF/session handling;
- real account verification;
- password reset token authority;
- payment verification;
- membership activation;
- referral accounting.

However, their **frontend screens/states are still required** for contract parity.

---

# 5. FREE MEMBER — PAGE 08 GAP AUDIT

Authority:

```text
08-free/C-DASHBOARD.md
08-free/D-LEARNING.md
08-free/E-SUPPORTING.md
08-free/F-STATES.md
```

## Layer C — Dashboard

Current:

- shared `student-dashboard.tsx`;
- Free variant exists;
- locked preview exists;
- navigation has unavailable/locked modal behavior.

Status:

**PARTIAL**

What is already useful:

- Free dashboard concept;
- shared architecture;
- entitlement cards;
- premium visibility/lock pattern.

Gaps:

- exact Page 08 hierarchy/copy needs re-alignment;
- all Layer C destinations are not implemented;
- backend data remains mock;
- exact Free entitlement labels/states need contract-by-contract QA.

### Entitlement check

Known current Free fixture:

- Latihan limited;
- Try Out locked;
- Achievement locked;
- Certificate locked;
- Replay locked;
- Tanya Sensei locked;
- Mini Checkpoint locked.

This is broadly aligned with frozen Free entitlement.

Status: **MOCK OK / PARTIAL**

---

## Layer D — Learning

### Level selection

Current:

- `/journey`
- `level-selection.tsx`

Status:

**PARTIAL**

Positive:

- N1–N5 Journey exists;
- no separate `dasar` level should be introduced.

Need verification/fix:

- exact public/student copy;
- all N1–N5 Chapter 1 access;
- no sequential level purchase prerequisite;
- selected state/labels against contract.

### Chapter Journey

Current:

- `/journey/[level]`
- `chapter-journey.tsx`

Status:

**PARTIAL**

Positive:

- completed/current/available/locked states exist.

Gap:

- exact Chapter hierarchy and contract copy;
- Free Chapter 2+ must clearly use the correct locked/access state;
- progression vs entitlement must not be conflated.

### Chapter Overview / Video / Grammar / Kanji

Current:

- `/learn/[level]/[chapter]`
- `lesson-overview.tsx`
- `learning-shell.tsx`

Status:

**PARTIAL**

Gap:

- contract contains distinct Video, Grammar Module, Japanese Characters/Kanji Module experiences;
- current implementation does not expose the full set as contract-complete separate states/screens.

### Flashcard collection / session / completed

Current:

- flashcard route/session exists;
- 3D `rotateY` interaction exists;
- `<ruby><rt>` used.

Status:

**PARTIAL → strongest Layer D area**

Need:

- exact collection screen;
- completion state;
- exact copy;
- two Japanese modes semantics;
- full Figma responsive comparison.

### Audio Question

Status: **MISSING as contract-complete screen**

### Reading Question

Status: **MISSING as contract-complete screen**

### Chapter Checkpoint

Status: **MISSING / PARTIAL primitive only**

The generic assessment primitive can be reused later.

Do not make a new assessment engine unless required.

---

## Layer E — Supporting features

| Feature | Current status |
|---|---|
| Perpustakaan limited | `MISSING` |
| Latihan limited | entitlement shown, dedicated screen `MISSING` |
| Progress | `MISSING` |
| Leaderboard | `MISSING` |
| Community read-only | `MISSING` |
| Community detail | `MISSING` |
| Notifications | `MISSING` |
| Profile & Membership | `MISSING` |
| Renewal / Upgrade | generic upgrade pattern only → `PARTIAL` |

### Free Layer E verdict

**MAJOR GAP**

Current Free implementation is primarily:

```text
Dashboard
→ Journey
→ Chapter/Learning
→ Flashcard
→ locked previews
```

It does not yet represent the complete Page 08 student product.

---

## Layer F — Free states

Current navigation includes:

- generic locked modal;
- generic `Fitur Belum Tersedia`.

Status:

**PARTIAL**

Most specific Page 08 states remain:

**MISSING**

Examples include:

- auth success/error states;
- Placement processing/error;
- invoice/payment states;
- Checkpoint result;
- Library empty;
- content locked;
- membership expired;
- certificate unavailable;
- attachment/reply/certificate/referral states.

### Free verdict

```text
Core student skeleton     PARTIAL
Supporting features       MAJOR GAP
Specific system states    MAJOR GAP
Public entry/commercial   MAJOR GAP
```

---

# 6. LMS / BELAJAR MANDIRI — PAGE 09 GAP AUDIT

Authority:

```text
09-lms/C-DASHBOARD-LMS.md
09-lms/D-LEARNING-LMS.md
09-lms/E-SUPPORTING-LMS.md
09-lms/F-STATUS-SYSTEM-LMS.md
```

## Layer C — Dashboard

Current:

- LMS variant of shared dashboard exists;
- membership selected through query/mock.

Status:

**PARTIAL**

Positive:

- shared architecture is the correct direction;
- LMS premium learning entitlement exists in mock;
- Sensei features can remain locked.

Gaps:

- exact dashboard copy/hierarchy;
- active purchased-level presentation;
- all feature card destinations;
- exact Sensei-lock state;
- progress/activity contract details.

---

## Layer D — Learning

Current shared Journey/Learning/Flashcard applies to LMS.

Status:

**PARTIAL**

Positive:

- shared reuse matches architecture contract;
- full level journey can be represented;
- Flashcard primitive exists.

Gaps:

- purchased level state not fully represented against Page 09 contract;
- exact N4/N3 active-level examples should remain fixtures, not hardcoded business rules;
- Video/Grammar/Kanji/Audio/Reading/Checkpoint screen family incomplete;
- level-not-purchased state needs exact contract behavior;
- final level-completion state is missing.

---

## Layer E — Supporting features

### Latihan Harian

Current:

- entitlement active in mock;
- no dedicated screen.

Status: **MISSING**

### Try Out

Current:

- `/tryout`;
- question navigator;
- answer selection;
- local submit confirmation;
- local result/review.

Status: **PARTIAL**

This is one of the strongest LMS supporting primitives, but the full contract requires:

```text
List
→ Info
→ Runner
→ Result
→ Review
```

Current implementation is a preview runner, not confirmed complete list/info/result/review parity.

Known implementation gaps:

- hard-coded visual timer `25:00`;
- answer key in browser;
- score local;
- no real countdown authority;
- no persistence;
- no idempotent submit;
- no attempt authority.

For frontend-first:

- UI mock is `MOCK OK`;
- production behavior is `BACKEND-DEFERRED`;
- exact Figma screen/copy parity remains `PARTIAL`.

### Perpustakaan

`MISSING`

### Progress / Achievement

`MISSING`

### Leaderboard

`MISSING`

### Community write

`MISSING`

### Certificate Center / Detail

`MISSING`

### Notifications

`MISSING`

### Profile / Membership

`MISSING`

### Renewal

`MISSING`

---

## Layer F — LMS states

Most specific contract states are **MISSING**.

Important missing families:

- level not purchased;
- Try Out not started;
- attempts exhausted;
- timeout auto-submit;
- review unavailable;
- level complete;
- certificate state;
- community attachment/reply/image;
- certificate download/share/verification;
- referral states.

Generic locked/assessment states can be reused, but exact contract states do not yet exist.

### LMS verdict

```text
Dashboard                PARTIAL
Core Journey             PARTIAL
Flashcard                PARTIAL / strong primitive
Try Out                  PARTIAL / strong primitive
Supporting product       MAJOR GAP
System states            MAJOR GAP
```

---

# 7. SENSEI — PAGE 10 GAP AUDIT

Authority:

```text
10-sensei/C-DASHBOARD-SENSEI.md
10-sensei/D-LEARNING-SENSEI.md
10-sensei/E-SUPPORTING-SENSEI.md
10-sensei/F-STATUS-SYSTEM-SENSEI.md
10-sensei/J-MINI-CHECKPOINT-SENSEI.md
```

## Layer C — Dashboard

Current:

- Sensei variant exists;
- Sensei feature catalog marked available in fixture.

Status:

**PARTIAL**

Positive:

- concept of top student tier exists;
- shared student shell retained.

Critical QA requirement:

**Sensei-owned features must never show Upgrade.**

This must be explicitly tested in implementation batches.

---

## Layer D — Shared LMS learning

Current:

- inherited Journey/Learning/Flashcard implementation.

Status:

**PARTIAL**

Same missing content family remains:

- Video fidelity;
- Grammar module;
- Kanji module;
- Audio;
- Reading;
- Chapter Checkpoint;
- level-specific/cohort copy.

---

## Layer E — Sensei supporting

### Schedule

Current:

- `/schedule`;
- visual prototype in `sensei-screens.tsx`.

Status: **PARTIAL**

Need contract parity for:

- Schedule calendar/list;
- empty period;
- Detail Class;
- Zoom/link unavailable;
- reminder saved.

### Replay

Current:

- `/replay`;
- visual prototype.

Status: **PARTIAL**

Need:

- Replay list;
- processing state;
- player;
- error;
- save;
- class-detail relation;
- publication semantics.

### Tanya Sensei

Current:

- `/ask-sensei`;
- `ask-sensei-screen.tsx`.

Status: **PARTIAL**

Need:

- exact context selector;
- draft;
- attachment;
- submit;
- history;
- submitted state.

### Latihan / Try Out / Library / Progress / Community / Certificate / Notifications / Profile / Renewal

Most are inherited gaps from LMS.

Status: **MISSING / PARTIAL depending on shared primitive**

---

## Layer F — Sensei system states

Most specific states are **MISSING**.

Important Sensei-specific missing states:

- Zoom empty;
- Zoom link unavailable;
- Replay processing;
- Replay error;
- class reminder saved;
- Sensei-specific level not purchased;
- Tanya Sensei submitted;
- draft question;
- attachment added;
- replay saved.

---

## Layer J — Mini Checkpoint

Current:

- `/mini-checkpoint`;
- `mini-checkpoint-screen.tsx`;
- level N5–N2 and level/session/part structure exists.

Status:

**PARTIAL**

Positive:

- correct product family already exists;
- correct N5–N2 scope exists;
- correct level/session/part concept exists.

Gap against frozen Layer J:

```text
53 List
→ 54 Info
→ 55 Runner
→ 56 Result
→ 57 Review
```

must be verified/completed exactly.

Current implementation remains frontend-local:

- timer not server-authoritative;
- attempt not server-authoritative;
- autosave not persistent;
- submit not persistent/idempotent;
- score/pass not backend-controlled.

Those are `BACKEND-DEFERRED`, not a reason to redesign the frontend.

### Mini Checkpoint flow rule

Do **not** reproduce the erroneous Figma prototype cross-link into regular Try Out.

Frozen implementation intent keeps Mini Checkpoint in its own flow.

---

## Sensei verdict

```text
Dashboard             PARTIAL
Shared LMS learning   PARTIAL
Schedule              PARTIAL
Replay                PARTIAL
Tanya Sensei          PARTIAL
Mini Checkpoint       PARTIAL / strong primitive
Supporting screens    MAJOR GAP
Specific states       MAJOR GAP
```

---

# 8. ADMIN — PAGE 11 GAP AUDIT

Authority:

```text
11-admin/B-MAIN-MANAGEMENT-ADMIN.md
11-admin/C-USERS-TRANSACTIONS-ADMIN.md
11-admin/D-CONTENT-COMMUNICATION-ADMIN.md
11-admin/E-SENSEI-GOVERNANCE-ADMIN.md
11-admin/F-STATUS-SYSTEM-ADMIN.md
11-admin/G-OPERATIONAL-FLOWS-ADMIN.md
```

Current repo snapshot:

**No Admin Console implementation exists.**

No Admin route appears in the active route inventory.

## Layer B — Main Management

All are `MISSING`:

- Admin Dashboard;
- Program Management;
- Chapter Builder;
- Quiz Builder;
- Try Out Builder;
- Content Library;
- Placement Test & Leads;
- Assessment Results;
- Mini Checkpoint Builder.

## Layer C — Users & Transactions

All are `MISSING`:

- User Management;
- Access Settings;
- Invoice Management;
- Referral & Discount;
- Certificate Management;
- R6 operational states.

## Layer D — Content & Communication

All are `MISSING`:

- Announcement Management;
- Blog Management;
- Testimonial Moderation;
- Final-Level Feedback Moderation;
- Community Moderation;
- Notification Templates;
- Landing Page Management.

## Layer E — Sensei & Governance

All are `MISSING`:

- Sensei Management;
- Cohort & Class Management;
- Analytics & GA;
- Audit Logs;
- General Settings.

## Layer F — Admin system states

All 8 states are `MISSING`.

## Layer G — Operational flows

All 62 operational flows are `MISSING`.

### Admin implementation guidance

Do not interpret this as needing:

```text
62 new routes
```

Recommended architecture remains:

```text
Admin Console shell
+ module pages
+ shared tables/forms/builders
+ reusable StatusDialog
+ reusable ConfirmationDialog
+ reusable OperationResult
+ context-aware editor overlay
```

### Admin auth

Do **not** add `/admin/login`.

Shared Login must later branch to Admin Console by server-authorized role.

### Admin verdict

**MISSING — largest single frontend gap**

---

# 9. CROSS-ROLE ARCHITECTURE AUDIT

## Strengths to preserve

### Shared student architecture

Current components already support the correct direction:

- shared Dashboard;
- shared Navigation;
- shared Journey;
- shared Learning;
- shared Flashcard;
- shared Assessment primitive.

Status: **MATCH architectural intent**

Do not replace them with Free/LMS/Sensei duplicate applications.

### Flashcard interaction

Current CSS/source evidence includes:

- `rotateY(180deg)`;
- `600ms` transition;
- ruby/furigana styling.

Status: **MATCH important interaction intent / fidelity still needs screenshot QA**

### Entitlement configuration

Free/LMS/Sensei are config/mock driven rather than three completely separate apps.

Status: **MATCH frontend-first architecture**

---

## Risks / gaps

### Query-controlled entitlement

Current membership is read from query.

Status:

`MOCK OK` for demo  
`BACKEND-DEFERRED` for production  
`SECURITY RISK IF PROMOTED TO PRODUCTION`

### No Admin role in current membership parser

Status: **MISSING SHARED AUTH BRANCH**

### Implementation vs entitlement

Navigation already has `Fitur Belum Tersedia` semantics.

This is a good primitive.

Need audit during gap closure to ensure:

```text
locked entitlement
≠
available but not implemented
```

### Dead links

Known:

- Blog;
- Privacy;
- some Landing CTA.

Status: **DEAD LINK**

### Exact copy

Current visible copy still contains preview/mock/data-example wording in some flows.

Status: **WRONG COPY / FIDELITY UNVERIFIED**

### Visual parity

Contract extraction happened after the current implementation snapshot.

No full 390px/1440px screenshot comparison against all frozen contract screens has been performed yet.

Status: **FIDELITY UNVERIFIED**

Do not label existing screens `MATCH` visually until that QA is done.

---

# 10. ASSESSMENT SECURITY / BACKEND DEFERRAL

Current Try Out:

- answer key in browser;
- score calculated locally;
- hard-coded `25:00`;
- no authoritative countdown;
- no persistence;
- no idempotent submit.

Current Mini Checkpoint:

- correct broad frontend concept;
- not server-controlled.

These are acceptable only as frontend prototype behavior.

Classify:

```text
Frontend composition       PARTIAL / MOCK OK
Production assessment      BACKEND-DEFERRED
Security readiness         NOT READY
```

Future backend must ensure:

- server timer;
- no answer key before permitted review;
- attempt ownership;
- idempotent submit;
- review permission;
- entitlement;
- autosave;
- race handling.

---

# 11. ROUTE GAP SUMMARY

## Existing

```text
/
 /login
 /register
 /dashboard
 /journey
 /journey/[level]
 /learn/[level]/[chapter]
 /learn/[level]/[chapter]/flashcards
 /tryout
 /schedule
 /replay
 /ask-sensei
 /mini-checkpoint
```

## Major route/screen families missing

Public:

```text
Program & Level
Program Detail
Testimonial
Blog List
Blog Detail
Placement Start
Placement Runner
Placement Result
```

Account/commercial:

```text
Verification
Forgot Password
Reset Password
Checkout
Invoice
Referral states
```

Student supporting:

```text
Latihan
Library
Progress
Leaderboard
Community
Community Detail
Notifications
Profile
Membership/Renewal
Certificate
Certificate Detail
Class Detail
Replay Player
```

Admin:

```text
entire Admin Console family
```

Not every Figma frame requires a unique URL.

Many system/status frames should be:

- modal;
- overlay;
- inline state;
- configured shared component.

---

# 12. GAP PRIORITY

## P0 — client-visible broken/missing flow

These should be fixed before expanding low-priority UI:

1. Landing Placement CTA currently goes to Register instead of Placement.
2. Placement Start / Questions / Result are entirely missing.
3. Shared auth family is incomplete: Forgot/Reset/Verification absent.
4. Program selection/detail and Checkout/Invoice path are missing.
5. Public Blog/Testimonial flows are missing.
6. Admin Console is entirely missing.
7. Many student navigation destinations are visible but have no real screen.

## P1 — wrong/incomplete role product

1. Free supporting features are missing.
2. LMS supporting features are missing.
3. Sensei Detail Class / Replay Player / states are incomplete.
4. Mini Checkpoint must be aligned to frozen 53→57 flow.
5. Specific Layer F system states need shared state implementation.
6. Exact copy from contracts must replace preview/mock copy.

## P2 — Figma fidelity / responsive / UX

1. Re-run exact visual QA at 390px.
2. Re-run exact visual QA at 1440px.
3. Sidebar hierarchy/state fidelity.
4. assessment timer prominence.
5. table/long content strategy.
6. mobile modal viewport safety.
7. Japanese ruby overflow.
8. reduced-motion behavior.
9. focus/keyboard treatment.

## P3 — Backend-deferred

Do not block frontend contract completion on:

- real Sanctum auth;
- real database;
- real payment;
- actual Zoom;
- replay hosting;
- server assessment;
- real notification delivery.

But maintain safe interfaces so these can replace mocks later.

---

# 13. RECOMMENDED IMPLEMENTATION BACKLOG

Follow role-by-role workflow.

## Batch 0 — Shared Contract Alignment

Scope:

- create/update a contract-driven route/screen registry;
- align exact shared copy;
- remove obvious preview/mock wording from client-visible Figma screens;
- fix dead Landing CTA behavior;
- preserve existing shared components;
- do not build Admin yet.

Deliverables:

- shared Public/Auth route map;
- no dead required CTA;
- exact Landing header/CTA hierarchy;
- shared auth shell ready for Free/LMS/Sensei/Admin intent.

---

## Batch 1 — FREE-A / FREE-B

Close Free core:

- Dashboard exact contract;
- Level Selection N1–N5;
- Chapter 1 each level;
- Journey;
- Chapter Overview;
- Video/Grammar/Kanji states;
- Flashcard collection/session/completion;
- Audio;
- Reading;
- Chapter Checkpoint.

Do not build backend.

---

## Batch 2 — FREE-C / FREE-D

Close Free supporting + locked:

- Library limited;
- Latihan limited;
- Community read-only;
- Progress;
- Notifications;
- Profile;
- premium access states;
- Try Out locked;
- Certificate locked;
- Sensei features locked.

---

## Batch 3 — FREE-E / Shared Acquisition

Close:

- Program & Level;
- Program Detail;
- Testimonial;
- Blog List/Detail;
- Placement Start/Question/Result;
- Register + referral;
- verification;
- Forgot/Reset;
- Checkout/Invoice/WhatsApp frontend states.

After QA:

**FREE = FROZEN**

---

## Batch 4 — LMS gap closure

Reuse Free/shared implementation.

Add/complete:

- purchased-level dashboard/journey;
- LMS Try Out 31–35;
- Latihan;
- Library;
- Community write;
- Achievement;
- Certificate;
- Notification;
- Profile;
- Renewal;
- LMS Layer F states.

After QA:

**LMS = FROZEN**

---

## Batch 5 — Sensei gap closure

Add/complete:

- Sensei dashboard exact;
- Schedule;
- Detail Class;
- Zoom unavailable/empty states;
- Replay list/player/processing/error/save;
- Tanya Sensei draft/submitted/attachments;
- Mini Checkpoint 53–57;
- Sensei-specific states.

After QA:

**SENSEI = FROZEN**

---

## Batch 6 — Admin foundation

Create:

- Admin shared shell;
- Dashboard;
- navigation;
- route/module grouping;
- shared table/editor/status primitives.

No separate Admin login.

---

## Batch 7 — Admin core management

Implement Page 11 Layers B/C:

- Program;
- Chapter;
- Quiz;
- Try Out;
- Content;
- Placement leads;
- Assessment results;
- Mini Checkpoint Builder;
- User;
- Access;
- Invoice;
- Referral;
- Certificate.

---

## Batch 8 — Admin content/governance

Implement Layers D/E:

- Announcements;
- Blog;
- Testimonial;
- Feedback;
- Community moderation;
- Notification templates;
- Landing management;
- Sensei;
- Cohort;
- Analytics;
- Audit;
- Settings.

---

## Batch 9 — Admin states/operations

Implement Layer F/G using reusable primitives.

Do not create 62 routes.

---

## Batch 10 — Figma fidelity freeze

For all roles:

- 390px;
- 1440px;
- navigation;
- modal states;
- exact copy;
- entitlement;
- no dead links;
- no obvious overflow;
- keyboard/focus;
- reduced motion;
- lint;
- typecheck;
- build.

Then mark frontend role contracts frozen.

---

# 14. DO NOT DO YET

Do not begin with:

- global refactor;
- Redux/global state framework;
- API repository layer with speculative endpoints;
- Laravel code;
- PostgreSQL schema;
- real payment;
- real Zoom integration;
- 62 Admin routes;
- redesign of existing shared components.

The current shared primitives are valuable and should be extended, not discarded.

---

# 15. Recommended first coding target

The first coding batch after this audit should be:

# **Shared/Public + Free Entry Flow Correction**

Reason:

- it contains the most visible broken path;
- Landing currently sends Placement intent to Register;
- Placement is completely absent;
- Free is the first role in the agreed freeze order;
- later LMS/Sensei can reuse all shared public/auth/student primitives.

Suggested first implementation scope:

```text
Landing CTA correction
Program & Level shell
Placement Start
Placement Question
Placement Result
Register referral handoff
Shared auth missing states
```

Keep Invoice/payment as frontend state only.

Stop after the batch and run:

```bash
npm run lint
npm run typecheck
npm run build
```

plus 390px and 1440px QA.

---

# 16. Final audit statement

The current HIRU Academy frontend should be preserved as a **student MVP foundation**, not considered contract-complete.

The safest strategy is:

```text
preserve shared primitives
→ close Shared/Free gaps
→ freeze Free
→ close LMS
→ freeze LMS
→ close Sensei
→ freeze Sensei
→ build Admin
→ Figma QA freeze
→ backend integration later
```

The largest implementation error to avoid now is building new architecture before closing the documented screen/flow gaps.
