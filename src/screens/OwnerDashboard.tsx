import React, { useState } from 'react';
import { ScreenId, OwnerSpaceListing, OwnerBookingSummary, UserSession } from '../types.ts';
import { SpotIQLogo } from '../components/SpotIQLogo.tsx';

interface OwnerDashboardProps {
  onNavigate: (screen: ScreenId) => void;
  userSession: UserSession | null;
  ownerListings: OwnerSpaceListing[];
  onToggleListingStatus: (listingId: string) => void;
  onSignOut: () => void;
}

const INITIAL_BOOKING_SUMMARIES: OwnerBookingSummary[] = [
  {
    id: 'res-8821',
    spaceTitle: 'Gokulam Green View Driveway',
    vehiclePlate: 'KA-09-MA-7120',
    driverName: 'Vikram Joshi (Creta EV)',
    slotCode: 'BAY-1',
    startTime: 'Today, 01:15 PM',
    durationHours: 2,
    earnings: 70,
    status: 'active',
  },
  {
    id: 'res-8820',
    spaceTitle: 'Palace South Gate Host Plot',
    vehiclePlate: 'KA-09-Z-4412',
    driverName: 'Pooja R (Nexon)',
    slotCode: 'BAY-A',
    startTime: 'Today, 11:30 AM',
    durationHours: 3,
    earnings: 90,
    status: 'completed',
  },
  {
    id: 'res-8819',
    spaceTitle: 'Gokulam Green View Driveway',
    vehiclePlate: 'KA-09-EQ-1090',
    driverName: 'Anil K (Ather 450X)',
    slotCode: 'EV-2',
    startTime: 'Today, 10:00 AM',
    durationHours: 4,
    earnings: 160,
    status: 'completed',
  },
];

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  onNavigate,
  userSession,
  ownerListings,
  onToggleListingStatus,
  onSignOut,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalEarnings = INITIAL_BOOKING_SUMMARIES.reduce((acc, curr) => acc + curr.earnings, 0) + 1200;
  const activeSpacesCount = ownerListings.filter((s) => s.status === 'active').length;
  const totalBays = ownerListings.reduce((acc, curr) => acc + curr.totalBays, 0);

  const handleToggle = (id: string, currentStatus: string) => {
    onToggleListingStatus(id);
    setToastMessage(
      currentStatus === 'active'
        ? 'Space listing paused. Drivers will not see this slot until re-opened.'
        : 'Space listing is now LIVE and discoverable on Mysuru Smart City.'
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredBookings = filterStatus === 'all'
    ? INITIAL_BOOKING_SUMMARIES
    : INITIAL_BOOKING_SUMMARIES.filter((b) => b.status === filterStatus);

  return (
    <div className="min-h-screen bg-[#080B10] text-[#e1e2ea] px-4 py-5 max-w-md mx-auto relative pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#00e5ff]/10 blur-3xl pointer-events-none" />

      {/* Top Header & Host Profile */}
      <header className="flex items-center justify-between pb-4 border-b border-[#272a30]">
        <div className="flex items-center gap-3">
          <SpotIQLogo size="sm" showWordmark={false} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white truncate max-w-[170px]">
                {userSession?.name || 'Host Dashboard'}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#00e5ff]/15 text-[#00e5ff] text-[9px] font-bold uppercase tracking-wider border border-[#00e5ff]/30">
                Owner
              </span>
            </div>
            <p className="text-[11px] text-[#849396]">{userSession?.email || 'host@mysuru-parking.com'}</p>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={onSignOut}
          title="Sign out of host portal"
          className="px-2.5 py-1.5 rounded-xl bg-[#191c21] hover:bg-[#272a30] text-[#ff5964] text-xs font-semibold border border-white/5 transition-colors flex items-center gap-1 active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </header>

      {/* Live Toast Alert */}
      {toastMessage && (
        <div className="mt-3 p-2.5 rounded-xl bg-[#121f00] text-[#7CFF65] border border-[#7CFF65]/40 text-xs font-semibold flex items-center justify-between animate-slide-down">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7CFF65] animate-ping" />
            <span>{toastMessage}</span>
          </div>
          <button type="button" onClick={() => setToastMessage(null)} className="p-0.5 hover:opacity-75">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Earnings & Occupancy KPI Cards */}
      <section className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#849396]">
            Monetization & Occupancy
          </h2>
          <span className="text-[11px] font-semibold text-[#7CFF65] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#7CFF65] animate-pulse" />
            Demo Metrics
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Total Revenue */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#13171f] to-[#0d1017] border border-[#272a30]">
            <div className="flex items-center justify-between text-[#849396]">
              <span className="text-[11px] font-semibold">Today's Earnings</span>
              <span className="material-symbols-outlined text-[#7CFF65] text-[18px]">payments</span>
            </div>
            <div className="text-2xl font-extrabold text-white mt-1">₹{totalEarnings}</div>
            <div className="text-[10px] text-[#7CFF65] font-semibold mt-1 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>
              +18% vs yesterday
            </div>
          </div>

          {/* Card 2: Occupancy Rate */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#13171f] to-[#0d1017] border border-[#272a30]">
            <div className="flex items-center justify-between text-[#849396]">
              <span className="text-[11px] font-semibold">Active Bays</span>
              <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">local_parking</span>
            </div>
            <div className="text-2xl font-extrabold text-[#7CFF65] mt-1">{totalBays} Bays</div>
            <div className="text-[10px] text-[#849396] font-medium mt-1">
              Across {activeSpacesCount} active properties
            </div>
          </div>
        </div>
      </section>

      {/* MY PARKING SPACES LIST */}
      <section className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#849396]">
            My Listed Spaces ({ownerListings.length})
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('owner-onboarding')}
            className="text-xs font-bold text-[#7CFF65] hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Add New Space</span>
          </button>
        </div>

        {ownerListings.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#13171f] border border-dashed border-[#272a30] text-center space-y-3">
            <span className="material-symbols-outlined text-[#849396] text-[36px]">garage</span>
            <p className="text-xs text-[#bac9cc]">You haven't listed any spaces yet.</p>
            <button
              type="button"
              onClick={() => onNavigate('owner-onboarding')}
              className="px-4 py-2 rounded-xl bg-[#7CFF65] text-[#080B10] font-bold text-xs shadow-lg inline-flex items-center gap-1.5"
            >
              <span>Start Space Onboarding</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {ownerListings.map((space) => {
              const isActive = space.status === 'active';
              return (
                <div
                  key={space.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${isActive
                      ? 'bg-[#13171f] border-[#272a30] hover:border-[#7CFF65]/50'
                      : 'bg-[#0f1218] border-white/5 opacity-70'
                    }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#7CFF65] animate-pulse' : 'bg-[#849396]'
                            }`}
                        />
                        <span className="text-[10px] uppercase font-bold text-[#849396]">
                          {space.spaceType}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${isActive
                              ? 'bg-[#7CFF65]/15 text-[#7CFF65] border border-[#7CFF65]/30'
                              : 'bg-white/5 text-[#849396]'
                            }`}
                        >
                          {isActive ? 'Live on Grid' : 'Paused'}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1.5">{space.propertyTitle}</h3>
                      <p className="text-xs text-[#849396] mt-0.5">{space.address}, {space.city}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-extrabold text-[#7CFF65]">₹{space.ratePerHour}/hr</div>
                      {space.dailyFlatRate && (
                        <div className="text-[10px] text-[#849396]">₹{space.dailyFlatRate}/day</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[11px] text-[#bac9cc]">
                      <span className="font-semibold text-white">{space.totalBays} Bays</span>
                      <span>•</span>
                      <span>{space.operatingHours}</span>
                      {space.hasEvCharging && (
                        <>
                          <span>•</span>
                          <span className="text-[#00e5ff] font-semibold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[13px]">bolt</span>
                            EV
                          </span>
                        </>
                      )}
                    </div>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggle(space.id, space.status)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border ${isActive
                          ? 'bg-[#1f242e] hover:bg-[#281418] text-[#ff5964] border-white/10'
                          : 'bg-[#7CFF65]/20 text-[#7CFF65] border-[#7CFF65]/40'
                        }`}
                    >
                      {isActive ? 'Pause Listing' : 'Activate'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* RECENT BOOKING TELEMETRY */}
      <section className="mt-7 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#849396]">
            Driver Activity & Pass Payouts
          </h2>
          <div className="flex items-center gap-1 bg-[#13171f] p-0.5 rounded-lg border border-[#272a30]">
            {(['all', 'active', 'completed'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold capitalize transition-all ${filterStatus === st ? 'bg-[#7CFF65] text-[#080B10]' : 'text-[#849396]'
                  }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          {filteredBookings.map((bk) => (
            <div
              key={bk.id}
              className="p-3.5 rounded-xl bg-[#13171f] border border-[#272a30] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${bk.status === 'active'
                    ? 'bg-[#7CFF65]/20 text-[#7CFF65] border border-[#7CFF65]/40'
                    : 'bg-[#191c21] text-[#849396]'
                  }`}>
                  <span className="material-symbols-outlined text-[18px]">
                    {bk.status === 'active' ? 'directions_car' : 'check_circle'}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{bk.driverName}</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#1f242e] text-[9px] text-[#849396] font-mono">
                      {bk.vehiclePlate}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#849396] mt-0.5 flex items-center gap-2">
                    <span>{bk.slotCode}</span>
                    <span>•</span>
                    <span>{bk.startTime}</span>
                    <span>•</span>
                    <span>{bk.durationHours} hrs</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-extrabold text-[#7CFF65] text-sm">+₹{bk.earnings}</div>
                <span className={`text-[9px] font-bold uppercase ${bk.status === 'active' ? 'text-[#7CFF65]' : 'text-[#849396]'
                  }`}>
                  {bk.status === 'active' ? 'Parked Now' : 'Paid Out'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Bottom Quick Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#080B10]/95 backdrop-blur-md border-t border-[#272a30] p-3">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('owner-onboarding')}
            className="flex-1 h-11 rounded-xl bg-[#7CFF65] hover:bg-[#6ee658] text-[#080B10] font-bold text-xs shadow-[0_0_15px_rgba(124,255,101,0.3)] transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add_business</span>
            <span>List Another Space</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('journey')}
            className="px-3 h-11 rounded-xl bg-[#191c21] hover:bg-[#272a30] text-[#00e5ff] font-semibold text-xs border border-white/10 transition-colors flex items-center gap-1 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">explore</span>
            <span>Driver View</span>
          </button>
        </div>
      </div>
    </div>
  );
};
