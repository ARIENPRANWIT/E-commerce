import React, { useState } from 'react';
import {
  X,
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Tag,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Share2,
} from 'lucide-react';
import { Product } from '../types';
import { MOCK_REVIEWS } from '../data/mockProducts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus('Available! Delivery by Tomorrow, 9 PM | Free ₹40');
    } else {
      setPincodeStatus('Please enter a valid 6-digit PIN code.');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-sm shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Top Header / Breadcrumb Bar */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50 text-xs">
          <div className="text-gray-500 truncate pr-2">
            <span>Home</span> &gt; <span className="capitalize">{product.category}</span> &gt; <span className="font-semibold text-gray-800">{product.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 text-gray-500 hover:text-blue-600 rounded transition-colors flex items-center gap-1"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-gray-900 rounded transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          
          {/* Left Column: Image Gallery & Buy Actions */}
          <div className="md:col-span-5 flex flex-col">
            <div className="relative border border-gray-200 rounded p-4 bg-white flex items-center justify-center min-h-[300px] sm:min-h-[360px]">
              {/* Wishlist button */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-transform active:scale-95"
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </button>

              <img
                src={selectedImage}
                alt={product.title}
                className="max-h-[320px] max-w-full object-contain"
              />
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 border-2 rounded p-1 overflow-hidden transition-all ${
                      selectedImage === img ? 'border-[#2874f0] shadow-sm' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons (Desktop & Tablet) */}
            <div className="hidden sm:grid grid-cols-2 gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="bg-[#ff9f00] hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>ADD TO CART</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onBuyNow(product);
                  onClose();
                }}
                className="bg-[#fb641b] hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>BUY NOW</span>
              </button>
            </div>
          </div>

          {/* Right Column: Details, Specifications, Pricing & Reviews */}
          <div className="md:col-span-7 flex flex-col space-y-4">
            {/* Title & Brand */}
            <div>
              <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                {product.brand}
              </p>
              <h1 className="text-lg sm:text-xl font-medium text-gray-900 leading-snug mt-1">
                {product.title}
              </h1>
            </div>

            {/* Rating and Flipkart Assured */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-1 bg-[#388e3c] text-white px-2 py-0.5 rounded-xs text-xs font-bold shadow-xs">
                <span>{product.rating}</span>
                <Star className="w-3 h-3 fill-white" />
              </div>
              <span className="text-xs font-semibold text-gray-500">
                {product.ratingCount.toLocaleString('en-IN')} Ratings &amp; {product.reviewCount.toLocaleString('en-IN')} Reviews
              </span>

              {product.isFAssured && (
                <div className="inline-flex items-center gap-1 bg-blue-50 text-[#2874f0] border border-blue-200 px-2 py-0.5 rounded-xs text-xs font-extrabold">
                  <span className="italic font-black text-amber-500">f</span>
                  <span>Assured</span>
                </div>
              )}
            </div>

            {/* Pricing Details */}
            <div className="p-3 bg-blue-50/40 rounded-sm border border-blue-100">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm font-bold text-[#388e3c]">
                      {product.discountPercentage}% off
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Inclusive of all taxes • Free Delivery on this order
              </p>
            </div>

            {/* Available Bank Offers */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase text-gray-700 tracking-wider">
                Available Offers
              </h3>
              <div className="space-y-1.5">
                {product.bankOffers.map((offer, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <Tag className="w-3.5 h-3.5 text-[#388e3c] shrink-0 mt-0.5" />
                    <span>{offer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Pincode Check */}
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-2">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Delivery &amp; Services Check</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                />
                <button
                  type="submit"
                  className="bg-[#2874f0] text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-blue-600 transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="mt-2 text-xs font-medium text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{pincodeStatus}</span>
                </p>
              )}
            </div>

            {/* Product Highlights */}
            <div>
              <h3 className="text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                Highlights
              </h3>
              <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                {product.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Specifications Table */}
            <div>
              <h3 className="text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                Specifications
              </h3>
              <div className="border border-gray-200 rounded divide-y divide-gray-200 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 p-2">
                    <span className="text-gray-500 font-medium">{key}</span>
                    <span className="col-span-2 text-gray-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flipkart Trust Perks */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-200 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-[11px] font-bold text-gray-800">100% Authentic</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-[11px] font-bold text-gray-800">7 Days Return</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-5 h-5 text-amber-600 mb-1" />
                <span className="text-[11px] font-bold text-gray-800">Fast Delivery</span>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase text-gray-700 tracking-wider mb-3">
                Ratings &amp; Reviews
              </h3>
              <div className="space-y-3">
                {MOCK_REVIEWS.map((rev) => (
                  <div key={rev.id} className="p-3 bg-gray-50 rounded border border-gray-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="inline-flex items-center gap-0.5 bg-[#388e3c] text-white px-1.5 py-0.2 rounded-xs text-[10px] font-bold">
                          <span>{rev.rating}</span>
                          <Star className="w-2.5 h-2.5 fill-white" />
                        </div>
                        <span className="font-bold text-gray-900">{rev.title}</span>
                      </div>
                      <span className="text-gray-400 text-[10px]">{rev.date}</span>
                    </div>
                    <p className="text-gray-700">{rev.comment}</p>
                    <div className="mt-1.5 text-[11px] text-gray-500 flex items-center gap-1">
                      <span className="font-semibold text-gray-800">{rev.author}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-medium">Certified Buyer, {rev.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Sticky Bottom CTA Bar */}
        <div className="sm:hidden p-3 bg-white border-t border-gray-200 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="bg-[#ff9f00] text-white font-bold py-2.5 px-3 rounded text-xs flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>ADD TO CART</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onBuyNow(product);
              onClose();
            }}
            className="bg-[#fb641b] text-white font-bold py-2.5 px-3 rounded text-xs flex items-center justify-center gap-1"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>BUY NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};
