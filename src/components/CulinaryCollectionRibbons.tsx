import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Utensils } from 'lucide-react';

interface RibbonItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const CHEFS_SIGNATURES: RibbonItem[] = [
  { id: 'cs-1', title: "A5 Miyazaki Wagyu", category: "Grand Steak", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
  { id: 'cs-2', title: "Black Truffle Pasta", category: "Handmade", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80" },
  { id: 'cs-3', title: "Otoro Caviar Tower", category: "Omakase", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80" },
  { id: 'cs-4', title: "Truffle Burrata Pizza", category: "Woodfired", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" },
  { id: 'cs-5', title: "Chilean Seabass", category: "Ocean Fine", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80" },
  { id: 'cs-6', title: "Duck À L'Orange", category: "French Classic", image: "https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?auto=format&fit=crop&w=800&q=80" },
  { id: 'cs-7', title: "Valrhona Soufflé", category: "Patisserie", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80" },
  { id: 'cs-8', title: "Maine Lobster Tail", category: "Seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80" },
];

const TODAYS_SPECIALS: RibbonItem[] = [
  { id: 'ts-1', title: "Royal Saffron Biryani", category: "Heritage", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80" },
  { id: 'ts-2', title: "Smoked Truffle Burger", category: "Gourmet", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
  { id: 'ts-3', title: "Botanical Gold Elixir", category: "Mixology", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80" },
  { id: 'ts-4', title: "Wild Mushroom Risotto", category: "Cucina", image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80" },
  { id: 'ts-5', title: "Crispy Soft Shell Crab", category: "Seafood", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80" },
  { id: 'ts-6', title: "Artisan Burrata Salad", category: "Organic", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80" },
  { id: 'ts-7', title: "Matcha Velvet Tart", category: "Dessert", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80" },
];

const CUSTOMER_FAVORITES: RibbonItem[] = [
  { id: 'cf-1', title: "Wagyu Beef Carpaccio", category: "Antipasti", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
  { id: 'cf-2', title: "Handcrafted Tiramisu", category: "Dolci", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80" },
  { id: 'cf-3', title: "Fresh Oysters on Ice", category: "Raw Bar", image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80" },
  { id: 'cf-4', title: "Espresso Martini Gold", category: "Cocktails", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80" },
  { id: 'cf-5', title: "Pan-Seared King Salmon", category: "Grill", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80" },
  { id: 'cf-6', title: "Charcuterie & Fromage", category: "Artisanal", image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80" },
  { id: 'cf-7', title: "Gold Leaf Pistachio Tart", category: "Bespoke", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80" },
];

interface RibbonRowProps {
  items: RibbonItem[];
  direction: 'left' | 'right';
  speedSeconds: number;
  label: string;
}

const RibbonRow: React.FC<RibbonRowProps> = ({ items, direction, speedSeconds, label }) => {
  // Triple the array so the marquee loops endlessly without whitespace gaps
  const triplicated = [...items, ...items, ...items];
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative py-3 group">
      {/* Row Category Tag */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          {label}
        </span>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium hidden sm:inline-block">
          Hover to pause · Drag to explore
        </span>
      </div>

      {/* Edge Blur Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div 
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar scrollbar-none cursor-grab active:cursor-grabbing select-none"
      >
        <div 
          className={`flex gap-4 sm:gap-6 w-max ${
            direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
          } group-hover:[animation-play-state:paused]`}
          style={{ animationDuration: `${speedSeconds}s` }}
        >
          {triplicated.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="relative w-48 sm:w-64 h-36 sm:h-48 rounded-2xl sm:rounded-3xl overflow-hidden shrink-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-105 group/item border border-zinc-200/60 dark:border-zinc-800/80 bg-zinc-900"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/item:opacity-90 transition-opacity" />
              
              {/* Minimal Text Overlay (NO CARDS - Pure imagery overlay) */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
                  {item.category}
                </span>
                <h4 className="font-serif font-bold text-xs sm:text-sm leading-tight text-white drop-shadow-sm">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CulinaryCollectionRibbons: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950 overflow-hidden border-t border-zinc-100 dark:border-zinc-900 relative">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-8 sm:mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-900 dark:text-amber-300 border border-amber-500/20 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Cinematic Gastronomy</span>
        </div>
        
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
          OUR CULINARY COLLECTION
        </h2>
        
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-normal">
          An infinite visual journey across our kitchen's master creations, updated daily with seasonal Michelin-star inspirations.
        </p>
      </div>

      {/* Three Infinite Image Ribbons */}
      <div className="space-y-4 sm:space-y-6 relative z-10">
        {/* Row 1: Chef's Signature (Moves Left) */}
        <RibbonRow
          label="Chef's Signature"
          items={CHEFS_SIGNATURES}
          direction="left"
          speedSeconds={32}
        />

        {/* Row 2: Today's Specials (Moves Right) */}
        <RibbonRow
          label="Today's Specials"
          items={TODAYS_SPECIALS}
          direction="right"
          speedSeconds={38}
        />

        {/* Row 3: Customer Favorites (Moves Left Faster) */}
        <RibbonRow
          label="Customer Favorites"
          items={CUSTOMER_FAVORITES}
          direction="left"
          speedSeconds={22}
        />
      </div>

      {/* Tailwind CSS Marquee Keyframes Inline style helper */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333333%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-33.333333%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          animation: marqueeLeft linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight linear infinite;
        }
      `}</style>
    </section>
  );
};
