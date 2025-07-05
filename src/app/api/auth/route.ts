import { NextResponse } from "next/server";
import { CognitoAuthService } from "@/utils/cognito-auth";
import { checkRateLimit } from "@/utils/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (!checkRateLimit(ip.toString())) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  const { phoneNumber, password } = await req.json();

  if (!phoneNumber || !password) {
    return NextResponse.json(
      { success: false, message: "Phone number and password are required" },
      { status: 400 }
    );
  }

  const result = await CognitoAuthService.signIn({ phoneNumber, password });

  if (result.success && result.session) {
    const response = NextResponse.json({ 
      success: true, 
      message: result.message,
      user: result.session.user 
    });
    
    // Set Cognito ID token cookie for middleware
    if (result.session.tokens?.idToken) {
      response.cookies.set("id_token", result.session.tokens.idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "lax",
        path: "/",
      });
    }
    // Optionally, keep your existing cognito_session cookie
    response.cookies.set("cognito_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: result.message },
    { status: 401 }
  );
}
