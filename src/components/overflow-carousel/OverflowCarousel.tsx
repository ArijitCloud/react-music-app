import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../icon/Icon";

const TRANSLATE_AMOUNT = 200; // Amount to scroll when buttons are clicked

type OverflowCarouselProps = {
  children: React.ReactNode;
};

const OverflowCarousel = ({ children }: OverflowCarouselProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateVisibility = useCallback(() => {
    if (containerRef.current == null) return;
    const container = containerRef.current;
    setIsLeftVisible(translate > 0);
    setIsRightVisible(
      translate + container.clientWidth < container.scrollWidth
    );
  }, [translate]);

  useEffect(() => {
    updateVisibility();
  }, [translate, children, updateVisibility]);

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver(() => {
      updateVisibility();
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [children, updateVisibility]);

  const scrollLeft = () => {
    setTranslate((prev) => Math.max(prev - TRANSLATE_AMOUNT, 0));
  };

  const scrollRight = () => {
    if (containerRef.current == null) return;
    const container = containerRef.current;
    const maxTranslate = container.scrollWidth - container.clientWidth;
    setTranslate((prev) => Math.min(prev + TRANSLATE_AMOUNT, maxTranslate));
  };

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {children}
      </div>

      {isLeftVisible && (
        <button
          type="button"
          aria-label="Scroll Left"
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-off-white
           dark:bg-card-bg rounded-full p-2 shadow-md hover:bg-white
           dark:hover:bg-secondary-text focus:outline-none"
        >
          <Icon name="ChevronLeft" classNames="h-4 w-4" />
        </button>
      )}
      {isRightVisible && (
        <button
          type="button"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-off-white
           dark:bg-card-bg rounded-full p-2 
           shadow-md hover:bg-white dark:hover:bg-secondary-text focus:outline-none"
          onClick={scrollRight}
        >
          <Icon name="ChevronRight" classNames="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export { OverflowCarousel };
