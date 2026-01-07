import { Amplify } from 'aws-amplify';

function getAmplifyConfig() {
  return {
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
        userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID!,
        region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
        loginWith: {
          phone: true,
          username: false,
        },
      },
    },
  };
}

export function configureAmplify(): { success: boolean; error?: string } {
  // Check if Amplify is already configured by checking its internal config
  try {
    const currentConfig = Amplify.getConfig();
    if (currentConfig?.Auth?.Cognito?.userPoolId) {
      // Already configured, skip
      return { success: true };
    }
  } catch (error) {
    // Not configured yet, continue
  }

  // Validate required environment variables
  if (!process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID) {
    if (typeof window !== 'undefined') {
      console.warn('Missing NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID environment variable');
    }
    return { 
      success: false, 
      error: 'AWS Cognito User Pool ID is not configured' 
    };
  }

  if (!process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID) {
    if (typeof window !== 'undefined') {
      console.warn('Missing NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID environment variable');
    }
    return { 
      success: false, 
      error: 'AWS Cognito Client ID is not configured' 
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
    return !!config?.Auth?.Cognito?.userPoolId;
  } catch (error) {
    return false;
  }
} 