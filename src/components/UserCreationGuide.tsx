'use client';

import { useState } from 'react';
import { APPROVED_PHONE_NUMBERS } from '@/utils/approved-phones';

interface UserCreationGuideProps {
  isAdmin?: boolean;
}

export function UserCreationGuide({ isAdmin = false }: UserCreationGuideProps) {
  const [showGuide, setShowGuide] = useState(false);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Account Creation Guide</h2>
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {showGuide ? 'Hide Guide' : 'Show Guide'}
        </button>
      </div>

      {showGuide && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-semibold text-blue-900 mb-2">Important Note</h3>
            <p className="text-blue-800 text-sm">
              Since self-service sign-up is disabled, you must manually create user accounts in the AWS Cognito console. 
              Only approved phone numbers can sign in to the application.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Step-by-Step Guide</h3>
            <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
              <li>
                <strong>Go to AWS Cognito Console:</strong> Navigate to your user pool in the AWS Console
              </li>
              <li>
                <strong>Click "Users and groups":</strong> In the left sidebar of your user pool
              </li>
              <li>
                <strong>Click "Create user":</strong> This will open the user creation form
              </li>
              <li>
                <strong>Fill in the details:</strong>
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li><strong>Username:</strong> Use the phone number (e.g., +1234567890)</li>
                  <li><strong>Phone number:</strong> Enter the approved phone number</li>
                  <li><strong>Temporary password:</strong> Set a temporary password</li>
                  <li><strong>Mark email as verified:</strong> Check this box</li>
                  <li><strong>Mark phone number as verified:</strong> Check this box</li>
                </ul>
              </li>
              <li>
                <strong>Add attributes (optional):</strong>
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li><strong>Given name:</strong> User's first name</li>
                  <li><strong>Family name:</strong> User's last name</li>
                </ul>
              </li>
              <li>
                <strong>Click "Create user":</strong> The user account will be created
              </li>
              <li>
                <strong>User can now sign in:</strong> With their phone number and the temporary password
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Approved Phone Numbers</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              {APPROVED_PHONE_NUMBERS.length === 0 ? (
                <p className="text-gray-500">No approved phone numbers yet.</p>
              ) : (
                <div className="space-y-2">
                  {APPROVED_PHONE_NUMBERS.map((phoneNumber, index) => (
                    <div key={phoneNumber} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="font-mono text-gray-900">{phoneNumber}</span>
                      <span className="text-sm text-gray-500">#{index + 1}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-md">
            <h4 className="font-semibold text-yellow-900 mb-2">Security Best Practices</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Use strong temporary passwords</li>
              <li>• Require password change on first sign-in</li>
              <li>• Regularly review and update approved phone numbers</li>
              <li>• Monitor user activity in AWS CloudWatch</li>
              <li>• Consider enabling MFA for additional security</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-md">
            <h4 className="font-semibold text-green-900 mb-2">Quick Tips</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Users will receive SMS verification codes when signing in</li>
              <li>• Only approved phone numbers can access the application</li>
              <li>• You can manage approved numbers using the Phone Number Manager</li>
              <li>• Users can reset their passwords through AWS Cognito</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 