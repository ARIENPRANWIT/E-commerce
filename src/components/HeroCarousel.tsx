import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Award, ArrowRight } from 'lucide-react';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  category: string;
  ctaText: string;
  bgGradient: string;
  accentColor: string;
  imageUrl: string;
  offerPill: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'THE BIG BILLION DAYS',
    subtitle: 'Blockbuster Deals on Apple, Samsung & Laptops',
    tag: 'MEGA SALE IS LIVE',
    category: 'electronics',
    ctaText: 'Explore Tech Deals',
    bgGradient: 'from-blue-900 via-indigo-900 to-slate-950',
    accentColor: '#ffe500',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    offerPill: 'Up to 80% Off',
  },
  {
    id: 2,
    title: 'FLAGSHIP SMARTPHONE FEST',
    subtitle: 'iPhone 15, S24 Ultra & Nothing Phone 2a',
    tag: 'FLIPKART SPECIAL',
    category: 'mobiles',
    ctaText: 'Shop Smartphones',
    bgGradient: 'from-sky-900 via-blue-900 to-slate-900',
    accentColor: '#38bdf8',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    offerPill: 'Extra ₹5,000 Exchange Bonus',
  },
  {
    id: 3,
    title: 'TRENDING FASHION CARNIVAL',
    subtitle: 'Nike, Levi’s, Ray-Ban & Top Global Brands',
    tag: 'SEASON HIGHLIGHTS',
    category: 'fashion',
    ctaText: 'Refresh Your Wardrobe',
    bgGradient: 'from-rose-950 via-purple-950 to-slate-950',
    accentColor: '#fb7185',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    offerPill: 'Min 50% - 70% Off',
  },
  {
    id: 4,
    title: 'SMART LIVING & APPLIANCES',
    subtitle: '4K Smart TVs, Dyson Vacuums & Philips Air Fryers',
    tag: 'HOME UPGRADES',
    category: 'appliances',
    ctaText: 'Explore Home & Appliances',
    bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
    accentColor: '#34d399',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    offerPill: 'Free Installation Included',
  },
];

interface HeroCarouselProps {
  onSelectCategory: (categoryId: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="bg-white h-48 sm:h-56 md:h-64 w-full shadow-sm relative flex items-center justify-center overflow-hidden rounded-sm select-none">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-900 opacity-90 transition-all duration-700" />

      {/* Slide Content */}
      <div className="relative z-10 text-white text-center px-6 sm:px-12 flex flex-col items-center">
        <div className="inline-block text-[11px] font-bold text-[#ffe500] uppercase tracking-wider mb-1">
          {slide.tag}
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold mb-1.5 sm:mb-2 tracking-tight drop-shadow-xs">
          {slide.title}
        </h2>
        <p className="text-sm sm:text-xl opacity-90 font-medium">
          {slide.subtitle} • {slide.offerPill}
        </p>
        <button
          type="button"
          onClick={() => onSelectCategory(slide.category)}
          className="mt-3 sm:mt-4 inline-block bg-[#ffe500] hover:bg-yellow-400 text-black px-6 sm:px-8 py-2 font-bold rounded-sm text-xs sm:text-sm tracking-wide transition-colors cursor-pointer shadow-sm active:scale-95"
        >
          SHOP NOW
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 sm:w-8 h-12 bg-white/70 hover:bg-white text-gray-800 flex items-center justify-center rounded-r shadow-xs z-20 transition-colors cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 sm:w-8 h-12 bg-white/70 hover:bg-white text-gray-800 flex items-center justify-center rounded-l shadow-xs z-20 transition-colors cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Dots */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {HERO_SLIDES.map((s, index) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === index ? 'w-5 bg-[#ffe500]' : 'w-1.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
