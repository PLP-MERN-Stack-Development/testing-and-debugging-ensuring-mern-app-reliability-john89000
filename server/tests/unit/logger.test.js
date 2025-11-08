const logger = require('../../src/middleware/logger');

describe('logger middleware', () => {
  it('sets req.logged to true and calls next', () => {
    const req = { method: 'GET', url: '/test' };
    const res = {};
    const next = jest.fn();

    logger(req, res, next);

    expect(req.logged).toBe(true);
    expect(next).toHaveBeenCalled();
  });

  it('logs to console when NODE_ENV is not test', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const req = { method: 'POST', url: '/prod' };
    const res = {};
    const next = jest.fn();

    // Call logger directly; it checks process.env at runtime
    logger(req, res, next);

    expect(req.logged).toBe(true);
    expect(next).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });
});
