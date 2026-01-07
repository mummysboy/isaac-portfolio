'use client';

import { useState, useEffect } from 'react';
import { configureAmplify } from '@/utils/amplify-config';

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  const [configError, setConfigError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure component only runs on client side
  useEffect(() => {
    setMounted(true);
    // Configure Amplify when component mounts on the client
    // and doesn't interfere with SSR/build time
    const result = configureAmplify();
    if (!result.success && result.error) {
      setConfigError(result.error);
    }
  }, []);

  // During SSR/build time, just render children without client-side features
  if (!mounted) {
    return <>{children}</>;
  }

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