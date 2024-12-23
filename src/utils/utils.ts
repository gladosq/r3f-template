import { useEffect, useState } from "react";

export const getRandomNumber = (min: number, max: number): number => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === 8 || num === 15) ? getRandomNumber(min, max) : num;
};

export const useIntersection = (ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isVisible;
};
