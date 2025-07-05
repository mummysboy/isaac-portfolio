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
  Amplify.configure(amplifyConfig);
} 