// Simple performance middleware that records response time and exposes it via header
module.exports = function perf(req, res, next) {
  const start = process.hrtime.bigint();

  // When the response finishes, calculate elapsed time
  res.on('finish', () => {
    try {
      const end = process.hrtime.bigint();
      const ns = Number(end - start);
      const ms = (ns / 1e6).toFixed(2);
      res.setHeader('X-Response-Time-ms', ms);
      // eslint-disable-next-line no-console
      if (process.env.NODE_ENV === 'development') console.log(`Response time: ${ms} ms - ${req.method} ${req.originalUrl}`);
    } catch (err) {
      // ignore
    }
  });

  next();
};
