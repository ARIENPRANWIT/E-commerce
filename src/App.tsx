/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown,
  SearchX,
  CheckCircle,
  ShoppingBag,
} from 'lucide-react';
import { Product, CartItem, FilterState, OrderDetails } from './types';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { HeroCarousel } from './components/HeroCarousel';
import { FlipkartFeaturesStrip } from './components/FlipkartFeaturesStrip';
import { DealRow } from './components/DealRow';
import { ProductCard } from './components/ProductCard';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { LoginModal } from './components/LoginModal';
import { OrdersModal } from './components/OrdersModal';
import { Footer } from './components/Footer';

const INITIAL_FILTERS: FilterState = {
  category: 'all',
  searchQuery: '',
  minPrice: 0,
  maxPrice: 150000,
  minRating: 0,
  onlyFAssured: false,
  sortBy: 'popularity',
};

export default function App() {
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // User State (persisted)
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem('fk_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Cart State (persisted)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fk_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default initial cart item to show realistic experience
    const initialProduct = MOCK_PRODUCTS.find((p) => p.id === 'elec-4') || MOCK_PRODUCTS[0];
    return [{ product: initialProduct, quantity: 1 }];
  });

  // Wishlist State (persisted)
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('fk_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [MOCK_PRODUCTS[0]];
  });

  // Orders History State (persisted)
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('fk_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('fk_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('fk_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('fk_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fk_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fk_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync category changes with filters
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFilters((prev) => ({ ...prev, category: categoryId }));
  };

  // Sync search query changes with filters
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  // Wishlist item IDs Set for fast lookup
  const wishlistIds = useMemo(() => new Set(wishlist.map((p) => p.id)), [wishlist]);

  // Toggle Wishlist
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (wishlistIds.has(product.id)) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed "${product.shortTitle}" from Wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Added "${product.shortTitle}" to Wishlist`, 'success');
    }
  };

  // Add to Cart
  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added "${product.shortTitle}" to Cart`, 'success');
  };

  // Buy Now (Add to cart and open checkout immediately)
  const handleBuyNow = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) return prev;
      return [...prev, { product, quantity: 1 }];
    });
    setIsCheckoutOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Cart Item
  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  // Order Placement Success
  const handleOrderSuccess = (order: OrderDetails) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    showToast(`Order Placed! Order ID: ${order.orderId}`, 'success');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Filter by Category
    if (filters.category && filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Filter by Search Query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    // Filter by Max Price
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }

    // Filter by Min Rating
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Filter by Flipkart Assured
    if (filters.onlyFAssured) {
      result = result.filter((p) => p.isFAssured);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.ratingCount - a.ratingCount);
        break;
    }

    return result;
  }, [filters]);

  // Is user currently performing a filtered search or category drilldown?
  const isBrowsingCatalog =
    filters.category !== 'all' ||
    filters.searchQuery.trim().length > 0 ||
    filters.onlyFAssured ||
    filters.minRating > 0 ||
    filters.maxPrice < 150000;

  // Segmented products for homepage sections
  const electronicsDeals = useMemo(
    () => MOCK_PRODUCTS.filter((p) => p.category === 'electronics'),
    []
  );
  const smartphoneDeals = useMemo(
    () => MOCK_PRODUCTS.filter((p) => p.category === 'mobiles'),
    []
  );
  const fashionDeals = useMemo(
    () => MOCK_PRODUCTS.filter((p) => p.category === 'fashion'),
    []
  );
  const homeDeals = useMemo(
    () => MOCK_PRODUCTS.filter((p) => p.category === 'home' || p.category === 'appliances'),
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f3f6] text-[#212121] font-sans antialiased">
      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs font-semibold py-2 px-3.5 rounded-sm shadow-2xl flex items-center gap-2 border border-gray-700 animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-[#ffe500]" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Flipkart Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        user={user}
        onLogout={() => {
          setUser(null);
          showToast('Signed out successfully', 'info');
        }}
        onSelectProduct={(product) => setSelectedProduct(product)}
        products={MOCK_PRODUCTS}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onCategorySelect={handleCategorySelect}
      />

      {/* Categories Bar */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-3 py-2.5">
        {/* If user is browsing or searching, show full catalog with sidebar filters */}
        {isBrowsingCatalog ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            
            {/* Mobile Filter Button */}
            <div className="lg:hidden col-span-1 flex items-center justify-between bg-white p-2.5 rounded-sm border border-gray-200 shadow-xs">
              <span className="text-xs font-bold text-gray-700">
                Showing {filteredProducts.length} Results
              </span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center gap-1.5 bg-[#2874f0] text-white px-3 py-1 rounded-sm text-xs font-semibold shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters &amp; Sort</span>
              </button>
            </div>

            {/* Left Filter Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-3">
              <FilterSidebar
                filters={filters}
                onChangeFilters={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
                onResetFilters={() => {
                  setFilters(INITIAL_FILTERS);
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                totalResults={filteredProducts.length}
              />
            </div>

            {/* Mobile Filters Slide-over / Modal */}
            {mobileFiltersOpen && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex">
                <div className="bg-white w-5/6 max-w-sm h-full p-4 overflow-y-auto">
                  <div className="flex items-center justify-between border-b pb-3 mb-3">
                    <span className="font-bold text-sm">Filters</span>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-gray-500 text-xs font-bold"
                    >
                      Close
                    </button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    onChangeFilters={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
                    onResetFilters={() => {
                      setFilters(INITIAL_FILTERS);
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setMobileFiltersOpen(false);
                    }}
                    totalResults={filteredProducts.length}
                  />
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full mt-4 bg-[#2874f0] text-white py-2 font-bold text-xs rounded-sm"
                  >
                    Apply Filters
                  </button>
                </div>
                <div className="flex-1" onClick={() => setMobileFiltersOpen(false)} />
              </div>
            )}

            {/* Right Product Grid Area */}
            <div className="col-span-1 lg:col-span-9 space-y-2.5">
              {/* Sorting Bar */}
              <div className="bg-white p-2.5 rounded-sm border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">
                    Sort By:
                  </span>
                  <div className="flex flex-wrap items-center gap-1">
                    {[
                      { id: 'popularity', label: 'Popularity' },
                      { id: 'price-asc', label: 'Price -- Low to High' },
                      { id: 'price-desc', label: 'Price -- High to Low' },
                      { id: 'rating', label: 'Customer Rating' },
                      { id: 'discount', label: 'Discount' },
                    ].map((sortOption) => (
                      <button
                        key={sortOption.id}
                        type="button"
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            sortBy: sortOption.id as FilterState['sortBy'],
                          }))
                        }
                        className={`px-2.5 py-1 rounded-xs transition-colors font-medium cursor-pointer ${
                          filters.sortBy === sortOption.id
                            ? 'bg-[#2874f0] text-white font-bold'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {sortOption.label}
                      </button>
                    ))}
                  </div>
                </div>

                <span className="text-gray-400 font-semibold text-[11px]">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                </span>
              </div>

              {/* Product Cards Grid with High Density */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white p-10 rounded-sm border border-gray-200 text-center shadow-xs flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-3">
                    <SearchX className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800">
                    No products found matching your filters
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm">
                    Try clearing the search query or adjusting your price and rating filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFilters(INITIAL_FILTERS);
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="mt-4 bg-[#2874f0] text-white px-4 py-1.5 rounded-sm text-xs font-bold hover:bg-blue-600 transition-colors shadow-xs"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={(p) => setSelectedProduct(p)}
                      onAddToCart={handleAddToCart}
                      onBuyNow={handleBuyNow}
                      isWishlisted={wishlistIds.has(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Default Homepage Mode */
          <div className="space-y-3">
            {/* Hero Carousel */}
            <HeroCarousel onSelectCategory={handleCategorySelect} />

            {/* Flipkart Assured & Trust Guarantee Strip */}
            <FlipkartFeaturesStrip />

            {/* Best Deals on Electronics */}
            <DealRow
              title="Best of Electronics &amp; Gadgets"
              subtitle="Laptops, Noise-Cancelling Headphones, boAt Audio"
              badge="UP TO 75% OFF"
              products={electronicsDeals}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleCategorySelect('electronics')}
            />

            {/* Top Smartphone Picks */}
            <DealRow
              title="Top 5G Smartphones &amp; Flagships"
              subtitle="Apple iPhone 15, Samsung Galaxy S24 Ultra &amp; Nothing Phone"
              badge="SPECIAL BANK OFFERS"
              products={smartphoneDeals}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleCategorySelect('mobiles')}
            />

            {/* Trending Fashion & Lifestyle */}
            <DealRow
              title="Trending Fashion &amp; Footwear"
              subtitle="Nike Air Jordans, Levi's Jackets, Ray-Ban Polarized"
              badge="MIN 40% OFF"
              products={fashionDeals}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleCategorySelect('fashion')}
            />

            {/* Home & Appliances Best Sellers */}
            <DealRow
              title="Appliances &amp; Home Essentials"
              subtitle="LG 4K Smart TVs, Dyson Cordless Vacuums, Philips Air Fryers"
              badge="FREE DELIVERY"
              products={homeDeals}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleCategorySelect('appliances')}
            />

            {/* Full Explore Catalog Grid on Homepage */}
            <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-xs">
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    Explore All Products &amp; Best Deals
                  </h2>
                  <p className="text-xs text-gray-500">
                    Handpicked products with Flipkart Assured quality check
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-600 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>100% Genuine</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {MOCK_PRODUCTS.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    isWishlisted={wishlistIds.has(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => handleAddToCart(p)}
        onBuyNow={(p) => handleBuyNow(p)}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onToggleWishlist={(p) => handleToggleWishlist(p)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onStartShopping={() => {
          setFilters(INITIAL_FILTERS);
          setSelectedCategory('all');
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
        user={user}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => {
          setWishlist((prev) => prev.filter((p) => p.id !== id));
          showToast('Removed from wishlist', 'info');
        }}
        onMoveToCart={(product) => {
          handleAddToCart(product);
          setWishlist((prev) => prev.filter((p) => p.id !== product.id));
        }}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
          showToast(`Welcome back, ${loggedInUser.name}!`, 'success');
        }}
      />

      {/* Orders History Modal */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onStartShopping={() => {
          setFilters(INITIAL_FILTERS);
          setSelectedCategory('all');
        }}
      />

      {/* Flipkart Footer */}
      <Footer />
    </div>
  );
}
