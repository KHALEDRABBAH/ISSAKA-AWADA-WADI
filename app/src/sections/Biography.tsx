import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Instagram, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Biography: React.FC = () => {
  const { t, direction } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade in
      gsap.set(contentRef.current, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'expo.out',
          });
        },
        once: true,
      });

      // Image reveal
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 1.05,
      });
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
          });
        },
        once: true,
      });

      // Contact links
      gsap.set('.bio-contact-link', { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to('.bio-contact-link', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'expo.out',
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <section
      id="biography"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Short Bio Content */}
        <div ref={contentRef} className="text-center mb-16">
          <span className="section-label block mb-4">
            {t('biography.label')}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl text-white mb-8">
            {t('biography.title')}
          </h2>
          <p className={`text-white/70 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto ${
            direction === 'rtl' ? 'font-arabic' : ''
          }`}>
            {t('biography.shortContent')}
          </p>

          {/* Signature */}
          <div className="mt-8 pt-6">
            <p className="font-display text-2xl italic text-gold">
              {t('biography.signature')}
            </p>
          </div>
        </div>

        {/* Premium Hero Image */}
        <div ref={imageRef} className="relative mb-16">
          <div className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-sm premium-image-container">
            <img
              src="/images/gallery/4.jpeg"
              alt="Issaka Awada Wadi - Premium Portrait"
              className="w-full h-full object-cover object-top"
              loading="eager"
              fetchPriority="high"
            />
            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-dark/10" />
            {/* Gold accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          </div>
          {/* Decorative corners */}
          <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold/30" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold/30" />
        </div>

        {/* Contact Links */}
        <div ref={contactRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Email */}
          <a
            href="mailto:Issakaawada@gmail.com"
            className="bio-contact-link group flex items-center gap-4 px-8 py-5 bg-dark-secondary/80 border border-white/10 rounded-sm hover:border-gold/50 hover:shadow-gold-lg transition-all duration-500"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #EA4335, #FBBC04)' }}
            >
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg text-white group-hover:text-gold transition-colors duration-300">
                {t('contact.emailLabel')}
              </h3>
              <p className="text-white/50 text-sm">Issakaawada@gmail.com</p>
            </div>
            <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-gold/60 transition-all duration-300 ml-2" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/issakaawadawadi1"
            target="_blank"
            rel="noopener noreferrer"
            className="bio-contact-link group flex items-center gap-4 px-8 py-5 bg-dark-secondary/80 border border-white/10 rounded-sm hover:border-gold/50 hover:shadow-gold-lg transition-all duration-500"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)' }}
            >
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg text-white group-hover:text-gold transition-colors duration-300">
                {t('contact.instagramLabel')}
              </h3>
              <p className="text-white/50 text-sm">@issakaawadawadi1</p>
            </div>
            <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-gold/60 transition-all duration-300 ml-2" />
          </a>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-gold/3 to-transparent pointer-events-none" />
    </section>
  );
};

export default Biography;
