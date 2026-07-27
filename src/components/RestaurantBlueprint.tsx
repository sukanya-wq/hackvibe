import React, { useState } from 'react';
import { RestaurantTable, TableStatus } from '../types';
import { Users, Clock, CheckCircle2, User, Sparkles, X, MapPin, QrCode, Calendar, ShoppingBag, Eye, RefreshCw, Flame, ShieldAlert, ChevronRight } from 'lucide-react';

interface RestaurantBlueprintProps {
  tables: RestaurantTable[];
  onUpdateTableStatus?: (tableId: string, status: TableStatus) => void;
  onReserveTable?: (tableNumber: number) => void;
  onOrderForTable?: (tableNumber: number) => void;
  onOpenQRForTable?: (tableNumber: number) => void;
}

export const RestaurantBlueprint: React.FC<RestaurantBlueprintProps> = ({
  tables = [],
  onUpdateTableStatus,
  onReserveTable,
  onOrderForTable,
  onOpenQRForTable
}) => {
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [activeZoneFilter, setActiveZoneFilter] = useState<string>('all');
  const [capacityFilter, setCapacityFilter] = useState<string>('all'); // 'all', '2', '4', '6', '8+'
  const [statusFilter, setStatusFilter] = useState<string>('all'); // 'all', 'occupied', 'reserved', 'available', 'cleaning'

  const safeTables = tables || [];

  // Filter calculations
  const filteredTables = safeTables.filter(t => {
    if (activeZoneFilter !== 'all' && t.zone !== activeZoneFilter) return false;
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    if (capacityFilter === '2' && t.capacity !== 2) return false;
    if (capacityFilter === '4' && t.capacity !== 4) return false;
    if (capacityFilter === '6' && t.capacity !== 6) return false;
    if (capacityFilter === '8+' && t.capacity < 8) return false;
    return true;
  });

  // Key metrics
  const totalTables = safeTables.length;
  const occupiedCount = safeTables.filter(t => t.status === 'occupied').length;
  const reservedCount = safeTables.filter(t => t.status === 'reserved').length;
  const availableCount = safeTables.filter(t => t.status === 'available').length;
  const cleaningCount = safeTables.filter(t => t.status === 'cleaning').length;
  const occupancyPercentage = totalTables > 0 ? Math.round(((occupiedCount + reservedCount) / totalTables) * 100) : 0;

  const getStatusBadge = (status: TableStatus) => {
    switch (status) {
      case 'available':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
          dot: 'bg-emerald-500',
          label: 'Available Now',
          accentBorder: 'border-emerald-500 hover:shadow-emerald-500/20'
        };
      case 'occupied':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400',
          dot: 'bg-rose-500 animate-pulse',
          label: 'Live Filled / Dining',
          accentBorder: 'border-rose-500 hover:shadow-rose-500/20'
        };
      case 'reserved':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
          dot: 'bg-amber-500',
          label: 'Reserved Party',
          accentBorder: 'border-amber-500 hover:shadow-amber-500/20'
        };
      case 'cleaning':
        return {
          bg: 'bg-slate-500/10 border-slate-500/30 text-slate-600 dark:text-slate-400',
          dot: 'bg-slate-500',
          label: 'Turnover / Cleaning',
          accentBorder: 'border-slate-400 hover:shadow-slate-400/20'
        };
      default:
        return {
          bg: 'bg-zinc-500/10 border-zinc-500/30 text-zinc-500',
          dot: 'bg-zinc-500',
          label: 'Unknown',
          accentBorder: 'border-zinc-500'
        };
    }
  };

  // Render chair seats surrounding table blueprint
  const renderChairs = (capacity: number, status: TableStatus) => {
    const chairColor = status === 'occupied' 
      ? 'bg-rose-500/80 border-rose-400' 
      : status === 'reserved'
      ? 'bg-amber-500/80 border-amber-400'
      : status === 'available'
      ? 'bg-emerald-500/80 border-emerald-400'
      : 'bg-zinc-400 dark:bg-zinc-600 border-zinc-300';

    const numSeats = Math.min(capacity, 10);
    const seats = [];

    for (let i = 0; i < numSeats; i++) {
      seats.push(
        <div
          key={i}
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border ${chairColor} shadow-sm transform transition-transform group-hover:scale-125`}
        />
      );
    }

    return (
      <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-[120px]">
        {seats}
      </div>
    );
  };

  const zonesList = [
    { id: 'all', name: 'All Restaurant Floor Zones' },
    { id: 'window', name: '✨ Skyline Window Lounge', desc: 'Prime sunset & city view tables (2-6 guests)' },
    { id: 'indoor', name: '🍷 Main Bistro Dining Room', desc: 'Central dining hall, sommelier station & fireplace' },
    { id: 'outdoor', name: '🌿 Garden Terrace Patio', desc: 'Al fresco heated patio surrounded by flora' },
    { id: 'private', name: '👑 Royal VIP Suites', desc: 'Exclusive private chambers for large parties' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Interactive Architectural Blueprint</span>
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-zinc-900 dark:text-white tracking-tight">
          Live Restaurant Table Floor Plan
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
          Real-time spatial map of L'Étoile Modern Bistro. Tap any table to inspect live occupancy, server assignments, or instantly reserve or place an order for that specific table.
        </p>
      </div>

      {/* Real-time Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-3xl bg-zinc-900 text-white border border-amber-500/30 shadow-xl">
        <div className="p-3 border-r border-zinc-800 space-y-1">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
            Live Floor Occupancy
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-extrabold text-2xl text-amber-400">{occupancyPercentage}%</span>
            <span className="text-[10px] text-zinc-400">Filled / Booked</span>
          </div>
        </div>

        <div className="p-3 border-r border-zinc-800 space-y-1">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
            Filled / Occupied
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-extrabold text-2xl text-rose-400">{occupiedCount}</span>
            <span className="text-[10px] text-zinc-400">Tables Live</span>
          </div>
        </div>

        <div className="p-3 border-r border-zinc-800 space-y-1">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
            Reserved Parties
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-extrabold text-2xl text-amber-400">{reservedCount}</span>
            <span className="text-[10px] text-zinc-400">Upcoming</span>
          </div>
        </div>

        <div className="p-3 space-y-1">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
            Available Now
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-extrabold text-2xl text-emerald-400">{availableCount}</span>
            <span className="text-[10px] text-zinc-400">Walk-in Ready</span>
          </div>
        </div>
      </div>

      {/* Filter Control Toolbar */}
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Zone Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mr-1 uppercase tracking-wider text-[11px]">
              Zone:
            </span>
            {zonesList.map(z => (
              <button
                key={z.id}
                onClick={() => setActiveZoneFilter(z.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeZoneFilter === z.id
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {z.id === 'all' ? 'All Floor Zones' : z.id.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Capacity Filter (e.g. 2, 4, 6, 8+ guests) */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-[11px]">
              Table Capacity:
            </span>
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: 'All' },
                { id: '2', label: '2 Guests' },
                { id: '4', label: '4 Guests' },
                { id: '6', label: '6 Guests' },
                { id: '8+', label: '8+ VIP' }
              ].map(cap => (
                <button
                  key={cap.id}
                  onClick={() => setCapacityFilter(cap.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    capacityFilter === cap.id
                      ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
                  }`}
                >
                  {cap.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Status Legend Row */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-zinc-600 dark:text-zinc-300 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Green = Available Now
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" /> Red = Live Filled / Occupied
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Gold = Reserved Party
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Gray = Cleaning / Turnover
            </span>
          </div>

          <span className="text-[11px] text-zinc-400 italic">
            Showing {filteredTables.length} of {totalTables} tables
          </span>
        </div>

      </div>

      {/* ARCHITECTURAL BLUEPRINT GRID CONTAINER */}
      <div className="relative rounded-3xl bg-zinc-950 p-6 sm:p-10 border-2 border-amber-500/30 shadow-2xl overflow-hidden space-y-10">
        
        {/* Subtle Architectural Grid Lines Overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px), linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)`,
            backgroundSize: `24px 24px, 48px 48px, 48px 48px`
          }}
        />

        {/* Compass & Blueprint Header Info */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 relative z-10 text-amber-400/80 font-mono text-[10px]">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
              ARCHITECTURAL BLUEPRINT REV 2026.7
            </span>
            <span>SCALE 1:50 METRIC</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-500">
            <span>NORTH ↑ SKYLINE WINDOW</span>
            <span>SOUTH ↓ MAIN ENTRANCE</span>
          </div>
        </div>

        {/* ZONES SECTIONS */}
        <div className="space-y-12 relative z-10">
          {zonesList.filter(z => z.id !== 'all').map(zone => {
            if (activeZoneFilter !== 'all' && activeZoneFilter !== zone.id) return null;

            const zoneTables = filteredTables.filter(t => t.zone === zone.id);

            return (
              <div key={zone.id} className="space-y-4">
                
                {/* Zone Architectural Title Marker */}
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                    <h3 className="font-serif font-bold text-lg text-amber-100 tracking-wide">
                      {zone.name}
                    </h3>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">
                    {zoneTables.length} {zoneTables.length === 1 ? 'Table' : 'Tables'}
                  </span>
                </div>

                {zoneTables.length === 0 ? (
                  <div className="p-8 text-center text-zinc-500 text-xs italic bg-zinc-900/40 rounded-2xl border border-zinc-800">
                    No tables match the selected filters in this zone.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {zoneTables.map(tbl => {
                      const badgeInfo = getStatusBadge(tbl.status);

                      return (
                        <div
                          key={tbl.id}
                          onClick={() => setSelectedTable(tbl)}
                          className={`group relative bg-zinc-900/90 rounded-2xl p-5 border-2 ${badgeInfo.accentBorder} shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between h-52 overflow-hidden`}
                        >
                          {/* Corner Blueprint Accent */}
                          <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/10 border-b border-l border-amber-500/30 rounded-bl-xl pointer-events-none" />

                          {/* Top Row: Table Number & Capacity */}
                          <div className="flex items-center justify-between z-10">
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-extrabold text-2xl text-white">
                                T#{tbl.tableNumber < 10 ? `0${tbl.tableNumber}` : tbl.tableNumber}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${badgeInfo.bg}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${badgeInfo.dot}`} />
                                <span>{badgeInfo.label}</span>
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">
                                {tbl.capacity} Seats
                              </span>
                            </div>
                          </div>

                          {/* Center: Visual Table & Seating Diagram */}
                          <div className="my-2 py-3 bg-zinc-950/80 rounded-xl border border-zinc-800/80 flex flex-col items-center justify-center space-y-2 z-10">
                            {/* Table Top Surface Graphic */}
                            <div className="w-20 h-8 rounded-lg bg-gradient-to-r from-amber-600/30 via-amber-500/20 to-amber-600/30 border border-amber-500/40 flex items-center justify-center shadow-inner">
                              <span className="text-[10px] font-mono font-bold text-amber-300">
                                {tbl.capacity}P
                              </span>
                            </div>

                            {/* Surrounding Chairs */}
                            {renderChairs(tbl.capacity, tbl.status)}
                          </div>

                          {/* Bottom Row: Occupant / Server Info */}
                          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs z-10">
                            <div className="truncate pr-2">
                              {tbl.status === 'occupied' ? (
                                <div>
                                  <span className="text-white font-bold block truncate text-[11px]">
                                    {tbl.currentGuestName || 'Diner Seated'}
                                  </span>
                                  <span className="text-[9px] text-rose-400 font-mono">
                                    {tbl.currentOrderId ? `Order: ${tbl.currentOrderId}` : 'Dining in progress'}
                                  </span>
                                </div>
                              ) : tbl.status === 'reserved' ? (
                                <div>
                                  <span className="text-amber-300 font-bold block truncate text-[11px]">
                                    {tbl.currentGuestName || 'VIP Reservation'}
                                  </span>
                                  <span className="text-[9px] text-zinc-400 font-mono">Reserved</span>
                                </div>
                              ) : (
                                <div>
                                  <span className="text-emerald-400 font-semibold block text-[11px]">
                                    Ready for Walk-in
                                  </span>
                                  <span className="text-[9px] text-zinc-500 font-mono">
                                    Server: {tbl.serverAssigned || 'Floor Staff'}
                                  </span>
                                </div>
                              )}
                            </div>

                            <button className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors shrink-0">
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Blueprint Footer Landmarks */}
        <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 gap-4">
          <div className="flex items-center gap-4">
            <span>🔥 KITCHEN PASS & SOMMELIER BAR</span>
            <span>•</span>
            <span>🍷 GRAND WINE CELLAR ARCHIVE</span>
          </div>
          <div>
            <span>L'ÉTOILE LIVE TABLE FLOOR PLAN</span>
          </div>
        </div>

      </div>

      {/* TABLE DETAIL & ACTION MODAL */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-zinc-900 dark:text-zinc-100 space-y-6 relative animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setSelectedTable(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                <MapPin className="w-3 h-3" /> Zone: {selectedTable.zone.toUpperCase()}
              </div>
              <h3 className="font-serif font-bold text-3xl text-zinc-900 dark:text-white">
                Table #{selectedTable.tableNumber < 10 ? `0${selectedTable.tableNumber}` : selectedTable.tableNumber}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Capacity: <strong className="text-zinc-900 dark:text-white">{selectedTable.capacity} Guests</strong>
              </p>
            </div>

            {/* Status Card */}
            <div className={`p-4 rounded-2xl border space-y-2 ${getStatusBadge(selectedTable.status).bg}`}>
              <div className="flex items-center justify-between font-bold text-sm">
                <span className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${getStatusBadge(selectedTable.status).dot}`} />
                  <span>Status: {getStatusBadge(selectedTable.status).label}</span>
                </span>
                <span className="uppercase text-xs font-mono">{selectedTable.status}</span>
              </div>

              <div className="text-xs text-zinc-700 dark:text-zinc-300 pt-2 border-t border-current/10 space-y-1">
                <p>Current Occupant: <strong className="text-zinc-900 dark:text-white">{selectedTable.currentGuestName || 'None'}</strong></p>
                <p>Assigned Server: <strong className="text-zinc-900 dark:text-white">{selectedTable.serverAssigned || 'Elena Rostova'}</strong></p>
                {selectedTable.currentOrderId && (
                  <p>Live Order Code: <strong className="font-mono text-amber-600 dark:text-amber-400">{selectedTable.currentOrderId}</strong></p>
                )}
              </div>
            </div>

            {/* Guest Action Options */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Quick Actions for Table #{selectedTable.tableNumber}:
              </label>

              <div className="grid grid-cols-1 gap-2.5">
                {selectedTable.status === 'available' && (
                  <button
                    onClick={() => {
                      if (onReserveTable) onReserveTable(selectedTable.tableNumber);
                      setSelectedTable(null);
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve Table #{selectedTable.tableNumber} Now</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    if (onOrderForTable) onOrderForTable(selectedTable.tableNumber);
                    setSelectedTable(null);
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Menu Directly to Table #{selectedTable.tableNumber}</span>
                </button>

                <button
                  onClick={() => {
                    if (onOpenQRForTable) onOpenQRForTable(selectedTable.tableNumber);
                    setSelectedTable(null);
                  }}
                  className="w-full py-2.5 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View Printable QR Code</span>
                </button>
              </div>
            </div>

            {/* Staff Status Override controls if callback available */}
            {onUpdateTableStatus && (
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Staff Override Floor Status:
                </span>
                <div className="grid grid-cols-4 gap-1.5 text-[10px]">
                  {(['available', 'occupied', 'reserved', 'cleaning'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        onUpdateTableStatus(selectedTable.id, st);
                        setSelectedTable({ ...selectedTable, status: st });
                      }}
                      className={`py-1.5 rounded-xl font-bold uppercase transition-all ${
                        selectedTable.status === st
                          ? 'bg-amber-500 text-zinc-950'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
