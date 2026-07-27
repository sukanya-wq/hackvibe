import React from 'react';
import { ShieldCheck, ChefHat, Wine, Users, Sparkles, Clock, Crown } from 'lucide-react';

export const DutyRosterTicker: React.FC = () => {
  const dutyRoster = [
    { role: 'In Charge Today (General Manager)', name: 'Elena Rostova', badge: 'Manager on Duty', icon: <Crown className="w-3.5 h-3.5 text-amber-400" /> },
    { role: 'Head Executive Chef', name: 'Chef Jean-Luc Dubois', badge: '3-Star Michelin Lead', icon: <ChefHat className="w-3.5 h-3.5 text-amber-400" /> },
    { role: 'Executive Pastry Master', name: 'Chef Akiko Tanaka', badge: 'Pâtisserie Lead', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { role: 'Master Pasta Artisan & Sous Chef', name: 'Chef Marco Rossini', badge: 'Kitchen Prep Lead', icon: <ChefHat className="w-3.5 h-3.5 text-amber-400" /> },
    { role: 'Head Sommelier & Cellar Curator', name: 'Antoine Moreau', badge: 'Cellar Master', icon: <Wine className="w-3.5 h-3.5 text-amber-400" /> },
    { role: 'Senior Floor Captain', name: 'Captain Julian Vance', badge: 'Guest Experience', icon: <Users className="w-3.5 h-3.5 text-amber-400" /> }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 border-b border-amber-500/30 overflow-hidden select-none py-2 text-xs relative z-50">
      <div className="flex items-center">
        {/* Fixed Left Tag */}
        <div className="shrink-0 bg-amber-500 text-zinc-950 px-3 py-1 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 z-10 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-950 animate-ping" />
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ON DUTY TODAY</span>
        </div>

        {/* Continuous Marquee Wrapper */}
        <div className="overflow-hidden whitespace-nowrap flex-1 relative group">
          <div className="animate-marquee flex items-center gap-8 pl-4">
            {/* Set 1 */}
            {dutyRoster.map((staff, idx) => (
              <div key={`set1-${idx}`} className="flex items-center gap-2 text-zinc-300 shrink-0">
                <span className="p-1 rounded-md bg-zinc-900 border border-amber-500/20">
                  {staff.icon}
                </span>
                <span className="font-semibold text-white">{staff.name}</span>
                <span className="text-[10px] text-zinc-400 font-medium">({staff.role})</span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
                  {staff.badge}
                </span>
                <span className="text-zinc-700 ml-4">•</span>
              </div>
            ))}

            {/* Set 2 */}
            {dutyRoster.map((staff, idx) => (
              <div key={`set2-${idx}`} className="flex items-center gap-2 text-zinc-300 shrink-0">
                <span className="p-1 rounded-md bg-zinc-900 border border-amber-500/20">
                  {staff.icon}
                </span>
                <span className="font-semibold text-white">{staff.name}</span>
                <span className="text-[10px] text-zinc-400 font-medium">({staff.role})</span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
                  {staff.badge}
                </span>
                <span className="text-zinc-700 ml-4">•</span>
              </div>
            ))}

            {/* Set 3 for seamless ultrawide looping */}
            {dutyRoster.map((staff, idx) => (
              <div key={`set3-${idx}`} className="flex items-center gap-2 text-zinc-300 shrink-0">
                <span className="p-1 rounded-md bg-zinc-900 border border-amber-500/20">
                  {staff.icon}
                </span>
                <span className="font-semibold text-white">{staff.name}</span>
                <span className="text-[10px] text-zinc-400 font-medium">({staff.role})</span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
                  {staff.badge}
                </span>
                <span className="text-zinc-700 ml-4">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
