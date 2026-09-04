import React from 'react';
import { Filter, RotateCcw, Star, Check } from 'lucide-react';
import { FilterState } from '../types';
import { CATEGORIES } from '../data/mockProducts';

interface FilterSidebarProps {
  filters: FilterState;
  onChangeFilters: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  totalResults,
}) => {
  return (
    <aside className="w-full bg-white rounded-sm border border-gray-200 shadow-xs p-4 divide-y divide-gray-200 text-sm">
      {/* Header */}
      <div className="pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#2874f0]" />
          <h2 className="font-bold text-gray-900 uppercase tracking-wider text-xs">
            Filters
          </h2>
          <span className="text-xs text-gray-500 font-normal">({totalResults} items)</span>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs font-semibold text-[#2874f0] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Flipkart Assured Only Toggle */}
      <div className="py-3">
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-0.5 bg-blue-50 text-[#2874f0] border border-blue-200 px-1.5 py-0.5 rounded-xs text-xs font-extrabold">
              <span className="italic font-black text-amber-500">f</span>
              <span>Assured</span>
            </div>
            <span className="text-xs text-gray-700 font-medium">Only</span>
          </div>
          <input
            type="checkbox"
            checked={filters.onlyFAssured}
            onChange={(e) => onChangeFilters({ onlyFAssured: e.target.checked })}
            className="w-4 h-4 rounded text-[#2874f0] focus:ring-[#2874f0] cursor-pointer"
          />
        </label>
      </div>

      {/* Category Filter */}
      <div className="py-3">
        <h3 className="font-bold text-xs uppercase text-gray-700 mb-2">Category</h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChangeFilters({ category: cat.id })}
              className={`w-full text-left px-2 py-1 rounded text-xs transition-colors flex items-center justify-between ${
                filters.category === cat.id
                  ? 'bg-blue-50 text-[#2874f0] font-bold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{cat.name}</span>
              {filters.category === cat.id && <Check className="w-3.5 h-3.5 text-[#2874f0]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="py-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xs uppercase text-gray-700">Max Price</h3>
          <span className="text-xs font-bold text-blue-600">
            ₹{filters.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min={2000}
          max={150000}
          step={2000}
          value={filters.maxPrice}
          onChange={(e) => onChangeFilters({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#2874f0] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>₹2,000</span>
          <span>₹1,50,000</span>
        </div>

        {/* Quick Price Buckets */}
        <div className="grid grid-cols-2 gap-1.5 mt-3">
          <button
            type="button"
            onClick={() => onChangeFilters({ minPrice: 0, maxPrice: 10000 })}
            className={`text-[11px] py-1 px-1.5 border rounded text-center transition-colors ${
              filters.maxPrice <= 10000 ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Under ₹10,000
          </button>
          <button
            type="button"
            onClick={() => onChangeFilters({ minPrice: 0, maxPrice: 35000 })}
            className={`text-[11px] py-1 px-1.5 border rounded text-center transition-colors ${
              filters.maxPrice > 10000 && filters.maxPrice <= 35000 ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Under ₹35,000
          </button>
          <button
            type="button"
            onClick={() => onChangeFilters({ minPrice: 0, maxPrice: 75000 })}
            className={`text-[11px] py-1 px-1.5 border rounded text-center transition-colors ${
              filters.maxPrice > 35000 && filters.maxPrice <= 75000 ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Under ₹75,000
          </button>
          <button
            type="button"
            onClick={() => onChangeFilters({ minPrice: 0, maxPrice: 150000 })}
            className={`text-[11px] py-1 px-1.5 border rounded text-center transition-colors ${
              filters.maxPrice >= 140000 ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Prices
          </button>
        </div>
      </div>

      {/* Customer Ratings Filter */}
      <div className="py-3">
        <h3 className="font-bold text-xs uppercase text-gray-700 mb-2">Customer Ratings</h3>
        <div className="space-y-1.5">
          {[4, 3, 2].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900"
            >
              <input
                type="radio"
                name="rating-filter"
                checked={filters.minRating === rating}
                onChange={() => onChangeFilters({ minRating: rating })}
                className="w-3.5 h-3.5 text-[#2874f0] focus:ring-[#2874f0]"
              />
              <div className="flex items-center gap-1">
                <span>{rating}★ &amp; above</span>
                <div className="flex text-amber-400">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>
            </label>
          ))}
          <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900">
            <input
              type="radio"
              name="rating-filter"
              checked={filters.minRating === 0}
              onChange={() => onChangeFilters({ minRating: 0 })}
              className="w-3.5 h-3.5 text-[#2874f0] focus:ring-[#2874f0]"
            />
            <span>All Ratings</span>
          </label>
        </div>
      </div>
    </aside>
  );
};
