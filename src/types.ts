export interface Product {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  reviewCount: number;
  image: string;
  images?: string[];
  isFAssured: boolean;
  freeDelivery: boolean;
  tag?: string;
  highlights: string[];
  specs: Record<string, string>;
  bankOffers: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  onlyFAssured: boolean;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
}

export interface UserReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  location: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    pincode: string;
    addressLine: string;
    city: string;
    state: string;
  };
  paymentMethod: string;
}
