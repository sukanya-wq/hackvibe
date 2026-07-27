import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronRight,
  RotateCw,
  Play,
  Pause,
  RotateCcw,
  UtensilsCrossed,
  CheckCircle2,
  Flame,
  Award,
  ArrowRight,
  Layers
} from 'lucide-react';

interface BurgerExperienceProps {
  onEnterWebsite: () => void;
}

interface BurgerLayer {
  id: string;
  name: string;
  category: string;
  color: string;
  height: number;
  offsetY: number;
  description: string;
  renderSvg: () => React.ReactNode;
}

const BURGER_LAYERS: BurgerLayer[] = [
  {
    id: 'bottom-bun',
    name: 'Toasted Artisanal Bottom Bun',
    category: 'Brioche Base',
    color: '#d97706',
    height: 38,
    offsetY: 0,
    description: 'Golden-brown toasted brioche bun infused with French cultured butter',
    renderSvg: () => (
      <svg viewBox="0 0 400 65" className="w-full h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.85)]">
        <defs>
          <linearGradient id="bottomBunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <radialGradient id="bottomInner" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="70%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
        </defs>
        {/* Inner toasted surface */}
        <ellipse cx="200" cy="14" rx="176" ry="12" fill="url(#bottomInner)" stroke="#b45309" strokeWidth="1" />
        {/* Toast ring texture */}
        <ellipse cx="200" cy="14" rx="150" ry="9" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
        {/* Bun body */}
        <path
          d="M 22 14 C 22 42, 50 60, 200 60 C 350 60, 378 42, 378 14 C 378 14, 300 24, 200 24 C 100 24, 22 14, 22 14 Z"
          fill="url(#bottomBunGrad)"
        />
        {/* Crust 3D Rim Highlight */}
        <path
          d="M 26 22 C 60 52, 340 52, 374 22"
          fill="none"
          stroke="#451a03"
          strokeWidth="3.5"
          opacity="0.5"
        />
        <path
          d="M 40 38 C 100 56, 300 56, 360 38"
          fill="none"
          stroke="#fef08a"
          strokeWidth="1.5"
          opacity="0.3"
        />
      </svg>
    )
  },
  {
    id: 'sauce-layer',
    name: 'Black Truffle Aioli Drizzle',
    category: 'House Sauce',
    color: '#fef08a',
    height: 18,
    offsetY: 0,
    description: 'Silky mayonnaise infused with winter black truffles & aged parmesan',
    renderSvg: () => (
      <svg viewBox="0 0 390 32" className="w-full h-auto drop-shadow-md">
        <defs>
          <linearGradient id="sauceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="30%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#fef9c3" />
          </linearGradient>
        </defs>
        {/* Smooth creamy sauce ribbons */}
        <path
          d="M 25 10 
             C 50 24, 80 4, 110 22 
             C 140 30, 170 10, 200 26 
             C 230 30, 260 8, 290 24 
             C 320 28, 350 12, 370 18 
             C 380 10, 360 2, 200 2 
             C 40 2, 15 6, 25 10 Z"
          fill="url(#sauceGrad)"
          opacity="0.95"
        />
        {/* Glossy sheen line */}
        <path
          d="M 35 8 C 60 18, 90 6, 120 18 C 150 24, 180 8, 210 20 C 240 24, 270 8, 300 18"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.75"
          strokeLinecap="round"
        />
        {/* Real Truffle Particles */}
        <circle cx="75" cy="14" r="1.8" fill="#27272a" />
        <circle cx="130" cy="18" r="2.2" fill="#451a03" />
        <circle cx="185" cy="14" r="1.5" fill="#27272a" />
        <circle cx="240" cy="19" r="2" fill="#451a03" />
        <circle cx="295" cy="16" r="1.8" fill="#27272a" />
        <circle cx="340" cy="14" r="2" fill="#451a03" />
      </svg>
    )
  },
  {
    id: 'pickles-onions',
    name: 'Caramelized Shallots & Dill Pickles',
    category: 'Relish Layer',
    color: '#84cc16',
    height: 26,
    offsetY: 0,
    description: 'Slow-charred sweet shallots paired with house-pickled cucumber rounds',
    renderSvg: () => (
      <svg viewBox="0 0 390 38" className="w-full h-auto drop-shadow-lg">
        <defs>
          <radialGradient id="pickleInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="70%" stopColor="#65a30d" />
            <stop offset="100%" stopColor="#3f6212" />
          </radialGradient>
        </defs>

        {/* Pickle Slice 1 */}
        <g>
          <ellipse cx="85" cy="20" rx="38" ry="14" fill="url(#pickleInner)" stroke="#3f6212" strokeWidth="2.5" />
          <ellipse cx="85" cy="20" rx="26" ry="8" fill="#84cc16" opacity="0.6" />
          <circle cx="75" cy="18" r="1.5" fill="#3f6212" />
          <circle cx="92" cy="22" r="1.5" fill="#3f6212" />
          <circle cx="85" cy="24" r="1.5" fill="#3f6212" />
        </g>

        {/* Pickle Slice 2 */}
        <g>
          <ellipse cx="195" cy="18" rx="42" ry="15" fill="url(#pickleInner)" stroke="#3f6212" strokeWidth="2.5" />
          <ellipse cx="195" cy="18" rx="28" ry="9" fill="#84cc16" opacity="0.6" />
          <circle cx="185" cy="16" r="1.5" fill="#3f6212" />
          <circle cx="205" cy="20" r="1.5" fill="#3f6212" />
          <circle cx="195" cy="21" r="1.5" fill="#3f6212" />
        </g>

        {/* Pickle Slice 3 */}
        <g>
          <ellipse cx="305" cy="22" rx="38" ry="14" fill="url(#pickleInner)" stroke="#3f6212" strokeWidth="2.5" />
          <ellipse cx="305" cy="22" rx="25" ry="8" fill="#84cc16" opacity="0.6" />
          <circle cx="295" cy="20" r="1.5" fill="#3f6212" />
          <circle cx="312" cy="24" r="1.5" fill="#3f6212" />
        </g>

        {/* Caramelized Onion Ring Ribbons */}
        <path d="M 35 24 C 65 10, 115 32, 145 20" stroke="#78350f" strokeWidth="5.5" fill="none" strokeLinecap="round" opacity="0.9" />
        <path d="M 35 24 C 65 10, 115 32, 145 20" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />

        <path d="M 140 22 C 180 6, 235 32, 275 16" stroke="#451a03" strokeWidth="5.5" fill="none" strokeLinecap="round" opacity="0.95" />
        <path d="M 140 22 C 180 6, 235 32, 275 16" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.75" />

        <path d="M 240 24 C 290 14, 330 28, 360 18" stroke="#78350f" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" />
      </svg>
    )
  },
  {
    id: 'wagyu-patty',
    name: 'A5 Miyazaki Wagyu Beef Patty',
    category: 'Prime Meat',
    color: '#7f1d1d',
    height: 56,
    offsetY: 0,
    description: '200g wood-fire seared Wagyu patty with intense marbling & smoky char',
    renderSvg: () => (
      <svg viewBox="0 0 400 70" className="w-full h-auto drop-shadow-[0_16px_25px_rgba(0,0,0,0.95)]">
        <defs>
          <linearGradient id="pattyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="35%" stopColor="#7f1d1d" />
            <stop offset="65%" stopColor="#450a0a" />
            <stop offset="100%" stopColor="#1a0500" />
          </linearGradient>
          <linearGradient id="searGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <radialGradient id="juiceJuiciness" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Main Patty Body with irregular seared edges */}
        <path
          d="M 18 20 C 18 6, 382 6, 382 20 L 376 54 C 376 66, 24 66, 24 54 Z"
          fill="url(#pattyGrad)"
        />

        {/* Top Seared Juicy Surface */}
        <ellipse cx="200" cy="20" rx="180" ry="14" fill="url(#searGlow)" opacity="0.3" />
        <ellipse cx="200" cy="18" rx="170" ry="10" fill="url(#juiceJuiciness)" />

        {/* Diagonal Wood-Fire Grill Char Marks */}
        <path d="M 65 14 L 105 28" stroke="#120600" strokeWidth="5" strokeLinecap="round" />
        <path d="M 125 12 L 165 29" stroke="#120600" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M 185 11 L 225 30" stroke="#120600" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M 245 12 L 285 29" stroke="#120600" strokeWidth="5" strokeLinecap="round" />
        <path d="M 305 14 L 340 27" stroke="#120600" strokeWidth="4.5" strokeLinecap="round" />

        {/* Glowing Fire Embers & Juice Beads */}
        <circle cx="90" cy="42" r="2" fill="#ef4444" className="animate-pulse" />
        <circle cx="150" cy="48" r="2.5" fill="#f87171" opacity="0.8" />
        <circle cx="210" cy="44" r="2" fill="#ef4444" className="animate-pulse" />
        <circle cx="270" cy="50" r="2.5" fill="#f87171" opacity="0.8" />
        <circle cx="320" cy="40" r="2" fill="#ef4444" />

        {/* Meat Grain Texture Marks */}
        <path d="M 40 38 Q 70 45, 100 40" stroke="#2a0800" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 160 42 Q 200 48, 240 43" stroke="#2a0800" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 290 40 Q 330 46, 360 38" stroke="#2a0800" strokeWidth="2" fill="none" opacity="0.6" />
      </svg>
    )
  },
  {
    id: 'cheddar-cheese',
    name: 'Melted Aged Wisconsin Cheddar',
    category: 'Gourmet Cheese',
    color: '#f59e0b',
    height: 34,
    offsetY: 0,
    description: '18-month aged cheddar melted to draped perfection with glossy sheen',
    renderSvg: () => (
      <svg viewBox="0 0 410 48" className="w-full h-auto drop-shadow-xl">
        <defs>
          <linearGradient id="cheeseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="30%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
        {/* Draped Cheese Sheet with realistic melting drips */}
        <path
          d="M 12 12 
             C 38 8, 75 14, 95 32 
             C 108 44, 120 46, 130 22 
             C 155 12, 195 14, 215 42 
             C 225 50, 240 48, 250 20 
             C 275 12, 315 14, 340 38 
             C 350 46, 370 40, 392 14 
             C 402 6, 380 2, 200 2 
             C 20 2, 2 6, 12 12 Z"
          fill="url(#cheeseGrad)"
        />
        {/* Specular Glossy Reflection Lines */}
        <path d="M 25 8 C 55 6, 85 8, 105 20" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M 175 8 C 205 6, 225 8, 240 24" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.85" strokeLinecap="round" />
        <path d="M 295 8 C 325 6, 345 8, 360 22" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'ripe-tomatoes',
    name: 'Vine-Ripened Organic Tomatoes',
    category: 'Fresh Produce',
    color: '#ef4444',
    height: 32,
    offsetY: 0,
    description: 'Thick heirloom tomato slices sprinkled with Maldon sea salt flakes',
    renderSvg: () => (
      <svg viewBox="0 0 380 42" className="w-full h-auto drop-shadow-md">
        <defs>
          <radialGradient id="tomatoGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="60%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>
        </defs>

        {/* Tomato Slice 1 */}
        <g>
          <ellipse cx="108" cy="21" rx="68" ry="17" fill="url(#tomatoGrad)" stroke="#7f1d1d" strokeWidth="2" />
          <ellipse cx="108" cy="21" rx="48" ry="11" fill="#dc2626" opacity="0.85" />
          {/* Seed Chambers */}
          <ellipse cx="90" cy="20" rx="8" ry="4" fill="#fef08a" opacity="0.9" />
          <ellipse cx="126" cy="22" rx="8" ry="4" fill="#fef08a" opacity="0.9" />
          {/* Specular Highlight */}
          <path d="M 60 14 C 90 8, 130 10, 150 16" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.6" />
        </g>

        {/* Tomato Slice 2 */}
        <g>
          <ellipse cx="272" cy="21" rx="68" ry="17" fill="url(#tomatoGrad)" stroke="#7f1d1d" strokeWidth="2" />
          <ellipse cx="272" cy="21" rx="48" ry="11" fill="#dc2626" opacity="0.85" />
          {/* Seed Chambers */}
          <ellipse cx="254" cy="20" rx="8" ry="4" fill="#fef08a" opacity="0.9" />
          <ellipse cx="290" cy="22" rx="8" ry="4" fill="#fef08a" opacity="0.9" />
          {/* Specular Highlight */}
          <path d="M 225 14 C 255 8, 295 10, 315 16" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.6" />
        </g>
      </svg>
    )
  },
  {
    id: 'crisp-lettuce',
    name: 'Crispy Hydroponic Green Leaf Lettuce',
    category: 'Fresh Greens',
    color: '#22c55e',
    height: 38,
    offsetY: 0,
    description: 'Farm-fresh ruffled butterhead lettuce offering a refreshing crunch',
    renderSvg: () => (
      <svg viewBox="0 0 420 48" className="w-full h-auto drop-shadow-lg">
        <defs>
          <linearGradient id="lettuceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="30%" stopColor="#4ade80" />
            <stop offset="70%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
        </defs>
        {/* Organic Ruffled Wavy Leaf Edge */}
        <path
          d="M 8 22 
             Q 28 2, 50 24 
             Q 70 40, 92 18 
             Q 122 2, 152 28 
             Q 182 44, 212 18 
             Q 242 2, 272 28 
             Q 302 42, 332 18 
             Q 362 2, 382 24 
             Q 402 38, 412 22 
             C 418 36, 380 46, 212 46 
             C 40 46, 2 36, 8 22 Z"
          fill="url(#lettuceGrad)"
        />
        {/* Leaf Veins */}
        <path d="M 50 24 Q 100 32, 212 30 Q 324 32, 382 24" stroke="#dcfce7" strokeWidth="2.5" fill="none" opacity="0.75" />
        <path d="M 92 18 Q 122 30, 152 28" stroke="#dcfce7" strokeWidth="1.8" fill="none" opacity="0.65" />
        <path d="M 272 28 Q 302 34, 332 18" stroke="#dcfce7" strokeWidth="1.8" fill="none" opacity="0.65" />
      </svg>
    )
  },
  {
    id: 'top-bun',
    name: 'Glazed Brioche Crown with Toasted Sesame',
    category: 'Brioche Crown',
    color: '#f59e0b',
    height: 72,
    offsetY: 0,
    description: 'Golden shiny dome sprinkled with toasted white and black sesame seeds',
    renderSvg: () => (
      <svg viewBox="0 0 400 115" className="w-full h-auto drop-shadow-[0_22px_35px_rgba(0,0,0,0.95)]">
        <defs>
          <linearGradient id="topBunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="15%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="glazeHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main Brioche Dome */}
        <path
          d="M 18 105 
             C 8 48, 78 5, 200 5 
             C 322 5, 392 48, 382 105 
             C 342 113, 58 113, 18 105 Z"
          fill="url(#topBunGrad)"
        />

        {/* Shiny Specular Glaze Curve */}
        <path
          d="M 55 46 C 98 20, 200 14, 265 24 C 200 28, 105 36, 55 46 Z"
          fill="url(#glazeHighlight)"
        />

        {/* Bottom edge shadow */}
        <ellipse cx="200" cy="105" rx="180" ry="8" fill="#451a03" opacity="0.65" />

        {/* Toasted Sesame Seeds (White & Black) */}
        {[
          { x: 90, y: 50 }, { x: 130, y: 35 }, { x: 170, y: 25 },
          { x: 210, y: 22 }, { x: 250, y: 32 }, { x: 290, y: 45 },
          { x: 110, y: 65 }, { x: 150, y: 48 }, { x: 190, y: 40 },
          { x: 230, y: 42 }, { x: 270, y: 58 }, { x: 310, y: 70 },
          { x: 140, y: 75 }, { x: 180, y: 62 }, { x: 220, y: 60 },
          { x: 260, y: 72 }, { x: 100, y: 32 }, { x: 280, y: 30 }
        ].map((s, i) => (
          <g key={i} transform={`translate(${s.x}, ${s.y}) rotate(${i * 25})`}>
            <ellipse cx="0" cy="0" rx="3.8" ry="2.2" fill={i % 4 === 0 ? "#18181b" : "#fef3c7"} stroke="#78350f" strokeWidth="0.5" />
          </g>
        ))}
      </svg>
    )
  }
];

export const BurgerExperience: React.FC<BurgerExperienceProps> = ({ onEnterWebsite }) => {
  // Current layer assembly index (0 to BURGER_LAYERS.length)
  const [assembledCount, setAssembledCount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  
  // Smooth rotation degree using requestAnimationFrame
  const [rotationDegree, setRotationDegree] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Realistic physics & interactivity states
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [impactTrigger, setImpactTrigger] = useState<number>(0);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);

  // Auto-assembly timer
  useEffect(() => {
    if (!isPlaying) return;

    if (assembledCount < BURGER_LAYERS.length) {
      const timer = setTimeout(() => {
        setAssembledCount((prev) => {
          const next = prev + 1;
          setImpactTrigger(Date.now());
          return next;
        });
      }, 1150);
      return () => clearTimeout(timer);
    }
  }, [assembledCount, isPlaying]);

  // Buttery-smooth requestAnimationFrame 3D rotation
  useEffect(() => {
    if (!isRotating) return;

    let lastTime = performance.now();
    const updateRotation = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      setRotationDegree((prev) => (prev + delta * 0.022) % 360);
      animFrameRef.current = requestAnimationFrame(updateRotation);
    };

    animFrameRef.current = requestAnimationFrame(updateRotation);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRotating]);

  // Mouse move parallax tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMouseTilt({ x: x * 14, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  const isFullyAssembled = assembledCount === BURGER_LAYERS.length;
  const currentActiveLayer = BURGER_LAYERS[Math.min(assembledCount, BURGER_LAYERS.length - 1)];

  const handleReplay = () => {
    setAssembledCount(0);
    setIsPlaying(true);
    setIsExploded(false);
  };

  const handleAssembleAll = () => {
    setAssembledCount(BURGER_LAYERS.length);
    setIsPlaying(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100vh-5rem)] bg-black text-white flex flex-col justify-between overflow-hidden selection:bg-amber-500 selection:text-black font-sans"
    >
      {/* Ambient Gold Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-amber-500/15 via-amber-700/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-amber-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(245, 158, 11, 0.6) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Top Header Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-center space-y-2.5 w-full">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-xs font-semibold tracking-wider uppercase text-amber-400 backdrop-blur-md shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Hyper-Realistic Culinary Craft</span>
          <span className="text-zinc-700">•</span>
          <span className="text-white font-bold">L'Étoile Signature Burger</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-400">
          Crafting The Royal Wagyu Burger
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-normal">
          Watch artisanal ingredients stack layer by layer into a masterpiece with smooth physics & interactive 3D controls.
        </p>
      </div>

      {/* Center 3D Burger Stage */}
      <div className="relative z-10 my-auto py-4 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4">
        
        {/* Golden Aura & Plate Base */}
        <div className="relative w-full max-w-md sm:max-w-lg flex flex-col items-center justify-center">
          
          {/* Heat Steam Particles */}
          {assembledCount >= 4 && (
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-36 pointer-events-none z-20 overflow-visible flex justify-center items-end">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.5, x: (i - 2.5) * 16 }}
                  animate={{
                    opacity: [0, 0.45, 0.65, 0],
                    y: [-10, -75, -120],
                    x: [(i - 2.5) * 16, (i - 2.5) * 22 + Math.sin(i) * 18],
                    scale: [0.6, 1.3, 1.9],
                  }}
                  transition={{
                    duration: 3.2 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeOut',
                  }}
                  className="absolute bottom-0 w-8 h-8 rounded-full bg-gradient-to-t from-amber-200/20 via-zinc-400/20 to-transparent blur-md pointer-events-none"
                />
              ))}
            </div>
          )}

          {/* Interactive Rotating 3D Container with Mouse Parallax */}
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1200px) rotateY(${rotationDegree + mouseTilt.x}deg) rotateX(${(isFullyAssembled ? 10 : 6) + mouseTilt.y}deg)`,
            }}
            className="relative w-full flex flex-col items-center justify-end transition-transform duration-300 ease-out min-h-[380px] sm:min-h-[460px]"
          >
            {/* Render Layers Bottom-To-Top */}
            <div className="relative w-[280px] sm:w-[360px] flex flex-col-reverse items-center justify-end">
              {BURGER_LAYERS.map((layer, index) => {
                const isVisible = index < assembledCount;
                const explodedGap = isExploded ? index * 44 : 0;

                return (
                  <AnimatePresence key={layer.id}>
                    {isVisible && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -280 - (index * 45), // Drop smoothly from above
                          scale: 1.25,
                          rotateX: 30,
                          rotateZ: index % 2 === 0 ? -6 : 6,
                        }}
                        animate={{
                          opacity: 1,
                          y: -explodedGap,
                          scale: isExploded ? 1.04 : 1,
                          rotateX: 0,
                          rotateZ: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -80,
                          scale: 0.8,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 110,
                          damping: 17,
                          mass: 1,
                        }}
                        onMouseEnter={() => setActiveLayerIndex(index)}
                        onMouseLeave={() => setActiveLayerIndex(null)}
                        className={`w-full relative -mt-6 sm:-mt-8 first:mt-0 z-10 transition-all duration-300 cursor-pointer group ${
                          activeLayerIndex === index ? 'brightness-125 scale-[1.03]' : ''
                        }`}
                      >
                        {/* Layer Render */}
                        {layer.renderSvg()}

                        {/* Exploded View Connector Label */}
                        {isExploded && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute -left-36 sm:-left-44 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-zinc-900/90 border border-amber-500/40 px-3 py-1 rounded-lg text-amber-300 text-xs font-semibold shadow-xl backdrop-blur-md pointer-events-none"
                          >
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                            <span>{layer.name}</span>
                            <div className="w-8 h-[1px] bg-amber-500/50 absolute -right-8 top-1/2" />
                          </motion.div>
                        )}

                        {/* Interactive Hover Tooltip */}
                        {!isExploded && (
                          <div className="absolute left-1/2 -translate-x-1/2 -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-amber-500/40 text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shadow-xl pointer-events-none z-30">
                            {layer.name}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              })}
            </div>

            {/* Slate Plate Base */}
            <div className="relative w-[320px] sm:w-[420px] h-10 mt-2 rounded-[50%] bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-2 border-amber-500/30 shadow-[0_25px_50px_rgba(0,0,0,0.95)] flex items-center justify-center">
              <div className="w-[88%] h-[60%] rounded-[50%] border border-amber-500/20 bg-black/40" />

              {/* Impact Shockwave Ring on Layer Drop */}
              <AnimatePresence>
                <motion.div
                  key={impactTrigger}
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 1.25, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-[50%] border-2 border-amber-400 pointer-events-none"
                />
              </AnimatePresence>
            </div>

            {/* Reflection Shadow under Plate */}
            <div
              className="w-[300px] sm:w-[380px] h-6 rounded-[50%] bg-amber-500/15 blur-xl mt-1 transition-all duration-300"
              style={{
                opacity: 0.3 + (assembledCount / BURGER_LAYERS.length) * 0.5,
                transform: `scale(${1 + (assembledCount / BURGER_LAYERS.length) * 0.15})`,
              }}
            />
          </motion.div>

          {/* Fully Assembled Gold Crown Ring Effect */}
          {isFullyAssembled && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mt-6 flex flex-col items-center space-y-2 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/50 text-amber-300 font-bold text-xs uppercase tracking-widest shadow-xl backdrop-blur-md">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Masterpiece Fully Assembled</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                200g A5 Wagyu • Aged Cheddar • Truffle Aioli • Artisanal Brioche
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Controls Bar & Transition to Website CTA */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full space-y-5">
        
        {/* Assembly Step Indicator Card */}
        <div className="bg-zinc-900/90 border border-amber-500/20 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Progress Info */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 font-bold text-lg font-mono">
              {assembledCount}/{BURGER_LAYERS.length}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>{isFullyAssembled ? 'Assembly Complete' : `Layer ${assembledCount + 1} of ${BURGER_LAYERS.length}`}</span>
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-white">
                {isFullyAssembled
                  ? 'Royal Artisanal Wagyu Burger'
                  : currentActiveLayer.name}
              </h3>
              <p className="text-xs text-zinc-400 line-clamp-1 max-w-md">
                {isFullyAssembled
                  ? 'Rotating smoothly in 3D. Try the Explode 3D Layers button to view each ingredient!'
                  : currentActiveLayer.description}
              </p>
            </div>
          </div>

          {/* Interactive Control Buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {isFullyAssembled && (
              <button
                onClick={() => setIsExploded(!isExploded)}
                className={`px-3.5 py-2 rounded-xl border font-semibold text-xs transition-all flex items-center gap-1.5 ${
                  isExploded
                    ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-800 border-amber-500/30 text-amber-300 hover:bg-zinc-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isExploded ? 'Compact Stack' : 'Explode 3D Layers'}</span>
              </button>
            )}

            {!isFullyAssembled ? (
              <>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3.5 py-2 rounded-xl bg-zinc-800 border border-amber-500/30 text-amber-300 font-semibold text-xs hover:bg-zinc-700 transition-all flex items-center gap-1.5"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  onClick={handleAssembleAll}
                  className="px-3.5 py-2 rounded-xl bg-zinc-800 border border-amber-500/30 text-amber-300 font-semibold text-xs hover:bg-zinc-700 transition-all"
                >
                  Skip to Full
                </button>
              </>
            ) : (
              <button
                onClick={handleReplay}
                className="px-3.5 py-2 rounded-xl bg-zinc-800 border border-amber-500/30 text-amber-300 font-semibold text-xs hover:bg-zinc-700 transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Assembly</span>
              </button>
            )}

            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`p-2 rounded-xl border transition-all ${
                isRotating
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400'
              }`}
              title="Toggle 3D Rotation"
            >
              <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            </button>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden border border-amber-500/20">
          <motion.div
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(assembledCount / BURGER_LAYERS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Major CTA Button: "Move to my website original" */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
          <button
            onClick={onEnterWebsite}
            className="relative group overflow-hidden w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-extrabold text-base shadow-2xl shadow-amber-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3"
          >
            {/* Shimmer Sweep */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            <UtensilsCrossed className="w-5 h-5 text-black group-hover:rotate-12 transition-transform" />
            <span>Enter Original Website</span>
            <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
