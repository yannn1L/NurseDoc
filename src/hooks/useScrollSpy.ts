import { useState, useEffect } from 'react';
import { Section } from '../types';

export function useScrollSpy(sections: Section[]) {
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));

    return () => {
      targets.forEach((t) => observer.unobserve(t));
    };
  }, [sections]);

  const scrollToSection = (secId: string) => {
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSectionId(secId);
    }
  };

  return { activeSectionId, scrollToSection };
}
