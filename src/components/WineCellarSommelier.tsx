import React, { useState } from 'react';
import { Wine, Sparkles, Filter, Check, ShoppingBag, Award, Compass, Search, GlassWater } from 'lucide-react';
import { MenuItem } from '../types';

interface WineItem {
  id: string;
  name: string;
  vintage: string;
  region: string;
  grape: string;
  price: number;
  glassPrice?: number;
  rating: number;
  tastingNotes: string[];
  bestPairedWith: string;
  description: string;
  image: string;
  type: 'Red' | 'White' | 'Sparkling' | 'Rosé' | 'Dessert';
}

const WINE_COLLECTION: WineItem[] = [
  {
    id: 'wine-1',
    name: "Château Margaux Premier Grand Cru Classé",
    vintage: "2018",
    region: "Bordeaux, France",
    grape: "Cabernet Sauvignon Blend",
    price: 480,
    glassPrice: 85,
    rating: 99,
    tastingNotes: ["Blackberry", "Violets", "Cedarwood", "Velvety Tannins"],
    bestPairedWith: "A5 Miyazaki Wagyu Ribeye & Prime Cut Steaks",
    description: "An extraordinary vintage delivering floral complexity, seamless structure, and immense length on the palate.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    type: "Red"
  },
  {
    id: 'wine-2',
    name: "Domaine Leflaive Puligny-Montrachet",
    vintage: "2021",
    region: "Burgundy, France",
    grape: "Chardonnay",
    price: 240,
    glassPrice: 45,
    rating: 97,
    tastingNotes: ["White Peach", "Crushed Flint", "Hazelnut", "Crystalline Acidity"],
    bestPairedWith: "Chilean Sea Bass & Hokkaido Scallop Tartlet",
    description: "The gold standard of White Burgundy. Pristine minerality balanced with creamy lemon curd and subtle French oak.",
    image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&w=800&q=80",
    type: "White"
  },
  {
    id: 'wine-3',
    name: "Dom Pérignon Vintage Brut Champagne",
    vintage: "2013",
    region: "Épernay, Champagne, France",
    grape: "Pinot Noir / Chardonnay",
    price: 320,
    glassPrice: 60,
    rating: 98,
    tastingNotes: ["Toasted Brioche", "Candied Citrus", "Smoky Quartz", "Ethereal Effervescence"],
    bestPairedWith: "Oscietra Caviar & Light Appetizers",
    description: "Precision in every bubble. A harmonious blend of intense structure and weightless, silken minerality.",
    image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=800&q=80",
    type: "Sparkling"
  },
  {
    id: 'wine-4',
    name: "Barolo DOCG Riserva Monfortino",
    vintage: "2016",
    region: "Piedmont, Italy",
    grape: "Nebbiolo",
    price: 390,
    glassPrice: 70,
    rating: 99,
    tastingNotes: ["Dried Rose Petals", "Tar & Leather", "Black Cherry", "Truffle Spice"],
    bestPairedWith: "Black Truffle & Cacio e Pepe Tagliolini",
    description: "A monumental Barolo of immense depth. Earthy complexity that weaves perfectly through fresh winter black truffles.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
    type: "Red"
  },
  {
    id: 'wine-5',
    name: "Château d'Yquem Premier Cru Supérieur",
    vintage: "2015",
    region: "Sauternes, Bordeaux, France",
    grape: "Sémillon / Sauvignon Blanc",
    price: 290,
    glassPrice: 50,
    rating: 98,
    tastingNotes: ["Honeyed Apricot", "Saffron", "Orange Blossom", "Silky Acidity"],
    bestPairedWith: "Grand Cru Dark Chocolate Soufflé & Artisanal Cheeses",
    description: "The supreme nectar of Sauternes. Unrivaled complexity with bright uplifting citrus spine preventing any heaviness.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    type: "Dessert"
  }
];

interface WineCellarProps {
  onAddToCart?: (item: MenuItem) => void;
}

