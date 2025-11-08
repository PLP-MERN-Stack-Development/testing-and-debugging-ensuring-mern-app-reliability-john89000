# MERN Testing & Debugging Starter

This repository is a starter / learning project that demonstrates a testing and debugging setup for a MERN-style application. It provides:

- Jest configuration for client and server projects (unit + integration tests)
- React Testing Library examples for component and hook tests
- Supertest examples for API integration tests using an in-memory MongoDB
- Playwright scaffold for end-to-end testing (example flows + visual snapshot)
- Basic server debugging utilities (global error handler, performance middleware)

Goal: make it simple to run the tests locally and adapt the examples to your own MERN app.

Prerequisites
-----------
- Node.js 18+ and npm
- (Optional for integration tests) No external MongoDB required — tests use an in-memory MongoDB (`mongodb-memory-server`).

Quick start
-----------
1. Clone the repo:

```powershell
git clone <your-repo-url>
cd testing-and-debugging-ensuring-mern-app-reliability-john89000
```

2. Install dependencies:

```powershell
npm install
```

3. Run unit + server tests (Jest):

```powershell
# Run client + server unit tests
npm run test:unit

# Run server integration tests (uses in-memory MongoDB)
npm run test:integration

# Run all Jest tests (both projects)
npm test
```

4. (Optional) Run end-to-end tests with Playwright:

```powershell
# Install Playwright browsers (required once)
npm run playwright:install

# Make sure your app is running at the configured baseURL (default http://localhost:3000)
# Then run E2E tests
npm run test:e2e
```

If you don't have a running dev server for E2E, you can still use the unit and integration tests — integration tests use the in-memory MongoDB and the Express `app` module directly via Supertest.

Project layout (important files)
--------------------------------
```
mern-testing/
├── client/
│   ├── src/
│   │   ├── components/     # React components used in tests
│   │   ├── hooks/
│   │   ├── reducers/
│   │   ├── utils/
│   │   └── tests/          # client unit & integration tests
│   └── cypress/            # placeholder for Cypress tests (this repo uses Playwright)
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/     # error handler, perf, logger
│   └── tests/              # server unit & integration tests (Supertest)
├── e2e/                    # Playwright end-to-end tests
├── jest.config.js          # Jest configuration (client + server projects)
├── playwright.config.js    # Playwright configuration
└── package.json            # scripts and devDependencies
```

Notes about testing and debugging
---------------------------------
- Client tests: use React Testing Library and jest-dom. Examples are under `client/src/tests/unit/`.
- Server integration tests use `mongodb-memory-server` so you don't need a running MongoDB instance for the CI-style tests.
- A centralized error handler and a small performance middleware are included in `server/src/middleware/` to help with debugging and measuring response times.

How to run the project locally
------------------------------
1. Install dependencies (root):

```powershell
npm install
```

2. Start the server (this runs the Express app at http://localhost:3000):

```powershell
npm start
```

3. (Optional) If your front-end requires a separate dev server, start it according to your front-end setup. This starter includes a minimal `client/src/App.jsx` used by tests and E2E.

Steps to run tests and view coverage
-----------------------------------
- Run unit tests (client + server):

```powershell
npm run test:unit
```

- Run integration tests (server only):

```powershell
npm run test:integration
```

- Run all Jest tests and generate coverage reports:

```powershell
npm test -- --coverage
```

Coverage reports are output to `coverage/` and `lcov-report/` by default (see `jest.config.js`). Open `coverage/lcov-report/index.html` in a browser to view the HTML report.

Debugging techniques used in this project
----------------------------------------
- Centralized error handler (`server/src/middleware/errorHandler.js`): returns structured JSON errors and logs stack traces in non-production environments.
- Performance middleware (`server/src/middleware/perf.js`): measures response time and sets `X-Response-Time-ms` header to help spot slow endpoints.
- Lightweight request logger (`server/src/middleware/logger.js`): marks requests and logs in non-test environments.
- React `ErrorBoundary` (`client/src/components/ErrorBoundary.jsx`): prevents the entire UI from crashing and provides a fallback UI while logging errors (good for catching render/runtime errors).
- Browser developer tools: use the Console, Network, and Performance tabs to profile front-end issues during E2E runs.
- Use `mongodb-memory-server` for integration tests to isolate database behavior and avoid side effects on local/dev databases.

Testing approach and coverage explanation
---------------------------------------
- Unit tests (fast, isolated):
	- Purpose: verify individual functions, reducers, hooks, and components behave as expected in isolation.
	- Tools: Jest + React Testing Library.
	- Location: `client/src/tests/unit/` and `server/tests/unit/`.

- Integration tests (database/API):
	- Purpose: verify server routes, middleware, and database interactions work together.
	- Tools: Jest + Supertest + `mongodb-memory-server`.
	- Location: `server/tests/integration/`.

- End-to-end tests (full user flows):
	- Purpose: simulate real user interactions and validate critical flows (auth, CRUD, navigation).
	- Tools: Playwright (see `e2e/tests/`). These tests run against a running app (start with `npm start`).

- Coverage:
	- The project enforces coverage thresholds via `jest.config.js` (default: ~70% for statements/lines/functions and 60% for branches). You can adjust these values in `jest.config.js`.
	- To inspect coverage locally, run `npm test -- --coverage` and open `coverage/lcov-report/index.html`.

If you want me to run the test suite here and report any failing tests or missing dependencies, reply “Run tests now” and I'll execute the installs and test runs and return the output.

If something is missing or a test fails
-------------------------------------
- Run `npm install` first. If tests reference packages that are not installed, install them.
- Unit tests and server integration tests can be run without starting a dev server. E2E tests require the app to be running at the `baseURL` configured in `playwright.config.js`.
- If you want me to run the test suite and report failures, reply “Run tests now” and I'll run the installs and tests and return the output.

Contributing / extending
------------------------
- Add more unit tests under `client/src/tests/unit/` and `server/tests/unit/`.
- Add integration tests under `client/src/tests/integration/` if you test React components that call APIs.
- Update or add E2E flows in `e2e/tests/` and adapt selectors to match your app.

License
-------
This repository is provided as a learning/starter template — add your own license as appropriate.

Resources
---------
- Jest: https://jestjs.io/
- React Testing Library: https://testing-library.com/
- Supertest: https://github.com/visionmedia/supertest
- Playwright: https://playwright.dev/