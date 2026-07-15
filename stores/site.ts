import { defineStore } from 'pinia'

/**
 * Single source of truth for the business content shown on the page.
 * All facts (contact details, offices, figures, credentials) come from the
 * existing globalindiaimportexport.com website — nothing here is invented.
 */

export interface Product {
  name: string
  image: string
  description: string
}

export interface Pillar {
  icon: string
  title: string
  description: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface Office {
  label: string
  company: string
  country: 'in' | 'ae'
  lines: string[]
  mapsQuery: string
}

export interface SocialLink {
  icon: string
  label: string
  href: string
}

export const useSiteStore = defineStore('site', {
  state: () => ({
    businessName: 'Global India Import Export',
    tagline: 'Fresh produce exports from India',

    // Contact details from the existing website.
    email: 'santosh.ingale@globalindiaimportexport.com',
    phoneDisplay: '+91 99223 71579',
    phoneHref: 'tel:+919922371579',
    whatsappHref:
      'https://wa.me/919922371579?text=Hi%2C%20I%20would%20like%20a%20quote%20for%20fresh%20produce%20export',

    // Contact-form endpoint used by the existing website.
    formEndpoint: 'https://formspree.io/f/xeozzdae',

    // The same three banner images the original website rotates in its hero.
    heroSlides: [
      {
        src: publicAsset('/hero/vegetables.jpeg'),
        alt: 'Fresh vegetables ready for export — cabbage, broccoli, zucchini, and carrots',
      },
      {
        src: publicAsset('/hero/onionHero.jpeg'),
        alt: 'Export-grade red onions after harvest',
      },
      {
        src: publicAsset('/hero/container.jpeg'),
        alt: 'Shipping containers stacked for international dispatch',
      },
    ],

    nav: [
      { label: 'Home', href: '#home' },
      { label: 'Products', href: '#products' },
      { label: 'Why Us', href: '#why-us' },
      { label: 'About', href: '#about' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Contact', href: '#contact' },
    ],

    // Figures published by the business on its existing website.
    stats: [
      { value: '15+', label: 'Years of trade experience' },
      { value: '500+', label: 'Active buyer relationships' },
      { value: '50+', label: 'Countries served' },
      { value: '15M+', label: 'Kilograms shipped' },
    ],

    products: [
      {
        name: 'Onion',
        image: publicAsset('/assets/onions-red.jpg'),
        description: 'Export-grade red onions, graded for size and long shelf life in transit.',
      },
      {
        name: 'Coconut',
        image: publicAsset('/assets/coconut-brown.jpg'),
        description: 'Semi-husked brown coconuts selected for weight, meat content, and uniform size.',
      },
      {
        name: 'Banana',
        image: publicAsset('/assets/banana-fresh.jpg'),
        description: 'Green-harvested bananas packed to arrive at the ripeness your market expects.',
      },
      {
        name: 'Ginger',
        image: publicAsset('/assets/ginger-fresh.jpg'),
        description: 'Aromatic fresh ginger with the flavour profile and clean finish importers ask for.',
      },
      {
        name: 'Pomegranate',
        image: publicAsset('/assets/pomegranate-whole.jpg'),
        description: 'Deep-red pomegranates with a premium finish, packed to minimise handling damage.',
      },
      {
        name: 'Chili',
        image: publicAsset('/assets/chili-red.jpg'),
        description: 'Vibrant red chilies packed for uniform colour, heat, and reliable transit quality.',
      },
      {
        name: 'Okra',
        image: publicAsset('/assets/okra-fresh.jpg'),
        description: 'Tender okra picked young and packed to keep its crisp texture on arrival.',
      },
      {
        name: 'Drumstick',
        image: publicAsset('/assets/drumstick-moringa.jpg'),
        description: 'Fresh moringa drumsticks, tender and full-length, packed to stay crisp in transit.',
      },
      {
        name: 'Sugar',
        image: publicAsset('/assets/sugar-white.jpg'),
        description: 'Refined white sugar in export grades, bagged and documented to your specification.',
      },
      {
        name: 'Organic Vegetables',
        image: publicAsset('/assets/organic-vegetables.jpg'),
        description: 'Certified organic vegetables, mixed to order and packed for international transit.',
      },
    ] as Product[],

    pillars: [
      {
        icon: 'mdi-sprout-outline',
        title: 'Sourced at origin',
        description:
          'We procure directly from growing regions we know well, so quality starts in the field — not at the port.',
      },
      {
        icon: 'mdi-check-decagram-outline',
        title: 'Quality checked before dispatch',
        description:
          'Every order is graded, sorted, and inspected against international standards before it ships.',
      },
      {
        icon: 'mdi-file-document-check-outline',
        title: 'Documentation handled',
        description:
          'Export paperwork, packing, and labelling prepared correctly so your consignment keeps moving.',
      },
      {
        icon: 'mdi-earth',
        title: 'India & UAE presence',
        description:
          'Offices in Pune and Ras Al Khaimah keep us close to the supply side and to Gulf-market buyers.',
      },
    ] as Pillar[],

    // Credentials listed on the existing website.
    credentials: ['IEC Registration', 'GST Registered', 'E-License', 'Trade Membership'],

    processSteps: [
      {
        title: 'Share your requirement',
        description: 'Tell us the product, grade, volume, and destination port you have in mind.',
      },
      {
        title: 'Sourcing & grading',
        description: 'We procure at origin and grade every lot to your specification.',
      },
      {
        title: 'Packing & documentation',
        description: 'Export packing, labelling, and paperwork prepared for smooth customs clearance.',
      },
      {
        title: 'Dispatch & delivery',
        description: 'Your consignment ships on schedule, with clear updates until it arrives.',
      },
    ] as ProcessStep[],

    offices: [
      {
        label: 'India Office',
        company: 'Global India Import Export',
        country: 'in',
        lines: [
          'Ground Floor, CTS No. 1310/1',
          'Open Lawn Shopping Center, Dairy Farm Marg',
          'Ashok Theater, Pimpri, Pune – 411017',
        ],
        mapsQuery:
          'Open Lawn Shopping Center Dairy Farm Marg, Ashok Theater, Pimpri, Pune 411017',
      },
      {
        label: 'Dubai / UAE Office',
        company: 'Green Global Import Export',
        country: 'ae',
        lines: [
          'Compass Building, Al Shohada Road',
          'Al Hamra Industrial Zone-FZ',
          'Ras Al Khaimah, United Arab Emirates',
        ],
        mapsQuery: 'Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah',
      },
    ] as Office[],

    socials: [
      { icon: 'mdi-facebook', label: 'Facebook', href: 'https://facebook.com/globalindiaexport' },
      { icon: 'mdi-instagram', label: 'Instagram', href: 'https://instagram.com/globalindiaexport' },
      { icon: 'mdi-youtube', label: 'YouTube', href: 'https://youtube.com/@globalindiaexport' },
    ] as SocialLink[],

    galleryPhotos: Array.from({ length: 33 }, (_, i) => publicAsset(`/gallery/photo${i + 1}.jpg`)),
  }),

  getters: {
    mapsUrl: () => (query: string) =>
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
  },
})
