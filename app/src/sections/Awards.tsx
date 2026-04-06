import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { Trophy, Star, Award, Medal, Crown, Gem } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  'Best Actor': Trophy,
  'Rising Star': Star,
  'Cultural Ambassador': Award,
  'Fashion Icon': Crown,
  'Best International Actor': Medal,
  'Lifetime Achievement': Gem,
};

const Awards: React.FC = () => {
  const { t, direction } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const awards = t('awards.items') as Array<{
    title: string;
    description: string;
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

      // Card 3D flip cascade
      cardRefs.current.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          rotateY: direction === 'rtl' ? 90 : -90,
          transformPerspective: 1000,
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              rotateY: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'expo.out',
            });
          },
          once: true,
        });
      });

      // Icon bounce animation
      gsap.set('.award-icon', { scale: 0 });
      
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to('.award-icon', {
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.5,
            ease: 'elastic.out(1, 0.5)',
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [direction, awards.length]);

  const getIconForAward = (title: string) => {
    for (const key of Object.keys(iconMap)) {
      if (title.includes(key)) {
        return iconMap[key];
      }
    }
    return Trophy;
  };

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #C9A962 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <span className="header-label section-label block mb-4">
            {t('awards.label')}
          </span>
          <h2 className="header-title font-display text-4xl lg:text-5xl text-white">
            {t('awards.title')}
          </h2>
        </div>

        {/* Awards Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {awards.map((award, index) => {
            const Icon = getIconForAward(award.title);
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                className="group perspective-1000"
                style={{
                  marginTop: index % 3 === 1 ? '2rem' : index % 3 === 2 ? '1rem' : 0,
                }}
              >
                <div className="relative bg-dark-secondary border border-white/10 p-6 lg:p-8 rounded-sm transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-gold-lg group-hover:-translate-y-2 preserve-3d">
                  {/* Icon */}
                  <div className="award-icon mb-6">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
                    {award.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {award.description}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/0 group-hover:border-gold/40 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/0 group-hover:border-gold/40 transition-colors duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Awards;
