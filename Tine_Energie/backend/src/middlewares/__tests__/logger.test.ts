import { logger, LoggedRequest } from '../logger';

describe('logger middleware', () => {
  it('adds log message and calls next', () => {
    const req: LoggedRequest = { method: 'GET', path: '/test' } as any;
    const res = {} as any;
    const next = jest.fn();

    logger(req, res, next);

    expect(req.log).toBe('Called GET /test');
    expect(next).toHaveBeenCalled();
  });
});
