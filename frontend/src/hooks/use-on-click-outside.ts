import { RefObject, useEffect } from 'react';

export const useOnClickOutside = (
  refs: RefObject<HTMLElement[] | HTMLElement>,
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // Check if refs.current is an array of elements
      if (Array.isArray(refs.current)) {
        if (
          refs.current.some((ref) => ref && ref.contains(event.target as Node))
        ) {
          return;
        }
      } else {
        // refs.current is a single element
        if (!refs.current || refs.current.contains(event.target as Node)) {
          return;
        }
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
};
