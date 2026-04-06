import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useScrollAnimation = () => {
  const refresh = () => {
    ScrollTrigger.refresh();
  };

  const killAll = () => {
    ScrollTrigger.getAll().forEach(st => st.kill());
  };

  return { refresh, killAll };
};

export const useScrollTrigger = (
  animationCallback: (tl: gsap.core.Timeline, trigger: Element) => void,
  options: ScrollAnimationOptions = {}
) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger || triggerRef.current,
        start: options.start || 'top 80%',
        end: options.end || 'bottom 20%',
        scrub: options.scrub || false,
        pin: options.pin || false,
        markers: options.markers || false,
        toggleActions: options.toggleActions || 'play none none none',
        onEnter: options.onEnter,
        onLeave: options.onLeave,
      },
    });

    timelineRef.current = tl;
    animationCallback(tl, triggerRef.current);

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter(st => st.trigger === triggerRef.current)
        .forEach(st => st.kill());
    };
  }, []);

  return triggerRef;
};

export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const st = ScrollTrigger.create({
      trigger: elementRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (elementRef.current) {
          const yPos = self.progress * 100 * speed;
          gsap.set(elementRef.current, { y: yPos });
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [speed]);

  return elementRef;
};

export const useFadeInUp = (delay: number = 0) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.set(elementRef.current, { opacity: 0, y: 30 });

    const st = ScrollTrigger.create({
      trigger: elementRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(elementRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'expo.out',
        });
      },
      once: true,
    });

    return () => {
      st.kill();
    };
  }, [delay]);

  return elementRef;
};

export const useStaggerChildren = (staggerDelay: number = 0.1) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.children;
    gsap.set(children, { opacity: 0, y: 30 });

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: staggerDelay,
          ease: 'expo.out',
        });
      },
      once: true,
    });

    return () => {
      st.kill();
    };
  }, [staggerDelay]);

  return containerRef;
};
