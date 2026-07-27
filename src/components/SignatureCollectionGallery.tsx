import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShoppingBag, Eye, Star, Heart, Flame, Utensils, X, Plus, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface GalleryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  calories: number;
  description: string;
  badge?: string;
}

interface SignatureCollectionGalleryProps {
  onAddToCart?: (dish: MenuItem) => void;
}

// 1. Chef's Signature Dishes (14 Items)
const CHEFS_SIGNATURES: GalleryItem[] = [
  {
    id: 'sig-1',
    name: "Wood-Fired Truffle & Burrata Pizza",
    category: "Artisan Pizza",
    price: 38,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 780,
    badge: "Chef's Special",
    description: "Hand-stretched Sourdough, Creamy Burrata, Fresh Shaved Norcia Black Truffles & Wild Rocket."
  },
  {
    id: 'sig-2',
    name: "A5 Miyazaki Wagyu Ribeye",
    category: "Steakhouse",
    price: 135,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    calories: 890,
    badge: "Michelin Highlight",
    description: "Melt-in-your-mouth Japanese Wagyu with Smoked Sea Salt & Roasted Garlic Bone Marrow Glaze."
  },
  {
    id: 'sig-3',
    name: "Black Truffle & Cacio e Pepe Tagliolini",
    category: "Handmade Pasta",
    price: 42,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 620,
    badge: "House Favorite",
    description: "Handcrafted Egg Pasta, Aged Pecorino Romano 24-month & Freshly Shaved Black Truffle."
  },
  {
    id: 'sig-4',
    name: "Grand Omakase Caviar Sashimi Tower",
    category: "Japanese Omakase",
    price: 98,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    calories: 450,
    badge: "Raw Bar",
    description: "Bluefin Otoro, Wild Hamachi, Hokkaido Sea Urchin & Royal Ossetra Caviar."
  },
  {
    id: 'sig-5',
    name: "Charred Chilean Sea Bass in Yuzu Dashi",
    category: "Seafood Main",
    price: 52,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    calories: 510,
    badge: "Signature",
    description: "Miso-marinated Chilean Bass, Charred Baby Bok Choy & Warm Golden Yuzu Dashi."
  },
  {
    id: 'sig-6',
    name: "Royal Hyderabadi Lamb Dum Biryani",
    category: "Indian Heritage",
    price: 46,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 820,
    badge: "Heritage Recipe",
    description: "Fragrant Saffron Aged Basmati, Slow-cooked Tender Lamb & Rosewater Perfumed Aromatics."
  },
  {
    id: 'sig-7',
    name: "Gold-Leaf Chocolate Soufflé",
    category: "Grand Dessert",
    price: 26,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 540,
    badge: "24K Gold",
    description: "Warm Valrhona 70% Dark Chocolate Soufflé, Gold Dust & Madagascar Vanilla Bean Crème."
  },
  {
    id: 'sig-8',
    name: "Smoked Passionfruit & Hibiscus Elixir",
    category: "Artisanal Mocktail",
    price: 18,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    calories: 140,
    badge: "Zero-Proof",
    description: "Fresh Passionfruit Nectar, Smoked Rosemary Botanical Mist & Sparkling Artisanal Tonic."
  },
  {
    id: 'sig-9',
    name: "Heirloom Burrata & Peach Rocket Salad",
    category: "Salads & Starters",
    price: 28,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    calories: 380,
    badge: "Organic",
    description: "Grilled Organic Peaches, Puglia Burrata, Aged Balsamic Caviar & Toasted Pine Nuts."
  },
  {
    id: 'sig-10',
    name: "Slow-Confit Duck Leg with Cherry Reduction",
    category: "French Bistro",
    price: 48,
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 710,
    badge: "Crispy Confit",
    description: "French Heritage Duck Leg Crisp, Parsnip Mousse & Sour Cherry Star Anise Reduction."
  },
  {
    id: 'sig-11',
    name: "Pan-Seared Hokkaido Scallop Tartlet",
    category: "Fine Appetizers",
    price: 34,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 320,
    badge: "Seafood",
    description: "King Hokkaido Scallops, Saffron Cauliflower Purée, Crispy Prosciutto & Micro Chervil."
  },
  {
    id: 'sig-12',
    name: "Iberian Secreto Pork & Caramelized Fig",
    category: "Specialty Main",
    price: 56,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    calories: 790,
    badge: "Acorn-Fed",
    description: "Grilled Acorn-fed Bellota Pork, Caramelized Black Figs & Pedro Ximénez Reduction."
  },
  {
    id: 'sig-13',
    name: "Flame-Grilled Wagyu Slider Trio",
    category: "Gourmet Bites",
    price: 32,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 680,
    badge: "Sliders",
    description: "Mini Brioche Buns, Smoked Gouda, Truffle Aioli & Caramelized Shallot Jam."
  }
];

