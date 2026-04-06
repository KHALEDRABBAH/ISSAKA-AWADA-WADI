import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/types';

const Navigation: React.FC = () => {
  const { currentLanguage, direction, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'ar', label: 'عربي', flag: '🇸🇦' },
    { code: 'tr', label: 'TR', flag: '🇹🇷' },
    { code: 'it', label: 'IT', flag: '🇮🇹' },
  ];

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'biography', href: '#biography' },
    { key: 'career', href: '#career' },
    { key: 'awards', href: '#awards' },
    { key: 'gallery', href: '#gallery' },
    { key: 'contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Add glassmorphism after 100px
      setIsScrolled(currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      // Get the nav height for offset
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      
      // For biography, scroll to the bio-content anchor for proper positioning on mobile
      if (targetId === 'biography') {
        const bioContent = document.getElementById('bio-content');
        if (bioContent && window.innerWidth < 1024) {
          const bioContentPosition = bioContent.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: bioContentPosition - navHeight - 20,
            behavior: 'smooth',
          });
          setIsMobileMenuOpen(false);
          return;
        }
      }
      
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass py-4'
            : 'bg-transparent py-6'
        } ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="font-display text-2xl font-bold text-gold tracking-[0.2em] hover:opacity-80 transition-opacity"
            >
              IAW
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="link-underline text-white/80 hover:text-gold text-sm font-medium tracking-wide transition-colors duration-300"
                >
                  {t(`navigation.${item.key}`)}
                </a>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-sm text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {languages.find((l) => l.code === currentLanguage)?.label}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isLangDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Language Dropdown */}
              {isLangDropdownOpen && (
                <div
                  className={`absolute top-full mt-2 ${
                    direction === 'rtl' ? 'left-0' : 'right-0'
                  } bg-dark-secondary border border-gold/30 rounded-sm overflow-hidden min-w-[140px] shadow-gold`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gold/10 transition-colors duration-300 ${
                        currentLanguage === lang.code
                          ? 'bg-gold/20 border-l-2 border-gold'
                          : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span
                        className={`text-sm ${
                          currentLanguage === lang.code
                            ? 'text-gold font-medium'
                            : 'text-white/80'
                        }`}
                      >
                        {lang.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gold p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-dark/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-20 left-0 right-0 p-6 ${
            direction === 'rtl' ? 'text-right' : 'text-left'
          }`}
        >
          <div className="space-y-6">
            {navItems.map((item, index) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="block text-2xl font-display text-white hover:text-gold transition-colors duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {t(`navigation.${item.key}`)}
              </a>
            ))}
          </div>

          {/* Mobile Language Switcher */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <p className="text-white/50 text-sm mb-4">{t('navigation.language') || 'Language'}</p>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-4 py-2 border rounded-sm text-sm transition-all duration-300 ${
                    currentLanguage === lang.code
                      ? 'border-gold bg-gold text-dark font-medium'
                      : 'border-white/20 text-white hover:border-gold/50'
                  }`}
                >
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
