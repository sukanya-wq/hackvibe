import React, { useState } from 'react';
import { Sparkles, Utensils, Wine, Heart, Flame, Clock, Check, ChevronRight } from 'lucide-react';
import { MenuItem } from '../types';

interface AIDishRecommenderProps {
  onAddToCart: (item: MenuItem) => void;
  allDishes: MenuItem[];
}

interface DishImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackDishName?: string;
}

export const DishImageWithFallback: React.FC<DishImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackDishName
}) => {
  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
  const [currentSrc, setCurrentSrc] = useState<string>(src || DEFAULT_IMAGE);
  const [hasError, setHasError] = useState<boolean>(!src);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    if (src) {
      setCurrentSrc(src);
      setHasError(false);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [src]);

  const handleError = () => {
    if (currentSrc !== DEFAULT_IMAGE) {
      setCurrentSrc(DEFAULT_IMAGE);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black p-6 flex flex-col items-center justify-center text-center space-y-2 border border-amber-500/20">
        <div className="p-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <Utensils className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90 block">
            Gourmet Presentation
          </span>
          <p className="font-serif font-bold text-sm text-white line-clamp-1 max-w-[200px]">
            {fallbackDishName || alt}
          </p>
        </div>
        <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
          L'Étoile House Specialty
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900">
      {isLoading && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse flex items-center justify-center">
          <Utensils className="w-5 h-5 text-amber-500/50" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading="eager"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  );
};

export const AIDishRecommender: React.FC<AIDishRecommenderProps> = ({ onAddToCart, allDishes = [] }) => {
  const [mood, setMood] = useState('Luxurious Indulgence');
  const [weather, setWeather] = useState('Warm Evening');
  const [dietary, setDietary] = useState('None');
  const [budget, setBudget] = useState('Fine Dining');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<{
    dishName: string;
    reason: string;
    winePairing?: string;
    image?: string;
    price?: number;
  }[] | null>([
    {
      dishName: 'A5 Miyazaki Wagyu Ribeye',
      reason: 'Our flagship signature cut, seared with black garlic glaze and maitake mushrooms for an unforgettable dinner.',
      winePairing: '2018 Chateau Margaux Cabernet Sauvignon',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    },
    {
      dishName: 'Black Truffle & Cacio e Pepe Tagliolini',
      reason: 'Handmade fresh pasta tossed with aged Pecorino Romano and generous shaves of Norcia black truffle.',
      winePairing: '2020 Barolo DOCG Nebbiolo',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80'
    },
    {
      dishName: 'Slow-Confit Duck Leg with Cherry Reduction',
      reason: 'French heritage duck leg crisp, parsnip mousse & sour cherry star anise reduction.',
      winePairing: '2019 Domaine Dujac Morey-Saint-Denis Pinot Noir',
      image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  const fallbackDishImages: Record<string, string> = {
    'A5 Miyazaki Wagyu Ribeye': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    'Black Truffle & Cacio e Pepe Tagliolini': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    'Slow-Confit Duck Leg with Cherry Reduction': 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80',
    'Grand Cru Dark Chocolate & Matcha Soufflé': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    'Chilean Sea Bass': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    'Chilean Sea Bass en Papillote': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    'Hokkaido Scallop': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    'Hokkaido Scallop & Oscietra Caviar Tartlet': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    'Morel Mushroom': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    'Morel Mushroom & Sunchoke Velouté': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    'Morel Mushroom & Roasted Sunchoke Velouté': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80'
  };

  const moods = ['Luxurious Indulgence', 'Romantic Anniversary', 'Executive Business Dinner', 'Light & Fresh'];
  const weathers = ['Warm Summer Evening', 'Cool Crisp Night', 'Rainy Cozy Evening', 'Sunny Afternoon'];
  const dietaries = ['None', 'Vegetarian', 'Vegan', 'Gluten-Sensitive'];

  const getSmartFallbackRecommendations = (selectedMood: string, selectedDietary: string) => {
    if (selectedDietary === 'Vegetarian' || selectedDietary === 'Vegan') {
      return [
        {
          dishName: 'Morel Mushroom & Sunchoke Velouté',
          reason: `Rich plant-based indulgence crafted with wild French chanterelles, sunchoke crisps, and cold-pressed white truffle oil. Perfect for a ${selectedMood.toLowerCase()}.`,
          winePairing: '2021 Domaine Leflaive Puligny-Montrachet'
        },
        {
          dishName: 'Black Truffle & Cacio e Pepe Tagliolini',
          reason: 'Artisanal egg-free pasta emulsion tossed with organic Kampot black pepper and shaved Norcia black winter truffle.',
          winePairing: '2020 Barolo DOCG Nebbiolo'
        },
        {
          dishName: 'Grand Cru Dark Chocolate & Matcha Soufflé',
          reason: 'Decadent 72% Valrhona dark chocolate with a molten center, accompanied by house-made Kyoto Uji matcha gelato.',
          winePairing: 'Château d\'Yquem Sauternes Dessert Wine'
        }
      ];
    }

    if (selectedDietary === 'Gluten-Sensitive') {
      return [
        {
          dishName: 'A5 Miyazaki Wagyu Ribeye',
          reason: `Naturally gluten-free prime Japanese Wagyu, char-broiled over binchotan charcoal with bone marrow reduction and charred maitake. Tailored for ${selectedMood.toLowerCase()}.`,
          winePairing: '2018 Chateau Margaux Cabernet Sauvignon'
        },
        {
          dishName: 'Chilean Sea Bass',
          reason: 'Pan-roasted wild sea bass served over saffron risotto, baby leeks, and a delicate lemongrass dashi broth.',
          winePairing: '2019 Meursault Domaine Roulot Chardonnay'
        },
        {
          dishName: 'Hokkaido Scallop',
          reason: 'Hand-harvested Japanese scallops lightly seared with yuzu kosho butter, heirloom radish, and Oscietra caviar.',
          winePairing: 'Dom Pérignon Vintage Champagne 2013'
        }
      ];
    }

    return [
      {
        dishName: 'A5 Miyazaki Wagyu Ribeye',
        reason: `Our crown jewel cut seared over Japanese hardwood charcoal with smoked garlic glaze and maitake mushrooms. Curated for your ${selectedMood.toLowerCase()}.`,
        winePairing: '2018 Chateau Margaux Cabernet Sauvignon'
      },
      {
        dishName: 'Slow-Confit Duck Leg with Cherry Reduction',
        reason: 'Crispy skin heritage duck leg braised in duck fat for 14 hours with parsnip silk and sour cherry star-anise reduction.',
        winePairing: '2019 Domaine Dujac Morey-Saint-Denis Pinot Noir'
      },
      {
        dishName: 'Black Truffle & Cacio e Pepe Tagliolini',
        reason: 'Hand-rolled fresh pasta tossed in aged Pecorino Romano, Kampot pepper, and freshly shaved Norcia black truffles.',
        winePairing: '2020 Barolo DOCG Nebbiolo'
      }
    ];
  };

  const handleRecommend = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood,
          weather,
          dietary,
          budget
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const recList = Array.isArray(data) ? data : (data?.recommendations || []);

      if (recList && recList.length > 0) {
        setRecommendations(recList);
      } else {
        setRecommendations(getSmartFallbackRecommendations(mood, dietary));
      }
    } catch (err) {
      console.warn('AI Recommendation API error, using intelligent sommelier fallback:', err);
      setRecommendations(getSmartFallbackRecommendations(mood, dietary));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-zinc-900 border-t border-b border-zinc-200/80 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" /> AI Sommelier Engine
          </span>
          <h2 className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">
            Personalized Culinary Matchmaker
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Tell our AI your current mood, atmosphere, and dietary needs for tailored menu curation.
          </p>
        </div>

        {/* Wizard Form */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm space-y-6 mb-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Mood Picker */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
                Dining Mood / Vibe
              </label>
              <select
                value={mood}
                onChange={e => setMood(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {moods.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Weather Picker */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
                Current Weather
              </label>
              <select
                value={weather}
                onChange={e => setWeather(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {weathers.map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            {/* Dietary Picker */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
                Dietary Preference
              </label>
              <select
                value={dietary}
                onChange={e => setDietary(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {dietaries.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

          </div>

          <button
            onClick={handleRecommend}
            disabled={isLoading}
            className="w-full py-4 bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-sm rounded-2xl shadow-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>AI Sommelier Crafting Recommendations...</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate AI Dish & Wine Pairings</span>
              </>
            )}
          </button>

        </div>

        {/* Results Cards */}
        {recommendations && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-300">
            {recommendations.map((rec, i) => {
              const safeList = allDishes || [];
              const recNameLower = (rec.dishName || '').toLowerCase().trim();

              // Flexible matching against allDishes
              let matchedDish = safeList.find(d => d && d.name && d.name.toLowerCase().trim() === recNameLower);

              if (!matchedDish) {
                matchedDish = safeList.find(d =>
                  d && d.name && (d.name.toLowerCase().includes(recNameLower) || recNameLower.includes(d.name.toLowerCase()))
                );
              }

              if (!matchedDish && recNameLower) {
                const keywords = ['wagyu', 'truffle', 'bass', 'scallop', 'morel', 'duck', 'soufflé', 'souffle', 'pasta', 'steak', 'velouté', 'veloute', 'chocolate'];
                const matchedKeyword = keywords.find(k => recNameLower.includes(k));
                if (matchedKeyword) {
                  matchedDish = safeList.find(d => d && (d.name.toLowerCase().includes(matchedKeyword) || d.description.toLowerCase().includes(matchedKeyword)));
                }
              }

              // Determine Image Source
              let cardImage = rec.image || matchedDish?.image;

              if (!cardImage) {
                if (fallbackDishImages[rec.dishName]) {
                  cardImage = fallbackDishImages[rec.dishName];
                } else {
                  const matchingKey = Object.keys(fallbackDishImages).find(
                    k => k.toLowerCase().includes(recNameLower) || recNameLower.includes(k.toLowerCase())
                  );
                  if (matchingKey) {
                    cardImage = fallbackDishImages[matchingKey];
                  }
                }
              }

              const cardPrice = rec.price || matchedDish?.price || 42;

              const itemToCart: MenuItem = matchedDish || {
                id: 'ai-rec-' + i + '-' + Date.now(),
                name: rec.dishName,
                category: 'mains',
                price: cardPrice,
                description: rec.reason,
                image: cardImage || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
                prepTimeMinutes: 18,
                calories: 580,
                dietary: dietary === 'Vegetarian' || dietary === 'Vegan' ? 'veg' : 'non-veg',
                available: true,
                ingredients: ['Artisanal ingredients', 'Chef secret glaze'],
                rating: 4.9,
                reviewsCount: 92
              };

              return (
                <div
                  key={i}
                  className="group rounded-3xl bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-800/80 shadow-lg space-y-4 flex flex-col justify-between overflow-hidden hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300"
                >
                  {/* Dish Image Banner */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <DishImageWithFallback
                      src={cardImage}
                      alt={rec.dishName}
                      fallbackDishName={rec.dishName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-zinc-950 font-bold text-[10px] uppercase tracking-wider shadow-md">
                      AI Match #{i + 1}
                    </div>

                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-300 font-serif font-bold text-sm border border-amber-400/30">
                      ${cardPrice}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h4 className="font-serif font-bold text-lg leading-snug drop-shadow-sm">
                        {rec.dishName}
                      </h4>
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed bg-amber-50/50 dark:bg-amber-950/30 p-3 rounded-2xl border border-amber-200/50 dark:border-amber-800/40 italic">
                        "{rec.reason}"
                      </p>

                      {rec.winePairing && (
                        <div className="text-xs text-amber-800 dark:text-amber-300 flex items-center gap-1.5 font-medium bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                          <Wine className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span><strong>Sommelier Pairing:</strong> {rec.winePairing}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(itemToCart)}
                      className="w-full py-3 bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Add {itemToCart.name} to Order</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
