# BeachSpot

BeachSpot is a beach-tennis court booking front-end. Browse arenas, filter by
neighborhood and price, pick an available time slot, and confirm a reservation.
Built as an academic MVP for the PUC-Rio "Desenvolvimento Front-end Avançado" course.

## Tech stack

- React 19 + Vite 8
- React Router 7
- Tailwind CSS v4
- Vitest + Testing Library

## Getting started

### Prerequisites

- Node.js 20+ and npm

### Installation

```bash
git clone <your-repo-url>
cd beachspot
npm install
```

### Run in development

```bash
npm run dev
```

Open the URL printed in the terminal (default http://localhost:5173).

### Run the tests

```bash
npm run test
```

### Production build

```bash
npm run build
npm run preview
```

## Project structure

- `src/components/ui` and `src/components/layout` — reusable presentational components
- `src/features/courts` and `src/features/booking` — domain components and state
- `src/pages` — route entry points (Home, Courts, CourtDetail, Reservations, NotFound)
- `src/services` — JSON-backed data layer that simulates request latency
- `src/hooks` — shared hooks (`useFetch`)
- `src/data` — mock JSON data

## Notes

Data is mocked: the service layer reads local JSON and simulates network latency,
so no backend is required. Reservations persist in the browser via `localStorage`.

See `docs/adr/0001-mvp-architecture.md` for the architecture decision record.
