# ADR 0001: Architecture for the BeachSpot Front-end MVP

- **Status:** Accepted
- **Date:** 2026-06-14
- **Authors:** Paulo (student)
- **Context:** PUC-Rio postgraduate course, "MVP de Desenvolvimento Front-end Avançado" (Profs. Dieinison Braga and Marisa Silva)
- **Decision scope:** Whole-MVP architecture decision record. Covers product framing, tech stack, routing, state, data mocking, component architecture, styling, folder structure, and the Figma workflow. Individual reversible sub-decisions are listed under "Decisions".

---

## 1. Context

The deliverable is a React front-end MVP graded against a fixed rubric (10 points total) plus a video walkthrough of up to 5 minutes. The product domain is free; the only constraints come from the rubric:

- At least **3 pages** built from **reusable components** (at least 4 reused across pages).
- **React Router** (or equivalent) with at least **3 navigation hooks** and a **404 route**.
- Server requests must be **simulated by reading JSON** (no real backend).
- Usability affordances: loaders, tooltips, conditional messages, responsive layout.
- Public GitHub repo, clear README, clean folder structure, naming conventions.
- The example given in the brief is a clinic appointment scheduler. Reusing class examples without at least 50% new code is penalized.

The chosen product is **BeachSpot**, a booking front-end for **beach tennis** courts. The scheduling domain is deliberately moved away from the medical-clinic example to protect the originality criterion, and the time-slot grid for sand courts gives a distinctive interaction. Focusing on a single, fast-growing sport in Brazil keeps the data model and the UI tight.

The user has already chosen the stack at a high level: **React, Vite, and Figma**. This ADR records the decisions that fill in the rest.

---

## 2. Decision drivers

1. **Rubric coverage first.** Every architectural choice is justified by which rubric line it serves.
2. **Demonstrability in a 5-minute video.** The architecture must make `useState`/`useEffect`, the three navigation hooks, the 404, and the reusable components easy to show on screen.
3. **Originality.** The solution must visibly differ from the clinic example (alternative navigation, a custom interactive component, a distinct visual proposal).
4. **YAGNI.** No state library, no backend, no abstractions the 3-to-4-page scope does not need.
5. **Clarity over cleverness.** Small, single-purpose components and a folder layout a grader can read in seconds.

---

## 3. Decisions

Each decision lists the chosen option, the alternatives considered, and why.

### 3.1 Build tooling and framework: React + Vite

- **Chosen:** React 18+ with Vite.
- **Alternatives:** Create React App (deprecated, slow), Next.js (SSR/file routing is overkill and hides the React Router requirement).
- **Why:** Vite is the fastest dev/build experience, already chosen by the user, and keeps React Router explicit (which the rubric asks to demonstrate).

### 3.2 Language: JavaScript (JSX)

- **Chosen:** JavaScript with JSX.
- **Alternatives:** TypeScript.
- **Why:** The rubric does not require TypeScript and the scope is small. JavaScript reduces friction and keeps the video focused on React concepts. TypeScript remains an easy future upgrade (rename to `.tsx`, add `tsconfig`) if desired; it is recorded here as a non-blocking option, not part of the MVP.

### 3.3 Styling: Tailwind CSS

- **Chosen:** Tailwind CSS.
- **Alternatives:** CSS Modules (clean but slower for responsive work), shadcn/ui + Tailwind (ships components ready-made, which weakens the "I componentized it myself" story the rubric grades), styled-components (adds runtime, less common with Vite today).
- **Why:** Utility-first styling makes the responsive requirement fast, maps cleanly onto Figma design tokens via `tailwind.config.js`, and still leaves all reusable components hand-built by us, which is what the rubric rewards.

### 3.4 Routing: React Router with classic `<Routes>`

- **Chosen:** React Router (`<BrowserRouter>` + `<Routes>` + `<Route>`), data fetched inside components.
- **Alternatives:** Data Router (`createBrowserRouter` + `loader`/`action`), which is more modern but moves data fetching out of `useEffect`/`useState`, the exact APIs the rubric wants to see demonstrated.
- **Why:** The classic approach keeps `useState`/`useEffect` front and center, is trivial to narrate in the video, and covers the three navigation hooks naturally. The 404 is a `path="*"` catch-all route.

### 3.5 State management: React hooks + Context + localStorage

