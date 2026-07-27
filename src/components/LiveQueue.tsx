import React, { useState } from 'react';
import { QueueTicket, TableZone } from '../types';
import { Users, Clock, AlertCircle, Sparkles, Check, ChevronRight, Phone } from 'lucide-react';

interface LiveQueueProps {
  queueTickets: QueueTicket[];
  onJoinQueue: (newTicket: QueueTicket) => void;
}

export const LiveQueue: React.FC<LiveQueueProps> = ({ queueTickets, onJoinQueue }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [zone, setZone] = useState<TableZone | 'any'>('any');
  const [myTicket, setMyTicket] = useState<QueueTicket | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    try {
      const res = await fetch('/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          partySize,
          zonePreference: zone
        })
      });
      const data: QueueTicket = await res.json();
      setMyTicket(data);
      onJoinQueue(data);
      setName('');
      setPhone('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Walk-In Intelligence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Live Queue & Table Waitlist
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            No reservation? Join our digital waitlist and receive SMS updates when your table is ready.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Join Queue Form Column */}
          <div className="lg:col-span-6 bg-zinc-50 dark:bg-zinc-800/50 p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
                Join Walk-In Waitlist
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Estimated average wait time: <span className="font-bold text-amber-600">12 - 18 minutes</span>
              </p>
            </div>

            {!myTicket ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samantha Wright"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Mobile Phone (For Live SMS Alerts)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 987-6543"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Party Size
                    </label>
                    <select
                      value={partySize}
                      onChange={e => setPartySize(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 8].map(n => (
                        <option key={n} value={n}>{n} Guests</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Preferred Zone
                    </label>
                    <select
                      value={zone}
                      onChange={e => setZone(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="any">First Available Table</option>
                      <option value="window">Window Lounge</option>
                      <option value="outdoor">Outdoor Terrace</option>
                      <option value="indoor">Main Bistro</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>Get Queue Ticket & Number</span>
                </button>
              </form>
            ) : (
              /* Active Ticket Display */
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-300 dark:border-amber-700/60 text-center space-y-4 shadow-lg">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Active Ticket Verified
                </div>
                <div>
                  <span className="text-xs text-zinc-400 uppercase tracking-widest block">Your Ticket Number</span>
                  <span className="font-mono text-5xl font-extrabold text-amber-600 dark:text-amber-400">
                    {myTicket.ticketNumber}
                  </span>
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1">
                  <p>Guest: <span className="font-bold">{myTicket.customerName}</span> ({myTicket.partySize} Guests)</p>
                  <p>Estimated Wait: <span className="font-bold text-emerald-600">{myTicket.estimatedWaitMinutes} minutes</span></p>
                </div>
                <button
                  onClick={() => setMyTicket(null)}
                  className="text-xs text-zinc-400 underline hover:text-zinc-600"
                >
                  Leave Queue / Cancel Ticket
                </button>
              </div>
            )}
          </div>

          {/* Live Status Board Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-zinc-900 text-white dark:bg-zinc-800 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <h4 className="font-serif font-bold text-lg">Live Queue Monitor</h4>
                </div>
                <span className="text-xs text-zinc-400 font-mono">{queueTickets.length} Parties Waiting</span>
              </div>

              <div className="space-y-3 pt-2">
                {queueTickets.map((ticket, idx) => (
                  <div
                    key={ticket.id}
                    className="p-3.5 rounded-2xl bg-zinc-800/80 dark:bg-zinc-900/80 border border-zinc-700/60 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-base text-amber-400">
                        {ticket.ticketNumber}
                      </span>
                      <div>
                        <div className="text-xs font-semibold">{ticket.customerName}</div>
                        <div className="text-[10px] text-zinc-400">{ticket.partySize} Guests • {ticket.zonePreference}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400">~{ticket.estimatedWaitMinutes}m</span>
                      <span className="block text-[10px] text-zinc-500">Wait Position #{idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>3 Window & Outdoor tables predicted to free up in the next 12 minutes.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
