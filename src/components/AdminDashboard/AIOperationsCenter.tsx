import React, { useState } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, RefreshCw, ChevronRight } from 'lucide-react';
import { AIBusinessInsight } from '../../types';

export const AIOperationsCenter: React.FC = () => {
  const [insights, setInsights] = useState<AIBusinessInsight[]>([
    {
      id: 'ins-1',
      type: 'revenue',
      title: 'Dynamic Wine Pairing Surge Opportunity',
      description: 'Friday dinner reservations for Window Lounge are 95% full. Increase 2018 Chateau Margaux by $12 per bottle to boost margin by $480 without affecting conversion.',
      actionRecommendation: 'Apply $12 surge adjustment to vintage wine cellar menu.',
      confidenceScore: 94,
      priority: 'high',
      timestamp: new Date().toISOString()
    },
    {
      id: 'ins-2',
      type: 'inventory',
      title: 'Predictive Stockout Warning: Truffle Tagliolini',
      description: 'Based on current ordering velocity (4.2 dishes/hr), Fresh Black Truffle stock will deplete by 20:45 tonight. Restock PO recommended now.',
      actionRecommendation: 'Auto-send restock PO to Umbria Truffle Imports for morning delivery.',
      confidenceScore: 98,
      priority: 'high',
      timestamp: new Date().toISOString()
    },
    {
      id: 'ins-3',
      type: 'demand',
      title: 'Underperforming Dessert Substitution',
      description: 'Seasonal Berry Pavlova orders down 22% this week. Replace with Warm Pistachio Fondant to boost dessert attachment rate by 18%.',
      actionRecommendation: 'Swap Pavlova for Pistachio Fondant in dinner tasting carousel.',
      confidenceScore: 89,
      priority: 'medium',
      timestamp: new Date().toISOString()
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshInsights = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/insights', { method: 'POST' });
      const data = await res.json();
      if (data.insights && data.insights.length > 0) {
        setInsights(data.insights);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-amber-950 text-white border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Gemini AI Business Operations Center
            </span>
          </div>
          <h3 className="font-serif font-bold text-2xl">
            Autonomous Restaurant Intelligence
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Continuous deep learning model analyzing live POS sales, kitchen prep latency, inventory levels, and reservation velocity.
          </p>
        </div>

        <button
          onClick={handleRefreshInsights}
          disabled={isLoading}
          className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-2xl shadow-xl transition-all flex items-center gap-2 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Analyzing Operations...' : 'Run Real-Time AI Diagnostic'}</span>
        </button>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map(ins => (
          <div
            key={ins.id}
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                  {ins.type} Strategy
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">
                  {ins.confidenceScore}% AI Confidence
                </span>
              </div>

              <h4 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
                {ins.title}
              </h4>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {ins.description}
              </p>

              <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/40 text-[11px] text-amber-900 dark:text-amber-200">
                <span className="font-bold block">Recommendation:</span>
                <span>{ins.actionRecommendation}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[10px]">
                Priority: {ins.priority}
              </span>
              <button className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center hover:underline">
                Execute Action <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
