import React, { useState } from 'react';
import { ScreenId, UserSession } from '../types.ts';
import { SpotIQLogo } from '../components/SpotIQLogo.tsx';
import { InputField } from '../components/InputField.tsx';
import {
  validateIdentifier,
  validatePassword,
  validateRegistrationForm,
  RegistrationFields,
} from '../utils/authValidation.ts';

interface OwnerAuthProps {
  onNavigate: (screen: ScreenId) => void;
  onLoginSuccess: (session: UserSession) => void;
  hasExistingListings?: boolean;
}

export const OwnerAuth: React.FC<OwnerAuthProps> = ({
  onNavigate,
  onLoginSuccess,
  hasExistingListings = false,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  // Sign In State
  const [signInIdentifier, setSignInIdentifier] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInErrors, setSignInErrors] = useState<{ identifier?: string; password?: string }>({});

  // Registration State
  const [regFields, setRegFields] = useState<RegistrationFields>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [regErrors, setRegErrors] = useState<Partial<Record<keyof RegistrationFields, string>>>({});

  // Feedback State
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick Demo Auto-fill Helper
  const handleAutofillDemo = () => {
    if (authMode === 'signin') {
      setSignInIdentifier('host.suresh@mysuru-parking.com');
      setSignInPassword('hostSpot2026');
      setSignInErrors({});
      setFeedback({
        type: 'info',
        message: 'Pre-filled demo space owner credentials: host.suresh@mysuru-parking.com',
      });
    } else {
      setRegFields({
        fullName: 'Suresh Gowda',
        email: 'suresh.gowda@palace-parking.in',
        phone: '9900112233',
        password: 'secureHost123',
        confirmPassword: 'secureHost123',
      });
      setRegErrors({});
      setFeedback({
        type: 'info',
        message: 'Pre-filled demo space owner registration details.',
      });
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const identCheck = validateIdentifier(signInIdentifier);
    const pwdCheck = validatePassword(signInPassword);

    const errors: { identifier?: string; password?: string } = {};
    if (!identCheck.isValid) errors.identifier = identCheck.error;
    if (!pwdCheck.isValid) errors.password = pwdCheck.error;

    setSignInErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback({
        type: 'success',
        message: 'Host verification successful! Loading space management portal...',
      });

      setTimeout(() => {
        onLoginSuccess({
          role: 'owner',
          name: signInIdentifier.includes('@')
            ? signInIdentifier.split('@')[0].replace(/[._]/g, ' ')
            : 'Host Suresh',
          email: signInIdentifier.includes('@') ? signInIdentifier : 'host.suresh@mysuru-parking.com',
          phone: !signInIdentifier.includes('@') ? signInIdentifier : '+91 99001 12233',
          isAuthenticated: true,
        });

        // Navigate to dashboard if has listings, or directly to onboarding
        if (hasExistingListings) {
          onNavigate('owner-dashboard');
        } else {
          onNavigate('owner-onboarding');
        }
      }, 700);
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const result = validateRegistrationForm(regFields);
    setRegErrors(result.errors);

    if (!result.isValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback({
        type: 'success',
        message: `Welcome, ${regFields.fullName}! Starting your space listing onboarding...`,
      });

      setTimeout(() => {
        onLoginSuccess({
          role: 'owner',
          name: regFields.fullName,
          email: regFields.email,
          phone: regFields.phone,
          isAuthenticated: true,
        });
        onNavigate('owner-onboarding');
      }, 750);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-[#e1e2ea] flex flex-col justify-between px-4 py-6 max-w-md mx-auto relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-[#00e5ff]/10 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="z-10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('welcome')}
            className="inline-flex items-center gap-1.5 text-xs text-[#849396] hover:text-white transition-colors font-medium py-1 px-2 -ml-2 rounded-lg"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Role Selection</span>
          </button>

          <span className="px-2.5 py-1 rounded-full bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping" />
            Host / Space Owner
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center text-center">
          <SpotIQLogo size="md" subtitle="Host Monetization Portal" />
          <h1 className="text-2xl font-bold text-white mt-4 tracking-tight">
            {authMode === 'signin' ? 'Welcome back, Space Host' : 'Monetize Your Parking Space'}
          </h1>
          <p className="text-xs text-[#bac9cc] mt-1 max-w-xs">
            {authMode === 'signin'
              ? 'Preview sample private-bay listings, pricing, slot status, and earnings.'
              : 'Create a demo listing for a driveway, garage, or commercial parking space.'}
          </p>
        </div>

        {/* Tab Toggle: Sign In vs Register */}
        <div className="mt-6 p-1 rounded-xl bg-[#13171f] border border-[#272a30] grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signin');
              setFeedback(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${authMode === 'signin'
                ? 'bg-[#00e5ff] text-[#080B10] shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                : 'text-[#849396] hover:text-white'
              }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setFeedback(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${authMode === 'register'
                ? 'bg-[#00e5ff] text-[#080B10] shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                : 'text-[#849396] hover:text-white'
              }`}
          >
            Host Registration
          </button>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="my-6 z-10 flex-1">
        {/* Banner Feedback Toast */}
        {feedback && (
          <div
            className={`mb-4 p-3 rounded-xl border text-xs font-medium flex items-start gap-2 animate-fadeIn ${feedback.type === 'success'
                ? 'bg-[#002228] text-[#00e5ff] border-[#00e5ff]/40 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                : feedback.type === 'error'
                  ? 'bg-[#281418] text-[#ff5964] border-[#ff5964]/40'
                  : 'bg-[#13171f] text-[#7CFF65] border-[#7CFF65]/30'
              }`}
          >
            <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">
              {feedback.type === 'success' ? 'check_circle' : feedback.type === 'error' ? 'error' : 'info'}
            </span>
            <div className="flex-1">{feedback.message}</div>
          </div>
        )}

        {/* SIGN IN FORM */}
        {authMode === 'signin' ? (
          <form onSubmit={handleSignInSubmit} className="space-y-4" noValidate>
            <InputField
              label="Email or Host Mobile"
              icon="real_estate_agent"
              placeholder="e.g. host@mysuru-parking.com"
              value={signInIdentifier}
              onChange={(e) => {
                setSignInIdentifier(e.target.value);
                if (signInErrors.identifier) setSignInErrors((prev) => ({ ...prev, identifier: undefined }));
              }}
              error={signInErrors.identifier}
              autoComplete="username"
            />

            <div>
              <InputField
                label="Host Password"
                icon="lock"
                isPassword
                placeholder="Enter host password"
                value={signInPassword}
                onChange={(e) => {
                  setSignInPassword(e.target.value);
                  if (signInErrors.password) setSignInErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={signInErrors.password}
                autoComplete="current-password"
              />

              <div className="flex justify-end mt-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setFeedback({
                      type: 'info',
                      message: 'Demo Prototype Note: Use "Fill Demo Host Credentials" to log into the host portal.',
                    })
                  }
                  className="text-[11px] text-[#00e5ff] hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-[#00e5ff] hover:bg-[#00cbe3] text-[#080B10] font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  <span>Verifying Host Portal...</span>
                </>
              ) : (
                <>
                  <span>Sign In as Space Owner</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5" noValidate>
            <InputField
              label="Host Full Name"
              icon="badge"
              placeholder="e.g. Suresh Gowda"
              value={regFields.fullName}
              onChange={(e) => {
                setRegFields((p) => ({ ...p, fullName: e.target.value }));
                if (regErrors.fullName) setRegErrors((p) => ({ ...p, fullName: undefined }));
              }}
              error={regErrors.fullName}
              autoComplete="name"
            />

            <InputField
              label="Email Address"
              icon="mail"
              type="email"
              placeholder="suresh@example.com"
              value={regFields.email}
              onChange={(e) => {
                setRegFields((p) => ({ ...p, email: e.target.value }));
                if (regErrors.email) setRegErrors((p) => ({ ...p, email: undefined }));
              }}
              error={regErrors.email}
              autoComplete="email"
            />

            <InputField
              label="Phone Number"
              icon="call"
              type="tel"
              placeholder="10-digit primary phone"
              value={regFields.phone}
              onChange={(e) => {
                setRegFields((p) => ({ ...p, phone: e.target.value }));
                if (regErrors.phone) setRegErrors((p) => ({ ...p, phone: undefined }));
              }}
              error={regErrors.phone}
              autoComplete="tel"
            />

            <InputField
              label="Password"
              icon="lock"
              isPassword
              helperText="Min. 6 chars"
              placeholder="Create secure host password"
              value={regFields.password}
              onChange={(e) => {
                setRegFields((p) => ({ ...p, password: e.target.value }));
                if (regErrors.password) setRegErrors((p) => ({ ...p, password: undefined }));
              }}
              error={regErrors.password}
              autoComplete="new-password"
            />

            <InputField
              label="Confirm Password"
              icon="verified_user"
              isPassword
              placeholder="Repeat your password"
              value={regFields.confirmPassword}
              onChange={(e) => {
                setRegFields((p) => ({ ...p, confirmPassword: e.target.value }));
                if (regErrors.confirmPassword) setRegErrors((p) => ({ ...p, confirmPassword: undefined }));
              }}
              error={regErrors.confirmPassword}
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-[#00e5ff] hover:bg-[#00cbe3] text-[#080B10] font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  <span>Registering Host...</span>
                </>
              ) : (
                <>
                  <span>Create Host Account & List Space</span>
                  <span className="material-symbols-outlined text-[18px]">add_business</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Demo Fast-Track Action */}
        <div className="mt-5 pt-4 border-t border-[#272a30]">
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="w-full py-2.5 px-3 rounded-xl bg-[#13171f] hover:bg-[#1a202c] border border-dashed border-[#00e5ff]/50 text-xs font-semibold text-[#00e5ff] flex items-center justify-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Fill Demo Host Credentials</span>
          </button>
        </div>
      </div>

      {/* Footer Switcher */}
      <footer className="z-10 text-center space-y-2 pt-2 border-t border-white/5">
        <p className="text-xs text-[#849396]">
          Looking to park your car?{' '}
          <button
            type="button"
            onClick={() => onNavigate('driver-auth')}
            className="text-[#7CFF65] font-semibold hover:underline"
          >
            Switch to Driver Portal
          </button>
        </p>
        <p className="text-[10px] text-[#849396]/60">
          Demo Prototype: Authenticates simulated host sessions for testing.
        </p>
      </footer>
    </div>
  );
};
