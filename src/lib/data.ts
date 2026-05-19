import { Product } from '../types';
import kopiImg from '../assets/images/ChatGPT Image May 18, 2026, 08_56_09 PM.png';
import makaroniImg from '../assets/images/ChatGPT Image May 18, 2026, 11_51_30 PM.png';

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Kopi Genggaman',
    description: 'Signature premium coffee blend with a rich, smooth finish and a hint of artisan sweetness.',
    price: 28000,
    category: 'Drinks',
    image: kopiImg,
    rating: 0.0,
    badges: ['Best Seller', 'Signature'],
    isAvailable: true
  },
  {
    id: 'p2',
    name: 'Spicy Fire Fried Chicken',
    description: 'Crispy Korean-style fried chicken coated in a spicy gochujang glaze. Served with radish.',
    price: 55000,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1626082896492-766af4eb9131?q=80&w=800&auto=format&fit=crop',
    rating: 0.0,
    badges: ['Spicy', 'Promo'],
    isAvailable: true
  },
  {
    id: 'p7',
    name: 'Makaroni Goreng Renyah',
    description: 'Makaroni goreng renyah dengan bumbu khas yang gurih and lezat. Camilan sempurna untuk menemani hari Anda.',
    price: 25000,
    category: 'Snacks',
    image: makaroniImg,
    rating: 0.0,
    badges: ['New'],
    isAvailable: true
  }
];
