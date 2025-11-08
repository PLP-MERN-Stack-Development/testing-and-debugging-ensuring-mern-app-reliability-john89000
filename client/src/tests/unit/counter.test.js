import counter, { INCREMENT, DECREMENT, RESET } from '../../reducers/counter';

describe('counter reducer', () => {
  it('returns the initial state when action type is unknown', () => {
    expect(counter(undefined, {})).toEqual({ count: 0 });
  });

  it('increments', () => {
    expect(counter({ count: 1 }, { type: INCREMENT })).toEqual({ count: 2 });
  });

  it('decrements', () => {
    expect(counter({ count: 1 }, { type: DECREMENT })).toEqual({ count: 0 });
  });

  it('resets', () => {
    expect(counter({ count: 5 }, { type: RESET })).toEqual({ count: 0 });
  });
});
