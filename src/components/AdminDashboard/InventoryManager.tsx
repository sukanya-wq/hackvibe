import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import { Package, AlertTriangle, Plus, RefreshCw, CheckCircle2 } from 'lucide-react';

interface InventoryManagerProps {
  inventory: InventoryItem[];
  onRestockItem: (itemId: string, amount: number) => void;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({ inventory = [], onRestockItem }) => {
  const [restockedIds, setRestockedIds] = useState<string[]>([]);
  const safeInventory = inventory || [];

  const handleRestock = (id: string) => {
    onRestockItem(id, 5.0);
    setRestockedIds(prev => [...prev, id]);
    setTimeout(() => {
      setRestockedIds(prev => prev.filter(i => i !== id));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
            Ingredient & Supply Inventory
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Real-time stock monitoring with AI automated stockout predictions & supplier restock POs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 font-bold border border-amber-300">
            {safeInventory.filter(i => i.status !== 'optimal').length} Low Stock Alerts
          </span>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-4">Ingredient Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Supplier</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200">
              {inventory.map(item => {
                const isRestocked = restockedIds.includes(item.id);

                return (
                  <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-4 font-serif font-bold text-sm text-zinc-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="p-4 uppercase text-[10px] font-bold text-zinc-500">
                      {item.category}
                    </td>
                    <td className="p-4 font-mono font-bold">
                      {item.currentStock} {item.unit} <span className="text-[10px] text-zinc-400 font-normal">(Min: {item.minThreshold})</span>
                    </td>
                    <td className="p-4 text-zinc-500">
                      {item.supplier}
                    </td>
                    <td className="p-4 text-zinc-500">
                      {item.expiryDate}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        item.status === 'optimal'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                          : item.status === 'low'
                          ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleRestock(item.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          isRestocked
                            ? 'bg-emerald-600 text-white'
                            : 'bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 hover:opacity-90'
                        }`}
                      >
                        {isRestocked ? 'Restocked +5' : 'Restock +5'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
