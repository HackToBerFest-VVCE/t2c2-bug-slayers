# GitHub Copilot Custom Instructions for SpotIQ

## Project Context
SpotIQ is a mobile-first frontend prototype for smart parking and a connected driver companion, themed around Mysuru Smart City. Its parking facilities, slot status changes, bookings, owner listings, navigation, and payment/pass displays are mock/demo behavior only; do not describe them as connected to live services unless a verified integration is added.

## Technology Stack
- **Framework**: React 19 with TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 with custom dark high-contrast mobility theme (`#080B10` surface, `#00E5FF` electric cyan, `#AFF833` neon lime, `#FF5964` error/occupied)
- **Typography & Icons**: Google Fonts (Plus Jakarta Sans) and Material Symbols Outlined
- **Testing**: Node.js native test runner (`node:test`, `node:assert/strict`) with `tsx`

## Architecture & Code Guidelines
1. **Component Design**:
   - Single responsibility, strongly typed props using interfaces defined in `src/types.ts` and `src/utils/parkingRules.ts`.
   - Accessible ARIA labels and semantic HTML elements.
   - High contrast UI tuned for in-vehicle and handheld readability under direct sunlight and night driving conditions.

2. **State & Mock Data**:
   - Sensor controls update local React state for demonstration only; there is no live IoT feed or backend.
   - Slot status indicators follow universal traffic standards: Lime Green (`#AFF833`) for available bays, Red (`#FF5964`) for occupied bays, Amber (`#FFB300`) for reserved bays, and Electric Cyan (`#00E5FF`) for selected bays.
   - Treat authentication, bookings, payments, QR passes, EV charging, and owner earnings as prototype behavior unless a real integration is implemented and tested.

3. **Code Style**:
   - Explicit TypeScript typing without `any`.
   - Functional React components with standard hooks (`useState`, `useEffect`, `useMemo`).
   - Keep deterministic business-rule calculations in `src/utils/parkingRules.ts` and add unit tests for changed rules.
   - Never commit real credentials, API keys, passwords, or environment files. `.env.example` must contain placeholders only; `.env*` files are ignored except that template.
   - Preserve existing working screens and the black/neon-green, high-contrast mobile-first design. Make focused changes and test business rules with the native Node.js test runner.
