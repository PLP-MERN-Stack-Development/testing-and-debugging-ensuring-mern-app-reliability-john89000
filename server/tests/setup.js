// server/tests/setup.js
// Setup file for server-side tests. It sets test env and spins up an
// in-memory MongoDB instance when mongoose is available.

process.env.NODE_ENV = 'test';

// Try to start an in-memory MongoDB server to isolate integration tests.
// This file is intentionally defensive: it will gracefully warn if
// dependencies (mongoose, mongodb-memory-server) are not installed yet.

(async () => {
  try {
    const mongoose = require('mongoose');
    const { MongoMemoryServer } = require('mongodb-memory-server');

    // Create and start an in-memory mongo server
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    // Store references so tests can access/stop the server
    global.__MONGOD__ = mongod;
    global.__MONGO_URI__ = uri;

    // Connect mongoose for tests
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // After all tests, stop mongoose and the in-memory server
    const afterAll = async () => {
      try {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        if (global.__MONGOD__) {
          await global.__MONGOD__.stop();
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Error cleaning up test DB:', err);
      }
    };

    // Register cleanup with Jest lifecycle hooks if they're available
    if (typeof global.afterAll === 'function') {
      global.afterAll(afterAll);
    } else {
      // Fallback: try to keep reference for manual cleanup
      process.on('exit', async () => {
        await afterAll();
      });
    }
  } catch (err) {
    // Dependencies not installed or not using mongoose — warn and continue.
    // eslint-disable-next-line no-console
    console.warn('Test DB setup skipped. To enable in-memory MongoDB, install `mongoose` and `mongodb-memory-server`.');
  }
})();
