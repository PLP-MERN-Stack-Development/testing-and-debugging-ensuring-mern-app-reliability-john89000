const express = require('express');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');
const logger = require('./middleware/logger');
const perf = require('./middleware/perf');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use(logger);
app.use(perf);

app.use('/api/posts', postsRouter);

// Basic health route
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handler
// Use centralized error handler
app.use(errorHandler);

module.exports = app;
