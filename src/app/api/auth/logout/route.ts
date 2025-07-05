import { NextResponse } from "next/server";
import { CognitoAuthService } from "@/utils/cognito-auth";

export async function POST(req: Request) {
  try {
    await CognitoAuthService.signOut();
    
    const response = NextResponse.json({ 
      success: true, 
      message: "Logged out successfully" 
    });
    
    // Clear the cognito session cookie
    response.cookies.set("cognito_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // Expire immediately
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error" 
      },
      { status: 500 }
    );
  }
} 