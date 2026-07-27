import React, { useState } from 'react';
import { Order } from '../../types';
import { Receipt, DollarSign, Printer, QrCode } from 'lucide-react';

interface BillingPOSProps {
  orders: Order[];
}

export const BillingPOS: React.FC<BillingPOSProps> = ({ orders = [] }) => {
  const safeOrders = orders || [];
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(safeOrders[0] || null);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
            POS Billing & Invoice Terminal
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Generate itemized receipts, split bills, apply custom discounts, and print invoices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Order Selector */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">
            Select Active Table Ticket:
          </span>
          {safeOrders.map(o => (
            <div
              key={o.id}
              onClick={() => setSelectedOrder(o)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedOrder?.id === o.id
                  ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              <div>
                <span className="font-mono font-bold text-sm block">{o.orderNumber}</span>
                <span className="text-xs text-zinc-400">{o.customerName} • Table {o.tableNumber || 'Takeaway'}</span>
              </div>
              <span className="font-serif font-bold text-base">${(o.finalAmount ?? 0).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Invoice Preview */}
        {selectedOrder && (
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
            <div className="text-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h3 className="font-serif font-bold text-2xl text-zinc-900 dark:text-white">
                L'Étoile Modern Bistro & Kitchen
              </h3>
              <p className="text-xs text-zinc-400">742 Grand Avenue, Penthouse Level</p>
              <p className="text-xs font-mono font-bold text-amber-600 mt-1">{selectedOrder.orderNumber}</p>
            </div>

            <div className="space-y-2 text-xs">
              {(selectedOrder.items || []).map((it, idx) => (
                <div key={idx} className="flex justify-between text-zinc-800 dark:text-zinc-200">
                  <span>{it.quantity}x {it.name}</span>
                  <span className="font-mono">${((it.price ?? 0) * (it.quantity ?? 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span>${(selectedOrder.totalAmount ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Tax & Service Fee (10%)</span>
                <span>${(selectedOrder.taxAmount ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span>Total Due</span>
                <span className="text-amber-600 dark:text-amber-400">${(selectedOrder.finalAmount ?? 0).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-xs rounded-2xl flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print POS Receipt</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
