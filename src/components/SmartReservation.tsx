import React, { useState, useEffect } from 'react';
import { Reservation, TableZone } from '../types';
import { Calendar, Clock, Users, Sparkles, Check, MapPin, AlertCircle, Heart, Phone, Mail, User, Eye, X, Camera, Save, RefreshCw, Trash2 } from 'lucide-react';
import { RestaurantMap } from './RestaurantMap';
import { InteractiveTableSelector } from './InteractiveTableSelector';
import { RestaurantTable } from '../types';

interface SmartReservationProps {
  onReservationComplete: (newRes: Reservation) => void;
  currentUser?: { email: string; name: string } | null;
}

const DRAFT_STORAGE_KEY = 'letoile_reservation_draft';

export const SmartReservation: React.FC<SmartReservationProps> = ({ onReservationComplete, currentUser }) => {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-07-26');
  const [selectedTime, setSelectedTime] = useState('19:30');
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedZone, setSelectedZone] = useState<TableZone>('window');
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [inspectZonePhoto, setInspectZonePhoto] = useState<{ title: string; image: string; desc: string; features: string[] } | null>(null);

  // Auto-Save Draft State
  const [draftRestored, setDraftRestored] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Load saved draft or logged-in user on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.guestName) setGuestName(parsed.guestName);
        if (parsed.guestEmail) setGuestEmail(parsed.guestEmail);
        if (parsed.guestPhone) setGuestPhone(parsed.guestPhone);
        if (parsed.selectedDate) setSelectedDate(parsed.selectedDate);
        if (parsed.selectedTime) setSelectedTime(parsed.selectedTime);
        if (parsed.guestsCount) setGuestsCount(parsed.guestsCount);
        if (parsed.selectedZone) setSelectedZone(parsed.selectedZone);
        if (parsed.specialRequests) setSpecialRequests(parsed.specialRequests);
        if (parsed.selectedTable) setSelectedTable(parsed.selectedTable);
        setDraftRestored(true);
      } else if (currentUser) {
        if (currentUser.name) setGuestName(currentUser.name);
        if (currentUser.email) setGuestEmail(currentUser.email);
      }
    } catch (e) {
      console.error('Error reading reservation draft:', e);
    }
  }, [currentUser]);

  // Sync with logged in user if fields are empty
  useEffect(() => {
    if (currentUser) {
      if (!guestEmail) setGuestEmail(currentUser.email);
      if (!guestName && currentUser.name) setGuestName(currentUser.name);
    }
  }, [currentUser, guestEmail, guestName]);

  // Auto-save form draft whenever any field changes
  useEffect(() => {
    if (guestName || guestEmail || guestPhone || specialRequests || selectedTable) {
      const draft = {
        guestName,
        guestEmail,
        guestPhone,
        selectedDate,
        selectedTime,
        guestsCount,
        selectedZone,
        specialRequests,
        selectedTable
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [guestName, guestEmail, guestPhone, selectedDate, selectedTime, guestsCount, selectedZone, specialRequests, selectedTable]);

  const handleClearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setGuestName(currentUser?.name || '');
    setGuestEmail(currentUser?.email || '');
    setGuestPhone('');
    setSpecialRequests('');
    setSelectedTable(null);
    setDraftRestored(false);
    setLastSavedTime(null);
  };

  const timeSlots = ['17:00', '18:00', '19:00', '19:30', '20:00', '20:30', '21:30', '22:00'];

  const zones: {
    id: TableZone;
    title: string;
    desc: string;
    icon: string;
    image: string;
    features: string[];
    capacity: string;
  }[] = [
    {
      id: 'window',
      title: 'Window Skyline Lounge',
      desc: 'Panoramic penthouse view overlooking the illuminated city skyline.',
      icon: '✨',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      features: ['Floor-to-ceiling glass', 'Sunset & Night Lights', 'Candlelit Tables'],
      capacity: '2-4 Guests'
    },
    {
      id: 'indoor',
      title: 'Main Bistro Dining',
      desc: 'Warm oak wood, plush velvet banquettes & acoustic intimacy.',
      icon: '🍷',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      features: ['Central Open Kitchen View', 'Acoustic Leather Booths', 'Ambient Jazz'],
      capacity: '2-8 Guests'
    },
    {
      id: 'outdoor',
      title: 'Garden Terrace Patio',
      desc: 'Lush open-air botanical garden with heated glass canopy & fountain.',
      icon: '🌿',
      image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=800&q=80',
      features: ['Fresh Air & Flora', 'Radiant Heating', 'Starlight Ambiance'],
      capacity: '2-6 Guests'
    },
    {
      id: 'private',
      title: 'Private Dining Suite',
      desc: 'Exclusive soundproof room with dedicated Sommelier & private butler.',
      icon: '👑',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
      features: ['Dedicated Chef & Butler', 'Custom Menu Pairing', 'Private Entrance'],
      capacity: '4-12 Guests'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: guestName,
          customerEmail: guestEmail,
          customerPhone: guestPhone,
          date: selectedDate,
          timeSlot: selectedTime,
          guestsCount,
          zone: selectedZone,
          specialRequests
        })
      });
      const data: Reservation = await res.json();
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setConfirmedReservation(data);
      onReservationComplete(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-zinc-50/50 dark:bg-zinc-950/50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Precision Dining
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Smart Table Reservation
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Select your preferred dining atmosphere and seating time. Real-time availability guaranteed.
          </p>
        </div>

        {!confirmedReservation ? (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl shadow-xl p-6 sm:p-10 space-y-8 relative">
            
            {/* Auto-Save Draft Notification Badge */}
            {(lastSavedTime || draftRestored) && (
              <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold">
                  <Save className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>
                    {draftRestored
                      ? 'Draft restored from your previous session.'
                      : `Form auto-saved to local storage at ${lastSavedTime}.`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleClearDraft}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 text-[11px] font-bold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Draft</span>
                </button>
              </div>
            )}
            
            {/* Step 1: Party & Date/Time */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span>1. Select Party Size, Date & Time</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Guests Count */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Guests Count
                  </label>
                  <select
                    value={guestsCount}
                    onChange={e => setGuestsCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                      <option key={n} value={n}>{n} Guests</option>
                    ))}
                  </select>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Dining Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={e => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t} (Prime Seating)</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Zone Atmosphere & Visual Table Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span>2. Choose Dining Atmosphere & Seating Area</span>
                </h3>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5" /> Tap image to view ambiance
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {zones.map(z => {
                  const isSelected = selectedZone === z.id;
                  return (
                    <div
                      key={z.id}
                      onClick={() => setSelectedZone(z.id)}
                      className={`group relative rounded-3xl border cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 shadow-lg'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-800/40'
                      }`}
                    >
                      {/* Seating Image Header */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={z.image}
                          alt={z.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Zone Icon & Capacity Tag */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30">
                            {z.capacity}
                          </span>
                          {isSelected && (
                            <span className="p-1.5 rounded-full bg-amber-500 text-zinc-950 font-bold shadow-md">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>

                        {/* Title Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <div>
                            <span className="text-xs font-serif font-bold text-white text-shadow flex items-center gap-1">
                              <span>{z.icon}</span> {z.title}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInspectZonePhoto({ title: z.title, image: z.image, desc: z.desc, features: z.features });
                            }}
                            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-colors flex items-center gap-1 text-[10px] font-medium"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {z.desc}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {z.features.map((feat, idx) => (
                            <span
                              key={idx}
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                isSelected
                                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200'
                                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                              }`}
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive VIP Table Blueprint Selection */}
            <div className="space-y-4 pt-2">
              <InteractiveTableSelector
                selectedTableId={selectedTable?.id}
                onSelectTable={(tbl) => {
                  setSelectedTable(tbl);
                  setSelectedZone(tbl.zone);
                }}
              />
            </div>

            {/* Step 3: Guest Information */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-amber-600" />
                <span>3. Guest Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Harrington"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="harrington@estate.com"
                    value={guestEmail}
                    onChange={e => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Special Requests or Dietary Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Anniversary celebration, dietary allergies, champagne on arrival..."
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-base rounded-2xl shadow-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Table...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Confirm Table Reservation</span>
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation Ticket Card */
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-8 max-w-lg mx-auto text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Reservation Confirmed
              </span>
              <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                We look forward to welcoming you, {confirmedReservation.customerName}!
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Booking ID:</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">{confirmedReservation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Date & Time:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{confirmedReservation.date} at {confirmedReservation.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Party Size:</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{confirmedReservation.guestsCount} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Dining Zone:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400 uppercase">{confirmedReservation.zone}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              A confirmation summary has been dispatched to <span className="font-semibold">{confirmedReservation.customerEmail}</span>.
            </p>

            <button
              onClick={() => setConfirmedReservation(null)}
              className="w-full py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-xs hover:bg-zinc-800 transition-colors"
            >
              Make Another Reservation
            </button>
          </div>
        )}

        {/* Location & Interactive Map Section */}
        <div className="mt-16">
          <RestaurantMap />
        </div>

      </div>

      {/* Zone Photo Preview Modal */}
      {inspectZonePhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setInspectZonePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 sm:h-96">
              <img
                src={inspectZonePhoto.image}
                alt={inspectZonePhoto.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" /> Dining Ambiance Preview
                </span>
                <h3 className="font-serif text-2xl font-bold">{inspectZonePhoto.title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{inspectZonePhoto.desc}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {inspectZonePhoto.features.map((f, i) => (
                    <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