- **Chosen:** Local component state with `useState`/`useEffect`; a single `BookingContext` (Context + reducer or state) for the booking flow; `localStorage` for persistence across refresh.
- **Alternatives:** Zustand or Redux.
- **Why:** Three-to-four pages do not justify a global store (YAGNI). Context is enough to share the in-progress and confirmed reservations between the detail page and the reservations page.

### 3.6 Data: local JSON + a service layer that simulates latency

- **Chosen:** Static JSON in `src/data/` consumed through `src/services/courtsService.js`. Each service function returns a `Promise` resolved by `setTimeout` (300-800 ms) to imitate network latency, which is what enables the loading states.
- **Alternatives:** Direct synchronous import of JSON (no latency, no loaders), or a mock server such as MSW (extra dependency, not needed).
- **Why:** This satisfies the rubric note "simulate requests by reading a JSON" while still producing realistic loading/empty/error states for the usability criterion.

### 3.7 Component organization: `components` (generic) vs `features` (domain)

- **Chosen:** Generic, reusable UI in `src/components/` (split into `ui/` and `layout/`); domain-specific groupings in `src/features/`; route entry points in `src/pages/`.
- **Why:** Keeps reusable components clearly separated from page-specific composition, which makes the "reuse across pages" story obvious to the grader and to the video.

---

## 4. Resulting architecture

### 4.1 Product framing (video item 1)

BeachSpot centralizes beach tennis arenas. Beach tennis is booming in Brazil, but to find an open sand court players still call several venues one by one. The app shows each arena's availability in a time-slot grid and lets a player book a slot in a few clicks.

### 4.2 Pages and routes

| Route | Page | Purpose / notable elements |
|---|---|---|
| `/` | Home | Hero with quick search, featured courts (reuses `CourtCard`), how-it-works highlights, primary CTA |
| `/quadras` | Courts catalog | `SearchBar` + filters (neighborhood / price / period of day / features), responsive card grid, `Loader` while fetching, `EmptyState` for "nenhuma quadra encontrada" |
| `/quadras/:courtId` | Court detail + booking | `useParams` reads the id; `TimeSlotGrid` (custom interactive component); `Modal` confirms the booking; `Toast` reports success; `useNavigate` redirects to `/reservas` |
| `/reservas` | My reservations | Confirmed bookings from `BookingContext` + `localStorage`; `EmptyState` when none |
| `*` | NotFound (404) | Catch-all route; friendly message and a `Button` back to Home |

This is 4 real pages plus the 404, exceeding the minimum of 3.

### 4.3 Reusable components

**Layout** (every page): `Header` (logo + nav; uses `useLocation` to highlight the active link), `Footer`.

**UI base:** `Button` (variants primary/secondary/ghost, hover/active/disabled states, animation), `Badge` (court attribute or availability status, e.g. "Coberta" / "Ao ar livre" / "Disponível hoje"), `Tooltip`, `Modal` (critical-action confirmation), `Toast`/`Alert` (success/error feedback), `Loader` (spinner), `EmptyState` (conditional message), `SearchBar` (input + button, controlled by `useState`).

**Domain:** `CourtCard` (image, name, neighborhood, price/hour, a `Badge` for feature/status, action button) reused on Home and Catalog; `TimeSlotGrid` + `TimeSlot`, the original interactive component on the detail page.

The four components highlighted in the video as reused across different pages: **`Header`, `Button`, `CourtCard`, `SearchBar`.**

### 4.4 Navigation hooks (video item 3)

- `useNavigate`: card click navigates to the detail route; confirming a booking redirects to `/reservas`.
- `useParams`: reads `:courtId` on the detail page.
- `useLocation`: the `Header` highlights the active route (and reads query state for filters; `useSearchParams` may back the catalog filters).
- 404: `<Route path="*" element={<NotFound />} />`.

### 4.5 Data flow

```
JSON (src/data) -> courtsService (Promise + setTimeout) -> useFetch hook (useState: data/loading/error, useEffect) -> page -> reusable components
                                                                                                      |
                                                                  BookingContext (selected/confirmed) + localStorage
```

The `useFetch` hook (or `useCourts`/`useCourt`) encapsulates the `useState` triplet (data, loading, error) and the `useEffect` that calls the service. This is where the rubric's `useState`/`useEffect` requirement is demonstrated explicitly.

### 4.6 State handling matrix

| State | UI |
|---|---|
| loading | `Loader` spinner |
| error | `Alert` "erro ao carregar dados" + retry `Button` |
| empty | `EmptyState` "nenhuma quadra encontrada" |
| unknown route | `NotFound` 404 page |
| success (booking) | `Toast` "Reserva confirmada" + redirect |

