# CONTRACT-AUDIT — HIRU ACADEMY

> Audit date: **2026-08-15**  
> Scope: `Docs/figma-contracts/**`  
> Purpose: freeze the Figma-derived frontend contract before Frontend Gap Audit and implementation batches.

---

# 1. Freeze decision

## Overall result

**CONTRACT SET: COMPLETE**

**FRONTEND CONTRACT FREEZE: CONDITIONAL PASS**

**PRODUCTION BUSINESS-RULE FREEZE: NOT YET**

Meaning:

- all primary Shared, Free, LMS, Sensei, and Admin contract groups are now represented;
- the contracts are complete enough to become the source for Frontend Gap Audit;
- implementation may proceed against the frozen structural/entitlement rules below;
- a small set of copy/context/prototype conflicts remains explicitly `OPEN`;
- production values such as price, timer, attempts, contacts, media limits, and retention are still dynamic/open and must not be invented.

Do **not** reopen the entire contract extraction phase for ordinary implementation questions. Reopen only the exact contract item when:

1. a newer client revision appears;
2. an `OPEN` item is resolved;
3. active Figma itself changes materially.

---

# 2. Audited contract inventory

Total primary contract files expected after this freeze: **21**

```text
Docs/figma-contracts/
├── shared/
│   ├── A-SHARED.md
│   └── B-SHARED.md
│
├── 08-free/
│   ├── C-DASHBOARD.md
│   ├── D-LEARNING.md
│   ├── E-SUPPORTING.md
│   └── F-STATES.md
│
├── 09-lms/
│   ├── C-DASHBOARD-LMS.md
│   ├── D-LEARNING-LMS.md
│   ├── E-SUPPORTING-LMS.md
│   └── F-STATUS-SYSTEM-LMS.md
│
├── 10-sensei/
│   ├── C-DASHBOARD-SENSEI.md
│   ├── D-LEARNING-SENSEI.md
│   ├── E-SUPPORTING-SENSEI.md
│   ├── F-STATUS-SYSTEM-SENSEI.md
│   └── J-MINI-CHECKPOINT-SENSEI.md
│
└── 11-admin/
    ├── B-MAIN-MANAGEMENT-ADMIN.md
    ├── C-USERS-TRANSACTIONS-ADMIN.md
    ├── D-CONTENT-COMMUNICATION-ADMIN.md
    ├── E-SENSEI-GOVERNANCE-ADMIN.md
    ├── F-STATUS-SYSTEM-ADMIN.md
    └── G-OPERATIONAL-FLOWS-ADMIN.md
```

## Missing layers that are intentional

### Page 11 Layer A

Not an implementation contract.

Reason:

- latest product decision uses one shared Login / Forgot / Reset family;
- Admin does not receive a separate `/admin/login`;
- old Admin auth frames remain historical/reference material only.

### Page 10 Layer J

Now included and required.

It closes the previously missing Sensei Mini Checkpoint flow.

---

# 3. Requirement authority — FROZEN

Use this order whenever sources disagree:

1. **latest explicit client/user revision**
2. **active Figma Page 08–11 contract**
3. `Docs/ai/01-PRD-HIRU-ACADEMY.md`
4. `Docs/ai/02-UI-UX-DESIGN-BRIEF.md`
5. security/debug/testing documentation
6. `Docs/RefrensiHTML/DESIGN.md` and Page 1/reference HTML for visual treatment only

## Functional rule

Figma contracts determine:

- what appears;
- flow;
- feature availability;
- state hierarchy;
- exact visible copy where VERIFIED.

## Visual rule

`DESIGN.md` determines the visual polish/tokens where it does not conflict with the active Figma hierarchy.

## Copy rule

VERIFIED Figma copy is verbatim.

Do not:

- paraphrase;
- rewrite;
- shorten;
- expand;
- “improve” wording.

If newer client authority contradicts Figma, mark only that item `OPEN` and resolve it.

### Latest client Landing override — Batch 0.3

Latest client revision overrides Landing quick-info, N5–N1 presentation order, plan-card `CHAPTER 01` labels, and the learning-flow title, subtitle, four steps, CTA labels, and destinations. Other contract behavior remains unchanged.

