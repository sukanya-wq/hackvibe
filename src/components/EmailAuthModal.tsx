import React, { useState } from 'react';
import { Mail, KeyRound, Sparkles, CheckCircle2, ArrowRight, X, Shield, UserCheck, RefreshCw, LogOut, Award } from 'lucide-react';

export interface UserSession {
  email: string;
  name: string;
  tier: string;
  points: number;
  avatar?: string;
  loggedInAt: string;
  role?: 'customer' | 'manager' | 'chef' | 'admin';
  authMethod?: 'email_otp' | 'google_oauth';
}

interface EmailAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession | null;
  onLoginSuccess: (user: UserSession) => void;
  onLogout: () => void;
}

export const EmailAuthModal: React.FC<EmailAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout
}) => {
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setIsSendingCode(true);

    setTimeout(() => {
      setIsSendingCode(false);
      setStep('otp');
      // Auto-fill demo OTP code for instant ease of testing
      setOtpCode(['8', '8', '8', '9', '9', '9']);
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpCode.join('');
    if (entered.length < 6) {
      setErrorMsg('Please enter the full 6-digit verification code.');
      return;
    }
    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const derivedName = name.trim() || email.split('@')[0].replace('.', ' ').toUpperCase();
      const session: UserSession = {
        email: email.toLowerCase().trim(),
        name: derivedName,
        tier: 'Gold Gourmet Member',
        points: 3420,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
        loggedInAt: new Date().toISOString()
      };
      
      // Store in localStorage
      localStorage.setItem('letoile_user_session', JSON.stringify(session));
      onLoginSuccess(session);
      setStep('success');
    }, 900);
  };

  const handleQuickDemoLogin = (demoEmail: string, demoName: string, role: 'customer' | 'manager' | 'chef' | 'admin' = 'customer') => {
    const session: UserSession = {
      email: demoEmail,
      name: demoName,
      tier: role === 'manager' ? 'Restaurant Manager' : 'VIP Platinum Member',
      points: 5800,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      loggedInAt: new Date().toISOString(),
      role,
      authMethod: 'email_otp'
    };
    localStorage.setItem('letoile_user_session', JSON.stringify(session));
    onLoginSuccess(session);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative space-y-6 overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Email Authentication</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
            {currentUser ? 'Your L\'Étoile Account' : 'Sign In with Email'}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {currentUser
              ? 'You are signed in. Access your reservations, order history, and loyalty perks.'
              : 'Enter your email address to receive an instant secure verification code.'}
          </p>
        </div>

        {/* If Already Logged In */}
        {currentUser ? (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center font-serif font-bold text-lg shadow-md shrink-0">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="space-y-0.5 overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm text-zinc-900 dark:text-white truncate">
                    {currentUser.name}
                  </h3>
                  <UserCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{currentUser.email}</p>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500 mt-1">
                  <Award className="w-3 h-3" />
                  <span>{currentUser.tier} ({currentUser.points} Pts)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <span>Continue Browsing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem('letoile_user_session');
                  onLogout();
                  setStep('email');
                }}
                className="w-full py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 text-zinc-600 dark:text-zinc-300 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of Email Account</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Step 1: Input Email */}
            {step === 'email' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. harrington@estate.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Your Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lord Harrington"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-500 font-semibold">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSendingCode}
                  className="w-full py-3.5 rounded-2xl bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSendingCode ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending Verification Code...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Send 6-Digit Login Code</span>
                    </>
                  )}
                </button>

                {/* Google OAuth Option */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const session: UserSession = {
                        email: 'alexander.vance.oauth@gmail.com',
                        name: 'Alexander Vance (Google)',
                        tier: 'VIP Platinum Member',
                        points: 4950,
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                        loggedInAt: new Date().toISOString(),
                        role: 'customer',
                        authMethod: 'google_oauth'
                      };
                      localStorage.setItem('letoile_user_session', JSON.stringify(session));
                      onLoginSuccess(session);
                      setStep('success');
                    }}
                    className="w-full py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs transition-all flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Sign in with Google OAuth</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-center my-2">
                  <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
                  <span className="bg-white dark:bg-zinc-900 px-3 text-[10px] text-zinc-400 uppercase tracking-widest font-bold shrink-0">
                    Or Email & OTP Code
                  </span>
                </div>

                {/* Quick Demo Shortcuts */}
                <div className="pt-2 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block text-center">
                    Quick Role-Based Accounts
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('a.vance@techcap.com', 'Alexander Vance (Customer)', 'customer')}
                      className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-left hover:border-amber-500 transition-colors"
                    >
                      <div className="font-bold text-zinc-900 dark:text-white truncate text-[11px]">Customer Profile</div>
                      <div className="text-[10px] text-amber-500 font-semibold">a.vance@techcap.com</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin('admin.pos@letoile.com', 'Chef Antoine (Manager)', 'manager')}
                      className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-left hover:border-amber-500 transition-colors"
                    >
                      <div className="font-bold text-zinc-900 dark:text-white truncate text-[11px]">Restaurant Manager</div>
                      <div className="text-[10px] text-purple-400 font-semibold">Role: Admin POS</div>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Step 2: Verification Code Input */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="text-center space-y-1">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    We've generated a 6-digit access code for <strong className="text-amber-500">{email}</strong>.
                  </p>
                  <p className="text-[11px] text-emerald-500 font-bold bg-emerald-500/10 py-1 rounded-lg">
                    ✨ Demo Code Auto-Filled: 888999
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => {
                        const newCode = [...otpCode];
                        newCode[idx] = e.target.value;
                        setOtpCode(newCode);
                      }}
                      className="w-11 h-12 text-center text-lg font-serif font-bold rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  ))}
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-500 font-semibold text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authenticating Session...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Access Account</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="w-full text-center text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-semibold"
                >
                  Change Email Address
                </button>
              </form>
            )}

            {/* Step 3: Success Banner */}
            {step === 'success' && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                    Authentication Successful!
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Welcome back, {currentUser?.name}. Your reservation forms will now auto-fill.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-2xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                >
                  Continue to L'Étoile
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
