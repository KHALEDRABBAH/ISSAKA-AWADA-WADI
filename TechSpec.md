# Technical Specification - ISSAKA AWADA WADI Website

## Project Architecture

### Technology Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: GSAP + ScrollTrigger
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Inter, Noto Sans Arabic)

### Project Structure
```
app/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Navigation.tsx   # Fixed navbar with language switcher
│   │   ├── Hero.tsx         # Hero section with particles
│   │   ├── Biography.tsx    # Bio section with image
│   │   ├── Career.tsx       # Timeline section
│   │   ├── Awards.tsx       # Awards grid
│   │   ├── Gallery.tsx      # Photo gallery
│   │   ├── Presence.tsx     # International festivals
│   │   ├── Contact.tsx      # Contact section
│   │   └── Footer.tsx       # Footer
│   ├── hooks/
│   │   ├── useLanguage.ts   # Language context hook
│   │   ├── useScrollAnimation.ts  # GSAP scroll animations
│   │   └── useInView.ts     # Intersection observer hook
│   ├── context/
│   │   └── LanguageContext.tsx  # Language provider
│   ├── lib/
│   │   ├── translations.ts  # All translations (EN/FR/AR)
│   │   └── utils.ts         # Utility functions
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── styles/
│   │   └── globals.css      # Global styles + fonts
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/
│   └── images/              # Actor photos
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Multilingual System

### Language Configuration
```typescript
// Supported languages
type Language = 'en' | 'fr' | 'ar';

// Language direction
const languageDirection: Record<Language, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fr: 'ltr',
  ar: 'rtl'
};
```

### Translation Structure
```typescript
interface Translations {
  navigation: {
    home: string;
    biography: string;
    career: string;
    awards: string;
    gallery: string;
    contact: string;
  };
  hero: {
    name: string;
    subtitle: string;
    cta: string;
  };
  biography: {
    label: string;
    title: string;
    content: string[];
    signature: string;
  };
  career: {
    label: string;
    title: string;
    milestones: Array<{
      year: string;
      events: string[];
    }>;
  };
  awards: {
    label: string;
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  gallery: {
    label: string;
    title: string;
  };
  presence: {
    label: string;
    title: string;
    events: Array<{
      name: string;
      description: string;
    }>;
  };
  contact: {
    label: string;
    title: string;
    email: string;
    social: string;
    representation: string;
  };
  footer: {
    copyright: string;
  };
}
```

## Animation Implementation

### GSAP ScrollTrigger Setup
```typescript
// Main scroll animation hook
const useScrollAnimation = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh on load
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
};
```

### Section Animation Patterns

**Hero Section:**
- Pinned for 100vh
- Text stagger reveal on load
- Parallax on scroll
- Particle field (CSS-based for performance)

**Biography Section:**
- Image clip-path reveal
- Content card slide from right
- Text line-by-line stagger
- Signature draw-on effect

**Career Timeline:**
- Horizontal scroll on vertical scroll (pinned)
- SVG path draw animation
- Card 3D flip entrance
- Year marker pulse

**Awards Grid:**
- 3D card flip cascade
- Staggered entrance
- Hover 3D tilt effect
- Trophy icon bounce

**Gallery:**
- Masonry grid with offset
- Image scale reveal
- Hover cinematic zoom
- Lightbox functionality

## Component Specifications

### Navigation Component
```typescript
interface NavigationProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

// Features:
// - Fixed position with glassmorphism on scroll
// - Language dropdown with flags
// - Smooth scroll to sections
// - Mobile hamburger menu
```

### Hero Component
```typescript
interface HeroProps {
  translations: Translations['hero'];
}

// Features:
// - Full viewport height
// - Particle background (CSS)
// - Staggered text animation
// - Ken Burns background effect
// - CTA button with magnetic hover
```

### Language Switcher
```typescript
interface LanguageSwitcherProps {
  currentLang: Language;
  onChange: (lang: Language) => void;
}

// Languages:
// - English (EN)
// - French (FR)  
// - Arabic (عربي)

// Features:
// - Elegant dropdown
// - Smooth transition
// - RTL support for Arabic
```

## Styling System

### Tailwind Configuration
```javascript
// tailwind.config.js extensions
{
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A962',
          dark: '#B89752',
          light: '#E8D5A3'
        },
        dark: {
          DEFAULT: '#000000',
          secondary: '#111111',
          tertiary: '#1a1a1a'
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 4s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 169, 98, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 169, 98, 0.5)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  }
}
```

### CSS Custom Properties
```css
:root {
  /* Colors */
  --color-bg-primary: #000000;
  --color-bg-secondary: #111111;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #999999;
  --color-gold: #C9A962;
  --color-gold-dark: #B89752;
  
  /* Animation Easings */
  --ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-expo-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-dramatic: cubic-bezier(0.87, 0, 0.13, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Durations */
  --duration-fast: 300ms;
  --duration-medium: 600ms;
  --duration-slow: 1000ms;
  --duration-cinematic: 1500ms;
}
```

## Image Assets

### Photo Gallery Images (from uploaded files)
```
public/images/
├── hero.jpg              # Main hero portrait
├── bio.jpg               # Biography portrait
├── gallery-1.jpg         # Traditional attire
├── gallery-2.jpg         # Fashion shot
├── gallery-3.jpg         # Blue suit
├── gallery-4.jpg         # Additional shots...
└── ...
```

### Image Optimization
- Use WebP format with JPEG fallback
- Lazy loading for below-fold images
- Responsive srcset for different screen sizes
- Blur placeholder for loading state

## Performance Targets

### Loading Performance
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

### Runtime Performance
- 60fps animations
- < 16ms frame time
- Smooth scroll at all times
- No layout thrashing

### Bundle Size
- Initial JS: < 200KB gzipped
- Total resources: < 1MB
- Images optimized and lazy-loaded

## Accessibility

### Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion support
- High contrast mode

### Implementation
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Browser Support

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallbacks
- CSS Grid with flexbox fallback
- WebGL particles disabled on low-end devices
- Simplified animations on mobile

## Build Configuration

### Vite Config
```typescript
// vite.config.ts
export default {
  build: {
    target: 'es2020',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['gsap']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['gsap', 'lucide-react']
  }
};
```

## Deployment

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

### Output
- Static files in `dist/` directory
- Deploy to CDN or static hosting
- Ensure proper MIME types for fonts