// 2. Today's Specials (14 Items)
const TODAYS_SPECIALS: GalleryItem[] = [
  {
    id: 'spec-1',
    name: "Smoked Bacon Brisket Smash Burger",
    category: "Gourmet Burgers",
    price: 29,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 840,
    badge: "Daily Special",
    description: "Double Prime Angus Brisket Patty, Thick Cut Maple Bacon & Aged Cheddar Glaze."
  },
  {
    id: 'spec-2',
    name: "Maine Lobster Tail Fettuccine Alfredo",
    category: "Seafood Pasta",
    price: 58,
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281216?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    calories: 750,
    badge: "Fresh Catch",
    description: "Butter-poached Whole Lobster Tail, Artisan Fettuccine & Creamy Garlic Parmigiano."
  },
  {
    id: 'spec-3',
    name: "Neapolitan Prosciutto & Fig Pizza",
    category: "Wood-fired Pizza",
    price: 34,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    calories: 720,
    badge: "Artisanal",
    description: "San Marzano Tomatoes, Parma Ham 18-month, Fresh Figs, Mozzarella & Honey Drizzle."
  },
  {
    id: 'spec-4',
    name: "Torched Aburi Salmon Nigiri Platter",
    category: "Sushi Bar",
    price: 44,
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 420,
    badge: "Flame Torched",
    description: "Norwegian Fatty Salmon, Spicy Truffle Mayo, Unagi Glaze & Crispy Shallot Crunch."
  },
  {
    id: 'spec-5',
    name: "Prime Dry-Aged Ribeye with Bone Marrow",
    category: "Steakhouse",
    price: 88,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 920,
    badge: "45-Day Aged",
    description: "Center-Cut Bone-in Ribeye, Roasted Herb Garlic Marrow & Bordelaise Jus."
  },
  {
    id: 'spec-6',
    name: "Dum Pukht Saffron Chicken Tikka Biryani",
    category: "Indian Heritage",
    price: 38,
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    calories: 740,
    badge: "Claypot Special",
    description: "Claypot Seal Cooked Basmati Rice with Tandoori Marinated Chicken Thighs & Mint Raita."
  },
  {
    id: 'spec-7',
    name: "Artisanal Pistachio Raspberry Tart",
    category: "French Patisserie",
    price: 22,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 460,
    badge: "Pastry Chef",
    description: "Sicilian Pistachio Frangipane, Fresh Organic Raspberries & Gold Dust Gelée."
  },
  {
    id: 'spec-8',
    name: "Dragonfruit Hibiscus Sparkler",
    category: "Craft Mocktail",
    price: 16,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    calories: 120,
    badge: "Refreshing",
    description: "Fresh Pitaya Puree, Brewed Hibiscus Tea, Lime Juice & Citrus Edible Bubbles."
  },
  {
    id: 'spec-9',
    name: "Avocado & Grilled Halloumi Power Bowl",
    category: "Clean Dining",
    price: 26,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    calories: 430,
    badge: "Superfood",
    description: "Seared Cypriot Halloumi, Hass Avocado, Quinoa, Pomegranate & Green Goddess Tahini."
  },
  {
    id: 'spec-10',
    name: "Charred Spanish Octopus with Smoked Paprika",
    category: "Mediterranean",
    price: 46,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 520,
    badge: "Wild Caught",
    description: "Galician Tentacles, Smashed Fingerling Potatoes, Pimentón de la Vera & Garlic Aioli."
  },
  {
    id: 'spec-11',
    name: "Truffle Morel Mushroom Velouté",
    category: "Soups & Starters",
    price: 24,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    calories: 310,
    badge: "Warm Comfort",
    description: "Wild Morel Mushrooms, White Truffle Oil Drizzle & Crispy Herb Sourdough Crouton."
  },
  {
    id: 'spec-12',
    name: "Hamachi Yellowtail Carpaccio with Citrus",
    category: "Crudo Bar",
    price: 36,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 280,
    badge: "Cold Crudo",
    description: "Thinly Sliced Yellowtail, Jalapeño Rings, Ponzu Truffle Dressing & Micro Cilantro."
  },
  {
    id: 'spec-13',
    name: "Caramelized Fig & Gorgonzola Galette",
    category: "Artisan Tart",
    price: 25,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    calories: 410,
    badge: "Sweet & Savory",
    description: "Flaky Flaky Puff Pastry, Creamy Italian Gorgonzola, Fresh Black Figs & Thyme Honey."
  }
];

