import { Amplify } from 'aws-amplify';

const amplifyConfig = {
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

export function configureAmplify() {
  // Check if Amplify is already configured by checking its internal config
  try {
    const currentConfig = Amplify.getConfig();
    if (currentConfig?.Auth?.Cognito?.userPoolId) {
      // Already configured, skip
      return;
    }
  } catch (error) {
    // Not configured yet, continue
  }

  // Validate required environment variables
  if (!process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID) {
    console.error('Missing NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID environment variable');
    throw new Error('AWS Cognito User Pool ID is not configured');
  }

  if (!process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID) {
    console.error('Missing NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID environment variable');
    throw new Error('AWS Cognito Client ID is not configured');
  }

  try {
    Amplify.configure(amplifyConfig);
  } catch (error) {
    console.error('Failed to configure Amplify:', error);
    throw error;
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