import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  X,
  Sparkles,
  Package,
  LogOut,
  ShieldCheck,
  Store,
  Menu,
} from 'lucide-react';
import { Product } from '../types';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenLogin: () => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
  onOpenOrders: () => void;
  onCategorySelect?: (catId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenLogin,
  user,
  onLogout,
  onSelectProduct,
  products,
  onOpenOrders,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter autocomplete suggestions based on search query
  const suggestions = searchQuery.trim().length > 1
    ? products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#2874f0] text-white shadow-sm shrink-0">
      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-4 md:gap-6">
        
        {/* Left: Mobile Menu Trigger & Flipkart Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            id="mobile-menu-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-white hover:bg-blue-600 rounded-sm transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Flipkart Logo with Explore Plus */}
          <div
            id="brand-logo"
            className="cursor-pointer select-none flex flex-col italic font-bold leading-tight group"
            onClick={() => {
              onSearchChange('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="flex items-center">
              <span className="text-xl md:text-2xl tracking-tight text-white drop-shadow-xs">
                Flipkart
              </span>
            </div>
            <div className="flex items-center gap-0.5 -mt-0.5 text-[10px] text-[#ffe500] font-normal not-italic">
              <span className="italic font-medium">Explore</span>
              <span className="text-white font-bold ml-0.5">Plus</span>
              <Sparkles className="w-2.5 h-2.5 text-[#ffe500] fill-[#ffe500] ml-0.5" />
            </div>
          </div>
        </div>

        {/* Center: Search Bar with Autocomplete Dropdown */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-xl">
          <div className="relative flex items-center bg-white rounded-sm shadow-inner overflow-hidden">
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search for products, brands and more"
              className="w-full py-2 px-4 pr-10 text-sm text-black placeholder-gray-500 rounded-sm focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  onSearchChange('');
                  setShowSuggestions(false);
                }}
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="absolute right-3 top-2 text-[#2874f0] font-bold pointer-events-none">
              <Search className="w-5 h-5" />
            </div>
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 rounded-sm shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in duration-150">
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 bg-gray-50 border-b">
                POPULAR SUGGESTIONS
              </div>
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    setShowSuggestions(false);
                  }}
                  className="px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-9 h-9 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      in <span className="capitalize font-semibold text-blue-600">{product.category}</span> • ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 md:gap-6 font-semibold text-sm">
          {/* User Account / Login */}
          <div className="relative">
            {user ? (
              <button
                id="user-account-btn"
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-sm font-semibold text-sm hover:bg-blue-600 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-white text-[#2874f0] flex items-center justify-center text-xs font-bold shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-white font-semibold truncate max-w-[100px]">
                  {user.name}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <button
                id="login-btn"
                type="button"
                onClick={onOpenLogin}
                className="bg-white text-[#2874f0] px-6 sm:px-8 py-1 font-semibold rounded-sm border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
              >
                Login
              </button>
            )}

            {/* User Dropdown Menu */}
            {showUserMenu && user && (
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-white text-gray-800 rounded-sm shadow-xl border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenOrders();
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5 transition-colors"
                >
                  <Package className="w-4 h-4 text-blue-600" />
                  My Orders
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenWishlist();
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5 transition-colors"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  Wishlist ({wishlistCount})
                </button>
                <div className="px-4 py-2 text-xs text-blue-700 bg-blue-50/50 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Flipkart Plus Member</span>
                </div>
                <hr className="my-1 border-gray-100" />
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Become a Seller */}
          <div
            onClick={() => alert('Become a Flipkart Seller portal')}
            className="hidden lg:flex items-center gap-1 font-semibold hover:text-gray-100 cursor-pointer transition-colors"
          >
            <span>Become a Seller</span>
          </div>

          {/* Wishlist Link */}
          <button
            id="wishlist-btn"
            type="button"
            onClick={onOpenWishlist}
            className="relative flex items-center gap-1 font-semibold hover:text-gray-200 transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            <span className="hidden md:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="bg-[#ffe500] text-[#2874f0] text-[10px] font-extrabold px-1 rounded-full flex items-center justify-center leading-none">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon & Label */}
          <button
            id="cart-btn"
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-1.5 font-semibold hover:text-gray-200 transition-colors cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ffe500] text-[#2874f0] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 flex">
          <div className="bg-white w-4/5 max-w-sm h-full text-gray-900 shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="bg-[#2874f0] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-[#2874f0] flex items-center justify-center font-bold text-lg">
                  {user ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-bold text-base">{user ? user.name : 'Welcome to Flipkart'}</p>
                  <p className="text-xs text-blue-100">{user ? user.email : 'Sign in to access orders & deals'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-white hover:bg-blue-600 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {!user ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full bg-[#2874f0] text-white py-2 rounded font-semibold text-sm text-center shadow"
                >
                  Login / Sign Up
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full border border-red-200 text-red-600 py-2 rounded font-semibold text-sm hover:bg-red-50"
                >
                  Sign Out
                </button>
              )}

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOrders();
                  }}
                  className="w-full flex items-center gap-3 py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
                >
                  <Package className="w-5 h-5 text-gray-500" />
                  My Orders
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWishlist();
                  }}
                  className="w-full flex items-center gap-3 py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                  Wishlist ({wishlistCount})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full flex items-center gap-3 py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
                >
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  My Cart ({cartCount})
                </button>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Customer Assistance
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="hover:text-blue-600 cursor-pointer">Flipkart Plus Zone</p>
                  <p className="hover:text-blue-600 cursor-pointer">24x7 Customer Care</p>
                  <p className="hover:text-blue-600 cursor-pointer">Sell on Flipkart</p>
                  <p className="hover:text-blue-600 cursor-pointer">Return &amp; Refund Policy</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
