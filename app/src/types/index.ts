// Language types
export type Language = 'en' | 'fr' | 'ar' | 'tr' | 'it';

export type LanguageDirection = 'ltr' | 'rtl';

export const languageDirection: Record<Language, LanguageDirection> = {
  en: 'ltr',
  fr: 'ltr',
  ar: 'rtl',
  tr: 'ltr',
  it: 'ltr',
};

// Translation interfaces
export interface NavigationTranslations {
  home: string;
  about: string;
  portfolio: string;
  gallery: string;
  contact: string;
}

export interface HeroTranslations {
  name: string;
  subtitle: string;
  cta: string;
}

export interface BiographyTranslations {
  label: string;
  title: string;
  shortContent: string;
  signature: string;
}

export interface CategoryItem {
  title: string;
  items: string[];
}

export interface CategoriesTranslations {
  label: string;
  title: string;
  films: CategoryItem;
  awards: CategoryItem;
  career: CategoryItem;
  festivals: CategoryItem;
  fashion: CategoryItem;
  media: CategoryItem;
}

export interface GalleryTranslations {
  label: string;
  title: string;
  loadMore: string;
  showLess: string;
  photos: string;
}

export interface ContactTranslations {
  label: string;
  title: string;
  email: string;
  emailLabel: string;
  instagramLabel: string;
  representation: string;
  representationText: string;
}

export interface FooterTranslations {
  copyright: string;
  backToTop: string;
}

export interface Translations {
  navigation: NavigationTranslations;
  hero: HeroTranslations;
  biography: BiographyTranslations;
  categories: CategoriesTranslations;
  gallery: GalleryTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
}

// Gallery image type
export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

// Social link type
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
