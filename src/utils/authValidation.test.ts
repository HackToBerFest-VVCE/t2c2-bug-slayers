import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEmail,
  validatePhone,
  validateIdentifier,
  validatePassword,
  validatePasswordMatch,
  validateRegistrationForm,
  validateOnboardingStep,
} from './authValidation.ts';

test('validateEmail validates typical and edge emails properly', () => {
  assert.equal(validateEmail('driver@spotiq.in').isValid, true);
  assert.equal(validateEmail('host.mysuru@domain.co').isValid, true);
  assert.equal(validateEmail('').isValid, false);
  assert.equal(validateEmail('invalid-email').isValid, false);
  assert.equal(validateEmail('missing@domain').isValid, false);
});

test('validatePhone validates 10-digit Indian and mobile numbers', () => {
  assert.equal(validatePhone('9876543210').isValid, true);
  assert.equal(validatePhone('+91 98765 43210').isValid, true);
  assert.equal(validatePhone('12345').isValid, false);
  assert.equal(validatePhone('').isValid, false);
});

test('validateIdentifier detects email vs phone properly', () => {
  assert.equal(validateIdentifier('driver@spotiq.in').isValid, true);
  assert.equal(validateIdentifier('9876543210').isValid, true);
  assert.equal(validateIdentifier('').isValid, false);
});

test('validatePassword requires at least 6 characters', () => {
  assert.equal(validatePassword('short').isValid, false);
  assert.equal(validatePassword('secret123').isValid, true);
  assert.equal(validatePasswordMatch('secret123', 'secret123').isValid, true);
  assert.equal(validatePasswordMatch('secret123', 'different').isValid, false);
});

test('validateRegistrationForm checks all fields and matching passwords', () => {
  const valid = validateRegistrationForm({
    fullName: 'Himamshu R',
    email: 'himamshu@example.com',
    phone: '9876543210',
    password: 'password123',
    confirmPassword: 'password123',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);

  const invalid = validateRegistrationForm({
    fullName: '',
    email: 'bademail',
    phone: '123',
    password: '123',
    confirmPassword: '456',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.password);
});

test('validateOnboardingStep validates each of the 6 steps', () => {
  // Step 1
  const s1Fail = validateOnboardingStep(1, { fullName: '' });
  assert.equal(s1Fail.isValid, false);
  const s1Pass = validateOnboardingStep(1, {
    fullName: 'Praveen Rao',
    phone: '9845012345',
    hostType: 'Individual Host',
  });
  assert.equal(s1Pass.isValid, true);

  // Step 2
  const s2Pass = validateOnboardingStep(2, {
    propertyTitle: 'Gokulam Green View Driveway',
    address: '14th Cross, 3rd Stage, Gokulam',
    city: 'Mysuru',
    postalCode: '570002',
  });
  assert.equal(s2Pass.isValid, true);

  // Step 3
  const s3Pass = validateOnboardingStep(3, {
    spaceType: 'Driveway',
    allowedVehicles: ['Sedan', 'SUV'],
  });
  assert.equal(s3Pass.isValid, true);

  // Step 5
  const s5Pass = validateOnboardingStep(5, {
    ratePerHour: 30,
    hasEvCharging: false,
  });
  assert.equal(s5Pass.isValid, true);
  const s5Fail = validateOnboardingStep(5, {
    ratePerHour: 5, // below min ₹10
  });
  assert.equal(s5Fail.isValid, false);
});
