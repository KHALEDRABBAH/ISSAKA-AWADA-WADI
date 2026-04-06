import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { Film } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Career: React.FC = () => {
  const { t, direction } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const milestones = t('career.milestones') as Array<{
    year: string;
    events: string[];
  }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.set('.header-label', { opacity: 0, y: 20 });
      gsap.set('.header-title', { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.header-label', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'expo.out',
          });
          gsap.to('.header-title', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'expo.out',
          });
        },
        once: true,
      });

      // Timeline line draw animation
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.set(timelineLine, { scaleY: 0, transformOrigin: 'top' });
        
        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(timelineLine, {
              scaleY: 1,
              duration: 2,
              ease: 'expo.out',
            });
          },
          once: true,
        });
      }

      // Card animations
      cardRefs.current.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          x: direction === 'rtl' ? 50 : -50,
          rotateY: direction === 'rtl' ? -15 : 15,
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'expo.out',
            });
          },
          once: true,
        });
      });

      // Year marker animations
      gsap.set('.year-marker', { scale: 0, opacity: 0 });
      
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.to('.year-marker', {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'elastic.out(1, 0.5)',
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <section
      id="career"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-secondary to-dark pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <span className="header-label section-label block mb-4">
            {t('career.label')}
          </span>
          <h2 className="header-title font-display text-4xl lg:text-5xl text-white">
            {t('career.title')}
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block">
            <div className="timeline-line absolute inset-0 bg-gradient-to-b from-gold via-gold/50 to-gold/20" />
          </div>

          {/* Timeline Cards */}
          <div className="space-y-12 lg:space-y-0">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 0 ? '' : 'lg:direction-rtl'
                }`}
              >
                {/* Year Marker */}
                <div className="year-marker absolute left-1/2 top-0 -translate-x-1/2 hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-dark-secondary border-2 border-gold z-10">
                  <span className="text-gold font-display text-lg font-bold">
                    {milestone.year}
                  </span>
                </div>

                {/* Card Content */}
                <div
                  className={`lg:col-span-1 ${
                    index % 2 === 0
                      ? direction === 'rtl'
                        ? 'lg:col-start-2'
                        : 'lg:col-start-1 lg:text-right lg:pr-20'
                      : direction === 'rtl'
                      ? 'lg:col-start-1 lg:text-right lg:pr-20'
                      : 'lg:col-start-2 lg:pl-20'
                  }`}
                >
                  <div className="card-luxury hover:shadow-gold-lg transition-shadow duration-500">
                    {/* Mobile Year */}
                    <div className="lg:hidden flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                        <Film className="w-5 h-5 text-gold" />
                      </div>
                      <span className="text-gold font-display text-xl font-bold">
                        {milestone.year}
                      </span>
                    </div>

                    {/* Events */}
                    <ul className="space-y-3">
                      {milestone.events.map((event, eventIndex) => (
                        <li
                          key={eventIndex}
                          className="flex items-start gap-3 text-white/80"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div
                  className={`hidden lg:block lg:col-span-1 ${
                    index % 2 === 0
                      ? direction === 'rtl'
                        ? 'lg:col-start-1'
                        : 'lg:col-start-2'
                      : direction === 'rtl'
                      ? 'lg:col-start-2'
                      : 'lg:col-start-1'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Career;
