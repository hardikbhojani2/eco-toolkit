
import { useEffect, useState } from 'react';

export const useFadeIn = (delay = 0, duration = 0.3) => {
  return {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        delay: delay,
        duration: duration,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
};

export const useSlideIn = (direction = 'up', delay = 0, duration = 0.4) => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  };
  
  return {
    initial: { ...directions[direction as keyof typeof directions], opacity: 0 },
    animate: { 
      ...(direction === 'up' || direction === 'down' ? { y: 0 } : { x: 0 }),
      opacity: 1,
      transition: { 
        delay: delay,
        duration: duration,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
};

export const useScaleIn = (delay = 0, duration = 0.3) => {
  return {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: { 
        delay: delay,
        duration: duration,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
};

export const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return { ref: setRef, isInView };
};
