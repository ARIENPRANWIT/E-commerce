import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-[#f1f2f4] w-full max-w-xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="bg-[#2874f0] text-white p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-red-400 text-red-400" />
            <h2 className="font-bold text-base sm:text-lg">
              My Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-white hover:bg-blue-600 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Your Wishlist is Empty</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">
              Save items that you like in your wishlist by tapping the heart icon on any product.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded border border-gray-200 p-3 sm:p-4 flex gap-4 shadow-xs"
              >
                <div
                  className="w-20 h-20 shrink-0 bg-gray-50 rounded p-1 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 cursor-pointer hover:text-[#2874f0]"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  >
                    {product.title}
                  </h4>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-[#388e3c]">
                          {product.discountPercentage}% Off
                        </span>
                      </>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onMoveToCart(product)}
                      className="bg-[#2874f0] hover:bg-blue-600 text-white text-xs font-bold py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
