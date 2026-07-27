import React, { useState, useMemo } from 'react';
import { MenuItem, DietaryType } from '../types';
import { Search, Filter, SlidersHorizontal, Clock, Flame, Sparkles, Plus, Check, Star, Wine, AlertCircle, Info, ChevronRight } from 'lucide-react';

interface DigitalMenuProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onSelectDish: (item: MenuItem) => void;
}

export const DigitalMenu: React.FC<DigitalMenuProps> = ({
  menuItems = [],
  onAddToCart,
  onSelectDish
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'preptime'>('popular');
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);
  const [selectedInspectDish, setSelectedInspectDish] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', name: 'Full Menu' },
    { id: 'starters', name: 'Starters & Amuse' },
    { id: 'mains', name: 'Entrées & Cuts' },
    { id: 'pastas', name: 'Pastas & Risottos' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'drinks', name: 'Artisanal Drinks' }
  ];

  const handleAdd = (item: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddToCart(item);
    setAddedItemIds(prev => [...prev, item.id]);
    setTimeout(() => {
      setAddedItemIds(prev => prev.filter(id => id !== item.id));
    }, 1500);
  };

  const filteredMenu = useMemo(() => {
    const list = menuItems || [];
    return list
      .filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesDietary = dietaryFilter === 'all' || item.dietary === dietaryFilter;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesDietary && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'preptime') return a.prepTimeMinutes - b.prepTimeMinutes;
        return b.rating - a.rating;
      });
  }, [menuItems, selectedCategory, dietaryFilter, searchQuery, sortBy]);

  return (
    <section className="py-12 bg-white dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            L'Étoile Gastronomy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Interactive Digital Tasting Menu
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Search ingredients, filter dietary preferences, or view pairing recommendations in real time.
          </p>
        </div>

        {/* Search & Control Bar */}
        <div className="bg-zinc-50 dark:bg-zinc-800/60 p-4 sm:p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-700/80 mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search dishes, ingredients (e.g. Wagyu, Truffle, Caviar)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700 rounded-2xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700 text-xs font-semibold rounded-2xl px-3 py-3 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="popular">Sort: Highest Rated</option>
                <option value="price-asc">Sort: Price Low to High</option>
                <option value="price-desc">Sort: Price High to Low</option>
                <option value="preptime">Sort: Fastest Prep Time</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-900 text-white dark:bg-amber-500 dark:text-zinc-950 shadow-md'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="flex items-center gap-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-700/50">
            <span className="text-xs text-zinc-500 font-medium">Dietary:</span>
            {(['all', 'veg', 'non-veg', 'vegan'] as const).map(diet => (
              <button
                key={diet}
                onClick={() => setDietaryFilter(diet)}
                className={`px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
                  dietaryFilter === diet
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 font-bold border border-amber-300'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                {diet}
              </button>
            ))}
          </div>

        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map(dish => {
            const isAdded = addedItemIds.includes(dish.id);
            return (
              <div
                key={dish.id}
                className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => setSelectedInspectDish(dish)}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Top Left Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {dish.isChefRecommendation && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-3 h-3" /> Chef Pick
                        </span>
                      )}
                      {dish.isTrending && (
                        <span className="px-2.5 py-1 rounded-full bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          Trending
                        </span>
                      )}
                    </div>

                    {/* Top Right Dietary Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
                        dish.dietary === 'veg' || dish.dietary === 'vegan'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {dish.dietary}
                      </span>
                    </div>

                    {/* Wine Ribbon */}
                    {dish.pairingWine && (
                      <div className="absolute bottom-3 left-3 right-3 text-xs text-amber-200 flex items-center gap-1.5 font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-xl">
                        <Wine className="w-3.5 h-3.5 text-amber-400" />
                        <span className="truncate">{dish.pairingWine}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        onClick={() => setSelectedInspectDish(dish)}
                        className="font-serif font-bold text-lg text-zinc-900 dark:text-white cursor-pointer hover:text-amber-600 transition-colors"
                      >
                        {dish.name}
                      </h3>
                      <span className="font-serif font-bold text-xl text-zinc-900 dark:text-amber-300">
                        ${dish.price}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>

                    {/* Key Ingredients */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {dish.ingredients.slice(0, 3).map((ing, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium">
                          {ing}
                        </span>
                      ))}
                      {dish.ingredients.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-400 font-medium">
                          +{dish.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 mt-2">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> {dish.prepTimeMinutes}m
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-600" /> {dish.calories} kcal
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedInspectDish(dish)}
                      className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 transition-colors"
                      title="Inspect Ingredients & Nutrition"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    <button
                      onClick={e => handleAdd(dish, e)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400 shadow-sm'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-16 text-zinc-500 dark:text-zinc-400 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-amber-500" />
            <p className="font-serif font-bold text-lg text-zinc-800 dark:text-white">No dishes match your filter criteria.</p>
            <p className="text-xs">Try searching for other ingredients or resetting dietary filters.</p>
          </div>
        )}

      </div>

      {/* Dish Detailed Inspect Modal */}
      {selectedInspectDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="relative h-64">
              <img src={selectedInspectDish.image} alt={selectedInspectDish.name} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedInspectDish(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Category: {selectedInspectDish.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
                    {selectedInspectDish.name}
                  </h3>
                </div>
                <span className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-300">
                  ${selectedInspectDish.price}
                </span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {selectedInspectDish.description}
              </p>

              {/* Spec Badges */}
              <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 text-center text-xs font-semibold">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Prep Time</span>
                  <span className="text-zinc-900 dark:text-white">{selectedInspectDish.prepTimeMinutes} min</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Energy</span>
                  <span className="text-zinc-900 dark:text-white">{selectedInspectDish.calories} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Rating</span>
                  <span className="text-amber-500 font-bold">★ {selectedInspectDish.rating}</span>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Ingredients:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedInspectDish.ingredients.map((ing, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergens Warning */}
              {selectedInspectDish.allergens && selectedInspectDish.allergens.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Allergen Notice: Contains {selectedInspectDish.allergens.join(', ')}.</span>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    handleAdd(selectedInspectDish);
                    setSelectedInspectDish(null);
                  }}
                  className="w-full py-3 bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Add {selectedInspectDish.name} to Order • ${selectedInspectDish.price}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
