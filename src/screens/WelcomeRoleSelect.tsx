import React from 'react';
import { ScreenId } from '../types.ts';
import { SpotIQLogo } from '../components/SpotIQLogo.tsx';

interface WelcomeRoleSelectProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectRole: (role: 'driver' | 'owner') => void;
}

export const WelcomeRoleSelect: React.FC<WelcomeRoleSelectProps> = ({
  onNavigate,
  onSelectRole,
}) => {
  const handleSelect = (role: 'driver' | 'owner') => {
    onSelectRole(role);
    if (role === 'driver') {
      onNavigate('driver-auth');
    } else {
      onNavigate('owner-auth');
    }
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-[#e1e2ea] flex flex-col justify-between px-4 py-6 sm:py-8 max-w-md mx-auto relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#7CFF65]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#00e5ff]/5 blur-3xl pointer-events-none" />

      {/* Top Branding Section */}
      <header className="flex flex-col items-center text-center pt-4 sm:pt-8 z-10">
        <SpotIQLogo size="lg" subtitle="Mysuru Smart Mobility" />

        <div className="mt-8 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Parking made <span className="text-[#7CFF65]">smarter.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#bac9cc] font-medium max-w-xs mx-auto">
            Find your spot or earn from the space you own.
          </p>
        </div>

        {/* Live Smart City Telemetry Indicator Tag */}
        <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#13171f] border border-[#272a30]">
          <span className="w-2 h-2 rounded-full bg-[#7CFF65] animate-ping" />
          <span className="text-xs font-semibold text-[#7CFF65]">
            Mysuru Smart City Network Active
          </span>
        </div>
      </header>

      {/* Two Prominent Role Selection Cards */}
      <main className="my-8 space-y-4 z-10">
        <div className="text-xs font-bold uppercase tracking-wider text-[#849396] text-center mb-1">
          Choose How You Want to Continue
        </div>

        {/* 1. Driver Card */}
        <button
          type="button"
          onClick={() => handleSelect('driver')}
          className="w-full text-left p-5 rounded-2xl bg-gradient-to-b from-[#13171f] to-[#0d1017] border border-[#272a30] hover:border-[#7CFF65] transition-all duration-300 group hover:shadow-[0_0_25px_rgba(124,255,101,0.22)] active:scale-[0.98] relative overflow-hidden"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-xl bg-[#7CFF65]/15 border border-[#7CFF65]/30 flex items-center justify-center text-[#7CFF65] group-hover:scale-105 transition-transform shrink-0">
                <span className="material-symbols-outlined text-[28px]">directions_car</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white group-hover:text-[#7CFF65] transition-colors">
                    Find Parking
                  </h2>
                  <span className="px-2 py-0.5 rounded-md bg-[#7CFF65]/20 text-[#7CFF65] font-bold text-[10px] tracking-wide uppercase border border-[#7CFF65]/30">
                    Driver
                  </span>
                </div>
                <p className="text-xs text-[#bac9cc] mt-1 leading-relaxed">
                  Demo bay availability, indoor directions & sample digital pass.
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1f242e] group-hover:bg-[#7CFF65] group-hover:text-[#080B10] flex items-center justify-center text-[#849396] transition-all shrink-0 mt-1">
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </div>
          </div>

          {/* Quick Perks Pill */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-3 text-[11px] text-[#849396]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#7CFF65]">bolt</span>
              EV Fast Charge
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#7CFF65]">sensors</span>
              IoT Telemetry
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#7CFF65]">contactless</span>
              UPI Pass
            </span>
          </div>
        </button>

        {/* 2. Space Owner Card */}
        <button
          type="button"
          onClick={() => handleSelect('owner')}
          className="w-full text-left p-5 rounded-2xl bg-gradient-to-b from-[#13171f] to-[#0d1017] border border-[#272a30] hover:border-[#7CFF65] transition-all duration-300 group hover:shadow-[0_0_25px_rgba(124,255,101,0.22)] active:scale-[0.98] relative overflow-hidden"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-xl bg-[#00e5ff]/15 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] group-hover:scale-105 transition-transform shrink-0">
                <span className="material-symbols-outlined text-[28px]">real_estate_agent</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white group-hover:text-[#7CFF65] transition-colors">
                    Earn with Your Space
                  </h2>
                  <span className="px-2 py-0.5 rounded-md bg-[#00e5ff]/20 text-[#00e5ff] font-bold text-[10px] tracking-wide uppercase border border-[#00e5ff]/30">
                    Host
                  </span>
                </div>
                <p className="text-xs text-[#bac9cc] mt-1 leading-relaxed">
                  Monetize your driveway, garage, or commercial bay with automated payouts.
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1f242e] group-hover:bg-[#7CFF65] group-hover:text-[#080B10] flex items-center justify-center text-[#849396] transition-all shrink-0 mt-1">
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </div>
          </div>

          {/* Quick Perks Pill */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-3 text-[11px] text-[#849396]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#00e5ff]">payments</span>
              Instant Payouts
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#00e5ff]">schedule</span>
              Flexible Hours
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#00e5ff]">verified</span>
              Smart City Verified
            </span>
          </div>
        </button>
      </main>

      {/* Footer & Demo Bypass */}
      <footer className="z-10 text-center space-y-3 pt-2">
        <div className="flex items-center justify-center gap-2 text-xs text-[#849396]">
          <span>Already have demo access?</span>
          <button
            type="button"
            onClick={() => onNavigate('journey')}
            className="text-[#7CFF65] hover:underline font-semibold"
          >
            Direct Prototype View →
          </button>
        </div>

        <p className="text-[11px] text-[#849396]/70 leading-relaxed max-w-xs mx-auto">
          SpotIQ Smart Parking is a connected mobility initiative for Mysuru Smart City.
        </p>
      </footer>
    </div>
  );
};
