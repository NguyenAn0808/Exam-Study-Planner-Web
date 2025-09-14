import { useState, useEffect } from "react";
import type { RefObject } from "react";

interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}
export function useIntersection(
  elementRef: RefObject<Element | null>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: IntersectionOptions = {}
): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef?.current;
    if (!element) {
      // If element is null, update state to false and return
      setIntersecting(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;

        // If freeze once visible is true and element is visible,
        // set state and disconnect observer
        if (freezeOnceVisible && isElementIntersecting) {
          setIntersecting(isElementIntersecting);
          observer.disconnect();
          return;
        }

        setIntersecting(isElementIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible]);

  return isIntersecting;
}
