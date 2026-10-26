/**
 * SpotIQ Authentication & Onboarding Validation Helpers
 * Provides deterministic format checking and field validation
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Email address is required.' };
  }
  // Standard permissive RFC-compliant email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g., name@example.com).' };
  }
  return { isValid: true };
}

export function validatePhone(phone: string): ValidationResult {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  if (!cleaned) {
    return { isValid: false, error: 'Phone number is required.' };
  }
  // Indian and international mobile numbers: 10-15 digits
  if (!/^\d{10,15}$/.test(cleaned)) {
    return { isValid: false, error: 'Please enter a valid 10-digit mobile phone number.' };
  }
  return { isValid: true };
}

export function validateIdentifier(identifier: string): ValidationResult {
  const trimmed = identifier.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Email or phone number is required.' };
  }
  if (trimmed.includes('@')) {
    return validateEmail(trimmed);
  }
  return validatePhone(trimmed);
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Password is required.' };
  }
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long.' };
  }
  return { isValid: true };
}

export function validatePasswordMatch(password: string, confirm: string): ValidationResult {
  const pwdCheck = validatePassword(password);
  if (!pwdCheck.isValid) return pwdCheck;

  if (password !== confirm) {
    return { isValid: false, error: 'Passwords do not match.' };
  }
  return { isValid: true };
}

export interface RegistrationFields {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export function validateRegistrationForm(fields: RegistrationFields): {
  isValid: boolean;
  errors: Partial<Record<keyof RegistrationFields, string>>;
} {
  const errors: Partial<Record<keyof RegistrationFields, string>> = {};

  if (!fields.fullName.trim() || fields.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  const emailRes = validateEmail(fields.email);
  if (!emailRes.isValid) {
    errors.email = emailRes.error;
  }

  const phoneRes = validatePhone(fields.phone);
  if (!phoneRes.isValid) {
    errors.phone = phoneRes.error;
  }

  const pwdRes = validatePassword(fields.password);
  if (!pwdRes.isValid) {
    errors.password = pwdRes.error;
  }

  const matchRes = validatePasswordMatch(fields.password, fields.confirmPassword);
  if (!matchRes.isValid && !errors.password) {
    errors.confirmPassword = matchRes.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface OnboardingStepData {
  // Step 1: Personal / Contact
  fullName: string;
  phone: string;
  hostType: string;

  // Step 2: Address & Location
  propertyTitle: string;
  address: string;
  landmark: string;
  city: string;
  postalCode: string;

  // Step 3: Space Type & Compatibility
  spaceType: string;
  allowedVehicles: string[];
  amenities: string[];

  // Step 4: Schedule & Capacity
  totalBays: number;
  operatingDays: string;
  operatingHours: string;

  // Step 5: Pricing
  ratePerHour: number;
  dailyFlatRate?: number;
  hasEvCharging: boolean;
  evRatePerHour?: number;
}

export function validateOnboardingStep(
  step: number,
  data: Partial<OnboardingStepData>
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (step === 1) {
    if (!data.fullName || data.fullName.trim().length < 2) {
      errors.fullName = 'Host full name is required.';
    }
    const phoneRes = validatePhone(data.phone || '');
    if (!phoneRes.isValid) {
      errors.phone = phoneRes.error || 'Valid phone number is required.';
    }
    if (!data.hostType) {
      errors.hostType = 'Please select a host category.';
    }
  } else if (step === 2) {
    if (!data.propertyTitle || data.propertyTitle.trim().length < 3) {
      errors.propertyTitle = 'Property or parking facility title is required.';
    }
    if (!data.address || data.address.trim().length < 5) {
      errors.address = 'Detailed street address is required.';
    }
    if (!data.city || data.city.trim().length < 2) {
      errors.city = 'City name is required.';
    }
    if (!data.postalCode || !/^\d{6}$/.test(data.postalCode.trim())) {
      errors.postalCode = 'Valid 6-digit postal code (PIN code) is required.';
    }
  } else if (step === 3) {
    if (!data.spaceType) {
      errors.spaceType = 'Please select the space structure type.';
    }
    if (!data.allowedVehicles || data.allowedVehicles.length === 0) {
      errors.allowedVehicles = 'Select at least one supported vehicle category.';
    }
  } else if (step === 4) {
    if (!data.totalBays || data.totalBays < 1) {
      errors.totalBays = 'At least 1 parking bay must be available.';
    }
    if (!data.operatingDays) {
      errors.operatingDays = 'Please select operating days.';
    }
    if (!data.operatingHours) {
      errors.operatingHours = 'Please select operating hours.';
    }
  } else if (step === 5) {
    if (data.ratePerHour === undefined || data.ratePerHour < 10) {
      errors.ratePerHour = 'Hourly parking rate must be at least ₹10/hr.';
    }
    if (data.hasEvCharging && (data.evRatePerHour === undefined || data.evRatePerHour < 20)) {
      errors.evRatePerHour = 'EV charging rate must be at least ₹20/hr.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
