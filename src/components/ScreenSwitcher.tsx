import React, { useState } from 'react';
import { ScreenId, UserSession } from '../types.ts';

interface ScreenSwitcherProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onSimulateSensorChange?: () => void;
  availableCount: number;
  totalCount: number;
  userSession?: UserSession | null;
  onSignOut?: () => void;
}

interface ScreenGroup {
  groupName: string;
  items: { id: ScreenId; label: string; icon: string; badge?: string }[];
}

const SCREEN_GROUPS: ScreenGroup[] = [
  {
    groupName: 'Authentication & Roles',
    items: [
      { id: 'welcome', label: 'Welcome & Role Selection', icon: 'hub', badge: 'Entry' },
      { id: 'driver-auth', label: 'Driver Sign In / Register', icon: 'directions_car', badge: 'Driver' },
      { id: 'owner-auth', label: 'Space Owner Sign In', icon: 'real_estate_agent', badge: 'Host' },
    ],
  },
  {
    groupName: 'Driver Smart Parking',
    items: [
      { id: 'journey', label: 'Connected Journey Flow', icon: 'map' },
      { id: 'slot-select', label: 'Select a Parking Slot', icon: 'grid_view' },
      { id: 'parking-details', label: 'Parking Details & Tariffs', icon: 'info' },
      { id: 'booking-confirmation', label: 'Booking Confirmation & Pass', icon: 'receipt_long' },
      { id: 'active-journey', label: 'Active Wayfinding Navigation', icon: 'navigation' },
      { id: 'my-bookings', label: 'My Bookings & Passes', icon: 'confirmation_number' },
      { id: 'driver-companion', label: 'Unified Driver Companion HUD', icon: 'electric_bolt' },
      { id: 'prototype-reel', label: 'Interactive Prototype Reel', icon: 'smart_display' },
    ],
  },
  {
    groupName: 'Space Owner Portal',
    items: [
      { id: 'owner-onboarding', label: 'Space Host Onboarding (6 Steps)', icon: 'add_business', badge: 'New' },
      { id: 'owner-dashboard', label: 'Owner Dashboard & Earnings', icon: 'dashboard', badge: 'Host' },
    ],
  },
];

const ALL_SCREENS = SCREEN_GROUPS.flatMap((g) => g.items);

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onNavigate,
  onSimulateSensorChange,
  availableCount,
  totalCount,
  userSession,
  onSignOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentItem = ALL_SCREENS.find((s) => s.id === currentScreen) || ALL_SCREENS[0];

  return (
    <div className="w-full z-50 bg-[#080B10] border-b border-[#272a30] text-xs">
      {/* Top Banner Navigation Bar */}
      <div className="px-3 py-1.5 flex items-center justify-between gap-2 bg-[#101319]/90 backdrop-blur-md">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#7CFF65] animate-pulse shrink-0" />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#191c21] hover:bg-[#272a30] text-[#e1e2ea] border border-white/10 transition-colors font-medium truncate"
          >
            <span className="material-symbols-outlined text-[16px] text-[#7CFF65]">{currentItem.icon}</span>
            <span className="truncate font-semibold">{currentItem.label}</span>
            <span className="material-symbols-outlined text-[14px] text-[#849396]">
              {isOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>

        {/* User Session Pill & Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Active User Session Role Badge */}
          {userSession?.isAuthenticated ? (
            <div className="flex items-center gap-1.5 pl-1.5 pr-2 py-0.5 rounded-full bg-[#191c21] border border-white/10">
              <span
                className={`w-2 h-2 rounded-full ${userSession.role === 'driver' ? 'bg-[#7CFF65]' : 'bg-[#00e5ff]'
                  }`}
              />
              <span className="text-[10px] font-bold text-white uppercase truncate max-w-[70px] sm:max-w-[100px]">
                {userSession.name.split(' ')[0]}
              </span>
              <span
                className={`text-[9px] font-bold uppercase px-1 rounded ${userSession.role === 'driver'
                  ? 'bg-[#7CFF65]/20 text-[#7CFF65]'
                  : 'bg-[#00e5ff]/20 text-[#00e5ff]'
                  }`}
              >
                {userSession.role}
              </span>
              {onSignOut && (
                <button
                  type="button"
                  onClick={onSignOut}
                  title="Sign Out"
                  className="ml-1 text-[#ff5964] hover:text-white p-0.5 flex items-center"
                >
                  <span className="material-symbols-outlined text-[13px]">logout</span>
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('welcome')}
              className="px-2 py-0.5 rounded-full bg-[#7CFF65]/15 text-[#7CFF65] border border-[#7CFF65]/30 text-[10px] font-bold"
            >
              Role Select
            </button>
          )}

          {/* Local slot availability summary */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#191c21] border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#7CFF65] shadow-[0_0_6px_#7CFF65]" />
            <span className="text-[#7CFF65] font-bold text-[11px]">{availableCount}</span>
            <span className="text-[#849396] text-[10px]">/ {totalCount} free</span>
          </div>

          {/* Quick Sensor Simulator Trigger */}
          {onSimulateSensorChange && (
            <button
              type="button"
              onClick={onSimulateSensorChange}
              title="Simulate local demo slot-status changes"
              className="hidden xs:flex items-center gap-1 px-2 py-1 rounded-full bg-[#7CFF65]/15 text-[#7CFF65] hover:bg-[#7CFF65]/25 border border-[#7CFF65]/30 transition-all font-semibold active:scale-95"
            >
              <span className="material-symbols-outlined text-[13px] animate-spin">sensors</span>
              <span className="text-[9px] uppercase font-bold tracking-wider">Simulate</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-2 py-1 rounded-md bg-[#272a30] text-[#7CFF65] font-semibold text-[11px] hover:bg-[#32353b]"
          >
            {isOpen ? 'Close' : 'Screens'}
          </button>
        </div>
      </div>

      {/* Expanded Categorized Screen Drawer */}
      {isOpen && (
        <div className="p-3 bg-[#0b0e13] border-t border-[#272a30] space-y-3 shadow-2xl max-h-[80vh] overflow-y-auto">
          {SCREEN_GROUPS.map((group) => (
            <div key={group.groupName} className="space-y-1.5">
              <div className="text-[10px] uppercase font-extrabold tracking-wider text-[#849396] px-1">
                {group.groupName}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
                {group.items.map((screen) => {
                  const isActive = screen.id === currentScreen;
                  return (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => {
                        onNavigate(screen.id);
                        setIsOpen(false);
                      }}
                      className={`flex items-center justify-between p-2 rounded-xl text-left transition-all ${isActive
                        ? 'bg-[#7CFF65]/15 border border-[#7CFF65] text-[#7CFF65] shadow-[0_0_12px_rgba(124,255,101,0.2)]'
                        : 'bg-[#191c21] hover:bg-[#272a30] border border-white/5 text-[#bac9cc] hover:text-[#e1e2ea]'
                        }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isActive
                            ? 'bg-[#7CFF65] text-[#080B10]'
                            : 'bg-[#272a30] text-[#bac9cc]'
                            }`}
                        >
                          <span className="material-symbols-outlined text-[15px]">{screen.icon}</span>
                        </div>
                        <span className="font-semibold text-xs truncate">{screen.label}</span>
                      </div>
                      {screen.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-white/10 text-[#849396]">
                          {screen.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
