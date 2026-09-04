import React from 'react';
import {
  Smartphone,
  Laptop,
  Tv,
  Shirt,
  Armchair,
  Sparkles,
  LayoutGrid,
} from 'lucide-react';
import { CATEGORIES } from '../data/mockProducts';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'mobiles':
      return <Smartphone className="w-7 h-7 text-blue-600" />;
    case 'electronics':
      return <Laptop className="w-7 h-7 text-indigo-600" />;
    case 'appliances':
      return <Tv className="w-7 h-7 text-amber-600" />;
    case 'fashion':
      return <Shirt className="w-7 h-7 text-pink-600" />;
    case 'home':
      return <Armchair className="w-7 h-7 text-emerald-600" />;
    case 'beauty':
      return <Sparkles className="w-7 h-7 text-purple-600" />;
    default:
      return <LayoutGrid className="w-7 h-7 text-[#2874f0]" />;
  }
};

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex justify-between shrink-0 shadow-sm select-none">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between overflow-x-auto no-scrollbar gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <div
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-center gap-1 group cursor-pointer shrink-0 transition-transform ${
                isSelected ? 'scale-105' : 'hover:opacity-90'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-blue-50 ring-2 ring-[#2874f0]'
                    : 'bg-gray-100 group-hover:bg-blue-50'
                }`}
              >
                {getCategoryIcon(cat.id)}
              </div>
              <span
                className={`font-semibold text-xs text-center whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'text-[#2874f0]'
                    : 'text-gray-800 group-hover:text-[#2874f0]'
                }`}
              >
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
