import React from 'react';
import { Order, OrderStatus } from '../../types';
import { ChefHat, Flame, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface KitchenCommandProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export const KitchenCommand: React.FC<KitchenCommandProps> = ({ orders = [], onUpdateStatus }) => {
  const activeKitchenOrders = (orders || []).filter(o => o.status !== 'completed' && o.status !== 'cancelled');

  const kitchenColumns: { status: OrderStatus; label: string; color: string }[] = [
    { status: 'pending', label: 'Incoming', color: 'bg-zinc-100 text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700' },
    { status: 'preparing', label: 'Prep Station', color: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800' },
    { status: 'cooking', label: 'Under Flame', color: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800' },
    { status: 'ready', label: 'Ready for Service', color: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800' }
  ];

  const workloadPercentage = Math.min(100, Math.round((activeKitchenOrders.length / 8) * 100));

  return (
    <div className="space-y-6">
      
      {/* Top Kitchen Telemetry Bar */}
      <div className="p-6 rounded-3xl bg-zinc-900 text-white dark:bg-zinc-800 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold">
            <ChefHat className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl">Kitchen Command KDS Pipeline</h3>
            <p className="text-xs text-zinc-400">Real-time thermal station control & chef timer dispatch</p>
          </div>
        </div>

        {/* Workload Meter */}
        <div className="w-full md:w-64 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-zinc-400">Kitchen Capacity Load</span>
            <span className={workloadPercentage > 85 ? 'text-rose-400 font-bold' : 'text-amber-400 font-bold'}>
              {workloadPercentage}%
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                workloadPercentage > 85 ? 'bg-rose-500' : 'bg-amber-500'
              }`}
              style={{ width: `${workloadPercentage}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-500 block">
            {activeKitchenOrders.length} active tickets queued across 4 chef stations.
          </span>
        </div>
      </div>

      {/* KDS Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kitchenColumns.map(col => {
          const colOrders = activeKitchenOrders.filter(o => o.status === col.status);

          return (
            <div key={col.status} className="space-y-4">
              <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${col.color}`}>
                <span className="font-serif font-bold text-sm">{col.label}</span>
                <span className="font-mono font-extrabold text-sm">{colOrders.length}</span>
              </div>

              <div className="space-y-3 min-h-[350px]">
                {colOrders.map(ord => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                      <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400">
                        {ord.orderNumber}
                      </span>
                      <span className="text-xs text-zinc-500 font-semibold">
                        Table {ord.tableNumber || 'Takeaway'}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between font-medium text-zinc-800 dark:text-zinc-200">
                          <span><span className="font-bold text-amber-600">{it.quantity}x</span> {it.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                      <span className="flex items-center gap-1 font-semibold text-emerald-600">
                        <Clock className="w-3.5 h-3.5" /> ~{ord.estimatedPrepTimeMinutes}m
                      </span>
                      <span>{ord.chefAssigned || 'Station A'}</span>
                    </div>

                    {/* Advance Stage Button */}
                    <div className="pt-1">
                      {col.status === 'pending' && (
                        <button
                          onClick={() => onUpdateStatus(ord.id, 'preparing')}
                          className="w-full py-1.5 bg-amber-500 text-zinc-950 font-bold rounded-xl text-xs hover:bg-amber-400"
                        >
                          Start Prep →
                        </button>
                      )}
                      {col.status === 'preparing' && (
                        <button
                          onClick={() => onUpdateStatus(ord.id, 'cooking')}
                          className="w-full py-1.5 bg-rose-500 text-white font-bold rounded-xl text-xs hover:bg-rose-400"
                        >
                          Fire Dish 🔥
                        </button>
                      )}
                      {col.status === 'cooking' && (
                        <button
                          onClick={() => onUpdateStatus(ord.id, 'ready')}
                          className="w-full py-1.5 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-500"
                        >
                          Mark Ready ✓
                        </button>
                      )}
                      {col.status === 'ready' && (
                        <button
                          onClick={() => onUpdateStatus(ord.id, 'served')}
                          className="w-full py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-xl text-xs"
                        >
                          Mark Served 🍽️
                        </button>
                      )}
                    </div>

                  </div>
                ))}

                {colOrders.length === 0 && (
                  <div className="p-8 text-center text-xs text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    No tickets in {col.label}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
