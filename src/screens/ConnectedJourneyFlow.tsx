import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { ParkingSlot } from '../utils/parkingRules.ts';

interface ConnectedJourneyFlowProps {
  onNavigate: (screen: ScreenId) => void;
  slots: ParkingSlot[];
  availableSlotsCount: number;
}

export const ConnectedJourneyFlow: React.FC<ConnectedJourneyFlowProps> = ({
  onNavigate,
  availableSlotsCount,
}) => {
  const [activeFilter, setActiveFilter] = useState<'closest' | 'ev' | 'covered' | 'lowest'>('closest');
  const [searchQuery, setSearchQuery] = useState('Mysore Palace East Gate');
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#080B10] text-[#e1e2ea] relative pb-20">
      {/* Fixed Header */}
      <header className="sticky top-0 w-full z-40 bg-[#080B10]/95 backdrop-blur-xl border-b border-[#272a30]/60 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => onNavigate('journey')}>
              <div className="w-8 h-8 rounded-xl bg-[#00e5ff] flex items-center justify-center text-[#001f24] font-black text-sm shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                IQ
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#e1e2ea]">SpotIQ</span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('parking-details')}
              className="flex items-center gap-1 min-h-[40px] px-2.5 py-1 rounded-full bg-[#191c21] hover:bg-[#1d2025] transition-colors text-left border border-white/5"
            >
              <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">near_me</span>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#bac9cc] uppercase tracking-wider font-bold">Palace Hub</span>
                <span className="text-[13px] text-[#e1e2ea] font-semibold flex items-center gap-0.5 leading-tight">
                  Mysuru, KA
                  <span className="material-symbols-outlined text-[15px] text-[#bac9cc]">keyboard_arrow_down</span>
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Notifications"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#191c21] hover:bg-[#1d2025] text-[#e1e2ea] transition-colors relative border border-white/5"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#aff833] ring-2 ring-[#080B10]" />
            </button>
            <button
              type="button"
              aria-label="User Profile"
              onClick={() => onNavigate('my-bookings')}
              className="w-10 h-10 p-0.5 rounded-full flex items-center justify-center focus:outline-none hover:opacity-90 transition-opacity"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#00e5ff]/50"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGRvsXIOJDp9oMBinPRaixXzHoRoqvLlDWpVZaGVVMADqRr-5vz_r82-reMEib9yUk2-4rT1nm6hbCRc1wb53Rz0hFcOf7yE4RCEPC_rxo9cHpK1YFjqH0P67Uu6BMD5SMo2vPADXeL7Kl7h0jcdlswANDcMh0axJAwekG6K47JBGz-Ghj93w4E-EC_elrw7Jh3bYvhR6EJpl3zXQuNFIqvh6LZlQx34b8kQWDwUjFU1dh0yGF4Ydf5w"
              />
            </button>
          </div>
        </div>

        {/* Stepper Switcher Bar */}
        <div className="w-full bg-[#080B10]/95 backdrop-blur-md px-3 py-2 border-b border-[#272a30]/40 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              type="button"
              onClick={() => onNavigate('journey')}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.45)]"
            >
              <span className="w-4 h-4 rounded-full bg-[#080B10] text-[#00e5ff] flex items-center justify-center text-[10px] font-extrabold">1</span>
              <span>Discover & Map</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('parking-details')}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea] border border-white/5"
            >
              <span className="w-4 h-4 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">2</span>
              <span>Spot Details</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('slot-select')}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea] border border-white/5"
            >
              <span className="w-4 h-4 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">3</span>
              <span>Slot B04</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('booking-confirmation')}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea] border border-white/5"
            >
              <span className="w-4 h-4 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">4</span>
              <span>Confirm & Pay</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('active-journey')}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea] border border-white/5"
            >
              <span className="w-4 h-4 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">5</span>
              <span>Fast-Pass</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('my-bookings')}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all bg-[#191c21] text-[#bac9cc] hover:text-[#e1e2ea] border border-white/5"
            >
              <span className="w-4 h-4 rounded-full bg-[#272a30] text-[#bac9cc] flex items-center justify-center text-[10px]">6</span>
              <span>Bookings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full">
        {/* Top Floating Controls */}
        <div className="px-4 pt-3 pb-2 w-full z-20 flex flex-col gap-2">
          {/* Elevated Dark Search Bar */}
          <div className="w-full bg-[#272a30]/95 backdrop-blur-xl rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.65)] p-1.5 flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-2 pl-2 flex-1 min-w-0">
              <span
                className="material-symbols-outlined text-[#00e5ff] text-[22px] shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                search
              </span>
              <div className="flex flex-col min-w-0 flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where to park in Mysuru?"
                  className="bg-transparent text-[#e1e2ea] text-sm font-semibold placeholder:text-[#849396] focus:outline-none w-full truncate"
                />
                <div className="flex items-center gap-1 text-[#bac9cc] text-[10px] uppercase font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#aff833] shrink-0 animate-ping" />
                  <span className="truncate">Mysuru Smart City Live Grid</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 pr-1">
              <button
                type="button"
                aria-label="Voice Search"
                className="w-9 h-9 rounded-full bg-[#32353b] hover:bg-[#36393f] text-[#00e5ff] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[19px]">mic</span>
              </button>
              <button
                type="button"
                aria-label="Filters"
                className="w-9 h-9 rounded-full bg-[#00e5ff] text-[#001f24] flex items-center justify-center shadow-[0_0_14px_rgba(0,229,255,0.4)] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  tune
                </span>
              </button>
            </div>
          </div>

          {/* Quick Location Indicator Pill */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#191c21]/90 backdrop-blur-md shadow-md border border-white/5">
              <span className="material-symbols-outlined text-[#aff833] text-[16px]">fmd_good</span>
              <span className="text-xs font-semibold text-[#e1e2ea]">Near Mysore Palace</span>
              <span className="text-[#849396] text-[10px]">•</span>
              <span className="text-[10px] text-[#aff833] font-bold uppercase">GPS locked</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#080B10]/90 backdrop-blur-md shadow-sm border border-[#aff833]/30">
              <span className="w-2 h-2 rounded-full bg-[#aff833] animate-pulse" />
              <span className="text-[10px] text-[#aff833] font-extrabold uppercase tracking-wider">
                {availableSlotsCount + 30} SPOTS IN 500M
              </span>
            </div>
          </div>
        </div>

        {/* Vector Map Canvas */}
        <div className="relative w-full h-[360px] -mt-10 overflow-hidden bg-[#080B10] select-none">
          <div
            className="w-full h-full bg-cover bg-center brightness-[0.75] contrast-[1.15]"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1O_DeAFm94XP3no__hV7o99eD52BlTEkMwCwX-bVA3ip-PjEHry1M6YdLq4q0KqIrFlGu6jvrQ_LUEcvHThTJGg6Bg5pHvJMvCgHOrOwScsyuqDex8xGjwWUCcKgOhj6qeikqyqTPSS66CLbSChiCrRVCtzur8Sr4r0faGIIQ5RqLDTROno1fieQFxaydclALXnGpQdgn6xJ3hMlo9Tz9gyPZhvkxJPU6CpDWFjCYPJyPht3VB0lA_Q')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#080B10]/80 via-[#080B10]/40 to-[#080B10]" />
            <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none">
              <line stroke="#1f2c38" strokeLinecap="round" strokeWidth="8" x1="20%" x2="80%" y1="10%" y2="85%" />
              <line stroke="#19232f" strokeWidth="6" x1="75%" x2="25%" y1="15%" y2="90%" />
              <line opacity="0.6" stroke="#00e5ff" strokeDasharray="6 8" strokeWidth="2.5" x1="0%" x2="100%" y1="52%" y2="52%" />
            </svg>
            <div className="absolute top-28 left-4 px-2 py-0.5 rounded-full bg-[#080B10]/80 backdrop-blur text-[#849396] text-[10px] font-bold tracking-widest uppercase border border-white/5">
              Sayyaji Rao Rd
            </div>
            <div className="absolute top-44 right-8 px-2 py-0.5 rounded-full bg-[#080B10]/80 backdrop-blur text-[#849396] text-[10px] font-bold tracking-widest uppercase border border-white/5">
              Ashoka Rd
            </div>
          </div>

          {/* Interactive Map Pins Container */}
          <div className="absolute inset-0 pointer-events-none">
            {/* 1. SELECTED PIN: Palace MLCP */}
            <div
              className="absolute top-[46%] left-[45%] -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-auto cursor-pointer z-30 group"
              onClick={() => onNavigate('parking-details')}
            >
              <div className="px-2.5 py-1 rounded-full bg-[#080B10] text-[#c3f5ff] shadow-[0_0_20px_rgba(0,229,255,0.7)] flex items-center gap-1.5 border border-[#00e5ff]/40 group-hover:scale-105 transition-transform">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00E5FF] animate-pulse" />
                <span className="text-[12px] leading-tight text-[#00e5ff] font-extrabold tracking-tight">
                  {availableSlotsCount + 33} spots
                </span>
                <span className="text-[#849396] text-[11px]">•</span>
                <span className="text-[11px] text-[#e1e2ea] font-bold">₹30/hr</span>
              </div>
              <div className="relative flex items-center justify-center -mt-0.5">
                <div className="w-8 h-8 rounded-full bg-[#00e5ff]/20 flex items-center justify-center animate-ping absolute" />
                <div className="w-6 h-6 rounded-full bg-[#00e5ff] flex items-center justify-center shadow-lg shadow-[#00e5ff]/40">
                  <span className="material-symbols-outlined text-[#001f24] text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    local_parking
                  </span>
                </div>
              </div>
              <span className="mt-1 px-1.5 py-0.5 rounded bg-[#080B10]/90 text-[9px] text-[#c3f5ff] tracking-tight uppercase shadow-sm border border-white/5 font-bold">
                Palace MLCP
              </span>
            </div>

            {/* 2. Devaraja Market Pin */}
            <div
              className="absolute top-[28%] left-[24%] -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-auto cursor-pointer z-20"
              onClick={() => onNavigate('slot-select')}
            >
              <div className="px-2 py-0.5 rounded-full bg-[#191c21] text-[#aff833] flex items-center gap-1 shadow-md shadow-black/60 border border-[#aff833]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#aff833]" />
                <span className="text-xs text-[#aff833] font-bold">14 spots</span>
                <span className="text-[#849396] text-[9px]">• ₹20</span>
              </div>
              <div className="w-4 h-4 rounded-full bg-[#aff833]/90 flex items-center justify-center shadow-sm -mt-0.5">
                <span className="material-symbols-outlined text-[#223600] text-[11px]">local_parking</span>
              </div>
            </div>

            {/* 3. Sayyaji Rao Plaza Pin */}
            <div className="absolute top-[22%] right-[18%] -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-auto cursor-pointer z-20">
              <div className="px-2 py-0.5 rounded-full bg-[#191c21] text-[#aff833] flex items-center gap-1 shadow-md shadow-black/60 border border-[#aff833]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#aff833]" />
                <span className="text-xs text-[#aff833] font-bold">22 spots</span>
                <span className="text-[#849396] text-[9px]">• ₹40</span>
              </div>
              <div className="w-4 h-4 rounded-full bg-[#aff833]/90 flex items-center justify-center shadow-sm -mt-0.5">
                <span className="material-symbols-outlined text-[#223600] text-[11px]">local_parking</span>
              </div>
            </div>

            {/* 4. Occupied Bus Stand */}
            <div className="absolute bottom-[36%] right-[22%] -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-auto cursor-pointer z-20 opacity-90">
              <div className="px-2 py-0.5 rounded-full bg-[#191c21] text-[#ff5964] flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5964]" />
                <span className="text-[10px] uppercase text-[#ff5964] font-extrabold">FULL</span>
              </div>
              <div className="w-4 h-4 rounded-full bg-[#ff5964] flex items-center justify-center shadow-sm -mt-0.5">
                <span className="material-symbols-outlined text-white text-[10px]">close</span>
              </div>
            </div>

            {/* User GPS Dot */}
            <div className="absolute top-[68%] left-[38%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-[#00e5ff]/20 animate-ping absolute" />
              <div className="w-4 h-4 rounded-full bg-[#080B10] flex items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]" />
              </div>
            </div>
          </div>

          {/* Floating Controls */}
          <div className="absolute right-4 top-20 flex flex-col gap-2 z-20">
            <button
              type="button"
              aria-label="Recenter GPS"
              className="w-11 h-11 rounded-full bg-[#272a30]/90 backdrop-blur-md text-[#00e5ff] flex items-center justify-center shadow-xl active:scale-95 transition-transform border border-white/10"
            >
              <span className="material-symbols-outlined text-[20px]">my_location</span>
            </button>
            <button
              type="button"
              aria-label="Map Layers"
              className="w-11 h-11 rounded-full bg-[#272a30]/90 backdrop-blur-md text-[#e1e2ea] flex items-center justify-center shadow-xl active:scale-95 transition-transform border border-white/10"
            >
              <span className="material-symbols-outlined text-[20px]">layers</span>
            </button>
          </div>

          {/* Floating Legend */}
          <div className="absolute left-4 bottom-12 z-20 px-3 py-1.5 rounded-full bg-[#080B10]/85 backdrop-blur-md shadow-md flex items-center gap-3 border border-white/5">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_6px_#00E5FF]" />
              <span className="text-[10px] uppercase font-bold text-[#e1e2ea]">Selected</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#aff833]" />
              <span className="text-[10px] uppercase font-bold text-[#e1e2ea]">Available</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ff5964]" />
              <span className="text-[10px] uppercase font-bold text-[#e1e2ea]">Full</span>
            </div>
          </div>
        </div>

        {/* Draggable Bottom Sheet Layer */}
        <div className="relative z-30 -mt-8 rounded-t-3xl bg-[#080B10] shadow-[0_-16px_36px_rgba(0,0,0,0.7)] pt-3 px-4 pb-8 flex flex-col border-t border-[#272a30]/60">
          <div className="w-full flex justify-center pb-2">
            <div className="w-12 h-1.5 rounded-full bg-[#32353b]" />
          </div>

          <div className="flex items-center justify-between pt-1 pb-2">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-[#e1e2ea] tracking-tight">Parking near you</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#272a30] text-[#00e5ff] text-[10px] font-extrabold uppercase">
                4 available
              </span>
            </div>
            <span className="text-[10px] text-[#849396] uppercase tracking-wider font-semibold">Mysuru Central</span>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 pt-0.5">
            <button
              type="button"
              onClick={() => setActiveFilter('closest')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${activeFilter === 'closest'
                  ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.35)] font-bold'
                  : 'bg-[#272a30] text-[#e1e2ea] hover:bg-[#32353b] border border-white/5'
                }`}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                near_me
              </span>
              Closest first
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('ev')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${activeFilter === 'ev'
                  ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.35)] font-bold'
                  : 'bg-[#272a30] text-[#e1e2ea] hover:bg-[#32353b] border border-white/5'
                }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#aff833]">bolt</span>
              EV Fast Charging
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('covered')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${activeFilter === 'covered'
                  ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.35)] font-bold'
                  : 'bg-[#272a30] text-[#e1e2ea] hover:bg-[#32353b] border border-white/5'
                }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#849396]">roofing</span>
              Covered Roof
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('lowest')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${activeFilter === 'lowest'
                  ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.35)] font-bold'
                  : 'bg-[#272a30] text-[#e1e2ea] hover:bg-[#32353b] border border-white/5'
                }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#849396]">payments</span>
              Lowest Price
            </button>
          </div>

          {/* Primary Card: Palace South Gate */}
          <div className="mt-1 rounded-2xl bg-[#1d2025] p-4 flex flex-col gap-3 shadow-lg shadow-black/50 relative overflow-hidden border border-white/5">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00e5ff]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start justify-between gap-3 relative">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#32353b] flex items-center justify-center shrink-0 border border-white/5">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[26px]">garage</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base text-[#e1e2ea] truncate">Palace South Gate MLCP</h3>
                    <span
                      className="material-symbols-outlined text-[#aff833] text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[#bac9cc] text-xs">
                    <span className="flex items-center gap-0.5 text-[#00e5ff] font-semibold">
                      <span className="material-symbols-outlined text-[14px]">directions_walk</span>
                      180m • 3 min walk
                    </span>
                    <span>•</span>
                    <span className="text-[#bac9cc] truncate">Bangalore-Nilgiri Rd</span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl leading-tight text-[#00e5ff] font-extrabold">₹30</div>
                <div className="text-[10px] text-[#849396] uppercase tracking-wider font-semibold">Per Hour</div>
              </div>
            </div>

            {/* Mock availability meter */}
            <div className="flex flex-col gap-1.5 bg-[#080B10]/70 p-3 rounded-xl border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#e1e2ea] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#aff833] shadow-[0_0_8px_#aff833] animate-pulse" />
                  <span className="font-extrabold text-[#aff833]">{availableSlotsCount + 33} stalls left</span>
                  <span className="text-[#849396]">of 120 total</span>
                </span>
                <span className="text-[#849396] text-[10px] uppercase font-bold">68% full</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#32353b] overflow-hidden flex">
                <div
                  className="h-full bg-[#aff833] rounded-full shadow-[0_0_8px_rgba(175,248,51,0.6)] transition-all duration-500"
                  style={{ width: '32%' }}
                />
              </div>
            </div>

            {/* Key Amenities */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-[#32353b] text-[10px] font-bold text-[#e1e2ea] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#00e5ff]">roofing</span>
                Covered Multi-Level
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#32353b] text-[10px] font-bold text-[#e1e2ea] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#aff833]">bolt</span>
                4x 60kW DC Fast EV
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#32353b] text-[10px] font-bold text-[#e1e2ea] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#bac9cc]">shield</span>
                24/7 CCTV & Valet
              </span>
            </div>

            {/* CRITICAL BUTTON MATCHING SPEC: //button[contains(., 'Select Facility')] */}
            <button
              type="button"
              onClick={() => onNavigate('slot-select')}
              className="w-full h-14 rounded-full bg-[#00e5ff] text-[#001f24] font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,229,255,0.45)] active:scale-[0.98] transition-all hover:brightness-110 cursor-pointer"
            >
              <span>Select Facility & View Slots</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>

          {/* Secondary Card: Devaraja Market */}
          <div
            onClick={() => onNavigate('parking-details')}
            className="mt-3 rounded-xl bg-[#191c21] p-3.5 flex items-center justify-between gap-3 active:scale-[0.99] transition-transform cursor-pointer hover:bg-[#1d2025] border border-white/5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#272a30] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#aff833] text-[20px]">local_parking</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-bold text-sm text-[#e1e2ea] truncate">Devaraja Market Underground</h4>
                <div className="flex items-center gap-2 text-[#bac9cc] text-xs">
                  <span>420m • 6 min walk</span>
                  <span>•</span>
                  <span className="text-[#aff833] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#aff833]" />
                    14 spots left
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right">
                <div className="text-sm font-bold text-[#e1e2ea]">
                  ₹20<span className="text-[10px] text-[#849396] font-normal">/hr</span>
                </div>
                <span className="text-[10px] text-[#aff833] font-bold uppercase">Vacant</span>
              </div>
              <span className="material-symbols-outlined text-[#849396] text-[20px]">chevron_right</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[#bac9cc] text-[10px] font-bold uppercase tracking-wider opacity-75">
            <span className="w-1.5 h-1.5 rounded-full bg-[#aff833] animate-pulse" />
            <span>Simulated live feed • Mysore Smart City Grid IoT</span>
          </div>
        </div>
      </main>

      {/* Unified Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-40 bg-[#080B10]/95 backdrop-blur-xl border-t border-[#272a30]/60 shadow-[0_-8px_24px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-around h-16 px-1">
          <button
            type="button"
            onClick={() => onNavigate('journey')}
            className="flex-1 min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors text-[#00e5ff] font-bold"
          >
            <span className="material-symbols-outlined text-[22px]">map</span>
            <span className="text-[11px] tracking-tight">Discover</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('my-bookings')}
            className="flex-1 min-h-[48px] flex flex-col items-center justify-center gap-1 text-[#bac9cc] hover:text-[#e1e2ea] transition-colors"
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">confirmation_number</span>
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-[#aff833] text-[#223600] text-[9px] font-extrabold leading-tight">
                1
              </span>
            </div>
            <span className="text-[11px] tracking-tight font-medium">Bookings</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('active-journey')}
            className="flex-1 min-h-[48px] flex flex-col items-center justify-center gap-1 text-[#bac9cc] hover:text-[#e1e2ea] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
            <span className="text-[11px] tracking-tight font-medium">Fast-Pass</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('parking-details')}
            className="flex-1 min-h-[48px] flex flex-col items-center justify-center gap-1 text-[#bac9cc] hover:text-[#e1e2ea] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">garage</span>
            <span className="text-[11px] tracking-tight font-medium">Facility</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
