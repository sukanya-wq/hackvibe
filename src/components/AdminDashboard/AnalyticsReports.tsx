import React from 'react';
import { TrendingUp, DollarSign, Users, ShoppingBag, Award, ArrowUpRight } from 'lucide-react';

export const AnalyticsReports: React.FC = () => {
  const hourlyData = [
    { time: '12:00', revenue: 620 },
    { time: '13:00', revenue: 940 },
    { time: '14:00', revenue: 510 },
    { time: '18:00', revenue: 1420 },
    { time: '19:00', revenue: 2180 },
    { time: '20:00', revenue: 2640 },
    { time: '21:00', revenue: 1890 }
  ];

  const maxRev = Math.max(...hourlyData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
          <span className="text-xs text-zinc-400 uppercase font-bold">Total Daily Gross</span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-extrabold text-3xl text-zinc-900 dark:text-white">$8,420.00</span>
            <span className="text-xs font-bold text-emerald-500 flex items-center">+18.4% <ArrowUpRight className="w-3.5 h-3.5" /></span>
          </div>
          <span className="text-[10px] text-zinc-400 block">Vs. previous Sunday average</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
          <span className="text-xs text-zinc-400 uppercase font-bold">Average Cover Check</span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-extrabold text-3xl text-zinc-900 dark:text-white">$131.50</span>
            <span className="text-xs font-bold text-emerald-500 flex items-center">+6.2% <ArrowUpRight className="w-3.5 h-3.5" /></span>
          </div>
          <span className="text-[10px] text-zinc-400 block">Driven by Wagyu & Truffle specials</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
          <span className="text-xs text-zinc-400 uppercase font-bold">Table Turn Speed</span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-extrabold text-3xl text-zinc-900 dark:text-white">58 min</span>
            <span className="text-xs font-bold text-amber-500 flex items-center">-4 min</span>
          </div>
          <span className="text-[10px] text-zinc-400 block">Optimized kitchen pipeline</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
          <span className="text-xs text-zinc-400 uppercase font-bold">VIP Repeat Rate</span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-extrabold text-3xl text-zinc-900 dark:text-white">42%</span>
            <span className="text-xs font-bold text-emerald-500 flex items-center">+5.1% <ArrowUpRight className="w-3.5 h-3.5" /></span>
          </div>
          <span className="text-[10px] text-zinc-400 block">Gold Gourmet members</span>
        </div>
      </div>

      {/* Hourly Revenue Graph */}
      <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
              Hourly Revenue Distribution
            </h3>
            <p className="text-xs text-zinc-400">Peak dining cover curve</p>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            Peak Hour: 20:00 ($2,640)
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-48 flex items-end justify-between gap-4 pt-6 border-b border-zinc-100 dark:border-zinc-800">
          {hourlyData.map((d, i) => {
            const heightPercent = Math.round((d.revenue / maxRev) * 100);

            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-mono font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  ${d.revenue}
                </span>
                <div
                  className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-xl group-hover:brightness-110 transition-all duration-300"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] font-semibold text-zinc-500">{d.time}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
