import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { Film, Trophy, Star, MapPin, Crown, Tv, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categoryConfig = [
  { key: 'films', icon: Film, accent: '#E8D5A3' },
  { key: 'awards', icon: Trophy, accent: '#C9A962' },
  { key: 'career', icon: Star, accent: '#D4AF37' },
  { key: 'festivals', icon: MapPin, accent: '#E8D5A3' },
  { key: 'fashion', icon: Crown, accent: '#C9A962' },
  { key: 'media', icon: Tv, accent: '#D4AF37' },
] as const;

const Categories: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.set('.cat-header-label', { opacity: 0, y: 20 });
      gsap.set('.cat-header-title', { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.cat-header-label', {
            opacity: 1, y: 0, duration: 0.6, ease: 'expo.out',
          });
          gsap.to('.cat-header-title', {
            opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'expo.out',
          });
        },
        once: true,
      });

      // Cards stagger animation
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.set(card, { opacity: 0, y: 40, scale: 0.95 });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: index * 0.1,
              ease: 'expo.out',
            });
          },
          once: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #C9A962 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <span className="cat-header-label section-label block mb-4">
            {t('categories.label')}
          </span>
          <h2 className="cat-header-title font-display text-4xl lg:text-5xl text-white">
            {t('categories.title')}
          </h2>
        </div>

        {/* Category Cards Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {categoryConfig.map((cat, index) => {
            const Icon = cat.icon;
            const category = t(`categories.${cat.key}`) as { title: string; items: string[] };
            const isExpanded = expandedCard === cat.key;

            return (
              <div
                key={cat.key}
                ref={(el) => { if (el) cardRefs.current[index] = el; }}
                className="group"
              >
                <div
                  className={`category-card relative bg-dark-secondary/80 backdrop-blur-sm border border-white/10 rounded-sm overflow-hidden transition-all duration-500 cursor-pointer
                    ${isExpanded ? 'border-gold/50 shadow-gold-lg' : 'hover:border-gold/30 hover:-translate-y-1 hover:shadow-gold-lg'}
                  `}
                  onClick={() => setExpandedCard(isExpanded ? null : cat.key)}
                >
                  {/* Card Header */}
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center transition-all duration-300 group-hover:bg-gold/20"
                        >
                          <Icon className="w-6 h-6 text-gold" />
                        </div>
                        <h3 className="font-display text-xl lg:text-2xl text-white group-hover:text-gold transition-colors duration-300">
                          {category.title}
                        </h3>
                      </div>
                      {isExpanded && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setExpandedCard(null); }}
                          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Preview — show 2 items when collapsed */}
                    {!isExpanded && (
                      <div className="space-y-2">
                        {category.items.slice(0, 2).map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-2 flex-shrink-0" />
                            <span className="text-white/50 text-sm leading-relaxed line-clamp-1">{item}</span>
                          </div>
                        ))}
                        {category.items.length > 2 && (
                          <p className="text-gold/60 text-xs mt-2 tracking-wider uppercase">
                            +{category.items.length - 2} more
                          </p>
                        )}
                      </div>
                    )}

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="space-y-3 animate-fadeIn">
                        {category.items.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                            <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{ opacity: isExpanded ? 1 : undefined }}
                  />

                  {/* Decorative corners */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/0 group-hover:border-gold/30 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/0 group-hover:border-gold/30 transition-colors duration-500" />

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Categories;
