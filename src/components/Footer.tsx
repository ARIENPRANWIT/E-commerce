import React from 'react';
import { Store, Gift, HelpCircle, Award, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#212121] text-white text-xs mt-6 pt-6 pb-4 border-t border-gray-700 select-none">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-gray-700/60 pb-6">
        
        {/* Links Left Columns (Cols 1 - 7) */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* About */}
          <div>
            <h4 className="text-gray-400 font-semibold mb-2 uppercase tracking-wider text-[10px]">
              About
            </h4>
            <ul className="space-y-1.5 text-gray-300 text-[11px]">
              <li><a href="#about" className="hover:underline">Contact Us</a></li>
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#about" className="hover:underline">Careers</a></li>
              <li><a href="#about" className="hover:underline">Flipkart Stories</a></li>
              <li><a href="#about" className="hover:underline">Corporate Information</a></li>
            </ul>
          </div>

          {/* Group Companies */}
          <div>
            <h4 className="text-gray-400 font-semibold mb-2 uppercase tracking-wider text-[10px]">
              Group Companies
            </h4>
            <ul className="space-y-1.5 text-gray-300 text-[11px]">
              <li><a href="#myntra" className="hover:underline">Myntra</a></li>
              <li><a href="#cleartrip" className="hover:underline">Cleartrip</a></li>
              <li><a href="#shopsy" className="hover:underline">Shopsy</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-gray-400 font-semibold mb-2 uppercase tracking-wider text-[10px]">
              Help
            </h4>
            <ul className="space-y-1.5 text-gray-300 text-[11px]">
              <li><a href="#payments" className="hover:underline">Payments</a></li>
              <li><a href="#shipping" className="hover:underline">Shipping</a></li>
              <li><a href="#cancellation" className="hover:underline">Cancellation &amp; Returns</a></li>
              <li><a href="#faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Consumer Policy */}
          <div>
            <h4 className="text-gray-400 font-semibold mb-2 uppercase tracking-wider text-[10px]">
              Consumer Policy
            </h4>
            <ul className="space-y-1.5 text-gray-300 text-[11px]">
              <li><a href="#returns" className="hover:underline">Cancellation &amp; Returns</a></li>
              <li><a href="#terms" className="hover:underline">Terms Of Use</a></li>
              <li><a href="#security" className="hover:underline">Security</a></li>
              <li><a href="#privacy" className="hover:underline">Privacy</a></li>
              <li><a href="#sitemap" className="hover:underline">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* Separator / Border */}
        <div className="hidden md:block md:col-span-1 border-l border-gray-700/60" />

        {/* Address Info Right Columns (Cols 9 - 12) */}
        <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] text-gray-300">
          <div>
            <h4 className="text-gray-400 font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
              Mail Us:
            </h4>
            <p className="leading-normal text-gray-400">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &amp; Clove Embassy Tech Village,<br />
              Outer Ring Road, Bengaluru, 560103
            </p>
          </div>

          <div>
            <h4 className="text-gray-400 font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
              Registered Office:
            </h4>
            <p className="leading-normal text-gray-400">
              Flipkart Internet Private Limited,<br />
              CIN: U51109KA2012PTC066107<br />
              Telephone: 044-45614700
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Sub-bar */}
      <div className="max-w-7xl mx-auto px-4 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-gray-300">
        <div className="flex flex-wrap items-center justify-center gap-5">
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer">
            <Store className="w-3.5 h-3.5 text-[#ffe500]" />
            <span>Become a Seller</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer">
            <Award className="w-3.5 h-3.5 text-[#ffe500]" />
            <span>Advertise</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer">
            <Gift className="w-3.5 h-3.5 text-[#ffe500]" />
            <span>Gift Cards</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer">
            <HelpCircle className="w-3.5 h-3.5 text-[#ffe500]" />
            <span>Help Center</span>
          </div>
        </div>

        <div className="text-gray-400 text-[10px]">
          © 2007-2026 Flipkart.com • Online Shopping Store
        </div>
      </div>
    </footer>
  );
};