### 4.7 Folder structure

```
beachspot/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ ui/        # Button, Badge, Modal, Toast, Tooltip, Loader, EmptyState, SearchBar
│  │  └─ layout/    # Header, Footer
│  ├─ features/
│  │  ├─ courts/    # CourtCard, CourtList, filters
│  │  └─ booking/   # TimeSlotGrid, TimeSlot, BookingContext
│  ├─ pages/        # Home, Courts, CourtDetail, Reservations, NotFound
│  ├─ services/     # courtsService.js
│  ├─ hooks/        # useFetch.js
│  ├─ data/         # courts.json, slots.json
│  ├─ routes/       # AppRouter.jsx
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ tailwind.config.js
├─ vite.config.js
├─ package.json
└─ README.md
```

### 4.8 Figma workflow

- Figma design tokens (color, spacing, typography scale) are transcribed into the `theme.extend` block of `tailwind.config.js`, so the code and the design share one source of truth.
- Each Figma component maps 1:1 to a React component (Figma `Button` -> `components/ui/Button`, Figma `CourtCard` -> `features/courts/CourtCard`, and so on).
- The Figma file is the visual reference for the "distinct visual proposal" originality point. A sand/sun/ocean palette reinforces the beach tennis identity.

---

## 5. Rubric traceability

| Rubric line | Pts | Where it is satisfied |
|---|---|---|
| Componentization across 3 pages | 0.5 | `components/` + `features/` reused across `pages/` |
| Reuse at least 4 components | 2.0 | `Header`, `Button`, `CourtCard`, `SearchBar` (plus `Badge`, `Modal`, etc.) |
| Original solution vs example | 1.0 | Beach tennis domain, custom `TimeSlotGrid` interaction, own visual identity |
| Simulate requests via JSON | (note) | `services/courtsService.js` + `data/*.json` with simulated latency |
| State, props, hooks (`useState`/`useEffect`) | 1.0 | `useFetch` hook, controlled inputs, `BookingContext` |
| React Router + 3 nav hooks | 1.0 | `useNavigate`, `useParams`, `useLocation` |
| 404 route | 0.5 | `path="*"` -> `NotFound` |
| Usability affordances | 1.5 | `Loader`, `Toast`, `Tooltip`, `EmptyState`, hover/active states |
| Responsive layout | 0.5 | Tailwind breakpoints; hamburger menu; scrollable slot grid on mobile |
| Public GitHub repo | 0.5 | Repo published publicly |
| README | 0.5 | Title, description, install/run instructions |
| Clear folder structure | 0.5 | Section 4.7 |
| Naming conventions / good practices | 0.5 | PascalCase components, camelCase functions, one component per file |

### 5.1 Video script mapping (5 min max)

| Order | Topic | Backed by |
|---|---|---|
| 1 (10-30s) | Problem and purpose | Section 4.1 |
| 2 (1-2 min) | 4 reusable components across pages | Section 4.3 |
| 3 (30-60s) | Routing, 3 nav hooks, 404 | Sections 4.2, 4.4 |
| 4 (30-60s) | Usability: loaders, tooltips, conditional messages, responsive | Section 4.6, plus responsive layout |

---

## 6. Consequences

**Positive**

- Maps onto every rubric line, with the traceability table doubling as the video outline.
- Small, single-purpose components are easy to reason about and to demo.
- The service-layer mock produces realistic loading/empty/error states for free.
- A single-sport (beach tennis) domain plus the time-slot grid keep the scope tight and clearly differentiate from the clinic example.

**Negative / trade-offs**

- No backend means data is read-only; "reservations" persist only in `localStorage`. Acceptable for an MVP and explicitly allowed by the rubric.
- JavaScript over TypeScript trades compile-time safety for speed; mitigated by small scope and clear prop conventions.
- Tailwind classes can clutter JSX; mitigated by extracting reusable components and using `@apply` for repeated patterns where helpful.

---

## 7. Out of scope (YAGNI)

Real authentication, payments, a backend or database, a global state library, server-side rendering, internationalization, multiple sports/modalities, and automated tests beyond an optional smoke test. Unit tests with Vitest + React Testing Library are recorded as an optional bonus, not part of the graded MVP.

---

## 8. Follow-up

Implementation is organized in phases: scaffold, data and service layer, reusable UI components, layout and routing, booking state, domain components, pages, and a final responsive/documentation pass. Each phase produces working, committed code with tests for the logic-bearing units.
