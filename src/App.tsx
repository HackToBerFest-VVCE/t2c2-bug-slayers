import React, { useState, useEffect, useRef } from 'react';
import {
  ScreenId,
  Booking,
  Vehicle,
  UserSession,
  OwnerSpaceListing,
} from './types.ts';
import {
  ParkingSlot,
  countAvailableSlots,
  isSlotBookable,
  isSlotSelectable,
} from './utils/parkingRules.ts';
import {
  INITIAL_SLOTS_B1,
  INITIAL_SLOTS_B2,
  INITIAL_SLOTS_B3,
  INITIAL_BOOKINGS,
} from './data/mockData.ts';
import { ScreenSwitcher } from './components/ScreenSwitcher.tsx';
import { WelcomeRoleSelect } from './screens/WelcomeRoleSelect.tsx';
import { DriverAuth } from './screens/DriverAuth.tsx';
import { OwnerAuth } from './screens/OwnerAuth.tsx';
import { OwnerOnboarding } from './screens/OwnerOnboarding.tsx';
import { OwnerDashboard } from './screens/OwnerDashboard.tsx';
import { ConnectedJourneyFlow } from './screens/ConnectedJourneyFlow.tsx';
import { SelectParkingSlot } from './screens/SelectParkingSlot.tsx';
import { ParkingDetails } from './screens/ParkingDetails.tsx';
import { BookingConfirmation } from './screens/BookingConfirmation.tsx';
import { ActiveParkingJourney } from './screens/ActiveParkingJourney.tsx';
import { MyBookings } from './screens/MyBookings.tsx';
import { UnifiedDriverCompanion } from './screens/UnifiedDriverCompanion.tsx';
import { InteractivePrototypeReel } from './screens/InteractivePrototypeReel.tsx';

const INITIAL_OWNER_LISTINGS: OwnerSpaceListing[] = [
  {
    id: 'SPQ-HOST-1002',
    propertyTitle: 'Palace South Gate Host Plot',
    address: 'Near Old Mysore Bank, B.N. Road',
    landmark: 'Opp. Mysore Medical College',
    city: 'Mysuru',
    postalCode: '570001',
    spaceType: 'Driveway',
    allowedVehicles: ['Hatchback / Sedan', 'Compact SUV', 'Two-Wheeler'],
    amenities: ['CCTV Surveillance', 'Gated Access'],
    totalBays: 2,
    availableBays: 1,
    operatingDays: 'All Days (24/7)',
    operatingHours: '06:00 AM - 11:00 PM',
    ratePerHour: 30,
    dailyFlatRate: 180,
    hasEvCharging: false,
    status: 'active',
    createdAt: '2 days ago',
  },
  {
    id: 'SPQ-HOST-1003',
    propertyTitle: 'Devaraja Market Secure Basement',
    address: 'Sayyaji Rao Road, Near K.R. Circle',
    landmark: 'Behind Gandhi Square',
    city: 'Mysuru',
    postalCode: '570001',
    spaceType: 'Underground Basement',
    allowedVehicles: ['Hatchback / Sedan', 'Electric Vehicle (EV)'],
    amenities: ['CCTV Surveillance', 'EV Charger (7.4kW)', 'Covered Roof', '24/7 Guard'],
    totalBays: 4,
    availableBays: 3,
    operatingDays: 'All Days (24/7)',
    operatingHours: '24 Hours Open',
    ratePerHour: 40,
    dailyFlatRate: 250,
    hasEvCharging: true,
    evRatePerHour: 60,
    status: 'active',
    createdAt: '1 week ago',
  },
];

