import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { Clock, CheckCircle2, Flame, Utensils, Sparkles, ChefHat, Receipt, QrCode } from 'lucide-react';

interface OrderTrackerProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ orders = [], onUpdateStatus }) => {
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);
  const safeOrders = orders || [];

  const statusSteps: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
    { status: 'pending', label: 'Received', icon: <Clock className="w-4 h-4" /> },
    { status: 'preparing', label: 'Prep Station', icon: <Utensils className="w-4 h-4" /> },
    { status: 'cooking', label: 'Under Flame', icon: <Flame className="w-4 h-4" /> },
    { status: 'ready', label: 'Ready to Pass', icon: <ChefHat className="w-4 h-4" /> },
    { status: 'served', label: 'At Table', icon: <CheckCircle2 className="w-4 h-4" /> }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 0;
      case 'preparing': return 1;
      case 'cooking': return 2;
      case 'ready': return 3;
      case 'served': case 'completed': return 4;
      default: return 0;
    }
  };

  return (
    <section className="py-16 bg-zinc-50/50 dark:bg-zinc-950/50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Real-Time Kitchen Telemetry
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Order Status & Preparation Progress
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Track your order live from kitchen prep to table service.
          </p>
        </div>

        <div className="space-y-6">
          {safeOrders.map(order => {
            const currentStepIdx = getStepIndex(order.status);

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm p-6 sm:p-8 space-y-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-xl text-amber-600 dark:text-amber-400">
                        {order.orderNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">
                        {order.orderType} {order.tableNumber ? `• Table ${order.tableNumber}` : ''}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Guest: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{order.customerName}</span> • Assigned Chef: {order.chefAssigned || 'Head Chef Jean-Luc'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedReceiptOrder(order)}
                      className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                    >
                      <Receipt className="w-4 h-4" />
                      <span>View Receipt</span>
                    </button>
                    <span className="font-serif font-extrabold text-xl text-zinc-900 dark:text-white">
                      ${(order.finalAmount ?? 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
                    <span>Preparation Stage</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      Estimated Delivery: ~{order.estimatedPrepTimeMinutes} minutes
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {statusSteps.map((step, idx) => {
                      const isCompleted = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div key={step.status} className="text-center space-y-1.5">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              isCompleted
                                ? 'bg-amber-500'
                                : 'bg-zinc-100 dark:bg-zinc-800'
                            }`}
                          />
                          <div className={`text-[11px] font-semibold flex items-center justify-center gap-1 ${
                            isCurrent
                              ? 'text-amber-600 dark:text-amber-400 font-bold'
                              : isCompleted
                              ? 'text-zinc-800 dark:text-zinc-200'
                              : 'text-zinc-400'
                          }`}>
                            <span className="hidden sm:inline">{step.icon}</span>
                            <span>{step.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items Breakdown */}
                <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl space-y-2 text-xs">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                    Ordered Dishes
                  </span>
                  <div className="divide-y divide-zinc-200/60 dark:divide-zinc-700/60">
                    {(order.items || []).map((item, i) => (
                      <div key={i} className="py-2 flex items-center justify-between text-zinc-800 dark:text-zinc-200">
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-mono text-amber-600">{item.quantity}x</span>
                          <span className="font-semibold">{item.name}</span>
                          {item.notes && <span className="text-[10px] text-zinc-400">({item.notes})</span>}
                        </div>
                        <span className="font-mono">${((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Digital Receipt Modal */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="text-center border-b border-zinc-200 dark:border-zinc-800 pb-4 space-y-1">
              <span className="font-serif font-bold text-xl text-zinc-900 dark:text-white block">
                L'Étoile Modern Bistro
              </span>
              <p className="text-[11px] text-zinc-400">742 Grand Avenue • Penthouse Level</p>
              <p className="text-xs font-mono font-bold text-amber-600">{selectedReceiptOrder.orderNumber}</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Guest Name:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{selectedReceiptOrder.customerName}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Date:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{new Date(selectedReceiptOrder.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
              {(selectedReceiptOrder.items || []).map((it, idx) => (
                <div key={idx} className="py-2 flex justify-between text-zinc-800 dark:text-zinc-200">
                  <span>{it.quantity}x {it.name}</span>
                  <span className="font-mono">${((it.price ?? 0) * (it.quantity ?? 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span>${(selectedReceiptOrder.totalAmount ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Tax & Service (10%)</span>
                <span>${(selectedReceiptOrder.taxAmount ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-zinc-900 dark:text-white pt-1 border-t border-zinc-100 dark:border-zinc-800">
                <span>Total Amount Paid</span>
                <span className="text-amber-600 dark:text-amber-400">${(selectedReceiptOrder.finalAmount ?? 0).toFixed(2)}</span>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setSelectedReceiptOrder(null)}
                className="w-full py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold text-xs"
              >
                Close Receipt
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
