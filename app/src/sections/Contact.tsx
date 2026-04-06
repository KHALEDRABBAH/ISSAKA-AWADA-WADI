import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Instagram, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/issakaawadawadi1',
    color: '#E4405F',
    gradient: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    handle: '@issakaawadawadi1',
  },
  {
    name: 'Gmail',
    icon: Mail,
    url: 'mailto:Issakaawada@gmail.com',
    color: '#EA4335',
    gradient: 'linear-gradient(135deg, #EA4335, #FBBC04)',
    handle: 'Issakaawada@gmail.com',
  },
];

const Contact: React.FC = () => {
  const { t, direction, currentLanguage } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.set('.contact-header-label', { opacity: 0, y: 20 });
      gsap.set('.contact-header-title', { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.contact-header-label', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'expo.out',
          });
          gsap.to('.contact-header-title', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'expo.out',
          });
        },
        once: true,
      });

      // Image reveal
      gsap.set(imageRef.current, {
        clipPath: direction === 'rtl' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.to(imageRef.current, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'expo.out',
          });
        },
        once: true,
      });

      // Content slide in
      gsap.set(contentRef.current, {
        x: direction === 'rtl' ? -100 : 100,
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 55%',
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

      // Contact cards pop in
      gsap.set('.contact-card', { scale: 0.9, opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to('.contact-card', {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.5,
            ease: 'expo.out',
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [direction]);

  const getRepresentationText = () => {
    switch (currentLanguage) {
      case 'ar':
        return 'للاستفسارات الإعلامية والشراكات التجارية، يرجى التواصل عبر وسائل الاتصال أعلاه.';
      case 'fr':
        return 'Pour les demandes de presse et les partenariats commerciaux, veuillez nous contacter via les moyens ci-dessus.';
      case 'tr':
        return 'Basın soruları ve ticari ortaklıklar için lütfen yukarıdaki iletişim yollarıyla bize ulaşın.';
      case 'it':
        return 'Per richieste stampa e partnership commerciali, contattateci tramite i canali sopra indicati.';
      default:
        return 'For press inquiries and commercial partnerships, please reach out through the contact methods above.';
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <span className="contact-header-label section-label block mb-4">
            {t('contact.label')}
          </span>
          <h2 className="contact-header-title font-display text-4xl lg:text-5xl text-white">
            {t('contact.title')}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Contact Photo - Priority Image */}
          <div
            ref={imageRef}
            className={`relative ${direction === 'rtl' ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm contact-photo-container">
              <img
                src="/images/contact-main.jpg"
                alt="Issaka Awada Wadi - Contact"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              {/* Premium overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/20" />
              {/* Gold accent glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className={`absolute -bottom-6 ${direction === 'rtl' ? '-right-6' : '-left-6'} w-48 h-48 border border-gold/30 rounded-sm`} />
            <div className={`absolute -top-6 ${direction === 'rtl' ? '-left-6' : '-right-6'} w-32 h-32 bg-gold/10 rounded-sm`} />
          </div>

          {/* Contact Info */}
          <div
            ref={contentRef}
            className={`${direction === 'rtl' ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="space-y-6">
              {/* Instagram Card */}
              <a
                href={contactLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card group block card-luxury hover:border-l-[3px] hover:border-[#E4405F] transition-all duration-500"
              >
                <div className="flex items-center gap-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: contactLinks[0].gradient }}
                  >
                    <Instagram className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl text-white mb-1 group-hover:text-gold transition-colors duration-300">
                      Instagram
                    </h3>
                    <p className="text-white/60 text-sm truncate group-hover:text-white/80 transition-colors duration-300">
                      {contactLinks[0].handle}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-gold/60 transition-all duration-300 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>

              {/* Gmail Card */}
              <a
                href={contactLinks[1].url}
                className="contact-card group block card-luxury hover:border-l-[3px] hover:border-[#EA4335] transition-all duration-500"
              >
                <div className="flex items-center gap-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: contactLinks[1].gradient }}
                  >
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl text-white mb-1 group-hover:text-gold transition-colors duration-300">
                      Gmail
                    </h3>
                    <p className="text-white/60 text-sm truncate group-hover:text-white/80 transition-colors duration-300">
                      {contactLinks[1].handle}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-gold/60 transition-all duration-300 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>

              {/* Representation Info */}
              <div className="contact-card card-luxury">
                <h3 className="font-display text-xl text-white mb-4">
                  {t('contact.representation')}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {getRepresentationText()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Contact;
