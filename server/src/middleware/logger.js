function logger(req, res, next) {
  // simple middleware that tags requests for tests
  req.logged = true;
  // preserve console behavior but keep it minimal
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log(`${req.method} ${req.url}`);
  }
  next();
}

module.exports = logger;
