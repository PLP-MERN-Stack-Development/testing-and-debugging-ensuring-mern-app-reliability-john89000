// Global Express error handler
module.exports = function errorHandler(err, req, res, next) {
  // Log with enough detail for server-side debugging
  // Use console for now; swap for a structured logger (winston/pino) later
  const status = err.status || 500;
  const payload = {
    message: err.message || 'Internal Server Error',
  };

  if (process.env.NODE_ENV !== 'production') {
    // include stack in non-production for debugging
    payload.stack = err.stack;
  }

  // eslint-disable-next-line no-console
  console.error(`[Error] ${req.method} ${req.originalUrl} -> ${status}:`, err);

  res.status(status).json(payload);
};
