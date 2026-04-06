import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// GALLERY IMAGES — Ordered by priority (1 = highest)
// To add more images, simply append to this array.
// ============================================================
const galleryImages = [
  // === PRIORITY 1–2: Hero shots — largest cards, gold borders, eager load ===
  { src: '/images/bio-main.jpg', alt: 'Elegant Brown Suit Portrait', category: 'Portrait' },
  { src: '/images/contact-main.jpg', alt: 'Coral Suit Seated Portrait', category: 'Portrait' },

  // === PRIORITY 3–5: Key fashion/editorial (Session 1 uploads) ===
  { src: '/images/gallery-new-2.jpg', alt: 'Orange Suit Standing', category: 'Fashion' },
  { src: '/images/gallery-new-1.jpg', alt: 'White Shirt Studio', category: 'Studio' },
  { src: '/images/gallery-new-3.jpg', alt: 'Dynamic Artistic Pose', category: 'Art' },

  // === PRIORITY 6–10: New session uploads ===
  { src: '/images/gallery-new-4.jpg', alt: 'Red Carpet Premiere', category: 'Events' },
  { src: '/images/gallery-new-5.jpg', alt: 'Airport Travel Style', category: 'Lifestyle' },
  { src: '/images/gallery-new-6.jpg', alt: 'Black Tee Studio', category: 'Studio' },
  { src: '/images/gallery-new-7.jpg', alt: 'Grey Turtleneck Close-up', category: 'Portrait' },
  { src: '/images/gallery-new-8.jpg', alt: 'Grey Turtleneck Portrait', category: 'Portrait' },

  // === PRIORITY 11–15: Professional studio shots (DSC series) ===
  { src: '/images/DSC09005.jpg.jpeg', alt: 'Grey Seated Studio', category: 'Studio' },
  { src: '/images/DSC09054.jpg.jpeg', alt: 'Elegant Studio Portrait', category: 'Portrait' },
  { src: '/images/DSC09017.jpg.jpeg', alt: 'Studio Session', category: 'Studio' },
  { src: '/images/DSC09021.jpg.jpeg', alt: 'Fashion Editorial', category: 'Fashion' },
  { src: '/images/DSC09023.jpg.jpeg', alt: 'Studio Close-up', category: 'Studio' },

  // === PRIORITY 16–20: More studio and editorial ===
  { src: '/images/DSC09040.jpg.jpeg', alt: 'Artistic Studio Shot', category: 'Studio' },
  { src: '/images/DSC08917.jpg.jpeg', alt: 'Dramatic Lighting', category: 'Portrait' },
  { src: '/images/DSC08923.jpg.jpeg', alt: 'Contemplative Pose', category: 'Portrait' },
  { src: '/images/DSC08933.jpg.jpeg', alt: 'Dramatic Look', category: 'Portrait' },
  { src: '/images/DSC08946.jpg.jpeg', alt: 'Fashion Studio Pose', category: 'Fashion' },

  // === PRIORITY 21–25: Professional camera shots ===
  { src: '/images/2Z3A5160.jpg.jpeg', alt: 'Traditional Attire', category: 'Fashion' },
  { src: '/images/2Z3A5164.jpg.jpeg', alt: 'Elegant Style', category: 'Fashion' },
  { src: '/images/2Z3A5191.jpg.jpeg', alt: 'Full Body Editorial', category: 'Fashion' },
  { src: '/images/2Z3A6773.JPG.jpeg', alt: 'Formal Wear', category: 'Fashion' },
  { src: '/images/2Z3A6786.JPG.jpeg', alt: 'Formal Portrait', category: 'Fashion' },

  // === PRIORITY 26–30: Professional editorial (2Z3A + DSC_) ===
  { src: '/images/2Z3A0411.jpg.jpeg', alt: 'Couple Editorial', category: 'Editorial' },
  { src: '/images/DSC_6517 (1).JPG.jpeg', alt: 'Professional Session', category: 'Portrait' },
  { src: '/images/DSC_0773.JPG.jpeg', alt: 'Natural Light Portrait', category: 'Portrait' },
  { src: '/images/DSC_0828.JPG.jpeg', alt: 'Professional Headshot', category: 'Portrait' },
  { src: '/images/DSC_7952 (1).JPG.jpeg', alt: 'Classic Portrait', category: 'Portrait' },

  // === PRIORITY 31–35: Additional DSC series ===
  { src: '/images/DSC_7971 (1).JPG.jpeg', alt: 'Outdoor Portrait', category: 'Portrait' },
  { src: '/images/DSC_8039.JPG.jpeg', alt: 'Camera-ready Pose', category: 'Portrait' },
  { src: '/images/DSC_8818.JPG.jpeg', alt: 'Blue Tone Portrait', category: 'Fashion' },
  { src: '/images/DSC_8903.JPG.jpeg', alt: 'Blue Suit Elegance', category: 'Fashion' },
  { src: '/images/1.jpg.jpeg', alt: 'Brown Suit — Wide Angle', category: 'Fashion' },

  // === PRIORITY 36–40: Numbered collection ===
  { src: '/images/4-1.jpg.jpeg', alt: 'Fashion Moment', category: 'Fashion' },
  { src: '/images/9.jpg.jpeg', alt: 'Signature Style', category: 'Fashion' },
  { src: '/images/11.jpg.jpeg', alt: 'Editorial Highlight', category: 'Editorial' },
  { src: '/images/13 (1).jpg.jpeg', alt: 'Stylish Composition', category: 'Fashion' },
  { src: '/images/14 (1).jpg.jpeg', alt: 'Casual Elegance', category: 'Fashion' },

  // === PRIORITY 41–45 ===
  { src: '/images/19.jpg.jpeg', alt: 'Fashion Forward', category: 'Fashion' },
  { src: '/images/28.jpg.jpeg', alt: 'Movement Study', category: 'Art' },
  { src: '/images/29.jpg.jpeg', alt: 'Dynamic Frame', category: 'Art' },
  { src: '/images/31.jpg.jpeg', alt: 'Composition Study', category: 'Art' },
  { src: '/images/40-1.jpg.jpeg', alt: 'Bold Fashion', category: 'Fashion' },

  // === PRIORITY 46–50: Timestamped personal photos ===
  { src: '/images/20260405_161158.jpg.jpeg', alt: 'Latest Session 2026', category: 'Latest' },
  { src: '/images/20260405_162646.jpg.jpeg', alt: 'Modern Portrait 2026', category: 'Latest' },
  { src: '/images/20260405_162705.jpg.jpeg', alt: 'Fresh Look 2026', category: 'Latest' },
  { src: '/images/20260302_220454.jpg.jpeg', alt: 'Spring Collection', category: 'Fashion' },
  { src: '/images/20260302_223211.jpg.jpeg', alt: 'Evening Attire', category: 'Fashion' },

  // === PRIORITY 51–56: More personal / early career ===
  { src: '/images/20260211_221707.jpg.jpeg', alt: 'Winter Style', category: 'Fashion' },
  { src: '/images/20260211_221744.jpg.jpeg', alt: 'Sophisticated Look', category: 'Fashion' },
  { src: '/images/20240327_132150.jpg.jpeg', alt: 'Travel Diary', category: 'Lifestyle' },
  { src: '/images/20231230_082249 (1).jpg.jpeg', alt: 'Year-End Celebration', category: 'Events' },
  { src: '/images/20191231_220800.jpg.jpeg', alt: 'The Beginning', category: 'Archive' },
  { src: '/images/20191201_222613.jpg.jpeg', alt: 'Early Career', category: 'Archive' },
];

