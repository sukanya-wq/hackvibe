import React from 'react';
import { CustomerRecord } from '../../types';
import { User, Award, Heart, DollarSign } from 'lucide-react';

interface CustomerCRMProps {
  customers: CustomerRecord[];
}

export const CustomerCRM: React.FC<CustomerCRMProps> = ({ customers = [] }) => {
  const safeCustomers = customers || [];
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
            Guest CRM & VIP Profiles
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Track lifetime spend, visit frequency, dietary preferences, and custom sommelier notes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safeCustomers.map(c => (
          <div
            key={c.id}
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h4 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
                  {c.name}
                </h4>
                <p className="text-xs text-zinc-400">{c.email} • {c.phone}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                {c.loyaltyTier} VIP
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase block">Visits</span>
                <span className="font-bold text-zinc-900 dark:text-white">{c.totalVisits}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase block">Lifetime Spend</span>
                <span className="font-bold text-amber-600">${c.totalSpent}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase block">Loyalty Pts</span>
                <span className="font-bold text-zinc-900 dark:text-white">{c.loyaltyPoints}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 italic bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200/40">
              Note: "{c.notes}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
