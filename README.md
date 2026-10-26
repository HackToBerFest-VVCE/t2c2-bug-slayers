# 🚗 SpotIQ — Dual-Role Smart Parking & Connected Mobility Platform

> **A mobile-first smart-parking prototype for drivers and space owners.**  
> Initially developed with Antigravity; GitHub Copilot is assisting with continued development in VS Code.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Copilot](https://img.shields.io/badge/Continued%20development-GitHub%20Copilot-8957e5?logo=githubcopilot&logoColor=white)](https://github.com/features/copilot)

---

## 📌 Problem Statement & Overview

SpotIQ is a frontend prototype exploring a dual-role parking experience for Mysuru. Drivers can explore mock facilities, select a parking bay, view a calculated fare, and walk through a sample booking and navigation flow. Space owners can complete a sample listing wizard and view mock dashboard metrics.

The application is intended for demonstration and UX evaluation. It does not currently connect to deployed parking facilities or services.

## Quick Start

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL (by default, `http://localhost:5173`). For verification, run `npm test` and `npm run build`.

---

## ✨ Dual-Role Experience & Key Features

### 🌟 1. Role Selection & Welcome Experience (`WelcomeRoleSelect.tsx`)
- Brand header with animated neon-green location-pin logo (`#7CFF65`).
- "Find Parking" (Driver) and "Earn with Your Space" (Space Owner) navigation into the prototype flows.
- Quick direct demo bypass for instant hackathon evaluation.

### 🚗 2. Driver Portal (`DriverAuth.tsx`)
- Dedicated sign-in and registration tabs with show/hide password toggle.
- Client-side form validation for email, phone, and matching passwords; no real account is created.
- "Fill Demo Driver Credentials" one-click button (`driver.kiran@spotiq.in`).
- Smooth transition into the active parking discovery flow.

### 🏢 3. Space Owner Portal (`OwnerAuth.tsx`)
- Host sign-in and registration screens with client-side validation; no real account is created.
- "Fill Demo Host Credentials" one-click button (`host.suresh@mysuru-parking.com`).
- Direct routing to host onboarding or host dashboard.

### 📋 4. Guided Space Owner Onboarding (`OwnerOnboarding.tsx`)
A 6-step local prototype wizard with per-step field validation and a "Fill Demo Data" quick-fill tool:
1. **Host Profile**: Full name, primary phone, host category (Individual, Commercial, Apartment RWA).
2. **Location & Address**: Property title, street address, landmark, Mysuru postal PIN, simulated geofence.
3. **Space & Compatibility**: Structure type (Driveway, Garage, Basement, Open Lot), vehicle classes, key amenities.
4. **Capacity & Schedule**: Number of bays counter, operating days, and daily operating windows.
5. **Pricing Structure**: Base hourly tariff (₹/hr), optional daily flat rate, EV surcharge, and net host payout breakdown.
6. **Review & Publish**: Complete listing preview card, legal ownership certification checkbox, and celebratory publish modal.

### 📊 5. Space Owner Dashboard (`OwnerDashboard.tsx`)
- Sample revenue metrics, listing status toggles, and mock driver activity.
- Instant "List Another Space" and "Preview Driver View" shortcuts.

### 🅿️ 6. Driver Smart Parking Discovery & Navigation (Existing 8 Screens Intact)
- **Connected Journey Flow (`ConnectedJourneyFlow.tsx`)**: Highway approach radar, facility cards, and ETA.
- **Bay Selection (`SelectParkingSlot.tsx`)**: Multi-level mock parking bays (B1, B2, B3) with local status simulation.
- **Parking Details & Tariffs (`ParkingDetails.tsx`)**: Transparent fees and EV amenities.
- **Booking Confirmation (`BookingConfirmation.tsx`)**: Sample booking pass and payment summary; no payment is processed.
- **Active Navigation (`ActiveParkingJourney.tsx`)**: Demonstration indoor directions; no live facility navigation or barrier verification.
- **My Bookings (`MyBookings.tsx`)**: Active, upcoming, and past parking passes.
- **Unified Driver Companion (`UnifiedDriverCompanion.tsx`)**: In-vehicle high-contrast HUD companion with emergency SOS.
- **Interactive Reel (`InteractivePrototypeReel.tsx`)**: Complete end-to-end prototype walkthrough.

---

## 🛠️ Architecture & Project Structure

```
park/
├── .github/
│   └── copilot-instructions.md      # Copilot development rules & patterns
├── public/
│   └── favicon.svg                  # SpotIQ high-contrast icon
├── src/
│   ├── components/
│   │   ├── AuthCard.tsx             # Polished container with glow border
│   │   ├── InputField.tsx           # Accessible mobile input with password toggle
│   │   ├── ScreenSwitcher.tsx       # Categorized navigation drawer & session badge
│   │   ├── SlotIndicator.tsx        # High-contrast IoT status badge & bay card
│   │   └── SpotIQLogo.tsx           # Scalable neon-green location-pin logo
│   ├── data/
│   │   └── mockData.ts              # Mysuru smart city facilities & bay datasets
│   ├── screens/
│   │   ├── ActiveParkingJourney.tsx # Indoor navigation & wayfinding
│   │   ├── BookingConfirmation.tsx  # Sample receipt & QR display
│   │   ├── ConnectedJourneyFlow.tsx # Arrival companion & occupancy dashboard
│   │   ├── DriverAuth.tsx           # Driver sign-in & registration
│   │   ├── InteractivePrototypeReel.tsx # Full interactive prototype preview
│   │   ├── MyBookings.tsx           # Active and completed parking sessions
│   │   ├── OwnerAuth.tsx            # Space host sign-in & registration
│   │   ├── OwnerDashboard.tsx       # Space owner sample metrics & listings
│   │   ├── OwnerOnboarding.tsx      # 6-step host onboarding wizard
│   │   ├── ParkingDetails.tsx       # Facility amenities & tariffs
│   │   ├── SelectParkingSlot.tsx    # Multi-level bay layout & slot picker
│   │   ├── UnifiedDriverCompanion.tsx # In-car telemetry HUD mode
│   │   └── WelcomeRoleSelect.tsx    # Welcome & dual-role chooser
│   ├── utils/
│   │   ├── authValidation.ts        # Pure validation helpers (email, phone, steps)
│   │   ├── authValidation.test.ts   # Automated validation test suite
│   │   ├── parkingRules.ts          # Pure fare calculations & slot counters
│   │   └── parkingRules.test.ts     # Automated parking rules test suite
│   ├── App.tsx                      # Root hub: navigation, session & telemetry
│   ├── index.css                    # Tailwind CSS theme & glowing tokens
│   ├── main.tsx                     # React 19 entrypoint
│   └── types.ts                     # TypeScript data interfaces
├── .env.example                     # Environment sample config
├── .gitignore                       # Clean Git ignore rules
├── index.html                       # HTML5 entrypoint with optimized fonts
├── package.json                     # Clean dependencies & build scripts
├── tsconfig.json                    # Strict TypeScript configuration
└── vite.config.ts                   # Vite bundler setup
```

---

## 📱 How to Test on a Mobile-Sized Screen (360px – 430px)

SpotIQ is designed mobile-first for in-car and smartphone interaction.

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open the local URL printed by Vite (default: `http://localhost:5173`) in a browser.
3. Open **DevTools** (`F12` or `Ctrl + Shift + I` / `Cmd + Option + I`).
4. Toggle the **Device Toolbar** (`Ctrl + Shift + M` / `Cmd + Option + M`).
5. Choose **iPhone 14 Pro (393 × 852)**, **Pixel 7 (412 × 915)**, or set responsive width to **390px**.
6. **Driver Flow**:
   - On the Welcome screen, tap **"Find Parking" (Driver)**.
   - Tap **"Fill Demo Driver Credentials"**, then tap **"Sign In as Driver"**.
   - Browse Mysuru parking hubs, select a bay on Level B2, test the duration slider, and confirm the booking pass.
7. **Space Owner Flow**:
   - Tap the top navigation bar or user pill, click **"Role Select"** (or **"Sign Out"**).
   - Select **"Earn with Your Space" (Host)**.
   - Tap **"Fill Demo Host Credentials"** or toggle to **"Host Registration"**.
   - Tap **"Fill Demo Data"** to auto-populate all 6 steps, navigate through the steps, check the certification, and tap **"Publish Space Listing"**.
   - On the Owner Dashboard, review sample earnings metrics and toggle the local listing between **"Active"** and **"Paused"**.

---

## 🧪 Automated Testing

The existing unit tests use the Node.js native test runner. They cover selected authentication/onboarding validation and parking fare, slot count, and availability rules; they do not cover every UI flow.

```bash
# Run unit tests
npm test
```

The production build also runs TypeScript checking before Vite bundles the app:

```bash
npm run build
```

---

## Current Implementation Status & Limitations

- React screens, navigation, client-side validation, fare calculations, and booking/listing state are implemented in the browser. State and sample data are local to the running app and are not a persistent service.
- Facilities, slots, vehicles, bookings, owner listings, dashboard figures, and sensor changes use mock/sample data. The sensor control only changes local UI state; it is not a real-time IoT feed.
- Authentication is a prototype flow and does not authenticate users against a server. Do not enter real credentials.
- QR/pass, UPI/payment, EV charging, owner earnings, and navigation displays are demonstrations only. There is no payment processing, live reservation/availability service, backend, or verified barrier integration.
- `.env.example` is a sample only. Its values are not currently read by the app; do not put credentials or secrets in it. `.gitignore` excludes `.env*` files except the committed `.env.example` template.
- The visual design is intentionally dark, high-contrast, and mobile-first. Keep these patterns and existing working flows when extending the prototype.

## Development Continuity & GitHub Copilot Contributions

The initial SpotIQ foundation, screens, and mobile-first architecture were developed using Antigravity. Subsequent feature refinement, business rule hardening, and validation logic were assisted by **GitHub Copilot** in VS Code.

### Genuine GitHub Copilot Contributions:
1. **Parking Slot Selection & Booking Rules**:
   - Implemented `isSlotSelectable` and `isSlotBookable` helpers in `src/utils/parkingRules.ts` to ensure only `available` slots can be selected and only `selected` slots can proceed to checkout.
   - Prevented occupied or reserved slots from being chosen in `src/screens/SelectParkingSlot.tsx`.
2. **Rechecking Slot Availability on Confirmation**:
   - Integrated live slot re-validation in `src/App.tsx` (`handleConfirmBooking`) and `src/screens/BookingConfirmation.tsx`.
   - If a bay is occupied or changed before confirmation completes, the UI halts confirmation, notifies the user, and navigates back to select a vacant slot.
3. **Automated Validation Unit Tests**:
   - Added automated tests in `src/utils/parkingRules.test.ts` testing `isSlotSelectable` and `isSlotBookable` across all slot status states (`available`, `selected`, `occupied`, `reserved`).
4. **Copilot Custom Instructions & Developer Guidelines**:
   - Authored `.github/copilot-instructions.md` defining project coding guidelines, mock data boundaries, and high-contrast design preservation.