export const WineCellarSommelier: React.FC<WineCellarProps> = ({ onAddToCart }) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWine, setSelectedWine] = useState<WineItem | null>(WINE_COLLECTION[0]);
  const [orderFormat, setOrderFormat] = useState<'bottle' | 'glass'>('bottle');

  const filteredWines = WINE_COLLECTION.filter(w => {
    const matchesType = filterType === 'All' || w.type === filterType;
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.bestPairedWith.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAddWineToCart = (wine: WineItem, format: 'bottle' | 'glass') => {
    if (!onAddToCart) return;
    const price = format === 'glass' ? (wine.glassPrice || 45) : wine.price;
    const menuItem: MenuItem = {
      id: `wine-${wine.id}-${format}`,
      name: `${wine.name} (${format === 'glass' ? 'Glass' : 'Bottle'})`,
      category: 'drinks',
      price: price,
      description: `${wine.vintage} ${wine.region}. ${wine.description}`,
      image: wine.image,
      prepTimeMinutes: 5,
      calories: format === 'glass' ? 140 : 620,
      dietary: 'veg',
      available: true,
      ingredients: [wine.grape, wine.region, wine.vintage],
      rating: wine.rating / 20,
      reviewsCount: 48
    };
    onAddToCart(menuItem);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Wine className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Virtual Sommelier & Grand Cru Cellar
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Grand Reserve Vintage Cellar
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Hand-curated rare vintages temperature-controlled in L'Étoile's subterranean cellar.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Red', 'White', 'Sparkling', 'Dessert'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === type
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Wine Showcase & Sommelier Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Wine List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search vintage, grape, or dish pairing..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredWines.map(wine => {
              const isSelected = selectedWine?.id === wine.id;
              return (
                <div
                  key={wine.id}
                  onClick={() => setSelectedWine(wine)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 dark:bg-amber-500/10 dark:border-amber-500/50'
                      : 'bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={wine.image}
                      alt={wine.name}
                      className="w-14 h-14 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500">
                          {wine.vintage} • {wine.type}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-500" /> {wine.rating} pts
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-white mt-0.5">
                        {wine.name}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {wine.region}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-bold text-sm text-amber-600 dark:text-amber-400">
                      ${wine.price}
                    </div>
                    {wine.glassPrice && (
                      <div className="text-[10px] text-zinc-400">
                        ${wine.glassPrice} / glass
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Wine Deep Dive & Order Box */}
        <div className="lg:col-span-5 bg-zinc-950 text-white rounded-2xl p-6 border border-zinc-800 space-y-6 flex flex-col justify-between">
          {selectedWine ? (
            <>
              <div className="space-y-4">
                <div className="relative h-44 rounded-xl overflow-hidden border border-zinc-800">
                  <img
                    src={selectedWine.image}
                    alt={selectedWine.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-zinc-950 uppercase tracking-widest">
                        Sommelier Choice
                      </span>
                      <h3 className="font-serif font-bold text-base text-white mt-1">
                        {selectedWine.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Flavor Profile & Tasting Notes
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedWine.tastingNotes.map((note, idx) => (
                      <span key={idx} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                        🍷 {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Recommended Dish Pairing
                  </div>
                  <p className="text-xs text-zinc-300 font-medium">
                    {selectedWine.bestPairedWith}
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed italic">
                  "{selectedWine.description}"
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Select Serving Format:</span>
                  <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                    <button
                      onClick={() => setOrderFormat('bottle')}
                      className={`px-3 py-1 rounded text-[10px] font-bold transition-colors ${
                        orderFormat === 'bottle' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400'
                      }`}
                    >
                      Bottle (${selectedWine.price})
                    </button>
                    {selectedWine.glassPrice && (
                      <button
                        onClick={() => setOrderFormat('glass')}
                        className={`px-3 py-1 rounded text-[10px] font-bold transition-colors ${
                          orderFormat === 'glass' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400'
                        }`}
                      >
                        Glass (${selectedWine.glassPrice})
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleAddWineToCart(selectedWine, orderFormat)}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add {selectedWine.vintage} {selectedWine.type} ({orderFormat}) to Cart
                  </span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-zinc-500 text-xs">
              Select a vintage wine bottle to view sommelier notes and pairings.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
