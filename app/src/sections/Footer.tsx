import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { Instagram, Mail, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'biography', href: '#biography' },
    { key: 'career', href: '#career' },
    { key: 'awards', href: '#awards' },
    { key: 'gallery', href: '#gallery' },
    { key: 'contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Instagram, url: 'https://www.instagram.com/issakaawadawadi1', label: 'Instagram' },
    { icon: Mail, url: 'mailto:Issakaawada@gmail.com', label: 'Gmail' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Divider line draw
      gsap.set('.footer-divider', { scaleX: 0 });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.to('.footer-divider', {
            scaleX: 1,
            duration: 0.8,
            ease: 'expo.out',
          });
        },
        once: true,
      });

      // Logo fade in
      gsap.set('.footer-logo', { opacity: 0, scale: 0.8 });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to('.footer-logo', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.2,
            ease: 'expo.out',
          });
        },
        once: true,
      });

      // Links stagger
      gsap.set('.footer-link', { opacity: 0 });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.footer-link', {
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            delay: 0.3,
            ease: 'smooth',
          });
        },
        once: true,
      });

      // Social icons pop
      gsap.set('.footer-social', { scale: 0 });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to('.footer-social', {
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.5,
            ease: 'elastic.out(1, 0.5)',
          });
        },
        once: true,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getBackToTopText = () => {
    switch (currentLanguage) {
      case 'ar': return 'العودة إلى الأعلى';
      case 'fr': return 'Retour en haut';
      case 'tr': return 'Yukarıya dön';
      case 'it': return 'Torna su';
      default: return 'Back to top';
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-12 lg:py-16 bg-dark overflow-hidden"
    >
      {/* Divider */}
      <div className="footer-divider absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="footer-logo">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="font-display text-3xl font-bold text-gold tracking-[0.2em] hover:opacity-80 transition-opacity"
            >
              IAW
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="footer-link text-white/60 hover:text-gold text-sm transition-colors duration-300 link-underline"
              >
                {t(`navigation.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target={social.url.startsWith('mailto') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="footer-social w-10 h-10 rounded-full bg-dark-secondary border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/50 hover:rotate-12 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            {t('footer.copyright')}
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/40 hover:text-gold text-sm transition-colors duration-300"
          >
            <span>{getBackToTopText()}</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </footer>
  );
};

export default Footer;
