import React, { useState } from 'react';
import { Star, Award, CheckCircle, ThumbsUp, MessageSquarePlus, Filter, Sparkles, X, Heart } from 'lucide-react';

export interface CustomerReview {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  dishesOrdered: string[];
  comment: string;
  isMichelinCritic?: boolean;
  isVerifiedDiner?: boolean;
  helpfulCount: number;
}

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    role: 'Food & Wine Critic, NY Gastronomer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'July 18, 2026',
    dishesOrdered: ['5-Course Tasting Menu', 'Dom Pérignon 2013', 'A5 Miyazaki Wagyu'],
    comment: "An absolute masterclass in French-Japanese fusion. The A5 Miyazaki Wagyu melts into buttery perfection over binchotan embers. Paired with the subterranean cellar wine selection, L'Étoile remains NYC's premier dining jewel.",
    isMichelinCritic: true,
    isVerifiedDiner: true,
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    author: 'Marcus Sterling',
    role: 'Verified Premier Diner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'July 22, 2026',
    dishesOrdered: ['Oscietra Caviar Tartlet', 'Chilean Sea Bass', 'Château Margaux 2018'],
    comment: "Celebrated our 10th anniversary at Table #1 by the skyline window. The staff greeted us with complimentary vintage champagne. Service was discrete yet omnipresent. Unforgettable evening!",
    isMichelinCritic: false,
    isVerifiedDiner: true,
    helpfulCount: 28
  },
  {
    id: 'rev-3',
    author: 'Sophia Chen',
    role: 'Sommelier Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'July 10, 2026',
    dishesOrdered: ['Grand Cru Wine Flight', 'Norcia Black Truffle Tagliolini'],
    comment: "The Virtual Sommelier tool matched our pasta with a stunning 2016 Barolo DOCG. The aroma of winter black truffles filling the air as the waiter shaved them at table side was unforgettable.",
    isMichelinCritic: false,
    isVerifiedDiner: true,
    helpfulCount: 19
  },
  {
    id: 'rev-4',
    author: 'Julian Thorne',
    role: 'Verified Guest',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'June 29, 2026',
    dishesOrdered: ['Grand Cru Dark Chocolate Soufflé', 'Puligny-Montrachet'],
    comment: "Flawless soufflé with Kyoto Matcha gelato! The live blueprint allowed us to choose our exact private suite table ahead of time.",
    isMichelinCritic: false,
    isVerifiedDiner: true,
    helpfulCount: 14
  }
];

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [michelinOnly, setMichelinOnly] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newDishes, setNewDishes] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleLikeReview = (id: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const dishesArray = newDishes.split(',').map(d => d.trim()).filter(Boolean);

    const createdReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      role: newRole.trim() || 'Verified Diner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: newRating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      dishesOrdered: dishesArray.length > 0 ? dishesArray : ['Chef Special Tasting'],
      comment: newComment,
      isMichelinCritic: false,
      isVerifiedDiner: true,
      helpfulCount: 1
    };

    setReviews([createdReview, ...reviews]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsWriteModalOpen(false);
      setNewAuthor('');
      setNewRole('');
      setNewDishes('');
      setNewComment('');
      setNewRating(5);
    }, 1500);
  };

  const filteredReviews = reviews.filter(r => {
    if (michelinOnly && !r.isMichelinCritic) return false;
    if (filterRating !== 'all' && r.rating !== filterRating) return false;
    return true;
  });

  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
      {/* Top Header & Rating Aggregate Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Verified Diner & Critic Reviews
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Guest Testimonials & Culinary Acclaim
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xl">
            Real guest experiences from Michelin inspectors, wine sommeliers, and valued diners at L'Étoile Modern Bistro.
          </p>
        </div>

        {/* Score Card Box */}
        <div className="flex items-center gap-6 bg-zinc-950 text-white p-5 rounded-2xl border border-zinc-800 shadow-lg shrink-0">
          <div className="text-center border-r border-zinc-800 pr-5">
            <div className="font-serif font-bold text-3xl text-amber-400">4.9</div>
            <div className="flex items-center gap-0.5 justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-[10px] text-zinc-400 mt-1 font-semibold">520+ Reviews</div>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between gap-4 text-[11px]">
              <span className="text-zinc-400">Food Quality</span>
              <span className="font-bold text-amber-400">4.9 / 5.0</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[11px]">
              <span className="text-zinc-400">Atmosphere & Views</span>
              <span className="font-bold text-amber-400">4.8 / 5.0</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[11px]">
              <span className="text-zinc-400">Service Excellence</span>
              <span className="font-bold text-amber-400">5.0 / 5.0</span>
            </div>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors shadow-md ml-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write Review</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <button
            onClick={() => { setFilterRating('all'); setMichelinOnly(false); }}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filterRating === 'all' && !michelinOnly
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            All Reviews ({reviews.length})
          </button>

          <button
            onClick={() => setMichelinOnly(!michelinOnly)}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border ${
              michelinOnly
                ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-transparent'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Michelin Critics Only</span>
          </button>

          {[5, 4].map(stars => (
            <button
              key={stars}
              onClick={() => { setFilterRating(stars); setMichelinOnly(false); }}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                filterRating === stars && !michelinOnly
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <span>{stars} Stars</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="sm:hidden w-full py-3 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map(rev => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 space-y-4 hover:border-amber-500/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Reviewer Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-11 h-11 rounded-full object-cover border border-amber-500/40 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-white">
                        {rev.author}
                      </h4>
                      {rev.isVerifiedDiner && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {rev.role}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-0.5 justify-end">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-0.5 block">{rev.date}</span>
                </div>
              </div>

              {/* Michelin Critic Tag if applicable */}
              {rev.isMichelinCritic && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold">
                  <Award className="w-3 h-3" /> Michelin Guide Press Contributor
                </div>
              )}

              {/* Dishes Tags */}
              {rev.dishesOrdered.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold text-zinc-400">Experienced:</span>
                  {rev.dishesOrdered.map((dish, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-200/80 dark:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              )}

              {/* Comment */}
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            {/* Helpful Counter */}
            <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Was this review helpful?</span>
              <button
                onClick={() => handleLikeReview(rev.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 hover:bg-amber-500/20 hover:text-amber-500 transition-colors text-xs font-semibold"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{rev.helpfulCount}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Share Your Dining Experience
              </span>
              <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
                Write a Guest Review
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Your feedback helps our culinary team maintain Michelin-star excellence.
              </p>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                <CheckCircle className="w-12 h-12 text-amber-500 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
                  Review Submitted!
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Thank you for dining at L'Étoile. Your review is now published.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                {/* Star Rating Chooser */}
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300">
                    Overall Experience Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-zinc-300 dark:text-zinc-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-bold text-amber-500 ml-2">{newRating} Stars</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-zinc-700 dark:text-zinc-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Victoria Sterling"
                      value={newAuthor}
                      onChange={e => setNewAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-zinc-700 dark:text-zinc-300">Tag/Location (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Verified Guest, NYC"
                      value={newRole}
                      onChange={e => setNewRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300">Dishes Experienced (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. A5 Wagyu Ribeye, Caviar Tartlet"
                    value={newDishes}
                    onChange={e => setNewDishes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300">Your Detailed Review</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the flavors, ambiance, wine pairings, and service quality..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors shadow-lg"
                >
                  Publish Verified Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
