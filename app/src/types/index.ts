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
  biography: string;
  career: string;
  awards: string;
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
  content: string[];
  signature: string;
}

export interface CareerMilestone {
  year: string;
  events: string[];
}

export interface CareerTranslations {
  label: string;
  title: string;
  milestones: CareerMilestone[];
}

export interface AwardItem {
  title: string;
  description: string;
}

export interface AwardsTranslations {
  label: string;
  title: string;
  items: AwardItem[];
}

export interface GalleryTranslations {
  label: string;
  title: string;
}

export interface PresenceEvent {
  name: string;
  description: string;
}

export interface PresenceTranslations {
  label: string;
  title: string;
  events: PresenceEvent[];
}

export interface ContactTranslations {
  label: string;
  title: string;
  professional: string;
  social: string;
  representation: string;
  email: string;
}

export interface FooterTranslations {
  copyright: string;
}

export interface Translations {
  navigation: NavigationTranslations;
  hero: HeroTranslations;
  biography: BiographyTranslations;
  career: CareerTranslations;
  awards: AwardsTranslations;
  gallery: GalleryTranslations;
  presence: PresenceTranslations;
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

// Award type
export interface Award {
  year: string;
  title: string;
  organization: string;
  description: string;
}

// Film type
export interface Film {
  year: string;
  title: string;
  role: string;
  director?: string;
}

// Festival type
export interface Festival {
  year: string;
  name: string;
  location: string;
  description: string;
}
