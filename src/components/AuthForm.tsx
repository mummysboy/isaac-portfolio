'use client';

import { useState } from 'react';
import { signIn, confirmSignUp, resendConfirmationCode } from '@/utils/client-auth';
import { validatePhoneNumber, normalizePhoneNumber } from '@/utils/approved-phones';
import { FaMobileAlt } from 'react-icons/fa';

interface AuthFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AuthForm({ onSuccess, onCancel }: AuthFormProps) {
  const [mode, setMode] = useState<'phone' | 'code'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPhoneNumber, setPendingPhoneNumber] = useState('');

  // Step 1: User enters phone number
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validate phone number
    const validation = validatePhoneNumber(phoneNumber);
    if (!validation.isValid) {
      setMessage(validation.error || 'Invalid phone number');
      setIsLoading(false);
      return;
    }
    const normalizedPhone = normalizePhoneNumber(phoneNumber);

    try {
      // Try to sign in (Cognito will send code if user exists)
      const result = await signIn(normalizedPhone, 'dummy-password'); // Password is not used, but required by API
      if (result.success || result.message.includes('code')) {
        setPendingPhoneNumber(normalizedPhone);
        setMode('code');
        setMessage('A verification code has been sent to your phone.');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: User enters code
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const result = await confirmSignUp(pendingPhoneNumber, confirmCode);
      if (result.success) {
        setMessage(result.message);
        setTimeout(() => {
          onSuccess?.();
        }, 500);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const result = await resendConfirmationCode(pendingPhoneNumber);
      setMessage(result.message);
    } catch (error) {
      setMessage('Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
      <div className="mb-6 flex flex-col items-center">
        <div className="bg-blue-100 rounded-full p-4 mb-2">
          <FaMobileAlt className="text-blue-600 text-3xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {mode === 'phone' ? 'Sign in with your phone' : 'Enter verification code'}
        </h2>
        <p className="text-gray-600 text-center">
          {mode === 'phone'
            ? 'Enter your approved phone number to receive a sign-in code.'
            : 'We sent a code to your phone. Enter it below to continue.'}
        </p>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-md text-sm w-full text-center ${
          message.toLowerCase().includes('success') || message.toLowerCase().includes('sent')
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {mode === 'phone' && (
        <form onSubmit={handleSendCode} className="w-full space-y-4">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending code...' : 'Send code'}
          </button>
        </form>
      )}

      {mode === 'code' && (
        <form onSubmit={handleConfirm} className="w-full space-y-4">
          <input
            type="text"
            value={confirmCode}
            onChange={(e) => setConfirmCode(e.target.value)}
            required
            placeholder="Enter verification code"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg tracking-widest text-center"
            autoFocus
            maxLength={6}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isLoading}
            className="w-full text-blue-600 hover:underline text-sm mt-2"
          >
            Resend code
          </button>
        </form>
      )}

      {onCancel && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
} 