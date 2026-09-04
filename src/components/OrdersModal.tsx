import React from 'react';
import { X, Package, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderDetails[];
  onStartShopping: () => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onStartShopping,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-[#f1f2f4] w-full max-w-2xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="bg-[#2874f0] text-white p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#ffe500]" />
            <h2 className="font-bold text-base sm:text-lg">
              My Orders ({orders.length})
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
        {orders.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <Package className="w-10 h-10" />
            </div>
            <h3 className="text-base font-bold text-gray-900">No Orders Placed Yet</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">
              Check out trending smartphones, electronics, and fashion deals to place your first order.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartShopping();
              }}
              className="mt-5 bg-[#2874f0] hover:bg-blue-600 text-white font-bold py-2 px-5 rounded text-xs shadow"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-sm border border-gray-200 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b pb-2 text-xs">
                  <div>
                    <span className="text-gray-500">Order ID: </span>
                    <span className="font-mono font-bold text-gray-800">{order.orderId}</span>
                  </div>
                  <span className="text-gray-500">{order.date}</span>
                </div>

                {/* Status Bar */}
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold">Order Confirmed &amp; Dispatched</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    Delivery by Tomorrow, 9 PM
                  </span>
                </div>

                {/* Items in this order */}
                <div className="divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="py-2.5 flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-12 h-12 object-contain bg-gray-50 rounded p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {item.product.title}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Qty: {item.quantity} • ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Summary */}
                <div className="border-t pt-2 flex flex-col sm:flex-row justify-between text-xs text-gray-600 gap-2">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Deliver to: {order.shippingAddress.fullName}
                    </p>
                    <p className="text-gray-500 text-[11px]">
                      {order.shippingAddress.addressLine}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="font-bold text-gray-900 text-sm">
                      Total: ₹{order.totalAmount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[11px] text-gray-500">{order.paymentMethod}</p>
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
