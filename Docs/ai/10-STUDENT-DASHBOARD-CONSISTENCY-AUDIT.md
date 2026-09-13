# Student Dashboard Consistency Audit

## Objective
Audit existing Student Dashboard and sub-routes to evaluate adherence to the principle:
**SAME DESIGN + SAME LAYOUT, DIFFERENT ACCESS STATE ONLY** (across Free, Belajar Mandiri, and Belajar dengan Sensei).

## Summary Conclusion
**Status: INCONSISTENT.** 
While core shells and navigations correctly use unified layouts with entitlement locks, specific routes (`/journey`, `/journey/[level]`, and `/tryout`) implement distinct DOM structures, layouts, and branching components based purely on the `membership === "sensei"` condition.

## Detailed Findings

### 1. Consistent Components (Follows Principle)
* **`StudentDashboard`** (`src/components/student-dashboard.tsx`)
  Layout and DOM tree are identical for all memberships. Differences (like Quick Actions or Continue Journey buttons) are driven purely by data configurations (`dashboard-mock.ts`).
* **`StudentNavigation`** (`src/components/student-navigation.tsx`)
  The sidebar maintains the exact same UI structure. Features unavailable to Free or Mandiri are rendered using `entitlement: "locked"` or `"readOnly"`, opening a consistent modal instead of navigating.
* **Supporting Screens** (`src/components/supporting-screen.tsx`)
  Pages like `Library`, `Progress`, `Practice` share the same `<div className="supporting-shell">` layout. Text or links change based on membership access states.

### 2. Layout Divergences (Violates Principle)

#### A. Journey Level Detail (`/journey/[level]`) 
* **Location:** `ChapterJourney` (`src/components/chapter-journey.tsx`)
* **Issue:** 
  The component splits the entire page layout based on `if (membership !== "sensei")`.
  * **Free/Mandiri:** Receives a basic `<section className="chapter-list">` block of cards with no page header or sidebars.
  * **Sensei:** Receives a completely different `<div className="chapter-journey-layout">` comprising a `chapter-journey-head`, a progress card summary, a `chapter-milestone` `<aside>`, and an exclusive multi-state level feedback form (`completionView`).
* **Why it violates:** The same feature (viewing chapters in a level) employs entirely separate design structures instead of rendering a unified layout with disabled/locked states.

#### B. Tryout Shell (`/tryout`)
* **Location:** `StaticStudentRoute` (`src/components/static-student-route.tsx`)
* **Issue:**
  ```tsx
  membership === "sensei" 
    ? <SenseiShell current="tryout"><SenseiTryoutScreen /></SenseiShell> 
    : <div className="supporting-shell"><StudentNavigation ... /><SenseiTryoutScreen /></div>
  ```
  * **Sensei:** Renders inside `<SenseiShell>`, injecting a topbar (`sensei-topbar`) and specific grid styling.
  * **Mandiri:** Renders the *exact same component* inside `<div className="supporting-shell">` which lacks the topbar.
* **Why it violates:** The shell wrapper changes based on membership, resulting in visually divergent outer page layouts for the exact same Tryout component.

#### C. Level Selection (`/journey`)
* **Location:** `LevelSelection` (`src/components/level-selection.tsx`)
* **Issue:** 
  The file contains a massive, distinct Sensei-specific layout at the bottom (`<header className="journey-page-head sensei-journey-head">`, `<section className="active-level-summary">`, modals, etc.). 
  * Currently, this is **dead code** because the initial `if (membership === "free" || membership === "lms" || membership === "sensei")` intercepts all valid union types and renders a generic `<section className="level-grid">`.
* **Why it violates:** The intended architecture clearly authored duplicate, divergent layout blocks for Sensei instead of a unified structural grid.

## Next Action / Recommendation
To achieve "SAME DESIGN + SAME LAYOUT", the divergent `ChapterJourney` and `LevelSelection` pages must be refactored to use a single unified HTML/DOM structure. Exclusive Sensei features (like active level summaries or feedback flows) should exist as widgets inside that unified grid, appearing gracefully or degrading to locked states based on entitlement, rather than branching the entire page wrapper. Tryout should use a consistent shell wrapper across memberships.
