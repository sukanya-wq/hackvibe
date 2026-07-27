import React, { useState } from 'react';
import { Award, Sparkles, Leaf, Flame, Star, Trophy, Wine, Utensils, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';

export const RestaurantStory: React.FC = () => {
  const [selectedChefTab, setSelectedChefTab] = useState<'all' | 'culinary' | 'pastry' | 'wine'>('all');

  const topChefs = [
    {
      id: 'jean-luc',
      name: 'Chef Jean-Luc Dubois',
      role: 'Master Culinary Director',
      category: 'culinary',
      experience: '22 Years Experience',
      accolades: 'Former Executive Chef at L\'Arpège Paris & Tokyo Ginza',
      bio: 'Pioneer of French-Japanese gastronomy fusion. Chef Jean-Luc blends classical Escoffier French techniques with precise Japanese seasonality and zero-waste telemetry.',
      signatureDish: 'A5 Miyazaki Wagyu Ribeye with Black Garlic Glaze',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
      awards: ['3 Michelin Stars', 'Légion d\'Honneur Gourmande 2024', 'Gault & Millau 19/20']
    },
    {
      id: 'akiko',
      name: 'Chef Akiko Tanaka',
      role: 'Executive Pastry Master',
      category: 'pastry',
      experience: '16 Years Experience',
      accolades: 'World Pastry Cup Gold Medalist & Valrhona Ambassador',
      bio: 'Master of architectural chocolate art and delicate Japanese botanical infusions. Chef Akiko balances precise sweetness, texture contrast, and visual poetry.',
      signatureDish: 'Grand Cru Dark Chocolate & Uji Matcha Soufflé',
      image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=800&q=80',
      awards: ['World Pastry Cup Gold 2023', 'Best Dessert Artisan Asia', 'Valrhona Master Chef']
    },
    {
      id: 'marco',
      name: 'Chef Marco Rossini',
      role: 'Master Pasta Artisan & Sous Chef',
      category: 'culinary',
      experience: '18 Years Experience',
      accolades: '4th Generation Bolognese Pastaiolo',
      bio: 'Born in Bologna, Marco crafts pasta dough daily by hand using organic heirloom duck eggs and imported Italian semolina flour.',
      signatureDish: 'Black Truffle & Cacio e Pepe Tagliolini',
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
      awards: ['Accademia della Cucina Gold Medal', 'Best Handmade Pasta 2025']
    },
    {
      id: 'antoine',
      name: 'Antoine Moreau',
      role: 'Head Sommelier & Beverage Director',
      category: 'wine',
      experience: '15 Years Experience',
      accolades: 'Master Sommelier Society & Grand Cellar Curator',
      bio: 'Curator of L\'Étoile\'s 2,400-label underground wine vault. Antoine designs harmonious liquid pairings spanning rare Grand Crus, biodynamic nectars, and craft sakes.',
      signatureDish: 'Smoked Botanical Old Fashioned & Vintage Burgundy Pairings',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      awards: ['Wine Spectator Grand Award 2026', 'Best Sommelier Europe']
    }
  ];

  const filteredChefs = topChefs.filter(chef => selectedChefTab === 'all' || chef.category === selectedChefTab);

  const achievements = [
    {
      year: '2021',
      title: 'Flagship Opening',
      description: 'L\'Étoile opened its doors in the historic arts district, pioneering French-Japanese omakase dining.',
      badge: 'Foundation'
    },
    {
      year: '2023',
      title: 'First Michelin Star',
      description: 'Awarded 1 Michelin Star for exceptional ingredient purity and culinary innovation.',
      badge: '★ Michelin Star'
    },
    {
      year: '2024',
      title: 'Green Star & 2nd Star',
      description: 'Earned Michelin Green Star for 100% sustainable farm-to-table sourcing and zero kitchen waste.',
      badge: '★★ + Green Star'
    },
    {
      year: '2025',
      title: 'AI Telemetry Pioneer',
      description: 'Integrated real-time KDS kitchen routing, AI Sommelier pairings, and climate-controlled cellar monitoring.',
      badge: 'Tech Excellence'
    },
    {
      year: '2026',
      title: '3 Michelin Stars',
      description: 'Crowned with 3 Michelin Stars and voted #1 Modern Fine Dining Bistro Experience globally.',
      badge: '★★★ Michelin Star'
    }
  ];

  return (
    <section id="culinary-masters" className="py-20 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 1: Story & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Chef Image Frame */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/80 dark:border-zinc-800 relative group">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                alt="Head Chef Jean-Luc Dubois"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Founder & Master Director
                </span>
                <h3 className="font-serif text-3xl font-bold">Chef Jean-Luc Dubois</h3>
                <p className="text-xs text-zinc-300">"Every dish is a balance of emotion, discipline, and scientific culinary rigor."</p>
              </div>
            </div>

            {/* Floating Award Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 hidden sm:flex items-center gap-4">
              <div className="p-3.5 bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-500/20">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="font-serif font-bold text-base text-zinc-900 dark:text-white">3-Star Michelin Standard</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Voted Top Gastronomic Experience 2026</div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Heritage & Culinary Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white leading-tight">
                Where Michelin-Star Artistry Meets AI Precision
              </h2>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Founded in 2021, L'Étoile harmonizes traditional French Escoffier gastronomy with Japanese omakase precision. We believe fine dining should be an immersive art form — elevated by real-time kitchen telemetry, perfect ingredient sourcing, and intelligent wine pairing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-sm">
                  <Leaf className="w-4 h-4" />
                  <span>100% Sustainable Farm Sourcing</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Direct partnerships with organic coastal fisheries, truffle foragers, and biodynamic orchards.</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Sub-Minute Precision KDS</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Kitchen Display Systems route orders automatically so every plate arrives at peak serving temperature.</p>
              </div>
            </div>

            {/* Core Values / Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="font-serif text-2xl font-bold text-amber-600 dark:text-amber-400 block">2,400+</span>
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">Cellar Labels</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-zinc-900 dark:text-white block">100%</span>
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">Fresh Daily</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-amber-600 dark:text-amber-400 block">4.97 ★</span>
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">Guest Rating</span>
              </div>
            </div>
          </div>

        </div>

        {/* Section 2: Top Chefs & Culinary Maestros */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Culinary Leadership
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-1">
                Meet Our Top Culinary Masters
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
                Our kitchen is led by world-class chefs, master chocolatiers, and award-winning sommeliers committed to gastronomic excellence.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 self-start md:self-auto">
              {[
                { id: 'all', label: 'All Masters' },
                { id: 'culinary', label: 'Culinary & Pasta' },
                { id: 'pastry', label: 'Pâtisserie' },
                { id: 'wine', label: 'Sommelier' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedChefTab(tab.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    selectedChefTab === tab.id
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chefs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredChefs.map(chef => (
              <div
                key={chef.id}
                className="group p-5 rounded-3xl bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all hover:shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img
                      src={chef.image}
                      alt={chef.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white uppercase tracking-wider">
                      {chef.experience}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {chef.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">{chef.role}</p>
                    <p className="text-[11px] text-zinc-400 font-medium">{chef.accolades}</p>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                    {chef.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200/80 dark:border-zinc-700/60 space-y-2">
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                    <span className="text-zinc-900 dark:text-white font-semibold">Signature: </span>
                    {chef.signatureDish}
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {chef.awards.map((award, idx) => (
                      <span key={idx} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Restaurant Achievements & Historical Milestones */}
        <div className="space-y-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Awards & Recognition
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
              Our Journey of Achievements
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              A decade of culinary passion culminating in global recognition for quality, innovation, and service.
            </p>
          </div>

          {/* Achievement Highlights Banner */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 text-center rounded-3xl bg-gradient-to-b from-amber-50 to-white dark:from-zinc-800/80 dark:to-zinc-900 border border-amber-200/80 dark:border-amber-800/50 shadow-sm space-y-2">
              <Award className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto" />
              <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">3 Michelin Stars</div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Awarded 2024, 2025 & 2026</p>
            </div>

            <div className="p-6 text-center rounded-3xl bg-gradient-to-b from-amber-50 to-white dark:from-zinc-800/80 dark:to-zinc-900 border border-amber-200/80 dark:border-amber-800/50 shadow-sm space-y-2">
              <Trophy className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto" />
              <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">World's Top 10</div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Epicurean Dining Review 2026</p>
            </div>

            <div className="p-6 text-center rounded-3xl bg-gradient-to-b from-amber-50 to-white dark:from-zinc-800/80 dark:to-zinc-900 border border-amber-200/80 dark:border-amber-800/50 shadow-sm space-y-2">
              <Wine className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto" />
              <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">Grand Award</div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Wine Spectator 2,400+ Cellar</p>
            </div>

            <div className="p-6 text-center rounded-3xl bg-gradient-to-b from-amber-50 to-white dark:from-zinc-800/80 dark:to-zinc-900 border border-amber-200/80 dark:border-amber-800/50 shadow-sm space-y-2">
              <Leaf className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">Green Michelin Star</div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">100% Zero-Waste Sustainability</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative border-l-2 border-amber-500/30 dark:border-amber-500/20 ml-4 md:ml-32 space-y-8">
            {achievements.map((item, index) => (
              <div key={index} className="relative pl-6 md:pl-8 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-500 border-4 border-white dark:border-zinc-900 group-hover:scale-125 transition-transform" />
                
                {/* Year Label for wider screens */}
                <span className="hidden md:block absolute -left-28 top-0.5 text-sm font-bold font-serif text-amber-600 dark:text-amber-400">
                  {item.year}
                </span>

                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/70 max-w-2xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="md:hidden text-xs font-bold font-serif text-amber-600 dark:text-amber-400">
                      {item.year}
                    </span>
                    <h4 className="font-serif font-bold text-base text-zinc-900 dark:text-white">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-300">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
