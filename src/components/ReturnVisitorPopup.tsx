import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  Clock,
  Flame,
  Gift,
  Mail,
  CheckCircle2,
  ArrowRight,
  X,
  UtensilsCrossed,
  RotateCcw,
  Star,
  Award,
  ChevronRight,
  ShoppingBag,
  Sparkle
} from 'lucide-react';
import { MenuItem } from '../types';
import { UserSession } from './EmailAuthModal';

interface ReturnVisitorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession | null;
  onLoginSuccess: (user: UserSession) => void;
  onAddToCart: (dish: MenuItem) => void;
  menuItems: MenuItem[];
  onOpenEmailModal: () => void;
}

export const ReturnVisitorPopup: React.FC<ReturnVisitorPopupProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onAddToCart,
  menuItems,
  onOpenEmailModal,
}) => {
  const [visitCount, setVisitCount] = useState<number>(1);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Initialize visit history from localStorage
  useEffect(() => {
    try {
      const storedVisits = localStorage.getItem('letoile_visit_count');
      const current = storedVisits ? parseInt(storedVisits, 10) : 0;
      const updated = current + 1;
      setVisitCount(updated);
      localStorage.setItem('letoile_visit_count', updated.toString());
      localStorage.setItem('letoile_last_visit_time', new Date().toISOString());
    } catch (err) {
      console.error('Error reading visit count:', err);
    }
  }, []);

  // Selected dishes for memory cards
  const lastOrderedDish = menuItems.find(m => m.id === 'm1') || menuItems[0];
  const likedDish = menuItems.find(m => m.id === 'm2') || menuItems[1];
  const newDish = menuItems.find(m => m.id === 'm3') || menuItems[2];

  const handleQuickMailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;

    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      const derivedName = nameInput.trim() || emailInput.split('@')[0].toUpperCase();
      const session: UserSession = {
        email: emailInput.toLowerCase().trim(),
        name: derivedName,
        tier: 'Gold Gourmet Member',
        points: 4250,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem('letoile_user_session', JSON.stringify(session));
      onLoginSuccess(session);
      setAuthSuccessMsg(true);
    }, 700);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('ETOILE2026');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-2xl bg-zinc-950 border border-amber-500/30 rounded-3xl shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col max-h-[90vh] z-10"
          >
            {/* Top Gold Shimmer Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 animate-shimmer" />

            {/* Ambient Glows */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="p-6 pb-4 border-b border-zinc-800/80 flex items-start justify-between relative z-10">
              <div className="space-y-1">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-widest font-cinzel"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Thank You For Visiting Again • Visit #{visitCount}</span>
                </motion.div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Welcome Back to L'Étoile</span>
                  <span className="text-amber-400">AI</span>
                </h2>
                <p className="text-xs text-zinc-400">
                  Your personalized culinary history, order memories & return-visitor rewards.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-amber-500/50 transition-all shrink-0 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-130px)] custom-scrollbar">

              {/* Mail Based Auth Section / Status Banner */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-amber-500/25 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                
                {currentUser ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-zinc-950 flex items-center justify-center font-serif font-bold text-lg shadow-md shrink-0">
                        {currentUser.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{currentUser.name}</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-xs text-zinc-400">{currentUser.email}</p>
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 mt-1">
                          <Award className="w-3 h-3" />
                          <span>{currentUser.tier} • {currentUser.points} Gourmet Points</span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onOpenEmailModal}
                      className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-amber-500/50 text-xs font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>Account Details</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-cinzel">
                        <Mail className="w-4 h-4" />
                        <span>Mail Authentication Required For Every Visit</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-700">
                        Instant Magic Sign-In
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Sign in with your email address to save your visit memory, favorite dishes, and earn loyalty rewards automatically on every visit.
                    </p>

                    {authSuccessMsg ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Authentication Successful! Welcome back. Your visit memories are synchronized.</span>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleQuickMailAuth} className="flex flex-col sm:flex-row gap-2.5 pt-1">
                        <div className="relative flex-1">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                          <input
                            type="email"
                            required
                            placeholder="Enter your email (e.g. gourmand@letoile.com)"
                            value={emailInput}
                            onChange={e => setEmailInput(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 focus:border-amber-500 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all"
                          />
                        </div>
                        <motion.button
                          type="submit"
                          disabled={isAuthenticating}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                        >
                          {isAuthenticating ? (
                            <span>Authenticating...</span>
                          ) : (
                            <>
                              <span>Verify & Save Session</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </motion.button>
                      </form>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Grid of Memory Popups: Last Ordered, Liked, New Dish */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Card 1: Last Time You Ordered This */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 group shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        <RotateCcw className="w-3 h-3" />
                        <span>Last Time You Ordered</span>
                      </span>
                      <span className="text-[10px] text-zinc-500">Visit #{visitCount - 1 > 0 ? visitCount - 1 : 1}</span>
                    </div>

                    <div className="relative h-28 rounded-xl overflow-hidden border border-zinc-800">
                      <img
                        src={lastOrderedDish.image}
                        alt={lastOrderedDish.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate">{lastOrderedDish.name}</span>
                        <span className="text-xs font-serif font-bold text-amber-400 shrink-0">${lastOrderedDish.price}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {lastOrderedDish.description}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onAddToCart(lastOrderedDish);
                      onClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order Again</span>
                  </motion.button>
                </motion.div>

                {/* Card 2: You Liked This */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-3 group shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-400 uppercase tracking-wider bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                        <Heart className="w-3 h-3 fill-rose-400" />
                        <span>You Liked This</span>
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{likedDish.rating}</span>
                      </div>
                    </div>

                    <div className="relative h-28 rounded-xl overflow-hidden border border-zinc-800">
                      <img
                        src={likedDish.image}
                        alt={likedDish.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate">{likedDish.name}</span>
                        <span className="text-xs font-serif font-bold text-rose-400 shrink-0">${likedDish.price}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {likedDish.description}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onAddToCart(likedDish);
                      onClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-rose-500 hover:text-white text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Add to Favorite Order</span>
                  </motion.button>
                </motion.div>

                {/* Card 3: New Dish Alert */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3 group shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        <Flame className="w-3 h-3" />
                        <span>New Dish Introduced</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">✨ Chef's Special</span>
                    </div>

                    <div className="relative h-28 rounded-xl overflow-hidden border border-zinc-800">
                      <img
                        src={newDish.image}
                        alt={newDish.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate">{newDish.name}</span>
                        <span className="text-xs font-serif font-bold text-emerald-400 shrink-0">${newDish.price}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {newDish.description}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onAddToCart(newDish);
                      onClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>Try New Dish</span>
                  </motion.button>
                </motion.div>

              </div>

              {/* Come Again Special Reward Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-zinc-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                    <Gift className="w-5 h-5 animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>
                  <div className="space-y-0.5 text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <span className="font-serif font-bold text-sm text-amber-300">"Come Again" Special Aperitif Gift</span>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">Code: ETOILE2026</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Thank you for visiting us again today! Present code <code className="text-amber-400 font-mono font-bold">ETOILE2026</code> to your server for a complimentary Grand Cru Kir Royale.
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyCoupon}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all shrink-0 w-full sm:w-auto text-center cursor-pointer"
                >
                  {copiedCoupon ? 'Copied to Clipboard!' : 'Copy Reward Code'}
                </motion.button>
              </motion.div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 relative z-10">
              <div className="flex items-center gap-2">
                <Sparkle className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Visit memory active for this browser session</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Start Exploring Menu
              </motion.button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

