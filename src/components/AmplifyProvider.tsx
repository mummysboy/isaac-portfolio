'use client';

import { useState } from 'react';
import { configureAmplify } from '@/utils/amplify-config';

// Configure Amplify synchronously when this module is imported
// This ensures Amplify is configured before any child components render
let configResult: { success: boolean; error?: string } = { success: true };
if (typeof window !== 'undefined') {
  // The module-level code in amplify-config.ts should have already configured Amplify
  // This call ensures it's properly configured and captures any errors
  configResult = configureAmplify();
}

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  // Use the already-computed config result from module load
  const [configError] = useState<string | null>(
    !configResult.success ? configResult.error || null : null
  );

  // Still render children even if config fails, so the app doesn't completely break
  // Individual auth operations will handle the error appropriately
  return (
    <>
      {configError && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 fixed bottom-4 right-4 max-w-md z-50">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Configuration Warning:</strong> {configError}
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Please check your .env.local file for AWS Cognito configuration variables.
              </p>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
} 