import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useCounter from '../../hooks/useCounter';

// Small helper component to exercise the hook
function CounterTest({ initial = 0 }) {
  const { count, increment, decrement, reset } = useCounter(initial);

  return (
    <div>
      <span data-testid="count">{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

describe('useCounter hook', () => {
  it('initializes with given value and updates correctly', () => {
    render(<CounterTest initial={2} />);
    const count = screen.getByTestId('count');
    const [inc, dec, reset] = screen.getAllByRole('button');

    expect(count.textContent).toBe('2');
    fireEvent.click(inc);
    expect(count.textContent).toBe('3');
    fireEvent.click(dec);
    expect(count.textContent).toBe('2');
    fireEvent.click(reset);
    expect(count.textContent).toBe('2');
  });
});