---

# 4. Role model — FROZEN

## Technical role

```text
Student
Admin
```

## Student plan / entitlement tier

```text
Free Member
Belajar Mandiri
Belajar dengan Sensei
```

Free/LMS/Sensei are **not** three separate technical security roles.

Production authorization belongs to Backend later.

---

# 5. Shared authentication — FROZEN

## Latest frozen enrollment decision

`ACCOUNT ≠ PAID ENTITLEMENT`.

- Every Student account has baseline Free entitlement.
- Free registration makes the Student account and Free entitlement active immediately, then continues to the Free dashboard.
- Belajar Mandiri and Belajar dengan Sensei registration makes the Student account active and keeps baseline Free active while paid entitlement remains pending.
- Paid flow is Register → Checkout → Invoice → WhatsApp Admin → Admin verifies transaction.
- Frontend cannot activate paid entitlement; activation belongs to Backend/Admin after transaction verification.
- Verification Email is historical/deferred and is not a mandatory active customer registration route.

Use one authentication family:

```text
Shared Login
    ↓
backend role / entitlement later
├── Free      → Free Dashboard
├── LMS       → Belajar Mandiri Dashboard
├── Sensei    → Belajar dengan Sensei Dashboard
└── Admin     → Admin Console
```

Rules:

- no `/admin/login`;
- public registration is for eligible student/customer accounts;
- no public `Register as Admin`;
- Admin accounts are provisioned internally later;
- Forgot/Reset is shared;
- frontend fixtures may simulate role during development;
- query parameters/local state are not production authorization.

---

# 6. Student product entitlement — FROZEN

## Free Member

Core contract:

- N1–N5 visible;
- Chapter 1 available independently on every N1–N5;
- no purchase prerequisite between levels;
- full premium features remain visible when Figma requires them;
- locked item opens access/upgrade state instead of entering protected content;
- Community is read-only;
- Latihan is limited;
- Try Out / review is locked;
- Certificate is globally treated as locked for Free unless the exact conflicting Profile fixture is being reproduced for Figma review;
- Sensei features are locked.

## Belajar Mandiri

Core contract:

- purchased levels can be independent;
- full Journey for entitled/purchased level;
- progress stored separately per level;
- Latihan active;
- Try Out family active subject to item/date/attempt/review configuration;
- Community write active;
- Progress/Achievement active;
- Certificate Center active subject to eligibility;
- Sensei features remain visible but locked;
- Mini Checkpoint is not a Mandiri entitlement.

## Belajar dengan Sensei

Core contract:

- includes LMS capabilities;
- Schedule/Jadwal active;
- Replay active after publication;
- Tanya Sensei active;
- cohort/class context active;
- Mini Checkpoint active;
- Sensei-owned features must never show an Upgrade prompt to a Sensei user;
- item-specific locks may still exist due to level, schedule, publication, attempts, review, certificate eligibility, or cohort state.

---

# 7. Japanese content modes — FROZEN

Exactly two content states:

1. `Jepang Profesional`
2. `Jepang Pemula`

Rules:

- Jepang Pemula is an editor/content state;
- it is not a separate screen family;
- do not invent a third mode;
- use ruby/furigana presentation where appropriate in implementation.

---

# 8. Level / catalog behavior — FROZEN FOR FRONTEND

Frontend student contract uses:

```text
N5
N4
N3
N2
N1
```

Rules:

- no sixth Journey level named `dasar`;
- `Dasar Bahasa Jepang` may appear as descriptive/product wording, but is not currently a sixth N-level Journey;
- level purchase is independent;
- purchasing N4 does not require N5;
- one account can hold multiple active levels;
- progress remains separate per active level.

Production catalog seed remains separately OPEN.

---

# 9. Assessment family boundaries — FROZEN

Do not collapse all assessment concepts into one business type.

## Chapter Checkpoint

- part of normal Chapter Journey;
- can gate chapter progression.

## Latihan Harian

- short practice/recommendation;
- not Try Out;
- not Mini Checkpoint.

