import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Sparkles } from 'lucide-react';

export const FlipkartFeaturesStrip: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm py-2.5 px-4 my-3 shadow-sm select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#2874f0] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-tight">f-Assured Quality</p>
            <p className="text-[10px] text-gray-500">6 Quality checks passed</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-tight">Fast Free Delivery</p>
            <p className="text-[10px] text-gray-500">On orders above ₹499</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-tight">Easy 7-Day Returns</p>
            <p className="text-[10px] text-gray-500">Hassle-free replacement</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-tight">100% Genuine</p>
            <p className="text-[10px] text-gray-500">Authorized direct brands</p>
          </div>
        </div>
      </div>
    </div>
  );
};
