import { useRef, useEffect, useState } from 'react';

const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length;

const useSidebar = (subSections?: Array<{ title: string; url: string }>) => {
  const [activeSection, setActiveSection] = useState<string>();
  const observerRef = useRef<IntersectionObserver>();
  const observedState = useRef({});

  const recalculateCurrentSection = () => {
    const result = Object.entries(observedState.current).sort((a, b) =>
      average(Object.values(a[1].elements)) >
        average(Object.values(b[1].elements))
        ? -1
        : 1,
    )[0][0];
    if (result !== activeSection) setActiveSection(result);
  };

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const elementId = entry.target.getAttribute(`data-id`);
      const elementRef = entry.target.getAttribute(`data-ref`);
      if (!(elementRef in observedState.current)) return;
      observedState.current[elementRef].elements[elementId] =
        entry.intersectionRatio;
    });
    recalculateCurrentSection();
  };

  useEffect(() => {
    if (!subSections) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(observerCallback, {
      rootMargin: `0px`,
      threshold: [0.1, 0.5, 1.0],
    });

    const newObservedState = {};

    subSections.forEach((subSection, index) => {
      newObservedState[subSection.url] = {
        index,
        url: subSection.url,
        elements: {},
      };

      let element = document.querySelector(subSection.url);
      element.setAttribute(`data-id`, subSection.url);
      observerRef.current.observe(element);

      let intersectionIndex = 1;
      while (
        element.nextElementSibling &&
        element.nextElementSibling.tagName !== `H2`
      ) {
        element.setAttribute(
          `data-id`,
          `${subSection.url}-${intersectionIndex}`,
        );
        element.setAttribute(`data-ref`, subSection.url);
        observerRef.current.observe(element);
        intersectionIndex += 1;
        element = element.nextElementSibling;
      }
    });

    observedState.current = newObservedState;
  }, [subSections]);

  return { activeSection };
};

export default useSidebar;