// 3. Customer Favorites (14 Items)
const CUSTOMER_FAVORITES: GalleryItem[] = [
  {
    id: 'fav-1',
    name: "Quattro Formaggi Hot Honey Pizza",
    category: "Artisan Pizza",
    price: 32,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 790,
    badge: "#1 Most Ordered",
    description: "Mozzarella, Gorgonzola, Fontina, Parmigiano & House-infused Hot Habanero Honey."
  },
  {
    id: 'fav-2',
    name: "Crispy Truffle Portobello Burger",
    category: "Plant-Based",
    price: 27,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    calories: 580,
    badge: "Vegetarian",
    description: "Panko-crusted Portobello Mushroom, Aged Swiss Cheese, Black Truffle Mayo & Rocket."
  },
  {
    id: 'fav-3',
    name: "Pappardelle with Slow-Braised Wild Boar",
    category: "Classic Pasta",
    price: 39,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 710,
    badge: "12-Hr Braise",
    description: "Wide Ribbon Pasta, Tuscan Wild Boar Ragù, Chianti Wine Reduction & Pecorino Snow."
  },
  {
    id: 'fav-4',
    name: "Spicy Bluefin Tuna Tartare Tower",
    category: "Raw Bar",
    price: 35,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 340,
    badge: "Top Starter",
    description: "Hand-cut Bluefin Tuna, Hass Avocado Mousse, Sesame Chili Crisp & Lotus Root Chips."
  },
  {
    id: 'fav-5',
    name: "Center-Cut Filet Mignon with Red Wine Glaze",
    category: "Steakhouse",
    price: 72,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    calories: 680,
    badge: "Tenderloin",
    description: "USDA Prime 8oz Filet, Creamy Potato Purée, Glazed Baby Onions & Cabernet Reduction."
  },
  {
    id: 'fav-6',
    name: "Royal Saffron Dum Biryani with Rose Water",
    category: "Indian Heritage",
    price: 42,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 780,
    badge: "Crowd Pleaser",
    description: "Layered Basmati, Slow Cooked Spice Infused Meat, Fried Onions & Saffron Cream."
  },
  {
    id: 'fav-7',
    name: "Classic Tiramisu Tradizionale",
    category: "Italian Dessert",
    price: 20,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 490,
    badge: "Authentic",
    description: "Espresso-soaked Savoiardi Ladyfingers, Fluffy Mascarpone Cream & Dutch Cocoa."
  },
  {
    id: 'fav-8',
    name: "Sparkling Yuzu Citrus Refresher",
    category: "Beverages",
    price: 15,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    calories: 110,
    badge: "Refreshing",
    description: "Japanese Yuzu Juice, Sparkling Alkaline Mineral Water & Fresh Mint Leaves."
  },
  {
    id: 'fav-9',
    name: "Roasted Beetroot & Goat Cheese Micro Salad",
    category: "Gourmet Salad",
    price: 24,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    calories: 320,
    badge: "Fresh & Light",
    description: "Salt-roasted Golden Beets, Whipped Goat Cheese, Candied Pecans & Orange Vinaigrette."
  },
  {
    id: 'fav-10',
    name: "Herb-Crusted Rack of Lamb",
    category: "Chef's Roast",
    price: 64,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 820,
    badge: "New Zealand",
    description: "Pistachio Rosemary Crust, Roasted Garlic Polenta & Minted Lamb Glaze."
  },
  {
    id: 'fav-11',
    name: "Crispy Soft-Shell Crab with Mango Salsa",
    category: "Appetizer",
    price: 32,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    calories: 410,
    badge: "Crispy",
    description: "Tempura Fried Soft-Shell Crab, Ripe Alphonso Mango Salsa & Spicy Sriracha Mayo."
  },
  {
    id: 'fav-12',
    name: "French Vanilla Bean Mille-Feuille",
    category: "Pastry",
    price: 22,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 510,
    badge: "FlakyLayers",
    description: "Caramelized Puff Pastry Sheets, Tahitian Vanilla Pastry Cream & Salted Caramel."
  },
  {
    id: 'fav-13',
    name: "Charcoal-Grilled Jumbo Tiger Prawns",
    category: "Seafood Grill",
    price: 49,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    calories: 440,
    badge: "Jumbo Size",
    description: "Garlic Herb Butter Basted Giant Prawns, Grilled Lemon & Wild Herb Chimichurri."
  }
];

