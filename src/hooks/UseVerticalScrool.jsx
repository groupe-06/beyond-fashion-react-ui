import { useState, useRef, useEffect } from 'react';

export const useVerticalScroll = (itemsLength) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    let currentY = 0;
    const threshold = 50;
    const cooldownPeriod = 200;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      currentY = startY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      currentY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const now = Date.now();
      if (now - lastScrollTime.current < cooldownPeriod) return;

      const diff = startY - currentY;
      if (Math.abs(diff) > threshold) {
        if (diff > 0 && activeIndex < itemsLength - 1) {
          setActiveIndex((prev) => prev + 1);
          lastScrollTime.current = now;
        } else if (diff < 0 && activeIndex > 0) {
          setActiveIndex((prev) => prev - 1);
          lastScrollTime.current = now;
        }
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        const now = Date.now();
        if (now - lastScrollTime.current < cooldownPeriod) return;

        if (e.deltaY > 0 && activeIndex < itemsLength - 1) {
          setActiveIndex((prev) => prev + 1);
          lastScrollTime.current = now;
        } else if (e.deltaY < 0 && activeIndex > 0) {
          setActiveIndex((prev) => prev - 1);
          lastScrollTime.current = now;
        }
      }, 50);
    };

    const handleKeyDown = (e) => {
      const now = Date.now();
      if (now - lastScrollTime.current < cooldownPeriod) return;

      if (e.key === 'ArrowUp' && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
        lastScrollTime.current = now;
      } else if (e.key === 'ArrowDown' && activeIndex < itemsLength - 1) {
        setActiveIndex((prev) => prev + 1);
        lastScrollTime.current = now;
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [activeIndex, itemsLength]);

  return { activeIndex, containerRef };
};