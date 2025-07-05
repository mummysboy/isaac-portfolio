// List of approved phone numbers
// You can add or remove phone numbers from this list
// Phone numbers should be in E.164 format (+1234567890)
export const APPROVED_PHONE_NUMBERS: string[] = [
  // Add your approved phone numbers here
  // Example: '+1234567890',
  // Example: '+1987654321',
  '+14155724853'
];

export function isPhoneNumberApproved(phoneNumber: string): boolean {
  // Normalize the phone number to E.164 format
  const normalizedPhone = normalizePhoneNumber(phoneNumber);
  
  // Check if the phone number is in the approved list
  return APPROVED_PHONE_NUMBERS.includes(normalizedPhone);
}

export function normalizePhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters except +
  let cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // If it doesn't start with +, assume it's a US number and add +1
  if (!cleaned.startsWith('+')) {
    // If it starts with 1 and has 10 digits, add +
    if (cleaned.startsWith('1') && cleaned.length === 11) {
      cleaned = '+' + cleaned;
    }
    // If it has 10 digits, assume US number and add +1
    else if (cleaned.length === 10) {
      cleaned = '+1' + cleaned;
    }
    // If it has 11 digits and doesn't start with 1, add +
    else if (cleaned.length === 11) {
      cleaned = '+' + cleaned;
    }
  }
  
  return cleaned;
}

export function formatPhoneNumberForDisplay(phoneNumber: string): string {
  const normalized = normalizePhoneNumber(phoneNumber);
  
  // Format US numbers as (XXX) XXX-XXXX
  if (normalized.startsWith('+1') && normalized.length === 12) {
    const digits = normalized.slice(2);
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  // For other numbers, just return the normalized version
  return normalized;
}

export function validatePhoneNumber(phoneNumber: string): { isValid: boolean; error?: string } {
  const normalized = normalizePhoneNumber(phoneNumber);
  
  // Check if it's a valid E.164 format
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  
  if (!e164Regex.test(normalized)) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number in international format (e.g., +1234567890)'
    };
  }
  
  // Check if it's approved
  if (!isPhoneNumberApproved(normalized)) {
    return {
      isValid: false,
      error: 'This phone number is not approved for access. Please contact the administrator.'
    };
  }
  
  return { isValid: true };
} 