import { NextResponse } from "next/server";
import { CognitoAuthService } from "@/utils/cognito-auth";

export async function GET(req: Request) {
  try {
    // Check if user is authenticated with Cognito
    const isAuthenticated = await CognitoAuthService.isAuthenticated();
    
    if (isAuthenticated) {
      const user = await CognitoAuthService.getCurrentUser();
      return NextResponse.json({ 
        authenticated: true,
        message: "User is authenticated",
        user
      });
    } else {
      return NextResponse.json({ 
        authenticated: false,
        message: "User is not authenticated"
      });
    }
  } catch (error) {
    console.error("Auth status check error:", error);
    return NextResponse.json(
      { 
        authenticated: false,
        message: "Error checking authentication status"
      },
      { status: 500 }
    );
  }
} 