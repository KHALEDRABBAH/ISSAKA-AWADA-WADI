import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// GALLERY IMAGES — All 54, strict order 1 through 54
// Professional captions based on outfit, setting & appearance
// ============================================================
interface GalleryImage {
  src: string;
  index: number;
  caption: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { index: 1,  caption: 'Classic Tan Double-Breasted Suit',              alt: 'Issaka in a distinguished tan double-breasted suit with gold buttons' },
  { index: 2,  caption: 'Contemporary Coral Tailoring',                  alt: 'Issaka in a bold coral double-breasted suit with white shirt' },
  { index: 3,  caption: 'Premium Studio Portrait',                      alt: 'A refined studio portrait in a tan double-breasted suit' },
  { index: 4,  caption: 'Brown Corduroy Elegance',                      alt: 'A sophisticated look featuring a brown corduroy double-breasted suit' },
  { index: 5,  caption: 'Effortless Studio Style',                      alt: 'Relaxed studio shoot in a classic white shirt and tan trousers' },
  { index: 6,  caption: 'Bold Plaid Three-Piece Ensemble',              alt: 'A sharp three-piece plaid suit with a vibrant blue striped shirt' },
  { index: 7,  caption: 'Minimalist Winter Noir',                       alt: 'A textured black coat with matching scarf and beanie' },
  { index: 8,  caption: 'Parisian Travel Style — Eiffel Tower',         alt: 'Coordinated peach-toned tracksuit against the Eiffel Tower backdrop' },
  { index: 9,  caption: 'Elegant Traditional Agbada',                   alt: 'Light blue Agbada with intricate gold embroidery and kufi cap' },
  { index: 10, caption: 'Urban Casual Graphic Tee',                     alt: 'Relaxed everyday style in a pale yellow graphic t-shirt' },
  { index: 11, caption: 'Salmon Double-Breasted Statement',             alt: 'A striking salmon-colored suit with gold buttons and dark-rimmed eyewear' },
  { index: 12, caption: 'Relaxed Linen Studio Portrait',                alt: 'Light beige linen shirt in an elegant studio setting' },
  { index: 13, caption: 'Camel Suit & Blue Tie Formal',                 alt: 'Timeless camel-colored suit with a crisp white shirt and blue tie' },
  { index: 14, caption: 'Airport Fashion — Travel Chic',                alt: 'Chocolate brown suit with a grey turtleneck and modern sneakers' },
  { index: 15, caption: 'Blue Checked Three-Piece Suit',                alt: 'Contemporary business elegance in a tailored checked waistcoat and trousers' },
  { index: 16, caption: 'Orange Turtleneck & Blazer Layering',          alt: 'Vibrant orange turtleneck under a dark blazer amid lush greenery' },
  { index: 17, caption: 'Sophisticated Winter Casual',                  alt: 'Black textured coat with a beanie and scarf — studio portrait' },
  { index: 18, caption: 'Coral Suit — Velvet Chair Portrait',           alt: 'Sharp coral double-breasted suit seated in a luxurious velvet chair' },
  { index: 19, caption: 'Gold Damask Evening Blazer',                   alt: 'Ornate gold and bronze damask blazer with black lapels' },
  { index: 20, caption: 'Mediterranean Summer Style',                   alt: 'Royal blue trousers with a white tank top in a lush garden setting' },
  { index: 21, caption: 'Tan Wool Overcoat — Urban Portrait',           alt: 'Sophisticated tan overcoat with a patterned tie — close-up' },
  { index: 23, caption: 'Casual Polo & Denim',                          alt: 'White polo with dark green collar and light blue jeans outdoors' },
  { index: 24, caption: 'Off-White Suit — Evening Lounge',              alt: 'Light beige suit with sunglasses in a high-end lounge setting' },
  { index: 25, caption: 'Event Presentation — Formal Host',             alt: 'White dress shirt with a tailored vest at a professional event' },
  { index: 26, caption: 'Velvet Blazer — Gala Ready',                   alt: 'Dark green velvet blazer over a black button-down shirt' },
  { index: 27, caption: 'Coastal Linen — Summer Ease',                  alt: 'Light blue linen shirt with beige chinos for a seaside look' },
  { index: 28, caption: 'Modern Business — Open Collar',                alt: 'Charcoal grey suit with an open-collar white shirt' },
  { index: 29, caption: 'Balenciaga Street Style — La Défense',         alt: 'Grey Balenciaga logo sweater with coral trousers in Paris' },
  { index: 30, caption: 'Navy Suit — Red Carpet Elegance',              alt: 'Sharp navy blue suit with a crisp shirt and patterned tie' },
  { index: 31, caption: 'Classic Leather Jacket Edge',                  alt: 'Black leather jacket over a white crew neck t-shirt' },
  { index: 32, caption: 'Majestic Overcoat — Pamukkale Terraces',       alt: 'Beige trench overcoat on the white travertine terraces of Pamukkale' },
  { index: 33, caption: 'All-Black Turtleneck & Blazer',                alt: 'Minimalist black turtleneck with a sharp black blazer' },
  { index: 34, caption: 'Designer Street Style — Urban Setting',        alt: 'Balenciaga sweater with coral trousers against Parisian skyline' },
  { index: 35, caption: 'Casual Graphic Tee — Indoor',                  alt: 'Deep blue graphic t-shirt with a red-accented sports watch' },
  { index: 36, caption: 'Layered Overcoat — Café Portrait',             alt: 'Beige overcoat over a brown cardigan and green textured tie' },
  { index: 37, caption: 'Crisp White Shirt — Dynamic Studio',           alt: 'Clean white button-down with beige trousers in motion' },
  { index: 38, caption: 'Caramel Double-Breasted — Formal Evening',     alt: 'Caramel tan suit with gold buttons in a refined atmosphere' },
  { index: 39, caption: 'Golden Hour — Pamukkale Overlook',             alt: 'Beige overcoat at the Pamukkale salt hills during golden hour' },
  { index: 40, caption: 'Vibrant Coral — Contemporary Formal',          alt: 'Bold coral double-breasted suit with warm indoor lighting' },
  { index: 41, caption: 'Blue Waistcoat & Checkered Trousers',          alt: 'Polished semi-formal look with glasses on an indoor staircase' },
  { index: 42, caption: 'Designer Overcoat — Pamukkale Close-Up',       alt: 'Beige trench overcoat with editorial styling at Pamukkale' },
  { index: 43, caption: 'Casual at the Pyramids of Giza',               alt: 'White jumper with green collar and denim jeans at the Great Pyramid' },
  { index: 44, caption: 'Minimalist Studio Portrait',                   alt: 'Professional portrait in a charcoal grey t-shirt' },
  { index: 45, caption: 'Parisian Casual — Louvre Pyramid',             alt: 'All-black ensemble standing before the iconic Louvre Pyramid' },
  { index: 46, caption: 'Designer Trench — Editorial Fashion',          alt: 'Long beige trench coat with architectural pocket detailing' },
  { index: 47, caption: 'Desert Explorer — Giza Skyline',               alt: 'Light blue denim jacket at the Great Pyramids of Giza' },
  { index: 48, caption: 'Red Carpet Gala — Classic Black Tie',          alt: 'Timeless black suit with white shirt and bow tie' },
  { index: 49, caption: 'Relaxed Bistro — Everyday Luxury',             alt: 'Casual black t-shirt in a relaxed restaurant setting' },
  { index: 50, caption: 'Avant-Garde Streetwear — Eiffel Tower',        alt: 'Beige tracksuit with overcoat and statement sunglasses in Paris' },
  { index: 51, caption: 'Dramatic Studio — Noir Portrait',              alt: 'Textured black designer coat in a dramatic dark studio' },
  { index: 52, caption: 'Minimalist Grey Turtleneck — Studio',          alt: 'Clean grey turtleneck in a bright studio environment' },
  { index: 53, caption: 'Monochrome Loungewear — Studio Fashion',       alt: 'Coordinated grey sweatshirt and trousers in a minimalist studio' },
  { index: 54, caption: 'Artistic Designer Shirt — Studio',             alt: 'White designer shirt with intricate artistic patterns' },
].map(img => ({
  ...img,
  src: `/images/gallery/${img.index}.jpeg`,
}));

