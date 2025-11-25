# Incident Dashboard

A responsive, production-ready React application designed to aggregate, filter, and display incident data. This project is built with **React 18**, **TypeScript**, and **SCSS**, utilizing **TanStack Query** for efficient data management.

## Quick Start

### Prerequisites
- Node.js (v24 LTS recommended)
- Package manager: `yarn` (preferred) or `npm`

### Installation
1. Clone the repository to your local machine.
2. Install the dependencies:
   ```bash
   yarn install
   ```

### Running Locally
Start the development server:
```bash
yarn dev
```
Open [http://localhost:5173](http://localhost:5173) to view the application.

### Building for Production
To create a production-ready build in the `dist/` directory:
```bash
yarn build
```
---

##  Testing

This project uses **Vitest** as the test runner and **React Testing Library** for component integration tests. The suite covers UI components, Custom Hooks (business logic), and Utility functions.

### Run Tests
Execute the test suite in watch mode:
```bash
yarn test
```

### Check Coverage
Generate a code coverage report (Terminal + HTML):
```bash
yarn coverage
```

---

## Technology Stack

*   **Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Language:** TypeScript (Strict Mode)
*   **State Management:** [TanStack Query (React Query v5)](https://tanstack.com/query/latest)
*   **Styling:** SCSS (Sass) with BEM-inspired naming and CSS Variables for theming.
*   **Date Handling:** Native `Intl.DateTimeFormat`.

---

## Project Structure

```text
src/
├── api/                # Provided fake API + Type Declarations
├── assets/             # SVG Icons (High/Medium/Low)
├── components/         # UI Components
│   ├── IncidentList.tsx
│   ├── IncidentTable.tsx
│   └── StatusIcon.tsx
├── hooks/              # Custom Hooks (Business Logic)
│   └── useIncidents.ts
├── styles/             # SCSS Partials
│   ├── _layout.scss
│   ├── _list.scss
│   ├── _table.scss
│   ├── _variables.scss
│   └── index.scss
├── utils/              # Helper functions (Formatters)
├── App.tsx             # Main View Controller
└── main.tsx            # App Entry Point & Providers
```

---

## Time Spent

**Total Time:** ~5 hours

*   **Architecture & Setup:** 30 mins
*   **Logic Implementation (Hooks/Types):** 1 hour
*   **UI & Dark Theme Implementation:** 1 hour
*   **Refactoring & Documentation:** 1 hour
*   **Testing:** 1.5 hour