## Try Out

- simulation assessment family;
- supports timer, attempts, autosave, result, review, access rules;
- access can depend on plan, level, date, prerequisite, attempts, cooldown, review config.

## Mini Checkpoint

- **Belajar dengan Sensei only**;
- N5–N2;
- level → sesi → part;
- cohort/progress driven;
- fewer questions than Try Out;
- timer;
- Admin-configured passing score;
- optional Admin image;
- configurable review;
- results enter assessment history.

Shared frontend primitives may be reused, but product semantics stay distinct.

---

# 10. Mini Checkpoint freeze — PASS WITH ONE OPEN WIRING ISSUE

Layer J is complete:

- SENSEI / 53 — list
- SENSEI / 54 — information
- SENSEI / 55 — runner
- SENSEI / 56 — result
- SENSEI / 57 — review

Frozen intended flow:

```text
53 List
→ 54 Info
→ 55 Runner
→ 56 Result
→ 57 Review
```

## OPEN-MC-01 — prototype wiring conflict

Active Figma Screen 55 currently wires:

- `Akhiri & Kirim` → regular Try Out result;
- `Kembali ke Daftar` → regular Try Out list.

Implementation intent is frozen as:

```text
Akhiri & Kirim → Mini Checkpoint Result
Kembali ke Daftar → Mini Checkpoint List
```

Do not reproduce the erroneous cross-flow Try Out wiring.

---

# 11. Commercial / payment boundary — FROZEN

## Invoice

Creating an invoice does **not** activate membership.

## Payment proof

Uploading/viewing payment proof does **not** activate membership.

## Verification

Activation boundary:

```text
invoice verified by authorized Admin/backend
→ membership activated
→ valid referral reward processed
```

Rules:

- do not hardcode a fake Admin WhatsApp number;
- invoice/payment values come from configuration/backend later;
- no browser-only membership activation;
- duplicate verification must later be idempotent.

---

# 12. Referral boundary — FROZEN

Referral/reward logic:

- referral is optional;
- discount/reward values are dynamic;
- reward activates only after a qualifying invoice is verified;
- self-referral is not allowed;
- failed/cancelled/refunded invalid transactions do not create a valid reward;
- reward cancellation does not automatically revoke the student's membership;
- reward/accounting authority belongs to backend later.

---

# 13. Certificate boundary — FROZEN

Current product scope:

**DIGITAL CERTIFICATE ONLY**

Rules:

- Certificate Center availability is not the same as certificate eligibility;
- eligibility, issue, reissue, revoke, verification, download log are backend/audit controlled;
- do not build physical certificate/shipping workflow;
- Free global entitlement remains locked despite a conflicting Profile fixture documented below.

---

# 14. Admin architecture — FROZEN

## Shared shell

Use one Admin Console shell.

## Major groups

- Dashboard
- Program
- Content Builder
- Placement & Hasil
- Pengguna & Akses
- Transaksi
- Konten & Komunikasi
- Sensei & Cohort
- Analitik
- Pengaturan

## Admin operations

Layer G is a behavior/state contract, **not 62 independent routes**.

Reuse primitives such as:

- AdminStatusDialog
- AdminConfirmationDialog
- AdminOperationResult
- AdminEditorOverlay
- AccessEditor
- InvoiceVerification

## Permission

Admin UI visibility does not equal authorization.

Backend later must enforce:

- role;
- permission;
- sensitive operation;
- audit;
- masking.

---

# 15. Admin content/publishing boundary — FROZEN

Preserve separate states:

```text
draft
preview
validation
publish
published result
archive / restore
```

Do not merge these into a generic `Save`.

Applies especially to:

- Blog;
- Announcement;
- Try Out;
- Replay;
- Landing Page.

## Landing Page Admin

It is **controlled CRUD**, not a free-form page builder.

Admin may manage:

- content;
- order;
- visibility;
- CTA;
- media;
- SEO.

Admin must not freely redefine:

- responsive layout structure;
- grid system;
- breakpoints.

Active contract also states:

`Testimoni` is not used as a Landing Page section.

---

# 16. Sensei/Cohort administration — FROZEN

