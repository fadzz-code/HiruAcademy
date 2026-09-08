# Graph Report - .  (2026-09-08)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 550 nodes · 803 edges · 55 communities (27 shown, 28 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `65062ae6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- public-mock.ts
- dashboard-mock.ts
- supporting-screen.tsx
- sensei-screens.tsx
- devDependencies
- compilerOptions
- app/page.tsx
- static-student-route.tsx
- learning-mock.ts
- journey-mock.ts
- AdminShell
- StaticStudentRoute
- reset-password/page.tsx
- admin-shell.tsx
- landing-page/page.tsx
- settings/page.tsx
- notification-templates/page.tsx
- tryout/client-page.tsx
- cohorts/page.tsx
- admin/community/page.tsx
- testimonials/page.tsx
- announcements/page.tsx
- audit-logs/page.tsx
- admin/blog/page.tsx
- certificates/page.tsx
- feedback/page.tsx
- invoices/page.tsx
- quiz/client-page.tsx
- chapters/client-page.tsx
- referrals/page.tsx
- users/page.tsx
- analytics/page.tsx
- assessment-results/page.tsx
- content-library/page.tsx
- admin/placement/page.tsx
- journey/[level]/page.tsx
- layout.tsx
- audio/page.tsx
- checkpoint/page.tsx
- [chapter]/flashcards/page.tsx
- grammar/page.tsx
- kanji/page.tsx
- [chapter]/page.tsx
- reading/page.tsx
- video/page.tsx
- dashboard/page.tsx
- app/mini-checkpoint/page.tsx
- replay/chapter-4/page.tsx
- replay/page.tsx
- schedule/chapter-4/page.tsx
- schedule/page.tsx
- app/tryout/page.tsx
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `StaticStudentRoute()` - 28 edges
2. `AdminShell()` - 27 edges
3. `compilerOptions` - 16 edges
4. `PublicPage()` - 14 edges
5. `StudentNavigation()` - 13 edges
6. `Membership` - 13 edges
7. `SupportingRoute()` - 11 edges
8. `parseMembership()` - 11 edges
9. `BrandLogo()` - 7 edges
10. `include` - 7 edges

## Surprising Connections (you probably didn't know these)
- `StaticStudentRoute()` --calls--> `hasTryoutAccess()`  [EXTRACTED]
  Frontend/src/components/static-student-route.tsx → Frontend/src/lib/assessment-mock.ts
- `StaticStudentRoute()` --calls--> `getDashboardData()`  [EXTRACTED]
  Frontend/src/components/static-student-route.tsx → Frontend/src/lib/dashboard-mock.ts
- `StaticStudentRoute()` --calls--> `parseMembership()`  [EXTRACTED]
  Frontend/src/components/static-student-route.tsx → Frontend/src/lib/dashboard-mock.ts
- `StaticStudentRoute()` --calls--> `getLearningData()`  [EXTRACTED]
  Frontend/src/components/static-student-route.tsx → Frontend/src/lib/learning-mock.ts
- `StaticStudentRoute()` --calls--> `hasSenseiAccess()`  [EXTRACTED]
  Frontend/src/components/static-student-route.tsx → Frontend/src/lib/sensei-mock.ts

## Import Cycles
- None detected.

## Communities (55 total, 28 thin omitted)

### Community 0 - "public-mock.ts"
Cohesion: 0.05
Nodes (28): categories, benefits, outcomes, reminders, steps, getPlacementAnswers(), PlacementResultPage(), subscribe() (+20 more)

### Community 1 - "dashboard-mock.ts"
Cohesion: 0.06
Nodes (30): metadata, BrandLogo(), CertificateDetailScreen(), CertificateUnavailableScreen(), CommunityPostScreen(), decks, FlashcardCollection(), JourneyShell() (+22 more)

### Community 2 - "supporting-screen.tsx"
Cohesion: 0.07
Nodes (6): metadata, SupportingRoute(), SupportingScreen(), Card, SupportingData, SupportingKind

### Community 3 - "sensei-screens.tsx"
Cohesion: 0.06
Nodes (26): Answers, View, AssessmentUnavailable(), AssessmentUnavailableAction, MiniCheckpointScreen(), View, ClassDetailScreen(), ReplayPlayerScreen() (+18 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (35): eslint, eslint-config-next, dependencies, next, react, react-dom, react-icons, devDependencies (+27 more)

### Community 5 - "compilerOptions"
Cohesion: 0.07
Nodes (28): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+20 more)

### Community 6 - "app/page.tsx"
Cohesion: 0.13
Nodes (9): IconName, icons, learningFlow, lmsPreviews, offers, proofItems, LandingMotion(), SenseiGrid() (+1 more)

