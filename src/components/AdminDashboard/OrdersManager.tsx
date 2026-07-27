import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';
import { Search, Filter, Clock, Flame, CheckCircle2, ChevronRight, Receipt } from 'lucide-react';

interface OrdersManagerProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrdersManager: React.FC<OrdersManagerProps> = ({ orders = [], onUpdateStatus }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const statuses: OrderStatus[] = ['pending', 'preparing', 'cooking', 'ready', 'served', 'completed'];

  const filteredOrders = (orders || []).filter(o => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch =
      (o.orderNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.customerName || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search order #, guest name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${
              filterStatus === 'all'
                ? 'bg-zinc-900 text-white dark:bg-amber-500 dark:text-zinc-950'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            All ({orders.length})
          </button>
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-zinc-900 text-white dark:bg-amber-500 dark:text-zinc-950'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map(ord => (
          <div
            key={ord.id}
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div>
                  <span className="font-mono font-bold text-base text-amber-600 dark:text-amber-400">
                    {ord.orderNumber}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-semibold">
                    {ord.customerName} {ord.tableNumber ? `• Table ${ord.tableNumber}` : ''}
                  </span>
                </div>
                <span className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
                  ${(ord.finalAmount ?? 0).toFixed(2)}
                </span>
              </div>

              {/* Items */}
              <div className="py-3 space-y-1.5 text-xs border-b border-zinc-100 dark:border-zinc-800">
                {(ord.items || []).map((it, idx) => (
                  <div key={idx} className="flex justify-between text-zinc-700 dark:text-zinc-300">
                    <span><span className="font-bold text-amber-600">{it.quantity}x</span> {it.name}</span>
                    <span className="font-mono">${((it.price ?? 0) * (it.quantity ?? 1)).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Status Selector */}
            <div className="space-y-2 pt-1">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Update Order Pipeline Status:
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                {(['preparing', 'cooking', 'ready', 'served', 'completed', 'cancelled'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => onUpdateStatus(ord.id, st)}
                    className={`py-1.5 rounded-lg font-bold uppercase transition-all ${
                      ord.status === st
                        ? 'bg-amber-500 text-zinc-950 shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
