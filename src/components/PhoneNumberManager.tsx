'use client';

import { useState } from 'react';
import { APPROVED_PHONE_NUMBERS, normalizePhoneNumber, validatePhoneNumber } from '@/utils/approved-phones';

interface PhoneNumberManagerProps {
  isAdmin?: boolean;
}

export function PhoneNumberManager({ isAdmin = false }: PhoneNumberManagerProps) {
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // This would typically be fetched from an API or database
  const [approvedNumbers, setApprovedNumbers] = useState<string[]>(APPROVED_PHONE_NUMBERS);

  const handleAddPhoneNumber = () => {
    setIsLoading(true);
    setMessage('');

    const validation = validatePhoneNumber(newPhoneNumber);
    if (!validation.isValid) {
      setMessage(validation.error || 'Invalid phone number');
      setIsLoading(false);
      return;
    }

    const normalizedPhone = normalizePhoneNumber(newPhoneNumber);
    
    if (approvedNumbers.includes(normalizedPhone)) {
      setMessage('This phone number is already approved');
      setIsLoading(false);
      return;
    }

    // In a real application, you would save this to a database
    const updatedNumbers = [...approvedNumbers, normalizedPhone];
    setApprovedNumbers(updatedNumbers);
    setNewPhoneNumber('');
    setMessage('Phone number added successfully!');
    setIsLoading(false);
  };

  const handleRemovePhoneNumber = (phoneNumber: string) => {
    const updatedNumbers = approvedNumbers.filter(num => num !== phoneNumber);
    setApprovedNumbers(updatedNumbers);
    setMessage('Phone number removed successfully!');
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Approved Phone Numbers</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded-md text-sm ${
          message.includes('successfully') 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="tel"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            placeholder="Enter phone number (e.g., +1234567890)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAddPhoneNumber}
            disabled={isLoading || !newPhoneNumber.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Approved Phone Numbers</h3>
        {approvedNumbers.length === 0 ? (
          <p className="text-gray-500">No approved phone numbers yet.</p>
        ) : (
          <div className="space-y-2">
            {approvedNumbers.map((phoneNumber) => (
              <div key={phoneNumber} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-mono text-gray-900">{phoneNumber}</span>
                <button
                  onClick={() => handleRemovePhoneNumber(phoneNumber)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h4 className="font-semibold text-blue-900 mb-2">Instructions</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Phone numbers should be in E.164 format (+1234567890)</li>
          <li>• Only approved phone numbers can sign in</li>
          <li>• Users will receive SMS verification codes</li>
          <li>• You must create user accounts in AWS Cognito console</li>
          <li>• Changes are temporary - you'll need to update the code for persistence</li>
        </ul>
      </div>
    </div>
  );
} 