Rules:

- no separate Zoom Admin module;
- class platform/link/schedule/replay live inside Cohort & Kelas;
- platform may be Zoom / Meet / external platform;
- replay appears only after publication;
- participant placement must respect entitlement + capacity;
- Sensei profile/contact/availability/assignment is permission/audit controlled;
- Mini Checkpoint Builder is N5–N2 and Sensei-only.

---

# 17. Analytics boundary — FROZEN

GA4 is for:

- acquisition;
- source / medium;
- UTM;
- campaign funnel;
- event tracking.

Backend remains authority for:

- verified transaction;
- transaction value;
- membership;
- entitlement;
- referral reward;
- learning state.

GA events must never activate membership or verify payment.

---

# 18. Audit/security boundary — FROZEN

Sensitive Admin operations need later audit semantics containing enough information for:

- actor;
- target;
- action/event;
- timestamp;
- reason where required;
- before/after where relevant;
- permission/result;
- outcome.

Do not expose or store in UI:

- API secrets;
- OAuth tokens;
- webhook secrets;
- recovery secrets;
- session tokens;
- raw credentials.

MFA/password security operations require reauthentication later.

---

# 19. Current OPEN registry

These items stay `OPEN`. They are not permission to invent values.

## RESOLVED-COPY-01 — Testimonial percentage

Latest client revision resolves the public testimonial indicators as:

```text
Alumni: 2.300+
Merasa lebih terarah: 92%
Rating pengalaman: 4,9 / 5
```

This overrides the older Figma value `Kelulusan: 96%`.

**Status:** RESOLVED by latest explicit client revision.

---

## OPEN-COPY-02 — Shared Login sentence omits Admin

Visible Figma copy:

`Akses setelah login mengikuti Free, LMS, atau LMS + Zoom pada akun.`

Product decision includes Admin in shared login.

**Status:** copy conflict only.

**Frozen behavior:** shared Login still includes Admin.

---

## OPEN-FREE-01 — Free certificate fixture conflict

Free Profile visibly shows a previously issued N5 certificate, while global Free entitlement screens lock Certificate.

**Frozen entitlement:** Certificate remains locked for Free.

**Status:** exact Profile content alignment OPEN.

---

## OPEN-FREE-02 — Free Renewal context

Page 08 Free Renewal shows:

`Belajar Mandiri • N4`

as current membership.

**Frozen entitlement:** this does not redefine Free as LMS.

**Status:** screen-context/copy alignment OPEN.

---

## OPEN-SENSEI-01 — Sensei Profile membership mismatch

Page 10 Sensei Profile visibly says:

`Belajar Mandiri`

**Frozen entitlement:** Page 10 remains Belajar dengan Sensei.

**Status:** exact copy/context OPEN.

---

## OPEN-SENSEI-02 — Sensei Renewal membership mismatch

Sensei Renewal shows:

- `Belajar Mandiri • N4`
- `Belajar Mandiri • periode baru`

**Frozen entitlement:** Page 10 remains Belajar dengan Sensei.

**Status:** exact copy/context OPEN.

---

## OPEN-SENSEI-03 — Draft question wording

The `Draft Pertanyaan Tersimpan` state includes copy that implies the question is waiting for a response.

A draft should not automatically be interpreted as submitted.

**Frozen behavior:** draft remains draft.

**Status:** copy consistency OPEN.

---

## OPEN-SENSEI-04 — Generic feedback/level-result labels

Some buttons visibly say `Kembali ke Hasil` / `Kembali ke Daftar` while routing to Progress/Dashboard/Feedback contexts.

**Status:** copy/action naming OPEN.

Do not change navigation intent to match an incorrect generic label.

---

## OPEN-MC-01 — Mini Checkpoint wrong Try Out wiring

Defined above.

**Frozen implementation intent:** keep Mini Checkpoint within its own List → Info → Runner → Result → Review flow.

---

## OPEN-ADMIN-01 — Landing operational return labels

Several Admin Landing states say:

- `Kembali ke Pengumuman`
- `Kembali ke Blog`

while returning to Landing Page Management.

