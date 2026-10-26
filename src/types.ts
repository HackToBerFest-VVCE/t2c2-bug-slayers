import { ParkingSlot } from './utils/parkingRules.ts';

export type ScreenId =
  | 'welcome'
  | 'driver-auth'
  | 'owner-auth'
  | 'owner-onboarding'
  | 'owner-dashboard'
  | 'journey'
  | 'slot-select'
  | 'parking-details'
  | 'booking-confirmation'
  | 'active-journey'
  | 'my-bookings'
  | 'driver-companion'
  | 'prototype-reel';

export type UserRole = 'driver' | 'owner';

export interface UserSession {
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  isAuthenticated: boolean;
}

export interface OwnerSpaceListing {
  id: string;
  propertyTitle: string;
  address: string;
  landmark: string;
  city: string;
  postalCode: string;
  spaceType: 'Driveway' | 'Covered Garage' | 'Underground Basement' | 'Open Commercial Lot';
  allowedVehicles: string[];
  amenities: string[];
  totalBays: number;
  availableBays: number;
  operatingDays: string;
  operatingHours: string;
  ratePerHour: number;
  dailyFlatRate?: number;
  hasEvCharging: boolean;
  evRatePerHour?: number;
  status: 'active' | 'pending' | 'offline';
  createdAt: string;
}

export interface OwnerBookingSummary {
  id: string;
  spaceTitle: string;
  vehiclePlate: string;
  driverName: string;
  slotCode: string;
  startTime: string;
  durationHours: number;
  earnings: number;
  status: 'active' | 'completed' | 'reserved';
}

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: 'ev' | 'petrol' | 'diesel' | 'twowheeler';
  isDefault?: boolean;
}

export interface Booking {
  id: string;
  passId: string;
  facilityName: string;
  facilityAddress: string;
  slotCode: string;
  level: string;
  vehicle: Vehicle;
  startTime: string;
  endTime: string;
  durationHours: number;
  totalAmount: number;
  paymentMethod: string;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
  dateLabel: string;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  address: string;
  ratePerHour: number;
  availableSpots: number;
  totalSpots: number;
  walkDistance: string;
  walkTime: string;
  levels: {
    name: string;
    levelKey: 'B1' | 'B2' | 'B3';
    total: number;
    available: number;
    description: string;
    recommended?: boolean;
    isFull?: boolean;
  }[];
  evChargersCount: number;
  amenities: string[];
}
