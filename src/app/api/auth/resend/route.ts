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

  const { phoneNumber } = await req.json();

  if (!phoneNumber) {
    return NextResponse.json(
      { success: false, message: "Phone number is required" },
      { status: 400 }
    );
  }

  const result = await CognitoAuthService.resendConfirmationCode(phoneNumber);

  if (result.success) {
    return NextResponse.json({
      success: true,
      message: result.message,
    });
  }

  return NextResponse.json(
    { success: false, message: result.message },
    { status: 400 }
  );
} 