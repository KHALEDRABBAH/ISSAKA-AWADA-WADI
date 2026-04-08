import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from '@/context/LanguageContext';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Biography from '@/sections/Biography';
import Categories from '@/sections/Categories';
import Gallery from '@/sections/Gallery';
import Footer from '@/sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    gsap.defaults({
      ease: 'expo.out',
      duration: 0.8,
    });

    ScrollTrigger.refresh();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-dark text-white overflow-x-hidden">
        {/* Global scroll progress bar */}
        <ScrollProgressBar />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>
          <Hero />
          <Biography />
          <Categories />
          <Gallery />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

// Scroll Progress Bar Component
const ScrollProgressBar: React.FC = () => {
  useEffect(() => {
    const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
    
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent">
      <div className="scroll-progress h-full bg-gradient-to-r from-gold via-gold-light to-gold w-0" />
    </div>
  );
};

export default App;