// Number of truly "priority" images that get special visual treatment
const TOP_PRIORITY_COUNT = 2;
// First N images load eagerly (above-the-fold)
const EAGER_LOAD_COUNT = 6;

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragScrollLeft, setDragScrollLeft] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ── Scroll button state ──────────────────────────────────
  const updateScrollButtons = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.addEventListener('scroll', updateScrollButtons, { passive: true });
    updateScrollButtons();
    // Recheck after images settle
    const timer = setTimeout(updateScrollButtons, 500);
    return () => {
      slider.removeEventListener('scroll', updateScrollButtons);
      clearTimeout(timer);
    };
  }, [updateScrollButtons]);

  // ── GSAP section-entrance animations ─────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.set('.gallery-header-label', { opacity: 0, y: 20 });
      gsap.set('.gallery-header-title', { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.gallery-header-label', {
            opacity: 1, y: 0, duration: 0.6, ease: 'expo.out',
          });
          gsap.to('.gallery-header-title', {
            opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'expo.out',
          });
        },
        once: true,
      });

      // First visible batch of cards (animate only first ~8 so it doesn't feel excessive)
      const firstCards = sliderRef.current?.querySelectorAll('.gallery-card:nth-child(-n+8)');
      if (firstCards) {
        gsap.set(firstCards, { opacity: 0, y: 30, scale: 0.95 });
        ScrollTrigger.create({
          trigger: sliderRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(firstCards, {
              opacity: 1, y: 0, scale: 1,
              duration: 0.6, stagger: 0.06, ease: 'expo.out',
            });
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Mouse-drag for desktop ───────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setDragMoved(false);
    setDragStartX(e.pageX - sliderRef.current.offsetLeft);
    setDragScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
    sliderRef.current.style.scrollSnapType = 'none'; // disable snap while dragging
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - dragStartX) * 1.5;
    if (Math.abs(walk) > 5) setDragMoved(true);
    sliderRef.current.scrollLeft = dragScrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
      sliderRef.current.style.scrollSnapType = 'x mandatory'; // re-enable snap
    }
  };

  // ── Arrow button scroll ──────────────────────────────────
  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const cardWidth = window.innerWidth < 768 ? 280 : 340;
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // ── Lightbox ─────────────────────────────────────────────
  const openLightbox = (index: number) => {
    if (dragMoved) return;            // ignore if user was dragging
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (dir: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const next = dir === 'next'
      ? (selectedImage + 1) % galleryImages.length
      : (selectedImage - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(next);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // ── Helpers ──────────────────────────────────────────────
  /** Returns CSS width for a card depending on its priority index */
  const getCardWidth = (index: number): string => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (index < TOP_PRIORITY_COUNT) return isMobile ? '310px' : '380px';
    return isMobile ? '250px' : '300px';
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark overflow-hidden"
    >
      <div className="relative">
        {/* ── Header ──────────────────────────────────── */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16 px-6 lg:px-8">
          <span className="gallery-header-label section-label block mb-4">
            {t('gallery.label')}
          </span>
          <h2 className="gallery-header-title font-display text-4xl lg:text-5xl text-white">
            {t('gallery.title')}
          </h2>
          <p className="mt-3 text-white/40 text-sm tracking-wider">
            {galleryImages.length} photos
          </p>
        </div>

        {/* ── Navigation arrows ───────────────────────── */}
        <div className="hidden md:flex justify-end gap-3 px-6 lg:px-8 max-w-7xl mx-auto mb-6">
          <button
            onClick={() => scrollSlider('left')}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'border-gold/50 text-gold hover:bg-gold/10 hover:border-gold'
                : 'border-white/10 text-white/20 cursor-not-allowed'
            }`}
            aria-label="Scroll gallery left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollSlider('right')}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'border-gold/50 text-gold hover:bg-gold/10 hover:border-gold'
                : 'border-white/10 text-white/20 cursor-not-allowed'
            }`}
            aria-label="Scroll gallery right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ── Horizontal slider ───────────────────────── */}
        <div
          ref={sliderRef}
          className="gallery-slider flex gap-4 overflow-x-auto px-6 lg:px-8 pb-6 cursor-grab select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {galleryImages.map((image, index) => {
            const isPriority = index < TOP_PRIORITY_COUNT;
            return (
              <div
                key={index}
                className={`gallery-card group flex-shrink-0 relative overflow-hidden rounded-lg cursor-pointer ${
                  isPriority ? 'gallery-card-priority' : ''
                }`}
                style={{
                  width: getCardWidth(index),
                  scrollSnapAlign: 'start',
                }}
                onClick={() => openLightbox(index)}
              >
                <div
                  className="relative overflow-hidden rounded-lg aspect-[3/4]"
                  style={{
                    boxShadow: isPriority
                      ? '0 8px 32px rgba(201, 169, 98, 0.15), 0 2px 8px rgba(0,0,0,0.3)'
                      : '0 4px 16px rgba(0,0,0,0.3)',
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading={index < EAGER_LOAD_COUNT ? 'eager' : 'lazy'}
                    decoding={index < EAGER_LOAD_COUNT ? 'sync' : 'async'}
                    draggable={false}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/0 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Hover zoom icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="w-14 h-14 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center mb-3 border border-gold/40">
                      <ZoomIn className="w-6 h-6 text-gold" />
                    </div>
                    <span className="text-white text-sm font-medium tracking-wide text-center px-4">
                      {image.alt}
                    </span>
                    <span className="text-gold/80 text-xs mt-1 tracking-widest uppercase">
                      {image.category}
                    </span>
                  </div>

                  {/* Priority pulse dot */}
                  {isPriority && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse shadow-lg shadow-gold/50" />
                    </div>
                  )}

                  {/* Bottom info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark/90 to-transparent">
                    <p className="text-white/90 text-sm font-medium truncate">{image.alt}</p>
                    <p className="text-gold/60 text-xs mt-0.5">{image.category}</p>
                  </div>

                  {/* Gold border for priority images */}
                  {isPriority && (
                    <div className="absolute inset-0 border-2 border-gold/30 rounded-lg group-hover:border-gold/60 transition-colors duration-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile swipe hint */}
        <div className="md:hidden flex justify-center gap-1 mt-4 px-6">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <ChevronLeft className="w-3 h-3" />
            <span>Swipe to explore</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────── */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-xl"
          onClick={closeLightbox}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <img
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="max-w-[85vw] max-h-[85vh] object-contain rounded-sm"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          />

          {/* Counter + caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10">
            <p className="text-white text-sm font-medium mb-1">
              {galleryImages[selectedImage].alt}
            </p>
            <p className="text-white/40 text-xs">
              {selectedImage + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-gold/20 to-transparent" />
    </section>
  );
};

export default Gallery;