const TOTAL = galleryImages.length; // 54 images
const EAGER_COUNT = 6;

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

  // ── Infinite‑loop scroll handling ─────────────────────────
  // We clone a set of images at beginning and end to create
  // the illusion of infinite scrolling
  const CLONE_COUNT = 8; // number of images cloned on each side

  // Build the extended list: [...last N] + [...original] + [...first N]
  const extendedImages = [
    ...galleryImages.slice(-CLONE_COUNT).map((img, i) => ({ ...img, key: `clone-end-${i}` })),
    ...galleryImages.map((img, i) => ({ ...img, key: `original-${i}` })),
    ...galleryImages.slice(0, CLONE_COUNT).map((img, i) => ({ ...img, key: `clone-start-${i}` })),
  ];

  const getCardWidth = () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 310);
  const getGap = () => 16; // gap-4

  // Jump to start of real content on mount
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const setInitialScroll = () => {
      const cardW = getCardWidth() + getGap();
      slider.scrollLeft = CLONE_COUNT * cardW;
    };
    // Set immediately
    setInitialScroll();
    // Re-set after rAF and a short delay to ensure layout is stable
    requestAnimationFrame(setInitialScroll);
    const timer = setTimeout(setInitialScroll, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle infinite loop: when scrolling past clones, jump back
  const handleInfiniteScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardW = getCardWidth() + getGap();
    const cloneWidth = CLONE_COUNT * cardW;
    const totalRealWidth = TOTAL * cardW;

    // If scrolled past the end clones -> jump to start of real section
    if (slider.scrollLeft >= cloneWidth + totalRealWidth) {
      slider.scrollLeft = cloneWidth + (slider.scrollLeft - cloneWidth - totalRealWidth);
    }
    // If scrolled before the start clones -> jump to end of real section
    if (slider.scrollLeft < cloneWidth - cardW) {
      slider.scrollLeft = cloneWidth + totalRealWidth + (slider.scrollLeft - cloneWidth);
    }
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.addEventListener('scroll', handleInfiniteScroll, { passive: true });
    return () => slider.removeEventListener('scroll', handleInfiniteScroll);
  }, [handleInfiniteScroll]);

  // ── GSAP entrance ────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
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

  // ── Mouse‑drag for desktop ──────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setDragMoved(false);
    setDragStartX(e.pageX - sliderRef.current.offsetLeft);
    setDragScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
    sliderRef.current.style.scrollSnapType = 'none';
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
      sliderRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  // ── Arrow scroll (always enabled for infinite loop) ─────
  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const cardWidth = getCardWidth();
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // ── Lightbox ─────────────────────────────────────────────
  const openLightbox = (realIndex: number) => {
    if (dragMoved) return;
    setSelectedImage(realIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  const navigateLightbox = useCallback((dir: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const next = dir === 'next'
      ? (selectedImage + 1) % TOTAL
      : (selectedImage - 1 + TOTAL) % TOTAL;
    setSelectedImage(next);
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateLightbox]);

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

        </div>

        {/* ── Navigation arrows (always enabled) ─────── */}
        <div className="hidden md:flex justify-end gap-3 px-6 lg:px-8 max-w-7xl mx-auto mb-6">
          <button
            onClick={() => scrollSlider('left')}
            className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 border-gold/50 text-gold hover:bg-gold/10 hover:border-gold"
            aria-label="Scroll gallery left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollSlider('right')}
            className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 border-gold/50 text-gold hover:bg-gold/10 hover:border-gold"
            aria-label="Scroll gallery right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ── Horizontal slider (infinite) ─────────────── */}
        <div
          ref={sliderRef}
          className="gallery-slider flex gap-4 overflow-x-auto px-6 lg:px-8 pb-6 cursor-grab select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {extendedImages.map((image, idx) => {
            // Calculate the real index in galleryImages for lightbox
            const realIndex = idx < CLONE_COUNT
              ? TOTAL - CLONE_COUNT + idx
              : idx >= CLONE_COUNT + TOTAL
                ? idx - CLONE_COUNT - TOTAL
                : idx - CLONE_COUNT;

            return (
              <div
                key={image.key}
                className="gallery-card group flex-shrink-0 relative overflow-hidden rounded-lg cursor-pointer"
                style={{
                  width: typeof window !== 'undefined' && window.innerWidth < 768 ? '260px' : '310px',
                  scrollSnapAlign: 'start',
                }}
                onClick={() => openLightbox(realIndex)}
              >
                <div
                  className="relative overflow-hidden rounded-lg aspect-[3/4]"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading={idx < EAGER_COUNT ? 'eager' : 'lazy'}
                    decoding={idx < EAGER_COUNT ? 'sync' : 'async'}
                    draggable={false}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Add a cache buster and retry once
                      if (!target.dataset.retried) {
                        target.dataset.retried = 'true';
                        target.src = image.src + '?t=' + Date.now();
                      } else {
                        target.style.display = 'none';
                      }
                    }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/0 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Hover zoom icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="w-14 h-14 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center mb-3 border border-gold/40">
                      <ZoomIn className="w-6 h-6 text-gold" />
                    </div>
                  </div>

                  {/* Bottom caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark/90 to-transparent">
                    <p className="text-white/90 text-xs font-medium tracking-wide leading-relaxed">
                      {image.caption}
                    </p>
                  </div>

                  {/* Subtle border */}
                  <div className="absolute inset-0 border border-white/5 rounded-lg group-hover:border-gold/30 transition-colors duration-500" />
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

          {/* Counter & Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10 max-w-md">
            <p className="text-white text-sm font-medium mb-1">
              {galleryImages[selectedImage].caption}
            </p>
            <p className="text-white/40 text-xs">
              {selectedImage + 1} / {TOTAL}
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
