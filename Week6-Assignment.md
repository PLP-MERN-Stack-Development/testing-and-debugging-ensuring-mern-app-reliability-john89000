# 🧪 Week 6: Testing and Debugging – Ensuring MERN App Reliability

## 🚀 Objective
Implement comprehensive testing strategies for a MERN stack application, including unit testing, integration testing, and end-to-end testing, while also learning debugging techniques to identify and fix common issues.

## 📂 Tasks

### Task 1: Setting Up Testing Environment
- Configure Jest as the testing framework for both client and server
- Set up testing utilities for React components (React Testing Library)
- Configure Supertest for API endpoint testing
- Create a separate test database for integration tests
- Implement test scripts in package.json for running different types of tests

### Task 2: Unit Testing
- Write unit tests for utility functions in both client and server
- Test React components in isolation using mocks for dependencies
- Implement tests for Redux reducers and actions (if applicable)
- Create tests for custom hooks in React
- Test Express middleware functions
- Achieve at least 70% code coverage for unit tests

### Task 3: Integration Testing
- Write tests for API endpoints using Supertest
- Test database operations with a test database
- Implement integration tests for React components that interact with APIs
- Test authentication flows
- Create tests for form submissions and data validation

### Task 4: End-to-End Testing
- Set up Cypress or Playwright for end-to-end testing
- Create tests for critical user flows (e.g., registration, login, CRUD operations)
- Test navigation and routing
- Implement tests for error handling and edge cases
- Create visual regression tests for UI components

### Task 5: Debugging Techniques
- Use logging strategies for server-side debugging
- Implement error boundaries in React
- Use browser developer tools for client-side debugging
- Create a global error handler for the Express server
- Implement performance monitoring and optimization

## 🧪 Expected Outcome
- A comprehensive test suite for a MERN stack application
- Well-documented testing strategies and methodologies
- High code coverage for critical application features
- Improved application reliability and stability
- Implementation of debugging tools and techniques

## 🛠️ Setup
1. Clone the starter code repository
2. Install dependencies for both client and server:
   ```
   # In the root directory
   npm run install-all
   ```
3. Set up the test database:
   ```
   # In the server directory
   npm run setup-test-db
   ```
4. Run the tests:
   ```
   # Run all tests
   npm test
   
   # Run only unit tests
   npm run test:unit
   
   # Run only integration tests
   npm run test:integration
   
   # Run only end-to-end tests
    npm run test:e2e
   ```

## 🛠️ Implementation summary (what I added)

- Test framework and config
   - Root `jest.config.js` with separate `client` and `server` projects and coverage thresholds.
   - Root `package.json` scripts for `test`, `test:unit`, `test:integration`, `test:client`, and `test:server`.

- Client-side testing
   - React Testing Library setup in `client/src/tests/setup.js` (uses `@testing-library/jest-dom`).
   - Example unit tests added under `client/src/tests/unit/`:
      - `Button.test.jsx` (component tests), `math.test.js` (utils), `useCounter.test.js` (hook), `counter.test.js` (reducer).
   - Minimal implementations added for `client/src/components/Button.jsx`, `client/src/hooks/useCounter.js`, `client/src/reducers/counter.js`, `client/src/utils/math.js`, and `client/src/components/ErrorBoundary.jsx`.

- Server-side testing
   - Supertest-ready integration tests live under `server/tests/integration/` (e.g., `posts.test.js`).
   - In-memory test DB support using `mongodb-memory-server` via `server/tests/setup.js` and `npm run setup-test-db` script.
   - Example unit tests under `server/tests/unit/` for `server/src/utils/math.js` and middleware.
   - Added `server/src/middleware/errorHandler.js` (global error handler) and `server/src/middleware/perf.js` (response time header) and wired them into `server/src/app.js`.

- End-to-end (E2E)
   - Playwright scaffold added: `playwright.config.js` and example tests under `e2e/tests/`:
      - `auth.spec.js`, `crud.spec.js`, `navigation.spec.js`, `visual.spec.js`.
   - `package.json` scripts: `test:e2e`, `test:e2e:headed`, and `playwright:install`.

## ▶ How to run tests locally (PowerShell)

1. Install all dependencies (root):
```powershell
npm install
```

2. (Optional) Install Playwright browsers before running E2E tests:
```powershell
npm run playwright:install
```

3. Start the app (so E2E can hit it). Example (adjust as your app uses):
```powershell
# in one terminal - start front-end or full app
npm start
```

4. Run tests:
```powershell
# All Jest tests (client + server)
npm test

# Only unit tests
npm run test:unit

# Only server integration tests
npm run test:integration

# E2E (Playwright)
npm run test:e2e
```

Notes:
- Integration tests use an in-memory MongoDB when `mongodb-memory-server` and `mongoose` are installed; `server/tests/setup.js` will create/tear down the in-memory instance automatically.
- Coverage thresholds are enforced by `jest.config.js` (70% statements/lines/functions and 60% branches by default). Adjust thresholds in `jest.config.js` if needed.
- Visual tests with Playwright will create baseline images on first run — review the report and accept or manage snapshots under the Playwright report folder.

## ✅ What I verified

- Created example unit tests for client and server.
- Wired centralized error handler and performance middleware on the server.
- Scaffoled Playwright E2E tests and scripts.

If you want, I can run the test suite in this environment now (I will run `npm install` then `npm test -- --runInBand`) and report results, or I can update the README/assignment doc further with troubleshooting steps and CI snippets.

## ✅ Submission Instructions
1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Complete all the tasks in the assignment
4. Commit and push your code regularly to show progress
5. Include in your repository:
   - Complete test files for unit, integration, and end-to-end testing
   - Documentation of your testing strategy
   - Screenshots of test coverage reports
   - Examples of debugging techniques implemented
6. Your submission will be automatically graded based on the criteria in the autograding configuration
7. The instructor will review your submission after the autograding is complete 