// src/utils/client-auth.ts
import { CognitoAuthService, type AuthUser } from './cognito-auth';

export async function checkAuthStatus(): Promise<boolean> {
  try {
    return await CognitoAuthService.isAuthenticated();
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    return await CognitoAuthService.getCurrentUser();
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function signIn(phoneNumber: string, password: string): Promise<{ success: boolean; message: string }> {
  try {
    const result = await CognitoAuthService.signIn({ phoneNumber, password });
    return {
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    console.error('Error during sign in:', error);
    return {
      success: false,
      message: 'An unexpected error occurred during sign in',
    };
  }
}



export async function confirmSignUp(phoneNumber: string, code: string): Promise<{ success: boolean; message: string }> {
  try {
    const result = await CognitoAuthService.confirmSignUp(phoneNumber, code);
    return {
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    console.error('Error during confirmation:', error);
    return {
      success: false,
      message: 'An unexpected error occurred during confirmation',
    };
  }
}

export async function resendConfirmationCode(phoneNumber: string): Promise<{ success: boolean; message: string }> {
  try {
    const result = await CognitoAuthService.resendConfirmationCode(phoneNumber);
    return {
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    console.error('Error resending confirmation code:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while resending the code',
    };
  }
}

export async function logout(): Promise<boolean> {
  try {
    const result = await CognitoAuthService.signOut();
    if (result.success) {
      // Redirect to login page
      window.location.href = '/personal';
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
} 