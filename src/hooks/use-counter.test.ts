import { renderHook, act } from '@testing-library/react-hooks';
import { expect } from 'chai';
import useCounter from './use-counter';

describe('useCounter()', () => {
  it('should init count at value passed', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).to.equal(5);
  });

  it('should start counter when actions.start() is called', () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).to.equal(5);

    act(() => result.current.actions.start());
    expect(result.current.count).to.not.equal(5);
  });

  it('should stop counter when actions.stop() is called', () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => result.current.actions.start());
    expect(result.current.count).to.not.equal(10);

    act(() => result.current.actions.stop());
    expect(result.current.count).to.equal(10);
  });
});
