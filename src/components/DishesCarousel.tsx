import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Clock, Flame, Sparkles, Plus, Check, Star, Wine } from 'lucide-react';

interface DishesCarouselProps {
  dishes?: MenuItem[];
  menuItems?: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onSelectDish?: (item: MenuItem) => void;
}

export const DishesCarousel: React.FC<DishesCarouselProps> = ({
  dishes,
  menuItems,
  onAddToCart,
  onSelectDish
}) => {
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const handleAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedIds(prev => [...prev, item.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== item.id));
    }, 1500);
  };

  const itemList = dishes || menuItems || [];
  const specials = itemList.filter(d => d && (d.isChefRecommendation || d.isBestSeller || d.isTrending));

  return (
    <section className="py-16 bg-zinc-50/60 dark:bg-zinc-950/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Today's Culinary Highlights
            </span>
            <h2 className="font-serif text-3xl font-bold text-zinc-900 dark:text-white mt-1">
              Chef's Special Selections & Trending Dishes
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
            Handcrafted daily using organic heirloom ingredients and rare seasonal harvests.
          </p>
        </div>

        {/* Dishes Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specials.slice(0, 6).map(dish => {
            const isAdded = addedIds.includes(dish.id);
            return (
              <div
                key={dish.id}
                onClick={() => onSelectDish ? onSelectDish(dish) : onAddToCart(dish)}
                className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badges Top Left */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {dish.isChefRecommendation && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Chef Pick
                        </span>
                      )}
                      {dish.isBestSeller && (
                        <span className="px-2.5 py-1 rounded-full bg-zinc-900/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          Best Seller
                        </span>
                      )}
                    </div>

                    {/* Veg / Non Veg Top Right */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
                        dish.dietary === 'veg' || dish.dietary === 'vegan'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {dish.dietary}
                      </span>
                    </div>

                    {/* Wine Pairing Ribbon */}
                    {dish.pairingWine && (
                      <div className="absolute bottom-3 left-3 right-3 text-xs text-amber-200 flex items-center gap-1.5 font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                        <Wine className="w-3.5 h-3.5 text-amber-400" />
                        <span className="truncate">{dish.pairingWine}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {dish.name}
                      </h3>
                      <span className="font-serif font-bold text-lg text-zinc-900 dark:text-amber-300">
                        ${dish.price}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Footer Metrics & Action */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 mt-2">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> {dish.prepTimeMinutes}m
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-600" /> {dish.calories} kcal
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleAdd(dish, e)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Order Dish</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