export default function App() {
  // Navigation & Authentication State
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  // Space Owner State
  const [ownerListings, setOwnerListings] = useState<OwnerSpaceListing[]>(INITIAL_OWNER_LISTINGS);

  // Driver Smart Parking State
  const [activeLevel, setActiveLevel] = useState<'B1' | 'B2' | 'B3'>('B2');
  const [allSlots, setAllSlots] = useState<ParkingSlot[]>([
    ...INITIAL_SLOTS_B1,
    ...INITIAL_SLOTS_B2,
    ...INITIAL_SLOTS_B3,
  ]);
  const allSlotsRef = useRef(allSlots);
  allSlotsRef.current = allSlots;
  const [durationHours, setDurationHours] = useState<number>(2);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [liveToast, setLiveToast] = useState<{ message: string; type: 'available' | 'occupied' } | null>(null);

  // Selected slot (defaults to B04)
  const defaultB04 =
    allSlots.find((s) => s.code === 'B04') ||
    allSlots.find((s) => s.status === 'selected') ||
    allSlots[0];
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot>(defaultB04);

  // Level-filtered slots
  const levelSlots = allSlots.filter((s) => s.level === activeLevel);
  const availableCount = countAvailableSlots(levelSlots);
  const currentSelectedSlot = allSlots.find((slot) => slot.id === selectedSlot.id);
  const canBookSelectedSlot = currentSelectedSlot !== undefined && isSlotBookable(currentSelectedSlot.status);

  // Role Selection & Auth Handlers
  const handleSelectRole = (role: 'driver' | 'owner') => {
    if (role === 'driver') {
      setCurrentScreen('driver-auth');
    } else {
      setCurrentScreen('owner-auth');
    }
  };

  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
  };

  const handleSignOut = () => {
    setUserSession(null);
    setCurrentScreen('welcome');
  };

  // Space Owner Handlers
  const handleSubmitListing = (newListing: OwnerSpaceListing) => {
    setOwnerListings((prev) => [newListing, ...prev]);
  };

  const handleToggleListingStatus = (listingId: string) => {
    setOwnerListings((prev) =>
      prev.map((listing) => {
        if (listing.id === listingId) {
          const nextStatus = listing.status === 'active' ? 'offline' : 'active';
          return { ...listing, status: nextStatus };
        }
        return listing;
      })
    );
  };

  // Local slot-status simulation for the prototype
  const handleSimulateSensorChange = () => {
    const candidates = levelSlots.filter((s) => s.code !== selectedSlot.code);
    if (candidates.length === 0) return;

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const targetSlot = candidates[randomIndex];
    const willBeAvailable = targetSlot.status !== 'available';

    const newStatus = willBeAvailable ? 'available' : 'occupied';
    const plate = willBeAvailable ? undefined : `KA-09-RT-${Math.floor(1000 + Math.random() * 9000)}`;

    setAllSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === targetSlot.id) {
          return {
            ...slot,
            status: newStatus,
            vehiclePlate: plate,
          };
        }
        return slot;
      })
    );

    setLiveToast({
      message: willBeAvailable
        ? `Demo sensor: Slot ${targetSlot.code} (Level ${targetSlot.level}) is now VACANT (Green Indicator)`
        : `Demo sensor: Slot ${targetSlot.code} is now OCCUPIED (Red Indicator)`,
      type: willBeAvailable ? 'available' : 'occupied',
    });

    setTimeout(() => {
      setLiveToast(null);
    }, 3800);
  };

  // Direct slot status toggle (for testing)
  const handleToggleSlotStatus = (slotId: string) => {
    setAllSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          const nextStatus = slot.status === 'available' ? 'occupied' : 'available';
          const plate = nextStatus === 'occupied' ? 'KA-09-EA-2091' : undefined;
          return {
            ...slot,
            status: nextStatus,
            vehiclePlate: plate,
          };
        }
        return slot;
      })
    );
  };

  const handleSelectSlot = (slot: ParkingSlot) => {
    const currentSlot = allSlots.find((current) => current.id === slot.id);
    if (!currentSlot || !isSlotSelectable(currentSlot.status)) return;

    setSelectedSlot(slot);
    setAllSlots((prev) =>
      prev.map((s) => {
        if (s.id === slot.id) {
          return { ...s, status: 'selected' };
        }
        if (s.status === 'selected') {
          return { ...s, status: 'available' };
        }
        return s;
      })
    );
  };

  const handleConfirmBooking = (vehicle: Vehicle, total: number, slotId: string): boolean => {
    const currentSlot = allSlotsRef.current.find((slot) => slot.id === slotId);
    if (!currentSlot || !isSlotBookable(currentSlot.status)) return false;

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      passId: 'SPQ-MY-89241',
      facilityName: 'Palace South Gate Multi-Level',
      facilityAddress: 'Bangalore-Nilgiri Rd, Mysuru',
      slotCode: currentSlot.code,
      level: `Level ${currentSlot.level}`,
      vehicle,
      startTime: 'Today, 02:30 PM',
      endTime: '04:30 PM',
      durationHours,
      totalAmount: total,
      paymentMethod: 'UPI / Google Pay',
      status: 'active',
      dateLabel: 'Today',
    };
    setBookings((prev) => [newBooking, ...prev]);
    return true;
  };

  // Smooth scroll to top when switching screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  return (
    <div className="flex flex-col min-h-screen bg-[#080B10] text-[#e1e2ea] antialiased selection:bg-[#7CFF65] selection:text-[#080B10]">
      {/* Global Prototype Navigation Bar */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onSimulateSensorChange={handleSimulateSensorChange}
        availableCount={availableCount}
        totalCount={levelSlots.length}
        userSession={userSession}
        onSignOut={handleSignOut}
      />

      {/* Demo sensor feedback toast */}
      {liveToast && (
        <div
          className={`fixed top-14 left-4 right-4 z-50 p-3 rounded-2xl shadow-2xl flex items-center justify-between border text-xs font-bold transition-all duration-300 animate-slide-down ${liveToast.type === 'available'
            ? 'bg-[#121f00] text-[#7CFF65] border-[#7CFF65]/50 shadow-[0_0_20px_rgba(124,255,101,0.3)]'
            : 'bg-[#281418] text-[#ff5964] border-[#ff5964]/50 shadow-[0_0_20px_rgba(255,89,100,0.3)]'
            }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${liveToast.type === 'available' ? 'bg-[#7CFF65] animate-ping' : 'bg-[#ff5964]'
                }`}
            />
            <span>{liveToast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setLiveToast(null)}
            className="p-1 hover:opacity-75 text-current"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Screen Render Switcher */}
      <div className="flex-1 flex flex-col">
        {/* NEW WELCOME & AUTH FLOWS */}
        {currentScreen === 'welcome' && (
          <WelcomeRoleSelect
            onNavigate={setCurrentScreen}
            onSelectRole={handleSelectRole}
          />
        )}

        {currentScreen === 'driver-auth' && (
          <DriverAuth
            onNavigate={setCurrentScreen}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {currentScreen === 'owner-auth' && (
          <OwnerAuth
            onNavigate={setCurrentScreen}
            onLoginSuccess={handleLoginSuccess}
            hasExistingListings={ownerListings.length > 0}
          />
        )}

        {currentScreen === 'owner-onboarding' && (
          <OwnerOnboarding
            onNavigate={setCurrentScreen}
            userSession={userSession}
            onSubmitListing={handleSubmitListing}
          />
        )}

        {currentScreen === 'owner-dashboard' && (
          <OwnerDashboard
            onNavigate={setCurrentScreen}
            userSession={userSession}
            ownerListings={ownerListings}
            onToggleListingStatus={handleToggleListingStatus}
            onSignOut={handleSignOut}
          />
        )}

        {/* EXISTING DRIVER SMART PARKING SCREENS (ALL INTACT & FULLY FUNCTIONAL) */}
        {currentScreen === 'journey' && (
          <ConnectedJourneyFlow
            onNavigate={setCurrentScreen}
            slots={levelSlots}
            availableSlotsCount={availableCount}
          />
        )}

        {currentScreen === 'slot-select' && (
          <SelectParkingSlot
            onNavigate={setCurrentScreen}
            slots={allSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
            onToggleSlotStatus={handleToggleSlotStatus}
            durationHours={durationHours}
            onUpdateDuration={setDurationHours}
            activeLevel={activeLevel}
            onChangeLevel={setActiveLevel}
          />
        )}

        {currentScreen === 'parking-details' && (
          <ParkingDetails
            onNavigate={setCurrentScreen}
            availableCount={availableCount}
          />
        )}

        {currentScreen === 'booking-confirmation' && (
          <BookingConfirmation
            onNavigate={setCurrentScreen}
            selectedSlot={selectedSlot}
            canConfirmBooking={canBookSelectedSlot}
            durationHours={durationHours}
            onConfirmBooking={handleConfirmBooking}
          />
        )}

        {currentScreen === 'active-journey' && (
          <ActiveParkingJourney
            onNavigate={setCurrentScreen}
            selectedSlot={selectedSlot}
          />
        )}

        {currentScreen === 'my-bookings' && (
          <MyBookings
            onNavigate={setCurrentScreen}
            bookings={bookings}
          />
        )}

        {currentScreen === 'driver-companion' && (
          <UnifiedDriverCompanion
            onNavigate={setCurrentScreen}
            selectedSlot={selectedSlot}
          />
        )}

        {currentScreen === 'prototype-reel' && (
          <InteractivePrototypeReel
            onNavigate={setCurrentScreen}
            slots={allSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
            onToggleSlotStatus={handleToggleSlotStatus}
            availableCount={availableCount}
          />
        )}
      </div>
    </div>
  );
}
