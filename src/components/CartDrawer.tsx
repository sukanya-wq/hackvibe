import React, { useState } from 'react';
import { MenuItem, Order } from '../types';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Check, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { item: MenuItem; quantity: number; notes?: string }[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (newOrder: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced
}) => {
  const [customerName, setCustomerName] = useState('Alexander Vance');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 019-2834');
  const initialTableFromUrl = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('table') : null;
  const [tableNumber, setTableNumber] = useState(initialTableFromUrl || '01');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const safeCart = cartItems || [];
  const subtotal = safeCart.reduce((sum, ci) => sum + (ci.item?.price ?? 0) * (ci.quantity ?? 1), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (cartItems.length === 0 || !customerName) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          orderType,
          tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
          items: cartItems.map(ci => ({
            menuItemId: ci.item.id,
            name: ci.item.name,
            quantity: ci.quantity,
            price: ci.item.price,
            notes: ci.notes
          }))
        })
      });
      const data: Order = await res.json();
      onOrderPlaced(data);
      onClearCart();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl h-full flex flex-col justify-between animate-in slide-in-from-right duration-250">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
              Your Tasting Order ({cartItems.length})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 text-zinc-400 space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto text-zinc-300 dark:text-zinc-700" />
              <p className="font-serif font-bold text-base text-zinc-700 dark:text-zinc-300">Your order is empty.</p>
              <p className="text-xs">Select dishes from our digital menu to proceed.</p>
            </div>
          ) : (
            cartItems.map(ci => (
              <div
                key={ci.item.id}
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-between gap-3 text-xs"
              >
                <img src={ci.item.image} alt={ci.item.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-white truncate">
                    {ci.item.name}
                  </h4>
                  <span className="font-serif font-bold text-amber-600 dark:text-amber-400">
                    ${ci.item.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(ci.item.id, -1)}
                    className="p-1 rounded-lg bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono font-bold w-4 text-center">{ci.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(ci.item.id, 1)}
                    className="p-1 rounded-lg bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveItem(ci.item.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 ml-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Order Type & Table Number
                </label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    onClick={() => setOrderType('dine-in')}
                    className={`py-2 rounded-xl font-bold uppercase transition-all ${
                      orderType === 'dine-in'
                        ? 'bg-amber-500 text-zinc-950 shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600'
                    }`}
                  >
                    Dine-In Table
                  </button>
                  <button
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 rounded-xl font-bold uppercase transition-all ${
                      orderType === 'takeaway'
                        ? 'bg-amber-500 text-zinc-950 shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600'
                    }`}
                  >
                    Takeaway
                  </button>
                </div>

                {orderType === 'dine-in' && (
                  <input
                    type="text"
                    placeholder="Table # (e.g. 01)"
                    value={tableNumber}
                    onChange={e => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Billing & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 space-y-4 bg-zinc-50/50 dark:bg-zinc-900">
            <div className="space-y-1.5 text-xs text-zinc-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax & Service (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-serif font-bold text-lg text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span>Total</span>
                <span className="text-amber-600 dark:text-amber-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full py-4 bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-sm rounded-2xl shadow-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Dispatching Order to Kitchen...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Transmit Order to Kitchen • ${total.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
