import type { Translations, Language } from '@/types';

export const translations: Record<Language, Translations> = {
  en: {
    navigation: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    hero: {
      name: 'ISSAKA AWADA WADI',
      subtitle: 'International Actor | Award Winner | Public Figure',
      cta: 'Explore My Journey',
    },
    biography: {
      label: 'About',
      title: 'The Journey of a Storyteller',
      shortContent: 'Born on February 2, 2000, in Guera, Chad, Issaka Awada Wadi is an international actor and cultural ambassador. From the heart of Africa to the world\'s most prestigious stages, his journey is a testament to talent, passion, and the universal language of cinema.',
      signature: 'Issaka Awada Wadi',
    },
    categories: {
      label: 'Portfolio',
      title: 'Career Highlights',
      films: {
        title: 'Films',
        items: [
          'Manager (2019) — First major role in Togo',
          'Promesse Familiale (2019) — International debut with French director Frédéric',
          '21 Lettre de Samir (2020) — Documentary appearance',
          'One Week to Make Star (2021) — Starring role with Adjetey Anang',
          'My Short Timed Welfare (2022) — Lead role',
          'MY Buzness (2022) — Multiple projects',
        ],
      },
      awards: {
        title: 'Awards',
        items: [
          'Best Actor — African Film Festival 2023',
          'Rising Star Award — Paris Ciné 2023',
          'Cultural Ambassador Recognition — 2024',
          'Fashion Icon Award — Tokyo Fashion Week 2024',
          'Best International Actor — West African Film Awards 2022',
          'Lifetime Achievement Honor — Chad National Awards 2024',
        ],
      },
      career: {
        title: 'Career Journey',
        items: [
          'Theater studies at UBLT University, Togo',
          'Marketing & Finance specialization',
          'First international film role in 2019',
          'Chad\'s cinema ambassador on the global stage',
          'Represented Chad at prestigious international festivals',
          'Cultural bridge between Africa and the world',
        ],
      },
      festivals: {
        title: 'Festivals',
        items: [
          'Paris Ciné 2023 — International film festival',
          'Séries Mania 2023 — Television showcase',
          'Rakuten Fashion Week Tokyo 2024',
          'African Film Festivals — Continental appearances',
        ],
      },
      fashion: {
        title: 'Fashion Appearances',
        items: [
          'Rakuten Fashion Week Tokyo 2024 — Fashion icon recognition',
          'International style ambassador',
          'Cultural fashion representation',
          'Signature elegant style on red carpets',
        ],
      },
      media: {
        title: 'Media Presence',
        items: [
          'International press and media coverage',
          'Film industry panel participations',
          'Cultural exchange ambassador',
          'Emerging African cinema advocate',
        ],
      },
    },
    gallery: {
      label: 'Gallery',
      title: 'Photo Gallery',
      loadMore: 'Load More',
      showLess: 'Show Less',
      photos: 'photos',
    },
    contact: {
      label: 'Connect',
      title: 'Get In Touch',
      email: 'Issakaawada@gmail.com',
      emailLabel: 'Email',
      instagramLabel: 'Instagram',
      representation: 'Representation',
      representationText: 'For press inquiries and commercial partnerships, please reach out through the contact methods above.',
    },
    footer: {
      copyright: '© 2024 Issaka Awada Wadi. All rights reserved.',
      backToTop: 'Back to top',
    },
  },

  fr: {
    navigation: {
      home: 'Accueil',
      about: 'À Propos',
      portfolio: 'Portfolio',
      gallery: 'Galerie',
      contact: 'Contact',
    },
    hero: {
      name: 'ISSAKA AWADA WADI',
      subtitle: 'Acteur International | Lauréat | Personnalité Publique',
      cta: 'Explorer Mon Parcours',
    },
    biography: {
      label: 'À Propos',
      title: 'Le Parcours d\'un Conteur',
      shortContent: 'Né le 2 février 2000 au Guera, Tchad, Issaka Awada Wadi est un acteur international et ambassadeur culturel. Du cœur de l\'Afrique aux scènes les plus prestigieuses du monde, son parcours témoigne du talent, de la passion et du langage universel du cinéma.',
      signature: 'Issaka Awada Wadi',
    },
    categories: {
      label: 'Portfolio',
      title: 'Points Forts de Carrière',
      films: {
        title: 'Films',
        items: [
          'Manager (2019) — Premier rôle majeur au Togo',
          'Promesse Familiale (2019) — Début international avec le réalisateur français Frédéric',
          '21 Lettre de Samir (2020) — Apparition documentaire',
          'One Week to Make Star (2021) — Rôle principal avec Adjetey Anang',
          'My Short Timed Welfare (2022) — Rôle principal',
          'MY Buzness (2022) — Multiples projets',
        ],
      },
      awards: {
        title: 'Récompenses',
        items: [
          'Meilleur Acteur — Festival du Film Africain 2023',
          'Prix Étoile Montante — Paris Ciné 2023',
          'Reconnaissance Ambassadeur Culturel — 2024',
          'Prix Icône de Mode — Tokyo Fashion Week 2024',
          'Meilleur Acteur International — West African Film Awards 2022',
          'Honneur de Carrière — Prix Nationaux du Tchad 2024',
        ],
      },
      career: {
        title: 'Parcours',
        items: [
          'Études théâtrales à l\'Université UBLT, Togo',
          'Spécialisation en Marketing et Finance',
          'Premier rôle international en 2019',
          'Ambassadeur du cinéma tchadien sur la scène mondiale',
          'Représentation du Tchad dans les festivals internationaux',
          'Pont culturel entre l\'Afrique et le monde',
        ],
      },
      festivals: {
        title: 'Festivals',
        items: [
          'Paris Ciné 2023 — Festival international du film',
          'Séries Mania 2023 — Showcase télévisuel',
          'Rakuten Fashion Week Tokyo 2024',
          'Festivals du Film Africain — Apparitions continentales',
        ],
      },
      fashion: {
        title: 'Mode',
        items: [
          'Rakuten Fashion Week Tokyo 2024 — Reconnaissance icône de mode',
          'Ambassadeur de style international',
          'Représentation culturelle de la mode',
          'Style élégant signature sur les tapis rouges',
        ],
      },
      media: {
        title: 'Médias',
        items: [
          'Couverture presse et médias internationaux',
          'Participation aux panels de l\'industrie cinématographique',
          'Ambassadeur d\'échange culturel',
          'Défenseur du cinéma africain émergent',
        ],
      },
    },
    gallery: {
      label: 'Galerie',
      title: 'Galerie Photo',
      loadMore: 'Voir Plus',
      showLess: 'Voir Moins',
      photos: 'photos',
    },
    contact: {
      label: 'Connecter',
      title: 'Restez en Contact',
      email: 'Issakaawada@gmail.com',
      emailLabel: 'Email',
      instagramLabel: 'Instagram',
      representation: 'Représentation',
      representationText: 'Pour les demandes de presse et les partenariats commerciaux, veuillez nous contacter via les moyens ci-dessus.',
    },
    footer: {
      copyright: '© 2024 Issaka Awada Wadi. Tous droits réservés.',
      backToTop: 'Retour en haut',
    },
  },

  ar: {
    navigation: {
      home: 'الرئيسية',
      about: 'نبذة',
      portfolio: 'أعمال',
      gallery: 'معرض',
      contact: 'اتصال',
    },
    hero: {
      name: 'إسّاكا أوادا وادي',
      subtitle: 'ممثل دولي | حائز على جوائز | شخصية عامة',
      cta: 'استكشف رحلتي',
    },
    biography: {
      label: 'نبذة',
      title: 'رحلة راوي القصص',
      shortContent: 'وُلد إسّاكا أوادا وادي في الثاني من فبراير عام 2000 في غويرا، تشاد. وهو ممثل دولي وسفير ثقافي. من قلب أفريقيا إلى أرقى مسارح العالم، رحلته شهادة على الموهبة والشغف ولغة السينما العالمية.',
      signature: 'إسّاكا أوادا وادي',
    },
    categories: {
      label: 'أعمال',
      title: 'أبرز المحطات',
      films: {
        title: 'الأفلام',
        items: [
          'Manager (2019) — أول دور رئيسي في توغو',
          'Promesse Familiale (2019) — البداية الدولية مع المخرج الفرنسي فريدريك',
          '21 Lettre de Samir (2020) — ظهور وثائقي',
          'One Week to Make Star (2021) — دور البطولة مع أدجيتي أنانغ',
          'My Short Timed Welfare (2022) — دور رئيسي',
          'MY Buzness (2022) — مشاريع متعددة',
        ],
      },
      awards: {
        title: 'الجوائز',
        items: [
          'أفضل ممثل — مهرجان السينما الأفريقية 2023',
          'جائزة النجم الصاعد — باريس سيني 2023',
          'تقدير السفير الثقافي — 2024',
          'جائزة أيقونة الأزياء — أسبوع الموضة طوكيو 2024',
          'أفضل ممثل دولي — جوائز السينما غرب أفريقيا 2022',
          'تكريم الإنجاز — جوائز تشاد الوطنية 2024',
        ],
      },
      career: {
        title: 'المسيرة',
        items: [
          'دراسة المسرح في جامعة UBLT، توغو',
          'تخصص في التسويق والمالية',
          'أول دور سينمائي دولي في 2019',
          'سفير السينما التشادية على المسرح العالمي',
          'تمثيل تشاد في المهرجانات الدولية المرموقة',
          'جسر ثقافي بين أفريقيا والعالم',
        ],
      },
      festivals: {
        title: 'المهرجانات',
        items: [
          'باريس سيني 2023 — مهرجان السينما الدولي',
          'سيريز مانيا 2023 — عرض تلفزيوني',
          'أسبوع راكوتين للموضة طوكيو 2024',
          'مهرجانات السينما الأفريقية — ظهورات قارية',
        ],
      },
      fashion: {
        title: 'الأزياء',
        items: [
          'أسبوع راكوتين للموضة طوكيو 2024 — أيقونة أزياء',
          'سفير الأناقة الدولي',
          'التمثيل الثقافي في الموضة',
          'أسلوب أنيق مميز على السجادة الحمراء',
        ],
      },
      media: {
        title: 'الإعلام',
        items: [
          'تغطية صحفية وإعلامية دولية',
          'المشاركة في لجان صناعة السينما',
          'سفير التبادل الثقافي',
          'مناصر السينما الأفريقية الصاعدة',
        ],
      },
    },
    gallery: {
      label: 'معرض',
      title: 'معرض الصور',
      loadMore: 'عرض المزيد',
      showLess: 'عرض أقل',
      photos: 'صور',
    },
    contact: {
      label: 'تواصل',
      title: 'كن على تواصل',
      email: 'Issakaawada@gmail.com',
      emailLabel: 'البريد الإلكتروني',
      instagramLabel: 'إنستغرام',
      representation: 'التمثيل',
      representationText: 'للاستفسارات الإعلامية والشراكات التجارية، يرجى التواصل عبر وسائل الاتصال أعلاه.',
    },
    footer: {
      copyright: '© 2024 إسّاكا أوادا وادي. جميع الحقوق محفوظة.',
      backToTop: 'العودة إلى الأعلى',
    },
  },

  tr: {
    navigation: {
      home: 'Ana Sayfa',
      about: 'Hakkında',
      portfolio: 'Portföy',
      gallery: 'Galeri',
      contact: 'İletişim',
    },
    hero: {
      name: 'ISSAKA AWADA WADI',
      subtitle: 'Uluslararası Aktör | Ödüllü | Tanınmış Kişilik',
      cta: 'Yolculuğumu Keşfet',
    },
    biography: {
      label: 'Hakkında',
      title: 'Bir Hikâye Anlatıcısının Yolculuğu',
      shortContent: '2 Şubat 2000\'de Çad\'ın Guera bölgesinde doğan Issaka Awada Wadi, uluslararası bir aktör ve kültürel elçidir. Afrika\'nın kalbinden dünyanın en prestijli sahnelerine uzanan yolculuğu, yetenek, tutku ve sinemanın evrensel dilinin bir kanıtıdır.',
      signature: 'Issaka Awada Wadi',
    },
    categories: {
      label: 'Portföy',
      title: 'Kariyer Öne Çıkanlar',
      films: {
        title: 'Filmler',
        items: [
          'Manager (2019) — Togo\'daki ilk büyük rol',
          'Promesse Familiale (2019) — Fransız yönetmen Frédéric ile uluslararası çıkış',
          '21 Lettre de Samir (2020) — Belgesel görünümü',
          'One Week to Make Star (2021) — Adjetey Anang ile başrol',
          'My Short Timed Welfare (2022) — Başrol',
          'MY Buzness (2022) — Çoklu projeler',
        ],
      },
      awards: {
        title: 'Ödüller',
        items: [
          'En İyi Aktör — Afrika Film Festivali 2023',
          'Yükselen Yıldız Ödülü — Paris Ciné 2023',
          'Kültürel Elçi Tanınırlığı — 2024',
          'Moda İkonu Ödülü — Tokyo Moda Haftası 2024',
          'En İyi Uluslararası Aktör — Batı Afrika Film Ödülleri 2022',
          'Yaşam Boyu Başarı Onuru — Çad Ulusal Ödülleri 2024',
        ],
      },
      career: {
        title: 'Kariyer Yolculuğu',
        items: [
          'UBLT Üniversitesi\'nde tiyatro eğitimi, Togo',
          'Pazarlama ve Finans uzmanlığı',
          '2019\'da ilk uluslararası film rolü',
          'Çad sinemasının dünya sahnesindeki elçisi',
          'Prestijli uluslararası festivallerde Çad temsilcisi',
          'Afrika ile dünya arasında kültürel köprü',
        ],
      },
      festivals: {
        title: 'Festivaller',
        items: [
          'Paris Ciné 2023 — Uluslararası film festivali',
          'Séries Mania 2023 — Televizyon gösterisi',
          'Rakuten Fashion Week Tokyo 2024',
          'Afrika Film Festivalleri — Kıtasal görünümler',
        ],
      },
      fashion: {
        title: 'Moda',
        items: [
          'Rakuten Fashion Week Tokyo 2024 — Moda ikonu tanınırlığı',
          'Uluslararası stil elçisi',
          'Kültürel moda temsili',
          'Kırmızı halıda imza zarif stil',
        ],
      },
      media: {
        title: 'Medya Varlığı',
        items: [
          'Uluslararası basın ve medya haberleri',
          'Film endüstrisi panel katılımları',
          'Kültürel değişim elçisi',
          'Gelişmekte olan Afrika sinemasının savunucusu',
        ],
      },
    },
    gallery: {
      label: 'Galeri',
      title: 'Fotoğraf Galerisi',
      loadMore: 'Daha Fazla',
      showLess: 'Daha Az',
      photos: 'fotoğraf',
    },
    contact: {
      label: 'Bağlantı',
      title: 'İletişime Geçin',
      email: 'Issakaawada@gmail.com',
      emailLabel: 'E-posta',
      instagramLabel: 'Instagram',
      representation: 'Temsil',
      representationText: 'Basın soruları ve ticari ortaklıklar için lütfen yukarıdaki iletişim yollarıyla bize ulaşın.',
    },
    footer: {
      copyright: '© 2024 Issaka Awada Wadi. Tüm hakları saklıdır.',
      backToTop: 'Yukarıya dön',
    },
  },

  it: {
    navigation: {
      home: 'Home',
      about: 'Chi Sono',
      portfolio: 'Portfolio',
      gallery: 'Galleria',
      contact: 'Contatto',
    },
    hero: {
      name: 'ISSAKA AWADA WADI',
      subtitle: 'Attore Internazionale | Vincitore di Premi | Personaggio Pubblico',
      cta: 'Esplora il Mio Percorso',
    },
    biography: {
      label: 'Chi Sono',
      title: 'Il Viaggio di un Narratore',
      shortContent: 'Nato il 2 febbraio 2000 a Guera, Ciad, Issaka Awada Wadi è un attore internazionale e ambasciatore culturale. Dal cuore dell\'Africa ai palcoscenici più prestigiosi del mondo, il suo viaggio è una testimonianza di talento, passione e del linguaggio universale del cinema.',
      signature: 'Issaka Awada Wadi',
    },
    categories: {
      label: 'Portfolio',
      title: 'Momenti Salienti della Carriera',
      films: {
        title: 'Film',
        items: [
          'Manager (2019) — Primo ruolo importante in Togo',
          'Promesse Familiale (2019) — Debutto internazionale con il regista francese Frédéric',
          '21 Lettre de Samir (2020) — Apparizione documentaristica',
          'One Week to Make Star (2021) — Ruolo da protagonista con Adjetey Anang',
          'My Short Timed Welfare (2022) — Ruolo principale',
          'MY Buzness (2022) — Progetti multipli',
        ],
      },
      awards: {
        title: 'Premi',
        items: [
          'Miglior Attore — Festival del Cinema Africano 2023',
          'Premio Stella Nascente — Paris Ciné 2023',
          'Riconoscimento Ambasciatore Culturale — 2024',
          'Premio Icona di Moda — Tokyo Fashion Week 2024',
          'Miglior Attore Internazionale — West African Film Awards 2022',
          'Onore alla Carriera — Premi Nazionali del Ciad 2024',
        ],
      },
      career: {
        title: 'Percorso Professionale',
        items: [
          'Studi teatrali all\'Università UBLT, Togo',
          'Specializzazione in Marketing e Finanza',
          'Primo ruolo cinematografico internazionale nel 2019',
          'Ambasciatore del cinema ciadiano sulla scena mondiale',
          'Rappresentanza del Ciad nei festival internazionali',
          'Ponte culturale tra Africa e mondo',
        ],
      },
      festivals: {
        title: 'Festival',
        items: [
          'Paris Ciné 2023 — Festival cinematografico internazionale',
          'Séries Mania 2023 — Vetrina televisiva',
          'Rakuten Fashion Week Tokyo 2024',
          'Festival del Cinema Africano — Apparizioni continentali',
        ],
      },
      fashion: {
        title: 'Moda',
        items: [
          'Rakuten Fashion Week Tokyo 2024 — Riconoscimento icona di moda',
          'Ambasciatore di stile internazionale',
          'Rappresentazione culturale della moda',
          'Stile elegante distintivo sui tappeti rossi',
        ],
      },
      media: {
        title: 'Presenza Mediatica',
        items: [
          'Copertura stampa e media internazionali',
          'Partecipazione ai panel dell\'industria cinematografica',
          'Ambasciatore di scambio culturale',
          'Sostenitore del cinema africano emergente',
        ],
      },
    },
    gallery: {
      label: 'Galleria',
      title: 'Galleria Fotografica',
      loadMore: 'Carica Altro',
      showLess: 'Mostra Meno',
      photos: 'foto',
    },
    contact: {
      label: 'Contatti',
      title: 'Mettiti in Contatto',
      email: 'Issakaawada@gmail.com',
      emailLabel: 'Email',
      instagramLabel: 'Instagram',
      representation: 'Rappresentanza',
      representationText: 'Per richieste stampa e partnership commerciali, contattateci tramite i canali sopra indicati.',
    },
    footer: {
      copyright: '© 2024 Issaka Awada Wadi. Tutti i diritti riservati.',
      backToTop: 'Torna su',
    },
  },
};

export const getTranslation = (lang: Language, key: string): any => {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return undefined;
    }
  }
  
  return value;
};
