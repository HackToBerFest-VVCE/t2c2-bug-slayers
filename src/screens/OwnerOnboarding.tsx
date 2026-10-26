import React, { useState } from 'react';
import { ScreenId, OwnerSpaceListing, UserSession } from '../types.ts';
import { SpotIQLogo } from '../components/SpotIQLogo.tsx';
import { InputField } from '../components/InputField.tsx';
import { validateOnboardingStep, OnboardingStepData } from '../utils/authValidation.ts';

interface OwnerOnboardingProps {
  onNavigate: (screen: ScreenId) => void;
  userSession: UserSession | null;
  onSubmitListing: (listing: OwnerSpaceListing) => void;
}

const TOTAL_STEPS = 6;

const STEP_TITLES = [
  'Host Profile',
  'Location & Address',
  'Space & Compatibility',
  'Capacity & Schedule',
  'Pricing Structure',
  'Review & Publish',
];

export const OwnerOnboarding: React.FC<OwnerOnboardingProps> = ({
  onNavigate,
  userSession,
  onSubmitListing,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [submittedListingId, setSubmittedListingId] = useState('');

  // Form State
  const [formData, setFormData] = useState<OnboardingStepData>({
    fullName: userSession?.name || '',
    phone: userSession?.phone || '',
    hostType: 'Individual Host',

    propertyTitle: '',
    address: '',
    landmark: '',
    city: 'Mysuru',
    postalCode: '570002',

    spaceType: 'Driveway',
    allowedVehicles: ['Hatchback / Sedan', 'Compact SUV'],
    amenities: ['CCTV Surveillance', 'Gated Access'],

    totalBays: 2,
    operatingDays: 'All Days (24/7)',
    operatingHours: '06:00 AM - 11:00 PM',

    ratePerHour: 30,
    dailyFlatRate: 200,
    hasEvCharging: true,
    evRatePerHour: 50,
  });

  const [legalCertified, setLegalCertified] = useState(false);

  // Autofill Demo Space Helper
  const handleAutofillDemo = () => {
    setFormData({
      fullName: userSession?.name || 'Suresh Gowda',
      phone: userSession?.phone || '9900112233',
      hostType: 'Individual Host',

      propertyTitle: 'Gokulam Green View Driveway & EV Bay',
      address: 'Plot #14, 3rd Main, 2nd Stage, Gokulam',
      landmark: 'Near Contour Club Road',
      city: 'Mysuru',
      postalCode: '570002',

      spaceType: 'Driveway',
      allowedVehicles: ['Hatchback / Sedan', 'Compact SUV', 'Electric Vehicle (EV)', 'Two-Wheeler'],
      amenities: ['CCTV Surveillance', 'Gated Access', 'EV Charger (7.4kW)', 'Covered Roof'],

      totalBays: 3,
      operatingDays: 'All Days (24/7)',
      operatingHours: '06:00 AM - 11:30 PM',

      ratePerHour: 35,
      dailyFlatRate: 220,
      hasEvCharging: true,
      evRatePerHour: 60,
    });
    setLegalCertified(true);
    setErrors({});
  };

  const handleNextStep = () => {
    const stepValidation = validateOnboardingStep(currentStep, formData);
    setErrors(stepValidation.errors);

    if (!stepValidation.isValid) return;

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!legalCertified) {
      setErrors({ legal: 'You must certify legal ownership or authority to monetize this space.' });
      return;
    }

    setIsSubmitting(true);
    const newId = `SPQ-HOST-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedListingId(newId);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowCelebration(true);

      const newListing: OwnerSpaceListing = {
        id: newId,
        propertyTitle: formData.propertyTitle,
        address: formData.address,
        landmark: formData.landmark,
        city: formData.city,
        postalCode: formData.postalCode,
        spaceType: formData.spaceType as any,
        allowedVehicles: formData.allowedVehicles,
        amenities: formData.amenities,
        totalBays: formData.totalBays,
        availableBays: formData.totalBays,
        operatingDays: formData.operatingDays,
        operatingHours: formData.operatingHours,
        ratePerHour: formData.ratePerHour,
        dailyFlatRate: formData.dailyFlatRate,
        hasEvCharging: formData.hasEvCharging,
        evRatePerHour: formData.evRatePerHour,
        status: 'active',
        createdAt: 'Just now',
      };

      onSubmitListing(newListing);
    }, 700);
  };

  const toggleArrayItem = (listKey: 'allowedVehicles' | 'amenities', item: string) => {
    setFormData((prev) => {
      const exists = prev[listKey].includes(item);
      const updated = exists ? prev[listKey].filter((i) => i !== item) : [...prev[listKey], item];
      return { ...prev, [listKey]: updated };
    });
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-[#e1e2ea] flex flex-col justify-between px-4 py-6 max-w-md mx-auto relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-[#00e5ff]/10 blur-3xl pointer-events-none" />

      {/* Top Bar with Step Progress */}
      <div className="z-10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('owner-auth')}
            className="inline-flex items-center gap-1.5 text-xs text-[#849396] hover:text-white transition-colors py-1 px-2 -ml-2 rounded-lg"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Exit Onboarding</span>
          </button>

          <button
            type="button"
            onClick={handleAutofillDemo}
            className="px-2.5 py-1 rounded-full bg-[#7CFF65]/15 text-[#7CFF65] border border-[#7CFF65]/30 text-[10px] font-bold tracking-wider uppercase hover:bg-[#7CFF65]/25 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            <span>Fill Demo Data</span>
          </button>
        </div>

        {/* Step Header */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#7CFF65]">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <h1 className="text-xl font-extrabold text-white">{STEP_TITLES[currentStep - 1]}</h1>
          </div>
          <SpotIQLogo size="sm" showWordmark={false} />
        </div>

        {/* Multi-step progress bar */}
        <div className="mt-3 flex items-center gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            return (
              <div
                key={stepNum}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${isCompleted
                    ? 'bg-[#7CFF65]'
                    : isCurrent
                      ? 'bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]'
                      : 'bg-[#272a30]'
                  }`}
              />
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="my-5 z-10 flex-1">
        {/* STEP 1: Personal / Contact details */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-[#bac9cc]">
              Provide your verified host identity for smart city parking payouts and driver trust.
            </p>

            <InputField
              label="Host Full Name"
              icon="person"
              placeholder="e.g. Suresh Gowda"
              value={formData.fullName}
              onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
              error={errors.fullName}
            />

            <InputField
              label="Primary Phone Number"
              icon="call"
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              error={errors.phone}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#bac9cc]">Host Category</label>
              <div className="grid grid-cols-3 gap-2">
                {['Individual Host', 'Commercial Fleet', 'Apartment RWA'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, hostType: type }))}
                    className={`p-2.5 rounded-xl text-center text-xs font-bold border transition-all ${formData.hostType === type
                        ? 'bg-[#7CFF65]/15 border-[#7CFF65] text-[#7CFF65] shadow-[0_0_12px_rgba(124,255,101,0.2)]'
                        : 'bg-[#13171f] border-[#272a30] text-[#849396] hover:text-white'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#13171f] border border-white/5 flex items-start gap-2.5 text-xs text-[#849396]">
              <span className="material-symbols-outlined text-[#7CFF65] text-[18px] shrink-0">verified_user</span>
              <span>
                Smart City KYC: All host earnings are automatically disbursed to your verified UPI VPA.
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: Parking-space address and location */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-[#bac9cc]">
              Specify the exact physical location where drivers will park.
            </p>

            <InputField
              label="Property / Facility Title"
              icon="apartment"
              placeholder="e.g. Gokulam Green View Driveway"
              value={formData.propertyTitle}
              onChange={(e) => setFormData((p) => ({ ...p, propertyTitle: e.target.value }))}
              error={errors.propertyTitle}
            />

            <InputField
              label="Street Address"
              icon="home_pin"
              placeholder="House/Plot #, Cross, Stage"
              value={formData.address}
              onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
              error={errors.address}
            />

            <InputField
              label="Landmark (Optional)"
              icon="flag"
              placeholder="Near Temple / Metro / Landmark"
              value={formData.landmark}
              onChange={(e) => setFormData((p) => ({ ...p, landmark: e.target.value }))}
            />

            <div className="grid grid-cols-2 gap-2.5">
              <InputField
                label="City"
                icon="location_city"
                value={formData.city}
                onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                error={errors.city}
              />
              <InputField
                label="Postal Code (PIN)"
                icon="markunread_mailbox"
                value={formData.postalCode}
                onChange={(e) => setFormData((p) => ({ ...p, postalCode: e.target.value }))}
                error={errors.postalCode}
              />
            </div>

            {/* GPS Simulation Visual */}
            <div className="p-3 rounded-xl bg-[#13171f] border border-[#272a30] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">my_location</span>
                <div>
                  <div className="font-semibold text-white">Mysuru Smart Geofence</div>
                  <div className="text-[10px] text-[#849396]">Lat: 12.3361° N, Long: 76.6432° E</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#7CFF65]/15 text-[#7CFF65] text-[10px] font-bold">
                Auto-Tagged
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: Space type and vehicle compatibility */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-[#bac9cc]">
              Select the structure of your parking bay and compatible vehicle classes.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#bac9cc]">Space Structure Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Driveway', icon: 'driveway' },
                  { id: 'Covered Garage', icon: 'garage' },
                  { id: 'Underground Basement', icon: 'warehouse' },
                  { id: 'Open Commercial Lot', icon: 'local_parking' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, spaceType: type.id }))}
                    className={`p-3 rounded-xl text-left border flex items-center gap-2.5 transition-all ${formData.spaceType === type.id
                        ? 'bg-[#7CFF65]/15 border-[#7CFF65] text-white shadow-[0_0_12px_rgba(124,255,101,0.2)]'
                        : 'bg-[#13171f] border-[#272a30] text-[#bac9cc] hover:text-white'
                      }`}
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#7CFF65]">{type.icon}</span>
                    <span className="text-xs font-semibold leading-tight">{type.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#bac9cc]">Supported Vehicles</label>
              <div className="grid grid-cols-2 gap-2">
                {['Hatchback / Sedan', 'Compact SUV', 'Electric Vehicle (EV)', 'Two-Wheeler'].map((veh) => {
                  const isChecked = formData.allowedVehicles.includes(veh);
                  return (
                    <button
                      key={veh}
                      type="button"
                      onClick={() => toggleArrayItem('allowedVehicles', veh)}
                      className={`p-2.5 rounded-xl text-left border text-xs flex items-center justify-between transition-all ${isChecked
                          ? 'bg-[#00e5ff]/15 border-[#00e5ff] text-white'
                          : 'bg-[#13171f] border-[#272a30] text-[#849396]'
                        }`}
                    >
                      <span className="font-semibold truncate">{veh}</span>
                      <span className={`material-symbols-outlined text-[16px] ${isChecked ? 'text-[#00e5ff]' : 'text-[#849396]'}`}>
                        {isChecked ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.allowedVehicles && (
                <p className="text-[11px] text-[#ff5964]">{errors.allowedVehicles}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#bac9cc]">Key Amenities</label>
              <div className="grid grid-cols-2 gap-2">
                {['CCTV Surveillance', 'Gated Access', 'EV Charger (7.4kW)', 'Covered Roof', '24/7 Guard'].map((amenity) => {
                  const isChecked = formData.amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleArrayItem('amenities', amenity)}
                      className={`p-2.5 rounded-xl text-left border text-xs flex items-center justify-between transition-all ${isChecked
                          ? 'bg-[#7CFF65]/15 border-[#7CFF65] text-white'
                          : 'bg-[#13171f] border-[#272a30] text-[#849396]'
                        }`}
                    >
                      <span className="font-semibold truncate">{amenity}</span>
                      <span className={`material-symbols-outlined text-[16px] ${isChecked ? 'text-[#7CFF65]' : 'text-[#849396]'}`}>
                        {isChecked ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Number of spaces and availability schedule */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-[#bac9cc]">
              Define total capacity and operating windows when drivers can book.
            </p>

            {/* Total bays counter */}
            <div className="p-4 rounded-xl bg-[#13171f] border border-[#272a30] flex items-center justify-between">
              <div>
                <label className="text-xs font-semibold text-white">Total Parking Bays</label>
                <p className="text-[11px] text-[#849396]">Simultaneous vehicle slots available</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, totalBays: Math.max(1, p.totalBays - 1) }))}
                  className="w-9 h-9 rounded-lg bg-[#1f242e] hover:bg-[#272a30] text-white flex items-center justify-center font-bold text-lg active:scale-95"
                >
                  -
                </button>
                <span className="text-lg font-extrabold text-[#7CFF65] w-6 text-center">
                  {formData.totalBays}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, totalBays: Math.min(20, p.totalBays + 1) }))}
                  className="w-9 h-9 rounded-lg bg-[#1f242e] hover:bg-[#272a30] text-white flex items-center justify-center font-bold text-lg active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            {/* Operating Days */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#bac9cc]">Operating Days</label>
              <div className="grid grid-cols-3 gap-2">
                {['All Days (24/7)', 'Weekdays Only', 'Weekends Only'].map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, operatingDays: day }))}
                    className={`p-2.5 rounded-xl text-center text-xs font-bold border transition-all ${formData.operatingDays === day
                        ? 'bg-[#7CFF65]/15 border-[#7CFF65] text-[#7CFF65]'
                        : 'bg-[#13171f] border-[#272a30] text-[#849396]'
                      }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Operating Hours */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#bac9cc]">Operating Hours</label>
              <div className="grid grid-cols-2 gap-2">
                {['06:00 AM - 11:00 PM', '24 Hours Open', '08:00 AM - 08:00 PM', 'Night Shift (08 PM - 08 AM)'].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, operatingHours: hrs }))}
                    className={`p-2.5 rounded-xl text-left text-xs font-bold border transition-all ${formData.operatingHours === hrs
                        ? 'bg-[#00e5ff]/15 border-[#00e5ff] text-[#00e5ff]'
                        : 'bg-[#13171f] border-[#272a30] text-[#849396]'
                      }`}
                  >
                    {hrs}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Hourly or daily pricing */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-[#bac9cc]">
              Configure fair smart city tariffs. Drivers pay through SpotIQ UPI.
            </p>

            <InputField
              label="Standard Hourly Rate (₹ / hr)"
              icon="currency_rupee"
              type="number"
              placeholder="30"
              value={formData.ratePerHour}
              onChange={(e) => setFormData((p) => ({ ...p, ratePerHour: Number(e.target.value) }))}
              error={errors.ratePerHour}
              helperText="Mysuru avg: ₹25 - ₹40/hr"
            />

            <InputField
              label="Daily Full-Day Pass (₹ / day)"
              icon="event_available"
              type="number"
              placeholder="200"
              value={formData.dailyFlatRate || ''}
              onChange={(e) => setFormData((p) => ({ ...p, dailyFlatRate: Number(e.target.value) }))}
              helperText="Optional flat tariff for 10+ hours"
            />

            <div className="p-3.5 rounded-xl bg-[#13171f] border border-[#272a30] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#7CFF65] text-[18px]">bolt</span>
                    <span>Offer EV Charging Facility</span>
                  </div>
                  <div className="text-[11px] text-[#849396]">Earn surcharge for fast AC/DC chargers</div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.hasEvCharging}
                  onChange={(e) => setFormData((p) => ({ ...p, hasEvCharging: e.target.checked }))}
                  className="w-5 h-5 accent-[#7CFF65] cursor-pointer"
                />
              </div>

              {formData.hasEvCharging && (
                <div className="pt-2 border-t border-white/5">
                  <InputField
                    label="EV Fast Charging Rate (₹ / hr)"
                    icon="electric_car"
                    type="number"
                    value={formData.evRatePerHour || ''}
                    onChange={(e) => setFormData((p) => ({ ...p, evRatePerHour: Number(e.target.value) }))}
                    error={errors.evRatePerHour}
                    helperText="Includes electricity & parking"
                  />
                </div>
              )}
            </div>

            {/* Smart City Platform Commission Breakdown */}
            <div className="p-3 rounded-xl bg-[#121f00] border border-[#7CFF65]/30 text-xs text-[#bac9cc] space-y-1.5">
              <div className="flex justify-between text-white font-bold">
                <span>Driver Pays (2 hours sample):</span>
                <span>₹{formData.ratePerHour * 2}</span>
              </div>
              <div className="flex justify-between text-[#849396] text-[11px]">
                <span>SpotIQ Telemetry & Gateway (8%):</span>
                <span>- ₹{(formData.ratePerHour * 2 * 0.08).toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-[#7CFF65] font-extrabold text-sm pt-1 border-t border-white/10">
                <span>Your Net Payout:</span>
                <span>₹{(formData.ratePerHour * 2 * 0.92).toFixed(1)}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review listing details and submit */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs text-[#bac9cc]">
              Verify your space listing before publishing to Mysuru drivers.
            </p>

            {/* Comprehensive Review Card */}
            <div className="p-4 rounded-2xl bg-[#13171f] border border-[#7CFF65]/40 space-y-3.5 shadow-[0_0_20px_rgba(124,255,101,0.15)]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-[#7CFF65]/20 text-[#7CFF65] text-[10px] font-bold uppercase tracking-wider">
                    {formData.spaceType}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{formData.propertyTitle}</h3>
                  <p className="text-xs text-[#849396]">
                    {formData.address}, {formData.city} - {formData.postalCode}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-[#7CFF65]">₹{formData.ratePerHour}/hr</div>
                  {formData.dailyFlatRate && (
                    <div className="text-[10px] text-[#849396]">₹{formData.dailyFlatRate}/day</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
                <div>
                  <span className="text-[#849396] block text-[10px]">CAPACITY</span>
                  <span className="font-bold text-white">{formData.totalBays} Dedicated Bays</span>
                </div>
                <div>
                  <span className="text-[#849396] block text-[10px]">SCHEDULE</span>
                  <span className="font-bold text-white">{formData.operatingHours}</span>
                </div>
              </div>

              <div className="text-xs pt-2 border-t border-white/10">
                <span className="text-[#849396] block text-[10px] mb-1">AMENITIES & COMPATIBILITY</span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.amenities.map((a) => (
                    <span key={a} className="px-2 py-0.5 rounded-md bg-[#272a30] text-[#00e5ff] text-[10px] font-semibold">
                      {a}
                    </span>
                  ))}
                  {formData.allowedVehicles.map((v) => (
                    <span key={v} className="px-2 py-0.5 rounded-md bg-[#1f242e] text-[#bac9cc] text-[10px]">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Legal Certification Checkbox */}
            <div className="p-3 rounded-xl bg-[#191c21] border border-[#272a30] flex items-start gap-2.5">
              <input
                id="legal-cert"
                type="checkbox"
                checked={legalCertified}
                onChange={(e) => {
                  setLegalCertified(e.target.checked);
                  if (errors.legal) setErrors({});
                }}
                className="w-4 h-4 mt-0.5 accent-[#7CFF65] cursor-pointer"
              />
              <label htmlFor="legal-cert" className="text-xs text-[#bac9cc] cursor-pointer leading-relaxed">
                I certify that I am the legal owner or authorized representative for this property and agree to the SpotIQ Smart City Host terms.
              </label>
            </div>
            {errors.legal && (
              <p className="text-[11px] text-[#ff5964] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                <span>{errors.legal}</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons: Back & Next / Submit */}
      <div className="z-10 pt-3 border-t border-[#272a30] flex items-center gap-2.5">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrevStep}
            className="w-1/3 h-12 rounded-xl bg-[#191c21] hover:bg-[#272a30] text-white font-bold text-xs border border-white/10 transition-all flex items-center justify-center gap-1 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back</span>
          </button>
        )}

        {currentStep < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="flex-1 h-12 rounded-xl bg-[#7CFF65] hover:bg-[#6ee658] text-[#080B10] font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(124,255,101,0.35)] transition-all flex items-center justify-center gap-1 active:scale-[0.99]"
          >
            <span>Continue to {STEP_TITLES[currentStep]}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
            className="flex-1 h-12 rounded-xl bg-[#7CFF65] hover:bg-[#6ee658] text-[#080B10] font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(124,255,101,0.4)] transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                <span>Publishing Listing...</span>
              </>
            ) : (
              <>
                <span>Publish Space Listing</span>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Submission Success Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-[#13171f] border border-[#7CFF65]/50 p-6 text-center space-y-4 shadow-[0_0_40px_rgba(124,255,101,0.35)]">
            <div className="w-16 h-16 rounded-full bg-[#7CFF65]/20 border border-[#7CFF65] text-[#7CFF65] mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(124,255,101,0.4)]">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7CFF65]">
                Listing ID: {submittedListingId}
              </span>
              <h2 className="text-xl font-extrabold text-white">Demo Listing Saved!</h2>
              <p className="text-xs text-[#bac9cc] leading-relaxed">
                Your sample listing is saved in this session only. It is not published to a live parking service.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#080B10] border border-[#272a30] text-xs flex justify-between items-center text-left">
              <div>
                <span className="text-[#849396] text-[10px] block">DEMO STATUS</span>
                <span className="font-bold text-[#7CFF65]">Preview Listing</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#7CFF65] animate-ping" />
            </div>

            <button
              type="button"
              onClick={() => onNavigate('owner-dashboard')}
              className="w-full h-12 rounded-xl bg-[#7CFF65] hover:bg-[#6ee658] text-[#080B10] font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(124,255,101,0.35)] transition-all flex items-center justify-center gap-1 active:scale-[0.99]"
            >
              <span>Go to Owner Dashboard</span>
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
