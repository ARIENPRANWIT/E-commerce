import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Zap } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface DealRowProps {
  title: string;
  subtitle?: string;
  badge?: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onBuyNow: (product: Product, e: React.MouseEvent) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onViewAll?: () => void;
}

export const DealRow: React.FC<DealRowProps> = ({
  title,
  subtitle,
  badge,
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  wishlistIds,
  onToggleWishlist,
  onViewAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="bg-white p-3 sm:p-4 shadow-sm border border-gray-200 rounded-sm my-3 flex flex-col flex-1 min-h-0">
      {/* Row Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-xl font-semibold text-gray-900 tracking-tight">
              {title}
            </h3>
            {badge && (
              <span className="bg-[#2874f0] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#ffe500]" />
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="bg-[#2874f0] hover:bg-blue-600 text-white px-3 sm:px-4 py-1.5 rounded-sm uppercase text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-xs"
            >
              View All
            </button>
          )}

          {/* Desktop Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              onClick={scrollLeft}
              className="w-7 h-7 rounded-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="w-7 h-7 rounded-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Product List with High Density */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1"
      >
        {products.map((product) => (
          <div key={product.id} className="w-44 sm:w-52 shrink-0 flex">
            <ProductCard
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
