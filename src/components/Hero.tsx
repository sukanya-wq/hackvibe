import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Calendar,
  UtensilsCrossed,
  Clock,
  Star,
  Flame,
  Wine,
  ChevronRight,
  ChevronLeft,
  Award,
  Pause,
  Play,
  Heart,
  ChefHat,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface HeroProps {
  onReserveClick?: () => void;
  onOrderClick?: () => void;
  onSommelierClick?: () => void;
  onBookTable?: () => void;
  onExploreMenu?: () => void;
}

interface DishStory {
  id: number;
  name: string;
  category: string;
  badge: string;
  price: number;
  prepTime: string;
  calories: string;
  rating: number;
  reviewsCount: number;
  chefPairing: string;
  description: string;
  image: string;
  spices: string[];
  animationType: 'slide-left' | 'slide-right' | 'drop-top' | 'blur-sharp' | 'rotate-in' | 'slide-bottom' | '3d-flip' | 'fade-zoom' | 'spiral-in' | 'diagonal-pop';
}

const SIGNATURE_DISHES: DishStory[] = [
  {
    id: 1,
    name: "A5 Miyazaki Wagyu & Black Garlic",
    category: "Master Butcher's Cut",
    badge: "Michelin 2026 Selection",
    price: 135,
    prepTime: "22 min",
    calories: "890 kcal",
    rating: 5.0,
    reviewsCount: 342,
    chefPairing: "Grand Cru Margaux 2018",
    description: "Melt-in-your-mouth A5 Wagyu ribeye seared over Binchotan charcoal, finished with black garlic glaze and maitake reduction.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    spices: ["🍃 Rosemary", "🧂 Smoked Sea Salt", "🧄 Black Garlic"],
    animationType: 'slide-left',
  },
  {
    id: 2,
    name: "Artisan Truffle & Burrata Pizza",
    category: "Wood-Fired Neapolitan",
    badge: "House Bestseller",
    price: 42,
    prepTime: "12 min",
    calories: "780 kcal",
    rating: 4.9,
    reviewsCount: 412,
    chefPairing: "Crisp Franciacorta Brut",
    description: "Hand-stretched 48-hour fermented sourdough topped with creamy Puglia Burrata, shaved Norcia black truffles, and wild rocket.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    spices: ["🍃 Fresh Basil", "🍄 Black Truffle", "🧀 Aged Parmigiano"],
    animationType: 'slide-right',
  },
  {
    id: 3,
    name: "Prime Angus Smoked Truffle Smash",
    category: "Gourmet Comfort",
    badge: "Chef's Favorite",
    price: 36,
    prepTime: "15 min",
    calories: "920 kcal",
    rating: 4.95,
    reviewsCount: 289,
    chefPairing: "Bourbon Oak Aged Stout",
    description: "Dual Angus patties pressed with crispy edges, double Gruyère cheese, truffle aioli, and caramelized shallot jam on brioche.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    spices: ["🌶️ Cracked Pepper", "🧅 Caramelized Shallot", "🍞 Toasted Brioche"],
    animationType: 'drop-top',
  },
  {
    id: 4,
    name: "Squid Ink Tagliolini & Lobster",
    category: "Handmade Pasta",
    badge: "Culinary Triumph",
    price: 54,
    prepTime: "18 min",
    calories: "610 kcal",
    rating: 4.98,
    reviewsCount: 198,
    chefPairing: "Chablis Premier Cru",
    description: "Fresh egg pasta infused with cuttlefish ink, tossed with Maine lobster tail, saffron emulsion, and Golden Ossetra caviar.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
    spices: ["🌿 Italian Parsley", "🍋 Lemon Zest", "✨ Golden Caviar"],
    animationType: 'blur-sharp',
  },
  {
    id: 5,
    name: "Grand Omakase Otoro & Caviar Nigiri",
    category: "Japanese Omakase",
    badge: "Masterpiece",
    price: 88,
    prepTime: "10 min",
    calories: "420 kcal",
    rating: 5.0,
    reviewsCount: 520,
    chefPairing: "Junmai Daiginjo Sake",
    description: "Wild Bluefin tuna belly torched with binchotan wood, topped with 24k gold leaf and Royal Belgian caviar on aged koshihikari rice.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
    spices: ["🌾 Shiso Leaf", "✨ 24K Gold Leaf", "🏮 Fresh Wasabi"],
    animationType: 'rotate-in',
  },
  {
    id: 6,
    name: "Royal Saffron Dum Pukht Biryani",
    category: "Heritage Gastronomy",
    badge: "Imperial Recipe",
    price: 48,
    prepTime: "25 min",
    calories: "740 kcal",
    rating: 4.97,
    reviewsCount: 310,
    chefPairing: "Spiced Rose Elixir",
    description: "Slow-baked under a dough seal with aged basmati, Kashmir saffron, tender French lamb shoulder, and kewra blossom aroma.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    spices: ["🌸 Kashmiri Saffron", "🌿 Green Cardamom", "🌱 Star Anise"],
    animationType: 'slide-bottom',
  },
  {
    id: 7,
    name: "Wild Chilean Seabass Miso Glaze",
    category: "Ocean Fine Dining",
    badge: "Sustainable Catch",
    price: 64,
    prepTime: "20 min",
    calories: "510 kcal",
    rating: 4.93,
    reviewsCount: 245,
    chefPairing: "Sancerre Blanc 2022",
    description: "Sustainably caught Antarctic Seabass marinating 72 hours in Saikyo miso, served with baby bok choy and dashi reduction.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    spices: ["🌱 Microgreens", "🌾 White Sesame", "🍋 Yuzu Glaze"],
    animationType: '3d-flip',
  },
  {
    id: 8,
    name: "Valrhona Soufflé & Gold Dust",
    category: "Bespoke Patisserie",
    badge: "Grand Finale",
    price: 28,
    prepTime: "16 min",
    calories: "480 kcal",
    rating: 5.0,
    reviewsCount: 610,
    chefPairing: "20-Year Tawny Port",
    description: "70% Guanaja dark chocolate soufflé rising delicate and airy, served with Tahitian vanilla bean gelato and gold leaf shavings.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
    spices: ["✨ Gold Dust", "🍫 Cocoa Nibs", "🍦 Tahitian Vanilla"],
    animationType: 'fade-zoom',
  },
  {
    id: 9,
    name: "Botanical Smoke & Gold Elixir",
    category: "Artisanal Mixology",
    badge: "Zero Proof Luxury",
    price: 22,
    prepTime: "6 min",
    calories: "120 kcal",
    rating: 4.96,
    reviewsCount: 180,
    chefPairing: "Citrus & Elderflower Tonic",
    description: "Distilled botanical spirits infused with white tea, bergamot, rosemary smoke bubble, and edible 24k gold leaf flakes.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    spices: ["🌿 Rosemary Smoke", "🍋 Bergamot", "✨ Edible Gold"],
    animationType: 'spiral-in',
  },
  {
    id: 10,
    name: "Canard à l'Orange & Roasted Figs",
    category: "Grand Chef Special",
    badge: "Signature Classic",
    price: 76,
    prepTime: "24 min",
    calories: "680 kcal",
    rating: 4.99,
    reviewsCount: 275,
    chefPairing: "Pinot Noir Reserve",
    description: "Pan-roasted Moulard duck breast with crispy skin, caramelized Black Mission figs, Grand Marnier reduction, and parsnip purée.",
    image: "https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?auto=format&fit=crop&w=1200&q=80",
    spices: ["🍊 Blood Orange", "🌱 Thyme", "🍷 Grand Marnier"],
    animationType: 'diagonal-pop',
  },
];

