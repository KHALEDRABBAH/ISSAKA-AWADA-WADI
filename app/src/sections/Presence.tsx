import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Calendar, Film, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Presence: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const events = t('presence.events') as Array<{
    name: string;
    description: string;
  }>;

  const eventIcons = [Film, Calendar, Users, MapPin];
  const eventLocations = ['Paris, France', 'Lille, France', 'Tokyo, Japan', 'Various Locations'];
  const eventYears = ['2023', '2023', '2024', '2022-2024'];

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

      // Cards float up animation
      cardRefs.current.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          y: 50,
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'expo.out',
            });
          },
          once: true,
        });
      });

      // Location dots pulse
      gsap.to('.location-dot', {
        scale: 1.2,
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="presence"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark overflow-hidden"
    >
      {/* Subtle world map background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M150,200 Q200,150 250,200 T350,200 Q400,180 450,220 T550,200 Q600,160 650,200 T750,200 Q800,180 850,220"
            fill="none"
            stroke="#C9A962"
            strokeWidth="1"
          />
          {/* Simplified world map dots */}
          {[
            [200, 180], [250, 200], [300, 170], [350, 190], [400, 160],
            [450, 200], [500, 180], [550, 210], [600, 170], [650, 190],
            [700, 160], [750, 200], [800, 180], [850, 170], [150, 220],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" fill="#C9A962" />
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <span className="header-label section-label block mb-4">
            {t('presence.label')}
          </span>
          <h2 className="header-title font-display text-4xl lg:text-5xl text-white">
            {t('presence.title')}
          </h2>
        </div>

        {/* Events Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {events.map((event, index) => {
            const Icon = eventIcons[index % eventIcons.length];
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                className="group relative"
              >
                <div className="relative bg-dark-secondary/80 backdrop-blur-sm border border-white/10 p-6 lg:p-8 rounded-sm transition-all duration-500 hover:border-gold/50 hover:shadow-gold-lg hover:-translate-y-1 overflow-hidden">
                  {/* Location indicator */}
                  <div className="absolute top-6 right-6 flex items-center gap-2 text-white/40 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{eventLocations[index]}</span>
                  </div>

                  {/* Year badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 rounded-full mb-6">
                    <Calendar className="w-3 h-3 text-gold" />
                    <span className="text-gold text-sm font-medium">{eventYears[index]}</span>
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl lg:text-2xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
                    {event.name}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Decorative location dot */}
                  <div className="location-dot absolute bottom-4 right-4 w-3 h-3 rounded-full bg-gold/40" />

                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10+', label: currentLanguage === 'ar' ? 'سنوات خبرة' : currentLanguage === 'fr' ? 'Années d\'expérience' : 'Years Experience' },
            { value: '15+', label: currentLanguage === 'ar' ? 'مشاريع' : currentLanguage === 'fr' ? 'Projets' : 'Projects' },
            { value: '6', label: currentLanguage === 'ar' ? 'جوائز' : currentLanguage === 'fr' ? 'Prix' : 'Awards' },
            { value: '4', label: currentLanguage === 'ar' ? 'قارات' : currentLanguage === 'fr' ? 'Continents' : 'Continents' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-4xl lg:text-5xl text-gradient-gold mb-2">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Presence;
