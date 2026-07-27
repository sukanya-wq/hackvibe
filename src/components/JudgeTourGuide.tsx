import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Sparkles,
  QrCode,
  Wine,
  UtensilsCrossed,
  RotateCcw,
  MapPin,
  Users,
  Brain,
  ShieldCheck,
  ChevronDown,
  X,
  ArrowRight,
  Flame,
  CheckCircle2,
  Lightbulb,
  Cpu,
  Layers,
  Clock,
  Play,
  FileText,
  Copy,
  Check,
  Compass,
  ShoppingBag,
  Sparkle
} from 'lucide-react';

interface JudgeTourGuideProps {
  onNavigate: (view: string) => void;
  onOpenQR: () => void;
  onOpenVisitorPopup: () => void;
  onOpenEmailLogin: () => void;
  activeView: string;
}

export const JudgeTourGuide: React.FC<JudgeTourGuideProps> = ({
  onNavigate,
  onOpenQR,
  onOpenVisitorPopup,
  onOpenEmailLogin,
  activeView,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'features' | 'ps-levels' | 'stack'>('features');
  const [copiedPitch, setCopiedPitch] = useState(false);

  const judgeHighlights = [
    {
      id: 'qr',
      title: 'QR Code Table Ordering',
      badge: 'QR Code is Here 📱',
      description: 'Scan & order directly from table without waiter wait time.',
      icon: QrCode,
      color: 'from-amber-500 to-amber-600',
      action: () => onOpenQR(),
    },
    {
      id: 'visitor',
      title: 'Return-Visitor Memory & Mail Auth',
      badge: 'Visit Perks & Memories 🔄',
      description: 'Tracks visit counts, last ordered dish, and rewards via email.',
      icon: RotateCcw,
      color: 'from-purple-500 to-indigo-600',
      action: () => onOpenVisitorPopup(),
    },
    {
      id: 'burger',
      title: 'Interactive 3D Burger Studio',
      badge: '3D Burger Builder 🍔',
      description: 'Custom layer-by-layer gourmet burger assembly with 3D feel.',
      icon: UtensilsCrossed,
      color: 'from-orange-500 to-red-600',
      action: () => onNavigate('burger'),
    },
    {
      id: 'wine',
      title: 'AI Wine Sommelier Cellar',
      badge: 'AI Sommelier Here 🍷',
      description: 'Gemini AI recommends vintage wine pairings for any meal.',
      icon: Wine,
      color: 'from-rose-500 to-pink-600',
      action: () => onNavigate('wine'),
    },
    {
      id: 'tables',
      title: 'Interactive Seat Blueprint',
      badge: 'Live Seat Selector 🗺️',
      description: 'Visual floor map with real-time table reservation & seating.',
      icon: MapPin,
      color: 'from-emerald-500 to-teal-600',
      action: () => onNavigate('tables'),
    },
    {
      id: 'roster',
      title: 'Live Kitchen Duty Roster',
      badge: 'Live Kitchen Roster 👨‍🍳',
      description: 'Live Michelin chef shifts, kitchen load & status ticker.',
      icon: Users,
      color: 'from-cyan-500 to-blue-600',
      action: () => onNavigate('roster'),
    },
    {
      id: 'ai-recommend',
      title: 'Smart AI Dish Recommender',
      badge: 'AI Dish Picker 🧠',
      description: 'Personalized food recommendations based on dietary mood.',
      icon: Brain,
      color: 'from-violet-500 to-purple-600',
      action: () => onNavigate('ai-recommend'),
    },
    {
      id: 'tasting',
      title: 'Bespoke Tasting Menu Builder',
      badge: 'Tasting Builder 🥂',
      description: 'Craft personalized multi-course gourmet tasting experiences.',
      icon: Flame,
      color: 'from-yellow-500 to-amber-600',
      action: () => onNavigate('tasting'),
    },
    {
      id: 'location',
      title: 'Restaurant Location & Valet',
      badge: 'Location & Map 📍',
      description: 'GPS map, valet parking assistance, operating hours & directions.',
      icon: MapPin,
      color: 'from-blue-500 to-indigo-600',
      action: () => onNavigate('location'),
    },
    {
      id: 'admin',
      title: 'Mission Control POS Dashboard',
      badge: 'Admin & POS Dashboard 📊',
      description: 'Full restaurant management, order queue & revenue insights.',
      icon: ShieldCheck,
      color: 'from-amber-600 to-yellow-500',
      action: () => onNavigate('admin'),
    },
  ];

  const psLevels = [
    {
      level: '🥉 BRONZE (UX & Design)',
      story: 'User Story 1: Modern & Intuitive SaaS Interface',
      desc: '3-Michelin star luxury responsive design, glassmorphism UI, mouse glow, sound effects & dark mode.',
      status: '100% Complete',
      color: 'border-amber-600/60 bg-amber-950/20 text-amber-400',
      action: () => onNavigate('home'),
      actionText: 'Explore UX'
    },
    {
      level: '🥈 SILVER (Auth & Digital Workflows)',
      story: 'User Stories 2 & 3: Email OTP, Google OAuth & Digital Operations',
      desc: 'Digital Menu, Live Stock Toggles, Smart Reservations, QR Ordering, Queue Tracker, Billing & Email OTP + Google OAuth.',
      status: '100% Complete',
      color: 'border-slate-400/60 bg-slate-900/30 text-slate-200',
      action: () => onOpenEmailLogin(),
      actionText: 'Test Auth'
    },
    {
      level: '🥇 GOLD (Restaurant Management POS)',
      story: 'User Story 4: Management Dashboard & Operations',
      desc: 'Admin POS with real-time Order Queue, Table Seat Maps, Automated Low-Stock Inventory Alerts, Staff Roster & Sales Analytics.',
      status: '100% Complete',
      color: 'border-yellow-400/60 bg-yellow-950/20 text-yellow-300',
      action: () => onNavigate('admin'),
      actionText: 'Open POS'
    },
    {
      level: '💎 PLATINUM (Intelligent Operations)',
      story: 'User Story 5: AI-Driven Insights & Smart Recommender',
      desc: 'Gemini AI Sommelier, Personalized Mood Recommender, Demand Forecasting & Return-Visitor Memory Engine.',
      status: '100% Complete',
      color: 'border-cyan-400/60 bg-cyan-950/20 text-cyan-300',
      action: () => onNavigate('wine'),
      actionText: 'Test AI'
    }
  ];

  const handleCopyPitch = () => {
    const text = `🏆 L'Étoile AI — Next-Gen Michelin Star Restaurant OS
• Unique Pitch: Autonomous dining platform integrating AI Sommelier, Return-Visitor Memory & 3D Culinary Customization.
• Core Tech: React 18, TypeScript, Tailwind CSS, Gemini AI, Framer Motion.
• Key Innovation: Mail-authenticated visitor session history & real-time floor seat map.`;
    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto font-sans">
      
      {/* Expanded Tour Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="w-[360px] sm:w-[440px] bg-zinc-950/95 border border-amber-500/40 rounded-3xl shadow-2xl shadow-amber-500/20 backdrop-blur-xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Top Gold Shimmer Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 animate-shimmer" />

            {/* Header */}
            <div className="p-5 pb-3 border-b border-zinc-800 flex items-start justify-between bg-zinc-900/60">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider font-cinzel">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hackathon Judge Guide</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Innovation Tour & Pitch</span>
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                </h3>
                <p className="text-xs text-zinc-400 leading-snug">
                  Curated for hackathon evaluation: test our unique features in seconds!
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-amber-500/40 transition-all shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-Header Tabs */}
            <div className="px-4 pt-3 pb-2 bg-zinc-950 border-b border-zinc-800 flex items-center gap-1.5 text-xs font-bold">
              <button
                onClick={() => setActiveTab('features')}
                className={`flex-1 py-1.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'features'
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Feature Hints</span>
              </button>

              <button
                onClick={() => setActiveTab('ps-levels')}
                className={`flex-1 py-1.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'ps-levels'
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>PS Levels (1-5)</span>
              </button>

              <button
                onClick={() => setActiveTab('stack')}
                className={`flex-1 py-1.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'stack'
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Tech Stack</span>
              </button>
            </div>

            {/* Tab 1: Feature Hints */}
            {activeTab === 'features' && (
              <div className="p-4 space-y-2.5 overflow-y-auto max-h-[calc(85vh-170px)] custom-scrollbar">
                {judgeHighlights.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        item.action();
                      }}
                      className="p-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-amber-500/40 transition-all cursor-pointer group flex items-center justify-between gap-3 shadow-md"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-zinc-950 font-bold shadow-md shrink-0`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                              {item.title}
                            </span>
                            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Tab 2: PS Levels Compliance */}
            {activeTab === 'ps-levels' && (
              <div className="p-4 space-y-3 overflow-y-auto max-h-[calc(85vh-170px)] custom-scrollbar">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>Hackathon Ranking Compliance</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    Platinum Achieved
                  </span>
                </div>

                {psLevels.map((lvl, idx) => (
                  <motion.div
                    key={lvl.level}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-3.5 rounded-2xl border ${lvl.color} flex flex-col gap-2`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-serif font-bold tracking-wide">{lvl.level}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {lvl.status}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-zinc-200">{lvl.story}</div>
                    <p className="text-[10px] text-zinc-400 leading-relaxed">{lvl.desc}</p>
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={lvl.action}
                        className="px-3 py-1 rounded-xl bg-amber-500 text-zinc-950 font-bold text-[10px] hover:bg-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>{lvl.actionText}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Tab 3: Pitch & Tech Stack */}
            {activeTab === 'stack' && (
              <div className="p-4 space-y-3.5 overflow-y-auto max-h-[calc(85vh-170px)] custom-scrollbar text-xs">
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-amber-400 text-sm">Project Pitch Summary</span>
                    <button
                      onClick={handleCopyPitch}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 font-bold text-[10px] transition-all cursor-pointer"
                    >
                      {copiedPitch ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPitch ? 'Copied Pitch' : 'Copy Summary'}</span>
                    </button>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-[11px]">
                    <strong className="text-white">L'Étoile AI</strong> elevates restaurant operating systems into an autonomous, 3-Michelin-star digital experience combining AI sommelier pairing, table floorplans, return-visitor memories, and POS telemetry.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Frontend Framework</span>
                    <p className="font-bold text-white text-xs">React 18 + TypeScript</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Styling Engine</span>
                    <p className="font-bold text-white text-xs">Tailwind CSS v4</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">AI Integration</span>
                    <p className="font-bold text-white text-xs">Gemini AI Model SDK</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Animations</span>
                    <p className="font-bold text-white text-xs">Motion / React</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Key Differentiators</span>
                  <ul className="space-y-1 text-zinc-300 text-[11px] list-disc list-inside">
                    <li>Mail-authenticated return visitor memory & rewards</li>
                    <li>Interactive 3D layer-by-layer gourmet burger studio</li>
                    <li>Sommelier AI with vintage cellar pairings</li>
                    <li>Live kitchen duty roster & real-time floor seat map</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Footer Summary */}
            <div className="p-3 bg-zinc-900/90 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between px-4">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>10 Standout Features</span>
              </span>
              <span className="text-[10px] text-zinc-500">Built for Hackathon Demo</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Floating Pill Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-zinc-950 font-bold text-xs shadow-2xl shadow-amber-500/30 flex items-center gap-2.5 border border-amber-300/80 cursor-pointer relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        
        <div className="w-6 h-6 rounded-lg bg-zinc-950 text-amber-400 flex items-center justify-center font-bold text-xs">
          🏆
        </div>

        <div className="text-left leading-none">
          <div className="text-[10px] uppercase font-cinzel font-extrabold text-zinc-900/80 tracking-wider">
            Judges Guide
          </div>
          <div className="text-xs font-black tracking-tight text-zinc-950">
            {isOpen ? 'Close Feature Hints' : 'Explore Unique Features ✨'}
          </div>
        </div>

        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-zinc-950 ml-1" />
        ) : (
          <div className="flex items-center gap-1 bg-zinc-950/20 px-2 py-1 rounded-lg text-[10px] font-extrabold text-zinc-950 border border-zinc-950/20">
            <span>10 Hints</span>
          </div>
        )}
      </motion.button>

    </div>
  );
};

