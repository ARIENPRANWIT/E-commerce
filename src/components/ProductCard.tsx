import React from 'react';
import { Star, Heart, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onBuyNow: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-sm border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-150 flex flex-col cursor-pointer p-2.5 sm:p-3 select-none text-left w-full"
    >
      {/* Wishlist Button */}
      <button
        type="button"
        onClick={(e) => onToggleWishlist(product, e)}
        className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-xs border border-gray-200 transition-transform active:scale-90 cursor-pointer"
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label="Wishlist"
      >
        <Heart
          className={`w-3.5 h-3.5 transition-colors ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'
          }`}
        />
      </button>

      {/* Special Offer / Tag Pill */}
      {product.tag && (
        <span className="absolute top-2.5 left-2.5 z-10 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider shadow-xs">
          {product.tag}
        </span>
      )}

      {/* Product Image */}
      <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-sm bg-gray-50 flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Title & Brand */}
      <div className="flex-1 flex flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
          {product.brand}
        </span>
        <h3 className="font-semibold text-xs sm:text-sm leading-tight text-gray-900 line-clamp-2 group-hover:text-[#2874f0] transition-colors">
          {product.title}
        </h3>

        {/* Rating and Flipkart Assured */}
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          <div className="inline-flex items-center gap-0.5 bg-[#388e3c] text-white px-1.5 py-0.5 rounded-xs text-[11px] font-bold leading-none shadow-xs">
            <span>{product.rating}</span>
            <Star className="w-2.5 h-2.5 fill-white" />
          </div>
          <span className="text-[11px] text-gray-500">
            ({product.ratingCount.toLocaleString('en-IN')})
          </span>

          {/* Flipkart Assured Badge */}
          {product.isFAssured && (
            <div className="ml-auto inline-flex items-center gap-0.5 bg-blue-50 text-[#2874f0] border border-blue-200 px-1 py-0.2 rounded-xs text-[9px] font-extrabold tracking-tight">
              <span className="italic font-black text-amber-500">f</span>
              <span>Assured</span>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-sm sm:text-base font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-[11px] text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-semibold text-green-600">
                {product.discountPercentage}% off
              </span>
            </>
          )}
        </div>

        {/* Delivery indicator */}
        <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
          <CheckCircle2 className="w-3 h-3 text-[#388e3c]" />
          <span>{product.freeDelivery ? 'Free Delivery' : 'Standard Delivery'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-2.5 pt-2 border-t border-gray-100 grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={(e) => onAddToCart(product, e)}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs font-bold py-1 px-1.5 rounded-xs flex items-center justify-center gap-1 transition-colors shadow-xs cursor-pointer"
        >
          <ShoppingCart className="w-3 h-3" />
          <span>Add</span>
        </button>

        <button
          type="button"
          onClick={(e) => onBuyNow(product, e)}
          className="bg-[#fb641b] hover:bg-orange-600 text-white text-xs font-bold py-1 px-1.5 rounded-xs flex items-center justify-center gap-1 transition-colors shadow-xs cursor-pointer"
        >
          <Zap className="w-3 h-3 fill-white" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};
