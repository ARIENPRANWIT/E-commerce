import React from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onStartShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onStartShopping,
}) => {
  if (!isOpen) return null;

  const totalOriginalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const totalSellingPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalSavings = totalOriginalPrice - totalSellingPrice;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-[#f1f2f4] w-full max-w-2xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Cart Header */}
        <div className="bg-[#2874f0] text-white p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ffe500]" />
            <h2 className="font-bold text-base sm:text-lg">
              My Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-white hover:bg-blue-600 rounded transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white">
            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Your cart is empty!</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">
              Explore our best deals, smartphones, and fashion discounts to add items to your cart.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartShopping();
              }}
              className="mt-6 bg-[#2874f0] hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-sm text-sm shadow-md transition-colors"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
            
            {/* Free Delivery Banner */}
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>
                Yay! Your order qualifies for <strong>FREE Delivery</strong>.
              </span>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-sm border border-gray-200 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-3 sm:p-4 flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-gray-50 rounded p-1 flex items-center justify-center border border-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Seller: Flipkart Retailer
                      {item.product.isFAssured && (
                        <span className="ml-2 font-bold text-blue-600">f-Assured</span>
                      )}
                    </p>

                    {/* Price in Cart */}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-sm sm:text-base font-bold text-gray-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs font-bold text-[#388e3c]">
                            {item.product.discountPercentage}% Off
                          </span>
                        </>
                      )}
                    </div>

                    {/* Delivery promise */}
                    <p className="text-[11px] text-gray-500 mt-1">
                      Delivery by <span className="font-semibold text-gray-800">Tomorrow, 9 PM</span> | <span className="text-emerald-600 font-semibold">Free</span>
                    </p>

                    {/* Quantity Stepper & Remove */}
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>REMOVE</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Details Breakdown */}
            <div className="bg-white rounded-sm border border-gray-200 p-4 space-y-3">
              <h3 className="font-bold text-xs uppercase text-gray-500 tracking-wider border-b border-gray-100 pb-2">
                Price Details
              </h3>

              <div className="flex justify-between text-xs text-gray-700">
                <span>Price ({itemCount} items)</span>
                <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-xs text-[#388e3c] font-medium">
                <span>Discount</span>
                <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-xs text-gray-700">
                <span>Delivery Charges</span>
                <span className="text-[#388e3c] font-medium">
                  <span className="line-through text-gray-400 mr-1">₹40</span> FREE
                </span>
              </div>

              <div className="border-t border-dashed border-gray-300 pt-2 flex justify-between text-sm sm:text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹{totalSellingPrice.toLocaleString('en-IN')}</span>
              </div>

              {totalSavings > 0 && (
                <div className="p-2 bg-emerald-50 rounded text-emerald-800 text-xs font-semibold text-center">
                  You will save ₹{totalSavings.toLocaleString('en-IN')} on this order
                </div>
              )}
            </div>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 py-2">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              <span>Safe and Secure Payments. 100% Authentic Products.</span>
            </div>
          </div>
        )}

        {/* Bottom Bar with PLACE ORDER Button */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t border-gray-200 p-4 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider">Total Payable</p>
              <p className="text-lg sm:text-xl font-black text-gray-900">
                ₹{totalSellingPrice.toLocaleString('en-IN')}
              </p>
            </div>

            <button
              id="place-order-btn"
              type="button"
              onClick={onProceedToCheckout}
              className="bg-[#fb641b] hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-sm text-sm flex items-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <span>PLACE ORDER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
