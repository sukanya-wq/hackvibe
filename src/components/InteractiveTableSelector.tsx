import React, { useState } from 'react';
import { RestaurantTable, TableZone } from '../types';
import { MapPin, Users, Sparkles, Check, Crown, Eye, Heart } from 'lucide-react';

interface InteractiveTableSelectorProps {
  tables?: RestaurantTable[];
  selectedTableId?: string;
  onSelectTable: (table: RestaurantTable) => void;
}

const DEFAULT_VIP_TABLES: RestaurantTable[] = [
  {
    id: 't-1',
    tableNumber: 1,
    capacity: 2,
    zone: 'window',
    status: 'available'
  },
  {
    id: 't-2',
    tableNumber: 2,
    capacity: 2,
    zone: 'window',
    status: 'available'
  },
  {
    id: 't-3',
    tableNumber: 3,
    capacity: 4,
    zone: 'indoor',
    status: 'available'
  },
  {
    id: 't-4',
    tableNumber: 4,
    capacity: 6,
    zone: 'indoor',
    status: 'occupied'
  },
  {
    id: 't-5',
    tableNumber: 5,
    capacity: 4,
    zone: 'outdoor',
    status: 'available'
  },
  {
    id: 't-6',
    tableNumber: 6,
    capacity: 10,
    zone: 'private',
    status: 'available'
  }
];

export const InteractiveTableSelector: React.FC<InteractiveTableSelectorProps> = ({
  tables = DEFAULT_VIP_TABLES,
  selectedTableId,
  onSelectTable
}) => {
  const [activeZone, setActiveZone] = useState<TableZone | 'all'>('all');

  const zoneMetadata: Record<TableZone, { name: string; tag: string; badgeColor: string }> = {
    window: { name: 'Skyline Window', tag: 'Romantic City Lights', badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    indoor: { name: 'Main Bistro Hall', tag: 'Acoustic Leather Booth', badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    outdoor: { name: 'Botanical Garden', tag: 'Heated Canopy Patio', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    private: { name: 'Private VIP Suite', tag: 'Soundproof & Butler Service', badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
  };

  const filteredTables = tables.filter(t => activeZone === 'all' || t.zone === activeZone);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Crown className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              VIP Seating Blueprint
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
            Choose Your Specific Dining Table
          </h3>
          <p className="text-xs text-zinc-400">
            Select an available table location to reserve your preferred ambiance and seating view.
          </p>
        </div>

        {/* Zone Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800 text-xs font-semibold">
          <button
            onClick={() => setActiveZone('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeZone === 'all' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Tables
          </button>
          <button
            onClick={() => setActiveZone('window')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeZone === 'window' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Window
          </button>
          <button
            onClick={() => setActiveZone('indoor')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeZone === 'indoor' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Main Hall
          </button>
          <button
            onClick={() => setActiveZone('private')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeZone === 'private' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            VIP Suite
          </button>
        </div>
      </div>

      {/* Grid of Tables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTables.map(table => {
          const isSelected = selectedTableId === table.id;
          const isAvailable = table.status === 'available' || table.status === 'reserved';
          const meta = zoneMetadata[table.zone] || zoneMetadata.indoor;

          return (
            <div
              key={table.id}
              onClick={() => isAvailable && onSelectTable(table)}
              className={`p-5 rounded-2xl border transition-all ${
                !isAvailable
                  ? 'bg-zinc-900/40 border-zinc-800 opacity-50 cursor-not-allowed'
                  : isSelected
                  ? 'bg-amber-500/15 border-amber-500 shadow-lg shadow-amber-500/10 cursor-pointer scale-[1.02]'
                  : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-serif font-bold text-sm ${
                    isSelected ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-white'
                  }`}>
                    T{table.tableNumber}
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">
                      Table #{table.tableNumber}
                    </h4>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${meta.badgeColor}`}>
                      {meta.name}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <span className="p-1 rounded-full bg-amber-500 text-zinc-950">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>

              <p className="text-[11px] text-zinc-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {meta.tag}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-[10px] text-zinc-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-zinc-500" /> Up to {table.capacity} Guests
                </span>
                <span className={table.status === 'occupied' ? 'text-rose-400' : 'text-emerald-400'}>
                  {table.status === 'occupied' ? 'Currently Seated' : 'Available for Booking'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
