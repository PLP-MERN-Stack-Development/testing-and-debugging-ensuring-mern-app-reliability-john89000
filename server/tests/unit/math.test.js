const { add, subtract } = require('../../src/utils/math');

describe('server utils math', () => {
  test('add', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('subtract', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});
