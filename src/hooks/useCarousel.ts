import { useState, useEffect, useRef } from 'react';

export type UseCarouselOptions = {
  autoPlay?: boolean;
  initialIndex?: number;
  delay?: number;
  firstDelay?: number;
};

function useCarousel(
  length: number,
  {
    autoPlay = true,
    initialIndex = 0,
    delay = 3500,
    firstDelay = 5500,
  }: UseCarouselOptions = {}
) {
  const [index, setIndex] = useState(initialIndex);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setIndex((i) => (i + 1) % length);
  const prev = () => setIndex((i) => (i - 1 + length) % length);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const timeoutDelay = index === 0 ? firstDelay : delay;
    timerRef.current = setTimeout(next, timeoutDelay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [index, autoPlay, delay, firstDelay, length]);

  return { index, next, prev, setIndex };
}

export default useCarousel;
