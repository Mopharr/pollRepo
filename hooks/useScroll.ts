import { useEffect, useState, useRef } from "react";

const useScroll = () => {
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const elementRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrollingDown = scrollY > lastScrollY.current;
      const rightColumn = elementRef.current!;

      if (rightColumn) {
        const { bottom, top } = rightColumn.getBoundingClientRect();

        // Trigger fixed positioning when scrolling down and bottom of the column is within the viewport
        if (isScrollingDown && bottom <= window.innerHeight) {
          setIsFixed(true);
        }

        // Adjust the condition for releasing fixed positioning
        // Now it also considers the scrolling up scenario and checks if the user is near the top
        const nearTop = scrollY < 60; // Adjust this value as needed
        if (!isScrollingDown && (scrollY <= top || nearTop)) {
          setIsFixed(false);
        }
      }

      lastScrollY.current = scrollY; // Update the lastScrollY using .current
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef, lastScrollY]);

  return {
    isFixed,
    elementRef,
  };
};

export default useScroll;