**Frozen navigation intent:** return to Landing Page Management.

**Status:** visible label OPEN.

---

## OPEN-ADMIN-02 — Program result return label

Program saved state says:

`Kembali ke Pengumuman`

but routes to Program Management.

**Frozen navigation intent:** Program Management.

---

## OPEN-ADMIN-03 — Old Admin auth destinations

Admin operation `Bantuan Akses Admin` still links to old Admin-specific Login/Forgot Figma frames.

**Frozen behavior:** reuse shared Login/Forgot/Reset.

Do not implement old Admin auth routes.

---

## OPEN-ADMIN-04 — repeated status text / naming quirks

Some Admin success states repeat `Berhasil`.

Preserve the contract source until client/Figma cleanup unless the newest client revision explicitly corrects it.

---

## OPEN-ADMIN-05 — official support data

Active Admin Settings says official:

- support email;
- WhatsApp support;
- service hours

have not been provided by client.

Do not invent official values.

---

## OPEN-ADMIN-06 — data retention policy

Admin Settings marks retention policy as:

`Missing`

Do not invent a retention duration.

---

# 20. Existing PRD production OPEN items

These remain outside frontend contract freeze unless explicitly resolved.

## OPEN-01 — Dasar Bahasa Jepang

Need final product classification.

Current frontend contract must not make it a sixth N-level.

## OPEN-02 — SSW Pengolahan Makanan

No complete Page 08–11 product Journey exists yet.

## OPEN-03 — Interview

Currently a category/material context, not a frozen full Journey product.

## OPEN-04 — Production N1–N5 catalog seed

Frontend behavior is frozen to N1–N5 independent levels.

Backend production seed/catalog still needs final approval.

## OPEN-05 — Exact Price & Promotion

Dynamic.

Do not use Page 1 legacy values.

## OPEN-06 — Progress Weight

Exact completion weights remain configurable/open.

## OPEN-07 — Assessment Rules

Need final production values for:

- timer;
- question count;
- passing score;
- attempts;
- cooldown;
- review.

Do not hardcode Figma fixtures.

## OPEN-08 — WhatsApp Production Contact

Need official production number and message template.

## OPEN-09 — Blog Editor Format

Implementation format remains open.

## OPEN-10 — SEO Domain

Production canonical hostname remains open.

## OPEN-11 — Content Media Limits

Need final:

- max image size;
- audio size;
- PDF size;
- MIME allowlist;
- dimensions/compression rules.

## OPEN-12 — Responsive Acceptance

Final formal responsive acceptance remains open, although implementation QA should still test 390px and 1440px per project workflow.

---

# 21. Non-blocking Figma quirks

These do not justify inventing missing screens or renumbering.

Examples:

- LMS Layer E has no `/44`;
- Sensei Layer F has no top-level conditions 15/16;
- multiple Sensei states share `KONDISI R5`;
- status labels mix Indonesian and English;
- Admin Layer E starts at `/25`;
- Admin Layer F contains exactly 8 top-level states;
- duplicate `Berhasil` text appears in some operation results.

Rule:

**Preserve source identity by Figma node ID where numbering/name is ambiguous.**

---

# 22. Dynamic/fixture data freeze policy

The following may appear in frontend mocks for Figma fidelity but must remain replaceable:

- Hilmi / Rina / Dimas names;
- masked emails/WhatsApp;
- N4 as currently selected level;
- Chapter 4;
- progress percentages;
- XP/streak;
- scores;
- leaderboard;
- certificate IDs;
- invoice IDs;
- referral codes;
- prices;
- periods;
- dates;
- cohort names;
- Sensei names;
- class dates;
- Zoom/Meet links;
- replay durations;
- question counts;
- timer;
- attempts;
- cooldown;
- passing score;
- recommendation percentages;
- Admin table totals such as `148`;
- analytics metrics;
- support contact values;
- media limits.

Never promote a fixture to a business rule solely because it exists in Figma.

---

# 23. Implementation-status separation — FROZEN

Contract completeness and code completeness are different.

Use:

```text
CONTRACT STATUS
Shared   COMPLETE
Free     COMPLETE / OPEN items documented
LMS      COMPLETE
Sensei   COMPLETE / OPEN items documented
Admin    COMPLETE / OPEN items documented

IMPLEMENTATION STATUS
tracked separately in Docs/ai/09-IMPLEMENTATION-STATUS.md
```

Do not mark a feature `implemented` simply because its Figma contract exists.

---

# 24. Entitlement vs implementation state — FROZEN

Maintain two independent concepts.

## Entitlement

```text
available
limited
readOnly
locked
```

## Implementation

```text
implemented
notImplemented
```

Behavior:

```text
available + implemented
→ normal navigation

locked
→ access/upgrade state appropriate to entitlement

available + notImplemented
→ “Fitur Belum Tersedia” semantics
→ no fake Upgrade requirement
```

For Sensei, owned premium features must never be represented as a lower-tier upgrade requirement.

---

# 25. Implementation prohibitions after freeze

During frontend gap closure, do not:

- redesign approved screens;
- create role-specific student shells unnecessarily;
- create separate student assessment engines for each type;
- create 62 Admin routes for Layer G;
- invent backend APIs;
- invent price/promo;
- invent official WhatsApp/support contacts;
- invent final timer/attempt/passing values;
- invent Admin permission granularity;
- invent media limits;
- invent retention policy;
- use query parameter as production auth authority;
- activate membership from frontend state;
- expose answer keys before assessment submit in production design;
- expose Admin secrets/credentials;
- change exact VERIFIED copy except when resolving a documented OPEN item through higher authority.

---

# 26. Freeze status by contract group

| Group | Coverage | Freeze result |
|---|---|---|
| Shared A/B | Public + Auth/Commercial | **CONDITIONAL PASS** — testimonial KPI + login Admin copy OPEN |
| Free C–F | Dashboard/Learning/Supporting/States | **CONDITIONAL PASS** — certificate + renewal context OPEN |
| LMS C–F | Full Mandiri flow | **PASS** |
| Sensei C–F + J | Sensei + supporting + states + Mini Checkpoint | **CONDITIONAL PASS** — membership copy + Mini wiring + state copy OPEN |
| Admin B–G | Full Admin Console contract | **CONDITIONAL PASS** — operation labels/auth links/support/retention OPEN |

## Overall

**PASS TO FRONTEND GAP AUDIT**

The documented OPEN items must remain visible in the audit and must not be silently “cleaned up” by implementation agents.

---

# 27. Handoff: next phase

The contract-extraction phase is now considered closed.

Next task:

# FRONTEND GAP AUDIT

Do not edit frontend code during the audit batch.

For each contract screen/state, classify current implementation as:

```text
MATCH
PARTIAL
MISSING
WRONG COPY
WRONG VISUAL
WRONG FLOW
WRONG ENTITLEMENT
DEAD LINK
MOCK OK
BACKEND-DEFERRED
```

Recommended audit order:

```text
1. Shared/public/auth
2. Free
3. LMS
4. Sensei
5. Admin
6. cross-role/shared-component risks
```

Output should produce an implementation backlog ordered by:

1. client-visible breakage;
2. wrong entitlement/flow;
3. missing core route;
4. missing supporting screen;
5. visual mismatch;
6. backend-deferred behavior.

After the Gap Audit, implement the **smallest coherent batches**. Do not begin broad refactoring before the gap report exists.

---

# 28. Final audit statement

HIRU ACADEMY now has a sufficiently complete Figma contract layer to stop re-extracting screens and begin implementation reconciliation.

The freeze is intentionally **conditional rather than absolute** because client/Figma copy conflicts and production configuration gaps remain documented.

Frozen means:

- structure is stable;
- role/entitlement semantics are stable;
- navigation intent is stable except explicitly OPEN prototype mistakes;
- exact VERIFIED copy is protected;
- dynamic fixtures remain replaceable;
- backend/security authority remains deferred but clearly bounded.

It does **not** mean:

- every Figma fixture is a production rule;
- every visible copy conflict is resolved;
- backend requirements are complete;
- frontend implementation is complete;
- the app is production ready.
