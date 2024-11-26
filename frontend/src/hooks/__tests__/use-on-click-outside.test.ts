import { fireEvent, renderHook } from '@testing-library/react';
import { act, useRef } from 'react';
import { useOnClickOutside } from '../use-on-click-outside';

describe('useOnClickOutside', () => {
  it('should call handler when clicking outside the ref element', () => {
    const handler = jest.fn();

    const mockRef = { current: null } as React.RefObject<HTMLElement>;

    renderHook(() => {
      useOnClickOutside(mockRef, handler);
    });

    const refElement = document.createElement('div');
    const outsideElement = document.createElement('div');
    document.body.appendChild(refElement);
    document.body.appendChild(outsideElement);

    (mockRef as { current: HTMLElement | null }).current = refElement;

    fireEvent.mouseDown(outsideElement);
    expect(handler).toHaveBeenCalled();

    handler.mockReset();

    fireEvent.mouseDown(refElement);
    expect(handler).not.toHaveBeenCalled();
  });

  it('should handle multiple refs correctly', () => {
    const handler = jest.fn();

    const { result } = renderHook(() => {
      const refs = useRef<HTMLElement[]>([]);
      useOnClickOutside(refs, handler);
      return refs;
    });

    const refElement1 = document.createElement('div');
    const refElement2 = document.createElement('div');
    const outsideElement = document.createElement('div');
    document.body.appendChild(refElement1);
    document.body.appendChild(refElement2);
    document.body.appendChild(outsideElement);

    act(() => {
      result.current.current = [refElement1, refElement2];
    });

    fireEvent.mouseDown(outsideElement);
    expect(handler).toHaveBeenCalled();

    handler.mockReset();

    fireEvent.mouseDown(refElement1);
    expect(handler).not.toHaveBeenCalled();
  });
});
