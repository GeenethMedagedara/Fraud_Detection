
import { useState, useEffect } from 'react';

// Hook for sequential animations
export function useSequentialAnimation(
  itemCount: number,
  delayBetween: number = 100,
  startDelay: number = 0
): boolean[] {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(itemCount).fill(false));

  useEffect(() => {
    // Initial delay before starting animations
    const initialTimer = setTimeout(() => {
      // Sequentially animate each item
      Array(itemCount).fill(0).forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => {
            const newArr = [...prev];
            newArr[index] = true;
            return newArr;
          });
        }, index * delayBetween);
      });
    }, startDelay);

    return () => clearTimeout(initialTimer);
  }, [itemCount, delayBetween, startDelay]);

  return visibleItems;
}

// Hook for staggered animations
export function useStaggeredAnimation(
  phases: number,
  itemsPerPhase: number,
  delayBetween: number = 150
): boolean[][] {
  const [visibleItems, setVisibleItems] = useState<boolean[][]>(
    Array(phases).fill(Array(itemsPerPhase).fill(false))
  );

  useEffect(() => {
    // Animate phases one after another
    Array(phases).fill(0).forEach((_, phaseIndex) => {
      setTimeout(() => {
        // Animate all items in this phase
        Array(itemsPerPhase).fill(0).forEach((_, itemIndex) => {
          setTimeout(() => {
            setVisibleItems(prev => {
              const newPhases = prev.map(phase => [...phase]);
              newPhases[phaseIndex][itemIndex] = true;
              return newPhases;
            });
          }, itemIndex * delayBetween);
        });
      }, phaseIndex * itemsPerPhase * delayBetween);
    });
  }, [phases, itemsPerPhase, delayBetween]);

  return visibleItems;
}
