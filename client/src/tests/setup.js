// client/src/tests/setup.js
// React Testing Library setup for Jest

// Adds custom jest matchers from @testing-library/jest-dom
try {
  require('@testing-library/jest-dom/extend-expect');
} catch (e) {
  // If the package isn't installed yet, the file still exists as a placeholder.
  // Run `npm install` to add devDependencies before running tests.
  // eslint-disable-next-line no-console
  console.warn('`@testing-library/jest-dom` is not installed. Run `npm install` to add testing deps.');
}

// Optionally set up global mocks or utilities here
// e.g., configure a test id selector or custom render helper
