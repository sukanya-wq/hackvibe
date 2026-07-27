import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, Utensils, Check, Wine, ShoppingBag, ChevronRight, Award, Save, Trash2 } from 'lucide-react';
import { MenuItem } from '../types';

interface CourseOption {
  id: string;
  courseTitle: string;
  courseNumber: number;
  dishes: {
    name: string;
    description: string;
    dietary: 'veg' | 'non-veg';
    winePairing: string;
    image: string;
  }[];
}

const TASTING_DRAFT_KEY = 'letoile_tasting_draft';

const TASTING_COURSES: CourseOption[] = [
  {
    id: 'course-1',
    courseNumber: 1,
    courseTitle: "Course I — L'Amuse-Bouche & Premier Cru Starter",
    dishes: [
      {
        name: "Oscietra Caviar & Hokkaido Scallop Tartlet",
        description: "Lightly cured Japanese scallop tartare, Oscietra caviar, and crème fraîche in a crisp charcoal shell.",
        dietary: "non-veg",
        winePairing: "Dom Pérignon Vintage Brut Champagne 2013",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Morel Mushroom & Roasted Sunchoke Velouté",
        description: "French wild chanterelles, crispy sunchoke ribbons, and white truffle oil emulsion.",
        dietary: "veg",
        winePairing: "2021 Domaine Leflaive Puligny-Montrachet",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 'course-2',
    courseNumber: 2,
    courseTitle: "Course II — Warm Entrée & Seasonal Harvest",
    dishes: [
      {
        name: "Pan-Seared Hudson Valley Foie Gras",
        description: "Caramelized mission fig reduction, brioche toast, and aged balsamic glaze.",
        dietary: "non-veg",
        winePairing: "2015 Château d'Yquem Premier Cru Sauternes",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Heirloom Beetroot & Smoked Goat Cheese Ravioli",
        description: "Hand-folded artisan pasta filled with chèvre, roasted beet silk, and brown butter sage.",
        dietary: "veg",
        winePairing: "2020 Sancerre Blanc Domaine Vacheron",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 'course-3',
    courseNumber: 3,
    courseTitle: "Course III — Artisanal Intermezzo",
    dishes: [
      {
        name: "Norcia Black Truffle Tagliolini",
        description: "Fresh hand-rolled egg pasta tossed in 36-month Pecorino Romano and freshly shaved winter truffles.",
        dietary: "veg",
        winePairing: "2020 Barolo DOCG Nebbiolo",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Wild Chilean Sea Bass en Papillote",
        description: "Steamed with lemongrass dashi broth, saffron risotto, and baby leeks.",
        dietary: "non-veg",
        winePairing: "2019 Meursault Domaine Roulot Chardonnay",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 'course-4',
    courseNumber: 4,
    courseTitle: "Course IV — Chef's Piece de Résistance",
    dishes: [
      {
        name: "A5 Miyazaki Wagyu Ribeye",
        description: "Japanese black cattle ribeye charcoal-seared over binchotan with bone marrow reduction.",
        dietary: "non-veg",
        winePairing: "2018 Château Margaux Premier Grand Cru",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Slow-Confit Heritage Duck Leg",
        description: "Braised for 14 hours in duck fat with sour cherry star-anise reduction & parsnip silk.",
        dietary: "non-veg",
        winePairing: "2019 Domaine Dujac Morey-Saint-Denis Pinot Noir",
        image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 'course-5',
    courseNumber: 5,
    courseTitle: "Course V — Grand Desserts & Petit Fours",
    dishes: [
      {
        name: "Grand Cru Dark Chocolate & Matcha Soufflé",
        description: "72% Valrhona dark chocolate molten soufflé paired with Kyoto Uji matcha gelato.",
        dietary: "veg",
        winePairing: "Château d'Yquem Sauternes Dessert Wine",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

interface TastingMenuBuilderProps {
  onAddToCart?: (item: MenuItem) => void;
}

export const TastingMenuBuilder: React.FC<TastingMenuBuilderProps> = ({ onAddToCart }) => {
  const DEFAULT_SELECTIONS = {
    1: TASTING_COURSES[0].dishes[0].name,
    2: TASTING_COURSES[1].dishes[0].name,
    3: TASTING_COURSES[2].dishes[0].name,
    4: TASTING_COURSES[3].dishes[0].name,
    5: TASTING_COURSES[4].dishes[0].name
  };

  const [selectedDishes, setSelectedDishes] = useState<Record<number, string>>(DEFAULT_SELECTIONS);
  const [includeWinePairing, setIncludeWinePairing] = useState(true);
  const [draftRestored, setDraftRestored] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Restore draft from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(TASTING_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedDishes) setSelectedDishes(parsed.selectedDishes);
        if (typeof parsed.includeWinePairing === 'boolean') setIncludeWinePairing(parsed.includeWinePairing);
        setDraftRestored(true);
      }
    } catch (e) {
      console.error('Error parsing tasting draft:', e);
    }
  }, []);

  // Auto-save tasting menu choices to local storage
  useEffect(() => {
    const draft = {
      selectedDishes,
      includeWinePairing
    };
    localStorage.setItem(TASTING_DRAFT_KEY, JSON.stringify(draft));
    setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, [selectedDishes, includeWinePairing]);

  const handleResetDraft = () => {
    localStorage.removeItem(TASTING_DRAFT_KEY);
    setSelectedDishes(DEFAULT_SELECTIONS);
    setIncludeWinePairing(true);
    setDraftRestored(false);
    setLastSavedTime(null);
  };

  const basePricePerPerson = 165;
  const winePairingPrice = 95;
  const totalPricePerGuest = basePricePerPerson + (includeWinePairing ? winePairingPrice : 0);

  const handleSelectDish = (courseNum: number, dishName: string) => {
    setSelectedDishes(prev => ({ ...prev, [courseNum]: dishName }));
  };

  const handleAddTastingMenuToCart = () => {
    if (!onAddToCart) return;

    const selectionsSummary = Object.entries(selectedDishes)
      .map(([course, dish]) => `Course ${course}: ${dish}`)
      .join(' | ');

    const menuItem: MenuItem = {
      id: `tasting-menu-${Date.now()}`,
      name: `Bespoke 5-Course Tasting Menu ${includeWinePairing ? '(With Sommelier Pairings)' : ''}`,
      category: 'mains',
      price: totalPricePerGuest,
      description: `Chef's Gastronomy Experience. ${selectionsSummary}`,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      prepTimeMinutes: 45,
      calories: 1250,
      dietary: 'non-veg',
      available: true,
      ingredients: ['Caviar', 'A5 Wagyu', 'Black Truffle', 'Valrhona Chocolate'],
      rating: 5.0,
      reviewsCount: 142
    };

    onAddToCart(menuItem);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <ChefHat className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Michelin Gastronomy Customizer
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-1">
            Build Your 5-Course Tasting Experience
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Tailor each individual course to your palate with optional Grand Cru wine pairings.
          </p>
        </div>

        {/* Pricing Summary Badge */}
        <div className="flex items-center gap-3 bg-zinc-950 text-white p-3.5 rounded-2xl border border-zinc-800 shadow-md">
          <div>
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              Experience Total
            </div>
            <div className="font-serif font-bold text-xl text-amber-400">
              ${totalPricePerGuest} <span className="text-xs font-sans text-zinc-400 font-normal">/ guest</span>
            </div>
          </div>
          <button
            onClick={handleAddTastingMenuToCart}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Book Course</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Auto-Save Draft Banner */}
      {(lastSavedTime || draftRestored) && (
        <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold">
            <Save className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>
              {draftRestored
                ? 'Course selections restored from your saved draft.'
                : `Course choices auto-saved to local storage at ${lastSavedTime}.`}
            </span>
          </div>
          <button
            type="button"
            onClick={handleResetDraft}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 text-[11px] font-bold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Selections</span>
          </button>
        </div>
      )}

      {/* Wine Pairing Toggle Bar */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500 text-zinc-950">
            <Wine className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-white">
              Sommelier Grand Cru Wine Pairing
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Includes a hand-picked glass of rare vintage wine tailored for each of the 5 courses (+${winePairingPrice}/guest).
            </p>
          </div>
        </div>

        <button
          onClick={() => setIncludeWinePairing(!includeWinePairing)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
            includeWinePairing
              ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-md'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'
          }`}
        >
          {includeWinePairing ? '✓ Pairing Included (+$95)' : '+ Add Sommelier Pairing (+$95)'}
        </button>
      </div>

      {/* Course Selector Steps */}
      <div className="space-y-6">
        {TASTING_COURSES.map(course => (
          <div key={course.courseNumber} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs flex items-center justify-center">
                {course.courseNumber}
              </span>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white">
                {course.courseTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.dishes.map((dish, idx) => {
                const isSelected = selectedDishes[course.courseNumber] === dish.name;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectDish(course.courseNumber, dish.name)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 dark:bg-amber-500/10 dark:border-amber-500 shadow-md'
                        : 'bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-zinc-200 dark:border-zinc-700"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-white">
                          {dish.name}
                        </h4>
                        {isSelected && (
                          <span className="p-1 rounded-full bg-amber-500 text-zinc-950">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {dish.description}
                      </p>
                      {includeWinePairing && (
                        <div className="pt-1 text-[10px] font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <Wine className="w-3 h-3 shrink-0" /> Paired with {dish.winePairing}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
