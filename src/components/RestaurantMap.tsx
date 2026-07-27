import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Clock, Car, Bus, Copy, Check, ExternalLink, ShieldCheck, Loader2, Sparkles } from 'lucide-react';

export const RestaurantMap: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'transit' | 'valet'>('map');

  const [mapMode, setMapMode] = useState<'google' | 'vector'>('google');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Preload & timeout safety to ensure map UI is always responsive
  useEffect(() => {
    setIframeLoaded(false);
  }, [mapMode]);

  const addressText = "742 L'Étoile Boulevard, Grand Arts District, NY 10012";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const googleMapsUrl = "https://maps.google.com/maps?q=40.724660,-73.996232&hl=en&z=15&output=embed";
  const directGoogleMapsLink = "https://www.google.com/maps/search/?api=1&query=742+Grand+St+New+York+NY+10012";
  const directAppleMapsLink = "https://maps.apple.com/?address=742+Grand+St,+New+York,+NY+10012";

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Location & Directions
          </span>
          <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white mt-1">
            Find L'Étoile Modern Bistro
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Located in the heart of the Grand Arts District with complimentary valet service.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAddress}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
          >
            {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAddress ? 'Copied!' : 'Copy Address'}</span>
          </button>

          <a
            href={directGoogleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 text-xs font-bold hover:bg-amber-400 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* Map Tabs & Sub-Mode Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl w-fit text-xs font-semibold">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'map' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            Interactive Map
          </button>
          <button
            onClick={() => setActiveTab('valet')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'valet' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            Valet & Parking
          </button>
          <button
            onClick={() => setActiveTab('transit')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'transit' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            Public Transport
          </button>
        </div>

        {activeTab === 'map' && (
          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl text-[11px] font-bold">
            <button
              onClick={() => setMapMode('google')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                mapMode === 'google'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Google Map Embed
            </button>
            <button
              onClick={() => setMapMode('vector')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                mapMode === 'vector'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>Instant Vector Map</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Map View Container */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 h-[380px] shadow-inner group bg-zinc-950">
            {mapMode === 'google' ? (
              <div className="relative w-full h-full bg-zinc-950">
                {/* Instant Loading Skeleton Overlay when Google Map iframe is fetching */}
                {!iframeLoaded && (
                  <div className="absolute inset-0 z-10 bg-zinc-950 p-6 flex flex-col justify-between overflow-hidden">
                    {/* Grid Pattern Background */}
                    <div 
                      className="absolute inset-0 opacity-15 pointer-events-none" 
                      style={{
                        backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px), linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)`,
                        backgroundSize: `24px 24px, 60px 60px, 60px 60px`
                      }}
                    />

                    {/* Animated Pulsing Location Indicator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-16 h-16 rounded-full bg-amber-500/20 animate-ping" />
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center backdrop-blur-md">
                          <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
                        </div>
                      </div>
                      <p className="mt-3 text-xs font-medium text-amber-400/90 tracking-wide flex items-center gap-2">
                        <span>Loading Google Satellite Map...</span>
                      </p>
                    </div>

                    {/* Instant Fallback Switcher */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <button
                        onClick={() => setMapMode('vector')}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Switch to Instant Map</span>
                      </button>
                    </div>
                  </div>
                )}

                <iframe
                  title="L'Etoile Restaurant Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  loading="lazy"
                  allowFullScreen
                  src={googleMapsUrl}
                  onLoad={() => setIframeLoaded(true)}
                  className={`w-full h-full transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Floating Map Pin Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-xl space-y-2 pointer-events-auto z-20">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300">
                      Michelin Star Landmark
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-white">L'Étoile Modern Bistro</h4>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{addressText}</p>
                  
                  <div className="pt-1.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[10px] font-bold">
                    <a
                      href={directGoogleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Google Directions</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <a
                      href={directAppleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      Apple Maps
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* Stylized Vector District Map - Loads instantly with 0ms network latency */
              <div className="relative w-full h-full bg-zinc-950 p-6 flex flex-col justify-between overflow-hidden">
                {/* Vector Grid Streets Background */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none" 
                  style={{
                    backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px), linear-gradient(to right, #52525b 1px, transparent 1px), linear-gradient(to bottom, #52525b 1px, transparent 1px)`,
                    backgroundSize: `20px 20px, 60px 60px, 60px 60px`
                  }}
                />

                {/* Street Lines Representation */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Grand St */}
                  <div className="absolute top-1/2 left-0 right-0 h-12 bg-zinc-900/90 border-y border-amber-500/30 flex items-center justify-end px-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Grand Arts Boulevard
                  </div>
                  {/* Broadway */}
                  <div className="absolute top-0 bottom-0 left-1/3 w-16 bg-zinc-900/90 border-x border-amber-500/30 flex items-center justify-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest [writing-mode:vertical-lr]">
                    SoHo Arts Avenue
                  </div>
                </div>

                {/* Pin Location Marker */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-12 h-12 rounded-full bg-amber-500/30 animate-ping" />
                    <span className="absolute w-8 h-8 rounded-full bg-amber-500/50 animate-pulse" />
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-lg border-2 border-white z-10">
                      <MapPin className="w-6 h-6 fill-zinc-950" />
                    </div>
                  </div>
                  <div className="mt-2 bg-zinc-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-amber-500/50 shadow-xl font-serif">
                    L'Étoile Modern Bistro
                  </div>
                </div>

                {/* Nearby Landmark Pins */}
                <div className="absolute top-8 right-12 z-10 bg-zinc-900/80 backdrop-blur-md p-2.5 rounded-xl border border-zinc-800 text-[10px] text-zinc-300 space-y-1">
                  <div className="font-bold text-amber-400">📍 Nearby Points of Interest</div>
                  <div>• Valet Garage (50m East)</div>
                  <div>• Grand St Station (2 min walk)</div>
                  <div>• SoHo Plaza Gardens (100m)</div>
                </div>

                {/* Footer Controls */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80">
                  <span>LAT 40.7246 N / LON -73.9962 W</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMapMode('google')}
                      className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                    >
                      Switch to Satellite Google Map
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Valet & Parking Tab */}
      {activeTab === 'valet' && (
        <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
            <Car className="w-5 h-5 text-amber-600" />
            <span>Complimentary White-Glove Valet Parking</span>
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Guests holding table reservations enjoy complimentary 3-hour valet parking right at our grand entrance on L'Étoile Boulevard. Our uniformed concierges ensure seamless vehicle drop-off and retrieval upon request.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <span className="font-bold text-zinc-900 dark:text-white block">Main Garage Partner</span>
              <span>Grand Arts Multi-Level Structure (Level 2 VIP)</span>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <span className="font-bold text-zinc-900 dark:text-white block">EV Charging Stations</span>
              <span>4 Ultra-Fast Tesla & Universal Chargers Available</span>
            </div>
          </div>
        </div>
      )}

      {/* Transit Tab */}
      {activeTab === 'transit' && (
        <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 space-y-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm">
            <Bus className="w-5 h-5 text-amber-600" />
            <span>Public Transit & Metro Access</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Easily accessible via major subway and bus lines. Located 2 blocks from the Grand Arts Station.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Subway: Lines N, Q, R, W</span>
              <span className="text-zinc-500 font-medium">Grand St Exit (3 min walk)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Express Bus: M1, M55</span>
              <span className="text-zinc-500 font-medium">L'Étoile Arts Stop (1 min walk)</span>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant Hours & Contact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-zinc-900 dark:text-white">Opening Hours</div>
            <div className="text-zinc-500 dark:text-zinc-400 mt-0.5">Mon–Sun: 17:00 – 23:30</div>
            <div className="text-[10px] text-amber-600 font-semibold mt-0.5">Kitchen Closes 22:30</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
          <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-zinc-900 dark:text-white">Direct Concierge</div>
            <a href="tel:+15558887827" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline mt-0.5 block">
              +1 (555) 888-STAR
            </a>
            <div className="text-[10px] text-zinc-500">24/7 Table Booking Support</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-zinc-900 dark:text-white">Dress Code</div>
            <div className="text-zinc-500 dark:text-zinc-400 mt-0.5">Smart Casual to Formal</div>
            <div className="text-[10px] text-zinc-500">Coat Check Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

