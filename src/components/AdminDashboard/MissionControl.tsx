import React, { useState } from 'react';
import {
  Order,
  OrderStatus,
  RestaurantTable,
  TableStatus,
  InventoryItem,
  StaffMember,
  CustomerRecord,
  Reservation,
  QueueTicket
} from '../../types';
import {
  LayoutDashboard,
  Utensils,
  ChefHat,
  MapPin,
  Package,
  Users,
  UserCheck,
  Receipt,
  BarChart3,
  Sparkles,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';

import { OrdersManager } from './OrdersManager';
import { KitchenCommand } from './KitchenCommand';
import { TableFloorPlan } from './TableFloorPlan';
import { InventoryManager } from './InventoryManager';
import { StaffManager } from './StaffManager';
import { CustomerCRM } from './CustomerCRM';
import { BillingPOS } from './BillingPOS';
import { AnalyticsReports } from './AnalyticsReports';
import { AIOperationsCenter } from './AIOperationsCenter';

interface MissionControlProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  tables: RestaurantTable[];
  onUpdateTableStatus: (tableId: string, status: TableStatus) => void;
  inventory: InventoryItem[];
  onRestockItem: (itemId: string, amount: number) => void;
  staff: StaffMember[];
  customers: CustomerRecord[];
  reservations: Reservation[];
  queueTickets: QueueTicket[];
}

export const MissionControl: React.FC<MissionControlProps> = ({
  orders = [],
  onUpdateOrderStatus,
  tables = [],
  onUpdateTableStatus,
  inventory = [],
  onRestockItem,
  staff = [],
  customers = [],
  reservations = [],
  queueTickets = []
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'kitchen' | 'floor' | 'inventory' | 'staff' | 'crm' | 'billing' | 'analytics' | 'ai'
  >('overview');

  const navItems = [
    { id: 'overview', label: 'Mission Control', icon: LayoutDashboard },
    { id: 'orders', label: 'Order Pipeline', icon: Utensils },
    { id: 'kitchen', label: 'Kitchen KDS', icon: ChefHat },
    { id: 'floor', label: 'Table Floor Plan', icon: MapPin },
    { id: 'inventory', label: 'Inventory POs', icon: Package },
    { id: 'staff', label: 'Staff Roster', icon: Users },
    { id: 'crm', label: 'Guest CRM', icon: UserCheck },
    { id: 'billing', label: 'POS Billing', icon: Receipt },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai', label: 'AI Intelligence', icon: Sparkles }
  ] as const;

  const safeOrders = orders || [];
  const safeTables = tables || [];
  const grossSalesToday = safeOrders.reduce((sum, o) => sum + (o?.finalAmount || 0), 0);
  const activeOrdersCount = safeOrders.filter(o => o && o.status !== 'completed' && o.status !== 'cancelled').length;
  const occupiedTables = safeTables.filter(t => t && t.status === 'occupied').length;
  const occupancyRate = safeTables.length ? Math.round((occupiedTables / safeTables.length) * 100) : 0;

  return (
    <div className="py-8 bg-zinc-100/60 dark:bg-zinc-950/80 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Operational Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                RestaurantOS Executive Operations
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-1">
              L'Étoile Modern Bistro • Admin Terminal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
              Live Systems: 100% Operational
            </span>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-amber-500 dark:text-zinc-950 shadow-md font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Render */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Top Operational KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs text-zinc-400 uppercase font-bold">Gross Sales Today</span>
                <div className="font-serif font-extrabold text-3xl text-zinc-900 dark:text-white">
                  ${grossSalesToday.toFixed(2)}
                </div>
                <span className="text-[10px] text-emerald-600 font-bold block">
                  {orders.length} total tickets generated
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs text-zinc-400 uppercase font-bold">Active Kitchen Tickets</span>
                <div className="font-serif font-extrabold text-3xl text-amber-600 dark:text-amber-400">
                  {activeOrdersCount} Tickets
                </div>
                <span className="text-[10px] text-zinc-400 block">
                  Average prep time: 14.2 min
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs text-zinc-400 uppercase font-bold">Floor Occupancy</span>
                <div className="font-serif font-extrabold text-3xl text-zinc-900 dark:text-white">
                  {occupancyRate}%
                </div>
                <span className="text-[10px] text-zinc-400 block">
                  {occupiedTables} of {tables.length} tables active
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs text-zinc-400 uppercase font-bold">Walk-In Queue</span>
                <div className="font-serif font-extrabold text-3xl text-zinc-900 dark:text-white">
                  {queueTickets.length} Parties
                </div>
                <span className="text-[10px] text-amber-600 font-bold block">
                  Est. wait: ~14 min
                </span>
              </div>
            </div>

            {/* Quick Launch Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => setActiveTab('kitchen')}
                className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-white cursor-pointer hover:scale-[1.01] transition-transform space-y-4 border border-zinc-800 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <ChefHat className="w-8 h-8 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Open KDS →
                  </span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl">Kitchen Command Center</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage active food preparation tickets, thermal station queues, and chef timers.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('floor')}
                className="p-8 rounded-3xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white cursor-pointer hover:scale-[1.01] transition-transform space-y-4 border border-zinc-200/80 dark:border-zinc-800 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <MapPin className="w-8 h-8 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    View Floor →
                  </span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl">Interactive Floor Plan</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Graphical seating map across Window Lounge, Main Bistro, Outdoor Terrace, and Private Suites.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'orders' && (
          <OrdersManager orders={orders} onUpdateStatus={onUpdateOrderStatus} />
        )}

        {activeTab === 'kitchen' && (
          <KitchenCommand orders={orders} onUpdateStatus={onUpdateOrderStatus} />
        )}

        {activeTab === 'floor' && (
          <TableFloorPlan tables={tables} onUpdateTableStatus={onUpdateTableStatus} />
        )}

        {activeTab === 'inventory' && (
          <InventoryManager inventory={inventory} onRestockItem={onRestockItem} />
        )}

        {activeTab === 'staff' && (
          <StaffManager staff={staff} />
        )}

        {activeTab === 'crm' && (
          <CustomerCRM customers={customers} />
        )}

        {activeTab === 'billing' && (
          <BillingPOS orders={orders} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsReports />
        )}

        {activeTab === 'ai' && (
          <AIOperationsCenter />
        )}

      </div>
    </div>
  );
};
