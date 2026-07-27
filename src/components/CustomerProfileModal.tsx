import React, { useState } from 'react';
import { User, Award, Heart, ShoppingBag, Calendar, Gift, X, Check, Star, ChevronRight, Mail, LogIn } from 'lucide-react';
import { Order, Reservation } from '../types';
import { UserSession } from './EmailAuthModal';

interface CustomerProfileModalProps {
  onClose: () => void;
  orders: Order[];
  reservations: Reservation[];
  currentUser?: UserSession | null;
  onOpenEmailLogin?: () => void;
}

export const CustomerProfileModal: React.FC<CustomerProfileModalProps> = ({
  onClose,
  orders,
  reservations,
  currentUser,
  onOpenEmailLogin
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'reservations' | 'coupons'>('overview');

  const profile = {
    name: currentUser?.name || 'Guest Gourmet',
    email: currentUser?.email || 'guest@letoile.com',
    tier: currentUser?.tier || 'Gold Gourmet',
    points: currentUser?.points || 1200,
    favoriteDish: 'A5 Miyazaki Wagyu Ribeye',
    favoriteWine: '2018 Chateau Margaux'
  };

  const coupons = [
    { code: 'CAVIAR25', title: '$25 Off Royal Caviar Tartlet', expiry: 'Expires in 6 days', minSpend: 100 },
    { code: 'SOMMELIER15', title: 'Complimentary Glass of Barolo', expiry: 'Expires in 12 days', minSpend: 80 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold font-serif text-lg shadow-md">
              AV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
                  {profile.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-300">
                  {profile.tier}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{profile.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onOpenEmailLogin && (
              <button
                onClick={() => {
                  onClose();
                  onOpenEmailLogin();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{currentUser ? 'Switch Account' : 'Sign In with Email'}</span>
              </button>
            )}
            <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Profile Stats Row */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 text-center">
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">Loyalty Balance</span>
            <span className="font-serif font-extrabold text-lg text-amber-600 dark:text-amber-400">{profile.points} pts</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">Total Visits</span>
            <span className="font-serif font-bold text-lg text-zinc-900 dark:text-white">28 Times</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">Favorite Dish</span>
            <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 truncate block">Wagyu Ribeye</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800">
          {(['overview', 'orders', 'reservations', 'coupons'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="max-h-64 overflow-y-auto space-y-3">
          {activeTab === 'overview' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-1">
                <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Personal Sommelier Notes:</span>
                <p className="text-zinc-500">Prefers Window Table #1. Drinks Old Fashioned cocktail before dining. Gluten-sensitive notes recorded.</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-1">
                <span className="font-bold text-zinc-800 dark:text-zinc-200 block">VIP Perks Unlocked:</span>
                <p className="text-zinc-500">• Complimentary Glass of Vintage Champagne on Arrival</p>
                <p className="text-zinc-500">• Priority Table Allocation & Sommelier Consultation</p>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-2">
              {(orders || []).map(o => (
                <div key={o.id} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-amber-600">{o.orderNumber}</span>
                    <span className="text-zinc-400 ml-2">({(o.items || []).length} Items)</span>
                  </div>
                  <span className="font-serif font-bold text-zinc-900 dark:text-white">${(o.finalAmount ?? 0).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="space-y-2">
              {reservations.map(r => (
                <div key={r.id} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white">{r.date} at {r.timeSlot}</span>
                    <span className="text-zinc-400 block">{r.guestsCount} Guests • {r.zone}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px]">Confirmed</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="space-y-2">
              {coupons.map((c, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-amber-800 dark:text-amber-300 block">{c.code}</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{c.title}</span>
                    <span className="text-[10px] text-zinc-500 block">{c.expiry}</span>
                  </div>
                  <button className="px-3 py-1 bg-amber-500 text-zinc-950 font-bold rounded-lg text-[10px]">Apply</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold text-xs"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
