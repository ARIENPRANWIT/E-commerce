import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  Smartphone,
  Building2,
  Banknote,
  ArrowRight,
  PackageCheck,
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: OrderDetails) => void;
  user: { name: string; email: string } | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
  user,
}) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [formData, setFormData] = useState({
    fullName: user ? user.name : 'Rajesh Sharma',
    phone: '9876543210',
    pincode: '560001',
    addressLine: 'Flat 402, Prestige Towers, MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.pincode || !formData.addressLine) {
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = () => {
    const order: OrderDetails = {
      orderId: `OD${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...cartItems],
      totalAmount,
      shippingAddress: { ...formData },
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI (Instant Confirmation)'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : paymentMethod === 'netbanking'
          ? 'Net Banking'
          : 'Cash on Delivery',
    };

    setConfirmedOrder(order);
    setStep('success');
    onOrderSuccess(order);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#f1f2f4] w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#2874f0] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold italic text-lg">Flipkart</span>
            <span className="text-white/60">|</span>
            <h2 className="font-bold text-sm sm:text-base">Secure Checkout</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-white hover:bg-blue-600 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'success' && (
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between text-xs font-bold text-gray-500">
            <div className={`flex items-center gap-2 ${step === 'address' ? 'text-[#2874f0]' : 'text-emerald-600'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${step === 'address' ? 'bg-[#2874f0]' : 'bg-emerald-600'}`}>
                1
              </span>
              <span>Delivery Address</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#2874f0]' : 'text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${step === 'payment' ? 'bg-[#2874f0]' : 'bg-gray-300'}`}>
                2
              </span>
              <span>Payment Options</span>
            </div>
          </div>
        )}

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {step === 'address' && (
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div className="bg-white p-4 rounded border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b pb-2">
                  <MapPin className="w-4 h-4 text-[#2874f0]" />
                  <span>Enter Shipping Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      10-digit Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Address (House No, Building, Street, Area) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.addressLine}
                    onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Order Summary Mini Box */}
              <div className="bg-white p-4 rounded border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Order Total ({cartItems.length} items)</p>
                  <p className="text-base font-bold text-gray-900">₹{totalAmount.toLocaleString('en-IN')}</p>
                </div>
                <button
                  type="submit"
                  className="bg-[#fb641b] hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-sm text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>PROCEED TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#2874f0]" />
                    Select Payment Method
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep('address')}
                    className="text-xs text-[#2874f0] font-semibold hover:underline"
                  >
                    Change Address
                  </button>
                </div>

                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-colors ${
                      paymentMethod === 'upi' ? 'border-[#2874f0] bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment-method"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-[#2874f0] focus:ring-[#2874f0]"
                      />
                      <Smartphone className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">UPI (Google Pay / PhonePe / Paytm / BHIM)</p>
                        <p className="text-[11px] text-gray-500">Pay directly from your bank account instantly</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      RECOMMENDED
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-colors ${
                      paymentMethod === 'card' ? 'border-[#2874f0] bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment-method"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-[#2874f0] focus:ring-[#2874f0]"
                      />
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Credit / Debit / ATM Card</p>
                        <p className="text-[11px] text-gray-500">Visa, MasterCard, RuPay, Maestro</p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-colors ${
                      paymentMethod === 'netbanking' ? 'border-[#2874f0] bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment-method"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                        className="text-[#2874f0] focus:ring-[#2874f0]"
                      />
                      <Building2 className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Net Banking</p>
                        <p className="text-[11px] text-gray-500">All Indian banks supported</p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-colors ${
                      paymentMethod === 'cod' ? 'border-[#2874f0] bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment-method"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-[#2874f0] focus:ring-[#2874f0]"
                      />
                      <Banknote className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Cash on Delivery</p>
                        <p className="text-[11px] text-gray-500">Pay cash or UPI at the doorstep</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Pay Now Button */}
              <div className="bg-white p-4 rounded border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Total Payable</p>
                  <p className="text-lg font-black text-gray-900">₹{totalAmount.toLocaleString('en-IN')}</p>
                </div>
                <button
                  id="confirm-pay-btn"
                  type="button"
                  onClick={handlePaymentSubmit}
                  className="bg-[#fb641b] hover:bg-orange-600 text-white font-black py-3 px-8 rounded-sm text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  CONFIRM &amp; PAY ₹{totalAmount.toLocaleString('en-IN')}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Secure 256-Bit SSL Encrypted Transaction</span>
              </div>
            </div>
          )}

          {step === 'success' && confirmedOrder && (
            <div className="bg-white p-6 rounded border border-gray-200 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Order Placed Successfully
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
                  Thank You for Shopping on Flipkart!
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Order ID: <span className="font-mono font-bold text-gray-800">{confirmedOrder.orderId}</span>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded text-xs text-blue-900 text-left flex items-start gap-3">
                <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Estimated Delivery: Tomorrow by 9:00 PM</p>
                  <p className="text-blue-700 mt-0.5">
                    Shipping to {confirmedOrder.shippingAddress.fullName}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.pincode}
                  </p>
                </div>
              </div>

              {/* Items in this order */}
              <div className="border border-gray-200 rounded divide-y divide-gray-100 text-left text-xs max-h-40 overflow-y-auto">
                {confirmedOrder.items.map((item) => (
                  <div key={item.product.id} className="p-2 flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.title} className="w-10 h-10 object-contain rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-gray-900">{item.product.title}</p>
                      <p className="text-gray-500">Qty: {item.quantity} • ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="bg-[#2874f0] hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-sm text-xs shadow-md transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
