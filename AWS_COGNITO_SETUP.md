# AWS Cognito Phone Number Authentication Setup Guide

This guide will help you set up AWS Cognito authentication with phone number verification for your portfolio application.

## Prerequisites

1. An AWS account
2. AWS CLI installed and configured (optional but recommended)
3. Node.js and npm installed

## Step 1: Create AWS Cognito User Pool

### Option A: Using AWS Console

1. Go to the AWS Console and navigate to Amazon Cognito
2. Click "Create user pool"
3. Configure the following settings:

#### Step 1: Configure sign-in experience
- **Cognito user pool sign-in options**: Choose "Phone number" (recommended) or "Username"
- **User name requirements**: Select "Allow phone numbers"
- **Password policy**: Choose "Cognito defaults" or customize as needed
- **Multi-factor authentication**: Choose "No MFA" for simplicity or enable if needed

#### Step 2: Configure security requirements
- **Password policy**: Use default or customize
- **Account recovery**: Enable "Self-service account recovery"
- **User account protection**: Choose "No protection" or customize

#### Step 3: Configure sign-up experience
- **Self-service sign-up**: Disable (users cannot register themselves)
- **Attributes**: Select "Phone number" as required, "Given name" and "Family name" as optional
- **Verification**: Choose "Phone number" for verification
- **Message delivery**: Use Cognito's default SMS service

#### Step 4: Configure message delivery
- **SMS provider**: Choose "Send SMS with Cognito"
- **SMS role**: Create or select an IAM role with SMS permissions

#### Step 5: Integrate your app
- **User pool name**: Choose a descriptive name (e.g., "isaac-portfolio-users")
- **Initial app client**: Create an app client
  - **App client name**: "portfolio-web-client"
  - **Confidential client**: No (for web applications)
  - **Authentication flows**: Enable "ALLOW_USER_PASSWORD_AUTH" and "ALLOW_REFRESH_TOKEN_AUTH"

#### Step 6: Review and create
- Review your settings and click "Create user pool"

### Option B: Using AWS CLI

```bash
# Create user pool
aws cognito-idp create-user-pool \
  --pool-name "isaac-portfolio-users" \
  --policies '{
    "PasswordPolicy": {
      "MinimumLength": 8,
      "RequireUppercase": true,
      "RequireLowercase": true,
      "RequireNumbers": true,
      "RequireSymbols": false
    }
  }' \
  --auto-verified-attributes phone_number \
  --username-attributes phone_number \
  --schema '[
    {
      "Name": "phone_number",
      "AttributeDataType": "String",
      "Required": true,
      "Mutable": true
    },
    {
      "Name": "given_name",
      "AttributeDataType": "String",
      "Required": false,
      "Mutable": true
    },
    {
      "Name": "family_name",
      "AttributeDataType": "String",
      "Required": false,
      "Mutable": true
    }
  ]'

# Create app client
aws cognito-idp create-user-pool-client \
  --user-pool-id YOUR_USER_POOL_ID \
  --client-name "portfolio-web-client" \
  --no-generate-secret \
  --explicit-auth-flows ALLOW_USER_PASSWORD_AUTH ALLOW_REFRESH_TOKEN_AUTH ALLOW_USER_SRP_AUTH
```

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# AWS Cognito Configuration
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=your-user-pool-id
NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID=your-client-id

# Optional: AWS Access Keys (only needed for server-side operations)
# AWS_ACCESS_KEY_ID=your-access-key
# AWS_SECRET_ACCESS_KEY=your-secret-key
```

Replace the placeholder values with your actual AWS Cognito configuration:

- `NEXT_PUBLIC_AWS_REGION`: The AWS region where your user pool is located
- `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID`: Your user pool ID (found in the Cognito console)
- `NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID`: Your app client ID (found in the Cognito console)

## Step 3: Update Your Application

The following files have been created/updated to support AWS Cognito:

### New Files:
- `src/utils/amplify-config.ts` - AWS Amplify configuration
- `src/utils/cognito-auth.ts` - Cognito authentication service
- `src/utils/approved-phones.ts` - Approved phone number management
- `src/components/AmplifyProvider.tsx` - Amplify provider component
- `src/components/AuthForm.tsx` - Authentication form component (sign-in only)
- `src/components/PhoneNumberManager.tsx` - Admin phone number manager
- `src/app/api/auth/confirm/route.ts` - Phone verification API endpoint
- `src/app/api/auth/resend/route.ts` - Resend verification code API endpoint

### Updated Files:
- `src/app/layout.tsx` - Added AmplifyProvider
- `src/app/api/auth/route.ts` - Updated to use Cognito sign-in
- `src/app/api/auth/logout/route.ts` - Updated to use Cognito sign-out
- `src/app/api/auth/status/route.ts` - Updated to use Cognito session check
- `src/utils/client-auth.ts` - Updated to use Cognito authentication

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your personal page (or wherever you have authentication)
3. Sign in with your approved phone number
4. Check your phone for the SMS verification code
5. Verify your phone number and access the page

## Step 5: Customize the UI

The `AuthForm` component provides a complete authentication interface with:
- Sign in form only (no registration)
- Phone confirmation form
- Error handling and loading states

The `PhoneNumberManager` component allows you to:
- Add approved phone numbers
- Remove approved phone numbers
- View all currently approved numbers

You can customize the styling by modifying the Tailwind classes in the component.

## Security Considerations

1. **Environment Variables**: Never commit your `.env.local` file to version control
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Configure CORS settings in your Cognito app client if needed
4. **Password Policy**: Consider implementing a strong password policy
5. **MFA**: Consider enabling multi-factor authentication for additional security

## Troubleshooting

### Common Issues:

1. **"User does not exist"**: Make sure the user is created and phone number is verified
2. **"Invalid credentials"**: Check that the phone number and password are correct
3. **"User is not confirmed"**: The user needs to verify their phone number first
4. **"Invalid client"**: Check that your app client ID is correct
5. **"User pool not found"**: Verify your user pool ID is correct
6. **"Phone number not approved"**: Add the phone number to the approved list in `src/utils/approved-phones.ts`

### Debug Mode:

To enable debug logging, add this to your `.env.local`:
```env
NEXT_PUBLIC_AMPLIFY_DEBUG=true
```

## Next Steps

1. **Create User Accounts**: Add users manually in AWS Cognito console
2. **Customize the UI**: Modify the AuthForm component to match your design
3. **Add User Profile**: Implement user profile management
4. **Password Reset**: Add password reset functionality
5. **Admin Functions**: Add admin functions for user management

## Support

If you encounter issues:
1. Check the AWS Cognito documentation
2. Review the AWS Amplify documentation
3. Check the browser console for error messages
4. Verify your environment variables are correctly set 