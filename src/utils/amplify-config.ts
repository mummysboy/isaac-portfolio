import { Amplify } from 'aws-amplify';

// Configure Amplify immediately on client-side module load to prevent
// "Amplify has not been configured" errors before components mount
// This MUST happen synchronously before any other code tries to use Amplify
let isInitialized = false;
if (typeof window !== 'undefined') {
  try {
    const userPoolId = process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID;
    const clientId = process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID;
    
    // Always configure Amplify, even with placeholder values, to prevent errors
    // The configureAmplify function will update with real values if available
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: userPoolId || 'placeholder',
          userPoolClientId: clientId || 'placeholder',
          loginWith: {
            phone: true,
            username: false,
          },
        },
      },
    });
    isInitialized = true;
  } catch (error) {
    // If configuration fails, we'll try again in configureAmplify
    console.warn('Failed to initialize Amplify at module load:', error);
  }
}

function getAmplifyConfig() {
  return {
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
        userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID!,
        loginWith: {
          phone: true,
          username: false,
        },
      },
    },
  };
}

export function configureAmplify(): { success: boolean; error?: string } {
  // Ensure Amplify is initialized first (module-level code should have done this)
  if (typeof window !== 'undefined' && !isInitialized) {
    try {
      Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: 'placeholder',
            userPoolClientId: 'placeholder',
            loginWith: {
              phone: true,
              username: false,
            },
          },
        },
      });
      isInitialized = true;
    } catch (error) {
      // Ignore initialization errors
    }
  }

  // Check if Amplify is already configured by checking its internal config
  let currentConfig = null;
  try {
    currentConfig = Amplify.getConfig();
    if (currentConfig?.Auth?.Cognito?.userPoolId && currentConfig.Auth.Cognito.userPoolId !== 'placeholder') {
      // Already configured with real values, skip
      return { success: true };
    }
  } catch (error: any) {
    // getConfig() might throw if not configured or invalid config
    // This is expected with placeholder values, so we silently continue
    // Don't log the error to avoid console noise
  }

  // Validate required environment variables
  const hasUserPoolId = !!process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID;
  const hasClientId = !!process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID;

  if (!hasUserPoolId || !hasClientId) {
    if (typeof window !== 'undefined') {
      if (!hasUserPoolId) {
        console.warn('Missing NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID environment variable');
      }
      if (!hasClientId) {
        console.warn('Missing NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID environment variable');
      }
    }
    
    // Configure Amplify with placeholder values to prevent "Amplify has not been configured" errors
    // Actual auth operations will fail gracefully with better error messages
    try {
      Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID || 'placeholder',
            userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID || 'placeholder',
            loginWith: {
              phone: true,
              username: false,
            },
          },
        },
      });
    } catch (error) {
      // Ignore configuration errors with placeholder values
    }
    
    return { 
      success: false, 
      error: hasUserPoolId && hasClientId 
        ? 'AWS Cognito configuration is incomplete' 
        : 'AWS Cognito User Pool ID and Client ID are not configured. Please set NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID and NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID in your .env.local file.'
    };
  }

  try {
    const amplifyConfig = getAmplifyConfig();
    Amplify.configure(amplifyConfig);
    return { success: true };
  } catch (error: any) {
    const errorMessage = error?.message || 'Failed to configure AWS Amplify';
    if (typeof window !== 'undefined') {
      console.error('Failed to configure Amplify:', error);
    }
    return { 
      success: false, 
      error: errorMessage 
    };
  }
}

// Export a function to check if Amplify is configured
export function isAmplifyConfigured(): boolean {
  try {
    const config = Amplify.getConfig();
    return !!(config?.Auth?.Cognito?.userPoolId && config.Auth.Cognito.userPoolId !== 'placeholder');
  } catch (error) {
    // getConfig() might throw if not configured or invalid config
    // Return false if we can't check
    return false;
  }
} 