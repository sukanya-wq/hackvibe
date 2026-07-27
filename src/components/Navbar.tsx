import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Calendar,
  Sparkles,
  ShoppingBag,
  Users,
  QrCode,
  Globe,
  Sun,
  Moon,
  Shield,
  ChefHat,
  LayoutDashboard,
  Bell,
  Clock,
  User,
  Mail,
  Check,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: any) => void;
  userRole: UserRole;
  onToggleRole: (role: UserRole) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenQR: () => void;
  onOpenProfile: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  onOpenEmailLogin?: () => void;
  onOpenVisitorPopup?: () => void;
  currentUser?: { email: string; name: string } | null;
  // Backward compatibility prop aliases
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  currentRole?: UserRole;
  setCurrentRole?: (role: UserRole) => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  language?: string;
  setLanguage?: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = (props) => {
  const activeView = props.activeView || props.activeTab || 'home';
  const onNavigate = props.onNavigate || props.setActiveTab || (() => {});
  const userRole = props.userRole || props.currentRole || 'customer';
  const onToggleRole = props.onToggleRole || props.setCurrentRole || (() => {});
  const isDarkMode = props.isDarkMode ?? props.darkMode ?? false;
  const onToggleDarkMode = props.onToggleDarkMode || (props.setDarkMode ? () => props.setDarkMode!(!isDarkMode) : () => {});
  const selectedLanguage = props.selectedLanguage || props.language || 'EN';
  const onSelectLanguage = props.onSelectLanguage || props.setLanguage || (() => {});
  
  const { cartCount, onOpenCart, onOpenQR, onOpenProfile } = props;

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { role: 'customer', label: 'Guest / Customer', icon: <User className="w-4 h-4" />, desc: 'Browse digital menu, book tables, order, AI sommelier' },
    { role: 'manager', label: 'Restaurant Manager', icon: <LayoutDashboard className="w-4 h-4" />, desc: 'Mission Control, analytics, staff, floor plan' },
    { role: 'chef', label: 'Head Chef (KDS)', icon: <ChefHat className="w-4 h-4" />, desc: 'Kitchen command pipeline, prep timers, inventory' },
    { role: 'admin', label: 'System Admin', icon: <Shield className="w-4 h-4" />, desc: 'Full operational control, billing, AI intelligence' }
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'FR', name: 'Français' },
    { code: 'JP', name: '日本語' },
    { code: 'ES', name: 'Español' },
    { code: 'IT', name: 'Italiano' }
  ];

  const handleNavClick = (view: any) => {
    if (view !== 'admin' && userRole !== 'customer') {
      onToggleRole('customer');
    } else if (view === 'admin' && userRole === 'customer') {
      onToggleRole('admin');
    }
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  interface NavTab {
    id: 'burger' | 'home' | 'menu' | 'recommender' | 'tasting' | 'cellar' | 'reservation' | 'blueprint' | 'queue' | 'location' | 'orders' | 'admin';
    label: string;
    badge?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
    isHighlight?: boolean;
  }

  const navTabs: NavTab[] = [
    { id: 'burger', label: '🍔 Burger Craft', badge: true },
    { id: 'home', label: 'Overview' },
    { id: 'menu', label: 'Digital Menu' },
    { id: 'recommender', label: 'AI Recommender' },
    { id: 'tasting', label: 'Tasting Menu' },
    { id: 'cellar', label: 'Wine Cellar' },
    { id: 'reservation', label: 'Reserve Table' },
    { id: 'blueprint', label: 'Live Blueprint' },
    { id: 'queue', label: 'Live Queue', badge: true },
    { id: 'location', label: 'Location & Map' },
    { id: 'orders', label: 'Order Status' },
    { id: 'admin', label: 'Mission Control', icon: LayoutDashboard, isHighlight: true }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 dark:bg-zinc-950/90 border-b border-zinc-200/80 dark:border-amber-500/15 transition-all duration-300">
      {/* Top Gold Foil Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-zinc-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all duration-300 border border-amber-300/50">
              <UtensilsCrossed className="w-5 h-5 relative z-10" />
              <div className="absolute inset-0 rounded-2xl bg-amber-400/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  L'Étoile
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/30 text-amber-700 dark:text-amber-300 border border-amber-400/40 shadow-sm">
                  AI OS
                </span>
              </div>
              <p className="text-[10px] text-amber-600/90 dark:text-amber-400/80 tracking-widest uppercase font-semibold font-cinzel">
                3 Michelin Stars 2026
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navTabs.map(tab => {
              const isActive = activeView === tab.id || (tab.id === 'home' && activeView === 'hero');
              
              if (tab.isHighlight) {
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNavClick('admin')}
                    className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                      isActive || userRole !== 'customer'
                        ? 'bg-gradient-to-r from-zinc-900 to-zinc-800 text-white dark:from-amber-500 dark:to-amber-600 dark:text-zinc-950 shadow-sm'
                        : 'text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200/80 dark:border-amber-800/50'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id as any)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive && userRole === 'customer'
                      ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Role Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1 text-xs font-semibold"
                title="Change Language"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{selectedLanguage}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl py-1 z-50">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onSelectLanguage(l.code);
                        setShowLangMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                    >
                      <span>{l.name}</span>
                      {selectedLanguage === l.code && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* QR Code Trigger */}
            <button
              onClick={onOpenQR}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Table QR Code & Digital Menu"
            >
              <QrCode className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Toggle Light / Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Button */}
            <button
              onClick={onOpenProfile}
              className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Customer Profile & Loyalty"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Visitor Memory / Thank You Popup Button */}
            {props.onOpenVisitorPopup && (
              <button
                onClick={props.onOpenVisitorPopup}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all shadow-sm"
                title="Thank you for visiting again! Click to view your visit memories & perks"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="hidden xl:inline">Visit History & Perks</span>
              </button>
            )}

            {/* Email Authentication / Login Trigger */}
            <button
              onClick={props.onOpenEmailLogin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                props.currentUser
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-amber-500'
              }`}
              title={props.currentUser ? `Signed in as ${props.currentUser.email}` : "Sign In with Email"}
            >
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden lg:inline truncate max-w-[120px]">
                {props.currentUser ? props.currentUser.name.split(' ')[0] : 'Email Login'}
              </span>
              <span className="lg:hidden">
                {props.currentUser ? 'Account' : 'Login'}
              </span>
            </button>

            {/* Role Switcher Badge */}
            <button
              onClick={() => setShowRoleModal(true)}
              className="flex items-center gap-1.5 pl-3 pr-2.5 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity"
            >
              <span className="capitalize hidden sm:inline">{userRole} Mode</span>
              <span className="capitalize sm:hidden">{userRole.slice(0, 3)}</span>
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200">
            {navTabs.map(tab => {
              const isActive = activeView === tab.id || (tab.id === 'home' && activeView === 'hero');

              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id as any)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                    isActive
                      ? 'bg-amber-500 text-zinc-950 font-bold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab.icon && <tab.icon className="w-4 h-4" />}
                    {tab.label}
                  </span>
                  {tab.badge && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Role Switcher Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-zinc-900 dark:text-white">
                  Switch Operational Role
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Simulate different access views for RestaurantOS AI
                </p>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              {roles.map(r => (
                <div
                  key={r.role}
                  onClick={() => {
                    onToggleRole(r.role);
                    setShowRoleModal(false);
                    if (r.role !== 'customer') {
                      onNavigate('admin');
                    } else {
                      onNavigate('home');
                    }
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    userRole === r.role
                      ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${userRole === r.role ? 'bg-amber-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
                    {r.icon}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{r.label}</span>
                      {userRole === r.role && <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Active</span>}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => setShowRoleModal(false)}
                className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium text-xs hover:bg-zinc-800 transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
