import React, { useState } from 'react';
import { QrCode, X, Share2, Copy, Check, Printer, Grid, Layers, MapPin, Users, Sparkles, ExternalLink, RefreshCw, CreditCard, DollarSign, Receipt, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { INITIAL_TABLES } from '../data/mockData';

interface QRCodeModalProps {
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedTableNum, setSelectedTableNum] = useState<number>(4);
  const [customTableInput, setCustomTableInput] = useState<string>('');
  const [viewMode, setViewMode] = useState<'single' | 'all' | 'pay'>('pay');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [isPaidSuccess, setIsPaidSuccess] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'qr_upi' | 'card' | 'apple_pay'>('qr_upi');

  const tables = INITIAL_TABLES;

  const currentTable = tables.find(t => t.tableNumber === selectedTableNum) || {
    id: `t-custom-${selectedTableNum}`,
    tableNumber: selectedTableNum,
    capacity: 4,
    zone: 'indoor' as const,
    status: 'available' as const,
    serverAssigned: 'Floor Staff'
  };

  // Mock itemized active bill for the table
  const mockTableBill = [
    { name: 'Wagyu Beef Carpaccio', qty: 2, price: 28.00 },
    { name: 'Truffle Tagliatelle Flambé', qty: 1, price: 38.00 },
    { name: 'Château Margaux Vintage 2015', qty: 1, price: 145.00 },
    { name: 'Artisanal Sourdough & Smoked Butter', qty: 1, price: 12.00 }
  ];

  const subtotal = mockTableBill.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = subtotal * 0.08875;
  const tip = subtotal * (tipPercentage / 100);
  const grandTotal = subtotal + tax + tip;

  const getTableUrl = (tblNum: number) => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?table=${tblNum < 10 ? '0' + tblNum : tblNum}`;
  };

  const currentUrl = getTableUrl(selectedTableNum);

  const handleCopyLink = (urlToCopy: string) => {
    navigator.clipboard.writeText(urlToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCustomTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(customTableInput, 10);
    if (!isNaN(num) && num > 0) {
      setSelectedTableNum(num);
      setCustomTableInput('');
      setIsPaidSuccess(false);
    }
  };

  const handleSimulatePayment = () => {
    setIsPaidSuccess(true);
  };

  const filteredTables = zoneFilter === 'all' 
    ? tables 
    : tables.filter(t => t.zone === zoneFilter);

  // Dynamic SVG QR Pattern Generator based on Table Number
  const renderQRCodeSVG = (tableNum: number, size = 180) => {
    const seed = tableNum * 17 + 42;
    const modules: { x: number; y: number }[] = [];
    
    for (let r = 0; r < 15; r++) {
      for (let c = 0; c < 15; c++) {
        const inTopLeft = r < 5 && c < 5;
        const inTopRight = r < 5 && c > 9;
        const inBottomLeft = r > 9 && c < 5;
        const inCenter = r >= 6 && r <= 8 && c >= 6 && c <= 8;

        if (!inTopLeft && !inTopRight && !inBottomLeft && !inCenter) {
          const pseudoHash = (r * 31 + c * 13 + seed) % 10;
          if (pseudoHash > 3) {
            modules.push({ x: c * 6 + 5, y: r * 6 + 5 });
          }
        }
      }
    }

    return (
      <svg viewBox="0 0 100 100" width={size} height={size} className="text-zinc-900 fill-current">
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1.5" rx="4" />
        <path d="M4,4 h28 v28 h-28 z M8,8 v20 h20 v-20 z M12,12 h12 v12 h-12 z" />
        <path d="M68,4 h28 v28 h-28 z M72,8 v20 h20 v-20 z M76,12 h12 v12 h-12 z" />
        <path d="M4,68 h28 v28 h-28 z M8,72 v20 h20 v-20 z M12,76 h12 v12 h-12 z" />

        {modules.map((m, i) => (
          <rect key={i} x={m.x} y={m.y} width="5" height="5" rx="0.8" />
        ))}

        <rect x="38" y="38" width="24" height="24" rx="4" fill="white" stroke="currentColor" strokeWidth="1" />
        <text x="50" y="53" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#d97706" fontFamily="sans-serif">
          #{tableNum < 10 ? `0${tableNum}` : tableNum}
        </text>
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto font-sans">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 text-zinc-900 dark:text-zinc-100 space-y-6 my-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 print:p-0 print:border-none print:shadow-none print:max-w-none print:bg-white print:text-black">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white flex items-center gap-2">
                <span>Table QR & Digital Pay Hub</span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Silver Tier Billing Compliant
                </span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Generate table stand QR cards and let guests finalize & pay their bill instantly via QR code
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Toggle Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 print:hidden">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => { setViewMode('pay'); setIsPaidSuccess(false); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'pay'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>Guest Pay via QR (Digital Billing)</span>
            </button>

            <button
              onClick={() => setViewMode('single')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'single'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Single Table Focus</span>
            </button>

            <button
              onClick={() => setViewMode('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>View All 12 Tables Grid</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Table QR Cards</span>
            </button>
          </div>
        </div>

        {/* PAY VIA QR MODE (DIGITAL BILLING) */}
        {viewMode === 'pay' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Table Selection & Itemized Bill */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block uppercase tracking-wider">
                  Select Active Table for Bill Settlement
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                    <button
                      key={num}
                      onClick={() => { setSelectedTableNum(num); setIsPaidSuccess(false); }}
                      className={`py-2 px-1 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        selectedTableNum === num
                          ? 'border-amber-500 bg-amber-500 text-zinc-950 shadow-md scale-105'
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-500/50'
                      }`}
                    >
                      #{num < 10 ? `0${num}` : num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Itemized Bill Card */}
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-3">
                  <div>
                    <h4 className="font-serif font-bold text-base text-zinc-900 dark:text-white">
                      Table #{selectedTableNum < 10 ? `0${selectedTableNum}` : selectedTableNum} • Digital Order Bill
                    </h4>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      Server: {currentTable.serverAssigned || 'Elena Rostova'} • Order ID: #LET-8924
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase">
                    Active Unpaid Bill
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2.5 text-xs">
                  {mockTableBill.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-600 dark:text-amber-400">{item.qty}x</span>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-mono font-semibold">${(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Tip Selector */}
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    <span>Add Gratuity / Tip</span>
                    <span className="text-amber-600 dark:text-amber-400">${tip.toFixed(2)}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 15, 18, 20].map(pct => (
                      <button
                        key={pct}
                        onClick={() => setTipPercentage(pct)}
                        className={`py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          tipPercentage === pct
                            ? 'bg-amber-500 text-zinc-950 border-amber-400'
                            : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Breakdown Math */}
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                    <span>Tax (8.875%)</span>
                    <span className="font-mono">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                    <span>Gratuity ({tipPercentage}%)</span>
                    <span className="font-mono">${tip.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <span>Grand Total</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400 text-base">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Live QR Code & Settlement Action */}
            <div className="lg:col-span-6 space-y-5">
              
              {!isPaidSuccess ? (
                <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 text-white p-7 rounded-3xl border border-amber-500/40 shadow-2xl text-center space-y-5 relative overflow-hidden">
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1">
                      <Smartphone className="w-3.5 h-3.5" /> Direct QR Settlement
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-amber-100">
                      Scan QR to Pay Total: ${grandTotal.toFixed(2)}
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Supports Apple Pay, Google Pay, Visa/MasterCard & UPI
                    </p>
                  </div>

                  {/* QR Code Graphic for Payment */}
                  <div className="bg-white p-5 rounded-2xl shadow-xl inline-block border-2 border-amber-400 relative">
                    {renderQRCodeSVG(selectedTableNum, 180)}
                  </div>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <button
                      onClick={() => setPaymentMethod('qr_upi')}
                      className={`p-2 rounded-xl text-[11px] font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        paymentMethod === 'qr_upi'
                          ? 'bg-amber-500 text-zinc-950 border-amber-400'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Scan QR</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2 rounded-xl text-[11px] font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-amber-500 text-zinc-950 border-amber-400'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Credit Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`p-2 rounded-xl text-[11px] font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        paymentMethod === 'apple_pay'
                          ? 'bg-amber-500 text-zinc-950 border-amber-400'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Apple Pay</span>
                    </button>
                  </div>

                  {/* Simulate Payment Trigger */}
                  <button
                    onClick={handleSimulatePayment}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-zinc-950 font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simulate Instant QR Bill Payment (${grandTotal.toFixed(2)})</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-Bit SSL Encrypted Instant Settlement</span>
                  </div>

                </div>
              ) : (
                /* Payment Receipt Success Screen */
                <div className="bg-gradient-to-b from-emerald-950/80 to-zinc-950 text-white p-7 rounded-3xl border border-emerald-500/50 shadow-2xl text-center space-y-5 animate-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center mx-auto font-black text-2xl shadow-lg shadow-emerald-500/30">
                    ✓
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">
                      Payment Successful & Verified
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-white">
                      Bill Settled for Table #{selectedTableNum < 10 ? `0${selectedTableNum}` : selectedTableNum}
                    </h3>
                    <p className="text-xs text-zinc-300">
                      Transaction ID: #TXN-ETOILE-{Math.floor(100000 + Math.random() * 900000)}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Amount Paid:</span>
                      <span className="text-emerald-400 font-bold text-sm">${grandTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Payment Method:</span>
                      <span className="text-white">QR Code / Instant Digital</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Date & Time:</span>
                      <span className="text-white">{new Date().toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Tax Invoice</span>
                    </button>
                    <button
                      onClick={() => setIsPaidSuccess(false)}
                      className="flex-1 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      New Bill Test
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* SINGLE TABLE FOCUS MODE */}
        {viewMode === 'single' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls: Table Selector */}
            <div className="lg:col-span-5 space-y-5 print:hidden">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2 uppercase tracking-wider">
                  Select Table Number
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {tables.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTableNum(t.tableNumber)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        selectedTableNum === t.tableNumber
                          ? 'border-amber-500 bg-amber-500 text-zinc-950 font-bold shadow-md scale-105'
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 hover:border-amber-500/50 text-zinc-800 dark:text-zinc-200 font-semibold'
                      }`}
                    >
                      <div className="text-sm">#{t.tableNumber < 10 ? `0${t.tableNumber}` : t.tableNumber}</div>
                      <div className={`text-[9px] uppercase tracking-tighter ${selectedTableNum === t.tableNumber ? 'text-zinc-950/80' : 'text-zinc-400'}`}>
                        {t.zone}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Table Input */}
              <form onSubmit={handleCustomTableSubmit} className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 block mb-1.5">
                  Need a custom table number?
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="999"
                    placeholder="Enter Table # (e.g. 15)"
                    value={customTableInput}
                    onChange={(e) => setCustomTableInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl text-xs font-bold hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                  >
                    Set
                  </button>
                </div>
              </form>

              {/* Table Metadata Card */}
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-amber-900 dark:text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Zone: {currentTable.zone.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {currentTable.capacity} Seats
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400 pt-1 border-t border-amber-200/40 dark:border-amber-800/30">
                  <span>Assigned Server:</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">{currentTable.serverAssigned || 'Elena Rostova'}</span>
                </div>
              </div>
            </div>

            {/* Right Display: Table Stand Graphic */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
              
              {/* Printable Table QR Stand Card */}
              <div className="w-full max-w-sm bg-gradient-to-b from-zinc-900 to-zinc-950 text-white rounded-3xl p-8 border border-amber-500/40 shadow-2xl text-center space-y-6 relative overflow-hidden group">
                
                {/* Gold Accent Lines */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
                
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles className="w-3 h-3" /> L'Étoile Modern Bistro
                  </div>
                  <h2 className="font-serif font-bold text-3xl text-amber-100 tracking-tight">
                    TABLE #{selectedTableNum < 10 ? `0${selectedTableNum}` : selectedTableNum}
                  </h2>
                  <p className="text-[11px] text-zinc-400 font-light uppercase tracking-wider">
                    {currentTable.zone} Atmosphere • Direct Dining Access
                  </p>
                </div>

                {/* White QR Stand Container */}
                <div className="bg-white p-6 rounded-2xl shadow-xl inline-block border-2 border-amber-400/80 relative">
                  {renderQRCodeSVG(selectedTableNum, 200)}
                </div>

                <div className="space-y-1 text-zinc-300">
                  <p className="text-xs font-semibold text-amber-300">
                    Scan with Phone Camera to Browse & Order
                  </p>
                  <p className="text-[10px] text-zinc-400">
                    Digital Menu • Sommelier Pairings • Instant Bill Request
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                  <span>Table Code: ETOILE-T{selectedTableNum}</span>
                  <span>742 L'Étoile Blvd</span>
                </div>
              </div>

              {/* Copy & Direct Action Toolbar */}
              <div className="w-full max-w-sm flex items-center gap-2 print:hidden">
                <button
                  onClick={() => handleCopyLink(currentUrl)}
                  className="flex-1 py-3 px-4 bg-amber-500 text-zinc-950 font-bold rounded-2xl text-xs hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-zinc-950" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Table Link Copied!' : 'Copy Table # Link'}</span>
                </button>

                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  title="Test Link in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>
        )}

        {/* ALL TABLES GRID MODE */}
        {viewMode === 'all' && (
          <div className="space-y-6">
            
            {/* Zone Filter Tabs */}
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800 print:hidden">
              <span className="text-xs font-bold text-zinc-500 mr-2">Filter Zone:</span>
              {['all', 'window', 'indoor', 'outdoor', 'private'].map((z) => (
                <button
                  key={z}
                  onClick={() => setZoneFilter(z)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                    zoneFilter === z
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }`}
                >
                  {z === 'all' ? 'All Zones (12 Tables)' : z}
                </button>
              ))}
            </div>

            {/* Grid of all table cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTables.map((t) => {
                const tableUrl = getTableUrl(t.tableNumber);
                return (
                  <div
                    key={t.id}
                    className="bg-zinc-950 text-white rounded-3xl p-5 border border-amber-500/30 shadow-lg text-center space-y-4 flex flex-col justify-between relative group hover:border-amber-400 transition-all print:break-inside-avoid print:mb-6"
                  >
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3" /> L'Étoile Modern Bistro
                      </div>
                      <h4 className="font-serif font-bold text-2xl text-amber-100">
                        TABLE #{t.tableNumber < 10 ? `0${t.tableNumber}` : t.tableNumber}
                      </h4>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                        {t.zone} Zone • {t.capacity} Guests
                      </p>
                    </div>

                    {/* QR Code Container */}
                    <div className="bg-white p-3.5 rounded-2xl shadow-md inline-block mx-auto border border-amber-300/80">
                      {renderQRCodeSVG(t.tableNumber, 130)}
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] text-amber-300 font-semibold">
                        Scan for Live Menu & Direct Ordering
                      </p>
                      
                      <div className="flex items-center justify-center gap-2 print:hidden">
                        <button
                          onClick={() => {
                            setSelectedTableNum(t.tableNumber);
                            setViewMode('single');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-[11px] hover:bg-amber-400 transition-colors cursor-pointer"
                        >
                          Focus & Print
                        </button>
                        <button
                          onClick={() => handleCopyLink(tableUrl)}
                          className="p-1.5 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 text-[11px] cursor-pointer"
                          title="Copy Table Link"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

