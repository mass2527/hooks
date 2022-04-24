import { RefObject, useEffect, useState } from "react";

export function useOnScreen<T extends HTMLElement>(
  targetRef: RefObject<T>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const targetElement = targetRef.current;
    if (targetElement !== null) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement !== null) {
        observer.unobserve(targetElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return isIntersecting;
}
