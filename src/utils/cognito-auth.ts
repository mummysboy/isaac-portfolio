import { signIn, signUp, signOut, getCurrentUser, fetchAuthSession, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import { CognitoUser } from 'amazon-cognito-identity-js';

export interface AuthUser {
  id: string;
  phoneNumber: string;
  username?: string;
  attributes?: Record<string, any>;
}

export interface SignUpData {
  phoneNumber: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface SignInData {
  phoneNumber: string;
  password: string;
}

export interface AuthSession {
  user: AuthUser | null;
  isAuthenticated: boolean;
  tokens?: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  };
}

export class CognitoAuthService {
  static async signUp(data: SignUpData): Promise<{ success: boolean; message: string; userId?: string }> {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: data.phoneNumber,
        password: data.password,
        options: {
          userAttributes: {
            phone_number: data.phoneNumber,
            given_name: data.firstName || '',
            family_name: data.lastName || '',
          },
        },
      });

      if (isSignUpComplete) {
        return {
          success: true,
          message: 'Account created successfully! Please check your phone for verification.',
          userId,
        };
      } else {
        return {
          success: true,
          message: `Account created! ${nextStep.signUpStep === 'CONFIRM_SIGN_UP' ? 'Please check your phone for verification code.' : 'Additional steps required.'}`,
          userId,
        };
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      return {
        success: false,
        message: error.message || 'Failed to create account',
      };
    }
  }

  static async confirmSignUp(phoneNumber: string, code: string): Promise<{ success: boolean; message: string }> {
    try {
      await confirmSignUp({
        username: phoneNumber,
        confirmationCode: code,
      });

      return {
        success: true,
        message: 'Phone number verified successfully! You can now sign in.',
      };
    } catch (error: any) {
      console.error('Confirm sign up error:', error);
      return {
        success: false,
        message: error.message || 'Failed to verify phone number',
      };
    }
  }

  static async resendConfirmationCode(phoneNumber: string): Promise<{ success: boolean; message: string }> {
    try {
      await resendSignUpCode({
        username: phoneNumber,
      });

      return {
        success: true,
        message: 'Verification code resent to your phone.',
      };
    } catch (error: any) {
      console.error('Resend code error:', error);
      return {
        success: false,
        message: error.message || 'Failed to resend verification code',
      };
    }
  }

  static async signIn(data: SignInData): Promise<{ success: boolean; message: string; session?: AuthSession }> {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: data.phoneNumber,
        password: data.password,
      });

      if (isSignedIn) {
        const session = await this.getCurrentSession();
        return {
          success: true,
          message: 'Signed in successfully!',
          session,
        };
      } else {
        return {
          success: false,
          message: 'Sign in requires additional steps.',
        };
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      return {
        success: false,
        message: error.message || 'Failed to sign in',
      };
    }
  }

  static async signOut(): Promise<{ success: boolean; message: string }> {
    try {
      await signOut();
      return {
        success: true,
        message: 'Signed out successfully!',
      };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return {
        success: false,
        message: error.message || 'Failed to sign out',
      };
    }
  }

  static async getCurrentSession(): Promise<AuthSession> {
    try {
      const session = await fetchAuthSession();
      const user = await getCurrentUser();

      if (session.tokens && user) {
        return {
          user: {
            id: user.userId,
            phoneNumber: user.username,
            username: user.username,
            attributes: user.signInDetails?.loginId ? { phoneNumber: user.signInDetails.loginId } : undefined,
          },
          isAuthenticated: true,
          tokens: {
            accessToken: session.tokens.accessToken.toString(),
            idToken: session.tokens.idToken?.toString() || '',
            refreshToken: '', // Refresh token is not directly accessible in v6
          },
        };
      }

      return {
        user: null,
        isAuthenticated: false,
      };
    } catch (error) {
      console.error('Get current session error:', error);
      return {
        user: null,
        isAuthenticated: false,
      };
    }
  }

  static async isAuthenticated(): Promise<boolean> {
    try {
      const session = await this.getCurrentSession();
      return session.isAuthenticated;
    } catch (error) {
      console.error('Check authentication error:', error);
      return false;
    }
  }

  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const session = await this.getCurrentSession();
      return session.user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
} 