export const SignatureCollectionGallery: React.FC<SignatureCollectionGalleryProps> = ({ onAddToCart }) => {
  const [activeItemModal, setActiveItemModal] = useState<GalleryItem | null>(null);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Helper to handle quick order click
  const handleQuickAdd = (item: GalleryItem) => {
    if (onAddToCart) {
      const formattedMenuItem: MenuItem = {
        id: item.id,
        name: item.name,
        category: 'mains',
        price: item.price,
        description: item.description,
        image: item.image,
        prepTimeMinutes: 18,
        calories: item.calories,
        dietary: 'non-veg',
        available: true,
        ingredients: ['Artisanal ingredients', 'Fresh herbs', 'Chef special sauce'],
        rating: item.rating,
        reviewsCount: 128
      };
      onAddToCart(formattedMenuItem);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 2000);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden relative border-y border-zinc-100 dark:border-zinc-800/60 transition-colors duration-300">
      
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
          <span>Our Signature Collection</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
          An Endless Culinary Exhibition
        </h2>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
          Feast your eyes on our master chefs' creations. From wood-fired artisan pizzas and dry-aged steaks to delicate raw bar omakase and gold-dusted desserts.
        </p>

        <div className="flex items-center justify-center gap-6 pt-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
            <Flame className="w-3.5 h-3.5" /> Freshly Prepared
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
            <Utensils className="w-3.5 h-3.5" /> Michelin Standard
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
            <Star className="w-3.5 h-3.5" /> 60 FPS Infinite Motion
          </span>
        </div>
      </div>

      {/* THREE INFINITE SCROLLING RIBBONS */}
      <div className="space-y-12 relative">
        
        {/* Soft Left and Right Edge Gradient Masks for Natural Enter/Exit Effect */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-white via-white/80 dark:from-zinc-950 dark:via-zinc-950/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-white via-white/80 dark:from-zinc-950 dark:via-zinc-950/80 to-transparent z-20 pointer-events-none" />

        {/* ROW 1: CHEF'S SIGNATURE DISHES (Right to Left - Slow & Smooth) */}
        <div className="space-y-3">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
            <span className="flex items-center gap-2">
              <span className="text-base">🍕</span> Row 1 — Chef's Signature Dishes
            </span>
            <span className="text-[10px] text-zinc-400 font-normal">Hover or Tap to Inspect</span>
          </div>

          <div className="overflow-hidden py-4 cursor-grab active:cursor-grabbing group">
            <div className="animate-marquee-left-slow flex items-center gap-8 sm:gap-12 w-max">
              {[...CHEFS_SIGNATURES, ...CHEFS_SIGNATURES].map((item, idx) => (
                <div
                  key={`r1-${item.id}-${idx}`}
                  onClick={() => setActiveItemModal(item)}
                  className="relative group/dish shrink-0 transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Clean Transparent/Isolated Image Frame with Soft Shadow - NO CARDS */}
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-amber-500/20 via-transparent to-amber-400/30 shadow-2xl hover:shadow-amber-500/20 transition-all">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover rounded-full transform group-hover/dish:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/dish:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4" />
                  </div>

                  {/* Floating Glassmorphism Pill Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-zinc-900/90 dark:bg-black/90 border border-amber-500/40 text-white text-[11px] font-semibold shadow-xl flex items-center gap-1.5 group-hover/dish:bg-amber-500 group-hover/dish:text-zinc-950 transition-colors">
                    <span className="font-bold text-amber-400 group-hover/dish:text-zinc-950">${item.price}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-500 group-hover/dish:bg-zinc-800" />
                    <span className="truncate max-w-[120px] sm:max-w-[160px]">{item.name}</span>
                  </div>

                  {/* Floating Rating Badge Top Right */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-[10px] font-bold flex items-center gap-1 border border-amber-400/30">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: TODAY'S SPECIALS (Left to Right - Opposite Direction) */}
        <div className="space-y-3">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
            <span className="flex items-center gap-2">
              <span className="text-base">🥗</span> Row 2 — Today's Fresh Specials
            </span>
            <span className="text-[10px] text-zinc-400 font-normal font-mono">← Opposite Direction Flow →</span>
          </div>

          <div className="overflow-hidden py-4 cursor-grab active:cursor-grabbing group">
            <div className="animate-marquee-right-med flex items-center gap-8 sm:gap-12 w-max">
              {[...TODAYS_SPECIALS, ...TODAYS_SPECIALS].map((item, idx) => (
                <div
                  key={`r2-${item.id}-${idx}`}
                  onClick={() => setActiveItemModal(item)}
                  className="relative group/dish shrink-0 transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Clean Dish Circle */}
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-full overflow-hidden p-1 bg-gradient-to-bl from-amber-400/30 via-transparent to-amber-600/20 shadow-2xl hover:shadow-amber-500/20 transition-all">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover rounded-full transform group-hover/dish:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Floating Pill Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-zinc-900/90 dark:bg-black/90 border border-amber-500/40 text-white text-[11px] font-semibold shadow-xl flex items-center gap-1.5 group-hover/dish:bg-amber-500 group-hover/dish:text-zinc-950 transition-colors">
                    <span className="font-bold text-amber-400 group-hover/dish:text-zinc-950">${item.price}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-500 group-hover/dish:bg-zinc-800" />
                    <span className="truncate max-w-[120px] sm:max-w-[160px]">{item.name}</span>
                  </div>

                  {/* Top Badge */}
                  {item.badge && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-500/90 text-zinc-950 text-[10px] font-bold uppercase tracking-wider shadow-md">
                      {item.badge}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: CUSTOMER FAVORITES (Right to Left - Faster) */}
        <div className="space-y-3">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
            <span className="flex items-center gap-2">
              <span className="text-base">🍰</span> Row 3 — Most Loved Customer Favorites
            </span>
            <span className="text-[10px] text-zinc-400 font-normal">Fast Ribbon Motion</span>
          </div>

          <div className="overflow-hidden py-4 cursor-grab active:cursor-grabbing group">
            <div className="animate-marquee-left-fast flex items-center gap-8 sm:gap-12 w-max">
              {[...CUSTOMER_FAVORITES, ...CUSTOMER_FAVORITES].map((item, idx) => (
                <div
                  key={`r3-${item.id}-${idx}`}
                  onClick={() => setActiveItemModal(item)}
                  className="relative group/dish shrink-0 transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Clean Dish Circle */}
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-amber-600/30 via-transparent to-amber-300/30 shadow-2xl hover:shadow-amber-500/20 transition-all">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover rounded-full transform group-hover/dish:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Floating Pill Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-zinc-900/90 dark:bg-black/90 border border-amber-500/40 text-white text-[11px] font-semibold shadow-xl flex items-center gap-1.5 group-hover/dish:bg-amber-500 group-hover/dish:text-zinc-950 transition-colors">
                    <span className="font-bold text-amber-400 group-hover/dish:text-zinc-950">${item.price}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-500 group-hover/dish:bg-zinc-800" />
                    <span className="truncate max-w-[120px] sm:max-w-[160px]">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* DISH PREVIEW LIGHTBOX MODAL */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setActiveItemModal(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dish Image Banner */}
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src={activeItemModal.image}
                alt={activeItemModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-amber-500 text-zinc-950 uppercase tracking-wider">
                    {activeItemModal.category}
                  </span>
                  <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {activeItemModal.rating}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold">{activeItemModal.name}</h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-5">
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {activeItemModal.description}
              </p>

              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700 text-xs">
                <div>
                  <span className="text-zinc-400 block font-medium text-[10px] uppercase">Caloric Value</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{activeItemModal.calories} kcal</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-medium text-[10px] uppercase">Preparation Standard</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">Fresh Made to Order</span>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Price</span>
                  <span className="font-serif font-bold text-2xl text-zinc-900 dark:text-white">
                    ${activeItemModal.price}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleQuickAdd(activeItemModal);
                    setActiveItemModal(null);
                  }}
                  className="px-6 py-3 rounded-2xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Added Toast Notification */}
      {addedAnimation && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-300">
          <Check className="w-4 h-4" />
          <span>Added to your order!</span>
        </div>
      )}

    </section>
  );
};
