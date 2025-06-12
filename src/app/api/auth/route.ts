import { NextResponse } from "next/server";
import { generateToken } from "@/utils/auth";
import { checkRateLimit } from "@/utils/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (!checkRateLimit(ip.toString())) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  const { pin } = await req.json();

  if (pin === "2501") {
    const token = await generateToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 6,
      sameSite: "lax",
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