export const Hero: React.FC<HeroProps> = (props) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeDish = SIGNATURE_DISHES[activeIdx];

  // Auto-slide loop every 4 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SIGNATURE_DISHES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Handle 3D Parallax Tilt according to mouse cursor position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleReserve = () => {
    if (props.onReserveClick) props.onReserveClick();
    else if (props.onBookTable) props.onBookTable();
  };

  const handleOrder = () => {
    if (props.onOrderClick) props.onOrderClick();
    else if (props.onExploreMenu) props.onExploreMenu();
  };

  const handleSommelier = () => {
    if (props.onSommelierClick) {
      props.onSommelierClick();
    } else {
      const el = document.getElementById('ai-recommender');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else if (props.onExploreMenu) props.onExploreMenu();
    }
  };

  // Unique motion variants per dish
  const getDishVariants = (type: DishStory['animationType']) => {
    switch (type) {
      case 'slide-left':
        return {
          initial: { opacity: 0, x: -160, rotate: -12, scale: 0.8 },
          animate: { opacity: 1, x: 0, rotate: 0, scale: 1 },
          exit: { opacity: 0, x: 120, rotate: 8, scale: 0.85 },
        };
      case 'slide-right':
        return {
          initial: { opacity: 0, x: 160, rotate: 12, scale: 1.2 },
          animate: { opacity: 1, x: 0, rotate: 0, scale: 1 },
          exit: { opacity: 0, x: -120, rotate: -8, scale: 0.85 },
        };
      case 'drop-top':
        return {
          initial: { opacity: 0, y: -160, scale: 0.7 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 120, scale: 0.85 },
        };
      case 'blur-sharp':
        return {
          initial: { opacity: 0, filter: 'blur(20px)', scale: 0.8 },
          animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
          exit: { opacity: 0, filter: 'blur(15px)', scale: 1.1 },
        };
      case 'rotate-in':
        return {
          initial: { opacity: 0, rotate: -45, x: -100, y: 100, scale: 0.8 },
          animate: { opacity: 1, rotate: 0, x: 0, y: 0, scale: 1 },
          exit: { opacity: 0, rotate: 30, x: 100, scale: 0.85 },
        };
      case 'slide-bottom':
        return {
          initial: { opacity: 0, y: 160, scale: 0.85 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -120, scale: 0.85 },
        };
      case '3d-flip':
        return {
          initial: { opacity: 0, rotateY: -90, scale: 0.8 },
          animate: { opacity: 1, rotateY: 0, scale: 1 },
          exit: { opacity: 0, rotateY: 90, scale: 0.8 },
        };
      case 'fade-zoom':
        return {
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.15 },
        };
      case 'spiral-in':
        return {
          initial: { opacity: 0, rotate: 180, scale: 0.6, y: -100 },
          animate: { opacity: 1, rotate: 0, scale: 1, y: 0 },
          exit: { opacity: 0, rotate: -90, scale: 0.8 },
        };
      case 'diagonal-pop':
        return {
          initial: { opacity: 0, x: 140, y: -140, scale: 0.75 },
          animate: { opacity: 1, x: 0, y: 0, scale: 1 },
          exit: { opacity: 0, x: -100, y: 100, scale: 0.85 },
        };
      default:
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
        };
    }
  };

  const variants = getDishVariants(activeDish.animationType);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden py-12 lg:py-16 bg-black text-white selection:bg-amber-500 selection:text-black transition-colors duration-500"
    >
      {/* Dynamic Gold Cursor Spotlight Effect */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none transition-transform duration-300 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          left: `${(mousePos.x + 0.5) * 100}%`,
          top: `${(mousePos.y + 0.5) * 100}%`,
        }}
      />

      {/* Deep Obsidian Background Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-amber-500/10 via-amber-900/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Fine Gold Grain/Grid Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(245, 158, 11, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Dynamic Dish Story & Luxury Black Typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Live Operational & Michelin Gold Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 shadow-lg text-xs font-semibold text-zinc-100 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <span className="tracking-wide">L'Étoile Luxury Bistro</span>
                <span className="text-zinc-700">|</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Michelin 2026 Selection
                </span>
              </div>

              {/* Dynamic Dish Award Badge */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeDish.badge}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs uppercase tracking-widest shadow-md shadow-amber-500/20"
                >
                  {activeDish.badge}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Dish Category Header */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDish.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{activeDish.category}</span>
                <span className="text-zinc-700">•</span>
                <span className="text-zinc-400 font-mono">Signature Dish {activeIdx + 1} / {SIGNATURE_DISHES.length}</span>
              </motion.div>
            </AnimatePresence>

            {/* Headline Title */}
            <div className="min-h-[100px] sm:min-h-[120px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeDish.id}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-300 leading-[1.12]"
                >
                  {activeDish.name}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeDish.description}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="text-sm sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed min-h-[50px]"
              >
                {activeDish.description}
              </motion.p>
            </AnimatePresence>

            {/* Dynamic Culinary Stats Grid in Obsidian Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`stats-${activeDish.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
              >
                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-amber-500/20 shadow-inner backdrop-blur-md">
                  <div className="text-xs text-zinc-400 flex items-center gap-1 font-medium mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Prep Time
                  </div>
                  <div className="text-base font-bold font-serif text-white">
                    {activeDish.prepTime}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-amber-500/20 shadow-inner backdrop-blur-md">
                  <div className="text-xs text-zinc-400 flex items-center gap-1 font-medium mb-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" /> Calories
                  </div>
                  <div className="text-base font-bold font-serif text-white">
                    {activeDish.calories}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-amber-500/20 shadow-inner backdrop-blur-md">
                  <div className="text-xs text-zinc-400 flex items-center gap-1 font-medium mb-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Rating
                  </div>
                  <div className="text-base font-bold font-serif text-white flex items-center gap-1">
                    {activeDish.rating}
                    <span className="text-[10px] text-zinc-400 font-normal">({activeDish.reviewsCount})</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-amber-500/20 shadow-inner backdrop-blur-md">
                  <div className="text-xs text-zinc-400 flex items-center gap-1 font-medium mb-1">
                    <Wine className="w-3.5 h-3.5 text-amber-400" /> Sommelier Choice
                  </div>
                  <div className="text-xs font-bold font-serif text-amber-300 truncate">
                    {activeDish.chefPairing}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              {/* Reserve Table CTA */}
              <button
                onClick={handleReserve}
                className="relative group overflow-hidden px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
              >
                {/* Shimmer Light Sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                <Calendar className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
                <span>Reserve Table</span>
                <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Digital Menu CTA */}
              <button
                onClick={handleOrder}
                className="px-6 py-3.5 rounded-2xl bg-zinc-900/90 text-white border border-amber-500/30 hover:border-amber-400 font-bold text-sm shadow-md hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                <span>Digital Menu</span>
              </button>

              {/* Ask AI Sommelier CTA */}
              <button
                onClick={handleSommelier}
                className="px-5 py-3.5 rounded-2xl bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold text-sm hover:bg-amber-500/20 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Ask AI Sommelier</span>
              </button>
            </div>

            {/* Story Timeline Dish Selector Controls */}
            <div className="pt-6 flex items-center justify-between border-t border-zinc-800/80">
              {/* Play / Pause Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-amber-500/30 flex items-center justify-center text-zinc-300 hover:bg-zinc-800 transition-colors shadow-sm"
                  title={isPlaying ? "Pause storytelling" : "Play storytelling"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-amber-400 ml-0.5" />}
                </button>
                <span className="text-xs font-semibold text-zinc-400">
                  {isPlaying ? 'Auto Storytelling' : 'Paused'}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveIdx((prev) => (prev - 1 + SIGNATURE_DISHES.length) % SIGNATURE_DISHES.length)}
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-amber-500/30 flex items-center justify-center text-zinc-300 hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="text-xs font-bold text-amber-400 px-2 font-mono">
                  {String(activeIdx + 1).padStart(2, '0')} / {String(SIGNATURE_DISHES.length).padStart(2, '0')}
                </span>

                <button
                  onClick={() => setActiveIdx((prev) => (prev + 1) % SIGNATURE_DISHES.length)}
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-amber-500/30 flex items-center justify-center text-zinc-300 hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Parallax Dish Stage with Floating Botanicals & Steam */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-4">
            <div className="relative w-full max-w-lg">
              
              {/* Floating Spices & Herb Botanicals around Dish */}
              <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
                {activeDish.spices.map((spice, idx) => {
                  const offsets = [
                    { top: '-5%', left: '0%' },
                    { top: '10%', right: '-5%' },
                    { bottom: '5%', left: '-5%' },
                  ];
                  const pos = offsets[idx % offsets.length];
                  return (
                    <motion.div
                      key={`${activeDish.id}-spice-${idx}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -10, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 },
                        y: { duration: 3 + idx, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' },
                      }}
                      className="absolute px-3 py-1.5 rounded-full bg-zinc-950/90 border border-amber-500/40 shadow-2xl backdrop-blur-md text-xs font-bold text-amber-300 flex items-center gap-1"
                      style={pos}
                    >
                      <span>{spice}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Active Dish Frame Stage with 3D Tilt */}
              <motion.div
                style={{
                  rotateX: mousePos.y * -16,
                  rotateY: mousePos.x * 16,
                  transformStyle: 'preserve-3d',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative rounded-[2.5rem] p-3 sm:p-4 bg-gradient-to-b from-zinc-900/90 via-black to-zinc-900/90 border border-amber-500/30 shadow-2xl shadow-amber-500/10 backdrop-blur-xl group"
              >
                {/* Plate Frame */}
                <div className="relative rounded-[2rem] overflow-hidden bg-black aspect-4/3 sm:h-[420px] shadow-inner border border-amber-500/20">
                  
                  {/* Dynamic Image Transitions */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeDish.id}
                      src={activeDish.image}
                      alt={activeDish.name}
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{
                        duration: 0.65,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </AnimatePresence>

                  {/* Dark Gradient Reflection Base Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Rising Steam Effect Overlay */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none opacity-30 blur-xl bg-gradient-to-t from-amber-400 to-transparent animate-pulse" />

                  {/* Floating Price & Badge Tag overlay at Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-zinc-950/95 backdrop-blur-md border border-amber-500/30 shadow-2xl flex items-center justify-between z-10">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-0.5">
                        {activeDish.category}
                      </span>
                      <h3 className="font-serif font-bold text-sm sm:text-base text-white truncate max-w-[200px] sm:max-w-xs">
                        {activeDish.name}
                      </h3>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <div className="text-xl sm:text-2xl font-bold font-serif text-amber-400">
                        ${activeDish.price}
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-400 flex items-center justify-end gap-1">
                        <Flame className="w-3 h-3 text-amber-500" /> Hot Fresh
                      </span>
                    </div>
                  </div>

                </div>

                {/* Ground Plate Shadow */}
                <div className="absolute -bottom-6 left-10 right-10 h-8 rounded-full bg-amber-500/10 blur-xl -z-10 pointer-events-none" />
              </motion.div>

              {/* Bottom Thumbnail Strip Indicator */}
              <div className="flex items-center justify-center gap-1.5 mt-6 px-2 overflow-x-auto no-scrollbar">
                {SIGNATURE_DISHES.map((dish, idx) => (
                  <button
                    key={dish.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                      idx === activeIdx
                        ? 'w-10 h-10 ring-2 ring-amber-400 scale-110 shadow-lg shadow-amber-500/20'
                        : 'w-7 h-7 opacity-40 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    {idx === activeIdx && (
                      <span className="absolute inset-0 bg-amber-500/20" />
                    )}
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
