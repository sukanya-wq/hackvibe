import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MenuItem,
  RestaurantTable,
  Order,
  OrderStatus,
  TableStatus,
  Reservation,
  QueueTicket,
  InventoryItem,
  StaffMember,
  CustomerRecord,
  UserRole
} from './types';

import {
  INITIAL_MENU as mockMenuItems,
  INITIAL_TABLES as mockTables,
  INITIAL_ORDERS as mockOrders,
  INITIAL_RESERVATIONS as mockReservations,
  INITIAL_QUEUE as mockQueueTickets,
  INITIAL_INVENTORY as mockInventory,
  INITIAL_STAFF as mockStaff,
  INITIAL_CUSTOMERS as mockCustomers
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { DutyRosterTicker } from './components/DutyRosterTicker';
import { Hero } from './components/Hero';
import { CulinaryCollectionRibbons } from './components/CulinaryCollectionRibbons';
import { RestaurantStory } from './components/RestaurantStory';
import { DishesCarousel } from './components/DishesCarousel';
import { AIDishRecommender } from './components/AIDishRecommender';
import { DigitalMenu } from './components/DigitalMenu';
import { SmartReservation } from './components/SmartReservation';
import { RestaurantMap } from './components/RestaurantMap';
import { LiveQueue } from './components/LiveQueue';
import { OrderTracker } from './components/OrderTracker';
import { RestaurantBlueprint } from './components/RestaurantBlueprint';
import { AIChatAssistant } from './components/AIChatAssistant';
import { BurgerExperience } from './components/BurgerExperience';
import { QRCodeModal } from './components/QRCodeModal';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { WineCellarSommelier } from './components/WineCellarSommelier';
import { TastingMenuBuilder } from './components/TastingMenuBuilder';
import { CustomerReviews } from './components/CustomerReviews';
import { CartDrawer } from './components/CartDrawer';
import { MissionControl } from './components/AdminDashboard/MissionControl';
import { EmailAuthModal, UserSession } from './components/EmailAuthModal';
import { ReturnVisitorPopup } from './components/ReturnVisitorPopup';
import { JudgeTourGuide } from './components/JudgeTourGuide';
import { MouseGlowEffect } from './components/MouseGlowEffect';
import { Wine, Sparkles, ChefHat, MapPin, ChevronRight, Compass, Crown, UtensilsCrossed } from 'lucide-react';

export default function App() {
  // Global State
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [activeView, setActiveView] = useState<string>('burger');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  // Authenticated User Session (persisted in localStorage)
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem('letoile_user_session');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isVisitorPopupOpen, setIsVisitorPopupOpen] = useState(true);

  // Data Collections
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [tables, setTables] = useState<RestaurantTable[]>(mockTables);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [queueTickets, setQueueTickets] = useState<QueueTicket[]>(mockQueueTickets);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff);
  const [customers, setCustomers] = useState<CustomerRecord[]>(mockCustomers);

  // Cart State
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number; notes?: string }[]>([
    { item: mockMenuItems[0], quantity: 1 }
  ]);

  // Dark Mode toggle side effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Initial Fetch from API Server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, tablesRes, ordersRes, resvRes, queueRes, invRes] = await Promise.all([
          fetch('/api/menu').then(r => r.json()).catch(() => null),
          fetch('/api/tables').then(r => r.json()).catch(() => null),
          fetch('/api/orders').then(r => r.json()).catch(() => null),
          fetch('/api/reservations').then(r => r.json()).catch(() => null),
          fetch('/api/queue').then(r => r.json()).catch(() => null),
          fetch('/api/inventory').then(r => r.json()).catch(() => null)
        ]);

        if (menuRes && Array.isArray(menuRes)) setMenuItems(menuRes);
        if (tablesRes && Array.isArray(tablesRes)) setTables(tablesRes);
        if (ordersRes && Array.isArray(ordersRes)) setOrders(ordersRes);
        if (resvRes && Array.isArray(resvRes)) setReservations(resvRes);
        if (queueRes && Array.isArray(queueRes)) setQueueTickets(queueRes);
        if (invRes && Array.isArray(invRes)) setInventory(invRes);
      } catch (err) {
        console.error("API load fallback to local mock data:", err);
      }
    };

    fetchData();
  }, []);

  // Cart Handlers
  const handleAddToCart = (dish: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.item.id === dish.id);
      if (existing) {
        return prev.map(ci =>
          ci.item.id === dish.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item: dish, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(ci => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as { item: MenuItem; quantity: number; notes?: string }[]
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart(prev => prev.filter(ci => ci.item.id !== itemId));
  };

  // Order Handlers
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setActiveView('orders');
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Table Handlers
  const handleUpdateTableStatus = async (tableId: string, status: TableStatus) => {
    setTables(prev =>
      prev.map(t => (t.id === tableId ? { ...t, status } : t))
    );
    try {
      await fetch(`/api/tables/${tableId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Inventory Handlers
  const handleRestockItem = async (itemId: string, amount: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === itemId
          ? {
              ...item,
              currentStock: Number(((item.currentStock ?? 0) + amount).toFixed(1)),
              status: 'optimal'
            }
          : item
      )
    );
    try {
      await fetch(`/api/inventory/${itemId}/restock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const totalCartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950 transition-colors duration-300 relative">
      
      {/* Luxury Mouse Follow Glow Effect */}
      <MouseGlowEffect />

      {/* Moving Duty Banner */}
      <DutyRosterTicker />

      {/* Top Navbar */}
      <Navbar
        userRole={userRole}
        onToggleRole={role => {
          setUserRole(role);
          if (role !== 'customer') setActiveView('admin');
          else setActiveView('home');
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQR={() => setIsQRModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenEmailLogin={() => setIsEmailModalOpen(true)}
        onOpenVisitorPopup={() => setIsVisitorPopupOpen(true)}
        currentUser={currentUser}
        activeView={activeView}
        onNavigate={setActiveView}
      />

      {/* Main View Renderer */}
      <main className="pt-20">
        {activeView === 'admin' || userRole !== 'customer' ? (
          <MissionControl
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            tables={tables}
            onUpdateTableStatus={handleUpdateTableStatus}
            inventory={inventory}
            onRestockItem={handleRestockItem}
            staff={staff}
            customers={customers}
            reservations={reservations}
            queueTickets={queueTickets}
          />
        ) : (
          /* Customer Experience Views */
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeView === 'burger' && (
                <BurgerExperience onEnterWebsite={() => setActiveView('home')} />
              )}

            {activeView === 'home' && (
              <>
                <Hero
                  onReserveClick={() => setActiveView('reservation')}
                  onOrderClick={() => setActiveView('menu')}
                  onSommelierClick={() => setActiveView('recommender')}
                  onBookTable={() => setActiveView('reservation')}
                  onExploreMenu={() => setActiveView('menu')}
                />
                <CulinaryCollectionRibbons />
                
                {/* Feature Gateway Cards Grid (Navigates directly to dedicated tabs) */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="text-center space-y-2 mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      Bespoke Culinary Destinations
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
                      Explore L'Étoile Experiences
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                      Select a dedicated experience below or use the top navigation menu to jump directly to any tab.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Tasting Menu Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6 hover:border-amber-500/50 transition-all group">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                          <ChefHat className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                          5-Course Tasting Menu
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          Build your personal gastronomy journey course by course with option for Grand Cru wine pairings.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveView('tasting')}
                        className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <span>Open Tasting Builder</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Wine Cellar Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6 hover:border-amber-500/50 transition-all group">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                          <Wine className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                          Grand Reserve Wine Cellar
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          Discover rare vintages, temperature-controlled Premier Crus, and glass pour options.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveView('cellar')}
                        className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <span>Open Wine Cellar</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* AI Recommender Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6 hover:border-amber-500/50 transition-all group">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                          AI Recommender
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          Get real-time AI dish recommendations based on dietary preferences, mood, and budget.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveView('recommender')}
                        className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <span>Launch AI Recommender</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Location & Map Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6 hover:border-amber-500/50 transition-all group">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                          Location & Directions
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          Interactive Google map, valet parking details, and public transport options.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveView('location')}
                        className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <span>View Location & Valet</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Live Blueprint Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6 hover:border-amber-500/50 transition-all group">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                          <Crown className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                          Interactive Floor Blueprint
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          See live table statuses across Window, Main Hall, Garden, and VIP Suites.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveView('blueprint')}
                        className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <span>View Live Blueprint</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </section>

                <RestaurantStory />
              </>
            )}

            {activeView === 'menu' && (
              <>
                <DigitalMenu
                  menuItems={menuItems}
                  onAddToCart={handleAddToCart}
                  onSelectDish={dish => handleAddToCart(dish)}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                  <DishesCarousel dishes={menuItems} menuItems={menuItems} onAddToCart={handleAddToCart} onSelectDish={handleAddToCart} />
                </div>
              </>
            )}

            {activeView === 'recommender' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <AIDishRecommender onAddToCart={handleAddToCart} allDishes={menuItems} />
              </div>
            )}

            {activeView === 'tasting' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <TastingMenuBuilder onAddToCart={handleAddToCart} />
              </div>
            )}

            {activeView === 'cellar' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <WineCellarSommelier onAddToCart={handleAddToCart} />
              </div>
            )}

            {activeView === 'location' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <RestaurantMap />
              </div>
            )}

            {activeView === 'reservation' && (
              <SmartReservation
                currentUser={currentUser}
                onReservationComplete={newRes => {
                  setReservations(prev => [newRes, ...prev]);
                }}
              />
            )}

            {activeView === 'blueprint' && (
              <RestaurantBlueprint
                tables={tables}
                onUpdateTableStatus={handleUpdateTableStatus}
                onReserveTable={(tblNum) => {
                  setActiveView('reservation');
                }}
                onOrderForTable={(tblNum) => {
                  setActiveView('menu');
                }}
                onOpenQRForTable={(tblNum) => {
                  setIsQRModalOpen(true);
                }}
              />
            )}

            {activeView === 'queue' && (
              <LiveQueue
                queueTickets={queueTickets}
                onJoinQueue={newTicket => {
                  setQueueTickets(prev => [...prev, newTicket]);
                }}
              />
            )}

            {activeView === 'orders' && (
              <OrderTracker orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
            )}

            {/* Bottom Guest Testimonials & Reviews Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <CustomerReviews />
            </div>
          </motion.div>
        </AnimatePresence>
        )}
      </main>

      {/* Customer Footer */}
      {userRole === 'customer' && (
        <footer className="bg-zinc-950 text-white py-12 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
            <div className="space-y-1 text-center md:text-left">
              <span className="font-serif font-bold text-lg text-white block">L'Étoile Modern Bistro</span>
              <p>742 Grand Avenue • Penthouse Floor • Michelin Star Quality</p>
            </div>
            <div className="flex items-center gap-6">
              <span>Open Daily: 17:00 - 23:30</span>
              <span>•</span>
              <span>Reservations: +1 (555) 019-2834</span>
            </div>
            <div className="text-zinc-500">
              © 2026 RestaurantOS AI Platform. All rights reserved.
            </div>
          </div>
        </footer>
      )}

      {/* Floating AI Sommelier Chat Bot */}
      <AIChatAssistant />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        onOrderPlaced={handleOrderPlaced}
      />

      {isQRModalOpen && (
        <QRCodeModal onClose={() => setIsQRModalOpen(false)} />
      )}

      {isProfileModalOpen && (
        <CustomerProfileModal
          onClose={() => setIsProfileModalOpen(false)}
          orders={orders}
          reservations={reservations}
          currentUser={currentUser}
          onOpenEmailLogin={() => setIsEmailModalOpen(true)}
        />
      )}

      <EmailAuthModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
        onLogout={() => {
          setCurrentUser(null);
        }}
      />

      {/* Return Visitor & Memory Popup */}
      <ReturnVisitorPopup
        isOpen={isVisitorPopupOpen}
        onClose={() => setIsVisitorPopupOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => setCurrentUser(user)}
        onAddToCart={handleAddToCart}
        menuItems={menuItems}
        onOpenEmailModal={() => setIsEmailModalOpen(true)}
      />

      {/* Floating Re-Open Visitor History Button (Bottom Left) */}
      {!isVisitorPopupOpen && (
        <button
          onClick={() => setIsVisitorPopupOpen(true)}
          className="fixed bottom-6 left-6 z-40 px-4 py-2.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-amber-400 border border-amber-500/40 hover:border-amber-400 font-bold text-xs shadow-2xl backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105 group"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Visit Memory & Perks</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* Hackathon Judge Feature Tour Guide (Bottom Right) */}
      <JudgeTourGuide
        onNavigate={setActiveView}
        onOpenQR={() => setIsQRModalOpen(true)}
        onOpenVisitorPopup={() => setIsVisitorPopupOpen(true)}
        onOpenEmailLogin={() => setIsEmailModalOpen(true)}
        activeView={activeView}
      />

    </div>
  );
}
