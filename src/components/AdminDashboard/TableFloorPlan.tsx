import React, { useState } from 'react';
import { RestaurantTable, TableStatus } from '../../types';
import { Users, Clock, CheckCircle2, User, Sparkles, X } from 'lucide-react';

interface TableFloorPlanProps {
  tables: RestaurantTable[];
  onUpdateTableStatus: (tableId: string, status: TableStatus) => void;
}

export const TableFloorPlan: React.FC<TableFloorPlanProps> = ({ tables = [], onUpdateTableStatus }) => {
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);

  const safeTables = tables || [];

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20';
      case 'occupied':
        return 'bg-rose-500 text-white border-rose-400 shadow-rose-500/20';
      case 'reserved':
        return 'bg-amber-500 text-white border-amber-400 shadow-amber-500/20';
      case 'cleaning':
        return 'bg-slate-500 text-white border-slate-400 shadow-slate-500/20';
      default:
        return 'bg-zinc-500 text-white';
    }
  };

  const zones = ['window', 'indoor', 'outdoor', 'private'] as const;

  return (
    <div className="space-y-6">
      
      {/* Legend & Stats */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Available ({safeTables.filter(t => t.status === 'available').length})</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500" /> Occupied ({safeTables.filter(t => t.status === 'occupied').length})</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" /> Reserved ({safeTables.filter(t => t.status === 'reserved').length})</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-500" /> Cleaning ({safeTables.filter(t => t.status === 'cleaning').length})</span>
        </div>
        <span className="text-xs text-zinc-500 font-medium">Click any table to view occupant details or update floor status.</span>
      </div>

      {/* Graphical Floor Layout Grid */}
      <div className="bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 space-y-8">
        {zones.map(zoneName => {
          const zoneTables = safeTables.filter(t => t.zone === zoneName);

          return (
            <div key={zoneName} className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800 pb-2">
                <h4 className="font-serif font-bold text-base text-zinc-900 dark:text-white uppercase tracking-wider">
                  {zoneName === 'window' ? '✨ Window Skyline Lounge' : zoneName === 'indoor' ? '🍷 Main Bistro Dining' : zoneName === 'outdoor' ? '🌿 Garden Terrace Patio' : '👑 Private Dining Suite'}
                </h4>
                <span className="text-xs text-zinc-400">{zoneTables.length} Tables</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {zoneTables.map(tbl => (
                  <div
                    key={tbl.id}
                    onClick={() => setSelectedTable(tbl)}
                    className={`p-5 rounded-2xl border-2 shadow-md hover:scale-105 transition-all cursor-pointer flex flex-col justify-between h-36 ${getStatusColor(tbl.status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-extrabold text-xl">
                        T#{tbl.tableNumber}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-black/20 backdrop-blur-sm">
                        {tbl.capacity} Seats
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-bold capitalize block truncate">
                        {tbl.status}
                      </span>
                      {tbl.currentGuestName && (
                        <span className="text-[10px] opacity-90 truncate block">
                          {tbl.currentGuestName}
                        </span>
                      )}
                      <span className="text-[10px] opacity-75 block mt-0.5">
                        {tbl.serverAssigned || 'Staff Unassigned'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Detail & Status Modal */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">
                  Zone: {selectedTable.zone}
                </span>
                <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
                  Table #{selectedTable.tableNumber} ({selectedTable.capacity} Guests)
                </h3>
              </div>
              <button onClick={() => setSelectedTable(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1">
                <p className="text-zinc-500">Current Guest: <span className="font-bold text-zinc-900 dark:text-white">{selectedTable.currentGuestName || 'None'}</span></p>
                <p className="text-zinc-500">Assigned Server: <span className="font-bold text-zinc-900 dark:text-white">{selectedTable.serverAssigned || 'Unassigned'}</span></p>
                <p className="text-zinc-500">Current Order: <span className="font-mono font-bold text-amber-600">{selectedTable.currentOrderId || 'N/A'}</span></p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider block">
                Change Floor Status:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['available', 'occupied', 'reserved', 'cleaning'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => {
                      onUpdateTableStatus(selectedTable.id, st);
                      setSelectedTable({ ...selectedTable, status: st });
                    }}
                    className={`py-2 rounded-xl font-bold uppercase transition-all ${
                      selectedTable.status === st
                        ? 'bg-amber-500 text-zinc-950 shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedTable(null)}
              className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-xs"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
