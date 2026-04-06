import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Biography: React.FC = () => {
  const { t, direction } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.set(imageRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        scale: 1.1,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(imageRef.current, {
            clipPath: 'inset(0 0% 0 0)',
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
          });
        },
        once: true,
      });

      // Content card slide in
      gsap.set(contentRef.current, {
        x: direction === 'rtl' ? -100 : 100,
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.to(contentRef.current, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            ease: 'expo.out',
          });
        },
        once: true,
      });

      // Label typewriter effect
      gsap.set(labelRef.current, { opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 55%',
        onEnter: () => {
          gsap.to(labelRef.current, {
            opacity: 1,
            duration: 0.4,
            delay: 0.5,
          });
        },
        once: true,
      });

      // Title word stagger
      gsap.set('.bio-title-word', { y: 30, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 50%',
        onEnter: () => {
          gsap.to('.bio-title-word', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.6,
            ease: 'expo.out',
          });
        },
        once: true,
      });

      // Body text line reveal
      textRefs.current.forEach((ref, index) => {
        gsap.set(ref, { y: 20, opacity: 0 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 45%',
          onEnter: () => {
            gsap.to(ref, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.8 + index * 0.15,
              ease: 'smooth',
            });
          },
          once: true,
        });
      });

      // Signature draw-on effect
      gsap.set(signatureRef.current, { opacity: 0, x: -20 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 40%',
        onEnter: () => {
          gsap.to(signatureRef.current, {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 1.2,
            ease: 'expo.out',
          });
        },
        once: true,
      });

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(imageRef.current, {
            y: (progress - 0.5) * 50,
          });
          gsap.set(contentRef.current, {
            y: (0.5 - progress) * 30,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [direction]);

  const bioContent = t('biography.content') as string[];
  const titleWords = t('biography.title').split(' ');

  return (
    <section
      id="biography"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-8 lg:gap-0 items-center ${
            direction === 'rtl' ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Bio Photo - Priority Image with enhanced presentation */}
          <div
            ref={imageRef}
            className={`relative ${direction === 'rtl' ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden bio-photo-container">
              <img
                src="/images/bio-main.jpg"
                alt="Issaka Awada Wadi - Biography Portrait"
                className="w-full h-full object-cover object-top"
                loading="eager"
                fetchPriority="high"
              />
              {/* Premium gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-dark/10" />
              {/* Gold accent glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            </div>
            
            {/* Decorative frame with gold accent */}
            <div className="absolute -inset-4 border border-gold/20 pointer-events-none" />
            <div className={`absolute -bottom-4 ${direction === 'rtl' ? '-right-4' : '-left-4'} w-24 h-24 border-b-2 border-l-2 border-gold/40`} 
              style={{ borderLeftWidth: direction === 'rtl' ? 0 : '2px', borderRightWidth: direction === 'rtl' ? '2px' : 0, 
                       right: direction === 'rtl' ? '-1rem' : 'auto', left: direction === 'rtl' ? 'auto' : '-1rem' }} />
          </div>

          {/* Content Card with scroll anchor for mobile */}
          <div
            id="bio-content"
            ref={contentRef}
            className={`relative ${direction === 'rtl' ? 'lg:order-1 lg:-mr-20' : 'lg:order-2 lg:-ml-20'} z-10`}
          >
            <div className="card-luxury bg-dark-secondary/95 backdrop-blur-sm">
              {/* Section Label */}
              <span ref={labelRef} className="section-label block mb-4">
                {t('biography.label')}
              </span>

              {/* Title */}
              <h2 ref={titleRef} className="font-display text-3xl lg:text-4xl text-white mb-8">
                {titleWords.map((word: string, index: number) => (
                  <span key={index} className="bio-title-word inline-block mr-3">
                    {word}
                  </span>
                ))}
              </h2>

              {/* Body Text */}
              <div className="space-y-4 mb-8">
                {bioContent.map((paragraph, index) => (
                  <p
                    key={index}
                    ref={(el) => {
                      if (el) textRefs.current[index] = el;
                    }}
                    className="text-white/70 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Signature */}
              <div
                ref={signatureRef}
                className="pt-6 border-t border-white/10"
              >
                <p className="font-display text-2xl italic text-gold">
                  {t('biography.signature')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default Biography;
