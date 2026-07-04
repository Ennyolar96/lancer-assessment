# Healthcare Patient Dashboard

A production-grade patient dashboard application built with React 19, providing healthcare professionals with a unified interface to view, search, and manage patient medical records in real time.

## Architecture & Domain Overview

### Domain Context

This application serves as a clinical dashboard for a healthcare provider (e.g., a physician's office). It connects to a remote medical records API to retrieve and display patient data including demographics, vital signs, diagnostic history, lab results, and blood pressure trends. The dashboard is designed to be used on both desktop (three-column layout) and mobile (single-column with bottom drawer navigation).

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                       │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  App.jsx (Root)                                  │   │
│  │  ┌─ QueryClientProvider (TanStack Query) ──────┐ │   │
│  │  │                                             │ │   │
│  │  │  Dashboard (pages/dashboard.jsx)            │ │   │
│  │  │  ├── Header                                 │ │   │
│  │  │  ├── Patients (sidebar / drawer)            │ │   │
│  │  │  ├── DiagnosisHistory + DiagnosisChart      │ │   │
│  │  │  ├── DiagnosticList                         │ │   │
│  │  │  ├── Profile + LabResult                    │ │   │
│  │  │  └── BottomDrawer (mobile)                  │ │   │
│  │  │                                             │ │   │
│  │  │  Zustand Store                              │ │   │
│  │  │  └─ usePatientStore (selectedPatient)       │ │   │
│  │  │                                             │ │   │
│  │  │  TanStack Query Cache                       │ │   │
│  │  │  └─ ["patients"] (server state)             │ │   │
│  │  │                                             │ │   │
│  │  └─────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────┘   │
│                         │                               │
│                         ▼                               │
│              Axios HTTP Client (service/api.js)         │
│                         │                               │
└─────────────────────────┼───────────────────────────────┘
                          │
                          ▼
          Coalition Skills Test API (REST)
```

### State Management Strategy

| Layer            | Technology                   | Responsibility                                                 |
| ---------------- | ---------------------------- | -------------------------------------------------------------- |
| **Server State** | TanStack Query (React Query) | Fetching, caching, and retrying patient data from the API      |
| **Client State** | Zustand                      | Currently selected patient shared across all components        |
| **Local State**  | React useState               | UI state: mobile panel toggle, drawer open/close, search input |

### Data Flow

1. `Dashboard` mounts → TanStack Query fires `GET /` with Basic Auth via Axios.
2. The API returns an array of patient records → stored in the query cache.
3. A `useEffect` automatically selects the first patient and writes it to Zustand.
4. Child components (`Profile`, `DiagnosisHistory`, `DiagnosticList`, `LabResult`) subscribe to the Zustand store and render the selected patient's data.
5. User clicks a different patient in the `Patients` list → `setSelectedPatient()` updates Zustand → all subscribers re-render with new data.

### Responsive Strategy

- **Desktop (≥1024px):** Three-column layout — Patients sidebar (25%), main content (50%), Profile sidebar (25%).
- **Mobile (<1024px):** Single-column layout with toggle buttons to open a Vaul bottom drawer containing the Patients list or Profile.

## Features

### Patient Management

- **Patient List:** Scrollable sidebar listing all patients with profile photos, name, gender, and age.
- **Real-time Search:** Click the search icon to reveal a focused input field; patients are filtered by name using a 300ms debounce for smooth real-time updates.
- **Patient Selection:** Click any patient to select them; the dashboard immediately updates all data panels (diagnosis history, diagnostic list, profile, lab results) to reflect the chosen patient.

### Clinical Data Visualization

- **Blood Pressure Chart:** Custom SVG line chart showing systolic and diastolic trends over the last 6 months, with cubic Bezier smoothing, data point markers, and trend direction indicators.
- **Vitals Overview:** At-a-glance cards for Respiratory Rate, Temperature, and Heart Rate with status labels.
- **Diagnostic List:** Scrollable table of problems/diagnoses with descriptions and status.
- **Patient Profile:** Photo, date of birth, gender, contact info, emergency contact, and insurance provider.
- **Lab Results:** Scrollable list of lab result items with download action buttons.

### User Interface

- **Responsive Design:** Full three-column layout on desktop collapses to a mobile-friendly single-column view with a Vaul bottom drawer for navigation.
- **Loading Skeleton:** Animated placeholder matching the three-column layout while data is being fetched.
- **Error Handling:** Dedicated error screen with retry capability when API calls fail.
- **Navigation Header:** Desktop and mobile navigation with active state highlighting.

### Technical Highlights

- **Zustand State Management:** Selected patient state is centralized in a Zustand store, eliminating prop drilling and allowing any component to access the current patient's data directly.
- **React Query with Retry Delegation:** API retry logic removed from the Axios interceptor and delegated to TanStack Query's built-in `retry`/`retryDelay` options for cleaner separation of concerns.
- **Debounced Search:** The patient search input uses a custom `useDebounce` hook to avoid excessive filtering on every keystroke.
- **Custom SVG Charting:** Blood pressure chart is implemented as a pure SVG component with smooth cubic Bezier paths and responsive layout, avoiding heavy charting libraries.

## Repository Map

```
src/
├── assets/                         # Static assets (images, SVGs)
│   ├── HeartBPM.svg
│   ├── respiratory rate.svg
│   ├── temperature.svg
│   ├── TestLogo.png
│   ├── Layer 2.png
│   ├── senior-woman-doctor-....png
│   └── index.js                    # Barrel exports
│
├── components/
│   ├── dashboard/
│   │   ├── chart.jsx               # SVG blood pressure line chart
│   │   ├── diagnosis-history.jsx   # Diagnosis History section
│   │   ├── diagnostic.jsx          # Diagnostic List table
│   │   ├── lab-result.jsx          # Lab Results list
│   │   ├── patients.jsx            # Patient list with search
│   │   ├── profile.jsx             # Patient profile card
│   │   └── skeleton.jsx            # Loading skeleton
│   ├── layout/
│   │   └── header.jsx              # Top navigation bar
│   └── ui/
│       ├── bottom-drawer.jsx       # Mobile drawer (Vaul)
│       └── error.jsx               # Error state with retry
│
├── hooks/
│   ├── use-debounce.js             # Debounce hook
│   └── use-mobile.jsx              # Responsive breakpoint hook
│
├── lib/
│   └── utils.js                    # cn() utility (tailwind-merge + clsx)
│
├── pages/
│   └── dashboard.jsx               # Main dashboard page
│
├── service/
│   └── api.js                      # Axios HTTP client
│
├── store/
│   └── use-patient-store.js        # Zustand store
│
├── App.jsx                         # Root component
├── index.css                       # Global styles + Tailwind theme
└── main.jsx                        # Entry point
```

### Key Files Explained

| File                              | Purpose                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------- |
| `pages/dashboard.jsx`             | Application orchestrator; manages data fetching, mobile panel state, and layout |
| `store/use-patient-store.js`      | Zustand store holding the currently selected patient                            |
| `service/api.js`                  | Axios instance configured with base URL and timeout                             |
| `components/dashboard/chart.jsx`  | Pure SVG blood pressure chart (no external chart library)                       |
| `components/ui/bottom-drawer.jsx` | Responsive drawer: centered modal on desktop, Vaul bottom sheet on mobile       |
| `hooks/use-debounce.js`           | Generic debounce hook used for patient search                                   |

## Live Application URL

https://lancer-assessment.netlify.app

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A `.env` file with the following variables:

```env
VITE_API_URL=https://fedskillstest.coalitiontechnologies.workers.dev
VITE_USERNAME=coalition
VITE_PASSWORD=skills-test
```

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run linter
bun run lint
```

## Testing Guide

### Setup & Launch

1. Clone the repository.
2. Copy `.env.example` to `.env` (or create `.env`) and populate the variables above.
3. Run `bun install` and `bun run dev`.
4. Open the provided local URL (typically `http://localhost:5173`).

### Test Cases

#### 1. Initial Load & Data Display

- **Expected:** A loading skeleton is displayed briefly, then the three-column layout appears with patient data.
- **Verify:** The left sidebar shows a list of patients. The center shows "Diagnosis History" with a blood pressure chart. The right sidebar shows patient profile information and lab results.

#### 2. Patient Selection

- **Expected:** Clicking a patient in the left sidebar updates the center panel (diagnosis history, chart, diagnostic list) and the right panel (profile, lab results) to reflect the selected patient.
- **Verify:** The blood pressure chart changes, the diagnostic list shows different entries, and the profile photo/name/details update accordingly.

#### 3. Patient Search

- **Expected:** Click the search icon (magnifying glass) next to "Patients" heading. The heading is replaced by a text input that auto-focuses.
- **Verify:** Type a patient name. The list filters in real time with a brief debounce delay. Press Escape or click the X button to exit search mode (the list restores to full).

#### 4. Error & Retry

- **Expected:** Disconnect your network or stop the API server. The dashboard shows the error screen with a "Try again" button.
- **Verify:** Click "Try again" — it shows a spinning indicator. Reconnect your network and click again — data loads successfully.

#### 5. Mobile Responsiveness

- **Expected:** Resize the browser to <1024px width. The three-column layout collapses to single column.
- **Verify:** Two toggle buttons appear ("Patients" and "Profile"). Clicking either opens a bottom drawer (on mobile) or a centered modal (on tablet) with the respective content.

#### 6. Loading State

- **Expected:** On slow connections or when refetching, the skeleton placeholder is visible.
- **Verify:** The skeleton matches the three-column layout with animated pulse blocks.

## Tech Stack

| Category             | Technology                    |
| -------------------- | ----------------------------- |
| **Framework**        | React 19                      |
| **Build Tool**       | Vite 8                        |
| **CSS**              | Tailwind CSS v4               |
| **State Management** | Zustand 5, TanStack Query 5   |
| **HTTP Client**      | Axios                         |
| **UI Components**    | Vaul (drawer), Lucide (icons) |
| **Linting**          | ESLint 10                     |
| **Package Manager**  | Bun                           |

## Design Decisions

- **Zustand over Redux:** Chosen for minimal boilerplate — the app only needs a single slice of shared state (selected patient). Redux would be over-engineering for this scope.
- **Custom SVG Chart:** Instead of pulling in a heavy charting library (Recharts, D3), the blood pressure trend is rendered as raw SVG. This keeps the bundle small while providing full control over rendering and animation.
- **Vaul for Drawer:** Vaul provides a lightweight, accessible drawer component with native-feeling gesture support on mobile.
- **TanStack Query for API Layer:** Eliminates manual loading/error state management and provides caching, background refetching, and configurable retry logic out of the box.
# lancer-assessment
