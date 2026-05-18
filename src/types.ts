export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Food' | 'Drinks' | 'Snacks' | 'Desserts';
  image: string;
  rating: number;
  badges?: string[];
  isAvailable: boolean;
  createdAt?: any;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivering' | 'completed' | 'cancelled';
  customerDetails: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  };
  paymentMethod: 'COD' | 'Bank Transfer' | 'E-Wallet';
  platform: 'WhatsApp' | 'Shopee' | 'Web';
  createdAt: any;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAdmin: boolean;
  createdAt: any;
}