### Community 7 - "static-student-route.tsx"
Cohesion: 0.20
Nodes (9): AskSenseiScreen(), ChapterCheckpoint(), LearningQuestionActivity(), LessonOverview(), LockedTryout(), RouteKind, VideoLesson(), LearningData (+1 more)

### Community 8 - "learning-mock.ts"
Cohesion: 0.17
Nodes (12): DocumentLesson(), FlashcardSession(), audioQuestion, DocumentLessonKind, FlashcardItem, flashcards, getDocumentLesson(), getLearningData() (+4 more)

### Community 9 - "journey-mock.ts"
Cohesion: 0.18
Nodes (11): ChapterJourney(), LevelSelection(), baseLevels, ChapterState, CohortState, JourneyChapter, JourneyLevel, LevelAccess (+3 more)

### Community 10 - "AdminShell"
Cohesion: 0.17
Nodes (4): questions, fixtures, Sensei, AdminShell()

### Community 11 - "StaticStudentRoute"
Cohesion: 0.24
Nodes (7): metadata, metadata, StaticStudentRoute(), canAccessLearning(), findJourneyLevel(), getJourneyChapters(), getJourneyLevels()

### Community 13 - "admin-shell.tsx"
Cohesion: 0.22
Nodes (5): Tab, AdminNavigation(), Child, Item, items

### Community 14 - "landing-page/page.tsx"
Cohesion: 0.25
Nodes (4): Dialog, initialSections, Section, versions

### Community 16 - "notification-templates/page.tsx"
Cohesion: 0.29
Nodes (4): Dialog, fixtures, Template, variables

### Community 17 - "tryout/client-page.tsx"
Cohesion: 0.33
Nodes (3): ClientTryoutBuilder(), poolFixtures, sectionFixtures

### Community 18 - "cohorts/page.tsx"
Cohesion: 0.33
Nodes (3): Cohort, Dialog, fixtures

### Community 19 - "admin/community/page.tsx"
Cohesion: 0.33
Nodes (3): Dialog, fixtures, Post

### Community 20 - "testimonials/page.tsx"
Cohesion: 0.33
Nodes (3): Dialog, fixtures, Testimonial

### Community 21 - "announcements/page.tsx"
Cohesion: 0.40
Nodes (3): Announcement, fixtures, State

### Community 22 - "audit-logs/page.tsx"
Cohesion: 0.40
Nodes (3): Dialog, Event, fixtures

### Community 23 - "admin/blog/page.tsx"
Cohesion: 0.40
Nodes (3): Article, fixtures, State

### Community 24 - "certificates/page.tsx"
Cohesion: 0.40
Nodes (3): Certificate, fixtures, State

### Community 25 - "feedback/page.tsx"
Cohesion: 0.40
Nodes (3): Dialog, Feedback, fixtures

### Community 26 - "invoices/page.tsx"
Cohesion: 0.40
Nodes (3): fixtures, Invoice, State

### Community 29 - "referrals/page.tsx"
Cohesion: 0.40
Nodes (3): fixtures, Referral, State

### Community 30 - "users/page.tsx"
Cohesion: 0.40
Nodes (3): Dialog, fixtureUsers, User

## Knowledge Gaps
- **184 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+179 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `BrandLogo()` connect `dashboard-mock.ts` to `public-mock.ts`, `reset-password/page.tsx`, `admin-shell.tsx`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **Why does `Membership` connect `dashboard-mock.ts` to `learning-mock.ts`, `journey-mock.ts`, `supporting-screen.tsx`, `sensei-screens.tsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `AdminShell()` connect `AdminShell` to `admin-shell.tsx`, `landing-page/page.tsx`, `settings/page.tsx`, `notification-templates/page.tsx`, `tryout/client-page.tsx`, `cohorts/page.tsx`, `admin/community/page.tsx`, `testimonials/page.tsx`, `announcements/page.tsx`, `audit-logs/page.tsx`, `admin/blog/page.tsx`, `certificates/page.tsx`, `feedback/page.tsx`, `invoices/page.tsx`, `quiz/client-page.tsx`, `chapters/client-page.tsx`, `referrals/page.tsx`, `users/page.tsx`, `analytics/page.tsx`, `assessment-results/page.tsx`, `content-library/page.tsx`, `admin/placement/page.tsx`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _184 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public-mock.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05191256830601093 - nodes in this community are weakly interconnected._
- **Should `dashboard-mock.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06397306397306397 - nodes in this community are weakly interconnected._
- **Should `supporting-screen.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06923076923076923 - nodes in this community are weakly interconnected._