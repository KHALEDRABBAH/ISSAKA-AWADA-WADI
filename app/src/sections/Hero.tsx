import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Particle: React.FC = () => {
  const style: React.CSSProperties = {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 15}s`,
    animationDuration: `${15 + Math.random() * 10}s`,
    opacity: 0.2 + Math.random() * 0.4,
    transform: `scale(${0.5 + Math.random() * 0.8})`,
  };

  return <div className="particle" style={style} />;
};

const Hero: React.FC = () => {
  const { t, direction } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.headline-word', {
        opacity: 0,
        y: 50,
        clipPath: 'inset(100% 0 0 0)',
      });
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(imageRef.current, { opacity: 0, scale: 1.1 });

      const entranceTl = gsap.timeline({ delay: 0.5 });

      entranceTl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'expo.out',
      });

      entranceTl.to('.headline-word', {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
        duration: 1,
        stagger: 0.2,
        ease: 'expo.out',
      }, '-=1.5');

      entranceTl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      }, '-=0.5');

      entranceTl.to(ctaRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      }, '-=0.3');

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set('.headline-word', {
            y: -progress * 100,
            opacity: 1 - progress * 0.5,
          });
          gsap.set(subtitleRef.current, {
            y: -progress * 150,
            opacity: 1 - progress * 0.8,
          });
          gsap.set(imageRef.current, {
            scale: 1 + progress * 0.15,
            filter: `brightness(${1 - progress * 0.4})`,
          });
          gsap.set(ctaRef.current, {
            opacity: 1 - progress * 2,
            y: -progress * 50,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = () => {
    const element = document.querySelector('#biography');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nameParts = t('hero.name').split(' ');

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div ref={particlesRef} className="particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <Particle key={i} />
        ))}
      </div>

      <div ref={imageRef} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/gallery/1.jpeg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-transparent to-dark/60" />
      </div>

      <div
        className={`relative z-10 text-center px-6 max-w-5xl mx-auto ${
          direction === 'rtl' ? 'font-arabic' : ''
        }`}
      >
        <div ref={headlineRef} className="mb-6">
          {nameParts.map((part: string, index: number) => (
            <h1
              key={index}
              className={`headline-word block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide ${
                index === nameParts.length - 1 ? 'text-gradient-gold' : 'text-white'
              }`}
              style={{
                textShadow: index === nameParts.length - 1
                  ? '0 0 40px rgba(201, 169, 98, 0.5)'
                  : '0 4px 30px rgba(0, 0, 0, 0.5)',
              }}
            >
              {part}
            </h1>
          ))}
        </div>

        <p
          ref={subtitleRef}
          className="text-white/70 text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase mb-12 font-light"
        >
          {t('hero.subtitle')}
        </p>

        <a
          ref={ctaRef}
          href="#biography"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection();
          }}
          className="btn-luxury inline-block"
        >
          {t('hero.cta')}
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gold/60" />
      </div>

      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
    </section>
  );
};

export default Hero;
