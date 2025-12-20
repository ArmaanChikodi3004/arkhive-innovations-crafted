import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return { gsap, ScrollTrigger };
};

export const useRevealAnimation = (selector: string, options?: gsap.TweenVars) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
      gsap.fromTo(el, 
        { 
          opacity: 0, 
          y: 60,
          ...options?.from 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          ...options?.to,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector, options]);
};

export const useStaggerAnimation = (containerSelector: string, childSelector: string) => {
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const children = container.querySelectorAll(childSelector);

    gsap.fromTo(children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [containerSelector, childSelector]);
};

export { gsap, ScrollTrigger };
