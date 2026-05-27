import { Product } from '../types';

// Static image paths from /public folder (not bundled into JS)
const kopiImg = '/images/hero-1.webp';
const makaroniImg = '/images/hero-3.webp';
const kacangImg = '/images/hero-2.webp';

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Kopi Genggaman',
    description: 'Signature premium coffee blend with a rich, smooth finish and a hint of artisan sweetness.',
    price: 10000,
    category: 'Drinks',
    image: kopiImg,
    rating: 0.0,
    badges: ['Best Seller', 'Signature'],
    isAvailable: true
  },
  {
    id: 'p2',
    name: 'Kacang Goreng',
    description: 'Kacang goreng renyah dengan rasa gurih klasik, cocok untuk camilan santai atau teman minum kopi.',
    price: 10000,
    category: 'Snacks',
    image: kacangImg,
    rating: 0.0,
    badges: ['Spicy', 'Promo'],
    isAvailable: true
  },
  {
    id: 'p7',
    name: 'Makaroni Goreng Renyah',
    description: 'Makaroni goreng renyah dengan bumbu khas yang gurih and lezat. Camilan sempurna untuk menemani hari Anda.',
    price: 10000,
    category: 'Snacks',
    image: makaroniImg,
    rating: 0.0,
    badges: ['New'],
    isAvailable: true
  }
];
